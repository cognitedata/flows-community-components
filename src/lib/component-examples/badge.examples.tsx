import { Badge } from "@/components/ui/cognite/badge";
import type { ComponentExamples } from "./types";

function VariantsDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  );
}

export const badgeExamples: ComponentExamples = {
  variants: {
    title: "Badge Variants",
    description: "Different badge styles for various semantic meanings",
    component: VariantsDemo,
    difficulty: "beginner",
    code: `import { Badge } from "@/components/ui/cognite/badge"

export function VariantsDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const badgeMeta = {
  name: "Badge",
  description: "A small status indicator component with multiple variants for displaying labels, counts, and statuses.",
  llmUsage: "When showing status or labels, use `<Badge variant='default'>Status</Badge>` instead of custom spans. Use variants like 'secondary', 'destructive', or 'outline' for different meanings.",
  importPath: "@/components/ui/cognite/badge",
};
