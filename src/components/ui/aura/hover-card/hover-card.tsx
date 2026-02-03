import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";
import { type ComponentRef, forwardRef } from "react";

import { getRenderPropFromAsChild } from "@/lib/render-as-child";
import { cn, getPortalContainer } from "@/lib/utils";

function HoverCard({ ...props }: PreviewCardPrimitive.Root.Props) {
  return <PreviewCardPrimitive.Root data-slot="hover-card" {...props} />;
}
HoverCard.displayName = "HoverCard";

const HoverCardTrigger = forwardRef<
  ComponentRef<typeof PreviewCardPrimitive.Trigger>,
  PreviewCardPrimitive.Trigger.Props & { asChild?: boolean }
>(({ asChild = false, children, ...props }, ref) => {
  const render = getRenderPropFromAsChild(children, asChild);
  return (
    <PreviewCardPrimitive.Trigger
      ref={ref}
      data-slot="hover-card-trigger"
      render={render}
      {...props}
    >
      {asChild ? null : children}
    </PreviewCardPrimitive.Trigger>
  );
});
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
