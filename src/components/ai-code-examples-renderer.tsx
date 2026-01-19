
import { useEffect, useState } from 'react';
import { CodeExample } from '@/components/code-example';
import { getStoryCodeExamples } from '@/lib/stories-registry';

interface AICodeExamplesRendererProps {
  slug: string;
}

interface CodeExampleData {
  title: string;
  code: string;
}

/**
 * Renders AI component code examples from component metadata.
 *
 * All AI components use the portable stories system and load code examples
 * from their metadata files.
 */
export function AICodeExamplesRenderer({ slug }: AICodeExamplesRendererProps) {
  const [storyExamples, setStoryExamples] = useState<CodeExampleData[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadExamples() {
      const examples = await getStoryCodeExamples(slug);
      setStoryExamples(examples);
      setLoading(false);
    }

    loadExamples();
  }, [slug]);

  // Loading state
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
        {storyExamples.map((example) => (
          <CodeExample
            key={example.title}
            title={example.title}
            code={example.code}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="p-6 border rounded-lg bg-muted/20">
      <p className="text-sm text-muted-foreground">
        No code examples available for this AI element yet.
      </p>
    </div>
  );
}
