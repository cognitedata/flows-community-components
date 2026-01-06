import type { Meta, StoryObj } from '@storybook/nextjs';
import { expect } from '@storybook/jest';
import { userEvent, within } from '@storybook/testing-library';
import { Badge } from './badge';
import {
  IconAlertHexagon,
  IconAlertTriangle,
  IconArchive,
  IconCircleCheck,
  IconHexagon,
  IconInnerShadowTopLeft,
  IconX,
  IconUser,
  IconStar,
} from '@tabler/icons-react';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    // Appearance
    variant: {
      control: 'select',
      options: [
        'default',
        'fjord',
        'nordic',
        'aurora',
        'sky',
        'dusk',
        'orange',
        'gray',
        'mountain',
        'secondary',
        'error',
        'warning',
        'success',
        'inProgress',
        'archived',
        'closable',
      ],
      description: 'Visual style variant of the badge',
      table: {
        category: 'Appearance',
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    outline: {
      control: 'boolean',
      description: 'Display as an outlined badge with border only',
      table: {
        category: 'Appearance',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    background: {
      control: 'boolean',
      description: 'Whether to display background fill',
      table: {
        category: 'Appearance',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    dot: {
      control: 'boolean',
      description: 'Display as a circular dot indicator',
      table: {
        category: 'Appearance',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    urgent: {
      control: 'boolean',
      description: 'Mark as urgent (applies to dot variant)',
      table: {
        category: 'Appearance',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },

    // Content
    children: {
      control: 'text',
      description: 'Content to display inside the badge',
      table: {
        category: 'Content',
        type: { summary: 'ReactNode' },
      },
    },

    // Advanced
    asChild: {
      control: 'boolean',
      description: 'Render as child component using Radix Slot',
      table: {
        category: 'Advanced',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
      table: {
        category: 'Advanced',
        type: { summary: 'string' },
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

/**
 * Fjord variant - blue-toned for observations and data
 */
export const Fjord: Story = {
  args: {
    variant: 'fjord',
    children: 'Observations',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Fjord variant uses a blue colour scheme ideal for observations, data points, and informational content. This variant helps differentiate data-related badges in your interface.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByText('Observations');

    await expect(badge).toBeInTheDocument();
    await expect(badge).toHaveAttribute('data-slot', 'badge');
    await expect(badge).toHaveClass('bg-decorative-background-fjord');
  },
};

/**
 * Aurora variant - vibrant for troubleshooting and alerts
 */
export const Aurora: Story = {
  args: {
    variant: 'aurora',
    children: 'Troubleshooting',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Aurora variant features a vibrant colour scheme perfect for troubleshooting, alerts, and attention-grabbing labels. Use this when you need to highlight important information.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByText('Troubleshooting');

    await expect(badge).toBeInTheDocument();
    await expect(badge).toHaveClass('bg-decorative-background-aurora');
  },
};

/**
 * Mountain variant - green-toned for plans and goals
 */
export const Mountain: Story = {
  render: (args) => (
    <Badge {...args}>
      <IconHexagon className="size-3" />
      Plans
    </Badge>
  ),
  args: {
    variant: 'mountain',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Mountain variant uses a green colour scheme suitable for plans, goals, and growth-related content. Perfect for project statuses and achievement indicators. Can be combined with icons.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByText('Plans');

    await expect(badge).toBeInTheDocument();
    await expect(badge).toHaveClass('bg-decorative-background-mountain');
    // Verify icon is present
    const icon = badge.querySelector('svg');
    await expect(icon).toBeInTheDocument();
  },
};

/**
 * Dusk variant - purple-toned for RCA and analysis
 */
export const Dusk: Story = {
  args: {
    variant: 'dusk',
    children: 'RCA',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Dusk variant features a purple colour scheme ideal for Root Cause Analysis (RCA), investigative work, and analytical content. Use this variant to highlight review and analysis activities.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByText('RCA');

    await expect(badge).toBeInTheDocument();
    await expect(badge).toHaveClass('bg-decorative-background-dusk');
  },
};

/**
 * Secondary variant - neutral for general use
 */
export const Secondary: Story = {
  render: (args) => (
    <Badge {...args}>
      <IconHexagon className="size-3 rotate-90" />
      Asset
    </Badge>
  ),
  args: {
    variant: 'secondary',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Secondary variant provides a neutral, understated appearance for general-purpose badges. Ideal when you need to display information without drawing too much attention.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByText('Asset');

    await expect(badge).toBeInTheDocument();
    await expect(badge).toHaveClass('bg-secondary');
    // Verify rotated icon
    const icon = badge.querySelector('svg');
    await expect(icon).toHaveClass('rotate-90');
  },
};

/**
 * Error variant - red for errors and critical issues
 */
export const Error: Story = {
  render: (args) => (
    <Badge {...args}>
      <IconAlertHexagon className="size-3" />
      Error
    </Badge>
  ),
  args: {
    variant: 'error',
    background: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Error variant uses a red colour scheme to indicate errors, failures, and critical issues. This variant immediately draws attention to problems that need resolution. Shown here without background fill.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByText('Error');

    await expect(badge).toBeInTheDocument();
    await expect(badge).toHaveClass('bg-transparent');
    await expect(badge).toHaveClass('text-destructive-foreground');
  },
};

/**
 * Error variant with outline - red for errors and critical issues
 */
export const ErrorOutline: Story = {
  render: (args) => (
    <Badge {...args}>
      <IconAlertHexagon className="size-3" />
      Error
    </Badge>
  ),
  args: {
    variant: 'error',
    outline: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Error variant with outline styling for a more subtle approach to error indication. The outline prop removes the background and adds a border, making it less visually dominant while still conveying importance.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByText('Error');

    await expect(badge).toBeInTheDocument();
    await expect(badge).toHaveClass('border-current');
    await expect(badge).toHaveClass('px-0.75');
  },
};

/**
 * Warning variant - orange/yellow for warnings
 */
export const Warning: Story = {
  render: (args) => (
    <Badge {...args}>
      <IconAlertTriangle className="size-3" />
      Warning
    </Badge>
  ),
  args: {
    variant: 'warning',
    background: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Warning variant uses an orange/yellow colour scheme for warnings, cautions, and issues requiring attention but not critical. Use this when you want to alert users without causing alarm.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByText('Warning');

    await expect(badge).toBeInTheDocument();
    await expect(badge).toHaveClass('text-warning-foreground');
    // Verify alert icon is present
    const icon = badge.querySelector('svg');
    await expect(icon).toBeInTheDocument();
  },
};

/**
 * Warning variant with outline - orange/yellow for warnings
 */
export const WarningOutline: Story = {
  render: (args) => (
    <Badge {...args}>
      <IconAlertTriangle className="size-3" />
      Warning
    </Badge>
  ),
  args: {
    variant: 'warning',
    outline: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Warning variant with outline styling provides a more subtle warning indicator. The outline prop makes it less prominent while still conveying caution.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByText('Warning');

    await expect(badge).toBeInTheDocument();
    await expect(badge).toHaveClass('border-current');
  },
};

/**
 * Success variant - green for successful operations
 */
export const Success: Story = {
  render: (args) => (
    <Badge {...args}>
      <IconCircleCheck className="size-3" />
      Success
    </Badge>
  ),
  args: {
    variant: 'success',
    background: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Success variant uses a green colour scheme to indicate successful operations, completed tasks, and positive outcomes. Perfect for confirmations and achievement indicators.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByText('Success');

    await expect(badge).toBeInTheDocument();
    await expect(badge).toHaveClass('text-success-foreground');
    // Verify check icon is present
    const icon = badge.querySelector('svg');
    await expect(icon).toBeInTheDocument();
  },
};

/**
 * In Progress variant - for ongoing operations
 */
export const InProgress: Story = {
  render: (args) => (
    <Badge {...args}>
      <IconInnerShadowTopLeft className="size-3" />
      In progress
    </Badge>
  ),
  args: {
    variant: 'inProgress',
    background: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'In Progress variant indicates ongoing operations, tasks in process, or active states. Use this to show users that something is currently happening or being worked on.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByText('In progress');

    await expect(badge).toBeInTheDocument();
    await expect(badge).toHaveClass('text-neutral-foreground');
  },
};

/**
 * Archived variant - for archived or inactive items
 */
export const Archived: Story = {
  render: (args) => (
    <Badge {...args}>
      <IconArchive className="size-3" />
      Archived
    </Badge>
  ),
  args: {
    variant: 'archived',
    background: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Archived variant is designed for archived, inactive, or deprecated items. Use this to clearly indicate content that is no longer active but still accessible.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByText('Archived');

    await expect(badge).toBeInTheDocument();
    await expect(badge).toHaveClass('text-undefined-foreground');
    // Verify archive icon is present
    const icon = badge.querySelector('svg');
    await expect(icon).toBeInTheDocument();
  },
};

/**
 * All Variants Overview
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="fjord">Fjord</Badge>
      <Badge variant="nordic">Nordic</Badge>
      <Badge variant="aurora">Aurora</Badge>
      <Badge variant="sky">Sky</Badge>
      <Badge variant="dusk">Dusk</Badge>
      <Badge variant="orange">Orange</Badge>
      <Badge variant="gray">Gray</Badge>
      <Badge variant="mountain">Mountain</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="inProgress">In Progress</Badge>
      <Badge variant="archived">Archived</Badge>
      <Badge variant="closable">
        Closable
        <IconX className="size-3" />
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Overview of all available badge variants showing the full colour palette and semantic options. Each variant is designed for specific use cases and contexts.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify all variants render
    await expect(canvas.getByText('Default')).toBeInTheDocument();
    await expect(canvas.getByText('Fjord')).toBeInTheDocument();
    await expect(canvas.getByText('Nordic')).toBeInTheDocument();
    await expect(canvas.getByText('Closable')).toBeInTheDocument();
  },
};

/**
 * Interactive playground for testing different configurations.
 * Use the controls below to experiment with all available props.
 */
export const Playground: Story = {
  args: {
    variant: 'fjord',
    children: 'Badge',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground for experimenting with all badge props. Use the controls panel to adjust variant, outline, background, dot, and other properties in real-time.',
      },
    },
  },
};

/**
 * Outline style - badges with border only, no background fill.
 * Shows how different variants look with the outline prop.
 */
export const OutlineStyle: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="fjord" outline>
        Fjord
      </Badge>
      <Badge variant="aurora" outline>
        Aurora
      </Badge>
      <Badge variant="mountain" outline>
        Mountain
      </Badge>
      <Badge variant="dusk" outline>
        Dusk
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Outline styling removes the background fill and adds a coloured border. This creates a more subtle, lightweight appearance perfect for dense interfaces or when you need multiple badges without overwhelming the design.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badges = canvasElement.querySelectorAll('[data-slot="badge"]');

    // Verify all outlined badges have border-current class
    badges.forEach((badge) => {
      expect(badge).toHaveClass('border-current');
    });

    await expect(canvas.getByText('Fjord')).toBeInTheDocument();
  },
};

/**
 * No background - badges without background fill.
 * Shows how different variants look without backgrounds.
 */
export const NoBackground: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="fjord" background={false}>
        Fjord
      </Badge>
      <Badge variant="aurora" background={false}>
        Aurora
      </Badge>
      <Badge variant="mountain" background={false}>
        Mountain
      </Badge>
      <Badge variant="dusk" background={false}>
        Dusk
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'No background variant removes the background fill entirely, leaving only the coloured text. This creates the most minimal appearance, ideal for compact layouts or when layering badges over coloured surfaces.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badges = canvasElement.querySelectorAll('[data-slot="badge"]');

    // Verify all badges have transparent background
    badges.forEach((badge) => {
      expect(badge).toHaveClass('bg-transparent');
    });

    await expect(canvas.getByText('Dusk')).toBeInTheDocument();
  },
};

/**
 * Dot Indicators - minimal status indicators
 */
export const DotIndicators: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2">
        <Badge dot urgent />
        <span className="text-sm">Urgent</span>
      </div>
      <div className="flex items-center gap-2">
        <Badge dot />
        <span className="text-sm">Normal</span>
      </div>
      <div className="flex items-center gap-2">
        <Badge dot urgent>
          3
        </Badge>
        <span className="text-sm">Urgent with count</span>
      </div>
      <div className="flex items-center gap-2">
        <Badge dot>5</Badge>
        <span className="text-sm">Normal with count</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Dot indicators provide minimal status visualization. When empty, they render as small coloured dots. The `urgent` prop changes the colour to destructive red. Dots can also contain short content like numbers.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const badges = canvasElement.querySelectorAll('[data-slot="badge"]');

    // Verify dot badges have rounded class
    badges.forEach((badge) => {
      expect(badge).toHaveClass('rounded-full');
    });

    // Check first dot is urgent and empty (size-2)
    const firstDot = badges[0] as HTMLElement;
    await expect(firstDot).toHaveClass('size-2');
    await expect(firstDot).toHaveClass('bg-destructive-foreground');
  },
};

/**
 * Click Interaction - testing interactive badges
 */
export const ClickInteraction: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge
        variant="closable"
        onClick={() => alert('Badge clicked!')}
        className="cursor-pointer"
      >
        Clickable
        <IconX className="size-3" />
      </Badge>
      <Badge
        variant="closable"
        onClick={() => alert('Filter removed')}
        className="cursor-pointer"
      >
        Filter: Status
        <IconX className="size-3" />
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Interactive badges that respond to click events. The `closable` variant includes hover states and cursor styling. Commonly used for removable tags, filters, or dismissible notifications.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByText('Clickable');

    await expect(badge).toBeInTheDocument();
    await expect(badge).toHaveClass('cursor-pointer');

    // Test hover interaction
    await userEvent.hover(badge);
    await expect(badge).toHaveClass('hover:bg-secondary-hover');
  },
};

/**
 * Accessibility - ARIA labels and semantic usage
 */
export const Accessibility: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <Badge variant="success" aria-label="Status: Completed">
          <IconCircleCheck className="size-3" aria-hidden="true" />
          Completed
        </Badge>
        <Badge variant="error" aria-label="Status: Failed">
          <IconAlertHexagon className="size-3" aria-hidden="true" />
          Failed
        </Badge>
      </div>
      <div className="flex items-center gap-2">
        <Badge dot urgent aria-label="Urgent notification" />
        <span id="notification-desc">3 urgent items</span>
      </div>
      <Badge
        variant="closable"
        role="button"
        tabIndex={0}
        aria-label="Remove tag: JavaScript"
        onKeyDown={(e) => e.key === 'Enter' && alert('Tag removed')}
      >
        JavaScript
        <IconX className="size-3" aria-hidden="true" />
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Accessibility features for badges include proper ARIA labels, semantic roles, keyboard navigation support, and icon hiding. Interactive badges should have role="button" and keyboard handlers.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check ARIA labels
    const completedBadge = canvas.getByLabelText('Status: Completed');
    await expect(completedBadge).toBeInTheDocument();

    // Check keyboard navigation on interactive badge
    const interactiveBadge = canvas.getByRole('button', {
      name: /Remove tag: JavaScript/i,
    });
    await expect(interactiveBadge).toBeInTheDocument();
    await expect(interactiveBadge).toHaveAttribute('tabIndex', '0');

    // Test keyboard interaction
    interactiveBadge.focus();
    await expect(interactiveBadge).toHaveFocus();
  },
};

/**
 * Visual Regression - baseline for automated visual testing
 */
export const VisualRegression: Story = {
  render: () => (
    <div className="space-y-4 p-4">
      <div className="flex flex-wrap gap-2">
        <Badge variant="fjord">Fjord</Badge>
        <Badge variant="aurora">Aurora</Badge>
        <Badge variant="mountain">Mountain</Badge>
        <Badge variant="error">Error</Badge>
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge variant="fjord" outline>
          Outlined
        </Badge>
        <Badge variant="aurora" background={false}>
          No BG
        </Badge>
        <Badge dot urgent />
        <Badge dot>5</Badge>
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge variant="success">
          <IconCircleCheck className="size-3" />
          With Icon
        </Badge>
        <Badge variant="closable">
          Closable
          <IconX className="size-3" />
        </Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Baseline story for visual regression testing with Chromatic. Includes all major variants, styles, and configurations to detect unintended visual changes.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const badges = canvasElement.querySelectorAll('[data-slot="badge"]');
    await expect(badges.length).toBeGreaterThan(0);
  },
};

/**
 * Edge Case: Empty Content
 */
export const EdgeCaseEmpty: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="fjord"></Badge>
      <Badge variant="error"></Badge>
      <Badge variant="secondary"></Badge>
      <span className="text-sm text-muted-foreground">(Empty badges)</span>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Empty badges still render with minimal spacing. Consider using dot variant for truly minimal indicators.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const badges = canvasElement.querySelectorAll('[data-slot="badge"]');
    await expect(badges.length).toBe(3);

    // Empty badges should still have badge styling
    badges.forEach((badge) => {
      expect(badge).toHaveClass('inline-flex');
    });
  },
};

/**
 * Edge Case: Very Long Text
 */
export const EdgeCaseLongText: Story = {
  render: () => (
    <div className="flex flex-col gap-2 max-w-md">
      <Badge variant="fjord">
        This is an extremely long badge text that should demonstrate how the
        component handles lengthy content
      </Badge>
      <Badge variant="aurora" className="max-w-xs">
        Constrained width with very long text that might wrap or truncate
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Very long text in badges. The component uses whitespace-nowrap by default, so content will extend. Add max-width and wrapping classes if needed.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const longBadge = canvas.getByText(/extremely long badge text/i);

    await expect(longBadge).toBeInTheDocument();
    await expect(longBadge).toHaveClass('whitespace-nowrap');
  },
};

/**
 * Edge Case: Special Characters
 */
export const EdgeCaseSpecialCharacters: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="fjord">{'<HTML/>'}</Badge>
      <Badge variant="aurora">{'Status: ⚠️'}</Badge>
      <Badge variant="mountain">{'Quantity: 1,234'}</Badge>
      <Badge variant="dusk">{'Price: $99.99'}</Badge>
      <Badge variant="error">{'Error: #404'}</Badge>
      <Badge variant="secondary">{'User: <script>'}</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Badges with special characters, emojis, HTML-like content, and various symbols. Content is safely rendered as text.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify special characters are rendered properly
    await expect(canvas.getByText('<HTML/>')).toBeInTheDocument();
    await expect(canvas.getByText('Status: ⚠️')).toBeInTheDocument();
    await expect(canvas.getByText('User: <script>')).toBeInTheDocument();
  },
};

/**
 * Edge Case: Icon Only
 */
export const EdgeCaseIconOnly: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="success">
        <IconCircleCheck className="size-3" />
      </Badge>
      <Badge variant="error">
        <IconAlertHexagon className="size-3" />
      </Badge>
      <Badge variant="warning">
        <IconAlertTriangle className="size-3" />
      </Badge>
      <Badge variant="inProgress">
        <IconInnerShadowTopLeft className="size-3" />
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Badges containing only icons, no text. Ensure proper ARIA labels are provided for accessibility when using icon-only badges.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const badges = canvasElement.querySelectorAll('[data-slot="badge"]');

    // Each badge should have an icon
    badges.forEach((badge) => {
      const icon = badge.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });
  },
};

/**
 * Edge Case: Mixed Content
 */
export const EdgeCaseMixedContent: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="fjord">
        <IconUser className="size-3" />
        Admin
        <span className="ml-1 opacity-70">(3)</span>
      </Badge>
      <Badge variant="success">
        <IconStar className="size-3 fill-current" />
        Premium
        <span className="text-xs ml-1">★★★</span>
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Badges with mixed content including icons, text, and nested elements. The component handles complex children gracefully.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText(/Admin/)).toBeInTheDocument();
    await expect(canvas.getByText(/Premium/)).toBeInTheDocument();
  },
};

/**
 * Edge Case: Width Constraints
 */
export const EdgeCaseWidthConstraints: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <div className="w-24">
        <Badge variant="fjord" className="w-full justify-center">
          Full Width
        </Badge>
      </div>
      <div className="w-32">
        <Badge variant="aurora" className="max-w-full truncate">
          Truncated Long Text
        </Badge>
      </div>
      <Badge variant="mountain" className="min-w-[120px] justify-center">
        Min Width
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Testing badge behaviour with various width constraints. Badges are naturally fit-content but can be adjusted with CSS classes.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const fullWidthBadge = canvas.getByText('Full Width');

    await expect(fullWidthBadge).toHaveClass('w-full');
    await expect(fullWidthBadge).toHaveClass('justify-center');
  },
};

/**
 * Edge Case: Grouped Badges
 */
export const EdgeCaseGroupedBadges: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-1">
        <Badge variant="fjord">Tag 1</Badge>
        <Badge variant="fjord">Tag 2</Badge>
        <Badge variant="fjord">Tag 3</Badge>
        <Badge variant="fjord">Tag 4</Badge>
        <Badge variant="fjord">Tag 5</Badge>
        <Badge variant="fjord">Tag 6</Badge>
        <Badge variant="fjord">Tag 7</Badge>
        <Badge variant="fjord">Tag 8</Badge>
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge variant="error">High</Badge>
        <Badge variant="warning">Medium</Badge>
        <Badge variant="success">Low</Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Multiple badges grouped together, simulating tag lists or filter sets. Demonstrates proper spacing and wrapping behaviour.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const badges = canvasElement.querySelectorAll('[data-slot="badge"]');
    await expect(badges.length).toBe(11);
  },
};

/**
 * Edge Case: Tiny Dot Variants
 */
export const EdgeCaseTinyDots: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-1">
        <Badge dot urgent />
        <Badge dot urgent />
        <Badge dot urgent />
      </div>
      <div className="flex items-center gap-1">
        <Badge dot />
        <Badge dot />
        <Badge dot />
        <Badge dot />
        <Badge dot />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Multiple tiny dot indicators in sequence. Useful for showing presence, status, or notification counts in a minimal way.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const dots = canvasElement.querySelectorAll('[data-slot="badge"]');

    // All dots should be tiny
    dots.forEach((dot) => {
      expect(dot).toHaveClass('size-2');
      expect(dot).toHaveClass('rounded-full');
    });
  },
};
