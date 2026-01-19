import type { ComponentStatusType } from './component-status-config';

/**
 * AI Component metadata interface
 * Matches the structure of component-examples/types.ts ComponentMeta
 */
export interface AIComponentMeta {
  name: string;
  description: string;
  /** Component status - defaults to 'draft' if not specified */
  status?: ComponentStatusType;
  llmUsage?: string;
  importPath: string;
  apiReference?: {
    props: Array<{
      name: string;
      type: string;
      default?: string;
      required?: boolean;
      description: string;
    }>;
  };
  relatedComponents?: string[];
  notes?: string[];
}

/**
 * Gets AI component metadata from the examples file
 * This is the single source of truth for AI component information
 */
export async function getAIComponentMeta(
  slug: string
): Promise<AIComponentMeta | null> {
  try {
    // Convert slug to camelCase for the export name (e.g., "prompt-input" -> "promptInput")
    const camelCaseSlug = slug.replace(/-([a-z])/g, (_, letter) =>
      letter.toUpperCase()
    );
    const examplesModule = await import(`./ai-examples/${slug}.examples`);
    const meta = examplesModule[`${camelCaseSlug}Meta`];

    return meta || null;
  } catch (error) {
    console.warn(`Could not load metadata for ${slug}:`, error);
    return null;
  }
}
