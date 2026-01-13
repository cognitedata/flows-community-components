/**
 * Stories Registry
 *
 * Tracks which components use the new folder structure with portable stories.
 * Components listed here will use GenericStoriesRenderer instead of the legacy
 * examples system.
 */

/**
 * Set of component slugs that use the folder structure with portable stories.
 * Add a component slug here when it's migrated to the new structure:
 *   src/components/ui/aura/{slug}/
 *     ├── index.tsx
 *     ├── {slug}.tsx
 *     ├── {slug}.stories.tsx
 *     ├── {slug}.test.tsx
 *     └── {slug}.metadata.ts
 */
export const componentsWithStories = new Set<string>([
  'button',
  // Add more components as they're migrated:
  // 'card',
  // 'badge',
  // 'input',
]);

/**
 * Check if a component uses the portable stories system
 */
export function hasStoryRenderer(slug: string): boolean {
  return componentsWithStories.has(slug);
}

/**
 * Get code examples for a component from its metadata file.
 * Returns null if the component doesn't use the folder structure.
 */
export async function getStoryCodeExamples(
  slug: string
): Promise<Array<{ title: string; code: string }> | null> {
  if (!hasStoryRenderer(slug)) {
    return null;
  }

  try {
    const pascalCaseSlug = slug
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');

    const metadataModule = await import(
      `@/components/ui/aura/${slug}/${slug}.metadata`
    );
    const metadata = metadataModule[`${pascalCaseSlug}Metadata`];

    return metadata?.codeExamples || null;
  } catch {
    return null;
  }
}
