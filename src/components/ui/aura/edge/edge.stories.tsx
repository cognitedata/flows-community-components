import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "AI/Edge",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj;

/**
 * Default edge (requires ReactFlow context).
 *
 * Note: Edge components are ReactFlow primitives that render connections
 * between nodes. They require a ReactFlow context to function properly.
 */
export const Default: Story = {
  render: () => (
    <div className="p-4 border rounded-md bg-muted/20 max-w-md">
      <p className="text-sm text-muted-foreground text-center">
        The Edge component is a ReactFlow edge wrapper.
        <br />
        It requires a ReactFlow context to function properly.
      </p>
      <div className="mt-4 space-y-2">
        <h4 className="text-sm font-medium">Edge Types:</h4>
        <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
          <li>
            <strong>Floating:</strong> Bezier curves connecting nodes
          </li>
          <li>
            <strong>Temporary:</strong> Dashed line for in-progress connections
          </li>
        </ul>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Edge component for ReactFlow canvases. Requires ReactFlow context.",
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
        <pre>{`import { Canvas } from '@/components/ui/aura/canvas';
import { Edge, Temporary } from '@/components/ui/aura/edge';

const edgeTypes = {
  floating: Edge,
  temporary: Temporary,
};

const edges = [
  { 
    id: 'e1-2', 
    source: '1', 
    target: '2',
    type: 'floating'
  },
];

function FlowEditor() {
  return (
    <Canvas 
      nodes={nodes} 
      edges={edges}
      edgeTypes={edgeTypes}
    />
  );
}`}</pre>
      </div>
      <p className="text-sm text-muted-foreground">
        Edge components define how connections are rendered between nodes. The floating edge uses
        bezier curves with proper handle positioning.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Example showing how to use the Edge component.",
      },
    },
  },
};

/**
 * Edge styles preview.
 */
export const StylesPreview: Story = {
  render: () => (
    <div className="p-4 border rounded-md space-y-4 max-w-md">
      <h3 className="font-medium">Edge Styles</h3>
      <div className="space-y-4">
        {/* Floating edge preview */}
        <div className="p-3 bg-muted/30 rounded-md">
          <h4 className="text-sm font-medium mb-2">Floating Edge</h4>
          <svg width="200" height="60" className="overflow-visible">
            <path
              d="M 10,30 C 60,30 140,30 190,30"
              fill="none"
              stroke="hsl(var(--ring))"
              strokeWidth="1"
            />
            <circle cx="10" cy="30" r="4" fill="hsl(var(--ring))" />
            <circle cx="190" cy="30" r="4" fill="hsl(var(--ring))" />
          </svg>
          <p className="text-xs text-muted-foreground mt-2">
            Smooth bezier curve with circular endpoints
          </p>
        </div>

        {/* Temporary edge preview */}
        <div className="p-3 bg-muted/30 rounded-md">
          <h4 className="text-sm font-medium mb-2">Temporary Edge</h4>
          <svg width="200" height="60" className="overflow-visible">
            <path
              d="M 10,30 C 60,30 140,30 190,30"
              fill="none"
              stroke="hsl(var(--ring))"
              strokeWidth="1"
              strokeDasharray="5,5"
            />
            <circle cx="10" cy="30" r="4" fill="hsl(var(--ring))" />
          </svg>
          <p className="text-xs text-muted-foreground mt-2">
            Dashed line for in-progress connections
          </p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Preview of different edge styles.",
      },
    },
  },
};
