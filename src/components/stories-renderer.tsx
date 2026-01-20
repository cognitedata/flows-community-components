import { composeStories } from "@storybook/react";
import { type ComponentType, useEffect, useState } from "react";
import { ExamplePreview } from "./example-preview";

interface StoriesRendererProps {
  slug: string;
}

interface StoryEntry {
  key: string;
  title: string;
  Component: ComponentType;
}

// Use import.meta.glob to let Vite know about all stories files at build time
// Using relative path from this file for more reliable resolution
const storiesModules = import.meta.glob("./ui/aura/*/*.stories.tsx");

/**
 * Converts a PascalCase or camelCase story key to a human-readable title.
 * E.g., "AllVariants" -> "All Variants", "WithLeftIcon" -> "With Left Icon"
 */
function storyKeyToTitle(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

/**
 * Unified renderer for component stories.
 * Dynamically loads and renders all stories from a component's stories file.
 *
 * This is the consolidated renderer that replaces both AIExamplesRenderer
 * and ComponentExamplesRenderer after the migration from .examples.tsx to .stories.tsx.
 */
export function StoriesRenderer({ slug }: StoriesRendererProps) {
  const [stories, setStories] = useState<StoryEntry[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadStories() {
      // Reset state when slug changes to avoid stale data
      if (!cancelled) {
        setStories(null);
        setError(null);
      }
      // Find the stories module for this slug
      // Path format varies: could be /src/..., @/..., or ../...
      const modulePath = Object.keys(storiesModules).find((path) =>
        path.endsWith(`/${slug}/${slug}.stories.tsx`)
      );

      if (!modulePath) {
        setError(`No stories file found for ${slug}.`);
        return;
      }

      try {
        // Load the stories module
        const storiesModule = await storiesModules[modulePath]();

        // Compose stories using Storybook's portable stories API
        const composed = composeStories(
          storiesModule as Parameters<typeof composeStories>[0]
        ) as Record<string, ComponentType>;

        // Convert to array of story entries
        const storyEntries: StoryEntry[] = Object.entries(composed).map(([key, Component]) => ({
          key,
          title: storyKeyToTitle(key),
          Component,
        }));

        if (storyEntries.length === 0) {
          setError(`No stories found in ${slug}.stories.tsx`);
          return;
        }

        if (!cancelled) {
          setStories(storyEntries);
        }
      } catch (err) {
        if (!cancelled) {
          console.error(`Failed to load stories for ${slug}:`, err);
          setError(`Failed to load stories for ${slug}.`);
        }
      }
    }

    loadStories();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (error) {
    return (
      <div className="p-6 border rounded-lg bg-destructive/10 text-destructive">
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (!stories) {
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
      {stories.map(({ key, title, Component }) => (
        <ExamplePreview key={key} title={title} component={() => <Component />} />
      ))}
    </div>
  );
}
