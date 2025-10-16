"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

type SidebarContextValue = {
  open: boolean
  setOpen: (open: boolean | ((prev: boolean) => boolean)) => void
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null)

export function useSidebar() {
  const ctx = React.useContext(SidebarContext)
  if (!ctx) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }
  return ctx
}

type SidebarProviderProps = {
  children: React.ReactNode
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function SidebarProvider({
  children,
  defaultOpen = true,
  open: openProp,
  onOpenChange,
}: SidebarProviderProps) {
  const [_open, _setOpen] = React.useState(defaultOpen)
  const open = openProp ?? _open

  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const next = typeof value === "function" ? (value as (v: boolean) => boolean)(open) : value
      if (onOpenChange) onOpenChange(next)
      else _setOpen(next)
    },
    [open, onOpenChange]
  )

  const ctx = React.useMemo(() => ({ open, setOpen }), [open, setOpen])

  return <SidebarContext.Provider value={ctx}>{children}</SidebarContext.Provider>
}

type SidebarProps = React.HTMLAttributes<HTMLElement> & {
  collapsible?: "icon" | "none"
}

export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(function Sidebar(
  { className, collapsible = "icon", ...props },
  ref
) {
  const { open } = useSidebar()
  return (
    <aside
      ref={ref}
      data-slot="sidebar"
      data-state={open ? "open" : "closed"}
      data-collapsible={collapsible}
      className={cn(
        "border-r bg-[var(--sidebar)] text-[var(--sidebar-foreground)] border-[var(--sidebar-border)]",
        "flex h-full shrink-0 flex-col transition-[width] duration-200",
        collapsible === "icon"
          ? open
            ? "w-64"
            : "w-14"
          : "w-64",
        className
      )}
      {...props}
    />
  )
})

export const SidebarHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function SidebarHeader(
  { className, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      data-slot="sidebar-header"
      className={cn("flex items-center gap-2 px-4 py-3 border-b border-[var(--sidebar-border)]", className)}
      {...props}
    />
  )
})

export const SidebarFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function SidebarFooter(
  { className, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      data-slot="sidebar-footer"
      className={cn("mt-auto px-4 py-3 border-t border-[var(--sidebar-border)]", className)}
      {...props}
    />
  )
})

export const SidebarContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function SidebarContent(
  { className, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      data-slot="sidebar-content"
      className={cn("flex-1 overflow-y-auto px-2 py-2", className)}
      {...props}
    />
  )
})

export const SidebarGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function SidebarGroup(
  { className, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      data-slot="sidebar-group"
      className={cn("px-2 py-2", className)}
      {...props}
    />
  )
})

export const SidebarGroupLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function SidebarGroupLabel(
  { className, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      data-slot="sidebar-group-label"
      className={cn("px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--sidebar-accent-foreground)]/70", className)}
      {...props}
    />
  )
})

export const SidebarGroupContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function SidebarGroupContent(
  { className, ...props },
  ref
) {
  return (
    <div ref={ref} data-slot="sidebar-group-content" className={cn("mt-1 space-y-1", className)} {...props} />
  )
})

export const SidebarMenu = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(function SidebarMenu(
  { className, ...props },
  ref
) {
  return <ul ref={ref} data-slot="sidebar-menu" className={cn("flex flex-col gap-1", className)} {...props} />
})

export const SidebarMenuItem = React.forwardRef<HTMLLIElement, React.LiHTMLAttributes<HTMLLIElement>>(function SidebarMenuItem(
  { className, ...props },
  ref
) {
  return <li ref={ref} data-slot="sidebar-menu-item" className={cn("list-none", className)} {...props} />
})

type SidebarMenuButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean
}

export const SidebarMenuButton = React.forwardRef<HTMLButtonElement, SidebarMenuButtonProps>(function SidebarMenuButton(
  { className, asChild, ...props },
  ref
) {
  const Comp: any = asChild ? Slot : "button"
  return (
    <Comp
      ref={ref}
      data-slot="sidebar-menu-button"
      className={cn(
        "group peer/menu-button flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-sm",
        "text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)] hover:text-[var(--sidebar-accent-foreground)]",
        className
      )}
      {...props}
    />
  )
})

export const SidebarTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(function SidebarTrigger(
  { className, ...props },
  ref
) {
  const { open, setOpen } = useSidebar()
  return (
    <button
      ref={ref}
      type="button"
      data-slot="sidebar-trigger"
      aria-label="Toggle Sidebar"
      data-state={open ? "open" : "closed"}
      onClick={() => setOpen((v) => !v)}
      className={cn(
        "inline-flex items-center rounded-md border border-[var(--sidebar-border)] bg-[var(--sidebar)] px-2.5 py-1.5 text-sm",
        "text-[var(--sidebar-foreground)] hover:bg-[var(--sidebar-accent)] hover:text-[var(--sidebar-accent-foreground)]",
        className
      )}
      {...props}
    >
      Toggle Sidebar
    </button>
  )
})

export const SidebarRail = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function SidebarRail(
  { className, ...props },
  ref
) {
  const { setOpen } = useSidebar()
  return (
    <div
      ref={ref}
      role="button"
      aria-label="Sidebar Rail"
      tabIndex={0}
      onClick={() => setOpen((v) => !v)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") setOpen((v) => !v)
      }}
      data-slot="sidebar-rail"
      className={cn("absolute inset-y-0 right-0 w-1.5 cursor-col-resize bg-transparent", className)}
      {...props}
    />
  )
})

// Named export grouping for convenience
export type { SidebarProps }


