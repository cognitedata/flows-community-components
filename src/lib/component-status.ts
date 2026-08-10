import {
  STATUS_CONFIG,
  type ComponentStatusType,
} from './component-status-config';

export type { ComponentStatusType };
export type ComponentStatus = ComponentStatusType;

export function getStatusLabel(status: ComponentStatusType): string {
  return STATUS_CONFIG[status]?.label || 'Unknown';
}
