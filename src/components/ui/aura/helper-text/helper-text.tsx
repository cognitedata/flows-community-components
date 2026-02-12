import {
  type ComponentRef,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  cloneElement,
  forwardRef,
} from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { IconExclamationCircle } from "@tabler/icons-react";

import { cn } from "@/lib/utils";

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

interface HelperTextProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof helperTextVariants> {
  isError?: boolean;
  isSuccess?: boolean;
  icon?: ReactNode;
}

const HelperText = forwardRef<ComponentRef<"div">, HelperTextProps>(
  (
    { className, size = "sm", isError = false, isSuccess = false, icon, children, ...props },
    ref
  ) => {
    const displayIcon = icon ?? (isError ? <IconExclamationCircle /> : null);
    const iconElement = displayIcon as ReactElement<{ className?: string }> | null;

    const textColor = isError
      ? "text-destructive-foreground"
      : isSuccess
        ? "text-success-foreground"
        : "text-muted-foreground";

    const iconWithClasses = iconElement
      ? cloneElement(iconElement, {
          className: cn(
            helperTextIconVariants({ size }),
            size === "sm" && "mt-0.25",
            textColor,
            iconElement.props?.className
          ),
        })
      : null;

    return (
      <div
        ref={ref}
        data-slot="helper-text"
        className={cn(helperTextVariants({ size }), className)}
        {...props}
      >
        {iconWithClasses}
        <span className={textColor}>{children}</span>
      </div>
    );
  }
);
HelperText.displayName = "HelperText";

export { HelperText };
