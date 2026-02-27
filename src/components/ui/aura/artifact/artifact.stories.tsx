import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  IconAlertCircleFilled,
  IconAlertTriangleFilled,
  IconSettings2,
  IconTrendingUp,
} from '@tabler/icons-react';
import { type ComponentProps, useState } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  type PieLabelRenderProps,
  XAxis,
  YAxis,
} from 'recharts';
import { expect, within } from 'storybook/test';

import {
  CardActions,
  CardContent,
  CardFooter,
  CardFooterCenter,
  CardFooterLeft,
  CardFooterRight,
  CardHeader,
  CardHeaderContent,
  CardHeaderLeft,
  CardHeaderRight,
} from '../card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../chart';
import { Count } from '../count';
import { DropdownMenuItem } from '../dropdown-menu';
import {
  List,
  ListItem,
  ListItemDescription,
  ListItemIcon,
  ListItemStatus,
  ListItemTitle,
} from '../list';
import { Progress } from '../progress';
import { Separator } from '../separator';
import { TreeView, TreeViewItem } from '../treeview';

import { Artifact, ArtifactDescription, ArtifactTitle } from './artifact';

const meta: Meta<typeof Artifact> = {
  title: 'Primitives/Artifact',
  component: Artifact,
  tags: ['autodocs', 'ai-elements'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    className: {
      control: 'text',
      table: {
        category: 'Display',
      },
    },
    children: {
      control: false,
      table: {
        category: 'Content',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Artifact>;

export const CountActiveAlarms: Story = {
  name: 'Count: Active Alarms',
  parameters: {
    order: 1,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Active alarms')).toBeInTheDocument();
    await expect(canvas.getByText('Critical:')).toBeInTheDocument();
    await expect(canvas.getByText('High:')).toBeInTheDocument();
    await expect(canvas.getByText('Medium:')).toBeInTheDocument();
  },
  render: () => (
    <Artifact className="w-sm">
      <CardHeader>
        <CardHeaderLeft>
          <Count variant="warning">3</Count>
        </CardHeaderLeft>
        <CardHeaderContent>
          <ArtifactTitle>Active alarms</ArtifactTitle>
        </CardHeaderContent>
      </CardHeader>
      <CardContent>
        <Separator />
      </CardContent>
      <CardFooter className="text-sm">
        <CardFooterLeft>
          <span className="text-muted-foreground">Critical:</span>{' '}
          <span className="font-medium">0</span>
        </CardFooterLeft>
        <CardFooterCenter>
          <span className="text-muted-foreground">High:</span>{' '}
          <span className="font-medium">2</span>
        </CardFooterCenter>
        <CardFooterRight>
          <span className="text-muted-foreground">Medium:</span>{' '}
          <span className="font-medium">1</span>
        </CardFooterRight>
      </CardFooter>
    </Artifact>
  ),
};

export const CountTemperature: Story = {
  name: 'Count: Temperature',
  parameters: {
    order: 2,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Temperature')).toBeInTheDocument();
    await expect(canvas.getByText('V-192')).toBeInTheDocument();
    await expect(canvas.getByText('Since 2hrs ago')).toBeInTheDocument();
    await expect(canvas.getByText('Min:')).toBeInTheDocument();
    await expect(canvas.getByText('Max:')).toBeInTheDocument();
  },
  render: () => (
    <Artifact className="w-sm">
      <CardHeader>
        <CardHeaderLeft>
          <Count variant="critical">392°C</Count>
        </CardHeaderLeft>
        <CardHeaderContent>
          <ArtifactTitle>Temperature</ArtifactTitle>
          <ArtifactDescription>V-192</ArtifactDescription>
        </CardHeaderContent>
        <CardHeaderRight className="items-end self-stretch">
          <span className="text-sm text-muted-foreground">Since 2hrs ago</span>
        </CardHeaderRight>
      </CardHeader>
      <CardContent>
        <Separator />
      </CardContent>
      <CardFooter className="text-sm">
        <CardFooterLeft>
          <span className="text-muted-foreground">Min:</span>{' '}
          <span className="font-medium">384°C</span>
        </CardFooterLeft>
        <CardFooterRight>
          <span className="text-muted-foreground">Max:</span>{' '}
          <span className="font-medium">390°C</span>
        </CardFooterRight>
      </CardFooter>
    </Artifact>
  ),
};

export const CountBarTrend: Story = {
  name: 'Count: Bar Trend',
  parameters: {
    order: 3,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Bar')).toBeInTheDocument();
    await expect(canvas.getByText('V-192')).toBeInTheDocument();
    await expect(canvas.getByText('Since 2hrs ago')).toBeInTheDocument();
  },
  render: () => {
    const trendData = [
      { time: '08:00', value: 72 },
      { time: '10:00', value: 74 },
      { time: '12:00', value: 73 },
      { time: '14:00', value: 77 },
      { time: '16:00', value: 79 },
      { time: '18:00', value: 78 },
    ];
    const trendConfig = {
      value: {
        label: 'Temperature',
        color: 'hsl(239 84% 67%)',
      },
    } satisfies ComponentProps<typeof ChartContainer>['config'];
    return (
      <Artifact className="w-sm">
        <CardHeader>
          <CardHeaderLeft>
            <Count variant="default">4.2</Count>
          </CardHeaderLeft>
          <CardHeaderContent>
            <ArtifactTitle>Bar</ArtifactTitle>
            <ArtifactDescription>V-192</ArtifactDescription>
          </CardHeaderContent>
          <CardHeaderRight className="items-end self-stretch">
            <span className="text-sm text-muted-foreground">
              Since 2hrs ago
            </span>
          </CardHeaderRight>
        </CardHeader>
        <CardContent>
          <Separator />
        </CardContent>
        <CardContent className="flex w-full flex-col items-center gap-4 overflow-visible px-4 py-5">
          <ChartContainer config={trendConfig} className="h-48 w-full">
            <LineChart
              data={trendData}
              margin={{ top: 12, right: 12, bottom: 12 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="time"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => `${value}°C`}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    indicator="dot"
                    formatter={(value) => [`${value}°C`, 'Temperature']}
                  />
                }
              />
              <Line
                dataKey="value"
                type="monotone"
                stroke="hsl(239 84% 67%)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Artifact>
    );
  },
};

export const ListTimeline: Story = {
  name: 'List: Timeline',
  parameters: {
    order: 4,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const inspections = canvas.getAllByText('Inspection');
    await expect(inspections.length).toBeGreaterThan(0);
    await expect(canvas.getByText('Event')).toBeInTheDocument();
  },
  render: () => (
    <Artifact className="w-sm">
      <CardContent>
        <List>
          <ListItem variant="upcoming">
            <ListItemTitle>Inspection</ListItemTitle>
            <ListItemDescription>Dec 22, 2024 5:00 AM</ListItemDescription>
          </ListItem>
          <ListItem variant="now">
            <ListItemTitle>Event</ListItemTitle>
            <ListItemDescription>Today 3:05 PM</ListItemDescription>
          </ListItem>
          <ListItem variant="completed">
            <ListItemTitle>Inspection</ListItemTitle>
            <ListItemDescription>1 d ago</ListItemDescription>
          </ListItem>
          <ListItem variant="completed">
            <ListItemTitle>Inspection</ListItemTitle>
            <ListItemDescription>Dec 17, 2024 9:00 AM</ListItemDescription>
          </ListItem>
        </List>
      </CardContent>
    </Artifact>
  ),
};

export const ListMaintenanceTasks: Story = {
  name: 'List: Maintenance Tasks',
  parameters: {
    order: 5,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Pump seal replacement')).toBeInTheDocument();
    await expect(canvas.getByText('Overdue')).toBeInTheDocument();
  },
  render: () => (
    <Artifact className="w-sm">
      <CardContent>
        <List>
          <ListItem variant="error">
            <ListItemTitle>Pump seal replacement</ListItemTitle>
            <ListItemDescription>
              P-401A requires new mechanical seal
            </ListItemDescription>
            <ListItemStatus>Overdue</ListItemStatus>
          </ListItem>
          <ListItem variant="now">
            <ListItemTitle>Valve calibration</ListItemTitle>
            <ListItemDescription>
              Quarterly calibration check
            </ListItemDescription>
            <ListItemStatus>Due today</ListItemStatus>
          </ListItem>
          <ListItem variant="completed">
            <ListItemTitle>Filter cleaning</ListItemTitle>
            <ListItemDescription>Clean inlet filters</ListItemDescription>
            <ListItemStatus>Completed</ListItemStatus>
          </ListItem>
        </List>
      </CardContent>
    </Artifact>
  ),
};

export const ListRecentChatSummary: Story = {
  name: 'List: Recent Chat Summary',
  parameters: {
    order: 6,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Recent chat summary')).toBeInTheDocument();
    await expect(
      canvas.getByText('Pump 3 cavitation detected')
    ).toBeInTheDocument();
    await expect(
      canvas.getByText('Compressor C-5 surge events')
    ).toBeInTheDocument();
  },
  render: () => (
    <Artifact className="w-sm">
      <CardHeader>
        <CardHeaderContent>
          <ArtifactTitle>Recent chat summary</ArtifactTitle>
        </CardHeaderContent>
      </CardHeader>
      <CardContent>
        <List>
          <ListItem>
            <ListItemIcon>
              <IconSettings2 className="size-3 text-muted-foreground" />
            </ListItemIcon>
            <ListItemTitle>Pump 3 cavitation detected</ListItemTitle>
            <ListItemDescription>
              Suction pressure oscillations and elevated noise on P-003 during
              night shift; cavitation likely from low NPSH/blocked strainer.
              Next step: inspect/clean suction strainer and raise tank level
              20cm.
            </ListItemDescription>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <IconSettings2 className="size-3 text-muted-foreground" />
            </ListItemIcon>
            <ListItemTitle>Compressor C-5 surge events</ListItemTitle>
            <ListItemDescription>
              Three start-up surge spikes with sluggish anti-surge valve
              response; control loop tuning/valve stiction suspected. Next step:
              Stroke-test ASV, retune PID, and verify transmitter calibration.
            </ListItemDescription>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <IconSettings2 className="size-3 text-muted-foreground" />
            </ListItemIcon>
            <ListItemTitle>Boiler steam leak near header B</ListItemTitle>
            <ListItemDescription>
              Ultrasonic survey indicates continuous hiss with elevated
              condensate returns; small steam leak wasting energy. Next step:
              tag exact location, plan hot repair window, and quantify loss
              after fix.
            </ListItemDescription>
          </ListItem>
        </List>
      </CardContent>
    </Artifact>
  ),
};

export const ProgressBasic: Story = {
  name: 'Progress: Basic',
  parameters: { order: 7 },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const title = canvas.getByText('Progress title');
    await expect(title).toBeInTheDocument();
    const description = canvas.getByText('8 of 12 tasks complete');
    await expect(description).toBeInTheDocument();
    const percentage = canvas.getByText('32%');
    await expect(percentage).toBeInTheDocument();
    const footer = canvas.getByText('On track for completion by Friday');
    await expect(footer).toBeInTheDocument();
  },
  render: () => (
    <Artifact className="w-96">
      <CardHeader className="items-center gap-2">
        <CardHeaderContent>
          <ArtifactTitle>Progress title</ArtifactTitle>
          <ArtifactDescription className="text-base">
            8 of 12 tasks complete
          </ArtifactDescription>
        </CardHeaderContent>
      </CardHeader>
      <CardContent className="px-4 py-4.5 flex w-full items-center justify-between gap-2">
        <Progress value={32} />
        <span className="text-muted-foreground text-sm leading-4.5 tracking-tight">
          32%
        </span>
      </CardContent>
      <CardFooter>On track for completion by Friday</CardFooter>
    </Artifact>
  ),
};

export const AlertWarning: Story = {
  name: 'Alert: Warning',
  parameters: { order: 8 },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Alert title')).toBeInTheDocument();
    await expect(canvas.getByText('P-401')).toBeInTheDocument();
    await expect(
      canvas.getByText('Vibration levels have exceeded normal operating range')
    ).toBeInTheDocument();
    await expect(canvas.getByText('Detected: 5 min ago')).toBeInTheDocument();
  },
  render: () => (
    <Artifact className="w-md">
      <CardHeader>
        <CardHeaderLeft>
          <IconAlertTriangleFilled
            aria-label="Warning alert"
            className="size-4 text-warning-foreground mt-0.5"
          />
        </CardHeaderLeft>
        <CardHeaderContent>
          <ArtifactTitle>Alert title</ArtifactTitle>
          <ArtifactDescription>P-401</ArtifactDescription>
        </CardHeaderContent>
      </CardHeader>
      <CardFooter className="flex-col text-sm pt-4">
        <div className="font-medium text-card-foreground">
          Vibration levels have exceeded normal operating range
        </div>
        <div className="text-muted-foreground">Detected: 5 min ago</div>
      </CardFooter>
    </Artifact>
  ),
};

export const AlertCritical: Story = {
  name: 'Alert: Critical',
  parameters: { order: 9 },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Alert title')).toBeInTheDocument();
    await expect(canvas.getByText('P-401')).toBeInTheDocument();
    await expect(
      canvas.getByText('Vibration levels have exceeded normal operating range')
    ).toBeInTheDocument();
    await expect(canvas.getByText('Detected: 5 min ago')).toBeInTheDocument();
  },
  render: () => (
    <Artifact className="w-md">
      <CardHeader>
        <CardHeaderLeft>
          <IconAlertCircleFilled
            aria-label="Critical alert"
            className="size-4 text-destructive-foreground mt-0.5"
          />
        </CardHeaderLeft>
        <CardHeaderContent>
          <ArtifactTitle>Alert title</ArtifactTitle>
          <ArtifactDescription>P-401</ArtifactDescription>
        </CardHeaderContent>
      </CardHeader>
      <CardFooter className="flex-col text-sm pt-4">
        <div className="font-medium text-card-foreground">
          Vibration levels have exceeded normal operating range
        </div>
        <div className="text-muted-foreground">Detected: 5 min ago</div>
      </CardFooter>
    </Artifact>
  ),
};

export const AlertCriticalCompact: Story = {
  name: 'Alert: Critical Compact',
  parameters: { order: 10 },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Critical')).toBeInTheDocument();
    await expect(canvas.getByText('P-401')).toBeInTheDocument();
  },
  render: () => (
    <Artifact className="w-fit">
      <CardHeader className="pb-4">
        <CardHeaderLeft>
          <IconAlertCircleFilled
            aria-label="Critical alert"
            className="size-4 text-destructive-foreground mt-0.5"
          />
        </CardHeaderLeft>
        <CardHeaderContent>
          <ArtifactTitle>Critical</ArtifactTitle>
          <ArtifactDescription>P-401</ArtifactDescription>
        </CardHeaderContent>
      </CardHeader>
    </Artifact>
  ),
};

export const TreeViewPlantHierarchy: Story = {
  name: 'TreeView: Plant Hierarchy',
  parameters: { order: 11 },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Plant asset hierarchy')).toBeInTheDocument();
    await expect(canvas.getByText('1 warning')).toBeInTheDocument();
    await expect(canvas.getByText('Process unit 21')).toBeInTheDocument();
    await expect(canvas.getByText('Feed system')).toBeInTheDocument();
    await expect(canvas.getByText('Feed Pump A')).toBeInTheDocument();
    await expect(canvas.getByText('Feed Pump B')).toBeInTheDocument();
    await expect(canvas.getByText('Drain system')).toBeInTheDocument();
    await expect(canvas.getByText('Process unit 22')).toBeInTheDocument();
    await expect(canvas.getAllByLabelText(/warning/i)).toHaveLength(1);
  },
  render: () => (
    <Artifact className="w-sm hover:bg-card">
      <CardHeader>
        <CardHeaderContent>
          <ArtifactTitle>Plant asset hierarchy</ArtifactTitle>
          <ArtifactDescription>1 warning</ArtifactDescription>
        </CardHeaderContent>
        <CardHeaderRight>
          <CardActions>
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Open source asset</DropdownMenuItem>
          </CardActions>
        </CardHeaderRight>
      </CardHeader>
      <CardContent>
        <TreeView defaultExpanded={['process-21', 'feed-system']}>
          <TreeViewItem value="process-21" label="Process unit 21">
            <TreeViewItem value="feed-system" label="Feed system">
              <TreeViewItem
                value="pump-a"
                label="Feed Pump A"
                status="warning"
              />
              <TreeViewItem value="pump-b" label="Feed Pump B" />
            </TreeViewItem>
            <TreeViewItem value="drain-system" label="Drain system" />
          </TreeViewItem>
          <TreeViewItem value="process-22" label="Process unit 22" />
        </TreeView>
      </CardContent>
    </Artifact>
  ),
};

export const ChartBasic: Story = {
  name: 'Chart: Pie',
  parameters: { order: 12 },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText('Chart title')).toBeInTheDocument();
    await expect(
      await canvas.findByText('January - June 2024')
    ).toBeInTheDocument();
    await expect(await canvas.findByText('Visitors')).toBeInTheDocument();
    await expect(await canvas.findByText('1,125')).toBeInTheDocument();
    await expect(
      await canvas.findByText('Trending up by 5.2% this month')
    ).toBeInTheDocument();
  },
  render: function ChartBasicRender() {
    const chartConfig = {
      slice1: {
        label: 'unit',
        color: 'var(--color-chart-fjord-opacity-4)',
      },
      slice2: {
        label: 'unit',
        color: 'var(--color-chart-fjord-opacity-3)',
      },
      slice3: {
        label: 'unit',
        color: 'var(--color-chart-fjord-opacity-2)',
      },
      slice4: {
        label: 'unit',
        color: 'var(--color-chart-fjord-opacity-1)',
      },
      slice5: {
        label: 'unit',
        color: 'var(--color-chart-fjord-solid)',
      },
    } satisfies ComponentProps<typeof ChartContainer>['config'];
    const chartData = [
      { id: 'slice1', value: 225, fill: 'var(--color-slice1)' },
      { id: 'slice2', value: 225, fill: 'var(--color-slice2)' },
      { id: 'slice3', value: 225, fill: 'var(--color-slice3)' },
      { id: 'slice4', value: 225, fill: 'var(--color-slice4)' },
      { id: 'slice5', value: 225, fill: 'var(--color-slice5)' },
    ];
    const labelColor = 'var(--color-fjord-450)';
    const renderPieLabel = (payload: PieLabelRenderProps) => {
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
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '-0.08px',
            }}
          >
            {labelText}
          </text>
        </g>
      );
    };
    function isChartConfigKey(
      key: string
    ): key is Extract<keyof typeof chartConfig, string> {
      return key in chartConfig;
    }

    function PieChartTooltipContent({
      active,
      payload,
    }: {
      active?: boolean;
      payload?: ReadonlyArray<{
        payload?: { id?: unknown };
        value?: unknown;
      }>;
    }) {
      if (!active || !payload?.length) return null;
      const data = payload[0];
      const rawId = data?.payload?.id;
      const id = typeof rawId === 'string' ? rawId : '';
      const rawValue = data?.value;
      const value = typeof rawValue === 'number' ? rawValue : 0;
      const color = isChartConfigKey(id) ? chartConfig[id]?.color : undefined;
      return (
        <div className="flex items-center gap-4 rounded-md bg-popover p-2 shadow-sm">
          <div className="flex items-center gap-1.5">
            <span
              className="h-2 w-2 rounded-sm"
              style={{ backgroundColor: color }}
            />
            <span className="text-sm text-muted-foreground">unit</span>
          </div>
          <span className="text-sm text-foreground">
            {value.toLocaleString()}
          </span>
        </div>
      );
    }
    const [chartDataState] = useState(chartData);
    return (
      <Artifact className="w-sm">
        <CardHeader>
          <CardHeaderContent>
            <ArtifactTitle>Chart title</ArtifactTitle>
            <ArtifactDescription>January - June 2024</ArtifactDescription>
          </CardHeaderContent>
        </CardHeader>
        <CardContent>
          <div className="relative mx-auto">
            <ChartContainer
              config={chartConfig}
              className="aspect-5/4 overflow-visible"
            >
              <PieChart style={{ overflow: 'visible' }}>
                <ChartTooltip
                  cursor={false}
                  content={({ active, payload }) => (
                    <PieChartTooltipContent active={active} payload={payload} />
                  )}
                />
                <Pie
                  data={chartDataState}
                  dataKey="value"
                  nameKey="id"
                  innerRadius={61}
                  outerRadius={100}
                  strokeWidth={0}
                  startAngle={90}
                  endAngle={-270}
                  label={renderPieLabel}
                  labelLine={false}
                  className="[&_.recharts-pie-sector]:transition-opacity [&_.recharts-pie-sector]:duration-200 [&_.recharts-pie-sector:hover]:opacity-80"
                />
              </PieChart>
            </ChartContainer>
            <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
              <div>
                <span className="block text-2xl font-medium text-foreground">
                  {(1125).toLocaleString()}
                </span>
                <span className="block text-sm font-normal text-muted-foreground">
                  Visitors
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {chartDataState.map((item) => (
              <div key={item.id} className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-sm"
                  style={{
                    backgroundColor: isChartConfigKey(item.id)
                      ? chartConfig[item.id]?.color
                      : undefined,
                  }}
                />
                <span className="text-sm leading-4 text-muted-foreground">
                  unit
                </span>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-1">
          <div className="flex items-center gap-1 text-sm font-medium text-card-foreground">
            Trending up by 5.2% this month
            <IconTrendingUp aria-hidden="true" className="h-4 w-4" />
          </div>
          <div className="text-sm leading-4 text-muted-foreground">
            Total visitors for the last 6 months
          </div>
        </CardFooter>
      </Artifact>
    );
  },
};

export const CountTemperatureNarrowContainer: Story = {
  name: 'Count: Temperature Narrow Container',
  parameters: { order: 13 },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Temperature')).toBeInTheDocument();
    await expect(canvas.getByText('V-192')).toBeInTheDocument();
    await expect(canvas.getByText('Since 2hrs ago')).toBeInTheDocument();
    await expect(canvas.getByText('Min:')).toBeInTheDocument();
    await expect(canvas.getByText('Max:')).toBeInTheDocument();
  },
  render: () => (
    <Artifact className="w-56">
      <CardHeader>
        <CardHeaderLeft>
          <Count variant="critical">392°C</Count>
        </CardHeaderLeft>
        <CardHeaderContent>
          <ArtifactTitle>Temperature</ArtifactTitle>
          <ArtifactDescription>V-192</ArtifactDescription>
        </CardHeaderContent>
        <CardHeaderRight className="items-end self-stretch">
          <span className="text-sm text-muted-foreground">Since 2hrs ago</span>
        </CardHeaderRight>
      </CardHeader>
      <CardContent>
        <Separator />
      </CardContent>
      <CardFooter className="text-sm">
        <CardFooterLeft>
          <span className="text-muted-foreground">Min:</span>{' '}
          <span className="font-medium">384°C</span>
        </CardFooterLeft>
        <CardFooterRight>
          <span className="text-muted-foreground">Max:</span>{' '}
          <span className="font-medium">390°C</span>
        </CardFooterRight>
      </CardFooter>
    </Artifact>
  ),
};

export const HeaderOverflowTriplet: Story = {
  name: 'Edge Case: Header Overflow Triplet',
  parameters: { order: 14 },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText('Critical Resource Allocation Overview')
    ).toBeInTheDocument();
    await expect(canvas.getByText('Cluster A - Unit 7')).toBeInTheDocument();
    await expect(canvas.getByText('Updated 4m ago')).toBeInTheDocument();
  },
  render: () => (
    <Artifact className="w-64">
      <CardHeader>
        <CardHeaderLeft>
          <Count variant="warning">12</Count>
        </CardHeaderLeft>
        <CardHeaderContent>
          <ArtifactTitle>Critical Resource Allocation Overview</ArtifactTitle>
          <ArtifactDescription>Cluster A - Unit 7</ArtifactDescription>
        </CardHeaderContent>
        <CardHeaderRight className="items-end self-stretch">
          <span className="text-sm text-muted-foreground">Updated 4m ago</span>
        </CardHeaderRight>
      </CardHeader>
      <CardContent>
        <Separator />
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        Review assignments for constrained operations window.
      </CardFooter>
    </Artifact>
  ),
};
