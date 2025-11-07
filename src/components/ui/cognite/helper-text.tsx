import * as React from "react";

import { cn } from "@/lib/utils";
import { IconExclamationCircle } from "@tabler/icons-react";

export interface HelperTextProps extends React.HTMLAttributes<HTMLDivElement> {
  isError?: boolean;
}

function HelperText({ 
  className, 
  isError = false,
  children,
  ...props 
}: HelperTextProps) {
  return (
    <div 
      className={cn(
        "flex flex-row gap-1 justify-start items-center",
        className
      )}
      {...props}
    >
      {isError && (
        <IconExclamationCircle className="text-destructive-foreground text-sm size-4 flex-shrink-0" />
      )}
      <span className={cn(
        "text-sm leading-18 tracking-tight",
        isError ? "text-destructive-foreground" : "text-muted-foreground"
      )}>
        {children}
      </span>
    </div>
  );
}

export { HelperText };

