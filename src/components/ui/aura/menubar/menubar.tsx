import { Menu as MenuPrimitive } from '@base-ui/react/menu';
import { Menubar as MenubarPrimitive } from '@base-ui/react/menubar';
import { IconCheck, IconChevronRight, IconCircle } from '@tabler/icons-react';
import {
  type ComponentProps,
  createContext,
  forwardRef,
  useContext,
} from 'react';

import { cn } from '../../../../lib/utils';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/aura/dropdown-menu';

type MenubarSize = 'default' | 'sm';

const MenubarContext = createContext<MenubarSize>('sm');

function Menubar({
  className,
  size = 'sm',
  ...props
}: MenubarPrimitive.Props & {
  size?: MenubarSize;
}) {
  return (
    <MenubarContext.Provider value={size}>
      <MenubarPrimitive
        data-slot="menubar"
        className={cn('flex h-7 items-center gap-1', className)}
        {...props}
      />
    </MenubarContext.Provider>
  );
}

function MenubarMenu({ ...props }: ComponentProps<typeof DropdownMenu>) {
  return <DropdownMenu data-slot="menubar-menu" {...props} />;
}

function MenubarGroup({ ...props }: ComponentProps<typeof DropdownMenuGroup>) {
  return <DropdownMenuGroup data-slot="menubar-group" {...props} />;
}

function MenubarPortal({
  ...props
}: ComponentProps<typeof DropdownMenuPortal>) {
  return <DropdownMenuPortal data-slot="menubar-portal" {...props} />;
}

function MenubarRadioGroup({
  ...props
}: ComponentProps<typeof DropdownMenuRadioGroup>) {
  return <DropdownMenuRadioGroup data-slot="menubar-radio-group" {...props} />;
}

function MenubarTrigger({
  className,
  size,
  ...props
}: ComponentProps<typeof DropdownMenuTrigger> & {
  size?: MenubarSize;
}) {
  const contextSize = useContext(MenubarContext);
  const appliedSize = size ?? contextSize;

  return (
    <DropdownMenuTrigger
      data-slot="menubar-trigger"
      className={cn(
        'focus:bg-accent focus:text-accent-foreground focus:rounded-sm data-popup-open:bg-accent data-popup-open:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:text-disabled-foreground hover:bg-accent hover:text-accent-foreground flex items-center rounded-sm text-sm font-medium outline-hidden select-none leading-5 tracking-normal',
        appliedSize === 'default' ? 'p-2' : 'px-2 py-1',
        className
      )}
      {...props}
    />
  );
}

function MenubarContent({
  className,
  align = 'start',
  alignOffset = -4,
  sideOffset = 8,
  ...props
}: ComponentProps<typeof DropdownMenuContent>) {
  return (
    <DropdownMenuContent
      data-slot="menubar-content"
      align={align}
      alignOffset={alignOffset}
      sideOffset={sideOffset}
      className={cn('w-63 min-w-32', className)}
      {...props}
    />
  );
}

function MenubarItem({
  className,
  inset,
  variant = 'default',
  ...props
}: ComponentProps<typeof DropdownMenuItem> & {
  inset?: boolean;
  variant?: 'default' | 'destructive';
}) {
  return (
    <DropdownMenuItem
      data-slot="menubar-item"
      data-inset={inset}
      data-variant={variant}
      className={cn('group/menubar-item', className)}
      {...props}
    />
  );
}

const MenubarCheckboxItem = forwardRef<
  React.ElementRef<typeof MenuPrimitive.CheckboxItem>,
  MenuPrimitive.CheckboxItem.Props
>(({ className, children, checked, ...props }, ref) => {
  return (
    <MenuPrimitive.CheckboxItem
      ref={ref}
      data-slot="menubar-checkbox-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground h-9 relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <MenuPrimitive.CheckboxItemIndicator>
          <IconCheck className="size-4" />
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  );
});
MenubarCheckboxItem.displayName = 'MenubarCheckboxItem';

const MenubarRadioItem = forwardRef<
  React.ElementRef<typeof MenuPrimitive.RadioItem>,
  MenuPrimitive.RadioItem.Props
>(({ className, children, ...props }, ref) => {
  return (
    <MenuPrimitive.RadioItem
      ref={ref}
      data-slot="menubar-radio-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground h-9 relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <MenuPrimitive.RadioItemIndicator>
          <IconCircle className="size-2 fill-current" />
        </MenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  );
});
MenubarRadioItem.displayName = 'MenubarRadioItem';

function MenubarLabel({
  className,
  inset,
  ...props
}: ComponentProps<typeof DropdownMenuLabel>) {
  return (
    <DropdownMenuLabel
      data-slot="menubar-label"
      data-inset={inset}
      className={cn(
        'px-2 py-1.5 text-sm font-medium data-[inset]:pl-8',
        className
      )}
      {...props}
    />
  );
}

function MenubarSeparator({
  className,
  ...props
}: ComponentProps<typeof DropdownMenuSeparator>) {
  return (
    <DropdownMenuSeparator
      data-slot="menubar-separator"
      className={cn('bg-border -mx-1 my-1 h-px', className)}
      {...props}
    />
  );
}

function MenubarShortcut({
  className,
  ...props
}: ComponentProps<typeof DropdownMenuShortcut>) {
  return (
    <DropdownMenuShortcut
      data-slot="menubar-shortcut"
      className={cn(
        'text-muted-foreground group-focus/menubar-item:text-accent-foreground ml-auto text-xs tracking-widest',
        className
      )}
      {...props}
    />
  );
}

function MenubarSub({ ...props }: ComponentProps<typeof DropdownMenuSub>) {
  return <DropdownMenuSub data-slot="menubar-sub" {...props} />;
}

function MenubarSubTrigger({
  className,
  inset,
  children,
  ...props
}: ComponentProps<typeof DropdownMenuSubTrigger> & {
  inset?: boolean;
}) {
  return (
    <DropdownMenuSubTrigger
      data-slot="menubar-sub-trigger"
      data-inset={inset}
      className={cn(className)}
      {...props}
    >
      {children}
      <IconChevronRight className="ml-auto size-4" />
    </DropdownMenuSubTrigger>
  );
}

function MenubarSubContent({
  className,
  ...props
}: ComponentProps<typeof DropdownMenuSubContent>) {
  return (
    <DropdownMenuSubContent
      data-slot="menubar-sub-content"
      className={cn(className)}
      {...props}
    />
  );
}

export {
  Menubar,
  MenubarPortal,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarSeparator,
  MenubarLabel,
  MenubarItem,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
};
