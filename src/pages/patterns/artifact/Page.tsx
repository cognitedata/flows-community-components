'use client';

import {
  IconAlertCircleFilled,
  IconAlertTriangleFilled,
  IconSettings2,
  IconTrendingUp,
} from '@tabler/icons-react';
import { type ComponentProps, type ReactNode } from 'react';
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

import { ExamplePreview } from '@/components/example-preview';
import { Avatar, AvatarFallback } from '@/components/ui/aura/avatar';
import {
  Card,
  CardActions,
  CardContent,
  CardDescription,
  CardFooter,
  CardFooterCenter,
  CardFooterLeft,
  CardFooterRight,
  CardHeader,
  CardHeaderLeft,
  CardHeaderRight,
  CardTitle,
} from '@/components/ui/aura/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/aura/chart';
import { Count } from '@/components/ui/aura/count';
import { DropdownMenuItem } from '@/components/ui/aura/dropdown-menu';
import {
  List,
  ListItem,
  ListItemDescription,
  ListItemIcon,
  ListItemStatus,
  ListItemTitle,
} from '@/components/ui/aura/list';
import { Progress } from '@/components/ui/aura/progress';
import { Separator } from '@/components/ui/aura/separator';
import { TreeView, TreeViewItem } from '@/components/ui/aura/treeview';

function PatternExample({
  title,
  children,
  sourceCode,
}: {
  title: string;
  children: ReactNode;
  sourceCode: string;
}) {
  return (
    <ExamplePreview
      title={title}
      component={() => <>{children}</>}
      sourceCode={sourceCode}
    />
  );
}

function CountBarTrendCard() {
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
    <Card className="w-sm grid grid-rows-[auto_1fr_auto]">
      <CardHeader>
        <CardHeaderLeft>
          <Count variant="default">4.2</Count>
        </CardHeaderLeft>
        <CardTitle>Bar</CardTitle>
        <CardDescription>V-192</CardDescription>
        <CardHeaderRight className="items-end self-stretch">
          <span className="text-sm text-muted-foreground">Since 2hrs ago</span>
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
    </Card>
  );
}

function ChartPieCard() {
  const chartConfig = {
    slice1: { label: 'unit', color: 'var(--color-chart-fjord-opacity-4)' },
    slice2: { label: 'unit', color: 'var(--color-chart-fjord-opacity-3)' },
    slice3: { label: 'unit', color: 'var(--color-chart-fjord-opacity-2)' },
    slice4: { label: 'unit', color: 'var(--color-chart-fjord-opacity-1)' },
    slice5: { label: 'unit', color: 'var(--color-chart-fjord-solid)' },
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

  return (
    <Card className="w-sm grid grid-rows-[auto_1fr_auto]">
      <CardHeader>
        <CardTitle>Chart title</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative mx-auto">
          <ChartContainer
            config={chartConfig}
            className="aspect-5/4 overflow-visible"
          >
            <PieChart style={{ overflow: 'visible' }}>
              <ChartTooltip
                content={<ChartTooltipContent indicator="dot" />}
                cursor={false}
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
          {chartData.map((item) => (
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
    </Card>
  );
}

export default function ArtifactPatternPage() {
  return (
    <div className="mx-auto max-w-5xl py-10">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Artifact</h1>
          <p className="text-lg text-muted-foreground">
            Artifact configurations are now card composition patterns using Aura
            Card sub-components.
          </p>
        </div>

        <PatternExample
          title="Count: Active alarms"
          sourceCode={`<Card className="w-sm grid grid-rows-[auto_1fr_auto]">
  <CardHeader>
    <CardHeaderLeft>
      <Count variant="warning">3</Count>
    </CardHeaderLeft>
    <CardTitle>Active alarms</CardTitle>
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
</Card>`}
        >
          <Card className="w-sm grid grid-rows-[auto_1fr_auto]">
            <CardHeader>
              <CardHeaderLeft>
                <Count variant="warning">3</Count>
              </CardHeaderLeft>
              <CardTitle>Active alarms</CardTitle>
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
          </Card>
        </PatternExample>

        <PatternExample
          title="Count: Temperature"
          sourceCode={`<Card className="w-sm grid grid-rows-[auto_1fr_auto]">
  <CardHeader>
    <CardHeaderLeft>
      <Count variant="critical">392°C</Count>
    </CardHeaderLeft>
    <CardTitle>Temperature</CardTitle>
    <CardDescription>V-192</CardDescription>
    <CardHeaderRight>
      <span className="text-sm text-muted-foreground">Since 2hrs ago</span>
    </CardHeaderRight>
  </CardHeader>
  <CardContent>
    <Separator />
  </CardContent>
</Card>`}
        >
          <Card className="w-sm grid grid-rows-[auto_1fr_auto]">
            <CardHeader>
              <CardHeaderLeft>
                <Count variant="critical">392°C</Count>
              </CardHeaderLeft>
              <CardTitle>Temperature</CardTitle>
              <CardDescription>V-192</CardDescription>
              <CardHeaderRight className="items-end self-stretch">
                <span className="text-sm text-muted-foreground">
                  Since 2hrs ago
                </span>
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
          </Card>
        </PatternExample>

        <PatternExample
          title="Count: Bar trend"
          sourceCode={`<Card className="w-sm grid grid-rows-[auto_1fr_auto]">
  <CardHeader>
    <CardHeaderLeft>
      <Count variant="default">4.2</Count>
    </CardHeaderLeft>
    <CardTitle>Bar</CardTitle>
    <CardDescription>V-192</CardDescription>
    <CardHeaderRight>
      <span className="text-sm text-muted-foreground">Since 2hrs ago</span>
    </CardHeaderRight>
  </CardHeader>
  <CardContent>
    <Separator />
  </CardContent>
  <CardContent className="flex w-full flex-col items-center gap-4 overflow-visible px-4 py-5">
    <ChartContainer config={trendConfig} className="h-48 w-full">
      <LineChart data={trendData} margin={{ top: 12, right: 12, bottom: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => \`\${value}°C\`} />
        <ChartTooltip
          content={
            <ChartTooltipContent
              indicator="dot"
              formatter={(value) => [\`\${value}°C\`, 'Temperature']}
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
</Card>`}
        >
          <CountBarTrendCard />
        </PatternExample>

        <PatternExample
          title="List: Timeline"
          sourceCode={`<Card className="w-sm grid grid-rows-[auto_1fr_auto]">
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
</Card>`}
        >
          <Card className="w-sm grid grid-rows-[auto_1fr_auto]">
            <CardContent>
              <List>
                <ListItem variant="upcoming">
                  <ListItemTitle>Inspection</ListItemTitle>
                  <ListItemDescription>
                    Dec 22, 2024 5:00 AM
                  </ListItemDescription>
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
                  <ListItemDescription>
                    Dec 17, 2024 9:00 AM
                  </ListItemDescription>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </PatternExample>

        <PatternExample
          title="List: Maintenance tasks"
          sourceCode={`<Card className="w-sm grid grid-rows-[auto_1fr_auto]">
  <CardContent>
    <List>
      <ListItem variant="error">
        <ListItemTitle>Pump seal replacement</ListItemTitle>
        <ListItemDescription>P-401A requires new mechanical seal</ListItemDescription>
        <ListItemStatus>Overdue</ListItemStatus>
      </ListItem>
      <ListItem variant="now">
        <ListItemTitle>Valve calibration</ListItemTitle>
        <ListItemDescription>Quarterly calibration check</ListItemDescription>
        <ListItemStatus>Due today</ListItemStatus>
      </ListItem>
      <ListItem variant="completed">
        <ListItemTitle>Filter cleaning</ListItemTitle>
        <ListItemDescription>Clean inlet filters</ListItemDescription>
        <ListItemStatus>Completed</ListItemStatus>
      </ListItem>
    </List>
  </CardContent>
</Card>`}
        >
          <Card className="w-sm grid grid-rows-[auto_1fr_auto]">
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
          </Card>
        </PatternExample>

        <PatternExample
          title="List: Recent chat summary"
          sourceCode={`<Card className="w-sm grid grid-rows-[auto_1fr_auto]">
  <CardHeader>
    <CardTitle>Recent chat summary</CardTitle>
  </CardHeader>
  <CardContent>
    <List>
      <ListItem>
        <ListItemIcon>
          <IconSettings2 className="size-3 text-muted-foreground" />
        </ListItemIcon>
        <ListItemTitle>Pump 3 cavitation detected</ListItemTitle>
        <ListItemDescription>
          Suction pressure oscillations and elevated noise on P-003 during night shift;
          cavitation likely from low NPSH/blocked strainer.
        </ListItemDescription>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <IconSettings2 className="size-3 text-muted-foreground" />
        </ListItemIcon>
        <ListItemTitle>Compressor C-5 surge events</ListItemTitle>
        <ListItemDescription>
          Three start-up surge spikes with sluggish anti-surge valve response.
        </ListItemDescription>
      </ListItem>
    </List>
  </CardContent>
</Card>`}
        >
          <Card className="w-sm grid grid-rows-[auto_1fr_auto]">
            <CardHeader>
              <CardTitle>Recent chat summary</CardTitle>
            </CardHeader>
            <CardContent>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <IconSettings2 className="size-3 text-muted-foreground" />
                  </ListItemIcon>
                  <ListItemTitle>Pump 3 cavitation detected</ListItemTitle>
                  <ListItemDescription>
                    Suction pressure oscillations and elevated noise on P-003
                    during night shift; cavitation likely from low NPSH/blocked
                    strainer.
                  </ListItemDescription>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <IconSettings2 className="size-3 text-muted-foreground" />
                  </ListItemIcon>
                  <ListItemTitle>Compressor C-5 surge events</ListItemTitle>
                  <ListItemDescription>
                    Three start-up surge spikes with sluggish anti-surge valve
                    response.
                  </ListItemDescription>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </PatternExample>

        <PatternExample
          title="Progress: Basic"
          sourceCode={`<Card className="w-96 grid grid-rows-[auto_1fr_auto]">
  <CardHeader className="items-center">
    <CardTitle>Progress title</CardTitle>
    <CardDescription className="text-base">8 of 12 tasks complete</CardDescription>
  </CardHeader>
  <CardContent className="px-4 py-4.5 flex w-full items-center justify-between gap-2">
    <Progress value={32} />
    <span className="text-muted-foreground text-sm leading-4.5 tracking-tight">32%</span>
  </CardContent>
  <CardFooter>On track for completion by Friday</CardFooter>
</Card>`}
        >
          <Card className="w-96 grid grid-rows-[auto_1fr_auto]">
            <CardHeader className="items-center">
              <CardTitle>Progress title</CardTitle>
              <CardDescription className="text-base">
                8 of 12 tasks complete
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 py-4.5 flex w-full items-center justify-between gap-2">
              <Progress value={32} />
              <span className="text-muted-foreground text-sm leading-4.5 tracking-tight">
                32%
              </span>
            </CardContent>
            <CardFooter>On track for completion by Friday</CardFooter>
          </Card>
        </PatternExample>

        <PatternExample
          title="Alert: Warning"
          sourceCode={`<Card className="w-md grid grid-rows-[auto_1fr_auto]">
  <CardHeader>
    <CardHeaderLeft>
      <IconAlertTriangleFilled className="size-4 text-warning-foreground" />
    </CardHeaderLeft>
    <CardTitle>Alert title</CardTitle>
    <CardDescription>P-401</CardDescription>
  </CardHeader>
  <CardFooter className="flex-col text-sm pt-4">
    <div className="font-medium text-card-foreground">
      Vibration levels have exceeded normal operating range
    </div>
    <div className="text-muted-foreground">Detected: 5 min ago</div>
  </CardFooter>
</Card>`}
        >
          <Card className="w-md grid grid-rows-[auto_1fr_auto]">
            <CardHeader>
              <CardHeaderLeft>
                <IconAlertTriangleFilled
                  aria-label="Warning alert"
                  className="size-4 text-warning-foreground mt-0.5"
                />
              </CardHeaderLeft>
              <CardTitle>Alert title</CardTitle>
              <CardDescription>P-401</CardDescription>
            </CardHeader>
            <CardFooter className="flex-col text-sm pt-4">
              <div className="font-medium text-card-foreground">
                Vibration levels have exceeded normal operating range
              </div>
              <div className="text-muted-foreground">Detected: 5 min ago</div>
            </CardFooter>
          </Card>
        </PatternExample>

        <PatternExample
          title="Alert: Critical compact"
          sourceCode={`<Card className="w-fit grid grid-rows-[auto_1fr_auto]">
  <CardHeader className="pb-4">
    <CardHeaderLeft>
      <IconAlertCircleFilled className="size-4 text-destructive-foreground" />
    </CardHeaderLeft>
    <CardTitle>Critical</CardTitle>
    <CardDescription>P-401</CardDescription>
  </CardHeader>
</Card>`}
        >
          <Card className="w-fit grid grid-rows-[auto_1fr_auto]">
            <CardHeader className="pb-4">
              <CardHeaderLeft>
                <IconAlertCircleFilled
                  aria-label="Critical alert"
                  className="size-4 text-destructive-foreground mt-0.5"
                />
              </CardHeaderLeft>
              <CardTitle>Critical</CardTitle>
              <CardDescription>P-401</CardDescription>
            </CardHeader>
          </Card>
        </PatternExample>

        <PatternExample
          title="Avatar: Operator handoff"
          sourceCode={`<Card className="w-sm grid grid-rows-[auto_1fr_auto]">
  <CardHeader>
    <CardHeaderLeft>
      <Avatar variant="fjord">
        <AvatarFallback>AL</AvatarFallback>
      </Avatar>
    </CardHeaderLeft>
    <CardTitle>Operator handoff</CardTitle>
    <CardDescription>A. Larsen • Shift B • Distillation area</CardDescription>
    <CardHeaderRight>
      <CardActions>
        <DropdownMenuItem>View profile</DropdownMenuItem>
        <DropdownMenuItem>Open task board</DropdownMenuItem>
        <DropdownMenuItem>Escalate to supervisor</DropdownMenuItem>
      </CardActions>
    </CardHeaderRight>
  </CardHeader>
  <CardContent className="space-y-3">
    <p className="text-sm text-muted-foreground">
      Handoff notes indicate unstable feed pressure and a pending valve inspection before startup.
    </p>
    <ul className="list-disc space-y-1 pl-5 text-sm text-card-foreground">
      <li>Reviewed alarm history for V-204 and P-401.</li>
      <li>Requested maintenance confirmation for temporary bypass status.</li>
      <li>Scheduled follow-up check in 30 minutes.</li>
    </ul>
  </CardContent>
</Card>`}
        >
          <Card className="w-sm grid grid-rows-[auto_1fr_auto]">
            <CardHeader>
              <CardHeaderLeft>
                <Avatar variant="fjord">
                  <AvatarFallback>AL</AvatarFallback>
                </Avatar>
              </CardHeaderLeft>
              <CardTitle>Operator handoff</CardTitle>
              <CardDescription>
                A. Larsen • Shift B • Distillation area
              </CardDescription>
              <CardHeaderRight>
                <CardActions>
                  <DropdownMenuItem>View profile</DropdownMenuItem>
                  <DropdownMenuItem>Open task board</DropdownMenuItem>
                  <DropdownMenuItem>Escalate to supervisor</DropdownMenuItem>
                </CardActions>
              </CardHeaderRight>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Handoff notes indicate unstable feed pressure and a pending
                valve inspection before startup.
              </p>
              <ul className="list-disc space-y-1 pl-5 text-sm text-card-foreground">
                <li>Reviewed alarm history for V-204 and P-401.</li>
                <li>
                  Requested maintenance confirmation for temporary bypass
                  status.
                </li>
                <li>Scheduled follow-up check in 30 minutes.</li>
              </ul>
            </CardContent>
          </Card>
        </PatternExample>

        <PatternExample
          title="TreeView: Plant hierarchy"
          sourceCode={`<Card className="w-sm grid grid-rows-[auto_1fr_auto]">
  <CardHeader>
    <CardTitle>Plant asset hierarchy</CardTitle>
    <CardDescription>1 warning</CardDescription>
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
          <TreeViewItem value="pump-a" label="Feed Pump A" status="warning" />
          <TreeViewItem value="pump-b" label="Feed Pump B" />
        </TreeViewItem>
        <TreeViewItem value="drain-system" label="Drain system" />
      </TreeViewItem>
      <TreeViewItem value="process-22" label="Process unit 22" />
    </TreeView>
  </CardContent>
</Card>`}
        >
          <Card className="w-sm grid grid-rows-[auto_1fr_auto]">
            <CardHeader>
              <CardTitle>Plant asset hierarchy</CardTitle>
              <CardDescription>1 warning</CardDescription>
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
          </Card>
        </PatternExample>

        <PatternExample
          title="Chart: Pie"
          sourceCode={`<Card className="w-sm grid grid-rows-[auto_1fr_auto]">
  <CardHeader>
    <CardTitle>Chart title</CardTitle>
    <CardDescription>January - June 2024</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="relative mx-auto">
      <ChartContainer config={chartConfig} className="aspect-5/4 overflow-visible">
        <PieChart style={{ overflow: 'visible' }}>
          <ChartTooltip content={<ChartTooltipContent indicator="dot" />} cursor={false} />
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="id"
            innerRadius={61}
            outerRadius={100}
            strokeWidth={0}
            startAngle={90}
            endAngle={-270}
            label={renderPieLabel}
            labelLine={false}
          />
        </PieChart>
      </ChartContainer>
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
</Card>`}
        >
          <ChartPieCard />
        </PatternExample>
      </div>
    </div>
  );
}
