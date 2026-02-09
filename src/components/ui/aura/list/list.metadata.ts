import type { ComponentMeta } from "@/lib/component-examples";

export const ListMetadata: ComponentMeta = {
  name: "List",
  status: "draft",
  description:
    "Composable list primitives for unordered, ordered, and description lists with status-ready list items.",
  llmUsage:
    "Use `<List>`, `<ListOrdered>`, or `<ListDescription>` for semantic lists. Compose list items with `<ListItem>` and the slots `<ListItemTitle>`, `<ListItemDescription>`, and `<ListItemStatus>`. Set `variant` on `<ListItem>` to apply built-in status icon and color styles, and override icons by passing custom SVGs into `<ListItemIcon>`.",
};
