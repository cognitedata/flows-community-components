import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  IconChartLine,
  IconCube,
  IconGauge,
  IconReportAnalytics,
} from '@tabler/icons-react';
import { expect, userEvent, within } from 'storybook/test';

import { Badge } from '../badge';
import { Button } from '../button';
import { DropdownMenuItem, DropdownMenuSeparator } from '../dropdown-menu';

import {
  Card,
  CardActions,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardHeaderLeft,
  CardHeaderRight,
  CardTitle,
} from './card';

const meta: Meta<typeof Card> = {
  title: 'Primitives/Card',
  component: Card,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="flex justify-center w-full p-8">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    className: {
      control: 'text',
      table: {
        category: 'Advanced',
      },
    },
    children: {
      control: 'text',
      table: {
        category: 'Content',
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Card>;
export const Basic: Story = {
  parameters: {
    order: 1,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const title = canvas.getByText('21PT1019');
    await expect(title).toBeInTheDocument();

    const description = canvas.getByText('Pressure over last 24 hours');
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

export const WithTextFooter: Story = {
  parameters: {
    order: 2,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText('21PT1019')).toBeInTheDocument();
    await expect(
      canvas.getByText('Pressure over last 24 hours')
    ).toBeInTheDocument();

    await expect(
      canvas.getByText('Trending up by 5.2% this month', { exact: false })
    ).toBeInTheDocument();
    await expect(canvas.getByText('No alerts')).toBeInTheDocument();
  },
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>21PT1019</CardTitle>
        <CardDescription>Pressure over last 24 hours</CardDescription>
      </CardHeader>
      <CardContent />
      <CardFooter className="gap-1 flex-col">
        <div className="flex items-center text-sm font-medium text-foreground tracking-normal gap-1">
          Trending up by 5.2% this month <IconChartLine size={16} />
        </div>
        <div className="text-sm font-normal text-muted-foreground tracking-normal">
          No alerts
        </div>
      </CardFooter>
    </Card>
  ),
};

export const WithBadgeInHeader: Story = {
  parameters: {
    order: 3,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText('Skarv')).toBeInTheDocument();
    await expect(canvas.getByText('Point cloud scene')).toBeInTheDocument();

    const actionButtons = canvas.getAllByRole('button');
    await expect(actionButtons.length).toBeGreaterThan(0);

    const footerButton = canvas.getByRole('button', { name: /view scene/i });
    await expect(footerButton).toBeInTheDocument();

    await expect(
      canvas.getByText('Model ID: 4602269428617841')
    ).toBeInTheDocument();
  },
  render: () => (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardHeaderLeft>
          <Badge variant="mountain" size="icon">
            <IconCube size={12} />
          </Badge>
        </CardHeaderLeft>
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

export const WithHover: Story = {
  parameters: {
    order: 4,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const cardTitle = canvas.getByText('Title');
    await expect(cardTitle).toBeInTheDocument();

    await userEvent.hover(cardTitle);
  },
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardHeaderLeft>
          <Badge variant="mountain" size="icon">
            <IconCube size={12} />
          </Badge>
        </CardHeaderLeft>
        <CardTitle>Title</CardTitle>
        <CardDescription>Subtitle</CardDescription>
      </CardHeader>
      <CardContent className="gap-2">
        <div className="text-base text-secondary-foreground tracking-tightest">
          Description
        </div>
      </CardContent>
      <CardFooter className="gap-1 flex-col">
        <div className="flex items-center text-sm font-medium text-foreground tracking-normal gap-1">
          Trending up by 5.2% this month <IconChartLine size={16} />
        </div>
        <div className="text-sm font-normal text-muted-foreground tracking-normal">
          No alerts
        </div>
      </CardFooter>
    </Card>
  ),
};

export const Minimal: Story = {
  parameters: {
    order: 5,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const title = canvas.getByRole('heading', {
      level: 3,
      name: 'Simple Card',
    });
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

export const WithActions: Story = {
  parameters: {
    order: 6,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const title = canvas.getByRole('heading', {
      level: 3,
      name: 'Card with Actions',
    });
    await expect(title).toBeInTheDocument();

    const actionsButton = canvas.getByRole('button');
    await expect(actionsButton).toBeInTheDocument();
    await userEvent.click(actionsButton);

    const menu = await within(document.body).findByRole('menu');
    await expect(menu).toBeInTheDocument();

    const viewDetails = await within(menu).findByRole('menuitem', {
      name: /View details/i,
    });
    await expect(viewDetails).toBeInTheDocument();

    const deleteOption = await within(menu).findByRole('menuitem', {
      name: /Delete card/i,
    });
    await expect(deleteOption).toBeInTheDocument();
  },
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Card with Actions</CardTitle>
        <CardDescription>
          This card has a dropdown menu with actions
        </CardDescription>
        <CardHeaderRight>
          <CardActions>
            <DropdownMenuItem>
              <IconCube className="size-4" />
              View details
            </DropdownMenuItem>
            <DropdownMenuItem>Edit configuration</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              Delete card
            </DropdownMenuItem>
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

export const WithIconAndActions: Story = {
  parameters: {
    order: 7,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const title = canvas.getByRole('heading', {
      level: 3,
      name: 'Skarv Model',
    });
    await expect(title).toBeInTheDocument();

    const description = canvas.getByText('Point cloud scene');
    await expect(description).toBeInTheDocument();

    const modelId = canvas.getByText(/Model ID: 4602269428617841/i);
    await expect(modelId).toBeInTheDocument();

    const actionsButton = canvas.getByRole('button');
    await userEvent.click(actionsButton);

    const menu = await within(document.body).findByRole('menu');
    await expect(menu).toBeInTheDocument();

    const viewDetails = await within(menu).findByRole('menuitem', {
      name: /View details/i,
    });
    await expect(viewDetails).toBeInTheDocument();
  },
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardHeaderLeft>
          <Badge variant="mountain" size="icon">
            <IconCube size={12} />
          </Badge>
        </CardHeaderLeft>
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
        <p className="text-sm text-muted-foreground">
          Model ID: 4602269428617841
        </p>
      </CardContent>
    </Card>
  ),
};

export const WithHeaderRightBadge: Story = {
  parameters: {
    order: 8,
  },
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Custom Header Element</CardTitle>
        <CardDescription>
          Badge positioned in top-right using CardHeaderRight
        </CardDescription>
        <CardHeaderRight>
          <Badge variant="fjord" className="h-fit">
            New
          </Badge>
        </CardHeaderRight>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          CardHeaderRight provides a predictable slot for any custom element in
          the top-right corner.
        </p>
      </CardContent>
    </Card>
  ),
};

export const WithIconAndHeaderRight: Story = {
  parameters: {
    order: 9,
  },
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardHeaderLeft>
          <Badge variant="mountain" size="icon">
            <IconCube size={12} />
          </Badge>
        </CardHeaderLeft>
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
          All three grid columns are active: icon, content, and custom right
          element.
        </p>
      </CardContent>
    </Card>
  ),
};

export const ContentOnly: Story = {
  parameters: {
    order: 10,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText('Content Only Card')).toBeInTheDocument();
    await expect(
      canvas.getByText(
        'This card contains only content without a header or footer section.'
      )
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

export const GridLayout: Story = {
  parameters: {
    order: 11,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText('Card 1')).toBeInTheDocument();
    await expect(canvas.getByText('Card 2')).toBeInTheDocument();
    await expect(canvas.getByText('Card 3')).toBeInTheDocument();
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

export const SemanticHeadings: Story = {
  parameters: {
    order: 12,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const h2Title = canvas.getByRole('heading', {
      level: 2,
      name: 'Section Title (h2)',
    });
    await expect(h2Title).toBeInTheDocument();

    const h3Title = canvas.getByRole('heading', {
      level: 3,
      name: 'Default Heading (h3)',
    });
    await expect(h3Title).toBeInTheDocument();

    const h4Title = canvas.getByRole('heading', {
      level: 4,
      name: 'Subsection Title (h4)',
    });
    await expect(h4Title).toBeInTheDocument();
  },
  render: () => (
    <div className="flex flex-col gap-6 w-full max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle as="h2">Section Title (h2)</CardTitle>
          <CardDescription>Use h2 for main section headings</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            When your card represents a major section of content, use{' '}
            <code>as="h2"</code> for proper document hierarchy.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Default Heading (h3)</CardTitle>
          <CardDescription>
            CardTitle defaults to h3 when no "as" prop is provided
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            The default is <code>&lt;h3&gt;</code>, which works well for most
            card use cases in a typical page hierarchy.
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle as="h4">Subsection Title (h4)</CardTitle>
          <CardDescription>Use h4 for nested subsections</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            When cards are nested within sections, use <code>as="h4"</code>,{' '}
            <code>as="h5"</code>, or <code>as="h6"</code> to maintain semantic
            structure.
          </p>
        </CardContent>
      </Card>
    </div>
  ),
};

export const Playground: Story = {
  parameters: {
    order: 99,
  },
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardHeaderLeft>
          <Badge variant="fjord" size="icon">
            <IconCube size={12} />
          </Badge>
        </CardHeaderLeft>
        <CardTitle>Playground Card</CardTitle>
        <CardDescription>
          Experiment with card props using the controls below
        </CardDescription>
        <CardHeaderRight>
          <Badge variant="nordic" className="h-fit">
            New
          </Badge>
        </CardHeaderRight>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          This is an interactive playground. Try changing the className or other
          props using the controls panel to see how the card responds.
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
};
