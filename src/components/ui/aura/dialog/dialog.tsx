import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import { IconX } from '@tabler/icons-react';
import type { ComponentProps, ReactNode } from 'react';

import { cn, getPortalContainer } from '../../../../lib/utils';

function Dialog({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({ children, ...props }: DialogPrimitive.Trigger.Props) {
  return (
    <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props}>
      {children}
    </DialogPrimitive.Trigger>
  );
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return (
    <DialogPrimitive.Portal data-slot="dialog-portal" {...props} container={getPortalContainer()} />
  );
}

function DialogClose({
  children,
  ...props
}: DialogPrimitive.Close.Props & { children?: ReactNode }) {
  return (
    <DialogPrimitive.Close data-slot="dialog-close" {...props}>
      {children}
    </DialogPrimitive.Close>
  );
}

function DialogOverlay({ className, ...props }: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        'fixed inset-0 z-50 bg-black/50 transition-opacity duration-200 data-open:opacity-100 data-closed:opacity-0',
        className
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean;
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(
          'bg-popover fixed inset-x-4 top-1/2 z-50 grid -translate-y-1/2 rounded-xl border px-5 py-5 mb-2.5 shadow-xl outline-none transition-opacity duration-200 data-open:opacity-100 data-closed:opacity-0 sm:inset-x-0 sm:left-1/2 sm:w-full sm:max-w-lg sm:-translate-x-1/2',
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            render={
              <button
                type="button"
                className="ring-offset-background focus:ring-ring data-open:bg-accent data-open:text-muted-foreground text-foreground absolute top-5 right-4 flex size-7 items-center justify-center rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0"
              >
                <IconX className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </button>
            }
          />
        )}
      </DialogPrimitive.Popup>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-header"
      className={cn('flex flex-col gap-2 text-center sm:text-left pb-2', className)}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end pt-3', className)}
      {...props}
    />
  );
}

function DialogTitle({ className, ...props }: ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn('text-lg font-medium text-foreground leading-6 tracking-tightest', className)}
      {...props}
    />
  );
}

function DialogDescription({ className, ...props }: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        'text-muted-foreground text-base font-normal leading-5 tracking-tightest pt-2',
        className
      )}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
