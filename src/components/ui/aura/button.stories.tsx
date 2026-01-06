'use client';

import type { Meta, StoryObj } from '@storybook/nextjs';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { useState } from 'react';
import { Button } from './button';
import {
  IconPlus,
  IconDownload,
  IconTrash,
  IconSettings,
  IconSend,
  IconLoader2,
} from '@tabler/icons-react';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    // Appearance
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
      description: 'The visual style variant of the button',
      table: {
        category: 'Appearance',
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon', 'icon-sm', 'icon-lg'],
      description: 'The size of the button',
      table: {
        category: 'Appearance',
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    children: {
      control: 'text',
      description: 'The content to display inside the button',
      table: {
        category: 'Content',
      },
    },

    // State
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },

    // Events
    onClick: {
      action: 'clicked',
      description: 'Callback fired when button is clicked',
      table: {
        category: 'Events',
        type: { summary: '(event: MouseEvent) => void' },
      },
    },

    // Advanced
    asChild: {
      control: 'boolean',
      description: 'Merge props onto immediate child (using Radix Slot)',
      table: {
        category: 'Advanced',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'The type of button',
      table: {
        category: 'Advanced',
        type: { summary: 'string' },
        defaultValue: { summary: 'button' },
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

/**
 * Default primary button style. Used for primary actions in interfaces.
 */
export const Default: Story = {
  args: {
    children: 'Button',
  },
  parameters: {
    docs: {
      description: {
        story:
          'The default primary button with solid background. Use for primary actions like "Save", "Submit", or "Continue".',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the button
    const button = canvas.getByRole('button', { name: /button/i });
    await expect(button).toBeInTheDocument();

    // Test click interaction
    await userEvent.click(button);
    await expect(button).toHaveFocus();
  },
};

/**
 * Secondary button for less prominent actions.
 */
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Secondary button with a lighter background. Use for secondary actions that are less prominent than primary actions.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /secondary/i });
    await expect(button).toBeInTheDocument();
    await expect(button).toHaveClass(/secondary/);
  },
};

/**
 * Outline button with border.
 */
export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Button with border and transparent background. Commonly used for "Cancel" actions or alternative options.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /outline/i });
    await expect(button).toBeInTheDocument();
    await expect(button).toHaveClass(/outline/);
  },
};

/**
 * Ghost button for subtle actions.
 */
export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Minimal button with no background or border. Use for tertiary actions or in toolbars where minimal visual weight is desired.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /ghost/i });
    await expect(button).toBeInTheDocument();

    // Test hover interaction
    await userEvent.hover(button);
  },
};

/**
 * Destructive button for dangerous actions.
 */
export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Delete',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Red destructive button for dangerous actions like deleting data. Always requires confirmation through a dialog or alert.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /delete/i });
    await expect(button).toBeInTheDocument();
    await expect(button).toHaveClass(/destructive/);

    // Verify it's clickable
    await userEvent.click(button);
  },
};

/**
 * Link-styled button.
 */
export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link Button',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Button styled as a link with underline on hover. Use for inline actions that should look like text links.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /link button/i });
    await expect(button).toBeInTheDocument();
    await expect(button).toHaveClass(/link/);
  },
};

/**
 * All button variants displayed together.
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Overview of all button variants. Each variant serves a different purpose in the UI hierarchy.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('button');

    // Verify all 6 variants are present
    await expect(buttons).toHaveLength(6);

    // Test first button is clickable
    await userEvent.click(buttons[0]);
  },
};

/**
 * All button sizes.
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Available button sizes: small (h-7), default (h-9), and large (h-10). Choose based on context and visual hierarchy.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('button');

    await expect(buttons).toHaveLength(3);

    // Small button should be present
    const smallButton = canvas.getByText('Small');
    await expect(smallButton).toBeInTheDocument();
  },
};

/**
 * Button with left icon.
 */
export const WithLeftIcon: Story = {
  render: () => (
    <Button>
      <IconPlus className="size-4" />
      Add Item
    </Button>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Button with icon on the left side. Icons automatically get proper spacing with the gap utility.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /add item/i });
    await expect(button).toBeInTheDocument();

    // Verify SVG icon is present
    const icon = button.querySelector('svg');
    await expect(icon).toBeInTheDocument();
  },
};

/**
 * Button with right icon.
 */
export const WithRightIcon: Story = {
  render: () => (
    <Button>
      Download
      <IconDownload className="size-4" />
    </Button>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Button with icon on the right side. Useful for actions that indicate direction or outcome.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /download/i });
    await expect(button).toBeInTheDocument();
  },
};

/**
 * Icon-only buttons in different sizes.
 */
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
    docs: {
      description: {
        story:
          'Square icon-only buttons in three sizes. Always include aria-label for accessibility when using icon-only buttons.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify all buttons have proper labels
    const smallButton = canvas.getByLabelText('Settings small');
    const defaultButton = canvas.getByLabelText('Settings default');
    const largeButton = canvas.getByLabelText('Settings large');

    await expect(smallButton).toBeInTheDocument();
    await expect(defaultButton).toBeInTheDocument();
    await expect(largeButton).toBeInTheDocument();

    // Test click on one
    await userEvent.click(defaultButton);
  },
};

/**
 * Disabled state for all variants.
 */
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
    docs: {
      description: {
        story:
          'Disabled buttons with reduced opacity and no pointer events. All variants support the disabled state.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('button');

    // Verify all buttons are disabled
    for (const button of buttons) {
      await expect(button).toBeDisabled();
    }

    // Try to click (should not work)
    await userEvent.click(buttons[0]);
    await expect(buttons[0]).toBeDisabled();
  },
};

/**
 * Loading state with spinner.
 */
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
    docs: {
      description: {
        story:
          'Loading state using a spinning icon. Always disable the button during loading to prevent multiple submissions.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('button');

    // Verify buttons are disabled during loading
    for (const button of buttons) {
      await expect(button).toBeDisabled();
    }

    // Verify spinner is present
    const spinner = buttons[0].querySelector('svg');
    await expect(spinner).toBeInTheDocument();
  },
};

/**
 * Button examples in context.
 */
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
    docs: {
      description: {
        story:
          'Common button patterns in real-world contexts: dialog actions, toolbar buttons, and full-width CTAs.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test dialog pattern (Cancel + Save)
    const cancelButton = canvas.getByText('Cancel');
    const saveButton = canvas.getByText('Save Changes');

    await expect(cancelButton).toBeInTheDocument();
    await expect(saveButton).toBeInTheDocument();

    // Verify the toolbar buttons
    const settingsButton = canvas.getByRole('button', { name: /settings/i });
    await userEvent.click(settingsButton);
  },
};

/**
 * Interactive click counter.
 */
export const ClickInteraction: Story = {
  render: function ButtonClickTest() {
    const [count, setCount] = useState(0);
    return (
      <div className="flex flex-col items-center gap-4">
        <Button
          onClick={() => setCount((c) => c + 1)}
          data-testid="counter-button"
        >
          Clicked {count} times
        </Button>
        <div
          data-testid="click-count"
          className="text-sm text-muted-foreground"
        >
          Count: {count}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive button demonstrating click event handling and state updates.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByTestId('counter-button');
    const counter = canvas.getByTestId('click-count');

    // Initial state
    await expect(counter).toHaveTextContent('Count: 0');

    // Click and verify state updates
    await userEvent.click(button);
    await waitFor(() => expect(counter).toHaveTextContent('Count: 1'));

    await userEvent.click(button);
    await waitFor(() => expect(counter).toHaveTextContent('Count: 2'));

    await userEvent.click(button);
    await waitFor(() => expect(counter).toHaveTextContent('Count: 3'));
  },
};

/**
 * Keyboard navigation test.
 */
export const KeyboardNavigation: Story = {
  render: () => (
    <div className="flex items-center gap-2" data-testid="button-group">
      <Button>First</Button>
      <Button>Second</Button>
      <Button>Third</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Buttons support full keyboard navigation with Tab and Space/Enter keys.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const buttons = canvas.getAllByRole('button');

    // Tab to first button
    await userEvent.tab();
    await expect(buttons[0]).toHaveFocus();

    // Space to activate
    await userEvent.keyboard(' ');

    // Tab to next
    await userEvent.tab();
    await expect(buttons[1]).toHaveFocus();

    // Enter to activate
    await userEvent.keyboard('{Enter}');
  },
};

/**
 * Accessibility - ARIA labels for icon buttons.
 */
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
    docs: {
      description: {
        story:
          'Icon-only buttons require aria-label for screen reader accessibility. Disabled buttons are properly announced.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check ARIA labels exist
    const addButton = canvas.getByLabelText('Add new item');
    const deleteButton = canvas.getByLabelText('Delete item');
    const settingsButton = canvas.getByLabelText('Settings');
    const disabledButton = canvas.getByLabelText('Disabled save button');

    await expect(addButton).toBeInTheDocument();
    await expect(deleteButton).toBeInTheDocument();
    await expect(settingsButton).toBeInTheDocument();

    // Check disabled state
    await expect(disabledButton).toBeDisabled();

    // Verify icon buttons are clickable
    await userEvent.click(addButton);
    await expect(addButton).toHaveFocus();
  },
};

/**
 * Form button types - submit, reset, and button.
 */
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
    docs: {
      description: {
        story:
          'Buttons support type="submit", type="reset", and type="button" for form handling. Submit triggers form submission, Reset restores default values, Button performs custom actions.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const input = canvas.getByPlaceholderText('Type something...');
    const submitButton = canvas.getByText('Submit');
    const clearButton = canvas.getByText('Clear');

    // Type in input
    await userEvent.clear(input);
    await userEvent.type(input, 'Test input');
    await expect(input).toHaveValue('Test input');

    // Click clear button
    await userEvent.click(clearButton);
    await waitFor(() => expect(input).toHaveValue(''));

    // Type again
    await userEvent.type(input, 'Another test');

    // Click submit
    await userEvent.click(submitButton);
    await waitFor(() => expect(submitButton).toHaveTextContent('Submitted!'));
  },
};

/**
 * Visual regression testing - comprehensive overview.
 */
export const VisualRegression: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-8">
      {/* All variants */}
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

      {/* All sizes */}
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

      {/* Disabled states */}
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

      {/* Icon buttons */}
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

      {/* With icons */}
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

      {/* Loading states */}
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
    docs: {
      description: {
        story:
          'Comprehensive visual overview of all button variants, sizes, states, and combinations for visual regression testing in Chromatic.',
      },
    },
    chromatic: {
      disableSnapshot: false,
    },
  },
};

/**
 * Edge case: Empty button (no content).
 */
export const EdgeCaseEmpty: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button />
      <Button variant="outline" />
      <Button variant="destructive" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Edge case: Buttons with no children content. They still render but have minimal width.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('button');

    // Should still render and be clickable
    await expect(buttons).toHaveLength(3);
    await userEvent.click(buttons[0]);
    await expect(buttons[0]).toHaveFocus();
  },
};

/**
 * Edge case: Very long text content.
 */
export const EdgeCaseLongText: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-md">
      <Button>
        This is a button with an extremely long text that should demonstrate how
        the button handles overflow and wrapping
      </Button>
      <Button variant="outline" className="max-w-[200px]">
        This text is constrained and will wrap
      </Button>
      <Button size="sm">
        Small button with really long text content that might cause issues
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Edge case: Buttons with very long text. The whitespace-nowrap class prevents wrapping, so long text may overflow or expand the button width.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('button');

    await expect(buttons).toHaveLength(3);

    // Verify long text is present
    const firstButton = buttons[0];
    await expect(firstButton).toHaveTextContent(/extremely long text/);
  },
};

/**
 * Edge case: Special characters and unicode.
 */
export const EdgeCaseSpecialCharacters: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button>🚀 Emoji Button</Button>
      <Button variant="outline">{'Button & Special <Characters>'}</Button>
      <Button variant="secondary">中文按钮</Button>
      <Button variant="ghost">Кнопка</Button>
      <Button>▶️ ⏸️ ⏹️</Button>
      <Button variant="outline">{'Price: $99.99 €85'}</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Edge case: Buttons with emojis, special characters, and unicode text from various languages.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify emoji button exists
    const emojiButton = canvas.getByText(/🚀 Emoji Button/);
    await expect(emojiButton).toBeInTheDocument();

    // Verify special characters render
    const specialButton = canvas.getByText(/Special <Characters>/);
    await expect(specialButton).toBeInTheDocument();

    // Test clicking unicode button
    const chineseButton = canvas.getByText('中文按钮');
    await userEvent.click(chineseButton);
  },
};

/**
 * Edge case: Multiple icons and complex content.
 */
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
    docs: {
      description: {
        story:
          'Edge case: Buttons with multiple icons. The gap utility handles spacing between all children.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('button');

    await expect(buttons).toHaveLength(3);

    // Verify multiple SVGs exist
    const firstButton = buttons[0];
    const icons = firstButton.querySelectorAll('svg');
    await expect(icons.length).toBeGreaterThanOrEqual(2);
  },
};

/**
 * Edge case: Whitespace and formatting.
 */
export const EdgeCaseWhitespace: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Button> Spaces Before And After </Button>
      <Button variant="outline">{'  \n  Line  \n  Breaks  \n  '}</Button>
      <Button variant="secondary"> Tabs And Spaces </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Edge case: Buttons with unusual whitespace, tabs, and line breaks. The whitespace-nowrap class collapses most whitespace.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('button');

    await expect(buttons).toHaveLength(3);

    // Verify buttons are still clickable
    await userEvent.click(buttons[0]);
    await expect(buttons[0]).toHaveFocus();
  },
};

/**
 * Edge case: Nested components and React elements.
 */
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
    docs: {
      description: {
        story:
          'Edge case: Buttons with nested HTML elements like spans, divs, and formatting tags.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('button');

    await expect(buttons).toHaveLength(3);

    // Verify nested elements exist
    const firstButton = buttons[0];
    const boldSpan = firstButton.querySelector('span.font-bold');
    await expect(boldSpan).toBeInTheDocument();

    // Test clicking button with nested div
    await userEvent.click(buttons[1]);
  },
};

/**
 * Edge case: Width constraints and responsive behavior.
 */
export const EdgeCaseWidthConstraints: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="w-[100px] border border-dashed border-gray-300 p-2">
        <Button className="w-full">Narrow Container</Button>
      </div>
      <div className="w-[50px] border border-dashed border-gray-300 p-2">
        <Button size="icon" className="w-full">
          <IconSettings className="size-4" />
        </Button>
      </div>
      <div className="w-full max-w-[150px] border border-dashed border-gray-300 p-2">
        <Button className="w-full truncate">
          Very long text that will be truncated
        </Button>
      </div>
      <div className="flex gap-2 w-[200px] border border-dashed border-gray-300 p-2">
        <Button className="flex-1">Button 1</Button>
        <Button className="flex-1">Button 2</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Edge case: Buttons in constrained widths and responsive containers. Shows how buttons behave with width utilities.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('button');

    await expect(buttons.length).toBeGreaterThanOrEqual(4);

    // Test clicking constrained buttons
    await userEvent.click(buttons[0]);
    await expect(buttons[0]).toHaveFocus();
  },
};

/**
 * Edge case: Only icons, no text (accessibility concerns).
 */
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
    docs: {
      description: {
        story:
          'Edge case: Icon-only buttons with and without aria-label. First button in each row lacks aria-label (accessibility issue), second has proper labeling.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find buttons with proper labels
    const labeledIconButton = canvas.getByLabelText('Icon button with label');
    const labeledSettingsButton = canvas.getByLabelText(
      'Settings with proper label'
    );

    await expect(labeledIconButton).toBeInTheDocument();
    await expect(labeledSettingsButton).toBeInTheDocument();

    // Test interaction
    await userEvent.click(labeledIconButton);
  },
};

/**
 * Edge case: Rapid state changes.
 */
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
          data-testid="rapid-change-button"
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
    docs: {
      description: {
        story:
          'Edge case: Button with rapidly changing props (disabled state, variant changes, click count).',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByTestId('rapid-change-button');
    const toggleDisabled = canvas.getByText('Toggle Disabled');
    const toggleVariant = canvas.getByText('Toggle Variant');

    // Click button multiple times
    await userEvent.click(button);
    await userEvent.click(button);

    // Toggle disabled
    await userEvent.click(toggleDisabled);
    await waitFor(() => expect(button).toBeDisabled());

    // Toggle disabled back
    await userEvent.click(toggleDisabled);
    await waitFor(() => expect(button).not.toBeDisabled());

    // Toggle variant
    await userEvent.click(toggleVariant);
    await waitFor(() => expect(button).toHaveClass(/destructive/));
  },
};

/**
 * Edge case: Zero-width and invisible content.
 */
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
        <span style={{ fontSize: 0 }}>Zero font size</span>
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Edge case: Buttons with invisible or screen-reader-only content. Tests how buttons render with hidden elements.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('button');

    await expect(buttons).toHaveLength(3);

    // Verify buttons are still interactive
    await userEvent.click(buttons[0]);
    await expect(buttons[0]).toHaveFocus();

    // Check that screen reader text exists but is visually hidden
    const srButton = buttons[1];
    const srText = srButton.querySelector('.sr-only');
    await expect(srText).toBeInTheDocument();
  },
};

/**
 * Interactive playground for testing different configurations.
 */
export const Playground: Story = {
  args: {
    variant: 'default',
    size: 'default',
    children: 'Click me',
    disabled: false,
    type: 'button',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground - use the controls below to experiment with all available button props and variants.',
      },
    },
  },
};
