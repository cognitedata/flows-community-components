import type { ComponentMeta } from '../../../../lib/types';

export const ListMetadata: ComponentMeta = {
  name: 'List',
  status: 'in-progress-code-review',
  description:
    'Composable list primitives for unordered, ordered, and description lists.',
  llmUsage:
    'Use `<List type="ul|ol|dl">` for semantic list containers (`ul` default). Use `<ListHeading>` for list-level headings, `<ListItem>` for list entries, and `<ListItemIcon>` when an item needs a leading icon slot. Use `<ListDescriptionTerm>`/`<ListDescriptionDescription>` for description list pairs.',
};
