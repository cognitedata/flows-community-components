import * as ProgressPrimitive from "@radix-ui/react-progress";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

function Progress({
  className,
  value,
  "aria-label": ariaLabel,
  ...props
}: ComponentProps<typeof ProgressPrimitive.Root>) {
  const defaultAriaLabel = `Progress: ${value ?? 0}%`;

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-accent text-accent-foreground relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      value={value}
      aria-label={ariaLabel ?? defaultAriaLabel}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-primary h-full w-full flex-1 transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
