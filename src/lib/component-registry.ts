import { type ComponentMeta } from './component-examples/types';
import { hasStoryRenderer } from './stories-registry';

/**
 * Gets component metadata from the appropriate source.
 *
 * For components using portable stories (listed in stories-registry.ts),
 * metadata is loaded from the stories file.
 *
 * For other components, metadata is loaded from the examples file.
 */
export async function getComponentMeta(
  slug: string
): Promise<ComponentMeta | null> {
  // Convert slug to camelCase for the export name (e.g., "alert-dialog" -> "alertDialog")
  const camelCaseSlug = slug.replace(/-([a-z])/g, (_, letter) =>
    letter.toUpperCase()
  );

  // Convert slug to PascalCase for stories (e.g., "alert-dialog" -> "AlertDialog")
  const pascalCaseSlug =
    camelCaseSlug.charAt(0).toUpperCase() + camelCaseSlug.slice(1);

  // Check if this component uses portable stories
  if (hasStoryRenderer(slug)) {
    try {
      // Load metadata from stories file (uses PascalCase + Metadata: ButtonMetadata, AlertDialogMetadata, etc.)
      const storiesModule = await import(
        `@/components/ui/aura/${slug}.stories`
      );
      const meta = storiesModule[`${pascalCaseSlug}Metadata`];
      if (meta) {
        return meta;
      }
    } catch (error) {
      console.warn(`Could not load stories metadata for ${slug}:`, error);
    }
  }

  // Fall back to examples file
  try {
    const examplesModule = await import(
      `./component-examples/${slug}.examples`
    );
    const meta = examplesModule[`${camelCaseSlug}Meta`];
    return meta || null;
  } catch (error) {
    console.warn(`Could not load metadata for ${slug}:`, error);
    return null;
  }
}
