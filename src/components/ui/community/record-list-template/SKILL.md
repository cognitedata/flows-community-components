---
name: aura-record-list
description: Add one record list page to a Flows app. After installing @aura/record-list-template, ask the user to pick a single layout from the list and render only that layout. Use when the user wants a list of records, a table page, filters, a side panel, or a row preview. The toolbar can switch that layout between table and card view.
---

# Choose one record list layout

Install the template once:

```bash
pnpm dlx shadcn@latest add @aura/record-list-template
```

That copies one component, `RecordListTemplate`, plus this skill. Do not run the command again for another layout. A second page in the same app passes a different `layout` value to the same component.

## Ask which layout

If the user has not already named a layout, stop and ask them to pick one item from this list. Do not guess. Do not scaffold more than one page.

1. **Full width data grid + header** (`full-width-header`). One table, one purpose the title can name. Start here when the request is vague.
2. **Full width data grid + tabs** (`full-width-tabs`). Several peer views of the same list, such as active and archived.
3. **Left panel + data grid + header** (`left-panel-header`). Records belong to groups or a hierarchy. The panel picks the group. The toolbar narrows within it.
4. **Left panel + data grid + tabs** (`left-panel-tabs`). Grouped records that also split into peer views. Tabs replace the page title.
5. **Data grid + right panel + header** (`right-panel-header`). Scan rows and peek at the selected one without leaving the list.
6. **Data grid + right panel + tabs** (`right-panel-tabs`). That same triage, inside peer views. Do not combine this with a left panel.

Then render only the chosen layout inside the app shell. Leave the app topbar to the shell. Replace the sample rows.

```tsx
<RecordListTemplate layout="full-width-header" />
```

Read `record-list-template.md` for the full guide. Pick one body and one header. Do not stack a left panel and a right preview on the same page.
