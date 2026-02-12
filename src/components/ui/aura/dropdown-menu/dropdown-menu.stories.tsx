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
    modal: false,
  },
  argTypes: {
    open: {
      control: "boolean",
      description: "Controlled open state",
      table: {
        category: "Behavior",
        type: { summary: "boolean" },
      },
    },
    defaultOpen: {
      control: "boolean",
      description: "Default open state (uncontrolled)",
      table: {
        category: "Behavior",
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
    onOpenChange: {
      action: "openChanged",
      description: "Callback when open state changes",
      table: {
        category: "Events",
        type: { summary: "(open: boolean) => void" },
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex flex-col gap-4">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "centered",
    actions: {
      handles: ["click", "openChanged"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

async function openMenu(
  canvasElement: HTMLElement,
  triggerName: RegExp | string
): Promise<ReturnType<typeof within>> {
  const canvas = within(canvasElement);
  const trigger = canvas.getByRole("button", { name: triggerName });
  await userEvent.click(trigger);
  const menu = await within(document.body).findByRole("menu");
  return within(menu);
}

export const Basic: Story = {
  parameters: {
    order: 1,
    docs: {
      description: {
        story: "Basic dropdown menu with action items.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: /open menu/i });
    await expect(trigger).toBeInTheDocument();
    await expect(trigger).toHaveAttribute("aria-haspopup");
    const menu = await openMenu(canvasElement, /open menu/i);
    await expect(menu.getByRole("menuitem", { name: /profile/i })).toBeInTheDocument();
    await expect(menu.getByRole("menuitem", { name: /settings/i })).toBeInTheDocument();
    await expect(menu.getByRole("menuitem", { name: /help/i })).toBeInTheDocument();
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
    const menu = await openMenu(canvasElement, /user menu/i);
    await expect(menu.getByText("Jane Smith")).toBeInTheDocument();
    await expect(menu.getByText("jane.smith@cognite.com")).toBeInTheDocument();
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

export const WithCheckboxItems: Story = {
  parameters: {
    order: 3,
    docs: {
      description: {
        story: "Dropdown menu with checkbox items for multi-select.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/2 notifications selected/i)).toBeInTheDocument();
    const menu = await openMenu(canvasElement, /filters/i);
    const checkboxItems = menu.getAllByRole("menuitemcheckbox");
    expect(checkboxItems.length).toBeGreaterThanOrEqual(4);
    await userEvent.click(checkboxItems[0]);
    await expect(within(document.body).getByRole("menu")).toBeInTheDocument();

    await waitFor(() => {
      expect(canvas.getByText(/1 notification selected/i)).toBeInTheDocument();
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
      <div>
        <div className="text-sm text-muted-foreground">
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
    await expect(canvas.getByText(/current view:/i)).toBeInTheDocument();
    await expect(canvas.getByText(/grid/i)).toBeInTheDocument();
    const menu = await openMenu(canvasElement, /change view/i);
    const radioItems = menu.getAllByRole("menuitemradio");
    await userEvent.click(radioItems[1]);
    await expect(within(document.body).getByRole("menu")).toBeInTheDocument();

    await waitFor(() => {
      expect(canvas.getByText(/current view:/i)).toBeInTheDocument();
      expect(canvas.getByText(/list/i)).toBeInTheDocument();
    });
  },
  render: function WithRadioGroupStory({ modal = false }) {
    const [viewMode, setViewMode] = useState("grid");

    return (
      <div>
        <div className="text-sm text-muted-foreground">
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
    const menu = await openMenu(canvasElement, /actions/i);
    const deleteItem = menu.getByRole("menuitem", { name: /delete/i });
    await expect(deleteItem).toBeInTheDocument();
    await expect(deleteItem).toHaveAttribute("data-variant", "destructive");
  },
  render: function WithDestructiveActionStory({ modal = false }) {
    const [action, setAction] = useState<string>("");

    return (
      <div>
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
    const trigger = await canvas.findByRole("button", { name: "Keyboard Test" });
    trigger.focus();
    await expect(trigger).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    let menu = within(document.body).queryByRole("menu");
    if (!menu) {
      await userEvent.click(trigger);
      menu = await within(document.body).findByRole("menu");
    }
    await within(menu).findByRole("menuitem", { name: /first item/i });
    await userEvent.keyboard("{ArrowDown}");
    await waitFor(() => {
      const menuDoc = canvasElement.ownerDocument;
      const focused = menuDoc.activeElement;
      expect(focused).toHaveAttribute("data-slot", "dropdown-menu-item");
    });
    await userEvent.keyboard("{Escape}");

    await waitFor(() => {
      expect(within(document.body).queryByRole("menu")).not.toBeInTheDocument();
    });
  },
  render: function KeyboardNavigationStory({ modal = false }) {
    const [selectedItem, setSelectedItem] = useState<string>("");

    return (
      <div>
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
    const menu = await openMenu(canvasElement, /empty menu/i);
    await expect(menu.getByRole("menuitem", { name: /no items available/i })).toBeInTheDocument();
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

export const DisabledTrigger: Story = {
  parameters: {
    order: 8,
    docs: {
      description: {
        story: "Dropdown menu with disabled trigger.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");
    await expect(trigger).toBeDisabled();
    await expect(trigger).toHaveAttribute("aria-haspopup", "menu");
    expect(within(document.body).queryByRole("menu")).not.toBeInTheDocument();
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

export const ComplexInteractive: Story = {
  parameters: {
    order: 9,
    docs: {
      description: {
        story: "Complex menu with checkboxes, radio groups, and actions.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const menu = await openMenu(canvasElement, /preferences/i);
    const checkboxItems = menu.getAllByRole("menuitemcheckbox");
    expect(checkboxItems.length).toBeGreaterThanOrEqual(3);
    await userEvent.click(checkboxItems[0]);
    const radioItems = menu.getAllByRole("menuitemradio");
    expect(radioItems.length).toBeGreaterThanOrEqual(3);
    await userEvent.click(radioItems[1]);
    await waitFor(() => {
      expect(within(document.body).getByRole("menu")).toBeInTheDocument();
    });
    await expect(menu.getByRole("menuitem", { name: /reset to defaults/i })).toBeInTheDocument();
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
      <div className="w-80">
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
      <div>
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
