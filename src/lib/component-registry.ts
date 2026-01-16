import type { ComponentMeta } from './component-examples';
import { hasStoryRenderer } from './stories-registry';
import { slugToPascalCase } from './utils';

/**
 * Get component metadata.
 *
 * For components using portable stories (in storyRenderers), metadata is loaded
 * from the component's metadata file (e.g., button/button.metadata.ts).
 *
 * For legacy components, metadata is loaded from component-examples/*.examples.tsx.
 */
export async function getComponentMeta(
  slug: string
): Promise<ComponentMeta | null> {
  const pascalCaseSlug = slugToPascalCase(slug);
  const camelCaseSlug =
    pascalCaseSlug.charAt(0).toLowerCase() + pascalCaseSlug.slice(1);

  // Check if this component uses portable stories (folder structure)
  if (hasStoryRenderer(slug)) {
    try {
      // Load from the new folder structure with metadata file
      const metadataModule = await import(
        `@/components/ui/aura/${slug}/${slug}.metadata`
      );
      const meta = metadataModule[`${pascalCaseSlug}Metadata`];
      if (meta) {
        return meta;
      }
    } catch (error) {
      console.warn(
        `Could not load portable-story metadata for ${slug}:`,
        error
      );
      // Fall through to legacy lookup
    }
  }

  // Fall back to old examples file for legacy components
  try {
    const examplesModule = await import(
      `./component-examples/${slug}.examples`
    );
    const meta = examplesModule[`${camelCaseSlug}Meta`];
    return meta || null;
  } catch (error) {
    console.warn(`Could not load legacy metadata for ${slug}:`, error);
    return null;
  }
}
