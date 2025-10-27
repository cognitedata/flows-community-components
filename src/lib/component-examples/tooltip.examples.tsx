import { Button } from "@/components/ui/cognite/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/cognite/tooltip";
import type { ComponentExamples } from "./types";

function BasicDemo() {
  return (
    <TooltipProvider>
      <div className="space-y-4">
        <div className="flex gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button>Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Helpful tooltip information</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">More info</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>This button does something important</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="destructive">Delete</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>This action cannot be undone</p>
            </TooltipContent>
          </Tooltip>
        </div>
        
        <p className="text-sm text-muted-foreground">
          Hover over buttons to see interactive tooltips with helpful information.
        </p>
      </div>
    </TooltipProvider>
  );
}

export const tooltipExamples: ComponentExamples = {
  basic: {
    title: "Tooltip Demo",
    description: "Interactive contextual help that appears on hover or focus",
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

