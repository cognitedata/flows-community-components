import type { ComponentMeta } from '../../../../lib/types';

export const TopbarMetadata: ComponentMeta = {
  name: 'Topbar',
  status: 'experimental',
  description:
    'Application topbar with breadcrumb and action slots. Prefer @cognite/aura Core Topbar when it covers your needs.',
  llmUsage:
    'Use `<Topbar>` with left, center, right, breadcrumbs, and action slots.',
  notes: ['Prefer the @cognite/aura Core version when it covers your needs.'],
};
