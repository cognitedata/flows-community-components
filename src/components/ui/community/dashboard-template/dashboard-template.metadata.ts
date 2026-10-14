import type { ComponentMeta } from '../../../../lib/types';

export const DashboardTemplateMetadata: ComponentMeta = {
  name: 'Dashboard',
  status: 'pattern',
  description:
    'Dashboard layouts for a read-only overview, an optional side panel, and an optional data grid with preview.',
  llmUsage: `Ask which dashboard layout the user wants, then install only that one.

pnpm dlx shadcn@latest add @aura/dashboard-header
pnpm dlx shadcn@latest add @aura/dashboard-tabs
pnpm dlx shadcn@latest add @aura/dashboard-panel-header
pnpm dlx shadcn@latest add @aura/dashboard-panel-tabs
pnpm dlx shadcn@latest add @aura/dashboard-grid-header
pnpm dlx shadcn@latest add @aura/dashboard-grid-tabs
pnpm dlx shadcn@latest add @aura/dashboard-preview-header
pnpm dlx shadcn@latest add @aura/dashboard-preview-tabs

Use a page header or tabs, never both. Put the primary action in the header on dashboard-only layouts, or in the grid toolbar on grid layouts. Open the right panel only after a row is selected, and do not mix it with checkboxes.`,
};
