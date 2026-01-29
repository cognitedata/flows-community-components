import { Button } from "@/components/ui/aura/button";
import { Input } from "@/components/ui/aura/input";
import { Label } from "@/components/ui/aura/label";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer";

const meta: Meta<typeof Drawer> = {
  title: "Primitives/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: "boolean",
      description: "Controlled open state",
      table: {
        category: "State",
        type: { summary: "boolean" },
      },
    },
    direction: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
      description: "Direction the drawer opens from",
      table: {
        category: "Layout",
        type: { summary: '"top" | "bottom" | "left" | "right"' },
        defaultValue: { summary: "bottom" },
      },
    },
    onOpenChange: {
      action: "openChange",
      description: "Callback when open state changes",
      table: {
        category: "Events",
        type: { summary: "(open: boolean) => void" },
      },
    },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

/**
 * Default bottom drawer.
 */
export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer Title</DrawerTitle>
          <DrawerDescription>This is a drawer description that provides context.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <p className="text-sm text-muted-foreground">
            Drawer content goes here. This drawer slides up from the bottom.
          </p>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          <Button>Save</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
  parameters: {
    order: 1,
    docs: {
      description: {
        story: "Default drawer that slides up from the bottom.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click trigger
    const trigger = canvas.getByRole("button", { name: /open drawer/i });
    await userEvent.click(trigger);

    // Wait for drawer to appear
    await waitFor(() => {
      const drawer = document.querySelector('[data-slot="drawer-content"]');
      expect(drawer).toBeInTheDocument();
    });
  },
};

/**
 * Right side drawer.
 */
export const RightDrawer: Story = {
  render: () => (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button>Open Right Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Settings</DrawerTitle>
          <DrawerDescription>Manage your application settings.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-4">
          <div className="grid gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter name" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter email" />
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          <Button>Save changes</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
  parameters: {
    order: 2,
    docs: {
      description: {
        story: "Drawer that slides in from the right side.",
      },
    },
  },
};

/**
 * Left side drawer.
 */
export const LeftDrawer: Story = {
  render: () => (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <Button>Open Left Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Navigation</DrawerTitle>
          <DrawerDescription>Quick access to all sections.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <nav className="space-y-2">
            <a href="/dashboard" className="block p-2 rounded hover:bg-accent text-sm">
              Dashboard
            </a>
            <a href="/projects" className="block p-2 rounded hover:bg-accent text-sm">
              Projects
            </a>
            <a href="/team" className="block p-2 rounded hover:bg-accent text-sm">
              Team
            </a>
            <a href="/settings" className="block p-2 rounded hover:bg-accent text-sm">
              Settings
            </a>
          </nav>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline" className="w-full">
              Close
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
  parameters: {
    order: 3,
    docs: {
      description: {
        story: "Drawer that slides in from the left side.",
      },
    },
  },
};

/**
 * Top drawer.
 */
export const TopDrawer: Story = {
  render: () => (
    <Drawer direction="top">
      <DrawerTrigger asChild>
        <Button>Open Top Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Notifications</DrawerTitle>
          <DrawerDescription>You have 3 unread messages.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <div className="space-y-2">
            <div className="p-2 rounded bg-accent/50">
              <p className="text-sm font-medium">New message from John</p>
              <p className="text-xs text-muted-foreground">2 minutes ago</p>
            </div>
            <div className="p-2 rounded bg-accent/50">
              <p className="text-sm font-medium">Project update</p>
              <p className="text-xs text-muted-foreground">1 hour ago</p>
            </div>
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Dismiss</Button>
          </DrawerClose>
          <Button>View all</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
  parameters: {
    order: 4,
    docs: {
      description: {
        story: "Drawer that slides down from the top.",
      },
    },
  },
};

/**
 * Controlled drawer.
 */
export const Controlled: Story = {
  render: function ControlledDrawer() {
    const [open, setOpen] = useState(false);

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={() => setOpen(true)}>Open Drawer</Button>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close Drawer
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">Drawer is {open ? "open" : "closed"}</p>
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Controlled Drawer</DrawerTitle>
              <DrawerDescription>
                This drawer&apos;s open state is controlled externally.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button onClick={() => setOpen(false)}>Close</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    );
  },
  parameters: {
    order: 5,
    docs: {
      description: {
        story: "Drawer with externally controlled open state.",
      },
    },
  },
};

/**
 * Drawer with form.
 */
export const WithForm: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Edit Profile</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit Profile</DrawerTitle>
          <DrawerDescription>Update your profile information.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-4">
          <div className="grid gap-1.5">
            <Label htmlFor="drawer-name">Full name</Label>
            <Input id="drawer-name" defaultValue="John Doe" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="drawer-email">Email</Label>
            <Input id="drawer-email" type="email" defaultValue="john@example.com" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="drawer-bio">Bio</Label>
            <textarea
              id="drawer-bio"
              className="min-h-20 w-full rounded-md border px-3 py-2 text-sm"
              placeholder="Tell us about yourself"
            />
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          <Button>Save changes</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
  parameters: {
    order: 6,
    docs: {
      description: {
        story: "Drawer containing a form for user input.",
      },
    },
  },
};

/**
 * Drawer with scrolling content.
 */
export const WithScrollingContent: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Terms & Conditions</Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[80vh]">
        <DrawerHeader>
          <DrawerTitle>Terms of Service</DrawerTitle>
          <DrawerDescription>Please read and accept our terms.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 overflow-y-auto max-h-75 text-sm text-muted-foreground">
          {Array.from({ length: 10 }, (_, i) => (
            <p key={`terms-${i}`} className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris.
            </p>
          ))}
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Decline</Button>
          </DrawerClose>
          <Button>Accept</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
  parameters: {
    order: 7,
    docs: {
      description: {
        story: "Drawer with scrolling content area.",
      },
    },
  },
};

/**
 * Drawer demonstrating async save behaviour with a temporary loading state.
 */
export const AsyncAction: Story = {
  render: function AsyncActionDrawer() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
      setLoading(true);
      setSaved(false);
      setTimeout(() => {
        setLoading(false);
        setSaved(true);
        setOpen(false);
      }, 500);
    };

    return (
      <div className="space-y-4">
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button onClick={() => setOpen(true)}>Open Async Drawer</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Async Save</DrawerTitle>
              <DrawerDescription>
                Simulates an asynchronous operation when saving changes.
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 space-y-2">
              <p className="text-sm text-muted-foreground">
                Change some settings, then click Save to trigger an async action.
              </p>
              <Input placeholder="Setting value" />
            </div>
            <DrawerFooter>
              <DrawerClose asChild disabled={loading}>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
              <Button onClick={handleSave} disabled={loading} data-testid="async-drawer-save">
                {loading ? "Saving..." : "Save"}
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        {saved && <p className="text-sm text-green-600">Changes saved successfully.</p>}
      </div>
    );
  },
  parameters: {
    order: 8,
    docs: {
      description: {
        story:
          "Drawer that demonstrates an asynchronous save action with a temporary loading state and success feedback.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const openButton = canvas.getByRole("button", { name: /open async drawer/i });
    await userEvent.click(openButton);

    const saveButton = await canvas.findByTestId("async-drawer-save");
    await userEvent.click(saveButton);

    await waitFor(() => {
      expect(saveButton).toHaveTextContent("Saving...");
    });

    await waitFor(() => {
      expect(canvas.getByText(/changes saved successfully/i)).toBeInTheDocument();
    });
  },
};

/**
 * Drawer keyboard interactions: focus, keyboard activation, and ESC to close.
 */
export const KeyboardInteractions: Story = {
  render: function KeyboardInteractionsDrawer() {
    const [open, setOpen] = useState(false);
    const [activated, setActivated] = useState(false);

    return (
      <div className="space-y-4">
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button>Open Keyboard Drawer</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Keyboard Drawer</DrawerTitle>
              <DrawerDescription>
                Use Tab to move focus, Enter/Space to activate, and Escape to close.
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 flex flex-col gap-2">
              <Button
                variant="outline"
                data-testid="keyboard-primary"
                onClick={() => setActivated(true)}
              >
                Keyboard Action
              </Button>
              <Button
                variant="outline"
                onClick={() => setActivated(false)}
                data-testid="keyboard-reset"
              >
                Reset
              </Button>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <p className="text-sm text-muted-foreground">
          Status: {activated ? "Activated" : "Inactive"}
        </p>
      </div>
    );
  },
  parameters: {
    order: 9,
    docs: {
      description: {
        story:
          "Drawer story focused on keyboard accessibility: Tab focus, keyboard activation, and Escape to close.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open the drawer with keyboard
    const trigger = canvas.getByRole("button", { name: /open keyboard drawer/i });
    await userEvent.tab();
    await userEvent.tab(); // move focus to trigger
    await waitFor(() => {
      expect(trigger).toHaveFocus();
    });
    await userEvent.keyboard("{Enter}");

    // Focus should move into the drawer; first action button should be reachable
    const primaryButton = await canvas.findByTestId("keyboard-primary");
    await waitFor(() => {
      expect(primaryButton).toBeInTheDocument();
    });

    // Activate via keyboard
    await userEvent.tab();
    await waitFor(() => {
      expect(primaryButton).toHaveFocus();
    });
    await userEvent.keyboard("{Enter}");

    await waitFor(() => {
      expect(canvas.getByText(/status: activated/i)).toBeInTheDocument();
    });

    // Press Escape to close
    await userEvent.keyboard("{Escape}");
    await waitFor(() => {
      // Use screen.queryByRole to robustly check for the dialog in a portal
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  },
};

/**
 * Visual regression testing.
 */
export const VisualRegression: Story = {
  render: () => (
    <div className="flex gap-4">
      <Drawer>
        <DrawerTrigger asChild>
          <Button>Bottom</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Bottom Drawer</DrawerTitle>
            <DrawerDescription>Visual test for bottom drawer.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button>Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Drawer direction="right">
        <DrawerTrigger asChild>
          <Button variant="outline">Right</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Right Drawer</DrawerTitle>
            <DrawerDescription>Visual test for right drawer.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button>Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  ),
  parameters: {
    order: 10,
    docs: {
      description: {
        story: "Drawer triggers for visual regression testing.",
      },
    },
    chromatic: {
      disableSnapshot: false,
    },
  },
};

/**
 * Interactive playground.
 */
export const Playground: Story = {
  args: {
    direction: "bottom",
  },
  render: (args) => (
    <Drawer {...args}>
      <DrawerTrigger asChild>
        <Button>Open Playground Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Playground Drawer</DrawerTitle>
          <DrawerDescription>
            Use the controls to experiment with different drawer configurations.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <p className="text-sm text-muted-foreground">Drawer content here.</p>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          <Button>Confirm</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
  parameters: {
    order: 99,
    docs: {
      description: {
        story: "Interactive playground - use controls to experiment with drawer props.",
      },
    },
  },
};
