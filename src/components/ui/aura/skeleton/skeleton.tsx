import { type ComponentProps, type ComponentRef, forwardRef } from 'react';

import { cn } from '../../../../lib/utils';

const Skeleton = forwardRef<ComponentRef<'div'>, ComponentProps<'div'>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="skeleton"
      role="status"
      aria-label="Loading"
      className={cn('bg-accent animate-pulse rounded-md', className)}
      {...props}
    />
  )
);

Skeleton.displayName = 'Skeleton';

export { Skeleton };
