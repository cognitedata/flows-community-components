import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { type ComponentProps, forwardRef } from "react";

import { cn } from "@/lib/utils";

const Collapsible = forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Root>,
  ComponentProps<typeof CollapsiblePrimitive.Root>
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
  React.ElementRef<typeof CollapsiblePrimitive.CollapsibleTrigger>,
  ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>
>(({ className, ...props }, ref) => {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      ref={ref}
      data-slot="collapsible-trigger"
      className={cn("group/collapsible-trigger text-base", className)}
      {...props}
    />
  );
});
CollapsibleTrigger.displayName = "CollapsibleTrigger";

const CollapsibleContent = forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.CollapsibleContent>,
  ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>
>(({ className, ...props }, ref) => {
  return (
    <CollapsiblePrimitive.CollapsibleContent
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
