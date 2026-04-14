import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconArrowsDiagonal, IconDots } from '@tabler/icons-react';
import type { ColumnDef } from '@tanstack/react-table';
import { type ComponentProps, useMemo, useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';

import { Avatar, AvatarFallback } from '../avatar';
import { Badge } from '../badge';
import { Button } from '../button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../dropdown-menu';
import {
  Pagination,
  PaginationContent,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationNext,
  PaginationPrevious,
  PaginationResultsPerPage,
  PaginationResultsPerPageLabel,
  PaginationSelectTrigger,
  PaginationStatus,
  PaginationTeleport,
} from '../pagination';
import { Select, SelectContent, SelectItem, SelectValue } from '../select';

import {
  DataGrid,
  DataGridCheckboxCell,
  DataGridCheckboxHeader,
  DataGridFooter,
  DataGridHeader,
  DataGridHeaderActions,
  DataGridSearch,
  DataGridSubtitle,
  DataGridTitle,
} from './data-grid-full';

const meta: Meta<typeof DataGrid> = {
  title: 'Reference/DataGrid Full',
  component: DataGrid,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['default', 'compact'],
      table: {
        category: 'Variants/Styling',
        type: { summary: "'default' | 'compact'" },
        defaultValue: { summary: 'default' },
      },
    },
    enableRowSelection: {
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    enableSorting: {
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    manualPagination: {
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    manualSorting: {
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-5xl">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof DataGrid>;

export const Default: Story = {
  parameters: { order: 1 },
  render: () => {
    type RowData = {
      id: string;
      col1: string;
      col2: string;
      col3: string;
      col4: string;
      col5: string;
    };

    const data: RowData[] = Array.from({ length: 6 }, (_, i) => ({
      id: String(i + 1),
      col1: `Row ${i + 1} Col 1`,
      col2: `Row ${i + 1} Col 2`,
      col3: `Row ${i + 1} Col 3`,
      col4: `Row ${i + 1} Col 4`,
      col5: `Row ${i + 1} Col 5`,
    }));

    const columns: ColumnDef<RowData>[] = [
      { accessorKey: 'col1', header: 'Col 1', size: 160 },
      { accessorKey: 'col2', header: 'Col 2' },
      { accessorKey: 'col3', header: 'Col 3' },
      { accessorKey: 'col4', header: 'Col 4' },
      { accessorKey: 'col5', header: 'Col 5' },
    ];

    return (
      <DataGrid data={data} columns={columns} getRowId={(row) => row.id} />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const grid = canvas.getByRole('grid');
    await expect(grid).toBeInTheDocument();
    const rows = canvas.getAllByRole('row');
    await expect(rows.length).toBeGreaterThanOrEqual(7);
  },
};

export const RichContent: Story = {
  parameters: { order: 2 },
  render: () => {
    type AssetRow = {
      id: string;
      name: string;
      assets: number;
      status: 'Running' | 'Failed' | 'Finished' | 'Needs attention';
      tag: string;
      lastEdited: string;
      created: string;
      owner: string;
    };
    type StatusBadgeVariant = NonNullable<
      ComponentProps<typeof Badge>['variant']
    >;
    const statusVariantMap: Record<AssetRow['status'], StatusBadgeVariant> = {
      Running: 'inProgress',
      Failed: 'error',
      Finished: 'success',
      'Needs attention': 'warning',
    };
    const formatNumber = (n: number) =>
      n >= 1000 ? `${(n / 1000).toFixed(1)}k+` : String(n);

    const data: AssetRow[] = [
      {
        id: '1',
        name: 'Pump health UT-654/111',
        assets: 215,
        status: 'Running',
        tag: 'Troubleshooting',
        lastEdited: 'Dec 17, 2024',
        created: 'Dec 12, 2024',
        owner: 'PJ',
      },
      {
        id: '2',
        name: 'Compressor train A-14',
        assets: 2500,
        status: 'Failed',
        tag: 'RCA',
        lastEdited: 'Nov 29, 2024',
        created: 'Nov 03, 2024',
        owner: 'AL',
      },
      {
        id: '3',
        name: 'Wellhead pressure BK-220',
        assets: 1490,
        status: 'Finished',
        tag: 'Monitoring',
        lastEdited: 'Oct 14, 2024',
        created: 'Oct 01, 2024',
        owner: 'RM',
      },
    ];

    const columns: ColumnDef<AssetRow>[] = [
      {
        accessorKey: 'name',
        header: 'Name',
        size: 220,
      },
      {
        accessorKey: 'assets',
        header: 'Assets',
        size: 80,
        cell: ({ row }) => formatNumber(row.original.assets),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 160,
        cell: ({ row }) => {
          const { status } = row.original;
          return (
            <Badge variant={statusVariantMap[status]} dot>
              {status}
            </Badge>
          );
        },
      },
      {
        accessorKey: 'tag',
        header: 'Tag',
        size: 150,
        cell: ({ row }) => <Badge variant="mountain">{row.original.tag}</Badge>,
      },
      { accessorKey: 'lastEdited', header: 'Last edited', size: 120 },
      { accessorKey: 'created', header: 'Created', size: 120 },
      {
        accessorKey: 'owner',
        header: 'Owner',
        size: 70,
        cell: ({ row }) => (
          <Avatar variant="fjord" sizes="xxsm">
            <AvatarFallback>{row.original.owner}</AvatarFallback>
          </Avatar>
        ),
      },
    ];

    return (
      <DataGrid data={data} columns={columns} getRowId={(row) => row.id} />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const grid = canvas.getByRole('grid');
    await expect(grid).toBeInTheDocument();
  },
};

export const PinnedColumns: Story = {
  parameters: { order: 3 },
  render: () => {
    type RowData = {
      id: string;
      col1: string;
      col2: string;
      col3: string;
      col4: string;
      col5: string;
    };
    const data: RowData[] = Array.from({ length: 6 }, (_, i) => ({
      id: String(i + 1),
      col1: `Row ${i + 1} Col 1`,
      col2: `Row ${i + 1} Col 2`,
      col3: `Row ${i + 1} Col 3`,
      col4: `Row ${i + 1} Col 4`,
      col5: `Row ${i + 1} Col 5`,
    }));

    const manyColumns: ColumnDef<RowData>[] = [
      { accessorKey: 'col1', header: 'Col 1', size: 160 },
      ...Array.from({ length: 10 }, (_, i) => ({
        id: `extra-${i}`,
        accessorKey: 'col2',
        header: `Col ${i + 2}`,
        size: 150,
      })),
    ];

    return (
      <div className="max-w-3xl">
        <DataGrid
          data={data}
          columns={manyColumns}
          pinnedColumns={['col1']}
          getRowId={(row) => row.id}
        />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const grid = canvas.getByRole('grid');
    await expect(grid).toBeInTheDocument();
  },
};

export const PinnedMultipleColumns: Story = {
  parameters: { order: 3.1 },
  render: () => {
    type RowData = {
      id: string;
      name: string;
      site: string;
      status: string;
      owner: string;
      updated: string;
    };

    const data: RowData[] = Array.from({ length: 8 }, (_, i) => ({
      id: String(i + 1),
      name: `Asset ${i + 1}`,
      site: i % 2 === 0 ? 'North' : 'South',
      status: i % 3 === 0 ? 'Running' : 'Draft',
      owner: i % 2 === 0 ? 'PJ' : 'AL',
      updated: `2026-01-${String(i + 1).padStart(2, '0')}`,
    }));

    const columns: ColumnDef<RowData>[] = [
      { accessorKey: 'name', header: 'Name', size: 180 },
      { accessorKey: 'site', header: 'Site', size: 140 },
      { accessorKey: 'status', header: 'Status', size: 140 },
      { accessorKey: 'owner', header: 'Owner', size: 120 },
      { accessorKey: 'updated', header: 'Updated', size: 140 },
      ...Array.from({ length: 4 }, (_, i) => ({
        id: `extra-${i}`,
        accessorKey: 'status' as const,
        header: `Extra ${i + 1}`,
        size: 140,
      })),
    ];

    return (
      <div className="max-w-4xl">
        <DataGrid
          data={data}
          columns={columns}
          pinnedColumns={['name', 'site']}
          getRowId={(row) => row.id}
        />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('grid')).toBeInTheDocument();
  },
};

export const PinnedSelectionAndDataColumn: Story = {
  parameters: { order: 3.2 },
  render: function PinnedSelectionAndDataColumnStory() {
    const [rowSelection, setRowSelection] = useState({});

    type RowData = {
      id: string;
      name: string;
      status: string;
      owner: string;
      region: string;
    };

    const data: RowData[] = Array.from({ length: 8 }, (_, i) => ({
      id: String(i + 1),
      name: `Equipment ${i + 1}`,
      status: i % 2 === 0 ? 'Running' : 'Draft',
      owner: i % 2 === 0 ? 'RM' : 'KT',
      region: i % 2 === 0 ? 'EMEA' : 'AMER',
    }));

    const columns: ColumnDef<RowData>[] = [
      { accessorKey: 'name', header: 'Name', size: 200 },
      { accessorKey: 'status', header: 'Status', size: 150 },
      { accessorKey: 'owner', header: 'Owner', size: 130 },
      { accessorKey: 'region', header: 'Region', size: 130 },
      ...Array.from({ length: 3 }, (_, i) => ({
        id: `extra-col-${i}`,
        accessorKey: 'owner' as const,
        header: `Owner ${i + 1}`,
        size: 130,
      })),
    ];

    return (
      <div className="max-w-4xl">
        <DataGrid
          data={data}
          columns={[
            {
              id: 'select',
              size: 44,
              header: ({ table }) => <DataGridCheckboxHeader table={table} />,
              cell: ({ row }) => <DataGridCheckboxCell row={row} />,
            },
            ...columns,
          ]}
          pinnedColumns={['select', 'name']}
          enableRowSelection
          rowSelection={rowSelection}
          onRowSelectionChange={setRowSelection}
          getRowId={(row) => row.id}
        />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkboxes = canvas.getAllByRole('checkbox');
    await expect(checkboxes.length).toBeGreaterThan(0);
  },
};

export const SizeVariants: Story = {
  parameters: { order: 4 },
  render: () => {
    type RowData = {
      id: string;
      col1: string;
      col2: string;
      col3: string;
      col4: string;
      col5: string;
    };
    const data: RowData[] = Array.from({ length: 6 }, (_, i) => ({
      id: String(i + 1),
      col1: `Row ${i + 1} Col 1`,
      col2: `Row ${i + 1} Col 2`,
      col3: `Row ${i + 1} Col 3`,
      col4: `Row ${i + 1} Col 4`,
      col5: `Row ${i + 1} Col 5`,
    }));
    const columns: ColumnDef<RowData>[] = [
      { accessorKey: 'col1', header: 'Col 1', size: 160 },
      { accessorKey: 'col2', header: 'Col 2' },
      { accessorKey: 'col3', header: 'Col 3' },
      { accessorKey: 'col4', header: 'Col 4' },
      { accessorKey: 'col5', header: 'Col 5' },
    ];

    return (
      <div className="flex flex-col gap-8">
        <div>
          <h3 className="mb-2 text-sm font-medium">Default size</h3>
          <DataGrid
            data={data.slice(0, 3)}
            columns={columns}
            size="default"
            getRowId={(row) => row.id}
          />
        </div>
        <div>
          <h3 className="mb-2 text-sm font-medium">Compact size</h3>
          <DataGrid
            data={data.slice(0, 3)}
            columns={columns}
            size="compact"
            getRowId={(row) => row.id}
          />
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const grids = canvas.getAllByRole('grid');
    await expect(grids.length).toBe(2);
  },
};

export const WithSelection: Story = {
  parameters: { order: 5 },
  render: function WithSelectionStory() {
    const [rowSelection, setRowSelection] = useState({});
    type RowData = {
      id: string;
      col1: string;
      col2: string;
      col3: string;
      col4: string;
      col5: string;
    };
    const data: RowData[] = Array.from({ length: 6 }, (_, i) => ({
      id: String(i + 1),
      col1: `Row ${i + 1} Col 1`,
      col2: `Row ${i + 1} Col 2`,
      col3: `Row ${i + 1} Col 3`,
      col4: `Row ${i + 1} Col 4`,
      col5: `Row ${i + 1} Col 5`,
    }));
    const columns: ColumnDef<RowData>[] = [
      { accessorKey: 'col1', header: 'Col 1', size: 160 },
      { accessorKey: 'col2', header: 'Col 2' },
      { accessorKey: 'col3', header: 'Col 3' },
      { accessorKey: 'col4', header: 'Col 4' },
      { accessorKey: 'col5', header: 'Col 5' },
    ];

    return (
      <DataGrid
        data={data}
        columns={[
          {
            id: 'select',
            size: 44,
            header: ({ table }) => <DataGridCheckboxHeader table={table} />,
            cell: ({ row }) => <DataGridCheckboxCell row={row} />,
          },
          ...columns,
        ]}
        enableRowSelection
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        getRowId={(row) => row.id}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkboxes = canvas.getAllByRole('checkbox');
    await expect(checkboxes.length).toBeGreaterThan(0);
    await userEvent.click(checkboxes[1]);
  },
};

export const WithSorting: Story = {
  parameters: { order: 6 },
  render: function WithSortingStory() {
    const [sorting, setSorting] = useState<{ id: string; desc: boolean }[]>([]);

    type SortableRow = {
      id: string;
      name: string;
      assets: number;
      status: 'Running' | 'Failed' | 'Finished' | 'Needs attention';
    };
    type StatusBadgeVariant = NonNullable<
      ComponentProps<typeof Badge>['variant']
    >;
    const statusVariantMap: Record<SortableRow['status'], StatusBadgeVariant> =
      {
        Running: 'success',
        Failed: 'error',
        Finished: 'inProgress',
        'Needs attention': 'warning',
      };

    const sortableData: SortableRow[] = [
      { id: '1', name: 'Alpha Pump', assets: 42, status: 'Running' },
      { id: '2', name: 'Beta Compressor', assets: 215, status: 'Failed' },
      { id: '3', name: 'Gamma Valve', assets: 7, status: 'Finished' },
      { id: '4', name: 'Delta Sensor', assets: 1800, status: 'Running' },
      { id: '5', name: 'Epsilon Motor', assets: 99, status: 'Needs attention' },
    ];

    const sortableColumns: ColumnDef<SortableRow>[] = [
      { accessorKey: 'name', header: 'Name', enableSorting: true },
      {
        accessorKey: 'assets',
        header: 'Assets',
        enableSorting: true,
        size: 100,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        enableSorting: true,
        cell: ({ row }) => (
          <Badge variant={statusVariantMap[row.original.status]} dot>
            {row.original.status}
          </Badge>
        ),
      },
    ];

    return (
      <DataGrid
        data={sortableData}
        columns={sortableColumns}
        enableSorting
        sorting={sorting}
        onSortingChange={setSorting}
        getRowId={(row) => row.id}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nameHeader = canvas.getByText('Name');
    await userEvent.click(nameHeader);
    const headers = canvas.getAllByRole('columnheader');
    const nameCol = headers.find((h) => h.textContent?.includes('Name'));
    await expect(nameCol).toHaveAttribute('aria-sort', 'ascending');
  },
};

export const WithPagination: Story = {
  parameters: { order: 7 },
  render: function WithPaginationStory() {
    type AssetRow = {
      id: string;
      name: string;
      assets: number;
      status: 'Running' | 'Failed' | 'Finished' | 'Needs attention';
      tag: string;
      lastEdited: string;
      created: string;
      owner: string;
    };
    type StatusBadgeVariant = NonNullable<
      ComponentProps<typeof Badge>['variant']
    >;
    const statusVariantMap: Record<AssetRow['status'], StatusBadgeVariant> = {
      Running: 'inProgress',
      Failed: 'error',
      Finished: 'success',
      'Needs attention': 'warning',
    };
    const formatNumber = (n: number) =>
      n >= 1000 ? `${(n / 1000).toFixed(1)}k+` : String(n);
    const [pagination, setPagination] = useState({
      pageIndex: 0,
      pageSize: 5,
    });
    const [resultsPerPage, setResultsPerPage] = useState('5');
    const data: AssetRow[] = useMemo(
      () => [
        {
          id: '1',
          name: 'Pump health UT-654/111',
          assets: 215,
          status: 'Running',
          tag: 'Troubleshooting',
          lastEdited: 'Dec 17, 2024',
          created: 'Dec 12, 2024',
          owner: 'PJ',
        },
        {
          id: '2',
          name: 'Compressor train A-14',
          assets: 2500,
          status: 'Failed',
          tag: 'RCA',
          lastEdited: 'Nov 29, 2024',
          created: 'Nov 03, 2024',
          owner: 'AL',
        },
        {
          id: '3',
          name: 'Wellhead pressure BK-220',
          assets: 1490,
          status: 'Finished',
          tag: 'Monitoring',
          lastEdited: 'Oct 14, 2024',
          created: 'Oct 01, 2024',
          owner: 'RM',
        },
        {
          id: '4',
          name: 'Flow meter SK-91',
          assets: 402,
          status: 'Needs attention',
          tag: 'Inspection',
          lastEdited: 'Sep 08, 2024',
          created: 'Sep 22, 2024',
          owner: 'KT',
        },
        {
          id: '5',
          name: 'Turbine diagnostics TR-77',
          assets: 8800,
          status: 'Running',
          tag: 'Optimization',
          lastEdited: 'Aug 26, 2024',
          created: 'Aug 11, 2024',
          owner: 'SD',
        },
        {
          id: '6',
          name: 'Cooling loop CL-502',
          assets: 19,
          status: 'Finished',
          tag: 'Maintenance',
          lastEdited: 'Jul 19, 2024',
          created: 'Jul 02, 2024',
          owner: 'JW',
        },
        {
          id: '7',
          name: 'Separator vessel SV-18',
          assets: 3250,
          status: 'Failed',
          tag: 'RCA',
          lastEdited: 'Jun 18, 2024',
          created: 'Jun 03, 2024',
          owner: 'NB',
        },
        {
          id: '8',
          name: 'Hydraulic unit HY-312',
          assets: 610,
          status: 'Running',
          tag: 'Monitoring',
          lastEdited: 'May 22, 2024',
          created: 'May 06, 2024',
          owner: 'HF',
        },
        {
          id: '9',
          name: 'Pipeline monitor PM-640',
          assets: 118,
          status: 'Finished',
          tag: 'Inspection',
          lastEdited: 'Apr 17, 2024',
          created: 'Apr 04, 2024',
          owner: 'PJ',
        },
        {
          id: '10',
          name: 'Booster station BS-403',
          assets: 880,
          status: 'Needs attention',
          tag: 'Maintenance',
          lastEdited: 'Mar 29, 2024',
          created: 'Mar 12, 2024',
          owner: 'AL',
        },
        {
          id: '11',
          name: 'Heat exchanger HX-209',
          assets: 470,
          status: 'Running',
          tag: 'Optimization',
          lastEdited: 'Feb 21, 2024',
          created: 'Feb 07, 2024',
          owner: 'RM',
        },
        {
          id: '12',
          name: 'Gas lift header GL-118',
          assets: 1320,
          status: 'Failed',
          tag: 'Troubleshooting',
          lastEdited: 'Jan 30, 2024',
          created: 'Jan 11, 2024',
          owner: 'KT',
        },
        {
          id: '13',
          name: 'Choke manifold CM-740',
          assets: 760,
          status: 'Finished',
          tag: 'Monitoring',
          lastEdited: 'Dec 19, 2023',
          created: 'Dec 05, 2023',
          owner: 'SD',
        },
      ],
      []
    );

    const totalPages = Math.ceil(data.length / pagination.pageSize);
    const startRow = pagination.pageIndex * pagination.pageSize + 1;
    const endRow = Math.min(
      (pagination.pageIndex + 1) * pagination.pageSize,
      data.length
    );
    const effectivePageIndex = pagination.pageIndex;
    const totalResults = data.length;
    const columns: ColumnDef<AssetRow>[] = [
      {
        accessorKey: 'name',
        header: 'Name',
        size: 220,
      },
      {
        accessorKey: 'assets',
        header: 'Assets',
        size: 80,
        cell: ({ row }) => formatNumber(row.original.assets),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 160,
        cell: ({ row }) => {
          const { status } = row.original;
          return (
            <Badge variant={statusVariantMap[status]} dot>
              {status}
            </Badge>
          );
        },
      },
      {
        accessorKey: 'tag',
        header: 'Tag',
        size: 150,
        cell: ({ row }) => <Badge variant="mountain">{row.original.tag}</Badge>,
      },
      { accessorKey: 'lastEdited', header: 'Last edited', size: 120 },
      { accessorKey: 'created', header: 'Created', size: 120 },
      {
        accessorKey: 'owner',
        header: 'Owner',
        size: 70,
        cell: ({ row }) => (
          <Avatar variant="fjord" sizes="xxsm">
            <AvatarFallback>{row.original.owner}</AvatarFallback>
          </Avatar>
        ),
      },
    ];

    return (
      <DataGrid
        data={data}
        columns={columns}
        pagination={pagination}
        onPaginationChange={setPagination}
        getRowId={(row) => row.id}
        footer={
          <Pagination className="w-full">
            <PaginationContent className="w-full justify-between">
              <div className="flex items-center gap-1">
                <PaginationItem>
                  <PaginationFirst
                    href="#"
                    isDisabled={effectivePageIndex === 0}
                    onClick={(e) => {
                      e.preventDefault();
                      setPagination((p) => ({ ...p, pageIndex: 0 }));
                    }}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    isDisabled={effectivePageIndex === 0}
                    onClick={(e) => {
                      e.preventDefault();
                      setPagination((p) => ({
                        ...p,
                        pageIndex: Math.max(0, p.pageIndex - 1),
                      }));
                    }}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationTeleport
                    currentPage={effectivePageIndex + 1}
                    totalPages={totalPages}
                    onPageChange={(page) =>
                      setPagination((p) => ({ ...p, pageIndex: page - 1 }))
                    }
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    isDisabled={effectivePageIndex >= totalPages - 1}
                    onClick={(e) => {
                      e.preventDefault();
                      setPagination((p) => ({
                        ...p,
                        pageIndex: Math.min(totalPages - 1, p.pageIndex + 1),
                      }));
                    }}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLast
                    href="#"
                    isDisabled={effectivePageIndex >= totalPages - 1}
                    onClick={(e) => {
                      e.preventDefault();
                      setPagination((p) => ({
                        ...p,
                        pageIndex: totalPages - 1,
                      }));
                    }}
                  />
                </PaginationItem>
                <PaginationResultsPerPage>
                  <PaginationResultsPerPageLabel>
                    Results per page
                  </PaginationResultsPerPageLabel>
                  <Select
                    value={resultsPerPage}
                    onValueChange={(val) => {
                      setResultsPerPage(val);
                      setPagination({ pageIndex: 0, pageSize: Number(val) });
                    }}
                  >
                    <PaginationSelectTrigger>
                      <SelectValue />
                    </PaginationSelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                    </SelectContent>
                  </Select>
                </PaginationResultsPerPage>
              </div>
              <PaginationItem>
                <PaginationStatus>
                  showing {startRow}-{endRow} of {totalResults} results
                </PaginationStatus>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        }
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/showing/)).toBeInTheDocument();
    await expect(canvas.getByText('Results per page')).toBeInTheDocument();
  },
};

export const LargeDataset: Story = {
  parameters: { order: 8 },
  render: () => {
    type LargeRow = { id: string; col1: string; col2: string; col3: string };
    const largeData: LargeRow[] = Array.from({ length: 1000 }, (_, i) => ({
      id: String(i + 1),
      col1: `Row ${i + 1} - Column A`,
      col2: `Row ${i + 1} - Column B`,
      col3: `Row ${i + 1} - Column C`,
    }));

    const largeColumns: ColumnDef<LargeRow>[] = [
      { accessorKey: 'col1', header: 'Column A' },
      { accessorKey: 'col2', header: 'Column B' },
      { accessorKey: 'col3', header: 'Column C' },
    ];

    return (
      <div className="h-96">
        <DataGrid
          data={largeData}
          columns={largeColumns}
          getRowId={(row) => row.id}
          className="h-full"
        />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const grid = canvas.getByRole('grid');
    await expect(grid).toBeInTheDocument();
    await expect(grid).toHaveAttribute('aria-rowcount', '1000');
  },
};

export const Accessibility: Story = {
  parameters: { order: 99 },
  render: function AccessibilityStory() {
    const [rowSelection, setRowSelection] = useState({});
    const [sorting, setSorting] = useState<{ id: string; desc: boolean }[]>([]);
    type RowData = {
      id: string;
      col1: string;
      col2: string;
      col3: string;
      col4: string;
      col5: string;
    };
    const data: RowData[] = Array.from({ length: 4 }, (_, i) => ({
      id: String(i + 1),
      col1: `Row ${i + 1} Col 1`,
      col2: `Row ${i + 1} Col 2`,
      col3: `Row ${i + 1} Col 3`,
      col4: `Row ${i + 1} Col 4`,
      col5: `Row ${i + 1} Col 5`,
    }));

    return (
      <DataGrid
        data={data}
        columns={[
          {
            id: 'select',
            size: 44,
            header: ({ table }) => <DataGridCheckboxHeader table={table} />,
            cell: ({ row }) => <DataGridCheckboxCell row={row} />,
          },
          {
            accessorKey: 'col1',
            header: 'Col 1',
            size: 160,
            enableSorting: true,
          },
          {
            accessorKey: 'col2',
            header: 'Col 2',
            enableSorting: true,
          },
          {
            accessorKey: 'col3',
            header: 'Col 3',
            enableSorting: true,
          },
        ]}
        pinnedColumns={['select', 'col1']}
        enableRowSelection
        enableSorting
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        sorting={sorting}
        onSortingChange={setSorting}
        getRowId={(row) => row.id}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const grid = canvas.getByRole('grid');
    await expect(grid).toHaveAttribute('aria-rowcount', '4');
    await expect(grid).toHaveAttribute('aria-colcount', '4');

    const headerRow = canvas.getAllByRole('row')[0];
    await expect(headerRow).toHaveAttribute('aria-rowindex', '1');

    const columnHeaders = canvas.getAllByRole('columnheader');
    await expect(columnHeaders.length).toBe(4);
    await expect(columnHeaders[1]).toHaveAttribute('aria-colindex', '2');
    await expect(columnHeaders[1]).toHaveAttribute('aria-sort', 'none');

    await userEvent.click(columnHeaders[1]);
    await expect(columnHeaders[1]).toHaveAttribute('aria-sort', 'ascending');

    await userEvent.click(columnHeaders[1]);
    await expect(columnHeaders[1]).toHaveAttribute('aria-sort', 'descending');

    const checkboxes = canvas.getAllByRole('checkbox');
    const selectAllCheckbox = checkboxes[0];
    await expect(selectAllCheckbox).toHaveAccessibleName('Select all rows');

    const rowCheckbox = checkboxes[1];
    await expect(rowCheckbox).toHaveAccessibleName('Select row');

    await userEvent.click(rowCheckbox);
    const dataRows = canvas.getAllByRole('row').slice(1);
    await expect(dataRows[0]).toHaveAttribute('aria-selected', 'true');
  },
};

export const VisualRegression: Story = {
  parameters: { order: 105 },
  render: function VisualRegressionStory() {
    type AssetRow = {
      id: string;
      name: string;
      assets: number;
      status: 'Running' | 'Failed' | 'Finished' | 'Needs attention';
      tag: string;
      lastEdited: string;
      created: string;
      owner: string;
    };
    type StatusBadgeVariant = NonNullable<
      ComponentProps<typeof Badge>['variant']
    >;
    const statusVariantMap: Record<AssetRow['status'], StatusBadgeVariant> = {
      Running: 'inProgress',
      Failed: 'error',
      Finished: 'success',
      'Needs attention': 'warning',
    };
    const formatNumber = (n: number) =>
      n >= 1000 ? `${(n / 1000).toFixed(1)}k+` : String(n);
    const [rowSelection] = useState({ '2': true, '4': true });
    const data: AssetRow[] = [
      {
        id: '1',
        name: 'Pump health UT-654/111',
        assets: 215,
        status: 'Running',
        tag: 'Troubleshooting',
        lastEdited: 'Dec 17, 2024',
        created: 'Dec 12, 2024',
        owner: 'PJ',
      },
      {
        id: '2',
        name: 'Compressor train A-14',
        assets: 2500,
        status: 'Failed',
        tag: 'RCA',
        lastEdited: 'Nov 29, 2024',
        created: 'Nov 03, 2024',
        owner: 'AL',
      },
      {
        id: '3',
        name: 'Wellhead pressure BK-220',
        assets: 1490,
        status: 'Finished',
        tag: 'Monitoring',
        lastEdited: 'Oct 14, 2024',
        created: 'Oct 01, 2024',
        owner: 'RM',
      },
      {
        id: '4',
        name: 'Flow meter SK-91',
        assets: 402,
        status: 'Needs attention',
        tag: 'Inspection',
        lastEdited: 'Sep 08, 2024',
        created: 'Sep 22, 2024',
        owner: 'KT',
      },
    ];

    const columns: ColumnDef<AssetRow>[] = [
      {
        id: 'select',
        size: 44,
        header: ({ table }) => <DataGridCheckboxHeader table={table} />,
        cell: ({ row }) => <DataGridCheckboxCell row={row} />,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        size: 220,
      },
      {
        accessorKey: 'assets',
        header: 'Assets',
        size: 80,
        cell: ({ row }) => formatNumber(row.original.assets),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 160,
        cell: ({ row }) => {
          const { status } = row.original;
          return (
            <Badge variant={statusVariantMap[status]} dot>
              {status}
            </Badge>
          );
        },
      },
      {
        accessorKey: 'tag',
        header: 'Tag',
        size: 150,
        cell: ({ row }) => <Badge variant="mountain">{row.original.tag}</Badge>,
      },
      { accessorKey: 'lastEdited', header: 'Last edited', size: 120 },
      { accessorKey: 'created', header: 'Created', size: 120 },
      {
        accessorKey: 'owner',
        header: 'Owner',
        size: 70,
        cell: ({ row }) => (
          <Avatar variant="fjord" sizes="xxsm">
            <AvatarFallback>{row.original.owner}</AvatarFallback>
          </Avatar>
        ),
      },
    ];

    return (
      <DataGrid
        data={data}
        columns={columns}
        pinnedColumns={['select', 'name']}
        enableRowSelection
        rowSelection={rowSelection}
        getRowId={(row) => row.id}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const grid = canvas.getByRole('grid');
    await expect(grid).toBeInTheDocument();
    const selectedRows = canvas
      .getAllByRole('row')
      .filter((row) => row.getAttribute('aria-selected') === 'true');
    await expect(selectedRows.length).toBe(2);
  },
};

export const EdgeCaseEmptyData: Story = {
  parameters: { order: 100 },
  render: () => {
    type RowData = {
      id: string;
      col1: string;
      col2: string;
      col3: string;
      col4: string;
      col5: string;
    };
    const columns: ColumnDef<RowData>[] = [
      { accessorKey: 'col1', header: 'Col 1', size: 160 },
      { accessorKey: 'col2', header: 'Col 2' },
      { accessorKey: 'col3', header: 'Col 3' },
      { accessorKey: 'col4', header: 'Col 4' },
      { accessorKey: 'col5', header: 'Col 5' },
    ];
    return <DataGrid data={[]} columns={columns} getRowId={() => ''} />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const grid = canvas.getByRole('grid');
    await expect(grid).toBeInTheDocument();
    await expect(grid).toHaveAttribute('aria-rowcount', '0');
    const columnHeaders = canvas.getAllByRole('columnheader');
    await expect(columnHeaders.length).toBe(5);
  },
};

export const EdgeCaseLongText: Story = {
  parameters: { order: 101 },
  render: () => {
    type LongTextRow = { id: string; name: string; description: string };

    const longTextData: LongTextRow[] = [
      {
        id: '1',
        name: 'A'.repeat(200),
        description: 'Short description',
      },
      {
        id: '2',
        name: 'Normal name',
        description: 'B'.repeat(500),
      },
      {
        id: '3',
        name: 'Special chars: <script>alert("xss")</script> & "quotes" \'apostrophes\'',
        description: 'Unicode: 日本語テスト émojis 🔧⚙️🏭 RTL: مرحبا',
      },
      {
        id: '4',
        name: '',
        description: '',
      },
    ];

    const longTextColumns: ColumnDef<LongTextRow>[] = [
      { accessorKey: 'name', header: 'Name', size: 200 },
      { accessorKey: 'description', header: 'Description', size: 300 },
    ];

    return (
      <DataGrid
        data={longTextData}
        columns={longTextColumns}
        getRowId={(row) => row.id}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const cells = canvas.getAllByRole('gridcell');
    await expect(cells.length).toBeGreaterThanOrEqual(8);
  },
};

export const EdgeCaseSingleRow: Story = {
  parameters: { order: 102 },
  render: () => {
    type RowData = {
      id: string;
      col1: string;
      col2: string;
      col3: string;
      col4: string;
      col5: string;
    };
    const data: RowData[] = [
      {
        id: '1',
        col1: 'Row 1 Col 1',
        col2: 'Row 1 Col 2',
        col3: 'Row 1 Col 3',
        col4: 'Row 1 Col 4',
        col5: 'Row 1 Col 5',
      },
    ];
    const columns: ColumnDef<RowData>[] = [
      { accessorKey: 'col1', header: 'Col 1', size: 160 },
      { accessorKey: 'col2', header: 'Col 2' },
      { accessorKey: 'col3', header: 'Col 3' },
      { accessorKey: 'col4', header: 'Col 4' },
      { accessorKey: 'col5', header: 'Col 5' },
    ];
    return (
      <DataGrid data={data} columns={columns} getRowId={(row) => row.id} />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const grid = canvas.getByRole('grid');
    await expect(grid).toHaveAttribute('aria-rowcount', '1');
    const dataRows = canvas.getAllByRole('row').slice(1);
    await expect(dataRows.length).toBe(1);
  },
};

export const EdgeCaseSingleColumn: Story = {
  parameters: { order: 103 },
  render: () => {
    type RowData = {
      id: string;
      col1: string;
      col2: string;
      col3: string;
      col4: string;
      col5: string;
    };
    const data: RowData[] = Array.from({ length: 6 }, (_, i) => ({
      id: String(i + 1),
      col1: `Row ${i + 1} Col 1`,
      col2: `Row ${i + 1} Col 2`,
      col3: `Row ${i + 1} Col 3`,
      col4: `Row ${i + 1} Col 4`,
      col5: `Row ${i + 1} Col 5`,
    }));
    return (
      <DataGrid
        data={data}
        columns={[{ accessorKey: 'col1', header: 'Only Column' }]}
        getRowId={(row) => row.id}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const grid = canvas.getByRole('grid');
    await expect(grid).toHaveAttribute('aria-colcount', '1');
    const columnHeaders = canvas.getAllByRole('columnheader');
    await expect(columnHeaders.length).toBe(1);
  },
};

export const EdgeCaseManyColumns: Story = {
  parameters: { order: 104 },
  render: () => {
    type WideRow = Record<string, string>;
    const wideColumns: ColumnDef<WideRow>[] = Array.from(
      { length: 20 },
      (_, i) => ({
        id: `col-${i}`,
        accessorKey: `col${i}`,
        header: `Column ${i + 1}`,
        size: 120,
      })
    );

    const wideData: WideRow[] = Array.from({ length: 5 }, (_, rowIdx) => {
      const row: WideRow = { id: String(rowIdx + 1) };
      for (let colIdx = 0; colIdx < 20; colIdx++) {
        row[`col${colIdx}`] = `R${rowIdx + 1}C${colIdx + 1}`;
      }
      return row;
    });

    return (
      <DataGrid
        data={wideData}
        columns={wideColumns}
        getRowId={(row) => row.id}
      />
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const grid = canvas.getByRole('grid');
    await expect(grid).toHaveAttribute('aria-colcount', '20');
  },
};

export const HeaderCompositionControlledSearch: Story = {
  parameters: { order: 96 },
  render: () => {
    type RowData = {
      id: string;
      name: string;
      status: 'Running' | 'Draft' | 'Archived';
      owner: string;
    };
    type StatusBadgeVariant = NonNullable<
      ComponentProps<typeof Badge>['variant']
    >;
    const statusVariantMap: Record<RowData['status'], StatusBadgeVariant> = {
      Running: 'success',
      Draft: 'warning',
      Archived: 'mountain',
    };

    const data: RowData[] = [
      {
        id: '1',
        name: 'Pump health UT-654/111',
        status: 'Running',
        owner: 'PJ',
      },
      { id: '2', name: 'Compressor train A-14', status: 'Draft', owner: 'AL' },
      {
        id: '3',
        name: 'Wellhead pressure BK-220',
        status: 'Archived',
        owner: 'RM',
      },
      { id: '4', name: 'Flow meter SK-91', status: 'Running', owner: 'KT' },
    ];

    const columns: ColumnDef<RowData>[] = [
      { accessorKey: 'name', header: 'Name' },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 140,
        cell: ({ row }) => (
          <Badge variant={statusVariantMap[row.original.status]} dot>
            {row.original.status}
          </Badge>
        ),
      },
      {
        accessorKey: 'owner',
        header: 'Owner',
        size: 100,
        cell: ({ row }) => (
          <Avatar variant="fjord" sizes="xxsm">
            <AvatarFallback>{row.original.owner}</AvatarFallback>
          </Avatar>
        ),
      },
    ];

    const [searchValue, setSearchValue] = useState('');

    return (
      <DataGrid
        data={data}
        columns={columns}
        searchValue={searchValue}
        onSearchValueChange={setSearchValue}
        getRowId={(row) => row.id}
      >
        <DataGridHeader>
          <DataGridTitle>Table</DataGridTitle>
          <DataGridSubtitle>May 17, 2018 - Dec 24, 2022</DataGridSubtitle>
          <DataGridSearch placeholder="Search" />
          <DataGridHeaderActions>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Enter full screen"
            >
              <IconArrowsDiagonal className="size-4" />
            </Button>
            <Button variant="ghost" size="icon-sm" aria-label="More actions">
              <IconDots className="size-4" />
            </Button>
          </DataGridHeaderActions>
        </DataGridHeader>
      </DataGrid>
    );
  },
};

export const ActionsCellWithDropdownMenu: Story = {
  parameters: { order: 97 },
  render: () => {
    type RowData = {
      id: string;
      name: string;
      status: 'Running' | 'Draft' | 'Archived';
      owner: string;
    };
    type StatusBadgeVariant = NonNullable<
      ComponentProps<typeof Badge>['variant']
    >;
    const statusVariantMap: Record<RowData['status'], StatusBadgeVariant> = {
      Running: 'success',
      Draft: 'warning',
      Archived: 'mountain',
    };

    const data: RowData[] = [
      {
        id: '1',
        name: 'Compressor train A-14',
        status: 'Running',
        owner: 'AL',
      },
      { id: '2', name: 'Pump health UT-654/111', status: 'Draft', owner: 'PJ' },
      { id: '3', name: 'Flow meter SK-91', status: 'Archived', owner: 'KT' },
    ];

    const columns: ColumnDef<RowData>[] = [
      { accessorKey: 'name', header: 'Name' },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 140,
        cell: ({ row }) => (
          <Badge variant={statusVariantMap[row.original.status]} dot>
            {row.original.status}
          </Badge>
        ),
      },
      {
        accessorKey: 'owner',
        header: 'Owner',
        size: 100,
        cell: ({ row }) => (
          <Avatar variant="fjord" sizes="xxsm">
            <AvatarFallback>{row.original.owner}</AvatarFallback>
          </Avatar>
        ),
      },
      {
        id: 'actions',
        header: () => null,
        size: 56,
        enableSorting: false,
        cell: () => (
          <div className="flex w-full justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Open row actions"
                  >
                    <IconDots className="size-4" />
                  </Button>
                }
              />
              <DropdownMenuContent>
                <DropdownMenuItem>Delete</DropdownMenuItem>
                <DropdownMenuItem>Archive</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ),
      },
    ];

    return (
      <DataGrid data={data} columns={columns} getRowId={(row) => row.id} />
    );
  },
};

export const Playground: Story = {
  parameters: { order: 106 },
  render: function PlaygroundStory() {
    type AssetRow = {
      id: string;
      name: string;
      assets: number;
      status: 'Running' | 'Failed' | 'Finished' | 'Needs attention';
      tag: string;
      lastEdited: string;
      created: string;
      owner: string;
    };
    type StatusBadgeVariant = NonNullable<
      ComponentProps<typeof Badge>['variant']
    >;
    const statusVariantMap: Record<AssetRow['status'], StatusBadgeVariant> = {
      Running: 'inProgress',
      Failed: 'error',
      Finished: 'success',
      'Needs attention': 'warning',
    };
    const formatNumber = (n: number) =>
      n >= 1000 ? `${(n / 1000).toFixed(1)}k+` : String(n);
    const [rowSelection, setRowSelection] = useState({});
    const [sorting, setSorting] = useState<{ id: string; desc: boolean }[]>([]);
    const [searchValue, setSearchValue] = useState('');
    const [pagination, setPagination] = useState({
      pageIndex: 0,
      pageSize: 5,
    });
    const [resultsPerPage, setResultsPerPage] = useState('5');
    const [_row, setSelectedRowName] = useState<string | null>(null);
    const data: AssetRow[] = [
      {
        id: '1',
        name: 'Pump health UT-654/111',
        assets: 215,
        status: 'Running',
        tag: 'Troubleshooting',
        lastEdited: 'Dec 17, 2024',
        created: 'Dec 12, 2024',
        owner: 'PJ',
      },
      {
        id: '2',
        name: 'Compressor train A-14',
        assets: 2500,
        status: 'Failed',
        tag: 'RCA',
        lastEdited: 'Nov 29, 2024',
        created: 'Nov 03, 2024',
        owner: 'AL',
      },
      {
        id: '3',
        name: 'Wellhead pressure BK-220',
        assets: 1490,
        status: 'Finished',
        tag: 'Monitoring',
        lastEdited: 'Oct 14, 2024',
        created: 'Oct 01, 2024',
        owner: 'RM',
      },
      {
        id: '4',
        name: 'Flow meter SK-91',
        assets: 402,
        status: 'Needs attention',
        tag: 'Inspection',
        lastEdited: 'Sep 08, 2024',
        created: 'Sep 22, 2024',
        owner: 'KT',
      },
      {
        id: '5',
        name: 'Turbine diagnostics TR-77',
        assets: 8800,
        status: 'Running',
        tag: 'Optimization',
        lastEdited: 'Aug 26, 2024',
        created: 'Aug 11, 2024',
        owner: 'SD',
      },
      {
        id: '6',
        name: 'Cooling loop CL-502',
        assets: 19,
        status: 'Finished',
        tag: 'Maintenance',
        lastEdited: 'Jul 19, 2024',
        created: 'Jul 02, 2024',
        owner: 'JW',
      },
      {
        id: '7',
        name: 'Separator vessel SV-18',
        assets: 3250,
        status: 'Failed',
        tag: 'RCA',
        lastEdited: 'Jun 18, 2024',
        created: 'Jun 03, 2024',
        owner: 'NB',
      },
      {
        id: '8',
        name: 'Hydraulic unit HY-312',
        assets: 610,
        status: 'Running',
        tag: 'Monitoring',
        lastEdited: 'May 22, 2024',
        created: 'May 06, 2024',
        owner: 'HF',
      },
    ];

    const normalizedSearchValue = searchValue.trim().toLowerCase();
    const filteredRows = useMemo(() => {
      if (!normalizedSearchValue) return data;

      return data.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(normalizedSearchValue)
        )
      );
    }, [data, normalizedSearchValue]);
    const totalResults = filteredRows.length;
    const totalPages = Math.max(
      1,
      Math.ceil(totalResults / pagination.pageSize)
    );
    const effectivePageIndex = Math.min(pagination.pageIndex, totalPages - 1);
    const startRow =
      totalResults === 0 ? 0 : effectivePageIndex * pagination.pageSize + 1;
    const endRow =
      totalResults === 0
        ? 0
        : Math.min(
            (effectivePageIndex + 1) * pagination.pageSize,
            totalResults
          );

    const columns: ColumnDef<AssetRow>[] = [
      {
        accessorKey: 'name',
        header: 'Name',
        size: 220,
      },
      {
        accessorKey: 'assets',
        header: 'Assets',
        size: 80,
        cell: ({ row }) => formatNumber(row.original.assets),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 160,
        cell: ({ row }) => {
          const { status } = row.original;
          return (
            <Badge variant={statusVariantMap[status]} dot>
              {status}
            </Badge>
          );
        },
      },
      {
        accessorKey: 'tag',
        header: 'Tag',
        size: 150,
        cell: ({ row }) => <Badge variant="mountain">{row.original.tag}</Badge>,
      },
      { accessorKey: 'lastEdited', header: 'Last edited', size: 120 },
      { accessorKey: 'created', header: 'Created', size: 120 },
      {
        accessorKey: 'owner',
        header: 'Owner',
        size: 70,
        cell: ({ row }) => (
          <Avatar variant="fjord" sizes="xxsm">
            <AvatarFallback>{row.original.owner}</AvatarFallback>
          </Avatar>
        ),
      },
    ];

    return (
      <DataGrid
        data={data}
        columns={[
          {
            id: 'select',
            size: 44,
            header: ({ table }) => <DataGridCheckboxHeader table={table} />,
            cell: ({ row }) => <DataGridCheckboxCell row={row} />,
          },
          ...columns.map((col) => ({ ...col, enableSorting: true })),
          {
            id: 'actions',
            size: 44,
            header: () => null,
            cell: () => (
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button variant="ghost" size="icon-sm">
                      <IconDots className="size-4" />
                    </Button>
                  }
                />
                <DropdownMenuContent>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ),
          },
        ]}
        pinnedColumns={['select', 'name']}
        size="compact"
        enableRowSelection
        enableSorting
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        sorting={sorting}
        onSortingChange={setSorting}
        pagination={pagination}
        onPaginationChange={setPagination}
        rowCount={totalResults}
        searchValue={searchValue}
        onSearchValueChange={setSearchValue}
        onRowClick={(row) => {
          setSelectedRowName(row.original.name);
        }}
        getRowId={(row) => row.id}
      >
        <DataGridHeader>
          <DataGridHeaderActions>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Enter full screen"
            >
              <IconArrowsDiagonal className="size-4" />
            </Button>
            <Button variant="ghost" size="icon-sm" aria-label="More actions">
              <IconDots className="size-4" />
            </Button>
          </DataGridHeaderActions>
          <DataGridSubtitle>May 17, 2018 - Dec 24, 2022</DataGridSubtitle>
          <DataGridSearch placeholder="Search rows" />
          <DataGridTitle>Table</DataGridTitle>
        </DataGridHeader>
        <DataGridFooter>
          <Pagination className="w-full">
            <PaginationContent className="w-full justify-between">
              <div className="flex items-center gap-1">
                <PaginationItem>
                  <PaginationFirst
                    href="#"
                    isDisabled={pagination.pageIndex === 0}
                    onClick={(e) => {
                      e.preventDefault();
                      setPagination((p) => ({ ...p, pageIndex: 0 }));
                    }}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    isDisabled={pagination.pageIndex === 0}
                    onClick={(e) => {
                      e.preventDefault();
                      setPagination((p) => ({
                        ...p,
                        pageIndex: Math.max(0, p.pageIndex - 1),
                      }));
                    }}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationTeleport
                    currentPage={pagination.pageIndex + 1}
                    totalPages={totalPages}
                    onPageChange={(page) =>
                      setPagination((p) => ({ ...p, pageIndex: page - 1 }))
                    }
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    isDisabled={pagination.pageIndex >= totalPages - 1}
                    onClick={(e) => {
                      e.preventDefault();
                      setPagination((p) => ({
                        ...p,
                        pageIndex: Math.min(totalPages - 1, p.pageIndex + 1),
                      }));
                    }}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLast
                    href="#"
                    isDisabled={pagination.pageIndex >= totalPages - 1}
                    onClick={(e) => {
                      e.preventDefault();
                      setPagination((p) => ({
                        ...p,
                        pageIndex: totalPages - 1,
                      }));
                    }}
                  />
                </PaginationItem>
                <PaginationResultsPerPage>
                  <PaginationResultsPerPageLabel>
                    Results per page
                  </PaginationResultsPerPageLabel>
                  <Select
                    value={resultsPerPage}
                    onValueChange={(val) => {
                      setResultsPerPage(val);
                      setPagination({ pageIndex: 0, pageSize: Number(val) });
                    }}
                  >
                    <PaginationSelectTrigger>
                      <SelectValue />
                    </PaginationSelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                    </SelectContent>
                  </Select>
                </PaginationResultsPerPage>
              </div>
              <PaginationItem>
                <PaginationStatus>
                  showing {startRow}-{endRow} of {totalResults} results
                </PaginationStatus>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </DataGridFooter>
      </DataGrid>
    );
  },
};
