import {
  type ComponentStatusType,
  getComponentStatusClasses,
  getStatusLabel,
  getStatusMessage,
} from "@/lib/component-status";
import {
  IconAlertCircle,
  IconBan,
  IconCircleCheck,
  IconClock,
  IconFlask,
  IconSparkles,
  IconStar,
} from "@tabler/icons-react";

interface ComponentStatusNotificationProps {
  status: ComponentStatusType;
}

const STATUS_ICONS: Record<ComponentStatusType, typeof IconCircleCheck> = {
  draft: IconAlertCircle,
  review: IconClock,
  done: IconCircleCheck,
  beta: IconFlask,
  production: IconCircleCheck,
  deprecated: IconBan,
  experimental: IconSparkles,
  new: IconStar,
};

export function ComponentStatusNotification({ status }: ComponentStatusNotificationProps) {
  const message = getStatusMessage(status);
  const classes = getComponentStatusClasses(status);
  const label = getStatusLabel(status);
  const Icon = STATUS_ICONS[status] || IconAlertCircle;

  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-md border text-sm font-medium ${classes}`}
    >
      <Icon className="h-4 w-4" />
      <span className="font-semibold">{label}</span>
      <span className="text-xs opacity-75">•</span>
      <span className="text-xs">{message}</span>
    </div>
  );
}
