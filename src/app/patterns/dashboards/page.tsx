'use client';

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/aura/badge';
import { Button } from '@/components/ui/aura/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/aura/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/aura/chart';
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  type PieLabelRenderProps,
} from 'recharts';
import {
  IconChartBar as BarChart3,
  IconRefresh as RefreshCw,
  IconShield as Shield,
  IconTemperature as Thermometer,
  IconTrendingUp as TrendingUp,
} from '@tabler/icons-react';

// Generate 3 months of equipment uptime/downtime data with proper stacking
const generateEquipmentData = () => {
  const data = [];
  const today = new Date();
  const totalDays = 90; // 3 months (90 days)

  // Base patterns for more realistic variation over 3 months
  const maintenanceEvents = [7, 21, 35, 49, 63, 77]; // Monthly maintenance cycles
  const incidentEvents = [12, 28, 44, 58, 72, 85]; // Random incidents

  for (let i = totalDays - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dayIndex = totalDays - 1 - i;

    let uptimePercent = 82; // Higher base for less dramatic variation

    // Add moderate daily variation
    uptimePercent += Math.sin(dayIndex * 0.3) * 8; // Primary wave
    uptimePercent += Math.sin(dayIndex * 0.6) * 5; // Secondary wave
    uptimePercent += (Math.random() - 0.5) * 6; // Moderate random variation

    // Planned maintenance events (moderate drops)
    if (maintenanceEvents.includes(dayIndex)) {
      uptimePercent -= 15 + Math.random() * 10; // 15-25% drop
    }

    // Unplanned incidents (significant but not extreme drops)
    if (incidentEvents.includes(dayIndex)) {
      uptimePercent -= 20 + Math.random() * 15; // 20-35% drop
    }

    // Weekend effect (moderate impact)
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      uptimePercent -= 4 + Math.random() * 4;
    }

    // Create some random "good days" for peaks
    if (
      Math.random() < 0.15 &&
      !maintenanceEvents.includes(dayIndex) &&
      !incidentEvents.includes(dayIndex)
    ) {
      uptimePercent += 6 + Math.random() * 8; // Moderate boost for "good days"
    }

    // Ensure realistic bounds with moderate range
    uptimePercent = Math.max(55, Math.min(97, uptimePercent));
    const downtimePercent = 100 - uptimePercent;

    // For stacked area chart, we need cumulative values
    // Bottom area (downtime) goes from 0 to downtimePercent
    // Top area (uptime) goes from downtimePercent to 100
    data.push({
      date: date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
      downtime: Math.round(downtimePercent * 10) / 10,
      uptime: Math.round(uptimePercent * 10) / 10,
      // Store original percentages for tooltip
      uptimePercent: Math.round(uptimePercent * 10) / 10,
      downtimePercent: Math.round(downtimePercent * 10) / 10,
    });
  }

  return data;
};

const chartData = generateEquipmentData();

// Generate 4 hours of temperature sensor data (sampled every 5 minutes)
const generateTemperatureData = () => {
  const data = [];
  const now = new Date();
  const samplesPerHour = 12; // Every 5 minutes
  const totalSamples = 4 * samplesPerHour; // 48 samples over 4 hours

  for (let i = totalSamples - 1; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 5 * 60 * 1000); // 5 minutes ago

    // Base temperature around 75°C with realistic industrial variations
    let temperature = 75;

    // Daily heating cycle (machines get warmer during day shift)
    const hour = time.getHours();
    if (hour >= 6 && hour <= 18) {
      temperature += 5 + Math.sin(((hour - 6) / 12) * Math.PI) * 8;
    }

    // Add process variations (reduced)
    temperature += Math.sin(i * 0.1) * 2; // Slow oscillation (reduced from 3 to 2)
    temperature += Math.sin(i * 0.05) * 1.5; // Even slower trend (reduced from 2 to 1.5)
    temperature += (Math.random() - 0.5) * 2; // Random sensor noise (reduced from 4 to 2)

    // Occasional temperature spikes (equipment events) - reduced frequency and magnitude
    if (Math.random() < 0.01) {
      // 1% chance (reduced from 2%)
      temperature += 5 + Math.random() * 8; // Smaller spikes (reduced from 10-25 to 5-13)
    }

    // Ensure realistic industrial temperature range
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

const chartConfig = {
  uptime: {
    label: 'Uptime',
    color: 'hsl(var(--chart-1))',
  },
  downtime: {
    label: 'Downtime',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

const temperatureChartConfig = {
  temperature: {
    label: 'Temperature',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig;

// Asset health status data
const assetHealthData = [
  {
    name: 'Healthy',
    value: 67,
    count: 134,
    color: 'hsl(142 76% 26%)', // Dark green
    hoverColor: 'hsl(142 76% 36%)', // Brighter green on hover
  },
  {
    name: 'Warning',
    value: 23,
    count: 46,
    color: 'hsl(45 93% 35%)', // Dark yellow/amber
    hoverColor: 'hsl(45 93% 47%)', // Brighter yellow on hover
  },
  {
    name: 'Critical',
    value: 10,
    count: 20,
    color: 'hsl(0 84% 45%)', // Dark red
    hoverColor: 'hsl(0 84% 60%)', // Brighter red on hover
  },
];

const assetHealthConfig = {
  healthy: {
    label: 'Healthy',
    color: 'hsl(142 76% 26%)',
  },
  warning: {
    label: 'Warning',
    color: 'hsl(45 93% 35%)',
  },
  critical: {
    label: 'Critical',
    color: 'hsl(0 84% 45%)',
  },
} satisfies ChartConfig;

function EquipmentUptimeChart() {
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    // Trigger animation on mount
    const timer = setTimeout(() => {
      setAnimationKey(1);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="w-full rounded-[4px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Equipment uptime analysis
        </CardTitle>
        <CardDescription>
          Showing equipment uptime vs downtime for the past 3 months
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0 pb-6">
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <AreaChart
            key={animationKey}
            accessibilityLayer
            data={chartData}
            margin={{
              left: 0,
              right: 24,
              top: 12,
              bottom: 12,
            }}
          >
            <defs>
              <linearGradient id="fillUptime" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(239 84% 67%)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(239 84% 67%)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillDowntime" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(239 84% 85%)"
                  stopOpacity={0.9}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(239 84% 85%)"
                  stopOpacity={0.2}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value}
              interval={Math.floor(chartData.length / 8)} // Show ~8 ticks across 3 months
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="downtime"
              type="natural"
              fill="url(#fillDowntime)"
              fillOpacity={0.7}
              stroke="hsl(239 84% 85%)"
              strokeWidth={2}
              stackId="a"
              animationBegin={0}
              animationDuration={2000}
            />
            <Area
              dataKey="uptime"
              type="natural"
              fill="url(#fillUptime)"
              fillOpacity={0.8}
              stroke="hsl(239 84% 50%)"
              strokeWidth={2}
              stackId="a"
              animationBegin={200}
              animationDuration={2000}
            />
          </AreaChart>
        </ChartContainer>
        <div className="flex items-center gap-2 text-sm mt-4 px-6">
          <TrendingUp className="h-4 w-4 text-emerald-500" />
          <span className="text-muted-foreground">
            Average uptime:{' '}
            {(
              chartData.reduce((sum, item) => sum + item.uptimePercent, 0) /
              chartData.length
            ).toFixed(1)}
            % over 3 months
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function TemperatureSensorChart() {
  const [animationKey, setAnimationKey] = useState(0);
  const [currentData, setCurrentData] = useState(temperatureData);

  useEffect(() => {
    // Trigger animation on mount
    const timer = setTimeout(() => {
      setAnimationKey(1);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentData((prevData) => {
        const newData = [...prevData];
        const lastTime = new Date(
          newData[newData.length - 1].timestamp + 5 * 60 * 1000
        );

        // Generate new temperature reading
        let newTemp = newData[newData.length - 1].temperature;
        newTemp += (Math.random() - 0.5) * 3; // Small variation
        newTemp = Math.max(60, Math.min(110, newTemp));

        // Remove oldest data point and add new one
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
    }, 3000); // Update every 3 seconds for demo

    return () => clearInterval(interval);
  }, []);

  const currentTemp = currentData[currentData.length - 1]?.temperature || 0;
  const avgTemp =
    currentData.reduce((sum, item) => sum + item.temperature, 0) /
    currentData.length;

  return (
    <Card className="w-full rounded-[4px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Thermometer className="h-5 w-5" />
          Industrial sensor monitoring
        </CardTitle>
        <CardDescription>
          Real-time temperature readings from Machine Unit #3 - last 4 hours
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={temperatureChartConfig}>
          <LineChart
            key={animationKey}
            accessibilityLayer
            data={currentData}
            margin={{
              left: 12,
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
              interval={5} // Show every 6th tick (30 minutes)
              tickFormatter={(value) => {
                // Only show times that end in :00 or :30
                const [hour, minute] = value.split(':');
                if (minute === '00' || minute === '30') {
                  return `${hour}:${minute}`;
                }
                return '';
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              domain={['dataMin - 5', 'dataMax + 5']}
              tickFormatter={(value) => `${value}°C`}
            />
            <ChartTooltip
              cursor={{ stroke: 'hsl(239 84% 67%)', strokeWidth: 1 }}
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
              stroke="hsl(239 84% 67%)" // Indigo 500
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, stroke: 'hsl(239 84% 67%)', strokeWidth: 2 }}
              animationBegin={0}
              animationDuration={2000}
            />
          </LineChart>
        </ChartContainer>
        <div className="flex items-center justify-between text-sm mt-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: 'hsl(239 84% 67%)' }}
              ></div>
              <span className="text-muted-foreground">
                Current: {currentTemp}°C
              </span>
            </div>
            <span className="text-muted-foreground">
              4h Average: {avgTemp.toFixed(1)}°C
            </span>
          </div>
          <span className="text-xs text-muted-foreground">
            Updates every 5 minutes
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function AssetHealthChart() {
  const [animationKey, setAnimationKey] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  useEffect(() => {
    // Trigger animation on mount
    const timer = setTimeout(() => {
      setAnimationKey(1);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const totalAssets = assetHealthData.reduce(
    (sum, item) => sum + item.count,
    0
  );

  const renderCustomLabel = (props: PieLabelRenderProps) => {
    return `${props.value}%`;
  };

  return (
    <Card className="w-full rounded-[4px] aspect-square">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Asset health status
        </CardTitle>
        <CardDescription>Plant-wide equipment health overview</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer config={assetHealthConfig} className="h-[250px]">
          <PieChart key={animationKey}>
            <defs>
              <linearGradient
                id="healthyGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor="hsl(142 76% 36%)"
                  stopOpacity={1}
                />
                <stop
                  offset="100%"
                  stopColor="hsl(142 76% 26%)"
                  stopOpacity={1}
                />
              </linearGradient>
              <linearGradient
                id="warningGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="hsl(45 93% 47%)" stopOpacity={1} />
                <stop
                  offset="100%"
                  stopColor="hsl(45 93% 35%)"
                  stopOpacity={1}
                />
              </linearGradient>
              <linearGradient
                id="criticalGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="hsl(0 84% 60%)" stopOpacity={1} />
                <stop
                  offset="100%"
                  stopColor="hsl(0 84% 45%)"
                  stopOpacity={1}
                />
              </linearGradient>
              <linearGradient
                id="healthyHoverGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor="hsl(142 76% 46%)"
                  stopOpacity={1}
                />
                <stop
                  offset="100%"
                  stopColor="hsl(142 76% 36%)"
                  stopOpacity={1}
                />
              </linearGradient>
              <linearGradient
                id="warningHoverGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="hsl(45 93% 57%)" stopOpacity={1} />
                <stop
                  offset="100%"
                  stopColor="hsl(45 93% 47%)"
                  stopOpacity={1}
                />
              </linearGradient>
              <linearGradient
                id="criticalHoverGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="hsl(0 84% 70%)" stopOpacity={1} />
                <stop
                  offset="100%"
                  stopColor="hsl(0 84% 60%)"
                  stopOpacity={1}
                />
              </linearGradient>
            </defs>
            <Pie
              data={assetHealthData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomLabel}
              outerRadius={80}
              innerRadius={40}
              fill="#8884d8"
              dataKey="value"
              animationBegin={0}
              animationDuration={1500}
              onMouseEnter={(_, index) => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(-1)}
            >
              {assetHealthData.map((entry, index) => {
                const getGradientId = (
                  entryName: string,
                  isHovered: boolean
                ) => {
                  const gradientMap = {
                    Healthy: isHovered
                      ? 'healthyHoverGradient'
                      : 'healthyGradient',
                    Warning: isHovered
                      ? 'warningHoverGradient'
                      : 'warningGradient',
                    Critical: isHovered
                      ? 'criticalHoverGradient'
                      : 'criticalGradient',
                  };
                  return `url(#${
                    gradientMap[entryName as keyof typeof gradientMap]
                  })`;
                };

                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={getGradientId(entry.name, hoveredIndex === index)}
                    style={{
                      transition: 'all 0.2s ease-in-out',
                    }}
                  />
                );
              })}
            </Pie>
            <ChartTooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-md">
                      <div className="grid gap-2">
                        <div className="flex items-center gap-2">
                          <div
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ backgroundColor: data.color }}
                          />
                          <span className="font-medium">{data.name}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {data.count} assets ({data.value}%)
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
          </PieChart>
        </ChartContainer>

        {/* Legend */}
        <div className="mt-4 space-y-2">
          {assetHealthData.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span>{item.name}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span>{item.count}</span>
                <span className="text-xs">({item.value}%)</span>
              </div>
            </div>
          ))}
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between text-sm font-medium">
              <span>Total assets</span>
              <span>{totalAssets}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardsBlock() {
  const [replayKey, setReplayKey] = useState(0);

  const restartDashboard = () => {
    setReplayKey((prev) => prev + 1);
  };

  return (
    <div className="max-w-5xl mx-auto py-10">
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboards</h1>
              <p className="text-lg text-muted-foreground">
                Modern data visualization cards with animations and interactive
                elements
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge variant="secondary">Animated counters</Badge>
              <Badge variant="secondary">Progress indicators</Badge>
              <Badge variant="secondary">Real-time data</Badge>
              <Badge variant="secondary">Interactive charts</Badge>
            </div>
            <Button
              variant="outline"
              onClick={restartDashboard}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Replay
            </Button>
          </div>
        </div>

        {/* Equipment Uptime Chart */}
        <EquipmentUptimeChart key={`equipment-${replayKey}`} />

        {/* Charts Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          <TemperatureSensorChart key={`temperature-${replayKey}`} />
          <AssetHealthChart key={`health-${replayKey}`} />
        </div>

        {/* Data Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* Cards will be added here */}
        </div>
      </div>
    </div>
  );
}
