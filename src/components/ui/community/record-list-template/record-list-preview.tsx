import {
  Badge,
  Button,
  CardContent,
  CardDescription,
  CardTitle,
} from '@cognite/aura/components';
import type { ReactNode } from 'react';

import {
  formatRecordListDate,
  recordListStatuses,
  type RecordListSampleRow,
} from './record-list-template.data';
import { RecordListTrend, recordListTrendColor } from './record-list-trend';

function RecordListPreview({ row }: { row: RecordListSampleRow }): ReactNode {
  return (
    <aside
      data-slot="record-list-preview"
      aria-label="Preview"
      className="flex w-80 shrink-0 flex-col border-l p-4"
    >
      <CardTitle className="font-sans text-base font-medium leading-5 tracking-normal">
        {row.asset}
      </CardTitle>
      <CardDescription>{row.area}</CardDescription>
      <div className="flex min-h-0 flex-1 flex-col">
        <CardContent>
          <Badge variant={recordListStatuses[row.status]}>{row.status}</Badge>
          <span>{row.summary}</span>
          <span>
            Owner {row.owner}. Updated {formatRecordListDate(row.updated)}.
          </span>
        </CardContent>
        <RecordListTrend
          label={`${row.signal} on ${row.code}`}
          values={row.trend}
          color={recordListTrendColor(row.status)}
        />
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" className="flex-1">
          Add comment
        </Button>
        <Button className="flex-1">Open asset</Button>
      </div>
    </aside>
  );
}

RecordListPreview.displayName = 'RecordListPreview';

export { RecordListPreview };
