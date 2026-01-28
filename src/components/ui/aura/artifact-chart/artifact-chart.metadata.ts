import type { ComponentMeta } from "@/lib/component-examples";

/**
 * Artifact Chart Component Metadata
 *
 * This metadata is used by the documentation system to generate
 * component documentation pages and provide context for LLMs.
 */
export const ArtifactChartMetadata: ComponentMeta = {
  name: "ArtifactChart",
  description:
    "A compositional card layout for displaying charts. Provides header, content, footer, and legend primitives that can be composed with any Recharts chart type.",
  llmUsage:
    "Use `<ArtifactChart>` with `<ArtifactChartHeader>`, `<ArtifactChartTitle>`, `<ArtifactChartDescription>`, `<ArtifactChartContent>`, `<ArtifactChartLegend>`, `<ArtifactChartLegendItem>`, `<ArtifactChartFooter>`, `<ArtifactChartFooterTitle>`, `<ArtifactChartFooterDescription>`, and `<ArtifactChartCenterLabel>` to create chart artifacts. Compose with Recharts components (PieChart, BarChart, etc.) inside the content area using ChartContainer for color theming.",
  importPath: "@/components/ui/aura/artifact-chart/artifact-chart",
  codeExamples: [
    {
      title: "Pie Chart with Center Label",
      description: "A donut chart with a centered label showing the total value.",
      code: `import { Cell, Pie, PieChart } from "recharts"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/aura/chart"
import {
  ArtifactChart,
  ArtifactChartHeader,
  ArtifactChartTitle,
  ArtifactChartDescription,
  ArtifactChartContent,
  ArtifactChartFooter,
  ArtifactChartCenterLabel,
} from "@/components/ui/aura/artifact-chart"

const chartConfig = {
  complete: { label: "Complete", color: "var(--color-fjord-450)" },
  inProgress: { label: "In progress", color: "var(--color-fjord-400)" },
  blocked: { label: "Blocked", color: "var(--color-fjord-300)" },
} satisfies ChartConfig

const chartData = [
  { id: "complete", value: 240 },
  { id: "inProgress", value: 180 },
  { id: "blocked", value: 120 },
]

export function PieChartDemo() {
  const total = chartData.reduce((sum, item) => sum + item.value, 0)
  
  return (
    <ArtifactChart className="w-80 p-4">
      <ArtifactChartHeader>
        <ArtifactChartTitle>Task Status</ArtifactChartTitle>
        <ArtifactChartDescription>Current sprint</ArtifactChartDescription>
      </ArtifactChartHeader>
      <ArtifactChartContent>
        <div className="relative flex items-center justify-center">
          <ChartContainer config={chartConfig} className="aspect-square h-48 w-48">
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideIndicator labelKey="id" nameKey="id" />}
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="id"
                innerRadius={64}
                outerRadius={96}
                strokeWidth={0}
              >
                {chartData.map((entry) => (
                  <Cell key={entry.id} fill={\`var(--color-\${entry.id})\`} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
          <ArtifactChartCenterLabel label="Total" value={total.toLocaleString()} />
        </div>
      </ArtifactChartContent>
      <ArtifactChartFooter>
        Updated just now
      </ArtifactChartFooter>
    </ArtifactChart>
  )
}`,
    },
    {
      title: "Pie Chart with Legend",
      description: "A donut chart with a legend showing all categories.",
      code: `import { Cell, Pie, PieChart } from "recharts"
import { type ChartConfig, ChartContainer } from "@/components/ui/aura/chart"
import {
  ArtifactChart,
  ArtifactChartHeader,
  ArtifactChartTitle,
  ArtifactChartContent,
  ArtifactChartLegend,
  ArtifactChartLegendItem,
  ArtifactChartCenterLabel,
} from "@/components/ui/aura/artifact-chart"

const chartConfig = {
  complete: { label: "Complete", color: "var(--color-fjord-450)" },
  inProgress: { label: "In progress", color: "var(--color-fjord-400)" },
} satisfies ChartConfig

const chartData = [
  { id: "complete", value: 240 },
  { id: "inProgress", value: 180 },
]

export function PieChartWithLegendDemo() {
  const total = chartData.reduce((sum, item) => sum + item.value, 0)
  
  return (
    <ArtifactChart className="w-80 p-4">
      <ArtifactChartHeader>
        <ArtifactChartTitle>Overview</ArtifactChartTitle>
      </ArtifactChartHeader>
      <ArtifactChartContent>
        <div className="relative flex items-center justify-center">
          <ChartContainer config={chartConfig} className="aspect-square h-48 w-48">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="id"
                innerRadius={64}
                outerRadius={96}
                strokeWidth={0}
              >
                {chartData.map((entry) => (
                  <Cell key={entry.id} fill={\`var(--color-\${entry.id})\`} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
          <ArtifactChartCenterLabel label="Total" value={total} />
        </div>
      </ArtifactChartContent>
      <ArtifactChartLegend>
        {chartData.map((item) => (
          <ArtifactChartLegendItem
            key={item.id}
            color={chartConfig[item.id]?.color}
          >
            {chartConfig[item.id]?.label}
          </ArtifactChartLegendItem>
        ))}
      </ArtifactChartLegend>
    </ArtifactChart>
  )
}`,
    },
  ],
};
