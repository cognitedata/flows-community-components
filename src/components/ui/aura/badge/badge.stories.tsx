import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import {
  IconAlertHexagon,
  IconAlertTriangle,
  IconArchive,
  IconCircleCheck,
  IconHexagon,
  IconInnerShadowTopLeft,
  IconStar,
  IconUser,
  IconX,
} from "@tabler/icons-react";
import { useState } from "react";
import { Badge } from "./badge";

const meta: Meta<typeof Badge> = {
  title: "Primitives/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    // Display
    variant: {
      control: "select",
      options: [
        "default",
        "fjord",
        "nordic",
        "aurora",
        "sky",
        "dusk",
        "orange",
        "gray",
        "mountain",
        "secondary",
        "error",
        "warning",
        "success",
        "inProgress",
        "archived",
        "closable",
      ],
      description: "Visual style variant of the badge",
      table: {
        category: "Display",
        type: { summary: "string" },
        defaultValue: { summary: "default" },
      },
    },
    outline: {
      control: "boolean",
      description:
        "Display as an outlined badge with border only. Only available for error, warning, success, inProgress (neutral), and archived (undefined) variants. Decorative variants (mountain, fjord, nordic, aurora, dusk, orange) are filled only.",
      table: {
        category: "Display",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    background: {
      control: "boolean",
      description: "Whether to display background fill",
      table: {
        category: "Display",
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    dot: {
      control: "boolean",
      description: "Display as a circular dot indicator",
      table: {
        category: "Display",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    urgent: {
      control: "boolean",
      description: "Mark as urgent (applies to dot variant)",
      table: {
        category: "Display",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    size: {
      control: "select",
      options: ["default", "icon"],
      description: "Size variant for the badge",
      table: {
        category: "Display",
        type: { summary: "'default' | 'icon'" },
        defaultValue: { summary: "default" },
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
      table: {
        category: "Display",
        type: { summary: "string" },
      },
    },

    // Content
    children: {
      control: "text",
      description: "Content to display inside the badge",
      table: {
        category: "Content",
        type: { summary: "ReactNode" },
      },
    },

    // Events
    onClick: {
      action: "clicked",
      description: "Callback when badge is clicked",
      table: {
        category: "Events",
        type: { summary: "(event: MouseEvent) => void" },
      },
    },
    onKeyDown: {
      action: "keydown",
      description: "Callback when a key is pressed",
      table: {
        category: "Events",
        type: { summary: "(event: KeyboardEvent) => void" },
      },
    },

    // Advanced
    asChild: {
      control: "boolean",
      description: "Render as child component using Radix Slot",
      table: {
        category: "Advanced",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
  },
  parameters: {
    layout: "centered",
    actions: {
      handles: ["click", "keydown"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

/**
 * All Variants Overview
 */
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-muted-foreground mb-3">Filled variants</p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="mountain">Mountain</Badge>
          <Badge variant="fjord">Fjord</Badge>
          <Badge variant="nordic">Nordic</Badge>
          <Badge variant="aurora">Aurora</Badge>
          <Badge variant="dusk">Dusk</Badge>
          <Badge variant="orange">Orange</Badge>
          <Badge variant="inProgress">
            <IconInnerShadowTopLeft className="size-3" />
            Neutral
          </Badge>
          <Badge variant="success">
            <IconCircleCheck className="size-3" />
            Success
          </Badge>
          <Badge variant="warning">
            <IconAlertTriangle className="size-3" />
            Warning
          </Badge>
          <Badge variant="error">
            <IconAlertHexagon className="size-3" />
            Error
          </Badge>
          <Badge variant="archived">
            <IconArchive className="size-3" />
            Undefined
          </Badge>
        </div>
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-3">Outlined variants</p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="inProgress" outline>
            <IconInnerShadowTopLeft className="size-3" />
            Neutral
          </Badge>
          <Badge variant="success" outline>
            <IconCircleCheck className="size-3" />
            Success
          </Badge>
          <Badge variant="warning" outline>
            <IconAlertTriangle className="size-3" />
            Warning
          </Badge>
          <Badge variant="error" outline>
            <IconAlertHexagon className="size-3" />
            Error
          </Badge>
          <Badge variant="archived" outline>
            <IconArchive className="size-3" />
            Undefined
          </Badge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Overview of all available badge variants showing the full colour palette and semantic options. Each variant is designed for specific use cases and contexts.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify all variants render
    await expect(canvas.getByText("Default")).toBeInTheDocument();
    await expect(canvas.getByText("Fjord")).toBeInTheDocument();
    await expect(canvas.getByText("Nordic")).toBeInTheDocument();
    await expect(canvas.getByText("Closable")).toBeInTheDocument();
  },
};

/**
 * Icon Sizes - showing the difference between default and icon size variants
 */
export const IconSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm text-muted-foreground mb-3">
          Default size with text + icon
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="mountain">
            <IconHexagon className="size-3" />
            Mountain
          </Badge>
          <Badge variant="fjord">
            <IconStar className="size-3" />
            Fjord
          </Badge>
          <Badge variant="aurora">
            <IconCircleCheck className="size-3" />
            Aurora
          </Badge>
          <Badge variant="dusk">
            <IconUser className="size-3" />
            Dusk
          </Badge>
        </div>
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-3">
          Default size with icon only (rectangular)
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="mountain">
            <IconHexagon className="size-3" />
          </Badge>
          <Badge variant="fjord">
            <IconStar className="size-3" />
          </Badge>
          <Badge variant="aurora">
            <IconCircleCheck className="size-3" />
          </Badge>
          <Badge variant="dusk">
            <IconUser className="size-3" />
          </Badge>
        </div>
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-3">
          Icon size (square, optimised for icon-only badges)
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="mountain" size="icon">
            <IconHexagon className="size-3" />
          </Badge>
          <Badge variant="fjord" size="icon">
            <IconStar className="size-3" />
          </Badge>
          <Badge variant="aurora" size="icon">
            <IconCircleCheck className="size-3" />
          </Badge>
          <Badge variant="dusk" size="icon">
            <IconUser className="size-3" />
          </Badge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'The `size` prop controls the padding and shape of the badge. Use `size="icon"` for icon-only badges to achieve a square, balanced appearance with equal padding on all sides. The default size uses horizontal padding optimised for text content.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const badges = canvasElement.querySelectorAll('[data-slot="badge"]');

    // Find badges with icon size
    const iconSizeBadges = Array.from(badges).filter((badge) =>
      badge.classList.contains("rounded-md")
    );

    // Verify icon size badges have correct styling
    iconSizeBadges.forEach((badge) => {
      expect(badge).toHaveClass("p-0.75");
      expect(badge).toHaveClass("rounded-md");
    });

    await expect(iconSizeBadges.length).toBeGreaterThan(0);
  },
};

/**
 * Interactive playground for testing different configurations.
 * Use the controls below to experiment with all available props.
 */
export const Playground: Story = {
  args: {
    variant: "fjord",
    children: "Badge",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive playground for experimenting with all badge props. Use the controls panel to adjust variant, outline, background, dot, and other properties in real-time.",
      },
    },
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
          "Dot indicators provide minimal status visualization. When empty, they render as small coloured dots. The `urgent` prop changes the colour to destructive red. Dots can also contain short content like numbers.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const badges = canvasElement.querySelectorAll('[data-slot="badge"]');

    // Verify dot badges have rounded class
    badges.forEach((badge) => {
      expect(badge).toHaveClass("rounded-full");
    });

    // Check first dot is urgent and empty (size-2)
    const firstDot = badges[0] as HTMLElement;
    await expect(firstDot).toHaveClass("size-2");
    await expect(firstDot).toHaveClass("bg-destructive-foreground");
  },
};

/**
 * Click Interaction - testing interactive badges with state feedback
 */
export const ClickInteraction: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Interactive badges that respond to click events. The `closable` variant includes hover states and cursor styling. Commonly used for removable tags, filters, or dismissible notifications. This story tests actual click interactions with state updates.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find and verify initial state
    const badge = canvas.getByTestId("closable-badge");
    await expect(badge).toBeInTheDocument();
    await expect(badge).toHaveClass("cursor-pointer");

    // Test hover interaction
    await userEvent.hover(badge);
    await expect(badge).toHaveClass("hover:bg-secondary-hover");

    // Test click interaction
    await userEvent.click(badge);
    await waitFor(() => {
      expect(canvas.getByText("Clicked!")).toBeInTheDocument();
    });

    // Click again to toggle back
    await userEvent.click(badge);
    await waitFor(() => {
      expect(canvas.getByText("Click me")).toBeInTheDocument();
    });
  },
  render: function ClickInteractionStory() {
    const [clicked, setClicked] = useState(false);

    return (
      <div className="flex flex-wrap gap-4 items-center">
        <Badge
          variant="closable"
          onClick={() => setClicked(!clicked)}
          className="cursor-pointer"
          data-testid="closable-badge"
        >
          {clicked ? "Clicked!" : "Click me"}
          <IconX className="size-3" />
        </Badge>
        <span className="text-sm text-muted-foreground">
          State: {clicked ? "Active" : "Inactive"}
        </span>
      </div>
    );
  },
};

/**
 * Keyboard Interactions - testing keyboard navigation and activation
 */
export const KeyboardInteractions: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Tests keyboard interactions for interactive badges. Focus with Tab, activate with Enter or Space. Essential for accessibility compliance.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Tab to focus the first badge
    await userEvent.tab();
    const firstBadge = canvas.getByTestId("keyboard-badge-1");
    await waitFor(() => {
      expect(firstBadge).toHaveFocus();
    });

    // Press Enter to activate
    await userEvent.keyboard("{Enter}");
    await waitFor(() => {
      expect(canvas.getByText("Badge 1: Active")).toBeInTheDocument();
    });

    // Tab to second badge
    await userEvent.tab();
    const secondBadge = canvas.getByTestId("keyboard-badge-2");
    await waitFor(() => {
      expect(secondBadge).toHaveFocus();
    });

    // Press Space to activate
    await userEvent.keyboard(" ");
    await waitFor(() => {
      expect(canvas.getByText("Badge 2: Active")).toBeInTheDocument();
    });
  },
  render: function KeyboardInteractionsStory() {
    const [badge1Active, setBadge1Active] = useState(false);
    const [badge2Active, setBadge2Active] = useState(false);

    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          <Badge
            variant="closable"
            role="button"
            tabIndex={0}
            data-testid="keyboard-badge-1"
            aria-label="Toggle badge 1"
            onClick={() => setBadge1Active(!badge1Active)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setBadge1Active(!badge1Active);
              }
            }}
          >
            Badge 1
            <IconX className="size-3" aria-hidden="true" />
          </Badge>
          <Badge
            variant="closable"
            role="button"
            tabIndex={0}
            data-testid="keyboard-badge-2"
            aria-label="Toggle badge 2"
            onClick={() => setBadge2Active(!badge2Active)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setBadge2Active(!badge2Active);
              }
            }}
          >
            Badge 2
            <IconX className="size-3" aria-hidden="true" />
          </Badge>
        </div>
        <div className="text-sm text-muted-foreground">
          <p>Badge 1: {badge1Active ? "Active" : "Inactive"}</p>
          <p>Badge 2: {badge2Active ? "Active" : "Inactive"}</p>
        </div>
      </div>
    );
  },
};

/**
 * Accessibility - ARIA labels and semantic usage
 */
export const Accessibility: Story = {
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

    // Check ARIA labels are present and accessible
    await waitFor(() => {
      expect(canvas.getByLabelText("Status: Completed")).toBeInTheDocument();
      expect(canvas.getByLabelText("Status: Failed")).toBeInTheDocument();
      expect(canvas.getByLabelText("Urgent notification")).toBeInTheDocument();
    });

    // Check keyboard navigation on interactive badge
    const interactiveBadge = canvas.getByRole("button", {
      name: /Remove tag: JavaScript/i,
    });
    await expect(interactiveBadge).toBeInTheDocument();
    await expect(interactiveBadge).toHaveAttribute("tabIndex", "0");

    // Test keyboard focus
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab(); // Tab to the interactive badge
    await waitFor(() => {
      expect(interactiveBadge).toHaveFocus();
    });

    // Verify icons are hidden from screen readers
    const icons = canvasElement.querySelectorAll('svg[aria-hidden="true"]');
    await expect(icons.length).toBeGreaterThan(0);
  },
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
        onKeyDown={(e) => e.key === "Enter" && alert("Tag removed")}
      >
        JavaScript
        <IconX className="size-3" aria-hidden="true" />
      </Badge>
    </div>
  ),
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
        <Badge variant="success" outline>
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
          "Baseline story for visual regression testing with Chromatic. Includes all major variants, styles, and configurations to detect unintended visual changes.",
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
      <Badge variant="fjord" />
      <Badge variant="error" />
      <Badge variant="secondary" />
      <span className="text-sm text-muted-foreground">(Empty badges)</span>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Empty badges still render with minimal spacing. Consider using dot variant for truly minimal indicators.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const badges = canvasElement.querySelectorAll('[data-slot="badge"]');
    await expect(badges.length).toBe(3);

    // Empty badges should still have badge styling
    badges.forEach((badge) => {
      expect(badge).toHaveClass("inline-flex");
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
          "Very long text in badges. The component uses whitespace-nowrap by default, so content will extend. Add max-width and wrapping classes if needed.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const longBadge = canvas.getByText(/extremely long badge text/i);

    await expect(longBadge).toBeInTheDocument();
    await expect(longBadge).toHaveClass("whitespace-nowrap");
  },
};

/**
 * Edge Case: Special Characters
 */
export const EdgeCaseSpecialCharacters: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="fjord">{"<HTML/>"}</Badge>
      <Badge variant="aurora">{"Status: ⚠️"}</Badge>
      <Badge variant="mountain">{"Quantity: 1,234"}</Badge>
      <Badge variant="dusk">{"Price: $99.99"}</Badge>
      <Badge variant="error">{"Error: #404"}</Badge>
      <Badge variant="secondary">{"User: <script>"}</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Badges with special characters, emojis, HTML-like content, and various symbols. Content is safely rendered as text.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify special characters are rendered properly
    await expect(canvas.getByText("<HTML/>")).toBeInTheDocument();
    await expect(canvas.getByText("Status: ⚠️")).toBeInTheDocument();
    await expect(canvas.getByText("User: <script>")).toBeInTheDocument();
  },
};

/**
 * Edge Case: Icon Only (with proper accessibility)
 */
export const EdgeCaseIconOnly: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="success" size="icon" aria-label="Success">
        <IconCircleCheck className="size-3" aria-hidden="true" />
      </Badge>
      <Badge variant="error" size="icon" aria-label="Error">
        <IconAlertHexagon className="size-3" aria-hidden="true" />
      </Badge>
      <Badge variant="warning" size="icon" aria-label="Warning">
        <IconAlertTriangle className="size-3" aria-hidden="true" />
      </Badge>
      <Badge variant="inProgress" size="icon" aria-label="In progress">
        <IconInnerShadowTopLeft className="size-3" aria-hidden="true" />
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Icon-only badges with proper accessibility. Each badge has an `aria-label` for screen readers and icons are marked `aria-hidden="true"`. Uses `size="icon"` for square proportions.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badges = canvasElement.querySelectorAll('[data-slot="badge"]');

    // Each badge should have an icon and aria-label
    badges.forEach((badge) => {
      const icon = badge.querySelector("svg");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(badge).toHaveAttribute("aria-label");
    });

    // Verify specific labels
    await expect(canvas.getByLabelText("Success")).toBeInTheDocument();
    await expect(canvas.getByLabelText("Error")).toBeInTheDocument();
    await expect(canvas.getByLabelText("Warning")).toBeInTheDocument();
    await expect(canvas.getByLabelText("In progress")).toBeInTheDocument();
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
          "Badges with mixed content including icons, text, and nested elements. The component handles complex children gracefully.",
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
          "Testing badge behaviour with various width constraints. Badges are naturally fit-content but can be adjusted with CSS classes.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const fullWidthBadge = canvas.getByText("Full Width");

    await expect(fullWidthBadge).toHaveClass("w-full");
    await expect(fullWidthBadge).toHaveClass("justify-center");
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
          "Multiple badges grouped together, simulating tag lists or filter sets. Demonstrates proper spacing and wrapping behaviour.",
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
          "Multiple tiny dot indicators in sequence. Useful for showing presence, status, or notification counts in a minimal way.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const dots = canvasElement.querySelectorAll('[data-slot="badge"]');

    // All dots should be tiny
    dots.forEach((dot) => {
      expect(dot).toHaveClass("size-2");
      expect(dot).toHaveClass("rounded-full");
    });
  },
};
