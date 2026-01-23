import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { useEffect, useState } from "react";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { Button } from "@/components/ui/aura/button";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/aura/chart";
import {
  ArtifactCount,
  ArtifactCountContent,
  ArtifactCountCount,
  ArtifactCountFooter,
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
        category: "Display",
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
  args: {
    className: "w-100",
  },
  parameters: {
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
  render: (args) => (
    <ArtifactCount {...args}>
      <ArtifactCountHeader>
        <ArtifactCountCount status="warning">3</ArtifactCountCount>
        <span className="text-base font-medium leading-5 tracking-tightest">Active alarms</span>
      </ArtifactCountHeader>
      <ArtifactCountSeparator />
      <ArtifactCountFooter>
        <div className="flex items-center gap-0.5">
          <span className="text-muted-foreground">Critical:</span>
          <span className="font-medium">0</span>
        </div>
        <div className="flex items-center gap-0.5">
          <span className="text-muted-foreground">High:</span>
          <span className="font-medium">2</span>
        </div>
        <div className="flex items-center gap-0.5">
          <span className="text-muted-foreground">Medium:</span>
          <span className="font-medium">1</span>
        </div>
      </ArtifactCountFooter>
    </ArtifactCount>
  ),
};

/**
 * Count with separator and footer details.
 */
export const WithFooter: Story = {
  args: {
    className: "w-100",
  },
  parameters: {
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
  render: (args) => (
    <ArtifactCount {...args}>
      <ArtifactCountHeader className="items-end">
        <ArtifactCountCount status="critical">392°C</ArtifactCountCount>
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
        <span>Min: 384°C</span>
        <span>Max: 390°C</span>
      </ArtifactCountFooter>
    </ArtifactCount>
  ),
};

/**
 * Count with interactive real-time chart.
 */
export const WithChart: Story = {
  args: {
    className: "w-100 gap-2",
  },
  parameters: {
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
  render: function WithChartRender(args) {
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
      <ArtifactCount {...args}>
        <ArtifactCountHeader className="items-end">
          <ArtifactCountCount status="default">{currentTemp}</ArtifactCountCount>
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
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: "hsl(239 84% 67%)" }}
              />
              <span className="text-muted-foreground">Current: {currentTemp}°C</span>
            </div>
            <span className="text-muted-foreground">4h Average: {avgTemp.toFixed(1)}°C</span>
          </div>
          <span className="text-xs text-muted-foreground">Updates every 5 minutes</span>
        </ArtifactCountFooter>
      </ArtifactCount>
    );
  },
};

/**
 * Interactive count that updates over time.
 */
export const Interactive: Story = {
  args: {
    className: "w-100",
  },
  parameters: {
    docs: {
      description: {
        story: "Stateful count that updates when the button is pressed.",
      },
    },
  },
  render: function ArtifactCountInteractive(args) {
    const [value, setValue] = useState(392);

    return (
      <ArtifactCount {...args}>
        <ArtifactCountHeader>
          <ArtifactCountCount status="warning">{value}°C</ArtifactCountCount>
        </ArtifactCountHeader>
        <ArtifactCountSeparator />
        <ArtifactCountFooter className="text-muted-foreground">
          <span>Last updated just now</span>
          <Button size="sm" variant="secondary" onClick={() => setValue((prev) => prev + 1)}>
            Increase
          </Button>
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
