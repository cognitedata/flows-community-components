'use client';

import { useEffect, useState } from 'react';
import {
  getComponentExamples,
  type ComponentExample,
} from '@/lib/component-examples';
import { CodeExample } from './code-example';
import { hasStoryRenderer, getStoryCodeExamples } from '@/lib/stories-registry';

interface CodeExamplesRendererProps {
  slug: string;
}

interface CodeExampleData {
  title: string;
  code: string;
}

export function CodeExamplesRenderer({ slug }: CodeExamplesRendererProps) {
  const [storyExamples, setStoryExamples] = useState<CodeExampleData[] | null>(null);
  const [loading, setLoading] = useState(hasStoryRenderer(slug));

  useEffect(() => {
    if (!hasStoryRenderer(slug)) return;

    async function loadExamples() {
      const examples = await getStoryCodeExamples(slug);
      setStoryExamples(examples);
      setLoading(false);
    }

    loadExamples();
  }, [slug]);

  // Loading state for story-based components
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="h-32 bg-muted/20 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  // Render story-based code examples
  if (storyExamples && storyExamples.length > 0) {
    return (
      <div className="space-y-4">
        {storyExamples.map((example, index) => (
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
