import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconCheck, IconCircleCheck, IconX } from '@tabler/icons-react';
import { useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { CodeBlock } from '../code-block';
import { HelperText } from '../helper-text';

import {
  Confirmation,
  ConfirmationAccepted,
  ConfirmationAction,
  ConfirmationActions,
  ConfirmationContent,
  ConfirmationContentTrigger,
  ConfirmationRejected,
  ConfirmationRequest,
} from './confirmation';

const meta: Meta<typeof Confirmation> = {
  title: 'AI/Confirmation',
  component: Confirmation,
  tags: ['autodocs'],
  argTypes: {
    approval: {
      control: 'object',
      table: {
        category: 'Behavior',
        type: { summary: '{ approved?: boolean; [key: string]: unknown }' },
      },
    },
    state: {
      control: 'select',
      options: [
        'input-streaming',
        'input-available',
        'approval-requested',
        'approval-responded',
        'output-denied',
        'output-available',
      ],
      table: {
        category: 'Behavior',
        type: { summary: 'string' },
      },
    },

    helperText: {
      control: false,
      table: {
        category: 'Content',
        type: { summary: 'ReactNode | false' },
      },
    },
    className: {
      control: 'text',
      table: {
        category: 'Variants/Styling',
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Confirmation>;

export const Interactive: Story = {
  parameters: {
    order: 2,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const trigger = canvas.getByRole('button', {
      name: /Atlas needs your permission/i,
    });
    await expect(trigger).toHaveAttribute('aria-expanded');

    const skipButton = canvas.getByRole('button', { name: 'Skip' });
    const allowOnceButton = canvas.getByRole('button', { name: 'Allow once' });
    const alwaysAllowButton = canvas.getByRole('button', {
      name: 'Always allow',
    });
    await expect(skipButton).toHaveAttribute('type', 'button');
    await expect(allowOnceButton).toHaveAttribute('type', 'button');
    await expect(alwaysAllowButton).toHaveAttribute('type', 'button');

    await userEvent.click(allowOnceButton);

    await waitFor(() => {
      expect(canvas.getByText('Permission allowed once')).toBeInTheDocument();
    });

    const resetButton = canvas.getByRole('button', { name: /reset demo/i });
    await userEvent.click(resetButton);

    await waitFor(() => {
      expect(canvas.getByRole('button', { name: 'Skip' })).toBeInTheDocument();
    });

    await userEvent.click(canvas.getByRole('button', { name: 'Skip' }));
    await waitFor(() => {
      expect(canvas.getByText('Permission skipped')).toBeInTheDocument();
    });
  },
  render: function InteractiveStory() {
    const [approval, setApproval] = useState<{
      approved?: boolean;
      always?: boolean;
    }>({});
    const [state, setState] = useState<string>('approval-requested');

    const handleAllowOnce = () => {
      setApproval({ approved: true, always: false });
      setState('output-available');
    };

    const handleAlwaysAllow = () => {
      setApproval({ approved: true, always: true });
      setState('output-available');
    };

    const handleDeny = () => {
      setApproval({ approved: false });
      setState('output-denied');
    };

    const handleReset = () => {
      setApproval({});
      setState('approval-requested');
    };

    return (
      <div className="w-full space-y-4">
        <Confirmation
          className="w-full max-w-lg"
          approval={approval}
          state={state}
        >
          <ConfirmationContentTrigger>
            Atlas needs your permission to run tool &quot;Analyze time
            series&quot;
          </ConfirmationContentTrigger>
          <ConfirmationContent>
            <p className="text-sm text-muted-foreground">
              This tool will analyze patterns in your time series data to
              identify trends, seasonality, and anomalies.
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
                <ConfirmationAction
                  variant="outline"
                  onClick={handleAlwaysAllow}
                >
                  Always allow
                </ConfirmationAction>
              </div>
            </ConfirmationActions>
          </ConfirmationRequest>
          <ConfirmationAccepted>
            {approval.always ? (
              <HelperText
                size="xs"
                icon={<IconCircleCheck />}
                isSuccess
                className="self-end"
              >
                Permission allowed always
              </HelperText>
            ) : (
              <HelperText
                size="xs"
                icon={<IconCheck />}
                isSuccess
                className="self-end"
              >
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

        {state !== 'approval-requested' && (
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

export const ApprovalRequested: Story = {
  parameters: {
    order: 1,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const trigger = canvas.getByRole('button', { name: /Atlas needs/i });
    await expect(trigger).toBeInTheDocument();

    await expect(canvas.getByText('Skip')).toBeInTheDocument();
    await expect(canvas.getByText('Allow once')).toBeInTheDocument();
    await expect(canvas.getByText('Always allow')).toBeInTheDocument();

    await expect(
      canvas.getByText('Only allow tools that you trust')
    ).toBeInTheDocument();
  },
  render: () => (
    <div className="w-full max-w-lg">
      <Confirmation approval={{}} state="approval-requested">
        <ConfirmationContentTrigger>
          Atlas needs your permission to run tool &quot;Analyze time
          series&quot;
        </ConfirmationContentTrigger>
        <ConfirmationContent>
          <p className="text-sm text-muted-foreground">
            This tool will analyze patterns in your time series data to identify
            trends, seasonality, and anomalies.
          </p>
        </ConfirmationContent>
        <ConfirmationRequest>
          <ConfirmationActions className="w-full flex justify-between">
            <ConfirmationAction variant="ghost">Skip</ConfirmationAction>
            <div className="flex gap-1">
              <ConfirmationAction variant="ghost">
                Allow once
              </ConfirmationAction>
              <ConfirmationAction variant="outline">
                Always allow
              </ConfirmationAction>
            </div>
          </ConfirmationActions>
        </ConfirmationRequest>
        <ConfirmationAccepted>
          <HelperText
            size="xs"
            icon={<IconCheck />}
            isSuccess
            className="self-end"
          >
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

export const ApprovalAccepted: Story = {
  parameters: {
    order: 3,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const trigger = canvas.getByRole('button', { name: /Atlas needs/i });
    await expect(trigger).toBeInTheDocument();

    await expect(
      canvas.getByText('Permission allowed once')
    ).toBeInTheDocument();

    expect(canvas.queryByText('Skip')).not.toBeInTheDocument();
    expect(canvas.queryByText('Allow once')).not.toBeInTheDocument();
  },
  render: () => (
    <div className="w-full max-w-lg">
      <Confirmation
        approval={{ approved: true, always: false }}
        state="output-available"
      >
        <ConfirmationContentTrigger>
          Atlas needs your permission to run tool &quot;Analyze time
          series&quot;
        </ConfirmationContentTrigger>
        <ConfirmationContent>
          <p className="text-sm text-muted-foreground">
            This tool will analyze patterns in your time series data to identify
            trends, seasonality, and anomalies.
          </p>
        </ConfirmationContent>
        <ConfirmationRequest>
          <ConfirmationActions className="w-full flex justify-between">
            <ConfirmationAction variant="ghost">Skip</ConfirmationAction>
            <div className="flex gap-1">
              <ConfirmationAction variant="ghost">
                Allow once
              </ConfirmationAction>
              <ConfirmationAction variant="outline">
                Always allow
              </ConfirmationAction>
            </div>
          </ConfirmationActions>
        </ConfirmationRequest>
        <ConfirmationAccepted>
          <HelperText
            size="xs"
            icon={<IconCheck />}
            isSuccess
            className="self-end"
          >
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

export const ApprovalAcceptedAlways: Story = {
  parameters: {
    order: 4,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByText('Permission allowed always')
    ).toBeInTheDocument();
  },
  render: () => (
    <div className="w-full max-w-lg">
      <Confirmation
        approval={{ approved: true, always: true }}
        state="output-available"
      >
        <ConfirmationContentTrigger>
          Atlas needs your permission to run tool &quot;Analyze time
          series&quot;
        </ConfirmationContentTrigger>
        <ConfirmationContent>
          <p className="text-sm text-muted-foreground">
            This tool will analyze patterns in your time series data to identify
            trends, seasonality, and anomalies.
          </p>
        </ConfirmationContent>
        <ConfirmationRequest>
          <ConfirmationActions className="w-full flex justify-between">
            <ConfirmationAction variant="ghost">Skip</ConfirmationAction>
            <div className="flex gap-1">
              <ConfirmationAction variant="ghost">
                Allow once
              </ConfirmationAction>
              <ConfirmationAction variant="outline">
                Always allow
              </ConfirmationAction>
            </div>
          </ConfirmationActions>
        </ConfirmationRequest>
        <ConfirmationAccepted>
          <HelperText
            size="xs"
            icon={<IconCircleCheck />}
            isSuccess
            className="self-end"
          >
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

export const ApprovalRejected: Story = {
  parameters: {
    order: 5,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText('Permission skipped')).toBeInTheDocument();

    expect(canvas.queryByText('Skip')).not.toBeInTheDocument();
    expect(canvas.queryByText('Allow once')).not.toBeInTheDocument();
  },
  render: () => (
    <div className="w-full max-w-lg">
      <Confirmation approval={{ approved: false }} state="output-denied">
        <ConfirmationContentTrigger>
          Atlas needs your permission to run tool &quot;Analyze time
          series&quot;
        </ConfirmationContentTrigger>
        <ConfirmationContent>
          <p className="text-sm text-muted-foreground">
            This tool will analyze patterns in your time series data to identify
            trends, seasonality, and anomalies.
          </p>
        </ConfirmationContent>
        <ConfirmationRequest>
          <ConfirmationActions className="w-full flex justify-between">
            <ConfirmationAction variant="ghost">Skip</ConfirmationAction>
            <div className="flex gap-1">
              <ConfirmationAction variant="ghost">
                Allow once
              </ConfirmationAction>
              <ConfirmationAction variant="outline">
                Always allow
              </ConfirmationAction>
            </div>
          </ConfirmationActions>
        </ConfirmationRequest>
        <ConfirmationAccepted>
          <HelperText
            size="xs"
            icon={<IconCheck />}
            isSuccess
            className="self-end"
          >
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

export const NoHelperText: Story = {
  parameters: {
    order: 6,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(
      canvas.queryByText('Only allow tools that you trust')
    ).not.toBeInTheDocument();
  },
  render: () => (
    <div className="w-full max-w-lg">
      <Confirmation approval={{}} state="approval-requested" helperText={false}>
        <ConfirmationContentTrigger>
          Atlas needs your permission to run tool &quot;Analyze time
          series&quot;
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
              <ConfirmationAction variant="ghost">
                Allow once
              </ConfirmationAction>
              <ConfirmationAction variant="outline">
                Always allow
              </ConfirmationAction>
            </div>
          </ConfirmationActions>
        </ConfirmationRequest>
      </Confirmation>
    </div>
  ),
};

export const CustomHelperText: Story = {
  parameters: {
    order: 7,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByText('This action requires elevated permissions.')
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
          Atlas needs your permission to run tool &quot;Analyze time
          series&quot;
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
              <ConfirmationAction variant="ghost">
                Allow once
              </ConfirmationAction>
              <ConfirmationAction variant="outline">
                Always allow
              </ConfirmationAction>
            </div>
          </ConfirmationActions>
        </ConfirmationRequest>
      </Confirmation>
    </div>
  ),
};

export const WithParagraphs: Story = {
  parameters: {
    order: 8,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const trigger = canvas.getByRole('button', { name: /Atlas needs/i });
    await userEvent.click(trigger);

    await waitFor(() => {
      expect(
        canvas.getByText(/uses advanced statistical methods/i)
      ).toBeInTheDocument();
    });
  },
  render: () => (
    <div className="w-full max-w-lg">
      <Confirmation approval={{}} state="approval-requested">
        <ConfirmationContentTrigger>
          Atlas needs your permission to run tool &quot;Analyze time
          series&quot;
        </ConfirmationContentTrigger>
        <ConfirmationContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              This tool will analyze patterns in your time series data to
              identify trends, seasonality, and anomalies. It uses advanced
              statistical methods to detect patterns that might not be
              immediately visible.
            </p>
            <p>
              The analysis will process your historical data and generate
              insights about recurring patterns, seasonal variations, and
              potential outliers. This information can help you make more
              informed decisions based on your data trends.
            </p>
          </div>
        </ConfirmationContent>
        <ConfirmationRequest>
          <ConfirmationActions className="w-full flex justify-between">
            <ConfirmationAction variant="ghost">Skip</ConfirmationAction>
            <div className="flex gap-1">
              <ConfirmationAction variant="ghost">
                Allow once
              </ConfirmationAction>
              <ConfirmationAction variant="outline">
                Always allow
              </ConfirmationAction>
            </div>
          </ConfirmationActions>
        </ConfirmationRequest>
        <ConfirmationAccepted>
          <HelperText
            size="xs"
            icon={<IconCheck />}
            isSuccess
            className="self-end"
          >
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

export const WithCodeBlock: Story = {
  parameters: {
    order: 9,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const trigger = canvas.getByRole('button', { name: /Atlas needs/i });
    await userEvent.click(trigger);

    await waitFor(() => {
      expect(canvas.getAllByText(/analyzeTimeSeries/).length).toBeGreaterThan(
        0
      );
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
            Atlas needs your permission to run tool &quot;Analyze time
            series&quot;
          </ConfirmationContentTrigger>
          <ConfirmationContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                The following code will be executed to analyze your time series
                data:
              </p>
              <CodeBlock language="typescript" code={codeToExecute} />
            </div>
          </ConfirmationContent>
          <ConfirmationRequest>
            <ConfirmationActions className="w-full flex justify-between">
              <ConfirmationAction variant="ghost">Skip</ConfirmationAction>
              <div className="flex gap-1">
                <ConfirmationAction variant="ghost">
                  Allow once
                </ConfirmationAction>
                <ConfirmationAction variant="outline">
                  Always allow
                </ConfirmationAction>
              </div>
            </ConfirmationActions>
          </ConfirmationRequest>
          <ConfirmationAccepted>
            <HelperText
              size="xs"
              icon={<IconCheck />}
              isSuccess
              className="self-end"
            >
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

export const CollapsibleInteraction: Story = {
  parameters: {
    order: 10,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const trigger = canvas.getByRole('button', { name: /Atlas needs/i });
    await expect(trigger).toBeInTheDocument();

    await expect(trigger).toHaveAttribute('aria-expanded');

    await userEvent.click(trigger);

    await waitFor(() => {
      expect(
        canvas.getByText(/analyze patterns in your time series/i)
      ).toBeInTheDocument();
    });

    await expect(trigger).toHaveAttribute('aria-expanded', 'true');

    await userEvent.click(trigger);

    await waitFor(() => {
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });
  },
  render: () => (
    <div className="w-full max-w-lg">
      <Confirmation approval={{}} state="approval-requested">
        <ConfirmationContentTrigger>
          Atlas needs your permission to run tool &quot;Analyze time
          series&quot;
        </ConfirmationContentTrigger>
        <ConfirmationContent>
          <p className="text-sm text-muted-foreground">
            This tool will analyze patterns in your time series data to identify
            trends, seasonality, and anomalies.
          </p>
        </ConfirmationContent>
        <ConfirmationRequest>
          <ConfirmationActions className="w-full flex justify-between">
            <ConfirmationAction variant="ghost">Skip</ConfirmationAction>
            <div className="flex gap-1">
              <ConfirmationAction variant="ghost">
                Allow once
              </ConfirmationAction>
              <ConfirmationAction variant="outline">
                Always allow
              </ConfirmationAction>
            </div>
          </ConfirmationActions>
        </ConfirmationRequest>
      </Confirmation>
    </div>
  ),
};

export const KeyboardNavigation: Story = {
  parameters: {
    order: 11,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const trigger = canvas.getByRole('button', { name: /Atlas needs/i });

    trigger.focus();
    await expect(trigger).toHaveFocus();

    await userEvent.keyboard(' ');

    await waitFor(() => {
      expect(
        canvas.getByText(/analyze patterns in your time series/i)
      ).toBeInTheDocument();
    });

    await userEvent.tab();
    const skipButton = canvas.getByRole('button', { name: 'Skip' });
    await expect(skipButton).toHaveFocus();

    await userEvent.tab();
    const allowOnceButton = canvas.getByRole('button', { name: 'Allow once' });
    await expect(allowOnceButton).toHaveFocus();

    await userEvent.tab();
    const alwaysAllowButton = canvas.getByRole('button', {
      name: 'Always allow',
    });
    await expect(alwaysAllowButton).toHaveFocus();

    await userEvent.keyboard('{Enter}');

    await waitFor(() => {
      expect(canvas.getByText('Permission allowed always')).toBeInTheDocument();
    });
  },
  render: function KeyboardNavigationStory() {
    const [approval, setApproval] = useState<{
      approved?: boolean;
      always?: boolean;
    }>({});
    const [state, setState] = useState<string>('approval-requested');

    const handleAlwaysAllow = () => {
      setApproval({ approved: true, always: true });
      setState('output-available');
    };

    return (
      <div className="w-full max-w-lg">
        <Confirmation approval={approval} state={state}>
          <ConfirmationContentTrigger>
            Atlas needs your permission to run tool &quot;Analyze time
            series&quot;
          </ConfirmationContentTrigger>
          <ConfirmationContent>
            <p className="text-sm text-muted-foreground">
              This tool will analyze patterns in your time series data to
              identify trends, seasonality, and anomalies.
            </p>
          </ConfirmationContent>
          <ConfirmationRequest>
            <ConfirmationActions className="w-full flex justify-between">
              <ConfirmationAction variant="ghost">Skip</ConfirmationAction>
              <div className="flex gap-1">
                <ConfirmationAction variant="ghost">
                  Allow once
                </ConfirmationAction>
                <ConfirmationAction
                  variant="outline"
                  onClick={handleAlwaysAllow}
                >
                  Always allow
                </ConfirmationAction>
              </div>
            </ConfirmationActions>
          </ConfirmationRequest>
          <ConfirmationAccepted>
            {approval.always ? (
              <HelperText
                size="xs"
                icon={<IconCircleCheck />}
                isSuccess
                className="self-end"
              >
                Permission allowed always
              </HelperText>
            ) : (
              <HelperText
                size="xs"
                icon={<IconCheck />}
                isSuccess
                className="self-end"
              >
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

export const HiddenDuringStreaming: Story = {
  parameters: {
    order: 12,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.queryByText(/Atlas needs/i)).not.toBeInTheDocument();
    expect(canvas.queryByText('Skip')).not.toBeInTheDocument();
  },
  render: () => (
    <div className="w-full max-w-lg p-4 border border-dashed border-border rounded-lg">
      <p className="text-sm text-muted-foreground mb-4">
        The confirmation below is hidden because state is
        &quot;input-streaming&quot;:
      </p>
      <Confirmation approval={{}} state="input-streaming">
        <ConfirmationContentTrigger>
          Atlas needs your permission to run tool &quot;Analyze time
          series&quot;
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
              <ConfirmationAction variant="ghost">
                Allow once
              </ConfirmationAction>
              <ConfirmationAction variant="outline">
                Always allow
              </ConfirmationAction>
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

export const Playground: Story = {
  args: {
    approval: {},
    state: 'approval-requested',
    className: 'w-full max-w-lg',
  },
  parameters: {
    order: 99,
  },
  render: (args) => (
    <div className="w-full max-w-lg">
      <Confirmation {...args}>
        <ConfirmationContentTrigger>
          Atlas needs your permission to run tool &quot;Analyze time
          series&quot;
        </ConfirmationContentTrigger>
        <ConfirmationContent>
          <p className="text-sm text-muted-foreground">
            This tool will analyze patterns in your time series data to identify
            trends, seasonality, and anomalies.
          </p>
        </ConfirmationContent>
        <ConfirmationRequest>
          <ConfirmationActions className="w-full flex justify-between">
            <ConfirmationAction variant="ghost">Skip</ConfirmationAction>
            <div className="flex gap-1">
              <ConfirmationAction variant="ghost">
                Allow once
              </ConfirmationAction>
              <ConfirmationAction variant="outline">
                Always allow
              </ConfirmationAction>
            </div>
          </ConfirmationActions>
        </ConfirmationRequest>
        <ConfirmationAccepted>
          <HelperText
            size="xs"
            icon={<IconCheck />}
            isSuccess
            className="self-end"
          >
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
