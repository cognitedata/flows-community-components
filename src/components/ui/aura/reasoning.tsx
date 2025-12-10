'use client';

import { cn } from '@/common/utils';
import { IconBrain } from '@tabler/icons-react';
import type { ComponentProps } from 'react';

export type ReasoningProps = ComponentProps<'div'>;

export const Reasoning = ({
  className,
  children,
  ...props
}: ReasoningProps) => (
  <div
    className={cn('relative flex w-full flex-col gap-2 not-prose', className)}
    {...props}
  >
    {children}
  </div>
);

export type ReasoningHeaderProps = ComponentProps<'div'> & {
  title?: string;
};

export const ReasoningHeader = ({
  className,
  title = 'Reasoning',
  children,
  ...props
}: ReasoningHeaderProps) => (
  <div
    className={cn(
      'flex items-center gap-2 text-base leading-5 tracking-tighter text-muted-foreground',
      className
    )}
    {...props}
  >
    <IconBrain className="size-4 shrink-0" />
    {children ?? <span>{title}</span>}
  </div>
);

export type ReasoningContentProps = ComponentProps<'div'>;

export const ReasoningContent = ({
  className,
  children,
  ...props
}: ReasoningContentProps) => (
  <div
    className={cn(
      'relative flex flex-col gap-0 pl-3.75',
      // Vertical line using ::before
      'before:absolute before:left-1.75 before:top-4 before:bottom-4 before:w-px before:bg-border',
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export type ReasoningItemProps = ComponentProps<'div'>;

export const ReasoningItem = ({
  className,
  children,
  ...props
}: ReasoningItemProps) => (
  <div
    className={cn(
      'relative',
      // Dot using ::before
      'before:absolute before:-left-2.5 before:top-3.75 before:size-1.25 before:rounded-full before:bg-border',
      className
    )}
    {...props}
  >
    {children}
  </div>
);
