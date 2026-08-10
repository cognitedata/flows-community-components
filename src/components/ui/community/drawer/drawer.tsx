import { cn, getPortalContainer } from '@cognite/aura/utils';
import type { ComponentProps, ReactNode } from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';

function Drawer({
  ...props
}: ComponentProps<typeof DrawerPrimitive.Root>): ReactNode {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />;
}

function DrawerTrigger({
  ...props
}: ComponentProps<typeof DrawerPrimitive.Trigger>): ReactNode {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

function DrawerPortal({
  ...props
}: ComponentProps<typeof DrawerPrimitive.Portal>): ReactNode {
  return (
    <DrawerPrimitive.Portal
      data-slot="drawer-portal"
      {...props}
      container={getPortalContainer()}
    />
  );
}

function DrawerClose({
  ...props
}: ComponentProps<typeof DrawerPrimitive.Close>): ReactNode {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

function DrawerOverlay({
  className,
  ...props
}: ComponentProps<typeof DrawerPrimitive.Overlay>): ReactNode {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
        className
      )}
      {...props}
    />
  );
}

function DrawerContent({
  className,
  children,
  ...props
}: ComponentProps<typeof DrawerPrimitive.Content>): ReactNode {
  const drawerContentBaseClassName =
    'h-auto group/drawer-content bg-background fixed z-50 flex flex-col justify-center items-center';

  const drawerContentTopClassName =
    'data-[vaul-drawer-direction=top]:inset-x-0 data-[vaul-drawer-direction=top]:top-0 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-b-lg data-[vaul-drawer-direction=top]:border-b';

  const drawerContentBottomClassName =
    'data-[vaul-drawer-direction=bottom]:inset-x-0 data-[vaul-drawer-direction=bottom]:bottom-0 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-t-lg data-[vaul-drawer-direction=bottom]:border-t';

  const drawerContentRightClassName =
    'data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:border-l data-[vaul-drawer-direction=right]:sm:max-w-sm';

  const drawerContentLeftClassName =
    'data-[vaul-drawer-direction=left]:inset-y-0 data-[vaul-drawer-direction=left]:left-0 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:border-r data-[vaul-drawer-direction=left]:sm:max-w-sm';

  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          drawerContentBaseClassName,
          drawerContentTopClassName,
          drawerContentBottomClassName,
          drawerContentRightClassName,
          drawerContentLeftClassName,
          className
        )}
        {...props}
      >
        <div className="mx-auto flex w-full flex-col justify-center items-center gap-4 group-data-[vaul-drawer-direction=top]/drawer-content:max-w-sm group-data-[vaul-drawer-direction=bottom]/drawer-content:max-w-sm">
          <div className="bg-card mx-auto mt-4 hidden h-2 w-25 shrink-0 rounded-full group-data-[vaul-drawer-direction=bottom]/drawer-content:block" />
          {children}
        </div>
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
}

function DrawerHeader({
  className,
  ...props
}: ComponentProps<'div'>): ReactNode {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        'flex flex-col pt-4 group-data-[vaul-drawer-direction=bottom]/drawer-content:text-left group-data-[vaul-drawer-direction=top]/drawer-content:text-center gap-1 md:text-left',
        className
      )}
      {...props}
    />
  );
}

function DrawerFooter({
  className,
  ...props
}: ComponentProps<'div'>): ReactNode {
  return (
    <div
      data-slot="drawer-footer"
      className={cn('mt-auto flex flex-col gap-2 pb-4', className)}
      {...props}
    />
  );
}

function DrawerTitle({
  className,
  ...props
}: ComponentProps<typeof DrawerPrimitive.Title>): ReactNode {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn(
        'text-foreground text-xl font-semibold leading-6 tracking-tightest',
        className
      )}
      {...props}
    />
  );
}

function DrawerDescription({
  className,
  ...props
}: ComponentProps<typeof DrawerPrimitive.Description>): ReactNode {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn(
        'text-muted-foreground text-base font-normal leading-5 tracking-tightest',
        className
      )}
      {...props}
    />
  );
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
