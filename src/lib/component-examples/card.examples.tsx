import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/cognite/card";
import { Button } from "@/components/ui/cognite/button";
import { IconApps, IconDotsVertical, IconPin } from "@tabler/icons-react";
import type { ComponentExamples } from "./types";

function BasicDemo() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded bg-muted flex items-center justify-center shrink-0">
            <IconApps className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle>Overall equipment effectiveness</CardTitle>
          </div>
          <button className="p-1 hover:bg-muted rounded transition-colors shrink-0">
            <IconDotsVertical className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        <div>
          <CardDescription className="mt-1">Last 7 months</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="border-2 border-dashed border-blue-500 rounded-lg h-[72px] flex items-center justify-center bg-muted/30">
          {/* Empty content area */}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Button variant="secondary" size="sm">
          View
        </Button>
        <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <IconPin className="w-4 h-4" />
          Pin
        </button>
      </CardFooter>
    </Card>
  );
}

export const cardExamples: ComponentExamples = {
  basic: {
    title: "Basic Card",
    description: "A simple card with header and content",
    component: BasicDemo,
    difficulty: "beginner",
    code: `import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/cognite/card"
import { Button } from "@/components/ui/cognite/button"
import {
  IconApps,
  IconDotsVertical,
  IconPin,
} from "@tabler/icons-react"

export function BasicDemo() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded bg-muted flex items-center justify-center shrink-0">
            <IconApps className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle>Overall equipment effectiveness</CardTitle>
            <CardDescription className="mt-1">Last 7 months</CardDescription>
          </div>
          <button className="p-1 hover:bg-muted rounded transition-colors shrink-0">
            <IconDotsVertical className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="border-2 border-dashed border-blue-500 rounded-lg h-[72px] flex items-center justify-center bg-muted/30">
          {/* Empty content area */}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Button variant="secondary" size="sm">
          View
        </Button>
        <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <IconPin className="w-4 h-4" />
          Pin
        </button>
      </CardFooter>
    </Card>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const cardMeta = {
  name: "Card",
  description:
    "A flexible card component with header, content, and footer sections for organizing and displaying content.",
  llmUsage:
    "When creating content containers, use `<Card>` with `<CardHeader>`, `<CardContent>`, and `<CardFooter>` subcomponents. Use `<CardTitle>` and `<CardDescription>` for header content.",
  importPath: "@/components/ui/cognite/card",
};
