import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconArrowLeft, IconPlus } from '@tabler/icons-react';

import { Button } from '../button';

import { EmptyState } from './empty-state';

const meta: Meta<typeof EmptyState> = {
  title: 'Primitives/Empty State',
  component: EmptyState,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      table: {
        category: 'Content',
      },
    },
    size: {
      control: 'select',
      options: ['default', 'sm'],
      table: {
        category: 'Variants/Styling',
        type: {
          summary: '"default" | "sm"',
        },
      },
    },
    body: {
      control: 'text',
      table: {
        category: 'Content',
      },
    },
    className: {
      control: 'text',
      table: {
        category: 'Variants/Styling',
      },
    },
    icon: {
      control: false,
      table: {
        category: 'Content',
        type: {
          summary: 'ReactNode',
        },
      },
    },
    primaryAction: {
      control: false,
      table: {
        category: 'Content',
        type: {
          summary: 'ReactNode',
        },
      },
    },
    secondaryAction: {
      control: false,
      table: {
        category: 'Content',
        type: {
          summary: 'ReactNode',
        },
      },
    },
    helpLink: {
      control: false,
      table: {
        category: 'Content',
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Basic: Story = {
  parameters: {
    order: 1,
  },
  render: () => (
    <EmptyState
      title="No data yet"
      body="When you create a new extraction pipeline, you can monitor your data pipelines here."
      primaryAction={
        <Button>
          <IconPlus />
          Create extraction pipeline
        </Button>
      }
      secondaryAction={
        <Button variant="outline">
          <IconArrowLeft />
          Back
        </Button>
      }
    />
  ),
};

export const WithActions: Story = {
  parameters: {
    order: 2,
  },
  render: () => (
    <EmptyState
      title="No access"
      body="This canvas is private, you must request access to view or edit it."
      primaryAction={<Button>Request access</Button>}
      secondaryAction={
        <Button variant="outline">
          <IconArrowLeft />
          Back
        </Button>
      }
    />
  ),
};

export const WithHelpLink: Story = {
  parameters: {
    order: 3,
  },
  render: () => (
    <EmptyState
      title="No access"
      body="This canvas is private, you must request access to view or edit it."
      primaryAction={<Button>Request access</Button>}
      secondaryAction={
        <Button variant="outline">
          <IconArrowLeft />
          Back
        </Button>
      }
      helpLink={{ label: 'Learn more', href: '#' }}
    />
  ),
};

export const Small: Story = {
  parameters: {
    order: 4,
  },
  render: () => (
    <EmptyState
      title="No data yet"
      body="Try adjusting your search parameters and try again."
      size="sm"
      primaryAction={
        <Button variant="secondary" size="sm">
          <IconPlus />
          Create extraction pipeline
        </Button>
      }
      helpLink={{ label: 'Learn more', href: '#' }}
    />
  ),
};
