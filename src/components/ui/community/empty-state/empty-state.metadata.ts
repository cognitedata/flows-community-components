import type { ComponentMeta } from '../../../../lib/types';

export const EmptyStateMetadata: ComponentMeta = {
  name: 'EmptyState',
  status: 'experimental',
  description:
    'Empty state layout with optional action. Prefer @cognite/aura Core EmptyState when it covers your needs.',
  llmUsage:
    'Use `<EmptyState>` for empty list or no-data layouts with optional action.',
  notes: ['Prefer the @cognite/aura Core version when it covers your needs.'],
};
