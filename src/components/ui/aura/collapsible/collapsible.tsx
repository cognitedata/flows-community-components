import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import { type ComponentRef, forwardRef } from "react";

import { cn } from "../../../../lib/utils";

const Collapsible = forwardRef<
  ComponentRef<typeof CollapsiblePrimitive.Root>,
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
  ComponentRef<typeof CollapsiblePrimitive.Trigger>,
  CollapsiblePrimitive.Trigger.Props
>(({ className, children, ...props }, ref) => {
  return (
    <CollapsiblePrimitive.Trigger
      ref={ref}
      data-slot="collapsible-trigger"
      className={cn("group/collapsible-trigger text-base", className)}
      {...props}
    >
      {children}
    </CollapsiblePrimitive.Trigger>
  );
});
CollapsibleTrigger.displayName = "CollapsibleTrigger";

const CollapsibleContent = forwardRef<
  ComponentRef<typeof CollapsiblePrimitive.Panel>,
  CollapsiblePrimitive.Panel.Props
>(({ className, keepMounted = true, ...props }, ref) => {
  return (
    <CollapsiblePrimitive.Panel
      ref={ref}
      data-slot="collapsible-content"
      className={cn(
        "border-none outline-none text-muted-foreground text-sm leading-4.5 tracking-tight w-full min-w-0 overflow-x-hidden box-border *:max-w-full *:box-border",
        className
      )}
      keepMounted={keepMounted}
      {...props}
    />
  );
});
CollapsibleContent.displayName = "CollapsibleContent";

export { Collapsible, CollapsibleContent, CollapsibleTrigger };
