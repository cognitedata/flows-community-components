import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';

import { Toaster, toast } from './sonner-toast';

import { Button } from '@/components/ui/aura/button';

const meta: Meta<typeof Toaster> = {
  title: 'Primitives/Sonner Toast',
  component: Toaster,
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ],
      description: 'Position of the toasts',
      table: {
        category: 'Layout',
        type: { summary: 'string' },
        defaultValue: { summary: 'bottom-right' },
      },
    },
    richColors: {
      control: 'boolean',
      description: 'Use rich colors for toast types',
      table: {
        category: 'Appearance',
        type: { summary: 'boolean' },
      },
    },
    expand: {
      control: 'boolean',
      description: 'Expand toasts by default',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
      },
    },
    closeButton: {
      control: 'boolean',
      description: 'Show close button on toasts',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster />
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
  render: () => <Button onClick={() => toast('Event has been created')}>Show Toast</Button>,
  parameters: {
    docs: {
      description: {
        story: 'Default toast notification.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await userEvent.click(button);
  },
};

/**
 * Toast with description.
 */
export const WithDescription: Story = {
  render: () => (
    <Button
      onClick={() =>
        toast('Event has been created', {
          description: 'Monday, January 3rd at 6:00pm',
        })
      }
    >
      Show Toast with Description
    </Button>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Toast with title and description.',
      },
    },
  },
};

/**
 * Success toast.
 */
export const Success: Story = {
  render: () => (
    <Button
      onClick={() =>
        toast.success('Profile updated', {
          description: 'Your changes have been saved successfully.',
        })
      }
    >
      Show Success Toast
    </Button>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Success variant toast.',
      },
    },
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
        toast.error('Something went wrong', {
          description: 'Please try again later.',
        })
      }
    >
      Show Error Toast
    </Button>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Error variant toast.',
      },
    },
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
        toast.warning('Warning', {
          description: 'This action cannot be undone.',
        })
      }
    >
      Show Warning Toast
    </Button>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Warning variant toast.',
      },
    },
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
        toast.info('Did you know?', {
          description: 'You can customize your notification preferences in settings.',
        })
      }
    >
      Show Info Toast
    </Button>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Info variant toast.',
      },
    },
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
            setTimeout(() => resolve({ name: 'Sonner' }), 2000)
          );

        toast.promise(promise, {
          loading: 'Loading...',
          success: (data) => `${data.name} toast has been added`,
          error: 'Error',
        });
      }}
    >
      Show Loading Toast
    </Button>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Toast that shows loading state and resolves with success/error.',
      },
    },
  },
};

/**
 * Toast with action.
 */
export const WithAction: Story = {
  render: () => (
    <Button
      onClick={() =>
        toast('File deleted', {
          description: 'The file has been moved to trash.',
          action: {
            label: 'Undo',
            onClick: () => toast.success('Undo successful'),
          },
        })
      }
    >
      Show Toast with Action
    </Button>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Toast with an action button.',
      },
    },
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
          toast('Quick toast', {
            duration: 1000,
            description: 'Disappears in 1 second',
          })
        }
      >
        1s Duration
      </Button>
      <Button
        onClick={() =>
          toast('Long toast', {
            duration: 10000,
            description: 'Stays for 10 seconds',
          })
        }
      >
        10s Duration
      </Button>
      <Button
        onClick={() =>
          toast('Persistent toast', {
            duration: Number.POSITIVE_INFINITY,
            description: 'Must be dismissed manually',
          })
        }
      >
        Infinite Duration
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Toasts with different durations.',
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
      <Button onClick={() => toast('Default toast')}>Default</Button>
      <Button onClick={() => toast.success('Success!')}>Success</Button>
      <Button onClick={() => toast.error('Error!')}>Error</Button>
      <Button onClick={() => toast.warning('Warning!')}>Warning</Button>
      <Button onClick={() => toast.info('Info!')}>Info</Button>
      <Button onClick={() => toast.loading('Loading...')}>Loading</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available toast types.',
      },
    },
  },
};

/**
 * Dismiss toast.
 */
export const Dismiss: Story = {
  render: () => {
    let toastId: string | number;

    return (
      <div className="flex gap-4">
        <Button
          onClick={() => {
            toastId = toast('Dismissible toast', {
              duration: Number.POSITIVE_INFINITY,
              description: 'Click the other button to dismiss',
            });
          }}
        >
          Show Toast
        </Button>
        <Button variant="outline" onClick={() => toast.dismiss(toastId)}>
          Dismiss Toast
        </Button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Programmatically dismiss a specific toast.',
      },
    },
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
        <Button size="sm" onClick={() => toast('Default')}>
          Default
        </Button>
        <Button size="sm" onClick={() => toast.success('Success')}>
          Success
        </Button>
        <Button size="sm" onClick={() => toast.error('Error')}>
          Error
        </Button>
        <Button size="sm" onClick={() => toast.warning('Warning')}>
          Warning
        </Button>
        <Button size="sm" onClick={() => toast.info('Info')}>
          Info
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Toast triggers for visual regression testing.',
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
        toast('Playground Toast', {
          description: 'This is a toast notification from the playground.',
        })
      }
    >
      Show Playground Toast
    </Button>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive toast example.',
      },
    },
  },
};
