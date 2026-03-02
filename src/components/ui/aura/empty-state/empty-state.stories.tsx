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

export const Small: Story = {
  parameters: {
    order: 2,
  },
  render: () => (
    <EmptyState
      title="No results"
      body="Try adjusting your search parameters and try again."
      size="sm"
      primaryAction={
        <Button variant="secondary" size="sm">
          <IconPlus />
          Create extraction pipeline
        </Button>
      }
      secondaryAction={
        <Button variant="ghost" size="sm">
          Back
          <IconArrowLeft />
        </Button>
      }
    />
  ),
};

export const AllSizes: Story = {
  parameters: {
    order: 3,
  },
  render: () => {
    return (
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-medium tracking-tightest mb-2">Default</h3>
        <EmptyState
          title="No Access"
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
        <h3 className="text-sm font-medium tracking-tightest mb-2">Small</h3>
        <EmptyState
          title="No Access"
          body="This canvas is private, you must request access to view or edit it."
          size="sm"
          primaryAction={
            <Button variant="secondary" size="sm">
              Request access
            </Button>
          }
          secondaryAction={
            <Button variant="ghost" size="sm">
              Back
              <IconArrowLeft />
            </Button>
          }
        />
      </div>
    );
  },
};

export const WithActions: Story = {
  parameters: {
    order: 4,
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
    order: 5,
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

export const NarrowContainer: Story = {
  parameters: {
    order: 6,
  },
  render: () => (
    <div className="w-56 p-4 border border-dashed border-gray-300 rounded-md">
      <EmptyState
        title="No matches found"
        body="Try broadening your search terms or removing filters."
        primaryAction={<Button>Clear filters</Button>}
        secondaryAction={
          <Button variant="outline">
            <IconArrowLeft />
            Back
          </Button>
        }
      />
    </div>
  ),
};

export const LongBody: Story = {
  parameters: {
    order: 7,
  },
  render: () => (
    <EmptyState
      title="No extraction pipelines available"
      body="Extraction pipelines help you move and transform data between systems. Create a new pipeline to define your source, destination, and transformation steps, then monitor status and troubleshoot failures directly from this page."
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
