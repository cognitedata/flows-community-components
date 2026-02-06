import { type ComponentProps, type ComponentRef, forwardRef } from "react";

import { cn } from "@/lib/utils";
import { Progress as ProgressPrimitive } from "@base-ui/react/progress";

const Progress = forwardRef<
  ComponentRef<typeof ProgressPrimitive.Root>,
  ProgressPrimitive.Root.Props & { max?: number }
>(({ className, value = 0, max = 100, "aria-label": ariaLabel, ...props }, ref) => {
  const safeValue = value ?? 0;
  const percentage = (safeValue * 100) / max;
  const defaultAriaLabel = `Progress: ${Math.round(percentage)}%`;

  return (
    <ProgressPrimitive.Root
      ref={ref}
      data-slot="progress"
      className={cn("w-full", className)}
      value={safeValue}
      max={max}
      aria-label={ariaLabel ?? defaultAriaLabel}
      {...props}
    >
      <ProgressPrimitive.Track
        data-slot="progress-track"
        className={cn(
          "bg-accent text-accent-foreground relative h-2 w-full overflow-hidden rounded-full",
          className
        )}
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className="bg-primary h-full transition-all"
          style={{ width: `${percentage}%` }}
        />
      </ProgressPrimitive.Track>
    </ProgressPrimitive.Root>
  );
});

Progress.displayName = "Progress";

export { Progress };
