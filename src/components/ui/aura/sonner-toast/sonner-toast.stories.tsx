import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { useRef } from "react";
import { toast } from "sonner";
import { Button } from "../button";
import { Toaster } from "./sonner-toast";

const meta: Meta<typeof Toaster> = {
  title: "Primitives/Sonner Toast",
  component: Toaster,
  tags: ["autodocs"],
  args: {
    position: "bottom-right",
    richColors: false,
    expand: false,
    closeButton: false,
  },
  argTypes: {
    position: {
      control: "select",
      options: [
        "top-left",
        "top-center",
        "top-right",
        "bottom-left",
        "bottom-center",
        "bottom-right",
      ],
      description: "Position of the toasts",
      table: {
        category: "Variants/Styling",
        type: { summary: "string" },
        defaultValue: { summary: "bottom-right" },
      },
    },
    richColors: {
      control: { type: "boolean" },
      description: "Use rich colors for toast types",
      table: {
        category: "Variants/Styling",
        type: { summary: "boolean" },
      },
    },
    expand: {
      control: "boolean",
      description: "Expand toasts by default",
      table: {
        category: "Behavior",
        type: { summary: "boolean" },
      },
    },
    closeButton: {
      control: "boolean",
      description: "Show close button on toasts",
      table: {
        category: "Behavior",
        type: { summary: "boolean" },
      },
    },
  },
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story, context) => (
      <>
        <Story />
        <Toaster {...context.args} />
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Toaster>;

/**
 * Default toast.
 */
export const Default: Story = {
  render: () => <Button onClick={() => toast("Event has been created")}>Show Toast</Button>,
  parameters: {
    order: 1,
    docs: {
      description: {
        story: "Default toast notification.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await userEvent.click(button);
    const body = within(document.body);
    await body.findByText("Event has been created");
  },
};

/**
 * Toast with description.
 */
export const WithDescription: Story = {
  render: () => (
    <Button
      onClick={() =>
        toast("Event has been created", {
          description: "Monday, January 3rd at 6:00pm",
        })
      }
    >
      Show Toast with Description
    </Button>
  ),
  parameters: {
    order: 2,
    docs: {
      description: {
        story: "Toast with title and description.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await userEvent.click(button);
    const body = within(document.body);
    await body.findByText("Monday, January 3rd at 6:00pm");
  },
};

/**
 * Success toast.
 */
export const Success: Story = {
  render: () => (
    <Button
      onClick={() =>
        toast.success("Profile updated", {
          description: "Your changes have been saved successfully.",
        })
      }
    >
      Show Success Toast
    </Button>
  ),
  parameters: {
    order: 3,
    docs: {
      description: {
        story: "Success variant toast.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await userEvent.click(button);
    const body = within(document.body);
    await body.findByText("Profile updated");
  },
};

/**
 * Error toast.
 */
export const ErrorState: Story = {
  render: () => (
    <Button
      variant="destructive"
      onClick={() =>
        toast.error("Something went wrong", {
          description: "Please try again later.",
        })
      }
    >
      Show Error Toast
    </Button>
  ),
  parameters: {
    order: 4,
    docs: {
      description: {
        story: "Error variant toast.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await userEvent.click(button);
    const body = within(document.body);
    await body.findByText("Something went wrong");
  },
};

/**
 * Warning toast.
 */
export const Warning: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast.warning("Warning", {
          description: "This action cannot be undone.",
        })
      }
    >
      Show Warning Toast
    </Button>
  ),
  parameters: {
    order: 5,
    docs: {
      description: {
        story: "Warning variant toast.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await userEvent.click(button);
    const body = within(document.body);
    await body.findByText("This action cannot be undone.");
  },
};

/**
 * Info toast.
 */
export const Info: Story = {
  render: () => (
    <Button
      variant="secondary"
      onClick={() =>
        toast.info("Did you know?", {
          description: "You can customize your notification preferences in settings.",
        })
      }
    >
      Show Info Toast
    </Button>
  ),
  parameters: {
    order: 6,
    docs: {
      description: {
        story: "Info variant toast.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await userEvent.click(button);
    const body = within(document.body);
    await body.findByText("Did you know?");
  },
};

/**
 * Loading toast with promise.
 */
export const LoadingWithPromise: Story = {
  render: () => (
    <Button
      onClick={() => {
        const promise = () =>
          new Promise<{ name: string }>((resolve) =>
            setTimeout(() => resolve({ name: "Sonner" }), 2000)
          );

        toast.promise(promise, {
          loading: "Loading...",
          success: (data: { name: string }) => `${data.name} toast has been added`,
          error: "Error",
        });
      }}
    >
      Show Loading Toast
    </Button>
  ),
  parameters: {
    order: 7,
    docs: {
      description: {
        story: "Toast that shows loading state and resolves with success/error.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await userEvent.click(button);
    const body = within(document.body);
    expect(body.getByText("Loading...")).toBeInTheDocument();
    expect(body.queryByText("Sonner toast has been added")).not.toBeInTheDocument();
    await waitFor(() => expect(body.getByText("Sonner toast has been added")).toBeInTheDocument(), {
      timeout: 2000,
    });
  },
};

/**
 * Toast with action.
 */
export const WithAction: Story = {
  render: () => (
    <Button
      onClick={() =>
        toast("File deleted", {
          description: "The file has been moved to trash.",
          action: {
            label: "Undo",
            onClick: () => toast.success("Undo successful"),
          },
        })
      }
    >
      Show Toast with Action
    </Button>
  ),
  parameters: {
    order: 8,
    docs: {
      description: {
        story: "Toast with an action button.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button");
    await userEvent.click(trigger);
    const body = within(document.body);
    const undo = await body.findByRole("button", { name: "Undo" });
    await userEvent.click(undo);
    await body.findByText("Undo successful");
  },
};

/**
 * Toast with custom duration.
 */
export const CustomDuration: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button
        onClick={() =>
          toast("Quick toast", {
            duration: 1000,
            description: "Disappears in 1 second",
          })
        }
      >
        1s Duration
      </Button>
      <Button
        onClick={() =>
          toast("Long toast", {
            duration: 10000,
            description: "Stays for 10 seconds",
          })
        }
      >
        10s Duration
      </Button>
      <Button
        onClick={() =>
          toast("Persistent toast", {
            duration: Number.POSITIVE_INFINITY,
            description: "Must be dismissed manually",
          })
        }
      >
        Infinite Duration
      </Button>
    </div>
  ),
  parameters: {
    order: 9,
    docs: {
      description: {
        story: "Toasts with different durations.",
      },
    },
  },
};

/**
 * All toast types.
 */
export const AllTypes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button onClick={() => toast("Default toast")}>Default</Button>
      <Button onClick={() => toast.success("Success!")}>Success</Button>
      <Button onClick={() => toast.error("Error!")}>Error</Button>
      <Button onClick={() => toast.warning("Warning!")}>Warning</Button>
      <Button onClick={() => toast.info("Info!")}>Info</Button>
      <Button onClick={() => toast.loading("Loading...")}>Loading</Button>
    </div>
  ),
  parameters: {
    order: 10,
    docs: {
      description: {
        story: "All available toast types.",
      },
    },
  },
};

/**
 * Dismiss toast.
 */
export const Dismiss: Story = {
  render: () => {
    const toastId = useRef<string | number | undefined>(undefined);

    return (
      <div className="flex gap-4">
        <Button
          onClick={() => {
            toastId.current = toast("Dismissible toast", {
              duration: Number.POSITIVE_INFINITY,
              description: "Click the other button to dismiss",
            });
          }}
        >
          Show Toast
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            if (toastId.current !== undefined) {
              toast.dismiss(toastId.current);
            }
          }}
        >
          Dismiss Toast
        </Button>
      </div>
    );
  },
  parameters: {
    order: 11,
    docs: {
      description: {
        story: "Programmatically dismiss a specific toast.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const show = canvas.getByRole("button", { name: "Show Toast" });
    await userEvent.click(show);
    const body = within(document.body);
    await body.findByText("Dismissible toast");
    const dismiss = canvas.getByRole("button", { name: "Dismiss Toast" });
    await userEvent.click(dismiss);
    await waitFor(() => {
      expect(body.queryByText("Dismissible toast")).toBeNull();
    });
  },
};

/**
 * Visual regression testing.
 */
export const VisualRegression: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-muted-foreground">Toast Triggers</h3>
      <div className="flex flex-wrap gap-2">
        <Button size="sm" onClick={() => toast("Default")}>
          Default
        </Button>
        <Button size="sm" onClick={() => toast.success("Success")}>
          Success
        </Button>
        <Button size="sm" onClick={() => toast.error("Error")}>
          Error
        </Button>
        <Button size="sm" onClick={() => toast.warning("Warning")}>
          Warning
        </Button>
        <Button size="sm" onClick={() => toast.info("Info")}>
          Info
        </Button>
      </div>
    </div>
  ),
  parameters: {
    order: 12,
    docs: {
      description: {
        story: "Toast triggers for visual regression testing.",
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
  render: () => (
    <Button
      onClick={() =>
        toast("Playground Toast", {
          description: "This is a toast notification from the playground.",
        })
      }
    >
      Show Playground Toast
    </Button>
  ),
  parameters: {
    order: 99,
    docs: {
      description: {
        story: "Interactive toast example.",
      },
    },
  },
};
