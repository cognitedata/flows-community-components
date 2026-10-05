import {
  SegmentedControl,
  SegmentedControlButton,
  SegmentedControlList,
} from '@cognite/aura/components';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { GeoJSONSourceSpecification } from 'maplibre-gl';
import { useEffect, useRef, useState } from 'react';

import { Map, type MapRef, type MapViewport, useMap } from './map';

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
  const { map, isLoaded, resolvedTheme } = useMap();
  const lineColor = resolvedTheme === 'dark' ? '#a1a1aa' : '#52525b';

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
              Carto
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
  parameters: { order: 4 },
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
