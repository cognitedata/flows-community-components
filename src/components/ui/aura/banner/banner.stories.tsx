import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import {
  IconAlertCircle,
  IconAlertTriangle,
  IconCheck,
  IconCopy,
  IconInfoCircle,
} from "@tabler/icons-react";
import { useState } from "react";
import {
  Banner,
  BannerAction,
  BannerActions,
  BannerClose,
  BannerIcon,
  BannerStatus,
  BannerTitle,
} from "./banner";

const meta: Meta<typeof Banner> = {
  title: "Primitives/Banner",
  component: Banner,
  tags: ["autodocs"],
  argTypes: {
    // Display & behavior
    variant: {
      control: "select",
      options: ["default", "neutral", "destructive", "warning"],
      description: "Visual style variant of the banner",
      table: {
        category: "Display",
        type: { summary: '"default" | "neutral" | "destructive" | "warning"' },
        defaultValue: { summary: "default" },
      },
    },
    inset: {
      control: "boolean",
      description: "Adds rounded corners for inset layouts",
      table: {
        category: "Display",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    className: {
      control: "text",
      description: "CSS classes for styling",
      table: {
        category: "Display",
      },
    },

    // State control
    visible: {
      control: "boolean",
      description: "Controlled visibility state",
      table: {
        category: "State",
        type: { summary: "boolean" },
      },
    },
    defaultVisible: {
      control: "boolean",
      description: "Default visibility state (uncontrolled)",
      table: {
        category: "State",
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },

    // Events
    onClose: {
      action: "closed",
      description: "Callback when banner is closed",
      table: {
        category: "Events",
        type: { summary: "() => void" },
      },
    },

    // Internal
    children: {
      control: false,
      table: {
        category: "Internal",
      },
    },
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A flexible banner component for displaying important messages, notifications, or announcements with optional icons, actions, and close functionality.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Banner>;

/**
 * Basic banner with icon, title, and action button.
 * Demonstrates the most common banner usage.
 */
export const Basic: Story = {
  parameters: {
    order: 1,
    docs: {
      description: {
        story: "Basic banner with an information icon, title text, and a single action button.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify banner is rendered
    await expect(canvas.getByText("Banner title")).toBeInTheDocument();

    // Verify icon is present
    const banner = canvasElement.querySelector('[class*="bg-mountain"]');
    await expect(banner).toBeInTheDocument();

    // Verify action button
    const actionButton = canvas.getByRole("button", { name: /action/i });
    await expect(actionButton).toBeInTheDocument();
  },
  render: () => (
    <div className="w-100">
      <Banner>
        <BannerIcon icon={IconInfoCircle} />
        <BannerTitle>Banner title</BannerTitle>
        <BannerActions>
          <BannerAction>Action</BannerAction>
        </BannerActions>
      </Banner>
    </div>
  ),
};

/**
 * All banner variants
 * Shows the four available visual styles
 */
export const Variants: Story = {
  parameters: {
    order: 2,
    docs: {
      description: {
        story:
          "Banner supports four variants: default (blue), neutral (grey), destructive (red), and warning (yellow).",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify all variant titles are rendered
    await expect(canvas.getByText("Default variant")).toBeInTheDocument();
    await expect(canvas.getByText("Neutral variant")).toBeInTheDocument();
    await expect(canvas.getByText("Destructive variant")).toBeInTheDocument();
    await expect(canvas.getByText("Warning variant")).toBeInTheDocument();

    // Verify different background classes
    const banners = canvasElement.querySelectorAll('[class*="bg-"]');
    await expect(banners.length).toBeGreaterThanOrEqual(4);
  },
  render: () => (
    <div className="w-100 space-y-4">
      <Banner variant="default">
        <BannerIcon icon={IconInfoCircle} />
        <BannerTitle>Default variant</BannerTitle>
      </Banner>
      <Banner variant="neutral">
        <BannerIcon icon={IconInfoCircle} />
        <BannerTitle>Neutral variant</BannerTitle>
      </Banner>
      <Banner variant="destructive">
        <BannerIcon icon={IconAlertCircle} />
        <BannerTitle>Destructive variant</BannerTitle>
      </Banner>
      <Banner variant="warning">
        <BannerIcon icon={IconAlertTriangle} />
        <BannerTitle>Warning variant</BannerTitle>
      </Banner>
    </div>
  ),
};

/**
 * Banner with status badge
 * Shows how to include a status indicator
 */
export const WithStatus: Story = {
  parameters: {
    order: 3,
    docs: {
      description: {
        story:
          "Banner can include a status badge that automatically matches the banner variant colors.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify title and status are rendered
    await expect(canvas.getByText("Workflow has been published")).toBeInTheDocument();
    await expect(canvas.getByText("Published")).toBeInTheDocument();

    // Verify action button
    const actionButton = canvas.getByRole("button", {
      name: /request review/i,
    });
    await expect(actionButton).toBeInTheDocument();
  },
  render: () => (
    <div className="w-100">
      <Banner variant="neutral">
        <BannerIcon icon={IconInfoCircle} />
        <BannerTitle>Workflow has been published</BannerTitle>
        <BannerStatus>Published</BannerStatus>
        <BannerActions>
          <BannerAction>Request review</BannerAction>
        </BannerActions>
      </Banner>
    </div>
  ),
};

/**
 * Banner with multiple actions
 * Demonstrates multiple action buttons
 */
export const MultipleActions: Story = {
  parameters: {
    order: 4,
    docs: {
      description: {
        story: "Banners can contain multiple action buttons grouped together on the right.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify both action buttons are rendered
    const duplicateButton = canvas.getByRole("button", { name: /duplicate/i });
    const editButton = canvas.getByRole("button", { name: /edit/i });

    await expect(duplicateButton).toBeInTheDocument();
    await expect(editButton).toBeInTheDocument();

    // Test clicking an action
    await userEvent.click(duplicateButton);
  },
  render: () => (
    <div className="w-100">
      <Banner>
        <BannerIcon icon={IconInfoCircle} />
        <BannerTitle>Read only. Duplicate to make changes.</BannerTitle>
        <BannerActions>
          <BannerAction>
            <IconCopy size={16} />
            <span>Duplicate</span>
          </BannerAction>
          <BannerAction>Edit</BannerAction>
        </BannerActions>
      </Banner>
    </div>
  ),
};

/**
 * Dismissible banner
 * Banner with a close button that can be dismissed
 */
export const Dismissible: Story = {
  parameters: {
    order: 5,
    docs: {
      description: {
        story: "Banner with a close button. Click the X to dismiss the banner.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify banner is initially visible
    const bannerTitle = canvas.getByText("This banner can be dismissed");
    await expect(bannerTitle).toBeInTheDocument();

    // Verify close button is present
    const closeButton = canvas.getByRole("button", { name: "Close banner" });
    await expect(closeButton).toBeInTheDocument();

    // Verify action button
    const actionButton = canvas.getByRole("button", { name: /learn more/i });
    await expect(actionButton).toBeInTheDocument();
  },
  render: function DismissibleStory() {
    return (
      <div className="w-100">
        <Banner>
          <BannerIcon icon={IconInfoCircle} />
          <BannerTitle>This banner can be dismissed</BannerTitle>
          <BannerActions>
            <BannerAction>Learn more</BannerAction>
            <BannerClose />
          </BannerActions>
        </Banner>
      </div>
    );
  },
};

/**
 * Controlled visibility
 * Banner with controlled visibility state
 */
export const ControlledVisibility: Story = {
  parameters: {
    order: 6,
    docs: {
      description: {
        story:
          "Banner visibility can be controlled externally. Use the toggle button to show/hide the banner.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify banner is initially visible
    await expect(canvas.getByText("Controlled visibility banner")).toBeInTheDocument();

    // Find toggle button
    const toggleButton = canvas.getByRole("button", {
      name: /toggle banner/i,
    });
    await expect(toggleButton).toBeInTheDocument();

    // Click to hide
    await userEvent.click(toggleButton);
    await waitFor(
      () => {
        expect(canvas.queryByText("Controlled visibility banner")).not.toBeInTheDocument();
      },
      { timeout: 300 }
    );

    // Click to show again
    await userEvent.click(toggleButton);
    await waitFor(
      () => {
        expect(canvas.getByText("Controlled visibility banner")).toBeInTheDocument();
      },
      { timeout: 300 }
    );
  },
  render: function ControlledVisibilityStory() {
    const [visible, setVisible] = useState(true);

    return (
      <div className="space-y-4">
        <Banner visible={visible} onClose={() => setVisible(false)}>
          <BannerIcon icon={IconInfoCircle} />
          <BannerTitle>Controlled visibility banner</BannerTitle>
          <BannerActions>
            <BannerClose />
          </BannerActions>
        </Banner>
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className="px-4 py-2 bg-accent text-accent-foreground rounded"
        >
          Toggle Banner
        </button>
      </div>
    );
  },
};

/**
 * Inset variant
 * Banner with rounded corners for inset layouts
 */
export const Inset: Story = {
  parameters: {
    order: 7,
    docs: {
      description: {
        story:
          "Use the inset prop to add rounded corners for banners in contained layouts or cards.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify banner is rendered
    await expect(canvas.getByText("Inset banner")).toBeInTheDocument();

    // Verify rounded corners class
    const banner = canvasElement.querySelector('[class*="rounded-lg"]');
    await expect(banner).toBeInTheDocument();
  },
  render: () => (
    <div className="p-6 bg-card rounded-lg border">
      <Banner inset>
        <BannerIcon icon={IconInfoCircle} />
        <BannerTitle>Inset banner</BannerTitle>
        <BannerActions>
          <BannerAction>Action</BannerAction>
        </BannerActions>
      </Banner>
    </div>
  ),
};

/**
 * Real-world example: Read-only warning
 * Common use case for read-only states
 */
export const ReadOnlyWarning: Story = {
  parameters: {
    order: 8,
    docs: {
      description: {
        story:
          "Real-world example of a banner warning users about read-only mode with a duplicate action.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify content
    await expect(canvas.getByText("Read only. Duplicate to make changes.")).toBeInTheDocument();

    // Verify duplicate button with icon
    const duplicateButton = canvas.getByRole("button", { name: /duplicate/i });
    await expect(duplicateButton).toBeInTheDocument();

    // Test clicking duplicate
    await userEvent.click(duplicateButton);
  },
  render: () => (
    <div className="w-100">
      <Banner>
        <BannerIcon icon={IconInfoCircle} />
        <BannerTitle>Read only. Duplicate to make changes.</BannerTitle>
        <BannerActions>
          <BannerAction>
            <IconCopy size={16} />
            <span>Duplicate</span>
          </BannerAction>
        </BannerActions>
      </Banner>
    </div>
  ),
};

/**
 * Real-world example: Success notification
 * Shows a success state with status badge
 */
export const SuccessNotification: Story = {
  parameters: {
    order: 9,
    docs: {
      description: {
        story: "Success banner showing a published workflow with status badge and action button.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify success message
    await expect(canvas.getByText("Workflow has been published")).toBeInTheDocument();

    // Verify status badge
    await expect(canvas.getByText("Published")).toBeInTheDocument();

    // Verify action and close buttons
    const reviewButton = canvas.getByRole("button", {
      name: /request review/i,
    });
    await expect(reviewButton).toBeInTheDocument();
  },
  render: function SuccessNotificationStory() {
    const [visible, setVisible] = useState(true);

    if (!visible) {
      return (
        <button
          type="button"
          onClick={() => setVisible(true)}
          className="px-4 py-2 bg-accent text-accent-foreground rounded"
        >
          Show Banner
        </button>
      );
    }

    return (
      <Banner variant="neutral" visible={visible}>
        <BannerIcon icon={IconCheck} />
        <BannerTitle>Workflow has been published</BannerTitle>
        <BannerStatus>Published</BannerStatus>
        <BannerActions>
          <BannerAction>Request review</BannerAction>
          <BannerClose />
        </BannerActions>
      </Banner>
    );
  },
};

/**
 * Real-world example: Error notification
 * Shows an error state with action to retry
 */
export const ErrorNotification: Story = {
  parameters: {
    order: 10,
    docs: {
      description: {
        story: "Destructive banner showing an error state with retry action.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify error message
    await expect(canvas.getByText("Failed to save changes")).toBeInTheDocument();

    // Verify retry button
    const retryButton = canvas.getByRole("button", { name: /retry/i });
    await expect(retryButton).toBeInTheDocument();

    // Test clicking retry
    await userEvent.click(retryButton);
  },
  render: () => (
    <div className="w-100">
      <Banner variant="destructive">
        <BannerIcon icon={IconAlertCircle} />
        <BannerTitle>Failed to save changes</BannerTitle>
        <BannerActions>
          <BannerAction>Retry</BannerAction>
          <BannerClose />
        </BannerActions>
      </Banner>
    </div>
  ),
};

/**
 * Real-world example: Warning notification
 * Shows a warning state with important information
 */
export const WarningNotification: Story = {
  parameters: {
    order: 11,
    docs: {
      description: {
        story: "Warning banner alerting users about an important update or action required.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify warning message
    await expect(canvas.getByText("Your trial expires in 3 days")).toBeInTheDocument();

    // Verify upgrade button
    const upgradeButton = canvas.getByRole("button", { name: /upgrade/i });
    await expect(upgradeButton).toBeInTheDocument();
  },
  render: () => (
    <div className="w-100">
      <Banner variant="warning">
        <BannerIcon icon={IconAlertTriangle} />
        <BannerTitle>Your trial expires in 3 days</BannerTitle>
        <BannerActions>
          <BannerAction>Upgrade now</BannerAction>
          <BannerClose />
        </BannerActions>
      </Banner>
    </div>
  ),
};

/**
 * Interactive playground
 * Allows testing all banner props interactively
 */
export const Playground: Story = {
  args: {
    variant: "default",
    inset: false,
    defaultVisible: true,
    className: "w-100",
  },
  parameters: {
    order: 99,
    docs: {
      description: {
        story: "Interactive playground - use controls to experiment with banner props.",
      },
    },
  },
  render: (args) => (
    <Banner {...args}>
      <BannerIcon icon={IconInfoCircle} />
      <BannerTitle>Customize this banner using the controls</BannerTitle>
      <BannerActions>
        <BannerAction>Action</BannerAction>
        <BannerClose />
      </BannerActions>
    </Banner>
  ),
};
