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
import { type VariantProps, cva } from 'class-variance-authority';
import {
  type CSSProperties,
  Children,
  type ComponentProps,
  type ReactNode,
  createContext,
  isValidElement,
  useCallback,
  useEffect,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';

import { cn } from '../../../../lib/utils';
import { Checkbox } from '../checkbox';
import { InputGroup, InputGroupAddon, InputGroupInput } from '../input-group';

const dataGridVariants = cva('', {
  variants: {
    size: {
      default: '',
      compact: '',
    },
    striped: {
      true: '',
      false: '',
    },
  },
  defaultVariants: {
    size: 'default',
    striped: true,
  },
});

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
  striped?: boolean;
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
} & VariantProps<typeof dataGridVariants>;

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
  striped = true,
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

  const columnPinning: ColumnPinningState = useMemo(
    () => ({ left: pinnedColumns, right: [] }),
    [pinnedColumns]
  );

  const pinnedColumnIds = useMemo(
    () => new Set(pinnedColumns),
    [pinnedColumns]
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

  const { headerSlot, footerSlot } = useMemo(
    () => resolveDataGridSlots(children, header, footer),
    [children, footer, header]
  );

  const normalizedHeader = useMemo(
    () => normalizeDataGridHeader(headerSlot),
    [headerSlot]
  );

  useEffect(() => {
    if (previousSearchValueRef.current === resolvedSearchValue) return;
    previousSearchValueRef.current = resolvedSearchValue;
    if (!pagination || !onPaginationChange || pagination.pageIndex === 0) {
      return;
    }

    onPaginationChange((current) =>
      current.pageIndex === 0 ? current : { ...current, pageIndex: 0 }
    );
  }, [onPaginationChange, pagination?.pageIndex, resolvedSearchValue]);

  const searchPlaceholder = normalizedHeader.searchPlaceholder;

  const table = useReactTable({
    data,
    columns,
    state: {
      columnPinning,
      globalFilter: resolvedSearchValue,
      ...(rowSelection !== undefined ? { rowSelection } : {}),
      ...(sorting !== undefined ? { sorting } : {}),
      ...(pagination !== undefined ? { pagination } : {}),
    },
    ...(onRowSelectionChange ? { onRowSelectionChange } : {}),
    ...(onSortingChange ? { onSortingChange } : {}),
    ...(onPaginationChange ? { onPaginationChange } : {}),
    autoResetPageIndex: false,
    autoResetExpanded: false,
    enableRowSelection,
    enableSorting,
    manualPagination,
    manualSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn,
    ...(enableSorting && !manualSorting
      ? { getSortedRowModel: getSortedRowModel() }
      : {}),
    ...(pagination && !manualPagination
      ? { getPaginationRowModel: getPaginationRowModel() }
      : {}),
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
          dataGridVariants({ size, striped }),
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
                    isPinned &&
                    pinnedColumns[pinnedColumns.length - 1] ===
                      header.column.id;
                  const sortDirection = header.column.getIsSorted();

                  return (
                    <div
                      key={header.id}
                      data-slot="data-grid-column-header"
                      role="columnheader"
                      aria-colindex={header.index + 1}
                      aria-sort={
                        sortDirection === 'asc'
                          ? 'ascending'
                          : sortDirection === 'desc'
                            ? 'descending'
                            : header.column.getCanSort()
                              ? 'none'
                              : undefined
                      }
                      className={cn(
                        'flex items-center px-3 text-left text-sm font-medium text-muted-foreground',
                        isPinned && 'sticky left-0 z-10 bg-background',
                        isLastPinned &&
                          'relative after:pointer-events-none after:absolute after:inset-y-0 after:left-full after:w-2 after:content-[""] after:bg-linear-to-r after:from-border after:to-transparent after:opacity-70',
                        header.column.getCanSort() &&
                          'cursor-pointer select-none hover:bg-muted/60'
                      )}
                      style={
                        isPinned
                          ? getPinnedColumnStyle(
                              header.column.id,
                              pinnedColumns,
                              allColumns
                            )
                          : undefined
                      }
                      onClick={
                        header.column.getCanSort()
                          ? header.column.getToggleSortingHandler()
                          : undefined
                      }
                    >
                      {(() => {
                        if (header.isPlaceholder) return null;
                        const renderedHeader = flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        );
                        return typeof renderedHeader === 'string' ||
                          typeof renderedHeader === 'number' ? (
                          <span className="block min-w-0 flex-1 truncate">
                            {renderedHeader}
                          </span>
                        ) : (
                          renderedHeader
                        );
                      })()}
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
                const isEvenRow = virtualRow.index % 2 === 1;

                return (
                  <div
                    key={row.id}
                    data-slot="data-grid-row"
                    data-state={isSelected ? 'selected' : undefined}
                    role="row"
                    aria-rowindex={virtualRow.index + 2}
                    aria-selected={isSelected || undefined}
                    className={cn(
                      'group absolute left-0 right-0 grid border-b transition-colors',
                      'hover:bg-muted/30',
                      isSelected && 'bg-active-muted-background',
                      onRowClick && 'cursor-pointer'
                    )}
                    style={{
                      gridTemplateColumns,
                      height: virtualRow.size,
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                  >
                    {row.getVisibleCells().map((cell) => {
                      const isPinned = pinnedColumnIds.has(cell.column.id);
                      const isLastPinned =
                        isPinned &&
                        pinnedColumns[pinnedColumns.length - 1] ===
                          cell.column.id;
                      const rawCellValue = cell.getValue();
                      const isTextCellValue =
                        typeof rawCellValue === 'string' ||
                        typeof rawCellValue === 'number';

                      return (
                        <DataGridCell
                          key={cell.id}
                          isPinned={isPinned}
                          isLastPinned={isLastPinned}
                          isSelected={isSelected}
                          isEvenRow={striped && isEvenRow}
                          colIndex={cell.column.getIndex() + 1}
                          textValue={
                            isTextCellValue ? String(rawCellValue) : undefined
                          }
                          truncate={isTextCellValue}
                          style={
                            isPinned
                              ? getPinnedColumnStyle(
                                  cell.column.id,
                                  pinnedColumns,
                                  allColumns
                                )
                              : undefined
                          }
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
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

function DataGridTitle({ children, className }: DataGridTitleProps) {
  if (!children) return null;
  return (
    <div
      className={cn('truncate text-lg font-medium text-foreground', className)}
    >
      {children}
    </div>
  );
}

type DataGridSubtitleProps = {
  children?: ReactNode;
  className?: string;
};

function DataGridSubtitle({ children, className }: DataGridSubtitleProps) {
  if (!children) return null;
  return (
    <div className={cn('truncate text-sm text-muted-foreground', className)}>
      {children}
    </div>
  );
}

type DataGridSearchProps = Omit<
  ComponentProps<typeof InputGroupInput>,
  'value' | 'onChange'
> & {
  value?: string;
  onValueChange?: (value: string) => void;
};

function DataGridSearch({
  className,
  value,
  onValueChange,
  placeholder = 'Search',
  ...props
}: DataGridSearchProps) {
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
        value={value}
        onChange={(event) => onValueChange?.(event.target.value)}
        placeholder={placeholder}
        className="h-7 text-sm text-muted-foreground placeholder:text-muted-foreground"
        {...props}
      />
    </InputGroup>
  );
}

type DataGridHeaderActionsProps = {
  children?: ReactNode;
  className?: string;
};

function DataGridHeaderActions({
  children,
  className,
}: DataGridHeaderActionsProps) {
  if (!children) return null;
  return (
    <div
      data-slot="data-grid-header-actions"
      className={cn('flex self-end items-end gap-2', className)}
    >
      {children}
    </div>
  );
}

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

function normalizeDataGridHeader(header: ReactNode): NormalizedDataGridHeader {
  if (!isValidElement<{ children?: ReactNode }>(header)) {
    return EMPTY_HEADER;
  }

  if (header.type !== DataGridHeader) {
    return EMPTY_HEADER;
  }

  let title: ReactNode = null;
  let subtitle: ReactNode = null;
  let hasSearch = false;
  let searchPlaceholder = 'Search…';
  let actions: ReactNode = null;

  Children.forEach(header.props.children, (child) => {
    if (!isValidElement(child)) return;

    if (child.type === DataGridTitle) {
      title = title ?? child;
      return;
    }

    if (child.type === DataGridSubtitle) {
      subtitle = subtitle ?? child;
      return;
    }

    if (child.type === DataGridSearch) {
      if (!hasSearch) {
        hasSearch = true;
        const props = child.props as DataGridSearchProps;
        if (props.placeholder) searchPlaceholder = props.placeholder;
      }
      return;
    }

    if (child.type === DataGridHeaderActions) {
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

    if (child.type === DataGridHeader && headerSlot == null) {
      headerSlot = child;
      return;
    }

    if (child.type === DataGridFooter && footerSlot == null) {
      footerSlot = child.props.children ?? null;
    }
  });

  return { headerSlot, footerSlot };
}

function getPinnedColumnStyle(
  columnId: string,
  pinnedColumns: string[],
  allColumns: {
    id: string;
    getSize: () => number;
    columnDef: { size?: number };
  }[]
): CSSProperties {
  const pinnedIndex = pinnedColumns.indexOf(columnId);
  if (pinnedIndex <= 0) return { position: 'sticky', left: 0, zIndex: 10 };

  let left = 0;
  for (let i = 0; i < pinnedIndex; i++) {
    const col = allColumns.find((c) => c.id === pinnedColumns[i]);
    if (col) {
      left += col.columnDef.size ?? 120;
    }
  }

  return { position: 'sticky', left, zIndex: 10 };
}

type DataGridCellProps = ComponentProps<'div'> & {
  isPinned?: boolean;
  isLastPinned?: boolean;
  isSelected?: boolean;
  isEvenRow?: boolean;
  colIndex?: number;
  textValue?: string;
  truncate?: boolean;
};

function DataGridCell({
  className,
  children,
  isPinned,
  isLastPinned,
  isSelected,
  isEvenRow,
  colIndex,
  textValue,
  truncate: shouldTruncate = true,
  style,
  ...props
}: DataGridCellProps) {
  return (
    <div
      data-slot="data-grid-cell"
      role="gridcell"
      aria-colindex={colIndex}
      title={textValue}
      className={cn(
        'flex items-center px-3 text-sm font-normal',
        'min-w-0',
        isPinned &&
          !isSelected &&
          'sticky z-10 bg-background group-hover:bg-muted',
        isPinned && isSelected && 'bg-active-muted-background',
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
