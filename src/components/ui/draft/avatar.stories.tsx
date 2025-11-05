import type { Meta, StoryObj } from '@storybook/nextjs';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';


const meta: Meta<typeof Avatar> = {
  title: 'UI/Draft/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'nordic', 'aurora', 'fjord', 'dusk', 'orange', 'sky', 'overflow'],
      description: 'The visual style variant',
    },
    sizes: {
      control: 'select',
      options: ['default', 'xsm', 'xxsm'],
      description: 'The size of the component',
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
type Story = StoryObj<typeof Avatar>;

/**
 * Default variant - the standard style
 */
export const Default: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
  ),
  args: {
    variant: 'default'
  },
  parameters: {
    docs: {
      description: {
        story: 'Default variant - the standard style',
      },
    },
  },
};

/**
 * Default variant - the standard style
 */
export const WithImage: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="/user-avatar2.png" alt="User" />
          <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
  args: {
    variant: 'default'
  },
  parameters: {
    docs: {
      description: {
        story: 'Default variant - the standard style',
      },
    },
  },
};

/**
 * Nordic variant - cool-toned for technical content
 */
export const Nordic: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>PJ</AvatarFallback>
    </Avatar>
  ),
  args: {
    variant: 'nordic'
  },
  parameters: {
    docs: {
      description: {
        story: 'Nordic variant - cool-toned for technical content',
      },
    },
  },
};

/**
 * Aurora variant - vibrant for troubleshooting and alerts
 */
export const Aurora: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>PJ</AvatarFallback>
    </Avatar>
  ),
  args: {
    variant: 'aurora'
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
 * Dusk variant - purple-toned for RCA and analysis
 */
export const Dusk: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>PJ</AvatarFallback>
    </Avatar>
  ),
  args: {
    variant: 'dusk'
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
 * Orange variant
 */
export const Orange: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>PJ</AvatarFallback>
    </Avatar>
  ),
  args: {
    variant: 'orange'
  },
  parameters: {
    docs: {
      description: {
        story: 'Orange variant',
      },
    },
  },
};

/**
 * Sky variant - light blue for informational content
 */
export const Sky: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>PJ</AvatarFallback>
    </Avatar>
  ),
  args: {
    variant: 'sky'
  },
  parameters: {
    docs: {
      description: {
        story: 'Sky variant - light blue for informational content',
      },
    },
  },
};

/**
 * Default variant - the standard style
 */
export const Image: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="/user-avatar2.png" alt="User" />
          <AvatarFallback>PJ</AvatarFallback>
    </Avatar>
  ),
  args: {
    variant: 'default'
  },
  parameters: {
    docs: {
      description: {
        story: 'Default variant - the standard style',
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
    variant: 'default',
    children: 'Avatar',
  },
};
