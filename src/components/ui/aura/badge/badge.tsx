import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '../../../../lib/utils';

const badgeVariants = cva(
  'inline-flex items-center align-middle justify-center rounded-md border text-xs font-medium w-fit whitespace-nowrap shrink-0 gap-1 [&>svg]:pointer-events-none outline-none focus-visible:border-ring focus-visible:ring-ring-shadow focus-visible:ring aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden leading-4',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground',
        fjord:
          'border-transparent bg-decorative-background-fjord text-decorative-foreground-fjord',
        nordic:
          'border-transparent bg-decorative-background-nordic text-decorative-foreground-nordic',
        aurora:
          'border-transparent bg-decorative-background-aurora text-decorative-foreground-aurora',
        sky: 'border-transparent bg-decorative-background-sky text-decorative-foreground-sky',
        dusk: 'border-transparent bg-decorative-background-dusk text-decorative-foreground-dusk',
        orange:
          'border-transparent bg-decorative-background-orange text-decorative-foreground-orange',
        gray: 'border-transparent bg-decorative-background-gray text-decorative-foreground-gray',
        mountain:
          'border-transparent bg-decorative-background-mountain text-decorative-foreground-mountain',
        secondary: 'border-transparent bg-secondary text-secondary-foreground ',
        error:
          'border-transparent bg-destructive text-destructive-foreground-alternate',
        warning:
          'border-transparent bg-warning text-warning-foreground-alternate',
        success:
          'border-transparent bg-success text-success-foreground-alternate',
        inProgress:
          'border-transparent bg-neutral text-neutral-foreground-alternate',
        archived:
          'border-transparent bg-undefined text-undefined-foreground-alternate',
        closable:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary-hover cursor-pointer',
      },
      size: {
        default: 'px-1',
        icon: 'px-1.5 py-1 rounded-md',
      },
      outline: {
        true: 'border-border',
      },
      background: {
        false: 'bg-transparent',
      },
      dot: {
        true: 'rounded-full',
      },
    },
    compoundVariants: [
      {
        outline: true,
        size: 'default',
        className: 'px-1.5',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
      outline: false,
      background: true,
      dot: false,
    },
  }
);

type BadgeProps = useRender.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & {
    urgent?: boolean;
  };

function Badge({
  className,
  variant,
  size,
  outline,
  dot,
  background,
  urgent = false,
  children,
  render,
  ...props
}: BadgeProps) {
  const isEmpty = !children;

  const filledOnlyVariants = new Set([
    'mountain',
    'fjord',
    'nordic',
    'aurora',
    'dusk',
    'orange',
  ]);
  const canBeOutlined = variant && !filledOnlyVariants.has(variant);
  const isOutlined = outline === true && canBeOutlined;

  return useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>(
      {
        'data-slot': 'badge',
        className: cn(
          badgeVariants({
            variant,
            size,
            outline: isOutlined,
            background: isOutlined ? false : background,
            dot,
          }),
          isOutlined && variant === 'error' && 'text-destructive-foreground',
          isOutlined && variant === 'warning' && 'text-warning-foreground',
          isOutlined && variant === 'success' && 'text-success-foreground',
          isOutlined && variant === 'inProgress' && 'text-neutral-foreground',
          isOutlined && variant === 'archived' && 'text-undefined-foreground',
          dot && isEmpty && 'size-2 p-0 border-0',
          dot && isEmpty && urgent && 'bg-destructive-foreground',
          dot && isEmpty && !urgent && 'bg-neutral-foreground',
          className
        ),
      } as any,
      { ...props, children } as any
    ),
    render,
    state: {
      slot: 'badge',
      variant,
    },
  });
}

export { Badge, badgeVariants };
