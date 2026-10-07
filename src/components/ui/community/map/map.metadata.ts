import type { ComponentMeta } from '../../../../lib/types';

export const MapMetadata: ComponentMeta = {
  name: 'Map',
  status: 'experimental',
  description:
    'An interactive map that matches your Aura theme, with coloured pins, labels, and overlays.',
  llmUsage:
    'Use a map to show where things are, such as sites, assets, or events. Add pins, labels, and status dots in Aura colours, and layer legends, cards, and controls on top.',
  notes: [
    'Built on [MapLibre GL JS](https://maplibre.org/projects/gl-js/) and adapted from [mapcn](https://www.mapcn.dev).',
  ],
};
