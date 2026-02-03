import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { type ComponentProps, useEffect, useState } from "react";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@cognite/aura-lab/chart";
import { Button } from "@cognite/aura/button";
import {
  ArtifactCount,
  ArtifactCountContent,
  ArtifactCountCount,
  ArtifactCountFooter,
  ArtifactCountFooterCenter,
  ArtifactCountFooterLeft,
  ArtifactCountFooterRight,
  ArtifactCountHeader,
  ArtifactCountSeparator,
  ArtifactCountTag,
} from "./artifact-count";

const meta: Meta<typeof ArtifactCount> = {
  title: "Primitives/Artifact - Count",
  component: ArtifactCount,
  tags: ["autodocs"],
  argTypes: {
    // Display
    className: {
      control: "text",
      description: "CSS classes for styling the card wrapper",
      table: {
        category: "Variants / Styling",
        type: { summary: "string" },
      },
    },

    // Content
    children: {
      control: false,
      description: "Compositional children (Header, Content, Footer)",
      table: {
        category: "Content",
        type: { summary: "ReactNode" },
      },
    },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ArtifactCount>;
type PlaygroundArgs = ComponentProps<typeof ArtifactCount> & {
  variant: "default" | "warning" | "critical";
  count: string;
  title: string;
  tag: string;
  footerLeft: string;
  footerRight: string;
};
type PlaygroundStory = StoryObj<PlaygroundArgs>;

// Generate 4 hours of temperature sensor data (sampled every 5 minutes)
const generateTemperatureData = () => {
  const data = [];
  const now = new Date();
  const samplesPerHour = 12; // Every 5 minutes
  const totalSamples = 4 * samplesPerHour; // 48 samples over 4 hours

  for (let i = totalSamples - 1; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 5 * 60 * 1000);

    // Base temperature around 75°C with realistic industrial variations
    let temperature = 75;

    // Daily heating cycle
    const hour = time.getHours();
    if (hour >= 6 && hour <= 18) {
      temperature += 5 + Math.sin(((hour - 6) / 12) * Math.PI) * 8;
    }

    // Add process variations
    temperature += Math.sin(i * 0.1) * 2;
    temperature += Math.sin(i * 0.05) * 1.5;
    temperature += (Math.random() - 0.5) * 2;

    // Occasional temperature spikes
    if (Math.random() < 0.01) {
      temperature += 5 + Math.random() * 8;
    }

    // Ensure realistic industrial temperature range
    temperature = Math.max(60, Math.min(110, temperature));

    data.push({
      time: time.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      temperature: Math.round(temperature * 10) / 10,
      timestamp: time.getTime(),
    });
  }

  return data;
};

const temperatureData = generateTemperatureData();

const temperatureChartConfig = {
  temperature: {
    label: "Temperature",
    color: "hsl(239 84% 67%)",
  },
} satisfies ChartConfig;

/**
 * Basic artifact count with a single value.
 */
export const Basic: Story = {
  parameters: {
    order: 1,
    docs: {
      description: {
        story: "Count widget with a headline count and breakdown summary.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Active alarms")).toBeInTheDocument();
    await expect(canvas.getByText("Critical:")).toBeInTheDocument();
    await expect(canvas.getByText("High:")).toBeInTheDocument();
    await expect(canvas.getByText("Medium:")).toBeInTheDocument();
  },
  render: () => (
    <ArtifactCount className="w-md">
      <ArtifactCountHeader>
        <ArtifactCountCount variant="warning">3</ArtifactCountCount>
        <span className="text-base font-medium leading-5 tracking-tightest">Active alarms</span>
      </ArtifactCountHeader>
      <ArtifactCountSeparator />
      <ArtifactCountFooter>
        <ArtifactCountFooterLeft className="gap-0.5">
          <span className="text-muted-foreground">Critical:</span>
          <span className="font-medium">0</span>
        </ArtifactCountFooterLeft>
        <ArtifactCountFooterCenter className="gap-0.5">
          <span className="text-muted-foreground">High:</span>
          <span className="font-medium">2</span>
        </ArtifactCountFooterCenter>
        <ArtifactCountFooterRight className="gap-0.5">
          <span className="text-muted-foreground">Medium:</span>
          <span className="font-medium">1</span>
        </ArtifactCountFooterRight>
      </ArtifactCountFooter>
    </ArtifactCount>
  ),
};

/**
 * Count with separator and footer details.
 */
export const WithFooter: Story = {
  parameters: {
    order: 2,
    docs: {
      description: {
        story: "Count artifact with a separator and footer context.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Temperature")).toBeInTheDocument();
    await expect(canvas.getByText("Min: 384°C")).toBeInTheDocument();
    await expect(canvas.getByText("Max: 390°C")).toBeInTheDocument();
  },
  render: () => (
    <ArtifactCount className="w-md">
      <ArtifactCountHeader className="items-end">
        <ArtifactCountCount variant="critical">392°C</ArtifactCountCount>
        <div className="flex flex-1 items-end justify-between">
          <div className="flex flex-col">
            <span className="text-base font-medium">Temperature</span>
            <ArtifactCountTag>V-192</ArtifactCountTag>
          </div>
          <ArtifactCountTag>Since 2hrs ago</ArtifactCountTag>
        </div>
      </ArtifactCountHeader>
      <ArtifactCountSeparator />
      <ArtifactCountFooter className="text-muted-foreground">
        <ArtifactCountFooterLeft>Min: 384°C</ArtifactCountFooterLeft>
        <ArtifactCountFooterRight>Max: 390°C</ArtifactCountFooterRight>
      </ArtifactCountFooter>
    </ArtifactCount>
  ),
};

/**
 * Count with interactive real-time chart.
 */
export const WithChart: Story = {
  parameters: {
    order: 3,
    docs: {
      description: {
        story: "Count artifact with title, tag, and interactive real-time chart.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Bar")).toBeInTheDocument();
    await expect(canvas.getByText("V-192")).toBeInTheDocument();
  },
  render: function WithChartRender() {
    const [currentData, setCurrentData] = useState(temperatureData);

    // Simulate real-time data updates
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentData((prevData) => {
          const newData = [...prevData];
          const lastTime = new Date(newData[newData.length - 1].timestamp + 5 * 60 * 1000);

          // Generate new temperature reading
          let newTemp = newData[newData.length - 1].temperature;
          newTemp += (Math.random() - 0.5) * 3;
          newTemp = Math.max(60, Math.min(110, newTemp));

          // Remove oldest data point and add new one
          newData.shift();
          newData.push({
            time: lastTime.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }),
            temperature: Math.round(newTemp * 10) / 10,
            timestamp: lastTime.getTime(),
          });

          return newData;
        });
      }, 3000); // Update every 3 seconds

      return () => clearInterval(interval);
    }, []);

    const currentTemp = currentData[currentData.length - 1]?.temperature || 0;
    const avgTemp =
      currentData.reduce((sum, item) => sum + item.temperature, 0) / currentData.length;

    return (
      <ArtifactCount className="w-md gap-2">
        <ArtifactCountHeader className="items-end">
          <ArtifactCountCount variant="default">{currentTemp}</ArtifactCountCount>
          <div className="flex flex-1 items-end justify-between">
            <div className="flex flex-col">
              <span className="text-base font-medium">Bar</span>
              <ArtifactCountTag>V-192</ArtifactCountTag>
            </div>
            <ArtifactCountTag>Since 2hrs ago</ArtifactCountTag>
          </div>
        </ArtifactCountHeader>
        <ArtifactCountContent className="p-0">
          <ChartContainer config={temperatureChartConfig} className="h-48 w-full">
            <LineChart
              accessibilityLayer
              data={currentData}
              margin={{ left: 0, right: 12, top: 12, bottom: 12 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="time"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                interval={11}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                domain={["dataMin - 5", "dataMax + 5"]}
                tickFormatter={(value) => `${value}°C`}
              />
              <ChartTooltip
                cursor={{ stroke: "hsl(239 84% 67%)", strokeWidth: 1 }}
                content={
                  <ChartTooltipContent
                    indicator="dot"
                    labelFormatter={(value) => `Time: ${value}`}
                    formatter={(value) => [`${value}°C`, "Temperature"]}
                  />
                }
              />
              <Line
                dataKey="temperature"
                type="monotone"
                stroke="hsl(239 84% 67%)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, stroke: "hsl(239 84% 67%)", strokeWidth: 2 }}
                animationDuration={300}
              />
            </LineChart>
          </ChartContainer>
        </ArtifactCountContent>
        <ArtifactCountFooter>
          <ArtifactCountFooterLeft className="gap-4">
            <div className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: "hsl(239 84% 67%)" }}
              />
              <span className="text-muted-foreground">Current: {currentTemp}°C</span>
            </div>
            <span className="text-muted-foreground">4h Average: {avgTemp.toFixed(1)}°C</span>
          </ArtifactCountFooterLeft>
          <ArtifactCountFooterRight>
            <span className="text-xs text-muted-foreground">Updates every 5 minutes</span>
          </ArtifactCountFooterRight>
        </ArtifactCountFooter>
      </ArtifactCount>
    );
  },
};

/**
 * Interactive count that updates over time.
 */
export const Interactive: Story = {
  parameters: {
    order: 4,
    docs: {
      description: {
        story: "Stateful count that updates when the button is pressed.",
      },
    },
  },
  render: function ArtifactCountInteractive() {
    const [value, setValue] = useState(392);

    return (
      <ArtifactCount className="w-md">
        <ArtifactCountHeader>
          <ArtifactCountCount variant="warning">{value}°C</ArtifactCountCount>
        </ArtifactCountHeader>
        <ArtifactCountSeparator />
        <ArtifactCountFooter className="text-muted-foreground">
          <ArtifactCountFooterLeft>Last updated just now</ArtifactCountFooterLeft>
          <ArtifactCountFooterRight>
            <Button size="sm" variant="secondary" onClick={() => setValue((prev) => prev + 1)}>
              Increase
            </Button>
          </ArtifactCountFooterRight>
        </ArtifactCountFooter>
      </ArtifactCount>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Increase" });
    await userEvent.click(button);
    await waitFor(
      () => {
        expect(canvas.getByText("393°C")).toBeInTheDocument();
      },
      { timeout: 300 }
    );
  },
};

/**
 * Edge case with minimal content.
 */
export const EdgeCaseEmpty: Story = {
  parameters: {
    order: 5,
    docs: {
      description: {
        story: "Minimal shell with just a count to validate layout defaults.",
      },
    },
  },
  render: () => (
    <ArtifactCount className="w-md">
      <ArtifactCountHeader>
        <ArtifactCountCount variant="default">0</ArtifactCountCount>
      </ArtifactCountHeader>
    </ArtifactCount>
  ),
};

/**
 * Edge case with long content values.
 */
export const EdgeCaseLongText: Story = {
  parameters: {
    order: 6,
    docs: {
      description: {
        story: "Long titles and footer text to confirm wrapping behavior.",
      },
    },
  },
  render: () => (
    <ArtifactCount className="w-md">
      <ArtifactCountHeader className="items-end">
        <ArtifactCountCount variant="warning">128</ArtifactCountCount>
        <div className="flex flex-1 items-end justify-between">
          <div className="flex flex-col">
            <span className="text-base font-medium">
              Active alarms across the full upstream processing pipeline
            </span>
            <ArtifactCountTag>Separator train A — unit V-192B</ArtifactCountTag>
          </div>
          <ArtifactCountTag>Since yesterday 17:30 (local)</ArtifactCountTag>
        </div>
      </ArtifactCountHeader>
      <ArtifactCountSeparator />
      <ArtifactCountFooter className="text-muted-foreground">
        <ArtifactCountFooterLeft>
          Critical: 24 • High: 56 • Medium: 48 • Low: 12
        </ArtifactCountFooterLeft>
        <ArtifactCountFooterRight>Rolling total based on last 24 hours</ArtifactCountFooterRight>
      </ArtifactCountFooter>
    </ArtifactCount>
  ),
};

/**
 * Edge case with special characters and emojis.
 */
export const EdgeCaseSpecialCharacters: Story = {
  parameters: {
    order: 7,
    docs: {
      description: {
        story: "Special characters and emoji to validate glyph rendering.",
      },
    },
  },
  render: () => (
    <ArtifactCount className="w-md">
      <ArtifactCountHeader className="items-end">
        <ArtifactCountCount variant="critical">99+</ArtifactCountCount>
        <div className="flex flex-1 items-end justify-between">
          <div className="flex flex-col">
            <span className="text-base font-medium">Alerts: ΔP &gt; 5%, ΔT &lt; 0</span>
            <ArtifactCountTag>Unit: V-192 • Line A/B</ArtifactCountTag>
          </div>
          <ArtifactCountTag>Since 08:15 — Shift 2</ArtifactCountTag>
        </div>
      </ArtifactCountHeader>
      <ArtifactCountSeparator />
      <ArtifactCountFooter className="text-muted-foreground">
        <ArtifactCountFooterLeft>Notes: “Overheat” — check valve #4</ArtifactCountFooterLeft>
        <ArtifactCountFooterRight>Notify on-call ⚠️</ArtifactCountFooterRight>
      </ArtifactCountFooter>
    </ArtifactCount>
  ),
};

/**
 * Playground - adjust props and variants interactively.
 */
export const Playground: PlaygroundStory = {
  args: {
    className: "w-md",
    variant: "default",
    count: "392°C",
    title: "Temperature",
    tag: "V-192",
    footerLeft: "Min: 384°C",
    footerRight: "Max: 390°C",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "warning", "critical"],
      description: "Variant for the count chip",
      table: {
        category: "Variants / Styling",
        type: { summary: "'default' | 'warning' | 'critical'" },
      },
    },
    count: {
      control: "text",
      description: "Primary count value",
      table: {
        category: "Content",
        type: { summary: "string" },
      },
    },
    title: {
      control: "text",
      description: "Header title text",
      table: {
        category: "Content",
        type: { summary: "string" },
      },
    },
    tag: {
      control: "text",
      description: "Header tag text",
      table: {
        category: "Content",
        type: { summary: "string" },
      },
    },
    footerLeft: {
      control: "text",
      description: "Left footer text",
      table: {
        category: "Content",
        type: { summary: "string" },
      },
    },
    footerRight: {
      control: "text",
      description: "Right footer text",
      table: {
        category: "Content",
        type: { summary: "string" },
      },
    },
  },
  parameters: {
    order: 99,
    docs: {
      description: {
        story:
          "Interactive playground for experimenting with ArtifactCount layout and count status. Use the controls panel to adjust content and the count variant.",
      },
    },
  },
  render: (args) => (
    <ArtifactCount className={args.className}>
      <ArtifactCountHeader className="items-end">
        <ArtifactCountCount variant={args.variant}>{args.count}</ArtifactCountCount>
        <div className="flex flex-1 items-end justify-between">
          <div className="flex flex-col">
            <span className="text-base font-medium">{args.title}</span>
            <ArtifactCountTag>{args.tag}</ArtifactCountTag>
          </div>
          <ArtifactCountTag>Since 2hrs ago</ArtifactCountTag>
        </div>
      </ArtifactCountHeader>
      <ArtifactCountSeparator />
      <ArtifactCountFooter className="text-muted-foreground">
        <ArtifactCountFooterLeft>{args.footerLeft}</ArtifactCountFooterLeft>
        <ArtifactCountFooterRight>{args.footerRight}</ArtifactCountFooterRight>
      </ArtifactCountFooter>
    </ArtifactCount>
  ),
};
