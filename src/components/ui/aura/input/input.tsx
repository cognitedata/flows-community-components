import { type ComponentProps, forwardRef } from "react";

import { HelperText } from "@/components/ui/aura/helper-text";
import {
  cn,
  disabledState,
  focusRing,
  focusRingDestructive,
  focusState,
  invalidFocusState,
  invalidState,
} from "@/lib/utils";

interface InputProps extends ComponentProps<"input"> {
  errorMessage?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, errorMessage, ...props }, ref) => {
    const isInvalid = !!errorMessage;

    return (
      <>
        <input
          ref={ref}
          type={type}
          data-slot="input"
          aria-invalid={isInvalid ? true : undefined}
          className={cn(
            // Base styles
            "border border-border bg-background p-1.75 w-100 rounded-md h-9.15 text-base leading-5 tracking-tightest text-muted-foreground",
            // Hover
            "hover:bg-accent hover:text-accent-foreground",
            // Filled
            "filled:bg-background filled:border-border filled:text-foreground",
            // States from utils
            focusState,
            invalidState,
            invalidFocusState,
            disabledState,
            isInvalid ? focusRingDestructive : focusRing,
            className
          )}
          {...props}
        />

        {errorMessage && (
          <HelperText className="pt-1" isError>
            {errorMessage}
          </HelperText>
        )}
      </>
    );
  }
);

Input.displayName = "Input";

export { Input };
