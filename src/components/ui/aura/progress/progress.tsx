import * as ProgressPrimitive from "@radix-ui/react-progress";
import { type ComponentProps, forwardRef } from "react";

import { cn } from "@/lib/utils";

const Progress = forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ComponentProps<typeof ProgressPrimitive.Root> & { max?: number }
>(({ className, value = 0, max = 100, "aria-label": ariaLabel, ...props }, ref) => {
  const percentage = (value * 100) / max;
  const defaultAriaLabel = `Progress: ${Math.round(percentage)}%`;

  return (
    <ProgressPrimitive.Root
      ref={ref}
      data-slot="progress"
      className={cn(
        "bg-accent text-accent-foreground relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      value={value}
      max={max}
      aria-label={ariaLabel ?? defaultAriaLabel}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-primary h-full w-full flex-1 transition-all"
        style={{ transform: `translateX(-${100 - percentage}%)` }}
      />
    </ProgressPrimitive.Root>
  );
});

Progress.displayName = "Progress";

export { Progress };
