import { type VariantProps, cva } from "class-variance-authority";
import { type ComponentProps, type ComponentRef, forwardRef } from "react";

import { Button } from "@/components/ui/aura/button";
import { Input } from "@/components/ui/aura/input";
import { Textarea } from "@/components/ui/aura/textarea";
import { cn } from "@/lib/utils";

const InputGroup = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="input-group"
        role="group"
        className={cn(
          "group/input-group bg-background border-input dark:bg-input/30 relative flex w-full items-center rounded-md border shadow-xs transition-[color,box-shadow] outline-none",
          "h-9 min-w-0 has-[>textarea]:h-auto",
          "has-[>[data-align=inline-start]]:[&>input]:pl-2 has-[>[data-align=inline-start]]:[&>input]:rounded-l-none has-[>[data-align=inline-start]]:[&>textarea]:rounded-l-none",
          "has-[>[data-align=inline-end]]:[&>input]:pr-2 has-[>[data-align=inline-end]]:[&>input]:rounded-r-none has-[>[data-align=inline-end]]:[&>textarea]:rounded-r-none",
          "has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-3",
          "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3",
          "has-[[data-slot=input-group-control]:focus-visible]:shadow-focus-ring has-[[data-slot=input-group-control]:focus-visible]:border-transparent",
          "has-[[data-slot=input-group-control][aria-invalid=true]]:shadow-focus-ring-destructive has-[[data-slot=input-group-control][aria-invalid=true]]:border-transparent",
          "has-[[data-slot=input-group-control]:read-only]:border-transparent has-[[data-slot=input-group-control]:read-only]:shadow-none hover:has-[[data-slot=input-group-control]:read-only]:border-transparent",
          className
        )}
        {...props}
      />
    );
  }
);
InputGroup.displayName = "InputGroup";

const inputGroupAddonVariants = cva(
  "text-muted-foreground flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium select-none [&>svg:not([class*='size-'])]:size-4 [&>kbd]:rounded-[calc(var(--radius)-5px)] group-data-[disabled=true]/input-group:opacity-50",
  {
    variants: {
      align: {
        "inline-start": "order-first pl-3 has-[>button]:ml-[-0.45rem] has-[>kbd]:ml-[-0.35rem]",
        "inline-end": "order-last pr-3 has-[>button]:mr-[-0.45rem] has-[>kbd]:mr-[-0.35rem]",
        "block-start":
          "order-first w-full justify-start px-3 pt-3 [.border-b]:pb-3 group-has-[>input]/input-group:pt-2.5",
        "block-end":
          "order-last w-full justify-start px-3 pb-3 [.border-t]:pt-3 group-has-[>input]/input-group:pb-2.5",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
);

const InputGroupAddon = forwardRef<
  HTMLDivElement,
  ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>
>(({ className, align = "inline-start", ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          return;
        }
        e.currentTarget.parentElement?.querySelector("input")?.focus();
      }}
      {...props}
    />
  );
});
InputGroupAddon.displayName = "InputGroupAddon";

const inputGroupButtonVariants = cva("text-sm shadow-none flex gap-2 items-center", {
  variants: {
    size: {
      xs: "h-6 gap-1 px-2 rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-3.5 has-[>svg]:px-2",
      sm: "h-7 px-2.5 gap-1.5 rounded-md has-[>svg]:px-2.5",
      "icon-xs": "size-6 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0",
      "icon-sm": "size-7 p-0 has-[>svg]:p-0",
    },
  },
  defaultVariants: {
    size: "xs",
  },
});

const InputGroupButton = forwardRef<
  ComponentRef<typeof Button>,
  Omit<ComponentProps<typeof Button>, "size"> & VariantProps<typeof inputGroupButtonVariants>
>(({ className, type = "button", variant = "ghost", size = "xs", ...props }, ref) => {
  return (
    <Button
      ref={ref}
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  );
});
InputGroupButton.displayName = "InputGroupButton";

const InputGroupText = forwardRef<HTMLSpanElement, ComponentProps<"span">>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "text-muted-foreground flex items-center gap-2 text-sm [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
          className
        )}
        {...props}
      />
    );
  }
);
InputGroupText.displayName = "InputGroupText";

const InputGroupInput = forwardRef<HTMLInputElement, ComponentProps<"input">>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        data-slot="input-group-control"
        className={cn(
          "flex-1 rounded-md border-0 bg-transparent shadow-none hover:bg-transparent hover:text-current dark:bg-transparent",
          "focus-visible:shadow-none focus-visible:border-transparent",
          "aria-invalid:focus-visible:shadow-none aria-invalid:focus-visible:border-transparent",
          className
        )}
        {...props}
      />
    );
  }
);
InputGroupInput.displayName = "InputGroupInput";

const InputGroupTextarea = forwardRef<HTMLTextAreaElement, ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <Textarea
        ref={ref}
        data-slot="input-group-control"
        className={cn(
          "flex-1 resize-none rounded-md border-0 bg-transparent py-3 shadow-none focus-visible:shadow-none focus-visible:border-transparent aria-invalid:focus-visible:shadow-none aria-invalid:focus-visible:border-transparent dark:bg-transparent hover:bg-transparent hover:text-current",
          className
        )}
        {...props}
      />
    );
  }
);
InputGroupTextarea.displayName = "InputGroupTextarea";

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
};
