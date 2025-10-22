import { Skeleton } from "@/components/ui/cognite/skeleton";
import type { ComponentExamples } from "./types";

function BasicDemo() {
  return (
    <div className="space-y-4 max-w-md">
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <div className="flex space-x-4">
        <Skeleton className="rounded-full h-10 w-10" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    </div>
  );
}

export const skeletonExamples: ComponentExamples = {
  basic: {
    title: "Skeleton Loading States",
    description: "Loading placeholders for content",
    component: BasicDemo,
    difficulty: "beginner",
    code: `import { Skeleton } from "@/components/ui/cognite/skeleton"

export function BasicDemo() {
  return (
    <div className="space-y-4 max-w-md">
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <div className="flex space-x-4">
        <Skeleton className="rounded-full h-10 w-10" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    </div>
  )
}`,
  },
};

