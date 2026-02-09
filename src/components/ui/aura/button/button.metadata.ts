import type { ComponentMeta } from '../../../../lib/types';

/**
 * Button Component Metadata
 *
 * This metadata is used by the documentation system to generate
 * component documentation pages and provide context for LLMs.
 */
export const ButtonMetadata: ComponentMeta = {
  name: 'Button',
  status: 'draft',

  description:
    'A versatile button component with multiple variants and sizes, built with Base UI render props and class-variance-authority.',

  llmUsage:
    "When asked for a button, use `<Button variant='default'>Click me</Button>` instead of `<button>`. For different styles, use variants like 'destructive', 'outline', 'secondary', 'ghost', or 'link'.",

  codeExamples: [
    {
      title: 'Button Variants',
      description: 'Different visual styles for various use cases.',
      code: `import { Button } from "@/components/ui/aura/button"
import { IconPlus, IconBookmark, IconTrash, IconExternalLink } from "@tabler/icons-react"

export function ButtonVariantsDemo() {
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
  )
}`,
    },
    {
      title: 'Button Sizes',
      description: 'Available size options for different contexts.',
      code: `import { Button } from "@/components/ui/aura/button"
import { IconPlus } from "@tabler/icons-react"

export function ButtonSizesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm"><IconPlus /> Small</Button>
      <Button size="default"><IconPlus /> Default</Button>
      <Button size="lg"><IconPlus /> Large</Button>
      <Button size="icon-sm"><IconPlus /></Button>
      <Button size="icon"><IconPlus /></Button>
      <Button size="icon-lg"><IconPlus /></Button>
    </div>
  )
}`,
    },
    {
      title: 'Button States',
      description: 'Disabled and loading states.',
      code: `import { Button } from "@/components/ui/aura/button"
import { IconLoader2 } from "@tabler/icons-react"

export function ButtonStatesDemo() {
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
  ],
};
