'use client';

import { getAIComponentExamples } from '#lib/ai-examples';
import { CodeExample } from '#components/code-example';
import type { ComponentExample } from '#lib/ai-examples';

interface AICodeExamplesRendererProps {
  slug: string;
}

export function AICodeExamplesRenderer({ slug }: AICodeExamplesRendererProps) {
  const examples = getAIComponentExamples(slug);

  if (!examples) {
    return (
      <div className="p-6 border rounded-lg bg-muted/20">
        <p className="text-sm text-muted-foreground">
          No code examples available for this AI element yet.
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
