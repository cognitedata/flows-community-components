

import { Button } from "@/components/ui/cognite/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/cognite/popover";
import type { ComponentExamples } from "./types";

function BasicDemo() {
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button>Open Popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="space-y-2">
              <h4 className="font-medium text-popover-foreground text-base leading-20 tracking-tighter mb-2">Get started with Atlas</h4>
              <p className="text-sm font-normal text-muted-foreground leading-18 tracking-tight">
                Cognite Atlas AI helps you create and manage industrial AI
                agents that solve your specific business needs
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

export const popoverExamples: ComponentExamples = {
  basic: {
    title: "Popover Demo",
    description: "Interactive floating content containers that appear on click",
    component: BasicDemo,
    difficulty: "intermediate",
    code: `import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/cognite/popover"
import { Button } from "@/components/ui/cognite/button"

export function BasicDemo() {
  return (
   <div className="space-y-4">
      <div className="flex gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button>Open Popover</Button>
          </PopoverTrigger>
          <PopoverContent >
            <div className="space-y-2">
              <h4 className="font-medium text-popover-foreground text-base tracking-tightest mb-1 ">Get started with Atlas</h4>
              <p className="text-sm font-normal text-muted-foreground tracking-tight">
                Cognite Atlas AI helps you create and manage industrial AI
                agents that solve your specific business needs
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const popoverMeta = {
  name: "Popover",
  description: "Displays rich content in a portal, triggered by a button.",
  llmUsage:
    "When asked for a popover, use `<Popover>` for contextual information and secondary actions.",
  importPath: "@/components/ui/cognite/popover",
};

