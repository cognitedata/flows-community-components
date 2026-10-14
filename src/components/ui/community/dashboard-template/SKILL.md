---
name: aura-dashboard
description: Choose one Aura dashboard layout and install only that layout. Use when the user wants an operations overview, KPI tiles, a plant status page, a dashboard with a side panel, or a dashboard above a data grid. Ask which layout before scaffolding a page.
---

# Choose one dashboard layout

A dashboard is a read-only monitoring page: metric tiles, a status view, and charts. Add a data grid only when people also need to work a list of records. Add a preview only when they need one record without leaving that list.

If the user has not already named a layout, stop and ask them to pick one item from this list. Do not guess. Do not scaffold more than one page. Then run only that layout's install command.

Each step below adds one thing, and only applies when the step before it is already true.

## 1. Top-level frame

Use a **page header** or **tabs**, never both.

- **Page header** when the dashboard is one standalone page, usually an entry point from navigation. It gives the page a title, a description, and optional actions, including one primary action furthest right.
- **Tabs** when there are several sibling views at the same level that people skim between. The tab labels carry the context, so a title and a page-level action would be redundant. Keep the tab count low. Past five or six, a side panel is usually the better navigation.

With tabs, there is no page-level action. The only place a primary action may appear is the toolbar above a data grid.

## 2. Content

1. **Dashboard + header.** Read-only monitoring. People glance, spot an anomaly, and leave. Examples: operations overview, plant status, energy trends.

   ```bash
   pnpm dlx shadcn@latest add @aura/dashboard-header
   ```

   Render `<DashboardHeader />`.

2. **Dashboard + tabs.** The same read-only dashboard, split into sibling views.

   ```bash
   pnpm dlx shadcn@latest add @aura/dashboard-tabs
   ```

   Render `<DashboardTabs />`.

3. **Left panel + dashboard + header.** The content changes with a scope, such as a site, rig, or well, or the area has about six or more destinations that need grouping.

   ```bash
   pnpm dlx shadcn@latest add @aura/dashboard-panel-header
   ```

   Render `<DashboardPanelHeader />`.

4. **Left panel + dashboard + tabs.** The panel picks the scope. The tabs pick the view inside that scope. Those are different levels of navigation.

   ```bash
   pnpm dlx shadcn@latest add @aura/dashboard-panel-tabs
   ```

   Render `<DashboardPanelTabs />`.

5. **Dashboard + data grid + header.** People scan, sort, filter, and act on many records, and a short summary frames the list. Examples: an asset list or a work order backlog.

   ```bash
   pnpm dlx shadcn@latest add @aura/dashboard-grid-header
   ```

   Render `<DashboardGridHeader />`.

6. **Dashboard + data grid + tabs.** The same summary and grid, under sibling views.

   ```bash
   pnpm dlx shadcn@latest add @aura/dashboard-grid-tabs
   ```

   Render `<DashboardGridTabs />`.

7. **Dashboard + data grid + right panel + header.** People triage many records and need a quick look at one without losing their place. Examples: alarms, incidents, work orders.

   ```bash
   pnpm dlx shadcn@latest add @aura/dashboard-preview-header
   ```

   Render `<DashboardPreviewHeader />`.

8. **Dashboard + data grid + right panel + tabs.** The same single-select grid and preview, with tabs instead of a page header.

   ```bash
   pnpm dlx shadcn@latest add @aura/dashboard-preview-tabs
   ```

   Render `<DashboardPreviewTabs />`.

The reference implementations live in `@aura/dashboard-template`. Each command above installs that shared template, then the one layout component.

## Rules

**Frame**

- Use either a page header or tabs, never both.
- Do not put a page-level action in a tabs frame.
- A primary action in a tabs layout belongs in the toolbar above the data grid, or it is omitted.
- Keep one primary action per view: in the page header on dashboard-only layouts, or in the grid toolbar on grid layouts.
- Use tabs only for sibling views at the same level.

**Side panel**

- Give it one role: quick filter or internal navigation.
- Add it when scope selection, or six or more grouped destinations, justifies a persistent panel.
- Two or three filters belong in the toolbar.

**Data grid**

- Keep the summary above the grid to one compact row.
- Use checkboxes only when bulk actions exist.
- Do not put large charts and a full grid in the same view.
- If the grid is the whole point of the page, use a record list layout instead.
- If the charts are the main content, use layout 1 or 2.

**Preview**

- Single-select, with no checkboxes.
- Keep the preview closed until a row is selected. The grid uses the full width until then.
- The preview is a summary. Full information lives on the detail page behind View details.
- Do not combine a preview with bulk actions. Single-select and multi-select do not mix.
