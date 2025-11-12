import { Separator } from "@/components/ui/cognite/separator";
import type { ComponentExamples } from "./types";
import { Badge } from "@/components/ui/cognite/badge";
import { IconBook, IconComponents, IconCode } from "@tabler/icons-react";
function BasicDemo() {
  return (
    <div className="space-y-4 max-w-md">
      <div>
        <p className="text-sm text-muted-foreground">
          An open-source UI component library.
        </p>
        <Separator className="my-4" />
        <Badge variant="mountain" className="mr-2">
          <IconBook className="size-4" /> Docs
        </Badge>
        <Badge variant="mountain" className="mr-2">
          <IconComponents className="size-4" /> Components
        </Badge>
        <Badge variant="mountain">
          <IconCode className="size-4" /> Code
        </Badge>
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
import { Badge } from "@/components/ui/cognite/badge"
import { IconBook, IconComponents, IconCode } from "@tabler/icons-react"

export function BasicDemo() {
  return (
     <div className="space-y-4 max-w-md">
      <div>
        <p className="text-sm text-muted-foreground">
          An open-source UI component library.
        </p>
        <Separator className="my-4" />
        <Badge variant="mountain" className="mr-2">
          <IconBook className="size-4" /> Docs
        </Badge>
        <Badge variant="mountain" className="mr-2">
          <IconComponents className="size-4" /> Components
        </Badge>
        <Badge variant="mountain">
          <IconCode className="size-4" /> Code
        </Badge>
      </div>
    </div>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const separatorMeta = {
  name: "Separator",
  description: "Visually or semantically separates content.",
  llmUsage:
    "When asked for a separator, use `<Separator>` to divide content sections or create visual breaks.",
  importPath: "@/components/ui/cognite/separator",
};
