import * as React from 'react';

import { cn } from '@/common/utils';

function SwapSlot({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div data-slot="swap-slot" className={cn(className)} {...props} />;
}

export { SwapSlot };
