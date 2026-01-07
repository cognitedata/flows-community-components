'use client';

import type { Meta, StoryObj } from '@storybook/nextjs';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { useState } from 'react';
import {
  Topbar,
  TopbarLeft,
  TopbarCenter,
  TopbarRight,
  TopbarBreadcrumbs,
  TopbarAction,
  TopbarWithSidebar,
  TopbarContent,
} from './topbar';
import {
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from './breadcrumb';
import { Button } from './button';
import {
  IconLayoutSidebar,
  IconHomeFilled,
  IconPlus,
  IconShare,
  IconDownload,
  IconEdit,
  IconSettings,
  IconUsers,
  IconFileText,
  IconChartBar as BarChart3,
} from '@tabler/icons-react';
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from './sidebar';

const meta: Meta<typeof Topbar> = {
  title: 'UI/Topbar',
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
                  <BreadcrumbLink href="/">
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
    docs: {
      description: {
        story: 'Topbar with content in the center section.',
      },
    },
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
                  <BreadcrumbLink href="/">
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
    docs: {
      description: {
        story:
          'EOS-style topbar with download and edit actions, typically used in canvas applications.',
      },
    },
  },
  render: function TopbarEosStyleStory() {
    return (
      <div className="w-full border rounded-lg overflow-hidden">
        <Topbar>
          <TopbarLeft>
            <Button variant="ghost" size="icon" aria-label="Toggle sidebar">
              <IconLayoutSidebar className="h-4 w-4" />
            </Button>
            <TopbarBreadcrumbs>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">
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
            <Button size="sm">
              <IconEdit className="h-4 w-4" />
              New chat
            </Button>
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
    docs: {
      description: {
        story: 'Minimal topbar with only breadcrumbs, no action buttons.',
      },
    },
  },
  render: function TopbarMinimalStory() {
    return (
      <div className="w-full overflow-hidden">
        <Topbar>
          <TopbarLeft>
            <TopbarBreadcrumbs>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">
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
    docs: {
      description: {
        story: 'Topbar with multiple action buttons in the right section.',
      },
    },
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
                  <BreadcrumbLink href="/">
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
    docs: {
      description: {
        story:
          'Complete layout with Topbar and Sidebar working together. Shows a typical application structure.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find sidebar menu items
    const menuItems = canvas.getAllByRole('menuitem');
    await expect(menuItems.length).toBeGreaterThan(0);

    // Find the active menu item
    const activeItem = canvas.getByText('Overview');
    await expect(activeItem).toBeInTheDocument();
  },
  render: function TopbarWithSidebarStory() {
    return (
      <div className="relative h-[400px] w-full border rounded-lg overflow-hidden">
        <SidebarProvider>
          <div className="flex h-full w-full flex-col bg-background">
            <Topbar>
              <TopbarLeft>
                <Button variant="ghost" size="icon" aria-label="Toggle sidebar">
                  <IconLayoutSidebar className="h-4 w-4" />
                </Button>
                <TopbarBreadcrumbs>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">
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
            <div className="flex flex-1">
              <div className="w-64 bg-sidebar text-sidebar-foreground border-r">
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
                            <IconUsers className="h-4 w-4" />
                            <span>Users</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton>
                            <IconFileText className="h-4 w-4" />
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
                            <IconSettings className="h-4 w-4" />
                            <span>Settings</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                </SidebarContent>
              </div>
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
  },
};

/**
 * Interactive topbar with clickable actions
 */
export const Interactive: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Interactive topbar demonstrating button clicks and navigation interactions.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find and click the "New Item" button
    const newItemButton = canvas.getByRole('button', { name: /new item/i });
    await expect(newItemButton).toBeInTheDocument();
    await userEvent.click(newItemButton);

    // Find and click the share button
    const shareButton = canvas.getByRole('button', { name: /share/i });
    await expect(shareButton).toBeInTheDocument();
    await userEvent.click(shareButton);

    // Find and click breadcrumb links
    const homeLink = canvas.getByRole('link');
    await expect(homeLink).toBeInTheDocument();
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
                  <BreadcrumbLink href="/" onClick={() => setClicked('home')}>
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
              <div className="text-xs text-muted-foreground">
                Last clicked: {clicked}
              </div>
            )}
          </TopbarCenter>
          <TopbarRight>
            <Button
              size="sm"
              onClick={() => setClicked('new-item')}
            >
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
    docs: {
      description: {
        story:
          'Topbar with a long breadcrumb path demonstrating how it handles multiple levels of navigation.',
      },
    },
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
                  <BreadcrumbLink href="/">
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

