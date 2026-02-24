import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  IconBold,
  IconHandGrab,
  IconItalic,
  IconPointer,
  IconUnderline,
} from '@tabler/icons-react';

import { Toggle } from '../toggle';

import {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarSeparator,
} from './toolbar';

const meta: Meta<typeof Toolbar> = {
  title: 'Primitives/Toolbar',
  component: Toolbar,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      table: {
        category: 'Variants/Styling',
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Toolbar>;

export const Default: Story = {
  parameters: {
    order: 1,
  },
  render: () => (
    <Toolbar>
      <ToolbarGroup>
        <ToolbarButton>
          <IconPointer />
        </ToolbarButton>
        <ToolbarButton render={<Toggle />}>
          <IconHandGrab />
        </ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
    </Toolbar>
  ),
};
