import { type ChangeEvent, type ComponentProps, forwardRef, useState } from "react";

import { HelperText } from "@/components/ui/aura/helper-text";
import {
  cn,
  disabledState,
  filledState,
  focusState,
  formElementBase,
  hoverState,
  invalidState,
} from "@/lib/utils";

interface TextareaProps extends ComponentProps<"textarea"> {
  maxChars?: number;
  errorMessage?: string;
  overLimitMessage?: string;
  charactersLeftMessage?: (remaining: number) => string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      maxChars,
      errorMessage,
      overLimitMessage = "Too many characters",
      charactersLeftMessage = (remaining) => `${remaining} characters left`,
      ...props
    },
    ref
  ) => {
    const [charCount, setCharCount] = useState(() => {
      const initialValue = props.defaultValue || props.value || "";
      return String(initialValue).length;
    });

    const isOverLimit = maxChars !== undefined && charCount > maxChars;
    const isInvalid = !!errorMessage || isOverLimit;

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      if (props.onChange) {
        props.onChange(e);
      }
    };

    return (
      <>
        <textarea
          ref={ref}
          data-slot="textarea"
          aria-invalid={isInvalid ? true : undefined}
          className={cn(
            "flex field-sizing-content min-h-16 w-full placeholder:text-muted-foreground transition-[color,box-shadow]",
            formElementBase,
            hoverState,
            filledState,
            focusState,
            invalidState,
            disabledState,
            "dark:bg-input/30",
            className
          )}
          onChange={handleChange}
          {...props}
        />
        {errorMessage && <HelperText isError>{errorMessage}</HelperText>}
        {maxChars !== undefined && (
          <HelperText isError={isOverLimit}>
            {isOverLimit ? overLimitMessage : charactersLeftMessage(maxChars - charCount)}
          </HelperText>
        )}
      </>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
