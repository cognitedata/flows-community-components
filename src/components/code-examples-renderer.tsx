'use client';

import {
  getComponentExamples,
  type ComponentExample,
} from '@/lib/component-examples';
import { CodeExample } from './code-example';
import { getStoryCodeExamples } from '@/lib/stories-registry';

interface CodeExamplesRendererProps {
  slug: string;
}

export function CodeExamplesRenderer({ slug }: CodeExamplesRendererProps) {
  // Check for story-based code examples first
  const storyCodeExamples = getStoryCodeExamples(slug);
  if (storyCodeExamples && storyCodeExamples.length > 0) {
    return (
      <div className="space-y-4">
        {storyCodeExamples.map((example, index) => (
          <CodeExample key={index} title={example.title} code={example.code} />
        ))}
      </div>
    );
  }

  // Fall back to old examples system
  const examples = getComponentExamples(slug);

  if (!examples) {
    return (
      <div className="p-6 border rounded-lg bg-muted/20">
        <p className="text-sm text-muted-foreground">
          No code examples available for this component yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {Object.entries(examples).map(
        ([key, example]: [string, ComponentExample]) => (
          <CodeExample key={key} title={example.title} code={example.code} />
        )
      )}
    </div>
  );
}
