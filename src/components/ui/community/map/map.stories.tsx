import {
  SegmentedControl,
  SegmentedControlButton,
  SegmentedControlList,
} from '@cognite/aura/components';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { GeoJSONSourceSpecification } from 'maplibre-gl';
import { useEffect, useRef, useState } from 'react';

import {
  Map,
  type MapPaletteName,
  type MapRef,
  type MapViewport,
  useMap,
} from './map';

const meta: Meta<typeof Map> = {
  title: 'Community/Map',
  component: Map,
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'radio',
      options: [undefined, 'light', 'dark'],
      table: { category: 'Appearance' },
    },
    blank: {
      control: 'boolean',
      table: { category: 'Appearance', defaultValue: { summary: 'false' } },
    },
    loading: {
      control: 'boolean',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    zoom: {
      control: { type: 'number', min: 0, max: 22, step: 1 },
      table: { category: 'Viewport' },
    },
  },
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div className="h-96 w-full overflow-hidden rounded-lg border">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Map>;

export const Basic: Story = {
  parameters: { order: 1 },
  render: () => <Map center={[-74.006, 40.7128]} zoom={12} />,
};

function ControlledMapExample() {
  const [viewport, setViewport] = useState<MapViewport>({
    center: [-74.006, 40.7128],
    zoom: 8,
    bearing: 0,
    pitch: 0,
  });

  return (
    <Map viewport={viewport} onViewportChange={setViewport}>
      <div className="absolute top-2 left-2 z-10 flex flex-wrap gap-x-3 gap-y-1 rounded-md border bg-background/80 px-2 py-1.5 font-mono text-xs backdrop-blur">
        <span>
          <span className="text-muted-foreground">lng:</span>{' '}
          {viewport.center[0].toFixed(3)}
        </span>
        <span>
          <span className="text-muted-foreground">lat:</span>{' '}
          {viewport.center[1].toFixed(3)}
        </span>
        <span>
          <span className="text-muted-foreground">zoom:</span>{' '}
          {viewport.zoom.toFixed(1)}
        </span>
        <span>
          <span className="text-muted-foreground">bearing:</span>{' '}
          {viewport.bearing.toFixed(1)}°
        </span>
        <span>
          <span className="text-muted-foreground">pitch:</span>{' '}
          {viewport.pitch.toFixed(1)}°
        </span>
      </div>
    </Map>
  );
}

export const Controlled: Story = {
  parameters: { order: 2 },
  render: () => <ControlledMapExample />,
};

function createGraticule(step: number): GeoJSONSourceSpecification['data'] {
  const meridians: [number, number][][] = [];
  for (let lng = -180; lng <= 180; lng += step) {
    const line: [number, number][] = [];
    for (let lat = -80; lat <= 80; lat += 5) line.push([lng, lat]);
    meridians.push(line);
  }

  const parallels: [number, number][][] = [];
  for (let lat = -60; lat <= 60; lat += step) {
    const line: [number, number][] = [];
    for (let lng = -180; lng <= 180; lng += 5) line.push([lng, lat]);
    parallels.push(line);
  }

  return {
    type: 'FeatureCollection',
    features: [...meridians, ...parallels].map((coordinates) => ({
      type: 'Feature',
      properties: {},
      geometry: { type: 'LineString', coordinates },
    })),
  };
}

const GRATICULE = createGraticule(30);

function GraticuleLayer() {
  const { map, isLoaded, palette } = useMap();
  const lineColor = palette.mountain.highlight;

  useEffect(() => {
    if (!map || !isLoaded) return;

    map.addSource('graticule', { type: 'geojson', data: GRATICULE });
    map.addLayer({
      id: 'graticule',
      type: 'line',
      source: 'graticule',
      paint: { 'line-color': lineColor, 'line-width': 1 },
    });

    return () => {
      if (!map.style) return;
      if (map.getLayer('graticule')) map.removeLayer('graticule');
      if (map.getSource('graticule')) map.removeSource('graticule');
    };
  }, [map, isLoaded, lineColor]);

  return null;
}

export const BlankBasemap: Story = {
  parameters: { order: 3 },
  render: () => (
    <Map blank center={[10, 25]} zoom={1}>
      <GraticuleLayer />
    </Map>
  ),
};

const PALETTE_SITES: { name: MapPaletteName; center: [number, number] }[] = [
  { name: 'aurora', center: [-0.19, 51.53] },
  { name: 'dusk', center: [-0.08, 51.545] },
  { name: 'fjord', center: [0.02, 51.525] },
  { name: 'mountain', center: [-0.13, 51.505] },
  { name: 'nordic', center: [-0.21, 51.48] },
  { name: 'orange', center: [-0.06, 51.47] },
  { name: 'sky', center: [0.04, 51.49] },
];

function createSquare(
  [lng, lat]: [number, number],
  size: number
): [number, number][][] {
  return [
    [
      [lng - size, lat - size / 1.6],
      [lng + size, lat - size / 1.6],
      [lng + size, lat + size / 1.6],
      [lng - size, lat + size / 1.6],
      [lng - size, lat - size / 1.6],
    ],
  ];
}

function PaletteLayer() {
  const { map, isLoaded, palette } = useMap();

  useEffect(() => {
    if (!map || !isLoaded) return;

    map.addSource('palette-areas', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: PALETTE_SITES.map(({ name, center }) => ({
          type: 'Feature',
          properties: {
            fill: palette[name].fill,
            highlight: palette[name].highlight,
          },
          geometry: {
            type: 'Polygon',
            coordinates: createSquare(center, 0.022),
          },
        })),
      },
    });
    map.addSource('palette-points', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: PALETTE_SITES.map(({ name, center }) => ({
          type: 'Feature',
          properties: { highlight: palette[name].highlight },
          geometry: { type: 'Point', coordinates: center },
        })),
      },
    });
    map.addLayer({
      id: 'palette-areas-fill',
      type: 'fill',
      source: 'palette-areas',
      paint: { 'fill-color': ['get', 'fill'], 'fill-opacity': 0.7 },
    });
    map.addLayer({
      id: 'palette-areas-line',
      type: 'line',
      source: 'palette-areas',
      paint: { 'line-color': ['get', 'highlight'], 'line-width': 2 },
    });
    map.addLayer({
      id: 'palette-points',
      type: 'circle',
      source: 'palette-points',
      paint: {
        'circle-color': ['get', 'highlight'],
        'circle-radius': 6,
        'circle-stroke-color': palette.mountain.fill,
        'circle-stroke-width': 2,
      },
    });

    return () => {
      if (!map.style) return;
      for (const layer of [
        'palette-points',
        'palette-areas-line',
        'palette-areas-fill',
      ]) {
        if (map.getLayer(layer)) map.removeLayer(layer);
      }
      for (const source of ['palette-points', 'palette-areas']) {
        if (map.getSource(source)) map.removeSource(source);
      }
    };
  }, [map, isLoaded, palette]);

  return (
    <div className="absolute top-2 left-2 z-10 flex flex-wrap gap-x-3 gap-y-1 rounded-md border bg-background/80 px-2 py-1.5 text-xs backdrop-blur">
      {PALETTE_SITES.map(({ name }) => (
        <span key={name} className="flex items-center gap-1.5 capitalize">
          <span
            className="size-2.5 rounded-full"
            style={{ backgroundColor: palette[name].highlight }}
          />
          {name}
        </span>
      ))}
    </div>
  );
}

export const DecorativePalette: Story = {
  parameters: { order: 4 },
  render: () => (
    <Map center={[-0.09, 51.51]} zoom={10.5}>
      <PaletteLayer />
    </Map>
  ),
};

const CUSTOM_STYLES = {
  default: undefined,
  openstreetmap: 'https://tiles.openfreemap.org/styles/bright',
  openstreetmap3d: 'https://tiles.openfreemap.org/styles/liberty',
};

type StyleKey = keyof typeof CUSTOM_STYLES;

function isStyleKey(value: unknown): value is StyleKey {
  return typeof value === 'string' && value in CUSTOM_STYLES;
}

function CustomStyleExample() {
  const mapRef = useRef<MapRef>(null);
  const [style, setStyle] = useState<StyleKey>('default');
  const selectedStyle = CUSTOM_STYLES[style];
  const is3D = style === 'openstreetmap3d';

  useEffect(() => {
    mapRef.current?.easeTo({ pitch: is3D ? 60 : 0, duration: 500 });
  }, [is3D]);

  return (
    <Map
      ref={mapRef}
      center={[-0.1276, 51.5074]}
      zoom={15}
      styles={
        selectedStyle
          ? { light: selectedStyle, dark: selectedStyle }
          : undefined
      }
    >
      <div className="absolute top-2 right-2 z-10">
        <SegmentedControl
          value={style}
          onValueChange={(value) => {
            if (isStyleKey(value)) setStyle(value);
          }}
        >
          <SegmentedControlList size="small">
            <SegmentedControlButton value="default">
              Aura
            </SegmentedControlButton>
            <SegmentedControlButton value="openstreetmap">
              OpenStreetMap
            </SegmentedControlButton>
            <SegmentedControlButton value="openstreetmap3d">
              OSM 3D
            </SegmentedControlButton>
          </SegmentedControlList>
        </SegmentedControl>
      </div>
    </Map>
  );
}

export const CustomStyles: Story = {
  parameters: { order: 5 },
  render: () => <CustomStyleExample />,
};

export const Playground: Story = {
  parameters: { order: 99 },
  args: {
    center: [-0.1276, 51.5074],
    zoom: 10,
    blank: false,
    loading: false,
  },
  render: (args) => (
    <Map key={`${args.center?.toString()}-${args.zoom}`} {...args} />
  ),
};
