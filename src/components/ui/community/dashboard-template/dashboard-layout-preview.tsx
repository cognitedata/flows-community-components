import { Badge, Button } from '@cognite/aura/components';
import type { ReactNode } from 'react';

import {
  dashboardStatusVariant,
  type DashboardWorkOrder,
} from './dashboard-layouts.data';

function DashboardLayoutPreview({
  order,
}: {
  order: DashboardWorkOrder;
}): ReactNode {
  return (
    <aside
      aria-label="Preview"
      className="flex w-[282px] shrink-0 flex-col border-l bg-background"
    >
      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-auto p-4">
        <div className="flex flex-col gap-2">
          <Badge variant={dashboardStatusVariant[order.status]} outline>
            {order.status}
          </Badge>
          <h3 className="text-base font-medium leading-5">{order.name}</h3>
          <p className="text-sm text-muted-foreground">
            {order.area} · Due {order.due}
          </p>
        </div>
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
          <dt className="text-muted-foreground">Priority</dt>
          <dd>{order.priority}</dd>
          <dt className="text-muted-foreground">Owner</dt>
          <dd>{order.owner}</dd>
          <dt className="text-muted-foreground">Area</dt>
          <dd>{order.area}</dd>
        </dl>
      </div>
      <div className="grid grid-cols-2 gap-2 p-3">
        <Button variant="secondary">Add comment</Button>
        <Button>View details</Button>
      </div>
    </aside>
  );
}

DashboardLayoutPreview.displayName = 'DashboardLayoutPreview';

export { DashboardLayoutPreview };
