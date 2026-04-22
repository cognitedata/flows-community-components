import type { ComponentMeta } from '../../../../lib/types';

export const DataGridMetadata: ComponentMeta = {
  name: 'DataGrid',
  status: 'in-progress-code-review',
  description:
    'A data grid component with column pinning, row selection, sorting, virtualization, and pagination support, built with TanStack Table and CSS Grid.',
  llmUsage:
    "Use `<DataGrid data={data} columns={columns} />` for tabular data with advanced features like pinned columns, sorting, and row selection. Define columns using TanStack's `ColumnDef` type. Compose optional header and footer sections with slot wrappers like `<DataGridHeader>`, `<DataGridHeaderCenter>`, `<DataGridHeaderEnd>`, and `<DataGridFooter>`.",
};
