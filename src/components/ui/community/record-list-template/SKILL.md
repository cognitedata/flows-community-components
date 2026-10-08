---
name: aura-record-list
description: Add one record list page to a Flows app. Ask which layout the user wants, then run that layout's install command and render the component it adds. Use when the user wants a list of records, a table page, filters, a side panel, or a row preview. The toolbar can switch that layout between table and card view.
---

# Choose one record list layout

If the user has not already named a layout, stop and ask them to pick one item from this list. Do not guess. Do not scaffold more than one page. Then run only that layout's install command.

1. **Full width data grid + header.** One table, one purpose the title can name. Start here when the request is vague.

   ```bash
   pnpm dlx shadcn@latest add @aura/record-list-full-width-header
   ```

   Render `<RecordListFullWidthHeader />`.

2. **Full width data grid + tabs.** Several peer views of the same list, such as active and archived.

   ```bash
   pnpm dlx shadcn@latest add @aura/record-list-full-width-tabs
   ```

   Render `<RecordListFullWidthTabs />`.

3. **Left panel + data grid + header.** Records belong to groups or a hierarchy. The panel picks the group. The toolbar narrows within it.

   ```bash
   pnpm dlx shadcn@latest add @aura/record-list-left-panel-header
   ```

   Render `<RecordListLeftPanelHeader />`.

4. **Left panel + data grid + tabs.** Grouped records that also split into peer views. Tabs replace the page title.

   ```bash
   pnpm dlx shadcn@latest add @aura/record-list-left-panel-tabs
   ```

   Render `<RecordListLeftPanelTabs />`.

5. **Data grid + right panel + header.** Scan rows and peek at the selected one without leaving the list.

   ```bash
   pnpm dlx shadcn@latest add @aura/record-list-right-panel-header
   ```

   Render `<RecordListRightPanelHeader />`.

6. **Data grid + right panel + tabs.** That same triage, inside peer views. Do not combine this with a left panel.

   ```bash
   pnpm dlx shadcn@latest add @aura/record-list-right-panel-tabs
   ```

   Render `<RecordListRightPanelTabs />`.

## Match the request

Use this to recommend a layout. If the request does not clearly match, ask. Do not guess.

- Review, filter, or act on a list, and nothing else: full width data grid + header.
- Move between groups or a hierarchy, then work within one: left panel + data grid + header.
- Triage rows and peek at the selected one without leaving the list: data grid + right panel + header.
- The same list has several peer views: use the tabs version of that body. Tabs replace the page title.

## Do not

- Do not use the left panel when the task is editing the selection. Heavy editing belongs on a detail page or in a dialog.
- Keep the right panel a summary. The preview is not an editing surface.
- Do not use tabs for two or fewer views, or for steps in a process.
- Do not put the same filter in both the left panel and the toolbar. The panel picks the group. The toolbar narrows within it.
- Do not stack a left panel and a right preview on the same page.
- If the page is mostly one chart, with a table only supporting it, this template is the wrong choice.

Each command installs that layout and the shared record list files. Import the component from `@/components/ui/community/<registry-name>`. Leave the app topbar to the shell. Replace the sample rows. Do not pass a `layout` prop.

Read `record-list-template.md` for the short when-to-use note on each layout.
