import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import { IconDotsVertical, IconTrendingUp } from "@tabler/icons-react";
import { useState } from "react";
import { Cell, Pie, PieChart, type PieLabelRenderProps } from "recharts";

import { CardActions, CardHeaderRight } from "@/components/ui/aura/card";
import { type ChartConfig, ChartContainer, ChartTooltip } from "@/components/ui/aura/chart";
import { DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/aura/dropdown-menu";
import {
  ArtifactChart,
  ArtifactChartContent,
  ArtifactChartDescription,
  ArtifactChartFooter,
  ArtifactChartHeader,
  ArtifactChartTitle,
} from "./artifact-chart";

const meta: Meta<typeof ArtifactChart> = {
  title: "Primitives/Artifact - Chart",
  component: ArtifactChart,
  tags: ["autodocs"],
  argTypes: {
    // Content
    children: {
      control: false,
      description:
        "Compositional children: ArtifactChartHeader, ArtifactChartContent, ArtifactChartFooter",
      table: {
        category: "Content",
        type: { summary: "ReactNode" },
      },
    },

    // Display
    className: {
      control: "text",
      description: "Additional CSS classes for styling the card wrapper",
      table: {
        category: "Display",
      },
    },
    style: {
      control: "object",
      description: "Inline styles for the card wrapper",
      table: {
        category: "Display",
        type: { summary: "CSSProperties" },
      },
    },

    // HTML Attributes
    id: {
      control: "text",
      description: "HTML id attribute for the card element",
      table: {
        category: "HTML Attributes",
      },
    },
    role: {
      control: "text",
      description: "ARIA role attribute (defaults to implicit region)",
      table: {
        category: "HTML Attributes",
      },
    },
    "aria-label": {
      control: "text",
      description: "Accessible label for the chart artifact",
      table: {
        category: "HTML Attributes",
      },
    },
    "aria-labelledby": {
      control: "text",
      description: "ID of element that labels this chart artifact",
      table: {
        category: "HTML Attributes",
      },
    },
    "aria-describedby": {
      control: "text",
      description: "ID of element that describes this chart artifact",
      table: {
        category: "HTML Attributes",
      },
    },

    // Events
    onClick: {
      action: "clicked",
      description: "Click handler for the card",
      table: {
        category: "Events",
        type: { summary: "MouseEventHandler<HTMLDivElement>" },
      },
    },
    onKeyDown: {
      action: "keyDown",
      description: "Keyboard handler for accessibility",
      table: {
        category: "Events",
        type: { summary: "KeyboardEventHandler<HTMLDivElement>" },
      },
    },

    // Advanced
    ref: {
      control: false,
      description: "Ref forwarded to the underlying Card element",
      table: {
        category: "Advanced",
        type: { summary: "Ref<HTMLDivElement>" },
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

/**
 * Complete pie chart artifact with header, donut chart with value labels,
 * legend, and footer. Demonstrates the full compositional pattern.
 */
export const Basic: Story = {
  parameters: {
    order: 1,
    docs: {
      description: {
        story:
          "Complete pie chart artifact with header, donut chart with value labels, legend, and footer. Labels use fjord-450 blue with 20% opacity background.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Chart title")).toBeInTheDocument();
    await expect(canvas.getByText("January - June 2024")).toBeInTheDocument();
    await expect(canvas.getByText("Visitors")).toBeInTheDocument();
    await expect(canvas.getByText("1,125")).toBeInTheDocument();
    await expect(canvas.getByText("Trending up by 5.2% this month")).toBeInTheDocument();
    await expect(canvas.getByText("Total visitors for the last 6 months")).toBeInTheDocument();
  },
  render: function BasicPieChart() {
    // Chart config defines colors for each data segment (lightest to darkest)
    const chartConfig = {
      slice1: { label: "unit", color: "var(--color-chart-fjord-opacity-4)" },
      slice2: { label: "unit", color: "var(--color-chart-fjord-opacity-3)" },
      slice3: { label: "unit", color: "var(--color-chart-fjord-opacity-2)" },
      slice4: { label: "unit", color: "var(--color-chart-fjord-opacity-1)" },
      slice5: { label: "unit", color: "var(--color-chart-fjord-solid)" },
    } satisfies ChartConfig;

    // Data ordered lightest to darkest for clockwise rendering from top
    const [chartData] = useState([
      { id: "slice1", value: 225 }, // lightest - starts at top
      { id: "slice2", value: 225 },
      { id: "slice3", value: 225 },
      { id: "slice4", value: 225 },
      { id: "slice5", value: 225 }, // darkest (solid)
    ]);

    // Label styling per design spec
    const labelColor = "var(--color-fjord-450)";

    const renderLabel = (payload: PieLabelRenderProps) => {
      const labelText = String(payload.value ?? 0);
      const labelWidth = Math.max(26, labelText.length * 8 + 4);
      return (
        <g transform={`translate(${payload.x}, ${payload.y})`}>
          <rect
            x={-labelWidth / 2}
            y={-9}
            width={labelWidth}
            height={18}
            rx={2}
            fill={labelColor}
            fillOpacity={0.2}
          />
          <text
            textAnchor="middle"
            dominantBaseline="central"
            fill={labelColor}
            style={{
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "-0.08px",
            }}
          >
            {labelText}
          </text>
        </g>
      );
    };

    return (
      <ArtifactChart className="w-100">
        <ArtifactChartHeader>
          <ArtifactChartTitle>Chart title</ArtifactChartTitle>
          <ArtifactChartDescription>January - June 2024</ArtifactChartDescription>
          <CardHeaderRight>
            <CardActions>
              <DropdownMenuItem>
                <IconDotsVertical />
                View details
              </DropdownMenuItem>
              <DropdownMenuItem>Edit configuration</DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">Delete card</DropdownMenuItem>
            </CardActions>
          </CardHeaderRight>
        </ArtifactChartHeader>

        <ArtifactChartContent>
          {/* Pie chart with center label */}
          <div className="relative flex items-center justify-center">
            <ChartContainer config={chartConfig} className="w-100 overflow-visible">
              <PieChart style={{ overflow: "visible" }}>
                <ChartTooltip
                  cursor={false}
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const data = payload[0];
                    const id = data.payload?.id as string;
                    const value = data.value as number;
                    const color = chartConfig[id as keyof typeof chartConfig]?.color;

                    return (
                      <div className="flex items-center gap-4 rounded-md bg-white p-2 shadow-md">
                        <div className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-sm" style={{ backgroundColor: color }} />
                          <span className="text-sm text-muted-foreground">unit</span>
                        </div>
                        <span className="text-sm text-foreground">{value.toLocaleString()}</span>
                      </div>
                    );
                  }}
                />
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="id"
                  innerRadius={61}
                  outerRadius={100}
                  strokeWidth={0}
                  startAngle={90}
                  endAngle={-270}
                  label={renderLabel}
                  labelLine={false}
                >
                  {chartData.map((entry) => (
                    <Cell
                      key={entry.id}
                      fill={`var(--color-${entry.id})`}
                      className="transition-opacity duration-200 hover:opacity-80"
                    />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
            {/* Center label - pointer-events-none to allow hover on pie segments */}
            <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
              <div>
                <span className="block text-2xl font-medium text-foreground">1,125</span>
                <span className="block text-sm font-normal text-muted-foreground">Visitors</span>
              </div>
            </div>
          </div>

          {/* Legend - uses chartConfig directly since it's outside ChartContainer's CSS variable scope */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {chartData.map((item) => (
              <div key={item.id} className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-sm"
                  style={{
                    backgroundColor: chartConfig[item.id as keyof typeof chartConfig]?.color,
                  }}
                />
                <span className="text-sm leading-4 text-muted-foreground">unit</span>
              </div>
            ))}
          </div>
        </ArtifactChartContent>

        <ArtifactChartFooter className="flex flex-col items-start gap-1">
          <div className="flex items-center gap-1 text-sm font-medium text-card-foreground">
            Trending up by 5.2% this month
            <IconTrendingUp aria-hidden="true" className="h-4 w-4" />
          </div>
          <div className="text-sm leading-4 text-muted-foreground">
            Total visitors for the last 6 months
          </div>
        </ArtifactChartFooter>
      </ArtifactChart>
    );
  },
};
