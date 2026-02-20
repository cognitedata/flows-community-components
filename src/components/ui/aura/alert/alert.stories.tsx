import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import {
  IconAlertHexagon,
  IconAlertTriangle,
  IconBell,
  IconCheck,
  IconInfoCircle,
  IconUser,
} from "@tabler/icons-react";
import { useState } from "react";
import { Alert, AlertActions, AlertButton, AlertDescription, AlertTitle } from "./alert";
const meta: Meta<typeof Alert> = {
  title: "Primitives/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "warning", "error"],
      table: {
        category: "Variants/Styling",
        type: {
          summary: '"default" | "secondary" | "warning" | "error"',
        },
        defaultValue: {
          summary: "default",
        },
      },
    },
    className: {
      control: "text",
      table: {
        category: "Variants/Styling",
      },
    },
    visible: {
      control: "boolean",
      table: {
        category: "Behavior",
        type: {
          summary: "boolean",
        },
      },
    },
    defaultVisible: {
      control: "boolean",
      table: {
        category: "Behavior",
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: "true",
        },
      },
    },
    onClose: {
      action: "closed",
      table: {
        category: "Events",
        type: {
          summary: "() => void",
        },
      },
    },
  },
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-100">
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof Alert>;
export const Basic: Story = {
  render: () => (
    <Alert>
      <IconInfoCircle className="w-3.5 h-3.5 mt-0.5" />
      <AlertTitle>Account verification required</AlertTitle>
      <AlertDescription>
        Please check your email and click the verification link to activate your account.
      </AlertDescription>
      <AlertActions>
        <AlertButton className="-ml-2.25">Verify account</AlertButton>
      </AlertActions>
    </Alert>
  ),
  parameters: {
    order: 1,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const alert = canvas.getByRole("alert");
    await expect(alert).toBeInTheDocument();
    const title = canvas.getByText("Account verification required");
    await expect(title).toBeInTheDocument();
    const button = await canvas.findByRole("button", {
      name: /verify account/i,
    });
    await expect(button).toBeInTheDocument();
  },
};
export const Dismissible: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    if (!visible) {
      return (
        <button
          type="button"
          onClick={() => setVisible(true)}
          className="px-4 py-2 text-sm border rounded-md hover:bg-accent"
        >
          Show Alert Again
        </button>
      );
    }
    return (
      <Alert onClose={() => setVisible(false)}>
        <IconInfoCircle className="w-3.5 h-3.5 mt-0.5" />
        <AlertTitle>Dismissible Alert</AlertTitle>
        <AlertDescription>Click the X button to dismiss this alert.</AlertDescription>
      </Alert>
    );
  },
  parameters: {
    order: 2,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const closeButton = await canvas.findByRole("button", {
      name: /close/i,
    });
    await expect(closeButton).toBeInTheDocument();
    await userEvent.click(closeButton);
    await waitFor(() => {
      const alert = canvas.queryByRole("alert");
      expect(alert).not.toBeInTheDocument();
    });
    const showButton = await canvas.findByRole("button", {
      name: /show alert again/i,
    });
    await userEvent.click(showButton);
    await waitFor(() => {
      const alert = canvas.queryByRole("alert");
      expect(alert).toBeInTheDocument();
    });
  },
};
export const Secondary: Story = {
  render: () => (
    <Alert variant="secondary">
      <IconUser className="w-3.5 h-3.5 mt-0.5" />
      <AlertDescription>
        Changes will not be saved until you click &apos;Update&apos;.
      </AlertDescription>
      <AlertActions>
        <AlertButton className="-ml-2.25">Update</AlertButton>
      </AlertActions>
    </Alert>
  ),
  parameters: {
    order: 3,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const alert = canvas.getByRole("alert");
    await expect(alert).toBeInTheDocument();
    await expect(
      await canvas.findByRole("button", {
        name: /update/i,
      })
    ).toBeInTheDocument();
  },
};
export const Warning: Story = {
  render: () => (
    <Alert variant="warning" onClose={() => {}}>
      <IconAlertTriangle className="w-3.5 h-3.5 mt-0.5" />
      <AlertTitle>Storage almost full</AlertTitle>
      <AlertDescription>
        You&apos;re using 90% of your available storage. Consider upgrading your plan.
      </AlertDescription>
      <AlertActions>
        <AlertButton className="-ml-2.25">Upgrade plan</AlertButton>
      </AlertActions>
    </Alert>
  ),
  parameters: {
    order: 4,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Storage almost full")).toBeInTheDocument();
    await expect(
      await canvas.findByRole("button", {
        name: /upgrade plan/i,
      })
    ).toBeInTheDocument();
  },
};
export const ErrorAlert: Story = {
  render: () => (
    <Alert variant="error">
      <IconAlertHexagon className="w-3.5 h-3.5 mt-0.5" />
      <AlertTitle>Unable to connect data</AlertTitle>
      <AlertDescription>Verify you have the correct ID and try again.</AlertDescription>
      <AlertActions>
        <AlertButton className="text-card-foreground -ml-2.25">Try again</AlertButton>
      </AlertActions>
    </Alert>
  ),
  parameters: {
    order: 5,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Unable to connect data")).toBeInTheDocument();
    await expect(
      await canvas.findByRole("button", {
        name: /try again/i,
      })
    ).toBeInTheDocument();
  },
};
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert>
        <IconInfoCircle className="w-3.5 h-3.5 mt-0.5" />
        <AlertTitle>Default Alert</AlertTitle>
        <AlertDescription>This is the default alert style.</AlertDescription>
      </Alert>
      <Alert variant="secondary">
        <IconUser className="w-3.5 h-3.5 mt-0.5" />
        <AlertTitle>Secondary Alert</AlertTitle>
        <AlertDescription>This is the secondary alert style.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <IconAlertTriangle className="w-3.5 h-3.5 mt-0.5" />
        <AlertTitle>Warning Alert</AlertTitle>
        <AlertDescription>This is the warning alert style.</AlertDescription>
      </Alert>
      <Alert variant="error">
        <IconAlertHexagon className="w-3.5 h-3.5 mt-0.5" />
        <AlertTitle>Error Alert</AlertTitle>
        <AlertDescription>This is the error alert style.</AlertDescription>
      </Alert>
    </div>
  ),
  parameters: {
    order: 6,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const alerts = await canvas.findAllByRole("alert");
    await expect(alerts).toHaveLength(4);
  },
};
export const DescriptionOnly: Story = {
  render: () => (
    <Alert variant="secondary">
      <IconBell className="w-3.5 h-3.5 mt-0.5" />
      <AlertDescription>You have 3 new notifications waiting for you.</AlertDescription>
    </Alert>
  ),
  parameters: {
    order: 7,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/3 new notifications/)).toBeInTheDocument();
  },
};
export const Success: Story = {
  render: () => (
    <Alert>
      <IconCheck className="w-3.5 h-3.5 mt-0.5 text-green-600" />
      <AlertTitle>Changes saved successfully</AlertTitle>
      <AlertDescription>
        Your profile has been updated and the changes are now live.
      </AlertDescription>
    </Alert>
  ),
  parameters: {
    order: 8,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Changes saved successfully")).toBeInTheDocument();
  },
};
export const MultipleActions: Story = {
  render: () => (
    <Alert variant="warning" onClose={() => {}}>
      <IconAlertTriangle className="w-3.5 h-3.5 mt-0.5" />
      <AlertTitle>Session expiring soon</AlertTitle>
      <AlertDescription>
        Your session will expire in 5 minutes. Would you like to extend it?
      </AlertDescription>
      <AlertActions>
        <AlertButton className="-ml-2.25">Extend session</AlertButton>
        <AlertButton>Log out</AlertButton>
      </AlertActions>
    </Alert>
  ),
  parameters: {
    order: 9,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const extendButton = await canvas.findByRole("button", {
      name: /extend session/i,
    });
    const logoutButton = await canvas.findByRole("button", {
      name: /log out/i,
    });
    await expect(extendButton).toBeInTheDocument();
    await expect(logoutButton).toBeInTheDocument();
  },
};
export const ControlledVisibility: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setVisible(true)}
            className="px-3 py-1 text-sm border rounded-md hover:bg-accent"
          >
            Show
          </button>
          <button
            type="button"
            onClick={() => setVisible(false)}
            className="px-3 py-1 text-sm border rounded-md hover:bg-accent"
          >
            Hide
          </button>
        </div>
        <Alert visible={visible} onClose={() => setVisible(false)}>
          <IconInfoCircle className="w-3.5 h-3.5 mt-0.5" />
          <AlertTitle>Controlled Alert</AlertTitle>
          <AlertDescription>
            This alert&apos;s visibility is controlled externally.
          </AlertDescription>
        </Alert>
        <p className="text-sm text-muted-foreground">Visible: {visible ? "true" : "false"}</p>
      </div>
    );
  },
  parameters: {
    order: 10,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    let alert = canvas.queryByRole("alert");
    await expect(alert).toBeInTheDocument();
    const hideButton = await canvas.findByRole("button", {
      name: "Hide",
    });
    await userEvent.click(hideButton);
    await waitFor(() => {
      alert = canvas.queryByRole("alert");
      expect(alert).not.toBeInTheDocument();
    });
    const showButton = await canvas.findByRole("button", {
      name: "Show",
    });
    await userEvent.click(showButton);
    await waitFor(() => {
      alert = canvas.queryByRole("alert");
      expect(alert).toBeInTheDocument();
    });
  },
};
export const EdgeCaseLongText: Story = {
  render: () => (
    <Alert>
      <IconInfoCircle className="w-3.5 h-3.5 mt-0.5" />
      <AlertTitle>
        This is an unusually long alert title that may wrap onto multiple lines when the container
        width is constrained to ensure the layout remains readable and intact
      </AlertTitle>
      <AlertDescription>
        This is an unusually long description to test how the alert handles lengthy content. It
        should wrap gracefully within the alert bounds without overflowing or breaking the grid. We
        include several sentences to simulate real-world notifications that might contain detailed
        instructions or explanations for the user to read and act upon.
      </AlertDescription>
      <AlertActions>
        <AlertButton className="-ml-2.25">Accept and continue</AlertButton>
      </AlertActions>
    </Alert>
  ),
  parameters: {
    order: 11,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/This is an unusually long alert title/)).toBeInTheDocument();
    await expect(
      canvas.getByText(/This is an unusually long description to test/)
    ).toBeInTheDocument();
  },
};
export const EdgeCaseSpecialCharacters: Story = {
  render: () => (
    <Alert variant="warning" onClose={() => {}}>
      <IconAlertTriangle className="w-3.5 h-3.5 mt-0.5" />
      <AlertTitle>Don&apos;t forget: &quot;Back up&quot; &amp; restore</AlertTitle>
      <AlertDescription>
        Paths like C:\Users\file.txt, 日本語, and symbols © ® ™ should render correctly.
      </AlertDescription>
      <AlertActions>
        <AlertButton className="-ml-2.25">Got it</AlertButton>
      </AlertActions>
    </Alert>
  ),
  parameters: {
    order: 12,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Don't forget: "Back up" & restore/)).toBeInTheDocument();
    await expect(canvas.getByText(/Paths like/)).toBeInTheDocument();
    await expect(canvas.getByText(/日本語/)).toBeInTheDocument();
  },
};
export const Accessibility: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);
    if (!visible) {
      return (
        <button
          type="button"
          onClick={() => setVisible(true)}
          className="px-4 py-2 text-sm border rounded-md hover:bg-accent"
        >
          Show Alert Again
        </button>
      );
    }
    return (
      <Alert onClose={() => setVisible(false)}>
        <IconInfoCircle className="w-3.5 h-3.5 mt-0.5" />
        <AlertTitle>Accessible alert</AlertTitle>
        <AlertDescription>
          This alert has role=&quot;alert&quot;, a close button with &quot;Close&quot; screen reader
          text, and can be dismissed via keyboard.
        </AlertDescription>
      </Alert>
    );
  },
  parameters: {
    order: 13,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const alertRegion = canvas.getByRole("alert");
    await expect(alertRegion).toBeInTheDocument();
    const closeButton = await canvas.findByRole("button", {
      name: /close/i,
    });
    await expect(closeButton).toBeInTheDocument();
    await userEvent.click(closeButton);
    await waitFor(() => {
      expect(canvas.queryByRole("alert")).not.toBeInTheDocument();
    });
  },
};
export const VisualRegression: Story = {
  render: () => (
    <div className="space-y-4 w-100">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">All Variants</h3>
        <Alert>
          <IconInfoCircle className="w-3.5 h-3.5 mt-0.5" />
          <AlertTitle>Default</AlertTitle>
          <AlertDescription>Default alert variant.</AlertDescription>
        </Alert>
        <Alert variant="secondary">
          <IconUser className="w-3.5 h-3.5 mt-0.5" />
          <AlertTitle>Secondary</AlertTitle>
          <AlertDescription>Secondary alert variant.</AlertDescription>
        </Alert>
        <Alert variant="warning">
          <IconAlertTriangle className="w-3.5 h-3.5 mt-0.5" />
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>Warning alert variant.</AlertDescription>
        </Alert>
        <Alert variant="error">
          <IconAlertHexagon className="w-3.5 h-3.5 mt-0.5" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Error alert variant.</AlertDescription>
        </Alert>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">With Actions</h3>
        <Alert onClose={() => {}}>
          <IconInfoCircle className="w-3.5 h-3.5 mt-0.5" />
          <AlertTitle>With Close and Action</AlertTitle>
          <AlertDescription>Alert with close button and action.</AlertDescription>
          <AlertActions>
            <AlertButton className="-ml-2.25">Action</AlertButton>
          </AlertActions>
        </Alert>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Description Only</h3>
        <Alert variant="secondary">
          <IconBell className="w-3.5 h-3.5 mt-0.5" />
          <AlertDescription>Alert with description only, no title.</AlertDescription>
        </Alert>
      </div>
    </div>
  ),
  parameters: {
    order: 14,
    chromatic: {
      disableSnapshot: false,
    },
  },
  decorators: [
    (Story) => (
      <div className="p-4">
        <Story />
      </div>
    ),
  ],
};
export const Playground: Story = {
  render: (args) => (
    <Alert {...args} onClose={() => {}}>
      <IconInfoCircle className="w-3.5 h-3.5 mt-0.5" />
      <AlertTitle>Playground Alert</AlertTitle>
      <AlertDescription>
        Use the controls to experiment with different alert configurations.
      </AlertDescription>
      <AlertActions>
        <AlertButton className="-ml-2.25">Action</AlertButton>
      </AlertActions>
    </Alert>
  ),
  parameters: {
    order: 99,
  },
};
