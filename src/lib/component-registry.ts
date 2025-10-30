import { type ComponentMeta } from "./component-examples/types";

/**
 * Gets component metadata from the examples file
 * This is the single source of truth for component information
 */
export async function getComponentMeta(slug: string): Promise<ComponentMeta | null> {
  try {
    // Convert slug to camelCase for the export name (e.g., "alert-dialog" -> "alertDialog")
    const camelCaseSlug = slug.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
    const examplesModule = await import(`./component-examples/${slug}.examples`);
    const meta = examplesModule[`${camelCaseSlug}Meta`];
    
    return meta || null;
  } catch (error) {
    console.warn(`Could not load metadata for ${slug}:`, error);
    return null;
  }
}
