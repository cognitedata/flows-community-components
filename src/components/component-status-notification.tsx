import { AlertCircle, CheckCircle } from "lucide-react";
import { 
  getComponentStatus, 
  getComponentStatusMessage, 
  getComponentStatusClasses,
  type ComponentStatus 
} from "@/lib/component-status";

interface ComponentStatusNotificationProps {
  componentSlug: string;
}

export function ComponentStatusNotification({ componentSlug }: ComponentStatusNotificationProps) {
  const status = getComponentStatus(componentSlug);
  const message = getComponentStatusMessage(componentSlug);
  const classes = getComponentStatusClasses(status);
  
  const Icon = status === 'production' ? CheckCircle : AlertCircle;
  const statusText = status === 'production' ? 'Production Ready' : 'Draft';
  
  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-md border text-sm font-medium ${classes}`}>
      <Icon className="h-4 w-4" />
      <span className="font-semibold">{statusText}</span>
      <span className="text-xs opacity-75">•</span>
      <span className="text-xs">{message}</span>
    </div>
  );
}
