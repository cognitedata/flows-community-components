import { Button } from '@cognite/aura/components';
import { cn } from '@cognite/aura/utils';
import { IconExternalLink } from '@tabler/icons-react';
import {
  type ForwardRefExoticComponent,
  type RefAttributes,
  type ComponentProps,
  type ComponentRef,
  type ReactNode,
  forwardRef,
} from 'react';

type EmptyStateProps = {
  title: string;
  size?: 'default' | 'sm';
  icon?: ReactNode;
  body?: string | ReactNode;
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
  helpLink?: { label: string } & Omit<ComponentProps<'a'>, 'children'>;
};

const EmptyState: ForwardRefExoticComponent<
  Omit<EmptyStateProps & ComponentProps<'div'>, 'ref'> &
    RefAttributes<HTMLDivElement>
> = forwardRef<ComponentRef<'div'>, EmptyStateProps & ComponentProps<'div'>>(
  (
    {
      title,
      size = 'default',
      icon,
      body,
      primaryAction,
      secondaryAction,
      helpLink,
      className,
      ...props
    },
    ref
  ) => {
    const { label: helpLinkLabel, ...helpLinkProps } = helpLink ?? {};

    return (
      <div
        data-slot="empty-state"
        ref={ref}
        className={cn(
          'flex flex-col items-center size-full w-full justify-center text-center max-w-96',
          size === 'default' && 'gap-6',
          size === 'sm' && 'gap-3',
          className
        )}
        {...props}
      >
        {icon}
        <div
          className={cn(
            size === 'default' && 'mb-2 space-y-4',
            size === 'sm' && 'mb-3 space-y-2'
          )}
        >
          <h3
            className={cn(
              'font-medium text-foreground tracking-tightest',
              size === 'default' && 'text-xl',
              size === 'sm' && 'text-base'
            )}
          >
            {title}
          </h3>
          {body && typeof body === 'string' && (
            <p
              className={cn(
                'text-muted-foreground',
                size === 'default' && 'text-lg',
                size === 'sm' && 'text-sm'
              )}
            >
              {body}
            </p>
          )}
          {body && typeof body !== 'string' && body}
        </div>
        <div className="flex flex-col gap-5 items-center">
          {size === 'default' && (
            <div className="flex gap-2">
              {secondaryAction}
              {primaryAction}
            </div>
          )}
          {size === 'sm' && (
            <div className="flex gap-2 flex-col items-center">
              {primaryAction}
              {secondaryAction}
            </div>
          )}
          {helpLink && (
            <Button
              variant="ghost"
              size={size}
              render={
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  {...helpLinkProps}
                ></a>
              }
              nativeButton={false}
            >
              {helpLinkLabel}
              <IconExternalLink className="size-4" />
            </Button>
          )}
        </div>
      </div>
    );
  }
);

EmptyState.displayName = 'EmptyState';

export { EmptyState };
