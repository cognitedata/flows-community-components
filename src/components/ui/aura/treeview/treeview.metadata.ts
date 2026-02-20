import type { ComponentMeta } from '../../../../lib/types';

export const TreeViewMetadata: ComponentMeta = {
  name: 'TreeView',
  status: 'in-progress-code-review',
  description:
    'A hierarchical tree view component for displaying nested data structures with collapsible nodes and status indicators that bubble up from children to parents.',
  llmUsage:
    "Use `<TreeView>` with nested `<TreeViewItem>` components for hierarchical data. Each TreeViewItem needs a unique `value` and `label`. Add `status='warning'` or `status='error'` to show indicators. Use `defaultExpanded` for initially open nodes.",
};
