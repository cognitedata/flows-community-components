import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  IconBookmark,
  IconDownload,
  IconExternalLink,
  IconLoader2,
  IconPlus,
  IconSend,
  IconSettings,
  IconTrash,
} from '@tabler/icons-react';
import { useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { Button } from './button';
const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'destructive',
        'secondary',
        'outline',
        'ghost',
        'link',
      ],
      table: {
        category: 'Variants/Styling',
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: 'default',
        },
      },
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon', 'icon-sm', 'icon-lg'],
      table: {
        category: 'Variants/Styling',
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: 'default',
        },
      },
    },
    children: {
      control: 'text',
      table: {
        category: 'Content',
      },
    },
    disabled: {
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    onClick: {
      action: 'clicked',
      table: {
        category: 'Events',
        type: {
          summary: '(event: MouseEvent) => void',
        },
      },
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      table: {
        category: 'Advanced',
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: 'button',
        },
      },
    },
  },
  parameters: {
    layout: 'centered',
    actions: {
      handles: ['click'],
    },
  },
};
export default meta;
type Story = StoryObj<typeof Button>;
export const Default: Story = {
  render: () => <Button>Button</Button>,
  parameters: {
    order: 1,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', {
      name: /button/i,
    });
    await expect(button).toBeInTheDocument();
    await userEvent.click(button);
    await expect(button).toHaveFocus();
  },
};
export const Secondary: Story = {
  render: () => <Button variant="secondary">Secondary</Button>,
  parameters: {
    order: 2,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', {
      name: /secondary/i,
    });
    await expect(button).toBeInTheDocument();
    await expect(button).toHaveClass(/secondary/);
  },
};
export const Outline: Story = {
  render: () => <Button variant="outline">Outline</Button>,
  parameters: {
    order: 3,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', {
      name: /outline/i,
    });
    await expect(button).toBeInTheDocument();
    await expect(button).toHaveClass(/outline/);
  },
};
export const Ghost: Story = {
  render: () => <Button variant="ghost">Ghost</Button>,
  parameters: {
    order: 4,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', {
      name: /ghost/i,
    });
    await expect(button).toBeInTheDocument();
    await userEvent.hover(button);
  },
};
export const Destructive: Story = {
  render: () => <Button variant="destructive">Delete</Button>,
  parameters: {
    order: 5,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', {
      name: /delete/i,
    });
    await expect(button).toBeInTheDocument();
    await expect(button).toHaveClass(/destructive/);
    await userEvent.click(button);
  },
};
export const Link: Story = {
  render: () => <Button variant="link">Link Button</Button>,
  parameters: {
    order: 6,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', {
      name: /link button/i,
    });
    await expect(button).toBeInTheDocument();
    await expect(button).toHaveClass(/link/);
  },
};
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button size="icon" aria-label="Add">
        <IconPlus className="size-4" />
      </Button>
      <Button size="icon" variant="secondary" aria-label="Bookmark">
        <IconBookmark className="size-4" />
      </Button>
      <Button size="icon" variant="destructive" aria-label="Delete">
        <IconTrash className="size-4" />
      </Button>
      <Button>
        <IconPlus className="size-4" />
        Add data
      </Button>
      <Button variant="secondary">
        Explore more
        <IconExternalLink className="size-4" />
      </Button>
      <Button variant="destructive">
        <IconTrash className="size-4" />
        Delete
      </Button>
    </div>
  ),
  parameters: {
    order: 7,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = await canvas.findAllByRole('button');
    await expect(buttons).toHaveLength(6);
    await userEvent.click(buttons[0]);
  },
};
export const MainComponent: Story = {
  render: () => {
    const variants = [
      'default',
      'secondary',
      'outline',
      'ghost',
      'destructive',
      'link',
    ] as const;
    const sizePairs = [
      {
        label: 'default',
      },
      {
        label: 'sm',
      },
      {
        label: 'lg',
      },
    ] as const;
    const activeWrapperClassByVariant = {
      default: '[&>button]:bg-primary-hover dark:[&>button]:bg-primary-hover',
      secondary:
        '[&>button]:bg-secondary-hover dark:[&>button]:bg-secondary-hover',
      outline: '[&>button]:bg-accent dark:[&>button]:bg-input/50',
      ghost: '[&>button]:bg-accent dark:[&>button]:bg-accent/50',
      destructive:
        '[&>button]:bg-destructive-hover dark:[&>button]:bg-destructive-hover',
      link: '[&>button]:bg-accent/50 dark:[&>button]:bg-accent/30 [&>button]:underline',
    } as const;
    return (
      <div className="flex flex-wrap gap-3 flex-col w-full">
        {variants.map((variant) => (
          <div
            key={variant}
            className="flex flex-wrap items-center gap-3 w-full"
          >
            {sizePairs.map(({ label }) => (
              <div key={`${variant}-${label}`} className="contents">
                <Button variant={variant} size={label}>
                  <IconPlus className="size-4" />
                  Button
                </Button>
                <div className={activeWrapperClassByVariant[variant]}>
                  <Button variant={variant} size={label}>
                    <IconPlus className="size-4" />
                    Button
                  </Button>
                </div>
                <Button variant={variant} size={label} disabled>
                  <IconPlus className="size-4" />
                  Button
                </Button>
                <div className={activeWrapperClassByVariant[variant]}>
                  <Button variant={variant} size={label}>
                    <IconPlus className="size-4" />
                  </Button>
                </div>
                <Button variant={variant} size={label}>
                  <IconPlus className="size-4" />
                </Button>
                <Button variant={variant} size={label} disabled>
                  <IconPlus className="size-4" />
                </Button>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    order: 8,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = await canvas.findAllByRole('button');
    await expect(buttons.length).toBeGreaterThan(10);
  },
};
export const ButtonStates: Story = {
  render: () => (
    <div className="flex items-center justify-center py-4">
      <div className="flex flex-wrap gap-3">
        <Button disabled>Disabled</Button>
        <Button disabled>
          <IconLoader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </Button>
      </div>
    </div>
  ),
  parameters: {
    order: 9,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = await canvas.findAllByRole('button');
    await expect(buttons).toHaveLength(2);
    await expect(buttons[0]).toBeDisabled();
    await expect(buttons[1]).toBeDisabled();
  },
};
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
  parameters: {
    order: 10,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = await canvas.findAllByRole('button');
    await expect(buttons).toHaveLength(3);
    const smallButton = canvas.getByText('Small');
    await expect(smallButton).toBeInTheDocument();
  },
};
export const WithLeftIcon: Story = {
  render: () => (
    <Button>
      <IconPlus className="size-4" />
      Add Item
    </Button>
  ),
  parameters: {
    order: 11,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', {
      name: /add item/i,
    });
    await expect(button).toBeInTheDocument();
    const icon = button.querySelector('svg');
    await expect(icon).toBeInTheDocument();
  },
};
export const WithRightIcon: Story = {
  render: () => (
    <Button>
      Download
      <IconDownload className="size-4" />
    </Button>
  ),
  parameters: {
    order: 12,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', {
      name: /download/i,
    });
    await expect(button).toBeInTheDocument();
  },
};
export const IconButtons: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button variant="outline" size="icon-sm" aria-label="Settings small">
        <IconSettings className="size-4" />
      </Button>
      <Button variant="outline" size="icon" aria-label="Settings default">
        <IconSettings className="size-4" />
      </Button>
      <Button variant="outline" size="icon-lg" aria-label="Settings large">
        <IconSettings className="size-5" />
      </Button>
    </div>
  ),
  parameters: {
    order: 13,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const smallButton = canvas.getByLabelText('Settings small');
    const defaultButton = canvas.getByLabelText('Settings default');
    const largeButton = canvas.getByLabelText('Settings large');
    await expect(smallButton).toBeInTheDocument();
    await expect(defaultButton).toBeInTheDocument();
    await expect(largeButton).toBeInTheDocument();
    await userEvent.click(defaultButton);
  },
};
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button disabled>Default</Button>
      <Button variant="secondary" disabled>
        Secondary
      </Button>
      <Button variant="outline" disabled>
        Outline
      </Button>
      <Button variant="ghost" disabled>
        Ghost
      </Button>
      <Button variant="destructive" disabled>
        Destructive
      </Button>
    </div>
  ),
  parameters: {
    order: 14,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = await canvas.findAllByRole('button');
    for (const button of buttons) {
      await expect(button).toBeDisabled();
      await expect(button).toHaveClass('disabled:pointer-events-none');
    }
  },
};
export const Loading: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button disabled>
        <IconLoader2 className="size-4 animate-spin" />
        Loading...
      </Button>
      <Button variant="outline" disabled>
        <IconLoader2 className="size-4 animate-spin" />
        Please wait
      </Button>
    </div>
  ),
  parameters: {
    order: 15,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = await canvas.findAllByRole('button');
    for (const button of buttons) {
      await expect(button).toBeDisabled();
    }
    const spinner = buttons[0].querySelector('svg');
    await expect(spinner).toBeInTheDocument();
  },
};
export const InContext: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm">
          <IconSettings className="size-4" />
          Settings
        </Button>
        <Button variant="destructive" size="sm">
          <IconTrash className="size-4" />
          Delete
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button size="lg" className="w-full">
          <IconSend className="size-4" />
          Send Message
        </Button>
      </div>
    </div>
  ),
  parameters: {
    order: 16,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const cancelButton = canvas.getByText('Cancel');
    const saveButton = canvas.getByText('Save Changes');
    await expect(cancelButton).toBeInTheDocument();
    await expect(saveButton).toBeInTheDocument();
    const settingsButton = canvas.getByRole('button', {
      name: /settings/i,
    });
    await userEvent.click(settingsButton);
  },
};
export const ClickInteraction: Story = {
  render: function ButtonClickTest() {
    const [count, setCount] = useState(0);
    return (
      <div className="flex flex-col items-center gap-4">
        <Button onClick={() => setCount((c) => c + 1)}>
          Clicked {count} times
        </Button>
        <div className="text-sm text-muted-foreground">Count: {count}</div>
      </div>
    );
  },
  parameters: {
    order: 17,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', {
      name: /clicked/i,
    });
    const counter = canvas.getByText(/Count:/);
    await expect(counter).toHaveTextContent('Count: 0');
    await userEvent.click(button);
    await waitFor(() => expect(counter).toHaveTextContent('Count: 1'));
    await userEvent.click(button);
    await waitFor(() => expect(counter).toHaveTextContent('Count: 2'));
    await userEvent.click(button);
    await waitFor(() => expect(counter).toHaveTextContent('Count: 3'));
  },
};
export const KeyboardNavigation: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Button>First</Button>
      <Button>Second</Button>
      <Button>Third</Button>
    </div>
  ),
  parameters: {
    order: 18,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = await canvas.findAllByRole('button');
    await userEvent.tab();
    await expect(buttons[0]).toHaveFocus();
    await userEvent.keyboard(' ');
    await userEvent.tab();
    await expect(buttons[1]).toHaveFocus();
    await userEvent.keyboard('{Enter}');
  },
};
export const Accessibility: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Button size="icon" aria-label="Add new item">
          <IconPlus className="size-4" />
        </Button>
        <Button size="icon" variant="outline" aria-label="Delete item">
          <IconTrash className="size-4" />
        </Button>
        <Button size="icon" variant="ghost" aria-label="Settings">
          <IconSettings className="size-4" />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button disabled aria-label="Disabled save button">
          Save (Disabled)
        </Button>
      </div>
    </div>
  ),
  parameters: {
    order: 19,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const addButton = canvas.getByLabelText('Add new item');
    const deleteButton = canvas.getByLabelText('Delete item');
    const settingsButton = canvas.getByLabelText('Settings');
    const disabledButton = canvas.getByLabelText('Disabled save button');
    await expect(addButton).toBeInTheDocument();
    await expect(deleteButton).toBeInTheDocument();
    await expect(settingsButton).toBeInTheDocument();
    await expect(disabledButton).toBeDisabled();
    await userEvent.click(addButton);
    await expect(addButton).toHaveFocus();
  },
};
export const FormButtonTypes: Story = {
  render: function FormButtonTypesDemo() {
    const [submitted, setSubmitted] = useState(false);
    const [value, setValue] = useState('Initial value');
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
          setTimeout(() => setSubmitted(false), 2000);
        }}
        onReset={() => {
          setValue('Initial value');
        }}
        className="flex flex-col gap-4 p-4 border rounded-md"
      >
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="px-3 py-2 border rounded-md"
          placeholder="Type something..."
        />

        <div className="flex items-center gap-2">
          <Button type="submit" disabled={submitted}>
            {submitted ? 'Submitted!' : 'Submit'}
          </Button>
          <Button type="reset" variant="outline">
            Reset
          </Button>
          <Button type="button" variant="ghost" onClick={() => setValue('')}>
            Clear
          </Button>
        </div>
      </form>
    );
  },
  parameters: {
    order: 20,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText('Type something...');
    const submitButton = canvas.getByText('Submit');
    const clearButton = canvas.getByText('Clear');
    await userEvent.clear(input);
    await userEvent.type(input, 'Test input');
    await expect(input).toHaveValue('Test input');
    await userEvent.click(clearButton);
    await waitFor(() => expect(input).toHaveValue(''));
    await userEvent.type(input, 'Another test');
    await userEvent.click(submitButton);
    await waitFor(() => expect(submitButton).toHaveTextContent('Submitted!'));
  },
};
export const VisualRegression: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-8">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">
          All Variants
        </h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">
          All Sizes
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">
          Disabled States
        </h3>
        <div className="flex flex-wrap gap-3">
          <Button disabled>Default Disabled</Button>
          <Button variant="secondary" disabled>
            Secondary Disabled
          </Button>
          <Button variant="outline" disabled>
            Outline Disabled
          </Button>
          <Button variant="destructive" disabled>
            Destructive Disabled
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">
          Icon Buttons
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="icon-sm" variant="outline" aria-label="Small icon">
            <IconPlus className="size-4" />
          </Button>
          <Button size="icon" variant="outline" aria-label="Default icon">
            <IconPlus className="size-4" />
          </Button>
          <Button size="icon-lg" variant="outline" aria-label="Large icon">
            <IconPlus className="size-5" />
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">
          With Icons
        </h3>
        <div className="flex flex-wrap gap-3">
          <Button>
            <IconPlus className="size-4" />
            Add Item
          </Button>
          <Button variant="outline">
            Download
            <IconDownload className="size-4" />
          </Button>
          <Button variant="destructive">
            <IconTrash className="size-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">
          Loading States
        </h3>
        <div className="flex flex-wrap gap-3">
          <Button disabled>
            <IconLoader2 className="size-4 animate-spin" />
            Loading
          </Button>
          <Button variant="outline" disabled>
            <IconLoader2 className="size-4 animate-spin" />
            Please wait
          </Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    order: 21,
    chromatic: {
      disableSnapshot: false,
    },
  },
};
export const EdgeCaseEmpty: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button />
      <Button variant="outline" />
      <Button variant="destructive" />
    </div>
  ),
  parameters: {
    order: 22,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = await canvas.findAllByRole('button');
    await expect(buttons).toHaveLength(3);
    await userEvent.click(buttons[0]);
    await expect(buttons[0]).toHaveFocus();
  },
};
export const EdgeCaseLongText: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-md">
      <Button>
        This is a button with an extremely long text that should demonstrate how
        the button handles overflow and wrapping
      </Button>
      <Button variant="outline" className="max-w-50">
        This text is constrained and will wrap
      </Button>
      <Button size="sm">
        Small button with really long text content that might cause issues
      </Button>
    </div>
  ),
  parameters: {
    order: 23,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = await canvas.findAllByRole('button');
    await expect(buttons).toHaveLength(3);
    const firstButton = buttons[0];
    await expect(firstButton).toHaveTextContent(/extremely long text/);
  },
};
export const EdgeCaseSpecialCharacters: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button>
        <span role="img" aria-label="rocket">
          🚀
        </span>
        {'  '}
        Emoji Button
      </Button>
      <Button variant="outline">{'Button & Special <Characters>'}</Button>
      <Button variant="secondary">中文按钮</Button>
      <Button variant="ghost">Кнопка</Button>
      <Button>
        <span role="img" aria-label="play">
          ▶️
        </span>{' '}
        <span role="img" aria-label="pause">
          ⏸️
        </span>{' '}
        <span role="img" aria-label="stop">
          ⏹️
        </span>
      </Button>
      <Button variant="outline">{'Price: $99.99 €85'}</Button>
    </div>
  ),
  parameters: {
    order: 24,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const emojiButton = canvas.getByRole('button', {
      name: /emoji button/i,
    });
    await expect(emojiButton).toBeInTheDocument();
    const specialButton = canvas.getByText(/Special <Characters>/);
    await expect(specialButton).toBeInTheDocument();
    const chineseButton = canvas.getByText('中文按钮');
    await userEvent.click(chineseButton);
  },
};
export const EdgeCaseMultipleIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Button>
        <IconPlus className="size-4" />
        <IconDownload className="size-4" />
        Multiple Icons
      </Button>
      <Button variant="outline">
        <IconSettings className="size-4" />
        Text in middle
        <IconTrash className="size-4" />
      </Button>
      <Button>
        <IconLoader2 className="size-4" />
        <IconSend className="size-4" />
        <IconPlus className="size-4" />
        Three Icons
      </Button>
    </div>
  ),
  parameters: {
    order: 25,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = await canvas.findAllByRole('button');
    await expect(buttons).toHaveLength(3);
    const firstButton = buttons[0];
    const icons = firstButton.querySelectorAll('svg');
    await expect(icons.length).toBeGreaterThanOrEqual(2);
  },
};
export const EdgeCaseWhitespace: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Button> Spaces Before And After </Button>
      <Button variant="outline">{'  \n  Line  \n  Breaks  \n  '}</Button>
      <Button variant="secondary"> Tabs And Spaces </Button>
    </div>
  ),
  parameters: {
    order: 26,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = await canvas.findAllByRole('button');
    await expect(buttons).toHaveLength(3);
    await userEvent.click(buttons[0]);
    await expect(buttons[0]).toHaveFocus();
  },
};
export const EdgeCaseNestedElements: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Button>
        <span className="font-bold">Bold</span> and{' '}
        <span className="italic">italic</span>
      </Button>
      <Button variant="outline">
        <div className="flex items-center gap-2">
          <IconSettings className="size-4" />
          <span>Nested div</span>
        </div>
      </Button>
      <Button>
        Text with <code className="text-xs">code</code> inside
      </Button>
    </div>
  ),
  parameters: {
    order: 27,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = await canvas.findAllByRole('button');
    await expect(buttons).toHaveLength(3);
    const firstButton = buttons[0];
    const boldSpan = firstButton.querySelector('span.font-bold');
    await expect(boldSpan).toBeInTheDocument();
    await userEvent.click(buttons[1]);
  },
};
export const EdgeCaseWidthConstraints: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="w-24 border border-dashed border-gray-300 p-2">
        <Button className="w-full">Narrow Container</Button>
      </div>
      <div className="w-12 border border-dashed border-gray-300 p-2">
        <Button size="icon" className="w-full">
          <IconSettings className="size-4" />
        </Button>
      </div>
      <div className="w-full max-w-36 border border-dashed border-gray-300 p-2">
        <Button className="w-full truncate">
          Very long text that will be truncated
        </Button>
      </div>
      <div className="flex gap-2 w-50 border border-dashed border-gray-300 p-2">
        <Button className="flex-1">Button 1</Button>
        <Button className="flex-1">Button 2</Button>
      </div>
    </div>
  ),
  parameters: {
    order: 28,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = await canvas.findAllByRole('button');
    await expect(buttons.length).toBeGreaterThanOrEqual(4);
    await userEvent.click(buttons[0]);
    await expect(buttons[0]).toHaveFocus();
  },
};
export const EdgeCaseIconOnly: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Button size="icon">
          <IconPlus className="size-4" />
        </Button>
        <Button size="icon" aria-label="Icon button with label">
          <IconTrash className="size-4" />
        </Button>
      </div>
      <div className="flex gap-2">
        <Button variant="outline">
          <IconSettings className="size-4" />
        </Button>
        <Button variant="outline" aria-label="Settings with proper label">
          <IconSettings className="size-4" />
        </Button>
      </div>
    </div>
  ),
  parameters: {
    order: 29,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const labeledIconButton = canvas.getByLabelText('Icon button with label');
    const labeledSettingsButton = canvas.getByLabelText(
      'Settings with proper label'
    );
    await expect(labeledIconButton).toBeInTheDocument();
    await expect(labeledSettingsButton).toBeInTheDocument();
    await userEvent.click(labeledIconButton);
  },
};
export const EdgeCaseRapidStateChanges: Story = {
  render: function RapidStateChanges() {
    const [disabled, setDisabled] = useState(false);
    const [variant, setVariant] = useState<'default' | 'destructive'>(
      'default'
    );
    const [count, setCount] = useState(0);
    return (
      <div className="flex flex-col gap-4">
        <Button
          variant={variant}
          disabled={disabled}
          onClick={() => setCount((c) => c + 1)}
        >
          Clicked {count} times
        </Button>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setDisabled(!disabled)}
          >
            Toggle Disabled
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              setVariant((v) => (v === 'default' ? 'destructive' : 'default'))
            }
          >
            Toggle Variant
          </Button>
        </div>
      </div>
    );
  },
  parameters: {
    order: 30,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', {
      name: /clicked/i,
    });
    const toggleDisabled = canvas.getByText('Toggle Disabled');
    const toggleVariant = canvas.getByText('Toggle Variant');
    await userEvent.click(button);
    await userEvent.click(button);
    await userEvent.click(toggleDisabled);
    await waitFor(() => expect(button).toBeDisabled());
    await userEvent.click(toggleDisabled);
    await waitFor(() => expect(button).not.toBeDisabled());
    await userEvent.click(toggleVariant);
    await waitFor(() => expect(button).toHaveClass(/destructive/));
  },
};
export const EdgeCaseInvisibleContent: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Button>
        <span className="opacity-0">Hidden text</span>
      </Button>
      <Button variant="outline">
        <span className="sr-only">Screen reader only</span>
        <IconSettings className="size-4" />
      </Button>
      <Button>
        <span
          style={{
            fontSize: 0,
          }}
        >
          Zero font size
        </span>
      </Button>
    </div>
  ),
  parameters: {
    order: 31,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = await canvas.findAllByRole('button');
    await expect(buttons).toHaveLength(3);
    await userEvent.click(buttons[0]);
    await expect(buttons[0]).toHaveFocus();
    const srButton = buttons[1];
    const srText = srButton.querySelector('.sr-only');
    await expect(srText).toBeInTheDocument();
  },
};
export const Playground: Story = {
  args: {
    variant: 'default',
    size: 'default',
    children: 'Click me',
    disabled: false,
    type: 'button',
  },
  render: (args) => <Button {...args} />,
  parameters: {
    order: 99,
  },
};
