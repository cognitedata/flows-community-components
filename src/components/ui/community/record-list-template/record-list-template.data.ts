export const recordListLayouts = [
  {
    id: 'full-width-header',
    name: 'Full width data grid + header',
    component: 'RecordListFullWidthHeader',
  },
  {
    id: 'full-width-tabs',
    name: 'Full width data grid + tabs',
    component: 'RecordListFullWidthTabs',
  },
  {
    id: 'left-panel-header',
    name: 'Left panel + data grid + header',
    component: 'RecordListLeftPanelHeader',
  },
  {
    id: 'left-panel-tabs',
    name: 'Left panel + data grid + tabs',
    component: 'RecordListLeftPanelTabs',
  },
  {
    id: 'right-panel-header',
    name: 'Data grid + right panel + header',
    component: 'RecordListRightPanelHeader',
  },
  {
    id: 'right-panel-tabs',
    name: 'Data grid + right panel + tabs',
    component: 'RecordListRightPanelTabs',
  },
] as const;

export type RecordListLayout = (typeof recordListLayouts)[number]['id'];

export type RecordListView = 'table' | 'cards';

export const recordListLayoutNames = recordListLayouts.map(
  (layout) => layout.name
);

export function recordListRegistryId(id: RecordListLayout): string {
  return `record-list-${id}`;
}

export const recordListPageTitle = 'Plant assets';

export const recordListPageDescription =
  'Rotating and static equipment across the refinery';

export const recordListPrimaryAction = 'Create work order';

export const recordListSecondaryAction = 'Export';

export const recordListBulkAction = 'Assign crew';

export const recordListTabs = [
  'Operations',
  'Maintenance',
  'Alarms',
  'Inspections',
] as const;

export type RecordListColumnChip = {
  id: string;
  column: string;
  values: readonly string[];
};

export const recordListFilters: RecordListColumnChip[] = [
  {
    id: 'area',
    column: 'Area',
    values: ['Crude distillation', 'Hydrotreater', 'Utilities'],
  },
  { id: 'priority', column: 'Priority', values: ['High'] },
  {
    id: 'discipline',
    column: 'Discipline',
    values: ['Mechanical', 'Instrument'],
  },
  { id: 'due', column: 'Due', values: ['This week'] },
];

export const recordListGroupings: RecordListColumnChip[] = [
  {
    id: 'status',
    column: 'Status',
    values: ['Running', 'Alarm', 'Maintenance'],
  },
];

export const recordListStatuses = {
  Running: 'success',
  Standby: 'secondary',
  Alarm: 'error',
  Maintenance: 'warning',
  Offline: 'archived',
  Starting: 'inProgress',
} as const;

export type RecordListStatus = keyof typeof recordListStatuses;

export const recordListOwners = {
  'Maya Chen': { initials: 'MC', variant: 'decorative-1' },
  'Jonas Berg': { initials: 'JB', variant: 'decorative-2' },
  'Priya Shah': { initials: 'PS', variant: 'decorative-3' },
  'Erik Nilsen': { initials: 'EN', variant: 'decorative-4' },
  'Amira Hassan': { initials: 'AH', variant: 'decorative-5' },
  'Luis Ortega': { initials: 'LO', variant: 'decorative-6' },
  'Sofia Alvarez': { initials: 'SA', variant: 'decorative-7' },
} as const;

export type RecordListOwner = keyof typeof recordListOwners;

export type RecordListGroupItem = {
  id: string;
  label: string;
};

export type RecordListGroup = {
  id: string;
  label: string;
  items: RecordListGroupItem[];
};

export const recordListGroups: RecordListGroup[] = [
  {
    id: 'process-units',
    label: 'Process units',
    items: [
      { id: 'crude-distillation', label: 'Crude distillation' },
      { id: 'hydrotreater', label: 'Hydrotreater' },
      { id: 'utilities', label: 'Utilities' },
    ],
  },
  {
    id: 'equipment-class',
    label: 'Equipment class',
    items: [
      { id: 'rotating', label: 'Rotating' },
      { id: 'static', label: 'Static' },
    ],
  },
  {
    id: 'sites',
    label: 'Sites',
    items: [
      { id: 'platform-a', label: 'Platform A' },
      { id: 'tank-farm', label: 'Tank farm' },
    ],
  },
];

export const defaultRecordListGroupId = 'crude-distillation';

export type RecordListSampleRow = {
  id: string;
  groupId: string;
  index: number;
  asset: string;
  code: string;
  signal: string;
  unit: string;
  area: string;
  status: RecordListStatus;
  owner: RecordListOwner;
  trend: readonly number[];
  updated: string;
  summary: string;
};

const recordListDateFormat = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

export function formatRecordListDate(value: string): string {
  return recordListDateFormat.format(new Date(value));
}

export function formatRecordListReading(values: readonly number[]): string {
  const value = values[values.length - 1];
  if (value === undefined) {
    return '0';
  }
  if (Number.isInteger(value)) {
    return String(value);
  }
  return value.toFixed(1);
}

function rowsFor(
  groupId: string,
  drafts: Omit<RecordListSampleRow, 'id' | 'groupId' | 'index'>[]
): RecordListSampleRow[] {
  return drafts.map((draft, index) => ({
    id: `${groupId}-${index + 1}`,
    groupId,
    index: index + 1,
    ...draft,
  }));
}

export const recordListRows: RecordListSampleRow[] = [
  ...rowsFor('crude-distillation', [
    {
      asset: 'Charge pump P-101A',
      code: 'P-101A',
      signal: 'Pressure trend',
      unit: 'bar',
      area: 'Crude distillation · charge circuit',
      status: 'Running',
      owner: 'Maya Chen',
      trend: [42, 44, 43, 47, 46, 49, 48, 51],
      updated: '2026-10-08T12:00:00Z',
      summary: 'Discharge pressure is steady at 51 bar after the morning ramp.',
    },
    {
      asset: 'Overhead condenser E-102',
      code: 'E-102',
      signal: 'Temperature trend',
      unit: '°C',
      area: 'Crude distillation · overhead',
      status: 'Standby',
      owner: 'Jonas Berg',
      trend: [18, 17, 19, 16, 15, 16, 14, 13],
      updated: '2026-10-07T12:00:00Z',
      summary: 'Cooling-water outlet is below the standby setpoint.',
    },
    {
      asset: 'Reflux drum V-103',
      code: 'V-103',
      signal: 'Level trend',
      unit: '%',
      area: 'Crude distillation · overhead',
      status: 'Alarm',
      owner: 'Priya Shah',
      trend: [62, 64, 70, 74, 81, 86, 90, 94],
      updated: '2026-10-08T12:00:00Z',
      summary: 'Level is climbing and the high-high alarm is active.',
    },
    {
      asset: 'Fired heater H-104',
      code: 'H-104',
      signal: 'Temperature trend',
      unit: '°C',
      area: 'Crude distillation · charge heater',
      status: 'Maintenance',
      owner: 'Erik Nilsen',
      trend: [88, 84, 79, 60, 41, 28, 22, 18],
      updated: '2026-10-06T12:00:00Z',
      summary: 'Burner inspection is in progress. Coil outlet is isolated.',
    },
    {
      asset: 'Booster compressor C-105',
      code: 'C-105',
      signal: 'Pressure trend',
      unit: 'bar',
      area: 'Crude distillation · offgas',
      status: 'Running',
      owner: 'Amira Hassan',
      trend: [30, 32, 31, 33, 34, 33, 35, 36],
      updated: '2026-10-08T12:00:00Z',
      summary: 'Suction pressure is within the normal operating window.',
    },
  ]),
  ...rowsFor('hydrotreater', [
    {
      asset: 'Reactor feed pump P-201',
      code: 'P-201',
      signal: 'Pressure trend',
      unit: 'bar',
      area: 'Hydrotreater · feed',
      status: 'Starting',
      owner: 'Luis Ortega',
      trend: [8, 12, 18, 24, 29, 33, 36, 38],
      updated: '2026-10-08T12:00:00Z',
      summary: 'Pump is coming online after the catalyst skid restart.',
    },
    {
      asset: 'Stripper column C-210',
      code: 'C-210',
      signal: 'Temperature trend',
      unit: '°C',
      area: 'Hydrotreater · product',
      status: 'Running',
      owner: 'Sofia Alvarez',
      trend: [55, 56, 54, 57, 58, 57, 59, 58],
      updated: '2026-10-07T12:00:00Z',
      summary: 'Bottoms temperature is holding at the product spec.',
    },
  ]),
  ...rowsFor('utilities', [
    {
      asset: 'Boiler B-301',
      code: 'B-301',
      signal: 'Pressure trend',
      unit: 'bar',
      area: 'Utilities · steam',
      status: 'Running',
      owner: 'Erik Nilsen',
      trend: [40, 41, 43, 42, 44, 45, 44, 46],
      updated: '2026-10-08T12:00:00Z',
      summary: 'Header pressure is meeting the 40 bar steam demand.',
    },
    {
      asset: 'Cooling tower CT-12',
      code: 'CT-12',
      signal: 'Temperature trend',
      unit: '°C',
      area: 'Utilities · cooling water',
      status: 'Standby',
      owner: 'Maya Chen',
      trend: [22, 21, 20, 19, 18, 18, 17, 16],
      updated: '2026-10-05T12:00:00Z',
      summary: 'Cell 2 is isolated while the fan gearbox is inspected.',
    },
    {
      asset: 'Instrument air compressor C-330',
      code: 'C-330',
      signal: 'Pressure trend',
      unit: 'bar',
      area: 'Utilities · instrument air',
      status: 'Alarm',
      owner: 'Jonas Berg',
      trend: [7.2, 7.1, 6.8, 6.4, 6.1, 5.8, 5.4, 5.1],
      updated: '2026-10-08T12:00:00Z',
      summary:
        'Header pressure dropped below 6 bar. The standby unit did not start.',
    },
    {
      asset: 'Demineralized water tank T-340',
      code: 'T-340',
      signal: 'Level trend',
      unit: '%',
      area: 'Utilities · water treatment',
      status: 'Running',
      owner: 'Priya Shah',
      trend: [71, 70, 72, 74, 73, 75, 76, 77],
      updated: '2026-10-04T12:00:00Z',
      summary: 'Inventory covers about 18 hours of boiler makeup.',
    },
  ]),
  ...rowsFor('rotating', [
    {
      asset: 'Turbine driver ST-401',
      code: 'ST-401',
      signal: 'Speed trend',
      unit: 'rpm',
      area: 'Rotating · steam turbine',
      status: 'Running',
      owner: 'Amira Hassan',
      trend: [3600, 3610, 3595, 3605, 3620, 3615, 3608, 3612],
      updated: '2026-10-08T12:00:00Z',
      summary: 'Speed is stable and bearing temperatures are normal.',
    },
    {
      asset: 'Lube oil pump P-410',
      code: 'P-410',
      signal: 'Pressure trend',
      unit: 'bar',
      area: 'Rotating · lubrication',
      status: 'Maintenance',
      owner: 'Luis Ortega',
      trend: [4.4, 4.2, 3.8, 2.1, 1.4, 0.8, 0.4, 0.2],
      updated: '2026-10-03T12:00:00Z',
      summary: 'Filter differential is high. The spare filter is staged.',
    },
    {
      asset: 'Gearbox GB-422',
      code: 'GB-422',
      signal: 'Vibration trend',
      unit: 'mm/s',
      area: 'Rotating · power transmission',
      status: 'Standby',
      owner: 'Sofia Alvarez',
      trend: [2.1, 2.4, 2.2, 2.8, 3.1, 2.9, 3.4, 3.6],
      updated: '2026-10-02T12:00:00Z',
      summary: 'Vibration on the high-speed shaft is trending up.',
    },
  ]),
  ...rowsFor('static', [
    {
      asset: 'Flare knock-out drum V-501',
      code: 'V-501',
      signal: 'Level trend',
      unit: '%',
      area: 'Static · flare',
      status: 'Offline',
      owner: 'Erik Nilsen',
      trend: [12, 11, 9, 6, 4, 2, 1, 0],
      updated: '2026-09-28T12:00:00Z',
      summary: 'Drum is blinded for the turnaround internal inspection.',
    },
  ]),
  ...rowsFor('platform-a', [
    {
      asset: 'Wellhead choke WH-12',
      code: 'WH-12',
      signal: 'Position trend',
      unit: '%',
      area: 'Platform A · well bay',
      status: 'Running',
      owner: 'Maya Chen',
      trend: [86, 84, 85, 83, 82, 84, 83, 81],
      updated: '2026-10-08T12:00:00Z',
      summary: 'Choke position is holding the nominated production rate.',
    },
    {
      asset: 'Test separator V-610',
      code: 'V-610',
      signal: 'Level trend',
      unit: '%',
      area: 'Platform A · separation',
      status: 'Alarm',
      owner: 'Priya Shah',
      trend: [40, 44, 49, 55, 61, 68, 72, 77],
      updated: '2026-10-08T12:00:00Z',
      summary: 'Oil-water interface is above the normal band.',
    },
    {
      asset: 'Gas export compressor C-620',
      code: 'C-620',
      signal: 'Pressure trend',
      unit: 'bar',
      area: 'Platform A · export',
      status: 'Running',
      owner: 'Jonas Berg',
      trend: [110, 112, 111, 114, 113, 115, 116, 114],
      updated: '2026-10-07T12:00:00Z',
      summary: 'Export pressure matches the pipeline nomination.',
    },
    {
      asset: 'Produced water pump P-630',
      code: 'P-630',
      signal: 'Flow trend',
      unit: 'm³/h',
      area: 'Platform A · produced water',
      status: 'Starting',
      owner: 'Amira Hassan',
      trend: [0, 4, 9, 14, 18, 21, 23, 24],
      updated: '2026-10-08T12:00:00Z',
      summary: 'Pump just started after the hydrocyclone flush.',
    },
    {
      asset: 'Firewater pump P-640',
      code: 'P-640',
      signal: 'Pressure trend',
      unit: 'bar',
      area: 'Platform A · safety',
      status: 'Standby',
      owner: 'Luis Ortega',
      trend: [0, 0, 0, 1, 0, 0, 0, 0],
      updated: '2026-10-01T12:00:00Z',
      summary: 'Weekly test run passed. Pump is back in auto.',
    },
  ]),
  ...rowsFor('tank-farm', [
    {
      asset: 'Crude storage tank T-701',
      code: 'T-701',
      signal: 'Level trend',
      unit: '%',
      area: 'Tank farm · crude',
      status: 'Running',
      owner: 'Sofia Alvarez',
      trend: [64, 66, 67, 69, 71, 72, 74, 76],
      updated: '2026-10-08T12:00:00Z',
      summary: 'Working volume is 76% after the overnight receipt.',
    },
    {
      asset: 'Loading arm LA-12',
      code: 'LA-12',
      signal: 'Position trend',
      unit: '%',
      area: 'Tank farm · jetty',
      status: 'Maintenance',
      owner: 'Erik Nilsen',
      trend: [20, 18, 14, 9, 6, 4, 2, 1],
      updated: '2026-10-06T12:00:00Z',
      summary: 'Swivel joint is out for seal replacement. Jetty 2 is closed.',
    },
  ]),
];

export function rowsForGroup(groupId: string): RecordListSampleRow[] {
  return recordListRows.filter((row) => row.groupId === groupId);
}

export function isRecordListLayout(value: string): value is RecordListLayout {
  return recordListLayouts.some((layout) => layout.id === value);
}
