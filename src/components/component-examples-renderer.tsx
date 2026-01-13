'use client';

import {
  getComponentExamples,
  type ComponentExample,
} from '@/lib/component-examples';
import { getStoryRenderer } from '@/lib/stories-registry';
import { ExamplePreview } from './example-preview';

interface ComponentExamplesRendererProps {
  slug: string;
}

export function ComponentExamplesRenderer({
  slug,
}: ComponentExamplesRendererProps) {
  // Check if this component has a story-based renderer (portable stories)
  const StoryRenderer = getStoryRenderer(slug);
  if (StoryRenderer) {
    return <StoryRenderer />;
  }

  // Fall back to the old examples system
  const examples = getComponentExamples(slug);

  if (!examples) {
    return (
      <div className="p-6 border rounded-lg">
        <p className="text-sm text-muted-foreground">
          No examples available for this component yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {Object.entries(examples).map(
        ([key, example]: [string, ComponentExample]) => (
          <ExamplePreview
            key={key}
            title={example.title}
            description={example.description}
            component={example.component}
          />
        )
      )}
    </div>
  );
}
