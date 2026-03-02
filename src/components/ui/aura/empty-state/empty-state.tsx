import { IconExternalLink } from '@tabler/icons-react';
import { type ComponentProps } from 'react';

import { cn } from '../../../../lib/utils';
import { Button } from '../button';

type EmptyStateProps = {
  title: string;
  size?: 'default' | 'sm';
  icon?: React.ReactNode;
  body?: string | React.ReactNode;
  primaryAction?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  helpLink?: { label: string; href: string };
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
        'flex flex-col items-center gap-6 size-full w-full justify-center text-center',
        size === 'default' && 'max-w-96',
        size === 'sm' && 'max-w-80',
        className
      )}
      {...props}
    >
      {icon}
      <div
        className={cn(
          size === 'default' && 'mb-8 space-y-4',
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
      <div className="flex flex-col gap-5 items-center">
        <div className="flex gap-2">
          {secondaryAction}
          {primaryAction}
        </div>
        {helpLink && (
          <Button
            variant="ghost"
            render={<a href={helpLink.href} target="_blank" />}
            nativeButton={false}
          >
            {helpLink.label}
            <IconExternalLink className="size-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export { EmptyState };
