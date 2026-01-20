import type { ComponentProps } from "react";

import { HelperText } from "@/components/ui/aura/helper-text";
import { cn } from "@/lib/utils";

interface InputProps extends ComponentProps<"input"> {
  errorMessage?: string;
}

function Input({ className, type, errorMessage, ...props }: InputProps) {
  const isInvalid = !!errorMessage;

  return (
    <>
      <input
        type={type}
        data-slot="input"
        aria-invalid={isInvalid ? true : undefined}
        className={cn(
          "border border-border p-2 w-100 rounded-md h-9 text-base leading-5 tracking-tightest text-muted-foreground dark:text-muted-foreground hover:bg-accent hover:text-accent-foreground outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-disabled disabled:border-disabled filled:border-border filled:text-foreground focus-visible:border-ring focus-visible:ring-ring-shadow focus-visible:ring-2 aria-invalid:border-destructive-foreground aria-invalid:focus-visible:ring-ring-destructive-shadow",
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

export { Input };
