import { Dialog as SheetPrimitive } from '@base-ui/react/dialog';
import { cn, getPortalContainer } from '@cognite/aura/utils';
import { IconX } from '@tabler/icons-react';
import type { ComponentProps, ReactNode } from 'react';

function Sheet({ ...props }: SheetPrimitive.Root.Props): ReactNode {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger({
  children,
  ...props
}: SheetPrimitive.Trigger.Props): ReactNode {
  return (
    <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props}>
      {children}
    </SheetPrimitive.Trigger>
  );
}

function SheetClose({ ...props }: SheetPrimitive.Close.Props): ReactNode {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal({ ...props }: SheetPrimitive.Portal.Props) {
  return (
    <SheetPrimitive.Portal
      data-slot="sheet-portal"
      {...props}
      container={getPortalContainer()}
    />
  );
}

function SheetOverlay({ className, ...props }: SheetPrimitive.Backdrop.Props) {
  const overlayBaseClasses =
    'fixed inset-0 z-50 bg-black/50 transition-opacity duration-200';
  const overlayStateClasses = 'data-open:opacity-100 data-closed:opacity-0';

  return (
    <SheetPrimitive.Backdrop
      data-slot="sheet-overlay"
      className={cn(overlayBaseClasses, overlayStateClasses, className)}
      {...props}
    />
  );
}

function SheetContent({
  className,
  children,
  side = 'right',
  ...props
}: SheetPrimitive.Popup.Props & {
  side?: 'top' | 'right' | 'bottom' | 'left';
}): ReactNode {
  const contentBaseClasses =
    'bg-background fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out';
  const contentMotionClasses =
    'data-open:animate-in data-closed:animate-out data-closed:duration-300 data-open:duration-500';
  const contentSideClasses = {
    right:
      'inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm data-open:slide-in-from-right data-closed:slide-out-to-right',
    left: 'inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm data-open:slide-in-from-left data-closed:slide-out-to-left',
    top: 'inset-x-0 top-0 h-auto border-b data-open:slide-in-from-top data-closed:slide-out-to-top',
    bottom:
      'inset-x-0 bottom-0 h-auto border-t data-open:slide-in-from-bottom data-closed:slide-out-to-bottom',
  } satisfies Record<NonNullable<typeof side>, string>;

  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Popup
        data-slot="sheet-content"
        className={cn(
          contentBaseClasses,
          contentMotionClasses,
          contentSideClasses[side],
          className
        )}
        {...props}
      >
        {children}
        <SheetPrimitive.Close
          data-slot="sheet-close"
          render={
            <button
              type="button"
              className="ring-offset-background focus:ring-ring data-open:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none"
            >
              <IconX className="size-4" />
              <span className="sr-only">Close</span>
            </button>
          }
        />
      </SheetPrimitive.Popup>
    </SheetPortal>
  );
}

function SheetHeader({
  className,
  ...props
}: ComponentProps<'div'>): ReactNode {
  return (
    <div
      data-slot="sheet-header"
      className={cn('flex flex-col gap-1.5 p-4', className)}
      {...props}
    />
  );
}

function SheetFooter({
  className,
  ...props
}: ComponentProps<'div'>): ReactNode {
  return (
    <div
      data-slot="sheet-footer"
      className={cn('mt-auto flex flex-col gap-2 p-4', className)}
      {...props}
    />
  );
}

function SheetTitle({
  className,
  ...props
}: SheetPrimitive.Title.Props): ReactNode {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn('text-foreground font-semibold', className)}
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: SheetPrimitive.Description.Props): ReactNode {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
