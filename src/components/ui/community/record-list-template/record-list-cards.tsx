import {
  Card,
  CardContent,
  CardHeader,
  CardHeaderCenter,
  CardHeaderEnd,
  CardTitle,
} from '@cognite/aura/components';
import { cn } from '@cognite/aura/utils';
import type { ReactNode } from 'react';

import {
  formatRecordListReading,
  type RecordListSampleRow,
  type RecordListStatus,
} from './record-list-template.data';
import { RecordListTrend, recordListTrendColor } from './record-list-trend';

const recordListTitleClass =
  'font-sans text-base font-medium leading-5 tracking-normal min-h-10';

const statusTone: Record<
  RecordListStatus,
  { text: string; dot: string; chip: string; chart: string }
> = {
  Running: {
    text: 'text-success-foreground',
    dot: 'bg-success-foreground',
    chip: 'bg-success-muted-background text-success-foreground',
    chart: recordListTrendColor('Running'),
  },
  Standby: {
    text: 'text-muted-foreground',
    dot: 'bg-muted-foreground',
    chip: 'bg-muted-background text-foreground',
    chart: recordListTrendColor('Standby'),
  },
  Alarm: {
    text: 'text-destructive-foreground',
    dot: 'bg-destructive-foreground',
    chip: 'bg-destructive-muted-background text-destructive-foreground',
    chart: recordListTrendColor('Alarm'),
  },
  Maintenance: {
    text: 'text-warning-foreground',
    dot: 'bg-warning-foreground',
    chip: 'bg-warning-muted-background text-warning-foreground',
    chart: recordListTrendColor('Maintenance'),
  },
  Offline: {
    text: 'text-muted-foreground',
    dot: 'bg-muted-foreground',
    chip: 'bg-muted-background text-foreground',
    chart: recordListTrendColor('Offline'),
  },
  Starting: {
    text: 'text-info-foreground',
    dot: 'bg-info-foreground',
    chip: 'bg-info-muted-background text-info-foreground',
    chart: recordListTrendColor('Starting'),
  },
};

function RecordListCards({ rows }: { rows: RecordListSampleRow[] }): ReactNode {
  return (
    <ul
      data-slot="record-list-cards"
      aria-label="Assets"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
    >
      {rows.map((row) => {
        const tone = statusTone[row.status];
        return (
          <li key={row.id} className="flex">
            <Card className="h-full w-full">
              <CardHeader>
                <CardHeaderCenter>
                  <CardTitle className={recordListTitleClass}>
                    {row.signal} on {row.code}
                  </CardTitle>
                  <p
                    className={cn(
                      'flex items-center gap-1.5 text-sm font-medium leading-5',
                      tone.text
                    )}
                  >
                    <span
                      className={cn('size-2 shrink-0 rounded-full', tone.dot)}
                      aria-hidden="true"
                    />
                    {row.status}
                  </p>
                </CardHeaderCenter>
                <CardHeaderEnd>
                  <div
                    className={cn(
                      'flex flex-col items-center rounded-lg px-2 py-1',
                      tone.chip
                    )}
                  >
                    <span className="text-sm font-medium leading-5">
                      {formatRecordListReading(row.trend)}
                    </span>
                    <span className="text-xs leading-4">{row.unit}</span>
                  </div>
                </CardHeaderEnd>
              </CardHeader>
              <CardContent>
                <RecordListTrend
                  label={`${row.signal} on ${row.code}`}
                  values={row.trend}
                  color={tone.chart}
                />
              </CardContent>
            </Card>
          </li>
        );
      })}
    </ul>
  );
}

RecordListCards.displayName = 'RecordListCards';

export { RecordListCards };
