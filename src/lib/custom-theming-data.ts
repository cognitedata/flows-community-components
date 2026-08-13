export interface DataVizItem {
  name: string;
  slug: string;
}

export const DATA_VIZ_ITEMS: DataVizItem[] = [
  { name: 'Bar Chart', slug: 'bar-chart' },
  { name: 'Horizontal Bar Chart', slug: 'horizontal-bar-chart' },
  { name: 'Donut Chart', slug: 'donut-chart' },
  { name: 'Sparkline', slug: 'sparkline' },
  { name: 'Stacked Area Chart', slug: 'stacked-area-chart' },
];

export interface LayoutExample {
  name: string;
  description: string;
}

export const LAYOUT_EXAMPLES: LayoutExample[] = [
  {
    name: 'Dashboard layout',
    description:
      'A data-dense overview screen combining metrics, charts, and tables.',
  },
  {
    name: 'Settings layout',
    description:
      'A two-column settings page with grouped sections and inline forms.',
  },
  {
    name: 'Form layout',
    description:
      'A focused, single-column form with validation and helper text.',
  },
];
