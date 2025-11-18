import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/components/ui/cognite/sidebar';
import {
  IconChartBar as BarChart3,
  IconFileText as FileText,
  IconHome as Home,
  IconSettings as Settings,
  IconUsers as Users,
} from '@tabler/icons-react';
import type { ComponentExamples } from './types';

function BasicDemo() {
  return (
    <div className="space-y-4">
      <div className="relative h-[400px] w-full border rounded-lg overflow-hidden">
        <SidebarProvider>
          <div className="flex h-full w-full">
            <div className="w-64 bg-background border-r">
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Platform</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <Home className="h-4 w-4" />
                          <span>Home</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <Users className="h-4 w-4" />
                          <span>Users</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <FileText className="h-4 w-4" />
                          <span>Documents</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <BarChart3 className="h-4 w-4" />
                          <span>Analytics</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                  <SidebarGroupLabel>Account</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <Settings className="h-4 w-4" />
                          <span>Settings</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </div>
            <div className="flex-1 p-4 bg-background">
              <h3 className="text-lg font-semibold mb-2">Main Content</h3>
              <p className="text-sm text-muted-foreground">
                This is the main content area. The sidebar on the left is fully
                interactive and contained within the preview.
              </p>
            </div>
          </div>
        </SidebarProvider>
      </div>

      <p className="text-sm text-muted-foreground">
        Interactive sidebar component with navigation groups and menu items. The
        sidebar is contained within the preview area.
      </p>
    </div>
  );
}

export const sidebarExamples: ComponentExamples = {
  basic: {
    title: 'Sidebar Demo',
    description:
      'Interactive sidebar component with navigation groups and menu items',
    component: BasicDemo,
    difficulty: 'advanced',
    code: `import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/cognite/sidebar"
import { Home, Settings, Users, FileText, BarChart3 } from "@tabler/icons-react"

export function BasicDemo() {
  return (
    <SidebarProvider>
      <div className="flex h-[400px] w-full border rounded-lg overflow-hidden">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Platform</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Home className="h-4 w-4" />
                      <span>Home</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Users className="h-4 w-4" />
                      <span>Users</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <div className="flex-1 p-4">
          <h3 className="text-lg font-semibold mb-2">Main Content</h3>
          <p className="text-sm text-muted-foreground">
            This is the main content area.
          </p>
        </div>
      </div>
    </SidebarProvider>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const sidebarMeta = {
  name: 'Sidebar',
  description: 'A composable, themeable and customizable sidebar component.',
  llmUsage:
    'When creating sidebars, use `<Sidebar>` with `<SidebarContent>`, `<SidebarMenu>`, and related components.',
  importPath: '@/components/ui/cognite/sidebar',
};
