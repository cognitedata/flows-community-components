'use client';

import type { Meta, StoryObj } from '@storybook/nextjs';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { Shimmer } from './shimmer';

const meta: Meta<typeof Shimmer> = {
  title: 'AI/Shimmer',
  component: Shimmer,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-8">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    // Display & behavior
    children: {
      control: 'text',
      description: 'Text content to display with shimmer effect',
      table: {
        category: 'Display',
        type: { summary: 'string' },
      },
    },
    as: {
      control: 'select',
      options: ['p', 'span', 'div', 'h1', 'h2', 'h3'],
      description: 'HTML element type to render',
      table: {
        category: 'Display',
        type: { summary: 'ElementType' },
        defaultValue: { summary: 'p' },
      },
    },
    variant: {
      control: 'select',
      options: [
        'default',
        'nordic',
        'aurora',
        'dusk',
        'equinox',
        'summer',
        'spring',
        'fall',
      ],
      description: 'Gradient variant for the shimmer effect',
      table: {
        category: 'Display',
        type: {
          summary:
            'default | nordic | aurora | dusk | equinox | summer | spring | fall',
        },
        defaultValue: { summary: 'default' },
      },
    },
    duration: {
      control: 'number',
      description: 'Animation duration in seconds',
      table: {
        category: 'Animation',
        type: { summary: 'number' },
        defaultValue: { summary: '2' },
      },
    },
    spread: {
      control: 'number',
      description:
        'Spread multiplier for shimmer effect (based on text length)',
      table: {
        category: 'Animation',
        type: { summary: 'number' },
        defaultValue: { summary: '2' },
      },
    },
    className: {
      control: 'text',
      description: 'CSS classes for styling',
      table: {
        category: 'Display',
      },
    },
  },
  parameters: {
    layout: 'centered',
    // Disable color-contrast rule for Shimmer stories.
    // The component uses bg-clip-text with gradients, which automated
    // a11y tools cannot analyse. The text is visible via the gradient.
    a11y: {
      config: {
        rules: [{ id: 'color-contrast', enabled: false }],
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Shimmer>;

/**
 * Basic shimmer effect
 * Matches the basic example from shimmer.examples.tsx
 */
export const Basic: Story = {
  args: {
    children: 'Processing...',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Basic shimmer effect for loading states. Tests that the shimmer animation is visible.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the shimmer text
    const shimmer = canvas.getByText('Processing...');
    await expect(shimmer).toBeInTheDocument();
  },
  render: (args) => <Shimmer {...args} />,
};

/**
 * All gradient variants
 * Matches the gradients example from shimmer.examples.tsx
 */
export const GradientVariants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Shimmer effects with seasonal and brand colour gradients. All available variants displayed together.',
      },
    },
  },
  render: () => (
    <div className="w-full flex flex-col items-start gap-4">
      <Shimmer variant="default">Default gradient</Shimmer>
      <Shimmer variant="nordic">Nordic gradient</Shimmer>
      <Shimmer variant="aurora">Aurora gradient</Shimmer>
      <Shimmer variant="dusk">Dusk gradient</Shimmer>
      <Shimmer variant="equinox">Equinox gradient</Shimmer>
      <Shimmer variant="summer">Summer gradient</Shimmer>
      <Shimmer variant="spring">Spring gradient</Shimmer>
      <Shimmer variant="fall">Fall gradient</Shimmer>
    </div>
  ),
};

/**
 * Different HTML element types with appropriate typography
 */
export const ElementTypes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Shimmer effect applied to different HTML element types with appropriate typography styling.',
      },
    },
  },
  render: () => (
    <div className="w-full flex flex-col items-start gap-6">
      <Shimmer as="h1" className="text-4xl font-bold tracking-tight">
        Heading 1 with shimmer
      </Shimmer>
      <Shimmer as="h2" className="text-2xl font-semibold">
        Heading 2 with shimmer
      </Shimmer>
      <Shimmer as="h3" className="text-xl font-medium">
        Heading 3 with shimmer
      </Shimmer>
      <Shimmer as="p" className="text-base">
        Paragraph text with shimmer effect applied.
      </Shimmer>
      <p className="text-base">
        Inline text with a{' '}
        <Shimmer as="span" className="font-medium">
          shimmer span
        </Shimmer>{' '}
        inside it.
      </p>
      <Shimmer as="div" className="text-sm text-muted-foreground">
        Div element styled as secondary text
      </Shimmer>
    </div>
  ),
};

/**
 * Different animation durations
 */
export const AnimationDurations: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Shimmer effects with different animation durations. Faster durations create more rapid shimmer effects.',
      },
    },
  },
  render: () => (
    <div className="w-full flex flex-col items-start gap-4">
      <Shimmer duration={1}>Fast (1 second)</Shimmer>
      <Shimmer duration={2}>Default (2 seconds)</Shimmer>
      <Shimmer duration={3}>Slow (3 seconds)</Shimmer>
      <Shimmer duration={4}>Very slow (4 seconds)</Shimmer>
    </div>
  ),
};

/**
 * Different spread values
 */
export const SpreadValues: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Shimmer effects with different spread values. Higher spread creates a wider shimmer effect.',
      },
    },
  },
  render: () => (
    <div className="w-full flex flex-col items-start gap-4">
      <Shimmer spread={1}>Narrow spread (1)</Shimmer>
      <Shimmer spread={2}>Default spread (2)</Shimmer>
      <Shimmer spread={3}>Wide spread (3)</Shimmer>
      <Shimmer spread={4}>Very wide spread (4)</Shimmer>
    </div>
  ),
};

/**
 * Long text content
 */
export const LongText: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Shimmer effect on longer text content to demonstrate how the effect scales with text length.',
      },
    },
  },
  render: () => (
    <div className="w-full flex flex-col items-start gap-4 max-w-md">
      <Shimmer>
        This is a longer piece of text that demonstrates how the shimmer effect
        works with extended content.
      </Shimmer>
      <Shimmer variant="aurora">
        The shimmer animation smoothly transitions across the entire length of
        the text, creating an engaging loading effect.
      </Shimmer>
    </div>
  ),
};

/**
 * Inline usage examples
 */
export const InlineUsage: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Shimmer effect used inline within other text content for progressive reveal effects.',
      },
    },
  },
  render: () => (
    <div className="w-full flex flex-col items-start gap-4 max-w-md">
      <p className="text-base">
        Your request is <Shimmer as="span">processing</Shimmer> and will be
        ready shortly.
      </p>
      <p className="text-base">
        Status:{' '}
        <Shimmer as="span" variant="aurora">
          Analyzing data
        </Shimmer>
      </p>
      <p className="text-base">
        Loading{' '}
        <Shimmer as="span" variant="nordic">
          configuration
        </Shimmer>{' '}
        files...
      </p>
    </div>
  ),
};

/**
 * Custom styling
 */
export const CustomStyling: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Shimmer effects with custom CSS classes for additional styling.',
      },
    },
  },
  render: () => (
    <div className="w-full flex flex-col items-start gap-4">
      <Shimmer className="text-2xl font-bold">Large bold text</Shimmer>
      <Shimmer className="text-sm text-muted-foreground" variant="dusk">
        Small muted text
      </Shimmer>
      <Shimmer className="text-lg font-semibold" variant="summer">
        Medium semibold text
      </Shimmer>
    </div>
  ),
};

/**
 * Loading state simulation
 */
export const LoadingStates: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Shimmer effects used in realistic loading state scenarios.',
      },
    },
  },
  render: () => (
    <div className="w-full flex flex-col items-start gap-6 max-w-md">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Processing Request</h3>
        <Shimmer>Analyzing input parameters...</Shimmer>
        <Shimmer variant="aurora">Generating response...</Shimmer>
        <Shimmer variant="nordic">Finalizing results...</Shimmer>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">System Status</h3>
        <p className="text-sm">
          Current operation:{' '}
          <Shimmer as="span" variant="dusk">
            Data synchronization in progress
          </Shimmer>
        </p>
        <p className="text-sm">
          Estimated time:{' '}
          <Shimmer as="span" variant="equinox">
            Calculating...
          </Shimmer>
        </p>
      </div>
    </div>
  ),
};
