---
component: Sidebar
description: "A composable, themeable and customizable sidebar component."
llm_usage: "When asked for a sidebar, use `<SidebarProvider>` with `<Sidebar>` and related parts like `<SidebarHeader>`, `<SidebarContent>`, `<SidebarGroup>`, and `<SidebarTrigger>`."
---

# Sidebar

A composable, themeable and customizable sidebar component. Based on the structure documented in the shadcn/ui Sidebar guide.

## Import

```tsx
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/cognite/sidebar"
```

## Basic Usage

```tsx
export function SidebarDemo() {
  return (
    <SidebarProvider>
      <div className="flex h-64 border rounded overflow-hidden">
        <Sidebar>
          <SidebarHeader>Header</SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Application</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>Home</SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>Inbox</SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>Footer</SidebarFooter>
        </Sidebar>
        <div className="flex-1 p-4">
          <SidebarTrigger />
        </div>
      </div>
    </SidebarProvider>
  )
}
```

## Theming

Ensure the following CSS variables are defined in `app/globals.css` for sidebar theming: `--sidebar`, `--sidebar-foreground`, `--sidebar-primary`, `--sidebar-primary-foreground`, `--sidebar-accent`, `--sidebar-accent-foreground`, `--sidebar-border`, `--sidebar-ring`.

Reference: shadcn/ui Sidebar docs (`https://ui.shadcn.com/docs/components/sidebar`).


