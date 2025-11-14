import * as React from "react";

import { cn } from "@/lib/utils";
import { HelperText } from "./helper-text";

interface InputProps extends React.ComponentProps<"input"> {
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
          "border border-border p-1.75 w-[400px] rounded-md h-9.15 text-base leading-20 tracking-tightest text-muted-foreground dark:text-muted-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 filled:border-border filled:text-foreground focus:shadow-[0_0_0_2px_var(--ring)] aria-invalid:border-destructive-foreground focus-visible:shadow-none disabled:shadow-none disabled:bg-disabled disabled:border-disabled",
          className
        )}
        {...props}
      />

      {errorMessage && (
        <HelperText isError>{errorMessage}</HelperText>
      )}
    </>
  );
}

export { Input };
