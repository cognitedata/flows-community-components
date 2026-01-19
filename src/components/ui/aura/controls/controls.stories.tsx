import type { Meta, StoryObj } from '@storybook/react';
import { Controls } from './controls';

const meta: Meta<typeof Controls> = {
  title: 'AI/Controls',
  component: Controls,
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
type Story = StoryObj<typeof Controls>;

/**
 * Default controls (requires ReactFlow context).
 * 
 * Note: This component wraps ReactFlow Controls and requires
 * a ReactFlow context to function properly.
 */
export const Default: Story = {
  render: () => (
    <div className="p-4 border rounded-md bg-muted/20">
      <p className="text-sm text-muted-foreground text-center">
        The Controls component is a ReactFlow Controls wrapper.
        <br />
        It requires a ReactFlow context to function properly.
        <br />
        <br />
        It provides zoom in, zoom out, fit view, and lock controls.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Controls component for ReactFlow canvases. Requires ReactFlow context.',
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
        <pre>{`import { ReactFlow } from '@xyflow/react';
import { Controls } from '@/components/ui/aura/controls';

function FlowCanvas() {
  return (
    <ReactFlow nodes={nodes} edges={edges}>
      <Controls />
    </ReactFlow>
  );
}`}</pre>
      </div>
      <p className="text-sm text-muted-foreground">
        The Controls component is automatically included in the Canvas 
        component, but can also be used standalone within ReactFlow.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example showing how to use the Controls component.',
      },
    },
  },
};

/**
 * Styling preview.
 */
export const StylingPreview: Story = {
  render: () => (
    <div className="gap-px overflow-hidden rounded-md border bg-card p-1 inline-flex flex-col">
      <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-secondary text-muted-foreground">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
      </button>
      <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-secondary text-muted-foreground">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 13H5v-2h14v2z"/>
        </svg>
      </button>
      <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-secondary text-muted-foreground">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M5 15H3v4c0 1.1.9 2 2 2h4v-2H5v-4zM5 5h4V3H5c-1.1 0-2 .9-2 2v4h2V5zm14-2h-4v2h4v4h2V5c0-1.1-.9-2-2-2zm0 16h-4v2h4c1.1 0 2-.9 2-2v-4h-2v4z"/>
        </svg>
      </button>
      <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-secondary text-muted-foreground">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
        </svg>
      </button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Preview of Controls styling (without ReactFlow context).',
      },
    },
  },
};
