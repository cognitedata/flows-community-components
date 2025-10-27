import fs from 'fs';
import path from 'path';

export type ComponentStatus = 'draft' | 'production';

/**
 * Determines if a component is in draft or production status.
 * 
 * Draft: Component exists only in /draft directory (redirected via path mapping)
 * Production: Component has a dedicated file in /cognite directory
 * 
 * @param componentSlug - The component slug (e.g., 'button', 'accordion')
 * @returns ComponentStatus indicating whether the component is draft or production-ready
 */
export function getComponentStatus(componentSlug: string): ComponentStatus {
  const cognitePath = path.join(process.cwd(), 'src', 'components', 'ui', 'cognite', `${componentSlug}.tsx`);
  const draftPath = path.join(process.cwd(), 'src', 'components', 'ui', 'draft', `${componentSlug}.tsx`);
  
  // Check if component exists in cognite directory
  const hasCogniteFile = fs.existsSync(cognitePath);
  
  // Check if component exists in draft directory
  const hasDraftFile = fs.existsSync(draftPath);
  
  // If there's a cognite file, it's production-ready
  if (hasCogniteFile) {
    return 'production';
  }
  
  // If there's only a draft file (or neither), it's draft
  return 'draft';
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
