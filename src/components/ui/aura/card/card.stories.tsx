import { Badge } from "@/components/ui/aura/badge";
import { Button } from "@/components/ui/aura/button";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import {
  IconChartLine,
  IconCube,
  IconDotsVertical,
  IconGauge,
  IconReportAnalytics,
} from "@tabler/icons-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";

const meta: Meta<typeof Card> = {
  title: "Primitives/Card",
  component: Card,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="p-8">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    className: {
      control: "text",
      description: "CSS classes for styling",
      table: {
        category: "Display",
      },
    },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

/**
 * Basic card with header, content, and footer
 * Matches the basic example from card.examples.tsx
 */
export const Basic: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Basic card with title, description, and footer badges. Tests card structure and content rendering.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the card title
    const title = canvas.getByText("21PT1019");
    await expect(title).toBeInTheDocument();

    // Find the description
    const description = canvas.getByText("Pressure over last 24 hours");
    await expect(description).toBeInTheDocument();

    // Find badges in footer
    const timeSeriesBadge = canvas.getByText(/Time series/i);
    await expect(timeSeriesBadge).toBeInTheDocument();
  },
  render: () => (
    <Card className="w-[362px]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>21PT1019</CardTitle>
          <Button variant="ghost" size="icon-sm">
            <IconDotsVertical />
          </Button>
        </div>
        <CardDescription>Pressure over last 24 hours</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="flex gap-2">
        <Badge variant="fjord">
          <IconChartLine size={12} /> Time series
        </Badge>
        <Badge variant="nordic">
          <IconGauge size={12} /> Value
        </Badge>
        <Badge variant="aurora">
          <IconReportAnalytics size={12} /> RCA
        </Badge>
      </CardFooter>
    </Card>
  ),
};

/**
 * Card with text content in footer
 * Matches the withFooter example from card.examples.tsx
 */
export const WithTextFooter: Story = {
  parameters: {
    docs: {
      description: {
        story: "Card with text content displayed in the footer instead of badges.",
      },
    },
  },
  render: () => (
    <Card className="w-[362px]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>21PT1019</CardTitle>
          <Button variant="ghost" size="icon-sm">
            <IconDotsVertical />
          </Button>
        </div>
        <CardDescription>Pressure over last 24 hours</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="gap-1 flex-col">
        <div className="flex items-center text-sm font-medium text-foreground tracking-normal">
          Trending up by 5.2% this month <IconChartLine size={16} />
        </div>
        <div className="text-sm font-normal text-muted-foreground tracking-normal">No alerts</div>
      </CardFooter>
    </Card>
  ),
};

/**
 * Card with badge in header and image content
 * Matches the badgeInHeader example from card.examples.tsx
 */
export const WithBadgeInHeader: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Card with a badge displayed in the header alongside the title, and image content in the body.",
      },
    },
  },
  render: () => (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5 items-baseline">
            <Badge variant="mountain">
              <IconCube size={12} />
            </Badge>
            <div>
              <CardTitle>Skarv</CardTitle>
              <CardDescription>Point cloud scene</CardDescription>
            </div>
          </div>
          <Button variant="ghost" size="icon-sm">
            <IconDotsVertical />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="">
        <div className="text-base text-secondary-foreground tracking-tightest pb-2">
          Model ID: 4602269428617841
        </div>
        <div className="w-full h-[200px] bg-muted rounded flex items-center justify-center text-muted-foreground">
          Image placeholder
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="secondary" size="sm">
          View scene
        </Button>
      </CardFooter>
    </Card>
  ),
};

/**
 * Card with hover effect
 * Matches the cardHover example from card.examples.tsx
 */
export const WithHover: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Card with hover effect. The card background changes on hover to indicate interactivity.",
      },
    },
  },
  render: () => (
    <Card className="w-[362px]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5 items-baseline">
            <Badge variant="mountain">
              <IconCube size={12} />
            </Badge>
            <div>
              <CardTitle>Title</CardTitle>
              <CardDescription>Subtitle</CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="gap-2">
        <div className="text-base text-secondary-foreground tracking-tightest">Description</div>
      </CardContent>
      <CardFooter className="gap-1 flex-col">
        <div className="flex items-center text-sm font-medium text-foreground tracking-normal">
          Trending up by 5.2% this month <IconChartLine size={16} />
        </div>
        <div className="text-sm font-normal text-muted-foreground tracking-normal">No alerts</div>
      </CardFooter>
    </Card>
  ),
};

/**
 * Minimal card with just title and content
 */
export const Minimal: Story = {
  parameters: {
    docs: {
      description: {
        story: "Minimal card with just a title and content section.",
      },
    },
  },
  render: () => (
    <Card className="w-[362px]">
      <CardHeader>
        <CardTitle>Simple Card</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          This is a minimal card with just the essential elements.
        </p>
      </CardContent>
    </Card>
  ),
};

/**
 * Card with action button in header
 */
export const WithHeaderAction: Story = {
  parameters: {
    docs: {
      description: {
        story: "Card using CardAction component to place an action button in the header.",
      },
    },
  },
  render: () => (
    <Card className="w-[362px]">
      <CardHeader>
        <CardTitle>Card with Action</CardTitle>
        <CardDescription>This card has an action button in the header</CardDescription>
        <CardAction>
          <Button variant="ghost" size="icon-sm">
            <IconDotsVertical />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          The action button is positioned in the top-right corner of the header.
        </p>
      </CardContent>
    </Card>
  ),
};

/**
 * Card with only content (no header or footer)
 */
export const ContentOnly: Story = {
  parameters: {
    docs: {
      description: {
        story: "Card with only content section, no header or footer.",
      },
    },
  },
  render: () => (
    <Card className="w-[362px]">
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold mb-2">Content Only Card</h3>
        <p className="text-sm text-muted-foreground">
          This card contains only content without a header or footer section.
        </p>
      </CardContent>
    </Card>
  ),
};

/**
 * Multiple cards in a grid layout
 */
export const GridLayout: Story = {
  parameters: {
    docs: {
      description: {
        story: "Multiple cards displayed in a grid layout.",
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl">
      <Card>
        <CardHeader>
          <CardTitle>Card 1</CardTitle>
          <CardDescription>First card in the grid</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Content for the first card</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Card 2</CardTitle>
          <CardDescription>Second card in the grid</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Content for the second card</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Card 3</CardTitle>
          <CardDescription>Third card in the grid</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Content for the third card</p>
        </CardContent>
      </Card>
    </div>
  ),
};
