'use client';

import { useEffect, useState, type ComponentType } from 'react';
import { composeStories } from '@storybook/react';
import { ExamplePreview } from './example-preview';
import type { DocsStory } from '@/lib/component-metadata.types';
import { slugToPascalCase } from '@/lib/utils';

interface GenericStoriesRendererProps {
  slug: string;
}

interface LoadedStoryData {
  docsStories: DocsStory[];
  composedStories: Record<string, ComponentType>;
}

/**
 * Generic renderer for component stories.
 * Dynamically loads stories and metadata based on the component slug.
 */
export function GenericStoriesRenderer({ slug }: GenericStoriesRendererProps) {
  const [storyData, setStoryData] = useState<LoadedStoryData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStories() {
      try {
        // Dynamically import stories and metadata for this component
        const [storiesModule, metadataModule] = await Promise.all([
          import(`@/components/ui/aura/${slug}/${slug}.stories`),
          import(`@/components/ui/aura/${slug}/${slug}.metadata`),
        ]);

        // Get the PascalCase metadata export name
        const pascalCaseSlug = slugToPascalCase(slug);
        
        const metadata = metadataModule[`${pascalCaseSlug}Metadata`];
        
        if (!metadata?.docsStories) {
          setError(`No docsStories found in ${slug}.metadata.ts`);
          return;
        }

        // Compose stories using Storybook's portable stories API
        const composed = composeStories(storiesModule);

        setStoryData({
          docsStories: metadata.docsStories,
          composedStories: composed as Record<string, ComponentType>,
        });
      } catch (err) {
        console.error(`Failed to load stories for ${slug}:`, err);
        setError(`Failed to load stories for ${slug}.`);
      }
    }

    loadStories();
  }, [slug]);

  if (error) {
    return (
      <div className="p-6 border rounded-lg bg-destructive/10 text-destructive">
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (!storyData) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 bg-muted/20 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {storyData.docsStories.map(({ storyKey, title, description }) => {
        const Story = storyData.composedStories[storyKey];
        if (!Story) {
          console.warn(`Story "${storyKey}" not found for component "${slug}"`);
          return null;
        }

        return (
          <ExamplePreview
            key={storyKey}
            title={title}
            description={description}
            component={() => <Story />}
          />
        );
      })}
    </div>
  );
}
