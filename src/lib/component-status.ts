import fs from 'fs';
import path from 'path';

export type ComponentStatus = 'draft' | 'production';

export type ComponentMetadata = {
  hash: string;
  status: ComponentStatus;
};

/**
 * Gets component metadata from the .metadata.ts file
 *
 * @param componentSlug - The component slug (e.g., 'button', 'accordion')
 * @returns ComponentMetadata or null if not found
 */
export async function getComponentMetadata(
  componentSlug: string
): Promise<ComponentMetadata | null> {
  try {
    const metadata = await import(
      `@/components/ui/cognite/${componentSlug}.metadata`
    );
    return metadata.metadata as ComponentMetadata;
  } catch {
    return null;
  }
}

/**
 * Determines if a component is in draft or production status by reading
 * the .metadata.ts file next to the component.
 *
 * @param componentSlug - The component slug (e.g., 'button', 'accordion')
 * @returns ComponentStatus indicating whether the component is draft or production-ready
 */
export function getComponentStatus(componentSlug: string): ComponentStatus {
  try {
    const metadataPath = path.join(
      process.cwd(),
      'src',
      'components',
      'ui',
      'cognite',
      `${componentSlug}.metadata.ts`
    );

    if (!fs.existsSync(metadataPath)) {
      return 'draft';
    }

    // Read and parse the metadata file content
    const content = fs.readFileSync(metadataPath, 'utf-8');
    const statusMatch = content.match(/status:\s*'(\w+)'/);

    if (statusMatch && statusMatch[1] === 'production') {
      return 'production';
    }

    return 'draft';
  } catch {
    // If metadata file doesn't exist or can't be read, default to draft
    return 'draft';
  }
}

/**
 * Gets a human-readable status message for a component
 */
export function getComponentStatusMessage(componentSlug: string): string {
  const status = getComponentStatus(componentSlug);

  switch (status) {
    case 'draft':
      return 'This component is currently in draft status and may change before production release.';
    case 'production':
      return 'This component is production-ready and stable for use.';
    default:
      return 'Component status unknown.';
  }
}

/**
 * Gets styling classes for the status badge
 */
export function getComponentStatusClasses(status: ComponentStatus): string {
  switch (status) {
    case 'draft':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800';
    case 'production':
      return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800';
  }
}
