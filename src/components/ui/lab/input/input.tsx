import { type ComponentProps, forwardRef } from "react";

import {
  cn,
  disabledState,
  filledState,
  focusState,
  formElementBase,
  hoverState,
  invalidState,
} from "@/lib/utils";
import { HelperText } from "@cognite/aura-lab/helper-text";

interface InputProps extends ComponentProps<"input"> {
  errorMessage?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, errorMessage, ...props }, ref) => {
    return (
      <>
        <input
          ref={ref}
          type={type}
          data-slot="input"
          aria-invalid={errorMessage ? true : undefined}
          className={cn(
            "w-full",
            formElementBase,
            hoverState,
            filledState,
            focusState,
            invalidState,
            disabledState,
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
