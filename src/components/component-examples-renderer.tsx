'use client';

import { hasStoryRenderer } from '@/lib/stories-registry';
import { GenericStoriesRenderer } from './generic-stories-renderer';
import {
  getComponentExamples,
  type ComponentExample,
} from '@/lib/component-examples';
import { ExamplePreview } from './example-preview';

interface ComponentExamplesRendererProps {
  slug: string;
}

/**
 * Renders component examples.
 *
 * For components using the folder structure (in componentsWithStories),
 * uses GenericStoriesRenderer to render Storybook stories.
 *
 * For legacy components, falls back to the old examples system.
 */
export function ComponentExamplesRenderer({
  slug,
}: ComponentExamplesRendererProps) {
  // Check if this component uses the portable stories system
  if (hasStoryRenderer(slug)) {
    return <GenericStoriesRenderer slug={slug} />;
  }

  // Fall back to the old examples system
  const examples = getComponentExamples(slug);

  if (!examples) {
    return (
      <div className="p-6 border rounded-lg bg-muted/20">
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
