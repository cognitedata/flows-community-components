import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/aura/avatar";
import { Button } from "@/components/ui/aura/button";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import {
  IconBell,
  IconCheck,
  IconChevronDown,
  IconHelp,
  IconSettingsFilled,
  IconTrash,
  IconUser,
} from "@tabler/icons-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuHeader,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";

const meta: Meta<typeof DropdownMenu> = {
  title: "Primitives/Dropdown Menu",
  component: DropdownMenu,
  tags: ["autodocs"],
  args: {
    // Set modal to false for Storybook to avoid aria-hidden violations
    // In real apps, modal defaults to true
    modal: false,
  },
  argTypes: {
    // State
    open: {
      control: "boolean",
      description: "Controlled open state",
      table: {
        category: "State",
        type: { summary: "boolean" },
      },
    },
    defaultOpen: {
      control: "boolean",
      description: "Default open state (uncontrolled)",
      table: {
        category: "State",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    modal: {
      control: "boolean",
      description: "Whether the dropdown is modal (blocks interaction with other content)",
      table: {
        category: "Behavior",
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },

    // Events
    onOpenChange: {
      action: "openChanged",
      description: "Callback when open state changes",
      table: {
        category: "Events",
        type: { summary: "(open: boolean) => void" },
      },
    },
  },
  parameters: {
    layout: "centered",
    actions: {
      handles: ["click", "openChanged"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

/**
 * Basic dropdown menu with standard menu items
 * Tests basic interactions and structure
 */
export const Basic: Story = {
  parameters: {
    order: 1,
    docs: {
      description: {
        story:
          "Basic dropdown menu with standard action items. Tests opening, clicking items, and accessibility.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find and verify trigger button
    const trigger = canvas.getByRole("button", { name: /open menu/i });
    await expect(trigger).toBeInTheDocument();
    await expect(trigger).toHaveAttribute("aria-haspopup");

    // Click to open menu
    await userEvent.click(trigger);

    // Wait for menu to open (it's in a portal)
    await waitFor(
      () => {
        const menu = canvasElement.ownerDocument.querySelector(
          '[data-slot="dropdown-menu-content"]'
        );
        if (!menu) {
          throw new Error("Menu not found");
        }
        expect(menu).toBeInTheDocument();
      },
      { timeout: 1000 }
    );

    // Verify menu items
    const menuContent = canvasElement.ownerDocument.querySelector(
      '[data-slot="dropdown-menu-content"]'
    );
    await expect(menuContent).toHaveTextContent("Profile");
    await expect(menuContent).toHaveTextContent("Settings");
    await expect(menuContent).toHaveTextContent("Help");
  },
  render: function BasicStory() {
    return (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger render={<Button>Open Menu</Button>} />
        <DropdownMenuContent className="w-56">
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
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

/**
 * Dropdown menu with avatar and user info in label
 * Demonstrates complex label content
 */
export const WithUserLabel: Story = {
  parameters: {
    order: 2,
    docs: {
      description: {
        story: "Dropdown menu with rich label content including avatar and user information.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open menu
    const trigger = canvas.getByRole("button");
    await userEvent.click(trigger);

    // Wait for menu and verify label content
    await waitFor(
      () => {
        const menu = canvasElement.ownerDocument.querySelector(
          '[data-slot="dropdown-menu-content"]'
        );
        expect(menu).toHaveTextContent("Jane Smith");
        expect(menu).toHaveTextContent("jane.smith@cognite.com");
      },
      { timeout: 1000 }
    );
  },
  render: function WithUserLabelStory() {
    return (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger render={<Button>User Menu</Button>} />
        <DropdownMenuContent className="w-72">
          <DropdownMenuHeader>
            <Avatar variant="default">
              <AvatarImage src="/user-avatar2.png" alt="" />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="text-base tracking-tighter font-medium">Jane Smith</div>
              <span className="text-sm font-normal tracking-tight text-muted-foreground">
                jane.smith@cognite.com
              </span>
            </div>
          </DropdownMenuHeader>
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
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

/**
 * Interactive checkbox menu showing selected items
 * Demonstrates stateful checkbox interactions
 */
export const WithCheckboxItems: Story = {
  parameters: {
    order: 3,
    docs: {
      description: {
        story:
          "Dropdown menu with checkbox items. Menu stays open when toggling checkboxes. Shows selected items above for better visibility.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open menu
    const trigger = canvas.getByRole("button", { name: /filters/i });
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
    const outputDiv = canvasElement.querySelector('[data-testid="checkbox-output"]');
    expect(outputDiv?.textContent).toContain("2");
    expect(outputDiv?.textContent).toContain("notification");
    expect(outputDiv?.textContent).toContain("selected");

    // Find checkbox items in the portal
    const menuDoc = canvasElement.ownerDocument;
    const checkboxItems = menuDoc.querySelectorAll('[data-slot="dropdown-menu-checkbox-item"]');
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
      const outputDiv = canvasElement.querySelector('[data-testid="checkbox-output"]');
      expect(outputDiv?.textContent).toContain("1");
      expect(outputDiv?.textContent).toContain("notification");
      expect(outputDiv?.textContent).toContain("selected");
    });
  },
  render: function WithCheckboxItemsStory({ modal = false }) {
    const [checkedItems, setCheckedItems] = useState({
      emails: true,
      messages: true,
      updates: false,
      security: false,
    });

    const selectedCount = Object.values(checkedItems).filter(Boolean).length;

    return (
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground" data-testid="checkbox-output">
          {selectedCount} notification{selectedCount !== 1 ? "s" : ""} selected:
          <ul className="mt-2 space-y-1">
            {checkedItems.emails && (
              <li className="flex items-center gap-2">
                <IconCheck className="size-3 text-success" /> Email notifications
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
        <DropdownMenu modal={modal}>
          <DropdownMenuTrigger
            render={
              <Button variant="outline">
                Filters
                <IconChevronDown className="ml-2 size-4" />
              </Button>
            }
          />
          <DropdownMenuContent className="w-64">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Notification Preferences</DropdownMenuLabel>
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
 * Interactive radio group showing selected option
 * Demonstrates stateful radio interactions
 */
export const WithRadioGroup: Story = {
  parameters: {
    order: 4,
    docs: {
      description: {
        story:
          "Dropdown menu with radio group items. Menu stays open when selecting options. Shows current selection above for better visibility.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify initial selection
    const outputDiv = canvasElement.querySelector('[data-testid="radio-output"]');
    expect(outputDiv?.textContent).toContain("Current view:");
    expect(outputDiv?.textContent).toContain("grid");

    // Open menu
    const trigger = canvas.getByRole("button", { name: /change view/i });
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
    const radioItems = menuDoc.querySelectorAll('[data-slot="dropdown-menu-radio-item"]');

    // Click the second radio item (List)
    await userEvent.click(radioItems[1] as Element);

    // Menu should still be open
    await waitFor(() => {
      const menu = menuDoc.querySelector('[data-slot="dropdown-menu-content"]');
      expect(menu).toBeInTheDocument();
    });

    // Verify selection updated
    await waitFor(() => {
      const outputDiv = canvasElement.querySelector('[data-testid="radio-output"]');
      expect(outputDiv?.textContent).toContain("Current view:");
      expect(outputDiv?.textContent).toContain("list");
    });
  },
  render: function WithRadioGroupStory({ modal = false }) {
    const [viewMode, setViewMode] = useState("grid");

    return (
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground" data-testid="radio-output">
          Current view: <span className="font-medium text-foreground capitalize">{viewMode}</span>
        </div>
        <DropdownMenu modal={modal}>
          <DropdownMenuTrigger
            render={
              <Button variant="outline">
                Change View
                <IconChevronDown className="ml-2 size-4" />
              </Button>
            }
          />
          <DropdownMenuContent className="w-48">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Display Mode</DropdownMenuLabel>
              <DropdownMenuRadioGroup value={viewMode} onValueChange={setViewMode}>
                <DropdownMenuRadioItem value="grid">Grid view</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="list">List view</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="table">Table view</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="kanban">Kanban board</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  },
};

/**
 * Dropdown menu with destructive action
 * Tests destructive variant styling
 */
export const WithDestructiveAction: Story = {
  parameters: {
    order: 5,
    docs: {
      description: {
        story:
          "Dropdown menu with a destructive action item. Destructive items have warning styling.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open menu
    const trigger = canvas.getByRole("button");
    await userEvent.click(trigger);

    // Wait for menu and verify destructive item
    await waitFor(
      () => {
        const menu = canvasElement.ownerDocument.querySelector(
          '[data-slot="dropdown-menu-content"]'
        );
        expect(menu).toHaveTextContent("Delete");

        // Verify destructive variant
        const deleteItem = canvasElement.ownerDocument.querySelector(
          '[data-variant="destructive"]'
        );
        expect(deleteItem).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  },
  render: function WithDestructiveActionStory({ modal = false }) {
    const [action, setAction] = useState<string>("");

    return (
      <div className="space-y-4">
        <DropdownMenu modal={modal}>
          <DropdownMenuTrigger render={<Button>Actions</Button>} />
          <DropdownMenuContent className="w-48">
            <DropdownMenuItem onClick={() => setAction("Viewed profile")}>
              <IconUser />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setAction("Opened settings")}>
              <IconSettingsFilled />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={() => setAction("Deleted item")}>
              <IconTrash />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  },
};

/**
 * Keyboard navigation test
 * Demonstrates keyboard accessibility
 */
export const KeyboardNavigation: Story = {
  parameters: {
    order: 6,
    docs: {
      description: {
        story:
          "Tests keyboard navigation: Space/Enter to open, Arrow keys (not Tab) to navigate between items, Enter to select, Esc to close. Tab key moves focus out of the menu.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find trigger
    const trigger = canvas.getByRole("button");
    trigger.focus();
    await expect(trigger).toHaveFocus();

    // Press Enter to open
    await userEvent.keyboard("{Enter}");

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

    // Press ArrowDown to navigate
    await userEvent.keyboard("{ArrowDown}");
    await waitFor(() => {
      const menuDoc = canvasElement.ownerDocument;
      const focused = menuDoc.activeElement;
      expect(focused).toHaveAttribute("data-slot", "dropdown-menu-item");
    });

    // Press Escape to close
    await userEvent.keyboard("{Escape}");

    // Wait for menu to close
    await waitFor(
      () => {
        const menu = canvasElement.ownerDocument.querySelector(
          '[data-slot="dropdown-menu-content"]'
        );
        expect(menu).not.toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  },
  render: function KeyboardNavigationStory({ modal = false }) {
    const [selectedItem, setSelectedItem] = useState<string>("");

    return (
      <div className="space-y-4">
        {selectedItem && (
          <div className="text-sm text-muted-foreground">
            Selected: <span className="font-medium text-foreground">{selectedItem}</span>
          </div>
        )}
        <DropdownMenu modal={modal}>
          <DropdownMenuTrigger render={<Button>Keyboard Test</Button>} />
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem onClick={() => setSelectedItem("First Item")}>
              <IconUser />
              First Item
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedItem("Second Item")}>
              <IconSettingsFilled />
              Second Item
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedItem("Third Item")}>
              <IconBell />
              Third Item
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  },
};

/**
 * Edge case: Empty menu
 */
export const EmptyMenu: Story = {
  parameters: {
    order: 7,
    docs: {
      description: {
        story: "Edge case: Dropdown menu with no available items, showing disabled placeholder.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open menu
    const trigger = canvas.getByRole("button");
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
  render: function EmptyMenuStory() {
    return (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger render={<Button>Empty Menu</Button>} />
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem disabled className="justify-center">
            No items available
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

/**
 * Edge case: Disabled trigger
 */
export const DisabledTrigger: Story = {
  parameters: {
    order: 8,
    docs: {
      description: {
        story: "Edge case: Dropdown menu with disabled trigger button.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify button is disabled
    const trigger = canvas.getByRole("button");
    await expect(trigger).toBeDisabled();
    await expect(trigger).toHaveAttribute("aria-haspopup", "menu");

    // Verify menu is not open (disabled buttons cannot be interacted with)
    const menu = canvasElement.ownerDocument.querySelector('[data-slot="dropdown-menu-content"]');
    expect(menu).not.toBeInTheDocument();

    // Verify the button has pointer-events: none (expected for disabled state)
    const styles = window.getComputedStyle(trigger);
    expect(styles.pointerEvents).toBe("none");
  },
  render: function DisabledTriggerStory() {
    return (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger render={<Button disabled>Disabled Menu</Button>} />
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem>
            <IconUser />
            Profile
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

/**
 * Complex interactive example with multiple features
 */
export const ComplexInteractive: Story = {
  parameters: {
    order: 9,
    docs: {
      description: {
        story:
          "Complex example combining checkboxes, radio groups, and actions. Shows full state management.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open menu
    const trigger = canvas.getByRole("button", { name: /preferences/i });
    await userEvent.click(trigger);

    // Wait for menu to open
    await waitFor(
      () => {
        const menu = canvasElement.ownerDocument.querySelector(
          '[data-slot="dropdown-menu-content"]'
        );
        expect(menu).toBeInTheDocument();
      },
      { timeout: 1000 }
    );

    // Test checkbox interaction - toggle email notification
    const menuDoc = canvasElement.ownerDocument;
    const checkboxItems = menuDoc.querySelectorAll('[data-slot="dropdown-menu-checkbox-item"]');
    expect(checkboxItems.length).toBeGreaterThanOrEqual(3);

    // Click first checkbox (email)
    await userEvent.click(checkboxItems[0] as Element);

    // Test radio interaction - change theme
    const radioItems = menuDoc.querySelectorAll('[data-slot="dropdown-menu-radio-item"]');
    expect(radioItems.length).toBeGreaterThanOrEqual(3);

    // Click second radio (dark)
    await userEvent.click(radioItems[1] as Element);

    // Menu should still be open after interactions
    await waitFor(() => {
      const menu = menuDoc.querySelector('[data-slot="dropdown-menu-content"]');
      expect(menu).toBeInTheDocument();
    });

    // Verify reset button exists (but don't click it as it closes the menu)
    const items = menuDoc.querySelectorAll('[data-slot="dropdown-menu-item"]');
    let resetButton: Element | null = null;
    items.forEach((item) => {
      if (item.textContent?.includes("Reset to defaults")) {
        resetButton = item;
      }
    });
    expect(resetButton).toBeInTheDocument();
  },
  render: function ComplexInteractiveStory({ modal = false }) {
    const [notifications, setNotifications] = useState({
      email: true,
      push: false,
      sms: false,
    });
    const [theme, setTheme] = useState("light");
    const [lastAction, setLastAction] = useState("");

    const notificationCount = Object.values(notifications).filter(Boolean).length;

    return (
      <div className="space-y-6 w-80">
        <div className="space-y-3 text-sm">
          <div>
            <span className="font-medium">Notifications:</span>{" "}
            <span className="text-muted-foreground">
              {notificationCount} type{notificationCount !== 1 ? "s" : ""} enabled
            </span>
            {notificationCount > 0 && (
              <ul className="mt-1 ml-4 space-y-0.5 text-muted-foreground">
                {notifications.email && <li>• Email</li>}
                {notifications.push && <li>• Push</li>}
                {notifications.sms && <li>• SMS</li>}
              </ul>
            )}
          </div>

          <div>
            <span className="font-medium">Theme:</span>{" "}
            <span className="text-muted-foreground capitalize">{theme}</span>
          </div>

          {lastAction && (
            <div className="pt-2 border-t">
              <span className="font-medium">Last action:</span>{" "}
              <span className="text-muted-foreground">{lastAction}</span>
            </div>
          )}
        </div>

        <DropdownMenu modal={modal}>
          <DropdownMenuTrigger
            render={
              <Button variant="outline" className="w-full">
                Preferences
                <IconChevronDown className="ml-auto size-4" />
              </Button>
            }
          />
          <DropdownMenuContent className="w-80">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Notification Settings</DropdownMenuLabel>
              <DropdownMenuCheckboxItem
                checked={notifications.email}
                onCheckedChange={(checked) =>
                  setNotifications((prev) => ({ ...prev, email: checked }))
                }
              >
                Email notifications
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={notifications.push}
                onCheckedChange={(checked) =>
                  setNotifications((prev) => ({ ...prev, push: checked }))
                }
              >
                Push notifications
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={notifications.sms}
                onCheckedChange={(checked) =>
                  setNotifications((prev) => ({ ...prev, sms: checked }))
                }
              >
                SMS notifications
              </DropdownMenuCheckboxItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuLabel>Theme</DropdownMenuLabel>
              <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => setLastAction("Reset preferences")}>
                <IconSettingsFilled />
                Reset to defaults
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  },
};

/**
 * Interactive playground
 * Allows testing all dropdown menu props interactively
 */
export const Playground: Story = {
  parameters: {
    order: 99,
    docs: {
      description: {
        story: "Interactive playground - use controls to experiment with dropdown menu props.",
      },
    },
  },
  render: function PlaygroundStory({ modal = false }) {
    const [selectedItem, setSelectedItem] = useState<string>("");

    return (
      <div className="space-y-4">
        {selectedItem && (
          <div className="text-sm text-muted-foreground">
            Selected: <span className="font-medium text-foreground">{selectedItem}</span>
          </div>
        )}
        <DropdownMenu modal={modal}>
          <DropdownMenuTrigger render={<Button>Open Playground Menu</Button>} />
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setSelectedItem("Profile")}>
                <IconUser />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedItem("Settings")}>
                <IconSettingsFilled />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedItem("Notifications")}>
                <IconBell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setSelectedItem("Help")}>
              <IconHelp />
              Help
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  },
};
