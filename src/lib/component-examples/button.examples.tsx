import { Button } from "@/components/ui/cognite/button";
import {
  IconPlus,
  IconBookmark,
  IconTrash,
  IconExternalLink,
  IconLoader2,
} from "@tabler/icons-react";
import type { ComponentExamples } from "./types";

function VariantsDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="default" size="icon-sm">
        <IconPlus />
      </Button>
      <Button variant="secondary" size="icon-sm">
        <IconBookmark />
      </Button>
      <Button variant="destructive" size="icon-sm">
        <IconTrash />
      </Button>
      <Button variant="default">
        <IconPlus /> Add data
      </Button>
      <Button variant="secondary">
        Explore more
        <IconExternalLink />
      </Button>
      <Button variant="destructive">
        <IconTrash />
        Delete
      </Button>
    </div>
  );
}

function MainComponentDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3 flex-col">
      <div className="flex flex-wrap items-center gap-3">
        <Button size="default">
          <IconPlus />
          Button
        </Button>
        <Button size="default">
          <IconPlus />
        </Button>
        <Button size="sm">
          <IconPlus />
          Button
        </Button>
        <Button size="sm">
          <IconPlus />
        </Button>
        <Button size="lg">
          {" "}
          <IconPlus />
          Button
        </Button>
        <Button size="lg">
          <IconPlus />
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button size="default" variant={"secondary"}>
          <IconPlus />
          Button
        </Button>
        <Button size="default" variant={"secondary"}>
          <IconPlus />
        </Button>
        <Button size="sm" variant={"secondary"}>
          <IconPlus />
          Button
        </Button>
        <Button size="sm" variant={"secondary"}>
          <IconPlus />
        </Button>
        <Button size="lg" variant={"secondary"}>
          <IconPlus />
          Button
        </Button>
        <Button size="lg" variant={"secondary"}>
          <IconPlus />
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button size="default" variant={"outline"}>
          <IconPlus />
          Button
        </Button>
        <Button size="default" variant={"outline"}>
          <IconPlus />
        </Button>
        <Button size="sm" variant={"outline"}>
          <IconPlus />
          Button
        </Button>
        <Button size="sm" variant={"outline"}>
          <IconPlus />
        </Button>
        <Button size="lg" variant={"outline"}>
          <IconPlus />
          Button
        </Button>
        <Button size="lg" variant={"outline"}>
          <IconPlus />
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button size="default" variant={"ghost"}>
          <IconPlus />
          Button
        </Button>
        <Button size="default" variant={"ghost"}>
          <IconPlus />
        </Button>
        <Button size="sm" variant={"ghost"}>
          <IconPlus />
          Button
        </Button>
        <Button size="sm" variant={"ghost"}>
          <IconPlus />
        </Button>
        <Button size="lg" variant={"ghost"}>
          <IconPlus />
          Button
        </Button>
        <Button size="lg" variant={"ghost"}>
          <IconPlus />
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button size="default" variant={"destructive"}>
          <IconPlus />
          Button
        </Button>
        <Button size="default" variant={"destructive"}>
          <IconPlus />
        </Button>
        <Button size="sm" variant={"destructive"}>
          <IconPlus />
          Button
        </Button>
        <Button size="sm" variant={"destructive"}>
          <IconPlus />
        </Button>
        <Button size="lg" variant={"destructive"}>
          <IconPlus />
          Button
        </Button>
        <Button size="lg" variant={"destructive"}>
          <IconPlus />
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button size="default" variant={"link"}>
          <IconPlus />
          Button
        </Button>
        <Button size="default" variant={"link"}>
          <IconPlus />
        </Button>
        <Button size="sm" variant={"link"}>
          <IconPlus />
          Button
        </Button>
        <Button size="sm" variant={"link"}>
          <IconPlus />
        </Button>
        <Button size="lg" variant={"link"}>
          <IconPlus />
          Button
        </Button>
        <Button size="lg" variant={"link"}>
          <IconPlus />
        </Button>
      </div>
    </div>
  );
}

function StatesDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button disabled>Disabled</Button>
      <Button disabled>
        <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </Button>
    </div>
  );
}

export const buttonExamples: ComponentExamples = {
  variants: {
    title: "Button Variants",
    description: "Different visual styles for various use cases",
    component: VariantsDemo,
    difficulty: "beginner",
    code: `import { Button } from "@/components/ui/cognite/button"
import { IconPlus, IconBookmark, IconTrash, IconExternalLink } from "@tabler/icons-react"

export function VariantsDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="default" size="icon">
        <IconPlus />
      </Button>
      <Button variant="secondary" size="icon">
        <IconBookmark />
      </Button>
      <Button variant="destructive" size="icon">
        <IconTrash />
      </Button>
      <Button variant="default">
        <IconPlus /> Add data
      </Button>
      <Button variant="secondary">
        Explore more
        <IconExternalLink />
      </Button>
      <Button variant="destructive">
        <IconTrash />
        Delete
      </Button>
    </div>
  )
}`,
  },

  sizes: {
    title: "Main Component",
    description: "Available size and variation options",
    component: MainComponentDemo,
    difficulty: "beginner",
    code: `import { Button } from "@/components/ui/cognite/button"
import { IconMail } from "@tabler/icons-react"

export function SizesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">
        <IconMail className="h-4 w-4" />
      </Button>
    </div>
  )
}`,
  },

  states: {
    title: "Button States",
    description: "Disabled and loading states",
    component: StatesDemo,
    difficulty: "beginner",
    code: `import { Button } from "@/components/ui/cognite/button"
import { IconLoader2 } from "@tabler/icons-react"

export function StatesDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button disabled>Disabled</Button>
      <Button disabled>
        <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </Button>
    </div>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const buttonMeta = {
  name: "Button",
  description:
    "A versatile button component with multiple variants and sizes, built with Radix UI Slot and class-variance-authority.",
  llmUsage:
    "When asked for a button, use `<Button variant='default'>Click me</Button>` instead of `<button>`. For different styles, use variants like 'destructive', 'outline', 'secondary', 'ghost', or 'link'.",
  importPath: "@/components/ui/cognite/button",
};
