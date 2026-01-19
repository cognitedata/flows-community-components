import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent, waitFor, expect } from "@storybook/test";
import { useState } from "react";
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
} from "./alert-dialog";
import { Button } from "@/components/ui/aura/button";
import { IconCheck, IconTrash, IconAlertTriangle } from "@tabler/icons-react";

const meta: Meta<typeof AlertDialog> = {
  title: "Primitives/Alert Dialog",
  component: AlertDialog,
  tags: ["autodocs"],
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

    // Events
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
type Story = StoryObj<typeof AlertDialog>;

/**
 * Default alert dialog with confirmation pattern.
 */
export const Default: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Open Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently affect your data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  parameters: {
    docs: {
      description: {
        story: "Default alert dialog for confirming critical actions.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click trigger to open dialog
    const trigger = canvas.getByRole("button", { name: /open dialog/i });
    await userEvent.click(trigger);

    // Wait for dialog to appear
    await waitFor(() => {
      const dialog = document.querySelector('[data-slot="alert-dialog-content"]');
      expect(dialog).toBeInTheDocument();
    });

    // Verify title and description
    const title = document.querySelector('[data-slot="alert-dialog-title"]');
    expect(title).toHaveTextContent("Are you sure?");

    // Click cancel to close
    const cancelButton = document.querySelector('[data-slot="alert-dialog-content"] button');
    if (cancelButton) {
      await userEvent.click(cancelButton);
    }
  },
};

/**
 * Destructive action confirmation dialog.
 */
export const DestructiveAction: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <IconTrash className="size-4" />
          Delete Account
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete your account?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account and remove all
            your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            Yes, delete my account
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  parameters: {
    docs: {
      description: {
        story: "Alert dialog for destructive actions like account deletion.",
      },
    },
  },
};

/**
 * Export data confirmation dialog.
 */
export const ExportData: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Export</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Export all data?</AlertDialogTitle>
          <AlertDialogDescription>
            This will export all your data to a CSV file. The process may take a few moments
            depending on the amount of data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Export</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  parameters: {
    docs: {
      description: {
        story: "Alert dialog for confirming data export.",
      },
    },
  },
};

/**
 * Dialog with icon in action button.
 */
export const WithIcon: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Confirm Action</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm your action</AlertDialogTitle>
          <AlertDialogDescription>
            Please confirm that you want to proceed with this action.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>
            <IconCheck className="size-4" />
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  parameters: {
    docs: {
      description: {
        story: "Alert dialog with icon in the action button.",
      },
    },
  },
};

/**
 * Warning dialog with custom styling.
 */
export const Warning: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">
          <IconAlertTriangle className="size-4" />
          Warning Action
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <IconAlertTriangle className="size-5 text-yellow-500" />
            Warning
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action may have unintended consequences. Please review the details before
            proceeding.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Go Back</AlertDialogCancel>
          <AlertDialogAction>I Understand</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  parameters: {
    docs: {
      description: {
        story: "Warning dialog with icon in the title.",
      },
    },
  },
};

/**
 * Single action dialog (informational).
 */
export const InformationalSingleAction: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show Info</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Information</AlertDialogTitle>
          <AlertDialogDescription>
            This is an informational alert dialog. You can use it to display important information
            to users that requires acknowledgment.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Got it</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  parameters: {
    docs: {
      description: {
        story: "Informational dialog with only a single acknowledge button.",
      },
    },
  },
};

/**
 * Controlled dialog with external state.
 */
export const Controlled: Story = {
  render: function ControlledAlertDialog() {
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
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Controlled Dialog</AlertDialogTitle>
              <AlertDialogDescription>
                This dialog&apos;s open state is controlled externally.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Dialog with externally controlled open state.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click open button
    const openButton = canvas.getByRole("button", { name: /open dialog/i });
    await userEvent.click(openButton);

    // Verify dialog opened
    await waitFor(() => {
      const dialog = document.querySelector('[data-slot="alert-dialog-content"]');
      expect(dialog).toBeInTheDocument();
    });

    // Click cancel to close
    const cancelButton = Array.from(document.querySelectorAll("button")).find(
      (btn) => btn.textContent === "Cancel"
    );
    if (cancelButton) {
      await userEvent.click(cancelButton);
    }

    // Verify dialog closed
    await waitFor(() => {
      const dialog = document.querySelector('[data-slot="alert-dialog-content"]');
      expect(dialog).not.toBeInTheDocument();
    });
  },
};

/**
 * Dialog with async action.
 */
export const AsyncAction: Story = {
  render: function AsyncAlertDialog() {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleAction = async () => {
      setLoading(true);
      // Simulate async operation
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
      setOpen(false);
    };

    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button>Save Changes</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Save changes?</AlertDialogTitle>
            <AlertDialogDescription>
              Your changes will be saved to the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleAction} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Dialog with async action showing loading state.",
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
      <AlertDialog defaultOpen>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Visual Test Dialog</AlertDialogTitle>
            <AlertDialogDescription>
              This dialog is open by default for visual regression testing.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Dialog opened by default for visual regression testing.",
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
  },
  render: (args) => (
    <AlertDialog {...args}>
      <AlertDialogTrigger asChild>
        <Button>Open Playground Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Playground Dialog</AlertDialogTitle>
          <AlertDialogDescription>
            Use the controls to experiment with different dialog configurations.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  parameters: {
    docs: {
      description: {
        story: "Interactive playground - use controls to experiment with dialog props.",
      },
    },
  },
};
