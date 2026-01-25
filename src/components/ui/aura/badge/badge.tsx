import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center align-middle justify-center rounded-sm border text-sm font-medium w-fit whitespace-nowrap shrink-0 gap-1 [&>svg]:pointer-events-none outline-none focus-visible:border-ring focus-visible:ring-ring-shadow focus-visible:ring aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden leading-4.5",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        fjord:
          "border-transparent bg-decorative-background-fjord text-decorative-foreground-fjord",
        nordic:
          "border-transparent bg-decorative-background-nordic text-decorative-foreground-nordic",
        aurora:
          "border-transparent bg-decorative-background-aurora text-decorative-foreground-aurora",
        sky: "border-transparent bg-decorative-background-sky text-decorative-foreground-sky",
        dusk: "border-transparent bg-decorative-background-dusk text-decorative-foreground-dusk",
        orange:
          "border-transparent bg-decorative-background-orange text-decorative-foreground-orange",
        gray: "border-transparent bg-decorative-background-gray text-decorative-foreground-gray",
        mountain:
          "border-transparent bg-decorative-background-mountain text-decorative-foreground-mountain",
        secondary: "border-transparent bg-secondary text-secondary-foreground ",
        error: "border-transparent bg-destructive text-destructive-foreground",
        warning: "border-transparent bg-warning text-warning-foreground",
        success: "border-transparent bg-success text-success-foreground",
        inProgress: "border-transparent bg-neutral text-neutral-foreground",
        archived: "border-transparent bg-undefined text-undefined-foreground",
        closable:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary-hover cursor-pointer",
      },
      size: {
        default: "px-1",
        icon: "px-1.5 py-1 rounded-md",
      },
      outline: {
        true: "border-current px-0.75",
      },
      background: {
        false: "bg-transparent",
      },
      dot: {
        true: "rounded-full",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
      outline: false,
      background: true,
      dot: false,
    },
  },
);

/**
 * A versatile badge component for labels, status indicators, and tags.
 * Supports multiple colour variants, outline/background styles, and dot indicators.
 */
function Badge({
  className,
  variant,
  size,
  outline,
  dot,
  background,
  urgent = false,
  asChild = false,
  children,
  ...props
}: ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
    urgent?: boolean;
  }) {
  const Comp = asChild ? Slot : "span";
  const isEmpty = !children;

  return (
    <Comp
      data-slot="badge"
      className={cn(
        badgeVariants({ variant, size, background }),
        outline && "border-current px-0.75",
        dot && "rounded-full",
        dot && isEmpty && "size-2 p-0 border-0",
        dot && isEmpty && urgent && "bg-destructive-foreground",
        dot && isEmpty && !urgent && "bg-neutral-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export { Badge, badgeVariants };
