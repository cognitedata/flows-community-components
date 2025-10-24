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
              <h4 className="font-medium">Popover Content</h4>
              <p className="text-sm text-muted-foreground">
                This is the content inside a popover. It appears when you click the trigger.
              </p>
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Settings</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="space-y-2">
              <h4 className="font-medium">Settings</h4>
              <p className="text-sm text-muted-foreground">
                Configure your preferences here.
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      <p className="text-sm text-muted-foreground">
        Click buttons to open interactive popovers with floating content.
      </p>
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

