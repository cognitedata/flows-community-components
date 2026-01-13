'use client';

import { composeStories } from '@storybook/react';
import * as buttonStories from '@/components/ui/aura/button/button.stories';
import { ExamplePreview } from './example-preview';
import { ButtonMetadata } from '@/components/ui/aura/button/button.metadata';

// Compose all stories from the button stories file
const composedStories = composeStories(buttonStories);

// Use code examples from metadata file (single source of truth)
const docsStories = [
  {
    key: 'ButtonVariants',
    title: 'Button Variants',
    description: 'Different visual styles for various use cases.',
  },
  {
    key: 'MainComponent',
    title: 'Main Component',
    description: 'Available size and variation options with normal, hover, and disabled states.',
  },
  {
    key: 'ButtonStates',
    title: 'Button States',
    description: 'Disabled and loading states.',
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

// Export code examples from metadata for use by CodeExamplesRenderer
export const buttonCodeExamples = ButtonMetadata.codeExamples;
