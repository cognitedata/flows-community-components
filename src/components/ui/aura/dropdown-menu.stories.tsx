'use client';

import type { Meta, StoryObj } from '@storybook/nextjs';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { useState } from 'react';
import { Button } from './button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuGroup,
  DropdownMenuHeader,
} from './dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from './avatar';
import {
  IconUser,
  IconSettings,
  IconSettingsFilled,
  IconBell,
  IconHelp,
  IconLogout,
  IconEdit,
  IconTrash,
  IconCopy,
  IconDownload,
  IconMail,
  IconPhone,
  IconMessage,
  IconCheck,
  IconChevronDown,
} from '@tabler/icons-react';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Primitives/Dropdown Menu',
  component: DropdownMenu,
  tags: ['autodocs'],
  args: {
    // Set modal to false for Storybook to avoid aria-hidden violations
    // In real apps, modal defaults to true (Radix UI default)
    modal: false,
  },
  argTypes: {
    // State
    open: {
      control: 'boolean',
      description: 'Controlled open state',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
      },
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Default open state (uncontrolled)',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    modal: {
      control: 'boolean',
      description:
        'Whether the dropdown is modal (blocks interaction with other content)',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },

    // Events
    onOpenChange: {
      action: 'openChanged',
      description: 'Callback when open state changes',
      table: {
        category: 'Events',
        type: { summary: '(open: boolean) => void' },
      },
    },
  },
  parameters: {
    layout: 'centered',
    actions: {
      handles: ['click', 'openChanged'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

/**
 * Basic dropdown menu with user avatar and details
 * Tests basic interactions and structure
 */
export const Basic: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Basic dropdown menu with user avatar, name, email, and menu items. Tests opening, closing, and item selection.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the trigger button
    const trigger = canvas.getByRole('button', { name: /open menu/i });
    await expect(trigger).toBeInTheDocument();
    await expect(trigger).toBeVisible();

    // Click to open the menu
    await userEvent.click(trigger);

    // Wait for menu to appear (menu is rendered in a portal, so check document)
    await waitFor(
      () => {
        const menu = document.querySelector(
          '[data-slot="dropdown-menu-content"]'
        );
        expect(menu).toBeInTheDocument();
        expect(menu).toBeVisible();
      },
      { timeout: 1000 }
    );

    // Verify user details are present
    const userName = within(document.body).getByText('Jane Smith');
    await expect(userName).toBeInTheDocument();

    const userEmail = within(document.body).getByText('jane.smith@cognite.com');
    await expect(userEmail).toBeInTheDocument();

    // Verify menu items are accessible
    const profileItem = within(document.body).getByRole('menuitem', {
      name: /profile/i,
    });
    const settingsItem = within(document.body).getByRole('menuitem', {
      name: /settings/i,
    });
    await expect(profileItem).toBeInTheDocument();
    await expect(settingsItem).toBeInTheDocument();

    // Find and click a menu item (also in portal)
    await userEvent.click(profileItem);

    // Menu should close after clicking
    await waitFor(
      () => {
        const menu = document.querySelector(
          '[data-slot="dropdown-menu-content"]'
        );
        expect(menu).not.toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  },
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[280px]">
        <DropdownMenuHeader>
          <Avatar variant="default">
            <AvatarImage src="/user-avatar2.png" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="text-base tracking-tighter font-medium">
              Jane Smith
            </div>
            <span className="text-sm font-normal tracking-tight text-muted-foreground dark:text-muted-foreground">
              jane.smith@cognite.com
            </span>
          </div>
        </DropdownMenuHeader>
        <div className="px-1 pt-1">
          <DropdownMenuItem>
            <IconUser />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconSettingsFilled />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconBell />
            Notifications
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconHelp />
            Help
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

/**
 * Dropdown menu with labels and separators
 */
export const WithLabelsAndSeparators: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Dropdown menu organized with labels and separators for better structure.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const trigger = canvas.getByRole('button', { name: /open menu/i });
    await expect(trigger).toBeInTheDocument();
    await userEvent.click(trigger);

    await waitFor(
      () => {
        const menu = document.querySelector(
          '[data-slot="dropdown-menu-content"]'
        );
        expect(menu).toBeInTheDocument();
        expect(menu).toBeVisible();
      },
      { timeout: 1000 }
    );

    // Verify labels are present and accessible
    const accountLabel = within(document.body).getByText('My Account');
    await expect(accountLabel).toBeInTheDocument();
    await expect(accountLabel).toBeVisible();

    // Verify menu items are accessible
    const profileItem = within(document.body).getByRole('menuitem', {
      name: /profile/i,
    });
    await expect(profileItem).toBeInTheDocument();
  },
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <IconUser aria-hidden="true" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconSettings aria-hidden="true" />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <IconLogout aria-hidden="true" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

/**
 * Dropdown menu with keyboard shortcuts
 */
export const WithShortcuts: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Menu items with keyboard shortcuts displayed on the right side.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const trigger = canvas.getByRole('button', { name: /open menu/i });
    await expect(trigger).toBeInTheDocument();
    await userEvent.click(trigger);

    await waitFor(
      () => {
        const menu = document.querySelector(
          '[data-slot="dropdown-menu-content"]'
        );
        expect(menu).toBeInTheDocument();
        expect(menu).toBeVisible();
      },
      { timeout: 1000 }
    );

    // Verify shortcuts are visible and accessible
    const copyShortcut = within(document.body).getByText('⌘C');
    await expect(copyShortcut).toBeInTheDocument();
    await expect(copyShortcut).toBeVisible();

    // Verify menu items with shortcuts are accessible
    const copyItem = within(document.body).getByRole('menuitem', {
      name: /copy/i,
    });
    await expect(copyItem).toBeInTheDocument();
  },
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>
          <IconCopy aria-hidden="true" />
          Copy
          <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <IconEdit aria-hidden="true" />
          Edit
          <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <IconDownload aria-hidden="true" />
          Download
          <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

/**
 * Dropdown menu with checkbox items
 */
export const WithCheckboxItems: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Dropdown menu with checkbox items. Menu stays open when toggling checkboxes. Shows selected items above for better visibility.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open menu
    const trigger = canvas.getByRole('button', { name: /filters/i });
    await userEvent.click(trigger);

    // Wait for menu
    await waitFor(
      () => {
        const menu = canvasElement.ownerDocument.querySelector(
          '[data-slot="dropdown-menu-content"]'
        );
        expect(menu).toBeInTheDocument();
      },
      { timeout: 1000 }
    );

    // Verify initial state shows 2 notifications selected
    const outputDiv = canvasElement.querySelector(
      '[data-testid="checkbox-output"]'
    );
    expect(outputDiv?.textContent).toContain('2');
    expect(outputDiv?.textContent).toContain('notification');
    expect(outputDiv?.textContent).toContain('selected');

    // Find checkbox items in the portal
    const menuDoc = canvasElement.ownerDocument;
    const checkboxItems = menuDoc.querySelectorAll(
      '[data-slot="dropdown-menu-checkbox-item"]'
    );
    expect(checkboxItems.length).toBeGreaterThanOrEqual(4);

    // Click first checkbox (should toggle it)
    await userEvent.click(checkboxItems[0] as Element);

    // Menu should still be open
    await waitFor(() => {
      const menu = menuDoc.querySelector('[data-slot="dropdown-menu-content"]');
      expect(menu).toBeInTheDocument();
    });

    // Verify count updated to 1 notification selected
    await waitFor(() => {
      const outputDiv = canvasElement.querySelector(
        '[data-testid="checkbox-output"]'
      );
      expect(outputDiv?.textContent).toContain('1');
      expect(outputDiv?.textContent).toContain('notification');
      expect(outputDiv?.textContent).toContain('selected');
    });
  },
  render: function WithCheckboxItemsStory() {
    const [checkedItems, setCheckedItems] = useState({
      emails: true,
      messages: true,
      updates: false,
      security: false,
    });

    const selectedCount = Object.values(checkedItems).filter(Boolean).length;

    return (
      <div className="space-y-4">
        <div
          className="text-sm text-muted-foreground"
          data-testid="checkbox-output"
        >
          {selectedCount} notification{selectedCount !== 1 ? 's' : ''} selected:
          <ul className="mt-2 space-y-1">
            {checkedItems.emails && (
              <li className="flex items-center gap-2">
                <IconCheck className="size-3 text-success" /> Email
                notifications
              </li>
            )}
            {checkedItems.messages && (
              <li className="flex items-center gap-2">
                <IconCheck className="size-3 text-success" /> Direct messages
              </li>
            )}
            {checkedItems.updates && (
              <li className="flex items-center gap-2">
                <IconCheck className="size-3 text-success" /> Product updates
              </li>
            )}
            {checkedItems.security && (
              <li className="flex items-center gap-2">
                <IconCheck className="size-3 text-success" /> Security alerts
              </li>
            )}
          </ul>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Filters
              <IconChevronDown className="ml-2 size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64">
            <DropdownMenuLabel>Notification Preferences</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuCheckboxItem
                checked={checkedItems.emails}
                onCheckedChange={(checked) =>
                  setCheckedItems((prev) => ({ ...prev, emails: checked }))
                }
              >
                Email notifications
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={checkedItems.messages}
                onCheckedChange={(checked) =>
                  setCheckedItems((prev) => ({ ...prev, messages: checked }))
                }
              >
                Direct messages
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={checkedItems.updates}
                onCheckedChange={(checked) =>
                  setCheckedItems((prev) => ({ ...prev, updates: checked }))
                }
              >
                Product updates
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={checkedItems.security}
                onCheckedChange={(checked) =>
                  setCheckedItems((prev) => ({ ...prev, security: checked }))
                }
              >
                Security alerts
              </DropdownMenuCheckboxItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  },
};

/**
 * Dropdown menu with radio group
 */
export const WithRadioGroup: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Dropdown menu with radio group items. Menu stays open when selecting options. Shows current selection above for better visibility.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify initial selection
    const outputDiv = canvasElement.querySelector(
      '[data-testid="radio-output"]'
    );
    expect(outputDiv?.textContent).toContain('Current view:');
    expect(outputDiv?.textContent).toContain('grid');

    // Open menu
    const trigger = canvas.getByRole('button', { name: /change view/i });
    await userEvent.click(trigger);

    // Wait for menu
    await waitFor(
      () => {
        const menu = canvasElement.ownerDocument.querySelector(
          '[data-slot="dropdown-menu-content"]'
        );
        expect(menu).toBeInTheDocument();
      },
      { timeout: 1000 }
    );

    // Find and click "List" radio item
    const menuDoc = canvasElement.ownerDocument;
    const radioItems = menuDoc.querySelectorAll(
      '[data-slot="dropdown-menu-radio-item"]'
    );

    // Click the second radio item (List)
    await userEvent.click(radioItems[1] as Element);

    // Menu should still be open
    await waitFor(() => {
      const menu = menuDoc.querySelector('[data-slot="dropdown-menu-content"]');
      expect(menu).toBeInTheDocument();
    });

    // Verify selection updated
    await waitFor(() => {
      const outputDiv = canvasElement.querySelector(
        '[data-testid="radio-output"]'
      );
      expect(outputDiv?.textContent).toContain('Current view:');
      expect(outputDiv?.textContent).toContain('list');
    });
  },
  render: function WithRadioGroupStory() {
    const [viewMode, setViewMode] = useState('grid');

    return (
      <div className="space-y-4">
        <div
          className="text-sm text-muted-foreground"
          data-testid="radio-output"
        >
          Current view:{' '}
          <span className="font-medium text-foreground capitalize">
            {viewMode}
          </span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Change View
              <IconChevronDown className="ml-2 size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48">
            <DropdownMenuLabel>Display Mode</DropdownMenuLabel>
            <DropdownMenuRadioGroup
              value={viewMode}
              onValueChange={setViewMode}
            >
              <DropdownMenuRadioItem value="grid">
                Grid view
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="list">
                List view
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="table">
                Table view
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="kanban">
                Kanban board
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  },
};

/**
 * Dropdown menu with submenu
 */
export const WithSubmenu: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Menu with nested submenu. Tests opening and navigating submenus.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const trigger = canvas.getByRole('button', { name: /open menu/i });
    await expect(trigger).toBeInTheDocument();
    await userEvent.click(trigger);

    await waitFor(
      () => {
        const menu = document.querySelector(
          '[data-slot="dropdown-menu-content"]'
        );
        expect(menu).toBeInTheDocument();
        expect(menu).toBeVisible();
      },
      { timeout: 1000 }
    );

    // Hover over submenu trigger
    const inviteSubmenu = within(document.body).getByRole('menuitem', {
      name: /invite users/i,
    });
    await expect(inviteSubmenu).toBeInTheDocument();
    await expect(inviteSubmenu).toBeVisible();
    await userEvent.hover(inviteSubmenu);

    // Wait for submenu to appear
    await waitFor(
      () => {
        const submenu = document.querySelector(
          '[data-slot="dropdown-menu-sub-content"]'
        );
        expect(submenu).toBeInTheDocument();
        expect(submenu).toBeVisible();
      },
      { timeout: 1000 }
    );

    // Verify submenu items are accessible
    const emailItem = within(document.body).getByRole('menuitem', {
      name: /^email$/i,
    });
    await expect(emailItem).toBeInTheDocument();
    await expect(emailItem).toBeVisible();
  },
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>
          <IconUser aria-hidden="true" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <IconUser aria-hidden="true" />
            Invite users
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>
              <IconMail aria-hidden="true" />
              Email
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconMessage aria-hidden="true" />
              Message
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconPhone aria-hidden="true" />
              Phone
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <IconSettings aria-hidden="true" />
          Settings
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

/**
 * Dropdown menu with destructive variant
 */
export const WithDestructiveAction: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Menu item with destructive variant for dangerous actions like delete.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const trigger = canvas.getByRole('button', { name: /open menu/i });
    await expect(trigger).toBeInTheDocument();
    await userEvent.click(trigger);

    await waitFor(
      () => {
        const menu = document.querySelector(
          '[data-slot="dropdown-menu-content"]'
        );
        expect(menu).toBeInTheDocument();
        expect(menu).toBeVisible();
      },
      { timeout: 1000 }
    );

    // Verify regular menu items are present
    const profileItem = within(document.body).getByRole('menuitem', {
      name: /profile/i,
    });
    await expect(profileItem).toBeInTheDocument();

    // Verify destructive item is present and accessible
    const deleteItem = within(document.body).getByRole('menuitem', {
      name: /delete/i,
    });
    await expect(deleteItem).toBeInTheDocument();
    await expect(deleteItem).toBeVisible();
    await expect(deleteItem).toHaveAttribute('data-variant', 'destructive');
  },
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px] px-1">
        <DropdownMenuItem>
          <IconUser />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <IconSettingsFilled />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive">
          <IconTrash />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

/**
 * Dropdown menu with disabled items
 */
export const WithDisabledItems: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Menu with some items disabled to show unavailable actions.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const trigger = canvas.getByRole('button', { name: /open menu/i });
    await expect(trigger).toBeInTheDocument();
    await userEvent.click(trigger);

    await waitFor(
      () => {
        const menu = document.querySelector(
          '[data-slot="dropdown-menu-content"]'
        );
        expect(menu).toBeInTheDocument();
        expect(menu).toBeVisible();
      },
      { timeout: 1000 }
    );

    // Verify disabled items are present and properly disabled
    const duplicateItem = within(document.body).getByRole('menuitem', {
      name: /duplicate/i,
    });
    await expect(duplicateItem).toBeInTheDocument();
    await expect(duplicateItem).toHaveAttribute('aria-disabled', 'true');

    const deleteItem = within(document.body).getByRole('menuitem', {
      name: /delete/i,
    });
    await expect(deleteItem).toBeInTheDocument();
    await expect(deleteItem).toHaveAttribute('aria-disabled', 'true');
    await expect(deleteItem).toHaveAttribute('data-variant', 'destructive');

    // Verify enabled item is clickable
    const editItem = within(document.body).getByRole('menuitem', {
      name: /^edit$/i,
    });
    await expect(editItem).toBeInTheDocument();
    await expect(editItem).not.toHaveAttribute('aria-disabled', 'true');
  },
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>
          <IconEdit aria-hidden="true" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <IconCopy aria-hidden="true" />
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled variant="destructive">
          <IconTrash aria-hidden="true" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

/**
 * Keyboard navigation test
 */
export const KeyboardNavigation: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Tests keyboard navigation: Space/Enter to open, Arrow keys (not Tab) to navigate between items, Enter to select, Esc to close.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const trigger = canvas.getByRole('button', { name: /open menu/i });
    await expect(trigger).toBeInTheDocument();

    // Open menu with Enter key
    trigger.focus();
    await userEvent.keyboard('{Enter}');

    await waitFor(
      () => {
        const menu = document.querySelector(
          '[data-slot="dropdown-menu-content"]'
        );
        expect(menu).toBeInTheDocument();
        expect(menu).toBeVisible();
      },
      { timeout: 1000 }
    );

    // Verify first item is focused
    const firstItem = within(document.body).getByRole('menuitem', {
      name: /profile/i,
    });
    await expect(firstItem).toBeInTheDocument();

    // Navigate with arrow keys
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{ArrowDown}');

    // Select with Enter
    await userEvent.keyboard('{Enter}');

    // Menu should close
    await waitFor(
      () => {
        const menu = document.querySelector(
          '[data-slot="dropdown-menu-content"]'
        );
        expect(menu).not.toBeInTheDocument();
      },
      { timeout: 1000 }
    );

    // Test Escape key to close
    await userEvent.click(trigger);
    await waitFor(
      () => {
        const menu = document.querySelector(
          '[data-slot="dropdown-menu-content"]'
        );
        expect(menu).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
    await userEvent.keyboard('{Escape}');
    await waitFor(
      () => {
        const menu = document.querySelector(
          '[data-slot="dropdown-menu-content"]'
        );
        expect(menu).not.toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  },
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <IconUser aria-hidden="true" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <IconSettings aria-hidden="true" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem>
          <IconBell aria-hidden="true" />
          Notifications
        </DropdownMenuItem>
        <DropdownMenuItem>
          <IconHelp aria-hidden="true" />
          Help
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

/**
 * Edge case: Empty menu
 */
export const EmptyMenu: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Edge case: Dropdown menu with no available items, showing disabled placeholder.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open menu
    const trigger = canvas.getByRole('button');
    await userEvent.click(trigger);

    // Menu should still render (empty)
    await waitFor(
      () => {
        const menu = canvasElement.ownerDocument.querySelector(
          '[data-slot="dropdown-menu-content"]'
        );
        expect(menu).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  },
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Empty Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem disabled className="justify-center">
          No items available
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

/**
 * Edge case: Disabled trigger
 */
export const DisabledTrigger: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Edge case: Dropdown menu with disabled trigger button.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify button is disabled
    const trigger = canvas.getByRole('button');
    await expect(trigger).toBeDisabled();
    await expect(trigger).toHaveAttribute('aria-haspopup', 'menu');

    // Verify menu is not open (disabled buttons cannot be interacted with)
    const menu = canvasElement.ownerDocument.querySelector(
      '[data-slot="dropdown-menu-content"]'
    );
    expect(menu).not.toBeInTheDocument();

    // Verify the button has pointer-events: none (expected for disabled state)
    const styles = window.getComputedStyle(trigger);
    expect(styles.pointerEvents).toBe('none');
  },
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button disabled>Disabled Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>
          <IconUser />
          Profile
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

/**
 * Complex dropdown menu with all features
 */
export const ComplexInteractive: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Comprehensive example with labels, separators, checkboxes, radio groups, submenus, and shortcuts.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const trigger = canvas.getByRole('button', { name: /open menu/i });
    await expect(trigger).toBeInTheDocument();
    await userEvent.click(trigger);

    await waitFor(
      () => {
        const menu = document.querySelector(
          '[data-slot="dropdown-menu-content"]'
        );
        expect(menu).toBeInTheDocument();
        expect(menu).toBeVisible();
      },
      { timeout: 1000 }
    );

    // Test checkbox interaction
    const statusBar = within(document.body).getByRole('menuitemcheckbox', {
      name: /status bar/i,
    });
    await expect(statusBar).toBeInTheDocument();
    await expect(statusBar).toHaveAttribute('aria-checked', 'false');
    await userEvent.click(statusBar);
    await waitFor(() => {
      expect(statusBar).toHaveAttribute('aria-checked', 'true');
    });

    // Test submenu
    const inviteSubmenu = within(document.body).getByRole('menuitem', {
      name: /invite users/i,
    });
    await expect(inviteSubmenu).toBeInTheDocument();
    await userEvent.hover(inviteSubmenu);

    await waitFor(
      () => {
        const submenu = document.querySelector(
          '[data-slot="dropdown-menu-sub-content"]'
        );
        expect(submenu).toBeInTheDocument();
        expect(submenu).toBeVisible();
      },
      { timeout: 1000 }
    );

    // Verify submenu items are accessible
    const emailItem = within(document.body).getByRole('menuitem', {
      name: /^email$/i,
    });
    await expect(emailItem).toBeInTheDocument();
  },
  render: function ComplexStory() {
    const [showStatusBar, setShowStatusBar] = useState(false);
    const [position, setPosition] = useState('bottom');

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Open Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <IconUser aria-hidden="true" />
              Profile
              <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconSettings aria-hidden="true" />
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={showStatusBar}
            onCheckedChange={setShowStatusBar}
          >
            Status Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <IconUser aria-hidden="true" />
              Invite users
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <IconMail aria-hidden="true" />
                Email
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconMessage aria-hidden="true" />
                Message
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            <IconLogout aria-hidden="true" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};
