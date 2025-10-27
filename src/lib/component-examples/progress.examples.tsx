import { Progress } from "@/components/ui/cognite/progress";
import type { ComponentExamples } from "./types";

function BasicDemo() {
  return (
    <div className="space-y-4 max-w-md">
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>25% Complete</span>
          <span className="text-muted-foreground">25%</span>
        </div>
        <Progress value={25} />
      </div>
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>50% Complete</span>
          <span className="text-muted-foreground">50%</span>
        </div>
        <Progress value={50} />
      </div>
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>75% Complete</span>
          <span className="text-muted-foreground">75%</span>
        </div>
        <Progress value={75} />
      </div>
    </div>
  );
}

export const progressExamples: ComponentExamples = {
  basic: {
    title: "Progress Examples",
    description: "Progress bars showing different completion states",
    component: BasicDemo,
    difficulty: "beginner",
    code: `import { Progress } from "@/components/ui/cognite/progress"

export function BasicDemo() {
  return (
    <div className="space-y-4 max-w-md">
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>25% Complete</span>
          <span className="text-muted-foreground">25%</span>
        </div>
        <Progress value={25} />
      </div>
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>50% Complete</span>
          <span className="text-muted-foreground">50%</span>
        </div>
        <Progress value={50} />
      </div>
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>75% Complete</span>
          <span className="text-muted-foreground">75%</span>
        </div>
        <Progress value={75} />
      </div>
    </div>
  )
}`,
  },
};

