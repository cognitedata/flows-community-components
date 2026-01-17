import fs from 'fs';
import path from 'path';

export type AIComponentStatus = 'draft' | 'production';

/**
 * Determines if an AI component is in draft or production status.
 *
 * For AI elements, all components are currently in draft status
 * as they're in the ai-elements directory and under development.
 *
 * @param componentSlug - The component slug (e.g., 'message', 'conversation')
 * @returns AIComponentStatus indicating whether the component is draft or production-ready
 */
export function getAIComponentStatus(componentSlug: string): AIComponentStatus {
  const aiElementPath = path.join(
    process.cwd(),
    'src',
    'components',
    'ai-elements',
    `${componentSlug}.tsx`
  );

  // Check if component exists
  const hasFile = fs.existsSync(aiElementPath);

  // Currently all AI elements are in draft status
  // In the future, we can add logic to check for production-ready components
  if (hasFile) {
    return 'draft';
  }

  return 'draft';
}

/**
 * Gets a human-readable status message for an AI component
 */
export function getAIComponentStatusMessage(componentSlug: string): string {
  const status = getAIComponentStatus(componentSlug);

  switch (status) {
    case 'draft':
      return 'This AI element is currently in draft status and may change as we refine the AI component library.';
    case 'production':
      return 'This AI element is production-ready and stable for use.';
    default:
      return 'Component status unknown.';
  }
}

/**
 * Gets styling classes for the status badge
 */
export function getAIComponentStatusClasses(status: AIComponentStatus): string {
  switch (status) {
    case 'draft':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800';
    case 'production':
      return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800';
  }
}
