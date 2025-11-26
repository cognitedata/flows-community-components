'use client';

import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { cn } from '@/lib/utils';

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  );
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
  className,
  sideOffset = 0,
  side = 'top',
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        side={side}
        className={cn(
          'bg-popover text-popover-foreground border border-border animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-2 py-2 text-sm leading-4.5 text-balance',
          className
        )}
        {...props}
      >
        {children}
        {/* Border arrow */}
        <TooltipPrimitive.Arrow
          className={cn(
            'bg-border fill-border z-50 size-2.5 rounded-sm',
            side === 'bottom' && 'rotate-45 translate-y-[calc(-50%_-_1px)]',
            side === 'top' && 'rotate-45 translate-y-[calc(-50%_-_1px)]',
            side === 'left' && 'rotate-45 translate-y-[calc(-50%_-_1px)]',
            side === 'right' && 'rotate-45 translate-y-[calc(-50%_-_1px)]'
          )}
        />
        {/* Background arrow */}
        <TooltipPrimitive.Arrow
          className={cn(
            'bg-popover fill-popover z-50 size-2.5 rounded-sm',
            side === 'bottom' && 'rotate-45 translate-y-[calc(-50%_-_2px)]',
            side === 'top' && 'rotate-45 translate-y-[calc(-50%_-_2px)]',
            side === 'left' && 'rotate-45 translate-y-[calc(-50%_-_2px)]',
            side === 'right' && 'rotate-45 translate-y-[calc(-50%_-_2px)]'
          )}
        />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
