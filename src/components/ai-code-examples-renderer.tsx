import { useEffect, useState } from 'react';
import { CodeExample } from '@/components/code-example';
import { getStoryCodeExamples } from '@/lib/stories-registry';
import { slugToCamelCase } from '@/lib/utils';
import type { ComponentExample } from '@/lib/component-examples/types';

interface AICodeExamplesRendererProps {
  slug: string;
}

interface CodeExampleData {
  title: string;
  code: string;
}

// Use import.meta.glob to let Vite know about all examples files at build time
// Using relative path from this file for more reliable resolution
const examplesModules = import.meta.glob('./ui/aura/*/*.examples.tsx');

/**
 * Renders AI component code examples, prioritizing .examples.tsx files over story metadata.
 *
 * If a component has an examples file with code, those code examples are rendered.
 * Otherwise, falls back to loading code examples from story metadata files.
 */
export function AICodeExamplesRenderer({ slug }: AICodeExamplesRendererProps) {
  const [codeExamples, setCodeExamples] = useState<CodeExampleData[] | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reset state when slug changes to avoid stale data
    setCodeExamples(null);
    setLoading(true);

    async function loadExamples() {
      // Find the examples module for this slug
      // Path format varies: could be /src/..., @/..., or ../...
      const modulePath = Object.keys(examplesModules).find((path) =>
        path.endsWith(`/${slug}/${slug}.examples.tsx`)
      );

      if (modulePath) {
        try {
          // Load the examples module
          const examplesModule = (await examplesModules[
            modulePath
          ]()) as Record<string, unknown>;

          // Get the examples export using camelCase naming convention
          const camelCaseSlug = slugToCamelCase(slug);
          const examplesExport = examplesModule[`${camelCaseSlug}Examples`];

          if (examplesExport && typeof examplesExport === 'object') {
            // Extract code from examples
            const codeFromExamples: CodeExampleData[] = Object.values(
              examplesExport as Record<string, ComponentExample>
            )
              .filter(
                (example): example is ComponentExample =>
                  typeof example === 'object' &&
                  example !== null &&
                  'title' in example &&
                  'code' in example &&
                  typeof example.code === 'string' &&
                  example.code.length > 0
              )
              .map((example) => ({
                title: example.title,
                code: example.code,
              }));

            if (codeFromExamples.length > 0) {
              setCodeExamples(codeFromExamples);
              setLoading(false);
              return;
            }
          }
        } catch (err) {
          console.error(`Failed to load examples for ${slug}:`, err);
        }
      }

      // No valid examples found or failed to load, fall back to story metadata
      const storyExamples = await getStoryCodeExamples(slug);
      setCodeExamples(storyExamples);
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

  // Render code examples
  if (codeExamples && codeExamples.length > 0) {
    return (
      <div className="space-y-4">
        {codeExamples.map((example) => (
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
