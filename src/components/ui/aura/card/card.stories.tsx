import { Badge } from "@/components/ui/aura/badge";
import { Button } from "@/components/ui/aura/button";
import { DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/aura/dropdown-menu";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, screen, userEvent, waitFor, within } from "@storybook/test";
import { IconChartLine, IconCube, IconGauge, IconReportAnalytics } from "@tabler/icons-react";
import {
  Card,
  CardActions,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardHeaderRight,
  CardIcon,
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
    // Card Props
    className: {
      control: "text",
      description: "CSS classes for styling the card container",
      table: {
        category: "Display",
      },
    },
    children: {
      control: "text",
      description: "Content to render inside the card",
      table: {
        category: "Content",
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

    const title = canvas.getByText("21PT1019");
    await expect(title).toBeInTheDocument();

    const description = canvas.getByText("Pressure over last 24 hours");
    await expect(description).toBeInTheDocument();

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
        story: "Card with text content displayed in the footer instead of badges.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("21PT1019")).toBeInTheDocument();
    await expect(canvas.getByText("Pressure over last 24 hours")).toBeInTheDocument();

    await expect(
      canvas.getByText("Trending up by 5.2% this month", { exact: false })
    ).toBeInTheDocument();
    await expect(canvas.getByText("No alerts")).toBeInTheDocument();
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
    order: 3,
    docs: {
      description: {
        story:
          "Card with a badge displayed in the header using CardIcon. No wrapper divs needed - the grid layout handles positioning automatically.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Skarv")).toBeInTheDocument();
    await expect(canvas.getByText("Point cloud scene")).toBeInTheDocument();

    const actionButtons = canvas.getAllByRole("button");
    await expect(actionButtons.length).toBeGreaterThan(0);

    const footerButton = canvas.getByRole("button", { name: /view scene/i });
    await expect(footerButton).toBeInTheDocument();

    await expect(canvas.getByText("Model ID: 4602269428617841")).toBeInTheDocument();
  },
  render: () => (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardIcon>
          <Badge variant="mountain" size="icon">
            <IconCube size={12} />
          </Badge>
        </CardIcon>
        <CardTitle>Skarv</CardTitle>
        <CardDescription>Point cloud scene</CardDescription>
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const cardTitle = canvas.getByText("Title");
    await expect(cardTitle).toBeInTheDocument();

    const card = cardTitle.closest('[data-slot="card"]') ?? cardTitle.parentElement;
    if (card) {
      await userEvent.hover(card);
    }
  },
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardIcon>
          <Badge variant="mountain" size="icon">
            <IconCube size={12} />
          </Badge>
        </CardIcon>
        <CardTitle>Title</CardTitle>
        <CardDescription>Subtitle</CardDescription>
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
    order: 5,
    docs: {
      description: {
        story: "Minimal card with just a title and content section.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const title = canvas.getByRole("heading", { level: 3, name: "Simple Card" });
    await expect(title).toBeInTheDocument();

    const content = canvas.getByText(/This is a minimal card/i);
    await expect(content).toBeInTheDocument();
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
          "Card with CardActions wrapped in CardHeaderRight. CardActions provides a pre-configured dropdown menu.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const title = canvas.getByRole("heading", { level: 3, name: "Card with Actions" });
    await expect(title).toBeInTheDocument();

    const actionsButton = canvas.getByRole("button");
    await expect(actionsButton).toBeInTheDocument();
    await userEvent.click(actionsButton);

    await waitFor(async () => {
      const menu = screen.getByRole("menu");
      await expect(menu).toBeInTheDocument();

      const viewDetails = screen.getByText(/View details/i);
      await expect(viewDetails).toBeInTheDocument();

      const deleteOption = screen.getByText(/Delete card/i);
      await expect(deleteOption).toBeInTheDocument();
    });
  },
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Card with Actions</CardTitle>
        <CardDescription>This card has a dropdown menu with actions</CardDescription>
        <CardHeaderRight>
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
        </CardHeaderRight>
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
 * Card with both icon and actions in header
 */
export const WithIconAndActions: Story = {
  parameters: {
    order: 7,
    docs: {
      description: {
        story:
          "Card with both CardIcon and CardHeaderRight (containing CardActions). The grid automatically creates 3 columns: icon, content, right.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const title = canvas.getByRole("heading", { level: 3, name: "Skarv Model" });
    await expect(title).toBeInTheDocument();

    const description = canvas.getByText("Point cloud scene");
    await expect(description).toBeInTheDocument();

    const modelId = canvas.getByText(/Model ID: 4602269428617841/i);
    await expect(modelId).toBeInTheDocument();

    const actionsButton = canvas.getByRole("button");
    await userEvent.click(actionsButton);

    await waitFor(async () => {
      const menu = screen.getByRole("menu");
      await expect(menu).toBeInTheDocument();

      const viewDetails = screen.getByText(/View details/i);
      await expect(viewDetails).toBeInTheDocument();
    });
  },
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardIcon>
          <Badge variant="mountain" size="icon">
            <IconCube size={12} />
          </Badge>
        </CardIcon>
        <CardTitle>Skarv Model</CardTitle>
        <CardDescription>Point cloud scene</CardDescription>
        <CardHeaderRight>
          <CardActions>
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
          </CardActions>
        </CardHeaderRight>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Model ID: 4602269428617841</p>
      </CardContent>
    </Card>
  ),
};

/**
 * Card with custom badge in header right slot
 */
export const WithHeaderRightBadge: Story = {
  parameters: {
    order: 8,
    docs: {
      description: {
        story:
          "Use CardHeaderRight for custom content in the header corner. Accepts any element - badges, buttons, text, etc.",
      },
    },
  },
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Custom Header Element</CardTitle>
        <CardDescription>Badge positioned in top-right using CardHeaderRight</CardDescription>
        <CardHeaderRight>
          <Badge variant="fjord" className="h-fit">
            New
          </Badge>
        </CardHeaderRight>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          CardHeaderRight provides a predictable slot for any custom element in the top-right
          corner.
        </p>
      </CardContent>
    </Card>
  ),
};

/**
 * Card with icon and custom header right element (3-column grid)
 */
export const WithIconAndHeaderRight: Story = {
  parameters: {
    order: 9,
    docs: {
      description: {
        story:
          "Demonstrates the full 3-column grid: CardIcon + title/description + CardHeaderRight with a custom badge.",
      },
    },
  },
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardIcon>
          <Badge variant="mountain" size="icon">
            <IconCube size={12} />
          </Badge>
        </CardIcon>
        <CardTitle>Skarv Model</CardTitle>
        <CardDescription>Point cloud scene</CardDescription>
        <CardHeaderRight>
          <Badge variant="fjord" className="h-fit">
            Beta
          </Badge>
        </CardHeaderRight>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          All three grid columns are active: icon, content, and custom right element.
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
    order: 10,
    docs: {
      description: {
        story: "Card with only content section, no header or footer.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Content Only Card")).toBeInTheDocument();
    await expect(
      canvas.getByText("This card contains only content without a header or footer section.")
    ).toBeInTheDocument();
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
    order: 11,
    docs: {
      description: {
        story:
          "Multiple cards displayed in a responsive grid using container queries. Cards stack on mobile, display 2 across on tablets, and 3 across on larger containers.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Card 1")).toBeInTheDocument();
    await expect(canvas.getByText("Card 2")).toBeInTheDocument();
    await expect(canvas.getByText("Card 3")).toBeInTheDocument();
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

/**
 * Card with custom heading levels for semantic HTML
 */
export const SemanticHeadings: Story = {
  parameters: {
    order: 12,
    docs: {
      description: {
        story:
          "CardTitle supports polymorphic heading elements via the `as` prop. Use h1-h6 to maintain proper document outline and semantic HTML structure. Defaults to h3.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const h2Title = canvas.getByRole("heading", { level: 2, name: "Section Title (h2)" });
    await expect(h2Title).toBeInTheDocument();

    const h3Title = canvas.getByRole("heading", { level: 3, name: "Default Heading (h3)" });
    await expect(h3Title).toBeInTheDocument();

    const h4Title = canvas.getByRole("heading", { level: 4, name: "Subsection Title (h4)" });
    await expect(h4Title).toBeInTheDocument();
  },
  render: () => (
    <div className="flex flex-col gap-6 w-full max-w-2xl">
      {/* h2 example - for main sections */}
      <Card>
        <CardHeader>
          <CardTitle as="h2">Section Title (h2)</CardTitle>
          <CardDescription>Use h2 for main section headings</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            When your card represents a major section of content, use <code>as="h2"</code> for
            proper document hierarchy.
          </p>
        </CardContent>
      </Card>

      {/* h3 example - default */}
      <Card>
        <CardHeader>
          <CardTitle>Default Heading (h3)</CardTitle>
          <CardDescription>CardTitle defaults to h3 when no "as" prop is provided</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            The default is <code>&lt;h3&gt;</code>, which works well for most card use cases in a
            typical page hierarchy.
          </p>
        </CardContent>
      </Card>

      {/* h4 example - for subsections */}
      <Card>
        <CardHeader>
          <CardTitle as="h4">Subsection Title (h4)</CardTitle>
          <CardDescription>Use h4 for nested subsections</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            When cards are nested within sections, use <code>as="h4"</code>, <code>as="h5"</code>,
            or <code>as="h6"</code> to maintain semantic structure.
          </p>
        </CardContent>
      </Card>
    </div>
  ),
};

/**
 * Interactive playground for experimenting with card props
 */
export const Playground: Story = {
  parameters: {
    order: 99,
    docs: {
      description: {
        story:
          "Interactive playground to experiment with different card configurations. Use the controls panel to customize props.",
      },
    },
  },
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardIcon>
          <Badge variant="fjord" size="icon">
            <IconCube size={12} />
          </Badge>
        </CardIcon>
        <CardTitle>Playground Card</CardTitle>
        <CardDescription>Experiment with card props using the controls below</CardDescription>
        <CardHeaderRight>
          <Badge variant="nordic" className="h-fit">
            New
          </Badge>
        </CardHeaderRight>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          This is an interactive playground. Try changing the className or other props using the
          controls panel to see how the card responds.
        </p>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="default" size="sm">
          Primary Action
        </Button>
        <Button variant="secondary" size="sm">
          Secondary
        </Button>
      </CardFooter>
    </Card>
  ),
  args: {
    className: "w-96",
  },
};
