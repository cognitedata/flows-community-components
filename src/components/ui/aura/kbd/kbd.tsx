import { type ComponentProps, type ComponentRef, forwardRef } from "react";

import { cn } from "../../../../lib/utils";

const Kbd = forwardRef<ComponentRef<"kbd">, ComponentProps<"kbd">>(
  ({ className, ...props }, ref) => {
    return (
      <kbd
        ref={ref}
        data-slot="kbd"
        className={cn(
          "bg-muted text-muted-foreground pointer-events-none inline-flex h-4 w-fit min-w-5 items-center justify-center gap-1 rounded-sm font-sans text-xs font-medium select-none tracking-tightest p-0.5",
          "[&_svg:not([class*='size-'])]:size-3",
          "in-data-[slot=tooltip-content]:bg-background/20 in-data-[slot=tooltip-content]:text-background dark:in-data-[slot=tooltip-content]:bg-background/10",
          className
        )}
        {...props}
      />
    );
  }
);
Kbd.displayName = "Kbd";

const KbdGroup = forwardRef<ComponentRef<"span">, ComponentProps<"span">>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        data-slot="kbd-group"
        className={cn("inline-flex items-center gap-1", className)}
        {...props}
      />
    );
  }
);
KbdGroup.displayName = "KbdGroup";

export { Kbd, KbdGroup };
