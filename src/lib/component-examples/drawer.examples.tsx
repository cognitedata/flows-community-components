import { Button } from "@/components/ui/cognite/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/cognite/drawer";
import type { ComponentExamples } from "./types";

export function BasicDemo() {
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">Open Drawer</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="w-[304px]">
              <DrawerTitle>Drawer Title</DrawerTitle>
              <DrawerDescription>Drawer Description</DrawerDescription>
            </DrawerHeader>
            <div className="h-[72px] w-[304px] grid gap-4 py-4 border-dashed border-1 border-ring"></div>
            <DrawerFooter className="w-[304px]">
              <Button>Continue</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}

export const drawerExamples: ComponentExamples = {
  basic: {
    title: "Drawer Demo",
    description:
      "Interactive drawer panels that slide up from the bottom with forms and content",
    component: BasicDemo,
    difficulty: "intermediate",
    code: `import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/cognite/drawer"
import { Button } from "@/components/ui/cognite/button" 

export function BasicDemo() {
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">Open Drawer</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="w-[304px]">
              <DrawerTitle>Drawer Title</DrawerTitle>
              <DrawerDescription>Drawer Description</DrawerDescription>
            </DrawerHeader>
            <div className="h-[72px] w-[304px] grid gap-4 py-4 border-dashed border-1 border-ring"></div>
            <DrawerFooter className="w-[304px]">
              <Button>Continue</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const drawerMeta = {
  name: "Drawer",
  description: "A drawer component for mobile and desktop.",
  llmUsage:
    "When creating drawer panels, use `<Drawer>` with `<DrawerTrigger>` and `<DrawerContent>`.",
  importPath: "@/components/ui/cognite/drawer",
};
