import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, waitFor, within } from '@storybook/test';
import {
  IconChartBar as BarChart3,
  IconDownload,
  IconEdit,
  IconFileText,
  IconHomeFilled,
  IconLayoutSidebar,
  IconPlus,
  IconSettings,
  IconShare,
  IconUsers,
} from '@tabler/icons-react';
import { useState } from 'react';

import { Topbar, TopbarBreadcrumbs, TopbarCenter, TopbarLeft, TopbarRight } from './topbar';

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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/aura/avatar';
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/aura/breadcrumb';
import { Button } from '@/components/ui/aura/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarHeaderInsert,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/aura/sidebar';


const meta: Meta<typeof Topbar> = {
  title: 'Primitives/Topbar',
  component: Topbar,
  tags: ['autodocs'],
  argTypes: {
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
  },
};

export default meta;
type Story = StoryObj<typeof Topbar>;

/**
 * Basic topbar with breadcrumbs on the left, empty center, and actions on the right
 * Matches the basic example from topbar.examples.tsx
 */
export const Basic: Story = {
  parameters: {
    order: 1,
    docs: {
      description: {
        story:
          'Basic topbar with breadcrumbs on the left, empty center, and action buttons on the right.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the sidebar toggle button
    const sidebarButton = canvas.getByRole('button', { name: /sidebar/i });
    await expect(sidebarButton).toBeInTheDocument();

    // Find action buttons
    const actionButtons = canvas.getAllByRole('button');
    await expect(actionButtons.length).toBeGreaterThan(0);
  },
  render: function TopbarBasicStory() {
    return (
      <div className="w-full overflow-hidden">
        <Topbar>
          <TopbarLeft>
            <Button variant="ghost" size="icon-sm" aria-label="Toggle sidebar">
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
            <Button variant="ghost" size="icon-sm" aria-label="Share">
              <IconShare className="h-4 w-4" />
            </Button>
          </TopbarRight>
        </Topbar>
      </div>
    );
  },
};

/**
 * Topbar with center content
 */
export const WithCenterContent: Story = {
  parameters: {
    order: 2,
    docs: {
      description: {
        story: 'Topbar with content in the center section.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Project Dashboard')).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: /new item/i })).toBeInTheDocument();
  },
  render: function TopbarWithCenterContentStory() {
    return (
      <div className="w-full overflow-hidden">
        <Topbar>
          <TopbarLeft>
            <Button variant="ghost" size="icon-sm" aria-label="Toggle sidebar">
              <IconLayoutSidebar className="h-4.5 w-4.5" />
            </Button>
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
              </BreadcrumbList>
            </TopbarBreadcrumbs>
          </TopbarLeft>
          <TopbarCenter>
            <div className="text-sm font-medium">Project Dashboard</div>
          </TopbarCenter>
          <TopbarRight>
            <Button size="sm">
              <IconPlus />
              New Item
            </Button>
            <Button variant="ghost" size="icon-sm" aria-label="Share">
              <IconShare className="h-4 w-4" />
            </Button>
          </TopbarRight>
        </Topbar>
      </div>
    );
  },
};

/**
 * EOS-style topbar with download and edit actions
 */
export const EosStyle: Story = {
  parameters: {
    order: 3,
    docs: {
      description: {
        story:
          'EOS-style topbar with download and edit actions, typically used in canvas applications. The "New chat" button triggers an AlertDialog.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify the New chat button exists and is interactable
    const newChatButton = canvas.getByRole('button', { name: /new chat/i });
    await expect(newChatButton).toBeInTheDocument();
    await expect(newChatButton).toBeEnabled();
  },
  render: function TopbarEosStyleStory() {
    return (
      <div className="w-full">
        <Topbar>
          <TopbarLeft>
            <Button variant="ghost" size="icon" aria-label="Toggle sidebar">
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
              <AlertDialogTrigger
                render={
                  <Button size="sm">
                    <IconEdit className="h-4 w-4" />
                    New chat
                  </Button>
                }
              />
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Start a new chat?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will create a new chat session. Your current chat will be saved.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </TopbarRight>
        </Topbar>
      </div>
    );
  },
};

/**
 * Minimal topbar with just breadcrumbs
 */
export const Minimal: Story = {
  parameters: {
    order: 4,
    docs: {
      description: {
        story: 'Minimal topbar with only breadcrumbs, no action buttons.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Home')).toBeInTheDocument();
    await expect(canvas.getByRole('link', { name: 'Go to home' })).toBeInTheDocument();
  },
  render: function TopbarMinimalStory() {
    return (
      <div className="w-full overflow-hidden">
        <Topbar>
          <TopbarLeft>
            <TopbarBreadcrumbs>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" aria-label="Go to home">
                    <IconHomeFilled className="h-4 w-4" />
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Home</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </TopbarBreadcrumbs>
          </TopbarLeft>
          <TopbarCenter />
          <TopbarRight />
        </Topbar>
      </div>
    );
  },
};

/**
 * Topbar with multiple action buttons
 */
export const WithMultipleActions: Story = {
  parameters: {
    order: 5,
    docs: {
      description: {
        story: 'Topbar with multiple action buttons in the right section.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('button', { name: /settings/i })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: /export/i })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: /create/i })).toBeInTheDocument();
  },
  render: function TopbarWithMultipleActionsStory() {
    return (
      <div className="w-full overflow-hidden">
        <Topbar>
          <TopbarLeft>
            <Button variant="ghost" size="icon-sm" aria-label="Toggle sidebar">
              <IconLayoutSidebar className="h-4.5 w-4.5" />
            </Button>
            <TopbarBreadcrumbs>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" aria-label="Go to home">
                    <IconHomeFilled className="h-4 w-4" />
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Settings</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </TopbarBreadcrumbs>
          </TopbarLeft>
          <TopbarCenter />
          <TopbarRight>
            <Button variant="ghost" size="sm">
              <IconSettings className="h-4 w-4" />
              Settings
            </Button>
            <Button variant="ghost" size="sm">
              <IconDownload className="h-4 w-4" />
              Export
            </Button>
            <Button size="sm">
              <IconPlus />
              Create
            </Button>
            <Button variant="ghost" size="icon-sm" aria-label="Share">
              <IconShare className="h-4 w-4" />
            </Button>
          </TopbarRight>
        </Topbar>
      </div>
    );
  },
};

/**
 * Topbar with sidebar layout
 * Demonstrates full layout integration
 */
export const WithSidebar: Story = {
  parameters: {
    order: 6,
    docs: {
      description: {
        story:
          "Complete layout with Topbar and Sidebar working together. Features a collapsible sidebar with icon mode and SidebarTrigger button in the topbar. Inspired by the Sidebar component's own pattern.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify topbar is rendered with sidebar trigger
    const sidebarTrigger = canvas.getByRole('button', { name: /toggle sidebar/i });
    await expect(sidebarTrigger).toBeInTheDocument();

    // Verify sidebar content is present
    const sidebarLabel = canvas.getByText('Platform');
    await expect(sidebarLabel).toBeInTheDocument();

    // Find the active menu item text
    const activeItem = canvas.getByText('Overview');
    await expect(activeItem).toBeInTheDocument();

    // Click the sidebar toggle button to collapse
    await userEvent.click(sidebarTrigger);

    // Sidebar content should still exist (just visually hidden/collapsed)
    await expect(sidebarLabel).toBeInTheDocument();
  },
  render: function TopbarWithSidebarStory() {
    return (
      <div className="relative min-h-screen w-full rounded-lg overflow-hidden">
        <SidebarProvider>
          <div className="flex h-full w-full">
            <Sidebar collapsible="icon">
              <SidebarHeader>
                <SidebarHeaderInsert>
                  <Avatar sizes="default">
                    <AvatarFallback>AK</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col min-w-0 group-data-[collapsible=icon]:hidden">
                    <div className="text-xs font-medium tracking-tightest text-sidebar-foreground truncate">
                      AkerBP-DEV
                    </div>
                    <div className="text-xs text-sidebar-foreground/70 truncate">
                      Industrial tools
                    </div>
                  </div>
                </SidebarHeaderInsert>
              </SidebarHeader>
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Platform</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton isActive tooltip="Overview">
                          <IconHomeFilled className="h-4 w-4" />
                          <span>Overview</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Users">
                          <IconUsers className="h-4 w-4" />
                          <span>Users</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Documents">
                          <IconFileText className="h-4 w-4" />
                          <span>Documents</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton tooltip="Layout">
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
                        <SidebarMenuButton tooltip="Settings">
                          <IconSettings className="h-4 w-4" />
                          <span>Settings</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
              <SidebarFooter>
                <div className="flex items-center gap-2">
                  <Avatar sizes="default">
                    <AvatarImage src="/user-avatar2.png" alt="Elizabeth Fitzgerald" />
                    <AvatarFallback>EF</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col min-w-0 group-data-[collapsible=icon]:hidden">
                    <div className="text-sm font-medium text-sidebar-foreground truncate">
                      Elizabeth Fitzgerald
                    </div>
                    <div className="text-xs text-sidebar-foreground/70 truncate">AkerBP</div>
                  </div>
                </div>
              </SidebarFooter>
            </Sidebar>
            <SidebarInset>
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
                  <Button variant="ghost" size="icon" aria-label="Share">
                    <IconShare className="h-4 w-4" />
                  </Button>
                </TopbarRight>
              </Topbar>
              <div className="flex-1 p-6 overflow-auto">
                <h1 className="text-2xl font-bold mb-4">Topbar with Sidebar Layout</h1>
                <p className="text-muted-foreground mb-4">
                  Click the sidebar toggle button in the topbar to collapse/expand the sidebar. When
                  collapsed, the sidebar shows in icon mode with tooltips.
                </p>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h2 className="font-semibold mb-2">Features</h2>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      <li>Collapsible sidebar with icon mode</li>
                      <li>SidebarTrigger integrated in topbar</li>
                      <li>Breadcrumb navigation</li>
                      <li>Action buttons</li>
                      <li>User profile in sidebar footer</li>
                    </ul>
                  </div>
                </div>
              </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </div>
    );
  },
};

/**
 * Interactive topbar with clickable actions
 */
export const Interactive: Story = {
  parameters: {
    order: 7,
    docs: {
      description: {
        story:
          'Interactive topbar demonstrating button clicks and navigation interactions. Click the buttons to see the state update in the center.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Wait for component to be ready
    await waitFor(
      () => {
        expect(canvas.getByRole('button', { name: /new item/i })).toBeInTheDocument();
      },
      { timeout: 5000 }
    );

    // Click New Item button
    const newItemButton = canvas.getByRole('button', { name: /new item/i });
    await userEvent.click(newItemButton);

    // Verify state update
    await waitFor(
      () => {
        expect(canvas.getByText(/last clicked: new-item/i)).toBeInTheDocument();
      },
      { timeout: 5000 }
    );

    // Click Share button
    const shareButton = canvas.getByRole('button', { name: /share/i });
    await userEvent.click(shareButton);

    // Verify state update
    await waitFor(
      () => {
        expect(canvas.getByText(/last clicked: share/i)).toBeInTheDocument();
      },
      { timeout: 5000 }
    );

    // Click Home link
    const homeLink = canvas.getByRole('link', { name: 'Home' });
    await userEvent.click(homeLink);
  },
  render: function TopbarInteractiveStory() {
    const [clicked, setClicked] = useState<string | null>(null);

    return (
      <div className="w-full overflow-hidden">
        <Topbar>
          <TopbarLeft>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Toggle sidebar"
              onClick={() => setClicked('sidebar')}
            >
              <IconLayoutSidebar className="h-4.5 w-4.5" />
            </Button>
            <TopbarBreadcrumbs>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setClicked('home');
                    }}
                    aria-label="Home"
                  >
                    <IconHomeFilled className="h-4 w-4" />
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Projects</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </TopbarBreadcrumbs>
          </TopbarLeft>
          <TopbarCenter>
            {clicked && (
              <div className="text-xs text-muted-foreground">Last clicked: {clicked}</div>
            )}
          </TopbarCenter>
          <TopbarRight>
            <Button size="sm" onClick={() => setClicked('new-item')}>
              <IconPlus />
              New Item
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Share"
              onClick={() => setClicked('share')}
            >
              <IconShare className="h-4 w-4" />
            </Button>
          </TopbarRight>
        </Topbar>
      </div>
    );
  },
};

/**
 * Topbar with long breadcrumb path
 */
export const LongBreadcrumb: Story = {
  parameters: {
    order: 8,
    docs: {
      description: {
        story:
          'Topbar with a long breadcrumb path demonstrating how it handles multiple levels of navigation.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Current Project')).toBeInTheDocument();
    await expect(canvas.getByText('Workspace')).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: /action/i })).toBeInTheDocument();
  },
  render: function TopbarLongBreadcrumbStory() {
    return (
      <div className="w-full overflow-hidden">
        <Topbar>
          <TopbarLeft>
            <Button variant="ghost" size="icon-sm" aria-label="Toggle sidebar">
              <IconLayoutSidebar className="h-4.5 w-4.5" />
            </Button>
            <TopbarBreadcrumbs>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" aria-label="Go to home">
                    <IconHomeFilled className="h-4 w-4" />
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Workspace</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Projects</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>2024</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Q1</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Current Project</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </TopbarBreadcrumbs>
          </TopbarLeft>
          <TopbarCenter />
          <TopbarRight>
            <Button size="sm">
              <IconPlus />
              Action
            </Button>
          </TopbarRight>
        </Topbar>
      </div>
    );
  },
};

/**
 * Interactive playground for testing topbar props.
 */
export const Playground: Story = {
  args: {
    className: '',
  },
  parameters: {
    order: 99,
    docs: {
      description: {
        story:
          'Interactive playground to test different topbar configurations. Use the controls panel to experiment with props.',
      },
    },
  },
  render: function TopbarPlaygroundStory(args) {
    return (
      <div className="flex items-center justify-center p-24">
        <div className="w-full overflow-hidden border rounded-lg">
          <Topbar {...args}>
            <TopbarLeft>
              <Button variant="ghost" size="icon-sm" aria-label="Toggle sidebar">
                <IconLayoutSidebar className="h-4.5 w-4.5" />
              </Button>
              <TopbarBreadcrumbs>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/" aria-label="Go to home">
                      <IconHomeFilled className="h-4 w-4" />
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Playground</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </TopbarBreadcrumbs>
            </TopbarLeft>
            <TopbarCenter>
              <div className="text-xs text-muted-foreground">Center content</div>
            </TopbarCenter>
            <TopbarRight>
              <Button size="sm">
                <IconPlus />
                Action
              </Button>
            </TopbarRight>
          </Topbar>
        </div>
      </div>
    );
  },
};
