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
    <div className="space-y-4">
      <Collapsible className="w-full space-y-2">
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            <span>Can I use this in my project?</span>
            <ChevronsUpDown className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2">
          <div className="rounded-md border px-4 py-3 text-sm">
            Yes. Free to use for personal and commercial projects. No attribution required.
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible className="w-full space-y-2">
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            <span>What's included?</span>
            <ChevronsUpDown className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2">
          <div className="rounded-md border px-4 py-3 text-sm">
            <ul className="list-disc list-inside space-y-1">
              <li>Accessible components</li>
              <li>Dark mode support</li>
              <li>TypeScript support</li>
              <li>Customizable styling</li>
            </ul>
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
    description: "Interactive collapsible components for expandable content sections",
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
    <div className="space-y-4">
      <Collapsible className="w-full space-y-2">
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            <span>Can I use this in my project?</span>
            <ChevronsUpDown className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2">
          <div className="rounded-md border px-4 py-3 text-sm">
            Yes. Free to use for personal and commercial projects.
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}`,
  },
};

