import { type ComponentPropsWithoutRef, forwardRef } from "react";

import { cn } from "@/lib/utils";

const Label = forwardRef<HTMLLabelElement, ComponentPropsWithoutRef<"label">>(
  ({ className, ...props }, ref) => {
    return (
      // biome-ignore lint/a11y/noLabelWithoutControl: This is a reusable label primitive; consumers provide `htmlFor` or wrap a control.
      <label
        ref={ref}
        data-slot="label"
        className={cn(
          "flex items-center text-muted-foreground dark:text-muted-foreground text-sm font-medium leading-4.5 pb-1 select-none group-data-[disabled=true]:disabled-foreground group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);

Label.displayName = "Label";

export { Label };
