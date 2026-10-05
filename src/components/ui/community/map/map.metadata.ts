import type { ComponentMeta } from '../../../../lib/types';

export const MapMetadata: ComponentMeta = {
  name: 'Map',
  status: 'experimental',
  description: 'Interactive MapLibre GL map styled with Aura colour tokens.',
  llmUsage:
    'Wrap `<Map>` in a sized container and set `center` ([lng, lat]) and `zoom`. Pass `viewport` with `onViewportChange` for controlled mode, `blank` for a tile-less canvas, or `styles={{ light, dark }}` for custom basemaps. Use `useMap()` inside children to access the MapLibre instance and add sources/layers once `isLoaded` is true. Colour highlights with `useMap().palette` (Aura decorative colours: aurora, dusk, fjord, mountain, nordic, orange, sky) — use `highlight` for strokes, points, and lines and `fill` for areas; never hard-code hex values.',
  notes: [
    'Adapted from mapcn (MIT) by Anmoldeep Singh: https://www.mapcn.dev/docs/basic-map',
    'The default basemap uses free OpenFreeMap vector tiles (no API key; OpenStreetMap/OpenMapTiles attribution) recoloured with Aura base tokens (background, card, border, foreground). It follows light/dark mode and theme overrides. Custom `styles` and `blank` are left as-is.',
    '`useMap().palette` resolves Aura decorative tokens to concrete colours for MapLibre paint properties; `highlight` is whichever half of each decorative pair contrasts most with the background.',
    'The MapLibre worker is loaded from unpkg unless `setWorkerUrl` has already been called.',
  ],
};
