import { type ComponentProps, forwardRef } from "react";

import { getRenderPropFromAsChild } from "@/lib/render-as-child";
import { cn, getPortalContainer } from "@/lib/utils";
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";

function TooltipProvider({
  delayDuration = 0,
  ...props
}: TooltipPrimitive.Provider.Props & { delayDuration?: number }) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      data-testid="tooltip-provider"
      delay={delayDuration}
      {...props}
    />
  );
}

function Tooltip({
  delayDuration,
  ...props
}: TooltipPrimitive.Root.Props & { delayDuration?: number }) {
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <TooltipPrimitive.Root data-slot="tooltip" data-testid="tooltip" {...props} />
    </TooltipProvider>
  );
}

const TooltipTrigger = forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Trigger>,
  TooltipPrimitive.Trigger.Props & { asChild?: boolean }
>(({ asChild = false, children, ...props }, ref) => {
  const render = getRenderPropFromAsChild(children, asChild);
  return (
    <TooltipPrimitive.Trigger
      ref={ref}
      data-slot="tooltip-trigger"
      data-testid="tooltip-trigger"
      render={render}
      {...props}
    >
      {asChild ? null : children}
    </TooltipPrimitive.Trigger>
  );
});
TooltipTrigger.displayName = "TooltipTrigger";

const TooltipContent = forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Popup>,
  TooltipPrimitive.Popup.Props &
    Pick<TooltipPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">
>(
  (
    {
      className,
      sideOffset = 0,
      side = "top",
      align = "center",
      alignOffset = 0,
      children,
      ...props
    },
    ref
  ) => (
    <TooltipPrimitive.Portal container={getPortalContainer()}>
      <TooltipPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50"
      >
        <TooltipPrimitive.Popup
          ref={ref}
          data-slot="tooltip-content"
          data-testid="tooltip-content"
          className={cn(
            "bg-popover text-popover-foreground border border-border data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--transform-origin) rounded-md px-2 py-2 text-sm font-medium leading-4.5 text-balance shadow-sm outline-none",
            className
          )}
          {...props}
        >
          {children}
          <TooltipPrimitive.Arrow className="bg-popover fill-popover border border-border size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] data-[side=top]:-bottom-2.5 data-[side=bottom]:top-1 data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2" />
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  )
);
TooltipContent.displayName = "TooltipContent";

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
