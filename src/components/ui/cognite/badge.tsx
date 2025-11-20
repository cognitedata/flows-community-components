import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center align-middle justify-center rounded-sm border px-1 text-sm font-medium w-fit whitespace-nowrap shrink-0 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-ring-md aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden leading-[18px]',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground',
        fjord:
          'border-transparent bg-fjord-50 text-fjord-700 dark:bg-fjord-900 dark:text-fjord-300',
        nordic:
          'border-transparent bg-nordic-50 text-nordic-600 dark:bg-nordic-900 dark:text-nordic-300',
        aurora:
          'border-transparent bg-aurora-50 text-aurora-600 dark:bg-aurora-900 dark:text-aurora-300',
        sky: 'border-transparent bg-sky-50 text-sky-600 dark:bg-sky-900 dark:text-sky-300',
        dusk: 'border-transparent bg-dusk-50 text-dusk-600 dark:bg-dusk-900 dark:text-dusk-400',
        mountain:
          'border-transparent bg-mountain-50 text-mountain-600 dark:bg-mountain-900 dark:text-mountain-400',
        secondary: 'border-transparent bg-secondary text-secondary-foreground ',
        error: 'border-transparent bg-destructive text-destructive-foreground',
        warning: 'border-transparent bg-warning text-warning-foreground',
        success: 'border-transparent bg-success text-success-foreground',
        inProgress: 'border-transparent bg-neutral text-neutral-foreground',
        archived: 'border-transparent bg-undefined text-undefined-foreground',
        closable:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary-hover cursor-pointer',
      },
      outline: {
        true: 'border-current px-0.75',
      },
      background: {
        false: 'bg-transparent',
      },
      dot: {
        true: 'rounded-full',
      },
    },

    defaultVariants: {
      variant: 'default',
      outline: false,
      background: true,
      dot: false,
    },
  }
);

function Badge({
  className,
  variant,
  outline,
  dot,
  background,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp
      data-slot="badge"
      className={cn(
        badgeVariants({ variant, background }),
        outline && 'border-current px-0.75',
        dot && 'rounded-full',
        className
      )}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
