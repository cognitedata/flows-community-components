import { useEffect, useState } from 'react';
import { GenericStoriesRenderer } from './generic-stories-renderer';
import { ExamplePreview } from './example-preview';
import { slugToCamelCase } from '@/lib/utils';
import type { ComponentExample } from '@/lib/component-examples/types';

interface ComponentExamplesRendererProps {
  slug: string;
}

interface ExampleEntry {
  key: string;
  example: ComponentExample;
}

// Use import.meta.glob to let Vite know about all examples files at build time
// Using relative path from this file for more reliable resolution
const examplesModules = import.meta.glob('./ui/aura/*/*.examples.tsx');

/**
 * Renders component examples, prioritizing .examples.tsx files over .stories.tsx files.
 *
 * If a component has an examples file, those examples are rendered.
 * Otherwise, falls back to rendering Storybook stories via GenericStoriesRenderer.
 */
export function ComponentExamplesRenderer({
  slug,
}: ComponentExamplesRendererProps) {
  const [examples, setExamples] = useState<ExampleEntry[] | null>(null);
  const [useStories, setUseStories] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadExamples() {
      // Find the examples module for this slug
      // Path format varies: could be /src/..., @/..., or ../...
      const modulePath = Object.keys(examplesModules).find((path) =>
        path.endsWith(`/${slug}/${slug}.examples.tsx`)
      );

      if (!modulePath) {
        // No examples file found, fall back to stories
        setUseStories(true);
        setLoading(false);
        return;
      }

      try {
        // Load the examples module
        const examplesModule = (await examplesModules[modulePath]()) as Record<
          string,
          unknown
        >;

        // Get the examples export using camelCase naming convention
        const camelCaseSlug = slugToCamelCase(slug);
        const examplesExport = examplesModule[`${camelCaseSlug}Examples`];

        if (examplesExport && typeof examplesExport === 'object') {
          // Convert examples object to array of entries
          const exampleEntries: ExampleEntry[] = Object.entries(
            examplesExport as Record<string, ComponentExample>
          ).map(([key, example]) => ({
            key,
            example,
          }));

          if (exampleEntries.length > 0) {
            setExamples(exampleEntries);
            setLoading(false);
            return;
          }
        }

        // No valid examples found, fall back to stories
        setUseStories(true);
        setLoading(false);
      } catch (err) {
        console.error(`Failed to load examples for ${slug}:`, err);
        // Examples file failed to load, fall back to stories
        setUseStories(true);
        setLoading(false);
      }
    }

    loadExamples();
  }, [slug]);

  // Loading state
  if (loading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 bg-muted/20 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  // Fall back to stories renderer
  if (useStories) {
    return <GenericStoriesRenderer slug={slug} />;
  }

  // Render examples
  if (examples && examples.length > 0) {
    return (
      <div className="space-y-6">
        {examples.map(({ key, example }) => (
          <ExamplePreview
            key={key}
            title={example.title}
            description={example.description}
            component={example.component}
          />
        ))}
      </div>
    );
  }

  return null;
}
