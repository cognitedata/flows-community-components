import * as SelectPrimitive from "@radix-ui/react-select";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import {
  IconCheck,
  IconChevronDown,
  IconChevronUp,
  IconExclamationCircle,
} from "@tabler/icons-react";
import { type ComponentProps, type ReactNode, createContext, useContext, useMemo } from "react";

import { cn, getPortalContainer } from "@/lib/utils";

type SelectContextValue = {
  isOpen: boolean;
};

const SelectContext = createContext<SelectContextValue | null>(null);

const useSelect = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error("Select components must be used within Select");
  }
  return context;
};

function Select({
  open,
  defaultOpen = false,
  onOpenChange,
  ...props
}: ComponentProps<typeof SelectPrimitive.Root>) {
  const [isOpen, setIsOpen] = useControllableState({
    prop: open,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });

  const selectContext = useMemo(() => ({ isOpen: isOpen ?? false }), [isOpen]);

  return (
    <SelectContext.Provider value={selectContext}>
      <SelectPrimitive.Root data-slot="select" open={isOpen} onOpenChange={setIsOpen} {...props} />
    </SelectContext.Provider>
  );
}

function SelectGroup({ ...props }: ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue({
  icon,
  ...props
}: ComponentProps<typeof SelectPrimitive.Value> & {
  icon?: ReactNode;
}) {
  if (icon) {
    return (
      <span className="flex items-center gap-2">
        {icon}
        <SelectPrimitive.Value data-slot="select-value" {...props} />
      </span>
    );
  }
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectTrigger({
  className,
  size = "default",
  children,
  errorMessage,
  ...props
}: ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default";
  errorMessage?: string;
}) {
  const { isOpen } = useSelect();
  const isInvalid = !!errorMessage;
  return (
    <>
      <SelectPrimitive.Trigger
        data-slot="select-trigger"
        data-size={size}
        aria-invalid={isInvalid ? true : undefined}
        className={cn(
          "flex w-fit min-w-50 min-h-10 items-center justify-between gap-2 rounded-md border border-border bg-background p-2 text-base leading-5 tracking-tightest whitespace-nowrap text-muted-foreground transition-[color,box-shadow] outline-none hover:bg-accent hover:text-accent-foreground cursor-pointer focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 dark:bg-input/30 dark:text-muted-foreground dark:hover:bg-accent aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2",
          className
        )}
        {...props}
      >
        {children}
        <SelectPrimitive.Icon asChild>
          <IconChevronDown
            className={cn(
              "size-4 opacity-50 transition-transform",
              isOpen ? "rotate-180" : "rotate-0"
            )}
          />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      {errorMessage && (
        <div className="flex flex-row gap-1 justify-start items-center p-1">
          <IconExclamationCircle className="text-destructive-foreground text-sm size-4" />
          <span className="text-destructive-foreground text-sm">{errorMessage}</span>
        </div>
      )}
    </>
  );
}

function SelectContent({
  className,
  children,
  position = "popper",
  align = "center",
  ...props
}: ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal container={getPortalContainer()}>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-32 origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        align={align}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({ className, ...props }: ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  icon,
  ...props
}: ComponentProps<typeof SelectPrimitive.Item> & {
  icon?: ReactNode;
}) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full min-h-9 cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-base leading-5 tracking-tightest outline-hidden select-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <IconCheck className="size-4 text-popover-foreground" />
        </SelectPrimitive.ItemIndicator>
      </span>
      {icon && <span className="flex items-center gap-2 mr-1">{icon}</span>}
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn("flex cursor-default items-center justify-center py-1", className)}
      {...props}
    >
      <IconChevronUp className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn("flex cursor-default items-center justify-center py-1", className)}
      {...props}
    >
      <IconChevronDown className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
