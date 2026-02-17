import { type ComponentProps, type ComponentRef, forwardRef } from "react";

import { Breadcrumb } from "@/components/ui/aura/breadcrumb/breadcrumb";
import { Button } from "@/components/ui/aura/button/button";
import { SidebarInset, SidebarProvider } from "@/components/ui/aura/sidebar/sidebar";
import { cn } from "../../../../lib/utils";

// Topbar wrapper component
const Topbar = forwardRef<HTMLDivElement, ComponentProps<"div">>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="topbar"
      className={cn("flex h-11 w-full items-center border-b bg-background px-3 py-2", className)}
      {...props}
    />
  );
});
Topbar.displayName = "Topbar";

// Topbar left section (for breadcrumbs)
const TopbarLeft = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="topbar-left"
        className={cn("flex items-center", className)}
        {...props}
      />
    );
  }
);
TopbarLeft.displayName = "TopbarLeft";

// Topbar center section
const TopbarCenter = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="topbar-center"
        className={cn("flex flex-1 items-center justify-center", className)}
        {...props}
      />
    );
  }
);
TopbarCenter.displayName = "TopbarCenter";

// Topbar right section (for action buttons)
const TopbarRight = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        data-slot="topbar-right"
        className={cn("flex items-center gap-2", className)}
        {...props}
      />
    );
  }
);
TopbarRight.displayName = "TopbarRight";

// Topbar with sidebar integration
const TopbarWithSidebar = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, children, ...props }, ref) => {
    return (
      <SidebarProvider>
        <div
          ref={ref}
          data-slot="topbar-with-sidebar"
          className={cn("flex min-h-screen w-full", className)}
          {...props}
        >
          {children}
        </div>
      </SidebarProvider>
    );
  }
);
TopbarWithSidebar.displayName = "TopbarWithSidebar";

// Topbar content wrapper (main page content area)
const TopbarContent = forwardRef<
  ComponentRef<typeof SidebarInset>,
  ComponentProps<typeof SidebarInset>
>(({ className, ...props }, ref) => {
  return (
    <SidebarInset
      ref={ref}
      data-slot="topbar-content"
      className={cn("flex flex-col", className)}
      {...props}
    />
  );
});
TopbarContent.displayName = "TopbarContent";

// Topbar breadcrumbs wrapper
const TopbarBreadcrumbs = forwardRef<
  ComponentRef<typeof Breadcrumb>,
  ComponentProps<typeof Breadcrumb>
>(({ className, ...props }, ref) => {
  return <Breadcrumb ref={ref} data-slot="topbar-breadcrumbs" className={className} {...props} />;
});
TopbarBreadcrumbs.displayName = "TopbarBreadcrumbs";

// Topbar action button wrapper
const TopbarAction = forwardRef<HTMLButtonElement, ComponentProps<typeof Button>>(
  ({ className, ...props }, ref) => {
    return <Button ref={ref} data-slot="topbar-action" className={className} {...props} />;
  }
);
TopbarAction.displayName = "TopbarAction";

export {
  Topbar,
  TopbarLeft,
  TopbarCenter,
  TopbarRight,
  TopbarWithSidebar,
  TopbarContent,
  TopbarBreadcrumbs,
  TopbarAction,
};
