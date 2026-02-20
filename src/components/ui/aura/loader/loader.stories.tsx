import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import { Loader } from './loader';

import { Button } from '@/components/ui/aura/button';
const meta: Meta<typeof Loader> = {
  title: 'AI/Loader',
  component: Loader,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'number',
      table: {
        category: 'Variants/Styling',
        type: {
          summary: 'number',
        },
        defaultValue: {
          summary: '16',
        },
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
type Story = StoryObj<typeof Loader>;
export const Default: Story = {
  render: () => <Loader aria-label="Loading" />,
  parameters: {
    order: 1,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const loader = canvas.getByLabelText('Loading');
    await expect(loader).toBeInTheDocument();
  },
};
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Loader size={12} />
        <span className="text-xs text-muted-foreground">12px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader size={16} />
        <span className="text-xs text-muted-foreground">16px (default)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader size={24} />
        <span className="text-xs text-muted-foreground">24px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader size={32} />
        <span className="text-xs text-muted-foreground">32px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Loader size={48} />
        <span className="text-xs text-muted-foreground">48px</span>
      </div>
    </div>
  ),
  parameters: {
    order: 2,
  },
};
export const InButton: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button disabled>
        <Loader size={16} />
        Loading...
      </Button>
      <Button variant="outline" disabled>
        <Loader size={16} />
        Please wait
      </Button>
      <Button variant="secondary" disabled>
        <Loader size={16} />
        Processing
      </Button>
    </div>
  ),
  parameters: {
    order: 3,
  },
};
export const WithText: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Loader size={16} />
        <span className="text-sm">Loading...</span>
      </div>
      <div className="flex items-center gap-2">
        <Loader size={16} />
        <span className="text-sm text-muted-foreground">Please wait</span>
      </div>
      <div className="flex items-center gap-3">
        <Loader size={20} />
        <div>
          <p className="text-sm font-medium">Processing your request</p>
          <p className="text-xs text-muted-foreground">
            This may take a moment
          </p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    order: 4,
  },
};
export const Centered: Story = {
  render: () => (
    <div className="w-80 h-48 border rounded-lg flex items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader size={32} />
        <span className="text-sm text-muted-foreground">
          Loading content...
        </span>
      </div>
    </div>
  ),
  parameters: {
    order: 5,
  },
};
export const InCard: Story = {
  render: () => (
    <div className="w-80 rounded-lg border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Data Loading</h3>
        <Loader size={16} />
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded animate-pulse" />
        <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
        <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
      </div>
    </div>
  ),
  parameters: {
    order: 6,
  },
};
export const Overlay: Story = {
  render: () => (
    <div className="relative w-80 h-48 border rounded-lg">
      <div className="p-4">
        <h3 className="font-medium mb-2">Content Area</h3>
        <p className="text-sm text-muted-foreground">
          This content is being loaded or processed.
        </p>
      </div>
      <div className="absolute inset-0 bg-background/80 flex items-center justify-center rounded-lg">
        <div className="flex flex-col items-center gap-2">
          <Loader size={24} />
          <span className="text-sm">Saving...</span>
        </div>
      </div>
    </div>
  ),
  parameters: {
    order: 7,
  },
};
export const CustomColors: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <Loader size={24} className="text-primary" />
      <Loader size={24} className="text-blue-500" />
      <Loader size={24} className="text-green-500" />
      <Loader size={24} className="text-yellow-500" />
      <Loader size={24} className="text-red-500" />
    </div>
  ),
  parameters: {
    order: 8,
  },
};
export const Inline: Story = {
  render: () => (
    <div className="space-y-2 text-sm">
      <p>
        Fetching data <Loader size={14} className="inline-block mx-1" /> please
        wait.
      </p>
      <p>
        Status: <Loader size={14} className="inline-block mx-1" /> Connecting...
      </p>
    </div>
  ),
  parameters: {
    order: 9,
  },
};
export const Accessibility: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-2">With aria-label</h3>
        <Loader aria-label="Loading content" />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">With live region</h3>
        <div
          role="status"
          aria-live="polite"
          className="flex items-center gap-2"
        >
          <Loader size={16} />
          <span>Loading data...</span>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">
          With assertive announcement
        </h3>
        <div
          role="alert"
          aria-live="assertive"
          className="flex items-center gap-2"
        >
          <Loader size={16} />
          <span>Processing urgent request</span>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Hidden from screen readers</h3>
        <div className="flex items-center gap-2">
          <Loader size={16} aria-hidden="true" />
          <span>Content is loading</span>
        </div>
      </div>
    </div>
  ),
  parameters: {
    order: 10,
  },
};
export const VisualRegression: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Sizes</h3>
        <div className="flex items-center gap-6">
          <Loader size={12} />
          <Loader size={16} />
          <Loader size={24} />
          <Loader size={32} />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Colors</h3>
        <div className="flex items-center gap-6">
          <Loader size={20} />
          <Loader size={20} className="text-primary" />
          <Loader size={20} className="text-blue-500" />
          <Loader size={20} className="text-green-500" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">
          In Button
        </h3>
        <Button disabled>
          <Loader size={16} />
          Loading
        </Button>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">
          With Text
        </h3>
        <div className="flex items-center gap-2">
          <Loader size={16} />
          <span className="text-sm">Loading...</span>
        </div>
      </div>
    </div>
  ),
  parameters: {
    order: 11,
    chromatic: {
      pauseAnimationAtEnd: true,
    },
  },
};
export const Playground: Story = {
  args: {
    size: 16,
  },
  render: (args) => <Loader {...args} />,
  parameters: {
    order: 99,
  },
};
