import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { IconDotsVertical, IconTrendingUp } from "@tabler/icons-react";
import { useState } from "react";
import { Cell, Pie, PieChart, type PieLabelRenderProps } from "recharts";

import { Button } from "@/components/ui/aura/button";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/aura/chart";
import {
  ArtifactChart,
  ArtifactChartCenterLabel,
  ArtifactChartContent,
  ArtifactChartDescription,
  ArtifactChartFooter,
  ArtifactChartFooterDescription,
  ArtifactChartFooterTitle,
  ArtifactChartHeader,
  ArtifactChartLegend,
  ArtifactChartLegendItem,
  ArtifactChartTitle,
} from "./artifact-chart";

// Sample data and config for pie charts
const pieChartConfig = {
  complete: {
    label: "Complete",
    color: "var(--color-fjord-450)",
  },
  inProgress: {
    label: "In progress",
    color: "var(--color-fjord-400)",
  },
  blocked: {
    label: "Blocked",
    color: "var(--color-fjord-300)",
  },
  queued: {
    label: "Queued",
    color: "var(--color-fjord-200)",
  },
  review: {
    label: "In review",
    color: "var(--color-fjord-100)",
  },
} satisfies ChartConfig;

const pieChartData = [
  { id: "complete", value: 240 },
  { id: "inProgress", value: 275 },
  { id: "blocked", value: 275 },
  { id: "queued", value: 275 },
  { id: "review", value: 275 },
];

const meta: Meta<typeof ArtifactChart> = {
  title: "Primitives/Artifact - Chart",
  component: ArtifactChart,
  tags: ["autodocs"],
  argTypes: {
    // Display
    className: {
      control: "text",
      description: "CSS classes for styling the card wrapper",
      table: {
        category: "Display",
      },
    },

    // Content
    children: {
      control: false,
      description: "Compositional children (Header, Content, Footer)",
      table: {
        category: "Content",
      },
    },
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A compositional card layout for displaying charts. Use with Recharts components (PieChart, BarChart, etc.) inside the content area.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ArtifactChart>;

// =============================================================================
// PIE CHART STORIES
// =============================================================================

/**
 * Pie chart with a centered label showing total value.
 * Uses ChartContainer for color theming and ChartTooltip for hover interactions.
 */
export const PieChartWithCenterLabel: Story = {
  args: {
    className: "h-96 w-96 justify-between overflow-hidden p-4",
  },
  parameters: {
    docs: {
      description: {
        story:
          "A donut chart with a centered label displaying the total. The center label uses `ArtifactChartCenterLabel` positioned absolutely within a relative container.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Task completion")).toBeInTheDocument();
    await expect(canvas.getByText("January - June 2024")).toBeInTheDocument();
    await expect(canvas.getByText("Total")).toBeInTheDocument();
    await expect(canvas.getByText("1,340")).toBeInTheDocument();
  },
  render: (args) => {
    const total = pieChartData.reduce((sum, item) => sum + item.value, 0);

    return (
      <ArtifactChart className={args.className}>
        <ArtifactChartHeader className="flex-row items-start p-0">
          <div className="flex-1 space-y-0.5">
            <div className="flex items-center gap-2">
              <ArtifactChartTitle className="leading-5">Task completion</ArtifactChartTitle>
              <Button variant="ghost" size="icon-sm" aria-label="More options">
                <IconDotsVertical />
              </Button>
            </div>
            <ArtifactChartDescription>January - June 2024</ArtifactChartDescription>
          </div>
        </ArtifactChartHeader>
        <ArtifactChartContent className="p-0">
          <div className="relative flex items-center justify-center">
            <ChartContainer config={pieChartConfig} className="aspect-square h-48 w-48">
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideIndicator labelKey="id" nameKey="id" />}
                />
                <Pie
                  data={pieChartData}
                  dataKey="value"
                  nameKey="id"
                  innerRadius={64}
                  outerRadius={96}
                  strokeWidth={0}
                >
                  {pieChartData.map((entry) => (
                    <Cell
                      key={entry.id}
                      fill={`var(--color-${entry.id})`}
                      className="transition-opacity duration-200 hover:opacity-80"
                    />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
            <ArtifactChartCenterLabel label="Total" value={total.toLocaleString()} />
          </div>
        </ArtifactChartContent>
        <ArtifactChartFooter className="p-0">
          <ArtifactChartFooterTitle>
            Trending up by 5.2% this month
            <IconTrendingUp className="h-4 w-4" />
          </ArtifactChartFooterTitle>
          <ArtifactChartFooterDescription>
            Total tasks for the last 6 months
          </ArtifactChartFooterDescription>
        </ArtifactChartFooter>
      </ArtifactChart>
    );
  },
};

/**
 * Pie chart with colored labels positioned around the chart slices.
 */
export const PieChartWithColoredLabels: Story = {
  args: {
    className: "h-[420px] w-96 justify-between overflow-hidden p-4",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Donut chart with colored labels rendered around each slice using a custom label renderer.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Distribution")).toBeInTheDocument();
    await expect(canvas.getByText("By category")).toBeInTheDocument();
  },
  render: (args) => {
    const total = pieChartData.reduce((sum, item) => sum + item.value, 0);

    const getLabelColor = (payload: PieLabelRenderProps) => {
      const dataId = payload.payload?.id ?? payload.name;
      if (typeof dataId === "string") {
        return (
          pieChartConfig[dataId as keyof typeof pieChartConfig]?.color ?? `var(--color-${dataId})`
        );
      }
      return "var(--color-fjord-450)";
    };

    const renderLabel = (payload: PieLabelRenderProps) => {
      const labelText = String(payload.value ?? 0);
      const labelWidth = Math.max(22, labelText.length * 7);
      return (
        <g transform={`translate(${payload.x}, ${payload.y})`}>
          <rect
            x={-labelWidth / 2}
            y={-9}
            width={labelWidth}
            height={18}
            rx={2}
            fill={getLabelColor(payload)}
            fillOpacity={0.2}
          />
          <text
            textAnchor="middle"
            dominantBaseline="central"
            fill={getLabelColor(payload)}
            className="text-xs font-medium"
          >
            {labelText}
          </text>
        </g>
      );
    };

    return (
      <ArtifactChart className={args.className}>
        <ArtifactChartHeader className="p-0">
          <ArtifactChartTitle>Distribution</ArtifactChartTitle>
          <ArtifactChartDescription>By category</ArtifactChartDescription>
        </ArtifactChartHeader>
        <ArtifactChartContent className="p-0">
          <div className="relative flex items-center justify-center">
            <ChartContainer config={pieChartConfig} className="aspect-square h-48 w-48">
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideIndicator labelKey="id" nameKey="id" />}
                />
                <Pie
                  data={pieChartData}
                  dataKey="value"
                  nameKey="id"
                  innerRadius={64}
                  outerRadius={96}
                  strokeWidth={0}
                  label={renderLabel}
                  labelLine={false}
                >
                  {pieChartData.map((entry) => (
                    <Cell
                      key={entry.id}
                      fill={`var(--color-${entry.id})`}
                      className="transition-opacity duration-200 hover:opacity-80"
                    />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
            <ArtifactChartCenterLabel label="Items" value={total.toLocaleString()} />
          </div>
        </ArtifactChartContent>
        <ArtifactChartFooter className="p-0">
          <ArtifactChartFooterDescription>Updated just now</ArtifactChartFooterDescription>
        </ArtifactChartFooter>
      </ArtifactChart>
    );
  },
};

/**
 * Pie chart with a legend showing all categories.
 */
export const PieChartWithLegend: Story = {
  args: {
    className: "h-[440px] w-96 justify-between overflow-hidden p-4",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Donut chart with a legend displaying each category. Uses `ArtifactChartLegend` and `ArtifactChartLegendItem` components.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Asset overview")).toBeInTheDocument();
    // Check legend items
    await expect(canvas.getByText("Complete")).toBeInTheDocument();
    await expect(canvas.getByText("In progress")).toBeInTheDocument();
    await expect(canvas.getByText("Blocked")).toBeInTheDocument();
  },
  render: (args) => {
    const total = pieChartData.reduce((sum, item) => sum + item.value, 0);

    return (
      <ArtifactChart className={args.className}>
        <ArtifactChartHeader className="p-0">
          <ArtifactChartTitle>Asset overview</ArtifactChartTitle>
          <ArtifactChartDescription>Plant-wide status</ArtifactChartDescription>
        </ArtifactChartHeader>
        <ArtifactChartContent className="p-0">
          <div className="relative flex items-center justify-center">
            <ChartContainer config={pieChartConfig} className="aspect-square h-48 w-48">
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideIndicator labelKey="id" nameKey="id" />}
                />
                <Pie
                  data={pieChartData}
                  dataKey="value"
                  nameKey="id"
                  innerRadius={64}
                  outerRadius={96}
                  strokeWidth={0}
                >
                  {pieChartData.map((entry) => (
                    <Cell
                      key={entry.id}
                      fill={`var(--color-${entry.id})`}
                      className="transition-opacity duration-200 hover:opacity-80"
                    />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
            <ArtifactChartCenterLabel label="Assets" value={total.toLocaleString()} />
          </div>
        </ArtifactChartContent>
        <ArtifactChartLegend>
          {pieChartData.map((item) => (
            <ArtifactChartLegendItem
              key={item.id}
              color={pieChartConfig[item.id as keyof typeof pieChartConfig]?.color}
            >
              {pieChartConfig[item.id as keyof typeof pieChartConfig]?.label}
            </ArtifactChartLegendItem>
          ))}
        </ArtifactChartLegend>
        <ArtifactChartFooter className="p-0">
          <ArtifactChartFooterTitle>
            Overall health: Good
            <IconTrendingUp className="h-4 w-4" />
          </ArtifactChartFooterTitle>
          <ArtifactChartFooterDescription>
            Last updated 5 minutes ago
          </ArtifactChartFooterDescription>
        </ArtifactChartFooter>
      </ArtifactChart>
    );
  },
};

/**
 * Minimal pie chart without header or footer.
 */
export const PieChartMinimal: Story = {
  args: {
    className: "w-64 p-4",
  },
  parameters: {
    docs: {
      description: {
        story: "A minimal donut chart with just the chart content and center label.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Total")).toBeInTheDocument();
  },
  render: (args) => {
    const total = pieChartData.reduce((sum, item) => sum + item.value, 0);

    return (
      <ArtifactChart className={args.className}>
        <ArtifactChartContent className="p-0">
          <div className="relative flex items-center justify-center">
            <ChartContainer config={pieChartConfig} className="aspect-square h-48 w-48">
              <PieChart>
                <Pie
                  data={pieChartData}
                  dataKey="value"
                  nameKey="id"
                  innerRadius={64}
                  outerRadius={96}
                  strokeWidth={0}
                >
                  {pieChartData.map((entry) => (
                    <Cell key={entry.id} fill={`var(--color-${entry.id})`} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
            <ArtifactChartCenterLabel label="Total" value={total.toLocaleString()} />
          </div>
        </ArtifactChartContent>
      </ArtifactChart>
    );
  },
};

/**
 * Interactive pie chart that updates data on button click.
 */
export const PieChartInteractive: Story = {
  args: {
    className: "w-80",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive donut chart that randomizes values when clicking the button. Demonstrates stateful chart updates.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const randomizeButton = canvas.getByRole("button", { name: "Randomize" });

    await expect(randomizeButton).toBeInTheDocument();
    await userEvent.click(randomizeButton);
  },
  render: function PieChartInteractiveStory(args) {
    const [data, setData] = useState(pieChartData);

    const handleRandomize = () => {
      const values = data.map(() => Math.floor(Math.random() * 70) + 10);
      const total = values.reduce((sum, value) => sum + value, 0);
      setData(
        data.map((item, index) => ({
          ...item,
          value: Math.round((values[index] / total) * 100),
        }))
      );
    };

    const total = data.reduce((sum, item) => sum + item.value, 0);

    return (
      <ArtifactChart className={args.className}>
        <ArtifactChartHeader>
          <ArtifactChartTitle>Workload split</ArtifactChartTitle>
          <ArtifactChartDescription>Current distribution</ArtifactChartDescription>
        </ArtifactChartHeader>
        <ArtifactChartContent>
          <div className="relative flex items-center justify-center">
            <ChartContainer config={pieChartConfig} className="aspect-square h-48 w-48">
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideIndicator labelKey="id" nameKey="id" />}
                />
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="id"
                  innerRadius={64}
                  outerRadius={96}
                  strokeWidth={0}
                  isAnimationActive
                >
                  {data.map((entry) => (
                    <Cell
                      key={entry.id}
                      fill={`var(--color-${entry.id})`}
                      className="transition-opacity duration-200 hover:opacity-80"
                    />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
            <ArtifactChartCenterLabel label="Total" value={total.toLocaleString()} />
          </div>
        </ArtifactChartContent>
        <ArtifactChartFooter className="flex-row items-center justify-between">
          <span className="text-sm text-muted-foreground">Updated just now</span>
          <Button size="sm" variant="secondary" onClick={handleRandomize}>
            Randomize
          </Button>
        </ArtifactChartFooter>
      </ArtifactChart>
    );
  },
};

/**
 * Pie chart with custom opacity values for each slice.
 */
export const PieChartWithOpacity: Story = {
  args: {
    className: "w-80",
  },
  parameters: {
    docs: {
      description: {
        story: "Donut chart with varying opacity values on each slice to create depth.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Completion rate")).toBeInTheDocument();
  },
  render: (args) => {
    const dataWithOpacity = [
      { id: "complete", value: 240, opacity: 1 },
      { id: "inProgress", value: 180, opacity: 0.8 },
      { id: "blocked", value: 120, opacity: 0.6 },
      { id: "queued", value: 90, opacity: 0.4 },
      { id: "review", value: 60, opacity: 0.2 },
    ];

    const total = dataWithOpacity.reduce((sum, item) => sum + item.value, 0);

    return (
      <ArtifactChart className={args.className}>
        <ArtifactChartHeader>
          <ArtifactChartTitle>Completion rate</ArtifactChartTitle>
          <ArtifactChartDescription>Progress breakdown</ArtifactChartDescription>
        </ArtifactChartHeader>
        <ArtifactChartContent>
          <div className="relative flex items-center justify-center">
            <ChartContainer config={pieChartConfig} className="aspect-square h-48 w-48">
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideIndicator labelKey="id" nameKey="id" />}
                />
                <Pie
                  data={dataWithOpacity}
                  dataKey="value"
                  nameKey="id"
                  innerRadius={64}
                  outerRadius={96}
                  strokeWidth={0}
                >
                  {dataWithOpacity.map((entry) => (
                    <Cell
                      key={entry.id}
                      fill={`var(--color-${entry.id})`}
                      fillOpacity={entry.opacity}
                      className="transition-opacity duration-200 hover:opacity-80"
                    />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
            <ArtifactChartCenterLabel label="Tasks" value={total.toLocaleString()} />
          </div>
        </ArtifactChartContent>
        <ArtifactChartLegend>
          {dataWithOpacity.map((item) => (
            <ArtifactChartLegendItem
              key={item.id}
              color={pieChartConfig[item.id as keyof typeof pieChartConfig]?.color}
            >
              {pieChartConfig[item.id as keyof typeof pieChartConfig]?.label}
            </ArtifactChartLegendItem>
          ))}
        </ArtifactChartLegend>
      </ArtifactChart>
    );
  },
};
