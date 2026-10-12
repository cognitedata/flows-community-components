import type { ComponentMeta } from '../../../../lib/types';

import { mapLayouts, mapLayoutRegistryId } from './map-layout-template.data';

const installLines = mapLayouts
  .map(
    (l) =>
      `- **${l.name}**: \`pnpm dlx shadcn@latest add @aura/${mapLayoutRegistryId(l.id)}\` → renders \`<${l.component} />\``
  )
  .join('\n');

export const MapLayoutTemplateMetadata: ComponentMeta = {
  name: 'Map layout',
  status: 'experimental',
  description:
    'Four map page layouts for industrial apps: left panel + map + right panel, map + right panel, horizontal split with data grid and right panel, and horizontal split with full-width data grid.',
  llmUsage: `Use the map layout template when a page centres on a geographic or spatial view. Choose the layout based on what the user needs next to the map.\n\n${installLines}`,
};
