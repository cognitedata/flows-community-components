import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { IconCheck, IconCircleCheck, IconX } from "@tabler/icons-react";
import { useState } from "react";

import { CodeBlock } from "../code-block";
import { HelperText } from "../helper-text";
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
    approval: {
      control: "object",
      description: "Approval state object with approved boolean and optional metadata",
      table: {
        category: "Behavior",
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
        category: "Behavior",
        type: { summary: "string" },
      },
    },

    helperText: {
      control: false,
      description:
        "Helper text below confirmation. Set to false to hide, ReactNode for custom content",
      table: {
        category: "Content",
        type: { summary: "ReactNode | false" },
      },
    },
    className: {
      control: "text",
      description: "CSS classes for styling",
      table: {
        category: "Variants/Styling",
      },
    },
  },
  parameters: {
    layout: "centered",
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
    className: "w-full max-w-lg",
  },
  parameters: {
    order: 2,
    docs: {
      description: {
        story:
          "A working example with state management showing the full approval workflow. Click action buttons to transition between states.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const trigger = canvas.getByRole("button", { name: /Atlas needs your permission/i });
    await expect(trigger).toHaveAttribute("aria-expanded");

    const skipButton = canvas.getByRole("button", { name: "Skip" });
    const allowOnceButton = canvas.getByRole("button", { name: "Allow once" });
    const alwaysAllowButton = canvas.getByRole("button", { name: "Always allow" });
    await expect(skipButton).toHaveAttribute("type", "button");
    await expect(allowOnceButton).toHaveAttribute("type", "button");
    await expect(alwaysAllowButton).toHaveAttribute("type", "button");

    await userEvent.click(allowOnceButton);

    await waitFor(() => {
      expect(canvas.getByText("Permission allowed once")).toBeInTheDocument();
    });

    const resetButton = canvas.getByRole("button", { name: /reset demo/i });
    await userEvent.click(resetButton);

    await waitFor(() => {
      expect(canvas.getByRole("button", { name: "Skip" })).toBeInTheDocument();
    });

    await userEvent.click(canvas.getByRole("button", { name: "Skip" }));
    await waitFor(() => {
      expect(canvas.getByText("Permission skipped")).toBeInTheDocument();
    });
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
              <ConfirmationAction variant="ghost" onClick={handleDeny}>
                Skip
              </ConfirmationAction>
              <div className="flex gap-1">
                <ConfirmationAction variant="ghost" onClick={handleAllowOnce}>
                  Allow once
                </ConfirmationAction>
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

        {state !== "approval-requested" && (
          <button
            type="button"
            onClick={handleReset}
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
    order: 1,
    docs: {
      description: {
        story:
          "Initial state when a tool needs permission. Shows the trigger, collapsible content, and action buttons.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const trigger = canvas.getByRole("button", { name: /Atlas needs/i });
    await expect(trigger).toBeInTheDocument();

    await expect(canvas.getByText("Skip")).toBeInTheDocument();
    await expect(canvas.getByText("Allow once")).toBeInTheDocument();
    await expect(canvas.getByText("Always allow")).toBeInTheDocument();

    await expect(canvas.getByText("Only allow tools that you trust")).toBeInTheDocument();
  },
  render: () => (
    <div className="w-full max-w-lg">
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
    order: 3,
    docs: {
      description: {
        story:
          "State after user approves an action. The ConfirmationAccepted content is displayed instead of actions.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const trigger = canvas.getByRole("button", { name: /Atlas needs/i });
    await expect(trigger).toBeInTheDocument();

    await expect(canvas.getByText("Permission allowed once")).toBeInTheDocument();

    expect(canvas.queryByText("Skip")).not.toBeInTheDocument();
    expect(canvas.queryByText("Allow once")).not.toBeInTheDocument();
  },
  render: () => (
    <div className="w-full max-w-lg">
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
    order: 4,
    docs: {
      description: {
        story:
          'State after user selects "Always allow". Shows a different message indicating permanent permission.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Permission allowed always")).toBeInTheDocument();
  },
  render: () => (
    <div className="w-full max-w-lg">
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
    order: 5,
    docs: {
      description: {
        story: "State after user denies an action. The ConfirmationRejected content is displayed.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Permission skipped")).toBeInTheDocument();

    expect(canvas.queryByText("Skip")).not.toBeInTheDocument();
    expect(canvas.queryByText("Allow once")).not.toBeInTheDocument();
  },
  render: () => (
    <div className="w-full max-w-lg">
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
    order: 6,
    docs: {
      description: {
        story:
          "Confirmation without the default helper text warning. Set helperText={false} to hide it.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.queryByText("Only allow tools that you trust")).not.toBeInTheDocument();
  },
  render: () => (
    <div className="w-full max-w-lg">
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
    order: 7,
    docs: {
      description: {
        story: "Confirmation with custom helper text instead of the default warning.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByText("This action requires elevated permissions.")
    ).toBeInTheDocument();
  },
  render: () => (
    <div className="w-full max-w-lg">
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
    order: 8,
    docs: {
      description: {
        story:
          "Collapsible content with multiple paragraphs to help users make informed decisions.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const trigger = canvas.getByRole("button", { name: /Atlas needs/i });
    await userEvent.click(trigger);

    await waitFor(() => {
      expect(canvas.getByText(/uses advanced statistical methods/i)).toBeInTheDocument();
    });
  },
  render: () => (
    <div className="w-full max-w-lg">
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
    order: 9,
    docs: {
      description: {
        story:
          "Collapsible content with a code block to display the exact code that will be executed.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const trigger = canvas.getByRole("button", { name: /Atlas needs/i });
    await userEvent.click(trigger);

    await waitFor(() => {
      expect(canvas.getAllByText(/analyzeTimeSeries/).length).toBeGreaterThan(0);
    });
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
      <div className="w-full max-w-lg">
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
    order: 10,
    docs: {
      description: {
        story:
          "Tests the collapsible content toggle with chevron rotation animation. Click the trigger to expand/collapse the content and watch the chevron rotate.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const trigger = canvas.getByRole("button", { name: /Atlas needs/i });
    await expect(trigger).toBeInTheDocument();

    await expect(trigger).toHaveAttribute("aria-expanded");

    const chevron = trigger.querySelector("svg");
    await expect(chevron).toBeInTheDocument();

    await userEvent.click(trigger);

    await waitFor(() => {
      expect(canvas.getByText(/analyze patterns in your time series/i)).toBeInTheDocument();
    });

    await expect(trigger).toHaveAttribute("aria-expanded", "true");

    await userEvent.click(trigger);

    await waitFor(() => {
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    });
  },
  render: () => (
    <div className="w-full max-w-lg">
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
    order: 11,
    docs: {
      description: {
        story:
          "Tests keyboard navigation: Tab to navigate between buttons, Space/Enter to activate. Ensures full keyboard accessibility.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const trigger = canvas.getByRole("button", { name: /Atlas needs/i });

    trigger.focus();
    await expect(trigger).toHaveFocus();

    await userEvent.keyboard(" ");

    await waitFor(() => {
      expect(canvas.getByText(/analyze patterns in your time series/i)).toBeInTheDocument();
    });

    await userEvent.tab();
    const skipButton = canvas.getByRole("button", { name: "Skip" });
    await expect(skipButton).toHaveFocus();

    await userEvent.tab();
    const allowOnceButton = canvas.getByRole("button", { name: "Allow once" });
    await expect(allowOnceButton).toHaveFocus();

    await userEvent.tab();
    const alwaysAllowButton = canvas.getByRole("button", { name: "Always allow" });
    await expect(alwaysAllowButton).toHaveFocus();

    await userEvent.keyboard("{Enter}");

    await waitFor(() => {
      expect(canvas.getByText("Permission allowed always")).toBeInTheDocument();
    });
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
      <div className="w-full max-w-lg">
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
    order: 12,
    docs: {
      description: {
        story:
          'Confirmation is hidden when state is "input-streaming" or "input-available". Nothing is rendered.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.queryByText(/Atlas needs/i)).not.toBeInTheDocument();
    expect(canvas.queryByText("Skip")).not.toBeInTheDocument();
  },
  render: () => (
    <div className="w-full max-w-lg p-4 border border-dashed border-border rounded-lg">
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
