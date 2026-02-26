import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip';
import { type ComponentRef, forwardRef } from 'react';

import { cn, getPortalContainer } from '../../../../lib/utils';
function TooltipProvider({
  delayDuration,
  timeout = 0,
  ...props
}: Omit<TooltipPrimitive.Provider.Props, 'delay'> & {
  delayDuration?: number;
}) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delay={delayDuration}
      timeout={timeout}
      {...props}
    />
  );
}

function Tooltip({
  disableHoverableContent,
  ...props
}: TooltipPrimitive.Root.Props & {
  disableHoverableContent?: boolean;
}) {
  return (
    <TooltipPrimitive.Root
      data-slot="tooltip"
      disableHoverablePopup={disableHoverableContent}
      {...props}
    />
  );
}

const TooltipTrigger = forwardRef<
  HTMLButtonElement,
  TooltipPrimitive.Trigger.Props
>(({ delay = 700, ...props }, ref) => {
  return (
    <TooltipPrimitive.Trigger
      ref={ref}
      data-slot="tooltip-trigger"
      delay={delay}
      {...props}
    />
  );
});
TooltipTrigger.displayName = 'TooltipTrigger';

const TooltipContent = forwardRef<
  ComponentRef<typeof TooltipPrimitive.Popup>,
  TooltipPrimitive.Popup.Props &
    Pick<
      TooltipPrimitive.Positioner.Props,
      'align' | 'alignOffset' | 'side' | 'sideOffset'
    >
>(
  (
    {
      className,
      side = 'top',
      sideOffset = 9,
      align = 'center',
      alignOffset = 0,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <TooltipPrimitive.Portal container={getPortalContainer()}>
        <TooltipPrimitive.Positioner
          align={align}
          alignOffset={alignOffset}
          side={side}
          sideOffset={sideOffset}
          className="isolate z-50 min-w-max"
        >
          <TooltipPrimitive.Popup
            ref={ref}
            data-slot="tooltip-content"
            className={cn(
              'data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=inline-end]:slide-in-from-left-2 bg-foreground text-background z-50 w-fit max-w-xs origin-(--transform-origin) rounded-md p-2 text-sm font-medium leading-tight',
              className
            )}
            {...props}
          >
            {children}
            <TooltipPrimitive.Arrow className="size-2.5 -translate-y-1/2 rotate-45 rounded-xs data-[side=inline-end]:top-1/2! data-[side=inline-end]:-left-1 data-[side=inline-end]:-translate-y-1/2 data-[side=inline-start]:top-1/2! data-[side=inline-start]:-right-1 data-[side=inline-start]:-translate-y-1/2 bg-foreground fill-foreground z-50 data-[side=bottom]:top-1 data-[side=bottom]:-mt-0.5 data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-2.5 data-[side=top]:-mt-0.5" />
          </TooltipPrimitive.Popup>
        </TooltipPrimitive.Positioner>
      </TooltipPrimitive.Portal>
    );
  }
);
TooltipContent.displayName = 'TooltipContent';

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
