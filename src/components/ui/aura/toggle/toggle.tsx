import * as TogglePrimitive from "@radix-ui/react-toggle";
import { type VariantProps, cva } from "class-variance-authority";
import { type ComponentProps, forwardRef } from "react";

import { cn } from "@/lib/utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border border-transparent text-sm font-medium transition-all cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring-shadow focus-visible:ring-2 aria-invalid:focus-visible:ring-ring-destructive-shadow aria-invalid:border-ring-destructive-foreground",
  {
    variants: {
      variant: {
        /**
         * Default toggle styling – used for normal, non-exclusive toggles.
         * Uses the `bg-toggled` token when pressed.
         */
        default:
          "bg-transparent text-muted-foreground hover:bg-accent data-[state=on]:bg-toggled data-[state=on]:text-toggled-foreground",
        /**
         * Exclusive toggle styling – used when only one toggle in a group
         * can be active at a time. Uses `bg-accent` / `text-muted-foreground`
         * by default and the primary color when pressed.
         */
        exclusive:
          "bg-transparent text-muted-foreground hover:bg-accent data-[state=on]:bg-primary data-[state=on]:text-primary-foreground",
        ghost:
          "bg-transparent hover:bg-accent hover:text-accent-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
      },
      size: {
        default: "h-9 p-2.5 min-w-9 rounded-md",
        sm: "h-7 p-1.5 min-w-7 text-xs rounded-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Toggle = forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  ComponentProps<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => {
  return (
    <TogglePrimitive.Root
      ref={ref}
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
});
Toggle.displayName = "Toggle";

// eslint-disable-next-line react-refresh/only-export-components
export { Toggle, toggleVariants };
