export const dashboardLayouts = [
  {
    id: 'header',
    name: 'Dashboard + header',
    component: 'DashboardHeader',
  },
  {
    id: 'tabs',
    name: 'Dashboard + tabs',
    component: 'DashboardTabs',
  },
  {
    id: 'panel-header',
    name: 'Left panel + dashboard + header',
    component: 'DashboardPanelHeader',
  },
  {
    id: 'panel-tabs',
    name: 'Left panel + dashboard + tabs',
    component: 'DashboardPanelTabs',
  },
  {
    id: 'grid-header',
    name: 'Dashboard + data grid + header',
    component: 'DashboardGridHeader',
  },
  {
    id: 'grid-tabs',
    name: 'Dashboard + data grid + tabs',
    component: 'DashboardGridTabs',
  },
  {
    id: 'preview-header',
    name: 'Dashboard + data grid + right panel + header',
    component: 'DashboardPreviewHeader',
  },
  {
    id: 'preview-tabs',
    name: 'Dashboard + data grid + right panel + tabs',
    component: 'DashboardPreviewTabs',
  },
] as const;

export type DashboardLayoutId = (typeof dashboardLayouts)[number]['id'];

export function dashboardRegistryId(id: DashboardLayoutId): string {
  return `dashboard-${id}`;
}

export const dashboardLayoutNames = dashboardLayouts.map(
  (layout) => layout.name
);

export const dashboardPageTitle = 'Operations overview';

export const dashboardPageDescription =
  'Plant status, production, and open work across the Stavanger hub.';

export const dashboardPrimaryAction = 'Create report';

export const dashboardSecondaryAction = 'Export';

export const dashboardTabs = [
  'Overview',
  'Production',
  'Energy',
  'Alarms',
] as const;

export type DashboardTab = (typeof dashboardTabs)[number];

export const dashboardTones = [
  'success',
  'warning',
  'critical',
  'default',
] as const;

export type DashboardTone = (typeof dashboardTones)[number];

export const dashboardAssetCards = [
  { name: 'XRT-1298-LA', kind: 'Pressure' },
  { name: '21-PT1019-09', kind: 'Temperature' },
  { name: 'NLA-9812', kind: 'Pressure' },
  { name: 'XRT-12098', kind: 'Temperature' },
] as const;

export const dashboardTrendCards = [
  {
    title: 'Production output',
    status: 'Optimal',
    tone: 'success',
    points: [8, 8, 12, 12, 18, 18, 24, 30, 30, 36],
  },
  {
    title: 'Downtime',
    status: 'Above average',
    tone: 'warning',
    points: [6, 6, 10, 10, 14, 18, 18, 16, 22, 26],
  },
] as const satisfies readonly {
  title: string;
  status: string;
  tone: DashboardTone;
  points: readonly number[];
}[];

export const dashboardKpiCards = [
  {
    title: 'Production output',
    status: 'Optimal',
    tone: 'success',
    value: '14',
    unit: 'Units',
    points: [8, 8, 12, 12, 18, 18, 24, 30, 30, 36],
  },
  {
    title: 'Production output',
    status: 'Status',
    tone: 'default',
    value: '14',
    unit: 'Units',
    points: [10, 14, 14, 18, 16, 20, 20, 24, 28, 28],
  },
  {
    title: 'Pressure',
    status: 'Abnormal',
    tone: 'warning',
    value: '40',
    unit: 'Bar',
    points: [6, 6, 10, 14, 14, 18, 22, 22, 26, 30],
  },
  {
    title: 'Core temperature',
    status: 'Critical',
    tone: 'critical',
    value: '58',
    unit: '°C',
    points: [4, 8, 8, 12, 16, 16, 20, 24, 28, 32],
  },
] as const satisfies readonly {
  title: string;
  status: string;
  tone: DashboardTone;
  value: string;
  unit: string;
  points: readonly number[];
}[];

export const dashboardPanelGroups = [
  {
    title: 'Overview',
    links: ['Plant status', 'Shift summary'],
  },
  {
    title: 'Operations',
    links: ['Production', 'Work orders'],
  },
  {
    title: 'Monitoring',
    links: ['Alarms', 'Energy'],
  },
] as const;

export const dashboardDefaultScope = dashboardPanelGroups[0].links[0];

export const dashboardWorkOrders = [
  {
    id: 'wo-1042',
    name: 'Charge pump P-101A overhaul',
    area: 'Crude unit',
    priority: 'High',
    status: 'In progress',
    owner: 'L. Nilsen',
    due: '12 Oct',
  },
  {
    id: 'wo-1048',
    name: 'Compressor C-12 vibration check',
    area: 'Compressors',
    priority: 'High',
    status: 'Open',
    owner: 'A. Berg',
    due: '13 Oct',
  },
  {
    id: 'wo-1051',
    name: 'Flare pilot thermocouple',
    area: 'Flare',
    priority: 'Medium',
    status: 'Blocked',
    owner: 'M. Olsen',
    due: '14 Oct',
  },
  {
    id: 'wo-1056',
    name: 'Tank T-4 level transmitter',
    area: 'Tank farm',
    priority: 'Low',
    status: 'Open',
    owner: 'S. Hauge',
    due: '16 Oct',
  },
  {
    id: 'wo-1060',
    name: 'Utilities boiler inspection',
    area: 'Utilities',
    priority: 'Medium',
    status: 'Done',
    owner: 'K. Dahl',
    due: '11 Oct',
  },
] as const;

export type DashboardWorkOrder = (typeof dashboardWorkOrders)[number];

export const dashboardStatusVariant = {
  Open: 'secondary',
  'In progress': 'warning',
  Blocked: 'error',
  Done: 'success',
} as const;
