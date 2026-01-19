import type { Meta, StoryObj } from "@storybook/react";
import { Canvas } from "./canvas";

const meta: Meta<typeof Canvas> = {
  title: "AI/Canvas",
  component: Canvas,
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes",
      table: {
        category: "Styling",
      },
    },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Canvas>;

/**
 * Default canvas (requires ReactFlow).
 *
 * Note: This component wraps ReactFlow and requires the ReactFlowProvider
 * to function properly in production.
 */
export const Default: Story = {
  render: () => (
    <div className="p-4 border rounded-md bg-muted/20 max-w-md">
      <p className="text-sm text-muted-foreground text-center">
        The Canvas component is a ReactFlow wrapper that provides:
      </p>
      <ul className="mt-4 text-sm text-muted-foreground list-disc pl-6 space-y-1">
        <li>Pre-configured background with theme colors</li>
        <li>Built-in zoom and pan controls</li>
        <li>Delete key support (Backspace/Delete)</li>
        <li>Pan on scroll behavior</li>
        <li>Selection on drag</li>
      </ul>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Canvas component for building node-based UIs. Requires ReactFlow context.",
      },
    },
  },
};

/**
 * Usage example documentation.
 */
export const UsageExample: Story = {
  render: () => (
    <div className="p-4 border rounded-md space-y-4 max-w-lg">
      <h3 className="font-medium">Usage with ReactFlow</h3>
      <div className="bg-muted/50 p-3 rounded-md text-xs font-mono overflow-x-auto">
        <pre>{`import { ReactFlowProvider } from '@xyflow/react';
import { Canvas } from '@/components/ui/aura/canvas';
import { Node } from '@/components/ui/aura/node';
import { Edge } from '@/components/ui/aura/edge';

const nodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
  { id: '2', position: { x: 200, y: 100 }, data: { label: 'Node 2' } },
];

const edges = [
  { id: 'e1-2', source: '1', target: '2' },
];

function FlowEditor() {
  return (
    <ReactFlowProvider>
      <Canvas nodes={nodes} edges={edges}>
        {/* Custom panels, toolbars, etc. */}
      </Canvas>
    </ReactFlowProvider>
  );
}`}</pre>
      </div>
      <p className="text-sm text-muted-foreground">
        The Canvas component provides a ready-to-use ReactFlow setup with customized defaults for
        building agent workflows and node graphs.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Example showing how to use the Canvas component.",
      },
    },
  },
};

/**
 * Feature overview.
 */
export const FeatureOverview: Story = {
  render: () => (
    <div className="p-4 border rounded-md space-y-4 max-w-md">
      <h3 className="font-medium">Canvas Features</h3>
      <div className="space-y-3">
        <div className="p-3 bg-muted/30 rounded-md">
          <h4 className="text-sm font-medium">Background</h4>
          <p className="text-xs text-muted-foreground mt-1">
            Uses theme-aware background color (--sidebar)
          </p>
        </div>
        <div className="p-3 bg-muted/30 rounded-md">
          <h4 className="text-sm font-medium">Controls</h4>
          <p className="text-xs text-muted-foreground mt-1">
            Built-in zoom controls with Aura styling
          </p>
        </div>
        <div className="p-3 bg-muted/30 rounded-md">
          <h4 className="text-sm font-medium">Interactions</h4>
          <p className="text-xs text-muted-foreground mt-1">
            Pan on scroll, selection on drag, delete keys enabled
          </p>
        </div>
        <div className="p-3 bg-muted/30 rounded-md">
          <h4 className="text-sm font-medium">Fit View</h4>
          <p className="text-xs text-muted-foreground mt-1">
            Automatically fits content to viewport on load
          </p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Overview of Canvas component features.",
      },
    },
  },
};
