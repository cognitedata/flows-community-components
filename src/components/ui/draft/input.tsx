import * as React from "react";

import { cn } from "@/lib/utils";
import { IconExclamationCircle } from "@tabler/icons-react";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  const dataInvalid = (props as unknown as { [key: string]: unknown })[
    "data-invalid"
  ];
  const isInvalid = dataInvalid === true || dataInvalid === "true";
  return (
    <>
      <input
        type={type}
        data-slot="input"
        className={cn(
          "border border-border p-1 py-2 w-[400px] rounded-md h-9.15 text-base text-muted-foreground dark:text-muted-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 filled:border-border filled:text-foreground focus:shadow-[0_0_0_2px_var(--ring)] data-[invalid=true]:border-destructive-foreground focus-visible:shadow-none disabled:shadow-none disabled:bg-disabled disabled:border-disabled",
          className
        )}
        {...props}
      />

      {isInvalid && (
        <div className="flex flex-row gap-1 justify-start items-center">
          <IconExclamationCircle className="text-destructive-foreground text-sm size-4" />
          <span className="text-destructive-foreground text-sm">
            Error message
          </span>
        </div>
      )}
    </>
  );
}

export { Input };
