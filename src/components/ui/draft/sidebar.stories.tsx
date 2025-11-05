import type { Meta, StoryObj } from '@storybook/nextjs';
import { Sidebar } from './sidebar';
import { sidebarExamples } from '@/lib/component-examples/sidebar.examples';

const meta: Meta<typeof Sidebar> = {
  title: 'UI/Draft/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline'],
      description: 'The visual style variant',
    }
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

/**
 * Basic
 */
export const Basic: Story = {
  render: () => {
    const Component = sidebarExamples.basic.component;
    return <Component />;
  },
  parameters: {
    docs: {
      description: {
        story: sidebarExamples.basic.description,
      },
      source: {
        code: sidebarExamples.basic.code,
      },
    },
  },
};
