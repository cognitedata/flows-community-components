import type { Meta, StoryObj } from '@storybook/nextjs';
import { Badge } from './badge';
import { badgeExamples } from '@/lib/component-examples/badge.examples';
import { IconAlertHexagon, IconAlertTriangle, IconArchive, IconCircleCheck, IconHexagon, IconInnerShadowTopLeft } from '@tabler/icons-react';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'fjord', 'nordic', 'aurora', 'sky', 'dusk', 'mountain', 'secondary', 'error', 'warning', 'success', 'inProgress', 'archived', 'closable'],
      description: 'The visual style variant',
    },
    outline: {
      control: 'select',
      options: ['true'],
      description: 'The outline option',
    },
    background: {
      control: 'select',
      options: ['false'],
      description: 'The background option',
    },
    dot: {
      control: 'select',
      options: ['true'],
      description: 'The dot option',
    },
    children: {
      control: 'text',
      description: 'The content to display',
    }
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

/**
 * Fjord variant - blue-toned for observations and data
 */
export const Fjord: Story = {
  args: {
    variant: 'fjord',
    children: 'Observations'
  },
  parameters: {
    docs: {
      description: {
        story: 'Fjord variant - blue-toned for observations and data',
      },
    },
  },
};

/**
 * Aurora variant - vibrant for troubleshooting and alerts
 */
export const Aurora: Story = {
  args: {
    variant: 'aurora',
    children: 'Troubleshooting'
  },
  parameters: {
    docs: {
      description: {
        story: 'Aurora variant - vibrant for troubleshooting and alerts',
      },
    },
  },
};

/**
 * Mountain variant - green-toned for plans and goals
 */
export const Mountain: Story = {
  render: (args) => (
    <Badge {...args}>
      <IconHexagon />
          Plans
    </Badge>
  ),
  args: {
    variant: 'mountain'
  },
  parameters: {
    docs: {
      description: {
        story: 'Mountain variant - green-toned for plans and goals',
      },
    },
  },
};

/**
 * Dusk variant - purple-toned for RCA and analysis
 */
export const Dusk: Story = {
  args: {
    variant: 'dusk',
    children: 'RCA'
  },
  parameters: {
    docs: {
      description: {
        story: 'Dusk variant - purple-toned for RCA and analysis',
      },
    },
  },
};

/**
 * Secondary variant - neutral for general use
 */
export const Secondary: Story = {
  render: (args) => (
    <Badge {...args}>
      <IconHexagon className="rotate-90" />
          Asset
    </Badge>
  ),
  args: {
    variant: 'secondary'
  },
  parameters: {
    docs: {
      description: {
        story: 'Secondary variant - neutral for general use',
      },
    },
  },
};

/**
 * Error variant - red for errors and critical issues
 */
export const Error: Story = {
  render: (args) => (
    <Badge {...args}>
      <IconAlertHexagon />
          Error
    </Badge>
  ),
  args: {
    variant: 'error',
    background: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Error variant - red for errors and critical issues',
      },
    },
  },
};

/**
 * Error variant - red for errors and critical issues
 */
export const ErrorOutline: Story = {
  render: (args) => (
    <Badge {...args}>
      <IconAlertHexagon />
          Error
    </Badge>
  ),
  args: {
    variant: 'error',
    outline: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Error variant - red for errors and critical issues',
      },
    },
  },
};

/**
 * Warning variant - orange/yellow for warnings
 */
export const Warning: Story = {
  render: (args) => (
    <Badge {...args}>
      <IconAlertTriangle />
          Warning
    </Badge>
  ),
  args: {
    variant: 'warning',
    background: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Warning variant - orange/yellow for warnings',
      },
    },
  },
};

/**
 * Warning variant - orange/yellow for warnings
 */
export const WarningOutline: Story = {
  render: (args) => (
    <Badge {...args}>
      <IconAlertTriangle />
          Warning
    </Badge>
  ),
  args: {
    variant: 'warning',
    outline: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Warning variant - orange/yellow for warnings',
      },
    },
  },
};

/**
 * Success variant - green for successful operations
 */
export const Success: Story = {
  render: (args) => (
    <Badge {...args}>
      <IconCircleCheck />
          Success
    </Badge>
  ),
  args: {
    variant: 'success',
    background: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Success variant - green for successful operations',
      },
    },
  },
};

/**
 * In Progress variant - for ongoing operations
 */
export const InProgress: Story = {
  render: (args) => (
    <Badge {...args}>
      <IconInnerShadowTopLeft />
          In progress
    </Badge>
  ),
  args: {
    variant: 'inProgress',
    background: false
  },
  parameters: {
    docs: {
      description: {
        story: 'In Progress variant - for ongoing operations',
      },
    },
  },
};

/**
 * Archived variant - for archived or inactive items
 */
export const Archived: Story = {
  render: (args) => (
    <Badge {...args}>
      <IconArchive />
          Archived
    </Badge>
  ),
  args: {
    variant: 'archived',
    background: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Archived variant - for archived or inactive items',
      },
    },
  },
};

/**
 * Main Component
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
 * Interactive playground for testing different configurations.
 * Use the controls below to experiment with all available props.
 */
export const Playground: Story = {
  args: {
    variant: 'fjord',
    children: 'Badge',
  },
};

/**
 * Outline style - badges with border only, no background fill.
 * Shows how different variants look with the outline prop.
 */
export const OutlineStyle: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="fjord" outline>Fjord</Badge>
      <Badge variant="aurora" outline>Aurora</Badge>
      <Badge variant="mountain" outline>Mountain</Badge>
      <Badge variant="dusk" outline>Dusk</Badge>
    </div>
  ),
};

/**
 * No background - badges without background fill.
 * Shows how different variants look without backgrounds.
 */
export const NoBackground: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="fjord" background={false}>Fjord</Badge>
      <Badge variant="aurora" background={false}>Aurora</Badge>
      <Badge variant="mountain" background={false}>Mountain</Badge>
      <Badge variant="dusk" background={false}>Dusk</Badge>
    </div>
  ),
};
