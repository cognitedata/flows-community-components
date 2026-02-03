import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import { type ComponentProps, forwardRef } from "react";

import { getRenderPropFromAsChild } from "@/lib/render-as-child";
import { cn } from "@/lib/utils";

const Collapsible = forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Root>,
  CollapsiblePrimitive.Root.Props
>(({ className, ...props }, ref) => {
  return (
    <CollapsiblePrimitive.Root
      ref={ref}
      data-slot="collapsible"
      className={cn("w-full min-w-0 box-border *:max-w-full", className)}
      {...props}
    />
  );
});
Collapsible.displayName = "Collapsible";

const CollapsibleTrigger = forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Trigger>,
  CollapsiblePrimitive.Trigger.Props & { asChild?: boolean }
>(({ className, asChild = false, children, ...props }, ref) => {
  const render = getRenderPropFromAsChild(children, asChild);
  return (
    <CollapsiblePrimitive.Trigger
      ref={ref}
      data-slot="collapsible-trigger"
      className={cn("group/collapsible-trigger text-base", className)}
      render={render}
      {...props}
    >
      {asChild ? null : children}
    </CollapsiblePrimitive.Trigger>
  );
});
CollapsibleTrigger.displayName = "CollapsibleTrigger";

const CollapsibleContent = forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Panel>,
  CollapsiblePrimitive.Panel.Props
>(({ className, ...props }, ref) => {
  return (
    <CollapsiblePrimitive.Panel
      ref={ref}
      data-slot="collapsible-content"
      className={cn(
        "border-none outline-none text-muted-foreground text-sm leading-4.5 tracking-tight w-full min-w-0 overflow-x-hidden box-border *:max-w-full *:box-border",
        className
      )}
      {...props}
    />
  );
});
CollapsibleContent.displayName = "CollapsibleContent";

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
