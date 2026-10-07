import {
  Badge,
  Card,
  CardDescription,
  CardHeader,
  CardHeaderCenter,
  CardHeaderEnd,
  CardTitle,
} from '@cognite/aura/components';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  IconBolt,
  IconBuildingFactory2,
  IconBuildingWarehouse,
  IconDroplet,
  IconTruck,
  IconWindmill,
  type Icon as TablerIcon,
} from '@tabler/icons-react';
import { useState } from 'react';

import {
  Map,
  MapLegend,
  MapLegendItem,
  MapMarker,
  MapMarkerDot,
  MapMarkerLabel,
  MapOverlay,
  MapPin,
  MapViewportInfo,
  type MapPaletteName,
  type MapStatus,
  type MapViewport,
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
  render: () => <Map center={[10, 54]} zoom={3} />,
};

export const Controlled: Story = {
  parameters: { order: 2 },
  render: function Render() {
    const [viewport, setViewport] = useState<MapViewport>({
      center: [10, 61],
      zoom: 4,
      bearing: 0,
      pitch: 0,
    });

    return (
      <Map viewport={viewport} onViewportChange={setViewport}>
        <MapViewportInfo viewport={viewport} />
      </Map>
    );
  },
};

type AssetStatus = 'Running' | 'Maintenance' | 'Offline';

type Asset = {
  id: string;
  name: string;
  kind: string;
  color: MapPaletteName;
  status: AssetStatus;
  icon: TablerIcon;
  coordinates: [number, number];
};

const ASSETS: Asset[] = [
  {
    id: 'stavanger',
    name: 'Stavanger Substation',
    kind: 'Substation',
    color: 'fjord',
    status: 'Running',
    icon: IconBolt,
    coordinates: [5.733, 58.97],
  },
  {
    id: 'oslo',
    name: 'Oslo Water Treatment',
    kind: 'Water treatment',
    color: 'sky',
    status: 'Maintenance',
    icon: IconDroplet,
    coordinates: [10.752, 59.913],
  },
  {
    id: 'rotterdam',
    name: 'Rotterdam Plant',
    kind: 'Manufacturing',
    color: 'dusk',
    status: 'Running',
    icon: IconBuildingFactory2,
    coordinates: [4.4, 51.9],
  },
  {
    id: 'dogger-bank',
    name: 'Dogger Bank Wind Farm',
    kind: 'Wind farm',
    color: 'aurora',
    status: 'Running',
    icon: IconWindmill,
    coordinates: [1.9, 54.75],
  },
  {
    id: 'aberdeen',
    name: 'Aberdeen Depot',
    kind: 'Logistics',
    color: 'orange',
    status: 'Offline',
    icon: IconTruck,
    coordinates: [-2.094, 57.149],
  },
  {
    id: 'esbjerg',
    name: 'Esbjerg Warehouse',
    kind: 'Storage',
    color: 'nordic',
    status: 'Running',
    icon: IconBuildingWarehouse,
    coordinates: [8.452, 55.476],
  },
];

const STATUS_TONES: Record<AssetStatus, MapStatus> = {
  Running: 'success',
  Maintenance: 'warning',
  Offline: 'critical',
};

const STATUS_BADGES: Record<AssetStatus, 'success' | 'warning' | 'error'> = {
  Running: 'success',
  Maintenance: 'warning',
  Offline: 'error',
};

const ASSETS_CENTER: [number, number] = [4.5, 56.6];

const ASSETS_ZOOM = 3.8;

export const Pins: Story = {
  parameters: { order: 5 },
  render: () => (
    <Map center={ASSETS_CENTER} zoom={ASSETS_ZOOM}>
      {ASSETS.map(({ id, color, icon: Icon, coordinates }) => (
        <MapMarker
          key={id}
          longitude={coordinates[0]}
          latitude={coordinates[1]}
          anchor="bottom"
        >
          <MapPin color={color}>
            <Icon />
          </MapPin>
        </MapMarker>
      ))}
    </Map>
  ),
};

export const LabelledMarkers: Story = {
  parameters: { order: 6 },
  render: () => (
    <Map center={ASSETS_CENTER} zoom={ASSETS_ZOOM}>
      {ASSETS.map((asset) => (
        <MapMarker
          key={asset.id}
          longitude={asset.coordinates[0]}
          latitude={asset.coordinates[1]}
          anchor="bottom"
          className="flex flex-col items-center gap-1"
        >
          <MapMarkerLabel color={asset.color} dot>
            {asset.name}
          </MapMarkerLabel>
          <MapMarkerDot color={asset.color} />
        </MapMarker>
      ))}
    </Map>
  ),
};

export const StatusMarkers: Story = {
  parameters: { order: 7 },
  render: () => (
    <Map center={ASSETS_CENTER} zoom={ASSETS_ZOOM}>
      {ASSETS.map(({ id, name, status, coordinates }) => (
        <MapMarker
          key={id}
          longitude={coordinates[0]}
          latitude={coordinates[1]}
        >
          <MapMarkerDot
            role="img"
            aria-label={`${name}: ${status}`}
            status={STATUS_TONES[status]}
            pulse={status !== 'Offline'}
            size="large"
          />
        </MapMarker>
      ))}
      <MapLegend>
        {Object.entries(STATUS_TONES).map(([label, status]) => (
          <MapLegendItem key={label} status={status}>
            {label}
          </MapLegendItem>
        ))}
      </MapLegend>
    </Map>
  ),
};

export const InteractiveMarkers: Story = {
  parameters: { order: 8 },
  render: function Render() {
    const [selectedId, setSelectedId] = useState<string | null>('stavanger');
    const selected = ASSETS.find((asset) => asset.id === selectedId);

    return (
      <Map center={ASSETS_CENTER} zoom={ASSETS_ZOOM}>
        {ASSETS.map(({ id, name, color, icon: Icon, coordinates }) => (
          <MapMarker
            key={id}
            longitude={coordinates[0]}
            latitude={coordinates[1]}
            anchor="bottom"
          >
            <MapPin
              render={<button type="button" />}
              color={color}
              selected={selectedId === id}
              aria-label={name}
              aria-pressed={selectedId === id}
              className="cursor-pointer"
              onClick={() =>
                setSelectedId((current) => (current === id ? null : id))
              }
            >
              <Icon />
            </MapPin>
          </MapMarker>
        ))}
        {selected && (
          <MapOverlay position="bottom-left" render={<Card />} className="w-72">
            <CardHeader>
              <CardHeaderCenter>
                <CardTitle>{selected.name}</CardTitle>
                <CardDescription>{selected.kind}</CardDescription>
              </CardHeaderCenter>
              <CardHeaderEnd>
                <Badge variant={STATUS_BADGES[selected.status]} dot>
                  {selected.status}
                </Badge>
              </CardHeaderEnd>
            </CardHeader>
          </MapOverlay>
        )}
      </Map>
    );
  },
};
