import { CodeBlock } from "@/components/ui/aura/code-block";
import { HelperText } from "@/components/ui/aura/helper-text";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { IconCheck, IconCircleCheck, IconX } from "@tabler/icons-react";
import { useState } from "react";
import {
  Confirmation,
  ConfirmationAccepted,
  ConfirmationAction,
  ConfirmationActions,
  ConfirmationContent,
  ConfirmationContentTrigger,
  ConfirmationRejected,
  ConfirmationRequest,
} from "./confirmation";

const meta: Meta<typeof Confirmation> = {
  title: "AI/Confirmation",
  component: Confirmation,
  tags: ["autodocs"],
  argTypes: {
    // State management
    approval: {
      control: "object",
      description: "Approval state object with approved boolean and optional metadata",
      table: {
        category: "State",
        type: { summary: "{ approved?: boolean; [key: string]: unknown }" },
      },
    },
    state: {
      control: "select",
      options: [
        "input-streaming",
        "input-available",
        "approval-requested",
        "approval-responded",
        "output-denied",
        "output-available",
      ],
      description: "Current state of the confirmation workflow",
      table: {
        category: "State",
        type: { summary: "string" },
      },
    },

    // Display
    helperText: {
      control: false,
      description:
        "Helper text below confirmation. Set to false to hide, ReactNode for custom content",
      table: {
        category: "Display",
        type: { summary: "ReactNode | false" },
      },
    },
    className: {
      control: "text",
      description: "CSS classes for styling",
      table: {
        category: "Display",
      },
    },
  },
  parameters: {
    layout: "centered",
    actions: {
      handles: ["openChanged"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Confirmation>;

/**
 * Interactive demo showing the full approval workflow.
 * Click the action buttons to see state transitions.
 */
export const Interactive: Story = {
  args: {
    className: "w-[500px]",
  },
  parameters: {
    docs: {
      description: {
        story:
          "A working example with state management showing the full approval workflow. Click action buttons to transition between states.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Accessibility: Verify trigger button exists and has proper attributes
    const trigger = canvas.getByTestId("confirmation-trigger");
    await expect(trigger).toBeInTheDocument();
    await expect(trigger).toHaveAttribute("aria-expanded");

    // Accessibility: Verify action buttons have proper labels and types
    const allowOnceButton = canvas.getByTestId("action-allow-once");
    await expect(allowOnceButton).toBeInTheDocument();
    await expect(allowOnceButton).toHaveAttribute("type", "button");
    await expect(allowOnceButton).toHaveTextContent("Allow once");

    const skipButton = canvas.getByTestId("action-skip");
    await expect(skipButton).toHaveTextContent("Skip");

    const alwaysAllowButton = canvas.getByTestId("action-always-allow");
    await expect(alwaysAllowButton).toHaveTextContent("Always allow");

    // Test: Click "Allow once" to approve
    await userEvent.click(allowOnceButton);

    // Wait for the accepted state to show
    await waitFor(
      () => {
        const acceptedElement = canvas.queryByTestId("confirmation-accepted");
        if (!acceptedElement) {
          throw new Error("Accepted element not found");
        }
        expect(acceptedElement).toBeInTheDocument();
      },
      { timeout: 1000 }
    );

    // Verify accepted message content
    await expect(canvas.getByText("Permission allowed once")).toBeInTheDocument();

    // Click reset to go back to approval-requested
    const resetButton = canvas.getByTestId("reset-button");
    await userEvent.click(resetButton);

    // Wait for actions to reappear
    await waitFor(
      () => {
        const skipAction = canvas.queryByTestId("action-skip");
        if (!skipAction) {
          throw new Error("Skip action not found");
        }
        expect(skipAction).toBeInTheDocument();
      },
      { timeout: 1000 }
    );

    // Test: Now test the reject flow
    const skipButtonAgain = canvas.getByTestId("action-skip");
    await userEvent.click(skipButtonAgain);

    // Wait for the rejected state to show
    await waitFor(
      () => {
        const rejectedElement = canvas.queryByTestId("confirmation-rejected");
        if (!rejectedElement) {
          throw new Error("Rejected element not found");
        }
        expect(rejectedElement).toBeInTheDocument();
      },
      { timeout: 1000 }
    );

    // Verify rejected message content
    await expect(canvas.getByText("Permission skipped")).toBeInTheDocument();
  },
  render: function InteractiveStory(args) {
    const [approval, setApproval] = useState<{
      approved?: boolean;
      always?: boolean;
    }>({});
    const [state, setState] = useState<string>("approval-requested");

    const handleAllowOnce = () => {
      setApproval({ approved: true, always: false });
      setState("output-available");
    };

    const handleAlwaysAllow = () => {
      setApproval({ approved: true, always: true });
      setState("output-available");
    };

    const handleDeny = () => {
      setApproval({ approved: false });
      setState("output-denied");
    };

    const handleReset = () => {
      setApproval({});
      setState("approval-requested");
    };

    return (
      <div className="w-full space-y-4">
        <Confirmation {...args} approval={approval} state={state}>
          <ConfirmationContentTrigger data-testid="confirmation-trigger">
            Atlas needs your permission to run tool &quot;Analyze time series&quot;
          </ConfirmationContentTrigger>
          <ConfirmationContent>
            <p className="text-sm text-muted-foreground">
              This tool will analyze patterns in your time series data to identify trends,
              seasonality, and anomalies.
            </p>
          </ConfirmationContent>
          <ConfirmationRequest>
            <ConfirmationActions className="w-full flex justify-between">
              <ConfirmationAction variant="ghost" onClick={handleDeny} data-testid="action-skip">
                Skip
              </ConfirmationAction>
              <div className="flex gap-1">
                <ConfirmationAction
                  variant="ghost"
                  onClick={handleAllowOnce}
                  data-testid="action-allow-once"
                >
                  Allow once
                </ConfirmationAction>
                <ConfirmationAction
                  variant="outline"
                  onClick={handleAlwaysAllow}
                  data-testid="action-always-allow"
                >
                  Always allow
                </ConfirmationAction>
              </div>
            </ConfirmationActions>
          </ConfirmationRequest>
          <ConfirmationAccepted>
            <div data-testid="confirmation-accepted">
              {approval.always ? (
                <HelperText size="xs" icon={<IconCircleCheck />} isSuccess className="self-end">
                  Permission allowed always
                </HelperText>
              ) : (
                <HelperText size="xs" icon={<IconCheck />} isSuccess className="self-end">
                  Permission allowed once
                </HelperText>
              )}
            </div>
          </ConfirmationAccepted>
          <ConfirmationRejected>
            <div data-testid="confirmation-rejected">
              <HelperText size="xs" icon={<IconX />} isError className="self-end">
                Permission skipped
              </HelperText>
            </div>
          </ConfirmationRejected>
        </Confirmation>

        {state !== "approval-requested" && (
          <button
            type="button"
            onClick={handleReset}
            data-testid="reset-button"
            className="text-sm text-muted-foreground underline hover:text-foreground"
          >
            Reset demo
          </button>
        )}
      </div>
    );
  },
};

/**
 * Approval requested state - awaiting user decision
 */
export const ApprovalRequested: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Initial state when a tool needs permission. Shows the trigger, collapsible content, and action buttons.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify trigger is present
    const trigger = canvas.getByRole("button", { name: /Atlas needs/i });
    await expect(trigger).toBeInTheDocument();

    // Verify action buttons are visible
    await expect(canvas.getByText("Skip")).toBeInTheDocument();
    await expect(canvas.getByText("Allow once")).toBeInTheDocument();
    await expect(canvas.getByText("Always allow")).toBeInTheDocument();

    // Verify helper text is shown
    await expect(canvas.getByText("Only allow tools that you trust")).toBeInTheDocument();
  },
  render: () => (
    <div className="w-[500px]">
      <Confirmation approval={{}} state="approval-requested">
        <ConfirmationContentTrigger>
          Atlas needs your permission to run tool &quot;Analyze time series&quot;
        </ConfirmationContentTrigger>
        <ConfirmationContent>
          <p className="text-sm text-muted-foreground">
            This tool will analyze patterns in your time series data to identify trends,
            seasonality, and anomalies.
          </p>
        </ConfirmationContent>
        <ConfirmationRequest>
          <ConfirmationActions className="w-full flex justify-between">
            <ConfirmationAction variant="ghost">Skip</ConfirmationAction>
            <div className="flex gap-1">
              <ConfirmationAction variant="ghost">Allow once</ConfirmationAction>
              <ConfirmationAction variant="outline">Always allow</ConfirmationAction>
            </div>
          </ConfirmationActions>
        </ConfirmationRequest>
        <ConfirmationAccepted>
          <HelperText size="xs" icon={<IconCheck />} isSuccess className="self-end">
            Permission allowed once
          </HelperText>
        </ConfirmationAccepted>
        <ConfirmationRejected>
          <HelperText size="xs" icon={<IconX />} isError className="self-end">
            Permission skipped
          </HelperText>
        </ConfirmationRejected>
      </Confirmation>
    </div>
  ),
};

/**
 * State after user approves an action
 */
export const ApprovalAccepted: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "State after user approves an action. The ConfirmationAccepted content is displayed instead of actions.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify trigger is present
    const trigger = canvas.getByRole("button", { name: /Atlas needs/i });
    await expect(trigger).toBeInTheDocument();

    // Verify accepted state message is shown
    await expect(canvas.getByText("Permission allowed once")).toBeInTheDocument();

    // Action buttons should NOT be visible
    expect(canvas.queryByText("Skip")).not.toBeInTheDocument();
    expect(canvas.queryByText("Allow once")).not.toBeInTheDocument();
  },
  render: () => (
    <div className="w-[500px]">
      <Confirmation approval={{ approved: true, always: false }} state="output-available">
        <ConfirmationContentTrigger>
          Atlas needs your permission to run tool &quot;Analyze time series&quot;
        </ConfirmationContentTrigger>
        <ConfirmationContent>
          <p className="text-sm text-muted-foreground">
            This tool will analyze patterns in your time series data to identify trends,
            seasonality, and anomalies.
          </p>
        </ConfirmationContent>
        <ConfirmationRequest>
          <ConfirmationActions className="w-full flex justify-between">
            <ConfirmationAction variant="ghost">Skip</ConfirmationAction>
            <div className="flex gap-1">
              <ConfirmationAction variant="ghost">Allow once</ConfirmationAction>
              <ConfirmationAction variant="outline">Always allow</ConfirmationAction>
            </div>
          </ConfirmationActions>
        </ConfirmationRequest>
        <ConfirmationAccepted>
          <HelperText size="xs" icon={<IconCheck />} isSuccess className="self-end">
            Permission allowed once
          </HelperText>
        </ConfirmationAccepted>
        <ConfirmationRejected>
          <HelperText size="xs" icon={<IconX />} isError className="self-end">
            Permission skipped
          </HelperText>
        </ConfirmationRejected>
      </Confirmation>
    </div>
  ),
};

/**
 * State after user approves an action with "Always allow"
 */
export const ApprovalAcceptedAlways: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'State after user selects "Always allow". Shows a different message indicating permanent permission.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify accepted always message is shown
    await expect(canvas.getByText("Permission allowed always")).toBeInTheDocument();
  },
  render: () => (
    <div className="w-[500px]">
      <Confirmation approval={{ approved: true, always: true }} state="output-available">
        <ConfirmationContentTrigger>
          Atlas needs your permission to run tool &quot;Analyze time series&quot;
        </ConfirmationContentTrigger>
        <ConfirmationContent>
          <p className="text-sm text-muted-foreground">
            This tool will analyze patterns in your time series data to identify trends,
            seasonality, and anomalies.
          </p>
        </ConfirmationContent>
        <ConfirmationRequest>
          <ConfirmationActions className="w-full flex justify-between">
            <ConfirmationAction variant="ghost">Skip</ConfirmationAction>
            <div className="flex gap-1">
              <ConfirmationAction variant="ghost">Allow once</ConfirmationAction>
              <ConfirmationAction variant="outline">Always allow</ConfirmationAction>
            </div>
          </ConfirmationActions>
        </ConfirmationRequest>
        <ConfirmationAccepted>
          <HelperText size="xs" icon={<IconCircleCheck />} isSuccess className="self-end">
            Permission allowed always
          </HelperText>
        </ConfirmationAccepted>
        <ConfirmationRejected>
          <HelperText size="xs" icon={<IconX />} isError className="self-end">
            Permission skipped
          </HelperText>
        </ConfirmationRejected>
      </Confirmation>
    </div>
  ),
};

/**
 * State after user denies an action
 */
export const ApprovalRejected: Story = {
  parameters: {
    docs: {
      description: {
        story: "State after user denies an action. The ConfirmationRejected content is displayed.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify rejected state message is shown
    await expect(canvas.getByText("Permission skipped")).toBeInTheDocument();

    // Action buttons should NOT be visible
    expect(canvas.queryByText("Skip")).not.toBeInTheDocument();
    expect(canvas.queryByText("Allow once")).not.toBeInTheDocument();
  },
  render: () => (
    <div className="w-[500px]">
      <Confirmation approval={{ approved: false }} state="output-denied">
        <ConfirmationContentTrigger>
          Atlas needs your permission to run tool &quot;Analyze time series&quot;
        </ConfirmationContentTrigger>
        <ConfirmationContent>
          <p className="text-sm text-muted-foreground">
            This tool will analyze patterns in your time series data to identify trends,
            seasonality, and anomalies.
          </p>
        </ConfirmationContent>
        <ConfirmationRequest>
          <ConfirmationActions className="w-full flex justify-between">
            <ConfirmationAction variant="ghost">Skip</ConfirmationAction>
            <div className="flex gap-1">
              <ConfirmationAction variant="ghost">Allow once</ConfirmationAction>
              <ConfirmationAction variant="outline">Always allow</ConfirmationAction>
            </div>
          </ConfirmationActions>
        </ConfirmationRequest>
        <ConfirmationAccepted>
          <HelperText size="xs" icon={<IconCheck />} isSuccess className="self-end">
            Permission allowed once
          </HelperText>
        </ConfirmationAccepted>
        <ConfirmationRejected>
          <HelperText size="xs" icon={<IconX />} isError className="self-end">
            Permission skipped
          </HelperText>
        </ConfirmationRejected>
      </Confirmation>
    </div>
  ),
};

/**
 * Confirmation with no helper text
 */
export const NoHelperText: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Confirmation without the default helper text warning. Set helperText={false} to hide it.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Helper text should NOT be visible
    expect(canvas.queryByText("Only allow tools that you trust")).not.toBeInTheDocument();
  },
  render: () => (
    <div className="w-[500px]">
      <Confirmation approval={{}} state="approval-requested" helperText={false}>
        <ConfirmationContentTrigger>
          Atlas needs your permission to run tool &quot;Analyze time series&quot;
        </ConfirmationContentTrigger>
        <ConfirmationContent>
          <p className="text-sm text-muted-foreground">
            This tool will analyze patterns in your time series data.
          </p>
        </ConfirmationContent>
        <ConfirmationRequest>
          <ConfirmationActions className="w-full flex justify-between">
            <ConfirmationAction variant="ghost">Skip</ConfirmationAction>
            <div className="flex gap-1">
              <ConfirmationAction variant="ghost">Allow once</ConfirmationAction>
              <ConfirmationAction variant="outline">Always allow</ConfirmationAction>
            </div>
          </ConfirmationActions>
        </ConfirmationRequest>
      </Confirmation>
    </div>
  ),
};

/**
 * Confirmation with custom helper text
 */
export const CustomHelperText: Story = {
  parameters: {
    docs: {
      description: {
        story: "Confirmation with custom helper text instead of the default warning.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Custom helper text should be visible
    await expect(
      canvas.getByText("This action requires elevated permissions.")
    ).toBeInTheDocument();
  },
  render: () => (
    <div className="w-[500px]">
      <Confirmation
        approval={{}}
        state="approval-requested"
        helperText={
          <HelperText size="xs" className="self-end">
            This action requires elevated permissions.
          </HelperText>
        }
      >
        <ConfirmationContentTrigger>
          Atlas needs your permission to run tool &quot;Analyze time series&quot;
        </ConfirmationContentTrigger>
        <ConfirmationContent>
          <p className="text-sm text-muted-foreground">
            This tool will analyze patterns in your time series data.
          </p>
        </ConfirmationContent>
        <ConfirmationRequest>
          <ConfirmationActions className="w-full flex justify-between">
            <ConfirmationAction variant="ghost">Skip</ConfirmationAction>
            <div className="flex gap-1">
              <ConfirmationAction variant="ghost">Allow once</ConfirmationAction>
              <ConfirmationAction variant="outline">Always allow</ConfirmationAction>
            </div>
          </ConfirmationActions>
        </ConfirmationRequest>
      </Confirmation>
    </div>
  ),
};

/**
 * Confirmation with multiple paragraphs of content
 */
export const WithParagraphs: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Collapsible content with multiple paragraphs to help users make informed decisions.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click to expand content
    const trigger = canvas.getByRole("button", { name: /Atlas needs/i });
    await userEvent.click(trigger);

    // Wait for content to be visible
    await waitFor(
      () => {
        expect(canvas.getByText(/uses advanced statistical methods/i)).toBeInTheDocument();
      },
      { timeout: 500 }
    );
  },
  render: () => (
    <div className="w-[500px]">
      <Confirmation approval={{}} state="approval-requested">
        <ConfirmationContentTrigger>
          Atlas needs your permission to run tool &quot;Analyze time series&quot;
        </ConfirmationContentTrigger>
        <ConfirmationContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              This tool will analyze patterns in your time series data to identify trends,
              seasonality, and anomalies. It uses advanced statistical methods to detect patterns
              that might not be immediately visible.
            </p>
            <p>
              The analysis will process your historical data and generate insights about recurring
              patterns, seasonal variations, and potential outliers. This information can help you
              make more informed decisions based on your data trends.
            </p>
          </div>
        </ConfirmationContent>
        <ConfirmationRequest>
          <ConfirmationActions className="w-full flex justify-between">
            <ConfirmationAction variant="ghost">Skip</ConfirmationAction>
            <div className="flex gap-1">
              <ConfirmationAction variant="ghost">Allow once</ConfirmationAction>
              <ConfirmationAction variant="outline">Always allow</ConfirmationAction>
            </div>
          </ConfirmationActions>
        </ConfirmationRequest>
        <ConfirmationAccepted>
          <HelperText size="xs" icon={<IconCheck />} isSuccess className="self-end">
            Permission allowed once
          </HelperText>
        </ConfirmationAccepted>
        <ConfirmationRejected>
          <HelperText size="xs" icon={<IconX />} isError className="self-end">
            Permission skipped
          </HelperText>
        </ConfirmationRejected>
      </Confirmation>
    </div>
  ),
};

/**
 * Confirmation with code block showing what will be executed
 */
export const WithCodeBlock: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Collapsible content with a code block to display the exact code that will be executed.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click to expand content
    const trigger = canvas.getByRole("button", { name: /Atlas needs/i });
    await userEvent.click(trigger);

    // Wait for code block content to be visible (check for code element)
    await waitFor(
      () => {
        const codeBlock = canvasElement.querySelector("pre code");
        if (!codeBlock) {
          throw new Error("Code block not found");
        }
        expect(codeBlock).toBeInTheDocument();
        expect(codeBlock).toHaveTextContent("analyzeTimeSeries");
      },
      { timeout: 1000 }
    );
  },
  render: () => {
    const codeToExecute = `import { analyzeTimeSeries } from '@cognite/sdk';

const result = await analyzeTimeSeries({
  dataPoints: timeSeriesData,
  analysisType: 'seasonal-decomposition',
  options: {
    detectAnomalies: true,
    confidenceLevel: 0.95
  }
});

console.log(result.trends, result.seasonality);`;

    return (
      <div className="w-[500px]">
        <Confirmation approval={{}} state="approval-requested">
          <ConfirmationContentTrigger>
            Atlas needs your permission to run tool &quot;Analyze time series&quot;
          </ConfirmationContentTrigger>
          <ConfirmationContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                The following code will be executed to analyze your time series data:
              </p>
              <CodeBlock language="typescript" code={codeToExecute} />
            </div>
          </ConfirmationContent>
          <ConfirmationRequest>
            <ConfirmationActions className="w-full flex justify-between">
              <ConfirmationAction variant="ghost">Skip</ConfirmationAction>
              <div className="flex gap-1">
                <ConfirmationAction variant="ghost">Allow once</ConfirmationAction>
                <ConfirmationAction variant="outline">Always allow</ConfirmationAction>
              </div>
            </ConfirmationActions>
          </ConfirmationRequest>
          <ConfirmationAccepted>
            <HelperText size="xs" icon={<IconCheck />} isSuccess className="self-end">
              Permission allowed once
            </HelperText>
          </ConfirmationAccepted>
          <ConfirmationRejected>
            <HelperText size="xs" icon={<IconX />} isError className="self-end">
              Permission skipped
            </HelperText>
          </ConfirmationRejected>
        </Confirmation>
      </div>
    );
  },
};

/**
 * Tests collapsible content toggle interaction and chevron animation
 */
export const CollapsibleInteraction: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Tests the collapsible content toggle with chevron rotation animation. Click the trigger to expand/collapse the content and watch the chevron rotate.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the trigger button
    const trigger = canvas.getByRole("button", { name: /Atlas needs/i });
    await expect(trigger).toBeInTheDocument();

    // Verify button has accessible attributes
    await expect(trigger).toHaveAttribute("aria-expanded");

    // Find the chevron icon
    const chevron = trigger.querySelector("svg");
    await expect(chevron).toBeInTheDocument();

    // Initially content might be collapsed - click to toggle
    await userEvent.click(trigger);

    // Content should be visible after click
    await waitFor(
      () => {
        expect(canvas.getByText(/analyze patterns in your time series/i)).toBeInTheDocument();
      },
      { timeout: 500 }
    );

    // Verify trigger shows expanded state
    await expect(trigger).toHaveAttribute("aria-expanded", "true");

    // Click again to collapse
    await userEvent.click(trigger);

    // Verify trigger shows collapsed state
    await waitFor(
      () => {
        expect(trigger).toHaveAttribute("aria-expanded", "false");
      },
      { timeout: 500 }
    );
  },
  render: () => (
    <div className="w-[500px]">
      <Confirmation approval={{}} state="approval-requested">
        <ConfirmationContentTrigger>
          Atlas needs your permission to run tool &quot;Analyze time series&quot;
        </ConfirmationContentTrigger>
        <ConfirmationContent>
          <p className="text-sm text-muted-foreground">
            This tool will analyze patterns in your time series data to identify trends,
            seasonality, and anomalies.
          </p>
        </ConfirmationContent>
        <ConfirmationRequest>
          <ConfirmationActions className="w-full flex justify-between">
            <ConfirmationAction variant="ghost">Skip</ConfirmationAction>
            <div className="flex gap-1">
              <ConfirmationAction variant="ghost">Allow once</ConfirmationAction>
              <ConfirmationAction variant="outline">Always allow</ConfirmationAction>
            </div>
          </ConfirmationActions>
        </ConfirmationRequest>
      </Confirmation>
    </div>
  ),
};

/**
 * Tests keyboard navigation and accessibility
 * Verifies Space/Enter activate buttons, Tab navigation works
 */
export const KeyboardNavigation: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Tests keyboard navigation: Tab to navigate between buttons, Space/Enter to activate. Ensures full keyboard accessibility.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the trigger button
    const trigger = canvas.getByRole("button", { name: /Atlas needs/i });

    // Focus the trigger
    trigger.focus();
    await expect(trigger).toHaveFocus();

    // Press Space to expand
    await userEvent.keyboard(" ");

    // Wait for content to be visible
    await waitFor(
      () => {
        expect(canvas.getByText(/analyze patterns in your time series/i)).toBeInTheDocument();
      },
      { timeout: 500 }
    );

    // Tab to first action button (Skip)
    await userEvent.tab();
    const skipButton = canvas.getByText("Skip");
    await expect(skipButton).toHaveFocus();

    // Tab to second action button (Allow once)
    await userEvent.tab();
    const allowOnceButton = canvas.getByText("Allow once");
    await expect(allowOnceButton).toHaveFocus();

    // Tab to third action button (Always allow)
    await userEvent.tab();
    const alwaysAllowButton = canvas.getByText("Always allow");
    await expect(alwaysAllowButton).toHaveFocus();

    // Press Enter on Always allow
    await userEvent.keyboard("{Enter}");

    // Wait for accepted state
    await waitFor(
      () => {
        const acceptedText = canvas.queryByText("Permission allowed always");
        if (!acceptedText) {
          throw new Error("Accepted text not found");
        }
        expect(acceptedText).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  },
  render: function KeyboardNavigationStory() {
    const [approval, setApproval] = useState<{
      approved?: boolean;
      always?: boolean;
    }>({});
    const [state, setState] = useState<string>("approval-requested");

    const handleAlwaysAllow = () => {
      setApproval({ approved: true, always: true });
      setState("output-available");
    };

    return (
      <div className="w-[500px]">
        <Confirmation approval={approval} state={state}>
          <ConfirmationContentTrigger>
            Atlas needs your permission to run tool &quot;Analyze time series&quot;
          </ConfirmationContentTrigger>
          <ConfirmationContent>
            <p className="text-sm text-muted-foreground">
              This tool will analyze patterns in your time series data to identify trends,
              seasonality, and anomalies.
            </p>
          </ConfirmationContent>
          <ConfirmationRequest>
            <ConfirmationActions className="w-full flex justify-between">
              <ConfirmationAction variant="ghost">Skip</ConfirmationAction>
              <div className="flex gap-1">
                <ConfirmationAction variant="ghost">Allow once</ConfirmationAction>
                <ConfirmationAction variant="outline" onClick={handleAlwaysAllow}>
                  Always allow
                </ConfirmationAction>
              </div>
            </ConfirmationActions>
          </ConfirmationRequest>
          <ConfirmationAccepted>
            {approval.always ? (
              <HelperText size="xs" icon={<IconCircleCheck />} isSuccess className="self-end">
                Permission allowed always
              </HelperText>
            ) : (
              <HelperText size="xs" icon={<IconCheck />} isSuccess className="self-end">
                Permission allowed once
              </HelperText>
            )}
          </ConfirmationAccepted>
          <ConfirmationRejected>
            <HelperText size="xs" icon={<IconX />} isError className="self-end">
              Permission skipped
            </HelperText>
          </ConfirmationRejected>
        </Confirmation>
      </div>
    );
  },
};

/**
 * Hidden states - confirmation is hidden during streaming/input states
 */
export const HiddenDuringStreaming: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Confirmation is hidden when state is "input-streaming" or "input-available". Nothing is rendered.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Component should not render anything
    expect(canvas.queryByText(/Atlas needs/i)).not.toBeInTheDocument();
    expect(canvas.queryByText("Skip")).not.toBeInTheDocument();
  },
  render: () => (
    <div className="w-[500px] p-4 border border-dashed border-border rounded-lg">
      <p className="text-sm text-muted-foreground mb-4">
        The confirmation below is hidden because state is &quot;input-streaming&quot;:
      </p>
      <Confirmation approval={{}} state="input-streaming">
        <ConfirmationContentTrigger>
          Atlas needs your permission to run tool &quot;Analyze time series&quot;
        </ConfirmationContentTrigger>
        <ConfirmationContent>
          <p className="text-sm text-muted-foreground">
            This tool will analyze patterns in your time series data.
          </p>
        </ConfirmationContent>
        <ConfirmationRequest>
          <ConfirmationActions className="w-full flex justify-between">
            <ConfirmationAction variant="ghost">Skip</ConfirmationAction>
            <div className="flex gap-1">
              <ConfirmationAction variant="ghost">Allow once</ConfirmationAction>
              <ConfirmationAction variant="outline">Always allow</ConfirmationAction>
            </div>
          </ConfirmationActions>
        </ConfirmationRequest>
      </Confirmation>
      <p className="text-xs text-muted-foreground mt-4">
        (Empty space above - confirmation is not rendered)
      </p>
    </div>
  ),
};
