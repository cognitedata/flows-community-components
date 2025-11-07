import { Shimmer } from "@/components/ai-elements/shimmer";
import type { ComponentExamples } from "@/lib/component-examples/types";

function BasicShimmerDemo() {
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">Loading shimmer effect:</p>
      <div className="border rounded-lg p-4 h-12">
        <Shimmer>Processing...</Shimmer>
      </div>
    </div>
  );
}

export const shimmerExamples: ComponentExamples = {
  basic: {
    title: "Shimmer Loading Effect",
    description: "Animated shimmer effect for loading states",
    component: BasicShimmerDemo,
    difficulty: "beginner",
    code: `import { Shimmer } from "@/components/ai-elements/cognite/shimmer"

export function BasicShimmerDemo() {
  return (
    <Shimmer>Processing...</Shimmer>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const shimmerMeta = {
  name: "Shimmer",
  description:
    "An animated text shimmer component for creating eye-catching loading states and progressive reveal effects.",
  importPath: "@/components/ai-elements/cognite/shimmer",
};
