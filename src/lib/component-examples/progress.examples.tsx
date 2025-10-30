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

// Component metadata - single source of truth for API documentation
export const progressMeta = {
  name: "Progress",
  description: "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  llmUsage: "When asked for a progress bar, use `<Progress>` to show task completion or loading states.",
  importPath: "@/components/ui/cognite/progress",
};
