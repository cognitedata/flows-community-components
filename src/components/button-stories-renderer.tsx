'use client';

import { composeStories } from '@storybook/react';
import * as buttonStories from '@/components/ui/aura/button.stories';
import { ExamplePreview } from './example-preview';

// Compose all stories from the button stories file
const composedStories = composeStories(buttonStories);

// Define which stories to show in docs with display metadata and code examples
const docsStories = [
  {
    key: 'ButtonVariants',
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
    key: 'MainComponent',
    title: 'Main Component',
    description: 'Available size and variation options with normal, hover, and disabled states.',
    code: `import { Button } from "@/components/ui/aura/button"
import { IconPlus } from "@tabler/icons-react"

export function ButtonSizesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3 flex-col">
      {/* Primary variant */}
      <div className="flex flex-wrap items-center gap-3">
        <Button size="default"><IconPlus /> Button</Button>
        <Button size="default"><IconPlus /></Button>
        <Button size="sm"><IconPlus /> Button</Button>
        <Button size="sm"><IconPlus /></Button>
        <Button size="lg"><IconPlus /> Button</Button>
        <Button size="lg"><IconPlus /></Button>
      </div>
      
      {/* Secondary variant */}
      <div className="flex flex-wrap items-center gap-3">
        <Button size="default" variant="secondary"><IconPlus /> Button</Button>
        <Button size="sm" variant="secondary"><IconPlus /> Button</Button>
        <Button size="lg" variant="secondary"><IconPlus /> Button</Button>
      </div>
      
      {/* Other variants: outline, ghost, destructive, link */}
    </div>
  )
}`,
  },
  {
    key: 'ButtonStates',
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
] as const;

type StoryKey = keyof typeof composedStories;

export function ButtonStoriesRenderer() {
  return (
    <div className="space-y-6">
      {docsStories.map(({ key, title, description }) => {
        const Story = composedStories[key as StoryKey];
        if (!Story) return null;

        return (
          <ExamplePreview
            key={key}
            title={title}
            description={description}
            component={() => <Story />}
          />
        );
      })}
    </div>
  );
}

// Export code examples for use by CodeExamplesRenderer
export const buttonCodeExamples = docsStories.map(({ title, code }) => ({
  title,
  code,
}));
