import {
  IconArrowDown,
  IconChevronRight,
  IconSearch,
} from '@tabler/icons-react';
import {
  type ColumnDef,
  type ColumnPinningState,
  type ExpandedState,
  type FilterFnOption,
  type PaginationState,
  type Row,
  type RowSelectionState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
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
  type RefObject,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';

import { useControllableState } from '../../../../lib/use-controllable-state';
import { cn, focusState } from '../../../../lib/utils';
import { Button } from '../button';
import { Checkbox } from '../checkbox';
import { InputGroup, InputGroupAddon, InputGroupInput } from '../input-group';

type DataGridContextValue = {
  gridTemplateColumns: string;
  pinnedColumnIds: Set<string>;
  columnCount: number;
};

// Context keeps shared layout data centralized so leaf components can stay mostly presentational.
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

type DataGridHandle = {
  scrollToRow: (index: number) => void;
  resetSorting: () => void;
  resetSelection: () => void;
  resetSearch: () => void;
};

type DataGridProps<TData> = {
  data: TData[];
  columns: ColumnDef<TData>[];
  getRowId?: (originalRow: TData, index: number) => string;
  rowCount?: number;
  globalFilterFn?: FilterFnOption<TData>;
  enableRowSelection?: boolean | ((row: Row<TData>) => boolean);
  enableSorting?: boolean;
  manualPagination?: boolean;
  manualSorting?: boolean;
  rowSelection?: RowSelectionState;
  defaultRowSelection?: RowSelectionState;
  onRowSelectionChange?: (value: RowSelectionState) => void;
  sorting?: SortingState;
  defaultSorting?: SortingState;
  onSortingChange?: (value: SortingState) => void;
  pagination?: PaginationState;
  defaultPagination?: PaginationState;
  onPaginationChange?: (value: PaginationState) => void;
  getSubRows?: (row: TData, index: number) => TData[] | undefined;
  expanded?: ExpandedState;
  defaultExpanded?: ExpandedState;
  onExpandedChange?: (value: ExpandedState) => void;
  getRowCanExpand?: (row: Row<TData>) => boolean;
  maxDepth?: number;
  pinnedColumns?: string[];
  gridRef?: RefObject<DataGridHandle | null>;
  size?: DataGridSize;
  header?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  className?: string;
  onRowClick?: (row: Row<TData>) => void;
  searchValue?: string;
  defaultSearchValue?: string;
  onSearchValueChange?: (value: string) => void;
  rowHeight?: number;
  headerHeight?: number;
  estimateSize?: number;
};

function DataGrid<TData>({
  data,
  columns,
  getRowId,
  rowCount,
  globalFilterFn = 'auto',
  enableRowSelection = false,
  enableSorting = false,
  manualPagination = false,
  manualSorting = false,
  rowSelection,
  defaultRowSelection,
  onRowSelectionChange,
  sorting,
  defaultSorting,
  onSortingChange,
  pagination,
  defaultPagination,
  onPaginationChange,
  getSubRows,
  expanded,
  defaultExpanded,
  onExpandedChange,
  getRowCanExpand,
  maxDepth = 5,
  pinnedColumns = [],
  gridRef,
  size = 'default',
  header,
  footer,
  children,
  className,
  onRowClick,
  searchValue,
  defaultSearchValue,
  onSearchValueChange,
  rowHeight,
  headerHeight,
  estimateSize,
}: DataGridProps<TData>) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // We standardize feature state through useControllableState for consistency.
  // Alternative considered: keep mixed patterns (some TanStack-managed, some local state),
  // but this became harder to reason about as features were added.
  const [resolvedSearchValue, setResolvedSearchValue] = useControllableState({
    prop: searchValue,
    defaultProp: defaultSearchValue ?? '',
    onChange: onSearchValueChange,
  });

  const [resolvedSorting, setResolvedSorting] =
    useControllableState<SortingState>({
      prop: sorting,
      defaultProp: defaultSorting ?? [],
      onChange: onSortingChange,
    });

  const [resolvedRowSelection, setResolvedRowSelection] =
    useControllableState<RowSelectionState>({
      prop: rowSelection,
      defaultProp: defaultRowSelection ?? {},
      onChange: onRowSelectionChange,
    });

  // Pagination is optional in this grid, so we only activate pagination state/model when opted in.
  const hasPagination =
    pagination !== undefined || defaultPagination !== undefined;

  const [resolvedPagination, setResolvedPagination] =
    useControllableState<PaginationState>({
      prop: pagination,
      defaultProp: defaultPagination ?? { pageIndex: 0, pageSize: 10 },
      onChange: onPaginationChange,
    });

  const hasExpanding = getSubRows !== undefined;

  const [resolvedExpanded, setResolvedExpanded] =
    useControllableState<ExpandedState>({
      prop: expanded,
      defaultProp: defaultExpanded ?? {},
      onChange: onExpandedChange,
    });

  const isClientSorting = enableSorting && !manualSorting;
  const isClientPagination = hasPagination && !manualPagination;

  // Cross-feature rule: changing search resets back to the first page.
  // We isolate this side effect into a named hook to keep table setup declarative.
  useSearchPaginationReset(
    resolvedSearchValue,
    hasPagination,
    setResolvedPagination
  );

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

  // Header/footer can be passed as props or as composition children.
  // We currently support both for flexibility during migration.
  const { headerSlot, footerSlot } = useMemo(
    () => resolveDataGridSlots(children, header, footer),
    [children, footer, header]
  );

  const normalizedHeader = useMemo(
    () => normalizeDataGridHeader(headerSlot),
    [headerSlot]
  );

  const searchPlaceholder = normalizedHeader.searchPlaceholder;

  // Centralized TanStack config. Keeping all state in one object makes ownership explicit.
  const table = useReactTable({
    data,
    columns,
    state: {
      columnPinning,
      globalFilter: resolvedSearchValue,
      sorting: resolvedSorting,
      rowSelection: resolvedRowSelection,
      ...(hasPagination ? { pagination: resolvedPagination } : {}),
      ...(hasExpanding ? { expanded: resolvedExpanded } : {}),
    },
    onSortingChange: setResolvedSorting,
    onRowSelectionChange: setResolvedRowSelection,
    ...(hasPagination ? { onPaginationChange: setResolvedPagination } : {}),
    ...(hasExpanding ? { onExpandedChange: setResolvedExpanded } : {}),
    autoResetPageIndex: false,
    autoResetExpanded: false,
    enableRowSelection,
    enableSorting,
    manualPagination,
    manualSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn,
    ...(isClientSorting ? { getSortedRowModel: getSortedRowModel() } : {}),
    ...(isClientPagination
      ? { getPaginationRowModel: getPaginationRowModel() }
      : {}),
    ...(hasExpanding ? { getExpandedRowModel: getExpandedRowModel() } : {}),
    getRowId,
    rowCount,
    getSubRows,
    getRowCanExpand,
  });

  const { rows } = table.getRowModel();
  const headerGroups = table.getHeaderGroups();
  const allColumns = table.getAllColumns();

  const resolvedRowHeight = estimateSize ?? rowHeight ?? ROW_HEIGHT_MAP[size];
  const resolvedHeaderHeight = headerHeight ?? HEADER_HEIGHT_MAP[size];

  // We use row virtualization for large datasets; this keeps DOM size stable.
  // Cogs relies on MUI DataGrid's internal virtualization, while here we own the behavior directly.
  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollContainerRef.current,
    estimateSize: () => resolvedRowHeight,
    overscan: 10,
  });

  // Exposes a minimal imperative API for common workflows.
  // Improvement opportunity: add read accessors and column operations if consumers request parity with Cogs apiRef.
  useImperativeHandle(gridRef, () => ({
    scrollToRow: (index: number) => virtualizer.scrollToIndex(index),
    resetSorting: () => setResolvedSorting([]),
    resetSelection: () => setResolvedRowSelection({}),
    resetSearch: () => setResolvedSearchValue(''),
  }));

  // We resolve one CSS grid template string for both header and rows to keep column alignment exact.
  // Another option would be per-column inline styles everywhere, but that is harder to maintain.
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

  // Precompute left offsets for pinned columns once per render cycle.
  // This avoids repeating cumulative width calculations for every cell/header.
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
                    onValueChange={setResolvedSearchValue}
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
            {/* Header rows stay sticky while the virtualized body scrolls underneath. */}
            {headerGroups.map((headerGroup, headerRowIndex) => (
              <div
                key={headerGroup.id}
                data-slot="data-grid-header-row"
                role="row"
                aria-rowindex={headerRowIndex + 1}
                className={cn(
                  'sticky z-20 grid bg-background',
                  headerRowIndex === 0 ? 'border-y' : 'border-b'
                )}
                style={{
                  top: headerRowIndex * resolvedHeaderHeight,
                  gridTemplateColumns,
                  minHeight: resolvedHeaderHeight,
                }}
              >
                {headerGroup.headers.map((header) => {
                  const isLeafHeader = header.colSpan === 1;
                  const isPinned =
                    isLeafHeader && pinnedColumnIds.has(header.column.id);
                  const isLastPinned =
                    isPinned && lastPinnedColumnId === header.column.id;
                  const sortDirection = header.column.getIsSorted();
                  const canSort = isLeafHeader && header.column.getCanSort();
                  const isGroupedHeader = header.colSpan > 1;
                  const renderedHeader = header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      );
                  const isPlainTextHeader =
                    typeof renderedHeader === 'string' ||
                    typeof renderedHeader === 'number';

                  return (
                    <div
                      key={header.id}
                      data-slot="data-grid-column-header"
                      role="columnheader"
                      aria-colindex={header.index + 1}
                      aria-colspan={
                        header.colSpan > 1 ? header.colSpan : undefined
                      }
                      aria-sort={getAriaSort(sortDirection, canSort)}
                      className={cn(
                        'flex items-center px-3 text-left text-sm font-medium text-muted-foreground',
                        isGroupedHeader &&
                          'justify-center text-base font-semibold text-foreground/70',
                        header.isPlaceholder && 'pointer-events-none',
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
                      style={{
                        gridColumn: `span ${header.colSpan} / span ${header.colSpan}`,
                        ...(isPinned
                          ? {
                              position: 'sticky',
                              left:
                                pinnedLeftByColumnId.get(header.column.id) ?? 0,
                              zIndex: 10,
                            }
                          : {}),
                      }}
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
                      <div className="flex min-w-0 flex-1 items-center gap-1">
                        {isPlainTextHeader ? (
                          <span className="block min-w-0 truncate">
                            {renderedHeader}
                          </span>
                        ) : (
                          renderedHeader
                        )}
                        {(sortDirection === 'asc' ||
                          sortDirection === 'desc') && (
                          <Button
                            size="icon-sm"
                            variant="ghost"
                            className="pointer-events-none size-4 rounded-sm p-0"
                            tabIndex={-1}
                            aria-hidden="true"
                          >
                            <IconArrowDown
                              className={cn(
                                'size-3.5 shrink-0',
                                sortDirection === 'asc' && 'rotate-180'
                              )}
                            />
                          </Button>
                        )}
                      </div>
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
              {/* Virtual rows: only render what is visible plus overscan. */}
              {virtualizer.getVirtualItems().map((virtualRow) => {
                const row = rows[virtualRow.index];
                const isSelected = row.getIsSelected();
                const canExpand = row.getCanExpand();
                const isRowInteractive = onRowClick || canExpand;

                const handleRowActivation = isRowInteractive
                  ? () => {
                      if (canExpand) row.toggleExpanded();
                      if (onRowClick) onRowClick(row);
                    }
                  : undefined;

                return (
                  <div
                    key={row.id}
                    data-slot="data-grid-row"
                    data-state={isSelected ? 'selected' : undefined}
                    role="row"
                    aria-rowindex={virtualRow.index + 2}
                    aria-selected={isSelected || undefined}
                    aria-expanded={canExpand ? row.getIsExpanded() : undefined}
                    className={cn(
                      'group absolute left-0 right-0 grid border-b bg-background transition-colors',
                      'hover:bg-active-muted-background',
                      isSelected && 'bg-active-muted-background',
                      isRowInteractive &&
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
                    tabIndex={isRowInteractive ? 0 : undefined}
                    onClick={handleRowActivation}
                    onKeyDown={
                      handleRowActivation
                        ? (event) => {
                            if (event.key !== 'Enter' && event.key !== ' ')
                              return;
                            event.preventDefault();
                            handleRowActivation();
                          }
                        : undefined
                    }
                  >
                    {row.getVisibleCells().map((cell, cellIndex) => {
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
                      // We truncate plain text values for readability, but avoid truncating rich JSX
                      // from custom renderers (avatars, badges, action menus, etc).
                      // Future improvement: expose per-column truncation strategy in column config.
                      const renderedTextValue = getTextValue(renderedCell);
                      const rawTextValue = getTextValue(cell.getValue());
                      const textValue =
                        renderedTextValue ??
                        (!hasCustomCellRenderer ? rawTextValue : undefined);

                      const isFirstCell = cellIndex === 0;
                      const depth = Math.min(row.depth, maxDepth);
                      const indentPx =
                        isFirstCell && depth > 0 ? depth * 16 : 0;
                      const showChevron = isFirstCell && canExpand;
                      const showChevronSpacer =
                        isFirstCell && hasExpanding && !canExpand && depth > 0;

                      const pinnedStyle: React.CSSProperties | undefined =
                        isPinned
                          ? {
                              position: 'sticky',
                              left:
                                pinnedLeftByColumnId.get(cell.column.id) ?? 0,
                              zIndex: 10,
                            }
                          : undefined;

                      const cellStyle: React.CSSProperties | undefined =
                        indentPx > 0 || pinnedStyle
                          ? {
                              ...pinnedStyle,
                              ...(indentPx > 0
                                ? { paddingInlineStart: `${indentPx + 12}px` }
                                : {}),
                            }
                          : undefined;

                      const needsTreeIndicator =
                        showChevron || showChevronSpacer;

                      return (
                        <DataGridCell
                          key={cell.id}
                          isPinned={isPinned}
                          isLastPinned={isLastPinned}
                          colIndex={cell.column.getIndex() + 1}
                          textValue={textValue}
                          truncate={
                            needsTreeIndicator ? false : textValue !== undefined
                          }
                          style={cellStyle}
                        >
                          {showChevron && (
                            <Button
                              size="icon-sm"
                              variant="ghost"
                              className="mr-2"
                              aria-label={
                                row.getIsExpanded()
                                  ? 'Collapse row'
                                  : 'Expand row'
                              }
                            >
                              <IconChevronRight
                                width={5}
                                height={8}
                                className={cn(
                                  row.getIsExpanded() && 'rotate-90'
                                )}
                                aria-hidden="true"
                              />
                            </Button>
                          )}
                          {showChevronSpacer && (
                            <span
                              className="mr-2 inline-block h-7 w-7 shrink-0"
                              aria-hidden="true"
                            />
                          )}
                          {needsTreeIndicator && textValue !== undefined ? (
                            <span className="block min-w-0 flex-1 truncate">
                              {textValue}
                            </span>
                          ) : (
                            renderedCell
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
  // Composition marker component (parsed by normalizeDataGridHeader).
  return <>{children}</>;
}

type DataGridFooterProps = {
  children?: ReactNode;
};

function DataGridFooter({ children }: DataGridFooterProps) {
  // Composition marker component (parsed by resolveDataGridSlots).
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

const SLOT_COMPONENT_NAMES: {
  header: string;
  footer: string;
  title: string;
  subtitle: string;
  search: string;
  headerActions: string;
} = {
  header: 'DataGridHeader',
  footer: 'DataGridFooter',
  title: 'DataGridTitle',
  subtitle: 'DataGridSubtitle',
  search: 'DataGridSearch',
  headerActions: 'DataGridHeaderActions',
};

function useSearchPaginationReset(
  searchValue: string,
  hasPagination: boolean,
  setPagination: (
    next: PaginationState | ((prev: PaginationState) => PaginationState)
  ) => void
) {
  // Tracks only search transitions so we do not reset on unrelated renders.
  const previousSearchValueRef = useRef(searchValue);

  useEffect(() => {
    if (previousSearchValueRef.current === searchValue) return;
    previousSearchValueRef.current = searchValue;
    if (!hasPagination) return;

    setPagination((current) =>
      current.pageIndex === 0 ? current : { ...current, pageIndex: 0 }
    );
  }, [searchValue, hasPagination, setPagination]);
}

function getAriaSort(
  sortDirection: false | 'asc' | 'desc',
  canSort: boolean
): 'ascending' | 'descending' | 'none' | undefined {
  if (sortDirection === 'asc') return 'ascending';
  if (sortDirection === 'desc') return 'descending';
  return canSort ? 'none' : undefined;
}

function isComponentMatch<TProps>(
  element: ReactNode,
  component: (props: TProps) => ReactNode,
  componentName: string
) {
  // We match by reference first, then by name/displayName fallback.
  // This reduces brittleness during Storybook HMR or wrapped component scenarios.
  if (!isValidElement(element)) return false;
  if (element.type === component) return true;

  const elementType: unknown = element.type;

  if (typeof elementType === 'function') {
    const displayName =
      'displayName' in elementType &&
      typeof elementType.displayName === 'string'
        ? elementType.displayName
        : undefined;
    return elementType.name === componentName || displayName === componentName;
  }

  if (typeof elementType === 'object' && elementType !== null) {
    const displayName =
      'displayName' in elementType &&
      typeof elementType.displayName === 'string'
        ? elementType.displayName
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

  // Walk nested/grouped column defs so custom cell detection also works for grouped columns.
  const visit = (defs: ColumnDef<TData>[]) => {
    for (const def of defs) {
      if (hasNestedColumns(def)) {
        visit(def.columns);
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
  // Turns free-form header composition into a predictable, typed shape used by main render.
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
    if (!isValidElement<{ placeholder?: string }>(child)) return;

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
        const placeholder = child.props.placeholder;
        if (typeof placeholder === 'string') {
          searchPlaceholder = placeholder;
        }
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

function hasNestedColumns<TData>(
  def: ColumnDef<TData>
): def is ColumnDef<TData> & { columns: ColumnDef<TData>[] } {
  return 'columns' in def && Array.isArray(def.columns);
}

function resolveDataGridSlots(
  children: ReactNode,
  headerProp: ReactNode,
  footerProp: ReactNode
) {
  // Supports both prop-driven and child-driven slot APIs; props win when both are provided.
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
    // Keep cell wrapper generic and reusable; most behavior comes from resolved props.
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
  // Mirrors TanStack's all/some selection state into checkbox tri-state.
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
  // Row-level selection primitive used by selection-enabled column definitions.
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
  type DataGridHandle,
  type ExpandedState,
};
