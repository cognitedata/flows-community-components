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
import type { ReactNode } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import { DashboardOverviewCards } from './dashboard-layout-cards';

const productionData = [
  { hour: '06:00', output: 142, target: 160 },
  { hour: '08:00', output: 168, target: 160 },
  { hour: '10:00', output: 181, target: 170 },
  { hour: '12:00', output: 174, target: 170 },
  { hour: '14:00', output: 190, target: 175 },
  { hour: '16:00', output: 184, target: 175 },
  { hour: '18:00', output: 171, target: 165 },
  { hour: '20:00', output: 163, target: 160 },
];

const productionConfig = {
  output: {
    label: 'Output',
    color: 'var(--color-chart-fjord-color-1)',
  },
  target: {
    label: 'Target',
    color: 'var(--color-chart-nordic-color-1)',
  },
} satisfies ChartConfig;

const mixData = [
  { month: 'Jan', oil: 186, gas: 80, condensate: 40 },
  { month: 'Feb', oil: 305, gas: 200, condensate: 90 },
  { month: 'Mar', oil: 237, gas: 120, condensate: 70 },
  { month: 'Apr', oil: 273, gas: 190, condensate: 85 },
  { month: 'May', oil: 209, gas: 130, condensate: 60 },
  { month: 'Jun', oil: 214, gas: 140, condensate: 75 },
];

const mixConfig = {
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

function ChartCard({
  title,
  description,
  className,
  children,
}: {
  title: string;
  description: string;
  className?: string;
  children: ReactNode;
}): ReactNode {
  return (
    <Card className={className}>
      <CardHeader>
        <CardHeaderCenter>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeaderCenter>
      </CardHeader>
      <CardContent className="min-h-0 flex-1">{children}</CardContent>
    </Card>
  );
}

function DashboardLayoutOverview({ scope }: { scope?: string }): ReactNode {
  return (
    <div className="flex min-w-0 flex-col gap-4">
      <div className="grid min-w-0 items-stretch gap-4 @4xl/main:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <DashboardOverviewCards />
        <ChartCard
          className="flex h-full min-w-0 flex-col"
          title="Production"
          description={scope ? `${scope} · tonnes per hour` : 'Tonnes per hour'}
        >
          <ChartContainer
            config={productionConfig}
            className="aspect-auto h-full min-h-56 w-full"
            aria-label="Production"
          >
            <AreaChart
              accessibilityLayer
              data={productionData}
              margin={{ left: 12, right: 12 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="hour"
                tickLine={false}
                tickMargin={8}
                axisLine={false}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="target"
                type="natural"
                fill="var(--color-target)"
                fillOpacity={0.25}
                stroke="var(--color-target)"
              />
              <Area
                dataKey="output"
                type="natural"
                fill="var(--color-output)"
                fillOpacity={0.35}
                stroke="var(--color-output)"
              />
            </AreaChart>
          </ChartContainer>
        </ChartCard>
      </div>
      <ChartCard
        className="min-w-0"
        title="Production mix"
        description="Oil, gas, and condensate for the first half of the year."
      >
        <ChartContainer
          config={mixConfig}
          className="aspect-auto h-64 w-full"
          aria-label="Production mix"
        >
          <AreaChart
            accessibilityLayer
            data={mixData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={8}
              axisLine={false}
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
              fillOpacity={0.3}
              stroke="var(--color-condensate)"
            />
            <Area
              dataKey="gas"
              type="natural"
              fill="var(--color-gas)"
              fillOpacity={0.3}
              stroke="var(--color-gas)"
            />
            <Area
              dataKey="oil"
              type="natural"
              fill="var(--color-oil)"
              fillOpacity={0.3}
              stroke="var(--color-oil)"
            />
          </AreaChart>
        </ChartContainer>
      </ChartCard>
    </div>
  );
}

DashboardLayoutOverview.displayName = 'DashboardLayoutOverview';

export { DashboardLayoutOverview };
