import { hasStoryRenderer } from './stories-registry';

export interface ComponentMeta {
  name: string;
  description: string;
  llmUsage?: string;
  importPath?: string;
}

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
  const camelCaseSlug = slug.replace(/-([a-z])/g, (_, letter) =>
    letter.toUpperCase()
  );
  const pascalCaseSlug =
    camelCaseSlug.charAt(0).toUpperCase() + camelCaseSlug.slice(1);

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
    } catch {
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
  } catch {
    return null;
  }
}
