import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within } from 'storybook/test';

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
      table: {
        category: 'Layout',
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: 'bottom-right',
        },
      },
    },
    richColors: {
      control: 'boolean',
      table: {
        category: 'Appearance',
        type: {
          summary: 'boolean',
        },
      },
    },
    expand: {
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: {
          summary: 'boolean',
        },
      },
    },
    closeButton: {
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: {
          summary: 'boolean',
        },
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
export const Default: Story = {
  render: () => (
    <Button onClick={() => toast('Event has been created')}>Show Toast</Button>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await userEvent.click(button);
  },
};
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
};
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
};
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
};
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
};
export const Info: Story = {
  render: () => (
    <Button
      variant="secondary"
      onClick={() =>
        toast.info('Did you know?', {
          description:
            'You can customize your notification preferences in settings.',
        })
      }
    >
      Show Info Toast
    </Button>
  ),
};
export const LoadingWithPromise: Story = {
  render: () => (
    <Button
      onClick={() => {
        const promise = () =>
          new Promise<{
            name: string;
          }>((resolve) =>
            setTimeout(
              () =>
                resolve({
                  name: 'Sonner',
                }),
              2000
            )
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
};
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
};
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
};
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
};
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
};
export const VisualRegression: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-muted-foreground">
        Toast Triggers
      </h3>
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
    chromatic: {
      disableSnapshot: false,
    },
  },
};
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
};
