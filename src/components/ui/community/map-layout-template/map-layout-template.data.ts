export const mapLayouts = [
  {
    id: 'left-right-panels',
    name: 'Left panel + map + right panel',
    component: 'MapLeftRightPanels',
  },
  {
    id: 'right-panel',
    name: 'Map + right panel',
    component: 'MapRightPanel',
  },
  {
    id: 'grid-right-panel',
    name: 'Horizontal split: map + data grid + right panel',
    component: 'MapGridRightPanel',
  },
  {
    id: 'grid-full-width',
    name: 'Horizontal split: map + data grid',
    component: 'MapGridFullWidth',
  },
] as const;

export type MapLayout = (typeof mapLayouts)[number]['id'];

export type MapView = 'map' | 'satellite';

export const mapLayoutNames = mapLayouts.map((layout) => layout.name);

export function mapLayoutRegistryId(id: MapLayout): string {
  return `map-layout-${id}`;
}

export const mapPageTitle = 'Site locations';

export const mapPageDescription =
  'Operational sites and equipment across the region';

export const mapPrimaryAction = 'Add location';

export const mapSecondaryAction = 'Export';

export type MapLayerGroup = {
  id: string;
  label: string;
  items: readonly MapLayer[];
};

export type MapLayer = {
  id: string;
  label: string;
  icon: 'pump' | 'valve' | 'sensor' | 'pipeline' | 'compressor' | 'turbine';
  checked: boolean;
  children?: readonly MapLayer[];
};

export const mapLayerGroups: MapLayerGroup[] = [
  {
    id: 'equipment',
    label: 'Equipment',
    items: [
      { id: 'pumps', label: 'Pumps', icon: 'pump', checked: true },
      { id: 'valves', label: 'Valves', icon: 'valve', checked: true },
      {
        id: 'compressors',
        label: 'Compressors',
        icon: 'compressor',
        checked: true,
        children: [
          {
            id: 'centrifugal',
            label: 'Centrifugal',
            icon: 'compressor',
            checked: true,
          },
          {
            id: 'reciprocating',
            label: 'Reciprocating',
            icon: 'compressor',
            checked: true,
          },
        ],
      },
      { id: 'turbines', label: 'Turbines', icon: 'turbine', checked: false },
    ],
  },
  {
    id: 'sensors',
    label: 'Sensors',
    items: [
      {
        id: 'temp-sensors',
        label: 'Temperature sensors',
        icon: 'sensor',
        checked: true,
      },
      {
        id: 'pressure-sensors',
        label: 'Pressure sensors',
        icon: 'sensor',
        checked: true,
      },
      {
        id: 'flow-sensors',
        label: 'Flow sensors',
        icon: 'sensor',
        checked: false,
      },
    ],
  },
  {
    id: 'infrastructure',
    label: 'Infrastructure',
    items: [
      {
        id: 'pipelines',
        label: 'Pipelines',
        icon: 'pipeline',
        checked: true,
      },
      {
        id: 'power-lines',
        label: 'Power distribution',
        icon: 'pipeline',
        checked: true,
      },
      {
        id: 'storage-tanks',
        label: 'Storage tanks',
        icon: 'valve',
        checked: true,
      },
    ],
  },
];

export const mapLayerListViews = ['tree', 'item'] as const;

export type MapLayerListView = (typeof mapLayerListViews)[number];

export type MapLayerNode = {
  name: string;
  children: readonly string[];
};

export const mapLayerRootId = 'layers';

function indexMapLayers(groups: readonly MapLayerGroup[]): {
  items: Record<string, MapLayerNode>;
  expanded: string[];
  checked: string[];
} {
  const items: Record<string, MapLayerNode> = {
    [mapLayerRootId]: {
      name: 'Layers',
      children: groups.map((group) => group.id),
    },
  };
  const expanded = [mapLayerRootId];
  const checked: string[] = [];

  function addLayer(layer: MapLayer): void {
    const children = layer.children?.map((child) => child.id) ?? [];
    items[layer.id] = { name: layer.label, children };
    if (children.length > 0) {
      expanded.push(layer.id);
    }
    if (layer.checked) {
      checked.push(layer.id);
    }
    layer.children?.forEach(addLayer);
  }

  for (const group of groups) {
    items[group.id] = {
      name: group.label,
      children: group.items.map((item) => item.id),
    };
    expanded.push(group.id);
    group.items.forEach(addLayer);
  }

  return { items, expanded, checked };
}

const indexedMapLayers = indexMapLayers(mapLayerGroups);

export const mapLayerNodes = indexedMapLayers.items;

export function mapLayerSelection(id: string): {
  name: string;
  description: string;
} | null {
  const node = mapLayerNodes[id];
  if (!node || id === mapLayerRootId) {
    return null;
  }
  const parent = Object.values(mapLayerNodes).find((entry) =>
    entry.children.includes(id)
  );
  const childNames = node.children
    .map((childId) => mapLayerNodes[childId]?.name)
    .filter((name): name is string => name !== undefined);
  return {
    name: node.name,
    description:
      childNames.length > 0
        ? childNames.join(', ')
        : (parent?.name ?? 'Map layer'),
  };
}

export const mapLayerDefaultExpanded = indexedMapLayers.expanded;

export const mapLayerDefaultChecked = indexedMapLayers.checked;

export type MapAssetStatus = 'Online' | 'Warning' | 'Offline' | 'Maintenance';

export const mapAssetStatuses: Record<
  MapAssetStatus,
  'success' | 'warning' | 'error' | 'secondary'
> = {
  Online: 'success',
  Warning: 'warning',
  Offline: 'error',
  Maintenance: 'secondary',
};

export type MapSiteRow = {
  id: string;
  name: string;
  type: string;
  area: string;
  status: MapAssetStatus;
  lastInspection: string;
  latitude: number;
  longitude: number;
  owner: string;
  description: string;
};

export const mapSiteRows: MapSiteRow[] = [
  {
    id: 'site-001',
    name: 'Charge pump P-101A',
    type: 'Centrifugal pump',
    area: 'Stavanger',
    status: 'Online',
    lastInspection: '2026-09-15',
    latitude: 58.97,
    longitude: 5.733,
    owner: 'M. Andersen',
    description: 'Primary charge pump for CDU feed. 450 kW motor, 3560 RPM.',
  },
  {
    id: 'site-002',
    name: 'Relief valve RV-204',
    type: 'Pressure relief',
    area: 'Oslo',
    status: 'Warning',
    lastInspection: '2026-08-22',
    latitude: 59.913,
    longitude: 10.752,
    owner: 'K. Larsen',
    description: 'Set pressure 42 bar. Downstream of reactor R-201.',
  },
  {
    id: 'site-003',
    name: 'Compressor C-301',
    type: 'Reciprocating',
    area: 'Rotterdam',
    status: 'Maintenance',
    lastInspection: '2026-07-30',
    latitude: 51.9,
    longitude: 4.4,
    owner: 'E. Haugen',
    description:
      'Two-stage reciprocating compressor. Scheduled overhaul in Q4.',
  },
  {
    id: 'site-004',
    name: 'Turbine GT-401',
    type: 'Gas turbine',
    area: 'Dogger Bank',
    status: 'Online',
    lastInspection: '2026-09-01',
    latitude: 54.75,
    longitude: 1.9,
    owner: 'S. Berg',
    description:
      '32 MW gas turbine driving generator G-401. 98.2% availability.',
  },
  {
    id: 'site-005',
    name: 'Flow sensor FT-102',
    type: 'Coriolis meter',
    area: 'Aberdeen',
    status: 'Online',
    lastInspection: '2026-09-10',
    latitude: 57.149,
    longitude: -2.094,
    owner: 'J. Vik',
    description: 'Measures CDU overhead flow. Range 0–500 m³/h.',
  },
  {
    id: 'site-006',
    name: 'Heat exchanger E-501',
    type: 'Shell and tube',
    area: 'Esbjerg',
    status: 'Warning',
    lastInspection: '2026-06-18',
    latitude: 55.476,
    longitude: 8.452,
    owner: 'A. Nilsen',
    description: 'Cooling water exchanger. Fouling trend above threshold.',
  },
  {
    id: 'site-007',
    name: 'Storage tank TK-601',
    type: 'Floating roof',
    area: 'Hamburg',
    status: 'Online',
    lastInspection: '2026-08-05',
    latitude: 53.55,
    longitude: 9.99,
    owner: 'T. Johansen',
    description:
      'Crude oil storage, 50 000 m³ capacity. Level at 72% as of last reading.',
  },
  {
    id: 'site-008',
    name: 'Pressure sensor PT-203',
    type: 'Differential pressure',
    area: 'Bergen',
    status: 'Offline',
    lastInspection: '2026-09-20',
    latitude: 60.39,
    longitude: 5.32,
    owner: 'R. Dahl',
    description: 'Reactor bed ΔP monitoring. Currently out of service.',
  },
  {
    id: 'site-009',
    name: 'Pipeline PL-701',
    type: 'Transfer line',
    area: 'Antwerp',
    status: 'Online',
    lastInspection: '2026-07-12',
    latitude: 51.22,
    longitude: 4.4,
    owner: 'L. Svendsen',
    description: '16″ crude transfer line from jetty to tank farm. 3.2 km.',
  },
  {
    id: 'site-010',
    name: 'Valve MOV-105',
    type: 'Motor-operated valve',
    area: 'Aarhus',
    status: 'Online',
    lastInspection: '2026-09-18',
    latitude: 56.15,
    longitude: 10.21,
    owner: 'M. Andersen',
    description: 'CDU feed isolation. Actuator type: electric, 24 VDC.',
  },
];

export function formatMapDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
