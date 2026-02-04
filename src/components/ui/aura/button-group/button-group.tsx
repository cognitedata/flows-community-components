import { type ComponentProps, type ComponentRef, forwardRef } from "react";

import { Slot } from "@radix-ui/react-slot";
import type { VariantProps } from "class-variance-authority";

import { Separator } from "@/components/ui/aura/separator";
import { cn } from "@/lib/utils";
import { buttonGroupVariants } from "./button-group.variants";

type ButtonGroupProps = ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants>;

const ButtonGroup = forwardRef<ComponentRef<"div">, ButtonGroupProps>(
  ({ className, orientation, ...props }, ref) => (
    <div
      ref={ref}
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}
    />
  )
);
ButtonGroup.displayName = "ButtonGroup";

type ButtonGroupTextProps = ComponentProps<"div"> & {
  asChild?: boolean;
};

const ButtonGroupText = forwardRef<ComponentRef<"div">, ButtonGroupTextProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";

    return (
      <Comp
        ref={ref}
        data-slot="button-group-text"
        className={cn(
          "bg-muted flex items-center gap-2 rounded-md border px-4 text-sm font-medium shadow-xs [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
          className
        )}
        {...props}
      />
    );
  }
);
ButtonGroupText.displayName = "ButtonGroupText";

type ButtonGroupSeparatorProps = ComponentProps<typeof Separator>;

const ButtonGroupSeparator = forwardRef<ComponentRef<typeof Separator>, ButtonGroupSeparatorProps>(
  ({ className, orientation = "vertical", ...props }, ref) => (
    <Separator
      ref={ref}
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn(
        "bg-input relative m-0 self-stretch data-[orientation=vertical]:h-auto",
        className
      )}
      {...props}
    />
  )
);
ButtonGroupSeparator.displayName = "ButtonGroupSeparator";

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText };
