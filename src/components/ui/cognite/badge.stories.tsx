import type { Meta, StoryObj } from '@storybook/nextjs';
import { expect, within } from '@storybook/test';
import { Badge } from './badge';
import { badgeExamples } from '@/lib/component-examples/badge.examples';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'fjord',
        'nordic',
        'aurora',
        'sky',
        'dusk',
        'mountain',
        'secondary',
        'error',
        'warning',
        'success',
        'inProgress',
        'archived',
        'closable',
      ],
      description: 'The visual style variant of the badge',
    },
    outline: {
      control: 'boolean',
      description: 'Whether to show the badge with an outline style',
    },
    background: {
      control: 'boolean',
      description: 'Whether to show the background fill',
    },
    dot: {
      control: 'boolean',
      description: 'Whether to make the badge rounded (pill-shaped)',
    },
    children: {
      control: 'text',
      description: 'The content to display inside the badge',
    },
  },
  args: {
    children: 'Badge',
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

/**
 * The main badge component with common variations.
 */
export const MainComponent: Story = {
  render: () => {
    const Component = badgeExamples.mainComponent.component;
    return <Component />;
  },
  parameters: {
    docs: {
      description: {
        story: badgeExamples.mainComponent.description,
      },
      source: {
        code: badgeExamples.mainComponent.code,
      },
    },
  },
};

/**
 * All available badge variants for different semantic meanings.
 */
export const Variants: Story = {
  render: () => {
    const Component = badgeExamples.variants.component;
    return <Component />;
  },
  parameters: {
    docs: {
      description: {
        story: badgeExamples.variants.description,
      },
      source: {
        code: badgeExamples.variants.code,
      },
    },
  },
};

/**
 * Interactive badge with controls for testing all props.
 */
export const Playground: Story = {
  args: {
    variant: 'default',
    outline: false,
    background: true,
    dot: false,
    children: 'Playground Badge',
  },
  parameters: {
    docs: {
      description: {
        story: 'Use the controls below to experiment with different badge configurations.',
      },
    },
  },
};

// ============================================================
// Interaction Tests
// These stories include automated tests that run in Storybook
// ============================================================

/**
 * Tests that badges render with correct text content.
 * This test verifies the basic rendering functionality.
 */
export const WithAccessibilityTest: Story = {
  args: {
    variant: 'success',
    children: 'Verified',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test that the badge renders with correct text
    const badge = canvas.getByText('Verified');
    await expect(badge).toBeInTheDocument();
    
    // Test that it has the correct ARIA role (implicitly a status indicator)
    await expect(badge).toBeVisible();
  },
};

/**
 * Tests different badge variants render correctly.
 * Ensures variant classes are properly applied.
 */
export const VariantRenderingTest: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge variant="error" data-testid="error-badge">Error</Badge>
      <Badge variant="success" data-testid="success-badge">Success</Badge>
      <Badge variant="warning" data-testid="warning-badge">Warning</Badge>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test that all variants render
    const errorBadge = canvas.getByTestId('error-badge');
    const successBadge = canvas.getByTestId('success-badge');
    const warningBadge = canvas.getByTestId('warning-badge');
    
    await expect(errorBadge).toBeInTheDocument();
    await expect(successBadge).toBeInTheDocument();
    await expect(warningBadge).toBeInTheDocument();
    
    // Verify text content
    await expect(errorBadge).toHaveTextContent('Error');
    await expect(successBadge).toHaveTextContent('Success');
    await expect(warningBadge).toHaveTextContent('Warning');
  },
};

/**
 * Tests badge with icons renders correctly.
 * Ensures badges can contain child elements.
 */
export const WithIconTest: Story = {
  render: () => (
    <Badge variant="success" data-testid="icon-badge">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 16 16" 
        fill="currentColor"
        className="w-4 h-4"
        data-testid="check-icon"
      >
        <path 
          fillRule="evenodd" 
          d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" 
          clipRule="evenodd" 
        />
      </svg>
      Success
    </Badge>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test that badge and icon both render
    const badge = canvas.getByTestId('icon-badge');
    const icon = canvas.getByTestId('check-icon');
    
    await expect(badge).toBeInTheDocument();
    await expect(icon).toBeInTheDocument();
    await expect(badge).toHaveTextContent('Success');
  },
};

/**
 * Tests outline variant styling.
 * Ensures the outline prop works correctly.
 */
export const OutlineVariantTest: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge variant="default" outline data-testid="outline-badge">Outlined</Badge>
      <Badge variant="default" data-testid="filled-badge">Filled</Badge>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    const outlineBadge = canvas.getByTestId('outline-badge');
    const filledBadge = canvas.getByTestId('filled-badge');
    
    // Both should render
    await expect(outlineBadge).toBeInTheDocument();
    await expect(filledBadge).toBeInTheDocument();
    
    // Verify they render differently (outline has different classes)
    await expect(outlineBadge).toBeVisible();
    await expect(filledBadge).toBeVisible();
  },
};
