import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect } from '@storybook/test';
import {
  OpenIn,
  OpenInTrigger,
  OpenInContent,
  OpenInChatGPT,
  OpenInClaude,
  OpenInT3,
} from './open-in-chat';

const meta: Meta<typeof OpenIn> = {
  title: 'AI/Open In Chat',
  component: OpenIn,
  tags: ['autodocs'],
  argTypes: {
    query: {
      control: 'text',
      description: 'The query to open in the chat provider',
      table: {
        category: 'Content',
        type: { summary: 'string' },
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof OpenIn>;

/**
 * Default open in chat button.
 */
export const Default: Story = {
  render: () => (
    <OpenIn query="How do I implement authentication in React?">
      <OpenInTrigger />
      <OpenInContent>
        <OpenInChatGPT />
        <OpenInClaude />
        <OpenInT3 />
      </OpenInContent>
    </OpenIn>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Default open in chat dropdown with multiple provider options.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button');
    await expect(trigger).toBeInTheDocument();
  },
};

/**
 * With custom query.
 */
export const CustomQuery: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground max-w-sm">
        Query: &quot;Explain the difference between useState and useReducer&quot;
      </p>
      <OpenIn query="Explain the difference between useState and useReducer">
        <OpenInTrigger />
        <OpenInContent>
          <OpenInChatGPT />
          <OpenInClaude />
          <OpenInT3 />
        </OpenInContent>
      </OpenIn>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Open in chat with a specific query.',
      },
    },
  },
};

/**
 * In context usage.
 */
export const InContext: Story = {
  render: () => (
    <div className="max-w-md p-4 border rounded-lg space-y-4">
      <h3 className="font-medium">Code Review Results</h3>
      <p className="text-sm text-muted-foreground">
        Found 3 potential improvements in your code. Would you like to discuss 
        these with an AI assistant?
      </p>
      <div className="flex gap-2">
        <OpenIn query="Review this code and suggest improvements">
          <OpenInTrigger />
          <OpenInContent>
            <OpenInChatGPT />
            <OpenInClaude />
            <OpenInT3 />
          </OpenInContent>
        </OpenIn>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Open in chat button used in context of a feature.',
      },
    },
  },
};

/**
 * Dropdown interaction.
 */
export const DropdownInteraction: Story = {
  render: () => (
    <OpenIn query="Help me debug this error">
      <OpenInTrigger />
      <OpenInContent>
        <OpenInChatGPT />
        <OpenInClaude />
        <OpenInT3 />
      </OpenInContent>
    </OpenIn>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Click to open the dropdown and see available providers.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Click to open dropdown
    const trigger = canvas.getByRole('button');
    await userEvent.click(trigger);
  },
};

/**
 * Visual regression testing.
 */
export const VisualRegression: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Default</h3>
        <OpenIn query="Test query">
          <OpenInTrigger />
          <OpenInContent>
            <OpenInChatGPT />
            <OpenInClaude />
            <OpenInT3 />
          </OpenInContent>
        </OpenIn>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Open in chat for visual regression testing.',
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
    query: 'Playground query for testing',
  },
  render: (args) => (
    <OpenIn {...args}>
      <OpenInTrigger />
      <OpenInContent>
        <OpenInChatGPT />
        <OpenInClaude />
        <OpenInT3 />
      </OpenInContent>
    </OpenIn>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive open in chat example.',
      },
    },
  },
};
