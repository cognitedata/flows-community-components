import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect } from '@storybook/test';
import {
  Plan,
  PlanHeader,
  PlanTitle,
  PlanDescription,
  PlanTrigger,
  PlanContent,
  PlanItem,
} from './plan';

const meta: Meta<typeof Plan> = {
  title: 'AI/Plan',
  component: Plan,
  tags: ['autodocs'],
  argTypes: {
    isStreaming: {
      control: 'boolean',
      description: 'Whether the plan is currently streaming',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Whether the plan content is open by default',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
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
  decorators: [
    (Story) => (
      <div className="w-[450px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Plan>;

/**
 * Default plan.
 */
export const Default: Story = {
  render: () => (
    <Plan>
      <PlanHeader>
        <div>
          <PlanTitle>Implementation Plan</PlanTitle>
          <PlanDescription>Steps to add a new button component</PlanDescription>
        </div>
        <PlanTrigger />
      </PlanHeader>
      <PlanContent>
        <PlanItem>Create the component file with TypeScript types</PlanItem>
        <PlanItem>Implement base styles using Tailwind CSS</PlanItem>
        <PlanItem>Add variant support (primary, secondary, outline)</PlanItem>
        <PlanItem>Write unit tests for the component</PlanItem>
        <PlanItem>Create Storybook documentation</PlanItem>
      </PlanContent>
    </Plan>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Default plan component with collapsible content.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByText('Implementation Plan');
    await expect(title).toBeInTheDocument();
  },
};

/**
 * Streaming plan.
 */
export const Streaming: Story = {
  render: () => (
    <Plan isStreaming>
      <PlanHeader>
        <div>
          <PlanTitle>Generating Plan</PlanTitle>
          <PlanDescription>Analyzing your request...</PlanDescription>
        </div>
        <PlanTrigger />
      </PlanHeader>
      <PlanContent>
        <PlanItem>Step 1: Analyze the current codebase structure</PlanItem>
        <PlanItem>Step 2: Identify affected files</PlanItem>
      </PlanContent>
    </Plan>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Plan in streaming state with shimmer effect.',
      },
    },
  },
};

/**
 * Collapsed by default.
 */
export const CollapsedByDefault: Story = {
  render: () => (
    <Plan defaultOpen={false}>
      <PlanHeader>
        <div>
          <PlanTitle>Refactoring Plan</PlanTitle>
          <PlanDescription>5 steps to improve code quality</PlanDescription>
        </div>
        <PlanTrigger />
      </PlanHeader>
      <PlanContent>
        <PlanItem>Extract common logic into utility functions</PlanItem>
        <PlanItem>Add TypeScript strict mode</PlanItem>
        <PlanItem>Implement error boundaries</PlanItem>
        <PlanItem>Add comprehensive test coverage</PlanItem>
        <PlanItem>Update documentation</PlanItem>
      </PlanContent>
    </Plan>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Plan that starts collapsed.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Click trigger to expand
    const trigger = canvas.getByRole('button');
    await userEvent.click(trigger);
  },
};

/**
 * Detailed plan items.
 */
export const DetailedItems: Story = {
  render: () => (
    <Plan>
      <PlanHeader>
        <div>
          <PlanTitle>Feature Development Plan</PlanTitle>
          <PlanDescription>Building a user authentication system</PlanDescription>
        </div>
        <PlanTrigger />
      </PlanHeader>
      <PlanContent>
        <PlanItem>
          <strong>Backend Setup:</strong> Create authentication endpoints using JWT tokens
        </PlanItem>
        <PlanItem>
          <strong>Database Schema:</strong> Design user table with secure password hashing
        </PlanItem>
        <PlanItem>
          <strong>Frontend Forms:</strong> Build login and registration components
        </PlanItem>
        <PlanItem>
          <strong>State Management:</strong> Implement auth context with React Context API
        </PlanItem>
        <PlanItem>
          <strong>Protected Routes:</strong> Add route guards for authenticated pages
        </PlanItem>
      </PlanContent>
    </Plan>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Plan with detailed, formatted items.',
      },
    },
  },
};

/**
 * Short plan.
 */
export const ShortPlan: Story = {
  render: () => (
    <Plan>
      <PlanHeader>
        <div>
          <PlanTitle>Quick Fix</PlanTitle>
          <PlanDescription>Fix the typo in component name</PlanDescription>
        </div>
        <PlanTrigger />
      </PlanHeader>
      <PlanContent>
        <PlanItem>Rename ButtonComponet to ButtonComponent</PlanItem>
        <PlanItem>Update imports in affected files</PlanItem>
      </PlanContent>
    </Plan>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A short plan with just a few steps.',
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
      {/* Default */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Default</h3>
        <Plan>
          <PlanHeader>
            <div>
              <PlanTitle>Plan Title</PlanTitle>
              <PlanDescription>Plan description text</PlanDescription>
            </div>
            <PlanTrigger />
          </PlanHeader>
          <PlanContent>
            <PlanItem>Step 1</PlanItem>
            <PlanItem>Step 2</PlanItem>
          </PlanContent>
        </Plan>
      </div>

      {/* Streaming */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Streaming</h3>
        <Plan isStreaming>
          <PlanHeader>
            <div>
              <PlanTitle>Streaming Plan</PlanTitle>
              <PlanDescription>Currently generating...</PlanDescription>
            </div>
            <PlanTrigger />
          </PlanHeader>
          <PlanContent>
            <PlanItem>Step being generated</PlanItem>
          </PlanContent>
        </Plan>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Plans for visual regression testing.',
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
    isStreaming: false,
    defaultOpen: true,
  },
  render: (args) => (
    <Plan {...args}>
      <PlanHeader>
        <div>
          <PlanTitle>Playground Plan</PlanTitle>
          <PlanDescription>Toggle isStreaming to see the shimmer effect</PlanDescription>
        </div>
        <PlanTrigger />
      </PlanHeader>
      <PlanContent>
        <PlanItem>Playground step 1</PlanItem>
        <PlanItem>Playground step 2</PlanItem>
        <PlanItem>Playground step 3</PlanItem>
      </PlanContent>
    </Plan>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive plan example - use controls to experiment.',
      },
    },
  },
};
