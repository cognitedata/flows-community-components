import { Button } from "@/components/ui/cognite/button";
import type { ComponentExamples } from "./types";

function BasicDemo() {
  return (
    <div className="space-y-3">
      <Button>Open Popover</Button>
      <div className="border rounded p-3 bg-background max-w-xs">
        <h4 className="font-medium mb-2">Popover Content</h4>
        <p className="text-sm text-muted-foreground">
          This is the content inside a popover.
        </p>
      </div>
    </div>
  );
}

export const popoverExamples: ComponentExamples = {
  basic: {
    title: "Popover Demo",
    description:
      "Floating content container (requires interactive implementation)",
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
    <Popover>
      <PopoverTrigger asChild>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h4 className="font-medium">Popover Content</h4>
          <p className="text-sm text-muted-foreground">
            This is the content inside a popover.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  )
}`,
  },
};

