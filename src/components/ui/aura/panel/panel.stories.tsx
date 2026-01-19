import type { Meta, StoryObj } from "@storybook/react";
import { Panel } from "./panel";

const meta: Meta<typeof Panel> = {
  title: "AI/Panel",
  component: Panel,
  tags: ["autodocs"],
  argTypes: {
    position: {
      control: "select",
      options: [
        "top-left",
        "top-center",
        "top-right",
        "bottom-left",
        "bottom-center",
        "bottom-right",
      ],
      description: "Position of the panel",
      table: {
        category: "Layout",
        type: { summary: "string" },
      },
    },
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
type Story = StoryObj<typeof Panel>;

/**
 * Default panel (requires ReactFlow context).
 *
 * Note: This component is a ReactFlow Panel wrapper and requires
 * a ReactFlow context to function properly.
 */
export const Default: Story = {
  render: () => (
    <div className="p-4 border rounded-md bg-muted/20">
      <p className="text-sm text-muted-foreground text-center">
        The Panel component is a ReactFlow Panel wrapper.
        <br />
        It requires a ReactFlow context to function properly.
        <br />
        <br />
        Use it within a ReactFlow container to create floating panels.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Panel component for ReactFlow canvases. Requires ReactFlow context.",
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
import { Panel } from '@/components/ui/aura/panel';
import { Button } from '@/components/ui/aura/button';

function FlowCanvas() {
  return (
    <ReactFlow nodes={nodes} edges={edges}>
      <Panel position="top-right">
        <Button size="sm">Zoom In</Button>
        <Button size="sm">Zoom Out</Button>
        <Button size="sm">Fit View</Button>
      </Panel>
    </ReactFlow>
  );
}`}</pre>
      </div>
      <p className="text-sm text-muted-foreground">
        The Panel appears as a floating control panel on the ReactFlow canvas, positioned according
        to the `position` prop.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Example showing how to use the Panel component with ReactFlow.",
      },
    },
  },
};

/**
 * Panel styling preview.
 */
export const StylingPreview: Story = {
  render: () => (
    <div className="m-4 overflow-hidden rounded-md border bg-card p-1 inline-flex gap-1">
      <button className="px-2 py-1 text-xs rounded hover:bg-muted">Zoom In</button>
      <button className="px-2 py-1 text-xs rounded hover:bg-muted">Zoom Out</button>
      <button className="px-2 py-1 text-xs rounded hover:bg-muted">Fit View</button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Preview of Panel styling (without ReactFlow context).",
      },
    },
  },
};
