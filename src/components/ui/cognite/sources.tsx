'use client';

import {
  InlineCitation,
  InlineCitationLink,
  type InlineCitationLinkProps,
} from '@/components/ui/cognite/inline-citation';
import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';

export type SourcesProps = ComponentProps<'div'>;

export const Sources = ({ className, ...props }: SourcesProps) => (
  <div className={cn('flex flex-wrap gap-2', className)} {...props} />
);

export type SourceProps = InlineCitationLinkProps & {
  title?: string;
  url?: string;
};

export const Source = ({
  href,
  url,
  title,
  variant = 'mountain',
  target = '_blank',
  icon,
  className,
  children,
  ...props
}: SourceProps) => {
  const sourceHref = href || url;

  if (!sourceHref) {
    return null;
  }

  return (
    <InlineCitation>
      <InlineCitationLink
        href={sourceHref}
        target={target}
        variant={variant}
        icon={icon}
        className={className}
        {...props}
      >
        {children ?? title}
      </InlineCitationLink>
    </InlineCitation>
  );
};
