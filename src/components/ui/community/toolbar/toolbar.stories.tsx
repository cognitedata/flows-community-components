import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Toggle,
} from '@cognite/aura/components';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  IconBold,
  IconDotsVertical,
  IconItalic,
  IconPointer,
  IconUnderline,
} from '@tabler/icons-react';
import { expect, userEvent, within } from 'storybook/test';

import { Toolbar, ToolbarButton, ToolbarSeparator } from './toolbar';

const meta: Meta<typeof Toolbar> = {
  title: 'Community/Toolbar',
  component: Toolbar,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      table: {
        category: 'Variants/Orientation',
        type: {
          summary: '"horizontal" | "vertical"',
        },
        defaultValue: {
          summary: 'horizontal',
        },
      },
    },
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
      <ToolbarButton render={<Toggle aria-label="Toggle bold" />}>
        <IconBold />
      </ToolbarButton>
      <ToolbarButton render={<Toggle aria-label="Toggle italic" />}>
        <IconItalic />
      </ToolbarButton>
      <ToolbarButton render={<Toggle aria-label="Toggle underline" />}>
        <IconUnderline />
      </ToolbarButton>
    </Toolbar>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toolbar = canvas.getByRole('toolbar');
    await expect(toolbar).toBeInTheDocument();
    await expect(toolbar).toHaveAttribute('data-orientation', 'horizontal');
    const boldToggle = canvas.getByRole('button', { name: 'Toggle bold' });
    await expect(boldToggle).toBeInTheDocument();
    await userEvent.click(boldToggle);
    await expect(boldToggle).toHaveAttribute('data-pressed');
  },
};

export const Vertical: Story = {
  parameters: {
    order: 2,
  },
  render: () => (
    <Toolbar orientation="vertical">
      <ToolbarButton render={<Toggle aria-label="Toggle bold" />}>
        <IconBold />
      </ToolbarButton>
      <ToolbarButton render={<Toggle aria-label="Toggle italic" />}>
        <IconItalic />
      </ToolbarButton>
      <ToolbarButton render={<Toggle aria-label="Toggle underline" />}>
        <IconUnderline />
      </ToolbarButton>
    </Toolbar>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toolbar = canvas.getByRole('toolbar');
    await expect(toolbar).toBeInTheDocument();
    await expect(toolbar).toHaveAttribute('data-orientation', 'vertical');
  },
};

export const WithSeparator: Story = {
  parameters: {
    order: 3,
  },
  render: () => (
    <Toolbar>
      <ToolbarButton aria-label="Pointer tool">
        <IconPointer />
      </ToolbarButton>
      <ToolbarSeparator />
      <ToolbarButton render={<Toggle aria-label="Toggle bold" />}>
        <IconBold />
      </ToolbarButton>
      <ToolbarButton render={<Toggle aria-label="Toggle italic" />}>
        <IconItalic />
      </ToolbarButton>
      <ToolbarButton render={<Toggle aria-label="Toggle underline" />}>
        <IconUnderline />
      </ToolbarButton>
    </Toolbar>
  ),
};

export const WithSelect: Story = {
  parameters: {
    order: 4,
  },
  render: () => (
    <Toolbar>
      <Select>
        <ToolbarButton
          className="min-w-0 w-content"
          size="sm"
          render={<SelectTrigger />}
        >
          <SelectValue placeholder="Select version" />
        </ToolbarButton>
        <SelectContent>
          <SelectItem value="1.0.0">1.0.0</SelectItem>
          <SelectItem value="1.1.0">1.1.0</SelectItem>
          <SelectItem value="1.2.0">1.2.0</SelectItem>
          <SelectItem value="1.3.0">1.3.0</SelectItem>
        </SelectContent>
      </Select>
      <ToolbarSeparator />
      <ToolbarButton aria-label="More options">
        <IconDotsVertical />
      </ToolbarButton>
    </Toolbar>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toolbar = canvas.getByRole('toolbar');
    await expect(toolbar).toBeInTheDocument();
    await userEvent.click(canvas.getByRole('combobox'));
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{Enter}');
    await expect(canvas.getByText('1.0.0')).toBeInTheDocument();
  },
};

export const Accessibility: Story = {
  parameters: {
    order: 5,
  },
  render: () => (
    <div className="flex items-start flex-col gap-4">
      <h3 className="text-sm font-semibold text-muted-foreground">
        Horizontal
      </h3>
      <Toolbar aria-label="Horizontal toolbar">
        <ToolbarButton aria-label="Select pointer tool">
          <IconPointer />
        </ToolbarButton>
        <ToolbarSeparator />
        <ToolbarButton render={<Toggle aria-label="Bold text" />}>
          <IconBold />
        </ToolbarButton>
        <ToolbarButton render={<Toggle aria-label="Italic text" />}>
          <IconItalic />
        </ToolbarButton>
        <ToolbarButton render={<Toggle aria-label="Underline text" />}>
          <IconUnderline />
        </ToolbarButton>
        <Select defaultValue="100%">
          <ToolbarButton
            className="min-w-10"
            size="sm"
            render={<SelectTrigger />}
          >
            <SelectValue placeholder="Select version" />
          </ToolbarButton>
          <SelectContent>
            <SelectItem value="100%">100%</SelectItem>
            <SelectItem value="75%">75</SelectItem>
            <SelectItem value="50%">50</SelectItem>
            <SelectItem value="25%">25</SelectItem>
          </SelectContent>
        </Select>
      </Toolbar>
      <h3 className="text-sm font-semibold text-muted-foreground">Vertical</h3>
      <Toolbar orientation="vertical" aria-label="Vertical toolbar">
        <ToolbarButton aria-label="Select pointer tool">
          <IconPointer />
        </ToolbarButton>
        <ToolbarSeparator />
        <ToolbarButton render={<Toggle aria-label="Bold text" />}>
          <IconBold />
        </ToolbarButton>
        <ToolbarButton render={<Toggle aria-label="Italic text" />}>
          <IconItalic />
        </ToolbarButton>
        <ToolbarButton render={<Toggle aria-label="Underline text" />}>
          <IconUnderline />
        </ToolbarButton>
      </Toolbar>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const horizontalToolbar = canvas.getByRole('toolbar', {
      name: 'Horizontal toolbar',
    });
    const [horizontalPointerButton] =
      await within(horizontalToolbar).findAllByRole('button');
    await userEvent.click(horizontalPointerButton);
    await expect(horizontalPointerButton).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(
      within(horizontalToolbar).getByRole('button', { name: 'Bold text' })
    ).toHaveFocus();

    const verticalToolbar = canvas.getByRole('toolbar', {
      name: 'Vertical toolbar',
    });
    const [verticalPointerButton] =
      await within(verticalToolbar).findAllByRole('button');
    await userEvent.click(verticalPointerButton);
    await expect(verticalPointerButton).toHaveFocus();
    await userEvent.keyboard('{ArrowDown}');
    await expect(
      within(verticalToolbar).getByRole('button', { name: 'Bold text' })
    ).toHaveFocus();
    await userEvent.keyboard('{ArrowUp}');
    await expect(verticalPointerButton).toHaveFocus();
  },
};

export const VisualRegression: Story = {
  parameters: {
    order: 6,
    chromatic: {
      disableSnapshot: false,
    },
  },
  render: () => (
    <div className="flex items-start gap-4">
      <Toolbar aria-label="Horizontal toolbar">
        <ToolbarButton aria-label="Select pointer tool">
          <IconPointer />
        </ToolbarButton>
        <ToolbarSeparator />
        <ToolbarButton render={<Toggle aria-label="Bold text" />}>
          <IconBold />
        </ToolbarButton>
        <ToolbarButton render={<Toggle aria-label="Italic text" />}>
          <IconItalic />
        </ToolbarButton>
        <ToolbarButton render={<Toggle aria-label="Underline text" />}>
          <IconUnderline />
        </ToolbarButton>
      </Toolbar>
      <Toolbar orientation="vertical" aria-label="Vertical toolbar">
        <ToolbarButton aria-label="Select pointer tool">
          <IconPointer />
        </ToolbarButton>
        <ToolbarSeparator />
        <ToolbarButton render={<Toggle aria-label="Bold text" />}>
          <IconBold />
        </ToolbarButton>
        <ToolbarButton render={<Toggle aria-label="Italic text" />}>
          <IconItalic />
        </ToolbarButton>
        <ToolbarButton render={<Toggle aria-label="Underline text" />}>
          <IconUnderline />
        </ToolbarButton>
      </Toolbar>
    </div>
  ),
};
