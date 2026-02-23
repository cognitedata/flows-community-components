import { type VariantProps, cva } from 'class-variance-authority';
import { type ComponentProps, type ComponentRef, forwardRef } from 'react';

import { cn } from '../../../../lib/utils';

const countVariants = cva(
  'flex flex-col items-center justify-center rounded px-0.5 text-3xl font-medium leading-8 tracking-tightest min-h-9 min-w-9',
  {
    variants: {
      variant: {
        default: 'bg-undefined text-undefined-foreground-alternate',
        warning: 'bg-warning text-warning-foreground-alternate',
        critical: 'bg-destructive text-destructive-foreground-alternate',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

type CountProps = ComponentProps<'output'> & VariantProps<typeof countVariants>;

const Count = forwardRef<ComponentRef<'output'>, CountProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <output
        ref={ref}
        data-slot="count"
        className={cn(countVariants({ variant }), className)}
        {...props}
      />
    );
  }
);
Count.displayName = 'Count';

export { Count, countVariants };
