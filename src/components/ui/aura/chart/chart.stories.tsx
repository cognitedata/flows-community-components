import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ComponentProps, useId, useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  type PieLabelRenderProps,
  XAxis,
  YAxis,
} from 'recharts';
import { expect, within } from 'storybook/test';

import { Chart, ChartLegend, ChartLegendContent, ChartTooltip } from './chart';

const meta: Meta<typeof Chart> = {
  title: 'Primitives/Chart',
  component: Chart,
  tags: ['autodocs', 'ai-elements'],
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Chart>;

export const PieChartStory: Story = {
  parameters: { order: 1 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText('1,125')).toBeInTheDocument();
  },
  render: function PieChartStoryRender() {
    const pieConfig = {
      slice1: { label: 'A', color: 'var(--color-chart-fjord-opacity-4)' },
      slice2: { label: 'B', color: 'var(--color-chart-fjord-opacity-3)' },
      slice3: { label: 'C', color: 'var(--color-chart-fjord-opacity-2)' },
      slice4: { label: 'D', color: 'var(--color-chart-fjord-opacity-1)' },
      slice5: { label: 'E', color: 'var(--color-chart-fjord-solid)' },
    } satisfies ComponentProps<typeof Chart>['config'];

    const pieData = [
      { id: 'slice1', value: 225, fill: 'var(--color-slice1)' },
      { id: 'slice2', value: 225, fill: 'var(--color-slice2)' },
      { id: 'slice3', value: 225, fill: 'var(--color-slice3)' },
      { id: 'slice4', value: 225, fill: 'var(--color-slice4)' },
      { id: 'slice5', value: 225, fill: 'var(--color-slice5)' },
    ];

    const renderLabel = (payload: PieLabelRenderProps) => {
      const labelColor = 'var(--color-fjord-450)';
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

    return (
      <div className="relative mx-auto w-full max-w-100">
        <Chart config={pieConfig} className="aspect-5/4 overflow-visible">
          <PieChart style={{ overflow: 'visible' }}>
            <ChartTooltip cursor={false} />
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="id"
              innerRadius={61}
              outerRadius={100}
              strokeWidth={0}
              startAngle={90}
              endAngle={-270}
              label={renderLabel}
              labelLine={false}
              className="[&_.recharts-pie-sector]:transition-opacity [&_.recharts-pie-sector]:duration-200 [&_.recharts-pie-sector:hover]:opacity-80"
            />
          </PieChart>
        </Chart>
        <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
          <span className="block text-2xl font-medium text-foreground">
            1,125
          </span>
        </div>
      </div>
    );
  },
};

export const StackedAreaChart: Story = {
  parameters: { order: 2 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText('R401')).toBeInTheDocument();
    await expect(await canvas.findByText('R402')).toBeInTheDocument();
  },
  render: function StackedAreaChartRender() {
    const areaConfig = {
      r401: { label: 'R401', color: 'rgba(47, 85, 234, 0.8)' },
      r402: { label: 'R402', color: 'rgba(47, 85, 234, 0.5)' },
    } satisfies ComponentProps<typeof Chart>['config'];

    const areaData = [
      { time: '02:00', r401: 280, r402: 120 },
      { time: '06:00', r401: 300, r402: 140 },
      { time: '10:00', r401: 350, r402: 160 },
      { time: '14:00', r401: 320, r402: 150 },
      { time: '18:00', r401: 290, r402: 130 },
      { time: '22:00', r401: 310, r402: 145 },
    ];

    return (
      <div className="relative mx-auto w-full max-w-100">
        <Chart config={areaConfig} className="aspect-5/4">
          <AreaChart
            data={areaData}
            margin={{ left: 0, right: 0, top: 10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="areaGradientR401" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(47, 85, 234, 0.13)" />
                <stop offset="100%" stopColor="rgba(47, 85, 234, 0.04)" />
              </linearGradient>
              <linearGradient id="areaGradientR402" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(47, 85, 234, 0.48)" />
                <stop offset="100%" stopColor="rgba(47, 85, 234, 0.3)" />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={{
                stroke: 'var(--color-muted-foreground)',
                strokeWidth: 1,
              }}
            />
            <Area
              type="monotone"
              dataKey="r401"
              stroke="#2F55EA"
              strokeWidth={1}
              fill="url(#areaGradientR401)"
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="r402"
              stroke="#2F55EA"
              strokeWidth={1}
              fill="url(#areaGradientR402)"
              dot={false}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </Chart>
      </div>
    );
  },
};

export const MultiLineChart: Story = {
  parameters: { order: 3 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText('Primary')).toBeInTheDocument();
    await expect(await canvas.findByText('Secondary')).toBeInTheDocument();
  },
  render: function MultiLineChartRender() {
    const lineConfig = {
      primary: { label: 'Primary', color: 'rgba(47, 85, 234, 0.8)' },
      secondary: { label: 'Secondary', color: 'rgba(47, 85, 234, 0.5)' },
    } satisfies ComponentProps<typeof Chart>['config'];

    const lineData = [
      { date: 'Apr 1', primary: 40, secondary: 80 },
      { date: 'Apr 7', primary: 180, secondary: 90 },
      { date: 'Apr 14', primary: 160, secondary: 180 },
      { date: 'Apr 21', primary: 320, secondary: 120 },
      { date: 'Apr 30', primary: 200, secondary: 160 },
    ];

    return (
      <div className="relative mx-auto w-full max-w-100">
        <Chart config={lineConfig} className="aspect-5/4">
          <LineChart
            data={lineData}
            margin={{ left: 0, right: 0, top: 10, bottom: 0 }}
          >
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={{
                stroke: 'var(--color-muted-foreground)',
                strokeWidth: 1,
              }}
            />
            <Line
              type="monotone"
              dataKey="secondary"
              stroke="var(--color-secondary)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="primary"
              stroke="var(--color-primary)"
              strokeWidth={2}
              dot={false}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </Chart>
      </div>
    );
  },
};

export const HorizontalBarChartStory: Story = {
  parameters: { order: 4 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText('Assets')).toBeInTheDocument();
    await expect(await canvas.findByText('Time series')).toBeInTheDocument();
  },
  render: function HorizontalBarChartStoryRender() {
    const barConfig = {
      value: { label: 'Count', color: 'url(#barGradient)' },
    } satisfies ComponentProps<typeof Chart>['config'];

    const barData = [
      { name: 'Assets', value: 106 },
      { name: 'Files', value: 305 },
      { name: 'Events', value: 237 },
      { name: 'Work orders', value: 73 },
      { name: 'Time series', value: 209 },
    ];

    const barGradientId = useId();

    return (
      <div className="relative mx-auto w-full max-w-100">
        <Chart config={barConfig} className="aspect-5/4">
          <BarChart
            data={barData}
            layout="vertical"
            margin={{ left: 0, right: 40 }}
          >
            <defs>
              <linearGradient id={barGradientId} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(47, 85, 234, 0.35)" />
                <stop offset="100%" stopColor="rgba(47, 85, 234, 0.65)" />
              </linearGradient>
            </defs>
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              axisLine={false}
              width={90}
              tick={{ fontSize: 14, fill: 'var(--color-muted-foreground)' }}
            />
            <XAxis type="number" hide />
            <ChartTooltip
              cursor={{ fill: 'var(--color-muted)', opacity: 0.3 }}
            />
            <Bar
              dataKey="value"
              fill={`url(#${barGradientId})`}
              radius={[0, 4, 4, 0]}
              barSize={24}
            >
              {barData.map((entry) => (
                <Cell
                  key={entry.name}
                  className="transition-opacity duration-200 hover:opacity-80"
                />
              ))}
            </Bar>
          </BarChart>
        </Chart>
      </div>
    );
  },
};

export const RadialChart: Story = {
  parameters: { order: 5 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      await canvas.findByRole('img', { name: 'Radial ring chart' })
    ).toBeInTheDocument();
  },
  render: function RadialChartRender() {
    type RadialRingDatum = {
      name: string;
      fill: string;
      arcPercent: number;
    };

    const radialRingData: RadialRingDatum[] = [
      {
        name: 'ring5',
        fill: 'var(--color-chart-fjord-opacity-4)',
        arcPercent: 50,
      },
      {
        name: 'ring4',
        fill: 'var(--color-chart-fjord-opacity-3)',
        arcPercent: 72,
      },
      {
        name: 'ring3',
        fill: 'var(--color-chart-fjord-opacity-2)',
        arcPercent: 65,
      },
      {
        name: 'ring2',
        fill: 'var(--color-chart-fjord-opacity-1)',
        arcPercent: 76,
      },
      {
        name: 'ring1',
        fill: 'var(--color-chart-fjord-solid)',
        arcPercent: 100,
      },
    ];

    const [hoveredRing, setHoveredRing] = useState<RadialRingDatum | null>(
      null
    );
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      setMousePos({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    };

    const viewBoxSize = 100;
    const center = viewBoxSize / 2;
    const strokeWidth = 5.5;
    const gap = 2.5;
    const spacing = strokeWidth + gap;
    const outerRadius = viewBoxSize / 2 - strokeWidth / 2;

    return (
      <div className="relative mx-auto w-full max-w-64">
        <div className="aspect-square w-full">
          <svg
            viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
            className="h-full w-full"
            role="img"
            aria-label="Radial ring chart"
            onMouseLeave={() => setHoveredRing(null)}
            onMouseMove={handleMouseMove}
          >
            {radialRingData.map((ring, index) => {
              const radius = outerRadius - index * spacing;
              const circumference = 2 * Math.PI * radius;
              const arcLength = (ring.arcPercent / 100) * circumference;
              const dashArray = `${arcLength} ${circumference}`;
              const isHovered = hoveredRing?.name === ring.name;

              return (
                <g
                  key={ring.name}
                  onMouseEnter={() => setHoveredRing(ring)}
                  className="cursor-pointer"
                >
                  <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    strokeWidth={strokeWidth}
                    className="stroke-border"
                    style={{
                      opacity: hoveredRing && !isHovered ? 0.5 : 1,
                      transition: 'opacity 150ms',
                    }}
                  />
                  <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke={ring.fill}
                    strokeWidth={strokeWidth}
                    strokeDasharray={
                      ring.arcPercent === 100 ? undefined : dashArray
                    }
                    strokeDashoffset={0}
                    transform={`rotate(-90 ${center} ${center})`}
                    style={{
                      opacity: hoveredRing && !isHovered ? 0.5 : 1,
                      transition: 'opacity 150ms',
                    }}
                  />
                </g>
              );
            })}
          </svg>
        </div>
        {hoveredRing ? (
          <div
            className="pointer-events-none absolute z-10"
            style={{ left: mousePos.x + 12, top: mousePos.y - 20 }}
          >
            <div className="flex items-center gap-4 rounded-md bg-popover p-2 shadow-md">
              <div className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-sm"
                  style={{ backgroundColor: hoveredRing.fill }}
                />
                <span className="text-sm text-muted-foreground">unit</span>
              </div>
              <span className="text-sm text-foreground">
                {hoveredRing.arcPercent}%
              </span>
            </div>
          </div>
        ) : null}
      </div>
    );
  },
};
