import { Badge } from '@cognite/aura/components';

import type { PrimitiveStatus } from '@/lib/component-catalog-data';

const STATUS_LABEL: Record<PrimitiveStatus, string> = {
  'v1.0.0': 'v1.0.0',
  'coming-soon': 'Coming soon',
};

export function PrimitiveStatusBadge({ status }: { status: PrimitiveStatus }) {
  return (
    <Badge variant={status === 'coming-soon' ? 'orange' : 'inProgress'}>
      {STATUS_LABEL[status]}
    </Badge>
  );
}
