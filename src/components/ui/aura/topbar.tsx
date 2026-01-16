'use client';

import { type ComponentProps } from 'react';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/lib/utils';
import { Breadcrumb } from '@/components/ui/aura/breadcrumb';
import { SidebarProvider, SidebarInset } from '@/components/ui/aura/sidebar';
import { Button } from '@/components/ui/aura/button';

// Topbar wrapper component
function Topbar({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="topbar"
      className={cn(
        'flex h-11 w-full items-center border-b bg-background px-3 py-2',
        className
      )}
      {...props}
    />
  );
}

// Topbar left section (for breadcrumbs)
function TopbarLeft({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="topbar-left"
      className={cn('flex items-center', className)}
      {...props}
    />
  );
}

// Topbar center section
function TopbarCenter({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="topbar-center"
      className={cn('flex flex-1 items-center justify-center', className)}
      {...props}
    />
  );
}

// Topbar right section (for action buttons)
function TopbarRight({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="topbar-right"
      className={cn('flex items-center gap-2', className)}
      {...props}
    />
  );
}

// Topbar with sidebar integration
function TopbarWithSidebar({
  className,
  children,
  ...props
}: ComponentProps<'div'>) {
  return (
    <SidebarProvider>
      <div
        data-slot="topbar-with-sidebar"
        className={cn('flex min-h-screen w-full', className)}
        {...props}
      >
        {children}
      </div>
    </SidebarProvider>
  );
}

// Topbar content wrapper (main page content area)
function TopbarContent({ className, ...props }: ComponentProps<'main'>) {
  return (
    <SidebarInset
      data-slot="topbar-content"
      className={cn('flex flex-col', className)}
      {...props}
    />
  );
}

// Topbar breadcrumbs wrapper
function TopbarBreadcrumbs({
  className,
  ...props
}: ComponentProps<typeof Breadcrumb>) {
  return (
    <Breadcrumb
      data-slot="topbar-breadcrumbs"
      className={className}
      {...props}
    />
  );
}

// Topbar action button wrapper
function TopbarAction({
  className,
  asChild = false,
  ...props
}: ComponentProps<typeof Button> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : Button;

  return (
    <Comp data-slot="topbar-action" className={className} {...props} />
  );
}

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
