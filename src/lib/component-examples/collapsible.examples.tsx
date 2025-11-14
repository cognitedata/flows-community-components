import { Button } from "@/components/ui/cognite/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/cognite/collapsible";
import { ChevronsUpDown } from "lucide-react";
import type { ComponentExamples } from "./types";

function BasicDemo() {
  return (
    <div className="space-y-4 w-[490px]">
      <Collapsible defaultOpen className="w-[490px] space-y-2">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="text-base leading-20 tracking-tighter">
            <span>What’s the difference between Collapsible and Accordion?</span>
            <ChevronsUpDown className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2">
          Collapsibles work independently—multiple can be open at once. The shadcn collapsible is for independent sections. Use accordion patterns when you want mutually exclusive content areas.
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

export const collapsibleExamples: ComponentExamples = {
  basic: {
    title: "Collapsible Demo",
    description:
      "Interactive collapsible components for expandable content sections",
    component: BasicDemo,
    difficulty: "intermediate",
    code: `import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/cognite/collapsible"
import { Button } from "@/components/ui/cognite/button"
import { ChevronsUpDown } from "lucide-react"

export function BasicDemo() {
  return (
    <div className="space-y-4 w-full">
      <Collapsible defaultOpen className="w-full space-y-2">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between">
            <span>What’s the difference between Collapsible and Accordion?</span>
            <ChevronsUpDown className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2">
          <div className="rounded-md text-base">
            <div className="space-y-1">
              Collapsibles work independently—multiple can be open at once. The
              shadcn collapsible is for independent sections. Use accordion
              patterns when you want mutually exclusive content areas.
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const collapsibleMeta = {
  name: "Collapsible",
  description: "An interactive component which expands/collapses a panel.",
  llmUsage:
    "When showing expandable content, use `<Collapsible>` with `<CollapsibleTrigger>` and `<CollapsibleContent>`.",
  importPath: "@/components/ui/cognite/collapsible",
};

// Component code literal - must match src/components/ui/cognite/collapsible.tsx
export const collapsibleCode = `"use client";

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
        "border-none outline-none text-muted-foreground text-base leading-20 tracking-tightest px-3 w-full min-w-0 overflow-x-hidden box-border [&>*]:max-w-full [&>*]:box-border",
        className
      )}
      {...props}
    />
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };`;
