import { Select as SelectPrimitive } from "@base-ui/react/select";
import {
  IconCheck,
  IconChevronDown,
  IconChevronUp,
  IconExclamationCircle,
} from "@tabler/icons-react";
import { type ReactNode, createContext, useContext, useMemo } from "react";

import { useControllableState } from "@/lib/use-controllable-state";
import {
  cn,
  disabledState,
  filledState,
  focusState,
  formElementBase,
  getPortalContainer,
  hoverState,
  invalidState,
} from "@/lib/utils";

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
  value,
  defaultValue,
  onValueChange,
  ...props
}: Omit<
  SelectPrimitive.Root.Props<string>,
  "open" | "defaultOpen" | "onOpenChange" | "value" | "defaultValue" | "onValueChange"
> & {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}) {
  const [isOpen, setIsOpen] = useControllableState({
    prop: open,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });

  const selectContext = useMemo(() => ({ isOpen: isOpen ?? false }), [isOpen]);

  return (
    <SelectContext.Provider value={selectContext}>
      <SelectPrimitive.Root
        data-slot="select"
        open={isOpen}
        onOpenChange={(nextOpen) => setIsOpen(nextOpen)}
        value={value === undefined ? undefined : value === "" ? null : value}
        defaultValue={
          defaultValue === undefined ? undefined : defaultValue === "" ? null : defaultValue
        }
        onValueChange={(nextValue, _details) => {
          onValueChange?.((nextValue ?? "") as string);
        }}
        {...props}
      />
    </SelectContext.Provider>
  );
}

function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("scroll-my-1 p-1", className)}
      {...props}
    />
  );
}

function SelectValue({
  icon,
  ...props
}: SelectPrimitive.Value.Props & {
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
}: SelectPrimitive.Trigger.Props & {
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
          "w-fit min-w-50 min-h-9 flex items-center justify-between gap-2 whitespace-nowrap transition-[color,box-shadow] cursor-pointer",
          formElementBase,
          hoverState,
          filledState,
          focusState,
          invalidState,
          disabledState,
          "dark:bg-input/30 dark:text-muted-foreground dark:hover:bg-accent",
          // SVG styling
          "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
          // Select value styling
          "*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2",
          className
        )}
        {...props}
      >
        {children}
        <SelectPrimitive.Icon
          render={
            <IconChevronDown
              className={cn(
                "size-4 opacity-50 transition-transform",
                isOpen ? "rotate-180" : "rotate-0"
              )}
            />
          }
        />
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
  // Kept for API compatibility with the previous implementation; Base UI does not use this prop.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  position: _position = "popper",
  align = "center",
  ...props
}: SelectPrimitive.Popup.Props & {
  position?: "popper" | "item-aligned";
  align?: SelectPrimitive.Positioner.Props["align"];
}) {
  return (
    <SelectPrimitive.Portal container={getPortalContainer()}>
      <SelectPrimitive.Positioner align={align} className="isolate z-50">
        <SelectPrimitive.Popup
          data-slot="select-content"
          className={cn(
            "bg-popover text-popover-foreground data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--available-height) min-w-32 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md outline-none",
            className
          )}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List>{children}</SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({ className, ...props }: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
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
}: SelectPrimitive.Item.Props & {
  icon?: ReactNode;
}) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full min-h-9 cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-base leading-5 tracking-tightest outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemIndicator
        render={
          <span className="absolute right-2 flex size-3.5 items-center justify-center">
            <IconCheck className="size-4 text-popover-foreground" />
          </span>
        }
      />
      {icon && <span className="flex items-center gap-2 mr-1">{icon}</span>}
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({ className, ...props }: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

function SelectScrollUpButton({ className, ...props }: SelectPrimitive.ScrollUpArrow.Props) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn(
        "bg-popover z-10 flex cursor-default items-center justify-center py-1 top-0 w-full",
        className
      )}
      {...props}
    >
      <IconChevronUp className="size-4" />
    </SelectPrimitive.ScrollUpArrow>
  );
}

function SelectScrollDownButton({ className, ...props }: SelectPrimitive.ScrollDownArrow.Props) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn(
        "bg-popover z-10 flex cursor-default items-center justify-center py-1 bottom-0 w-full",
        className
      )}
      {...props}
    >
      <IconChevronDown className="size-4" />
    </SelectPrimitive.ScrollDownArrow>
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
