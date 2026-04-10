import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import {
  type ColumnDef,
  type ColumnPinningState,
  type OnChangeFn,
  type PaginationState,
  type Row,
  type RowSelectionState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { type VariantProps, cva } from 'class-variance-authority';
import {
  type CSSProperties,
  type ComponentProps,
  type ReactNode,
  createContext,
  useContext,
  useMemo,
  useRef,
} from 'react';

import { cn } from '../../../../lib/utils';
import { Checkbox } from '../checkbox';

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
  default: 44,
  compact: 36,
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
  onRowClick?: (row: Row<TData>) => void;
  footer?: ReactNode;
  getRowId?: (originalRow: TData, index: number) => string;
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
  onRowClick,
  footer,
  getRowId,
  estimateSize,
}: DataGridProps<TData>) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const columnPinning: ColumnPinningState = useMemo(
    () => ({ left: pinnedColumns, right: [] }),
    [pinnedColumns]
  );

  const pinnedColumnIds = useMemo(
    () => new Set(pinnedColumns),
    [pinnedColumns]
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      columnPinning,
      ...(rowSelection !== undefined ? { rowSelection } : {}),
      ...(sorting !== undefined ? { sorting } : {}),
      ...(pagination !== undefined ? { pagination } : {}),
    },
    ...(onRowSelectionChange ? { onRowSelectionChange } : {}),
    ...(onSortingChange ? { onSortingChange } : {}),
    ...(onPaginationChange ? { onPaginationChange } : {}),
    enableRowSelection,
    enableSorting,
    manualPagination,
    manualSorting,
    getCoreRowModel: getCoreRowModel(),
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

  const rowHeight = estimateSize ?? ROW_HEIGHT_MAP[size];
  const headerHeight = HEADER_HEIGHT_MAP[size];

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollContainerRef.current,
    estimateSize: () => rowHeight,
    overscan: 10,
  });

  const gridTemplateColumns = useMemo(() => {
    const hasFlexibleColumn = allColumns.some((col) => {
      return col.columnDef.size === undefined;
    });

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
          'relative flex h-full min-h-0 w-full flex-col border-y bg-default text-sm',
          dataGridVariants({ size, striped }),
          className
        )}
      >
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
                className={cn(
                  'sticky top-0 z-20 grid border-b bg-background',
                  size === 'compact' ? 'min-h-8' : 'min-h-9'
                )}
                style={{
                  gridTemplateColumns,
                  minHeight: headerHeight,
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
                        'flex items-center px-3 text-left text-sm font-medium text-primary truncate',
                        isPinned && 'sticky left-0 z-10 bg-background',
                        isLastPinned &&
                          'shadow-[2px_0_4px_-2px_rgba(0,0,0,0.1)]',
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
                          <span className="truncate">{renderedHeader}</span>
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
                      'absolute left-0 right-0 grid border-b transition-colors',
                      'hover:bg-muted/30',
                      isSelected && 'bg-muted',
                      striped && isEvenRow && !isSelected && 'bg-muted/50',
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

                      return (
                        <DataGridCell
                          key={cell.id}
                          isPinned={isPinned}
                          isLastPinned={isLastPinned}
                          isSelected={isSelected}
                          isEvenRow={striped && isEvenRow}
                          colIndex={cell.column.getIndex() + 1}
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

        {footer && (
          <div
            data-slot="data-grid-footer"
            className="flex items-center justify-between border-t px-3 py-2"
          >
            {footer}
          </div>
        )}
      </div>
    </DataGridContext.Provider>
  );
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
};

function DataGridCell({
  className,
  children,
  isPinned,
  isLastPinned,
  isSelected,
  isEvenRow,
  colIndex,
  style,
  ...props
}: DataGridCellProps) {
  const titleValue = useMemo(() => {
    if (typeof children === 'string' || typeof children === 'number') {
      return String(children);
    }
    return undefined;
  }, [children]);

  return (
    <div
      data-slot="data-grid-cell"
      role="gridcell"
      aria-colindex={colIndex}
      title={titleValue}
      className={cn(
        'flex items-center px-3 text-sm font-normal truncate',
        isPinned && 'sticky z-10 bg-background dark:bg-background',
        isPinned && isEvenRow && !isSelected && 'bg-muted/50',
        isPinned && isSelected && 'bg-muted',
        isLastPinned && 'shadow-[2px_0_4px_-2px_rgba(0,0,0,0.1)]',
        className
      )}
      style={style}
      {...props}
    >
      {children}
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
  useDataGridContext,
};
