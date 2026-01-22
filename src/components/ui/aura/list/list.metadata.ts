import type { ComponentMeta } from "@/lib/component-examples";

export const ListMetadata: ComponentMeta = {
  name: "List",
  status: "draft",
  description:
    "Composable list primitives for unordered, ordered, and description lists with timeline-ready list items.",
  llmUsage:
    "Use `<List>`, `<ListOrdered>`, or `<ListDescription>` for semantic lists. Compose list items with `<ListItem>` and the header slots `<ListItemIcon>`, `<ListItemTitle>`, `<ListItemDescription>`, and `<ListItemTimeline>`. Set `state` on `<ListItem>` to apply built-in timeline icon and color styles, and override icons by passing custom SVGs into `<ListItemIcon>`.",
  importPath: "@/components/ui/aura/list",
};
