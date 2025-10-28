import { Badge } from "@/components/ui/cognite/badge";
import type { ComponentExamples } from "./types";
import { IconAlertHexagon, IconAlertTriangle, IconArchive, IconCircleCheck, IconHexagon, IconInnerShadowTopLeft } from "@tabler/icons-react";

function VariantsDemo() {
  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-3">
        <Badge variant="fjord">Observations</Badge>
        <Badge variant="nordic">Plans</Badge>
        <Badge variant="aurora">Troubleshooting</Badge>
        <Badge variant="sky">RCA</Badge>
        <Badge variant="secondary">
          <IconHexagon />
          Asset
        </Badge>
      </div>
      <div className="flex flex-wrap gap-3">
        {/* <Badge variant="default">Default</Badge> */}
        <Badge variant="error">
          <IconAlertHexagon />
          Error
        </Badge>
        <Badge variant="warning">
          <IconAlertTriangle />
          Warning
        </Badge>
        <Badge variant="success">
          <IconCircleCheck />
          Success
        </Badge>
        <Badge variant="inProgress">
          <IconInnerShadowTopLeft />
          In progress
        </Badge>
        <Badge variant="archived">
          <IconArchive />
          Archived
        </Badge>
      </div>
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
      <Badge variant="secondary">Outline</Badge>
    </div>
  )
}`,
  },
};
