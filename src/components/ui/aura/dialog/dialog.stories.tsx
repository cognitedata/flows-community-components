import { Button } from "@/components/ui/aura/button";
import { Input } from "@/components/ui/aura/input";
import { Label } from "@/components/ui/aura/label";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { IconChevronLeft } from "@tabler/icons-react";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

const meta: Meta<typeof Dialog> = {
  title: "Primitives/Dialog",
  component: Dialog,
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
      description: "Whether to render as modal (blocks interaction outside)",
      table: {
        category: "Behavior",
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
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
type Story = StoryObj<typeof Dialog>;

/**
 * Default dialog with basic content.
 */
export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button>Open Dialog</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a dialog description that provides context for the dialog content.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            Dialog content goes here. This can be any React content.
          </p>
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  parameters: {
    order: 1,
    docs: {
      description: {
        story: "Default dialog with title, description, and action buttons.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: /open dialog/i });
    await userEvent.click(trigger);
    await waitFor(() => {
      const dialog = document.querySelector('[data-slot="dialog-content"]');
      expect(dialog).toBeInTheDocument();
    });
    const title = document.querySelector('[data-slot="dialog-title"]');
    expect(title).toHaveTextContent("Dialog Title");
  },
};

/**
 * Dialog with form content.
 */
export const WithForm: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button>Edit Profile</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="John Doe" />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="john@example.com" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  parameters: {
    order: 2,
    docs: {
      description: {
        story: "Dialog containing a form for user input.",
      },
    },
  },
};

/**
 * Dialog without close button.
 */
export const NoCloseButton: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button>Open</Button>} />
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Important Notice</DialogTitle>
          <DialogDescription>
            This dialog has no close button in the corner. Use the buttons below to close it.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button>I understand</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  parameters: {
    order: 3,
    docs: {
      description: {
        story: "Dialog without the X close button in the corner.",
      },
    },
  },
};

/**
 * Controlled dialog.
 */
export const Controlled: Story = {
  render: function ControlledDialog() {
    const [open, setOpen] = useState(false);

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={() => setOpen(true)}>Open Dialog</Button>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close Dialog
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">Dialog is {open ? "open" : "closed"}</p>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Controlled Dialog</DialogTitle>
              <DialogDescription>
                This dialog's open state is controlled externally.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  },
  parameters: {
    order: 4,
    docs: {
      description: {
        story: "Dialog with externally controlled open state.",
      },
    },
  },
};

/**
 * Dialog with scrolling content.
 */
export const ScrollingContent: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button>Terms & Conditions</Button>} />
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Terms of Service</DialogTitle>
          <DialogDescription>Please read and accept our terms of service.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4 text-sm text-muted-foreground">
          {Array.from({ length: 10 }, (_, i) => (
            <p key={`terms-${i}`}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris.
            </p>
          ))}
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Decline</Button>} />
          <Button>Accept</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  parameters: {
    order: 5,
    docs: {
      description: {
        story: "Dialog with scrolling content for long text.",
      },
    },
  },
};

/**
 * Non-modal dialog that allows interaction with content behind the overlay.
 */
export const NonModal: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        This button remains interactive even when the dialog is open (non-modal).
      </p>
      <Button data-testid="background-button">Background action</Button>
      <Dialog modal={false}>
        <DialogTrigger render={<Button>Open Non-modal Dialog</Button>} />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Non-modal Dialog</DialogTitle>
            <DialogDescription>
              You can still interact with elements behind this dialog.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Close</Button>} />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  ),
  parameters: {
    order: 6,
    docs: {
      description: {
        story:
          "Dialog rendered with `modal={false}`, allowing interaction with background content while the dialog is open.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: /open non-modal dialog/i });
    await userEvent.click(trigger);
    await waitFor(() => {
      const dialog = document.querySelector('[data-slot="dialog-content"]');
      expect(dialog).toBeInTheDocument();
    });
    const backgroundButton = canvas.getByRole("button", { name: /background action/i });
    await expect(backgroundButton).toBeEnabled();
  },
};

/**
 * Nested dialogs.
 */
export const Nested: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button>Open First Dialog</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>First Dialog</DialogTitle>
          <DialogDescription>This dialog can open another dialog.</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Dialog>
            <DialogTrigger render={<Button variant="outline">Open Second Dialog</Button>} />
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Second Dialog</DialogTitle>
                <DialogDescription>This is a nested dialog.</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose render={<Button>Close</Button>} />
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <DialogFooter>
          <DialogClose render={<Button>Close First</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  parameters: {
    order: 7,
    docs: {
      description: {
        story: "Dialogs can be nested inside each other.",
      },
    },
  },
};

/**
 * Dialog with title only (no description).
 */
export const TitleOnly: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button>Open Title-only Dialog</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Title Only Dialog</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            This dialog intentionally omits a description, showing the minimal header configuration.
          </p>
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Close</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  parameters: {
    order: 8,
    docs: {
      description: {
        story:
          "Dialog using only `DialogTitle` without a description to demonstrate minimal headers.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const trigger = canvas.getByRole("button", { name: /title-only dialog/i });
    await userEvent.click(trigger);

    await waitFor(() => {
      const title = document.querySelector('[data-slot="dialog-title"]');
      expect(title).toHaveTextContent("Title Only Dialog");
    });
    const description = document.querySelector('[data-slot="dialog-description"]');
    expect(description).toBeNull();
  },
};

/**
 * Dialog with long title and description to test wrapping.
 */
export const LongHeader: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button>Open Long Header Dialog</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            This is a very long dialog title designed to wrap across multiple lines when space is
            constrained
          </DialogTitle>
          <DialogDescription>
            Similarly, this description intentionally contains a large amount of text to exercise
            wrapping behaviour, truncation, and general layout robustness across different viewport
            sizes and content densities.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Close</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  parameters: {
    order: 9,
    docs: {
      description: {
        story:
          "Dialog with long title and description text to verify wrapping and layout behaviour for dense headers.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: /open long header dialog/i });
    await userEvent.click(trigger);
    await waitFor(() => {
      const dialog = document.querySelector('[data-slot="dialog-content"]');
      expect(dialog).toBeInTheDocument();
    });
  },
};

/**
 * Dialog with a leading back icon button in the header.
 */
export const WithBackButton: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button>Open Dialog with Back</Button>} />
      <DialogContent>
        <DialogHeader className="items-start text-left">
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="icon" className="shrink-0" aria-label="Go back">
              <IconChevronLeft className="h-4 w-4" />
            </Button>
            <DialogTitle>Title</DialogTitle>
          </div>
          <DialogDescription>Description</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button>Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: /open dialog with back/i });
    await userEvent.click(trigger);

    await waitFor(() => {
      const dialog = document.querySelector('[data-slot="dialog-content"]');
      expect(dialog).toBeInTheDocument();
    });

    const backButton = document.querySelector('button[aria-label="Go back"]');
    expect(backButton).toBeInTheDocument();

    const title = document.querySelector('[data-slot="dialog-title"]');
    expect(title).toHaveTextContent("Title");
  },
  parameters: {
    order: 10,
    docs: {
      description: {
        story: "Dialog header that includes a leading back icon button next to the title.",
      },
    },
  },
};

/**
 * Confirmation dialog.
 */
export const Confirmation: Story = {
  render: function ConfirmationDialog() {
    const [confirmed, setConfirmed] = useState(false);

    return (
      <div className="space-y-4">
        <Dialog>
          <DialogTrigger render={<Button variant="destructive">Delete Item</Button>} />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete the item.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose render={<Button variant="outline">Cancel</Button>} />
              <DialogClose
                render={
                  <Button variant="destructive" onClick={() => setConfirmed(true)}>
                    Delete
                  </Button>
                }
              />
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {confirmed && <p className="text-sm text-green-600">Item deleted successfully!</p>}
      </div>
    );
  },
  parameters: {
    order: 11,
    docs: {
      description: {
        story: "Confirmation dialog for destructive actions.",
      },
    },
  },
};

/**
 * Dialog demonstrating async confirmation behaviour with a temporary loading state.
 */
export const AsyncAction: Story = {
  render: function AsyncActionDialog() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);

    const handleConfirm = () => {
      setLoading(true);
      setDone(false);
      setTimeout(() => {
        setLoading(false);
        setDone(true);
        setOpen(false);
      }, 500);
    };

    return (
      <div className="space-y-4">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger render={<Button>Open Async Dialog</Button>} />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Async Confirmation</DialogTitle>
              <DialogDescription>
                Simulates an asynchronous operation when confirming the action.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose render={<Button variant="outline">Cancel</Button>} />
              <Button onClick={handleConfirm} disabled={loading} data-testid="async-confirm">
                {loading ? "Saving..." : "Confirm"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {done && <p className="text-sm text-green-600">Action completed successfully.</p>}
      </div>
    );
  },
  parameters: {
    order: 12,
    docs: {
      description: {
        story:
          "Dialog that shows a temporary loading state while performing an asynchronous confirmation action.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const openButton = canvas.getByRole("button", { name: /open async dialog/i });
    await userEvent.click(openButton);

    await waitFor(() => {
      const dialog = document.querySelector('[data-slot="dialog-content"]');
      expect(dialog).toBeInTheDocument();
    });

    const confirmButton = document.querySelector('[data-testid="async-confirm"]');
    expect(confirmButton).toBeInTheDocument();
    await userEvent.click(confirmButton!);

    await waitFor(() => {
      expect(confirmButton).toHaveTextContent("Saving...");
    });

    await waitFor(() => {
      expect(canvas.getByText(/action completed successfully/i)).toBeInTheDocument();
    });
  },
};

/**
 * Visual regression testing.
 */
export const VisualRegression: Story = {
  render: () => (
    <Dialog defaultOpen>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Visual Test Dialog</DialogTitle>
          <DialogDescription>
            This dialog is open by default for visual regression testing.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">Sample content for the dialog.</p>
        </div>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  parameters: {
    order: 13,
    docs: {
      description: {
        story: "Dialog open by default for visual regression testing.",
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
    defaultOpen: false,
    modal: true,
  },
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger render={<Button>Open Playground Dialog</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Playground Dialog</DialogTitle>
          <DialogDescription>
            Use the controls to experiment with different dialog configurations.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  parameters: {
    order: 99,
    docs: {
      description: {
        story: "Interactive playground - use controls to experiment with dialog props.",
      },
    },
  },
};
