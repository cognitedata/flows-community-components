import { HelperText } from '@cognite/aura/components';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  IconAlertTriangle,
  IconCheck,
  IconCircleCheck,
  IconX,
} from '@tabler/icons-react';
import { useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import {
  Confirmation,
  ConfirmationAccepted,
  ConfirmationAction,
  ConfirmationActions,
  ConfirmationContent,
  ConfirmationContentTrigger,
  ConfirmationRejected,
  ConfirmationRequest,
  type ConfirmationState,
} from './confirmation';

const meta: Meta<typeof Confirmation> = {
  title: 'Community/Confirmation',
  component: Confirmation,
  tags: ['autodocs'],
  argTypes: {
    approved: {
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean | undefined' },
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
        type: { summary: 'ConfirmationState' },
      },
    },

    helperText: {
      control: false,
      table: {
        category: 'Content',
        type: { summary: 'ReactNode' },
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
      <Confirmation
        approved={undefined}
        state="approval-requested"
        helperText={
          <HelperText
            size="xs"
            icon={<IconAlertTriangle />}
            className="self-end"
          >
            Only allow tools that you trust
          </HelperText>
        }
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
    const [approved, setApproved] = useState<boolean | undefined>(undefined);
    const [allowedMode, setAllowedMode] = useState<
      'once' | 'always' | undefined
    >(undefined);
    const [state, setState] = useState<ConfirmationState>('approval-requested');

    const handleAllowOnce = () => {
      setApproved(true);
      setAllowedMode('once');
      setState('output-available');
    };

    const handleAlwaysAllow = () => {
      setApproved(true);
      setAllowedMode('always');
      setState('output-available');
    };

    const handleDeny = () => {
      setApproved(false);
      setAllowedMode(undefined);
      setState('output-denied');
    };

    const handleReset = () => {
      setApproved(undefined);
      setAllowedMode(undefined);
      setState('approval-requested');
    };

    return (
      <div className="w-full space-y-4">
        <Confirmation
          className="w-full max-w-lg"
          approved={approved}
          state={state}
          helperText={
            <HelperText
              size="xs"
              icon={<IconAlertTriangle />}
              className="self-end"
            >
              Only allow tools that you trust
            </HelperText>
          }
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
            {allowedMode === 'always' ? (
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
        approved={true}
        state="output-available"
        helperText={
          <HelperText
            size="xs"
            icon={<IconAlertTriangle />}
            className="self-end"
          >
            Only allow tools that you trust
          </HelperText>
        }
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
        approved={true}
        state="output-available"
        helperText={
          <HelperText
            size="xs"
            icon={<IconAlertTriangle />}
            className="self-end"
          >
            Only allow tools that you trust
          </HelperText>
        }
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

export const Playground: Story = {
  args: {
    approved: undefined,
    state: 'approval-requested',
    className: 'w-full max-w-lg',
  },
  parameters: {
    order: 99,
  },
  render: (args) => (
    <div className="w-full max-w-lg">
      <Confirmation
        {...args}
        helperText={
          <HelperText
            size="xs"
            icon={<IconAlertTriangle />}
            className="self-end"
          >
            Only allow tools that you trust
          </HelperText>
        }
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

export const WithoutHelperText: Story = {
  parameters: {
    order: 5,
  },
  render: () => (
    <div className="w-full max-w-lg">
      <Confirmation approved={undefined} state="approval-requested">
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
