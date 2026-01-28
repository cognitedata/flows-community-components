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
    "A compositional card layout for displaying charts. Provides header, content, and footer primitives that can be composed with any Recharts chart type.",
  llmUsage:
    "Use `<ArtifactChart>` with `<ArtifactChartHeader>`, `<ArtifactChartTitle>`, `<ArtifactChartDescription>`, `<ArtifactChartContent>`, and `<ArtifactChartFooter>` to create chart artifacts. Compose Recharts components (PieChart, BarChart, etc.) directly inside the content area using ChartContainer for color theming. See Storybook for complete examples.",
  importPath: "@/components/ui/aura/artifact-chart",
};
