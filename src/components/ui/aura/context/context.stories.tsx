import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from '@storybook/test';
import {
  Context,
  ContextTrigger,
  ContextContent,
} from './context';

const meta: Meta<typeof Context> = {
  title: 'AI/Context',
  component: Context,
  tags: ['autodocs'],
  argTypes: {
    usedTokens: {
      control: { type: 'number', min: 0 },
      description: 'Number of tokens used',
      table: {
        category: 'Content',
        type: { summary: 'number' },
      },
    },
    maxTokens: {
      control: { type: 'number', min: 1 },
      description: 'Maximum tokens available',
      table: {
        category: 'Content',
        type: { summary: 'number' },
      },
    },
    modelId: {
      control: 'text',
      description: 'The model identifier',
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
type Story = StoryObj<typeof Context>;

/**
 * Default context usage indicator.
 */
export const Default: Story = {
  render: () => (
    <Context usedTokens={50000} maxTokens={128000}>
      <ContextTrigger />
      <ContextContent />
    </Context>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Default context usage indicator showing token consumption.',
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
 * Low usage.
 */
export const LowUsage: Story = {
  render: () => (
    <Context usedTokens={10000} maxTokens={128000}>
      <ContextTrigger />
      <ContextContent />
    </Context>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Context indicator showing low token usage (~8%).',
      },
    },
  },
};

/**
 * Medium usage.
 */
export const MediumUsage: Story = {
  render: () => (
    <Context usedTokens={64000} maxTokens={128000}>
      <ContextTrigger />
      <ContextContent />
    </Context>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Context indicator showing medium token usage (~50%).',
      },
    },
  },
};

/**
 * High usage.
 */
export const HighUsage: Story = {
  render: () => (
    <Context usedTokens={100000} maxTokens={128000}>
      <ContextTrigger />
      <ContextContent />
    </Context>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Context indicator showing high token usage (~78%).',
      },
    },
  },
};

/**
 * Near limit.
 */
export const NearLimit: Story = {
  render: () => (
    <Context usedTokens={120000} maxTokens={128000}>
      <ContextTrigger />
      <ContextContent />
    </Context>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Context indicator showing near-limit token usage (~94%).',
      },
    },
  },
};

/**
 * With model ID.
 */
export const WithModelId: Story = {
  render: () => (
    <Context usedTokens={50000} maxTokens={128000} modelId="claude-3-opus">
      <ContextTrigger />
      <ContextContent />
    </Context>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Context indicator with model information.',
      },
    },
  },
};

/**
 * With usage statistics.
 */
export const WithUsageStats: Story = {
  render: () => (
    <Context 
      usedTokens={50000} 
      maxTokens={128000}
      modelId="claude-3-opus"
      usage={{
        inputTokens: 45000,
        outputTokens: 5000,
        totalTokens: 50000,
        inputTokenDetails: {
          noCacheTokens: undefined,
          cacheReadTokens: undefined,
          cacheWriteTokens: undefined,
        },
        outputTokenDetails: {
          textTokens: undefined,
          reasoningTokens: undefined,
        },
      }}
    >
      <ContextTrigger />
      <ContextContent />
    </Context>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Context indicator with detailed usage statistics.',
      },
    },
  },
};

/**
 * Different context sizes.
 */
export const DifferentSizes: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="text-center">
        <p className="text-xs text-muted-foreground mb-2">8K Model</p>
        <Context usedTokens={4000} maxTokens={8192}>
          <ContextTrigger />
          <ContextContent />
        </Context>
      </div>
      <div className="text-center">
        <p className="text-xs text-muted-foreground mb-2">32K Model</p>
        <Context usedTokens={16000} maxTokens={32768}>
          <ContextTrigger />
          <ContextContent />
        </Context>
      </div>
      <div className="text-center">
        <p className="text-xs text-muted-foreground mb-2">128K Model</p>
        <Context usedTokens={64000} maxTokens={128000}>
          <ContextTrigger />
          <ContextContent />
        </Context>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Context indicators for different model context sizes.',
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
      {/* Low usage */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground w-24">Low:</span>
        <Context usedTokens={10000} maxTokens={128000}>
          <ContextTrigger />
          <ContextContent />
        </Context>
      </div>

      {/* Medium usage */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground w-24">Medium:</span>
        <Context usedTokens={64000} maxTokens={128000}>
          <ContextTrigger />
          <ContextContent />
        </Context>
      </div>

      {/* High usage */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground w-24">High:</span>
        <Context usedTokens={115000} maxTokens={128000}>
          <ContextTrigger />
          <ContextContent />
        </Context>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Context indicators for visual regression testing.',
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
    usedTokens: 50000,
    maxTokens: 128000,
    modelId: 'claude-3-opus',
  },
  render: (args) => (
    <Context {...args}>
      <ContextTrigger />
      <ContextContent />
    </Context>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive context example - use controls to adjust token usage.',
      },
    },
  },
};
