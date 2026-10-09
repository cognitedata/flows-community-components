import { ChartContainer, type ChartConfig } from '@cognite/aura/chart';
import { type ReactNode, useId } from 'react';
import { Area, AreaChart, Line, LineChart } from 'recharts';

import type { RecordListStatus } from './record-list-template.data';

const statusChartColor: Record<RecordListStatus, string> = {
  Running: 'var(--color-chart-2-450)',
  Standby: 'var(--color-chart-neutral-color-5)',
  Alarm: 'var(--color-chart-destructive-color-1)',
  Maintenance: 'var(--color-chart-warning-color-1)',
  Offline: 'var(--color-chart-neutral-color-6)',
  Starting: 'var(--color-chart-1-450)',
};

function recordListTrendColor(status: RecordListStatus): string {
  return statusChartColor[status];
}

function RecordListTrend({
  label,
  values,
  color,
  compact = false,
}: {
  label: string;
  values: readonly number[];
  color: string;
  compact?: boolean;
}): ReactNode {
  const gradientId = useId().replaceAll(':', '');
  const data = values.map((value, index) => ({ index, value }));
  const config = {
    value: { label, color },
  } satisfies ChartConfig;

  return (
    <ChartContainer
      aria-label={label}
      config={config}
      className={compact ? 'aspect-auto h-6 w-28' : 'aspect-auto h-16 w-full'}
    >
      {compact ? (
        <LineChart
          data={data}
          margin={{ top: 4, right: 0, bottom: 4, left: 0 }}
        >
          <Line
            type="monotone"
            dataKey="value"
            stroke="var(--color-value)"
            strokeWidth={1.5}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      ) : (
        <AreaChart
          data={data}
          margin={{ top: 8, right: 0, bottom: 0, left: 0 }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="var(--color-value)"
                stopOpacity={0.35}
              />
              <stop
                offset="100%"
                stopColor="var(--color-value)"
                stopOpacity={0.02}
              />
            </linearGradient>
          </defs>
          <Area
            type="step"
            dataKey="value"
            stroke="var(--color-value)"
            fill={`url(#${gradientId})`}
            strokeWidth={1.5}
            dot={false}
            isAnimationActive={false}
          />
        </AreaChart>
      )}
    </ChartContainer>
  );
}

RecordListTrend.displayName = 'RecordListTrend';

export { RecordListTrend, recordListTrendColor };
