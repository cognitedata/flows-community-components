import type { ComponentMeta } from '../../../../lib/types';

/**
 * Tree Component Metadata
 *
 * This metadata is used by the documentation system to generate
 * component documentation pages and provide context for LLMs.
 */
export const TreeMetadata: ComponentMeta = {
  name: 'Tree',
  status: 'draft',
  description:
    'A hierarchical tree view component for displaying nested data structures with collapsible nodes and status indicators that bubble up from children to parents.',
  llmUsage:
    "Use `<Tree>` with nested `<TreeItem>` components for hierarchical data. Each TreeItem needs a unique `value` and `label`. Add `status='warning'` or `status='error'` to show indicators. Use `defaultExpanded` for initially open nodes.",
};
