import {
  Topbar,
  TopbarLeft,
  TopbarCenter,
  TopbarRight,
  TopbarBreadcrumbs,
} from '@/components/ui/aura/topbar';
import {
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/aura/breadcrumb';
import { Button } from '@/components/ui/aura/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/aura/alert-dialog';
import {
  IconChartBar as BarChart3,
  IconFileText as FileText,
  IconLayoutSidebar,
  IconPlus,
  IconDownload,
  IconEdit,
  IconSettings as Settings,
  IconShare,
  IconHomeFilled,
  IconUsers as Users,
} from '@tabler/icons-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/aura/sidebar';
import type { ComponentExamples } from '@/lib/component-examples/types';

function BasicDemo() {
  return (
    <div className="w-full overflow-hidden">
      <Topbar>
        <TopbarLeft>
          <Button variant="ghost" size="icon-sm">
            <IconLayoutSidebar className="h-4.5 w-4.5" />
          </Button>
          <TopbarBreadcrumbs>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" aria-label="Go to home">
                  <IconHomeFilled className="h-4 w-4" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbPage>Application</BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>My dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </TopbarBreadcrumbs>
        </TopbarLeft>
        <TopbarCenter />
        <TopbarRight>
          <Button size="sm">
            <IconPlus />
            Button
          </Button>
          <Button variant="ghost" size="icon-sm">
            <IconShare className="h-4 w-4" />
          </Button>
        </TopbarRight>
      </Topbar>
    </div>
  );
}

function EosTopbar() {
  return (
    <div className="w-full rounded-lg overflow-hidden">
      <Topbar>
        <TopbarLeft>
          <Button variant="ghost" size="icon">
            <IconLayoutSidebar className="h-4 w-4" />
          </Button>
          <TopbarBreadcrumbs>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" aria-label="Go to home">
                  <IconHomeFilled className="h-4 w-4" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbPage>Canvas</BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>RCA 21PT1019</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </TopbarBreadcrumbs>
        </TopbarLeft>
        <TopbarCenter />
        <TopbarRight>
          <Button variant="ghost" size="sm">
            <IconDownload className="h-4 w-4" />
            Download
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="sm">
                <IconEdit className="h-4 w-4" />
                New chat
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Start a new chat?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will start a fresh conversation. Your current chat
                  history will be saved and you can access it later from the
                  sidebar.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Start new chat</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </TopbarRight>
      </Topbar>
    </div>
  );
}

function TopbarWithSidebarDemo() {
  return (
    <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
      <SidebarProvider>
        <div className="flex h-full w-full bg-background">
          <Sidebar>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Platform</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton isActive>
                        <IconHomeFilled className="h-4 w-4" />
                        <span>Overview</span>
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
                        <span>Layout</span>
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
          </Sidebar>
          <div className="flex flex-1 flex-col">
            <Topbar>
              <TopbarLeft>
                <SidebarTrigger />
                <TopbarBreadcrumbs>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/" aria-label="Go to home">
                        <IconHomeFilled className="h-4 w-4" />
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Projects</BreadcrumbPage>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Topbar with Sidebar</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </TopbarBreadcrumbs>
              </TopbarLeft>
              <TopbarCenter />
              <TopbarRight>
                <Button size="sm">
                  <IconPlus className="h-4 w-4" />
                  New item
                </Button>
                <Button variant="ghost" size="icon">
                  <IconShare className="h-4 w-4" />
                </Button>
              </TopbarRight>
            </Topbar>
            <div className="flex-1 p-4">
              <h3 className="text-sm font-semibold mb-1">
                Topbar and Sidebar working together
              </h3>
              <p className="text-xs text-muted-foreground">
                This example shows a typical application layout with a static
                sidebar on the left and a topbar above the main content area.
              </p>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
export const topbarExamples: ComponentExamples = {
  basic: {
    title: 'Basic Topbar',
    description:
      'A topbar with breadcrumbs on the left, empty center, and actions on the right',
    component: BasicDemo,
    difficulty: 'beginner',
    code: `import {
  Topbar,
  TopbarLeft,
  TopbarCenter,
  TopbarRight,
  TopbarBreadcrumbs,
} from "@/components/ui/aura/topbar"
import {
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/aura/breadcrumb"
import { Button } from "@/components/ui/aura/button"
import {
  IconLayoutSidebar,
  IconPlus,
  IconShare,
  IconHomeFilled,
} from "@tabler/icons-react"

export function BasicDemo() {
  return (
    <div className="w-full overflow-hidden">
      <Topbar>
        <TopbarLeft>
          <Button variant="ghost" size="icon-sm">
            <IconLayoutSidebar className="h-4.5 w-4.5" />
          </Button>
          <TopbarBreadcrumbs>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" aria-label="Go to home">
                  <IconHomeFilled className="h-4 w-4" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbPage>Application</BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>My dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </TopbarBreadcrumbs>
        </TopbarLeft>
        <TopbarCenter />
        <TopbarRight>
          <Button size="sm">
            <IconPlus />
            Button
          </Button>
          <Button variant="ghost" size="icon-sm">
            <IconShare className="h-4 w-4" />
          </Button>
        </TopbarRight>
      </Topbar>
    </div>
  )
}`,
  },
  eos: {
    title: 'EOS Topbar',
    description:
      'A topbar with breadcrumbs, download button, and new chat action with confirmation dialog',
    component: EosTopbar,
    difficulty: 'intermediate',
    code: `import {
  Topbar,
  TopbarLeft,
  TopbarCenter,
  TopbarRight,
  TopbarBreadcrumbs,
} from "@/components/ui/aura/topbar"
import {
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/aura/breadcrumb"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/aura/alert-dialog"
import { Button } from "@/components/ui/aura/button"
import { IconLayoutSidebar, IconHomeFilled, IconDownload, IconEdit } from "@tabler/icons-react"

export function EosTopbar() {
  return (
    <div className="w-full rounded-lg overflow-hidden">
      <Topbar>
        <TopbarLeft>
          <Button variant="ghost" size="icon">
            <IconLayoutSidebar className="h-4 w-4" />
          </Button>
          <TopbarBreadcrumbs>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" aria-label="Go to home">
                  <IconHomeFilled className="h-4 w-4" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbPage>Canvas</BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>RCA 21PT1019</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </TopbarBreadcrumbs>
        </TopbarLeft>
        <TopbarCenter />
        <TopbarRight>
          <Button variant="ghost" size="sm">
            <IconDownload className="h-4 w-4" />
            Download
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="sm">
                <IconEdit className="h-4 w-4" />
                New chat
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Start a new chat?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will start a fresh conversation. Your current chat
                  history will be saved and you can access it later from the
                  sidebar.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Start new chat</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </TopbarRight>
      </Topbar>
    </div>
  )
}`,
  },
  withSidebar: {
    title: 'Topbar with Sidebar layout',
    description:
      'A layout where the Topbar sits above the main content area next to a static Sidebar.',
    component: TopbarWithSidebarDemo,
    difficulty: 'intermediate',
    code: `import {
  Topbar,
  TopbarLeft,
  TopbarCenter,
  TopbarRight,
  TopbarBreadcrumbs,
} from "@/components/ui/aura/topbar"
import {
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/aura/breadcrumb"
import { Button } from "@/components/ui/aura/button"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/aura/sidebar"
import {
  IconChartBar as BarChart3,
  IconFileText as FileText,
  IconHomeFilled,
  IconPlus,
  IconSettings as Settings,
  IconShare,
  IconUsers as Users,
} from "@tabler/icons-react"

export function TopbarWithSidebarDemo() {
  return (
    <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
      <SidebarProvider>
        <div className="flex h-full w-full bg-background">
          <Sidebar>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Platform</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton isActive>
                        <IconHomeFilled className="h-4 w-4" />
                        <span>Overview</span>
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
                        <span>Layout</span>
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
          </Sidebar>
          <div className="flex flex-1 flex-col">
            <Topbar>
              <TopbarLeft>
                <SidebarTrigger />
                <TopbarBreadcrumbs>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/" aria-label="Go to home">
                        <IconHomeFilled className="h-4 w-4" />
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Projects</BreadcrumbPage>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Topbar with Sidebar</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </TopbarBreadcrumbs>
              </TopbarLeft>
              <TopbarCenter />
              <TopbarRight>
                <Button size="sm">
                  <IconPlus className="h-4 w-4" />
                  New item
                </Button>
                <Button variant="ghost" size="icon">
                  <IconShare className="h-4 w-4" />
                </Button>
              </TopbarRight>
            </Topbar>
            <div className="flex-1 p-4">
              <h3 className="text-sm font-semibold mb-1">
                Topbar and Sidebar working together
              </h3>
              <p className="text-xs text-muted-foreground">
                This example shows a typical application layout with a static
                sidebar on the left and a topbar above the main content area.
              </p>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const topbarMeta = {
  name: 'Topbar',
  description:
    'A flexible topbar component with breadcrumbs, center space, and action buttons. Integrates with the Sidebar component for full layout support.',
  llmUsage:
    'Use Topbar for application headers. Include TopbarLeft with TopbarBreadcrumbs for navigation, TopbarCenter for optional content, and TopbarRight with TopbarAction for actions. Wrap with TopbarWithSidebar and TopbarContent when using with Sidebar.',
  importPath: '@/components/ui/aura/topbar',
};
