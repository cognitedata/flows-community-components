import { Button } from "@/components/ui/draft/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/draft/drawer";
import { Input } from "@/components/ui/draft/input";
import { Label } from "@/components/ui/draft/label";
import type { ComponentExamples } from "./types";

function BasicDemo() {
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">Open Drawer</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Create New Project</DrawerTitle>
              <DrawerDescription>
                Fill out the form below to create a new project.
              </DrawerDescription>
            </DrawerHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="project-name">Project Name</Label>
                <Input id="project-name" placeholder="Enter project name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" placeholder="Enter description" />
              </div>
            </div>
            <DrawerFooter>
              <Button>Create Project</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>

        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">Settings</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Settings</DrawerTitle>
              <DrawerDescription>
                Configure your application settings.
              </DrawerDescription>
            </DrawerHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="theme">Theme</Label>
                <Input id="theme" placeholder="Select theme" />
              </div>
            </div>
            <DrawerFooter>
              <Button>Save Settings</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
      
      <p className="text-sm text-muted-foreground">
        Click buttons to open interactive drawer panels that slide up from the bottom.
      </p>
    </div>
  );
}

export const drawerExamples: ComponentExamples = {
  basic: {
    title: "Drawer Demo",
    description: "Interactive drawer panels that slide up from the bottom with forms and content",
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
} from "@/components/ui/draft/drawer"
import { Button } from "@/components/ui/draft/button"
import { Input } from "@/components/ui/draft/input"
import { Label } from "@/components/ui/draft/label"

export function BasicDemo() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create New Project</DrawerTitle>
          <DrawerDescription>
            Fill out the form below to create a new project.
          </DrawerDescription>
        </DrawerHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="project-name">Project Name</Label>
            <Input id="project-name" placeholder="Enter project name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" placeholder="Enter description" />
          </div>
        </div>
        <DrawerFooter>
          <Button>Create Project</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const drawerMeta = {
  name: "Drawer",
  description: "A drawer component for mobile and desktop.",
  llmUsage: "When creating drawer panels, use `<Drawer>` with `<DrawerTrigger>` and `<DrawerContent>`.",
  importPath: "@/components/ui/draft/drawer",
};
