import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import {
  IconAlignCenter,
  IconAlignLeft,
  IconAlignRight,
  IconBold,
  IconCopy,
  IconDownload,
  IconItalic,
  IconPencil,
  IconPlus,
  IconTrash,
  IconUnderline,
} from '@tabler/icons-react';
import { useState } from 'react';

import { Button } from '../button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../select';

import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from './button-group';
const meta: Meta<typeof ButtonGroup> = {
  title: 'Primitives/Button Group',
  component: ButtonGroup,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      table: {
        category: 'Variants/Styling',
        type: {
          summary: 'horizontal | vertical',
        },
        defaultValue: {
          summary: 'horizontal',
        },
      },
    },
    children: {
      table: {
        category: 'Content',
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
};
export default meta;
type Story = StoryObj<typeof ButtonGroup>;
export const Default: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Copy</Button>
      <Button variant="outline">Edit</Button>
      <Button variant="outline">Delete</Button>
    </ButtonGroup>
  ),
  parameters: {
    order: 1,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const group = canvas.getByRole('group');
    await expect(group).toBeInTheDocument();
    const buttons = await canvas.findAllByRole('button');
    await expect(buttons).toHaveLength(3);
    await userEvent.click(buttons[1]);
    await expect(buttons[1]).toHaveFocus();
  },
};
export const Vertical: Story = {
  render: () => (
    <ButtonGroup orientation="vertical">
      <Button variant="outline">Top</Button>
      <Button variant="outline">Middle</Button>
      <Button variant="outline">Bottom</Button>
    </ButtonGroup>
  ),
  parameters: {
    order: 2,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const group = canvas.getByRole('group');
    await expect(group).toHaveAttribute('data-orientation', 'vertical');
    const buttons = await canvas.findAllByRole('button');
    await expect(buttons).toHaveLength(3);
  },
};
export const AllOrientations: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="mb-3 font-semibold text-sm">Horizontal</h3>
        <ButtonGroup orientation="horizontal">
          <Button variant="outline">First</Button>
          <Button variant="outline">Second</Button>
          <Button variant="outline">Third</Button>
        </ButtonGroup>
      </div>
      <div>
        <h3 className="mb-3 font-semibold text-sm">Vertical</h3>
        <ButtonGroup orientation="vertical">
          <Button variant="outline">First</Button>
          <Button variant="outline">Second</Button>
          <Button variant="outline">Third</Button>
        </ButtonGroup>
      </div>
    </div>
  ),
  parameters: {
    order: 3,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const groups = canvas.getAllByRole('group');
    await expect(groups).toHaveLength(2);
    await expect(groups[0]).toHaveAttribute('data-orientation', 'horizontal');
    await expect(groups[1]).toHaveAttribute('data-orientation', 'vertical');
  },
};
export const WithIcons: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline" size="icon-sm">
        <IconBold className="size-4" />
      </Button>
      <Button variant="outline" size="icon-sm">
        <IconItalic className="size-4" />
      </Button>
      <Button variant="outline" size="icon-sm">
        <IconUnderline className="size-4" />
      </Button>
    </ButtonGroup>
  ),
  parameters: {
    order: 4,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = await canvas.findAllByRole('button');
    await expect(buttons).toHaveLength(3);
    const group = canvas.getByRole('group');
    await expect(group).toBeInTheDocument();
  },
};
export const WithText: Story = {
  render: () => (
    <ButtonGroup>
      <ButtonGroupText>Font</ButtonGroupText>
      <Button variant="outline" size="icon-sm">
        <IconBold className="size-4" />
      </Button>
      <Button variant="outline" size="icon-sm">
        <IconItalic className="size-4" />
      </Button>
    </ButtonGroup>
  ),
  parameters: {
    order: 5,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const text = canvas.getByText('Font');
    await expect(text).toBeInTheDocument();
    const buttons = await canvas.findAllByRole('button');
    await expect(buttons).toHaveLength(2);
  },
};
export const WithSeparators: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline" size="icon-sm">
        <IconAlignLeft className="size-4" />
      </Button>
      <Button variant="outline" size="icon-sm">
        <IconAlignCenter className="size-4" />
      </Button>
      <Button variant="outline" size="icon-sm">
        <IconAlignRight className="size-4" />
      </Button>
      <ButtonGroupSeparator />
      <Button variant="outline" size="icon-sm">
        <IconBold className="size-4" />
      </Button>
      <Button variant="outline" size="icon-sm">
        <IconItalic className="size-4" />
      </Button>
    </ButtonGroup>
  ),
  parameters: {
    order: 6,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const separator = canvas.getByRole('separator');
    await expect(separator).toBeInTheDocument();
    const buttons = await canvas.findAllByRole('button');
    await expect(buttons).toHaveLength(5);
  },
};
export const Mixed: Story = {
  render: () => (
    <ButtonGroup>
      <ButtonGroupText>Pages</ButtonGroupText>
      <Button variant="outline" size="sm">
        1-10
      </Button>
      <ButtonGroupSeparator />
      <Button variant="outline" size="sm">
        <IconDownload className="size-4" />
        Download
      </Button>
    </ButtonGroup>
  ),
  parameters: {
    order: 7,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const label = canvas.getByText('Pages');
    await expect(label).toBeInTheDocument();
    const buttons = await canvas.findAllByRole('button');
    await expect(buttons).toHaveLength(2);
    const separator = canvas.getByRole('separator');
    await expect(separator).toBeInTheDocument();
  },
};
const pageOptions = [
  {
    label: 'Page 1',
    value: 'page-1',
  },
  {
    label: 'Page 2',
    value: 'page-2',
  },
  {
    label: 'Page 3',
    value: 'page-3',
  },
];
export const WithSelect: Story = {
  render: () => (
    <ButtonGroup>
      <Select items={pageOptions} defaultValue="page-1">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {pageOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <ButtonGroupSeparator />
      <Button variant="outline">
        <IconCopy className="size-4" />
        Copy
      </Button>
    </ButtonGroup>
  ),
  parameters: {
    order: 8,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByRole('combobox');
    await expect(select).toBeInTheDocument();
    const button = canvas.getByRole('button', {
      name: /copy/i,
    });
    await expect(button).toBeInTheDocument();
  },
};
export const MixedVariants: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">
        <IconPencil className="size-4" />
        Edit
      </Button>
      <Button variant="destructive">
        <IconTrash className="size-4" />
        Delete
      </Button>
    </ButtonGroup>
  ),
  parameters: {
    order: 9,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = await canvas.findAllByRole('button');
    await expect(buttons).toHaveLength(2);
    await userEvent.click(buttons[0]);
    await expect(buttons[0]).toHaveFocus();
  },
};
export const VerticalWithIcons: Story = {
  render: () => (
    <ButtonGroup orientation="vertical">
      <Button variant="outline">
        <IconPlus className="size-4" />
        New
      </Button>
      <Button variant="outline">
        <IconCopy className="size-4" />
        Copy
      </Button>
      <Button variant="outline">
        <IconTrash className="size-4" />
        Delete
      </Button>
    </ButtonGroup>
  ),
  parameters: {
    order: 10,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const group = canvas.getByRole('group');
    await expect(group).toHaveAttribute('data-orientation', 'vertical');
    const buttons = await canvas.findAllByRole('button');
    await expect(buttons).toHaveLength(3);
  },
};
export const Interactive: Story = {
  render: function InteractiveButtonGroup() {
    const [selected, setSelected] = useState<'left' | 'center' | 'right'>(
      'left'
    );
    return (
      <div className="flex flex-col items-center gap-4">
        <ButtonGroup>
          <Button
            variant={selected === 'left' ? 'default' : 'outline'}
            onClick={() => setSelected('left')}
          >
            <IconAlignLeft className="size-4" />
          </Button>
          <Button
            variant={selected === 'center' ? 'default' : 'outline'}
            onClick={() => setSelected('center')}
          >
            <IconAlignCenter className="size-4" />
          </Button>
          <Button
            variant={selected === 'right' ? 'default' : 'outline'}
            onClick={() => setSelected('right')}
          >
            <IconAlignRight className="size-4" />
          </Button>
        </ButtonGroup>
        <p className="text-muted-foreground text-sm">Selected: {selected}</p>
      </div>
    );
  },
  parameters: {
    order: 11,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = await canvas.findAllByRole('button');
    await expect(buttons).toHaveLength(3);
    await userEvent.click(buttons[1]);
    await expect(canvas.getByText('Selected: center')).toBeInTheDocument();
    await userEvent.click(buttons[2]);
    await expect(canvas.getByText('Selected: right')).toBeInTheDocument();
  },
};
export const Accessibility: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">First</Button>
      <Button variant="outline">Second</Button>
      <Button variant="outline">Third</Button>
    </ButtonGroup>
  ),
  parameters: {
    order: 12,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = await canvas.findAllByRole('button');
    await expect(buttons).toHaveLength(3);
    const group = canvas.getByRole('group');
    await expect(group).toBeInTheDocument();
    buttons[0].focus();
    await expect(buttons[0]).toHaveFocus();
    await userEvent.tab();
    await expect(buttons[1]).toHaveFocus();
    await userEvent.tab();
    await expect(buttons[2]).toHaveFocus();
  },
};
export const VisualRegression: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <ButtonGroup>
        <Button variant="outline">One</Button>
        <Button variant="outline">Two</Button>
        <Button variant="outline">Three</Button>
      </ButtonGroup>

      <ButtonGroup orientation="vertical">
        <Button variant="outline">One</Button>
        <Button variant="outline">Two</Button>
        <Button variant="outline">Three</Button>
      </ButtonGroup>

      <ButtonGroup>
        <ButtonGroupText>Label</ButtonGroupText>
        <Button variant="outline" size="icon-sm">
          <IconBold className="size-4" />
        </Button>
        <ButtonGroupSeparator />
        <Button variant="outline" size="icon-sm">
          <IconItalic className="size-4" />
        </Button>
      </ButtonGroup>
    </div>
  ),
  parameters: {
    order: 13,
    chromatic: {
      disableSnapshot: false,
    },
  },
};
export const WithDisabled: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Active</Button>
      <Button variant="outline" disabled>
        Disabled
      </Button>
      <Button variant="outline">Active</Button>
    </ButtonGroup>
  ),
  parameters: {
    order: 14,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = await canvas.findAllByRole('button');
    await expect(buttons).toHaveLength(3);
    await expect(buttons[1]).toBeDisabled();
  },
};
export const SingleButton: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Only Button</Button>
    </ButtonGroup>
  ),
  parameters: {
    order: 15,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = await canvas.findAllByRole('button');
    await expect(buttons).toHaveLength(1);
  },
};
export const ManyButtons: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline" size="sm">
        1
      </Button>
      <Button variant="outline" size="sm">
        2
      </Button>
      <Button variant="outline" size="sm">
        3
      </Button>
      <Button variant="outline" size="sm">
        4
      </Button>
      <Button variant="outline" size="sm">
        5
      </Button>
      <Button variant="outline" size="sm">
        6
      </Button>
      <Button variant="outline" size="sm">
        7
      </Button>
      <Button variant="outline" size="sm">
        8
      </Button>
    </ButtonGroup>
  ),
  parameters: {
    order: 16,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = await canvas.findAllByRole('button');
    await expect(buttons).toHaveLength(8);
  },
};
export const LongText: Story = {
  render: () => (
    <div className="max-w-md">
      <ButtonGroup>
        <Button variant="outline" size="sm">
          Very Long Button Label That Wraps
        </Button>
        <Button variant="outline" size="sm">
          Another Long Label
        </Button>
      </ButtonGroup>
    </div>
  ),
  parameters: {
    order: 17,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = await canvas.findAllByRole('button');
    await expect(buttons).toHaveLength(2);
    await expect(buttons[0]).toHaveTextContent(/Very Long Button Label/i);
  },
};
export const Playground: Story = {
  args: {
    orientation: 'horizontal',
  },
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="outline">First</Button>
      <Button variant="outline">Second</Button>
      <Button variant="outline">Third</Button>
    </ButtonGroup>
  ),
  parameters: {
    order: 99,
  },
};
