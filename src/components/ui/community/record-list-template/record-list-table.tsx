import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  CheckboxItem,
  CheckboxItemControl,
  CheckboxItemLabel,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@cognite/aura/components';
import { DataGrid } from '@cognite/aura/data-grid';
import { IconDotsVertical } from '@tabler/icons-react';
import type { ColumnDef } from '@tanstack/react-table';
import { type ReactNode, useMemo } from 'react';

import {
  formatRecordListDate,
  recordListOwners,
  recordListStatuses,
  type RecordListSampleRow,
} from './record-list-template.data';
import { RecordListTrend, recordListTrendColor } from './record-list-trend';

function RecordListTable({
  rows,
  selectedIds,
  selectedRowId,
  showCheckboxes,
  onToggleRow,
  onToggleAll,
  onRowClick,
  onClearSelection,
}: {
  rows: RecordListSampleRow[];
  selectedIds: ReadonlySet<string>;
  selectedRowId: string | null;
  showCheckboxes: boolean;
  onToggleRow: (id: string, checked: boolean) => void;
  onToggleAll: (checked: boolean) => void;
  onRowClick?: (row: RecordListSampleRow) => void;
  onClearSelection?: () => void;
}): ReactNode {
  const allSelected =
    rows.length > 0 && rows.every((row) => selectedIds.has(row.id));
  const someSelected =
    rows.some((row) => selectedIds.has(row.id)) && !allSelected;

  const columns = useMemo<ColumnDef<RecordListSampleRow>[]>(() => {
    const selectColumn: ColumnDef<RecordListSampleRow> = {
      id: 'select',
      size: 48,
      header: () => (
        <CheckboxItem>
          <CheckboxItemControl
            checked={allSelected}
            indeterminate={someSelected}
            onCheckedChange={(checked) => onToggleAll(checked === true)}
          />
          <CheckboxItemLabel className="sr-only">
            Select all rows
          </CheckboxItemLabel>
        </CheckboxItem>
      ),
      cell: ({ row }) => (
        <CheckboxItem>
          <CheckboxItemControl
            checked={selectedIds.has(row.original.id)}
            onCheckedChange={(checked) =>
              onToggleRow(row.original.id, checked === true)
            }
          />
          <CheckboxItemLabel className="sr-only">
            Select row {row.original.index}
          </CheckboxItemLabel>
        </CheckboxItem>
      ),
    };

    return [
      ...(showCheckboxes ? [selectColumn] : []),
      {
        accessorKey: 'asset',
        header: 'Asset',
        size: 280,
        cell: ({ row, getValue }) => {
          const value = String(getValue() ?? '');
          if (row.original.id !== selectedRowId) {
            return value;
          }
          return (
            <span className="whitespace-nowrap bg-muted-background">
              {value}
            </span>
          );
        },
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 148,
        cell: ({ row }) => (
          <Badge variant={recordListStatuses[row.original.status]}>
            {row.original.status}
          </Badge>
        ),
      },
      {
        accessorKey: 'owner',
        header: 'Owner',
        size: 196,
        cell: ({ row }) => {
          const owner = recordListOwners[row.original.owner];
          return (
            <span className="flex items-center gap-2 whitespace-nowrap">
              <Avatar sizes="xsm" variant={owner.variant}>
                <AvatarFallback>{owner.initials}</AvatarFallback>
              </Avatar>
              {row.original.owner}
            </span>
          );
        },
      },
      {
        accessorKey: 'trend',
        header: 'Pressure',
        size: 148,
        cell: ({ row }) => (
          <RecordListTrend
            compact
            label={`${row.original.asset} pressure`}
            values={row.original.trend}
            color={recordListTrendColor(row.original.status)}
          />
        ),
      },
      {
        accessorKey: 'updated',
        header: 'Updated',
        size: 140,
        cell: ({ getValue }) => formatRecordListDate(String(getValue() ?? '')),
      },
      {
        id: 'actions',
        size: 48,
        header: () => <span className="sr-only">Actions</span>,
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="ghost" size="icon-sm" />}
              aria-label={`Actions for ${row.original.asset}`}
            >
              <IconDotsVertical size={16} stroke={1.5} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Open asset</DropdownMenuItem>
              <DropdownMenuItem>Add comment</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ];
  }, [
    allSelected,
    onToggleAll,
    onToggleRow,
    selectedIds,
    selectedRowId,
    showCheckboxes,
    someSelected,
  ]);

  return (
    <div
      data-slot="record-list-table"
      className="min-h-0 flex-1"
      onClick={(event) => {
        if (!onClearSelection) {
          return;
        }
        const target = event.target;
        if (!(target instanceof Element)) {
          return;
        }
        if (target.closest('[role="row"]')) {
          return;
        }
        onClearSelection();
      }}
    >
      <DataGrid
        aria-label="Record list"
        className="h-full"
        data={rows}
        columns={columns}
        getRowId={(row) => row.id}
        onRowClick={
          onRowClick
            ? (row) => {
                onRowClick(row.original);
              }
            : undefined
        }
      />
    </div>
  );
}

RecordListTable.displayName = 'RecordListTable';

export { RecordListTable };
