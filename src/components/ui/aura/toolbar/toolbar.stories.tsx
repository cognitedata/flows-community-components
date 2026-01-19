import type { Meta, StoryObj } from '@storybook/react';
import { Toolbar } from './toolbar';

const meta: Meta<typeof Toolbar> = {
  title: 'Primitives/Toolbar',
  component: Toolbar,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes',
      table: {
        category: 'Styling',
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Toolbar>;

/**
 * Default toolbar (requires ReactFlow context).
 * 
 * Note: This component is a ReactFlow NodeToolbar wrapper and requires
 * a ReactFlow context to function properly. In production, use it within
 * a ReactFlow node component.
 */
export const Default: Story = {
  render: () => (
    <div className="p-4 border rounded-md bg-muted/20">
      <p className="text-sm text-muted-foreground text-center">
        The Toolbar component is a ReactFlow NodeToolbar wrapper.
        <br />
        It requires a ReactFlow context to function properly.
        <br />
        <br />
        Use it within custom ReactFlow node components.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Toolbar component for ReactFlow nodes. Requires ReactFlow context.',
      },
    },
  },
};

/**
 * Usage example documentation.
 */
export const UsageExample: Story = {
  render: () => (
    <div className="p-4 border rounded-md space-y-4 max-w-md">
      <h3 className="font-medium">Usage with ReactFlow</h3>
      <div className="bg-muted/50 p-3 rounded-md text-xs font-mono overflow-x-auto">
        <pre>{`import { Toolbar } from '@/components/ui/aura/toolbar';
import { Button } from '@/components/ui/aura/button';

function CustomNode({ data }) {
  return (
    <>
      <Toolbar>
        <Button size="icon-sm" variant="ghost">
          Edit
        </Button>
        <Button size="icon-sm" variant="ghost">
          Delete
        </Button>
      </Toolbar>
      <div className="node-content">
        {data.label}
      </div>
    </>
  );
}`}</pre>
      </div>
      <p className="text-sm text-muted-foreground">
        The Toolbar appears when a ReactFlow node is selected, positioned
        at the bottom of the node by default.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example showing how to use the Toolbar component with ReactFlow.',
      },
    },
  },
};
