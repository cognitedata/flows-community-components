import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { arch } from "os";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-sm font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        fjord:
          "border-transparent bg-fjord-500 text-fjord-500-foreground [a&]:hover:bg-fjord-500/90",
        nordic:
          "border-transparent bg-nordic-500 text-nordic-500-foreground [a&]:hover:bg-nordic-500/90",
        aurora:
          "border-transparent bg-aurora-500 text-aurora-500-foreground [a&]:hover:bg-aurora-500/90",
        sky: "border-transparent bg-sky-500 text-sky-500-foreground [a&]:hover:bg-sky-500/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        error:
          "border-transparent bg-destructive text-destructive-foreground",
        warning:
          "border-transparent bg-warning text-warning-foreground",
        success:
          "border-transparentbg-success text-success-foreground",
        inProgress:
          "border-transparentbg-neutral text-neutral-foreground",
        archived:
          "border-transparentbg-undefined text-undefined-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
