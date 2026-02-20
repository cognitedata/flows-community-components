import { Avatar, AvatarFallback, AvatarIcon, AvatarImage } from "@/components/ui/aura/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/aura/dropdown-menu";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/aura/hover-card";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { IconHeart, IconRobot, IconStar, IconUser, IconWheel } from "@tabler/icons-react";
import { useState } from "react";
import { getStorybookImagePath } from "../../../../lib/utils";
const meta: Meta<typeof Avatar> = {
  title: "Primitives/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "nordic", "aurora", "fjord", "dusk", "orange", "sky", "overflow"],
      table: {
        category: "Appearance",
        type: {
          summary: "string",
        },
        defaultValue: {
          summary: "default",
        },
      },
    },
    sizes: {
      control: "select",
      options: ["default", "xsm", "xxsm"],
      table: {
        category: "Appearance",
        type: {
          summary: "string",
        },
        defaultValue: {
          summary: "default",
        },
      },
    },
    className: {
      control: "text",
      table: {
        category: "Styling",
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
export const Basic: Story = {
  render: () => (
    <Avatar variant="default" sizes="default">
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
  ),
  parameters: {
    order: 1,
  },
  play: async ({ canvasElement }) => {
    const avatar = canvasElement.querySelector('[data-slot="avatar"]');
    await expect(avatar).toBeInTheDocument();
    const fallback = canvasElement.querySelector('[data-slot="avatar-fallback"]');
    await expect(fallback).toHaveTextContent("AB");
  },
};
export const WithIcon: Story = {
  render: () => (
    <Avatar variant="fjord" sizes="default">
      <AvatarIcon>
        <IconWheel />
      </AvatarIcon>
    </Avatar>
  ),
  parameters: {
    order: 2,
  },
  play: async ({ canvasElement }) => {
    const avatar = canvasElement.querySelector('[data-slot="avatar"]');
    await expect(avatar).toBeInTheDocument();
    const icon = avatar?.querySelector("svg");
    await expect(icon).toBeInTheDocument();
  },
};
export const WithImage: Story = {
  render: () => (
    <Avatar variant="default" sizes="default">
      <AvatarImage src={getStorybookImagePath("user-avatar2.png")} alt="User avatar" />
      <AvatarFallback>PJ</AvatarFallback>
    </Avatar>
  ),
  parameters: {
    order: 3,
  },
  play: async ({ canvasElement }) => {
    const avatar = canvasElement.querySelector('[data-slot="avatar"]');
    await expect(avatar).toBeInTheDocument();
    await waitFor(
      () => {
        const found = canvasElement.querySelector('[data-slot="avatar-image"]');
        expect(found).toBeInTheDocument();
        return found;
      },
      {
        timeout: 2000,
      }
    );
    if (avatar) {
      await userEvent.hover(avatar as Element);
    }
  },
};
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
  },
  play: async ({ canvasElement }) => {
    const avatars = canvasElement.querySelectorAll('[data-slot="avatar"]');
    await expect(avatars.length).toBe(8);
    const fallbacks = canvasElement.querySelectorAll('[data-slot="avatar-fallback"]');
    await expect(fallbacks.length).toBe(8);
  },
};
export const AllVariantsWithIcons: Story = {
  render: () => (
    <div className="flex items-center gap-4">
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
      <Avatar variant="dusk">
        <AvatarIcon>
          <IconHeart />
        </AvatarIcon>
      </Avatar>
      <Avatar variant="orange">
        <AvatarIcon>
          <IconUser />
        </AvatarIcon>
      </Avatar>
      <Avatar variant="sky">
        <AvatarIcon>
          <IconRobot />
        </AvatarIcon>
      </Avatar>
    </div>
  ),
  parameters: {
    order: 5,
  },
  play: async ({ canvasElement }) => {
    const avatars = canvasElement.querySelectorAll('[data-slot="avatar"]');
    await expect(avatars.length).toBe(7);
    const icons = canvasElement.querySelectorAll('[data-slot="avatar-icon"]');
    await expect(icons.length).toBe(7);
  },
};
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
  },
  play: async ({ canvasElement }) => {
    const avatars = canvasElement.querySelectorAll('[data-slot="avatar"]');
    await expect(avatars.length).toBe(3);
    const large = canvasElement.querySelector('[class*="size-9"]');
    const medium = canvasElement.querySelector('[class*="size-7"]');
    const small = canvasElement.querySelector('[class*="size-5"]');
    await expect(large).toBeInTheDocument();
    await expect(medium).toBeInTheDocument();
    await expect(small).toBeInTheDocument();
  },
};
export const IconAllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar variant="nordic" sizes="default">
        <AvatarIcon>
          <IconUser />
        </AvatarIcon>
      </Avatar>
      <Avatar variant="nordic" sizes="xsm">
        <AvatarIcon>
          <IconUser />
        </AvatarIcon>
      </Avatar>
      <Avatar variant="nordic" sizes="xxsm">
        <AvatarIcon>
          <IconUser />
        </AvatarIcon>
      </Avatar>
    </div>
  ),
  parameters: {
    order: 7,
  },
  play: async ({ canvasElement }) => {
    const avatars = canvasElement.querySelectorAll('[data-slot="avatar"]');
    await expect(avatars.length).toBe(3);
    const icons = canvasElement.querySelectorAll("svg");
    await expect(icons.length).toBe(3);
    const large = canvasElement.querySelector('[class*="size-9"]');
    const medium = canvasElement.querySelector('[class*="size-7"]');
    const small = canvasElement.querySelector('[class*="size-5"]');
    await expect(large).toBeInTheDocument();
    await expect(medium).toBeInTheDocument();
    await expect(small).toBeInTheDocument();
  },
};
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
  },
  play: async ({ canvasElement }) => {
    const avatars = canvasElement.querySelectorAll('[data-slot="avatar"]');
    await expect(avatars.length).toBe(3);
    const images = await waitFor(
      () => {
        const found = canvasElement.querySelectorAll('[data-slot="avatar-image"]');
        if (found.length < 3) {
          throw new Error(`Expected 3 images, found ${found.length}`);
        }
        return found;
      },
      {
        timeout: 5000,
      }
    );
    expect(images.length).toBe(3);
    const firstAvatar = avatars[0];
    if (firstAvatar) {
      await userEvent.hover(firstAvatar as Element);
    }
  },
};
export const AvatarGroup: Story = {
  render: () => (
    <div className="flex items-center">
      <Avatar
        variant="nordic"
        sizes="default"
        className="relative -ml-1 first:ml-0 z-1 border-2 border-background"
      >
        <AvatarImage src={getStorybookImagePath("user-avatar3.png")} alt="User 1" />
        <AvatarFallback>NC</AvatarFallback>
      </Avatar>
      <Avatar
        variant="default"
        sizes="default"
        className="relative -ml-1 z-2 border-2 border-background"
      >
        <AvatarImage src={getStorybookImagePath("user-avatar4.png")} alt="User 2" />
        <AvatarFallback>AR</AvatarFallback>
      </Avatar>
      <Avatar
        variant="default"
        sizes="default"
        className="relative -ml-1 z-3 border-2 border-background"
      >
        <AvatarImage src={getStorybookImagePath("user-avatar5.png")} alt="User 3" />
        <AvatarFallback>PJ</AvatarFallback>
      </Avatar>
      <Avatar
        variant="default"
        sizes="default"
        className="relative -ml-1 z-4 border-2 border-background"
      >
        <AvatarImage src={getStorybookImagePath("user-avatar6.png")} alt="User 4" />
        <AvatarFallback>PJ</AvatarFallback>
      </Avatar>
      <HoverCard openDelay={0} closeDelay={0}>
        <HoverCardTrigger
          render={
            <Avatar
              variant="overflow"
              sizes="default"
              className="relative -ml-1 z-5 border-2 border-background"
            >
              <AvatarFallback>+4</AvatarFallback>
            </Avatar>
          }
        />
        <HoverCardContent className="w-auto p-3">
          <div className="flex flex-col gap-2">
            <p className="text-xs text-muted-foreground font-medium">4 more people</p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Avatar variant="aurora" sizes="xsm">
                  <AvatarFallback>EL</AvatarFallback>
                </Avatar>
                <span className="text-sm">Emma Liu</span>
              </div>
              <div className="flex items-center gap-2">
                <Avatar variant="dusk" sizes="xsm">
                  <AvatarFallback>JK</AvatarFallback>
                </Avatar>
                <span className="text-sm">James Kim</span>
              </div>
              <div className="flex items-center gap-2">
                <Avatar variant="orange" sizes="xsm">
                  <AvatarFallback>SB</AvatarFallback>
                </Avatar>
                <span className="text-sm">Sarah Brown</span>
              </div>
              <div className="flex items-center gap-2">
                <Avatar variant="sky" sizes="xsm">
                  <AvatarFallback>MT</AvatarFallback>
                </Avatar>
                <span className="text-sm">Michael Torres</span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
  parameters: {
    order: 9,
  },
  play: async ({ canvasElement }) => {
    const avatars = canvasElement.querySelectorAll('[data-slot="avatar"]');
    await expect(avatars.length).toBeGreaterThanOrEqual(4);
    const fallbacks = canvasElement.querySelectorAll('[data-slot="avatar-fallback"]');
    const overflow = Array.from(fallbacks).find((fb) => fb.textContent?.includes("+4"));
    if (overflow) {
      const overflowAvatar = overflow.closest('[data-slot="avatar"]');
      if (overflowAvatar) {
        await userEvent.hover(overflowAvatar as Element);
        await waitFor(() => {
          const hoverCard = document.querySelector('[data-slot="hover-card-content"][data-open]');
          expect(hoverCard).toBeInTheDocument();
        });
      }
    }
  },
};
export const AvatarGroupSmall: Story = {
  render: () => (
    <div className="flex items-center">
      <Avatar
        variant="nordic"
        sizes="xsm"
        className="relative -ml-1 first:ml-0 z-1 border-2 border-background"
      >
        <AvatarFallback>PJ</AvatarFallback>
      </Avatar>
      <Avatar
        variant="orange"
        sizes="xsm"
        className="relative -ml-1 z-2 border-2 border-background"
      >
        <AvatarFallback>PJ</AvatarFallback>
      </Avatar>
      <Avatar variant="dusk" sizes="xsm" className="relative -ml-1 z-3 border-2 border-background">
        <AvatarFallback>PJ</AvatarFallback>
      </Avatar>
      <Avatar
        variant="aurora"
        sizes="xsm"
        className="relative -ml-1 z-4 border-2 border-background"
      >
        <AvatarFallback>PJ</AvatarFallback>
      </Avatar>
      <HoverCard openDelay={0} closeDelay={0}>
        <HoverCardTrigger
          render={
            <Avatar
              variant="overflow"
              sizes="xsm"
              className="relative -ml-1 z-5 border-2 border-background"
            >
              <AvatarFallback>+4</AvatarFallback>
            </Avatar>
          }
        />
        <HoverCardContent className="w-auto p-3">
          <div className="flex flex-col gap-2">
            <p className="text-xs text-muted-foreground font-medium">4 more people</p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Avatar variant="aurora" sizes="xsm">
                  <AvatarFallback>EL</AvatarFallback>
                </Avatar>
                <span className="text-sm">Emma Liu</span>
              </div>
              <div className="flex items-center gap-2">
                <Avatar variant="dusk" sizes="xsm">
                  <AvatarFallback>JK</AvatarFallback>
                </Avatar>
                <span className="text-sm">James Kim</span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
  parameters: {
    order: 22,
  },
  play: async ({ canvasElement }) => {
    const avatars = canvasElement.querySelectorAll('[data-slot="avatar"]');
    await expect(avatars.length).toBeGreaterThanOrEqual(4);
    const smallAvatars = Array.from(avatars).filter((avatar) =>
      avatar.className.includes("size-7")
    );
    await expect(smallAvatars.length).toBeGreaterThan(0);
  },
};
export const ClickInteraction: Story = {
  render: function AvatarClickTest() {
    const [clicked, setClicked] = useState<string | null>(null);
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-4">
          <Avatar variant="nordic" onClick={() => setClicked("User 1")} data-testid="avatar-1">
            <AvatarFallback>U1</AvatarFallback>
          </Avatar>
          <Avatar variant="fjord" onClick={() => setClicked("User 2")} data-testid="avatar-2">
            <AvatarFallback>U2</AvatarFallback>
          </Avatar>
          <Avatar variant="aurora" onClick={() => setClicked("User 3")} data-testid="avatar-3">
            <AvatarFallback>U3</AvatarFallback>
          </Avatar>
        </div>
        <div data-testid="clicked-avatar" className="text-sm text-muted-foreground">
          {clicked ? `Clicked: ${clicked}` : "Click an avatar"}
        </div>
      </div>
    );
  },
  parameters: {
    order: 22,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const avatar1 = canvas.getByTestId("avatar-1");
    const avatar2 = canvas.getByTestId("avatar-2");
    const clickedText = canvas.getByTestId("clicked-avatar");
    await expect(clickedText).toHaveTextContent("Click an avatar");
    await userEvent.click(avatar1);
    await expect(clickedText).toHaveTextContent("Clicked: User 1");
    await userEvent.click(avatar2);
    await expect(clickedText).toHaveTextContent("Clicked: User 2");
  },
};
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
    order: 22,
  },
  play: async ({ canvasElement }) => {
    const avatars = canvasElement.querySelectorAll('[data-slot="avatar"]');
    await expect(avatars.length).toBe(3);
    const canvas = within(canvasElement);
    await waitFor(() => {
      const images = canvasElement.querySelectorAll("img");
      const altTexts = Array.from(images).map((image) => image.getAttribute("alt"));
      expect(altTexts).toContain("John Doe's avatar");
      expect(altTexts).toContain("Jane Smith's avatar");
    });
    const decorativeAvatar = canvasElement.querySelectorAll('[data-slot="avatar"]')[2];
    const decorativeImage = decorativeAvatar?.querySelector(
      'img[data-slot="avatar-image"]'
    ) as HTMLImageElement | null;
    if (decorativeImage) {
      await expect(decorativeImage).toHaveAttribute("alt", "");
    } else {
      const decorativeFallback = decorativeAvatar?.querySelector('[data-slot="avatar-fallback"]');
      await expect(decorativeFallback).toBeInTheDocument();
    }
  },
};
export const EdgeCaseEmpty: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar variant="default">
        <AvatarFallback />
      </Avatar>
      <Avatar variant="nordic" sizes="xsm">
        <AvatarFallback />
      </Avatar>
      <Avatar variant="fjord" sizes="xxsm">
        <AvatarFallback />
      </Avatar>
    </div>
  ),
  parameters: {
    order: 22,
  },
  play: async ({ canvasElement }) => {
    const avatars = canvasElement.querySelectorAll('[data-slot="avatar"]');
    await expect(avatars.length).toBe(3);
    const fallbacks = canvasElement.querySelectorAll('[data-slot="avatar-fallback"]');
    await expect(fallbacks.length).toBe(3);
  },
};
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
    order: 22,
  },
  play: async ({ canvasElement }) => {
    const fallbacks = canvasElement.querySelectorAll('[data-slot="avatar-fallback"]');
    await expect(fallbacks.length).toBeGreaterThanOrEqual(3);
    const longTextAvatars = Array.from(fallbacks).filter((fb) =>
      fb.textContent?.includes("ABCDEFGH")
    );
    await expect(longTextAvatars.length).toBeGreaterThanOrEqual(3);
  },
};
export const EdgeCaseSpecialCharacters: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar variant="orange">
        <AvatarFallback>🎨🔥</AvatarFallback>
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
    order: 22,
  },
  play: async ({ canvasElement }) => {
    const avatars = canvasElement.querySelectorAll('[data-slot="avatar"]');
    await expect(avatars.length).toBe(5);
    const emojiFallback = Array.from(
      canvasElement.querySelectorAll('[data-slot="avatar-fallback"]')
    ).find((el) => el.textContent?.includes("🎨"));
    await expect(emojiFallback).toBeInTheDocument();
    const chineseFallback = Array.from(
      canvasElement.querySelectorAll('[data-slot="avatar-fallback"]')
    ).find((el) => el.textContent?.includes("中文"));
    await expect(chineseFallback).toBeInTheDocument();
  },
};
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
    order: 22,
  },
  play: async ({ canvasElement }) => {
    const fallbacks = canvasElement.querySelectorAll('[data-slot="avatar-fallback"]');
    await expect(fallbacks.length).toBe(3);
    await expect(fallbacks[0]).toHaveTextContent("A");
    await expect(fallbacks[1]).toHaveTextContent("Z");
    await expect(fallbacks[2]).toHaveTextContent("M");
  },
};
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
    order: 22,
  },
  play: async ({ canvasElement }) => {
    const fallbacks = canvasElement.querySelectorAll('[data-slot="avatar-fallback"]');
    await expect(fallbacks.length).toBe(4);
    await expect(fallbacks[0]).toHaveTextContent("1");
    await expect(fallbacks[1]).toHaveTextContent("42");
    await expect(fallbacks[2]).toHaveTextContent("999");
    await expect(fallbacks[3]).toHaveTextContent("+99");
  },
};
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
    order: 22,
  },
  play: async ({ canvasElement }) => {
    const avatars = canvasElement.querySelectorAll('[data-slot="avatar"]');
    await expect(avatars.length).toBe(3);
    const tinyAvatars = Array.from(avatars).filter((avatar) => avatar.className.includes("size-5"));
    await expect(tinyAvatars.length).toBe(3);
  },
};
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
    order: 22,
  },
  play: async ({ canvasElement }) => {
    const avatars = canvasElement.querySelectorAll('[data-slot="avatar"]');
    await expect(avatars.length).toBe(3);
    const canvas = within(canvasElement);
    await expect(await canvas.findByText("FL")).toBeInTheDocument();
    await expect(await canvas.findByText("ER")).toBeInTheDocument();
    await expect(await canvas.findByText("BR")).toBeInTheDocument();
  },
};
export const OverflowAvatarWithMenu: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        <Avatar
          variant="nordic"
          sizes="default"
          className="relative -ml-1 first:ml-0 z-1 border-2 border-background"
        >
          <AvatarImage src={getStorybookImagePath("user-avatar3.png")} alt="User 1" />
          <AvatarFallback>NC</AvatarFallback>
        </Avatar>
        <Avatar
          variant="default"
          sizes="default"
          className="relative -ml-1 z-2 border-2 border-background"
        >
          <AvatarImage src={getStorybookImagePath("user-avatar4.png")} alt="User 2" />
          <AvatarFallback>AR</AvatarFallback>
        </Avatar>
        <Avatar
          variant="default"
          sizes="default"
          className="relative -ml-1 z-3 border-2 border-background"
        >
          <AvatarImage src={getStorybookImagePath("user-avatar5.png")} alt="User 3" />
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
        <Avatar
          variant="default"
          sizes="default"
          className="relative -ml-1 z-4 border-2 border-background"
        >
          <AvatarImage src={getStorybookImagePath("user-avatar6.png")} alt="User 4" />
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Avatar
                variant="overflow"
                sizes="default"
                className="relative -ml-1 z-5 border-2 border-background cursor-pointer"
              >
                <AvatarFallback>+4</AvatarFallback>
              </Avatar>
            }
          />
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs text-muted-foreground font-normal px-2 py-1.5">
                4 more people
              </DropdownMenuLabel>
              <div className="p-1 space-y-1">
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-sm hover:bg-accent">
                  <Avatar variant="aurora" sizes="xsm">
                    <AvatarFallback>EL</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Emma Liu</span>
                    <span className="text-xs text-muted-foreground">emma.liu@cognite.com</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-sm hover:bg-accent">
                  <Avatar variant="dusk" sizes="xsm">
                    <AvatarFallback>JK</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">James Kim</span>
                    <span className="text-xs text-muted-foreground">james.kim@cognite.com</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-sm hover:bg-accent">
                  <Avatar variant="orange" sizes="xsm">
                    <AvatarFallback>SB</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Sarah Brown</span>
                    <span className="text-xs text-muted-foreground">sarah.brown@cognite.com</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-sm hover:bg-accent">
                  <Avatar variant="sky" sizes="xsm">
                    <AvatarFallback>MT</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Michael Torres</span>
                    <span className="text-xs text-muted-foreground">
                      michael.torres@cognite.com
                    </span>
                  </div>
                </div>
              </div>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <p className="text-xs text-muted-foreground max-w-md">
        Click the overflow avatar (+4) to see additional users in a dropdown menu. Each user is
        displayed with their avatar, name, and email address.
      </p>
    </div>
  ),
  parameters: {
    order: 22,
  },
  play: async ({ canvasElement }) => {
    const avatars = canvasElement.querySelectorAll('[data-slot="avatar"]');
    await expect(avatars.length).toBeGreaterThanOrEqual(4);
    const trigger = canvasElement.querySelector('[data-slot="dropdown-menu-trigger"]');
    if (trigger) {
      await userEvent.click(trigger as Element);
      const menu = await within(canvasElement.ownerDocument.body).findByRole("menu");
      await expect(menu).toBeInTheDocument();
      await expect(within(menu).getByText("Emma Liu")).toBeInTheDocument();
      await expect(within(menu).getByText("James Kim")).toBeInTheDocument();
    }
  },
};
export const EdgeCaseComplexIcons: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar variant="nordic">
        <AvatarIcon>
          <div className="flex items-center justify-center gap-1">
            <IconStar className="size-2" />
            <IconStar className="size-2" />
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
    order: 22,
  },
  play: async ({ canvasElement }) => {
    const avatarIcons = canvasElement.querySelectorAll('[data-slot="avatar-icon"]');
    await expect(avatarIcons.length).toBe(3);
    const firstIcon = avatarIcons[0];
    const stars = firstIcon.querySelectorAll("svg");
    await expect(stars.length).toBeGreaterThanOrEqual(2);
  },
};
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
            <AvatarFallback>🎨</AvatarFallback>
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
    order: 22,
    chromatic: {
      disableSnapshot: false,
    },
  },
};
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
  },
};
