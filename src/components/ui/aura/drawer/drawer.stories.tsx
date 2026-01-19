import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, waitFor, expect } from "@storybook/test";
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
import { Button } from "@/components/ui/aura/button";
import { Input } from "@/components/ui/aura/input";
import { Label } from "@/components/ui/aura/label";

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
            <a href="#" className="block p-2 rounded hover:bg-accent text-sm">
              Dashboard
            </a>
            <a href="#" className="block p-2 rounded hover:bg-accent text-sm">
              Projects
            </a>
            <a href="#" className="block p-2 rounded hover:bg-accent text-sm">
              Team
            </a>
            <a href="#" className="block p-2 rounded hover:bg-accent text-sm">
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
              className="min-h-[80px] w-full rounded-md border px-3 py-2 text-sm"
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
        <div className="p-4 overflow-y-auto max-h-[300px] text-sm text-muted-foreground">
          {Array.from({ length: 10 }, (_, i) => (
            <p key={i} className="mb-4">
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
    docs: {
      description: {
        story: "Drawer with scrolling content area.",
      },
    },
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
    docs: {
      description: {
        story: "Interactive playground - use controls to experiment with drawer props.",
      },
    },
  },
};
