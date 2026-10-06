import {
  IconChartLine,
  IconLayoutDashboard,
  type Icon as TablerIcon,
} from '@tabler/icons-react';

import timeSeriesSkill from '@/components/ui/community/time-series-chart/SKILL.md?raw';
import { slugify } from '@/lib/utils';

export interface CommunityTemplateSkill {
  /** Skill name from the SKILL.md front matter. */
  name: string;
  /** Raw SKILL.md source, including front matter. */
  markdown: string;
  /** Where the registry installs the skill in a consuming project. */
  installPath: string;
}

export interface CommunityTemplateEntry {
  name: string;
  description: string;
  icon: TablerIcon;
  registryId: string;
  /** Markdown shown under Usage on the template page. */
  usage: string;
  /** Optional agent skill, shown as a SKILL.md sub-page. */
  skill?: CommunityTemplateSkill;
  /**
   * Story shown on the template page. When set, the remaining stories move
   * to an Examples sub-page.
   */
  featuredStory?: string;
}

export const COMMUNITY_TEMPLATES: CommunityTemplateEntry[] = [
  {
    name: 'Dashboard',
    description:
      'A data-dense overview screen with metric cards, charts, and a table.',
    icon: IconLayoutDashboard,
    registryId: 'dashboard-template',
    usage: `This is a complete overview screen, not a single primitive. After you add it from the registry, import \`DashboardTemplate\` and render it on a route.

The header, metric cards, visitors chart, and documents table each live in their own file. Drop the template into your app shell — it does not include a sidebar — then replace the sample metrics, chart series, and table rows with your product data.`,
  },
  {
    name: 'Time Series Chart',
    description:
      'An advanced D3 time series with zoom, brushing, min/max bands, and annotations, styled with Aura chart tokens.',
    icon: IconChartLine,
    registryId: 'time-series-chart',
    featuredStory: 'Basic',
    usage: `A reference for building charts beyond \`@cognite/aura/chart\` with D3. Like shadcn components, it ships as composable parts rather than one component: \`TimeSeriesChart\` holds the shared state (zoom window, hover, visible series), and you assemble the pieces you need inside your own Aura \`Card\`.

\`\`\`tsx
<TimeSeriesChart series={series} events={events}>
  <TimeSeriesPlot aria-label="Pump telemetry">
    <TimeSeriesEvents />
    <TimeSeriesLanes>
      <TimeSeriesLaneLabel />
      <TimeSeriesGrid />
      <TimeSeriesYAxis />
      <TimeSeriesBand />
      <TimeSeriesLine />
      <TimeSeriesThreshold />
      <TimeSeriesLatestValue />
      <TimeSeriesHoverMarker />
    </TimeSeriesLanes>
    <TimeSeriesXAxis />
    <TimeSeriesCrosshair />
    <TimeSeriesTooltip />
  </TimeSeriesPlot>
  <TimeSeriesOverview />
</TimeSeriesChart>
\`\`\`

Children of \`TimeSeriesLanes\` render once per visible series, each with its own y-scale. Controls — \`TimeSeriesRangePresets\`, \`TimeSeriesResetZoom\`, \`TimeSeriesLegend\`, \`TimeSeriesResolution\`, \`TimeSeriesSummary\` and \`TimeSeriesKeyboardHints\` — work anywhere inside the root. For a custom layer, read \`useTimeSeriesChart()\` and \`useTimeSeriesLane()\`.

D3 computes scales, shapes, and the zoom and brush gestures; React renders the SVG; colors come from Aura \`chart-*\` tokens, so light and dark themes work without extra code. As you zoom, readings are downsampled to min / average / max buckets that match the plot width — the same aggregate shape Cognite Data Fusion returns. The registry item also installs an agent skill that explains the approach — read it on the SKILL.md page.`,
    skill: {
      name: 'aura-d3-charts',
      markdown: timeSeriesSkill,
      installPath: '.claude/skills/aura-d3-charts/SKILL.md',
    },
  },
];

export interface CommunityTemplateListItem {
  name: string;
  slug: string;
}

export const ALL_COMMUNITY_TEMPLATES: CommunityTemplateListItem[] =
  COMMUNITY_TEMPLATES.map((template) => ({
    name: template.name,
    slug: slugify(template.name),
  })).sort((a, b) => a.name.localeCompare(b.name));

export function getCommunityTemplateBySlug(slug: string) {
  return (
    COMMUNITY_TEMPLATES.find((template) => slugify(template.name) === slug) ??
    null
  );
}
