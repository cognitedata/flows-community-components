import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";
import { type ComponentRef, createContext, forwardRef, useContext } from "react";

import { cn, getPortalContainer } from "../../../../lib/utils";

type HoverCardDelay = {
  openDelay?: number;
  closeDelay?: number;
};

const HoverCardDelayContext = createContext<HoverCardDelay | null>(null);

function HoverCard({
  openDelay,
  closeDelay,
  ...props
}: PreviewCardPrimitive.Root.Props & HoverCardDelay) {
  return (
    <HoverCardDelayContext.Provider value={{ openDelay, closeDelay }}>
      <PreviewCardPrimitive.Root data-slot="hover-card" {...props} />
    </HoverCardDelayContext.Provider>
  );
}
HoverCard.displayName = "HoverCard";

const HoverCardTrigger = forwardRef<ComponentRef<"a">, PreviewCardPrimitive.Trigger.Props>(
  ({ children, ...props }, ref) => {
    const delayContext = useContext(HoverCardDelayContext);
    const { delay, closeDelay, ...triggerProps } = props;
    return (
      <PreviewCardPrimitive.Trigger
        ref={ref}
        data-slot="hover-card-trigger"
        delay={delay ?? delayContext?.openDelay}
        closeDelay={closeDelay ?? delayContext?.closeDelay}
        {...triggerProps}
      >
        {children}
      </PreviewCardPrimitive.Trigger>
    );
  }
);
HoverCardTrigger.displayName = "HoverCardTrigger";

const HoverCardContent = forwardRef<
  ComponentRef<typeof PreviewCardPrimitive.Popup>,
  PreviewCardPrimitive.Popup.Props &
    Pick<PreviewCardPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">
>(
  (
    { className, side = "bottom", sideOffset = 4, align = "center", alignOffset = 4, ...props },
    ref
  ) => {
    return (
      <PreviewCardPrimitive.Portal data-slot="hover-card-portal" container={getPortalContainer()}>
        <PreviewCardPrimitive.Positioner
          data-slot="hover-card-positioner"
          align={align}
          alignOffset={alignOffset}
          side={side}
          sideOffset={sideOffset}
          className="isolate z-50"
        >
          <PreviewCardPrimitive.Popup
            ref={ref}
            data-slot="hover-card-content"
            className={cn(
              "bg-popover text-popover-foreground data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 origin-(--transform-origin) rounded-md border p-4 shadow-md outline-hidden",
              className
            )}
            {...props}
          />
        </PreviewCardPrimitive.Positioner>
      </PreviewCardPrimitive.Portal>
    );
  }
);
HoverCardContent.displayName = "HoverCardContent";

export { HoverCard, HoverCardTrigger, HoverCardContent };
