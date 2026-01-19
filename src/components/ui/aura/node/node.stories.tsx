import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from '@storybook/test';
import {
  Node,
  NodeHeader,
  NodeTitle,
  NodeDescription,
  NodeContent,
  NodeFooter,
  NodeAction,
} from './node';
import { Button } from '@/components/ui/aura/button';
import { IconSettings } from '@tabler/icons-react';

const meta: Meta<typeof Node> = {
  title: 'AI/Node',
  component: Node,
  tags: ['autodocs'],
  argTypes: {
    handles: {
      control: 'object',
      description: 'Configuration for source and target handles',
      table: {
        category: 'Behavior',
        type: { summary: '{ target: boolean; source: boolean }' },
      },
    },
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
type Story = StoryObj<typeof Node>;

/**
 * Default node (styling only, handles require ReactFlow).
 * 
 * Note: The handles (target/source) require ReactFlow context to function.
 * This story shows the visual structure of the node.
 */
export const Default: Story = {
  render: () => (
    <div className="w-[300px]">
      <Node handles={{ target: false, source: false }}>
        <NodeHeader>
          <NodeTitle>Agent Node</NodeTitle>
          <NodeDescription>Processes user requests</NodeDescription>
        </NodeHeader>
        <NodeContent>
          <p className="text-sm text-muted-foreground">
            This node handles the initial processing of user input 
            before passing it to downstream nodes.
          </p>
        </NodeContent>
      </Node>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Default node component structure. Handles require ReactFlow context.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByText('Agent Node');
    await expect(title).toBeInTheDocument();
  },
};

/**
 * Node with header and content.
 */
export const WithContent: Story = {
  render: () => (
    <div className="w-[300px]">
      <Node handles={{ target: false, source: false }}>
        <NodeHeader>
          <NodeTitle>Data Transform</NodeTitle>
          <NodeDescription>Transform and validate data</NodeDescription>
        </NodeHeader>
        <NodeContent>
          <div className="space-y-2">
            <div className="text-xs font-medium text-muted-foreground">Input Format</div>
            <code className="text-xs bg-muted px-2 py-1 rounded block">JSON</code>
            <div className="text-xs font-medium text-muted-foreground mt-2">Output Format</div>
            <code className="text-xs bg-muted px-2 py-1 rounded block">Structured Data</code>
          </div>
        </NodeContent>
      </Node>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Node with header and structured content.',
      },
    },
  },
};

/**
 * Node with footer.
 */
export const WithFooter: Story = {
  render: () => (
    <div className="w-[300px]">
      <Node handles={{ target: false, source: false }}>
        <NodeHeader>
          <NodeTitle>API Call</NodeTitle>
          <NodeDescription>External API integration</NodeDescription>
        </NodeHeader>
        <NodeContent>
          <p className="text-sm text-muted-foreground">
            Calls an external API endpoint and returns the response.
          </p>
        </NodeContent>
        <NodeFooter>
          <span className="text-xs text-muted-foreground">
            Last run: 2 minutes ago
          </span>
        </NodeFooter>
      </Node>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Node with footer section.',
      },
    },
  },
};

/**
 * Node with action button.
 */
export const WithAction: Story = {
  render: () => (
    <div className="w-[300px]">
      <Node handles={{ target: false, source: false }}>
        <NodeHeader>
          <div className="flex-1">
            <NodeTitle>Configurable Node</NodeTitle>
            <NodeDescription>Click settings to configure</NodeDescription>
          </div>
          <NodeAction>
            <Button variant="ghost" size="icon-sm">
              <IconSettings className="size-4" />
            </Button>
          </NodeAction>
        </NodeHeader>
        <NodeContent>
          <p className="text-sm text-muted-foreground">
            This node has an action button in the header.
          </p>
        </NodeContent>
      </Node>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Node with an action button in the header.',
      },
    },
  },
};

/**
 * Multiple nodes.
 */
export const MultipleNodes: Story = {
  render: () => (
    <div className="flex gap-4">
      <div className="w-[250px]">
        <Node handles={{ target: false, source: false }}>
          <NodeHeader>
            <NodeTitle>Input Node</NodeTitle>
            <NodeDescription>Starting point</NodeDescription>
          </NodeHeader>
          <NodeContent>
            <p className="text-sm text-muted-foreground">Receives input</p>
          </NodeContent>
        </Node>
      </div>
      <div className="w-[250px]">
        <Node handles={{ target: false, source: false }}>
          <NodeHeader>
            <NodeTitle>Process Node</NodeTitle>
            <NodeDescription>Processing step</NodeDescription>
          </NodeHeader>
          <NodeContent>
            <p className="text-sm text-muted-foreground">Transforms data</p>
          </NodeContent>
        </Node>
      </div>
      <div className="w-[250px]">
        <Node handles={{ target: false, source: false }}>
          <NodeHeader>
            <NodeTitle>Output Node</NodeTitle>
            <NodeDescription>End point</NodeDescription>
          </NodeHeader>
          <NodeContent>
            <p className="text-sm text-muted-foreground">Returns result</p>
          </NodeContent>
        </Node>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple nodes showing a workflow pattern.',
      },
    },
  },
};

/**
 * Minimal node.
 */
export const Minimal: Story = {
  render: () => (
    <div className="w-[200px]">
      <Node handles={{ target: false, source: false }}>
        <NodeHeader>
          <NodeTitle>Quick Task</NodeTitle>
        </NodeHeader>
      </Node>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Minimal node with just a title.',
      },
    },
  },
};

/**
 * Visual regression testing.
 */
export const VisualRegression: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      {/* Basic node */}
      <div className="w-[280px]">
        <h3 className="text-sm font-semibold text-muted-foreground mb-2">Basic</h3>
        <Node handles={{ target: false, source: false }}>
          <NodeHeader>
            <NodeTitle>Basic Node</NodeTitle>
            <NodeDescription>Simple description</NodeDescription>
          </NodeHeader>
          <NodeContent>
            <p className="text-sm text-muted-foreground">Content area</p>
          </NodeContent>
        </Node>
      </div>

      {/* Full node */}
      <div className="w-[280px]">
        <h3 className="text-sm font-semibold text-muted-foreground mb-2">Full</h3>
        <Node handles={{ target: false, source: false }}>
          <NodeHeader>
            <div className="flex-1">
              <NodeTitle>Full Node</NodeTitle>
              <NodeDescription>With all sections</NodeDescription>
            </div>
            <NodeAction>
              <Button variant="ghost" size="icon-sm">
                <IconSettings className="size-4" />
              </Button>
            </NodeAction>
          </NodeHeader>
          <NodeContent>
            <p className="text-sm text-muted-foreground">Content</p>
          </NodeContent>
          <NodeFooter>
            <span className="text-xs text-muted-foreground">Footer</span>
          </NodeFooter>
        </Node>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Nodes for visual regression testing.',
      },
    },
    chromatic: {
      disableSnapshot: false,
    },
  },
};

/**
 * Interactive playground.
 */
export const Playground: Story = {
  args: {
    handles: { target: false, source: false },
  },
  render: (args) => (
    <div className="w-[300px]">
      <Node {...args}>
        <NodeHeader>
          <NodeTitle>Playground Node</NodeTitle>
          <NodeDescription>Interactive example</NodeDescription>
        </NodeHeader>
        <NodeContent>
          <p className="text-sm text-muted-foreground">
            This is a playground node. Note: handles require ReactFlow context.
          </p>
        </NodeContent>
      </Node>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive node example.',
      },
    },
  },
};
