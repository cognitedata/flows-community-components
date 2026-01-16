import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarProjectSelector,
  SidebarSearch,
  SidebarPages,
  SidebarMainPages,
  SidebarPinnedApps,
  SidebarSeparator,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeaderInsert,
  SidebarProvider,
  SidebarFooter,
  SidebarTrigger,
} from '@/components/ui/aura/sidebar';
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@/components/ui/aura/avatar';
import {
  IconMapPinFilled,
  IconSearch,
  IconHomeFilled,
  IconWorld,
  IconChevronLeft,
  IconBoltFilled,
  IconAppsFilled,
  IconHelp,
  IconBellFilled,
  IconPointFilled,
} from '@tabler/icons-react';
import type { ComponentExamples } from '@/lib/component-examples/types';

function BasicDemo() {
  return (
    <div className="space-y-4">
      <div className="relative h-[996px] w-full rounded-lg overflow-hidden">
        <SidebarProvider className="min-h-0 h-[996px]">
          <div className="flex h-full w-full">
            <Sidebar>
              <SidebarHeader>
                <SidebarHeaderInsert>
                  <Avatar sizes="default">
                    <AvatarFallback>AK</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col min-w-0">
                    <div className="text-xs font-medium tracking-tightesttext-sidebar-foreground truncate">
                      AkerBP-DEV
                    </div>
                    <div className="text-xs text-sidebar-foreground/70 truncate">
                      Industrial tools
                    </div>
                  </div>
                </SidebarHeaderInsert>

                <SidebarProjectSelector>
                  <IconMapPinFilled className="h-4 w-4" />
                  <span>Valhall</span>
                </SidebarProjectSelector>
                <SidebarSearch>
                  <IconSearch className="h-4.5 w-4.5" />
                  <span>Search</span>
                </SidebarSearch>
              </SidebarHeader>
              <SidebarSeparator />
              <SidebarContent>
                <SidebarPages>
                  <SidebarMainPages>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Home" size="default">
                          <IconHomeFilled className="h-4 w-4" />
                          <span>Home</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton isActive tooltip="Atlas">
                          <IconWorld className="h-4 w-4" />
                          <span>Atlas</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Canvas">
                          <IconChevronLeft className="h-4.5 w-4.5" />
                          <span>Canvas</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Charts">
                          <IconBoltFilled className="h-4 w-4" />
                          <span>Charts</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarMainPages>
                  <SidebarPinnedApps>
                    <div className="tracking-normal text-sm font-medium">
                      Pinned apps
                    </div>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="Home" size="default">
                        <IconPointFilled className="h-4 w-4" />
                        <span>App</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton isActive tooltip="Atlas">
                        <IconPointFilled className="h-4 w-4" />
                        <span>App</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="Canvas">
                        <IconPointFilled className="h-4 w-4" />
                        <span>App</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarPinnedApps>
                </SidebarPages>
              </SidebarContent>
              <SidebarFooter>
                <div className="flex flex-col gap-3 w-full">
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <IconAppsFilled className="h-4 w-4" />
                        <span>App library</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <IconHelp className="h-4 w-4" />
                        <span>Help</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <IconBellFilled className="h-4 w-4" />
                        <span>Notifications</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                  <div className="flex items-center gap-2">
                    <Avatar sizes="default">
                      <AvatarImage
                        src="/user-avatar2.png"
                        alt="Elizabeth Fitzgerald"
                      />
                      <AvatarFallback>EF</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-0">
                      <div className="text-sm font-medium text-sidebar-foreground truncate">
                        Elizabeth Fitzgerald
                      </div>
                      <div className="text-xs text-sidebar-foreground/70 truncate">
                        AkerBP
                      </div>
                    </div>
                  </div>
                </div>
              </SidebarFooter>
            </Sidebar>
          </div>
        </SidebarProvider>
      </div>
    </div>
  );
}

function CollapsedDemo() {
  return (
    <div className="space-y-4">
      <div className="relative h-[996px] w-full rounded-lg overflow-hidden">
        <SidebarProvider defaultOpen={false} className="min-h-0 h-[996px]">
          <div className="flex h-full w-full">
            <Sidebar collapsible="icon">
              <SidebarHeader>
                <SidebarHeaderInsert>
                  <Avatar sizes="default">
                    <AvatarFallback>AK</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col min-w-0">
                    <div className="text-xs font-medium tracking-tightest text-sidebar-foreground truncate">
                      AkerBP-DEV
                    </div>
                    <div className="text-xs text-sidebar-foreground/70 truncate">
                      Industrial tools
                    </div>
                  </div>
                </SidebarHeaderInsert>
                <SidebarProjectSelector>
                  <IconMapPinFilled className="h-4 w-4" />
                  <span>Valhall</span>
                </SidebarProjectSelector>
                <SidebarSearch>
                  <IconSearch className="h-4 w-4" />
                  <span>Search</span>
                </SidebarSearch>
              </SidebarHeader>
              <SidebarSeparator />
              <SidebarContent>
                <SidebarPages>
                  <SidebarMainPages>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Home" size="default">
                          <IconHomeFilled className="h-4 w-4" />
                          <span>Home</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton isActive tooltip="Atlas">
                          <IconWorld className="h-4 w-4" />
                          <span>Atlas</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Canvas">
                          <IconChevronLeft className="h-4 w-4" />
                          <span>Canvas</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Charts">
                          <IconBoltFilled className="h-4 w-4" />
                          <span>Charts</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarMainPages>
                  <SidebarPinnedApps>
                    <div className="text-sm font-medium pb-1 group-data-[collapsible=icon]:hidden">
                      Pinned apps
                    </div>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="App" size="default">
                        <IconPointFilled className="h-4 w-4" />
                        <span>App</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="App">
                        <IconPointFilled className="h-4 w-4" />
                        <span>App</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="App">
                        <IconPointFilled className="h-4 w-4" />
                        <span>App</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarPinnedApps>
                </SidebarPages>
              </SidebarContent>
              <SidebarFooter>
                <div className="flex flex-col gap-3 w-full">
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="App library">
                        <IconAppsFilled className="h-4 w-4" />
                        <span>App library</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="Help">
                        <IconHelp className="h-4 w-4" />
                        <span>Help</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="Notifications">
                        <IconBellFilled className="h-4 w-4" />
                        <span>Notifications</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                  <div className="flex items-center gap-2">
                    <Avatar sizes="default">
                      <AvatarImage
                        src="/user-avatar2.png"
                        alt="Elizabeth Fitzgerald"
                      />
                      <AvatarFallback>EF</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-0">
                      <div className="text-sm font-medium text-sidebar-foreground truncate">
                        Elizabeth Fitzgerald
                      </div>
                      <div className="text-xs text-sidebar-foreground/70 truncate">
                        AkerBP
                      </div>
                    </div>
                  </div>
                </div>
              </SidebarFooter>
            </Sidebar>
            <div className="flex-1 p-4">
              <SidebarTrigger />
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">
                  Sidebar is collapsed. Click the trigger button to expand.
                </p>
              </div>
            </div>
          </div>
        </SidebarProvider>
      </div>
    </div>
  );
}

export const sidebarExamples: ComponentExamples = {
  basic: {
    title: 'Sidebar with Full Structure',
    description:
      'Complete sidebar structure with brand, project selector, search, main pages, pinned apps, general pages, and user profile',
    component: BasicDemo,
    difficulty: 'advanced',
    code: `import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarProjectSelector,
  SidebarSearch,
  SidebarPages,
  SidebarMainPages,
  SidebarPinnedApps,
  SidebarGeneralPages,
  SidebarSeparator,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/components/ui/aura/sidebar';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/aura/avatar';
import {
  IconMapPinFilled,
  IconSearch,
  IconHomeFilled,
  IconWorld,
  IconChevronLeft,
  IconBoltFilled,
  IconAppsFilled,
  IconHelp,
  IconBellFilled,
} from '@tabler/icons-react';

export function BasicDemo() {
  return (
    <SidebarProvider>
      <div className="flex h-full w-full">
        <Sidebar>
          <SidebarHeader>
            {/* Brand, project selector, search */}
          </SidebarHeader>
          <SidebarSeparator />
          <SidebarContent>
            <SidebarPages>
              <SidebarMainPages>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <IconHomeFilled className="h-4 w-4" />
                      <span>Home</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive>
                      <IconWorld className="h-4 w-4" />
                      <span>Atlas</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarMainPages>
              <SidebarPinnedApps>
                {/* Pinned apps content */}
              </SidebarPinnedApps>
            </SidebarPages>
          </SidebarContent>
          <SidebarFooter>
            <div className="flex flex-col gap-3 w-full">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <IconAppsFilled className="h-4 w-4" />
                    <span>App library</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <IconHelp className="h-4 w-4" />
                    <span>Help</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <IconBellFilled className="h-4 w-4" />
                    <span>Notifications</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarFallback>EF</AvatarFallback>
                </Avatar>
                <div>Elizabeth Fitzgerald</div>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        {/* Main content */}
      </div>
    </SidebarProvider>
  );
}`,
  },
  collapsed: {
    title: 'Collapsed Sidebar',
    description:
      'Sidebar in collapsed icon-only state, showing only icons with tooltips on hover',
    component: CollapsedDemo,
    difficulty: 'intermediate',
    code: `import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarProjectSelector,
  SidebarSearch,
  SidebarPages,
  SidebarMainPages,
  SidebarPinnedApps,
  SidebarGeneralPages,
  SidebarSeparator,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/aura/sidebar';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/aura/avatar';
import {
  IconMapPinFilled,
  IconSearch,
  IconHomeFilled,
  IconWorld,
  IconAppsFilled,
  IconPointFilled,
} from '@tabler/icons-react';

export function CollapsedDemo() {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex h-full w-full">
        <Sidebar collapsible="icon">
          <SidebarHeader>
            {/* Brand, project selector, search */}
          </SidebarHeader>
          <SidebarSeparator />
          <SidebarContent>
            <SidebarPages>
              <SidebarMainPages>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Home">
                      <IconHomeFilled className="h-4 w-4" />
                      <span>Home</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive tooltip="Atlas">
                      <IconWorld className="h-4 w-4" />
                      <span>Atlas</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarMainPages>
              <SidebarPinnedApps>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="App">
                    <IconPointFilled className="h-4 w-4" />
                    <span>App</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarPinnedApps>
            </SidebarPages>
          </SidebarContent>
          <SidebarFooter>
            <div className="flex flex-col gap-3 w-full">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="App library">
                    <IconAppsFilled className="h-4 w-4" />
                    <span>App library</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Help">
                    <IconHelp className="h-4 w-4" />
                    <span>Help</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Notifications">
                    <IconBellFilled className="h-4 w-4" />
                    <span>Notifications</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarFallback>EF</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 p-4">
          <SidebarTrigger />
        </div>
      </div>
    </SidebarProvider>
  );
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const sidebarMeta = {
  name: 'Sidebar',
  description:
    'A composable, themeable and customizable sidebar component with header, pages, pinned apps, and user profile sections.',
  llmUsage:
    'When creating sidebars, use `<Sidebar>` with `<SidebarBrand>`, `<SidebarProjectSelector>`, `<SidebarSearch>`, `<SidebarPages>`, `<SidebarMainPages>`, `<SidebarPinnedApps>`, `<SidebarGeneralPages>`, and `<SidebarUserProfile>` components.',
  importPath: '@/components/ui/aura/sidebar',
};
