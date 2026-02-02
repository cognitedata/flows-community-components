import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { type ComponentProps, forwardRef } from "react";

import { cn, getPortalContainer } from "@/lib/utils";

const TooltipProvider = forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Provider>,
  ComponentProps<typeof TooltipPrimitive.Provider>
>(({ delayDuration = 0, ...props }, ref) => (
  <TooltipPrimitive.Provider
    ref={ref}
    data-slot="tooltip-provider"
    data-testid="tooltip-provider"
    delayDuration={delayDuration}
    {...props}
  />
));
TooltipProvider.displayName = "TooltipProvider";

const Tooltip = forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Root>,
  ComponentProps<typeof TooltipPrimitive.Root>
>(({ ...props }, ref) => (
  <TooltipProvider>
    <TooltipPrimitive.Root ref={ref} data-slot="tooltip" data-testid="tooltip" {...props} />
  </TooltipProvider>
));
Tooltip.displayName = "Tooltip";

const TooltipTrigger = forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Trigger>,
  ComponentProps<typeof TooltipPrimitive.Trigger>
>(({ ...props }, ref) => (
  <TooltipPrimitive.Trigger
    ref={ref}
    data-slot="tooltip-trigger"
    data-testid="tooltip-trigger"
    {...props}
  />
));
TooltipTrigger.displayName = "TooltipTrigger";

const TooltipContent = forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Content>,
  ComponentProps<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, side = "top", children, ...props }, ref) => (
  <TooltipPrimitive.Portal container={getPortalContainer()}>
    <TooltipPrimitive.Content
      ref={ref}
      data-slot="tooltip-content"
      data-testid="tooltip-content"
      sideOffset={sideOffset}
      side={side}
      className={cn(
        "z-50 w-fit max-w-80 origin-(--radix-tooltip-content-transform-origin) rounded-md bg-mountain-900 p-2 text-sm font-medium leading-4.5 text-mountain-50",
        "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    >
      {children}
      <TooltipPrimitive.Arrow className="z-50 fill-mountain-900" />
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = "TooltipContent";

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
