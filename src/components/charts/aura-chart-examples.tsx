import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@cognite/aura/chart';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardHeaderCenter,
  CardTitle,
} from '@cognite/aura/components';
import { cn } from '@cognite/aura/utils';
import type { ReactNode } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from 'recharts';

function ChartExample({
  title,
  description,
  className,
  children,
}: {
  title: string;
  description: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardHeaderCenter>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeaderCenter>
      </CardHeader>
      <CardContent className="w-full">{children}</CardContent>
    </Card>
  );
}

const barData = [
  { week: 'W1', throughput: 186 },
  { week: 'W2', throughput: 305 },
  { week: 'W3', throughput: 237 },
  { week: 'W4', throughput: 273 },
  { week: 'W5', throughput: 209 },
  { week: 'W6', throughput: 214 },
];

const barConfig = {
  throughput: {
    label: 'Throughput',
    color: 'var(--color-chart-fjord-color-1)',
  },
} satisfies ChartConfig;

export function BarChartExample() {
  return (
    <ChartExample
      title="Bar chart"
      description="Weekly throughput across operating sites."
    >
      <ChartContainer
        config={barConfig}
        className="w-full"
        aria-label="Weekly throughput bar chart"
      >
        <BarChart accessibilityLayer data={barData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="week"
            tickLine={false}
            tickMargin={8}
            axisLine={false}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar dataKey="throughput" fill="var(--color-throughput)" radius={4} />
        </BarChart>
      </ChartContainer>
    </ChartExample>
  );
}

const horizontalBarData = [
  { site: 'North', production: 186 },
  { site: 'Central', production: 305 },
  { site: 'East', production: 237 },
  { site: 'West', production: 173 },
  { site: 'South', production: 209 },
];

const horizontalBarConfig = {
  production: {
    label: 'Production',
    color: 'var(--color-chart-nordic-color-1)',
  },
} satisfies ChartConfig;

export function HorizontalBarChartExample() {
  return (
    <ChartExample
      title="Horizontal bar chart"
      description="Production by site, ranked for comparison."
    >
      <ChartContainer
        config={horizontalBarConfig}
        className="w-full"
        aria-label="Production by site horizontal bar chart"
      >
        <BarChart
          accessibilityLayer
          data={horizontalBarData}
          layout="vertical"
          margin={{ left: 8 }}
        >
          <XAxis type="number" hide />
          <YAxis
            dataKey="site"
            type="category"
            tickLine={false}
            tickMargin={8}
            axisLine={false}
            width={72}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Bar dataKey="production" fill="var(--color-production)" radius={4} />
        </BarChart>
      </ChartContainer>
    </ChartExample>
  );
}

const donutData = [
  { status: 'open', count: 42, fill: 'var(--color-open)' },
  { status: 'inProgress', count: 28, fill: 'var(--color-inProgress)' },
  { status: 'complete', count: 91, fill: 'var(--color-complete)' },
];

const donutConfig = {
  count: { label: 'Work orders' },
  open: {
    label: 'Open',
    color: 'var(--color-chart-fjord-color-1)',
  },
  inProgress: {
    label: 'In progress',
    color: 'var(--color-chart-orange-color-1)',
  },
  complete: {
    label: 'Complete',
    color: 'var(--color-chart-nordic-color-1)',
  },
} satisfies ChartConfig;

export function DonutChartExample() {
  return (
    <ChartExample
      title="Donut chart"
      description="Work order status across the current period."
    >
      <ChartContainer
        config={donutConfig}
        className="mx-auto aspect-square max-h-72 w-full"
        aria-label="Work order status donut chart"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel nameKey="status" />}
          />
          <Pie
            data={donutData}
            dataKey="count"
            nameKey="status"
            innerRadius={68}
            strokeWidth={4}
          />
          <ChartLegend content={<ChartLegendContent nameKey="status" />} />
        </PieChart>
      </ChartContainer>
    </ChartExample>
  );
}

const sparklineData = [
  { hour: '00', rate: 1180 },
  { hour: '04', rate: 1212 },
  { hour: '08', rate: 1264 },
  { hour: '12', rate: 1198 },
  { hour: '16', rate: 1248 },
  { hour: '20', rate: 1276 },
  { hour: '24', rate: 1254 },
];

const sparklineConfig = {
  rate: {
    label: 'Rate',
    color: 'var(--color-chart-fjord-color-1)',
  },
} satisfies ChartConfig;

const latestRate = sparklineData[sparklineData.length - 1]?.rate ?? 0;

export function SparklineExample() {
  return (
    <ChartExample
      title="Sparkline"
      description="Live production rate over the last 24 hours."
    >
      <p className="font-heading text-3xl font-semibold tracking-tight">
        {latestRate.toLocaleString()}{' '}
        <span className="text-sm font-medium text-muted-fg">bbl/h</span>
      </p>
      <ChartContainer
        config={sparklineConfig}
        className="aspect-auto h-16 w-full"
        aria-label="Production rate sparkline"
      >
        <LineChart
          accessibilityLayer
          data={sparklineData}
          margin={{ top: 4, right: 4, bottom: 4, left: 4 }}
        >
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Line
            dataKey="rate"
            type="natural"
            stroke="var(--color-rate)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </ChartExample>
  );
}

const stackedAreaData = [
  { month: 'Jan', oil: 186, gas: 80, condensate: 40 },
  { month: 'Feb', oil: 305, gas: 200, condensate: 90 },
  { month: 'Mar', oil: 237, gas: 120, condensate: 70 },
  { month: 'Apr', oil: 273, gas: 190, condensate: 85 },
  { month: 'May', oil: 209, gas: 130, condensate: 60 },
  { month: 'Jun', oil: 214, gas: 140, condensate: 75 },
];

const stackedAreaConfig = {
  oil: {
    label: 'Oil',
    color: 'var(--color-chart-fjord-color-1)',
  },
  gas: {
    label: 'Gas',
    color: 'var(--color-chart-nordic-color-1)',
  },
  condensate: {
    label: 'Condensate',
    color: 'var(--color-chart-aurora-color-1)',
  },
} satisfies ChartConfig;

export function StackedAreaChartExample() {
  return (
    <ChartExample
      title="Stacked area chart"
      description="Production mix over the first half of the year."
      className="lg:col-span-2"
    >
      <ChartContainer
        config={stackedAreaConfig}
        className="w-full"
        aria-label="Production mix stacked area chart"
      >
        <AreaChart
          accessibilityLayer
          data={stackedAreaData}
          margin={{ left: 12, right: 12 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={8}
            axisLine={false}
            interval={0}
            padding={{ left: 8, right: 8 }}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <ChartLegend content={<ChartLegendContent />} />
          <Area
            dataKey="condensate"
            type="natural"
            fill="var(--color-condensate)"
            fillOpacity={0.4}
            stroke="var(--color-condensate)"
            stackId="production"
          />
          <Area
            dataKey="gas"
            type="natural"
            fill="var(--color-gas)"
            fillOpacity={0.4}
            stroke="var(--color-gas)"
            stackId="production"
          />
          <Area
            dataKey="oil"
            type="natural"
            fill="var(--color-oil)"
            fillOpacity={0.4}
            stroke="var(--color-oil)"
            stackId="production"
          />
        </AreaChart>
      </ChartContainer>
    </ChartExample>
  );
}

export function AuraChartsGallery({ className }: { className?: string }) {
  return (
    <div className={cn('grid grid-cols-1 gap-4 lg:grid-cols-2', className)}>
      <BarChartExample />
      <HorizontalBarChartExample />
      <DonutChartExample />
      <SparklineExample />
      <StackedAreaChartExample />
    </div>
  );
}
