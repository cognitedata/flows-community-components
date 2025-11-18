'use client';

import { getAIComponentExamples } from '@/lib/ai-examples';
import { ExamplePreview } from '@/components/example-preview';
import type { ComponentExample } from '@/lib/ai-examples';

interface AIExamplesRendererProps {
  slug: string;
}

export function AIExamplesRenderer({ slug }: AIExamplesRendererProps) {
  const examples = getAIComponentExamples(slug);

  if (!examples) {
    return (
      <div className="p-6 border rounded-lg bg-muted/20">
        <p className="text-sm text-muted-foreground">
          No examples available for this AI element yet. Examples are being
          developed.
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
