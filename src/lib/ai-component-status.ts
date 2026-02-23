/**
 * AI Component Status
 *
 * @deprecated This module is deprecated. Use the unified status system from
 * component-status.ts and component-status-config.ts instead.
 *
 * Status is now defined in each component's metadata file.
 */

import {
  type ComponentStatusType,
  getComponentStatusClasses,
  getStatusMessage,
} from './component-status';

// Re-export types for backward compatibility
export type AIComponentStatus = ComponentStatusType;

/**
 * @deprecated Status is now defined in component metadata files.
 * Use the status field from AIComponentMeta instead.
 */

export function getAIComponentStatus(
  _componentSlug: string
): ComponentStatusType {
  // Status is now in metadata - this is kept for backward compatibility
  return 'draft';
}

/**
 * @deprecated Use getStatusMessage from component-status.ts instead.
 */

export function getAIComponentStatusMessage(_componentSlug: string): string {
  return getStatusMessage('draft');
}

/**
 * @deprecated Use getComponentStatusClasses from component-status.ts instead.
 */
export function getAIComponentStatusClasses(status: AIComponentStatus): string {
  return getComponentStatusClasses(status);
}
