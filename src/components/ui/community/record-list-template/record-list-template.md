Use this guide when a Flows app needs a page built around a list of records. There are six record list layouts. Each one is a combination of one header and one body. Choose the header and the body separately, then combine them.

Install the template once:

```bash
pnpm dlx shadcn@latest add @aura/record-list-template
```

That adds one component. Use one layout on the page:

```tsx
<RecordListTemplate layout="full-width-header" />
```

A coding agent that installs this item asks you to pick one layout from the list before it writes the page. Another page in the same app passes a different `layout` value. Do not install the template again.

## Layout variants

- **Full width data grid + header.** Use this when the page is one list with one purpose the title can name. Start here when the request is vague.
- **Full width data grid + tabs.** Use this when the same list has several peer views, such as active and archived.
- **Left panel + data grid + header.** Use this when records belong to groups or a hierarchy and the user works within one group at a time. The panel picks the group, and the toolbar narrows within it.
- **Left panel + data grid + tabs.** Use this when grouped records also split into peer views. The left panel chooses the group, and tabs switch the view.
- **Data grid + right panel + header.** Use this when the user scans rows and needs a quick look at the selected one without leaving the list. Keep the preview a summary.
- **Data grid + right panel + tabs.** Use this when that triage happens inside peer views of related data. Selecting a row fills the preview.

## Full width data grid + header

Use this when the page is one list with one purpose the title can name. Start here when the request is vague.

## Full width data grid + tabs

Use this when the same list has several peer views, such as active and archived.

## Left panel + data grid + header

Use this when records belong to groups or a hierarchy and the user works within one group at a time. The panel picks the group, and the toolbar narrows within it.

## Left panel + data grid + tabs

Use this when grouped records also split into peer views. The left panel chooses the group, and tabs switch the view.

## Data grid + right panel + header

Use this when the user scans rows and needs a quick look at the selected one without leaving the list. Keep the preview a summary.

## Data grid + right panel + tabs

Use this when that triage happens inside peer views of related data. Selecting a row fills the preview.
