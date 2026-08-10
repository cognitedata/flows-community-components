import { AlertDialog as AlertDialogPrimitive } from '@base-ui/react/alert-dialog';
import { Button } from '@cognite/aura/components';
import { cn, getPortalContainer } from '@cognite/aura/utils';
import {
  type ComponentProps,
  type ComponentRef,
  type ForwardRefExoticComponent,
  type ReactNode,
  type RefAttributes,
  forwardRef,
} from 'react';

function AlertDialog(props: AlertDialogPrimitive.Root.Props): ReactNode {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}
function AlertDialogTrigger({
  children,
  ...props
}: AlertDialogPrimitive.Trigger.Props): ReactNode {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props}>
      {children}
    </AlertDialogPrimitive.Trigger>
  );
}
function AlertDialogPortal(
  props: AlertDialogPrimitive.Portal.Props
): ReactNode {
  return (
    <AlertDialogPrimitive.Portal
      data-slot="alert-dialog-portal"
      {...props}
      container={getPortalContainer()}
    />
  );
}
const AlertDialogOverlay: ForwardRefExoticComponent<
  Omit<AlertDialogPrimitive.Backdrop.Props, 'ref'> &
    RefAttributes<ComponentRef<typeof AlertDialogPrimitive.Backdrop>>
> = forwardRef<
  ComponentRef<typeof AlertDialogPrimitive.Backdrop>,
  AlertDialogPrimitive.Backdrop.Props
>(({ className, ...props }, ref) => {
  return (
    <AlertDialogPrimitive.Backdrop
      ref={ref}
      data-slot="alert-dialog-overlay"
      className={cn(
        'fixed inset-0 z-50 bg-black/50 transition-opacity duration-200 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0',
        className
      )}
      {...props}
    />
  );
});
AlertDialogOverlay.displayName = 'AlertDialogOverlay';

const AlertDialogContent: ForwardRefExoticComponent<
  Omit<AlertDialogPrimitive.Popup.Props, 'ref'> &
    RefAttributes<ComponentRef<typeof AlertDialogPrimitive.Popup>>
> = forwardRef<
  ComponentRef<typeof AlertDialogPrimitive.Popup>,
  AlertDialogPrimitive.Popup.Props
>(({ className, ...props }, ref) => {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Popup
        ref={ref}
        data-slot="alert-dialog-content"
        className={cn(
          'bg-popover-background fixed inset-x-4 top-1/2 z-50 grid -translate-y-1/2 gap-4 rounded-xl border border-border p-5 shadow-xl outline-none transition duration-200 data-[starting-style]:opacity-0 data-[starting-style]:scale-95 data-[ending-style]:opacity-0 data-[ending-style]:scale-95 sm:inset-x-0 sm:left-1/2 sm:w-full sm:max-w-md sm:-translate-x-1/2',
          className
        )}
        {...props}
      />
    </AlertDialogPortal>
  );
});
AlertDialogContent.displayName = 'AlertDialogContent';

const AlertDialogHeader: ForwardRefExoticComponent<
  ComponentProps<'div'> & RefAttributes<HTMLDivElement>
> = forwardRef<ComponentRef<'div'>, ComponentProps<'div'>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="alert-dialog-header"
        className={cn(
          'flex flex-col gap-2 text-center sm:text-left',
          className
        )}
        {...props}
      />
    );
  }
);
AlertDialogHeader.displayName = 'AlertDialogHeader';

const AlertDialogFooter: ForwardRefExoticComponent<
  ComponentProps<'div'> & RefAttributes<HTMLDivElement>
> = forwardRef<ComponentRef<'div'>, ComponentProps<'div'>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="alert-dialog-footer"
        className={cn(
          'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
          className
        )}
        {...props}
      />
    );
  }
);
AlertDialogFooter.displayName = 'AlertDialogFooter';

const AlertDialogTitle: ForwardRefExoticComponent<
  Omit<AlertDialogPrimitive.Title.Props, 'ref'> &
    RefAttributes<ComponentRef<typeof AlertDialogPrimitive.Title>>
> = forwardRef<
  ComponentRef<typeof AlertDialogPrimitive.Title>,
  AlertDialogPrimitive.Title.Props
>(({ className, ...props }, ref) => {
  return (
    <AlertDialogPrimitive.Title
      ref={ref}
      data-slot="alert-dialog-title"
      className={cn(
        'text-foreground text-lg font-medium tracking-tightest',
        className
      )}
      {...props}
    />
  );
});
AlertDialogTitle.displayName = 'AlertDialogTitle';

const AlertDialogDescription: ForwardRefExoticComponent<
  Omit<AlertDialogPrimitive.Description.Props, 'ref'> &
    RefAttributes<ComponentRef<typeof AlertDialogPrimitive.Description>>
> = forwardRef<
  ComponentRef<typeof AlertDialogPrimitive.Description>,
  AlertDialogPrimitive.Description.Props
>(({ className, ...props }, ref) => {
  return (
    <AlertDialogPrimitive.Description
      ref={ref}
      data-slot="alert-dialog-description"
      className={cn(
        'text-muted-foreground text-base font-normal leading-5 tracking-tightest',
        className
      )}
      {...props}
    />
  );
});
AlertDialogDescription.displayName = 'AlertDialogDescription';

const AlertDialogAction: ForwardRefExoticComponent<
  Omit<AlertDialogPrimitive.Close.Props, 'ref'> &
    RefAttributes<ComponentRef<typeof AlertDialogPrimitive.Close>>
> = forwardRef<
  ComponentRef<typeof AlertDialogPrimitive.Close>,
  AlertDialogPrimitive.Close.Props
>(({ className, ...props }, ref) => {
  return (
    <AlertDialogPrimitive.Close
      ref={ref}
      data-slot="alert-dialog-action"
      render={
        <Button
          variant="default"
          size="default"
          className={cn(
            'bg-primary-background text-foreground-on-primary hover:bg-primary-background-hover',
            className
          )}
        />
      }
      {...props}
    />
  );
});
AlertDialogAction.displayName = 'AlertDialogAction';

const AlertDialogCancel: ForwardRefExoticComponent<
  Omit<AlertDialogPrimitive.Close.Props, 'ref'> &
    RefAttributes<ComponentRef<typeof AlertDialogPrimitive.Close>>
> = forwardRef<
  ComponentRef<typeof AlertDialogPrimitive.Close>,
  AlertDialogPrimitive.Close.Props
>(({ className, ...props }, ref) => {
  return (
    <AlertDialogPrimitive.Close
      ref={ref}
      data-slot="alert-dialog-cancel"
      render={
        <Button
          variant="ghost"
          className={cn('border-0 text-muted-foreground', className)}
        />
      }
      {...props}
    />
  );
});
AlertDialogCancel.displayName = 'AlertDialogCancel';

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
