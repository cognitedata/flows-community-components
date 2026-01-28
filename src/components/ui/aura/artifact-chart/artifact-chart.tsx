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
 * within the content area using Recharts components.
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
      className={cn("flex w-full flex-col items-center gap-8", className)}
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

function ArtifactChartLegend({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="artifact-chart-legend"
      className={cn("flex flex-wrap items-center justify-center gap-2", className)}
      {...props}
    />
  );
}

function ArtifactChartLegendItem({
  className,
  color,
  children,
  ...props
}: ComponentProps<"div"> & { color?: string }) {
  return (
    <div
      data-slot="artifact-chart-legend-item"
      className={cn("flex items-center gap-1.5", className)}
      {...props}
    >
      <span
        className="h-2 w-2 rounded-sm"
        style={{
          backgroundColor: color,
        }}
      />
      <span className="text-sm leading-4 text-muted-foreground">{children}</span>
    </div>
  );
}

function ArtifactChartFooterTitle({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="artifact-chart-footer-title"
      className={cn("flex items-center gap-1 text-sm font-medium text-card-foreground", className)}
      {...props}
    />
  );
}

function ArtifactChartFooterDescription({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="artifact-chart-footer-description"
      className={cn("text-sm leading-4 text-muted-foreground", className)}
      {...props}
    />
  );
}

/**
 * Helper component for rendering a centered label inside a donut chart.
 * Position this absolutely within a relative container alongside the ChartContainer.
 */
function ArtifactChartCenterLabel({
  label,
  value,
  className,
  ...props
}: ComponentProps<"div"> & { label: string; value: string | number }) {
  return (
    <div
      data-slot="artifact-chart-center-label"
      className={cn("absolute inset-0 grid place-items-center text-center", className)}
      {...props}
    >
      <div>
        <span className="block text-sm font-normal text-muted-foreground">{label}</span>
        <span className="block text-2xl font-medium tabular-nums text-foreground">{value}</span>
      </div>
    </div>
  );
}

export {
  ArtifactChart,
  ArtifactChartHeader,
  ArtifactChartTitle,
  ArtifactChartDescription,
  ArtifactChartContent,
  ArtifactChartFooter,
  ArtifactChartLegend,
  ArtifactChartLegendItem,
  ArtifactChartFooterTitle,
  ArtifactChartFooterDescription,
  ArtifactChartCenterLabel,
};
