import {
  IconChevronDown,
  IconChevronUp,
  IconSearch,
} from '@tabler/icons-react';
import {
  type ColumnDef,
  type ColumnPinningState,
  type FilterFnOption,
  type OnChangeFn,
  type PaginationState,
  type Row,
  type RowSelectionState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import {
  Children,
  type ComponentProps,
  type ComponentRef,
  type ReactNode,
  createContext,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';

import { cn, focusState } from '../../../../lib/utils';
import { Checkbox } from '../checkbox';
import { InputGroup, InputGroupAddon, InputGroupInput } from '../input-group';

type DataGridContextValue = {
  gridTemplateColumns: string;
  pinnedColumnIds: Set<string>;
  columnCount: number;
};

const DataGridContext = createContext<DataGridContextValue>({
  gridTemplateColumns: '',
  pinnedColumnIds: new Set(),
  columnCount: 0,
});

type DataGridSize = 'default' | 'compact';

const ROW_HEIGHT_MAP: Record<DataGridSize, number> = {
  default: 36,
  compact: 32,
};

const HEADER_HEIGHT_MAP: Record<DataGridSize, number> = {
  default: 36,
  compact: 32,
};

type DataGridProps<TData> = {
  data: TData[];
  columns: ColumnDef<TData>[];
  pinnedColumns?: string[];
  rowSelection?: RowSelectionState;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  sorting?: SortingState;
  onSortingChange?: OnChangeFn<SortingState>;
  pagination?: PaginationState;
  onPaginationChange?: OnChangeFn<PaginationState>;
  rowCount?: number;
  enableRowSelection?: boolean | ((row: Row<TData>) => boolean);
  enableSorting?: boolean;
  manualPagination?: boolean;
  manualSorting?: boolean;
  size?: DataGridSize;
  className?: string;
  children?: ReactNode;
  header?: ReactNode;
  onRowClick?: (row: Row<TData>) => void;
  footer?: ReactNode;
  searchValue?: string;
  onSearchValueChange?: (value: string) => void;
  globalFilterFn?: FilterFnOption<TData>;
  getRowId?: (originalRow: TData, index: number) => string;
  rowHeight?: number;
  headerHeight?: number;
  estimateSize?: number;
};

function DataGrid<TData>({
  data,
  columns,
  pinnedColumns = [],
  rowSelection,
  onRowSelectionChange,
  sorting,
  onSortingChange,
  pagination,
  onPaginationChange,
  rowCount,
  enableRowSelection = false,
  enableSorting = false,
  manualPagination = false,
  manualSorting = false,
  size = 'default',
  className,
  children,
  header,
  onRowClick,
  footer,
  searchValue,
  onSearchValueChange,
  globalFilterFn = 'auto',
  getRowId,
  rowHeight,
  headerHeight,
  estimateSize,
}: DataGridProps<TData>) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [internalSearchValue, setInternalSearchValue] = useState('');
  const resolvedSearchValue = searchValue ?? internalSearchValue;
  const previousSearchValueRef = useRef(resolvedSearchValue);

  const hasControlledRowSelection = rowSelection !== undefined;
  const hasControlledSorting = sorting !== undefined;
  const hasControlledPagination = pagination !== undefined;
  const isClientSorting = enableSorting && !manualSorting;
  const isClientPagination = Boolean(pagination) && !manualPagination;
  const shouldResetPageOnSearchChange =
    hasControlledPagination &&
    Boolean(onPaginationChange) &&
    (pagination?.pageIndex ?? 0) !== 0;

  const columnPinning: ColumnPinningState = useMemo(
    () => ({ left: pinnedColumns, right: [] }),
    [pinnedColumns]
  );

  const pinnedColumnIds = useMemo(
    () => new Set(pinnedColumns),
    [pinnedColumns]
  );
  const lastPinnedColumnId = pinnedColumns[pinnedColumns.length - 1];
  const customCellColumnIds = useMemo(
    () => collectCustomCellColumnIds(columns),
    [columns]
  );

  const { headerSlot, footerSlot } = useMemo(
    () => resolveDataGridSlots(children, header, footer),
    [children, footer, header]
  );

  const normalizedHeader = useMemo(
    () => normalizeDataGridHeader(headerSlot),
    [headerSlot]
  );

  const handleSearchValueChange = useCallback(
    (nextValue: string) => {
      if (searchValue === undefined) {
        setInternalSearchValue(nextValue);
      }
      onSearchValueChange?.(nextValue);
    },
    [onSearchValueChange, searchValue]
  );

  useEffect(() => {
    if (previousSearchValueRef.current === resolvedSearchValue) return;
    previousSearchValueRef.current = resolvedSearchValue;
    if (!shouldResetPageOnSearchChange || !pagination || !onPaginationChange) {
      return;
    }

    onPaginationChange((current) =>
      current.pageIndex === 0 ? current : { ...current, pageIndex: 0 }
    );
  }, [
    onPaginationChange,
    pagination,
    resolvedSearchValue,
    shouldResetPageOnSearchChange,
  ]);

  const searchPlaceholder = normalizedHeader.searchPlaceholder;

  const tableState: {
    columnPinning: ColumnPinningState;
    globalFilter: string;
    rowSelection?: RowSelectionState;
    sorting?: SortingState;
    pagination?: PaginationState;
  } = {
    columnPinning,
    globalFilter: resolvedSearchValue,
    ...(hasControlledRowSelection ? { rowSelection } : {}),
    ...(hasControlledSorting ? { sorting } : {}),
    ...(hasControlledPagination ? { pagination } : {}),
  };

  const tableFeatureHandlers: {
    onRowSelectionChange?: OnChangeFn<RowSelectionState>;
    onSortingChange?: OnChangeFn<SortingState>;
    onPaginationChange?: OnChangeFn<PaginationState>;
  } = {};

  if (onRowSelectionChange) {
    tableFeatureHandlers.onRowSelectionChange = onRowSelectionChange;
  }
  if (onSortingChange) {
    tableFeatureHandlers.onSortingChange = onSortingChange;
  }
  if (onPaginationChange) {
    tableFeatureHandlers.onPaginationChange = onPaginationChange;
  }

  const tableFeatureModels: {
    getSortedRowModel?: ReturnType<typeof getSortedRowModel>;
    getPaginationRowModel?: ReturnType<typeof getPaginationRowModel>;
  } = {};

  if (isClientSorting) {
    tableFeatureModels.getSortedRowModel = getSortedRowModel();
  }
  if (isClientPagination) {
    tableFeatureModels.getPaginationRowModel = getPaginationRowModel();
  }

  const table = useReactTable({
    data,
    columns,
    state: tableState,
    ...tableFeatureHandlers,
    autoResetPageIndex: false,
    autoResetExpanded: false,
    enableRowSelection,
    enableSorting,
    manualPagination,
    manualSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn,
    ...tableFeatureModels,
    getRowId,
    rowCount,
  });

  const { rows } = table.getRowModel();
  const headerGroups = table.getHeaderGroups();
  const allColumns = table.getAllColumns();

  const resolvedRowHeight = estimateSize ?? rowHeight ?? ROW_HEIGHT_MAP[size];
  const resolvedHeaderHeight = headerHeight ?? HEADER_HEIGHT_MAP[size];

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollContainerRef.current,
    estimateSize: () => resolvedRowHeight,
    overscan: 10,
  });

  const gridTemplateColumns = useMemo(() => {
    const hasFlexibleColumn = allColumns.some(
      (col) => col.columnDef.size === undefined
    );

    return allColumns
      .map((col, index) => {
        const colSize = col.columnDef.size;
        const isLastColumn = index === allColumns.length - 1;

        if (colSize !== undefined) {
          if (!hasFlexibleColumn && isLastColumn) {
            return `minmax(${colSize}px, 1fr)`;
          }
          return `${colSize}px`;
        }

        return 'minmax(120px, 1fr)';
      })
      .join(' ');
  }, [allColumns]);

  const pinnedLeftByColumnId = useMemo(() => {
    const leftById = new Map<string, number>();
    let cumulativeLeft = 0;

    for (const pinnedId of pinnedColumns) {
      leftById.set(pinnedId, cumulativeLeft);
      const pinnedColumn = allColumns.find((column) => column.id === pinnedId);
      cumulativeLeft += pinnedColumn?.columnDef.size ?? 120;
    }

    return leftById;
  }, [allColumns, pinnedColumns]);

  const contextValue = useMemo<DataGridContextValue>(
    () => ({
      gridTemplateColumns,
      pinnedColumnIds,
      columnCount: allColumns.length,
    }),
    [gridTemplateColumns, pinnedColumnIds, allColumns.length]
  );

  return (
    <DataGridContext.Provider value={contextValue}>
      <div
        data-slot="data-grid"
        className={cn(
          'relative flex h-full min-h-0 w-full flex-col bg-default text-sm',
          className
        )}
      >
        {normalizedHeader.hasHeaderContent && (
          <div
            data-slot="data-grid-header"
            className="flex min-h-14 items-start gap-3 px-3 py-2"
          >
            <div className="flex flex-col min-w-0 flex-1 gap-1">
              {normalizedHeader.title}
              {normalizedHeader.subtitle}
            </div>
            {(normalizedHeader.hasSearch || normalizedHeader.actions) && (
              <div className="ms-auto flex items-end gap-2 self-end">
                {normalizedHeader.hasSearch && (
                  <DataGridSearch
                    value={resolvedSearchValue}
                    onValueChange={handleSearchValueChange}
                    placeholder={searchPlaceholder}
                  />
                )}
                {normalizedHeader.actions}
              </div>
            )}
          </div>
        )}
        <div
          ref={scrollContainerRef}
          data-slot="data-grid-scroll-container"
          className="relative h-full min-h-0 w-full flex-1 overflow-auto"
          role="grid"
          aria-rowcount={rowCount ?? data.length}
          aria-colcount={allColumns.length}
        >
          <div className="min-w-fit w-full">
            {headerGroups.map((headerGroup) => (
              <div
                key={headerGroup.id}
                data-slot="data-grid-header-row"
                role="row"
                aria-rowindex={1}
                className="sticky top-0 z-20 grid border-y bg-background"
                style={{
                  gridTemplateColumns,
                  minHeight: resolvedHeaderHeight,
                }}
              >
                {headerGroup.headers.map((header) => {
                  const isPinned = pinnedColumnIds.has(header.column.id);
                  const isLastPinned =
                    isPinned && lastPinnedColumnId === header.column.id;
                  const sortDirection = header.column.getIsSorted();
                  const canSort = header.column.getCanSort();
                  const renderedHeader = header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      );
                  const headerTextValue = getTextValue(renderedHeader);

                  return (
                    <div
                      key={header.id}
                      data-slot="data-grid-column-header"
                      role="columnheader"
                      aria-colindex={header.index + 1}
                      aria-sort={getAriaSort(sortDirection, canSort)}
                      className={cn(
                        'flex items-center px-3 text-left text-sm font-medium text-muted-foreground',
                        isPinned && 'sticky left-0 z-10 bg-background',
                        isLastPinned &&
                          'relative after:pointer-events-none after:absolute after:inset-y-0 after:left-full after:w-2 after:content-[""] after:bg-linear-to-r after:from-border after:to-transparent after:opacity-70',
                        canSort &&
                          cn(
                            'cursor-pointer select-none hover:bg-muted/60',
                            focusState
                          )
                      )}
                      tabIndex={canSort ? 0 : undefined}
                      style={
                        isPinned
                          ? {
                              position: 'sticky',
                              left:
                                pinnedLeftByColumnId.get(header.column.id) ?? 0,
                              zIndex: 10,
                            }
                          : undefined
                      }
                      onClick={
                        canSort
                          ? header.column.getToggleSortingHandler()
                          : undefined
                      }
                      onKeyDown={
                        canSort
                          ? (event) => {
                              if (event.key !== 'Enter' && event.key !== ' ')
                                return;
                              event.preventDefault();
                              header.column.toggleSorting();
                            }
                          : undefined
                      }
                    >
                      {headerTextValue !== undefined ? (
                        <span className="block min-w-0 flex-1 truncate">
                          {headerTextValue}
                        </span>
                      ) : (
                        renderedHeader
                      )}
                      {sortDirection === 'asc' && (
                        <IconChevronUp className="ml-1 size-3.5 shrink-0" />
                      )}
                      {sortDirection === 'desc' && (
                        <IconChevronDown className="ml-1 size-3.5 shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>
            ))}

            <div
              data-slot="data-grid-body"
              style={{
                height: virtualizer.getTotalSize(),
                position: 'relative',
              }}
            >
              {virtualizer.getVirtualItems().map((virtualRow) => {
                const row = rows[virtualRow.index];
                const isSelected = row.getIsSelected();

                return (
                  <div
                    key={row.id}
                    data-slot="data-grid-row"
                    data-state={isSelected ? 'selected' : undefined}
                    role="row"
                    aria-rowindex={virtualRow.index + 2}
                    aria-selected={isSelected || undefined}
                    className={cn(
                      'group absolute left-0 right-0 grid border-b bg-background transition-colors',
                      'hover:bg-active-muted-background',
                      isSelected && 'bg-active-muted-background',
                      onRowClick &&
                        cn(
                          'cursor-pointer focus-visible:bg-active-muted-background',
                          focusState
                        )
                    )}
                    style={{
                      gridTemplateColumns,
                      height: virtualRow.size,
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                    tabIndex={onRowClick ? 0 : undefined}
                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                    onKeyDown={
                      onRowClick
                        ? (event) => {
                            if (event.key !== 'Enter' && event.key !== ' ')
                              return;
                            event.preventDefault();
                            onRowClick(row);
                          }
                        : undefined
                    }
                  >
                    {row.getVisibleCells().map((cell) => {
                      const isPinned = pinnedColumnIds.has(cell.column.id);
                      const isLastPinned =
                        isPinned && lastPinnedColumnId === cell.column.id;
                      const renderedCell = flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      );
                      const hasCustomCellRenderer = customCellColumnIds.has(
                        cell.column.id
                      );
                      const renderedTextValue = getTextValue(renderedCell);
                      const rawTextValue = getTextValue(cell.getValue());
                      const textValue =
                        renderedTextValue ??
                        (!hasCustomCellRenderer ? rawTextValue : undefined);

                      return (
                        <DataGridCell
                          key={cell.id}
                          isPinned={isPinned}
                          isLastPinned={isLastPinned}
                          colIndex={cell.column.getIndex() + 1}
                          textValue={textValue}
                          truncate={textValue !== undefined}
                          style={
                            isPinned
                              ? {
                                  position: 'sticky',
                                  left:
                                    pinnedLeftByColumnId.get(cell.column.id) ??
                                    0,
                                  zIndex: 10,
                                }
                              : undefined
                          }
                        >
                          {renderedCell}
                        </DataGridCell>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {footerSlot && (
          <div
            data-slot="data-grid-footer"
            className="flex items-center justify-between border-t px-3 py-2"
          >
            {footerSlot}
          </div>
        )}
      </div>
    </DataGridContext.Provider>
  );
}

type DataGridHeaderProps = {
  children?: ReactNode;
};

function DataGridHeader({ children }: DataGridHeaderProps) {
  return <>{children}</>;
}

type DataGridFooterProps = {
  children?: ReactNode;
};

function DataGridFooter({ children }: DataGridFooterProps) {
  return <>{children}</>;
}

type DataGridTitleProps = {
  children?: ReactNode;
  className?: string;
};

const DataGridTitle = forwardRef<ComponentRef<'div'>, DataGridTitleProps>(
  function DataGridTitle({ children, className }, ref) {
    if (!children) return null;
    return (
      <div
        ref={ref}
        className={cn(
          'truncate text-lg font-medium text-foreground',
          className
        )}
      >
        {children}
      </div>
    );
  }
);
DataGridTitle.displayName = 'DataGridTitle';

type DataGridSubtitleProps = {
  children?: ReactNode;
  className?: string;
};

const DataGridSubtitle = forwardRef<ComponentRef<'div'>, DataGridSubtitleProps>(
  function DataGridSubtitle({ children, className }, ref) {
    if (!children) return null;
    return (
      <div
        ref={ref}
        className={cn('truncate text-sm text-muted-foreground', className)}
      >
        {children}
      </div>
    );
  }
);
DataGridSubtitle.displayName = 'DataGridSubtitle';

type DataGridSearchProps = Omit<
  ComponentProps<typeof InputGroupInput>,
  'value' | 'onChange'
> & {
  value?: string;
  onValueChange?: (value: string) => void;
};

const DataGridSearch = forwardRef<
  ComponentRef<typeof InputGroupInput>,
  DataGridSearchProps
>(function DataGridSearch(
  { className, value, onValueChange, placeholder = 'Search', ...props },
  ref
) {
  return (
    <InputGroup
      data-slot="data-grid-search"
      className={cn(
        'h-7 w-60 min-w-40 max-w-full self-end rounded-md border-muted-background bg-muted-background shadow-none has-[[data-slot=input-group-control]:focus-visible]:bg-background',
        className
      )}
    >
      <InputGroupAddon
        align="inline-start"
        className="px-2 text-muted-foreground [&>svg:not([class*='size-'])]:size-4"
      >
        <IconSearch />
      </InputGroupAddon>
      <InputGroupInput
        ref={ref}
        value={value}
        onChange={(event) => onValueChange?.(event.target.value)}
        placeholder={placeholder}
        className="h-7 text-sm text-muted-foreground placeholder:text-muted-foreground"
        {...props}
      />
    </InputGroup>
  );
});
DataGridSearch.displayName = 'DataGridSearch';

type DataGridHeaderActionsProps = {
  children?: ReactNode;
  className?: string;
};

const DataGridHeaderActions = forwardRef<
  ComponentRef<'div'>,
  DataGridHeaderActionsProps
>(function DataGridHeaderActions({ children, className }, ref) {
  if (!children) return null;
  return (
    <div
      ref={ref}
      data-slot="data-grid-header-actions"
      className={cn('flex self-end items-end gap-2', className)}
    >
      {children}
    </div>
  );
});
DataGridHeaderActions.displayName = 'DataGridHeaderActions';

type NormalizedDataGridHeader = {
  title: ReactNode;
  subtitle: ReactNode;
  hasSearch: boolean;
  searchPlaceholder: string;
  actions: ReactNode;
  hasHeaderContent: boolean;
};

const EMPTY_HEADER: NormalizedDataGridHeader = {
  title: null,
  subtitle: null,
  hasSearch: false,
  searchPlaceholder: 'Search…',
  actions: null,
  hasHeaderContent: false,
};

const SLOT_COMPONENT_NAMES = {
  header: 'DataGridHeader',
  footer: 'DataGridFooter',
  title: 'DataGridTitle',
  subtitle: 'DataGridSubtitle',
  search: 'DataGridSearch',
  headerActions: 'DataGridHeaderActions',
} as const;

function getAriaSort(sortDirection: false | 'asc' | 'desc', canSort: boolean) {
  if (sortDirection === 'asc') return 'ascending' as const;
  if (sortDirection === 'desc') return 'descending' as const;
  return canSort ? ('none' as const) : undefined;
}

function isComponentMatch<TProps>(
  element: ReactNode,
  component: (props: TProps) => ReactNode,
  componentName: string
) {
  if (!isValidElement(element)) return false;
  if (element.type === component) return true;

  if (typeof element.type === 'function') {
    const typeWithDisplayName = element.type as {
      name?: string;
      displayName?: string;
    };
    return (
      typeWithDisplayName.name === componentName ||
      typeWithDisplayName.displayName === componentName
    );
  }

  if (typeof element.type === 'object' && element.type !== null) {
    const typeWithDisplayName = element.type as {
      displayName?: string;
    };
    const displayName =
      typeof typeWithDisplayName.displayName === 'string'
        ? typeWithDisplayName.displayName
        : undefined;
    return displayName === componentName;
  }

  return false;
}

function isHeaderSlot(node: ReactNode) {
  return isComponentMatch(node, DataGridHeader, SLOT_COMPONENT_NAMES.header);
}

function isFooterSlot(node: ReactNode) {
  return isComponentMatch(node, DataGridFooter, SLOT_COMPONENT_NAMES.footer);
}

function isTitleSlot(node: ReactNode) {
  return isComponentMatch(node, DataGridTitle, SLOT_COMPONENT_NAMES.title);
}

function isSubtitleSlot(node: ReactNode) {
  return isComponentMatch(
    node,
    DataGridSubtitle,
    SLOT_COMPONENT_NAMES.subtitle
  );
}

function isSearchSlot(node: ReactNode) {
  return isComponentMatch(node, DataGridSearch, SLOT_COMPONENT_NAMES.search);
}

function isHeaderActionsSlot(node: ReactNode) {
  return isComponentMatch(
    node,
    DataGridHeaderActions,
    SLOT_COMPONENT_NAMES.headerActions
  );
}

function getTextValue(value: unknown) {
  if (typeof value === 'string' || typeof value === 'number') {
    return String(value);
  }
  return undefined;
}

function collectCustomCellColumnIds<TData>(columns: ColumnDef<TData>[]) {
  const ids = new Set<string>();

  const visit = (defs: ColumnDef<TData>[]) => {
    for (const def of defs) {
      const groupColumns =
        'columns' in def
          ? (def.columns as ColumnDef<TData>[] | undefined)
          : undefined;

      if (groupColumns?.length) {
        visit(groupColumns);
        continue;
      }

      const hasOwnCellRenderer = Object.prototype.hasOwnProperty.call(
        def,
        'cell'
      );
      if (!hasOwnCellRenderer) continue;

      if ('id' in def && typeof def.id === 'string') {
        ids.add(def.id);
        continue;
      }

      if ('accessorKey' in def && typeof def.accessorKey === 'string') {
        ids.add(def.accessorKey);
      }
    }
  };

  visit(columns);
  return ids;
}

function normalizeDataGridHeader(header: ReactNode): NormalizedDataGridHeader {
  if (
    !isValidElement<{ children?: ReactNode }>(header) ||
    !isHeaderSlot(header)
  ) {
    return EMPTY_HEADER;
  }

  let title: ReactNode = null;
  let subtitle: ReactNode = null;
  let hasSearch = false;
  let searchPlaceholder = 'Search…';
  let actions: ReactNode = null;

  Children.forEach(header.props.children, (child) => {
    if (!isValidElement(child)) return;

    if (isTitleSlot(child)) {
      title = title ?? child;
      return;
    }

    if (isSubtitleSlot(child)) {
      subtitle = subtitle ?? child;
      return;
    }

    if (isSearchSlot(child)) {
      if (!hasSearch) {
        hasSearch = true;
        const props = child.props as DataGridSearchProps;
        if (props.placeholder) searchPlaceholder = props.placeholder;
      }
      return;
    }

    if (isHeaderActionsSlot(child)) {
      actions = actions ?? child;
    }
  });

  return {
    title,
    subtitle,
    hasSearch,
    searchPlaceholder,
    actions,
    hasHeaderContent: Boolean(title || subtitle || hasSearch || actions),
  };
}

function resolveDataGridSlots(
  children: ReactNode,
  headerProp: ReactNode,
  footerProp: ReactNode
) {
  let headerSlot = headerProp;
  let footerSlot = footerProp;

  Children.forEach(children, (child) => {
    if (!isValidElement<{ children?: ReactNode }>(child)) return;

    if (headerSlot == null && isHeaderSlot(child)) {
      headerSlot = child;
    } else if (footerSlot == null && isFooterSlot(child)) {
      footerSlot = child.props.children ?? null;
    }
  });

  return { headerSlot, footerSlot };
}

type DataGridCellProps = ComponentProps<'div'> & {
  isPinned?: boolean;
  isLastPinned?: boolean;
  colIndex?: number;
  textValue?: string;
  truncate?: boolean;
};

const DataGridCell = forwardRef<ComponentRef<'div'>, DataGridCellProps>(
  function DataGridCell(
    {
      className,
      children,
      isPinned,
      isLastPinned,
      colIndex,
      textValue,
      truncate: shouldTruncate = true,
      style,
      ...props
    },
    ref
  ) {
    return (
      <div
        ref={ref}
        data-slot="data-grid-cell"
        role="gridcell"
        aria-colindex={colIndex}
        title={textValue}
        className={cn(
          'flex items-center px-3 text-sm font-normal',
          'min-w-0',
          isPinned && 'sticky z-10 bg-inherit',
          isLastPinned &&
            'relative after:pointer-events-none after:absolute after:inset-y-0 after:left-full after:w-2 after:content-[""] after:bg-linear-to-r after:from-border after:to-transparent after:opacity-70',
          className
        )}
        style={style}
        {...props}
      >
        {shouldTruncate && textValue !== undefined ? (
          <span className="block min-w-0 flex-1 truncate">{textValue}</span>
        ) : (
          children
        )}
      </div>
    );
  }
);
DataGridCell.displayName = 'DataGridCell';

function DataGridCheckboxHeader<TData>({
  table,
}: {
  table: ReturnType<typeof useReactTable<TData>>;
}) {
  const allSelected = table.getIsAllPageRowsSelected();
  const someSelected = table.getIsSomePageRowsSelected();

  const checked = allSelected ? true : someSelected ? 'indeterminate' : false;

  return (
    <Checkbox
      checked={checked}
      onCheckedChange={(next) => table.toggleAllPageRowsSelected(next === true)}
      aria-label="Select all rows"
    />
  );
}

function DataGridCheckboxCell<TData>({ row }: { row: Row<TData> }) {
  return (
    <Checkbox
      checked={row.getIsSelected()}
      disabled={!row.getCanSelect()}
      onCheckedChange={(next) => row.toggleSelected(next === true)}
      aria-label="Select row"
    />
  );
}

function useDataGridContext() {
  return useContext(DataGridContext);
}

export {
  DataGrid,
  DataGridCell,
  DataGridCheckboxCell,
  DataGridCheckboxHeader,
  DataGridFooter,
  DataGridHeader,
  DataGridHeaderActions,
  DataGridSearch,
  DataGridSubtitle,
  DataGridTitle,
  useDataGridContext,
};
