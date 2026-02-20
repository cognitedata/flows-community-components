import type { Meta, StoryObj } from "@storybook/react-vite";
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
import { expect, userEvent, waitFor, within } from "storybook/test";
import { Badge } from "./badge";
const meta: Meta<typeof Badge> = {
  title: "Primitives/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
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
      table: {
        category: "Variants/Styling",
        type: {
          summary: "string",
        },
        defaultValue: {
          summary: "default",
        },
      },
    },
    outline: {
      control: "boolean",
      table: {
        category: "Variants/Styling",
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: "false",
        },
      },
    },
    background: {
      control: "boolean",
      table: {
        category: "Variants/Styling",
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: "true",
        },
      },
    },
    dot: {
      control: "boolean",
      table: {
        category: "Variants/Styling",
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: "false",
        },
      },
    },
    urgent: {
      control: "boolean",
      table: {
        category: "Variants/Styling",
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: "false",
        },
      },
    },
    size: {
      control: "select",
      options: ["default", "icon"],
      table: {
        category: "Variants/Styling",
        type: {
          summary: "'default' | 'icon'",
        },
        defaultValue: {
          summary: "default",
        },
      },
    },
    className: {
      control: "text",
      table: {
        category: "Variants/Styling",
        type: {
          summary: "string",
        },
      },
    },
    children: {
      control: "text",
      table: {
        category: "Content",
        type: {
          summary: "ReactNode",
        },
      },
    },
    onClick: {
      action: "clicked",
      table: {
        category: "Events",
        type: {
          summary: "(event: MouseEvent) => void",
        },
      },
    },
    onKeyDown: {
      action: "keydown",
      table: {
        category: "Events",
        type: {
          summary: "(event: KeyboardEvent) => void",
        },
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
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-foreground mb-3">
          Decorative Variants (Filled Only)
        </p>
        <p className="text-xs text-muted-foreground mb-3">
          These variants are decorative and do not convey semantic meaning. They are filled-only and
          cannot be outlined.
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="mountain">Mountain</Badge>
          <Badge variant="fjord">Fjord</Badge>
          <Badge variant="nordic">Nordic</Badge>
          <Badge variant="aurora">Aurora</Badge>
          <Badge variant="dusk">Dusk</Badge>
          <Badge variant="orange">Orange</Badge>
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-foreground mb-3">Semantic Variants (Filled)</p>
        <p className="text-xs text-muted-foreground mb-3">
          These variants convey meaning and support both filled and outlined styles. Icons are
          included to demonstrate common usage patterns.
        </p>
        <div className="flex flex-wrap gap-2">
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
        <p className="text-sm font-medium text-foreground mb-3">Semantic Variants (Outlined)</p>
        <p className="text-xs text-muted-foreground mb-3">
          Outlined variants use borders instead of backgrounds, with standard foreground colors for
          better contrast on transparent backgrounds. Only semantic variants support outline
          styling.
        </p>
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

      <div>
        <p className="text-sm font-medium text-foreground mb-3">Size Variants</p>
        <p className="text-xs text-muted-foreground mb-3">
          Badges support two size variants: default (for text content) and icon (compact size for
          icon-only badges).
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="success" size="default">
            <IconCircleCheck className="size-3" />
            Default Size
          </Badge>
          <Badge variant="success" size="icon">
            <IconCircleCheck className="size-3" />
          </Badge>
          <Badge variant="error" size="default">
            <IconAlertHexagon className="size-3" />
            Default Size
          </Badge>
          <Badge variant="error" size="icon">
            <IconAlertHexagon className="size-3" />
          </Badge>
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-foreground mb-3">Dot Indicator</p>
        <p className="text-xs text-muted-foreground mb-3">
          Dot variant displays as a circular indicator, useful for status indicators and
          notifications.
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="success" dot />
          <Badge variant="error" dot />
          <Badge variant="warning" dot />
          <Badge variant="inProgress" dot />
          <Badge variant="error" dot urgent />
        </div>
      </div>
    </div>
  ),
  parameters: {
    order: 1,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const mountainBadge = canvas.getByText("Mountain");
    await expect(mountainBadge).toBeInTheDocument();
    await expect(mountainBadge).toHaveClass("bg-decorative-background-mountain");
    const fjordBadge = canvas.getByText("Fjord");
    await expect(fjordBadge).toBeInTheDocument();
    await expect(fjordBadge).toHaveClass("bg-decorative-background-fjord");
    const orangeBadge = canvas.getByText("Orange");
    await expect(orangeBadge).toBeInTheDocument();
    await expect(orangeBadge).toHaveClass("bg-decorative-background-orange");
    const successBadges = canvas.getAllByText("Success");
    await expect(successBadges.length).toBeGreaterThanOrEqual(2);
    const filledSuccessElement = successBadges.find((badge) => {
      const hasBgSuccess = badge.classList.contains("bg-success");
      const notOutlined = !badge.classList.contains("border-border");
      return hasBgSuccess && notOutlined;
    });
    expect(filledSuccessElement).toBeDefined();
    expect(filledSuccessElement?.classList.contains("bg-success")).toBe(true);
    expect(filledSuccessElement?.classList.contains("text-success-foreground-alternate")).toBe(
      true
    );
    const errorBadges = canvas.getAllByText("Error");
    await expect(errorBadges.length).toBeGreaterThanOrEqual(2);
    const filledErrorElement = errorBadges.find((badge) => {
      const hasBgDestructive = badge.classList.contains("bg-destructive");
      const notOutlined = !badge.classList.contains("border-border");
      return hasBgDestructive && notOutlined;
    });
    expect(filledErrorElement).toBeDefined();
    expect(filledErrorElement?.classList.contains("bg-destructive")).toBe(true);
    expect(filledErrorElement?.classList.contains("text-destructive-foreground-alternate")).toBe(
      true
    );
    const outlinedSuccessElements = successBadges.filter((badge) =>
      badge.classList.contains("border-border")
    );
    await expect(outlinedSuccessElements.length).toBeGreaterThan(0);
    const outlinedSuccess = outlinedSuccessElements[0];
    expect(outlinedSuccess.classList.contains("border-border")).toBe(true);
    expect(outlinedSuccess.classList.contains("text-success-foreground")).toBe(true);
    expect(outlinedSuccess.classList.contains("bg-success")).toBe(false);
    const allBadges = canvasElement.querySelectorAll('[data-slot="badge"]');
    await expect(allBadges.length).toBeGreaterThanOrEqual(16);
    const allOutlinedBadges = Array.from(allBadges).filter((badge) =>
      badge.classList.contains("border-border")
    );
    await expect(allOutlinedBadges.length).toBeGreaterThanOrEqual(5);
    const defaultSizeBadges = canvas.getAllByText("Default Size", {
      exact: false,
    });
    await expect(defaultSizeBadges.length).toBeGreaterThanOrEqual(2);
    const iconOnlyBadges = Array.from(allBadges).filter((badge) => {
      const text = badge.textContent?.trim() || "";
      const hasIcon = badge.querySelector("svg");
      return hasIcon && text.length < 3;
    });
    await expect(iconOnlyBadges.length).toBeGreaterThanOrEqual(2);
    const dotBadges = Array.from(allBadges).filter((badge) =>
      badge.classList.contains("rounded-full")
    );
    await expect(dotBadges.length).toBeGreaterThanOrEqual(4);
    const textContent = canvasElement.textContent || "";
    expect(textContent).toContain("Mountain");
    expect(textContent).toContain("Fjord");
    expect(textContent).toContain("Nordic");
    expect(textContent).toContain("Aurora");
    expect(textContent).toContain("Dusk");
    expect(textContent).toContain("Orange");
    expect(textContent).toContain("Neutral");
    expect(textContent).toContain("Success");
    expect(textContent).toContain("Warning");
    expect(textContent).toContain("Error");
    expect(textContent).toContain("Undefined");
  },
};
export const Mountain: Story = {
  render: () => <Badge variant="mountain">Mountain</Badge>,
  parameters: {
    order: 2,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByText("Mountain");
    await expect(badge).toBeInTheDocument();
    await expect(badge).toHaveAttribute("data-slot", "badge");
    await expect(badge).toHaveClass("bg-decorative-background-mountain");
    await expect(badge).toHaveClass("text-decorative-foreground-mountain");
    await expect(badge).not.toHaveClass("border-border");
    await expect(badge).toHaveClass("border-transparent");
    await expect(badge).toHaveClass("rounded-md");
    await expect(badge).toHaveClass("inline-flex");
    await expect(badge).toHaveClass("items-center");
  },
};
export const Fjord: Story = {
  render: () => <Badge variant="fjord">Fjord</Badge>,
  parameters: {
    order: 3,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByText("Fjord");
    await expect(badge).toBeInTheDocument();
    await expect(badge).toHaveAttribute("data-slot", "badge");
    await expect(badge).toHaveClass("bg-decorative-background-fjord");
    await expect(badge).toHaveClass("text-decorative-foreground-fjord");
    await expect(badge).not.toHaveClass("border-border");
    await expect(badge).toHaveClass("border-transparent");
    await expect(badge).toHaveClass("rounded-md");
    await expect(badge).toHaveClass("inline-flex");
    await expect(badge).toHaveClass("items-center");
  },
};
export const Nordic: Story = {
  render: () => <Badge variant="nordic">Nordic</Badge>,
  parameters: {
    order: 4,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByText("Nordic");
    await expect(badge).toBeInTheDocument();
    await expect(badge).toHaveAttribute("data-slot", "badge");
    await expect(badge).toHaveClass("bg-decorative-background-nordic");
    await expect(badge).toHaveClass("text-decorative-foreground-nordic");
    await expect(badge).not.toHaveClass("border-border");
    await expect(badge).toHaveClass("border-transparent");
    await expect(badge).toHaveClass("rounded-md");
    await expect(badge).toHaveClass("inline-flex");
    await expect(badge).toHaveClass("items-center");
  },
};
export const Aurora: Story = {
  render: () => <Badge variant="aurora">Aurora</Badge>,
  parameters: {
    order: 5,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByText("Aurora");
    await expect(badge).toBeInTheDocument();
    await expect(badge).toHaveAttribute("data-slot", "badge");
    await expect(badge).toHaveClass("bg-decorative-background-aurora");
    await expect(badge).toHaveClass("text-decorative-foreground-aurora");
    await expect(badge).not.toHaveClass("border-border");
    await expect(badge).toHaveClass("border-transparent");
    await expect(badge).toHaveClass("rounded-md");
    await expect(badge).toHaveClass("inline-flex");
    await expect(badge).toHaveClass("items-center");
  },
};
export const Dusk: Story = {
  render: () => <Badge variant="dusk">Dusk</Badge>,
  parameters: {
    order: 6,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByText("Dusk");
    await expect(badge).toBeInTheDocument();
    await expect(badge).toHaveAttribute("data-slot", "badge");
    await expect(badge).toHaveClass("bg-decorative-background-dusk");
    await expect(badge).toHaveClass("text-decorative-foreground-dusk");
    await expect(badge).not.toHaveClass("border-border");
    await expect(badge).toHaveClass("border-transparent");
    await expect(badge).toHaveClass("rounded-md");
    await expect(badge).toHaveClass("inline-flex");
    await expect(badge).toHaveClass("items-center");
  },
};
export const Orange: Story = {
  parameters: {
    order: 7,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByText("Orange");
    await expect(badge).toBeInTheDocument();
    await expect(badge).toHaveAttribute("data-slot", "badge");
    await expect(badge).toHaveClass("bg-decorative-background-orange");
    await expect(badge).toHaveClass("text-decorative-foreground-orange");
    await expect(badge).not.toHaveClass("border-border");
    await expect(badge).toHaveClass("border-transparent");
    await expect(badge).toHaveClass("rounded-md");
    await expect(badge).toHaveClass("inline-flex");
    await expect(badge).toHaveClass("items-center");
  },
  render: () => <Badge variant="orange">Orange</Badge>,
};
export const Secondary: Story = {
  render: () => <Badge variant="secondary">Secondary</Badge>,
  parameters: {
    order: 8,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByText("Secondary");
    await expect(badge).toBeInTheDocument();
    await expect(badge).toHaveAttribute("data-slot", "badge");
    await expect(badge).toHaveClass("bg-secondary");
    await expect(badge).toHaveClass("text-secondary-foreground");
    await expect(badge).not.toHaveClass("border-border");
    await expect(badge).toHaveClass("border-transparent");
    await expect(badge).toHaveClass("rounded-md");
    await expect(badge).toHaveClass("inline-flex");
    await expect(badge).toHaveClass("items-center");
  },
};
export const Neutral: Story = {
  render: () => (
    <Badge variant="inProgress">
      <IconInnerShadowTopLeft className="size-3" />
      Neutral
    </Badge>
  ),
  parameters: {
    order: 9,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByText("Neutral");
    await expect(badge).toBeInTheDocument();
    await expect(badge).toHaveAttribute("data-slot", "badge");
    await expect(badge).toHaveClass("bg-neutral");
    await expect(badge).toHaveClass("text-neutral-foreground-alternate");
    await expect(badge).not.toHaveClass("border-border");
    await expect(badge).toHaveClass("border-transparent");
    await expect(badge).toHaveClass("rounded-md");
    await expect(badge).toHaveClass("inline-flex");
    await expect(badge).toHaveClass("items-center");
    const icon = badge.querySelector("svg");
    await expect(icon).toBeInTheDocument();
  },
};
export const Success: Story = {
  render: () => (
    <Badge variant="success">
      <IconCircleCheck className="size-3" />
      Success
    </Badge>
  ),
  parameters: {
    order: 10,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByText("Success");
    await expect(badge).toBeInTheDocument();
    await expect(badge).toHaveAttribute("data-slot", "badge");
    await expect(badge).toHaveClass("bg-success");
    await expect(badge).toHaveClass("text-success-foreground-alternate");
    await expect(badge).not.toHaveClass("border-border");
    await expect(badge).toHaveClass("border-transparent");
    await expect(badge).toHaveClass("rounded-md");
    await expect(badge).toHaveClass("inline-flex");
    await expect(badge).toHaveClass("items-center");
    const icon = badge.querySelector("svg");
    await expect(icon).toBeInTheDocument();
  },
};
export const Warning: Story = {
  render: () => (
    <Badge variant="warning">
      <IconAlertTriangle className="size-3" />
      Warning
    </Badge>
  ),
  parameters: {
    order: 11,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByText("Warning");
    await expect(badge).toBeInTheDocument();
    await expect(badge).toHaveAttribute("data-slot", "badge");
    await expect(badge).toHaveClass("bg-warning");
    await expect(badge).toHaveClass("text-warning-foreground-alternate");
    await expect(badge).not.toHaveClass("border-border");
    await expect(badge).toHaveClass("border-transparent");
    await expect(badge).toHaveClass("rounded-md");
    await expect(badge).toHaveClass("inline-flex");
    await expect(badge).toHaveClass("items-center");
    const icon = badge.querySelector("svg");
    await expect(icon).toBeInTheDocument();
  },
};
export const ErrorState: Story = {
  render: () => (
    <Badge variant="error">
      <IconAlertHexagon className="size-3" />
      Error
    </Badge>
  ),
  parameters: {
    order: 12,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByText("Error");
    await expect(badge).toBeInTheDocument();
    await expect(badge).toHaveAttribute("data-slot", "badge");
    await expect(badge).toHaveClass("bg-destructive");
    await expect(badge).toHaveClass("text-destructive-foreground-alternate");
    await expect(badge).not.toHaveClass("border-border");
    await expect(badge).toHaveClass("border-transparent");
    await expect(badge).toHaveClass("rounded-md");
    await expect(badge).toHaveClass("inline-flex");
    await expect(badge).toHaveClass("items-center");
    const icon = badge.querySelector("svg");
    await expect(icon).toBeInTheDocument();
  },
};
export const Undefined: Story = {
  render: () => (
    <Badge variant="archived">
      <IconArchive className="size-3" />
      Undefined
    </Badge>
  ),
  parameters: {
    order: 13,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByText("Undefined");
    await expect(badge).toBeInTheDocument();
    await expect(badge).toHaveAttribute("data-slot", "badge");
    await expect(badge).toHaveClass("bg-undefined");
    await expect(badge).toHaveClass("text-undefined-foreground-alternate");
    await expect(badge).not.toHaveClass("border-border");
    await expect(badge).toHaveClass("border-transparent");
    await expect(badge).toHaveClass("rounded-md");
    await expect(badge).toHaveClass("inline-flex");
    await expect(badge).toHaveClass("items-center");
    const icon = badge.querySelector("svg");
    await expect(icon).toBeInTheDocument();
  },
};
export const NeutralOutlined: Story = {
  render: () => (
    <Badge variant="inProgress" outline>
      <IconInnerShadowTopLeft className="size-3" />
      Neutral
    </Badge>
  ),
  parameters: {
    order: 14,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByText("Neutral");
    await expect(badge).toBeInTheDocument();
    await expect(badge).toHaveAttribute("data-slot", "badge");
    await expect(badge).toHaveClass("border-border");
    await expect(badge).toHaveClass("text-neutral-foreground");
    await expect(badge).not.toHaveClass("bg-neutral");
    await expect(badge).toHaveClass("bg-transparent");
    await expect(badge).toHaveClass("px-1.5");
    await expect(badge).toHaveClass("rounded-md");
    await expect(badge).toHaveClass("inline-flex");
    await expect(badge).toHaveClass("items-center");
    const icon = badge.querySelector("svg");
    await expect(icon).toBeInTheDocument();
  },
};
export const SuccessOutlined: Story = {
  render: () => (
    <Badge variant="success" outline>
      <IconCircleCheck className="size-3" />
      Success
    </Badge>
  ),
  parameters: {
    order: 15,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByText("Success");
    await expect(badge).toBeInTheDocument();
    await expect(badge).toHaveAttribute("data-slot", "badge");
    await expect(badge).toHaveClass("border-border");
    await expect(badge).toHaveClass("text-success-foreground");
    await expect(badge).not.toHaveClass("bg-success");
    await expect(badge).toHaveClass("bg-transparent");
    await expect(badge).toHaveClass("px-1.5");
    await expect(badge).toHaveClass("rounded-md");
    await expect(badge).toHaveClass("inline-flex");
    await expect(badge).toHaveClass("items-center");
    const icon = badge.querySelector("svg");
    await expect(icon).toBeInTheDocument();
  },
};
export const WarningOutlined: Story = {
  render: () => (
    <Badge variant="warning" outline>
      <IconAlertTriangle className="size-3" />
      Warning
    </Badge>
  ),
  parameters: {
    order: 16,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByText("Warning");
    await expect(badge).toBeInTheDocument();
    await expect(badge).toHaveAttribute("data-slot", "badge");
    await expect(badge).toHaveClass("border-border");
    await expect(badge).toHaveClass("text-warning-foreground");
    await expect(badge).not.toHaveClass("bg-warning");
    await expect(badge).toHaveClass("bg-transparent");
    await expect(badge).toHaveClass("px-1.5");
    await expect(badge).toHaveClass("rounded-md");
    await expect(badge).toHaveClass("inline-flex");
    await expect(badge).toHaveClass("items-center");
    const icon = badge.querySelector("svg");
    await expect(icon).toBeInTheDocument();
  },
};
export const ErrorOutlined: Story = {
  render: () => (
    <Badge variant="error" outline>
      <IconAlertHexagon className="size-3" />
      Error
    </Badge>
  ),
  parameters: {
    order: 17,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByText("Error");
    await expect(badge).toBeInTheDocument();
    await expect(badge).toHaveAttribute("data-slot", "badge");
    await expect(badge).toHaveClass("border-border");
    await expect(badge).toHaveClass("text-destructive-foreground");
    await expect(badge).not.toHaveClass("bg-destructive");
    await expect(badge).toHaveClass("bg-transparent");
    await expect(badge).toHaveClass("px-1.5");
    await expect(badge).toHaveClass("rounded-md");
    await expect(badge).toHaveClass("inline-flex");
    await expect(badge).toHaveClass("items-center");
    const icon = badge.querySelector("svg");
    await expect(icon).toBeInTheDocument();
  },
};
export const UndefinedOutlined: Story = {
  render: () => (
    <Badge variant="archived" outline>
      <IconArchive className="size-3" />
      Undefined
    </Badge>
  ),
  parameters: {
    order: 18,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByText("Undefined");
    await expect(badge).toBeInTheDocument();
    await expect(badge).toHaveAttribute("data-slot", "badge");
    await expect(badge).toHaveClass("border-border");
    await expect(badge).toHaveClass("text-undefined-foreground");
    await expect(badge).not.toHaveClass("bg-undefined");
    await expect(badge).toHaveClass("bg-transparent");
    await expect(badge).toHaveClass("px-1.5");
    await expect(badge).toHaveClass("rounded-md");
    await expect(badge).toHaveClass("inline-flex");
    await expect(badge).toHaveClass("items-center");
    const icon = badge.querySelector("svg");
    await expect(icon).toBeInTheDocument();
  },
};
export const IconSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm text-muted-foreground mb-3">Default size with text + icon</p>
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
    order: 19,
  },
  play: async ({ canvasElement }) => {
    const badges = canvasElement.querySelectorAll('[data-slot="badge"]');
    const iconSizeBadges = Array.from(badges).filter(
      (badge) => badge.classList.contains("px-1.5") && badge.classList.contains("py-1")
    );
    iconSizeBadges.forEach((badge) => {
      expect(badge).toHaveClass("px-1.5");
      expect(badge).toHaveClass("py-1");
      expect(badge).toHaveClass("rounded-md");
    });
    await expect(iconSizeBadges.length).toBe(4);
  },
};
export const Playground: Story = {
  render: (args) => <Badge {...args} />,
  args: {
    variant: "fjord",
    children: "Badge",
  },
  parameters: {
    order: 99,
  },
};
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
    order: 20,
  },
  play: async ({ canvasElement }) => {
    const badges = canvasElement.querySelectorAll('[data-slot="badge"]');
    badges.forEach((badge) => {
      expect(badge).toHaveClass("rounded-full");
    });
    const firstDot = badges[0] as HTMLElement;
    await expect(firstDot).toHaveClass("size-2");
    await expect(firstDot).toHaveClass("bg-destructive-foreground");
  },
};
export const ClickInteraction: Story = {
  parameters: {
    order: 21,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const initialLabel = canvas.getByText("Click me");
    const badge = initialLabel.closest('[data-slot="badge"]');
    await expect(badge).toBeInTheDocument();
    await expect(badge).toHaveClass("cursor-pointer");
    await userEvent.hover(badge!);
    await expect(badge).toHaveClass("hover:bg-secondary-hover");
    await userEvent.click(badge!);
    await waitFor(() => {
      expect(canvas.getByText("Clicked!")).toBeInTheDocument();
    });
    await userEvent.click(badge!);
    await waitFor(() => {
      expect(canvas.getByText("Click me")).toBeInTheDocument();
    });
  },
  render: function ClickInteractionStory() {
    const [clicked, setClicked] = useState(false);
    return (
      <div className="flex flex-wrap gap-4 items-center">
        <Badge variant="closable" onClick={() => setClicked(!clicked)} className="cursor-pointer">
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
export const KeyboardInteractions: Story = {
  parameters: {
    order: 22,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.tab();
    const firstBadge = canvas.getByRole("button", {
      name: "Toggle badge 1",
    });
    await waitFor(() => {
      expect(firstBadge).toHaveFocus();
    });
    await userEvent.keyboard("{Enter}");
    await waitFor(() => {
      expect(canvas.getByText("Badge 1: Active")).toBeInTheDocument();
    });
    await userEvent.tab();
    const secondBadge = canvas.getByRole("button", {
      name: "Toggle badge 2",
    });
    await waitFor(() => {
      expect(secondBadge).toHaveFocus();
    });
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
export const Accessibility: Story = {
  parameters: {
    order: 23,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() => {
      expect(canvas.getByLabelText("Status: Completed")).toBeInTheDocument();
      expect(canvas.getByLabelText("Status: Failed")).toBeInTheDocument();
      expect(canvas.getByLabelText("Urgent notification")).toBeInTheDocument();
    });
    const interactiveBadge = canvas.getByRole("button", {
      name: /Remove tag: JavaScript/i,
    });
    await expect(interactiveBadge).toBeInTheDocument();
    await expect(interactiveBadge).toHaveAttribute("tabIndex", "0");
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    await waitFor(() => {
      expect(interactiveBadge).toHaveFocus();
    });
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
        onKeyDown={(e) => {
          if (e.key === "Enter") e.preventDefault();
        }}
      >
        JavaScript
        <IconX className="size-3" aria-hidden="true" />
      </Badge>
    </div>
  ),
};
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
    order: 24,
  },
  play: async ({ canvasElement }) => {
    const badges = canvasElement.querySelectorAll('[data-slot="badge"]');
    await expect(badges.length).toBeGreaterThan(0);
  },
};
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
    order: 25,
  },
  play: async ({ canvasElement }) => {
    const badges = canvasElement.querySelectorAll('[data-slot="badge"]');
    await expect(badges.length).toBe(3);
    badges.forEach((badge) => {
      expect(badge).toHaveClass("inline-flex");
    });
  },
};
export const EdgeCaseLongText: Story = {
  render: () => (
    <div className="flex flex-col gap-2 max-w-md">
      <Badge variant="fjord">
        This is an extremely long badge text that should demonstrate how the component handles
        lengthy content
      </Badge>
      <Badge variant="aurora" className="max-w-xs">
        Constrained width with very long text that might wrap or truncate
      </Badge>
    </div>
  ),
  parameters: {
    order: 26,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const longBadge = canvas.getByText(/extremely long badge text/i);
    await expect(longBadge).toBeInTheDocument();
    await expect(longBadge).toHaveClass("whitespace-nowrap");
  },
};
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
    order: 27,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("<HTML/>")).toBeInTheDocument();
    await expect(canvas.getByText("Status: ⚠️")).toBeInTheDocument();
    await expect(canvas.getByText("User: <script>")).toBeInTheDocument();
  },
};
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
    order: 28,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badges = canvasElement.querySelectorAll('[data-slot="badge"]');
    badges.forEach((badge) => {
      const icon = badge.querySelector("svg");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("aria-hidden", "true");
      expect(badge).toHaveAttribute("aria-label");
    });
    await expect(canvas.getByLabelText("Success")).toBeInTheDocument();
    await expect(canvas.getByLabelText("Error")).toBeInTheDocument();
    await expect(canvas.getByLabelText("Warning")).toBeInTheDocument();
    await expect(canvas.getByLabelText("In progress")).toBeInTheDocument();
  },
};
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
    order: 29,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(/Admin/)).toBeInTheDocument();
    await expect(canvas.getByText(/Premium/)).toBeInTheDocument();
  },
};
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
      <Badge variant="mountain" className="min-w-30 justify-center">
        Min Width
      </Badge>
    </div>
  ),
  parameters: {
    order: 30,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const fullWidthBadge = canvas.getByText("Full Width");
    await expect(fullWidthBadge).toHaveClass("w-full");
    await expect(fullWidthBadge).toHaveClass("justify-center");
  },
};
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
    order: 31,
  },
  play: async ({ canvasElement }) => {
    const badges = canvasElement.querySelectorAll('[data-slot="badge"]');
    await expect(badges.length).toBe(11);
  },
};
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
    order: 32,
  },
  play: async ({ canvasElement }) => {
    const dots = canvasElement.querySelectorAll('[data-slot="badge"]');
    dots.forEach((dot) => {
      expect(dot).toHaveClass("size-2");
      expect(dot).toHaveClass("rounded-full");
    });
  },
};
