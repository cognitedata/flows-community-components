import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconTrendingUp } from '@tabler/icons-react';
import { type ComponentProps, useId, useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  type PieLabelRenderProps,
  XAxis,
  YAxis,
} from 'recharts';
import { expect, within } from 'storybook/test';

import {
  ArtifactChart,
  ArtifactChartContent,
  ArtifactChartDescription,
  ArtifactChartFooter,
  ArtifactChartHeader,
  ArtifactChartTitle,
} from './artifact-chart';

import { CardActions, CardHeaderRight } from '@/components/ui/aura/card';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
} from '@/components/ui/aura/chart';
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/aura/dropdown-menu';
const sharedChartConfig = {
  slice1: {
    label: 'unit',
    color: 'var(--color-chart-fjord-opacity-4)',
  },
  slice2: {
    label: 'unit',
    color: 'var(--color-chart-fjord-opacity-3)',
  },
  slice3: {
    label: 'unit',
    color: 'var(--color-chart-fjord-opacity-2)',
  },
  slice4: {
    label: 'unit',
    color: 'var(--color-chart-fjord-opacity-1)',
  },
  slice5: {
    label: 'unit',
    color: 'var(--color-chart-fjord-solid)',
  },
} satisfies ComponentProps<typeof ChartContainer>['config'];

const sharedChartData = [
  {
    id: 'slice1',
    value: 225,
    fill: 'var(--color-slice1)',
  },
  {
    id: 'slice2',
    value: 225,
    fill: 'var(--color-slice2)',
  },
  {
    id: 'slice3',
    value: 225,
    fill: 'var(--color-slice3)',
  },
  {
    id: 'slice4',
    value: 225,
    fill: 'var(--color-slice4)',
  },
  {
    id: 'slice5',
    value: 225,
    fill: 'var(--color-slice5)',
  },
];

const areaChartConfig = {
  r401: {
    label: 'R401',
    color: 'rgba(47, 85, 234, 0.8)',
  },
  r402: {
    label: 'R402',
    color: 'rgba(47, 85, 234, 0.5)',
  },
} satisfies ComponentProps<typeof ChartContainer>['config'];

const areaChartData = [
  {
    time: '02:00',
    r401: 280,
    r402: 120,
  },
  {
    time: '06:00',
    r401: 300,
    r402: 140,
  },
  {
    time: '10:00',
    r401: 350,
    r402: 160,
  },
  {
    time: '14:00',
    r401: 320,
    r402: 150,
  },
  {
    time: '18:00',
    r401: 290,
    r402: 130,
  },
  {
    time: '22:00',
    r401: 310,
    r402: 145,
  },
];

const lineChartConfig = {
  strong: {
    label: 'Primary',
    color: 'rgba(47, 85, 234, 0.8)',
  },
  muted: {
    label: 'Secondary',
    color: 'rgba(47, 85, 234, 0.5)',
  },
} satisfies ComponentProps<typeof ChartContainer>['config'];

const lineChartData = [
  {
    date: 'Apr 1',
    strong: 40,
    muted: 80,
  },
  {
    date: '',
    strong: 120,
    muted: 100,
  },
  {
    date: 'Apr 7',
    strong: 180,
    muted: 90,
  },
  {
    date: '',
    strong: 280,
    muted: 140,
  },
  {
    date: 'Apr 14',
    strong: 160,
    muted: 180,
  },
  {
    date: '',
    strong: 220,
    muted: 160,
  },
  {
    date: 'Apr 21',
    strong: 320,
    muted: 120,
  },
  {
    date: '',
    strong: 260,
    muted: 140,
  },
  {
    date: 'Apr 30',
    strong: 200,
    muted: 160,
  },
];

const barChartConfig = {
  value: {
    label: 'Count',
    color: 'url(#barGradient)',
  },
} satisfies ComponentProps<typeof ChartContainer>['config'];

const barChartData = [
  {
    name: 'Assets',
    value: 106,
  },
  {
    name: 'Files',
    value: 305,
  },
  {
    name: 'Events',
    value: 237,
  },
  {
    name: 'Work orders',
    value: 73,
  },
  {
    name: 'Time series',
    value: 209,
  },
];

type RadialRingDatum = {
  name: string;
  fill: string;
  arcPercent: number;
};

const radialRingData: RadialRingDatum[] = [
  {
    name: 'ring5',
    fill: 'var(--color-chart-fjord-opacity-4)',
    arcPercent: 50,
  },
  {
    name: 'ring4',
    fill: 'var(--color-chart-fjord-opacity-3)',
    arcPercent: 72,
  },
  {
    name: 'ring3',
    fill: 'var(--color-chart-fjord-opacity-2)',
    arcPercent: 65,
  },
  {
    name: 'ring2',
    fill: 'var(--color-chart-fjord-opacity-1)',
    arcPercent: 76,
  },
  {
    name: 'ring1',
    fill: 'var(--color-chart-fjord-solid)',
    arcPercent: 100,
  },
];
const meta: Meta<typeof ArtifactChart> = {
  title: 'Primitives/Artifact - Chart',
  component: ArtifactChart,
  tags: ['autodocs', 'ai-elements'],
  argTypes: {
    children: {
      control: false,
      table: {
        category: 'Content',
        type: {
          summary: 'ReactNode',
        },
      },
    },
    className: {
      control: 'text',
      table: {
        category: 'Display',
      },
    },
    style: {
      control: 'object',
      table: {
        category: 'Display',
        type: {
          summary: 'CSSProperties',
        },
      },
    },
    id: {
      control: 'text',
      table: {
        category: 'HTML Attributes',
      },
    },
    role: {
      control: 'text',
      table: {
        category: 'HTML Attributes',
      },
    },
    'aria-label': {
      control: 'text',
      table: {
        category: 'HTML Attributes',
      },
    },
    'aria-labelledby': {
      control: 'text',
      table: {
        category: 'HTML Attributes',
      },
    },
    'aria-describedby': {
      control: 'text',
      table: {
        category: 'HTML Attributes',
      },
    },
    onClick: {
      action: 'clicked',
      table: {
        category: 'Events',
        type: {
          summary: 'MouseEventHandler<HTMLDivElement>',
        },
      },
    },
    onKeyDown: {
      action: 'keyDown',
      table: {
        category: 'Events',
        type: {
          summary: 'KeyboardEventHandler<HTMLDivElement>',
        },
      },
    },
    ref: {
      control: false,
      table: {
        category: 'Advanced',
        type: {
          summary: 'Ref<HTMLDivElement>',
        },
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
};
export default meta;
type Story = StoryObj<typeof ArtifactChart>;
const labelColor = 'var(--color-fjord-450)';
const renderLabel = (payload: PieLabelRenderProps) => {
  const labelText = String(payload.value ?? 0);
  const labelWidth = Math.max(26, labelText.length * 8 + 4);
  return (
    <g transform={`translate(${payload.x}, ${payload.y})`}>
      <rect
        x={-labelWidth / 2}
        y={-9}
        width={labelWidth}
        height={18}
        rx={2}
        fill={labelColor}
        fillOpacity={0.2}
      />
      <text
        textAnchor="middle"
        dominantBaseline="central"
        fill={labelColor}
        style={{
          fontSize: '12px',
          fontWeight: 500,
          letterSpacing: '-0.08px',
        }}
      >
        {labelText}
      </text>
    </g>
  );
};
export const Basic: Story = {
  parameters: {
    order: 1,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText('Chart title')).toBeInTheDocument();
    await expect(
      await canvas.findByText('January - June 2024')
    ).toBeInTheDocument();
    await expect(await canvas.findByText('Visitors')).toBeInTheDocument();
    await expect(await canvas.findByText('1,125')).toBeInTheDocument();
    await expect(
      await canvas.findByText('Trending up by 5.2% this month')
    ).toBeInTheDocument();
  },
  render: function BasicPieChart() {
    const [chartData] = useState(sharedChartData);
    return (
      <ArtifactChart className="w-100">
        <ArtifactChartHeader>
          <ArtifactChartTitle>Chart title</ArtifactChartTitle>
          <ArtifactChartDescription>
            January - June 2024
          </ArtifactChartDescription>
        </ArtifactChartHeader>

        <ArtifactChartContent>
          <div className="relative flex items-center justify-center">
            <ChartContainer
              config={sharedChartConfig}
              className="h-70 w-100 overflow-visible"
            >
              <PieChart
                style={{
                  overflow: 'visible',
                }}
              >
                <ChartTooltip
                  cursor={false}
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const data = payload[0];
                    const id = data.payload?.id as string;
                    const value = data.value as number;
                    const color =
                      sharedChartConfig[id as keyof typeof sharedChartConfig]
                        ?.color;
                    return (
                      <div className="flex items-center gap-4 rounded-md bg-popover p-2 shadow-md">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="h-2 w-2 rounded-sm"
                            style={{
                              backgroundColor: color,
                            }}
                          />
                          <span className="text-sm text-muted-foreground">
                            unit
                          </span>
                        </div>
                        <span className="text-sm text-foreground">
                          {value.toLocaleString()}
                        </span>
                      </div>
                    );
                  }}
                />
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="id"
                  innerRadius={61}
                  outerRadius={100}
                  strokeWidth={0}
                  startAngle={90}
                  endAngle={-270}
                  label={renderLabel}
                  labelLine={false}
                  className="[&_.recharts-pie-sector]:transition-opacity [&_.recharts-pie-sector]:duration-200 [&_.recharts-pie-sector:hover]:opacity-80"
                />
              </PieChart>
            </ChartContainer>
            <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
              <div>
                <span className="block text-2xl font-medium text-foreground">
                  1,125
                </span>
                <span className="block text-sm font-normal text-muted-foreground">
                  Visitors
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {chartData.map((item) => (
              <div key={item.id} className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-sm"
                  style={{
                    backgroundColor:
                      sharedChartConfig[
                        item.id as keyof typeof sharedChartConfig
                      ]?.color,
                  }}
                />
                <span className="text-sm leading-4 text-muted-foreground">
                  unit
                </span>
              </div>
            ))}
          </div>
        </ArtifactChartContent>

        <ArtifactChartFooter className="flex flex-col items-start gap-1">
          <div className="flex items-center gap-1 text-sm font-medium text-card-foreground">
            Trending up by 5.2% this month
            <IconTrendingUp aria-hidden="true" className="h-4 w-4" />
          </div>
          <div className="text-sm leading-4 text-muted-foreground">
            Total visitors for the last 6 months
          </div>
        </ArtifactChartFooter>
      </ArtifactChart>
    );
  },
};
export const WithHeader: Story = {
  parameters: {
    order: 2,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText('Chart title')).toBeInTheDocument();
    await expect(
      await canvas.findByText('January - June 2024')
    ).toBeInTheDocument();
    await expect(await canvas.findByText('1,125')).toBeInTheDocument();
  },
  render: function WithHeaderPieChart() {
    const [chartData] = useState(sharedChartData);
    return (
      <ArtifactChart className="w-100">
        <ArtifactChartHeader>
          <ArtifactChartTitle>Chart title</ArtifactChartTitle>
          <ArtifactChartDescription>
            January - June 2024
          </ArtifactChartDescription>
        </ArtifactChartHeader>

        <ArtifactChartContent>
          <div className="relative flex items-center justify-center">
            <ChartContainer
              config={sharedChartConfig}
              className="h-70 w-100 overflow-visible"
            >
              <PieChart
                style={{
                  overflow: 'visible',
                }}
              >
                <ChartTooltip
                  cursor={false}
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const data = payload[0];
                    const id = data.payload?.id as string;
                    const value = data.value as number;
                    const color =
                      sharedChartConfig[id as keyof typeof sharedChartConfig]
                        ?.color;
                    return (
                      <div className="flex items-center gap-4 rounded-md bg-popover p-2 shadow-md">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="h-2 w-2 rounded-sm"
                            style={{
                              backgroundColor: color,
                            }}
                          />
                          <span className="text-sm text-muted-foreground">
                            unit
                          </span>
                        </div>
                        <span className="text-sm text-foreground">
                          {value.toLocaleString()}
                        </span>
                      </div>
                    );
                  }}
                />
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="id"
                  innerRadius={61}
                  outerRadius={100}
                  strokeWidth={0}
                  startAngle={90}
                  endAngle={-270}
                  label={renderLabel}
                  labelLine={false}
                  className="[&_.recharts-pie-sector]:transition-opacity [&_.recharts-pie-sector]:duration-200 [&_.recharts-pie-sector:hover]:opacity-80"
                />
              </PieChart>
            </ChartContainer>
            <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
              <div>
                <span className="block text-2xl font-medium text-foreground">
                  1,125
                </span>
                <span className="block text-sm font-normal text-muted-foreground">
                  Visitors
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {chartData.map((item) => (
              <div key={item.id} className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-sm"
                  style={{
                    backgroundColor:
                      sharedChartConfig[
                        item.id as keyof typeof sharedChartConfig
                      ]?.color,
                  }}
                />
                <span className="text-sm leading-4 text-muted-foreground">
                  unit
                </span>
              </div>
            ))}
          </div>
        </ArtifactChartContent>
      </ArtifactChart>
    );
  },
};
export const WithFooter: Story = {
  parameters: {
    order: 3,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      await canvas.findByText('Trending up by 5.2% this month')
    ).toBeInTheDocument();
    await expect(await canvas.findByText('1,125')).toBeInTheDocument();
  },
  render: function WithFooterPieChart() {
    const [chartData] = useState(sharedChartData);
    return (
      <ArtifactChart className="w-100">
        <ArtifactChartContent>
          <div className="relative flex items-center justify-center">
            <ChartContainer
              config={sharedChartConfig}
              className="h-70 w-100 overflow-visible"
            >
              <PieChart
                style={{
                  overflow: 'visible',
                }}
              >
                <ChartTooltip
                  cursor={false}
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const data = payload[0];
                    const id = data.payload?.id as string;
                    const value = data.value as number;
                    const color =
                      sharedChartConfig[id as keyof typeof sharedChartConfig]
                        ?.color;
                    return (
                      <div className="flex items-center gap-4 rounded-md bg-popover p-2 shadow-md">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="h-2 w-2 rounded-sm"
                            style={{
                              backgroundColor: color,
                            }}
                          />
                          <span className="text-sm text-muted-foreground">
                            unit
                          </span>
                        </div>
                        <span className="text-sm text-foreground">
                          {value.toLocaleString()}
                        </span>
                      </div>
                    );
                  }}
                />
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="id"
                  innerRadius={61}
                  outerRadius={100}
                  strokeWidth={0}
                  startAngle={90}
                  endAngle={-270}
                  label={renderLabel}
                  labelLine={false}
                  className="[&_.recharts-pie-sector]:transition-opacity [&_.recharts-pie-sector]:duration-200 [&_.recharts-pie-sector:hover]:opacity-80"
                />
              </PieChart>
            </ChartContainer>
            <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
              <div>
                <span className="block text-2xl font-medium text-foreground">
                  1,125
                </span>
                <span className="block text-sm font-normal text-muted-foreground">
                  Visitors
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {chartData.map((item) => (
              <div key={item.id} className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-sm"
                  style={{
                    backgroundColor:
                      sharedChartConfig[
                        item.id as keyof typeof sharedChartConfig
                      ]?.color,
                  }}
                />
                <span className="text-sm leading-4 text-muted-foreground">
                  unit
                </span>
              </div>
            ))}
          </div>
        </ArtifactChartContent>

        <ArtifactChartFooter className="flex flex-col items-start gap-1">
          <div className="flex items-center gap-1 text-sm font-medium text-card-foreground">
            Trending up by 5.2% this month
            <IconTrendingUp aria-hidden="true" className="h-4 w-4" />
          </div>
          <div className="text-sm leading-4 text-muted-foreground">
            Total visitors for the last 6 months
          </div>
        </ArtifactChartFooter>
      </ArtifactChart>
    );
  },
};
export const WithActions: Story = {
  parameters: {
    order: 4,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText('Chart title')).toBeInTheDocument();
    const buttons = await canvas.findAllByRole('button');
    await expect(buttons.length).toBeGreaterThan(0);
  },
  render: function WithActionsPieChart() {
    const [chartData] = useState(sharedChartData);
    return (
      <ArtifactChart className="w-100">
        <ArtifactChartHeader>
          <ArtifactChartTitle>Chart title</ArtifactChartTitle>
          <ArtifactChartDescription>
            January - June 2024
          </ArtifactChartDescription>
          <CardHeaderRight>
            <CardActions>
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuItem>Export data</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">Remove</DropdownMenuItem>
            </CardActions>
          </CardHeaderRight>
        </ArtifactChartHeader>

        <ArtifactChartContent>
          <div className="relative flex items-center justify-center">
            <ChartContainer
              config={sharedChartConfig}
              className="h-70 w-100 overflow-visible"
            >
              <PieChart
                style={{
                  overflow: 'visible',
                }}
              >
                <ChartTooltip
                  cursor={false}
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const data = payload[0];
                    const id = data.payload?.id as string;
                    const value = data.value as number;
                    const color =
                      sharedChartConfig[id as keyof typeof sharedChartConfig]
                        ?.color;
                    return (
                      <div className="flex items-center gap-4 rounded-md bg-popover p-2 shadow-md">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="h-2 w-2 rounded-sm"
                            style={{
                              backgroundColor: color,
                            }}
                          />
                          <span className="text-sm text-muted-foreground">
                            unit
                          </span>
                        </div>
                        <span className="text-sm text-foreground">
                          {value.toLocaleString()}
                        </span>
                      </div>
                    );
                  }}
                />
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="id"
                  innerRadius={61}
                  outerRadius={100}
                  strokeWidth={0}
                  startAngle={90}
                  endAngle={-270}
                  label={renderLabel}
                  labelLine={false}
                  className="[&_.recharts-pie-sector]:transition-opacity [&_.recharts-pie-sector]:duration-200 [&_.recharts-pie-sector:hover]:opacity-80"
                />
              </PieChart>
            </ChartContainer>
            <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
              <div>
                <span className="block text-2xl font-medium text-foreground">
                  1,125
                </span>
                <span className="block text-sm font-normal text-muted-foreground">
                  Visitors
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {chartData.map((item) => (
              <div key={item.id} className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-sm"
                  style={{
                    backgroundColor:
                      sharedChartConfig[
                        item.id as keyof typeof sharedChartConfig
                      ]?.color,
                  }}
                />
                <span className="text-sm leading-4 text-muted-foreground">
                  unit
                </span>
              </div>
            ))}
          </div>
        </ArtifactChartContent>

        <ArtifactChartFooter className="flex flex-col items-start gap-1">
          <div className="flex items-center gap-1 text-sm font-medium text-card-foreground">
            Trending up by 5.2% this month
            <IconTrendingUp aria-hidden="true" className="h-4 w-4" />
          </div>
          <div className="text-sm leading-4 text-muted-foreground">
            Total visitors for the last 6 months
          </div>
        </ArtifactChartFooter>
      </ArtifactChart>
    );
  },
};
export const MinimalHeader: Story = {
  parameters: {
    order: 5,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText('Chart title')).toBeInTheDocument();
    await expect(await canvas.findByText('1,125')).toBeInTheDocument();
  },
  render: function MinimalHeaderPieChart() {
    const [chartData] = useState(sharedChartData);
    return (
      <ArtifactChart className="w-100">
        <ArtifactChartHeader>
          <ArtifactChartTitle>Chart title</ArtifactChartTitle>
        </ArtifactChartHeader>

        <ArtifactChartContent>
          <div className="relative flex items-center justify-center">
            <ChartContainer
              config={sharedChartConfig}
              className="h-70 w-100 overflow-visible"
            >
              <PieChart
                style={{
                  overflow: 'visible',
                }}
              >
                <ChartTooltip
                  cursor={false}
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const data = payload[0];
                    const id = data.payload?.id as string;
                    const value = data.value as number;
                    const color =
                      sharedChartConfig[id as keyof typeof sharedChartConfig]
                        ?.color;
                    return (
                      <div className="flex items-center gap-4 rounded-md bg-popover p-2 shadow-md">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="h-2 w-2 rounded-sm"
                            style={{
                              backgroundColor: color,
                            }}
                          />
                          <span className="text-sm text-muted-foreground">
                            unit
                          </span>
                        </div>
                        <span className="text-sm text-foreground">
                          {value.toLocaleString()}
                        </span>
                      </div>
                    );
                  }}
                />
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="id"
                  innerRadius={61}
                  outerRadius={100}
                  strokeWidth={0}
                  startAngle={90}
                  endAngle={-270}
                  label={renderLabel}
                  labelLine={false}
                  className="[&_.recharts-pie-sector]:transition-opacity [&_.recharts-pie-sector]:duration-200 [&_.recharts-pie-sector:hover]:opacity-80"
                />
              </PieChart>
            </ChartContainer>
            <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
              <div>
                <span className="block text-2xl font-medium text-foreground">
                  1,125
                </span>
                <span className="block text-sm font-normal text-muted-foreground">
                  Visitors
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {chartData.map((item) => (
              <div key={item.id} className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-sm"
                  style={{
                    backgroundColor:
                      sharedChartConfig[
                        item.id as keyof typeof sharedChartConfig
                      ]?.color,
                  }}
                />
                <span className="text-sm leading-4 text-muted-foreground">
                  unit
                </span>
              </div>
            ))}
          </div>
        </ArtifactChartContent>

        <ArtifactChartFooter className="flex flex-col items-start gap-1">
          <div className="flex items-center gap-1 text-sm font-medium text-card-foreground">
            Trending up by 5.2% this month
            <IconTrendingUp aria-hidden="true" className="h-4 w-4" />
          </div>
          <div className="text-sm leading-4 text-muted-foreground">
            Total visitors for the last 6 months
          </div>
        </ArtifactChartFooter>
      </ArtifactChart>
    );
  },
};
export const InteractiveDataToggle: Story = {
  parameters: {
    order: 6,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText('Chart title')).toBeInTheDocument();
    await expect(await canvas.findByText('Q1')).toBeInTheDocument();
    await expect(await canvas.findByText('Q2')).toBeInTheDocument();
  },
  render: function InteractiveDataTogglePieChart() {
    const q1Data = [
      {
        id: 'slice1',
        value: 275,
      },
      {
        id: 'slice2',
        value: 250,
      },
      {
        id: 'slice3',
        value: 225,
      },
      {
        id: 'slice4',
        value: 200,
      },
      {
        id: 'slice5',
        value: 175,
      },
    ];
    const q2Data = [
      {
        id: 'slice1',
        value: 175,
      },
      {
        id: 'slice2',
        value: 200,
      },
      {
        id: 'slice3',
        value: 225,
      },
      {
        id: 'slice4',
        value: 250,
      },
      {
        id: 'slice5',
        value: 275,
      },
    ];
    const [activeQuarter, setActiveQuarter] = useState<'q1' | 'q2'>('q1');
    const chartData = activeQuarter === 'q1' ? q1Data : q2Data;
    const total = chartData.reduce((sum, item) => sum + item.value, 0);
    return (
      <ArtifactChart className="w-100">
        <ArtifactChartHeader>
          <ArtifactChartTitle>Chart title</ArtifactChartTitle>
          <ArtifactChartDescription>
            Click buttons to switch quarters
          </ArtifactChartDescription>
        </ArtifactChartHeader>

        <ArtifactChartContent>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setActiveQuarter('q1')}
              className={`rounded-md px-3 py-1 text-sm ${activeQuarter === 'q1' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
            >
              Q1
            </button>
            <button
              type="button"
              onClick={() => setActiveQuarter('q2')}
              className={`rounded-md px-3 py-1 text-sm ${activeQuarter === 'q2' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
            >
              Q2
            </button>
          </div>

          <div className="relative flex items-center justify-center">
            <ChartContainer
              config={sharedChartConfig}
              className="h-70 w-100 overflow-visible"
            >
              <PieChart
                style={{
                  overflow: 'visible',
                }}
              >
                <ChartTooltip
                  cursor={false}
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const data = payload[0];
                    const id = data.payload?.id as string;
                    const value = data.value as number;
                    const color =
                      sharedChartConfig[id as keyof typeof sharedChartConfig]
                        ?.color;
                    return (
                      <div className="flex items-center gap-4 rounded-md bg-popover p-2 shadow-md">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="h-2 w-2 rounded-sm"
                            style={{
                              backgroundColor: color,
                            }}
                          />
                          <span className="text-sm text-muted-foreground">
                            unit
                          </span>
                        </div>
                        <span className="text-sm text-foreground">
                          {value.toLocaleString()}
                        </span>
                      </div>
                    );
                  }}
                />
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="id"
                  innerRadius={61}
                  outerRadius={100}
                  strokeWidth={0}
                  startAngle={90}
                  endAngle={-270}
                  label={renderLabel}
                  labelLine={false}
                  className="[&_.recharts-pie-sector]:transition-opacity [&_.recharts-pie-sector]:duration-200 [&_.recharts-pie-sector:hover]:opacity-80"
                />
              </PieChart>
            </ChartContainer>
            <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
              <div>
                <span className="block text-2xl font-medium text-foreground">
                  {total.toLocaleString()}
                </span>
                <span className="block text-sm font-normal text-muted-foreground">
                  {activeQuarter.toUpperCase()} Visitors
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {chartData.map((item) => (
              <div key={item.id} className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-sm"
                  style={{
                    backgroundColor:
                      sharedChartConfig[
                        item.id as keyof typeof sharedChartConfig
                      ]?.color,
                  }}
                />
                <span className="text-sm leading-4 text-muted-foreground">
                  unit
                </span>
              </div>
            ))}
          </div>
        </ArtifactChartContent>

        <ArtifactChartFooter className="flex flex-col items-start gap-1">
          <div className="flex items-center gap-1 text-sm font-medium text-card-foreground">
            Trending up by 5.2% this month
            <IconTrendingUp aria-hidden="true" className="h-4 w-4" />
          </div>
          <div className="text-sm leading-4 text-muted-foreground">
            Total visitors for the last 6 months
          </div>
        </ArtifactChartFooter>
      </ArtifactChart>
    );
  },
};
export const EdgeCaseLongText: Story = {
  parameters: {
    order: 8,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      await canvas.findByText(/Quarterly Revenue Distribution/)
    ).toBeInTheDocument();
  },
  render: function LongTextPieChart() {
    const [chartData] = useState(sharedChartData);
    return (
      <ArtifactChart className="w-100">
        <ArtifactChartHeader>
          <ArtifactChartTitle>
            Quarterly Revenue Distribution Across All Business Units and Regions
          </ArtifactChartTitle>
          <ArtifactChartDescription>
            This chart shows the breakdown of revenue sources including product
            sales, professional services, and recurring subscriptions for Q4
            2024.
          </ArtifactChartDescription>
        </ArtifactChartHeader>

        <ArtifactChartContent>
          <div className="relative flex items-center justify-center">
            <ChartContainer
              config={sharedChartConfig}
              className="h-70 w-100 overflow-visible"
            >
              <PieChart
                style={{
                  overflow: 'visible',
                }}
              >
                <ChartTooltip
                  cursor={false}
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const data = payload[0];
                    const id = data.payload?.id as string;
                    const value = data.value as number;
                    const color =
                      sharedChartConfig[id as keyof typeof sharedChartConfig]
                        ?.color;
                    return (
                      <div className="flex items-center gap-4 rounded-md bg-popover p-2 shadow-md">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="h-2 w-2 rounded-sm"
                            style={{
                              backgroundColor: color,
                            }}
                          />
                          <span className="text-sm text-muted-foreground">
                            unit
                          </span>
                        </div>
                        <span className="text-sm text-foreground">
                          {value.toLocaleString()}
                        </span>
                      </div>
                    );
                  }}
                />
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="id"
                  innerRadius={61}
                  outerRadius={100}
                  strokeWidth={0}
                  startAngle={90}
                  endAngle={-270}
                  label={renderLabel}
                  labelLine={false}
                  className="[&_.recharts-pie-sector]:transition-opacity [&_.recharts-pie-sector]:duration-200 [&_.recharts-pie-sector:hover]:opacity-80"
                />
              </PieChart>
            </ChartContainer>
            <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
              <div>
                <span className="block text-2xl font-medium text-foreground">
                  1,125
                </span>
                <span className="block text-sm font-normal text-muted-foreground">
                  Visitors
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {chartData.map((item) => (
              <div key={item.id} className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-sm"
                  style={{
                    backgroundColor:
                      sharedChartConfig[
                        item.id as keyof typeof sharedChartConfig
                      ]?.color,
                  }}
                />
                <span className="text-sm leading-4 text-muted-foreground">
                  unit
                </span>
              </div>
            ))}
          </div>
        </ArtifactChartContent>

        <ArtifactChartFooter className="flex flex-col items-start gap-1">
          <div className="flex items-center gap-1 text-sm font-medium text-card-foreground">
            Trending up by 5.2% this month
            <IconTrendingUp aria-hidden="true" className="h-4 w-4" />
          </div>
          <div className="text-sm leading-4 text-muted-foreground">
            Data aggregated from all regional offices and includes both direct
            and partner channel revenue streams.
          </div>
        </ArtifactChartFooter>
      </ArtifactChart>
    );
  },
};
export const VisualRegression: Story = {
  parameters: {
    order: 7,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText('Chart title')).toBeInTheDocument();
    await expect(await canvas.findByText('1,125')).toBeInTheDocument();
  },
  render: function VisualRegressionPieChart() {
    const [chartData] = useState(sharedChartData);
    return (
      <ArtifactChart className="w-100">
        <ArtifactChartHeader>
          <ArtifactChartTitle>Chart title</ArtifactChartTitle>
          <ArtifactChartDescription>
            January - June 2024
          </ArtifactChartDescription>
        </ArtifactChartHeader>

        <ArtifactChartContent>
          <div className="relative flex items-center justify-center">
            <ChartContainer
              config={sharedChartConfig}
              className="h-70 w-100 overflow-visible"
            >
              <PieChart
                style={{
                  overflow: 'visible',
                }}
              >
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="id"
                  innerRadius={61}
                  outerRadius={100}
                  strokeWidth={0}
                  startAngle={90}
                  endAngle={-270}
                  label={renderLabel}
                  labelLine={false}
                  className="[&_.recharts-pie-sector]:transition-opacity [&_.recharts-pie-sector]:duration-200 [&_.recharts-pie-sector:hover]:opacity-80"
                />
              </PieChart>
            </ChartContainer>
            <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
              <div>
                <span className="block text-2xl font-medium text-foreground">
                  1,125
                </span>
                <span className="block text-sm font-normal text-muted-foreground">
                  Visitors
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {chartData.map((item) => (
              <div key={item.id} className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-sm"
                  style={{
                    backgroundColor:
                      sharedChartConfig[
                        item.id as keyof typeof sharedChartConfig
                      ]?.color,
                  }}
                />
                <span className="text-sm leading-4 text-muted-foreground">
                  unit
                </span>
              </div>
            ))}
          </div>
        </ArtifactChartContent>

        <ArtifactChartFooter className="flex flex-col items-start gap-1">
          <div className="flex items-center gap-1 text-sm font-medium text-card-foreground">
            Trending up by 5.2% this month
            <IconTrendingUp aria-hidden="true" className="h-4 w-4" />
          </div>
          <div className="text-sm leading-4 text-muted-foreground">
            Total visitors for the last 6 months
          </div>
        </ArtifactChartFooter>
      </ArtifactChart>
    );
  },
};
export const EdgeCaseNoData: Story = {
  parameters: {
    order: 9,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      await canvas.findByText('No data available')
    ).toBeInTheDocument();
  },
  render: function NoDataPieChart() {
    const [chartData] = useState<
      {
        id: string;
        value: number;
      }[]
    >([]);
    return (
      <ArtifactChart className="w-100">
        <ArtifactChartHeader>
          <ArtifactChartTitle>Chart title</ArtifactChartTitle>
          <ArtifactChartDescription>
            January - June 2024
          </ArtifactChartDescription>
        </ArtifactChartHeader>

        <ArtifactChartContent>
          {chartData.length === 0 ? (
            <div className="flex h-70 w-full items-center justify-center">
              <p className="text-sm text-muted-foreground">No data available</p>
            </div>
          ) : (
            <div className="relative flex items-center justify-center">
              <div className="h-70 w-100" />
            </div>
          )}
        </ArtifactChartContent>

        <ArtifactChartFooter className="flex flex-col items-start gap-1">
          <div className="text-sm text-muted-foreground">
            Data will appear once activity is recorded
          </div>
        </ArtifactChartFooter>
      </ArtifactChart>
    );
  },
};
export const StackedAreaChart: Story = {
  parameters: {
    order: 10,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      await canvas.findByText('Reactor temperature trend')
    ).toBeInTheDocument();
    await expect(await canvas.findByText('Last 24 hours')).toBeInTheDocument();
    await expect(await canvas.findByText('R401')).toBeInTheDocument();
    await expect(await canvas.findByText('R402')).toBeInTheDocument();
    await expect(
      await canvas.findByText('Trending up by 5.2% this month')
    ).toBeInTheDocument();
  },
  render: function StackedAreaChartStory() {
    return (
      <ArtifactChart className="w-100">
        <ArtifactChartHeader>
          <ArtifactChartTitle>Reactor temperature trend</ArtifactChartTitle>
          <ArtifactChartDescription>Last 24 hours</ArtifactChartDescription>
          <CardHeaderRight>
            <CardActions>
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuItem>Export data</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">Remove</DropdownMenuItem>
            </CardActions>
          </CardHeaderRight>
        </ArtifactChartHeader>

        <ArtifactChartContent>
          <ChartContainer config={areaChartConfig} className="h-40 w-full">
            <AreaChart
              data={areaChartData}
              margin={{
                left: 0,
                right: 0,
                top: 10,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient
                  id="areaGradientR401"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="rgba(47, 85, 234, 0.13)" />
                  <stop offset="100%" stopColor="rgba(47, 85, 234, 0.04)" />
                </linearGradient>
                <linearGradient
                  id="areaGradientR402"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="rgba(47, 85, 234, 0.48)" />
                  <stop offset="100%" stopColor="rgba(47, 85, 234, 0.3)" />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="time"
                tickLine={false}
                axisLine={false}
                tick={{
                  fontSize: 12,
                  fill: 'var(--color-muted-foreground)',
                }}
                tickMargin={8}
              />
              <ChartTooltip
                cursor={{
                  stroke: 'var(--color-muted-foreground)',
                  strokeWidth: 1,
                }}
                content={({ active, payload, label: _label }) => {
                  if (!active || !payload?.length) return null;
                  return (
                    <div className="rounded border border-border bg-popover px-2 py-1 shadow-md">
                      {payload.map((entry) => {
                        const key = entry.dataKey as string;
                        const config =
                          areaChartConfig[key as keyof typeof areaChartConfig];
                        return (
                          <div key={key} className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5">
                              <span
                                className="h-2 w-2 rounded-sm"
                                style={{
                                  backgroundColor: config?.color,
                                }}
                              />
                              <span className="text-sm text-muted-foreground">
                                {config?.label}
                              </span>
                            </div>
                            <span className="text-sm text-foreground">
                              {entry.value}°C
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  );
                }}
              />
              <Area
                type="monotone"
                dataKey="r401"
                stroke="#2F55EA"
                strokeWidth={1}
                fill="url(#areaGradientR401)"
                dot={false}
                activeDot={{
                  r: 4,
                  fill: '#2F55EA',
                  stroke: '#fff',
                  strokeWidth: 2,
                }}
              />
              <Area
                type="monotone"
                dataKey="r402"
                stroke="#2F55EA"
                strokeWidth={1}
                fill="url(#areaGradientR402)"
                dot={false}
                activeDot={{
                  r: 4,
                  fill: '#2F55EA',
                  stroke: '#fff',
                  strokeWidth: 2,
                }}
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        </ArtifactChartContent>

        <ArtifactChartFooter className="flex flex-col items-start gap-1">
          <div className="flex items-center gap-1 text-sm font-medium text-card-foreground">
            Trending up by 5.2% this month
            <IconTrendingUp aria-hidden="true" className="h-4 w-4" />
          </div>
        </ArtifactChartFooter>
      </ArtifactChart>
    );
  },
};
export const MultiLineChart: Story = {
  parameters: {
    order: 11,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      await canvas.findByText('Performance metrics')
    ).toBeInTheDocument();
    await expect(await canvas.findByText('Last 30 days')).toBeInTheDocument();
    await expect(await canvas.findByText('Primary')).toBeInTheDocument();
    await expect(await canvas.findByText('Secondary')).toBeInTheDocument();
    await expect(
      await canvas.findByText('Trending up by 5.2% this month')
    ).toBeInTheDocument();
  },
  render: function MultiLineChartStory() {
    return (
      <ArtifactChart className="w-100">
        <ArtifactChartHeader>
          <ArtifactChartTitle>Performance metrics</ArtifactChartTitle>
          <ArtifactChartDescription>Last 30 days</ArtifactChartDescription>
          <CardHeaderRight>
            <CardActions>
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuItem>Export data</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">Remove</DropdownMenuItem>
            </CardActions>
          </CardHeaderRight>
        </ArtifactChartHeader>

        <ArtifactChartContent>
          <ChartContainer config={lineChartConfig} className="h-32 w-full">
            <LineChart
              data={lineChartData}
              margin={{
                left: 0,
                right: 0,
                top: 10,
                bottom: 0,
              }}
            >
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tick={{
                  fontSize: 12,
                  fill: 'var(--color-muted-foreground)',
                }}
                tickMargin={8}
              />
              <ChartTooltip
                cursor={{
                  stroke: 'var(--color-muted-foreground)',
                  strokeWidth: 1,
                }}
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  return (
                    <div className="rounded border border-border bg-popover px-2 py-1 shadow-md">
                      {payload.map((entry) => {
                        const key = entry.dataKey as string;
                        const config =
                          lineChartConfig[key as keyof typeof lineChartConfig];
                        return (
                          <div key={key} className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5">
                              <span
                                className="h-2 w-2 rounded-sm"
                                style={{
                                  backgroundColor: config?.color,
                                }}
                              />
                              <span className="text-sm text-muted-foreground">
                                {config?.label}
                              </span>
                            </div>
                            <span className="text-sm text-foreground">
                              {entry.value}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  );
                }}
              />
              <Line
                type="monotone"
                dataKey="muted"
                stroke="var(--color-muted)"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 4,
                  fill: 'var(--color-muted)',
                  stroke: 'var(--color-popover)',
                  strokeWidth: 2,
                }}
              />
              <Line
                type="monotone"
                dataKey="strong"
                stroke="var(--color-strong)"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 4,
                  fill: 'var(--color-strong)',
                  stroke: 'var(--color-popover)',
                  strokeWidth: 2,
                }}
              />
              <ChartLegend content={<ChartLegendContent />} />
            </LineChart>
          </ChartContainer>
        </ArtifactChartContent>

        <ArtifactChartFooter className="flex flex-col items-start gap-1">
          <div className="flex items-center gap-1 text-sm font-medium text-card-foreground">
            Trending up by 5.2% this month
            <IconTrendingUp aria-hidden="true" className="h-4 w-4" />
          </div>
        </ArtifactChartFooter>
      </ArtifactChart>
    );
  },
};
export const HorizontalBarChart: Story = {
  parameters: {
    order: 12,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText('Chart title')).toBeInTheDocument();
    await expect(
      await canvas.findByText('January - June 2024')
    ).toBeInTheDocument();
    await expect(await canvas.findByText('Assets')).toBeInTheDocument();
    await expect(await canvas.findByText('Files')).toBeInTheDocument();
    await expect(await canvas.findByText('Events')).toBeInTheDocument();
    await expect(
      await canvas.findByText('Trending up by 5.2% this month')
    ).toBeInTheDocument();
  },
  render: function HorizontalBarChartStory() {
    const chartData = barChartData;
    const barGradientId = useId();
    const tooltipGradientId = useId();
    return (
      <ArtifactChart className="w-100">
        <ArtifactChartHeader>
          <ArtifactChartTitle>Chart title</ArtifactChartTitle>
          <ArtifactChartDescription>
            January - June 2024
          </ArtifactChartDescription>
          <CardHeaderRight>
            <CardActions>
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuItem>Export data</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">Remove</DropdownMenuItem>
            </CardActions>
          </CardHeaderRight>
        </ArtifactChartHeader>

        <ArtifactChartContent>
          <ChartContainer config={barChartConfig} className="h-50 w-full">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{
                left: 0,
                right: 40,
              }}
            >
              <defs>
                <linearGradient id={barGradientId} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="rgba(47, 85, 234, 0.35)" />
                  <stop offset="100%" stopColor="rgba(47, 85, 234, 0.65)" />
                </linearGradient>
                <linearGradient
                  id={tooltipGradientId}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#2F55EA" />
                  <stop offset="100%" stopColor="rgba(47, 85, 234, 0.65)" />
                </linearGradient>
              </defs>
              <YAxis
                dataKey="name"
                type="category"
                tickLine={false}
                axisLine={false}
                width={90}
                tick={{
                  fontSize: 14,
                  fill: 'var(--color-muted-foreground)',
                }}
              />
              <XAxis type="number" hide />
              <ChartTooltip
                cursor={{
                  fill: 'var(--color-muted)',
                  opacity: 0.3,
                }}
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const data = payload[0];
                  const name = data.payload?.name as string;
                  const value = data.value as number;
                  return (
                    <div className="flex items-center gap-4 rounded border border-border bg-popover px-2 py-1 shadow-md">
                      <div className="flex items-center gap-1.5">
                        <svg
                          width="8"
                          height="8"
                          className="shrink-0"
                          aria-hidden="true"
                          role="img"
                        >
                          <rect
                            width="8"
                            height="8"
                            rx="2"
                            fill={`url(#${tooltipGradientId})`}
                          />
                        </svg>
                        <span className="text-sm text-muted-foreground">
                          {name}
                        </span>
                      </div>
                      <span className="text-sm text-foreground">{value}</span>
                    </div>
                  );
                }}
              />
              <Bar
                dataKey="value"
                fill={`url(#${barGradientId})`}
                radius={[0, 4, 4, 0]}
                barSize={24}
                label={{
                  position: 'right',
                  fill: 'var(--color-foreground)',
                  fontSize: 14,
                  fontWeight: 400,
                  offset: 4,
                }}
              >
                {chartData.map((entry) => (
                  <Cell
                    key={entry.name}
                    className="transition-opacity duration-200 hover:opacity-80"
                  />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </ArtifactChartContent>

        <ArtifactChartFooter className="flex flex-col items-start gap-1">
          <div className="flex items-center gap-1 text-sm font-medium text-card-foreground">
            Trending up by 5.2% this month
            <IconTrendingUp aria-hidden="true" className="h-4 w-4" />
          </div>
          <div className="text-sm leading-4 text-muted-foreground">
            Total visitors for the last 6 months
          </div>
        </ArtifactChartFooter>
      </ArtifactChart>
    );
  },
};
function RadialRingSvg({
  onRingHover,
  onMouseMove,
  hoveredRing,
}: {
  onRingHover: (ring: RadialRingDatum | null) => void;
  onMouseMove: (e: React.MouseEvent<SVGSVGElement>) => void;
  hoveredRing: RadialRingDatum | null;
}) {
  const viewBoxSize = 100;
  const cx = viewBoxSize / 2;
  const cy = viewBoxSize / 2;
  const strokeWidth = 5.5;
  const gap = 2.5;
  const spacing = strokeWidth + gap;
  const outerRingRadius = viewBoxSize / 2 - strokeWidth / 2;
  return (
    <svg
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      className="h-full w-full"
      aria-hidden="true"
      onMouseLeave={() => onRingHover(null)}
      onMouseMove={onMouseMove}
    >
      {radialRingData.map((ring, index) => {
        const radius = outerRingRadius - index * spacing;
        const circumference = 2 * Math.PI * radius;
        const arcLength = (ring.arcPercent / 100) * circumference;
        const dashArray = `${arcLength} ${circumference}`;
        const isHovered = hoveredRing?.name === ring.name;
        return (
          <g
            key={ring.name}
            onMouseEnter={() => onRingHover(ring)}
            className="cursor-pointer"
          >
            <circle
              cx={cx}
              cy={cy}
              r={radius}
              fill="none"
              strokeWidth={strokeWidth}
              className="stroke-border"
              style={{
                opacity: hoveredRing && !isHovered ? 0.5 : 1,
                transition: 'opacity 150ms',
              }}
            />
            <circle
              cx={cx}
              cy={cy}
              r={radius}
              fill="none"
              stroke={ring.fill}
              strokeWidth={strokeWidth}
              strokeDasharray={ring.arcPercent === 100 ? undefined : dashArray}
              strokeDashoffset={0}
              strokeLinecap="butt"
              transform={`rotate(-90 ${cx} ${cy})`}
              style={{
                opacity: hoveredRing && !isHovered ? 0.5 : 1,
                transition: 'opacity 150ms',
              }}
            />
            <circle
              cx={cx}
              cy={cy}
              r={radius}
              fill="none"
              stroke="transparent"
              strokeWidth={strokeWidth + 4}
            />
          </g>
        );
      })}
    </svg>
  );
}
export const RadialChart: Story = {
  parameters: {
    order: 13,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText('Chart title')).toBeInTheDocument();
    await expect(
      await canvas.findByText('January - June 2024')
    ).toBeInTheDocument();
    await expect(
      await canvas.findByText('Trending up by 5.2% this month')
    ).toBeInTheDocument();
  },
  render: function RadialChartStory() {
    const [hoveredRing, setHoveredRing] = useState<RadialRingDatum | null>(
      null
    );
    const [mousePos, setMousePos] = useState({
      x: 0,
      y: 0,
    });
    const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };
    return (
      <ArtifactChart className="w-100">
        <ArtifactChartHeader>
          <ArtifactChartTitle>Chart title</ArtifactChartTitle>
          <ArtifactChartDescription>
            January - June 2024
          </ArtifactChartDescription>
          <CardHeaderRight>
            <CardActions>
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuItem>Export data</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">Remove</DropdownMenuItem>
            </CardActions>
          </CardHeaderRight>
        </ArtifactChartHeader>

        <ArtifactChartContent>
          <div className="relative mx-auto aspect-square w-50">
            <RadialRingSvg
              onRingHover={setHoveredRing}
              onMouseMove={handleMouseMove}
              hoveredRing={hoveredRing}
            />
            {hoveredRing && (
              <div
                className="pointer-events-none absolute z-10"
                style={{
                  left: mousePos.x + 12,
                  top: mousePos.y - 20,
                }}
              >
                <div className="flex items-center gap-4 rounded-md bg-popover p-2 shadow-md">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="h-2 w-2 rounded-sm"
                      style={{
                        backgroundColor: hoveredRing.fill,
                      }}
                    />
                    <span className="text-sm text-muted-foreground">unit</span>
                  </div>
                  <span className="text-sm text-foreground">
                    {hoveredRing.arcPercent}%
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {radialRingData.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-sm"
                  style={{
                    backgroundColor: item.fill,
                  }}
                />
                <span className="text-sm leading-4 text-muted-foreground">
                  unit
                </span>
              </div>
            ))}
          </div>
        </ArtifactChartContent>

        <ArtifactChartFooter className="flex flex-col items-start gap-1">
          <div className="flex items-center gap-1 text-sm font-medium text-card-foreground">
            Trending up by 5.2% this month
            <IconTrendingUp aria-hidden="true" className="h-4 w-4" />
          </div>
          <div className="text-sm leading-4 text-muted-foreground">
            Total visitors for the last 6 months
          </div>
        </ArtifactChartFooter>
      </ArtifactChart>
    );
  },
};
