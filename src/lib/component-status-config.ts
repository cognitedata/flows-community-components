/**
 * Component Status Configuration
 *
 * Defines the available status types and their visual styling.
 * Status is now defined per-component in each component's metadata file.
 */

export type ComponentStatusType =
  | 'draft'
  | 'review'
  | 'done'
  | 'beta'
  | 'production'
  | 'deprecated'
  | 'experimental'
  | 'new';

export interface StatusConfig {
  label: string;
  color: string; // hex color for light mode text
  colorDark: string; // hex color for dark mode text
  bgColor: string; // background hex for light mode
  bgColorDark: string; // background hex for dark mode
  borderColor: string; // border hex for light mode
  borderColorDark: string; // border hex for dark mode
}

/**
 * Status configuration with colors for each status type.
 * Colors are designed to work in both light and dark modes.
 */
export const STATUS_CONFIG: Record<ComponentStatusType, StatusConfig> = {
  draft: {
    label: 'Draft',
    color: '#854D0E',
    colorDark: '#FACC15',
    bgColor: '#FEF9C3',
    bgColorDark: 'rgba(234, 179, 8, 0.2)',
    borderColor: '#FDE047',
    borderColorDark: '#854D0E',
  },
  review: {
    label: 'Review',
    color: '#C2410C',
    colorDark: '#FB923C',
    bgColor: '#FFEDD5',
    bgColorDark: 'rgba(249, 115, 22, 0.2)',
    borderColor: '#FDBA74',
    borderColorDark: '#C2410C',
  },
  done: {
    label: 'Done',
    color: '#0F766E',
    colorDark: '#2DD4BF',
    bgColor: '#CCFBF1',
    bgColorDark: 'rgba(20, 184, 166, 0.2)',
    borderColor: '#5EEAD4',
    borderColorDark: '#0F766E',
  },
  beta: {
    label: 'Beta',
    color: '#1D4ED8',
    colorDark: '#60A5FA',
    bgColor: '#DBEAFE',
    bgColorDark: 'rgba(59, 130, 246, 0.2)',
    borderColor: '#93C5FD',
    borderColorDark: '#1D4ED8',
  },
  production: {
    label: 'Production',
    color: '#166534',
    colorDark: '#4ADE80',
    bgColor: '#DCFCE7',
    bgColorDark: 'rgba(34, 197, 94, 0.2)',
    borderColor: '#86EFAC',
    borderColorDark: '#166534',
  },
  deprecated: {
    label: 'Deprecated',
    color: '#B91C1C',
    colorDark: '#F87171',
    bgColor: '#FEE2E2',
    bgColorDark: 'rgba(239, 68, 68, 0.2)',
    borderColor: '#FCA5A5',
    borderColorDark: '#B91C1C',
  },
  experimental: {
    label: 'Experimental',
    color: '#7E22CE',
    colorDark: '#C084FC',
    bgColor: '#F3E8FF',
    bgColorDark: 'rgba(168, 85, 247, 0.2)',
    borderColor: '#D8B4FE',
    borderColorDark: '#7E22CE',
  },
  new: {
    label: 'New',
    color: '#0E7490',
    colorDark: '#22D3EE',
    bgColor: '#CFFAFE',
    bgColorDark: 'rgba(6, 182, 212, 0.2)',
    borderColor: '#67E8F9',
    borderColorDark: '#0E7490',
  },
};

/**
 * Get the configuration for a specific status type.
 * Falls back to 'draft' if status is not recognized.
 */
export function getStatusConfig(status: ComponentStatusType): StatusConfig {
  return STATUS_CONFIG[status] || STATUS_CONFIG.draft;
}

/**
 * Get inline styles for a status badge that work in both light and dark modes.
 * Uses CSS custom properties for dark mode support.
 */
export function getStatusStyles(
  status: ComponentStatusType,
  isDark: boolean = false
): React.CSSProperties {
  const config = getStatusConfig(status);
  return {
    color: isDark ? config.colorDark : config.color,
    backgroundColor: isDark ? config.bgColorDark : config.bgColor,
    borderColor: isDark ? config.borderColorDark : config.borderColor,
  };
}
