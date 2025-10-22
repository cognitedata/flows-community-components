import { Button } from "@/components/ui/cognite/button";
import type { ComponentExamples } from "./types";

function BasicDemo() {
  return (
    <div className="space-y-3">
      <Button>Show Success Toast</Button>
      <Button variant="destructive">Show Error Toast</Button>
      <div className="border rounded p-3 bg-background max-w-xs">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm">Success notification!</span>
        </div>
      </div>
    </div>
  );
}

export const sonnerExamples: ComponentExamples = {
  basic: {
    title: "Toast/Sonner Demo",
    description:
      "Toast notifications (requires interactive implementation with toast() function)",
    component: BasicDemo,
    difficulty: "intermediate",
    code: `import { Button } from "@/components/ui/cognite/button"
import { toast } from "sonner"

export function BasicDemo() {
  return (
    <div className="space-y-3">
      <Button
        onClick={() =>
          toast.success("Success!", {
            description: "Your action was completed successfully.",
          })
        }
      >
        Show Success Toast
      </Button>
      <Button
        variant="destructive"
        onClick={() =>
          toast.error("Error!", {
            description: "Something went wrong.",
          })
        }
      >
        Show Error Toast
      </Button>
    </div>
  )
}`,
  },
};

