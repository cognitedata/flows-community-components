import { Button } from "@/components/ui/cognite/button";
import type { ComponentExamples } from "./types";

function BasicDemo() {
  return (
    <div className="space-y-3">
      <Button>Open Sheet</Button>
      <Button variant="outline">Settings Sheet</Button>
      <p className="text-sm text-muted-foreground">
        Slide-out panels for navigation, forms, and content.
      </p>
    </div>
  );
}

export const sheetExamples: ComponentExamples = {
  basic: {
    title: "Sheet Demo",
    description:
      "Slide-out side panel (requires interactive implementation)",
    component: BasicDemo,
    difficulty: "intermediate",
    code: `import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/cognite/sheet"
import { Button } from "@/components/ui/cognite/button"

export function BasicDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet Title</SheetTitle>
          <SheetDescription>
            This is a side panel that slides in from the edge.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <p className="text-sm">Sheet content goes here.</p>
        </div>
      </SheetContent>
    </Sheet>
  )
}`,
  },
};

