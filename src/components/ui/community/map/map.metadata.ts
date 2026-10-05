import type { ComponentMeta } from '../../../../lib/types';

export const MapMetadata: ComponentMeta = {
  name: 'Map',
  status: 'experimental',
  description: 'Interactive MapLibre GL map with theme-aware basemaps.',
  llmUsage:
    'Wrap `<Map>` in a sized container and set `center` ([lng, lat]) and `zoom`. Pass `viewport` with `onViewportChange` for controlled mode, `blank` for a tile-less canvas, or `styles={{ light, dark }}` for custom basemaps. Use `useMap()` inside children to access the MapLibre instance and add sources/layers once `isLoaded` is true.',
  notes: [
    'Adapted from mapcn (MIT) by Anmoldeep Singh: https://www.mapcn.dev/docs/basic-map',
    'Default basemaps are Carto Positron (light) and Dark Matter (dark), switched automatically from the document theme.',
    'The MapLibre worker is loaded from unpkg unless `setWorkerUrl` has already been called.',
  ],
};
