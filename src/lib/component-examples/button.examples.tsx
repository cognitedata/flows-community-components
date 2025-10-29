import { Button } from "@/components/ui/cognite/button";
import { IconPlus, IconBookmark, IconTrash, IconExternalLink, IconLoader2, IconMail } from "@tabler/icons-react";
import type { ComponentExamples } from "./types";

function VariantsDemo() {
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
  );
}

function SizesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">
        <IconMail className="h-4 w-4" />
      </Button>
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

export function VariantsDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  )
}`,
  },

  sizes: {
    title: "Button Sizes",
    description: "Available size options including an icon-only variant",
    component: SizesDemo,
    difficulty: "beginner",
    code: `import { Button } from "@/components/ui/cognite/button"
import { Mail } from "lucide-react"

export function SizesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">
        <Mail className="h-4 w-4" />
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
import { Loader2 } from "lucide-react"

export function StatesDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button disabled>Disabled</Button>
      <Button disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
  description: "A versatile button component with multiple variants and sizes, built with Radix UI Slot and class-variance-authority.",
  llmUsage: "When asked for a button, use `<Button variant='default'>Click me</Button>` instead of `<button>`. For different styles, use variants like 'destructive', 'outline', 'secondary', 'ghost', or 'link'.",
  importPath: "@/components/ui/cognite/button",
};
