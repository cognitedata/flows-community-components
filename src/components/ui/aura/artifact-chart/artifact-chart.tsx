import { type ComponentPropsWithoutRef, type ComponentRef, forwardRef } from "react";

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
const ArtifactChart = forwardRef<ComponentRef<typeof Card>, ComponentPropsWithoutRef<typeof Card>>(
  ({ className, ...props }, ref) => {
    return <Card data-slot="artifact-chart" ref={ref} className={className} {...props} />;
  }
);
ArtifactChart.displayName = "ArtifactChart";

const ArtifactChartHeader = forwardRef<
  ComponentRef<typeof CardHeader>,
  ComponentPropsWithoutRef<typeof CardHeader>
>(({ className, ...props }, ref) => {
  return (
    <CardHeader
      data-slot="artifact-chart-header"
      ref={ref}
      className={cn("gap-1", className)}
      {...props}
    />
  );
});
ArtifactChartHeader.displayName = "ArtifactChartHeader";

const ArtifactChartTitle = forwardRef<
  ComponentRef<typeof CardTitle>,
  ComponentPropsWithoutRef<typeof CardTitle>
>(({ className, ...props }, ref) => {
  return (
    <CardTitle
      data-slot="artifact-chart-title"
      ref={ref}
      className={cn("text-base font-medium tracking-tighter", className)}
      {...props}
    />
  );
});
ArtifactChartTitle.displayName = "ArtifactChartTitle";

const ArtifactChartDescription = forwardRef<
  ComponentRef<typeof CardDescription>,
  ComponentPropsWithoutRef<typeof CardDescription>
>(({ className, ...props }, ref) => {
  return (
    <CardDescription
      data-slot="artifact-chart-description"
      ref={ref}
      className={cn(
        "text-sm font-normal leading-4.5 tracking-tight text-muted-foreground",
        className
      )}
      {...props}
    />
  );
});
ArtifactChartDescription.displayName = "ArtifactChartDescription";

const ArtifactChartContent = forwardRef<
  ComponentRef<typeof CardContent>,
  ComponentPropsWithoutRef<typeof CardContent>
>(({ className, ...props }, ref) => {
  return (
    <CardContent
      data-slot="artifact-chart-content"
      ref={ref}
      className={cn("flex w-full flex-col items-center gap-4 overflow-visible py-5", className)}
      {...props}
    />
  );
});
ArtifactChartContent.displayName = "ArtifactChartContent";

const ArtifactChartFooter = forwardRef<
  ComponentRef<typeof CardFooter>,
  ComponentPropsWithoutRef<typeof CardFooter>
>(({ className, ...props }, ref) => {
  return (
    <CardFooter data-slot="artifact-chart-footer" ref={ref} className={className} {...props} />
  );
});
ArtifactChartFooter.displayName = "ArtifactChartFooter";

export {
  ArtifactChart,
  ArtifactChartContent,
  ArtifactChartDescription,
  ArtifactChartFooter,
  ArtifactChartHeader,
  ArtifactChartTitle,
};
