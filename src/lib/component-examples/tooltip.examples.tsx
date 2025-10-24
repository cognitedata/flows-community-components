import { Button } from "@/components/ui/cognite/button";
import type { ComponentExamples } from "./types";

function BasicDemo() {
  return (
    <div className="space-y-3">
      <Button>Hover for tooltip</Button>
      <div className="border rounded p-2 bg-background text-sm max-w-xs">
        Tooltip content appears here
      </div>
      <p className="text-sm text-muted-foreground">
        Helpful information shown on hover or focus.
      </p>
    </div>
  );
}

export const tooltipExamples: ComponentExamples = {
  basic: {
    title: "Tooltip Demo",
    description:
      "Contextual help on hover (requires interactive implementation)",
    component: BasicDemo,
    difficulty: "beginner",
    code: `import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/cognite/tooltip"
import { Button } from "@/components/ui/cognite/button"

export function BasicDemo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button>Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Helpful tooltip information</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}`,
  },
};

