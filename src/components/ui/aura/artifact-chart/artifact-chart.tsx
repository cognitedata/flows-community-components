import type { ComponentProps } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/aura/card";
import { cn } from "@/lib/utils";

/**
 * Artifact Chart - A compositional card layout for displaying charts.
 *
 * This component provides the layout structure for chart artifacts.
 * The actual chart implementation (PieChart, BarChart, etc.) is composed
 * within the content area using Recharts components directly in your code.
 */
function ArtifactChart({ className, ...props }: ComponentProps<typeof Card>) {
  return <Card data-slot="artifact-chart" className={cn(className)} {...props} />;
}

function ArtifactChartHeader({ className, ...props }: ComponentProps<typeof CardHeader>) {
  return (
    <CardHeader data-slot="artifact-chart-header" className={cn("gap-1", className)} {...props} />
  );
}

function ArtifactChartTitle({ className, ...props }: ComponentProps<typeof CardTitle>) {
  return (
    <CardTitle
      data-slot="artifact-chart-title"
      className={cn("text-base font-medium tracking-tighter", className)}
      {...props}
    />
  );
}

function ArtifactChartDescription({ className, ...props }: ComponentProps<typeof CardDescription>) {
  return (
    <CardDescription
      data-slot="artifact-chart-description"
      className={cn(
        "text-sm font-normal leading-4.5 tracking-tight text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

function ArtifactChartContent({ className, ...props }: ComponentProps<typeof CardContent>) {
  return (
    <CardContent
      data-slot="artifact-chart-content"
      className={cn("flex w-full flex-col items-center gap-4 overflow-visible", className)}
      {...props}
    />
  );
}

function ArtifactChartFooter({ className, ...props }: ComponentProps<typeof CardFooter>) {
  return (
    <CardFooter
      data-slot="artifact-chart-footer"
      className={cn("flex flex-col items-start gap-1 text-sm", className)}
      {...props}
    />
  );
}

export {
  ArtifactChart,
  ArtifactChartContent,
  ArtifactChartDescription,
  ArtifactChartFooter,
  ArtifactChartHeader,
  ArtifactChartTitle,
};
