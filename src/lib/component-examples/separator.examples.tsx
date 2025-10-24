import { Separator } from "@/components/ui/cognite/separator";
import { Button } from "@/components/ui/cognite/button";
import type { ComponentExamples } from "./types";

function BasicDemo() {
  return (
    <div className="space-y-4 max-w-md">
      <div>
        <p className="text-sm">Content above separator</p>
        <Separator className="my-4" />
        <p className="text-sm">Content below separator</p>
      </div>
      <div className="flex items-center space-x-4">
        <Button size="sm">Left</Button>
        <Separator orientation="vertical" className="h-4" />
        <Button size="sm">Right</Button>
      </div>
    </div>
  );
}

export const separatorExamples: ComponentExamples = {
  basic: {
    title: "Separator Examples",
    description: "Horizontal and vertical separators for dividing content",
    component: BasicDemo,
    difficulty: "beginner",
    code: `import { Separator } from "@/components/ui/cognite/separator"
import { Button } from "@/components/ui/cognite/button"

export function BasicDemo() {
  return (
    <div className="space-y-4 max-w-md">
      <div>
        <p className="text-sm">Content above separator</p>
        <Separator className="my-4" />
        <p className="text-sm">Content below separator</p>
      </div>
      <div className="flex items-center space-x-4">
        <Button size="sm">Left</Button>
        <Separator orientation="vertical" className="h-4" />
        <Button size="sm">Right</Button>
      </div>
    </div>
  )
}`,
  },
};

