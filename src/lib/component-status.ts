/**
 * Component Status Utilities
 *
 * This module provides utilities for working with component status.
 * Status is now defined in each component's metadata file and uses
 * the centralized status configuration for styling.
 *
 * @deprecated The getComponentStatus function is deprecated.
 * Status should be read from component metadata instead.
 */

import {
  type ComponentStatusType,
  STATUS_CONFIG,
  getStatusConfig,
} from "./component-status-config";

// Re-export types for backward compatibility
export type { ComponentStatusType };
export type ComponentStatus = ComponentStatusType;

/**
 * @deprecated Status is now defined in component metadata files.
 * This function returns 'draft' for all components.
 * Use the status field from ComponentMeta instead.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getComponentStatus(_componentSlug: string): ComponentStatusType {
  // Status is now in metadata - this is kept for backward compatibility
  // Always returns 'draft' as the safe default
  return "draft";
}

/**
 * Gets a human-readable status message for a given status type.
 */
export function getStatusMessage(status: ComponentStatusType): string {
  const config = getStatusConfig(status);

  switch (status) {
    case "draft":
      return "This component is currently in draft status and may change before production release.";
    case "planned":
      return "This component is planned and not yet implemented.";
    case "shadcn-ui":
      return "This component is from shadcn/ui and may be customized for Aura.";
    case "experimental":
      return "This component is experimental and may change significantly.";
    case "deprecated":
      return "This component is deprecated and will be removed in a future release.";
    case "in-progress-storybook":
      return "This component is in progress: Storybook stories are being added or updated.";
    case "in-progress-code-review":
      return "This component is in progress: code review is pending.";
    case "in-progress-chromatic":
      return "This component is in progress: Chromatic visual testing is pending.";
    case "in-progress-design-conformance":
      return "This component is in progress: design conformance review is pending.";
    case "ready-for-ga":
      return "This component is ready for general availability release.";
    case "stable":
      return "This component is stable and production-ready.";
    default:
      return `Component status: ${config.label}`;
  }
}

/**
 * @deprecated Use getStatusMessage instead.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getComponentStatusMessage(_componentSlug: string): string {
  return getStatusMessage("draft");
}

/**
 * Gets the label for a given status type.
 */
export function getStatusLabel(status: ComponentStatusType): string {
  return STATUS_CONFIG[status]?.label || "Unknown";
}

/**
 * Gets inline styles for a status badge.
 * Returns styles for both light and dark mode variants.
 */
export function getStatusBadgeStyles(status: ComponentStatusType): {
  light: React.CSSProperties;
  dark: React.CSSProperties;
} {
  const config = getStatusConfig(status);
  return {
    light: {
      color: config.color,
      backgroundColor: config.bgColor,
      borderColor: config.borderColor,
    },
    dark: {
      color: config.colorDark,
      backgroundColor: config.bgColorDark,
      borderColor: config.borderColorDark,
    },
  };
}

/**
 * @deprecated Use config-driven styles from component-status-config instead.
 */
export function getComponentStatusClasses(status: ComponentStatus): string {
  // Kept for backward compatibility, returns Tailwind classes
  switch (status) {
    case "draft":
      return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800";
    case "planned":
      return "bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-900/20 dark:text-slate-400 dark:border-slate-800";
    case "shadcn-ui":
      return "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-900/20 dark:text-slate-300 dark:border-slate-800";
    case "experimental":
      return "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800";
    case "deprecated":
      return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800";
    case "in-progress-storybook":
    case "in-progress-code-review":
    case "in-progress-chromatic":
    case "in-progress-design-conformance":
      return "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800";
    case "ready-for-ga":
      return "bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-900/20 dark:text-teal-400 dark:border-teal-800";
    case "stable":
      return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800";
  }
}
