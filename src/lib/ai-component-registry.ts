import type { ComponentStatusType } from "./component-status-config";
import { slugToPascalCase } from "./utils";

/**
 * AI Component metadata interface
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
 * Pre-load all metadata modules using Vite's glob import.
 */
const metadataModules = import.meta.glob<{ [key: string]: AIComponentMeta }>(
  ["@/components/ui/core/*/*.metadata.ts", "@/components/ui/lab/*/*.metadata.ts"],
  { eager: false }
);

/**
 * Gets AI component metadata from the component's metadata file.
 * Metadata is loaded from the component's folder structure
 * (e.g., message/message.metadata.ts).
 */
export async function getAIComponentMeta(slug: string): Promise<AIComponentMeta | null> {
  const pascalCaseSlug = slugToPascalCase(slug);

  try {
    // Try core directory first, then lab directory
    for (const dir of ["core", "lab"]) {
      const metadataPath = `/src/components/ui/${dir}/${slug}/${slug}.metadata.ts`;
      const loader = metadataModules[metadataPath];
      if (loader) {
        const metadataModule = await loader();
        const meta = metadataModule[`${pascalCaseSlug}Metadata`];
        if (meta) {
          return meta as AIComponentMeta;
        }
      }
    }
  } catch (error) {
    console.warn(`Could not load metadata for ${slug}:`, error);
  }

  return null;
}
