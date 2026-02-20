import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, waitFor, within } from '@storybook/test';
import { useState } from 'react';

import { Label } from '../label';

import { Textarea } from './textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Primitives/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
      table: {
        category: 'Content',
        type: { summary: 'string' },
      },
    },
    defaultValue: {
      control: 'text',
      description: 'Default value (uncontrolled)',
      table: {
        category: 'Content',
        type: { summary: 'string' },
      },
    },
    maxChars: {
      control: 'number',
      description: 'Maximum character limit',
      table: {
        category: 'Behavior',
        type: { summary: 'number' },
      },
    },
    errorMessage: {
      control: 'text',
      description: 'Error message to display',
      table: {
        category: 'Behavior',
        type: { summary: 'string' },
      },
    },
    overLimitMessage: {
      control: 'text',
      description: 'Message when over character limit',
      table: {
        category: 'Behavior',
        type: { summary: 'string' },
        defaultValue: { summary: 'Too many characters' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the textarea',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
      table: {
        category: 'Variants/Styling',
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-88">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Textarea>;

/**
 * Default textarea.
 */
export const Default: Story = {
  render: () => <Textarea placeholder="Enter your message..." />,
  parameters: {
    order: 1,
    docs: {
      description: {
        story: 'Default textarea with placeholder.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByPlaceholderText('Enter your message...');

    await expect(textarea).toBeInTheDocument();

    await userEvent.type(textarea, 'Hello World');
    await expect(textarea).toHaveValue('Hello World');
  },
};

/**
 * Textarea with label.
 */
export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message">Your message</Label>
      <Textarea id="message" placeholder="Type your message here..." />
    </div>
  ),
  parameters: {
    order: 2,
    docs: {
      description: {
        story: 'Textarea with an associated label.',
      },
    },
  },
};

/**
 * Textarea with character limit.
 */
export const WithCharacterLimit: Story = {
  render: () => (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="bio">Bio</Label>
      <Textarea id="bio" placeholder="Tell us about yourself..." maxChars={100} />
    </div>
  ),
  parameters: {
    order: 3,
    docs: {
      description: {
        story: 'Textarea with a character counter showing remaining characters.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByPlaceholderText('Tell us about yourself...');

    await expect(canvas.getByText('100 characters left')).toBeInTheDocument();

    await userEvent.type(textarea, 'Hello');

    await waitFor(() => {
      expect(canvas.getByText('95 characters left')).toBeInTheDocument();
    });
  },
};

/**
 * Textarea over character limit.
 */
export const OverLimit: Story = {
  render: () => (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="limited">Short comment</Label>
      <Textarea
        id="limited"
        defaultValue="This text is way too long for the 20 character limit that has been set"
        maxChars={20}
      />
    </div>
  ),
  parameters: {
    order: 4,
    docs: {
      description: {
        story: 'Textarea with text exceeding the character limit.',
      },
    },
  },
};

/**
 * Textarea with error message.
 */
export const WithError: Story = {
  render: () => (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="error-textarea">Comments</Label>
      <Textarea
        id="error-textarea"
        placeholder="Enter your comments..."
        errorMessage="Please enter at least 10 characters"
      />
    </div>
  ),
  parameters: {
    order: 5,
    docs: {
      description: {
        story: 'Textarea with validation error message.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const errorText = canvas.getByText('Please enter at least 10 characters');
    await expect(errorText).toBeInTheDocument();
  },
};

/**
 * Disabled textarea.
 */
export const Disabled: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="grid w-full gap-1.5">
        <Label htmlFor="disabled-empty">Disabled (empty)</Label>
        <Textarea id="disabled-empty" placeholder="Cannot edit" disabled />
      </div>
      <div className="grid w-full gap-1.5">
        <Label htmlFor="disabled-value">Disabled (with value)</Label>
        <Textarea
          id="disabled-value"
          defaultValue="This is read-only content that cannot be modified."
          disabled
        />
      </div>
    </div>
  ),
  parameters: {
    order: 6,
    docs: {
      description: {
        story: 'Disabled textareas prevent user interaction.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textareas = canvas.getAllByRole('textbox');
    for (const textarea of textareas) {
      await expect(textarea).toBeDisabled();
    }
  },
};

/**
 * Controlled textarea.
 */
export const Controlled: Story = {
  render: function ControlledTextarea() {
    const [value, setValue] = useState('');

    return (
      <div className="space-y-4">
        <div className="grid w-full gap-1.5">
          <Label htmlFor="controlled">Controlled textarea</Label>
          <Textarea
            id="controlled"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Type something..."
          />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setValue('')}
            className="px-3 py-1 text-sm border rounded-md hover:bg-accent"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={() => setValue('Hello, World!')}
            className="px-3 py-1 text-sm border rounded-md hover:bg-accent"
          >
            Set text
          </button>
        </div>
        <p className="text-sm text-muted-foreground">Length: {value.length} characters</p>
      </div>
    );
  },
  parameters: {
    order: 7,
    docs: {
      description: {
        story: 'Controlled textarea with external state management.',
      },
    },
  },
};

/**
 * Custom character limit messages.
 */
export const CustomMessages: Story = {
  render: () => (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="custom">Tweet</Label>
      <Textarea
        id="custom"
        placeholder="What's happening?"
        maxChars={280}
        overLimitMessage="Your tweet is too long!"
        charactersLeftMessage={(remaining) =>
          remaining > 20 ? `${remaining} remaining` : `Only ${remaining} left!`
        }
      />
    </div>
  ),
  parameters: {
    order: 8,
    docs: {
      description: {
        story: 'Textarea with customized character limit messages.',
      },
    },
  },
};

/**
 * All textarea states.
 */
export const AllStates: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="grid w-full gap-1.5">
        <Label>Default</Label>
        <Textarea placeholder="Default placeholder" />
      </div>
      <div className="grid w-full gap-1.5">
        <Label>With value</Label>
        <Textarea defaultValue="Some existing content" />
      </div>
      <div className="grid w-full gap-1.5">
        <Label>With character limit</Label>
        <Textarea placeholder="Limited..." maxChars={50} />
      </div>
      <div className="grid w-full gap-1.5">
        <Label>With error</Label>
        <Textarea placeholder="Error state" errorMessage="Required field" />
      </div>
      <div className="grid w-full gap-1.5">
        <Label className="opacity-50">Disabled</Label>
        <Textarea placeholder="Disabled" disabled />
      </div>
    </div>
  ),
  parameters: {
    order: 9,
    docs: {
      description: {
        story: 'All textarea states for comparison.',
      },
    },
  },
};

/**
 * Edge cases with long text, special characters, and unicode.
 */
export const EdgeCases: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="grid w-full items-center gap-1">
        <Label htmlFor="edge-long-value">Very long value</Label>
        <Textarea
          id="edge-long-value"
          defaultValue="This is a very long textarea value that should demonstrate how the textarea handles overflow and text wrapping behavior in various scenarios and edge cases. The text continues on multiple lines to test the behavior with extensive content that spans several rows and demonstrates proper text handling in the component."
        />
      </div>
      <div className="grid w-full items-center gap-1">
        <Label htmlFor="edge-special-chars">Special characters</Label>
        <Textarea
          id="edge-special-chars"
          defaultValue="Price: $99.99 €85 ¥1000 & <special> characters"
        />
      </div>
      <div className="grid w-full items-center gap-1">
        <Label htmlFor="edge-emoji">Emoji</Label>
        <Textarea
          id="edge-emoji"
          defaultValue="🚀 Hello World! 🌍 ✨ Multiline text with emoji on multiple lines. 🎉 More emoji here! 🔥"
        />
      </div>
      <div className="grid w-full items-center gap-1">
        <Label htmlFor="edge-unicode">Unicode characters</Label>
        <Textarea id="edge-unicode" defaultValue="中文字符 مرحبا Привет नमस्ते" />
      </div>
      <div className="grid w-full items-center gap-1">
        <Label htmlFor="edge-whitespace">Whitespace handling</Label>
        <Textarea id="edge-whitespace" defaultValue="   Spaces before and after   " />
      </div>
      <div className="grid w-full items-center gap-1">
        <Label htmlFor="edge-placeholder">Very long placeholder</Label>
        <Textarea
          id="edge-placeholder"
          placeholder="This is a very long placeholder text that demonstrates how placeholders are handled when they exceed the textarea width"
        />
      </div>
      <div className="grid w-full items-center gap-1">
        <Label htmlFor="edge-limit">Over character limit</Label>
        <Textarea
          id="edge-limit"
          maxChars={50}
          defaultValue="This text is intentionally very long and exceeds the character limit to test the behavior"
        />
      </div>
    </div>
  ),
  parameters: {
    order: 10,
    docs: {
      description: {
        story:
          'Edge cases including very long values, special characters, emoji, unicode text, whitespace handling, and character limit overflow.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const longValueTextarea = canvas.getByLabelText('Very long value');
    await expect(longValueTextarea).toHaveValue(
      'This is a very long textarea value that should demonstrate how the textarea handles overflow and text wrapping behavior in various scenarios and edge cases. The text continues on multiple lines to test the behavior with extensive content that spans several rows and demonstrates proper text handling in the component.'
    );

    const emojiTextarea = canvas.getByLabelText('Emoji');
    await expect(emojiTextarea).toHaveValue(
      '🚀 Hello World! 🌍 ✨ Multiline text with emoji on multiple lines. 🎉 More emoji here! 🔥'
    );

    const unicodeTextarea = canvas.getByLabelText('Unicode characters');
    await expect(unicodeTextarea).toHaveValue('中文字符 مرحبا Привет नमस्ते');
  },
};

/**
 * Visual regression testing.
 */
export const VisualRegression: Story = {
  render: () => (
    <div className="space-y-6 p-4 w-100">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">States</h3>
        <div className="space-y-3">
          <Textarea placeholder="Default" />
          <Textarea defaultValue="With value" />
          <Textarea placeholder="Disabled" disabled />
          <Textarea placeholder="With error" errorMessage="Error message" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">With Limit</h3>
        <Textarea placeholder="Limited..." maxChars={50} />
        <Textarea defaultValue="This is over the character limit for testing" maxChars={20} />
      </div>
    </div>
  ),
  parameters: {
    order: 11,
    docs: {
      description: {
        story: 'Comprehensive visual overview for regression testing.',
      },
    },
    chromatic: {
      disableSnapshot: false,
    },
  },
  decorators: [
    (Story) => (
      <div className="p-4">
        <Story />
      </div>
    ),
  ],
};

/**
 * Interactive playground.
 */
export const Playground: Story = {
  args: {
    placeholder: 'Enter text...',
    disabled: false,
    maxChars: undefined,
    errorMessage: '',
  },
  render: (args) => <Textarea {...args} />,
  parameters: {
    order: 99,
    docs: {
      description: {
        story: 'Interactive playground - use controls to experiment with textarea props.',
      },
    },
  },
};
