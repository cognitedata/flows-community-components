import { Button } from '@/components/ui/aura/button';
import type { ComponentExamples } from '@/lib/component-examples/types';
import {
  IconPlus,
  IconDownload,
  IconTrash,
  IconSettings,
  IconLoader2,
  IconBookmark,
  IconExternalLink,
} from '@tabler/icons-react';

function AllVariantsDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button size="icon" aria-label="Add">
        <IconPlus className="size-4" />
      </Button>
      <Button size="icon" variant="secondary" aria-label="Bookmark">
        <IconBookmark className="size-4" />
      </Button>
      <Button size="icon" variant="destructive" aria-label="Delete">
        <IconTrash className="size-4" />
      </Button>
      <Button>
        <IconPlus className="size-4" />
        Add data
      </Button>
      <Button variant="secondary">
        Explore more
        <IconExternalLink className="size-4" />
      </Button>
      <Button variant="destructive">
        <IconTrash className="size-4" />
        Delete
      </Button>
    </div>
  );
}

function VariantsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  );
}

function SizesDemo() {
  return (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  );
}

function IconButtonsDemo() {
  return (
    <div className="flex items-center gap-4">
      <Button variant="outline" size="icon-sm" aria-label="Settings small">
        <IconSettings className="size-4" />
      </Button>
      <Button variant="outline" size="icon" aria-label="Settings default">
        <IconSettings className="size-4" />
      </Button>
      <Button variant="outline" size="icon-lg" aria-label="Settings large">
        <IconSettings className="size-5" />
      </Button>
    </div>
  );
}

function WithIconsDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button>
        <IconPlus className="size-4" />
        Add Item
      </Button>
      <Button variant="outline">
        Download
        <IconDownload className="size-4" />
      </Button>
      <Button variant="destructive">
        <IconTrash className="size-4" />
        Delete
      </Button>
    </div>
  );
}

function StatesDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button disabled>Disabled</Button>
      <Button disabled>
        <IconLoader2 className="size-4 animate-spin" />
        Loading...
      </Button>
      <Button variant="outline" disabled>
        <IconLoader2 className="size-4 animate-spin" />
        Please wait
      </Button>
    </div>
  );
}

export const buttonExamples: ComponentExamples = {
  allVariants: {
    title: 'All Variants',
    description: 'Overview of button variants with icons and different styles',
    component: AllVariantsDemo,
    difficulty: 'beginner',
    code: `import { Button } from "@/components/ui/aura/button"
import { IconPlus, IconTrash, IconBookmark, IconExternalLink } from "@tabler/icons-react"

export function AllVariantsDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button size="icon" aria-label="Add">
        <IconPlus className="size-4" />
      </Button>
      <Button size="icon" variant="secondary" aria-label="Bookmark">
        <IconBookmark className="size-4" />
      </Button>
      <Button size="icon" variant="destructive" aria-label="Delete">
        <IconTrash className="size-4" />
      </Button>
      <Button>
        <IconPlus className="size-4" />
        Add data
      </Button>
      <Button variant="secondary">
        Explore more
        <IconExternalLink className="size-4" />
      </Button>
      <Button variant="destructive">
        <IconTrash className="size-4" />
        Delete
      </Button>
    </div>
  )
}`,
  },
  variants: {
    title: 'Button Variants',
    description: 'All available button style variants',
    component: VariantsDemo,
    difficulty: 'beginner',
    code: `import { Button } from "@/components/ui/aura/button"

export function VariantsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  )
}`,
  },
  sizes: {
    title: 'Button Sizes',
    description: 'Available button sizes: small, default, and large',
    component: SizesDemo,
    difficulty: 'beginner',
    code: `import { Button } from "@/components/ui/aura/button"

export function SizesDemo() {
  return (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  )
}`,
  },
  iconButtons: {
    title: 'Icon Buttons',
    description: 'Square icon-only buttons in three sizes',
    component: IconButtonsDemo,
    difficulty: 'beginner',
    code: `import { Button } from "@/components/ui/aura/button"
import { IconSettings } from "@tabler/icons-react"

export function IconButtonsDemo() {
  return (
    <div className="flex items-center gap-4">
      <Button variant="outline" size="icon-sm" aria-label="Settings small">
        <IconSettings className="size-4" />
      </Button>
      <Button variant="outline" size="icon" aria-label="Settings default">
        <IconSettings className="size-4" />
      </Button>
      <Button variant="outline" size="icon-lg" aria-label="Settings large">
        <IconSettings className="size-5" />
      </Button>
    </div>
  )
}`,
  },
  withIcons: {
    title: 'With Icons',
    description: 'Buttons with icons on the left or right side',
    component: WithIconsDemo,
    difficulty: 'beginner',
    code: `import { Button } from "@/components/ui/aura/button"
import { IconPlus, IconDownload, IconTrash } from "@tabler/icons-react"

export function WithIconsDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button>
        <IconPlus className="size-4" />
        Add Item
      </Button>
      <Button variant="outline">
        Download
        <IconDownload className="size-4" />
      </Button>
      <Button variant="destructive">
        <IconTrash className="size-4" />
        Delete
      </Button>
    </div>
  )
}`,
  },
  states: {
    title: 'Disabled & Loading States',
    description: 'Buttons in disabled and loading states',
    component: StatesDemo,
    difficulty: 'beginner',
    code: `import { Button } from "@/components/ui/aura/button"
import { IconLoader2 } from "@tabler/icons-react"

export function StatesDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button disabled>Disabled</Button>
      <Button disabled>
        <IconLoader2 className="size-4 animate-spin" />
        Loading...
      </Button>
      <Button variant="outline" disabled>
        <IconLoader2 className="size-4 animate-spin" />
        Please wait
      </Button>
    </div>
  )
}`,
  },
};

export const buttonMeta = {
  name: 'Button',
  description: 'A versatile button component with multiple variants, sizes, and states.',
  llmUsage: "Use `<Button>` for all clickable actions. Choose variants like 'default', 'secondary', 'outline', 'ghost', 'destructive', or 'link' based on the action's importance.",
  importPath: '@/components/ui/aura/button',
};
