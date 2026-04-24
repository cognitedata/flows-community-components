import type { ComponentMeta } from '../../../../lib/types';

export const EventItemMetadata: ComponentMeta = {
  name: 'EventItem',
  status: 'in-progress-code-review',
  description:
    'Composable event content block with status variants, computed due-state labels, and date display formatting.',
  llmUsage:
    'Use `<EventItem>` inside containers like `<ListItem>`. Provide `date`, `completed`, and optional `now` to drive computed labels in `<EventItemStatus>`. Compose content with `<EventItemIcon>`, `<EventItemTitle>`, and either `<EventItemDescription>` or `<EventItemDate format=...>`.',
};
