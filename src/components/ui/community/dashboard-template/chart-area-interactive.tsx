import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@cognite/aura/chart';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardHeaderEnd,
  CardHeaderStart,
  CardTitle,
  SegmentedControl,
  SegmentedControlButton,
  SegmentedControlList,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@cognite/aura/components';
import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import {
  chartReferenceDate,
  visitorChartData,
} from './dashboard-template.data';

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  desktop: {
    label: 'Desktop',
    color: 'var(--color-chart-fjord-color-1)',
  },
  mobile: {
    label: 'Mobile',
    color: 'var(--color-chart-nordic-color-1)',
  },
} satisfies ChartConfig;

type TimeRange = '90d' | '30d' | '7d';

function isTimeRange(value: unknown): value is TimeRange {
  return value === '90d' || value === '30d' || value === '7d';
}

function formatChartDate(value: string): string {
  const date = new Date(`${value}T00:00:00`);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export function ChartAreaInteractive(): ReactNode {
  const [timeRange, setTimeRange] = useState<TimeRange>('90d');

  const filteredData = useMemo(() => {
    const referenceDate = new Date(`${chartReferenceDate}T00:00:00`);
    const daysToSubtract =
      timeRange === '30d' ? 30 : timeRange === '7d' ? 7 : 90;
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);

    return visitorChartData.filter((item) => {
      const date = new Date(`${item.date}T00:00:00`);
      return date >= startDate;
    });
  }, [timeRange]);

  return (
    <Card data-slot="dashboard-chart">
      <CardHeader className="flex flex-col items-stretch gap-3 @3xl/main:flex-row @3xl/main:items-start @3xl/main:justify-between">
        <CardHeaderStart className="min-w-0">
          <CardTitle>Total Visitors</CardTitle>
          <CardDescription>
            {timeRange === '90d'
              ? 'Total for the last 3 months'
              : timeRange === '30d'
                ? 'Total for the last 30 days'
                : 'Total for the last 7 days'}
          </CardDescription>
        </CardHeaderStart>
        <CardHeaderEnd className="w-full @3xl/main:w-auto">
          <SegmentedControl
            value={timeRange}
            onValueChange={(value) => {
              if (isTimeRange(value)) {
                setTimeRange(value);
              }
            }}
            className="hidden @3xl/main:block"
          >
            <SegmentedControlList size="small">
              <SegmentedControlButton value="90d">
                Last 3 months
              </SegmentedControlButton>
              <SegmentedControlButton value="30d">
                Last 30 days
              </SegmentedControlButton>
              <SegmentedControlButton value="7d">
                Last 7 days
              </SegmentedControlButton>
            </SegmentedControlList>
          </SegmentedControl>
          <Select
            value={timeRange}
            onValueChange={(value) => {
              if (isTimeRange(value)) {
                setTimeRange(value);
              }
            }}
          >
            <SelectTrigger
              size="sm"
              className="w-40 @3xl/main:hidden"
              aria-label="Select time range"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="90d">Last 3 months</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
            </SelectContent>
          </Select>
        </CardHeaderEnd>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-64 w-full"
          aria-label="Total visitors area chart"
        >
          <AreaChart accessibilityLayer data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={1}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) =>
                typeof value === 'string' ? formatChartDate(value) : ''
              }
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="dot"
                  labelFormatter={(value) =>
                    typeof value === 'string' ? formatChartDate(value) : ''
                  }
                />
              }
            />
            <Area
              dataKey="mobile"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="visitors"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="visitors"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
