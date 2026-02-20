import type { ComponentMeta } from './types';
import { slugToPascalCase } from './utils';

/**
 * Pre-load all metadata modules using Vite's glob import.
 * This allows Vite to statically analyze the imports at build time.
 */
const metadataModules = import.meta.glob<{ [key: string]: ComponentMeta }>(
  '@/components/ui/aura/*/*.metadata.ts',
  { eager: false }
);

/**
 * Get component metadata from the component's metadata file.
 *
 * Metadata is loaded from the component's folder structure
 * (e.g., button/button.metadata.ts).
 */
export async function getComponentMeta(
  slug: string
): Promise<ComponentMeta | null> {
  const pascalCaseSlug = slugToPascalCase(slug);

  try {
    // Load from the folder structure with metadata file
    const metadataPath = `/src/components/ui/aura/${slug}/${slug}.metadata.ts`;
    const loader = metadataModules[metadataPath];
    if (loader) {
      const metadataModule = await loader();
      const meta = metadataModule[`${pascalCaseSlug}Metadata`];
      if (meta) {
        return meta;
      }
    }
  } catch (error) {
    console.warn(`Could not load metadata for ${slug}:`, error);
  }

  return null;
}
