
import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect } from '@storybook/test';
import { useState } from 'react';
import { HelperText } from './helper-text';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import {
  IconCircleCheck,
  IconInfoCircle,
  IconAlertTriangle,
  IconBulb,
} from '@tabler/icons-react';

const meta: Meta<typeof HelperText> = {
  title: 'UI/Helper Text',
  component: HelperText,
  tags: ['autodocs'],
  argTypes: {
    // Display
    size: {
      control: 'select',
      options: ['xs', 'sm'],
      description: 'Size of the helper text',
      table: {
        category: 'Display',
        type: { summary: '"xs" | "sm"' },
        defaultValue: { summary: 'sm' },
      },
    },
    className: {
      control: 'text',
      description: 'CSS classes for styling',
      table: {
        category: 'Display',
      },
    },

    // State
    isError: {
      control: 'boolean',
      description: 'Show error state with destructive color',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    isSuccess: {
      control: 'boolean',
      description: 'Show success state with success color',
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },

    // Content
    icon: {
      control: false,
      description:
        'Custom icon to display. Defaults to error icon when isError is true',
      table: {
        category: 'Content',
        type: { summary: 'ReactNode' },
      },
    },
    children: {
      control: 'text',
      description: 'Helper text content',
      table: {
        category: 'Content',
        type: { summary: 'ReactNode' },
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof HelperText>;

/**
 * Default helper text with standard size and muted color
 */
export const Default: Story = {
  args: {
    children: 'This is helpful information for the user.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default helper text with muted foreground color. Used to provide additional context or instructions.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const helperText = canvas.getByText(
      'This is helpful information for the user.'
    );

    // Verify helper text is present and has correct color
    await expect(helperText).toBeInTheDocument();
    await expect(helperText).toHaveClass('text-muted-foreground');
  },
};

/**
 * Extra small helper text for compact layouts
 */
export const SizeXS: Story = {
  args: {
    size: 'xs',
    children: 'Compact helper text for tight spaces.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Extra small size variant for compact layouts and inline help.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const helperText = canvas.getByText('Compact helper text for tight spaces.');

    // Verify helper text is present
    await expect(helperText).toBeInTheDocument();

    // Verify the parent container has the correct size class
    await expect(helperText.parentElement).toHaveClass('text-xs');
  },
};

/**
 * Small (default) helper text
 */
export const SizeSM: Story = {
  args: {
    size: 'sm',
    children: 'Standard sized helper text.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Standard size variant (default). Used for most form fields.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const helperText = canvas.getByText('Standard sized helper text.');

    // Verify helper text is present
    await expect(helperText).toBeInTheDocument();

    // The root element of HelperText should have the 'text-sm' class
    await expect(helperText.parentElement).toHaveClass('text-sm');
  },
};

/**
 * Error state with automatic error icon
 */
export const Error: Story = {
  args: {
    isError: true,
    children: 'This field is required.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Error state with destructive color. Automatically shows an exclamation icon when no custom icon is provided.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const helperText = canvas.getByText('This field is required.');

    // Verify error text is present with destructive color
    await expect(helperText).toBeInTheDocument();
    await expect(helperText).toHaveClass('text-destructive-foreground');

    // Verify error icon is present
    const icon = canvasElement.querySelector('svg');
    await expect(icon).toBeInTheDocument();
  },
};

/**
 * Success state with custom success icon
 */
export const Success: Story = {
  args: {
    isSuccess: true,
    icon: <IconCircleCheck />,
    children: 'Password meets all requirements.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Success state with success color and custom check icon.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const helperText = canvas.getByText('Password meets all requirements.');

    // Verify success text is present with success color
    await expect(helperText).toBeInTheDocument();
    await expect(helperText).toHaveClass('text-success-foreground');

    // Verify success icon is present
    const icon = canvasElement.querySelector('svg');
    await expect(icon).toBeInTheDocument();
  },
};

/**
 * Helper text with custom info icon
 */
export const WithCustomIcon: Story = {
  args: {
    icon: <IconInfoCircle />,
    children: 'Your data is encrypted and secure.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Helper text with a custom icon for informational messages.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const helperText = canvas.getByText('Your data is encrypted and secure.');

    // Verify helper text is present
    await expect(helperText).toBeInTheDocument();

    // Verify custom icon is present
    const icon = canvasElement.querySelector('svg');
    await expect(icon).toBeInTheDocument();
  },
};

/**
 * Warning helper text
 */
export const Warning: Story = {
  args: {
    icon: <IconAlertTriangle />,
    children: 'Changes cannot be undone after saving.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Warning message with alert triangle icon. Uses default muted color.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const helperText = canvas.getByText('Changes cannot be undone after saving.');

    // Verify warning text is present
    await expect(helperText).toBeInTheDocument();

    // Verify warning icon is present
    const icon = canvasElement.querySelector('svg');
    await expect(icon).toBeInTheDocument();
  },
};

/**
 * Helper text with tip icon
 */
export const Tip: Story = {
  args: {
    icon: <IconBulb />,
    children: 'Pro tip: Use keyboard shortcuts to work faster.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Helpful tip with lightbulb icon for suggestions.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const helperText = canvas.getByText(
      'Pro tip: Use keyboard shortcuts to work faster.'
    );

    // Verify tip text is present
    await expect(helperText).toBeInTheDocument();

    // Verify tip icon is present
    const icon = canvasElement.querySelector('svg');
    await expect(icon).toBeInTheDocument();
  },
};

/**
 * Helper text without icon
 */
export const NoIcon: Story = {
  args: {
    children: 'Simple text without an icon.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Helper text without any icon. Useful for simple instructional text.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const helperText = canvas.getByText('Simple text without an icon.');

    // Verify helper text is present
    await expect(helperText).toBeInTheDocument();

    // Verify no icon is present
    const icon = canvasElement.querySelector('svg');
    await expect(icon).not.toBeInTheDocument();
  },
};

/**
 * Long helper text that wraps to multiple lines
 */
export const LongText: Story = {
  args: {
    icon: <IconInfoCircle />,
    children:
      'This is a longer piece of helper text that demonstrates how the component handles text wrapping. It will span multiple lines while maintaining proper alignment with the icon.',
    className: 'max-w-md',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates how helper text handles longer content with proper wrapping and icon alignment.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const helperText = canvas.getByText(
      /This is a longer piece of helper text/
    );

    // Verify long text is present
    await expect(helperText).toBeInTheDocument();

    // Verify icon is present
    const icon = canvasElement.querySelector('svg');
    await expect(icon).toBeInTheDocument();
  },
};

/**
 * Interactive form example showing different helper text states
 */
export const InteractiveFormExample: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Interactive example showing helper text changing based on form validation state.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('Email address');

    // Initial state
    await expect(
      canvas.getByText('Enter your email to receive notifications.')
    ).toBeInTheDocument();

    // Type invalid email
    await userEvent.type(input, 'invalid-email', { delay: 50 });
    await expect(
      canvas.getByText('Please enter a valid email address.')
    ).toBeInTheDocument();
    await expect(
      canvas.queryByText('Enter your email to receive notifications.')
    ).not.toBeInTheDocument();

    // Type valid email
    await userEvent.clear(input);
    await userEvent.type(input, 'valid@email.com', { delay: 50 });
    await expect(canvas.getByText('Email format is valid.')).toBeInTheDocument();
    await expect(
      canvas.queryByText('Please enter a valid email address.')
    ).not.toBeInTheDocument();
  },
  render: function InteractiveFormExampleStory() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');

    const validateEmail = (value: string) => {
      if (value.length === 0) {
        setStatus('idle');
        return;
      }
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      setStatus(isValid ? 'success' : 'error');
    };

    return (
      <div className="w-[400px] space-y-2">
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            validateEmail(e.target.value);
          }}
        />
        {status === 'idle' && (
          <HelperText size="sm">
            Enter your email to receive notifications.
          </HelperText>
        )}
        {status === 'error' && (
          <HelperText size="sm" isError>
            Please enter a valid email address.
          </HelperText>
        )}
        {status === 'success' && (
          <HelperText size="sm" isSuccess icon={<IconCircleCheck />}>
            Email format is valid.
          </HelperText>
        )}
      </div>
    );
  },
};

/**
 * Comparison of different sizes
 */
export const SizeComparison: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of extra small and small sizes.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify both sizes are rendered
    const xsText = canvas.getByText('This is extra small helper text');
    const smText = canvas.getByText('This is small helper text');

    await expect(xsText).toBeInTheDocument();
    await expect(smText).toBeInTheDocument();

    // Verify correct size classes
    await expect(xsText.parentElement).toHaveClass('text-xs');
    await expect(smText.parentElement).toHaveClass('text-sm');
  },
  render: () => (
    <div className="space-y-4">
      <div>
        <div className="text-sm font-medium mb-1">Extra Small (xs)</div>
        <HelperText size="xs" icon={<IconInfoCircle />}>
          This is extra small helper text
        </HelperText>
      </div>
      <div>
        <div className="text-sm font-medium mb-1">Small (sm) - Default</div>
        <HelperText size="sm" icon={<IconInfoCircle />}>
          This is small helper text
        </HelperText>
      </div>
    </div>
  ),
};

/**
 * All states demonstration
 */
export const AllStates: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Comprehensive demonstration of all helper text states and variations.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify all states are rendered
    await expect(
      canvas.getByText('This is default helper text.')
    ).toBeInTheDocument();
    await expect(
      canvas.getByText('This field contains an error.')
    ).toBeInTheDocument();
    await expect(canvas.getByText('Successfully validated.')).toBeInTheDocument();
    await expect(
      canvas.getByText('Additional information is available.')
    ).toBeInTheDocument();
    await expect(canvas.getByText('Proceed with caution.')).toBeInTheDocument();
    await expect(
      canvas.getByText('Simple text without an icon.')
    ).toBeInTheDocument();

    // Verify error state has correct color
    const errorText = canvas.getByText('This field contains an error.');
    await expect(errorText).toHaveClass('text-destructive-foreground');

    // Verify success state has correct color
    const successText = canvas.getByText('Successfully validated.');
    await expect(successText).toHaveClass('text-success-foreground');
  },
  render: () => (
    <div className="space-y-4 max-w-md">
      <div>
        <div className="text-sm font-medium mb-1">Default</div>
        <HelperText>This is default helper text.</HelperText>
      </div>
      <div>
        <div className="text-sm font-medium mb-1">Error</div>
        <HelperText isError>This field contains an error.</HelperText>
      </div>
      <div>
        <div className="text-sm font-medium mb-1">Success</div>
        <HelperText isSuccess icon={<IconCircleCheck />}>
          Successfully validated.
        </HelperText>
      </div>
      <div>
        <div className="text-sm font-medium mb-1">With Info Icon</div>
        <HelperText icon={<IconInfoCircle />}>
          Additional information is available.
        </HelperText>
      </div>
      <div>
        <div className="text-sm font-medium mb-1">With Warning Icon</div>
        <HelperText icon={<IconAlertTriangle />}>
          Proceed with caution.
        </HelperText>
      </div>
      <div>
        <div className="text-sm font-medium mb-1">Without Icon</div>
        <HelperText>Simple text without an icon.</HelperText>
      </div>
    </div>
  ),
};

/**
 * Integration with form fields
 */
export const WithFormFields: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Examples of helper text integrated with different form components.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify form fields are rendered with correct labels
    await expect(canvas.getByLabelText('Username')).toBeInTheDocument();
    await expect(canvas.getByLabelText('Password')).toBeInTheDocument();
    await expect(canvas.getByLabelText('Confirm Password')).toBeInTheDocument();

    // Verify helper texts are present
    await expect(
      canvas.getByText(
        'Choose a unique username. Only letters, numbers, and underscores.'
      )
    ).toBeInTheDocument();
    await expect(
      canvas.getByText(
        'Must be at least 8 characters with a mix of letters and numbers.'
      )
    ).toBeInTheDocument();

    // Verify error helper text is present with correct styling
    const errorText = canvas.getByText('Passwords do not match.');
    await expect(errorText).toBeInTheDocument();
    await expect(errorText).toHaveClass('text-destructive-foreground');
  },
  render: () => (
    <div className="w-[400px] space-y-6">
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input id="username" placeholder="johndoe" />
        <HelperText size="sm">
          Choose a unique username. Only letters, numbers, and underscores.
        </HelperText>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" placeholder="••••••••" />
        <HelperText size="sm" icon={<IconInfoCircle />}>
          Must be at least 8 characters with a mix of letters and numbers.
        </HelperText>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirm">Confirm Password</Label>
        <Input id="confirm" type="password" placeholder="••••••••" />
        <HelperText size="sm" isError>
          Passwords do not match.
        </HelperText>
      </div>
    </div>
  ),
};

/**
 * Stateful validation example with button interaction
 */
export const StatefulValidation: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Interactive validation that updates helper text state on button click.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText('Name');
    const button = canvas.getByRole('button', { name: /Validate/i });

    // Initial state
    await expect(
      canvas.getByText('Enter your name and click validate.')
    ).toBeInTheDocument();

    // Test validation with empty input
    await userEvent.click(button);
    await expect(
      canvas.getByText('Name must be at least 5 characters long.')
    ).toBeInTheDocument();

    // Test validation with short input
    await userEvent.type(input, 'test', { delay: 50 });
    await userEvent.click(button);
    await expect(
      canvas.getByText('Name must be at least 5 characters long.')
    ).toBeInTheDocument();

    // Test validation with valid input
    await userEvent.clear(input);
    await userEvent.type(input, 'valid name', { delay: 50 });
    await userEvent.click(button);
    await expect(canvas.getByText('Name is valid!')).toBeInTheDocument();
  },
  render: function StatefulValidationStory() {
    const [value, setValue] = useState('');
    const [state, setState] = useState<'idle' | 'error' | 'success'>('idle');

    const handleValidate = () => {
      if (value.length === 0) {
        setState('error');
      } else if (value.length < 5) {
        setState('error');
      } else {
        setState('success');
      }
    };

    return (
      <div className="w-[400px] space-y-3">
        <div className="space-y-2">
          <Label htmlFor="validation-input">Name</Label>
          <Input
            id="validation-input"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setState('idle');
            }}
            placeholder="Enter at least 5 characters"
          />
          {state === 'idle' && (
            <HelperText size="sm">
              Enter your name and click validate.
            </HelperText>
          )}
          {state === 'error' && (
            <HelperText size="sm" isError>
              Name must be at least 5 characters long.
            </HelperText>
          )}
          {state === 'success' && (
            <HelperText size="sm" isSuccess icon={<IconCircleCheck />}>
              Name is valid!
            </HelperText>
          )}
        </div>
        <Button onClick={handleValidate}>Validate</Button>
      </div>
    );
  },
};
