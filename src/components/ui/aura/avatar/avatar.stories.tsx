import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { IconHeart, IconRobot, IconStar, IconUser, IconWheel } from "@tabler/icons-react";
import { getStorybookImagePath } from "../../../../lib/utils";
import { Avatar, AvatarFallback, AvatarIcon, AvatarImage } from "./avatar";

const meta: Meta<typeof Avatar> = {
  title: "Primitives/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "nordic", "aurora", "fjord", "dusk", "orange", "sky", "overflow"],
      description: "The color scheme variant of the avatar",
      table: {
        category: "Appearance",
        type: { summary: "string" },
        defaultValue: { summary: "default" },
      },
    },
    sizes: {
      control: "select",
      options: ["default", "xsm", "xxsm"],
      description: "The size of the avatar",
      table: {
        category: "Appearance",
        type: { summary: "string" },
        defaultValue: { summary: "default" },
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
      table: {
        category: "Styling",
      },
    },

    onClick: {
      action: "clicked",
      description: "Callback fired when avatar is clicked",
      table: {
        category: "Events",
        type: { summary: "(event: MouseEvent) => void" },
      },
    },
  },
  parameters: {
    layout: "centered",
    actions: {
      handles: ["click"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

/**
 * Basic avatar with initials fallback.
 */
export const Basic: Story = {
  render: () => (
    <Avatar variant="default" sizes="default">
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
  ),
  parameters: {
    order: 1,
    docs: {
      description: {
        story:
          "Basic avatar displaying user initials. The fallback shows when no image is provided.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("AB")).toBeInTheDocument();
  },
};

/**
 * Avatar with an icon instead of initials.
 */
export const WithIcon: Story = {
  render: () => (
    <Avatar variant="fjord" sizes="default" aria-label="Wheel avatar">
      <AvatarIcon>
        <IconWheel role="img" aria-label="Wheel icon" />
      </AvatarIcon>
    </Avatar>
  ),
  parameters: {
    order: 2,
    docs: {
      description: {
        story:
          "Avatar displaying an icon instead of initials. Useful for system users, bots, or special entities.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText("Wheel avatar")).toBeInTheDocument();
    await expect(canvas.getByRole("img", { name: "Wheel icon" })).toBeInTheDocument();
  },
};

/**
 * Avatar with an image and fallback.
 */
export const WithImage: Story = {
  render: () => (
    <Avatar variant="default" sizes="default" aria-label="User profile avatar">
      <AvatarImage src={getStorybookImagePath("user-avatar2.png")} alt="User avatar" />
      <AvatarFallback>PJ</AvatarFallback>
    </Avatar>
  ),
  parameters: {
    order: 3,
    docs: {
      description: {
        story:
          "Avatar with an image. Falls back to initials if the image fails to load. Hover to see the darkening effect.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const avatar = canvas.getByLabelText("User profile avatar");
    await expect(avatar).toBeInTheDocument();
    await expect(await canvas.findByRole("img", { name: "User avatar" })).toBeInTheDocument();
    await userEvent.hover(avatar);
  },
};

/**
 * All color variants with initials.
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar variant="default">
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
      <Avatar variant="nordic">
        <AvatarFallback>NC</AvatarFallback>
      </Avatar>
      <Avatar variant="fjord">
        <AvatarFallback>FJ</AvatarFallback>
      </Avatar>
      <Avatar variant="aurora">
        <AvatarFallback>AR</AvatarFallback>
      </Avatar>
      <Avatar variant="dusk">
        <AvatarFallback>DK</AvatarFallback>
      </Avatar>
      <Avatar variant="orange">
        <AvatarFallback>OR</AvatarFallback>
      </Avatar>
      <Avatar variant="sky">
        <AvatarFallback>SK</AvatarFallback>
      </Avatar>
      <Avatar variant="overflow">
        <AvatarFallback>+4</AvatarFallback>
      </Avatar>
    </div>
  ),
  parameters: {
    order: 4,
    docs: {
      description: {
        story:
          'All available color variants. Each variant serves different semantic or decorative purposes. The overflow variant is special for showing "+N" indicators.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("AB")).toBeInTheDocument();
    await expect(canvas.getByText("NC")).toBeInTheDocument();
    await expect(canvas.getByText("FJ")).toBeInTheDocument();
    await expect(canvas.getByText("AR")).toBeInTheDocument();
    await expect(canvas.getByText("DK")).toBeInTheDocument();
    await expect(canvas.getByText("OR")).toBeInTheDocument();
    await expect(canvas.getByText("SK")).toBeInTheDocument();
    await expect(canvas.getByText("+4")).toBeInTheDocument();
  },
};

/**
 * All color variants with icons.
 */
export const AllVariantsWithIcons: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar variant="default">
        <AvatarIcon>
          <IconUser role="img" aria-label="Default user icon" />
        </AvatarIcon>
      </Avatar>
      <Avatar variant="nordic">
        <AvatarIcon>
          <IconRobot role="img" aria-label="Nordic robot icon" />
        </AvatarIcon>
      </Avatar>
      <Avatar variant="fjord">
        <AvatarIcon>
          <IconWheel role="img" aria-label="Fjord wheel icon" />
        </AvatarIcon>
      </Avatar>
      <Avatar variant="aurora">
        <AvatarIcon>
          <IconStar role="img" aria-label="Aurora star icon" />
        </AvatarIcon>
      </Avatar>
      <Avatar variant="dusk">
        <AvatarIcon>
          <IconHeart role="img" aria-label="Dusk heart icon" />
        </AvatarIcon>
      </Avatar>
      <Avatar variant="orange">
        <AvatarIcon>
          <IconUser role="img" aria-label="Orange user icon" />
        </AvatarIcon>
      </Avatar>
      <Avatar variant="sky">
        <AvatarIcon>
          <IconRobot role="img" aria-label="Sky robot icon" />
        </AvatarIcon>
      </Avatar>
    </div>
  ),
  parameters: {
    order: 5,
    docs: {
      description: {
        story:
          "All color variants displaying icons. Useful for differentiating user types, roles, or entities.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("img", { name: "Default user icon" })).toBeInTheDocument();
    await expect(canvas.getByRole("img", { name: "Nordic robot icon" })).toBeInTheDocument();
    await expect(canvas.getByRole("img", { name: "Fjord wheel icon" })).toBeInTheDocument();
    await expect(canvas.getByRole("img", { name: "Aurora star icon" })).toBeInTheDocument();
    await expect(canvas.getByRole("img", { name: "Dusk heart icon" })).toBeInTheDocument();
    await expect(canvas.getByRole("img", { name: "Orange user icon" })).toBeInTheDocument();
    await expect(canvas.getByRole("img", { name: "Sky robot icon" })).toBeInTheDocument();
  },
};

/**
 * All size variants.
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar variant="nordic" sizes="default">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
      <Avatar variant="nordic" sizes="xsm">
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar variant="nordic" sizes="xxsm">
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
    </div>
  ),
  parameters: {
    order: 6,
    docs: {
      description: {
        story: "Choose available sizes based on context and space constraints.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("LG")).toBeInTheDocument();
    await expect(canvas.getByText("MD")).toBeInTheDocument();
    await expect(canvas.getByText("SM")).toBeInTheDocument();
  },
};

/**
 * Avatars with icons at different sizes.
 */
export const IconAllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar variant="nordic" sizes="default">
        <AvatarIcon>
          <IconUser role="img" aria-label="Large user icon" />
        </AvatarIcon>
      </Avatar>
      <Avatar variant="nordic" sizes="xsm">
        <AvatarIcon>
          <IconUser role="img" aria-label="Medium user icon" />
        </AvatarIcon>
      </Avatar>
      <Avatar variant="nordic" sizes="xxsm">
        <AvatarIcon>
          <IconUser role="img" aria-label="Small user icon" />
        </AvatarIcon>
      </Avatar>
    </div>
  ),
  parameters: {
    order: 7,
    docs: {
      description: {
        story: "Icons scale appropriately across all avatar sizes.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("img", { name: "Large user icon" })).toBeInTheDocument();
    await expect(canvas.getByRole("img", { name: "Medium user icon" })).toBeInTheDocument();
    await expect(canvas.getByRole("img", { name: "Small user icon" })).toBeInTheDocument();
  },
};

/**
 * Avatars with images at different sizes.
 */
export const ImagesAllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar variant="fjord" sizes="default">
        <AvatarImage src={getStorybookImagePath("user-avatar2.png")} alt="Large avatar" />
        <AvatarFallback>PJ</AvatarFallback>
      </Avatar>
      <Avatar variant="fjord" sizes="xsm">
        <AvatarImage src={getStorybookImagePath("user-avatar2.png")} alt="Medium avatar" />
        <AvatarFallback>PJ</AvatarFallback>
      </Avatar>
      <Avatar variant="fjord" sizes="xxsm">
        <AvatarImage src={getStorybookImagePath("user-avatar2.png")} alt="Small avatar" />
        <AvatarFallback>PJ</AvatarFallback>
      </Avatar>
    </div>
  ),
  parameters: {
    order: 8,
    docs: {
      description: {
        story:
          "Avatar images at all sizes with fallback text. Hover to see the darkening effect on images.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const largeImage = await canvas.findByRole("img", { name: "Large avatar" });
    await expect(largeImage).toBeInTheDocument();
    await expect(canvas.getByRole("img", { name: "Medium avatar" })).toBeInTheDocument();
    await expect(canvas.getByRole("img", { name: "Small avatar" })).toBeInTheDocument();
    await userEvent.hover(largeImage);
  },
};

/**
 * Interactive click handler.
 */
export const ClickInteraction: Story = {
  render: function AvatarClickTest() {
    const [clicked, setClicked] = useState<string | null>(null);

    return (
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-4">
          <Avatar variant="nordic" onClick={() => setClicked("User 1")} aria-label="User 1 avatar">
            <AvatarFallback>U1</AvatarFallback>
          </Avatar>
          <Avatar variant="fjord" onClick={() => setClicked("User 2")} aria-label="User 2 avatar">
            <AvatarFallback>U2</AvatarFallback>
          </Avatar>
          <Avatar variant="aurora" onClick={() => setClicked("User 3")} aria-label="User 3 avatar">
            <AvatarFallback>U3</AvatarFallback>
          </Avatar>
        </div>
        <p className="text-sm text-muted-foreground">
          {clicked ? `Clicked: ${clicked}` : "Click an avatar"}
        </p>
      </div>
    );
  },
  parameters: {
    order: 9,
    docs: {
      description: {
        story:
          "Interactive avatars with click handlers. Avatars inherit the cursor-pointer class and can be clicked.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const avatar1 = canvas.getByLabelText("User 1 avatar");
    const avatar2 = canvas.getByLabelText("User 2 avatar");

    await expect(canvas.getByText("Click an avatar")).toBeInTheDocument();

    await userEvent.click(avatar1);
    await expect(canvas.getByText("Clicked: User 1")).toBeInTheDocument();

    await userEvent.click(avatar2);
    await expect(canvas.getByText("Clicked: User 2")).toBeInTheDocument();
  },
};

/**
 * Accessibility - alt text for images.
 */
export const Accessibility: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Avatar variant="nordic">
          <AvatarImage src={getStorybookImagePath("user-avatar2.png")} alt="John Doe's avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <Avatar variant="fjord">
          <AvatarImage src={getStorybookImagePath("user-avatar3.png")} alt="Jane Smith's avatar" />
          <AvatarFallback>JS</AvatarFallback>
        </Avatar>
        <Avatar variant="aurora">
          <AvatarImage src={getStorybookImagePath("user-avatar4.png")} alt="" />
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
      </div>
      <p className="text-xs text-muted-foreground max-w-md">
        Avatar images should have descriptive alt text for screen readers. If the avatar is
        decorative, use an empty alt attribute.
      </p>
    </div>
  ),
  parameters: {
    order: 10,
    docs: {
      description: {
        story:
          "Avatars with proper alt text for accessibility. Always include meaningful alt text for avatar images.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(await canvas.findByRole("img", { name: "John Doe's avatar" })).toBeInTheDocument();
    await expect(
      await canvas.findByRole("img", { name: "Jane Smith's avatar" })
    ).toBeInTheDocument();

    const decorativeImage = canvas.queryByAltText("");
    if (decorativeImage) {
      await expect(decorativeImage).toHaveAttribute("alt", "");
    } else {
      await expect(canvas.getByText("PJ")).toBeInTheDocument();
    }
  },
};

/**
 * Edge case: Empty fallback text.
 */
export const EdgeCaseEmpty: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar variant="default" aria-label="Empty default avatar">
        <AvatarFallback />
      </Avatar>
      <Avatar variant="nordic" sizes="xsm" aria-label="Empty nordic avatar">
        <AvatarFallback />
      </Avatar>
      <Avatar variant="fjord" sizes="xxsm" aria-label="Empty fjord avatar">
        <AvatarFallback />
      </Avatar>
    </div>
  ),
  parameters: {
    order: 11,
    docs: {
      description: {
        story:
          "Edge case: Avatars with empty fallback text. They still render with the background color but no content.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText("Empty default avatar")).toBeInTheDocument();
    await expect(canvas.getByLabelText("Empty nordic avatar")).toBeInTheDocument();
    await expect(canvas.getByLabelText("Empty fjord avatar")).toBeInTheDocument();
  },
};

/** Edge case: text overflow with varying character counts. */
export const EdgeCaseLongText: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-foreground">
          Character count variations (default size)
        </p>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center gap-1">
            <Avatar variant="default">
              <AvatarFallback className="text-sm">A</AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">1 char</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Avatar variant="nordic">
              <AvatarFallback className="text-sm">AB</AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">2 chars</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Avatar variant="fjord">
              <AvatarFallback className="text-xs">ABC</AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">3 chars (smaller)</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Avatar variant="aurora">
              <AvatarFallback className="text-xs">ABCD</AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">4 chars (overflow)</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Avatar variant="dusk">
              <AvatarFallback className="text-xs">ABCDE</AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">5+ chars (clipped)</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-foreground">
          Without font size adjustment (text overflows)
        </p>
        <div className="flex items-center gap-4">
          <Avatar variant="default">
            <AvatarFallback>ABCDEFGH</AvatarFallback>
          </Avatar>
          <Avatar variant="nordic" sizes="xsm">
            <AvatarFallback>ABCDEFGH</AvatarFallback>
          </Avatar>
          <Avatar variant="fjord" sizes="xxsm">
            <AvatarFallback>ABCDEFGH</AvatarFallback>
          </Avatar>
        </div>
        <p className="text-xs text-muted-foreground max-w-md">
          Long text overflows and gets clipped. Best practice: limit to 1-2 characters or use
          smaller font size (text-xs) for 3+ characters.
        </p>
      </div>
    </div>
  ),
  parameters: {
    order: 12,
    docs: {
      description: {
        story:
          "Edge case showing how fallback text behaves across short and long character counts.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Character count variations (default size)")).toBeInTheDocument();
    await expect(
      canvas.getByText("Without font size adjustment (text overflows)")
    ).toBeInTheDocument();
    await expect(canvas.getAllByText("ABCDEFGH")).toHaveLength(3);
  },
};

/**
 * Edge case: Special characters and unicode.
 */
export const EdgeCaseSpecialCharacters: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar variant="orange">
        <AvatarFallback>
          <span role="img" aria-label="artist palette">
            🎨
          </span>
          <span role="img" aria-label="fire">
            🔥
          </span>
        </AvatarFallback>
      </Avatar>
      <Avatar variant="sky">
        <AvatarFallback>@#$</AvatarFallback>
      </Avatar>
      <Avatar variant="default">
        <AvatarFallback>中文</AvatarFallback>
      </Avatar>
      <Avatar variant="aurora">
        <AvatarFallback>Кир</AvatarFallback>
      </Avatar>
      <Avatar variant="dusk">
        <AvatarFallback>♥♦♣♠</AvatarFallback>
      </Avatar>
    </div>
  ),
  parameters: {
    order: 13,
    docs: {
      description: {
        story:
          "Edge case: Avatars with emojis, special characters, and unicode from various languages.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("img", { name: "artist palette" })).toBeInTheDocument();
    await expect(canvas.getByText("@#$")).toBeInTheDocument();
    await expect(canvas.getByText("中文")).toBeInTheDocument();
    await expect(canvas.getByText("Кир")).toBeInTheDocument();
    await expect(canvas.getByText("♥♦♣♠")).toBeInTheDocument();
  },
};

/**
 * Edge case: Single character.
 */
export const EdgeCaseSingleCharacter: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar variant="dusk">
        <AvatarFallback>A</AvatarFallback>
      </Avatar>
      <Avatar variant="orange" sizes="xsm">
        <AvatarFallback>Z</AvatarFallback>
      </Avatar>
      <Avatar variant="sky" sizes="xxsm">
        <AvatarFallback>M</AvatarFallback>
      </Avatar>
    </div>
  ),
  parameters: {
    order: 14,
    docs: {
      description: {
        story:
          "Edge case: Avatars with single character fallback. Common for minimalist designs or single-name users.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("A")).toBeInTheDocument();
    await expect(canvas.getByText("Z")).toBeInTheDocument();
    await expect(canvas.getByText("M")).toBeInTheDocument();
  },
};

/**
 * Edge case: Numbers as fallback.
 */
export const EdgeCaseNumbers: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar variant="nordic">
        <AvatarFallback>1</AvatarFallback>
      </Avatar>
      <Avatar variant="fjord">
        <AvatarFallback>42</AvatarFallback>
      </Avatar>
      <Avatar variant="aurora">
        <AvatarFallback>999</AvatarFallback>
      </Avatar>
      <Avatar variant="overflow">
        <AvatarFallback>+99</AvatarFallback>
      </Avatar>
    </div>
  ),
  parameters: {
    order: 15,
    docs: {
      description: {
        story:
          "Edge case: Avatars with numbers. Useful for rankings, counts, or numbered entities.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("1")).toBeInTheDocument();
    await expect(canvas.getByText("42")).toBeInTheDocument();
    await expect(canvas.getByText("999")).toBeInTheDocument();
    await expect(canvas.getByText("+99")).toBeInTheDocument();
  },
};

/**
 * Edge case: Mixed content (very small sizes with text).
 */
export const EdgeCaseTinyWithText: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar variant="nordic" sizes="xxsm">
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
      <Avatar variant="fjord" sizes="xxsm">
        <AvatarFallback>ABC</AvatarFallback>
      </Avatar>
      <Avatar variant="aurora" sizes="xxsm">
        <AvatarFallback>ABCD</AvatarFallback>
      </Avatar>
    </div>
  ),
  parameters: {
    order: 16,
    docs: {
      description: {
        story:
          "Edge case: Very small avatars (xxsm - 20px) with increasing text lengths. Text may overflow or be cut off.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("AB")).toBeInTheDocument();
    await expect(canvas.getByText("ABC")).toBeInTheDocument();
    await expect(canvas.getByText("ABCD")).toBeInTheDocument();
  },
};

/**
 * Edge case: Failed image loading.
 */
export const EdgeCaseFailedImage: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar variant="nordic">
        <AvatarImage src={getStorybookImagePath("nonexistent-image-1.png")} alt="Failed to load" />
        <AvatarFallback>FL</AvatarFallback>
      </Avatar>
      <Avatar variant="fjord">
        <AvatarImage src={getStorybookImagePath("nonexistent-image-2.png")} alt="Failed to load" />
        <AvatarFallback>ER</AvatarFallback>
      </Avatar>
      <Avatar variant="aurora">
        <AvatarImage src={getStorybookImagePath("nonexistent-image-3.png")} alt="Failed to load" />
        <AvatarFallback>BR</AvatarFallback>
      </Avatar>
    </div>
  ),
  parameters: {
    order: 17,
    docs: {
      description: {
        story:
          "Edge case: Avatars with images that fail to load. The fallback text displays instead, demonstrating graceful degradation.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText("FL")).toBeInTheDocument();
    await expect(await canvas.findByText("ER")).toBeInTheDocument();
    await expect(await canvas.findByText("BR")).toBeInTheDocument();
  },
};

/**
 * Edge case: Nested complex icons.
 */
export const EdgeCaseComplexIcons: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar variant="nordic">
        <AvatarIcon>
          <div className="flex items-center justify-center gap-1">
            <IconStar className="size-2" role="img" aria-label="Star icon" />
            <IconStar className="size-2" role="img" aria-label="Star icon" />
          </div>
        </AvatarIcon>
      </Avatar>
      <Avatar variant="fjord">
        <AvatarIcon>
          <svg width="20" height="20" viewBox="0 0 20 20" role="img" aria-label="Avatar icon">
            <title>Avatar icon</title>
            <circle cx="10" cy="10" r="8" fill="currentColor" opacity="0.3" />
            <circle cx="10" cy="10" r="4" fill="currentColor" />
          </svg>
        </AvatarIcon>
      </Avatar>
      <Avatar variant="aurora">
        <AvatarIcon>
          <span className="text-xs font-bold">AI</span>
        </AvatarIcon>
      </Avatar>
    </div>
  ),
  parameters: {
    order: 18,
    docs: {
      description: {
        story:
          "Edge case: Avatars with complex nested content in AvatarIcon, including multiple icons, custom SVGs, and text.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("img", { name: "Avatar icon" })).toBeInTheDocument();
    await expect(canvas.getByText("AI")).toBeInTheDocument();
    await expect(canvas.getAllByRole("img", { name: "Star icon" }).length).toBeGreaterThanOrEqual(
      2
    );
  },
};

/**
 * Visual regression testing - comprehensive overview.
 */
export const VisualRegression: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-8">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">All Variants</h3>
        <div className="flex flex-wrap gap-3">
          <Avatar variant="default">
            <AvatarFallback>DF</AvatarFallback>
          </Avatar>
          <Avatar variant="nordic">
            <AvatarFallback>NC</AvatarFallback>
          </Avatar>
          <Avatar variant="fjord">
            <AvatarFallback>FJ</AvatarFallback>
          </Avatar>
          <Avatar variant="aurora">
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>
          <Avatar variant="dusk">
            <AvatarFallback>DK</AvatarFallback>
          </Avatar>
          <Avatar variant="orange">
            <AvatarFallback>OR</AvatarFallback>
          </Avatar>
          <Avatar variant="sky">
            <AvatarFallback>SK</AvatarFallback>
          </Avatar>
          <Avatar variant="overflow">
            <AvatarFallback>+4</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">All Sizes</h3>
        <div className="flex flex-wrap items-center gap-3">
          <Avatar variant="nordic" sizes="default">
            <AvatarFallback>LG</AvatarFallback>
          </Avatar>
          <Avatar variant="nordic" sizes="xsm">
            <AvatarFallback>MD</AvatarFallback>
          </Avatar>
          <Avatar variant="nordic" sizes="xxsm">
            <AvatarFallback>SM</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">With Icons</h3>
        <div className="flex flex-wrap gap-3">
          <Avatar variant="default">
            <AvatarIcon>
              <IconUser />
            </AvatarIcon>
          </Avatar>
          <Avatar variant="nordic">
            <AvatarIcon>
              <IconRobot />
            </AvatarIcon>
          </Avatar>
          <Avatar variant="fjord">
            <AvatarIcon>
              <IconWheel />
            </AvatarIcon>
          </Avatar>
          <Avatar variant="aurora">
            <AvatarIcon>
              <IconStar />
            </AvatarIcon>
          </Avatar>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">With Images</h3>
        <div className="flex flex-wrap gap-3">
          <Avatar variant="default">
            <AvatarImage src={getStorybookImagePath("user-avatar2.png")} alt="User" />
            <AvatarFallback>PJ</AvatarFallback>
          </Avatar>
          <Avatar variant="nordic">
            <AvatarImage src={getStorybookImagePath("user-avatar3.png")} alt="User" />
            <AvatarFallback>NC</AvatarFallback>
          </Avatar>
          <Avatar variant="fjord">
            <AvatarImage src={getStorybookImagePath("user-avatar4.png")} alt="User" />
            <AvatarFallback>FJ</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Avatar Group</h3>
        <div className="flex items-center">
          <Avatar
            variant="nordic"
            className="relative -ml-1 first:ml-0 z-1 border-2 border-background"
          >
            <AvatarFallback>U1</AvatarFallback>
          </Avatar>
          <Avatar variant="fjord" className="relative -ml-1 z-2 border-2 border-background">
            <AvatarFallback>U2</AvatarFallback>
          </Avatar>
          <Avatar variant="aurora" className="relative -ml-1 z-3 border-2 border-background">
            <AvatarFallback>U3</AvatarFallback>
          </Avatar>
          <Avatar variant="overflow" className="relative -ml-1 z-4 border-2 border-background">
            <AvatarFallback>+5</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Edge Cases</h3>
        <div className="flex flex-wrap gap-3">
          <Avatar variant="default">
            <AvatarFallback />
          </Avatar>
          <Avatar variant="nordic">
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <Avatar variant="fjord">
            <AvatarFallback>ABCDEFGH</AvatarFallback>
          </Avatar>
          <Avatar variant="aurora">
            <AvatarFallback>
              <span role="img" aria-label="artist palette">
                🎨
              </span>
            </AvatarFallback>
          </Avatar>
          <Avatar variant="dusk">
            <AvatarFallback>中文</AvatarFallback>
          </Avatar>
          <Avatar variant="overflow">
            <AvatarFallback>+999</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  ),
  parameters: {
    order: 19,
    docs: {
      description: {
        story:
          "Comprehensive visual overview of all avatar variants, sizes, and edge cases for visual regression testing in Chromatic.",
      },
    },
    chromatic: {
      disableSnapshot: false,
    },
  },
};

/** Interactive playground for avatar props. */
export const Playground: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>PJ</AvatarFallback>
    </Avatar>
  ),
  args: {
    variant: "nordic",
    sizes: "default",
  },
  parameters: {
    order: 99,
    docs: {
      description: {
        story: "Interactive playground for trying avatar variants and sizes.",
      },
    },
  },
};
