'use client';

import type { Meta, StoryObj } from '@storybook/nextjs';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { useState } from 'react';
import { ComboboxCustom } from './combobox';
import { Label } from './label';
import { HelperText } from './helper-text';

const meta: Meta<typeof ComboboxCustom> = {
  title: 'AI/Combobox',
  component: ComboboxCustom,
  tags: ['autodocs'],
  argTypes: {
    // Display & behavior
    options: {
      control: false,
      description: 'Array of options to display in the combobox',
      table: {
        category: 'Display',
        type: { summary: 'Array<{ value: string; label: string }>' },
      },
    },
    value: {
      control: 'text',
      description: 'Currently selected value',
      table: {
        category: 'Display',
        type: { summary: 'string' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no value is selected',
      table: {
        category: 'Display',
        type: { summary: 'string' },
        defaultValue: { summary: "'Select option...'" },
      },
    },
    searchPlaceholder: {
      control: 'text',
      description: 'Placeholder text for the search input',
      table: {
        category: 'Display',
        type: { summary: 'string' },
        defaultValue: { summary: "'Search...'" },
      },
    },
    emptyText: {
      control: 'text',
      description: 'Text shown when no options match the search',
      table: {
        category: 'Display',
        type: { summary: 'string' },
        defaultValue: { summary: "'No option found.'" },
      },
    },
    className: {
      control: 'text',
      description: 'CSS classes for styling',
      table: {
        category: 'Display',
      },
    },
    popoverAriaLabel: {
      control: 'text',
      description: 'Accessible name for the popover content',
      table: {
        category: 'Display',
        type: { summary: 'string' },
      },
    },

    // Events
    onValueChange: {
      action: 'value-changed',
      description: 'Callback when a value is selected',
      table: {
        category: 'Events',
        type: {
          summary: '(value: string) => void',
        },
      },
    },
  },
  parameters: {
    layout: 'centered',
    actions: {
      handles: ['value-changed'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ComboboxCustom>;

const frameworks = [
  { value: 'next.js', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt.js', label: 'Nuxt.js' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
  { value: 'wordpress', label: 'WordPress' },
  { value: 'express.js', label: 'Express.js' },
  { value: 'nest.js', label: 'Nest.js' },
];

/**
 * Basic combobox with default options
 * Matches the basic example from combobox.examples.tsx
 */
export const Basic: Story = {
  args: {
    options: frameworks,
    placeholder: 'Select framework...',
    searchPlaceholder: 'Search framework...',
    emptyText: 'No framework found.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Basic combobox with searchable options. Tests opening, searching, and selecting options.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    // Find the combobox trigger button
    const trigger = canvas.getByRole('combobox');
    await expect(trigger).toBeInTheDocument();
    await expect(trigger).toHaveTextContent('Select framework...');

    // Click to open the combobox
    await userEvent.click(trigger);

    // Wait for popover to open and find the search input (portaled to body)
    const searchInput = await waitFor(
      () => body.getByPlaceholderText('Search framework...'),
      { timeout: 500 }
    );
    await expect(searchInput).toBeInTheDocument();

    // Type to search
    await userEvent.type(searchInput, 'next', { delay: 50 });
    await expect(searchInput).toHaveValue('next');

    // Find and click the Next.js option (portaled to body)
    const nextOption = await waitFor(
      () => body.getByText('Next.js'),
      { timeout: 500 }
    );
    await userEvent.click(nextOption);

    // Verify the value was selected
    await waitFor(
      () => {
        expect(trigger).toHaveTextContent('Next.js');
      },
      { timeout: 500 }
    );
  },
  render: function ComboboxBasicStory(args) {
    const [value, setValue] = useState<string>('');

    const handleValueChange = (newValue: string) => {
      setValue(newValue);
      args.onValueChange?.(newValue);
    };

    return (
      <div className="space-y-2 w-[300px]">
        <Label htmlFor="framework-combobox" id="framework-combobox-label">
          Framework
        </Label>
        <ComboboxCustom
          {...args}
          id="framework-combobox"
          aria-labelledby="framework-combobox-label"
          popoverAriaLabel="Select framework"
          value={value}
          onValueChange={handleValueChange}
        />
      </div>
    );
  },
};

/**
 * Combobox with pre-selected value
 */
export const WithValue: Story = {
  args: {
    options: frameworks,
    placeholder: 'Select framework...',
    searchPlaceholder: 'Search framework...',
    emptyText: 'No framework found.',
  },
  render: function ComboboxWithValueStory(args) {
    const [value, setValue] = useState<string>('next.js');

    const handleValueChange = (newValue: string) => {
      setValue(newValue);
      args.onValueChange?.(newValue);
    };

    return (
      <div className="space-y-2 w-[300px]">
        <Label htmlFor="framework-combobox" id="framework-combobox-label">
          Framework
        </Label>
        <ComboboxCustom
          {...args}
          id="framework-combobox"
          aria-labelledby="framework-combobox-label"
          popoverAriaLabel="Select framework"
          value={value}
          onValueChange={handleValueChange}
        />
      </div>
    );
  },
};

/**
 * Combobox with custom placeholder and search text
 */
export const CustomPlaceholders: Story = {
  args: {
    options: frameworks,
    placeholder: 'Choose a framework...',
    searchPlaceholder: 'Type to search...',
    emptyText: 'Nothing matches your search.',
  },
  render: function ComboboxCustomPlaceholdersStory(args) {
    const [value, setValue] = useState<string>('');

    const handleValueChange = (newValue: string) => {
      setValue(newValue);
      args.onValueChange?.(newValue);
    };

    return (
      <div className="space-y-2 w-[300px]">
        <Label htmlFor="framework-combobox" id="framework-combobox-label">
          Framework
        </Label>
        <ComboboxCustom
          {...args}
          id="framework-combobox"
          aria-labelledby="framework-combobox-label"
          popoverAriaLabel="Select framework"
          value={value}
          onValueChange={handleValueChange}
        />
      </div>
    );
  },
};

/**
 * Combobox with label and helper text
 */
export const WithHelperText: Story = {
  args: {
    options: frameworks,
    placeholder: 'Select framework...',
    searchPlaceholder: 'Search framework...',
    emptyText: 'No framework found.',
  },
  render: function ComboboxWithHelperTextStory(args) {
    const [value, setValue] = useState<string>('');

    const handleValueChange = (newValue: string) => {
      setValue(newValue);
      args.onValueChange?.(newValue);
    };

    return (
      <div className="grid w-full max-w-sm items-center gap-1">
        <Label htmlFor="framework-combobox-helper" id="framework-combobox-helper-label">
          Framework
        </Label>
        <ComboboxCustom
          {...args}
          id="framework-combobox-helper"
          aria-labelledby="framework-combobox-helper-label"
          popoverAriaLabel="Select framework"
          value={value}
          onValueChange={handleValueChange}
        />
        <HelperText>Select your preferred framework</HelperText>
      </div>
    );
  },
};

/**
 * Combobox with error state and error message
 */
export const WithError: Story = {
  args: {
    options: frameworks,
    placeholder: 'Select framework...',
    searchPlaceholder: 'Search framework...',
    emptyText: 'No framework found.',
  },
  render: function ComboboxWithErrorStory(args) {
    const [value, setValue] = useState<string>('');

    const handleValueChange = (newValue: string) => {
      setValue(newValue);
      args.onValueChange?.(newValue);
    };

    return (
      <div className="grid w-full max-w-sm items-center gap-1">
        <Label htmlFor="framework-combobox-error" id="framework-combobox-error-label">
          Framework
        </Label>
        <ComboboxCustom
          {...args}
          id="framework-combobox-error"
          aria-labelledby="framework-combobox-error-label"
          popoverAriaLabel="Select framework"
          value={value}
          onValueChange={handleValueChange}
          className="aria-invalid:border-destructive-foreground aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40"
        />
        <HelperText isError>This field is required</HelperText>
      </div>
    );
  },
};

/**
 * Tests keyboard interactions: opening, navigating, and selecting with keyboard
 */
export const KeyboardInteractions: Story = {
  args: {
    options: frameworks,
    placeholder: 'Select framework...',
    searchPlaceholder: 'Search framework...',
    emptyText: 'No framework found.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Tests keyboard navigation: Space/Enter to open, Arrow keys to navigate, Enter to select.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);
    const trigger = canvas.getByRole('combobox');

    // Focus the combobox
    await userEvent.click(trigger);

    // Wait for popover to open (portaled to body)
    await waitFor(
      () => body.getByPlaceholderText('Search framework...'),
      { timeout: 500 }
    );

    // Type to search
    await userEvent.keyboard('next');

    // Navigate with arrow keys
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{ArrowDown}');

    // Select with Enter
    await userEvent.keyboard('{Enter}');

    // Verify selection
    await waitFor(
      () => {
        expect(trigger).toHaveTextContent('Next.js');
      },
      { timeout: 500 }
    );
  },
  render: function ComboboxKeyboardInteractionsStory(args) {
    const [value, setValue] = useState<string>('');

    const handleValueChange = (newValue: string) => {
      setValue(newValue);
      args.onValueChange?.(newValue);
    };

    return (
      <div className="space-y-2 w-[300px]">
        <Label htmlFor="framework-combobox" id="framework-combobox-label">
          Framework
        </Label>
        <ComboboxCustom
          {...args}
          id="framework-combobox"
          aria-labelledby="framework-combobox-label"
          popoverAriaLabel="Select framework"
          value={value}
          onValueChange={handleValueChange}
        />
      </div>
    );
  },
};

/**
 * Combobox with many options to test scrolling
 */
export const ManyOptions: Story = {
  args: {
    options: Array.from({ length: 50 }, (_, i) => ({
      value: `option-${i + 1}`,
      label: `Option ${i + 1}`,
    })),
    placeholder: 'Select an option...',
    searchPlaceholder: 'Search options...',
    emptyText: 'No option found.',
  },
  render: function ComboboxManyOptionsStory(args) {
    const [value, setValue] = useState<string>('');

    const handleValueChange = (newValue: string) => {
      setValue(newValue);
      args.onValueChange?.(newValue);
    };

    return (
      <div className="space-y-2 w-[300px]">
        <Label htmlFor="option-combobox" id="option-combobox-label">
          Option
        </Label>
        <ComboboxCustom
          {...args}
          id="option-combobox"
          aria-labelledby="option-combobox-label"
          popoverAriaLabel="Select option"
          value={value}
          onValueChange={handleValueChange}
        />
      </div>
    );
  },
};

/**
 * Combobox with empty options array
 */
export const EmptyOptions: Story = {
  args: {
    options: [],
    placeholder: 'Select option...',
    searchPlaceholder: 'Search...',
    emptyText: 'No options available.',
  },
  render: function ComboboxEmptyOptionsStory(args) {
    const [value, setValue] = useState<string>('');

    const handleValueChange = (newValue: string) => {
      setValue(newValue);
      args.onValueChange?.(newValue);
    };

    return (
      <div className="space-y-2 w-[300px]">
        <Label htmlFor="option-combobox" id="option-combobox-label">
          Option
        </Label>
        <ComboboxCustom
          {...args}
          id="option-combobox"
          aria-labelledby="option-combobox-label"
          popoverAriaLabel="Select option"
          value={value}
          onValueChange={handleValueChange}
        />
      </div>
    );
  },
};

/**
 * Combobox with search functionality
 * Tests filtering options as user types
 */
export const SearchFunctionality: Story = {
  args: {
    options: frameworks,
    placeholder: 'Select framework...',
    searchPlaceholder: 'Search framework...',
    emptyText: 'No framework found.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Tests the search functionality by typing and verifying filtered results.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);
    const trigger = canvas.getByRole('combobox');

    // Open combobox
    await userEvent.click(trigger);

    // Wait for search input (portaled to body)
    const searchInput = await waitFor(
      () => body.getByPlaceholderText('Search framework...'),
      { timeout: 500 }
    );

    // Type search query
    await userEvent.type(searchInput, 'js', { delay: 50 });
    await expect(searchInput).toHaveValue('js');

    // Verify filtered results appear (portaled to body)
    await waitFor(
      () => {
        expect(body.getByText('Next.js')).toBeInTheDocument();
        expect(body.getByText('Nuxt.js')).toBeInTheDocument();
        expect(body.getByText('Express.js')).toBeInTheDocument();
      },
      { timeout: 500 }
    );

    // Verify non-matching items are not shown
    const remixOption = body.queryByText('Remix');
    expect(remixOption).not.toBeInTheDocument();
  },
  render: function ComboboxSearchFunctionalityStory(args) {
    const [value, setValue] = useState<string>('');

    const handleValueChange = (newValue: string) => {
      setValue(newValue);
      args.onValueChange?.(newValue);
    };

    return (
      <div className="space-y-2 w-[300px]">
        <Label htmlFor="framework-combobox" id="framework-combobox-label">
          Framework
        </Label>
        <ComboboxCustom
          {...args}
          id="framework-combobox"
          aria-labelledby="framework-combobox-label"
          popoverAriaLabel="Select framework"
          value={value}
          onValueChange={handleValueChange}
        />
      </div>
    );
  },
};

