import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ComponentProps, useEffect, useState } from 'react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { Button } from '../button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../chart';
import { Count } from '../count';

import {
  ArtifactCount,
  ArtifactCountContent,
  ArtifactCountFooter,
  ArtifactCountFooterCenter,
  ArtifactCountFooterLeft,
  ArtifactCountFooterRight,
  ArtifactCountHeader,
  ArtifactCountSeparator,
  ArtifactCountTag,
} from './artifact-count';
const meta: Meta<typeof ArtifactCount> = {
  title: 'Primitives/Artifact - Count',
  component: ArtifactCount,
  tags: ['autodocs', 'ai-elements'],
  argTypes: {
    className: {
      control: 'text',
      table: {
        category: 'Variants / Styling',
        type: {
          summary: 'string',
        },
      },
    },
    children: {
      control: false,
      table: {
        category: 'Content',
        type: {
          summary: 'ReactNode',
        },
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
};
export default meta;
type Story = StoryObj<typeof ArtifactCount>;
type PlaygroundArgs = ComponentProps<typeof ArtifactCount> & {
  variant: 'default' | 'warning' | 'critical';
  count: string;
  title: string;
  tag: string;
  footerLeft: string;
  footerRight: string;
};
type PlaygroundStory = StoryObj<PlaygroundArgs>;
const generateTemperatureData = () => {
  const data = [];
  const now = new Date();
  const samplesPerHour = 12;
  const totalSamples = 4 * samplesPerHour;
  for (let i = totalSamples - 1; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 5 * 60 * 1000);
    let temperature = 75;
    const hour = time.getHours();
    if (hour >= 6 && hour <= 18) {
      temperature += 5 + Math.sin(((hour - 6) / 12) * Math.PI) * 8;
    }
    temperature += Math.sin(i * 0.1) * 2;
    temperature += Math.sin(i * 0.05) * 1.5;
    temperature += (Math.random() - 0.5) * 2;
    if (Math.random() < 0.01) {
      temperature += 5 + Math.random() * 8;
    }
    temperature = Math.max(60, Math.min(110, temperature));
    data.push({
      time: time.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
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
    label: 'Temperature',
    color: 'hsl(239 84% 67%)',
  },
} satisfies ComponentProps<typeof ChartContainer>['config'];
export const Basic: Story = {
  parameters: {
    order: 1,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Active alarms')).toBeInTheDocument();
    await expect(canvas.getByText('Critical:')).toBeInTheDocument();
    await expect(canvas.getByText('High:')).toBeInTheDocument();
    await expect(canvas.getByText('Medium:')).toBeInTheDocument();
  },
  render: () => (
    <ArtifactCount className="w-md">
      <ArtifactCountHeader>
        <Count variant="warning">3</Count>
        <span className="text-base font-medium leading-5 tracking-tightest">
          Active alarms
        </span>
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
export const WithFooter: Story = {
  parameters: {
    order: 2,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Temperature')).toBeInTheDocument();
    await expect(canvas.getByText('Min: 384°C')).toBeInTheDocument();
    await expect(canvas.getByText('Max: 390°C')).toBeInTheDocument();
  },
  render: () => (
    <ArtifactCount className="w-md">
      <ArtifactCountHeader className="items-end">
        <Count variant="critical">392°C</Count>
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
export const WithChart: Story = {
  parameters: {
    order: 3,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Bar')).toBeInTheDocument();
    await expect(canvas.getByText('V-192')).toBeInTheDocument();
  },
  render: function WithChartRender() {
    const [currentData, setCurrentData] = useState(temperatureData);
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentData((prevData) => {
          const newData = [...prevData];
          const lastTime = new Date(
            newData[newData.length - 1].timestamp + 5 * 60 * 1000
          );
          let newTemp = newData[newData.length - 1].temperature;
          newTemp += (Math.random() - 0.5) * 3;
          newTemp = Math.max(60, Math.min(110, newTemp));
          newData.shift();
          newData.push({
            time: lastTime.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            }),
            temperature: Math.round(newTemp * 10) / 10,
            timestamp: lastTime.getTime(),
          });
          return newData;
        });
      }, 3000);
      return () => clearInterval(interval);
    }, []);
    const currentTemp = currentData[currentData.length - 1]?.temperature || 0;
    const avgTemp =
      currentData.reduce((sum, item) => sum + item.temperature, 0) /
      currentData.length;
    return (
      <ArtifactCount className="w-md gap-2">
        <ArtifactCountHeader className="items-end">
          <Count variant="default">{currentTemp}</Count>
          <div className="flex flex-1 items-end justify-between">
            <div className="flex flex-col">
              <span className="text-base font-medium">Bar</span>
              <ArtifactCountTag>V-192</ArtifactCountTag>
            </div>
            <ArtifactCountTag>Since 2hrs ago</ArtifactCountTag>
          </div>
        </ArtifactCountHeader>
        <ArtifactCountContent className="p-0">
          <ChartContainer
            config={temperatureChartConfig}
            className="h-48 w-full"
          >
            <LineChart
              accessibilityLayer
              data={currentData}
              margin={{
                left: 0,
                right: 12,
                top: 12,
                bottom: 12,
              }}
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
                domain={['dataMin - 5', 'dataMax + 5']}
                tickFormatter={(value) => `${value}°C`}
              />
              <ChartTooltip
                cursor={{
                  stroke: 'hsl(239 84% 67%)',
                  strokeWidth: 1,
                }}
                content={
                  <ChartTooltipContent
                    indicator="dot"
                    labelFormatter={(value) => `Time: ${value}`}
                    formatter={(value) => [`${value}°C`, 'Temperature']}
                  />
                }
              />
              <Line
                dataKey="temperature"
                type="monotone"
                stroke="hsl(239 84% 67%)"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 4,
                  stroke: 'hsl(239 84% 67%)',
                  strokeWidth: 2,
                }}
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
                style={{
                  backgroundColor: 'hsl(239 84% 67%)',
                }}
              />
              <span className="text-muted-foreground">
                Current: {currentTemp}°C
              </span>
            </div>
            <span className="text-muted-foreground">
              4h Average: {avgTemp.toFixed(1)}°C
            </span>
          </ArtifactCountFooterLeft>
          <ArtifactCountFooterRight>
            <span className="text-xs text-muted-foreground">
              Updates every 5 minutes
            </span>
          </ArtifactCountFooterRight>
        </ArtifactCountFooter>
      </ArtifactCount>
    );
  },
};
export const Interactive: Story = {
  parameters: {
    order: 4,
  },
  render: function ArtifactCountInteractive() {
    const [value, setValue] = useState(392);
    return (
      <ArtifactCount className="w-md">
        <ArtifactCountHeader>
          <Count variant="warning">{value}°C</Count>
        </ArtifactCountHeader>
        <ArtifactCountSeparator />
        <ArtifactCountFooter className="text-muted-foreground">
          <ArtifactCountFooterLeft>
            Last updated just now
          </ArtifactCountFooterLeft>
          <ArtifactCountFooterRight>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setValue((prev) => prev + 1)}
            >
              Increase
            </Button>
          </ArtifactCountFooterRight>
        </ArtifactCountFooter>
      </ArtifactCount>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', {
      name: 'Increase',
    });
    await userEvent.click(button);
    await waitFor(
      () => {
        expect(canvas.getByText('393°C')).toBeInTheDocument();
      },
      {
        timeout: 300,
      }
    );
  },
};
export const EdgeCaseEmpty: Story = {
  parameters: {
    order: 5,
  },
  render: () => (
    <ArtifactCount className="w-md">
      <ArtifactCountHeader>
        <Count variant="default">0</Count>
      </ArtifactCountHeader>
    </ArtifactCount>
  ),
};
export const EdgeCaseLongText: Story = {
  parameters: {
    order: 6,
  },
  render: () => (
    <ArtifactCount className="w-md">
      <ArtifactCountHeader className="items-end">
        <Count variant="warning">128</Count>
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
        <ArtifactCountFooterRight>
          Rolling total based on last 24 hours
        </ArtifactCountFooterRight>
      </ArtifactCountFooter>
    </ArtifactCount>
  ),
};
export const EdgeCaseSpecialCharacters: Story = {
  parameters: {
    order: 7,
  },
  render: () => (
    <ArtifactCount className="w-md">
      <ArtifactCountHeader className="items-end">
        <Count variant="critical">99+</Count>
        <div className="flex flex-1 items-end justify-between">
          <div className="flex flex-col">
            <span className="text-base font-medium">
              Alerts: ΔP &gt; 5%, ΔT &lt; 0
            </span>
            <ArtifactCountTag>Unit: V-192 • Line A/B</ArtifactCountTag>
          </div>
          <ArtifactCountTag>Since 08:15 — Shift 2</ArtifactCountTag>
        </div>
      </ArtifactCountHeader>
      <ArtifactCountSeparator />
      <ArtifactCountFooter className="text-muted-foreground">
        <ArtifactCountFooterLeft>
          Notes: “Overheat” — check valve #4
        </ArtifactCountFooterLeft>
        <ArtifactCountFooterRight>
          Notify on-call{' '}
          <span role="img" aria-label="warning">
            ⚠️
          </span>
        </ArtifactCountFooterRight>
      </ArtifactCountFooter>
    </ArtifactCount>
  ),
};
export const Playground: PlaygroundStory = {
  args: {
    className: 'w-md',
    variant: 'default',
    count: '392°C',
    title: 'Temperature',
    tag: 'V-192',
    footerLeft: 'Min: 384°C',
    footerRight: 'Max: 390°C',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'warning', 'critical'],
      table: {
        category: 'Variants / Styling',
        type: {
          summary: "'default' | 'warning' | 'critical'",
        },
      },
    },
    count: {
      control: 'text',
      table: {
        category: 'Content',
        type: {
          summary: 'string',
        },
      },
    },
    title: {
      control: 'text',
      table: {
        category: 'Content',
        type: {
          summary: 'string',
        },
      },
    },
    tag: {
      control: 'text',
      table: {
        category: 'Content',
        type: {
          summary: 'string',
        },
      },
    },
    footerLeft: {
      control: 'text',
      table: {
        category: 'Content',
        type: {
          summary: 'string',
        },
      },
    },
    footerRight: {
      control: 'text',
      table: {
        category: 'Content',
        type: {
          summary: 'string',
        },
      },
    },
  },
  parameters: {
    order: 99,
  },
  render: (args) => (
    <ArtifactCount className={args.className}>
      <ArtifactCountHeader className="items-end">
        <Count variant={args.variant}>{args.count}</Count>
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
