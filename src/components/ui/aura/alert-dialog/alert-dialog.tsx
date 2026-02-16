import { type ComponentProps, type ComponentRef, forwardRef } from "react";

import { Button } from "@/components/ui/aura/button";
import { cn, getPortalContainer } from "@/lib/utils";

import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";

function AlertDialog(props: AlertDialogPrimitive.Root.Props) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}
AlertDialog.displayName = "AlertDialog";

function AlertDialogTrigger({ children, ...props }: AlertDialogPrimitive.Trigger.Props) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props}>
      {children}
    </AlertDialogPrimitive.Trigger>
  );
}
AlertDialogTrigger.displayName = "AlertDialogTrigger";

function AlertDialogPortal(props: AlertDialogPrimitive.Portal.Props) {
  return (
    <AlertDialogPrimitive.Portal
      data-slot="alert-dialog-portal"
      {...props}
      container={getPortalContainer()}
    />
  );
}
AlertDialogPortal.displayName = "AlertDialogPortal";

const AlertDialogOverlay = forwardRef<
  ComponentRef<typeof AlertDialogPrimitive.Backdrop>,
  AlertDialogPrimitive.Backdrop.Props
>(({ className, ...props }, ref) => {
  return (
    <AlertDialogPrimitive.Backdrop
      ref={ref}
      data-slot="alert-dialog-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/50 transition-opacity duration-200 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
        className
      )}
      {...props}
    />
  );
});
AlertDialogOverlay.displayName = "AlertDialogOverlay";

const AlertDialogContent = forwardRef<
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
          "bg-popover fixed inset-x-4 top-1/2 z-50 grid -translate-y-1/2 gap-4 rounded-lg border border-border p-6 shadow-xl outline-none transition duration-200 data-[starting-style]:opacity-0 data-[starting-style]:scale-95 data-[ending-style]:opacity-0 data-[ending-style]:scale-95 sm:inset-x-0 sm:left-1/2 sm:w-full sm:max-w-md sm:-translate-x-1/2",
          className
        )}
        {...props}
      />
    </AlertDialogPortal>
  );
});
AlertDialogContent.displayName = "AlertDialogContent";

const AlertDialogHeader = forwardRef<ComponentRef<"div">, ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="alert-dialog-header"
        className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
        {...props}
      />
    );
  }
);
AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogFooter = forwardRef<ComponentRef<"div">, ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="alert-dialog-footer"
        className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
        {...props}
      />
    );
  }
);
AlertDialogFooter.displayName = "AlertDialogFooter";

const AlertDialogTitle = forwardRef<
  ComponentRef<typeof AlertDialogPrimitive.Title>,
  AlertDialogPrimitive.Title.Props
>(({ className, ...props }, ref) => {
  return (
    <AlertDialogPrimitive.Title
      ref={ref}
      data-slot="alert-dialog-title"
      className={cn("text-xl font-medium leading-6 tracking-tightest", className)}
      {...props}
    />
  );
});
AlertDialogTitle.displayName = "AlertDialogTitle";

const AlertDialogDescription = forwardRef<
  ComponentRef<typeof AlertDialogPrimitive.Description>,
  AlertDialogPrimitive.Description.Props
>(({ className, ...props }, ref) => {
  return (
    <AlertDialogPrimitive.Description
      ref={ref}
      data-slot="alert-dialog-description"
      className={cn(
        "text-muted-foreground text-base font-normal leading-5 tracking-tightest",
        className
      )}
      {...props}
    />
  );
});
AlertDialogDescription.displayName = "AlertDialogDescription";

const AlertDialogAction = forwardRef<
  ComponentRef<typeof AlertDialogPrimitive.Close>,
  AlertDialogPrimitive.Close.Props
>(({ className, ...props }, ref) => {
  return (
    <AlertDialogPrimitive.Close
      ref={ref}
      data-slot="alert-dialog-action"
      render={<Button className={className} />}
      {...props}
    />
  );
});
AlertDialogAction.displayName = "AlertDialogAction";

const AlertDialogCancel = forwardRef<
  ComponentRef<typeof AlertDialogPrimitive.Close>,
  AlertDialogPrimitive.Close.Props
>(({ className, ...props }, ref) => {
  return (
    <AlertDialogPrimitive.Close
      ref={ref}
      data-slot="alert-dialog-cancel"
      render={<Button variant="outline" className={className} />}
      {...props}
    />
  );
});
AlertDialogCancel.displayName = "AlertDialogCancel";

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
