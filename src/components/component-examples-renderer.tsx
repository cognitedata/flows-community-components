'use client';

import {
  getComponentExamples,
  type ComponentExample,
} from '#lib/component-examples';
import { ExamplePreview } from './example-preview';

interface ComponentExamplesRendererProps {
  slug: string;
}

export function ComponentExamplesRenderer({
  slug,
}: ComponentExamplesRendererProps) {
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
