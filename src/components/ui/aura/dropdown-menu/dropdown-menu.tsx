import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { IconCheck, IconChevronRight } from "@tabler/icons-react";
import { type HTMLAttributes, forwardRef } from "react";

import { getRenderPropFromAsChild } from "@/lib/render-as-child";
import { cn, getPortalContainer } from "@/lib/utils";

function DropdownMenu({ ...props }: MenuPrimitive.Root.Props) {
  return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}
DropdownMenu.displayName = "DropdownMenu";

function DropdownMenuPortal({ ...props }: MenuPrimitive.Portal.Props) {
  return (
    <MenuPrimitive.Portal
      data-slot="dropdown-menu-portal"
      container={getPortalContainer()}
      {...props}
    />
  );
}
DropdownMenuPortal.displayName = "DropdownMenuPortal";

const DropdownMenuTrigger = forwardRef<
  React.ElementRef<typeof MenuPrimitive.Trigger>,
  MenuPrimitive.Trigger.Props & { asChild?: boolean }
>(({ asChild = false, children, ...props }, ref) => {
  const render = getRenderPropFromAsChild(children, asChild);
  return (
    <MenuPrimitive.Trigger ref={ref} data-slot="dropdown-menu-trigger" render={render} {...props}>
      {asChild ? null : children}
    </MenuPrimitive.Trigger>
  );
});
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

function DropdownMenuContent({
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  className,
  ...props
}: MenuPrimitive.Popup.Props &
  Pick<MenuPrimitive.Positioner.Props, "align" | "alignOffset" | "side" | "sideOffset">) {
  return (
    <DropdownMenuPortal>
      <MenuPrimitive.Positioner
        className="isolate z-50 outline-none"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <MenuPrimitive.Popup
          data-slot="dropdown-menu-content"
          className={cn(
            "bg-popover text-popover-foreground p-1 data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--available-height) min-w-32 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg border shadow-md outline-none",
            className
          )}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </DropdownMenuPortal>
  );
}
DropdownMenuContent.displayName = "DropdownMenuContent";

function DropdownMenuGroup({ ...props }: MenuPrimitive.Group.Props) {
  return <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />;
}
DropdownMenuGroup.displayName = "DropdownMenuGroup";

const DropdownMenuItem = forwardRef<
  React.ElementRef<typeof MenuPrimitive.Item>,
  MenuPrimitive.Item.Props & {
    inset?: boolean;
    variant?: "default" | "destructive";
    asChild?: boolean;
  }
>(({ className, inset, variant = "default", asChild = false, children, ...props }, ref) => {
  const render = getRenderPropFromAsChild(children, asChild);
  return (
    <MenuPrimitive.Item
      ref={ref}
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive-foreground data-[variant=destructive]:focus:bg-destructive-hover dark:data-[variant=destructive]:focus:bg-destructive-hover data-[variant=destructive]:focus:text-destructive-foreground data-[variant=destructive]:*:[svg]:text-destructive-foreground! data-[variant=destructive]:hover:bg-destructive-hover dark:data-[variant=destructive]:hover:bg-destructive-hover [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm p-2 text-base outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      render={render}
      {...props}
    >
      {asChild ? null : children}
    </MenuPrimitive.Item>
  );
});
DropdownMenuItem.displayName = "DropdownMenuItem";

const DropdownMenuCheckboxItem = forwardRef<
  React.ElementRef<typeof MenuPrimitive.CheckboxItem>,
  MenuPrimitive.CheckboxItem.Props
>(({ className, children, checked, ...props }, ref) => {
  return (
    <MenuPrimitive.CheckboxItem
      ref={ref}
      data-slot="dropdown-menu-checkbox-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground h-9 relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <MenuPrimitive.CheckboxItemIndicator>
          <IconCheck className="size-4 text-popover-foreground" />
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  );
});
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

function DropdownMenuRadioGroup({ ...props }: MenuPrimitive.RadioGroup.Props) {
  return <MenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />;
}
DropdownMenuRadioGroup.displayName = "DropdownMenuRadioGroup";

const DropdownMenuRadioItem = forwardRef<
  React.ElementRef<typeof MenuPrimitive.RadioItem>,
  MenuPrimitive.RadioItem.Props
>(({ className, children, ...props }, ref) => {
  return (
    <MenuPrimitive.RadioItem
      ref={ref}
      data-slot="dropdown-menu-radio-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground h-9 relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <MenuPrimitive.RadioItemIndicator>
          <IconCheck className="size-4 text-popover-foreground" />
        </MenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  );
});
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";

const DropdownMenuLabel = forwardRef<
  React.ElementRef<typeof MenuPrimitive.GroupLabel>,
  MenuPrimitive.GroupLabel.Props & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => {
  return (
    <MenuPrimitive.GroupLabel
      ref={ref}
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "-mx-1 -mt-1 mb-1 px-2 py-1.5 text-sm border-b border-border font-medium data-[inset]:pl-8 text-popover-foreground dark:text-popover-foreground",
        className
      )}
      {...props}
    />
  );
});
DropdownMenuLabel.displayName = "DropdownMenuLabel";

const DropdownMenuHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="dropdown-menu-header"
        className={cn(
          "-mx-1 -mt-1 mb-1 flex flex-row items-center gap-2 border-b border-border px-2 py-2 pointer-events-none",
          className
        )}
        {...props}
      />
    );
  }
);
DropdownMenuHeader.displayName = "DropdownMenuHeader";

const DropdownMenuSeparator = forwardRef<
  React.ElementRef<typeof MenuPrimitive.Separator>,
  MenuPrimitive.Separator.Props
>(({ className, ...props }, ref) => {
  return (
    <MenuPrimitive.Separator
      ref={ref}
      data-slot="dropdown-menu-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
});
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

const DropdownMenuShortcut = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        data-slot="dropdown-menu-shortcut"
        className={cn("text-muted-foreground ml-auto text-xs tracking-widest", className)}
        {...props}
      />
    );
  }
);
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

function DropdownMenuSub({ ...props }: MenuPrimitive.SubmenuRoot.Props) {
  return <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />;
}
DropdownMenuSub.displayName = "DropdownMenuSub";

const DropdownMenuSubTrigger = forwardRef<
  React.ElementRef<typeof MenuPrimitive.SubmenuTrigger>,
  MenuPrimitive.SubmenuTrigger.Props & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => {
  return (
    <MenuPrimitive.SubmenuTrigger
      ref={ref}
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <IconChevronRight className="ml-auto size-4" />
    </MenuPrimitive.SubmenuTrigger>
  );
});
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";

function DropdownMenuSubContent({
  align = "start",
  alignOffset = -3,
  side = "right",
  sideOffset = 0,
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuContent>) {
  return (
    <DropdownMenuContent
      data-slot="dropdown-menu-sub-content"
      className={cn("min-w-32 w-auto", className)}
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      {...props}
    />
  );
}
DropdownMenuSubContent.displayName = "DropdownMenuSubContent";

const DropdownMenuSectionLabel = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="dropdown-menu-section-label"
        className={cn(
          "px-2 py-1 text-sm text-muted-foreground dark:text-muted-foreground",
          className
        )}
        {...props}
      />
    );
  }
);
DropdownMenuSectionLabel.displayName = "DropdownMenuSectionLabel";

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuHeader,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuSectionLabel,
};
