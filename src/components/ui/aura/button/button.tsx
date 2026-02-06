import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { type VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";

import { cn, focusRing, focusRingDestructive } from "@/lib/utils";

const buttonVariants = cva(
  `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border border-transparent text-sm font-medium transition-all cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 ${focusRing} aria-invalid:focus-visible:shadow-focus-ring-destructive`,
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary-hover dark:hover:bg-primary-hover",
        destructive: `bg-destructive text-destructive-foreground hover:bg-destructive-hover dark:hover:bg-destructive-hover ${focusRingDestructive} dark:bg-destructive/60`,
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary-hover dark:hover:bg-secondary-hover",
        outline:
          "border border-border bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:hover:bg-input/50 dark:border-border",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-foreground-link underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-3 py-2 has-[>svg]:px-3",
        sm: "h-7 rounded-sm gap-1.5 px-2 has-[>svg]:px-2",
        lg: "h-10 px-4 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-7",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ButtonProps = ButtonPrimitive.Props & VariantProps<typeof buttonVariants>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, render, nativeButton, ...props }, ref) => (
    <ButtonPrimitive
      ref={ref}
      data-slot="button"
      render={render}
      nativeButton={nativeButton ?? (render ? false : undefined)}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </ButtonPrimitive>
  )
);

Button.displayName = "Button";

export { Button, buttonVariants };
