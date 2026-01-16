'use client';

import type { Meta, StoryObj } from '@storybook/nextjs';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
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
  SidebarTrigger,
  SidebarGroupLabel,
} from './sidebar';
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
  IconPointFilled,
} from '@tabler/icons-react';

const meta: Meta<typeof Sidebar> = {
  title: 'UI/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  argTypes: {
    // Structure
    side: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Which side the sidebar appears on',
      table: {
        category: 'Structure',
        type: { summary: '"left" | "right"' },
        defaultValue: { summary: 'left' },
      },
    },
    variant: {
      control: 'select',
      options: ['sidebar', 'floating', 'inset'],
      description: 'Visual variant of the sidebar',
      table: {
        category: 'Structure',
        type: { summary: '"sidebar" | "floating" | "inset"' },
        defaultValue: { summary: 'sidebar' },
      },
    },
    collapsible: {
      control: 'select',
      options: ['offcanvas', 'icon', 'none'],
      description: 'How the sidebar can be collapsed',
      table: {
        category: 'Behavior',
        type: { summary: '"offcanvas" | "icon" | "none"' },
        defaultValue: { summary: 'offcanvas' },
      },
    },
    className: {
      control: 'text',
      description: 'CSS classes for styling',
      table: {
        category: 'Display',
      },
    },
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A composable sidebar component following the shadcn pattern with sticky header/footer and scrollable content.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

/**
 * Complete sidebar with header, scrollable content, and footer.
 * This follows the shadcn pattern with proper flexbox layout.
 */
export const Basic: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Full sidebar structure with brand, project selector, search, navigation pages, pinned apps, and footer with user profile. The content scrolls while header and footer remain visible.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify sidebar is rendered
    const sidebar = canvas.getByTestId('sidebar-header-insert');
    await expect(sidebar).toBeInTheDocument();

    // Verify navigation items exist
    const atlasButton = canvas.getByText('Atlas');
    await expect(atlasButton).toBeInTheDocument();

    // Verify footer is visible
    const footer = canvas.getByText('Elizabeth Fitzgerald');
    await expect(footer).toBeInTheDocument();
  },
  render: () => (
    <div className="relative h-[996px] w-full rounded-lg overflow-hidden">
      <SidebarProvider className="min-h-0 h-[996px]">
        <div className="flex h-full w-full">
          <Sidebar collapsible="icon">
            <SidebarHeader>
              <SidebarHeaderInsert data-testid="sidebar-header-insert">
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
                  <SidebarGroupLabel className="h-auto p-0 pb-1 text-sm font-medium text-sidebar-foreground">
                    Pinned apps
                  </SidebarGroupLabel>
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
          <div className="flex-1 p-4">
            <SidebarTrigger />
            <div className="mt-4">
              <h1 className="text-2xl font-bold mb-4">Main Content</h1>
              <p className="text-muted-foreground">
                This is the main content area. The sidebar header and footer
                remain visible while the content scrolls.
              </p>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  ),
};

/**
 * Collapsed sidebar in icon-only mode with tooltips.
 * Tests tooltip behavior on hover.
 */
export const Collapsed: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Sidebar collapsed to icon-only mode. Hover over icons to see tooltips. Click the trigger button to expand.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify collapsed state
    const trigger = canvas.getByRole('button', { name: /toggle sidebar/i });
    await expect(trigger).toBeInTheDocument();

    // Verify icons are present
    const homeButton = canvas.getByText('Home');
    await expect(homeButton).toBeInTheDocument();

    // Test expand functionality
    await userEvent.click(trigger);

    // Wait a moment for the animation
    await new Promise((resolve) => setTimeout(resolve, 300));
  },
  render: () => (
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
                  <SidebarGroupLabel className="h-auto p-0 pb-1 text-sm font-medium text-sidebar-foreground">
                    Pinned apps
                  </SidebarGroupLabel>
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
              <h1 className="text-2xl font-bold mb-4">Main Content</h1>
              <p className="text-muted-foreground">
                This is the main content area. The sidebar header and footer
                remain visible while the content scrolls.
              </p>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  ),
};

/**
 * Sidebar with minimal content to show footer positioning
 * Demonstrates that footer stays at bottom with little content.
 */
export const MinimalContent: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Sidebar with only a few navigation items. Shows that the footer remains at the bottom even with minimal scrollable content.',
      },
    },
  },
  render: () => (
    <div className="relative h-[996px] w-full rounded-lg overflow-hidden">
      <SidebarProvider className="min-h-0 h-[996px]">
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
                  </SidebarMenu>
                </SidebarMainPages>
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
          <div className="flex-1 p-4">
            <div className="mt-4">
              <h1 className="text-2xl font-bold mb-4">Main Content</h1>
              <p className="text-muted-foreground">
                Footer remains at the bottom even with minimal content above it.
              </p>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  ),
};

/**
 * Interactive playground for testing sidebar props
 */
export const Playground: Story = {
  args: {
    side: 'left',
    variant: 'sidebar',
    collapsible: 'icon',
  },
  render: (args) => (
    <div className="relative h-[996px] w-full rounded-lg overflow-hidden">
      <SidebarProvider className="min-h-0 h-[996px]">
        <div className="flex h-full w-full">
          <Sidebar {...args}>
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
                </SidebarMenu>
                <div className="flex items-center gap-2">
                  <Avatar sizes="default">
                    <AvatarFallback>EF</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col min-w-0">
                    <div className="text-sm font-medium text-sidebar-foreground truncate">
                      Elizabeth Fitzgerald
                    </div>
                  </div>
                </div>
              </div>
            </SidebarFooter>
          </Sidebar>
          <div className="flex-1 p-4">
            <SidebarTrigger />
            <div className="mt-4">
              <h1 className="text-2xl font-bold mb-4">Main Content</h1>
              <p className="text-muted-foreground">
                Use the controls to test different sidebar configurations.
              </p>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  ),
};
