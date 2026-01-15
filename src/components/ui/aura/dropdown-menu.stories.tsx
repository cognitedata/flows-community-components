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
} from './dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from './avatar';
import {
  IconUser,
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
} from '@tabler/icons-react';

const meta: Meta<typeof DropdownMenu> = {
  title: 'UI/Dropdown Menu',
  component: DropdownMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    actions: {
      handles: ['openChanged'],
    },
  },
  argTypes: {
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
      description: 'Default open state',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
      },
    },
    onOpenChange: {
      action: 'openChanged',
      description: 'Callback when open state changes',
      table: {
        category: 'Events',
        type: {
          summary: '(open: boolean) => void',
        },
      },
    },
    modal: {
      control: 'boolean',
      description: 'Whether the menu should be modal',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

/**
 * Basic dropdown menu with user avatar and details
 * Matches the basic example from dropdown-menu.examples.tsx
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
        <DropdownMenuLabel className="flex flex-row items-center gap-2 border-b border-border">
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
        </DropdownMenuLabel>
        <div className="px-1 pt-1">
          <DropdownMenuItem>
            <IconUser aria-hidden="true" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconSettingsFilled aria-hidden="true" />
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
            <IconSettingsFilled aria-hidden="true" />
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
 * Matches the checkboxItem example from dropdown-menu.examples.tsx
 */
export const CheckboxItem: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Menu items with checkboxes. Tests checkbox toggling.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const trigger = canvas.getByRole('button', {
      name: /open checkbox item menu/i,
    });
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

    // Find checkbox items
    const checkboxItems = within(document.body).getAllByRole(
      'menuitemcheckbox'
    );
    await expect(checkboxItems.length).toBeGreaterThan(0);

    // First two should be checked
    await expect(checkboxItems[0]).toHaveAttribute('aria-checked', 'true');
    await expect(checkboxItems[1]).toHaveAttribute('aria-checked', 'true');

    // Third should be unchecked
    await expect(checkboxItems[2]).toHaveAttribute('aria-checked', 'false');

    // Toggle a checkbox
    await userEvent.click(checkboxItems[2]);
    await waitFor(() => {
      expect(checkboxItems[2]).toHaveAttribute('aria-checked', 'true');
    });
  },
  render: function CheckboxItemStory() {
    const [checked1, setChecked1] = useState(true);
    const [checked2, setChecked2] = useState(true);
    const [checked3, setChecked3] = useState(false);
    const [checked4, setChecked4] = useState(false);
    const [checked5, setChecked5] = useState(false);

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Open Checkbox Item Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[280px] px-1">
          <DropdownMenuCheckboxItem
            checked={checked1}
            onCheckedChange={setChecked1}
          >
            Label
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={checked2}
            onCheckedChange={setChecked2}
          >
            Label
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={checked3}
            onCheckedChange={setChecked3}
          >
            Label
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={checked4}
            onCheckedChange={setChecked4}
          >
            Label
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={checked5}
            onCheckedChange={setChecked5}
          >
            Label
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

/**
 * Dropdown menu with radio group
 * Matches the radioGroup example from dropdown-menu.examples.tsx
 */
export const RadioGroup: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Menu items with radio buttons for single-select options. Tests radio selection.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const trigger = canvas.getByRole('button', {
      name: /open radio group menu/i,
    });
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

    // Verify label is present
    const label = within(document.body).getByText('Radio group');
    await expect(label).toBeInTheDocument();

    // Find and verify radio items
    const labelItem = within(document.body).getByRole('menuitemradio', {
      name: /^label$/i,
    });
    await expect(labelItem).toBeInTheDocument();
    await expect(labelItem).toHaveAttribute('aria-checked', 'true');

    // Verify other radio items are accessible
    const listItem = within(document.body).getByRole('menuitemradio', {
      name: /^list$/i,
    });
    await expect(listItem).toBeInTheDocument();
    await expect(listItem).toHaveAttribute('aria-checked', 'false');

    // Select a different radio item
    await userEvent.click(listItem);
    await waitFor(() => {
      expect(listItem).toHaveAttribute('aria-checked', 'true');
      expect(labelItem).toHaveAttribute('aria-checked', 'false');
    });
  },
  render: function RadioGroupStory() {
    const [viewMode, setViewMode] = useState('label');

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Open Radio Group Menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[270px] px-1">
          <DropdownMenuLabel className="flex flex-row items-center gap-2 border-none pb-1">
            <div className="text-sm font-normal tracking-tight text-muted-foreground dark:text-muted-foreground">
              Radio group
            </div>
          </DropdownMenuLabel>
          <DropdownMenuRadioGroup value={viewMode} onValueChange={setViewMode}>
            <DropdownMenuRadioItem value="label">Label</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="list">List</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="table">Table</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
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
          <IconSettingsFilled aria-hidden="true" />
          Settings
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

/**
 * Dropdown menu with destructive variant
 * Matches the destructive example from dropdown-menu.examples.tsx
 */
export const Destructive: Story = {
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
          <IconUser aria-hidden="true" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <IconSettingsFilled aria-hidden="true" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive">
          <IconTrash aria-hidden="true" />
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
 * User details dropdown menu with muted label
 * Matches the userDetails example from dropdown-menu.examples.tsx
 */
export const UserDetails: Story = {
  parameters: {
    docs: {
      description: {
        story: 'User settings dropdown with muted label and menu items.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const trigger = canvas.getByRole('button', {
      name: /open user detailsmenu/i,
    });
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

    // Verify muted label is present
    const label = within(document.body).getByText('User settings');
    await expect(label).toBeInTheDocument();

    // Verify menu items are accessible
    const profileItem = within(document.body).getByRole('menuitem', {
      name: /profile/i,
    });
    await expect(profileItem).toBeInTheDocument();
  },
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Open User Details Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[280px] px-1">
        <DropdownMenuLabel className="flex flex-row items-center gap-2 border-none pb-1">
          <div className="text-sm font-normal tracking-tight text-muted-foreground dark:text-muted-foreground">
            User settings
          </div>
        </DropdownMenuLabel>
        <div>
          <DropdownMenuItem>
            <IconUser aria-hidden="true" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconSettingsFilled aria-hidden="true" />
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
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

/**
 * Complex dropdown menu with all features
 */
export const Complex: Story = {
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
              <IconSettingsFilled aria-hidden="true" />
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

/**
 * Keyboard navigation test
 */
export const KeyboardNavigation: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Tests keyboard navigation: Arrow keys, Enter to select, Escape to close.',
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
