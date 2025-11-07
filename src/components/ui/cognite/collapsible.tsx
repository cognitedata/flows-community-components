"use client"

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

import { cn } from "@/lib/utils"

function Collapsible({
  className,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return (
    <CollapsiblePrimitive.Root
      data-slot="collapsible"
      className={cn("w-full min-w-0 max-w-full box-border [&>*]:max-w-full", className)}
      style={{ width: "100%", maxWidth: "100%" }}
      {...props}
    />
  )
}

function CollapsibleTrigger({
  className,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      className={cn("bg-background text-foreground w-full max-w-full", className)}
      {...props}
    />
  )
}

function CollapsibleContent({
  className,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      className={cn(
        "border-none outline-none text-muted-foreground text-base px-3 w-full min-w-0 max-w-full overflow-x-hidden box-border [&>*]:w-full [&>*]:max-w-full [&>*]:box-border",
        className
      )}
      style={{ width: "100%", maxWidth: "100%", boxSizing: "border-box" }}
      {...props}
    />
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
