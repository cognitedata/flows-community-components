import type { Meta, StoryObj } from '@storybook/nextjs';
import { Avatar, AvatarFallback, AvatarIcon, AvatarImage } from './avatar';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './hover-card';
import { IconWheel } from '@tabler/icons-react';

const meta: Meta<typeof Avatar> = {
  title: 'UI/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
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
      description: 'The visual style variant',
    },
    sizes: {
      control: 'select',
      options: ['default', 'xsm', 'xxsm'],
      description: 'The size of the avatar',
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

/**
 * Default avatar with initials fallback
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
};

/**
 * Avatar with an icon instead of initials
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
};

/**
 * Avatar with an image and fallback. Hover to see the darkening effect.
 */
export const WithImage: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="/user-avatar2.png" alt="User" />
      <AvatarFallback>PJ</AvatarFallback>
    </Avatar>
  ),
  args: {
    variant: 'default',
    sizes: 'default',
  },
};

/**
 * All color variants with initials
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
};

/**
 * All color variants with icons
 */
export const AllVariantsWithIcons: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar variant="default">
        <AvatarIcon>
          <IconWheel />
        </AvatarIcon>
      </Avatar>
      <Avatar variant="nordic">
        <AvatarIcon>
          <IconWheel />
        </AvatarIcon>
      </Avatar>
      <Avatar variant="fjord">
        <AvatarIcon>
          <IconWheel />
        </AvatarIcon>
      </Avatar>
      <Avatar variant="aurora">
        <AvatarIcon>
          <IconWheel />
        </AvatarIcon>
      </Avatar>
      <Avatar variant="dusk">
        <AvatarIcon>
          <IconWheel />
        </AvatarIcon>
      </Avatar>
      <Avatar variant="orange">
        <AvatarIcon>
          <IconWheel />
        </AvatarIcon>
      </Avatar>
      <Avatar variant="sky">
        <AvatarIcon>
          <IconWheel />
        </AvatarIcon>
      </Avatar>
    </div>
  ),
};

/**
 * All size variants
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
};

/**
 * Avatars with images at different sizes. Hover to see the darkening effect.
 */
export const ImagesAllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar variant="fjord" sizes="default">
        <AvatarImage src="/user-avatar2.png" alt="User" />
        <AvatarFallback>PJ</AvatarFallback>
      </Avatar>
      <Avatar variant="fjord" sizes="xsm">
        <AvatarImage src="/user-avatar2.png" alt="User" />
        <AvatarFallback>PJ</AvatarFallback>
      </Avatar>
      <Avatar variant="fjord" sizes="xxsm">
        <AvatarImage src="/user-avatar2.png" alt="User" />
        <AvatarFallback>PJ</AvatarFallback>
      </Avatar>
    </div>
  ),
};

/**
 * Avatar group with stacked avatars and overflow indicator with HoverCard
 */
export const AvatarGroup: Story = {
  render: () => (
    <div className="flex items-center">
      <Avatar
        variant="nordic"
        sizes="default"
        className="relative -ml-1 first:ml-0 z-1 border-2 border-background"
      >
        <AvatarImage src="/user-avatar3.png" alt="User" />
        <AvatarFallback>NC</AvatarFallback>
      </Avatar>
      <Avatar
        variant="default"
        sizes="default"
        className="relative -ml-1 z-2 border-2 border-background"
      >
        <AvatarImage src="/user-avatar4.png" alt="User" />
        <AvatarFallback>AR</AvatarFallback>
      </Avatar>
      <Avatar
        variant="default"
        sizes="default"
        className="relative -ml-1 z-3 border-2 border-background"
      >
        <AvatarImage src="/user-avatar5.png" alt="User" />
        <AvatarFallback>PJ</AvatarFallback>
      </Avatar>
      <Avatar
        variant="default"
        sizes="default"
        className="relative -ml-1 z-4 border-2 border-background"
      >
        <AvatarImage src="/user-avatar6.png" alt="User" />
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
};

/**
 * Small avatar group
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
};

/**
 * Edge cases: long text, empty text, special characters, and small sizes with text
 */
export const EdgeCases: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">Long text overflow</p>
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
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">Empty fallback text</p>
        <div className="flex items-center gap-4">
          <Avatar variant="aurora">
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <Avatar variant="dusk" sizes="xsm">
            <AvatarFallback></AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">Special characters</p>
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
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">
          Normal text in very small sizes
        </p>
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
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">Single character</p>
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
      </div>
    </div>
  ),
};

/**
 * Interactive playground for testing different configurations
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
};
