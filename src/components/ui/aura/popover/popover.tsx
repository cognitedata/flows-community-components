import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { type ComponentRef, forwardRef } from "react";

import { cn, getPortalContainer } from "@/lib/utils";

function Popover({ ...props }: PopoverPrimitive.Root.Props) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}
Popover.displayName = "Popover";

const PopoverTrigger = forwardRef<HTMLButtonElement, PopoverPrimitive.Trigger.Props>(
  ({ children, ...props }, ref) => {
    return (
      <PopoverPrimitive.Trigger ref={ref} data-slot="popover-trigger" {...props}>
        {children}
      </PopoverPrimitive.Trigger>
    );
  }
);
PopoverTrigger.displayName = "PopoverTrigger";

const PopoverContent = forwardRef<
  ComponentRef<typeof PopoverPrimitive.Popup>,
  PopoverPrimitive.Popup.Props &
    Pick<PopoverPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">
>(
  (
    { className, align = "center", alignOffset = 0, side = "bottom", sideOffset = 4, ...props },
    ref
  ) => {
    return (
      <PopoverPrimitive.Portal container={getPortalContainer()}>
        <PopoverPrimitive.Positioner
          align={align}
          alignOffset={alignOffset}
          side={side}
          sideOffset={sideOffset}
          className="isolate z-50"
        >
          <PopoverPrimitive.Popup
            ref={ref}
            data-slot="popover-content"
            className={cn(
              "bg-popover text-popover-foreground data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--transform-origin) rounded-lg border border-border p-3 gap-2 shadow-md outline-hidden",
              className
            )}
            {...props}
          />
        </PopoverPrimitive.Positioner>
      </PopoverPrimitive.Portal>
    );
  }
);
PopoverContent.displayName = "PopoverContent";

export { Popover, PopoverTrigger, PopoverContent };
