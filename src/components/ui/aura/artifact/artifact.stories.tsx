import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconTrendingUp } from '@tabler/icons-react';
import { type ComponentProps, useEffect, useId, useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  type PieLabelRenderProps,
  XAxis,
  YAxis,
} from 'recharts';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { cn } from '../../../../lib/utils';
import { Button } from '../button';
import {
  Card,
  CardActions,
  CardContent,
  CardDescription,
  CardFooter,
  CardFooterCenter,
  CardFooterLeft,
  CardFooterRight,
  CardHeader,
  CardHeaderContent,
  CardHeaderLeft,
  CardHeaderRight,
} from '../card';
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '../chart';
import { Count } from '../count';
import { DropdownMenuItem, DropdownMenuSeparator } from '../dropdown-menu';
import {
  List,
  ListItem,
  ListItemDescription,
  ListItemIcon,
  ListItemStatus,
  ListItemTitle,
  ListOrdered,
} from '../list';
import { Progress } from '../progress';
import { Separator } from '../separator';

import { Artifact, ArtifactTitle } from './artifact';

const trendData = [
  { time: '08:00', value: 72 },
  { time: '10:00', value: 74 },
  { time: '12:00', value: 73 },
  { time: '14:00', value: 77 },
  { time: '16:00', value: 79 },
  { time: '18:00', value: 78 },
];

const trendConfig = {
  value: {
    label: 'Temperature',
    color: 'hsl(239 84% 67%)',
  },
} satisfies ChartConfig;

const generateTemperatureData = () => {
  const data = [];
  const now = new Date();
  const samplesPerHour = 12;
  const totalSamples = 4 * samplesPerHour;
  for (let i = totalSamples - 1; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 5 * 60 * 1000);
    let temperature = 75;
    const hour = time.getHours();
    if (hour >= 6 && hour <= 18) {
      temperature += 5 + Math.sin(((hour - 6) / 12) * Math.PI) * 8;
    }
    temperature += Math.sin(i * 0.1) * 2;
    temperature += Math.sin(i * 0.05) * 1.5;
    temperature += (Math.random() - 0.5) * 2;
    if (Math.random() < 0.01) {
      temperature += 5 + Math.random() * 8;
    }
    temperature = Math.max(60, Math.min(110, temperature));
    data.push({
      time: time.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }),
      temperature: Math.round(temperature * 10) / 10,
      timestamp: time.getTime(),
    });
  }
  return data;
};

const temperatureData = generateTemperatureData();
const temperatureChartConfig = {
  temperature: {
    label: 'Temperature',
    color: 'hsl(239 84% 67%)',
  },
} satisfies ChartConfig;

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
} satisfies ChartConfig;

const sharedChartData = [
  { id: 'slice1', value: 225, fill: 'var(--color-slice1)' },
  { id: 'slice2', value: 225, fill: 'var(--color-slice2)' },
  { id: 'slice3', value: 225, fill: 'var(--color-slice3)' },
  { id: 'slice4', value: 225, fill: 'var(--color-slice4)' },
  { id: 'slice5', value: 225, fill: 'var(--color-slice5)' },
];

const areaChartConfig = {
  r401: { label: 'R401', color: 'rgba(47, 85, 234, 0.8)' },
  r402: { label: 'R402', color: 'rgba(47, 85, 234, 0.5)' },
} satisfies ChartConfig;

const areaChartData = [
  { time: '02:00', r401: 280, r402: 120 },
  { time: '06:00', r401: 300, r402: 140 },
  { time: '10:00', r401: 350, r402: 160 },
  { time: '14:00', r401: 320, r402: 150 },
  { time: '18:00', r401: 290, r402: 130 },
  { time: '22:00', r401: 310, r402: 145 },
];

const lineChartConfig = {
  strong: { label: 'Primary', color: 'rgba(47, 85, 234, 0.8)' },
  muted: { label: 'Secondary', color: 'rgba(47, 85, 234, 0.5)' },
} satisfies ChartConfig;

const lineChartData = [
  { date: 'Apr 1', strong: 40, muted: 80 },
  { date: '', strong: 120, muted: 100 },
  { date: 'Apr 7', strong: 180, muted: 90 },
  { date: '', strong: 280, muted: 140 },
  { date: 'Apr 14', strong: 160, muted: 180 },
  { date: '', strong: 220, muted: 160 },
  { date: 'Apr 21', strong: 320, muted: 120 },
  { date: '', strong: 260, muted: 140 },
  { date: 'Apr 30', strong: 200, muted: 160 },
];

const barChartConfig = {
  value: { label: 'Count', color: 'url(#barGradient)' },
} satisfies ChartConfig;

const barChartData = [
  { name: 'Assets', value: 106 },
  { name: 'Files', value: 305 },
  { name: 'Events', value: 237 },
  { name: 'Work orders', value: 73 },
  { name: 'Time series', value: 209 },
];

type RadialRingDatum = { name: string; fill: string; arcPercent: number };

const radialRingData: RadialRingDatum[] = [
  { name: 'ring5', fill: 'var(--color-chart-fjord-opacity-4)', arcPercent: 50 },
  { name: 'ring4', fill: 'var(--color-chart-fjord-opacity-3)', arcPercent: 72 },
  { name: 'ring3', fill: 'var(--color-chart-fjord-opacity-2)', arcPercent: 65 },
  { name: 'ring2', fill: 'var(--color-chart-fjord-opacity-1)', arcPercent: 76 },
  { name: 'ring1', fill: 'var(--color-chart-fjord-solid)', arcPercent: 100 },
];

const labelColor = 'var(--color-fjord-450)';
const renderPieLabel = (payload: PieLabelRenderProps) => {
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
        style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '-0.08px' }}
      >
        {labelText}
      </text>
    </g>
  );
};

function isSharedChartConfigKey(
  key: string
): key is keyof typeof sharedChartConfig {
  return key in sharedChartConfig;
}

function isAreaChartConfigKey(
  key: string
): key is keyof typeof areaChartConfig {
  return key in areaChartConfig;
}

function isLineChartConfigKey(
  key: string
): key is keyof typeof lineChartConfig {
  return key in lineChartConfig;
}

function SharedPieChartTooltipContent({
  active,
  payload,
}: {
  active?: boolean;
  payload?: ReadonlyArray<{
    payload?: { id?: unknown };
    value?: unknown;
  }>;
}) {
  if (!active || !payload?.length) return null;
  const data = payload[0];
  const rawId = data?.payload?.id;
  const id = typeof rawId === 'string' ? rawId : '';
  const rawValue = data?.value;
  const value = typeof rawValue === 'number' ? rawValue : 0;
  const color = isSharedChartConfigKey(id)
    ? sharedChartConfig[id]?.color
    : undefined;
  return (
    <div className="flex items-center gap-4 rounded-md bg-popover p-2 shadow-md">
      <div className="flex items-center gap-1.5">
        <span
          className="h-2 w-2 rounded-sm"
          style={{ backgroundColor: color }}
        />
        <span className="text-sm text-muted-foreground">unit</span>
      </div>
      <span className="text-sm text-foreground">{value.toLocaleString()}</span>
    </div>
  );
}

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

const meta: Meta<typeof Card> = {
  title: 'Primitives/Card',
  component: Card,
  tags: ['autodocs', 'ai-elements'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    className: {
      control: 'text',
      table: {
        category: 'Display',
      },
    },
    children: {
      control: false,
      table: {
        category: 'Content',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Basic: Story = {
  name: 'Count: Active Alarms',
  parameters: {
    order: 1,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Active alarms')).toBeInTheDocument();
    await expect(canvas.getByText('Critical:')).toBeInTheDocument();
    await expect(canvas.getByText('High:')).toBeInTheDocument();
    await expect(canvas.getByText('Medium:')).toBeInTheDocument();
  },
  render: () => (
    <Card className="grid grid-rows-[auto_1fr_auto] w-md gap-2">
      <CardHeader>
        <CardHeaderLeft>
          <Count variant="warning">3</Count>
        </CardHeaderLeft>
        <CardHeaderContent>
          <ArtifactTitle>Active alarms</ArtifactTitle>
        </CardHeaderContent>
      </CardHeader>
      <CardContent>
        <Separator />
      </CardContent>
      <CardFooter className="w-full items-center justify-between text-sm">
        <CardFooterLeft>
          <span className="text-muted-foreground">Critical:</span>{' '}
          <span className="font-medium">0</span>
        </CardFooterLeft>
        <CardFooterCenter>
          <span className="text-muted-foreground">High:</span>{' '}
          <span className="font-medium">2</span>
        </CardFooterCenter>
        <CardFooterRight>
          <span className="text-muted-foreground">Medium:</span>{' '}
          <span className="font-medium">1</span>
        </CardFooterRight>
      </CardFooter>
    </Card>
  ),
};

export const WithMetricLayout: Story = {
  name: 'Count: Temperature',
  parameters: {
    order: 2,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Temperature')).toBeInTheDocument();
    await expect(canvas.getByText('V-192')).toBeInTheDocument();
    await expect(canvas.getByText('Since 2hrs ago')).toBeInTheDocument();
    await expect(canvas.getByText('Min:')).toBeInTheDocument();
    await expect(canvas.getByText('Max:')).toBeInTheDocument();
  },
  render: () => (
    <Card className="grid grid-rows-[auto_1fr_auto] w-100 gap-2">
      <CardHeader>
        <CardHeaderLeft>
          <Count variant="critical">392°C</Count>
        </CardHeaderLeft>
        <CardHeaderContent>
          <ArtifactTitle>Temperature</ArtifactTitle>
          <CardDescription>V-192</CardDescription>
        </CardHeaderContent>
        <CardHeaderRight>
          <span className="text-muted-foreground">Since 2hrs ago</span>
        </CardHeaderRight>
      </CardHeader>
      <CardContent>
        <Separator />
      </CardContent>
      <CardFooter className="w-full items-center justify-between">
        <CardFooterLeft className="gap-0.5">
          <span className="text-muted-foreground">Min:</span>
          <span className="font-medium">384°C</span>
        </CardFooterLeft>
        <CardFooterRight className="gap-0.5">
          <span className="text-muted-foreground">Max:</span>
          <span className="font-medium">390°C</span>
        </CardFooterRight>
      </CardFooter>
    </Card>
  ),
};

export const WithListPrimitive: Story = {
  name: 'List Primitive',
  parameters: {
    order: 4,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Maintenance tasks')).toBeInTheDocument();
    await expect(canvas.getByText('Pump seal replacement')).toBeInTheDocument();
    await expect(canvas.getByText('Overdue')).toBeInTheDocument();
  },
  render: () => (
    <Card className="grid grid-rows-[auto_1fr_auto] w-100 gap-3">
      <CardHeader className="pb-2">
        <ArtifactTitle>Maintenance tasks</ArtifactTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <List>
          <ListItem variant="error">
            <ListItemTitle>Pump seal replacement</ListItemTitle>
            <ListItemDescription>
              P-401A requires new mechanical seal
            </ListItemDescription>
            <ListItemStatus>Overdue</ListItemStatus>
          </ListItem>
          <ListItem variant="now">
            <ListItemTitle>Valve calibration</ListItemTitle>
            <ListItemDescription>
              Quarterly calibration check
            </ListItemDescription>
            <ListItemStatus>Due today</ListItemStatus>
          </ListItem>
          <ListItem variant="completed">
            <ListItemTitle>Filter cleaning</ListItemTitle>
            <ListItemDescription>Clean inlet filters</ListItemDescription>
            <ListItemStatus>Completed</ListItemStatus>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  ),
};

export const WithProgressPrimitive: Story = {
  name: 'Progress Primitive',
  parameters: {
    order: 5,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Deployment status')).toBeInTheDocument();
    await expect(
      canvas.getByText('9 of 12 tasks complete')
    ).toBeInTheDocument();
    await expect(canvas.getByText('75%')).toBeInTheDocument();
  },
  render: () => (
    <Card className="grid grid-rows-[auto_1fr_auto] w-100">
      <CardHeader>
        <ArtifactTitle>Deployment status</ArtifactTitle>
        <CardDescription>9 of 12 tasks complete</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center gap-2 px-4 py-4.5">
        <Progress value={75} />
        <span className="text-sm leading-4.5 text-muted-foreground">75%</span>
      </CardContent>
      <CardFooter>On track for completion by Friday</CardFooter>
    </Card>
  ),
};

export const WithChartPrimitive: Story = {
  name: 'Count: Bar Trend',
  parameters: {
    order: 3,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Bar')).toBeInTheDocument();
    await expect(canvas.getByText('V-192')).toBeInTheDocument();
    await expect(canvas.getByText('Since 2hrs ago')).toBeInTheDocument();
  },
  render: () => (
    <Card className="grid grid-rows-[auto_1fr_auto] w-100">
      <CardHeader>
        <CardHeaderLeft>
          <Count variant="default">4.2</Count>
        </CardHeaderLeft>
        <CardHeaderContent>
          <ArtifactTitle>Bar</ArtifactTitle>
          <CardDescription>V-192</CardDescription>
        </CardHeaderContent>
        <CardHeaderRight>
          <span className="text-muted-foreground">Since 2hrs ago</span>
        </CardHeaderRight>
      </CardHeader>
      <CardContent>
        <Separator />
      </CardContent>
      <CardContent className="flex w-full flex-col items-center gap-4 overflow-visible px-4 py-5">
        <ChartContainer config={trendConfig} className="h-48 w-full">
          <LineChart
            data={trendData}
            margin={{ top: 12, right: 12, bottom: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${value}°C`}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  indicator="dot"
                  formatter={(value) => [`${value}°C`, 'Temperature']}
                />
              }
            />
            <Line
              dataKey="value"
              type="monotone"
              stroke="hsl(239 84% 67%)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  ),
};

export const CountBasic: Story = {
  name: 'Count: Basic',
  parameters: { order: 10 },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Active alarms')).toBeInTheDocument();
    await expect(canvas.getByText('Critical:')).toBeInTheDocument();
    await expect(canvas.getByText('High:')).toBeInTheDocument();
    await expect(canvas.getByText('Medium:')).toBeInTheDocument();
  },
  render: () => (
    <Card className="grid grid-rows-[auto_1fr_auto] w-md">
      <CardHeader>
        <Count variant="warning">3</Count>
        <span className="text-base font-medium leading-5 tracking-tightest">
          Active alarms
        </span>
      </CardHeader>
      <CardContent>
        <Separator />
      </CardContent>
      <CardFooter>
        <CardFooterLeft className="gap-0.5">
          <span className="text-muted-foreground">Critical:</span>
          <span className="font-medium">0</span>
        </CardFooterLeft>
        <CardFooterCenter className="gap-0.5">
          <span className="text-muted-foreground">High:</span>
          <span className="font-medium">2</span>
        </CardFooterCenter>
        <CardFooterRight className="gap-0.5">
          <span className="text-muted-foreground">Medium:</span>
          <span className="font-medium">1</span>
        </CardFooterRight>
      </CardFooter>
    </Card>
  ),
};

export const CountWithFooter: Story = {
  name: 'Count: With Footer',
  parameters: { order: 11 },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Temperature')).toBeInTheDocument();
    await expect(canvas.getByText('Min: 384°C')).toBeInTheDocument();
    await expect(canvas.getByText('Max: 390°C')).toBeInTheDocument();
  },
  render: () => (
    <Card className="grid grid-rows-[auto_1fr_auto] w-md">
      <CardHeader className="items-end">
        <Count variant="critical">392°C</Count>
        <div className="flex flex-1 items-end justify-between">
          <div className="flex flex-col">
            <span className="text-base font-medium">Temperature</span>
            <span className="text-sm font-medium leading-4.5 text-muted-foreground">
              V-192
            </span>
          </div>
          <span className="text-sm font-medium leading-4.5 text-muted-foreground">
            Since 2hrs ago
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <Separator />
      </CardContent>
      <CardFooter className="text-muted-foreground">
        <CardFooterLeft>Min: 384°C</CardFooterLeft>
        <CardFooterRight>Max: 390°C</CardFooterRight>
      </CardFooter>
    </Card>
  ),
};

export const CountWithChart: Story = {
  name: 'Count: With Chart',
  parameters: { order: 12 },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Bar')).toBeInTheDocument();
    await expect(canvas.getByText('V-192')).toBeInTheDocument();
  },
  render: function CountWithChartRender() {
    const [currentData, setCurrentData] = useState(temperatureData);
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentData((prevData) => {
          const newData = [...prevData];
          const lastTime = new Date(
            newData[newData.length - 1].timestamp + 5 * 60 * 1000
          );
          let newTemp = newData[newData.length - 1].temperature;
          newTemp += (Math.random() - 0.5) * 3;
          newTemp = Math.max(60, Math.min(110, newTemp));
          newData.shift();
          newData.push({
            time: lastTime.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            }),
            temperature: Math.round(newTemp * 10) / 10,
            timestamp: lastTime.getTime(),
          });
          return newData;
        });
      }, 3000);
      return () => clearInterval(interval);
    }, []);
    const currentTemp = currentData[currentData.length - 1]?.temperature || 0;
    const avgTemp =
      currentData.reduce((sum, item) => sum + item.temperature, 0) /
      currentData.length;
    return (
      <Card className="grid grid-rows-[auto_1fr_auto] w-md gap-2">
        <CardHeader className="items-end">
          <Count variant="default">{currentTemp}</Count>
          <div className="flex flex-1 items-end justify-between">
            <div className="flex flex-col">
              <span className="text-base font-medium">Bar</span>
              <span className="text-sm font-medium leading-4.5 text-muted-foreground">
                V-192
              </span>
            </div>
            <span className="text-sm font-medium leading-4.5 text-muted-foreground">
              Since 2hrs ago
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ChartContainer
            config={temperatureChartConfig}
            className="h-48 w-full"
          >
            <LineChart
              accessibilityLayer
              data={currentData}
              margin={{
                left: 0,
                right: 12,
                top: 12,
                bottom: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="time"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                interval={11}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                domain={['dataMin - 5', 'dataMax + 5']}
                tickFormatter={(value) => `${value}°C`}
              />
              <ChartTooltip
                cursor={{
                  stroke: 'hsl(239 84% 67%)',
                  strokeWidth: 1,
                }}
                content={
                  <ChartTooltipContent
                    indicator="dot"
                    labelFormatter={(value) => `Time: ${value}`}
                    formatter={(value) => [`${value}°C`, 'Temperature']}
                  />
                }
              />
              <Line
                dataKey="temperature"
                type="monotone"
                stroke="hsl(239 84% 67%)"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 4,
                  stroke: 'hsl(239 84% 67%)',
                  strokeWidth: 2,
                }}
                animationDuration={300}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <CardFooterLeft className="gap-4">
            <div className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: 'hsl(239 84% 67%)' }}
              />
              <span className="text-muted-foreground">
                Current: {currentTemp}°C
              </span>
            </div>
            <span className="text-muted-foreground">
              4h Average: {avgTemp.toFixed(1)}°C
            </span>
          </CardFooterLeft>
          <CardFooterRight>
            <span className="text-xs text-muted-foreground">
              Updates every 5 minutes
            </span>
          </CardFooterRight>
        </CardFooter>
      </Card>
    );
  },
};

export const CountInteractive: Story = {
  name: 'Count: Interactive',
  parameters: { order: 13 },
  render: function CountInteractiveRender() {
    const [value, setValue] = useState(392);
    return (
      <Card className="grid grid-rows-[auto_1fr_auto] w-md">
        <CardHeader>
          <Count variant="warning">{value}°C</Count>
        </CardHeader>
        <CardContent>
          <Separator />
        </CardContent>
        <CardFooter className="text-muted-foreground">
          <CardFooterLeft>Last updated just now</CardFooterLeft>
          <CardFooterRight>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setValue((prev) => prev + 1)}
            >
              Increase
            </Button>
          </CardFooterRight>
        </CardFooter>
      </Card>
    );
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Increase' });
    await userEvent.click(button);
    await waitFor(
      () => {
        expect(canvas.getByText('393°C')).toBeInTheDocument();
      },
      { timeout: 300 }
    );
  },
};

export const CountEdgeCaseEmpty: Story = {
  name: 'Count: Edge Case Empty',
  parameters: { order: 14 },
  render: () => (
    <Card className="grid grid-rows-[auto_1fr_auto] w-md">
      <CardHeader>
        <Count variant="default">0</Count>
      </CardHeader>
    </Card>
  ),
};

export const CountEdgeCaseLongText: Story = {
  name: 'Count: Edge Case Long Text',
  parameters: { order: 15 },
  render: () => (
    <Card className="grid grid-rows-[auto_1fr_auto] w-md">
      <CardHeader className="items-end">
        <Count variant="warning">128</Count>
        <div className="flex flex-1 items-end justify-between">
          <div className="flex flex-col">
            <span className="text-base font-medium">
              Active alarms across the full upstream processing pipeline
            </span>
            <span className="text-sm font-medium leading-4.5 text-muted-foreground">
              Separator train A — unit V-192B
            </span>
          </div>
          <span className="text-sm font-medium leading-4.5 text-muted-foreground">
            Since yesterday 17:30 (local)
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <Separator />
      </CardContent>
      <CardFooter className="text-muted-foreground">
        <CardFooterLeft>
          Critical: 24 • High: 56 • Medium: 48 • Low: 12
        </CardFooterLeft>
        <CardFooterRight>Rolling total based on last 24 hours</CardFooterRight>
      </CardFooter>
    </Card>
  ),
};

export const CountEdgeCaseSpecialCharacters: Story = {
  name: 'Count: Edge Case Special Characters',
  parameters: { order: 16 },
  render: () => (
    <Card className="grid grid-rows-[auto_1fr_auto] w-md">
      <CardHeader className="items-end">
        <Count variant="critical">99+</Count>
        <div className="flex flex-1 items-end justify-between">
          <div className="flex flex-col">
            <span className="text-base font-medium">
              Alerts: ΔP &gt; 5%, ΔT &lt; 0
            </span>
            <span className="text-sm font-medium leading-4.5 text-muted-foreground">
              Unit: V-192 • Line A/B
            </span>
          </div>
          <span className="text-sm font-medium leading-4.5 text-muted-foreground">
            Since 08:15 — Shift 2
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <Separator />
      </CardContent>
      <CardFooter className="text-muted-foreground">
        <CardFooterLeft>
          Notes: &quot;Overheat&quot; — check valve #4
        </CardFooterLeft>
        <CardFooterRight>Notify on-call ⚠️</CardFooterRight>
      </CardFooter>
    </Card>
  ),
};

type CountPlaygroundArgs = ComponentProps<typeof Card> & {
  variant: 'default' | 'warning' | 'critical';
  count: string;
  title: string;
  tag: string;
  footerLeft: string;
  footerRight: string;
};

export const CountPlayground: StoryObj<CountPlaygroundArgs> = {
  args: {
    className: 'w-md',
    variant: 'default',
    count: '392°C',
    title: 'Temperature',
    tag: 'V-192',
    footerLeft: 'Min: 384°C',
    footerRight: 'Max: 390°C',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'warning', 'critical'],
      table: {
        category: 'Variants / Styling',
        type: { summary: "'default' | 'warning' | 'critical'" },
      },
    },
    count: {
      control: 'text',
      table: { category: 'Content', type: { summary: 'string' } },
    },
    title: {
      control: 'text',
      table: { category: 'Content', type: { summary: 'string' } },
    },
    tag: {
      control: 'text',
      table: { category: 'Content', type: { summary: 'string' } },
    },
    footerLeft: {
      control: 'text',
      table: { category: 'Content', type: { summary: 'string' } },
    },
    footerRight: {
      control: 'text',
      table: { category: 'Content', type: { summary: 'string' } },
    },
  },
  parameters: { order: 17 },
  render: (args) => (
    <Card className={cn('grid grid-rows-[auto_1fr_auto]', args.className)}>
      <CardHeader className="items-end">
        <Count variant={args.variant}>{args.count}</Count>
        <div className="flex flex-1 items-end justify-between">
          <div className="flex flex-col">
            <span className="text-base font-medium">{args.title}</span>
            <span className="text-sm font-medium leading-4.5 text-muted-foreground">
              {args.tag}
            </span>
          </div>
          <span className="text-sm font-medium leading-4.5 text-muted-foreground">
            Since 2hrs ago
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <Separator />
      </CardContent>
      <CardFooter className="text-muted-foreground">
        <CardFooterLeft>{args.footerLeft}</CardFooterLeft>
        <CardFooterRight>{args.footerRight}</CardFooterRight>
      </CardFooter>
    </Card>
  ),
};

export const ListBasic: Story = {
  name: 'List: Basic',
  parameters: { order: 20 },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Pump seal replacement')).toBeInTheDocument();
    await expect(canvas.getByText('Overdue')).toBeInTheDocument();
  },
  render: () => (
    <Artifact className="grid grid-rows-[auto_1fr_auto] w-96">
      <CardContent className="[[data-slot=card-header]+&]:pt-0">
        <List>
          <ListItem variant="error">
            <ListItemTitle>Pump seal replacement</ListItemTitle>
            <ListItemDescription>
              P-401A requires new mechanical seal
            </ListItemDescription>
            <ListItemStatus>Overdue</ListItemStatus>
          </ListItem>
          <ListItem variant="now">
            <ListItemTitle>Valve calibration</ListItemTitle>
            <ListItemDescription>
              Quarterly calibration check
            </ListItemDescription>
            <ListItemStatus>Due today</ListItemStatus>
          </ListItem>
          <ListItem variant="completed">
            <ListItemTitle>Filter cleaning</ListItemTitle>
            <ListItemDescription>Clean inlet filters</ListItemDescription>
            <ListItemStatus>Completed</ListItemStatus>
          </ListItem>
        </List>
      </CardContent>
    </Artifact>
  ),
};

export const ListWithHeader: Story = {
  name: 'List: With Header',
  parameters: { order: 21 },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Maintenance Tasks')).toBeInTheDocument();
    await expect(canvas.getByText('Pump seal replacement')).toBeInTheDocument();
    await expect(canvas.getByText('Overdue')).toBeInTheDocument();
  },
  render: () => (
    <Artifact className="grid grid-rows-[auto_1fr_auto] w-100">
      <CardHeader>
        <ArtifactTitle>Maintenance Tasks</ArtifactTitle>
      </CardHeader>
      <CardContent className="[[data-slot=card-header]+&]:pt-0">
        <List>
          <ListItem variant="error">
            <ListItemTitle>Pump seal replacement</ListItemTitle>
            <ListItemDescription>
              P-401A requires new mechanical seal
            </ListItemDescription>
            <ListItemStatus>Overdue</ListItemStatus>
          </ListItem>
          <ListItem variant="now">
            <ListItemTitle>Valve calibration</ListItemTitle>
            <ListItemDescription>
              Quarterly calibration check
            </ListItemDescription>
            <ListItemStatus>Due today</ListItemStatus>
          </ListItem>
          <ListItem variant="completed">
            <ListItemTitle>Filter cleaning</ListItemTitle>
            <ListItemDescription>Clean inlet filters</ListItemDescription>
            <ListItemStatus>Completed</ListItemStatus>
          </ListItem>
        </List>
      </CardContent>
    </Artifact>
  ),
};

export const ListAllVariants: Story = {
  name: 'List: All Variants',
  parameters: { order: 22 },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Upcoming task')).toBeInTheDocument();
    await expect(canvas.getByText('Current task')).toBeInTheDocument();
    await expect(canvas.getByText('Completed task')).toBeInTheDocument();
    await expect(canvas.getByText('Error task')).toBeInTheDocument();
  },
  render: () => (
    <Artifact className="grid grid-rows-[auto_1fr_auto] w-100">
      <CardContent className="[[data-slot=card-header]+&]:pt-0">
        <List>
          <ListItem variant="upcoming">
            <ListItemTitle>Upcoming task</ListItemTitle>
            <ListItemDescription>Pending work item</ListItemDescription>
            <ListItemStatus>Scheduled</ListItemStatus>
          </ListItem>
          <ListItem variant="now">
            <ListItemTitle>Current task</ListItemTitle>
            <ListItemDescription>Active work item</ListItemDescription>
            <ListItemStatus>In progress</ListItemStatus>
          </ListItem>
          <ListItem variant="completed">
            <ListItemTitle>Completed task</ListItemTitle>
            <ListItemDescription>Finished work item</ListItemDescription>
            <ListItemStatus>Done</ListItemStatus>
          </ListItem>
          <ListItem variant="error">
            <ListItemTitle>Error task</ListItemTitle>
            <ListItemDescription>Task with issues</ListItemDescription>
            <ListItemStatus>Failed</ListItemStatus>
          </ListItem>
        </List>
      </CardContent>
    </Artifact>
  ),
};

const listCustomIconSvg = (
  <svg
    aria-hidden="true"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 6.04C1 3.25649 3.25648 1 6.04 1H9.96C9.96 3.78351 7.70352 6.04 4.92 6.04H1Z"
      fill="currentColor"
    />
    <path
      d="M15 9.96C15 12.7435 12.7435 15 9.96 15H6.04C6.04 12.2165 8.29648 9.96 11.08 9.96H15Z"
      fill="currentColor"
    />
    <path
      d="M15 9.96C12.2165 9.96 9.96 7.70352 9.96 4.92L9.96 1C12.7435 1 15 3.25648 15 6.04V9.96Z"
      fill="currentColor"
    />
    <path
      d="M6.04 15C3.25649 15 1 12.7435 1 9.96V6.04C3.78351 6.04 6.04 8.29648 6.04 11.08V15Z"
      fill="currentColor"
    />
  </svg>
);

export const ListWithCustomIcons: Story = {
  name: 'List: With Custom Icons',
  parameters: { order: 23 },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText('Pump 3 cavitation detected')
    ).toBeInTheDocument();
    await expect(
      canvas.getByText('Compressor C-5 surge events')
    ).toBeInTheDocument();
    await expect(
      canvas.getByText('Boiler steam leak near header B')
    ).toBeInTheDocument();
  },
  render: () => (
    <Artifact className="grid grid-rows-[auto_1fr_auto] w-100">
      <CardHeader>
        <ArtifactTitle>Recent chat summary</ArtifactTitle>
      </CardHeader>
      <CardContent className="[[data-slot=card-header]+&]:pt-0">
        <List>
          <ListItem>
            <ListItemIcon className="text-muted-foreground">
              {listCustomIconSvg}
            </ListItemIcon>
            <ListItemTitle>Pump 3 cavitation detected</ListItemTitle>
            <ListItemDescription>
              Suction pressure oscillations and elevated noise on P-003 during
              night shift; cavitation likely from low NPSH/blocked strainer.
              Next step: inspect/clean suction strainer and raise tank level
              20cm.
            </ListItemDescription>
          </ListItem>
          <ListItem>
            <ListItemIcon className="text-muted-foreground">
              {listCustomIconSvg}
            </ListItemIcon>
            <ListItemTitle>Compressor C-5 surge events</ListItemTitle>
            <ListItemDescription>
              Three start-up surge spikes with sluggish anti-surge valve
              response; control loop tuning/valve stiction suspected. Next step:
              Stroke-test ASV, retune PID, and verify transmitter calibration.
            </ListItemDescription>
          </ListItem>
          <ListItem>
            <ListItemIcon className="text-muted-foreground">
              {listCustomIconSvg}
            </ListItemIcon>
            <ListItemTitle>Boiler steam leak near header B</ListItemTitle>
            <ListItemDescription>
              Ultrasonic survey indicates continuous hiss with elevated
              condensate returns; small steam leak wasting energy. Next step:
              tag exact location, plan hot repair window, and quantify loss
              after fix.
            </ListItemDescription>
          </ListItem>
        </List>
      </CardContent>
    </Artifact>
  ),
};

export const ListOrderedList: Story = {
  name: 'List: Ordered List',
  parameters: { order: 24 },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Verify pump pressure')).toBeInTheDocument();
    await expect(canvas.getByText('Check valve alignment')).toBeInTheDocument();
    await expect(canvas.getByText('Run diagnostics')).toBeInTheDocument();
  },
  render: () => (
    <Artifact className="grid grid-rows-[auto_1fr_auto] w-96">
      <CardHeader>
        <ArtifactTitle>Startup Checklist</ArtifactTitle>
      </CardHeader>
      <CardContent className="[[data-slot=card-header]+&]:pt-0">
        <ListOrdered>
          <ListItem variant="completed">
            <ListItemTitle>Verify pump pressure</ListItemTitle>
            <ListItemStatus>Done</ListItemStatus>
          </ListItem>
          <ListItem variant="now">
            <ListItemTitle>Check valve alignment</ListItemTitle>
            <ListItemStatus>In progress</ListItemStatus>
          </ListItem>
          <ListItem variant="upcoming">
            <ListItemTitle>Run diagnostics</ListItemTitle>
            <ListItemStatus>Pending</ListItemStatus>
          </ListItem>
        </ListOrdered>
      </CardContent>
    </Artifact>
  ),
};

export const ListTimeline: Story = {
  name: 'List: Timeline',
  parameters: { order: 25 },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const inspections = canvas.getAllByText('Inspection');
    await expect(inspections.length).toBeGreaterThan(1);
    await expect(canvas.getByText('Event')).toBeInTheDocument();
  },
  render: () => (
    <Artifact className="grid grid-rows-[auto_1fr_auto] w-100">
      <CardContent className="[[data-slot=card-header]+&]:pt-0">
        <List>
          <ListItem variant="upcoming">
            <ListItemTitle>Inspection</ListItemTitle>
            <ListItemStatus>Dec 22, 2024 5:00 AM</ListItemStatus>
          </ListItem>
          <ListItem variant="now">
            <ListItemTitle>Event</ListItemTitle>
            <ListItemStatus>Today 3:05 PM</ListItemStatus>
          </ListItem>
          <ListItem variant="completed">
            <ListItemTitle>Inspection</ListItemTitle>
            <ListItemStatus>1 d ago</ListItemStatus>
          </ListItem>
          <ListItem variant="completed">
            <ListItemTitle>Inspection</ListItemTitle>
            <ListItemStatus>Dec 17, 2024 9:00 AM</ListItemStatus>
          </ListItem>
        </List>
      </CardContent>
    </Artifact>
  ),
};

export const ListInteractive: Story = {
  name: 'List: Interactive',
  parameters: { order: 26 },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const inProgressItems = canvas.getAllByText('In progress');
    await expect(inProgressItems).toHaveLength(2);
    const firstItem = canvas.getByText('Pump seal replacement');
    await userEvent.click(firstItem);
    await waitFor(
      () => {
        const completedItems = canvas.getAllByText('Completed');
        expect(completedItems).toHaveLength(2);
      },
      { timeout: 300 }
    );
    await userEvent.click(firstItem);
    await waitFor(
      () => {
        const inProgressItemsAfter = canvas.getAllByText('In progress');
        expect(inProgressItemsAfter).toHaveLength(2);
      },
      { timeout: 300 }
    );
  },
  render: function ListInteractiveRender() {
    const [items, setItems] = useState([
      {
        id: 'seal',
        title: 'Pump seal replacement',
        detail: 'P-401A requires new mechanical seal',
        status: 'open',
      },
      {
        id: 'valve',
        title: 'Valve calibration',
        detail: 'Quarterly calibration check',
        status: 'open',
      },
      {
        id: 'filters',
        title: 'Filter cleaning',
        detail: 'Clean inlet filters',
        status: 'done',
      },
    ]);
    const toggleStatus = (id: string) => {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                status: item.status === 'done' ? 'open' : 'done',
              }
            : item
        )
      );
    };
    return (
      <Artifact className="grid grid-rows-[auto_1fr_auto] w-100">
        <CardContent className="[[data-slot=card-header]+&]:pt-0">
          <List>
            {items.map((item) => {
              const isDone = item.status === 'done';
              return (
                <ListItem
                  key={item.id}
                  variant={isDone ? 'completed' : 'now'}
                  className="cursor-pointer"
                  onClick={() => toggleStatus(item.id)}
                >
                  <ListItemTitle>{item.title}</ListItemTitle>
                  <ListItemDescription>{item.detail}</ListItemDescription>
                  <ListItemStatus>
                    {isDone ? 'Completed' : 'In progress'}
                  </ListItemStatus>
                </ListItem>
              );
            })}
          </List>
        </CardContent>
      </Artifact>
    );
  },
};

export const ListEdgeCaseEmpty: Story = {
  name: 'List: Edge Case Empty',
  parameters: { order: 27 },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const list = canvasElement.querySelector("[data-slot='artifact-list']");
    await expect(list).toBeInTheDocument();
  },
  render: () => (
    <Artifact className="grid grid-rows-[auto_1fr_auto] w-100">
      <CardHeader>
        <ArtifactTitle>Empty Task List</ArtifactTitle>
      </CardHeader>
      <CardContent className="[[data-slot=card-header]+&]:pt-0">
        <List />
      </CardContent>
    </Artifact>
  ),
};

export const ListEdgeCaseLongText: Story = {
  name: 'List: Edge Case Long Text',
  parameters: { order: 28 },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText(/This is an extremely long task title/)
    ).toBeInTheDocument();
  },
  render: () => (
    <Artifact className="grid grid-rows-[auto_1fr_auto] w-80">
      <CardHeader>
        <ArtifactTitle>
          This is a very long header title that might overflow the container
        </ArtifactTitle>
      </CardHeader>
      <CardContent className="[[data-slot=card-header]+&]:pt-0">
        <List>
          <ListItem variant="error">
            <ListItemTitle>
              This is an extremely long task title that should wrap or truncate
              properly within the list item
            </ListItemTitle>
            <ListItemDescription>
              This description is also quite long and contains detailed
              information about the task that needs to be handled gracefully by
              the component layout.
            </ListItemDescription>
            <ListItemStatus>Overdue since yesterday</ListItemStatus>
          </ListItem>
          <ListItem variant="now">
            <ListItemTitle>Normal task</ListItemTitle>
            <ListItemDescription>Normal description</ListItemDescription>
            <ListItemStatus>Due today</ListItemStatus>
          </ListItem>
        </List>
      </CardContent>
    </Artifact>
  ),
};

export const ListSemanticHeadings: Story = {
  name: 'List: Semantic Headings',
  parameters: { order: 29 },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const h2Title = canvas.getByRole('heading', {
      level: 2,
      name: 'Main Section Tasks (h2)',
    });
    await expect(h2Title).toBeInTheDocument();
    const h3Title = canvas.getByRole('heading', {
      level: 3,
      name: 'Default Heading (h3)',
    });
    await expect(h3Title).toBeInTheDocument();
    const h4Title = canvas.getByRole('heading', {
      level: 4,
      name: 'Subsection Tasks (h4)',
    });
    await expect(h4Title).toBeInTheDocument();
    const h3ItemTitle = canvas.getByRole('heading', {
      level: 3,
      name: 'High-level task',
    });
    await expect(h3ItemTitle).toBeInTheDocument();
    const h4ItemTitle = canvas.getByRole('heading', {
      level: 4,
      name: 'Standard task',
    });
    await expect(h4ItemTitle).toBeInTheDocument();
    const h5ItemTitle = canvas.getByRole('heading', {
      level: 5,
      name: 'Nested task',
    });
    await expect(h5ItemTitle).toBeInTheDocument();
  },
  render: () => (
    <div className="flex flex-col gap-6 w-full max-w-2xl">
      <Artifact className="grid grid-rows-[auto_1fr_auto]">
        <CardHeader>
          <ArtifactTitle as="h2">Main Section Tasks (h2)</ArtifactTitle>
        </CardHeader>
        <CardContent className="[[data-slot=card-header]+&]:pt-0">
          <List>
            <ListItem variant="now">
              <ListItemTitle as="h3">High-level task</ListItemTitle>
              <ListItemDescription>
                ListItemTitle uses as=&quot;h3&quot; to maintain hierarchy under
                h2 ArtifactTitle
              </ListItemDescription>
              <ListItemStatus>In progress </ListItemStatus>
            </ListItem>
          </List>
        </CardContent>
      </Artifact>
      <Artifact className="grid grid-rows-[auto_1fr_auto]">
        <CardHeader>
          <ArtifactTitle>Default Heading (h3)</ArtifactTitle>
        </CardHeader>
        <CardContent className="[[data-slot=card-header]+&]:pt-0">
          <List>
            <ListItem variant="now">
              <ListItemTitle as="h4">Standard task</ListItemTitle>
              <ListItemDescription>
                ListItemTitle uses as=&quot;h4&quot; to maintain hierarchy under
                h3 ArtifactTitle
              </ListItemDescription>
              <ListItemStatus>In progress </ListItemStatus>
            </ListItem>
          </List>
        </CardContent>
      </Artifact>
      <Artifact className="grid grid-rows-[auto_1fr_auto]">
        <CardHeader>
          <ArtifactTitle as="h4">Subsection Tasks (h4)</ArtifactTitle>
        </CardHeader>
        <CardContent className="[[data-slot=card-header]+&]:pt-0">
          <List>
            <ListItem variant="now">
              <ListItemTitle as="h5">Nested task</ListItemTitle>
              <ListItemDescription>
                ListItemTitle uses as=&quot;h5&quot; to maintain hierarchy under
                h4 ArtifactTitle
              </ListItemDescription>
              <ListItemStatus>In progress </ListItemStatus>
            </ListItem>
          </List>
        </CardContent>
      </Artifact>
    </div>
  ),
};

export const ListEdgeCaseSingleItem: Story = {
  name: 'List: Edge Case Single Item',
  parameters: { order: 30 },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const list = canvas.getByRole('list');
    await expect(list).toBeInTheDocument();
    await expect(list.children).toHaveLength(1);
    await expect(canvas.getByText('Single task')).toBeInTheDocument();
  },
  render: () => (
    <Artifact className="grid grid-rows-[auto_1fr_auto] w-96">
      <CardHeader>
        <ArtifactTitle>Single Item List</ArtifactTitle>
      </CardHeader>
      <CardContent className="[[data-slot=card-header]+&]:pt-0">
        <List>
          <ListItem variant="now">
            <ListItemTitle>Single task</ListItemTitle>
            <ListItemDescription>
              This is the only item in the list
            </ListItemDescription>
            <ListItemStatus>Active</ListItemStatus>
          </ListItem>
        </List>
      </CardContent>
    </Artifact>
  ),
};

export const ListEdgeCaseMixedContent: Story = {
  name: 'List: Edge Case Mixed Content',
  parameters: { order: 31 },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Title only')).toBeInTheDocument();
    await expect(
      canvas.getByText('Title with description')
    ).toBeInTheDocument();
    await expect(
      canvas.getByText('Title with status only')
    ).toBeInTheDocument();
    await expect(canvas.getByText('Complete item')).toBeInTheDocument();
  },
  render: () => (
    <Artifact className="grid grid-rows-[auto_1fr_auto] w-96">
      <CardHeader>
        <ArtifactTitle>Mixed Content</ArtifactTitle>
      </CardHeader>
      <CardContent className="[[data-slot=card-header]+&]:pt-0">
        <List>
          <ListItem>
            <ListItemTitle>Title only</ListItemTitle>
          </ListItem>
          <ListItem>
            <ListItemTitle>Title with description</ListItemTitle>
            <ListItemDescription>
              Has a description but no status
            </ListItemDescription>
          </ListItem>
          <ListItem variant="now">
            <ListItemTitle>Title with status only</ListItemTitle>
            <ListItemStatus>Active</ListItemStatus>
          </ListItem>
          <ListItem variant="completed">
            <ListItemTitle>Complete item</ListItemTitle>
            <ListItemStatus>Done</ListItemStatus>
            <ListItemDescription>
              Has both description and status
            </ListItemDescription>
          </ListItem>
        </List>
      </CardContent>
    </Artifact>
  ),
};

export const ListEdgeCaseShortText: Story = {
  name: 'List: Edge Case Short Text',
  parameters: { order: 32 },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('A')).toBeInTheDocument();
    await expect(canvas.getByText('B')).toBeInTheDocument();
    await expect(canvas.getByText('C')).toBeInTheDocument();
  },
  render: () => (
    <Artifact className="grid grid-rows-[auto_1fr_auto] w-96">
      <CardHeader>
        <ArtifactTitle>Short Items</ArtifactTitle>
      </CardHeader>
      <CardContent className="[[data-slot=card-header]+&]:pt-0">
        <List>
          <ListItem>
            <ListItemTitle>A</ListItemTitle>
            <ListItemDescription>1</ListItemDescription>
          </ListItem>
          <ListItem>
            <ListItemTitle>B</ListItemTitle>
            <ListItemDescription>2</ListItemDescription>
          </ListItem>
          <ListItem>
            <ListItemTitle>C</ListItemTitle>
            <ListItemDescription>3</ListItemDescription>
          </ListItem>
        </List>
      </CardContent>
    </Artifact>
  ),
};

export const ListEdgeCaseManyItems: Story = {
  name: 'List: Edge Case Many Items',
  parameters: { order: 33 },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const list = canvas.getByRole('list');
    await expect(list).toBeInTheDocument();
    await expect(list.children.length).toBeGreaterThanOrEqual(20);
    await expect(canvas.getByText('Task 1')).toBeInTheDocument();
    await expect(canvas.getByText('Task 20')).toBeInTheDocument();
  },
  render: () => (
    <Artifact className="grid grid-rows-[auto_1fr_auto] w-96 max-h-96">
      <CardHeader>
        <ArtifactTitle>Many Tasks</ArtifactTitle>
      </CardHeader>
      <CardContent className="[[data-slot=card-header]+&]:pt-0">
        <List className="overflow-y-auto max-h-80">
          {Array.from({ length: 20 }, (_, i) => (
            <ListItem
              key={`task-${i + 1}`}
              variant={
                i % 4 === 0 ? 'completed' : i % 3 === 0 ? 'now' : 'upcoming'
              }
            >
              <ListItemTitle>Task {i + 1}</ListItemTitle>
              <ListItemDescription>
                Description for task {i + 1}
              </ListItemDescription>
              <ListItemStatus>Status {i + 1}</ListItemStatus>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Artifact>
  ),
};

export const ListEdgeCaseSpecialCharacters: Story = {
  name: 'List: Edge Case Special Characters',
  parameters: { order: 34 },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Temperature: 85°C')).toBeInTheDocument();
    await expect(canvas.getByText(/Pressure.*120.*bar/)).toBeInTheDocument();
    await expect(canvas.getByText(/Flow rate.*45.*m³\/h/)).toBeInTheDocument();
  },
  render: () => (
    <Artifact className="grid grid-rows-[auto_1fr_auto] w-96">
      <CardHeader>
        <ArtifactTitle>Measurements & Symbols</ArtifactTitle>
      </CardHeader>
      <CardContent className="[[data-slot=card-header]+&]:pt-0">
        <List>
          <ListItem>
            <ListItemTitle>Temperature: 85°C</ListItemTitle>
            <ListItemDescription>
              Celsius measurement with degree symbol
            </ListItemDescription>
          </ListItem>
          <ListItem>
            <ListItemTitle>Pressure: 120 ± 5 bar</ListItemTitle>
            <ListItemDescription>
              Plus-minus tolerance notation
            </ListItemDescription>
          </ListItem>
          <ListItem>
            <ListItemTitle>Flow rate: 45 m³/h</ListItemTitle>
            <ListItemDescription>
              Cubic meter per hour with superscript
            </ListItemDescription>
          </ListItem>
          <ListItem>
            <ListItemTitle>Status: ✓ Passed</ListItemTitle>
            <ListItemDescription>
              Check mark and emoji: ✓ ✗ ⚠️ 🔧
            </ListItemDescription>
          </ListItem>
        </List>
      </CardContent>
    </Artifact>
  ),
};

export const ListEdgeCaseNoVariant: Story = {
  name: 'List: Edge Case No Variant',
  parameters: { order: 35 },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Plain item 1')).toBeInTheDocument();
    await expect(canvas.getByText('Plain item 2')).toBeInTheDocument();
    const icons = canvasElement.querySelectorAll(
      '[data-slot="list-item-icon"]'
    );
    await expect(icons.length).toBe(0);
  },
  render: () => (
    <Artifact className="grid grid-rows-[auto_1fr_auto] w-96">
      <CardHeader>
        <ArtifactTitle>Plain Items</ArtifactTitle>
      </CardHeader>
      <CardContent className="[[data-slot=card-header]+&]:pt-0">
        <List>
          <ListItem>
            <ListItemTitle>Plain item 1</ListItemTitle>
            <ListItemDescription>No variant, no icon</ListItemDescription>
          </ListItem>
          <ListItem>
            <ListItemTitle>Plain item 2</ListItemTitle>
            <ListItemDescription>Another plain item</ListItemDescription>
            <ListItemStatus>Status</ListItemStatus>
          </ListItem>
          <ListItem>
            <ListItemTitle>Plain item 3</ListItemTitle>
          </ListItem>
        </List>
      </CardContent>
    </Artifact>
  ),
};

export const ListPlayground: Story = {
  name: 'List: Playground',
  parameters: { order: 36 },
  args: { className: 'w-100' },
  render: (args) => {
    const { className, ...rest } = args;
    return (
      <Artifact
        className={cn('grid grid-rows-[auto_1fr_auto]', className)}
        {...rest}
      >
        <CardHeader>
          <ArtifactTitle>Playground List</ArtifactTitle>
        </CardHeader>
        <CardContent className="[[data-slot=card-header]+&]:pt-0">
          <List>
            <ListItem variant="now">
              <ListItemTitle>Sample task</ListItemTitle>
              <ListItemDescription>
                Try adjusting the className prop
              </ListItemDescription>
              <ListItemStatus>In progress</ListItemStatus>
            </ListItem>
          </List>
        </CardContent>
      </Artifact>
    );
  },
};

export const ProgressBasic: Story = {
  name: 'Progress: Basic',
  parameters: { order: 40 },
  args: { className: 'w-96' },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByText('Progress title');
    await expect(title).toBeInTheDocument();
    const description = canvas.getByText('8 of 12 tasks complete');
    await expect(description).toBeInTheDocument();
    const percentage = canvas.getByText('32%');
    await expect(percentage).toBeInTheDocument();
    const footer = canvas.getByText('On track for completion by Friday');
    await expect(footer).toBeInTheDocument();
  },
  render: () => (
    <Card className="grid grid-rows-[auto_1fr_auto] w-96">
      <CardHeader>
        <ArtifactTitle>Progress title</ArtifactTitle>
        <CardDescription>8 of 12 tasks complete</CardDescription>
      </CardHeader>
      <CardContent className="px-4 py-4.5 flex w-full items-center justify-between gap-2">
        <Progress value={32} />
        <span className="text-muted-foreground text-sm leading-4.5 tracking-tight">
          32%
        </span>
      </CardContent>
      <CardFooter>On track for completion by Friday</CardFooter>
    </Card>
  ),
};

export const ProgressCustomStyling: Story = {
  name: 'Progress: Custom Styling',
  parameters: { order: 41 },
  args: { className: 'w-96' },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByText('Custom Styled Title');
    await expect(title).toBeInTheDocument();
    await expect(title).toHaveClass('text-lg');
    const description = canvas.getByText('Custom description styling');
    await expect(description).toBeInTheDocument();
    await expect(description).toHaveClass('text-xs', 'italic');
    const percentage = canvas.getByText('75%');
    await expect(percentage).toBeInTheDocument();
  },
  render: () => (
    <Card className="grid grid-rows-[auto_1fr_auto] w-96">
      <CardHeader>
        <ArtifactTitle className="text-lg">Custom Styled Title</ArtifactTitle>
        <CardDescription className="text-xs italic">
          Custom description styling
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 py-4.5 flex w-full items-center justify-between gap-2">
        <Progress value={75} />
        <span className="text-muted-foreground text-sm leading-4.5 tracking-tight">
          75%
        </span>
      </CardContent>
      <CardFooter>Almost complete!</CardFooter>
    </Card>
  ),
};

export const ProgressCustomAriaLabel: Story = {
  name: 'Progress: Custom Aria Label',
  parameters: { order: 42 },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Auto-generated label')).toBeInTheDocument();
    await expect(canvas.getByText('Custom label')).toBeInTheDocument();
    const progressBars = canvas.getAllByRole('progressbar');
    await expect(progressBars).toHaveLength(2);
    await expect(progressBars[1]).toHaveAccessibleName(
      'Document upload progress: 60%'
    );
  },
  render: () => (
    <div className="flex flex-col gap-6 w-96">
      <Card className="grid grid-rows-[auto_1fr_auto]">
        <CardHeader>
          <ArtifactTitle>Auto-generated label</ArtifactTitle>
          <CardDescription>Uses default aria-label</CardDescription>
        </CardHeader>
        <CardContent className="px-4 py-4.5 flex w-full items-center justify-between gap-2">
          <Progress value={60} />
          <span className="text-muted-foreground text-sm leading-4.5 tracking-tight">
            60%
          </span>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground">
          aria-label: &quot;Progress: 60%&quot;
        </CardFooter>
      </Card>
      <Card className="grid grid-rows-[auto_1fr_auto]">
        <CardHeader>
          <ArtifactTitle>Custom label</ArtifactTitle>
          <CardDescription>Provides specific context</CardDescription>
        </CardHeader>
        <CardContent className="px-4 py-4.5 flex w-full items-center justify-between gap-2">
          <Progress value={60} aria-label="Document upload progress: 60%" />
          <span className="text-muted-foreground text-sm leading-4.5 tracking-tight">
            60%
          </span>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground">
          aria-label: &quot;Document upload progress: 60%&quot;
        </CardFooter>
      </Card>
    </div>
  ),
};

export const ProgressValues: Story = {
  name: 'Progress: Values',
  parameters: { order: 43 },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('0%')).toBeInTheDocument();
    await expect(canvas.getByText('50%')).toBeInTheDocument();
    await expect(canvas.getByText('90%')).toBeInTheDocument();
    await expect(canvas.getByText('100%')).toBeInTheDocument();
    await expect(canvas.getByText('Just Started')).toBeInTheDocument();
    await expect(canvas.getByText('In Progress')).toBeInTheDocument();
    await expect(canvas.getByText('Nearly Done')).toBeInTheDocument();
    await expect(canvas.getByText('Complete')).toBeInTheDocument();
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <Card className="grid grid-rows-[auto_1fr_auto] w-96">
        <CardHeader>
          <ArtifactTitle>Just Started</ArtifactTitle>
          <CardDescription>0 of 20 tasks complete</CardDescription>
        </CardHeader>
        <CardContent className="px-4 py-4.5 flex w-full items-center justify-between gap-2">
          <Progress value={0} />
          <span className="text-muted-foreground text-sm leading-4.5 tracking-tight">
            0%
          </span>
        </CardContent>
        <CardFooter>Recently initiated</CardFooter>
      </Card>
      <Card className="grid grid-rows-[auto_1fr_auto] w-96">
        <CardHeader>
          <ArtifactTitle>In Progress</ArtifactTitle>
          <CardDescription>10 of 20 tasks complete</CardDescription>
        </CardHeader>
        <CardContent className="px-4 py-4.5 flex w-full items-center justify-between gap-2">
          <Progress value={50} />
          <span className="text-muted-foreground text-sm leading-4.5 tracking-tight">
            50%
          </span>
        </CardContent>
        <CardFooter>Halfway there</CardFooter>
      </Card>
      <Card className="grid grid-rows-[auto_1fr_auto] w-96">
        <CardHeader>
          <ArtifactTitle>Nearly Done</ArtifactTitle>
          <CardDescription>18 of 20 tasks complete</CardDescription>
        </CardHeader>
        <CardContent className="px-4 py-4.5 flex w-full items-center justify-between gap-2">
          <Progress value={90} />
          <span className="text-muted-foreground text-sm leading-4.5 tracking-tight">
            90%
          </span>
        </CardContent>
        <CardFooter>Almost finished</CardFooter>
      </Card>
      <Card className="grid grid-rows-[auto_1fr_auto] w-96">
        <CardHeader>
          <ArtifactTitle>Complete</ArtifactTitle>
          <CardDescription>20 of 20 tasks complete</CardDescription>
        </CardHeader>
        <CardContent className="px-4 py-4.5 flex w-full items-center justify-between gap-2">
          <Progress value={100} />
          <span className="text-muted-foreground text-sm leading-4.5 tracking-tight">
            100%
          </span>
        </CardContent>
        <CardFooter>All tasks completed</CardFooter>
      </Card>
    </div>
  ),
};

export const ProgressWithoutFooter: Story = {
  name: 'Progress: Without Footer',
  parameters: { order: 44 },
  args: { className: 'w-96' },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Data Processing')).toBeInTheDocument();
    await expect(
      canvas.getByText('Processing 450 of 1000 records')
    ).toBeInTheDocument();
    await expect(canvas.getByText('45%')).toBeInTheDocument();
    expect(canvasElement.textContent).not.toContain('On track');
  },
  render: () => (
    <Card className="grid grid-rows-[auto_1fr_auto] w-96">
      <CardHeader>
        <ArtifactTitle>Data Processing</ArtifactTitle>
        <CardDescription>Processing 450 of 1000 records</CardDescription>
      </CardHeader>
      <CardContent className="px-4 py-4.5 flex w-full items-center justify-between gap-2">
        <Progress value={45} />
        <span className="text-muted-foreground text-sm leading-4.5 tracking-tight">
          45%
        </span>
      </CardContent>
    </Card>
  ),
};

export const ProgressWithoutHeader: Story = {
  name: 'Progress: Without Header',
  parameters: { order: 45 },
  args: { className: 'w-96' },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('67%')).toBeInTheDocument();
    await expect(canvas.getByText('Upload in progress')).toBeInTheDocument();
    expect(canvasElement.textContent).not.toContain('Progress title');
  },
  render: () => (
    <Card className="grid grid-rows-[auto_1fr_auto] w-96">
      <CardContent className="px-4 py-4.5 flex w-full items-center justify-between gap-2">
        <Progress value={67} aria-label="File upload progress: 67%" />
        <span className="text-muted-foreground text-sm leading-4.5 tracking-tight">
          67%
        </span>
      </CardContent>
      <CardFooter>Upload in progress</CardFooter>
    </Card>
  ),
};

export const ProgressMinimal: Story = {
  name: 'Progress: Minimal',
  parameters: { order: 46 },
  args: { className: 'w-96' },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('55%')).toBeInTheDocument();
    expect(canvasElement.textContent).not.toContain('Progress title');
    expect(canvasElement.textContent).not.toContain('On track');
  },
  render: () => (
    <Card className="grid grid-rows-[auto_1fr_auto] w-96">
      <CardContent className="px-4 py-4.5 flex w-full items-center justify-between gap-2">
        <Progress value={55} />
        <span className="text-muted-foreground text-sm leading-4.5 tracking-tight">
          55%
        </span>
      </CardContent>
    </Card>
  ),
};

export const ProgressInteractive: Story = {
  name: 'Progress: Interactive',
  parameters: { order: 47 },
  args: { className: 'w-96' },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Deployment Status')).toBeInTheDocument();
    await expect(canvas.getByText('0%')).toBeInTheDocument();
    await new Promise((resolve) => setTimeout(resolve, 500));
    const percentageText = canvas.getByText(/%$/);
    const value = Number.parseInt(percentageText.textContent || '0');
    expect(value).toBeGreaterThan(0);
  },
  render: function ProgressInteractiveRender() {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1;
        });
      }, 100);
      return () => clearInterval(interval);
    }, []);
    const tasksComplete = Math.floor((progress / 100) * 15);
    const status =
      progress === 0
        ? 'Not started'
        : progress === 100
          ? 'Complete!'
          : 'In progress';
    return (
      <Card className="grid grid-rows-[auto_1fr_auto] w-96">
        <CardHeader>
          <ArtifactTitle>Deployment Status</ArtifactTitle>
          <CardDescription>
            {tasksComplete} of 15 tasks complete
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 py-4.5 flex w-full items-center justify-between gap-2">
          <Progress value={progress} />
          <span className="text-muted-foreground text-sm leading-4.5 tracking-tight">
            {progress}%
          </span>
        </CardContent>
        <CardFooter>{status}</CardFooter>
      </Card>
    );
  },
};

export const ProgressCustomPadding: Story = {
  name: 'Progress: Custom Padding',
  parameters: { order: 48 },
  args: { className: 'w-96' },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Custom Padding')).toBeInTheDocument();
    await expect(canvas.getByText('With extra padding')).toBeInTheDocument();
    await expect(canvas.getByText('40%')).toBeInTheDocument();
    await expect(
      canvas.getByText('More space around progress')
    ).toBeInTheDocument();
    const progressContent = canvasElement.querySelector('.px-8.py-8');
    expect(progressContent).toBeInTheDocument();
  },
  render: () => (
    <Card className="grid grid-rows-[auto_1fr_auto] w-96">
      <CardHeader>
        <ArtifactTitle>Custom Padding</ArtifactTitle>
        <CardDescription>With extra padding</CardDescription>
      </CardHeader>
      <CardContent
        className={cn(
          'px-4 py-4.5 flex w-full items-center justify-between gap-2',
          'px-8 py-8'
        )}
      >
        <Progress value={40} />
        <span className="text-muted-foreground text-sm leading-4.5 tracking-tight">
          40%
        </span>
      </CardContent>
      <CardFooter>More space around progress</CardFooter>
    </Card>
  ),
};

function PieChartBlock({
  chartData,
  total,
  showFooter = true,
}: {
  chartData: typeof sharedChartData;
  total: number;
  showFooter?: boolean;
}) {
  return (
    <>
      <div className="relative flex items-center justify-center">
        <ChartContainer
          config={sharedChartConfig}
          className="h-70 w-100 overflow-visible"
        >
          <PieChart style={{ overflow: 'visible' }}>
            <ChartTooltip
              cursor={false}
              content={({ active, payload }) => (
                <SharedPieChartTooltipContent
                  active={active}
                  payload={payload}
                />
              )}
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
              label={renderPieLabel}
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
                backgroundColor: isSharedChartConfigKey(item.id)
                  ? sharedChartConfig[item.id]?.color
                  : undefined,
              }}
            />
            <span className="text-sm leading-4 text-muted-foreground">
              unit
            </span>
          </div>
        ))}
      </div>
      {showFooter && (
        <CardFooter className="flex flex-col items-start gap-1">
          <div className="flex items-center gap-1 text-sm font-medium text-card-foreground">
            Trending up by 5.2% this month
            <IconTrendingUp aria-hidden="true" className="h-4 w-4" />
          </div>
          <div className="text-sm leading-4 text-muted-foreground">
            Total visitors for the last 6 months
          </div>
        </CardFooter>
      )}
    </>
  );
}

export const ChartBasic: Story = {
  name: 'Chart: Pie',
  parameters: { order: 50 },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
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
  render: function ChartBasicRender() {
    const [chartData] = useState(sharedChartData);
    return (
      <Card className="grid grid-rows-[auto_1fr_auto] w-100">
        <CardHeader>
          <ArtifactTitle>Chart title</ArtifactTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <PieChartBlock chartData={chartData} total={1125} />
        </CardContent>
      </Card>
    );
  },
};

export const ChartWithHeader: Story = {
  name: 'Chart: Pie (Header)',
  parameters: { order: 51 },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText('Chart title')).toBeInTheDocument();
    await expect(
      await canvas.findByText('January - June 2024')
    ).toBeInTheDocument();
    await expect(await canvas.findByText('1,125')).toBeInTheDocument();
  },
  render: function ChartWithHeaderRender() {
    const [chartData] = useState(sharedChartData);
    return (
      <Card className="grid grid-rows-[auto_1fr_auto] w-100">
        <CardHeader>
          <ArtifactTitle>Chart title</ArtifactTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <PieChartBlock
            chartData={chartData}
            total={1125}
            showFooter={false}
          />
        </CardContent>
      </Card>
    );
  },
};

export const ChartWithFooter: Story = {
  name: 'Chart: Pie (Footer)',
  parameters: { order: 52 },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await expect(
      await canvas.findByText('Trending up by 5.2% this month')
    ).toBeInTheDocument();
    await expect(await canvas.findByText('1,125')).toBeInTheDocument();
  },
  render: function ChartWithFooterRender() {
    const [chartData] = useState(sharedChartData);
    return (
      <Card className="grid grid-rows-[auto_1fr_auto] w-100">
        <CardContent>
          <PieChartBlock chartData={chartData} total={1125} />
        </CardContent>
      </Card>
    );
  },
};

export const ChartWithActions: Story = {
  name: 'Chart: Pie (Actions)',
  parameters: { order: 53 },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText('Chart title')).toBeInTheDocument();
    const buttons = await canvas.findAllByRole('button');
    await expect(buttons.length).toBeGreaterThan(0);
  },
  render: function ChartWithActionsRender() {
    const [chartData] = useState(sharedChartData);
    return (
      <Card className="grid grid-rows-[auto_1fr_auto] w-100">
        <CardHeader>
          <CardHeaderContent>
            <ArtifactTitle>Chart title</ArtifactTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeaderContent>
          <CardHeaderRight>
            <CardActions>
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuItem>Export data</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">Remove</DropdownMenuItem>
            </CardActions>
          </CardHeaderRight>
        </CardHeader>
        <CardContent>
          <PieChartBlock chartData={chartData} total={1125} />
        </CardContent>
      </Card>
    );
  },
};

export const ChartMinimalHeader: Story = {
  name: 'Chart: Pie (Minimal Header)',
  parameters: { order: 54 },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText('Chart title')).toBeInTheDocument();
    await expect(await canvas.findByText('1,125')).toBeInTheDocument();
  },
  render: function ChartMinimalHeaderRender() {
    const [chartData] = useState(sharedChartData);
    return (
      <Card className="grid grid-rows-[auto_1fr_auto] w-100">
        <CardHeader>
          <ArtifactTitle>Chart title</ArtifactTitle>
        </CardHeader>
        <CardContent>
          <PieChartBlock chartData={chartData} total={1125} />
        </CardContent>
      </Card>
    );
  },
};

export const ChartInteractiveDataToggle: Story = {
  name: 'Chart: Pie (Interactive)',
  parameters: { order: 55 },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText('Chart title')).toBeInTheDocument();
    await expect(await canvas.findByText('Q1')).toBeInTheDocument();
    await expect(await canvas.findByText('Q2')).toBeInTheDocument();
  },
  render: function ChartInteractiveDataToggleRender() {
    const q1Data = [
      { id: 'slice1', value: 275 },
      { id: 'slice2', value: 250 },
      { id: 'slice3', value: 225 },
      { id: 'slice4', value: 200 },
      { id: 'slice5', value: 175 },
    ];
    const q2Data = [
      { id: 'slice1', value: 175 },
      { id: 'slice2', value: 200 },
      { id: 'slice3', value: 225 },
      { id: 'slice4', value: 250 },
      { id: 'slice5', value: 275 },
    ];
    const [activeQuarter, setActiveQuarter] = useState<'q1' | 'q2'>('q1');
    const chartData = activeQuarter === 'q1' ? q1Data : q2Data;
    const total = chartData.reduce((sum, item) => sum + item.value, 0);
    return (
      <Card className="grid grid-rows-[auto_1fr_auto] w-100">
        <CardHeader>
          <ArtifactTitle>Chart title</ArtifactTitle>
          <CardDescription>Click buttons to switch quarters</CardDescription>
        </CardHeader>
        <CardContent>
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
              <PieChart style={{ overflow: 'visible' }}>
                <ChartTooltip
                  cursor={false}
                  content={({ active, payload }) => (
                    <SharedPieChartTooltipContent
                      active={active}
                      payload={payload}
                    />
                  )}
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
                  label={renderPieLabel}
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
                    backgroundColor: isSharedChartConfigKey(item.id)
                      ? sharedChartConfig[item.id]?.color
                      : undefined,
                  }}
                />
                <span className="text-sm leading-4 text-muted-foreground">
                  unit
                </span>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-1">
          <div className="flex items-center gap-1 text-sm font-medium text-card-foreground">
            Trending up by 5.2% this month
            <IconTrendingUp aria-hidden="true" className="h-4 w-4" />
          </div>
          <div className="text-sm leading-4 text-muted-foreground">
            Total visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
    );
  },
};

export const ChartVisualRegression: Story = {
  name: 'Chart: Pie (Visual Regression)',
  parameters: { order: 56 },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText('Chart title')).toBeInTheDocument();
    await expect(await canvas.findByText('1,125')).toBeInTheDocument();
  },
  render: function ChartVisualRegressionRender() {
    const [chartData] = useState(sharedChartData);
    return (
      <Card className="grid grid-rows-[auto_1fr_auto] w-100">
        <CardHeader>
          <ArtifactTitle>Chart title</ArtifactTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative flex items-center justify-center">
            <ChartContainer
              config={sharedChartConfig}
              className="h-70 w-100 overflow-visible"
            >
              <PieChart style={{ overflow: 'visible' }}>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="id"
                  innerRadius={61}
                  outerRadius={100}
                  strokeWidth={0}
                  startAngle={90}
                  endAngle={-270}
                  label={renderPieLabel}
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
                    backgroundColor: isSharedChartConfigKey(item.id)
                      ? sharedChartConfig[item.id]?.color
                      : undefined,
                  }}
                />
                <span className="text-sm leading-4 text-muted-foreground">
                  unit
                </span>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-1">
          <div className="flex items-center gap-1 text-sm font-medium text-card-foreground">
            Trending up by 5.2% this month
            <IconTrendingUp aria-hidden="true" className="h-4 w-4" />
          </div>
          <div className="text-sm leading-4 text-muted-foreground">
            Total visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
    );
  },
};

export const ChartEdgeCaseLongText: Story = {
  name: 'Chart: Pie (Long Text)',
  parameters: { order: 57 },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await expect(
      await canvas.findByText(/Quarterly Revenue Distribution/)
    ).toBeInTheDocument();
  },
  render: function ChartEdgeCaseLongTextRender() {
    const [chartData] = useState(sharedChartData);
    return (
      <Card className="grid grid-rows-[auto_1fr_auto] w-100">
        <CardHeader>
          <ArtifactTitle>
            Quarterly Revenue Distribution Across All Business Units and Regions
          </ArtifactTitle>
          <CardDescription>
            This chart shows the breakdown of revenue sources including product
            sales, professional services, and recurring subscriptions for Q4
            2024.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PieChartBlock chartData={chartData} total={1125} />
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-1">
          <div className="text-sm leading-4 text-muted-foreground">
            Data aggregated from all regional offices and includes both direct
            and partner channel revenue streams.
          </div>
        </CardFooter>
      </Card>
    );
  },
};

export const ChartEdgeCaseNoData: Story = {
  name: 'Chart: Pie (No Data)',
  parameters: { order: 58 },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await expect(
      await canvas.findByText('No data available')
    ).toBeInTheDocument();
  },
  render: function ChartEdgeCaseNoDataRender() {
    const [chartData] = useState<{ id: string; value: number }[]>([]);
    return (
      <Card className="grid grid-rows-[auto_1fr_auto] w-100">
        <CardHeader>
          <ArtifactTitle>Chart title</ArtifactTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
          {chartData.length === 0 ? (
            <div className="flex h-70 w-full items-center justify-center">
              <p className="text-sm text-muted-foreground">No data available</p>
            </div>
          ) : (
            <div className="relative flex items-center justify-center">
              <div className="h-70 w-100" />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-1">
          <div className="text-sm text-muted-foreground">
            Data will appear once activity is recorded
          </div>
        </CardFooter>
      </Card>
    );
  },
};

export const ChartStackedAreaChart: Story = {
  name: 'Chart: Area (Stacked)',
  parameters: { order: 59 },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
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
  render: function ChartStackedAreaChartRender() {
    return (
      <Card className="grid grid-rows-[auto_1fr_auto] w-100">
        <CardHeader>
          <CardHeaderContent>
            <ArtifactTitle>Reactor temperature trend</ArtifactTitle>
            <CardDescription>Last 24 hours</CardDescription>
          </CardHeaderContent>
          <CardHeaderRight>
            <CardActions>
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuItem>Export data</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">Remove</DropdownMenuItem>
            </CardActions>
          </CardHeaderRight>
        </CardHeader>
        <CardContent>
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
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  return (
                    <div className="rounded border border-border bg-popover px-2 py-1 shadow-md">
                      {payload.map((entry) => {
                        const key =
                          typeof entry.dataKey === 'string'
                            ? entry.dataKey
                            : '';
                        const config = isAreaChartConfigKey(key)
                          ? areaChartConfig[key]
                          : undefined;
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
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-1">
          <div className="flex items-center gap-1 text-sm font-medium text-card-foreground">
            Trending up by 5.2% this month
            <IconTrendingUp aria-hidden="true" className="h-4 w-4" />
          </div>
        </CardFooter>
      </Card>
    );
  },
};

export const ChartMultiLineChart: Story = {
  name: 'Chart: Line (Multi)',
  parameters: { order: 60 },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
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
  render: function ChartMultiLineChartRender() {
    return (
      <Card className="grid grid-rows-[auto_1fr_auto] w-100">
        <CardHeader>
          <CardHeaderContent>
            <ArtifactTitle>Performance metrics</ArtifactTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeaderContent>
          <CardHeaderRight>
            <CardActions>
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuItem>Export data</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">Remove</DropdownMenuItem>
            </CardActions>
          </CardHeaderRight>
        </CardHeader>
        <CardContent>
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
                        const key =
                          typeof entry.dataKey === 'string'
                            ? entry.dataKey
                            : '';
                        const config = isLineChartConfigKey(key)
                          ? lineChartConfig[key]
                          : undefined;
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
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-1">
          <div className="flex items-center gap-1 text-sm font-medium text-card-foreground">
            Trending up by 5.2% this month
            <IconTrendingUp aria-hidden="true" className="h-4 w-4" />
          </div>
        </CardFooter>
      </Card>
    );
  },
};

export const ChartHorizontalBarChart: Story = {
  name: 'Chart: Bar (Horizontal)',
  parameters: { order: 61 },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
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
  render: function ChartHorizontalBarChartRender() {
    const chartData = barChartData;
    const barGradientId = useId();
    const tooltipGradientId = useId();
    return (
      <Card className="grid grid-rows-[auto_1fr_auto] w-100">
        <CardHeader>
          <CardHeaderContent>
            <ArtifactTitle>Chart title</ArtifactTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeaderContent>
          <CardHeaderRight>
            <CardActions>
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuItem>Export data</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">Remove</DropdownMenuItem>
            </CardActions>
          </CardHeaderRight>
        </CardHeader>
        <CardContent>
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
                  const name =
                    typeof data.payload?.name === 'string'
                      ? data.payload.name
                      : '';
                  const value = typeof data.value === 'number' ? data.value : 0;
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
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-1">
          <div className="flex items-center gap-1 text-sm font-medium text-card-foreground">
            Trending up by 5.2% this month
            <IconTrendingUp aria-hidden="true" className="h-4 w-4" />
          </div>
          <div className="text-sm leading-4 text-muted-foreground">
            Total visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
    );
  },
};

export const ChartRadialChart: Story = {
  name: 'Chart: Radial',
  parameters: { order: 62 },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText('Chart title')).toBeInTheDocument();
    await expect(
      await canvas.findByText('January - June 2024')
    ).toBeInTheDocument();
    await expect(
      await canvas.findByText('Trending up by 5.2% this month')
    ).toBeInTheDocument();
  },
  render: function ChartRadialChartRender() {
    const [hoveredRing, setHoveredRing] = useState<RadialRingDatum | null>(
      null
    );
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };
    return (
      <Card className="grid grid-rows-[auto_1fr_auto] w-100">
        <CardHeader>
          <CardHeaderContent>
            <ArtifactTitle>Chart title</ArtifactTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeaderContent>
          <CardHeaderRight>
            <CardActions>
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuItem>Export data</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">Remove</DropdownMenuItem>
            </CardActions>
          </CardHeaderRight>
        </CardHeader>
        <CardContent>
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
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-1">
          <div className="flex items-center gap-1 text-sm font-medium text-card-foreground">
            Trending up by 5.2% this month
            <IconTrendingUp aria-hidden="true" className="h-4 w-4" />
          </div>
          <div className="text-sm leading-4 text-muted-foreground">
            Total visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
    );
  },
};
