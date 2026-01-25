import { Badge } from "@/components/ui/aura/badge";
import { Button } from "@/components/ui/aura/button";
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/aura/dropdown-menu";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import {
  IconChartLine,
  IconCube,
  IconGauge,
  IconReportAnalytics,
} from "@tabler/icons-react";
import {
  Card,
  CardActions,
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
      <div className="flex justify-center w-full p-8">
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
    order: 1,
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
    <Card className="w-96">
      <CardHeader>
        <CardTitle>21PT1019</CardTitle>
        <CardDescription>Pressure over last 24 hours</CardDescription>
      </CardHeader>
      <CardContent />
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
    order: 2,
    docs: {
      description: {
        story:
          "Card with text content displayed in the footer instead of badges.",
      },
    },
  },
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>21PT1019</CardTitle>
        <CardDescription>Pressure over last 24 hours</CardDescription>
      </CardHeader>
      <CardContent />
      <CardFooter className="gap-1 flex-col">
        <div className="flex items-center text-sm font-medium text-foreground tracking-normal">
          Trending up by 5.2% this month <IconChartLine size={16} />
        </div>
        <div className="text-sm font-normal text-muted-foreground tracking-normal">
          No alerts
        </div>
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
    order: 3,
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
        <div className="flex gap-1.5 items-baseline">
          <Badge variant="mountain">
            <IconCube size={12} />
          </Badge>
          <div>
            <CardTitle>Skarv</CardTitle>
            <CardDescription>Point cloud scene</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="">
        <div className="text-base text-secondary-foreground tracking-tightest pb-2">
          Model ID: 4602269428617841
        </div>
        <div className="w-full h-50 bg-muted rounded flex items-center justify-center text-muted-foreground">
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
    order: 4,
    docs: {
      description: {
        story:
          "Card with hover effect. The card background changes on hover to indicate interactivity.",
      },
    },
  },
  render: () => (
    <Card className="w-96">
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
        <div className="text-base text-secondary-foreground tracking-tightest">
          Description
        </div>
      </CardContent>
      <CardFooter className="gap-1 flex-col">
        <div className="flex items-center text-sm font-medium text-foreground tracking-normal">
          Trending up by 5.2% this month <IconChartLine size={16} />
        </div>
        <div className="text-sm font-normal text-muted-foreground tracking-normal">
          No alerts
        </div>
      </CardFooter>
    </Card>
  ),
};

/**
 * Minimal card with just title and content
 */
export const Minimal: Story = {
  parameters: {
    order: 5,
    docs: {
      description: {
        story: "Minimal card with just a title and content section.",
      },
    },
  },
  render: () => (
    <Card className="w-96">
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
 * Card with actions dropdown menu in header
 */
export const WithActions: Story = {
  parameters: {
    order: 6,
    docs: {
      description: {
        story:
          "Card using CardActions component to provide a dropdown menu of actions in the header.",
      },
    },
  },
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Card with Actions</CardTitle>
        <CardDescription>
          This card has a dropdown menu with actions
        </CardDescription>
        <CardActions>
          <DropdownMenuItem>
            <IconCube className="size-4" />
            View details
          </DropdownMenuItem>
          <DropdownMenuItem>Edit configuration</DropdownMenuItem>
          <DropdownMenuItem>Duplicate</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Delete card</DropdownMenuItem>
        </CardActions>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          The dropdown menu is positioned in the top-right corner of the header.
        </p>
      </CardContent>
    </Card>
  ),
};

/**
 * Card with custom positioned element in header
 */
export const WithCustomHeaderElement: Story = {
  parameters: {
    order: 7,
    docs: {
      description: {
        story:
          "For cases where you need custom content in the header corner (instead of a dropdown menu), manually position elements using grid classes.",
      },
    },
  },
  render: () => (
    <Card className="w-96">
      <CardHeader className="grid grid-cols-[1fr_auto] gap-2">
        <div>
          <CardTitle>Custom Header Element</CardTitle>
          <CardDescription>
            Badge positioned in top-right instead of dropdown
          </CardDescription>
        </div>
        <Badge variant="fjord" className="h-fit">
          New
        </Badge>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Use manual grid positioning when you need something other than a
          dropdown menu.
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
    order: 8,
    docs: {
      description: {
        story: "Card with only content section, no header or footer.",
      },
    },
  },
  render: () => (
    <Card className="w-96">
      <CardContent>
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
    order: 9,
    docs: {
      description: {
        story:
          "Multiple cards displayed in a responsive grid using container queries. Cards stack on mobile, display 2 across on tablets, and 3 across on larger containers.",
      },
    },
  },
  render: () => (
    <div className="@container w-full max-w-6xl">
      <div className="grid grid-cols-4 gap-4 @sm:grid-cols-8 @md:grid-cols-12">
        <Card className="col-span-4 @sm:col-span-4 @md:col-span-4">
          <CardHeader>
            <CardTitle>Card 1</CardTitle>
            <CardDescription>First card in the grid</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Content for the first card</p>
          </CardContent>
        </Card>
        <Card className="col-span-4 @sm:col-span-4 @md:col-span-4">
          <CardHeader>
            <CardTitle>Card 2</CardTitle>
            <CardDescription>Second card in the grid</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Content for the second card</p>
          </CardContent>
        </Card>
        <Card className="col-span-4 @sm:col-span-4 @md:col-span-4">
          <CardHeader>
            <CardTitle>Card 3</CardTitle>
            <CardDescription>Third card in the grid</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Content for the third card</p>
          </CardContent>
        </Card>
      </div>
    </div>
  ),
};
