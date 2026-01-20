import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "AI/Connection",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj;

/**
 * Default connection line (requires ReactFlow context).
 *
 * Note: The Connection component is a ReactFlow ConnectionLineComponent
 * that renders while the user is dragging to create a new connection.
 */
export const Default: Story = {
  render: () => (
    <div className="p-4 border rounded-md bg-muted/20 max-w-md">
      <p className="text-sm text-muted-foreground text-center">
        The Connection component is a ReactFlow connection line component.
        <br />
        It renders while dragging to create new node connections.
        <br />
        <br />
        It requires a ReactFlow context to function properly.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Connection line component for ReactFlow. Requires ReactFlow context.",
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
        <pre>{`import { ReactFlow } from '@xyflow/react';
import { Connection } from '@/components/ui/aura/connection';

function FlowEditor() {
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      connectionLineComponent={Connection}
    >
      {/* ... */}
    </ReactFlow>
  );
}`}</pre>
      </div>
      <p className="text-sm text-muted-foreground">
        The Connection component renders a bezier curve with a circle endpoint while the user is
        dragging from a handle to create a new edge.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Example showing how to use the Connection component.",
      },
    },
  },
};

/**
 * Connection line preview.
 */
export const ConnectionPreview: Story = {
  render: () => (
    <div className="p-4 border rounded-md space-y-4 max-w-md">
      <h3 className="font-medium">Connection Line Preview</h3>
      <div className="p-3 bg-muted/30 rounded-md">
        <svg
          width="250"
          height="80"
          className="overflow-visible"
          role="img"
          aria-label="Connection line preview diagram"
        >
          <title>Connection line preview</title>
          {/* Simulated connection line */}
          <path
            d="M 20,40 C 90,40 160,40 230,40"
            fill="none"
            stroke="hsl(var(--ring))"
            strokeWidth="1"
          />
          {/* Source handle */}
          <rect
            x="10"
            y="35"
            width="10"
            height="10"
            rx="2"
            fill="hsl(var(--background))"
            stroke="hsl(var(--ring))"
            strokeWidth="1"
          />
          {/* Target cursor circle */}
          <circle cx="230" cy="40" r="3" fill="white" stroke="hsl(var(--ring))" strokeWidth="1" />
        </svg>
        <p className="text-xs text-muted-foreground mt-2">
          The connection line shows a smooth bezier curve from the source handle to the cursor
          position, with a small circle at the end.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Visual preview of the connection line component.",
      },
    },
  },
};

/**
 * Visual regression testing.
 */
export const VisualRegression: Story = {
  render: () => (
    <div className="p-4">
      <svg
        width="200"
        height="60"
        className="border rounded-md bg-muted/20 p-2"
        role="img"
        aria-label="Simple connection line"
      >
        <title>Simple connection line</title>
        <path
          d="M 10,30 C 60,30 140,30 190,30"
          fill="none"
          stroke="hsl(var(--ring))"
          strokeWidth="1"
        />
        <circle cx="190" cy="30" r="3" fill="white" stroke="hsl(var(--ring))" strokeWidth="1" />
      </svg>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Connection line for visual regression testing.",
      },
    },
    chromatic: {
      disableSnapshot: false,
    },
  },
};
