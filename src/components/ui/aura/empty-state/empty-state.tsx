import { IconExternalLink } from '@tabler/icons-react';
import { type ComponentProps } from 'react';

import { Button } from '../button';

import { cn } from '@/lib/utils';

type EmptyStateProps = {
  title: string;
  size?: 'default' | 'sm';
  icon?: React.ReactNode;
  body?: string | React.ReactNode;
  primaryAction?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  helpLink?: { label: string } & ComponentProps<'a'>;
};

const EmptyState = ({
  title,
  size = 'default',
  icon,
  body,
  primaryAction,
  secondaryAction,
  helpLink,
  className,
  ...props
}: EmptyStateProps & ComponentProps<'div'>) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-3 size-full w-full justify-center text-center',
        size === 'default' && 'max-w-90',
        size === 'sm' && 'max-w-80',
        className
      )}
      {...props}
    >
      {icon}
      <div
        className={cn(
          size === 'default' && 'mb-10 space-y-3',
          size === 'sm' && 'mb-4 space-y-2'
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
      <div className="flex gap-2">
        {secondaryAction}
        {primaryAction}
      </div>
      {helpLink && (
        <div className="text-muted-foreground text-sm">
          <Button
            variant="link"
            size="sm"
            render={<a {...helpLink} />}
            nativeButton={false}
          >
            {helpLink.label}
            <IconExternalLink />
          </Button>
        </div>
      )}
    </div>
  );
};

export { EmptyState };
