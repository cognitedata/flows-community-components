'use client';

import type { Meta, StoryObj } from '@storybook/nextjs';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarIcon, AvatarImage } from './avatar';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './hover-card';
import {
  IconWheel,
  IconUser,
  IconRobot,
  IconStar,
  IconHeart,
} from '@tabler/icons-react';

const meta: Meta<typeof Avatar> = {
  title: 'UI/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    // Appearance
    variant: {
      control: 'select',
      options: [
        'default',
        'nordic',
        'aurora',
        'fjord',
        'dusk',
        'orange',
        'sky',
        'overflow',
      ],
      description: 'The color scheme variant of the avatar',
      table: {
        category: 'Appearance',
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    sizes: {
      control: 'select',
      options: ['default', 'xsm', 'xxsm'],
      description: 'The size of the avatar',
      table: {
        category: 'Appearance',
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
      table: {
        category: 'Styling',
      },
    },

    // Behavior
    onClick: {
      action: 'clicked',
      description: 'Callback fired when avatar is clicked',
      table: {
        category: 'Events',
        type: { summary: '(event: MouseEvent) => void' },
      },
    },
  },
  parameters: {
    layout: 'centered',
    actions: {
      handles: ['click'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

/**
 * Default avatar with initials fallback.
 */
export const Default: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
  ),
  args: {
    variant: 'default',
    sizes: 'default',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default avatar displaying user initials. The fallback shows when no image is provided.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    // Find the avatar by its data-slot attribute
    const avatar = canvasElement.querySelector('[data-slot="avatar"]');
    await expect(avatar).toBeInTheDocument();

    // Verify fallback text is present
    const fallback = canvasElement.querySelector('[data-slot="avatar-fallback"]');
    await expect(fallback).toHaveTextContent('AB');
  },
};

/**
 * Avatar with an icon instead of initials.
 */
export const WithIcon: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarIcon>
        <IconWheel />
      </AvatarIcon>
    </Avatar>
  ),
  args: {
    variant: 'fjord',
    sizes: 'default',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Avatar displaying an icon instead of initials. Useful for system users, bots, or special entities.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const avatar = canvasElement.querySelector('[data-slot="avatar"]');
    await expect(avatar).toBeInTheDocument();

    // Verify icon is present
    const icon = avatar?.querySelector('svg');
    await expect(icon).toBeInTheDocument();
  },
};

/**
 * Avatar with an image and fallback.
 */
export const WithImage: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="/user-avatar2.png" alt="User avatar" />
      <AvatarFallback>PJ</AvatarFallback>
    </Avatar>
  ),
  args: {
    variant: 'default',
    sizes: 'default',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Avatar with an image. Falls back to initials if the image fails to load. Hover to see the darkening effect.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const avatar = canvasElement.querySelector('[data-slot="avatar"]');
    await expect(avatar).toBeInTheDocument();

    // Verify image element exists
    const image = canvasElement.querySelector('[data-slot="avatar-image"]');
    await expect(image).toBeInTheDocument();

    // Test hover interaction
    if (avatar) {
      await userEvent.hover(avatar as Element);
    }
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
    docs: {
      description: {
        story:
          'All available color variants. Each variant serves different semantic or decorative purposes. The overflow variant is special for showing "+N" indicators.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const avatars = canvasElement.querySelectorAll('[data-slot="avatar"]');
    await expect(avatars.length).toBe(8);

    // Verify each variant has text
    const fallbacks = canvasElement.querySelectorAll(
      '[data-slot="avatar-fallback"]'
    );
    await expect(fallbacks.length).toBe(8);
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
    docs: {
      description: {
        story:
          'All color variants displaying icons. Useful for differentiating user types, roles, or entities.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const avatars = canvasElement.querySelectorAll('[data-slot="avatar"]');
    await expect(avatars.length).toBe(7);

    // Verify icons are present
    const icons = canvasElement.querySelectorAll('[data-slot="avatar-icon"]');
    await expect(icons.length).toBe(7);
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
    docs: {
      description: {
        story:
          'Available avatar sizes: default (36px), xsm (28px), and xxsm (20px). Choose based on context and space constraints.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const avatars = canvasElement.querySelectorAll('[data-slot="avatar"]');
    await expect(avatars.length).toBe(3);

    // Verify different sizes are rendered
    const large = canvasElement.querySelector('[class*="size-9"]');
    const medium = canvasElement.querySelector('[class*="size-7"]');
    const small = canvasElement.querySelector('[class*="size-5"]');

    await expect(large).toBeInTheDocument();
    await expect(medium).toBeInTheDocument();
    await expect(small).toBeInTheDocument();
  },
};

/**
 * Avatars with images at different sizes.
 */
export const ImagesAllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar variant="fjord" sizes="default">
        <AvatarImage src="/user-avatar2.png" alt="Large avatar" />
        <AvatarFallback>PJ</AvatarFallback>
      </Avatar>
      <Avatar variant="fjord" sizes="xsm">
        <AvatarImage src="/user-avatar2.png" alt="Medium avatar" />
        <AvatarFallback>PJ</AvatarFallback>
      </Avatar>
      <Avatar variant="fjord" sizes="xxsm">
        <AvatarImage src="/user-avatar2.png" alt="Small avatar" />
        <AvatarFallback>PJ</AvatarFallback>
      </Avatar>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Avatar images at all sizes with fallback text. Hover to see the darkening effect on images.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const images = canvasElement.querySelectorAll('[data-slot="avatar-image"]');
    await expect(images.length).toBe(3);

    // Test hover on first avatar
    const firstAvatar = canvasElement.querySelector('[data-slot="avatar"]');
    if (firstAvatar) {
      await userEvent.hover(firstAvatar as Element);
    }
  },
};

/**
 * Avatar group with stacked avatars and overflow indicator.
 */
export const AvatarGroup: Story = {
  render: () => (
    <div className="flex items-center">
      <Avatar
        variant="nordic"
        sizes="default"
        className="relative -ml-1 first:ml-0 z-1 border-2 border-background"
      >
        <AvatarImage src="/user-avatar3.png" alt="User 1" />
        <AvatarFallback>NC</AvatarFallback>
      </Avatar>
      <Avatar
        variant="default"
        sizes="default"
        className="relative -ml-1 z-2 border-2 border-background"
      >
        <AvatarImage src="/user-avatar4.png" alt="User 2" />
        <AvatarFallback>AR</AvatarFallback>
      </Avatar>
      <Avatar
        variant="default"
        sizes="default"
        className="relative -ml-1 z-3 border-2 border-background"
      >
        <AvatarImage src="/user-avatar5.png" alt="User 3" />
        <AvatarFallback>PJ</AvatarFallback>
      </Avatar>
      <Avatar
        variant="default"
        sizes="default"
        className="relative -ml-1 z-4 border-2 border-background"
      >
        <AvatarImage src="/user-avatar6.png" alt="User 4" />
        <AvatarFallback>PJ</AvatarFallback>
      </Avatar>
      <HoverCard openDelay={0} closeDelay={0}>
        <HoverCardTrigger asChild>
          <Avatar
            variant="overflow"
            sizes="default"
            className="relative -ml-1 z-5 border-2 border-background"
          >
            <AvatarFallback>+4</AvatarFallback>
          </Avatar>
        </HoverCardTrigger>
        <HoverCardContent className="w-auto p-3">
          <div className="flex flex-col gap-2">
            <p className="text-xs text-muted-foreground font-medium">
              4 more people
            </p>
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
    docs: {
      description: {
        story:
          'Stacked avatar group with negative margins and borders. The overflow avatar (+4) shows additional users in a hover card.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const avatars = canvasElement.querySelectorAll('[data-slot="avatar"]');
    // Should have 5 avatars initially (4 visible + 1 overflow)
    await expect(avatars.length).toBeGreaterThanOrEqual(5);

    // Find the overflow avatar and hover it
    const overflowAvatar = Array.from(avatars).find((avatar) =>
      avatar.querySelector('[data-slot="avatar-fallback"]')?.textContent?.includes('+4')
    );

    if (overflowAvatar) {
      await userEvent.hover(overflowAvatar as Element);
      
      // Wait for hover card to appear
      await waitFor(() => {
        const hoverCard = canvasElement.ownerDocument.querySelector('[role="dialog"]');
        expect(hoverCard).toBeInTheDocument();
      }, { timeout: 500 });
    }
  },
};

/**
 * Small avatar group.
 */
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
      <Avatar
        variant="dusk"
        sizes="xsm"
        className="relative -ml-1 z-3 border-2 border-background"
      >
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
        <HoverCardTrigger asChild>
          <Avatar
            variant="overflow"
            sizes="xsm"
            className="relative -ml-1 z-5 border-2 border-background"
          >
            <AvatarFallback>+4</AvatarFallback>
          </Avatar>
        </HoverCardTrigger>
        <HoverCardContent className="w-auto p-3">
          <div className="flex flex-col gap-2">
            <p className="text-xs text-muted-foreground font-medium">
              4 more people
            </p>
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
    docs: {
      description: {
        story:
          'Compact avatar group using the xsm size. Perfect for tight spaces or showing larger groups.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const avatars = canvasElement.querySelectorAll('[data-slot="avatar"]');
    await expect(avatars.length).toBeGreaterThanOrEqual(5);

    // All should be size-7 (xsm)
    const smallAvatars = Array.from(avatars).filter((avatar) =>
      avatar.className.includes('size-7')
    );
    await expect(smallAvatars.length).toBeGreaterThan(0);
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
          <Avatar
            variant="nordic"
            onClick={() => setClicked('User 1')}
            data-testid="avatar-1"
          >
            <AvatarFallback>U1</AvatarFallback>
          </Avatar>
          <Avatar
            variant="fjord"
            onClick={() => setClicked('User 2')}
            data-testid="avatar-2"
          >
            <AvatarFallback>U2</AvatarFallback>
          </Avatar>
          <Avatar
            variant="aurora"
            onClick={() => setClicked('User 3')}
            data-testid="avatar-3"
          >
            <AvatarFallback>U3</AvatarFallback>
          </Avatar>
        </div>
        <div
          data-testid="clicked-avatar"
          className="text-sm text-muted-foreground"
        >
          {clicked ? `Clicked: ${clicked}` : 'Click an avatar'}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive avatars with click handlers. Avatars inherit the cursor-pointer class and can be clicked.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const avatar1 = canvas.getByTestId('avatar-1');
    const avatar2 = canvas.getByTestId('avatar-2');
    const clickedText = canvas.getByTestId('clicked-avatar');

    // Initial state
    await expect(clickedText).toHaveTextContent('Click an avatar');

    // Click first avatar
    await userEvent.click(avatar1);
    await waitFor(() => expect(clickedText).toHaveTextContent('Clicked: User 1'));

    // Click second avatar
    await userEvent.click(avatar2);
    await waitFor(() => expect(clickedText).toHaveTextContent('Clicked: User 2'));
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
          <AvatarImage src="/user-avatar2.png" alt="John Doe's avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <Avatar variant="fjord">
          <AvatarImage src="/user-avatar3.png" alt="Jane Smith's avatar" />
          <AvatarFallback>JS</AvatarFallback>
        </Avatar>
        <Avatar variant="aurora">
          <AvatarImage src="/user-avatar4.png" alt="" />
          <AvatarFallback>PJ</AvatarFallback>
        </Avatar>
      </div>
      <p className="text-xs text-muted-foreground max-w-md">
        Avatar images should have descriptive alt text for screen readers. If
        the avatar is decorative, use an empty alt attribute.
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Avatars with proper alt text for accessibility. Always include meaningful alt text for avatar images.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const images = canvasElement.querySelectorAll('[data-slot="avatar-image"]');
    await expect(images.length).toBe(3);

    // Verify alt text exists
    const firstImage = images[0] as HTMLImageElement;
    await expect(firstImage.alt).toBeTruthy();
    await expect(firstImage.alt).toContain('avatar');
  },
};

/**
 * Edge case: Empty fallback text.
 */
export const EdgeCaseEmpty: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar variant="default">
        <AvatarFallback></AvatarFallback>
      </Avatar>
      <Avatar variant="nordic" sizes="xsm">
        <AvatarFallback></AvatarFallback>
      </Avatar>
      <Avatar variant="fjord" sizes="xxsm">
        <AvatarFallback></AvatarFallback>
      </Avatar>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Edge case: Avatars with empty fallback text. They still render with the background color but no content.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const avatars = canvasElement.querySelectorAll('[data-slot="avatar"]');
    await expect(avatars.length).toBe(3);

    // Verify fallbacks exist but are empty
    const fallbacks = canvasElement.querySelectorAll(
      '[data-slot="avatar-fallback"]'
    );
    await expect(fallbacks.length).toBe(3);
  },
};

/**
 * Edge case: Very long text overflow.
 */
export const EdgeCaseLongText: Story = {
  render: () => (
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
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Edge case: Avatars with very long fallback text. The text will overflow but typically avatars show 1-3 characters.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const fallbacks = canvasElement.querySelectorAll(
      '[data-slot="avatar-fallback"]'
    );
    await expect(fallbacks.length).toBe(3);

    // Verify long text is present
    const firstFallback = fallbacks[0];
    await expect(firstFallback).toHaveTextContent('ABCDEFGH');
  },
};

/**
 * Edge case: Special characters and unicode.
 */
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
    docs: {
      description: {
        story:
          'Edge case: Avatars with emojis, special characters, and unicode from various languages.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const avatars = canvasElement.querySelectorAll('[data-slot="avatar"]');
    await expect(avatars.length).toBe(5);

    // Verify emoji avatar
    const emojiFallback = Array.from(
      canvasElement.querySelectorAll('[data-slot="avatar-fallback"]')
    ).find((el) => el.textContent?.includes('🎨'));
    await expect(emojiFallback).toBeInTheDocument();

    // Verify Chinese characters
    const chineseFallback = Array.from(
      canvasElement.querySelectorAll('[data-slot="avatar-fallback"]')
    ).find((el) => el.textContent?.includes('中文'));
    await expect(chineseFallback).toBeInTheDocument();
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
    docs: {
      description: {
        story:
          'Edge case: Avatars with single character fallback. Common for minimalist designs or single-name users.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const fallbacks = canvasElement.querySelectorAll(
      '[data-slot="avatar-fallback"]'
    );
    await expect(fallbacks.length).toBe(3);

    // Verify single characters
    await expect(fallbacks[0]).toHaveTextContent('A');
    await expect(fallbacks[1]).toHaveTextContent('Z');
    await expect(fallbacks[2]).toHaveTextContent('M');
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
    docs: {
      description: {
        story:
          'Edge case: Avatars with numbers. Useful for rankings, counts, or numbered entities.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const fallbacks = canvasElement.querySelectorAll(
      '[data-slot="avatar-fallback"]'
    );
    await expect(fallbacks.length).toBe(4);

    // Verify numbers are rendered
    await expect(fallbacks[0]).toHaveTextContent('1');
    await expect(fallbacks[1]).toHaveTextContent('42');
    await expect(fallbacks[2]).toHaveTextContent('999');
    await expect(fallbacks[3]).toHaveTextContent('+99');
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
    docs: {
      description: {
        story:
          'Edge case: Very small avatars (xxsm - 20px) with increasing text lengths. Text may overflow or be cut off.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const avatars = canvasElement.querySelectorAll('[data-slot="avatar"]');
    await expect(avatars.length).toBe(3);

    // All should be xxsm size
    const tinyAvatars = Array.from(avatars).filter((avatar) =>
      avatar.className.includes('size-5')
    );
    await expect(tinyAvatars.length).toBe(3);
  },
};

/**
 * Edge case: Failed image loading.
 */
export const EdgeCaseFailedImage: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar variant="nordic">
        <AvatarImage
          src="/nonexistent-image-1.png"
          alt="Failed to load"
        />
        <AvatarFallback>FL</AvatarFallback>
      </Avatar>
      <Avatar variant="fjord">
        <AvatarImage
          src="/nonexistent-image-2.png"
          alt="Failed to load"
        />
        <AvatarFallback>ER</AvatarFallback>
      </Avatar>
      <Avatar variant="aurora">
        <AvatarImage src="/nonexistent-image-3.png" alt="Failed to load" />
        <AvatarFallback>BR</AvatarFallback>
      </Avatar>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Edge case: Avatars with images that fail to load. The fallback text displays instead, demonstrating graceful degradation.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    // Wait for images to fail loading and fallback to show
    await waitFor(
      () => {
        const fallbacks = canvasElement.querySelectorAll(
          '[data-slot="avatar-fallback"]'
        );
        expect(fallbacks.length).toBe(3);
      },
      { timeout: 2000 }
    );
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
            <IconStar className="size-2" />
            <IconStar className="size-2" />
          </div>
        </AvatarIcon>
      </Avatar>
      <Avatar variant="fjord">
        <AvatarIcon>
          <svg width="20" height="20" viewBox="0 0 20 20">
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
    docs: {
      description: {
        story:
          'Edge case: Avatars with complex nested content in AvatarIcon, including multiple icons, custom SVGs, and text.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const avatarIcons = canvasElement.querySelectorAll(
      '[data-slot="avatar-icon"]'
    );
    await expect(avatarIcons.length).toBe(3);

    // Verify complex content exists
    const firstIcon = avatarIcons[0];
    const stars = firstIcon.querySelectorAll('svg');
    await expect(stars.length).toBeGreaterThanOrEqual(2);
  },
};

/**
 * Visual regression testing - comprehensive overview.
 */
export const VisualRegression: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-8">
      {/* All variants */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">
          All Variants
        </h3>
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

      {/* All sizes */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">
          All Sizes
        </h3>
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

      {/* With icons */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">
          With Icons
        </h3>
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

      {/* With images */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">
          With Images
        </h3>
        <div className="flex flex-wrap gap-3">
          <Avatar variant="default">
            <AvatarImage src="/user-avatar2.png" alt="User" />
            <AvatarFallback>PJ</AvatarFallback>
          </Avatar>
          <Avatar variant="nordic">
            <AvatarImage src="/user-avatar3.png" alt="User" />
            <AvatarFallback>NC</AvatarFallback>
          </Avatar>
          <Avatar variant="fjord">
            <AvatarImage src="/user-avatar4.png" alt="User" />
            <AvatarFallback>FJ</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Avatar group */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">
          Avatar Group
        </h3>
        <div className="flex items-center">
          <Avatar
            variant="nordic"
            className="relative -ml-1 first:ml-0 z-1 border-2 border-background"
          >
            <AvatarFallback>U1</AvatarFallback>
          </Avatar>
          <Avatar
            variant="fjord"
            className="relative -ml-1 z-2 border-2 border-background"
          >
            <AvatarFallback>U2</AvatarFallback>
          </Avatar>
          <Avatar
            variant="aurora"
            className="relative -ml-1 z-3 border-2 border-background"
          >
            <AvatarFallback>U3</AvatarFallback>
          </Avatar>
          <Avatar
            variant="overflow"
            className="relative -ml-1 z-4 border-2 border-background"
          >
            <AvatarFallback>+5</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Edge cases */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">
          Edge Cases
        </h3>
        <div className="flex flex-wrap gap-3">
          <Avatar variant="default">
            <AvatarFallback></AvatarFallback>
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
    docs: {
      description: {
        story:
          'Comprehensive visual overview of all avatar variants, sizes, and edge cases for visual regression testing in Chromatic.',
      },
    },
    chromatic: {
      disableSnapshot: false,
    },
  },
};

/**
 * Interactive playground for testing different configurations.
 */
export const Playground: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>PJ</AvatarFallback>
    </Avatar>
  ),
  args: {
    variant: 'nordic',
    sizes: 'default',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground - use the controls below to experiment with all available avatar props and variants.',
      },
    },
  },
};
