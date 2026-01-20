import { composeStories } from "@storybook/react";
import type React from "react";
import { type ComponentType, useEffect, useState } from "react";
import { ExamplePreview } from "./example-preview";

interface StoriesRendererProps {
  slug: string;
}

interface StoryEntry {
  key: string;
  title: string;
  Component: ComponentType;
  sourceCode?: string;
}


// Use import.meta.glob to let Vite know about all stories files at build time
// Using eager: true ensures modules are loaded at build time and included in production bundle
// This follows Storybook's recommended pattern for portable stories
const storiesModules = import.meta.glob("@/components/ui/aura/*/*.stories.tsx", { eager: true });


// Create a slug-to-module mapping at module load time to avoid path resolution issues
// This works regardless of how Vite transforms paths in production builds
const storiesBySlug = new Map<string, Record<string, unknown>>();

for (const [path, module] of Object.entries(storiesModules)) {
  // Extract slug from path - handle various path formats:
  // - /src/components/ui/aura/accordion/accordion.stories.tsx
  // - @/components/ui/aura/accordion/accordion.stories.tsx
  // - ./ui/aura/accordion/accordion.stories.tsx
  // - src/components/ui/aura/accordion/accordion.stories.tsx
  const slugMatch = path.match(/\/([^/]+)\/\1\.stories\.tsx$/);
  if (slugMatch) {
    const slug = slugMatch[1];
    storiesBySlug.set(slug, module as Record<string, unknown>);
  }
}

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
      // Find the stories module for this slug using the pre-built slug-to-module map
      // This avoids path resolution issues in production builds
      const storiesModule = storiesBySlug.get(slug);

      if (!storiesModule) {
        const availableSlugs = Array.from(storiesBySlug.keys());
        const similarSlugs = availableSlugs.filter((s) => 
          s.includes(slug) || slug.includes(s) || 
          s.toLowerCase().includes(slug.toLowerCase()) || 
          slug.toLowerCase().includes(s.toLowerCase())
        );
        
        console.error("[StoriesRenderer] Story module not found for slug:", slug);
        
        const errorMessage = similarSlugs.length > 0
          ? `No stories file found for "${slug}". Did you mean: ${similarSlugs.slice(0, 3).join(", ")}?`
          : `No stories file found for "${slug}". Available: ${availableSlugs.slice(0, 5).join(", ")}${availableSlugs.length > 5 ? "..." : ""}`;
        
        setError(errorMessage);
        return;
      }

      try {
        // Module is already loaded with eager: true, just need to use it
        const module = storiesModule as Record<string, unknown>;

        // Compose stories using Storybook's portable stories API
        // composeStories expects a module with default export (meta) and named exports (stories)
        let composed: Record<string, ComponentType>;
        try {
          composed = composeStories(
            module as Parameters<typeof composeStories>[0]
          ) as Record<string, ComponentType>;
          
          // If composeStories returns empty, try to manually extract stories
          if (Object.keys(composed).length === 0) {
            const moduleKeys = Object.keys(module);
            
            // Filter out default, __esModule, and other non-story exports
            const storyKeys = moduleKeys.filter(
              (key) =>
                key !== "default" &&
                key !== "__esModule" &&
                !key.startsWith("_") &&
                typeof module[key] === "object"
            );
            
            if (storyKeys.length > 0) {
              // Manually create composed stories from the module
              composed = {} as Record<string, ComponentType>;
              for (const key of storyKeys) {
                const story = module[key] as {
                  render?: () => React.ReactElement;
                };
                if (story && typeof story.render === "function") {
                  composed[key] = story.render as ComponentType;
                }
              }
            }
          }
        } catch (composeError) {
          console.error("[StoriesRenderer] Failed to compose stories for slug:", slug, composeError);
          throw composeError;
        }

        // Convert to array of story entries with source code
        const storyEntries: StoryEntry[] = Object.entries(composed).map(([key, Component]) => {
          // Directly access the story object from the module
          // The story exports are directly accessible on the module by their export name
          const originalStory = module[key] as
            | {
                parameters?: {
                  docs?: {
                    source?: {
                      code?: string;
                    };
                  };
                };
                render?: () => React.ReactElement;
              }
            | undefined;

          // Extract source code from story parameters (injected at build time)
          const sourceCode = originalStory?.parameters?.docs?.source?.code;

          return {
            key,
            title: storyKeyToTitle(key),
            Component,
            sourceCode,
          };
        });

        if (storyEntries.length === 0) {
          console.error("[StoriesRenderer] No stories found for slug:", slug);
          setError(`No stories found in ${slug}.stories.tsx.`);
          return;
        }

        if (!cancelled) {
          setStories(storyEntries);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("[StoriesRenderer] Failed to load stories for slug:", slug, err);
          setError(`Failed to load stories for "${slug}". ${err instanceof Error ? err.message : "Unknown error"}.`);
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
      {stories.map(({ key, title, Component, sourceCode }) => (
        <ExamplePreview
          key={key}
          title={title}
          component={() => <Component />}
          sourceCode={sourceCode}
        />
      ))}
    </div>
  );
}
