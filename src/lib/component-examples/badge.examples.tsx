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

