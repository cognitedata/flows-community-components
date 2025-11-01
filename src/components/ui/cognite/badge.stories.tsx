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

// ============================================================
// Individual Variant Stories
// Each variant gets its own story for better documentation
// ============================================================

/**
 * Default badge variant - the standard badge style.
 */
export const Default: Story = {
  args: {
    variant: 'default',
    children: 'Default',
  },
};

/**
 * Fjord variant - blue-toned badge for observations and data.
 */
export const Fjord: Story = {
  args: {
    variant: 'fjord',
    children: 'Observations',
  },
};

/**
 * Nordic variant - cool-toned badge for technical content.
 */
export const Nordic: Story = {
  args: {
    variant: 'nordic',
    children: 'Technical',
  },
};

/**
 * Aurora variant - vibrant badge for troubleshooting and alerts.
 */
export const Aurora: Story = {
  args: {
    variant: 'aurora',
    children: 'Troubleshooting',
  },
};

/**
 * Sky variant - light blue badge for informational content.
 */
export const Sky: Story = {
  args: {
    variant: 'sky',
    children: 'Information',
  },
};

/**
 * Dusk variant - purple-toned badge for RCA and analysis.
 */
export const Dusk: Story = {
  args: {
    variant: 'dusk',
    children: 'RCA',
  },
};

/**
 * Mountain variant - green-toned badge for plans and goals.
 */
export const Mountain: Story = {
  args: {
    variant: 'mountain',
    children: 'Plans',
  },
};

/**
 * Secondary variant - neutral badge for general use.
 */
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Asset',
  },
};

/**
 * Error variant - red badge for errors and critical issues.
 */
export const Error: Story = {
  args: {
    variant: 'error',
    children: 'Error',
  },
};

/**
 * Warning variant - orange/yellow badge for warnings.
 */
export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Warning',
  },
};

/**
 * Success variant - green badge for successful operations.
 */
export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success',
  },
};

/**
 * In Progress variant - badge for ongoing operations.
 */
export const InProgress: Story = {
  args: {
    variant: 'inProgress',
    children: 'In Progress',
  },
};

/**
 * Archived variant - badge for archived or inactive items.
 */
export const Archived: Story = {
  args: {
    variant: 'archived',
    children: 'Archived',
  },
};

/**
 * Closable variant - badge with close button functionality.
 */
export const Closable: Story = {
  args: {
    variant: 'closable',
    children: 'Closable',
  },
};

// ============================================================
// Style Variations
// Different styling options for badges
// ============================================================

/**
 * Outline style - badges with border only, no background fill.
 */
export const OutlineStyle: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default" outline>Default</Badge>
      <Badge variant="fjord" outline>Fjord</Badge>
      <Badge variant="success" outline>Success</Badge>
      <Badge variant="error" outline>Error</Badge>
    </div>
  ),
};

/**
 * No background - badges without background fill.
 */
export const NoBackground: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default" background={false}>Default</Badge>
      <Badge variant="fjord" background={false}>Fjord</Badge>
      <Badge variant="success" background={false}>Success</Badge>
      <Badge variant="error" background={false}>Error</Badge>
    </div>
  ),
};

/**
 * Dot style - pill-shaped rounded badges.
 */
export const DotStyle: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default" dot>5</Badge>
      <Badge variant="error" dot>9</Badge>
      <Badge variant="success" dot>12</Badge>
    </div>
  ),
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
