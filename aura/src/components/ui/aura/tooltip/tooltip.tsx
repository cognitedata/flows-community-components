
import type { ComponentProps } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { cn, getPortalContainer } from '@/lib/utils';

function TooltipProvider({
  delayDuration = 0,
  ...props
}: ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      data-testid="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

function Tooltip({
  ...props
}: ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" data-testid="tooltip" {...props} />
    </TooltipProvider>
  );
}

function TooltipTrigger({
  ...props
}: ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" data-testid="tooltip-trigger" {...props} />;
}

function TooltipContent({
  className,
  sideOffset = 0,
  side = 'top',
  children,
  ...props
}: ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal container={getPortalContainer()}>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        data-testid="tooltip-content"
        sideOffset={sideOffset}
        side={side}
        className={cn(
          'bg-popover text-popover-foreground border border-border animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-2 py-2 text-sm font-medium leading-4.5 text-balance shadow-sm',
          className
        )}
        {...props}
      >
        {children}
        {/* Border arrow */}
        <TooltipPrimitive.Arrow
          className={cn(
            'bg-border fill-border z-50 size-2.5',
            side === 'bottom' && 'rotate-45 translate-y-[calc(-50%_-_1px)]',
            side === 'top' &&
              'rotate-45 translate-y-[calc(-50%_-_1px)] shadow-sm',
            side === 'left' && 'rotate-45 translate-y-[calc(-50%_-_1px)]',
            side === 'right' && 'rotate-45 translate-y-[calc(-50%_-_1px)]'
          )}
        />
        {/* Background arrow */}
        <TooltipPrimitive.Arrow
          className={cn(
            'bg-popover fill-popover z-50 size-2.5',
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
