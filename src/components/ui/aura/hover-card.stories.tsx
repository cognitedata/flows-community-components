'use client';

import type { Meta, StoryObj } from '@storybook/nextjs';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { useState } from 'react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from './hover-card';
import { Button } from './button';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Badge } from './badge';

const meta: Meta<typeof HoverCard> = {
  title: 'Primitives/Hover Card',
  component: HoverCard,
  tags: ['autodocs'],
  argTypes: {
    // Display & behavior
    open: {
      control: 'boolean',
      description: 'The controlled open state of the hover card',
      table: {
        category: 'Display',
        type: { summary: 'boolean' },
      },
    },
    defaultOpen: {
      control: 'boolean',
      description: 'The open state of the hover card when initially rendered',
      table: {
        category: 'Display',
        type: { summary: 'boolean' },
      },
    },
    openDelay: {
      control: { type: 'number', min: 0, max: 2000, step: 100 },
      description: 'The duration from when the mouse enters until the hover card opens (ms)',
      table: {
        category: 'Display',
        type: { summary: 'number' },
        defaultValue: { summary: '700' },
      },
    },
    closeDelay: {
      control: { type: 'number', min: 0, max: 2000, step: 100 },
      description: 'The duration from when the mouse leaves until the hover card closes (ms)',
      table: {
        category: 'Display',
        type: { summary: 'number' },
        defaultValue: { summary: '300' },
      },
    },

    // Events
    onOpenChange: {
      action: 'openChanged',
      description: 'Callback when the open state changes',
      table: {
        category: 'Events',
        type: { summary: '(open: boolean) => void' },
      },
    },

    // Internal
    children: {
      control: false,
      table: {
        category: 'Internal',
      },
    },
  },
  parameters: {
    layout: 'centered',
    actions: {
      handles: ['openChanged'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof HoverCard>;

/**
 * Basic hover card with user profile information
 * Matches the basic example from hover-card.examples.tsx
 */
export const Basic: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Basic hover card showing rich contextual information. Hover over the trigger to see the card.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    // Find the trigger button
    const trigger = canvas.getByRole('button', { name: /@nextjs/i });
    await expect(trigger).toBeInTheDocument();

    // Hover over the trigger
    await userEvent.hover(trigger);

    // Wait for hover card to appear (accounting for openDelay)
    // Note: Hover card content is rendered in a portal outside canvasElement
    await waitFor(
      async () => {
        const hoverCard = body.getByText(/The React Framework/i);
        await expect(hoverCard).toBeInTheDocument();
      },
      { timeout: 1500 }
    );

    // Unhover to close
    await userEvent.unhover(trigger);
  },
  render: function HoverCardBasicStory(args) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <HoverCard {...args}>
          <HoverCardTrigger asChild>
            <Button variant="link">@nextjs</Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-between space-x-4">
              <Avatar>
                <AvatarImage src="https://github.com/vercel.png" />
                <AvatarFallback>VC</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">@nextjs</h4>
                <p className="text-sm">
                  The React Framework – created and maintained by @vercel.
                </p>
                <div className="flex items-center pt-2">
                  <span className="text-xs text-muted-foreground">
                    Joined December 2021
                  </span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    );
  },
};

/**
 * Hover card with badges showing skills or tags
 */
export const WithBadges: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Hover cards can include badges to show tags, skills, or categories.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    // Test hovering on Product Manager
    const pmButton = canvas.getByRole('button', { name: /Product Manager/i });
    await expect(pmButton).toBeInTheDocument();
    await userEvent.hover(pmButton);
    await waitFor(
      async () => {
        const hoverCard = body.getByText(/Lead product strategy and roadmap/i);
        await expect(hoverCard).toBeInTheDocument();
      },
      { timeout: 1500 }
    );
    await userEvent.unhover(pmButton);

    // Test hovering on Senior Developer
    const devButton = canvas.getByRole('button', { name: /Senior Developer/i });
    await expect(devButton).toBeInTheDocument();
    await userEvent.hover(devButton);
    await waitFor(
      async () => {
        const hoverCard = body.getByText(/Full-stack engineer specialising/i);
        await expect(hoverCard).toBeInTheDocument();
      },
      { timeout: 1500 }
    );
    await userEvent.unhover(devButton);
  },
  render: () => (
    <div className="flex justify-center items-center gap-4 min-h-[300px]">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline">Product Manager</Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Product Manager</h4>
            <p className="text-sm text-muted-foreground">
              Lead product strategy and roadmap for the design system
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <Badge variant="secondary">Strategy</Badge>
              <Badge variant="secondary">Planning</Badge>
              <Badge variant="secondary">Research</Badge>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline">Senior Developer</Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Senior Developer</h4>
            <p className="text-sm text-muted-foreground">
              Full-stack engineer specialising in React and Node.js
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <Badge variant="secondary">React</Badge>
              <Badge variant="secondary">TypeScript</Badge>
              <Badge variant="secondary">Node.js</Badge>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
};

/**
 * Hover card positioned on top
 */
export const TopPosition: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Hover card appearing above the trigger element.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    const trigger = canvas.getByRole('button', { name: /Hover me - Top/i });
    await expect(trigger).toBeInTheDocument();
    await userEvent.hover(trigger);
    await waitFor(
      async () => {
        const hoverCard = body.getByText(/appears above the trigger/i);
        await expect(hoverCard).toBeInTheDocument();
      },
      { timeout: 1500 }
    );
    await userEvent.unhover(trigger);
  },
  render: () => (
    <div className="flex justify-center items-center min-h-[300px]">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline">Hover me - Top</Button>
        </HoverCardTrigger>
        <HoverCardContent side="top" className="w-80">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Hover card on top</h4>
            <p className="text-sm text-muted-foreground">
              This hover card appears above the trigger element.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
};

/**
 * Hover card positioned on right
 */
export const RightPosition: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Hover card appearing to the right of the trigger element.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    const trigger = canvas.getByRole('button', { name: /Hover me - Right/i });
    await expect(trigger).toBeInTheDocument();
    await userEvent.hover(trigger);
    await waitFor(
      async () => {
        const hoverCard = body.getByText(/appears to the right of the trigger/i);
        await expect(hoverCard).toBeInTheDocument();
      },
      { timeout: 1500 }
    );
    await userEvent.unhover(trigger);
  },
  render: () => (
    <div className="flex justify-center items-center min-h-[300px]">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline">Hover me - Right</Button>
        </HoverCardTrigger>
        <HoverCardContent side="right" className="w-80">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Hover card on right</h4>
            <p className="text-sm text-muted-foreground">
              This hover card appears to the right of the trigger element.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
};

/**
 * Hover card positioned on bottom
 */
export const BottomPosition: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Hover card appearing below the trigger element.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    const trigger = canvas.getByRole('button', { name: /Hover me - Bottom/i });
    await expect(trigger).toBeInTheDocument();
    await userEvent.hover(trigger);
    await waitFor(
      async () => {
        const hoverCard = body.getByText(/appears below the trigger/i);
        await expect(hoverCard).toBeInTheDocument();
      },
      { timeout: 1500 }
    );
    await userEvent.unhover(trigger);
  },
  render: () => (
    <div className="flex justify-center items-center min-h-[300px]">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline">Hover me - Bottom</Button>
        </HoverCardTrigger>
        <HoverCardContent side="bottom" className="w-80">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Hover card on bottom</h4>
            <p className="text-sm text-muted-foreground">
              This hover card appears below the trigger element.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
};

/**
 * Hover card positioned on left
 */
export const LeftPosition: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Hover card appearing to the left of the trigger element.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    const trigger = canvas.getByRole('button', { name: /Hover me - Left/i });
    await expect(trigger).toBeInTheDocument();
    await userEvent.hover(trigger);
    await waitFor(
      async () => {
        const hoverCard = body.getByText(/appears to the left of the trigger/i);
        await expect(hoverCard).toBeInTheDocument();
      },
      { timeout: 1500 }
    );
    await userEvent.unhover(trigger);
  },
  render: () => (
    <div className="flex justify-center items-center min-h-[300px]">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline">Hover me - Left</Button>
        </HoverCardTrigger>
        <HoverCardContent side="left" className="w-80">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Hover card on left</h4>
            <p className="text-sm text-muted-foreground">
              This hover card appears to the left of the trigger element.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
};

/**
 * All positions demonstrated together
 */
export const AllPositions: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Hover cards can be positioned on any side of the trigger element.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    // Test that all four buttons are present
    const topButton = canvas.getByRole('button', { name: /Top position/i });
    const rightButton = canvas.getByRole('button', { name: /Right position/i });
    const bottomButton = canvas.getByRole('button', { name: /Bottom position/i });
    const leftButton = canvas.getByRole('button', { name: /Left position/i });

    await expect(topButton).toBeInTheDocument();
    await expect(rightButton).toBeInTheDocument();
    await expect(bottomButton).toBeInTheDocument();
    await expect(leftButton).toBeInTheDocument();

    // Test hovering on top position
    await userEvent.hover(topButton);
    await waitFor(
      async () => {
        const hoverCard = body.getByText(/appears above the trigger/i);
        await expect(hoverCard).toBeInTheDocument();
      },
      { timeout: 1500 }
    );
    await userEvent.unhover(topButton);

    // Test hovering on right position
    await userEvent.hover(rightButton);
    await waitFor(
      async () => {
        const hoverCard = body.getByText(/appears to the right of the trigger/i);
        await expect(hoverCard).toBeInTheDocument();
      },
      { timeout: 1500 }
    );
    await userEvent.unhover(rightButton);

    // Test hovering on bottom position
    await userEvent.hover(bottomButton);
    await waitFor(
      async () => {
        const hoverCard = body.getByText(/appears below the trigger/i);
        await expect(hoverCard).toBeInTheDocument();
      },
      { timeout: 1500 }
    );
    await userEvent.unhover(bottomButton);

    // Test hovering on left position
    await userEvent.hover(leftButton);
    await waitFor(
      async () => {
        const hoverCard = body.getByText(/appears to the left of the trigger/i);
        await expect(hoverCard).toBeInTheDocument();
      },
      { timeout: 1500 }
    );
    await userEvent.unhover(leftButton);
  },
  render: () => (
    <div className="flex flex-col items-center justify-center gap-16 min-h-[500px] py-8">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline">Top position</Button>
        </HoverCardTrigger>
        <HoverCardContent side="top" className="w-80">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Hover card on top</h4>
            <p className="text-sm text-muted-foreground">
              This hover card appears above the trigger element.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>

      <div className="flex gap-16">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="outline">Left position</Button>
          </HoverCardTrigger>
          <HoverCardContent side="left" className="w-80">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Hover card on left</h4>
              <p className="text-sm text-muted-foreground">
                This hover card appears to the left of the trigger element.
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>

        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="outline">Right position</Button>
          </HoverCardTrigger>
          <HoverCardContent side="right" className="w-80">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Hover card on right</h4>
              <p className="text-sm text-muted-foreground">
                This hover card appears to the right of the trigger element.
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>

      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="outline">Bottom position</Button>
        </HoverCardTrigger>
        <HoverCardContent side="bottom" className="w-80">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Hover card on bottom</h4>
            <p className="text-sm text-muted-foreground">
              This hover card appears below the trigger element.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
};

/**
 * Controlled hover card with custom delays
 */
export const ControlledWithCustomDelays: Story = {
  args: {
    openDelay: 100,
    closeDelay: 100,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates controlled state and custom open/close delays. The hover card opens and closes faster than the default.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    // Test hovering to open
    const trigger = canvas.getByRole('button', {
      name: /Controlled with fast delays/i,
    });
    await expect(trigger).toBeInTheDocument();
    await userEvent.hover(trigger);
    await waitFor(
      async () => {
        const hoverCard = body.getByText(/custom delays/i);
        await expect(hoverCard).toBeInTheDocument();
      },
      { timeout: 500 }
    );

    // Test that the Close button works
    const closeButton = body.getByRole('button', { name: /Close/i });
    await expect(closeButton).toBeInTheDocument();
    await userEvent.click(closeButton);
  },
  render: function ControlledHoverCardStory(args) {
    const [open, setOpen] = useState(false);

    return (
      <div className="flex flex-col items-center gap-4 min-h-[300px]">
        <div className="text-sm text-muted-foreground mb-4">
          Hover card is {open ? 'open' : 'closed'}
        </div>
        <HoverCard
          {...args}
          open={open}
          onOpenChange={(newOpen) => {
            setOpen(newOpen);
            args.onOpenChange?.(newOpen);
          }}
        >
          <HoverCardTrigger asChild>
            <Button variant="outline">Controlled with fast delays</Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Controlled Hover Card</h4>
              <p className="text-sm text-muted-foreground">
                This hover card has custom delays (100ms) and is controlled by
                React state.
              </p>
              <div className="flex gap-2 pt-2">
                <Button size="sm" onClick={() => setOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    );
  },
};

/**
 * Minimal hover card with simple text
 */
export const Minimal: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    const trigger = canvas.getByRole('button', { name: /Hover for info/i });
    await expect(trigger).toBeInTheDocument();
    await userEvent.hover(trigger);
    await waitFor(
      async () => {
        const hoverCard = body.getByText(/Simple contextual information/i);
        await expect(hoverCard).toBeInTheDocument();
      },
      { timeout: 1500 }
    );
    await userEvent.unhover(trigger);
  },
  render: () => (
    <div className="flex justify-center items-center min-h-[300px]">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link">Hover for info</Button>
        </HoverCardTrigger>
        <HoverCardContent>
          <p className="text-sm">Simple contextual information</p>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
};

/**
 * Multiple hover cards in a list
 */
export const MultipleInList: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Multiple hover cards can be used in a list or grid to provide contextual information for each item.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    // Test hovering on first user
    const firstUserButton = canvas.getByRole('button', { name: /Sarah Johnson/i });
    await expect(firstUserButton).toBeInTheDocument();
    await userEvent.hover(firstUserButton);
    await waitFor(
      async () => {
        const hoverCard = body.getByText(/Product Designer/i);
        await expect(hoverCard).toBeInTheDocument();
      },
      { timeout: 1500 }
    );
    await userEvent.unhover(firstUserButton);

    // Test hovering on second user
    const secondUserButton = canvas.getByRole('button', { name: /Michael Chen/i });
    await expect(secondUserButton).toBeInTheDocument();
    await userEvent.hover(secondUserButton);
    await waitFor(
      async () => {
        const hoverCard = body.getByText(/Frontend Engineer/i);
        await expect(hoverCard).toBeInTheDocument();
      },
      { timeout: 1500 }
    );
    await userEvent.unhover(secondUserButton);

    // Test hovering on third user
    const thirdUserButton = canvas.getByRole('button', { name: /Emily Rodriguez/i });
    await expect(thirdUserButton).toBeInTheDocument();
    await userEvent.hover(thirdUserButton);
    await waitFor(
      async () => {
        const hoverCard = body.getByText(/UX Researcher/i);
        await expect(hoverCard).toBeInTheDocument();
      },
      { timeout: 1500 }
    );
    await userEvent.unhover(thirdUserButton);
  },
  render: () => {
    const users = [
      {
        name: 'Sarah Johnson',
        handle: '@sarah',
        role: 'Product Designer',
        avatar: 'https://i.pravatar.cc/150?img=1',
        bio: 'Passionate about creating intuitive and delightful user experiences. Leading the design system initiative.',
        team: 'Design Team',
        joined: 'Joined March 2023',
      },
      {
        name: 'Michael Chen',
        handle: '@michael',
        role: 'Frontend Engineer',
        avatar: 'https://i.pravatar.cc/150?img=2',
        bio: 'Full-stack developer specialising in React and TypeScript. Building scalable web applications.',
        team: 'Engineering Team',
        joined: 'Joined January 2022',
      },
      {
        name: 'Emily Rodriguez',
        handle: '@emily',
        role: 'UX Researcher',
        avatar: 'https://i.pravatar.cc/150?img=3',
        bio: 'Uncovering user insights through research and data analysis. Advocate for evidence-based design.',
        team: 'Research Team',
        joined: 'Joined July 2023',
      },
    ];

    return (
      <div className="flex flex-col gap-3 min-h-[300px] p-4">
        {users.map((user) => (
          <div
            key={user.handle}
            className="flex items-center gap-3 p-3 rounded-lg border"
          >
            <HoverCard>
              <HoverCardTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                >
                  <Avatar>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>
                      {user.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {user.handle}
                    </p>
                  </div>
                </button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="flex gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>
                      {user.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2 flex-1">
                    <div>
                      <h4 className="text-sm font-semibold">{user.name}</h4>
                      <p className="text-sm text-muted-foreground">{user.role}</p>
                    </div>
                    <p className="text-sm">{user.bio}</p>
                    <div className="flex items-center gap-4 pt-1 text-xs text-muted-foreground">
                      <span>{user.team}</span>
                      <span>•</span>
                      <span>{user.joined}</span>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        ))}
      </div>
    );
  },
};
