import type { Meta, StoryObj } from '@storybook/nextjs';
import { Badge } from './badge';
import { badgeExamples } from '@/lib/component-examples/badge.examples';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'fjord',
        'nordic',
        'aurora',
        'sky',
        'dusk',
        'mountain',
        'secondary',
        'error',
        'warning',
        'success',
        'inProgress',
        'archived',
        'closable',
      ],
      description: 'The visual style variant of the badge',
    },
    outline: {
      control: 'boolean',
      description: 'Whether to show the badge with an outline style',
    },
    background: {
      control: 'boolean',
      description: 'Whether to show the background fill',
    },
    dot: {
      control: 'boolean',
      description: 'Whether to make the badge rounded (pill-shaped)',
    },
    children: {
      control: 'text',
      description: 'The content to display inside the badge',
    },
  },
  args: {
    children: 'Badge',
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

/**
 * The main badge component with common variations.
 */
export const MainComponent: Story = {
  render: () => {
    const Component = badgeExamples.mainComponent.component;
    return <Component />;
  },
  parameters: {
    docs: {
      description: {
        story: badgeExamples.mainComponent.description,
      },
      source: {
        code: badgeExamples.mainComponent.code,
      },
    },
  },
};

/**
 * All available badge variants for different semantic meanings.
 */
export const Variants: Story = {
  render: () => {
    const Component = badgeExamples.variants.component;
    return <Component />;
  },
  parameters: {
    docs: {
      description: {
        story: badgeExamples.variants.description,
      },
      source: {
        code: badgeExamples.variants.code,
      },
    },
  },
};

/**
 * Interactive badge with controls for testing all props.
 */
export const Playground: Story = {
  args: {
    variant: 'default',
    outline: false,
    background: true,
    dot: false,
    children: 'Playground Badge',
  },
  parameters: {
    docs: {
      description: {
        story: 'Use the controls below to experiment with different badge configurations.',
      },
    },
  },
};
