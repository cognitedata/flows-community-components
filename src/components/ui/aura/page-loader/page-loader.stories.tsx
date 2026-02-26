import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import { PageLoader } from './page-loader';

const meta: Meta<typeof PageLoader> = {
  title: 'Primitives/Page Loader',
  component: PageLoader,
  tags: ['autodocs'],
  argTypes: {
    animationDuration: {
      control: 'number',
      table: {
        category: 'Behavior',
      },
    },
    info: {
      control: 'object',
      table: {
        category: 'Content',
        type: {
          summary: 'object',
        },
        defaultValue: {
          summary: 'undefined',
        },
      },
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => {
      return (
        <div className="min-h-80 w-full">
          <Story />
        </div>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof PageLoader>;

export const Basic: Story = {
  parameters: {
    order: 1,
  },
  render: () => <PageLoader />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Loading page...')).toBeInTheDocument();
  },
};

export const WithInfo: Story = {
  parameters: {
    order: 3,
  },
  render: () => (
    <PageLoader
      aria-label="Page loading with info"
      info={{
        title: 'Preparing workspace',
        content: 'Syncing your data and applying the latest settings.',
      }}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Preparing workspace')).toBeInTheDocument();
    await expect(
      canvas.getByText('Syncing your data and applying the latest settings.')
    ).toBeInTheDocument();
  },
};

export const Slow: Story = {
  parameters: {
    order: 4,
  },
  render: () => (
    <div data-slot="page-loader">
      <PageLoader animationDuration={4} />
    </div>
  ),
};

export const VisualRegression: Story = {
  parameters: {
    order: 5,
    chromatic: {
      pauseAnimationAtEnd: true,
    },
  },
  render: () => (
    <div className="flex flex-col items-center justify-center gap-8">
      <PageLoader disableFixedCenter />
      <PageLoader animationDuration={6} disableFixedCenter />
      <PageLoader
        disableFixedCenter
        info={{
          title: 'Loading larger state',
          content: 'Reviewing and preparing all visible modules.',
        }}
      />
    </div>
  ),
};

export const Playground: Story = {
  parameters: {
    order: 99,
  },
  args: {
    animationDuration: 2,
  },
  render: (args) => <PageLoader {...args} />,
};
