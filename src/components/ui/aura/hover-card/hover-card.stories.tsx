import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { Badge } from '../badge';
import { Button } from '../button';

import { HoverCard, HoverCardContent, HoverCardTrigger } from './hover-card';
const meta: Meta<typeof HoverCard> = {
  title: 'Primitives/Hover Card',
  component: HoverCard,
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      table: {
        category: 'Display',
        type: {
          summary: 'boolean',
        },
      },
    },
    defaultOpen: {
      control: 'boolean',
      table: {
        category: 'Display',
        type: {
          summary: 'boolean',
        },
      },
    },
    openDelay: {
      control: {
        type: 'number',
        min: 0,
        max: 2000,
        step: 100,
      },
      table: {
        category: 'Display',
        type: {
          summary: 'number',
        },
        defaultValue: {
          summary: '700',
        },
      },
    },
    closeDelay: {
      control: {
        type: 'number',
        min: 0,
        max: 2000,
        step: 100,
      },
      table: {
        category: 'Display',
        type: {
          summary: 'number',
        },
        defaultValue: {
          summary: '300',
        },
      },
    },
    onOpenChange: {
      action: 'openChanged',
      table: {
        category: 'Events',
        type: {
          summary: '(open: boolean) => void',
        },
      },
    },
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
async function testHoverInteraction(
  canvasElement: HTMLElement,
  triggerName: RegExp,
  contentText: RegExp | string,
  timeout = 2000
) {
  const canvas = within(canvasElement);
  const trigger = await canvas.findByRole(
    'button',
    {
      name: triggerName,
    },
    {
      timeout: 2000,
    }
  );
  await expect(trigger).toBeInTheDocument();
  await userEvent.hover(trigger);
  const popupText = await within(document.body).findByText(
    contentText,
    undefined,
    {
      timeout,
    }
  );
  const popup = popupText.closest('[data-slot="hover-card-content"]');
  if (!popup) {
    throw new Error('Hover card content did not open');
  }
  await expect(popup).toHaveAttribute('data-open');
  await expect(popup).toHaveTextContent(contentText);

  await userEvent.unhover(trigger);
  await waitFor(
    () => {
      expect(within(document.body).queryByText(contentText)).toBeNull();
    },
    {
      timeout,
    }
  );
}
export const Basic: Story = {
  parameters: {
    order: 1,
  },
  play: async ({ canvasElement }) => {
    await testHoverInteraction(
      canvasElement,
      /@nextjs/i,
      /The React Framework/i
    );
  },
  render: function HoverCardBasicStory() {
    return (
      <div className="flex justify-center items-center min-h-80">
        <HoverCard>
          <HoverCardTrigger render={<Button variant="link">@nextjs</Button>} />
          <HoverCardContent className="w-80">
            <div className="flex justify-between space-x-4">
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
export const WithBadges: Story = {
  parameters: {
    order: 2,
  },
  play: async ({ canvasElement }) => {
    await testHoverInteraction(
      canvasElement,
      /Product Manager/i,
      /Lead product strategy and roadmap/i
    );
    await testHoverInteraction(
      canvasElement,
      /Senior Developer/i,
      /Full-stack engineer specialising/i
    );
  },
  render: () => (
    <div className="flex justify-center items-center gap-4 min-h-80">
      <HoverCard>
        <HoverCardTrigger
          render={<Button variant="outline">Product Manager</Button>}
        />
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
        <HoverCardTrigger
          render={<Button variant="outline">Senior Developer</Button>}
        />
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
export const TopPosition: Story = {
  parameters: {
    order: 3,
  },
  play: async ({ canvasElement }) => {
    await testHoverInteraction(
      canvasElement,
      /Hover me - Top/i,
      /appears above the trigger/i
    );
  },
  render: () => (
    <div className="flex justify-center items-center min-h-80">
      <HoverCard>
        <HoverCardTrigger
          render={<Button variant="outline">Hover me - Top</Button>}
        />
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
export const RightPosition: Story = {
  parameters: {
    order: 4,
  },
  play: async ({ canvasElement }) => {
    await testHoverInteraction(
      canvasElement,
      /Hover me - Right/i,
      /appears to the right of the trigger/i
    );
  },
  render: () => (
    <div className="flex justify-center items-center min-h-80">
      <HoverCard>
        <HoverCardTrigger
          render={<Button variant="outline">Hover me - Right</Button>}
        />
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
export const BottomPosition: Story = {
  parameters: {
    order: 5,
  },
  play: async ({ canvasElement }) => {
    await testHoverInteraction(
      canvasElement,
      /Hover me - Bottom/i,
      /appears below the trigger/i
    );
  },
  render: () => (
    <div className="flex justify-center items-center min-h-80">
      <HoverCard>
        <HoverCardTrigger
          render={<Button variant="outline">Hover me - Bottom</Button>}
        />
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
export const LeftPosition: Story = {
  parameters: {
    order: 6,
  },
  play: async ({ canvasElement }) => {
    await testHoverInteraction(
      canvasElement,
      /Hover me - Left/i,
      /appears to the left of the trigger/i
    );
  },
  render: () => (
    <div className="flex justify-center items-center min-h-80">
      <HoverCard>
        <HoverCardTrigger
          render={<Button variant="outline">Hover me - Left</Button>}
        />
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
export const AllPositions: Story = {
  parameters: {
    order: 7,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const topButton = canvas.getByRole('button', {
      name: /Top position/i,
    });
    const rightButton = canvas.getByRole('button', {
      name: /Right position/i,
    });
    const bottomButton = canvas.getByRole('button', {
      name: /Bottom position/i,
    });
    const leftButton = canvas.getByRole('button', {
      name: /Left position/i,
    });
    await expect(topButton).toBeInTheDocument();
    await expect(rightButton).toBeInTheDocument();
    await expect(bottomButton).toBeInTheDocument();
    await expect(leftButton).toBeInTheDocument();
    await testHoverInteraction(
      canvasElement,
      /Top position/i,
      /appears above the trigger/i
    );
    await testHoverInteraction(
      canvasElement,
      /Right position/i,
      /appears to the right of the trigger/i
    );
    await testHoverInteraction(
      canvasElement,
      /Bottom position/i,
      /appears below the trigger/i
    );
    await testHoverInteraction(
      canvasElement,
      /Left position/i,
      /appears to the left of the trigger/i
    );
  },
  render: () => (
    <div className="flex flex-col items-center justify-center gap-16 min-h-128 py-8">
      <HoverCard>
        <HoverCardTrigger
          render={<Button variant="outline">Top position</Button>}
        />
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
          <HoverCardTrigger
            render={<Button variant="outline">Left position</Button>}
          />
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
          <HoverCardTrigger
            render={<Button variant="outline">Right position</Button>}
          />
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
        <HoverCardTrigger
          render={<Button variant="outline">Bottom position</Button>}
        />
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
export const ControlledWithCustomDelays: Story = {
  parameters: {
    order: 8,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByRole(
      'button',
      {
        name: /Controlled with fast delays/i,
      },
      {
        timeout: 2000,
      }
    );
    await expect(trigger).toBeInTheDocument();
    await userEvent.hover(trigger);
    const hoverCardText = await within(document.body).findByText(
      /custom delays/i,
      undefined,
      {
        timeout: 2000,
      }
    );
    const hoverCard = hoverCardText.closest('[data-slot="hover-card-content"]');
    if (!(hoverCard instanceof HTMLElement)) {
      throw new Error('Controlled hover card did not open');
    }
    await expect(hoverCard).toHaveAttribute('data-open');
    await expect(hoverCard).toHaveTextContent(/custom delays/i);
    const closeButton = within(hoverCard).getByRole('button', {
      name: /Close/i,
    });
    await userEvent.click(closeButton);
  },
  render: function ControlledHoverCardStory() {
    const [open, setOpen] = useState(false);
    return (
      <div className="flex flex-col items-center gap-4 min-h-80">
        <div className="text-sm text-muted-foreground mb-4">
          Hover card is {open ? 'open' : 'closed'}
        </div>
        <HoverCard
          openDelay={100}
          closeDelay={100}
          open={open}
          onOpenChange={(newOpen) => {
            setOpen(newOpen);
          }}
        >
          <HoverCardTrigger
            render={
              <Button variant="outline">Controlled with fast delays</Button>
            }
          />
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
export const Minimal: Story = {
  parameters: {
    order: 9,
  },
  play: async ({ canvasElement }) => {
    await testHoverInteraction(
      canvasElement,
      /Hover for info/i,
      /Simple contextual information/i
    );
  },
  render: () => (
    <div className="flex justify-center items-center min-h-80">
      <HoverCard>
        <HoverCardTrigger
          render={<Button variant="link">Hover for info</Button>}
        />
        <HoverCardContent>
          <p className="text-sm">Simple contextual information</p>
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
};
export const Playground: Story = {
  parameters: {
    order: 99,
  },
  render: function PlaygroundStory() {
    return (
      <div className="flex justify-center items-center min-h-80">
        <HoverCard>
          <HoverCardTrigger
            render={<Button variant="outline">Hover me</Button>}
          />
          <HoverCardContent className="w-80">
            <div className="flex justify-between space-x-4">
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">@shadcn</h4>
                <p className="text-sm">
                  The React Framework for the Web – created and maintained by
                  Vercel.
                </p>
                <div className="flex items-center pt-2">
                  <span className="text-xs text-muted-foreground">
                    Joined March 2023
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
