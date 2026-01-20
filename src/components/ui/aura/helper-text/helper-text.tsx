import { cloneElement, type HTMLAttributes, type ReactNode, type ReactElement } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { IconExclamationCircle } from "@tabler/icons-react";

const helperTextVariants = cva("flex flex-row justify-start items-start", {
  variants: {
    size: {
      xs: "gap-0.5 text-xs leading-3.5 tracking-tightest",
      sm: "gap-1 text-sm leading-4.5 tracking-tight",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

const helperTextIconVariants = cva("shrink-0", {
  variants: {
    size: {
      xs: "size-3.5",
      sm: "size-4",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

export interface HelperTextProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof helperTextVariants> {
  isError?: boolean;
  isSuccess?: boolean;
  icon?: ReactNode;
}

function HelperText({
  className,
  size = "sm",
  isError = false,
  isSuccess = false,
  icon,
  children,
  ...props
}: HelperTextProps) {
  const displayIcon = icon ?? (isError ? <IconExclamationCircle /> : null);

  const textColor = isError
    ? "text-destructive-foreground"
    : isSuccess
      ? "text-success-foreground"
      : "text-muted-foreground";

  const iconWithClasses = displayIcon
    ? cloneElement(displayIcon as ReactElement<{ className?: string }>, {
        className: cn(
          helperTextIconVariants({ size }),
          size === "sm" && "mt-0.25",
          textColor,
          (displayIcon as ReactElement<{ className?: string }>).props?.className
        ),
      })
    : null;

  return (
    <div className={cn(helperTextVariants({ size }), className)} {...props}>
      {iconWithClasses}
      <span className={textColor}>{children}</span>
    </div>
  );
}

export { HelperText };
