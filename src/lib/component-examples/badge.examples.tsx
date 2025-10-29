import { Badge } from "@/components/ui/draft/badge";
import type { ComponentExamples } from "./types";
import {
  IconAlertHexagon,
  IconAlertTriangle,
  IconArchive,
  IconCircleCheck,
  IconHexagon,
  IconPointFilled,
  IconInnerShadowTopLeft,
  IconX,
} from "@tabler/icons-react";

function VariantsDemo() {
  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-4">
        <Badge variant="fjord">Observations</Badge>
        <Badge variant="aurora">Troubleshooting</Badge>
        <Badge variant="mountain">
          <IconHexagon />
          Plans
        </Badge>
        <Badge variant="dusk">RCA</Badge>
        <Badge variant="secondary">
          <IconHexagon className="rotate-90" />
          Asset
        </Badge>
      </div>
      <div className="flex flex-wrap gap-3">
        <Badge variant="error" background={false}>
          <IconAlertHexagon />
          Error
        </Badge>
        <Badge variant="error" outline>
          <IconAlertHexagon />
          Error
        </Badge>
        <Badge variant="warning" background={false}>
          <IconAlertTriangle />
          Warning
        </Badge>
        <Badge variant="warning" outline>
          <IconAlertTriangle />
          Warning
        </Badge>
        <Badge variant="success" background={false}>
          <IconCircleCheck />
          Success
        </Badge>
        <Badge variant="inProgress" background={false}>
          <IconInnerShadowTopLeft />
          In progress
        </Badge>
        <Badge variant="archived" background={false}>
          <IconArchive />
          Archived
        </Badge>
      </div>
    </div>
  );
}
function MainComponentDemo() {
  return (
    <div className="flex flex-col gap-3 items-center justify-center">
      <Badge variant="default">
        <IconHexagon className="rotate-90" />
        Badge
      </Badge>
      <Badge variant={"closable"}>
        <IconHexagon className="rotate-90" />
        Badge
        <IconX />
      </Badge>
      <Badge variant="error" background={false}>
        <IconHexagon className="rotate-90" />
        Badge
      </Badge>
      <Badge variant="error" dot>
        9
      </Badge>
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
   <div>
      <div className="flex flex-wrap gap-3 mb-4">
        <Badge variant="fjord">Observations</Badge>
        <Badge variant="aurora">Troubleshooting</Badge>
        <Badge variant="mountain">
          <IconHexagon />
          Plans
        </Badge>
        <Badge variant="dusk">RCA</Badge>
        <Badge variant="secondary">
          <IconHexagon className="rotate-90" />
          Asset
        </Badge>
      </div>
      <div className="flex flex-wrap gap-3">
        <Badge variant="error" background={false}>
          <IconAlertHexagon />
          Error
        </Badge>
        <Badge variant="error" outline>
          <IconAlertHexagon />
          Error
        </Badge>
        <Badge variant="warning" background={false}>
          <IconAlertTriangle />
          Warning
        </Badge>
        <Badge variant="warning" outline>
          <IconAlertTriangle />
          Warning
        </Badge>
        <Badge variant="success" background={false}>
          <IconCircleCheck />
          Success
        </Badge>
        <Badge variant="inProgress" background={false}>
          <IconInnerShadowTopLeft />
          In progress
        </Badge>
        <Badge variant="archived" background={false}>
          <IconArchive />
          Archived
        </Badge>
      </div>
    </div>
  )
}`,
  },

  mainComponent: {
    title: "Main component",
    description: "",
    component: MainComponentDemo,
    difficulty: "beginner",
    code: `import { Button } from "@/components/ui/cognite/button"
import { IconHexagon } from "@tabler/icons-react";

export function MainComponentDemo() {
  return (
    <div className="flex flex-col gap-3 items-center justify-center">
      <Badge variant="default">
        <IconHexagon className="rotate-90" />
        Badge
      </Badge>
      <Badge variant={"closable"}>
        <IconHexagon className="rotate-90" />
        Badge
        <IconX />
      </Badge>
      <Badge variant="error" background={false}>
        <IconHexagon className="rotate-90" />
        Badge
      </Badge>
      <Badge variant="error" dot>
        9
      </Badge>
    </div>
  )
}`,
  },
};
