'use client';

import { Button } from '@/components/ui/aura/button';
import { cn } from '@/common/utils';
import { IconArrowDown } from '@tabler/icons-react';
import type { ComponentProps } from 'react';
import { useCallback } from 'react';
import { StickToBottom, useStickToBottomContext } from 'use-stick-to-bottom';

export type ConversationProps = ComponentProps<typeof StickToBottom>;

export const Conversation = ({ className, ...props }: ConversationProps) => (
  <StickToBottom
    className={cn('relative flex-1 overflow-y-hidden', className)}
    initial="smooth"
    resize="smooth"
    role="log"
    {...props}
  />
);

export type ConversationContentProps = ComponentProps<
  typeof StickToBottom.Content
>;

export const ConversationContent = ({
  className,
  ...props
}: ConversationContentProps) => (
  <StickToBottom.Content
    className={cn('flex flex-col gap-8 p-3', className)}
    {...props}
  />
);

export type ConversationEmptyStateProps = ComponentProps<'div'> & {
  title?: string;
  description?: string;
};

export const ConversationEmptyState = ({
  className,
  title = 'No messages yet',
  description = '',
  children,
  ...props
}: ConversationEmptyStateProps) => (
  <div
    className={cn('flex flex-col items-center gap-3 size-full p-10', className)}
    {...props}
  >
    <div className="max-w-[594px] w-full flex flex-col items-center justify-center text-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/icon-conversationemptystate.png"
        alt="Conversation icon"
        className="w-[80px] h-[80px] mb-14"
      />
      <div className="space-y-1 mb-14">
        <h3 className="text-xl font-medium tracking-tightest">{title}</h3>
        {description && (
          <p className="text-muted-foreground text-sm">{description}</p>
        )}
      </div>
      {children}
    </div>
  </div>
);

export type ConversationScrollButtonProps = ComponentProps<typeof Button>;

export const ConversationScrollButton = ({
  className,
  ...props
}: ConversationScrollButtonProps) => {
  const { isAtBottom, scrollToBottom } = useStickToBottomContext();

  const handleScrollToBottom = useCallback(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  return (
    !isAtBottom && (
      <Button
        className={cn(
          'absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full',
          className
        )}
        onClick={handleScrollToBottom}
        size="icon"
        type="button"
        variant="outline"
        {...props}
      >
        <IconArrowDown className="size-4" />
      </Button>
    )
  );
};
