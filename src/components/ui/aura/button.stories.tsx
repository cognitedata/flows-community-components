import type { Meta, StoryObj } from '@storybook/nextjs';
import { Button } from './button';
import type { ComponentProps } from 'react';
import {
  IconPlus,
  IconBookmark,
  IconTrash,
  IconExternalLink,
  IconLoader2,
  IconDownload,
  IconUpload,
  IconSend,
} from '@tabler/icons-react';

// Extended type for story args that includes custom controls
type ButtonStoryArgs = ComponentProps<typeof Button> & {
  iconPosition?: 'none' | 'left' | 'right';
};

const meta: Meta<ButtonStoryArgs> = {
  title: 'UI/Button',
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
      description: 'The visual style variant',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon', 'icon-sm', 'icon-lg'],
      description: 'The size of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    asChild: {
      control: 'boolean',
      description: 'Whether to use Slot for composition',
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<ButtonStoryArgs>;

// Helper to render buttons based on controls
const renderButton = (
  args: ButtonStoryArgs,
  defaultVariant?: ButtonStoryArgs['variant'],
  iconPosition?: 'none' | 'left' | 'right'
) => {
  const { size, disabled, variant: argsVariant } = args;
  const variant = argsVariant || defaultVariant || 'default';
  const position =
    iconPosition !== undefined ? iconPosition : args.iconPosition;

  if (position === 'none') {
    return (
      <Button variant={variant} size={size} disabled={disabled}>
        Button
      </Button>
    );
  }

  if (position === 'left') {
    return (
      <Button variant={variant} size={size} disabled={disabled}>
        <IconPlus />
        Button
      </Button>
    );
  }

  if (position === 'right') {
    return (
      <Button variant={variant} size={size} disabled={disabled}>
        Button
        <IconExternalLink />
      </Button>
    );
  }

  return (
    <Button variant={variant} size={size} disabled={disabled}>
      <IconPlus />
    </Button>
  );
};

/**
 * Primary button variant for main actions
 */
export const Default: Story = {
  render: (args) => renderButton(args),
  args: {
    variant: 'default',
    size: 'default',
    disabled: false,
    iconPosition: 'left',
  },
  argTypes: {
    iconPosition: {
      control: 'select',
      options: ['none', 'left', 'right'],
      description: 'Icon position',
    },
  },
};

/**
 * Secondary button variant for less prominent actions
 */
export const Secondary: Story = {
  render: (args) => renderButton(args),
  args: {
    variant: 'secondary',
    size: 'default',
    disabled: false,
    iconPosition: 'left',
  },
  argTypes: {
    iconPosition: {
      control: 'select',
      options: ['none', 'left', 'right'],
      description: 'Icon position',
    },
  },
};

/**
 * Destructive button variant for dangerous or irreversible actions
 */
export const Destructive: Story = {
  render: (args) => {
    const { variant, size, disabled, iconPosition } = args;

    if (iconPosition === 'none') {
      return (
        <Button variant={variant} size={size} disabled={disabled}>
          Delete
        </Button>
      );
    }

    if (iconPosition === 'left') {
      return (
        <Button variant={variant} size={size} disabled={disabled}>
          <IconTrash />
          Delete
        </Button>
      );
    }

    return (
      <Button variant={variant} size={size} disabled={disabled}>
        Delete
        <IconTrash />
      </Button>
    );
  },
  args: {
    variant: 'destructive',
    size: 'default',
    disabled: false,
    iconPosition: 'left',
  },
  argTypes: {
    iconPosition: {
      control: 'select',
      options: ['none', 'left', 'right'],
      description: 'Icon position',
    },
  },
};

/**
 * Outline button variant for secondary actions with more emphasis than ghost
 */
export const Outline: Story = {
  render: (args) => renderButton(args),
  args: {
    variant: 'outline',
    size: 'default',
    disabled: false,
    iconPosition: 'left',
  },
  argTypes: {
    iconPosition: {
      control: 'select',
      options: ['none', 'left', 'right'],
      description: 'Icon position',
    },
  },
};

/**
 * Ghost button variant for subtle actions
 */
export const Ghost: Story = {
  render: (args) => {
    const { variant, size, disabled, iconPosition } = args;

    if (iconPosition === 'none') {
      return (
        <Button variant={variant} size={size} disabled={disabled}>
          Button
        </Button>
      );
    }

    if (iconPosition === 'left') {
      return (
        <Button variant={variant} size={size} disabled={disabled}>
          <IconDownload />
          Download
        </Button>
      );
    }

    return (
      <Button variant={variant} size={size} disabled={disabled}>
        Download
        <IconDownload />
      </Button>
    );
  },
  args: {
    variant: 'ghost',
    size: 'default',
    disabled: false,
    iconPosition: 'left',
  },
  argTypes: {
    iconPosition: {
      control: 'select',
      options: ['none', 'left', 'right'],
      description: 'Icon position',
    },
  },
};

/**
 * Link button variant for navigation
 */
export const Link: Story = {
  render: (args) => {
    const { variant, size, disabled, iconPosition } = args;

    if (iconPosition === 'none') {
      return (
        <Button variant={variant} size={size} disabled={disabled}>
          Learn more
        </Button>
      );
    }

    if (iconPosition === 'left') {
      return (
        <Button variant={variant} size={size} disabled={disabled}>
          <IconExternalLink />
          Learn more
        </Button>
      );
    }

    return (
      <Button variant={variant} size={size} disabled={disabled}>
        Learn more
        <IconExternalLink />
      </Button>
    );
  },
  args: {
    variant: 'link',
    size: 'default',
    disabled: false,
    iconPosition: 'right',
  },
  argTypes: {
    iconPosition: {
      control: 'select',
      options: ['none', 'left', 'right'],
      description: 'Icon position',
    },
  },
};

/**
 * Icon-only buttons for all variants
 */
export const IconOnly: Story = {
  render: (args) => {
    const { variant, size, disabled } = args;
    return (
      <Button variant={variant} size={size} disabled={disabled}>
        <IconPlus />
      </Button>
    );
  },
  args: {
    variant: 'default',
    size: 'icon',
    disabled: false,
  },
};

/**
 * Loading state button
 */
export const Loading: Story = {
  render: (args) => {
    const { variant, size } = args;
    return (
      <Button variant={variant} size={size} disabled>
        <IconLoader2 className="animate-spin" />
        Loading...
      </Button>
    );
  },
  args: {
    variant: 'default',
    size: 'default',
  },
};

// ============================================================================
// SHOWCASE STORIES (Documentation only - not for automated testing)
// ============================================================================

/**
 * 📚 Overview of all button variants
 *
 * @note For documentation only. Use individual variant stories for testing.
 */
export const ShowcaseVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button variant="default">
        <IconPlus />
        Default
      </Button>
      <Button variant="secondary">
        <IconBookmark />
        Secondary
      </Button>
      <Button variant="destructive">
        <IconTrash />
        Destructive
      </Button>
      <Button variant="outline">
        <IconExternalLink />
        Outline
      </Button>
      <Button variant="ghost">
        <IconDownload />
        Ghost
      </Button>
      <Button variant="link">
        <IconExternalLink />
        Link
      </Button>
    </div>
  ),
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

/**
 * 📚 All sizes demonstration
 *
 * @note For documentation only. Use individual variant stories for testing.
 */
export const ShowcaseSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">Text buttons</p>
        <div className="flex items-center gap-3">
          <Button size="sm">
            <IconPlus />
            Small
          </Button>
          <Button size="default">
            <IconPlus />
            Default
          </Button>
          <Button size="lg">
            <IconPlus />
            Large
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">Icon buttons</p>
        <div className="flex items-center gap-3">
          <Button size="icon-sm">
            <IconPlus />
          </Button>
          <Button size="icon">
            <IconPlus />
          </Button>
          <Button size="icon-lg">
            <IconPlus />
          </Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

/**
 * 📚 Common button combinations and patterns
 *
 * @note For documentation only. Use individual variant stories for testing.
 */
export const ShowcasePatterns: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">Action group</p>
        <div className="flex gap-2">
          <Button variant="default">
            <IconSend />
            Send
          </Button>
          <Button variant="outline">
            <IconUpload />
            Upload
          </Button>
          <Button variant="ghost" size="icon">
            <IconBookmark />
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">Toolbar</p>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon-sm">
            <IconPlus />
          </Button>
          <Button variant="ghost" size="icon-sm">
            <IconBookmark />
          </Button>
          <Button variant="ghost" size="icon-sm">
            <IconDownload />
          </Button>
          <Button variant="ghost" size="icon-sm">
            <IconTrash />
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">
          Primary & secondary actions
        </p>
        <div className="flex gap-2">
          <Button variant="outline">Cancel</Button>
          <Button variant="default">
            <IconSend />
            Submit
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">Loading states</p>
        <div className="flex gap-2">
          <Button disabled>
            <IconLoader2 className="animate-spin" />
            Loading...
          </Button>
          <Button variant="secondary" disabled>
            <IconLoader2 className="animate-spin" />
            Processing
          </Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

/**
 * 📚 Edge cases and special scenarios
 *
 * @note For documentation only. Not recommended patterns but tested for robustness.
 */
export const ShowcaseEdgeCases: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">Long text overflow</p>
        <div className="flex flex-wrap gap-3 max-w-md">
          <Button>
            This is a very long button text that should handle overflow
            gracefully
          </Button>
          <Button size="sm">This is also quite long for a small button</Button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">
          Emoji and special characters
        </p>
        <div className="flex flex-wrap gap-3">
          <Button>🚀 Launch</Button>
          <Button>❤️ Like</Button>
          <Button>⚙️ Settings</Button>
          <Button>→ Next</Button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">Single character</p>
        <div className="flex flex-wrap gap-3">
          <Button size="icon">+</Button>
          <Button size="icon">×</Button>
          <Button>A</Button>
          <Button size="sm">X</Button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">
          Mixed content with badges
        </p>
        <div className="flex flex-wrap gap-3">
          <Button>
            <IconPlus />
            Add
            <span className="ml-1 rounded bg-primary-foreground/20 px-1 py-0.5 text-xs">
              ⌘K
            </span>
          </Button>
          <Button variant="secondary">
            <IconBookmark />
            Save
            <span className="ml-2 rounded bg-secondary-foreground/10 px-1.5 py-0.5 text-xs font-normal">
              2
            </span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">
          Empty button (edge case)
        </p>
        <div className="flex flex-wrap gap-3">
          <Button size="sm"></Button>
          <Button size="default"></Button>
          <Button size="lg"></Button>
          <Button size="icon-sm"></Button>
          <Button size="icon"></Button>
          <Button size="icon-lg"></Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

/**
 * 📚 Complete variant × size matrix
 *
 * @note For documentation only. Use individual variant stories for testing.
 */
export const ShowcaseMatrix: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {/* Default */}
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">Default variant</p>
        <div className="flex items-center gap-3">
          <Button variant="default" size="sm">
            <IconPlus />
            Small
          </Button>
          <Button variant="default" size="default">
            <IconPlus />
            Default
          </Button>
          <Button variant="default" size="lg">
            <IconPlus />
            Large
          </Button>
          <Button variant="default" size="default" disabled>
            <IconPlus />
            Disabled
          </Button>
        </div>
      </div>

      {/* Secondary */}
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">Secondary variant</p>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm">
            <IconBookmark />
            Small
          </Button>
          <Button variant="secondary" size="default">
            <IconBookmark />
            Default
          </Button>
          <Button variant="secondary" size="lg">
            <IconBookmark />
            Large
          </Button>
          <Button variant="secondary" size="default" disabled>
            <IconBookmark />
            Disabled
          </Button>
        </div>
      </div>

      {/* Destructive */}
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">Destructive variant</p>
        <div className="flex items-center gap-3">
          <Button variant="destructive" size="sm">
            <IconTrash />
            Small
          </Button>
          <Button variant="destructive" size="default">
            <IconTrash />
            Default
          </Button>
          <Button variant="destructive" size="lg">
            <IconTrash />
            Large
          </Button>
          <Button variant="destructive" size="default" disabled>
            <IconTrash />
            Disabled
          </Button>
        </div>
      </div>

      {/* Outline */}
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">Outline variant</p>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <IconExternalLink />
            Small
          </Button>
          <Button variant="outline" size="default">
            <IconExternalLink />
            Default
          </Button>
          <Button variant="outline" size="lg">
            <IconExternalLink />
            Large
          </Button>
          <Button variant="outline" size="default" disabled>
            <IconExternalLink />
            Disabled
          </Button>
        </div>
      </div>

      {/* Ghost */}
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">Ghost variant</p>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm">
            <IconDownload />
            Small
          </Button>
          <Button variant="ghost" size="default">
            <IconDownload />
            Default
          </Button>
          <Button variant="ghost" size="lg">
            <IconDownload />
            Large
          </Button>
          <Button variant="ghost" size="default" disabled>
            <IconDownload />
            Disabled
          </Button>
        </div>
      </div>

      {/* Link */}
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">Link variant</p>
        <div className="flex items-center gap-3">
          <Button variant="link" size="sm">
            Small Link
          </Button>
          <Button variant="link" size="default">
            Default Link
          </Button>
          <Button variant="link" size="lg">
            Large Link
          </Button>
          <Button variant="link" size="default" disabled>
            Disabled Link
          </Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

// ============================================================================
// INTERACTION STATES (Focus, Hover, Validation)
// ============================================================================

/**
 * 🎯 Focus states demonstration
 *
 * Shows the focus-visible ring that appears when navigating with keyboard.
 * Try pressing Tab to navigate between buttons to see the focus ring.
 */
export const FocusStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">
          Press Tab to navigate and see focus rings
        </p>
        <div className="flex flex-wrap gap-3">
          <Button variant="default">
            <IconPlus />
            Default Focus
          </Button>
          <Button variant="secondary">
            <IconBookmark />
            Secondary Focus
          </Button>
          <Button variant="destructive">
            <IconTrash />
            Destructive Focus
          </Button>
          <Button variant="outline">
            <IconExternalLink />
            Outline Focus
          </Button>
          <Button variant="ghost">
            <IconDownload />
            Ghost Focus
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">Icon buttons with focus</p>
        <div className="flex flex-wrap gap-3">
          <Button variant="default" size="icon-sm">
            <IconPlus />
          </Button>
          <Button variant="secondary" size="icon">
            <IconBookmark />
          </Button>
          <Button variant="destructive" size="icon-lg">
            <IconTrash />
          </Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    chromatic: { disableSnapshot: false },
  },
};

/**
 * 🎨 Hover state comparison
 *
 * Side-by-side comparison of normal and hover states for all variants.
 * The right column simulates the hover state.
 */
export const HoverStates: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4 max-w-md">
        <div className="text-sm font-medium text-muted-foreground">Normal</div>
        <div className="text-sm font-medium text-muted-foreground">Hover</div>
      </div>

      {/* Default */}
      <div className="grid grid-cols-2 gap-4 max-w-md items-center">
        <Button variant="default">
          <IconPlus />
          Default
        </Button>
        <div className="[&>button]:bg-primary-hover dark:[&>button]:bg-primary-hover">
          <Button variant="default">
            <IconPlus />
            Default
          </Button>
        </div>
      </div>

      {/* Secondary */}
      <div className="grid grid-cols-2 gap-4 max-w-md items-center">
        <Button variant="secondary">
          <IconBookmark />
          Secondary
        </Button>
        <div className="[&>button]:bg-secondary-hover dark:[&>button]:bg-secondary-hover">
          <Button variant="secondary">
            <IconBookmark />
            Secondary
          </Button>
        </div>
      </div>

      {/* Destructive */}
      <div className="grid grid-cols-2 gap-4 max-w-md items-center">
        <Button variant="destructive">
          <IconTrash />
          Destructive
        </Button>
        <div className="[&>button]:bg-destructive-hover dark:[&>button]:bg-destructive-hover">
          <Button variant="destructive">
            <IconTrash />
            Destructive
          </Button>
        </div>
      </div>

      {/* Outline */}
      <div className="grid grid-cols-2 gap-4 max-w-md items-center">
        <Button variant="outline">
          <IconExternalLink />
          Outline
        </Button>
        <div className="[&>button]:bg-accent dark:[&>button]:bg-input/50">
          <Button variant="outline">
            <IconExternalLink />
            Outline
          </Button>
        </div>
      </div>

      {/* Ghost */}
      <div className="grid grid-cols-2 gap-4 max-w-md items-center">
        <Button variant="ghost">
          <IconDownload />
          Ghost
        </Button>
        <div className="[&>button]:bg-accent dark:[&>button]:bg-accent/50">
          <Button variant="ghost">
            <IconDownload />
            Ghost
          </Button>
        </div>
      </div>

      {/* Link */}
      <div className="grid grid-cols-2 gap-4 max-w-md items-center">
        <Button variant="link">
          <IconExternalLink />
          Link
        </Button>
        <div className="[&>button]:bg-accent/50 dark:[&>button]:bg-accent/30 [&>button]:underline">
          <Button variant="link">
            <IconExternalLink />
            Link
          </Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

/**
 * ⚠️ Validation states
 *
 * Demonstrates how buttons appear in invalid form states.
 * Uses aria-invalid to trigger special error styling.
 */
export const ValidationStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">
          Buttons with aria-invalid show error rings
        </p>
        <div className="flex flex-wrap gap-3">
          <Button variant="default" aria-invalid="true">
            <IconPlus />
            Invalid Default
          </Button>
          <Button variant="secondary" aria-invalid="true">
            <IconBookmark />
            Invalid Secondary
          </Button>
          <Button variant="outline" aria-invalid="true">
            <IconExternalLink />
            Invalid Outline
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">
          Normal vs Invalid comparison
        </p>
        <div className="grid grid-cols-2 gap-4 max-w-md">
          <Button variant="default">
            <IconSend />
            Submit
          </Button>
          <Button variant="default" aria-invalid="true">
            <IconSend />
            Submit (Invalid)
          </Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    chromatic: { disableSnapshot: false },
  },
};

// ============================================================================
// COMPOSITION PATTERNS (asChild, Links, Complex Children)
// ============================================================================

/**
 * 🔗 asChild composition pattern
 *
 * The asChild prop uses Radix UI Slot to allow buttons to render as different elements.
 * Perfect for making links look like buttons while maintaining proper semantics.
 */
export const AsChildComposition: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">
          Button styled as link (maintains button semantics)
        </p>
        <div className="flex flex-wrap gap-3">
          <Button variant="default">
            <IconPlus />
            Regular Button
          </Button>
          <Button variant="default" asChild>
            <a href="#example" onClick={(e) => e.preventDefault()}>
              <IconExternalLink />
              Link as Button
            </a>
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">
          All variants work with asChild
        </p>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" asChild>
            <a href="#docs" onClick={(e) => e.preventDefault()}>
              <IconBookmark />
              Documentation
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="#learn" onClick={(e) => e.preventDefault()}>
              Learn More
              <IconExternalLink />
            </a>
          </Button>
          <Button variant="ghost" asChild>
            <a href="#download" onClick={(e) => e.preventDefault()}>
              <IconDownload />
              Download
            </a>
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">Icon buttons as links</p>
        <div className="flex flex-wrap gap-3">
          <Button variant="default" size="icon" asChild>
            <a href="#add" onClick={(e) => e.preventDefault()}>
              <IconPlus />
            </a>
          </Button>
          <Button variant="secondary" size="icon-sm" asChild>
            <a href="#bookmark" onClick={(e) => e.preventDefault()}>
              <IconBookmark />
            </a>
          </Button>
          <Button variant="outline" size="icon-lg" asChild>
            <a href="#external" onClick={(e) => e.preventDefault()}>
              <IconExternalLink />
            </a>
          </Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

/**
 * 📐 Complete icon button size matrix
 *
 * Shows all three icon button sizes across all variants.
 * Demonstrates the difference between icon-sm, icon, and icon-lg.
 */
export const IconSizeMatrix: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {/* Default variant */}
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground font-medium">
          Default variant
        </p>
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center gap-2">
            <Button variant="default" size="icon-sm">
              <IconPlus />
            </Button>
            <span className="text-xs text-muted-foreground">icon-sm</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Button variant="default" size="icon">
              <IconPlus />
            </Button>
            <span className="text-xs text-muted-foreground">icon</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Button variant="default" size="icon-lg">
              <IconPlus />
            </Button>
            <span className="text-xs text-muted-foreground">icon-lg</span>
          </div>
        </div>
      </div>

      {/* Secondary variant */}
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground font-medium">
          Secondary variant
        </p>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="icon-sm">
            <IconBookmark />
          </Button>
          <Button variant="secondary" size="icon">
            <IconBookmark />
          </Button>
          <Button variant="secondary" size="icon-lg">
            <IconBookmark />
          </Button>
        </div>
      </div>

      {/* Destructive variant */}
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground font-medium">
          Destructive variant
        </p>
        <div className="flex items-center gap-3">
          <Button variant="destructive" size="icon-sm">
            <IconTrash />
          </Button>
          <Button variant="destructive" size="icon">
            <IconTrash />
          </Button>
          <Button variant="destructive" size="icon-lg">
            <IconTrash />
          </Button>
        </div>
      </div>

      {/* Outline variant */}
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground font-medium">
          Outline variant
        </p>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon-sm">
            <IconExternalLink />
          </Button>
          <Button variant="outline" size="icon">
            <IconExternalLink />
          </Button>
          <Button variant="outline" size="icon-lg">
            <IconExternalLink />
          </Button>
        </div>
      </div>

      {/* Ghost variant */}
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground font-medium">
          Ghost variant
        </p>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon-sm">
            <IconDownload />
          </Button>
          <Button variant="ghost" size="icon">
            <IconDownload />
          </Button>
          <Button variant="ghost" size="icon-lg">
            <IconDownload />
          </Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    chromatic: { disableSnapshot: false },
  },
};

/**
 * 🎨 Complex children patterns
 *
 * Buttons with multiple icons, badges, keyboard shortcuts, and mixed content.
 */
export const ComplexChildren: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">
          Buttons with badges and counts
        </p>
        <div className="flex flex-wrap gap-3">
          <Button variant="default">
            <IconPlus />
            Add Item
            <span className="ml-1 rounded bg-primary-foreground/20 px-1.5 py-0.5 text-xs font-semibold">
              ⌘K
            </span>
          </Button>
          <Button variant="secondary">
            <IconBookmark />
            Saved
            <span className="ml-2 rounded-full bg-secondary-foreground/10 px-2 py-0.5 text-xs font-semibold">
              12
            </span>
          </Button>
          <Button variant="outline">
            <IconUpload />
            Upload
            <span className="ml-1 rounded bg-accent px-1.5 py-0.5 text-xs">
              ⌘U
            </span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">Multiple icons</p>
        <div className="flex flex-wrap gap-3">
          <Button variant="default">
            <IconPlus />
            Create New
            <IconExternalLink />
          </Button>
          <Button variant="secondary">
            <IconDownload />
            Export Data
            <IconSend />
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">Icon on both sides</p>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline">
            <IconUpload />
            Upload File
            <IconExternalLink />
          </Button>
          <Button variant="ghost">
            <IconBookmark />
            Save for Later
            <IconPlus />
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">Status indicators</p>
        <div className="flex flex-wrap gap-3">
          <Button variant="default">
            <span className="size-2 rounded-full bg-green-500 animate-pulse" />
            Live Now
          </Button>
          <Button variant="secondary">
            <span className="size-2 rounded-full bg-yellow-500" />
            In Progress
          </Button>
          <Button variant="outline">
            <span className="size-2 rounded-full bg-red-500" />
            Offline
          </Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};
