"use client";

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

import { cn } from "@/lib/utils";

function Collapsible({
  className,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return (
    <CollapsiblePrimitive.Root
      data-slot="collapsible"
      className={cn("w-full min-w-0 box-border [&>*]:max-w-full", className)}
      {...props}
    />
  );
}

function CollapsibleTrigger({
  className,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      className={cn(
        "bg-background text-foreground tracking-tighter px-3 py-1.5 has-[>svg]:px-3 has-[>svg]:py-1.5  w-full ",
        className
      )}
      {...props}
    />
  );
}

function CollapsibleContent({
  className,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      className={cn(
        "border-none outline-none text-muted-foreground text-baseleading-20 tracking-tightest px-3 w-full min-w-0 overflow-x-hidden box-border [&>*]:max-w-full [&>*]:box-border",
        className
      )}
      {...props}
    />
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
