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
    <div className="space-y-4 w-full">
      <Collapsible className="w-full space-y-2">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between">
            <span>What&apos;s included?</span>
            <ChevronsUpDown className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2">
          <div className="rounded-md text-sm">
            <div className="space-y-1">
              Collapsibles work independently—multiple can be open at once. The
              shadcn collapsible is for independent sections. Use accordion
              patterns when you want mutually exclusive content areas.
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <p className="text-sm text-muted-foreground">
        Click the buttons above to expand and collapse content sections.
      </p>
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
      <Collapsible className="w-full space-y-2">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between">
            <span>What&apos;s included?</span>
            <ChevronsUpDown className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2">
          <div className="rounded-md text-sm">
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
