import type { ComponentMeta } from '../../../../lib/types';

export const TimeSeriesChartMetadata: ComponentMeta = {
  name: 'Time Series Chart',
  status: 'pattern',
  description:
    'A D3 time series chart with zoom, brushing, min/max bands and annotations, styled with Aura chart tokens.',
  llmUsage:
    'Compose <TimeSeriesChart series={...}> with parts, shadcn style: <TimeSeriesPlot> containing <TimeSeriesLanes> (per-lane layers such as <TimeSeriesLine />, <TimeSeriesBand />, <TimeSeriesThreshold />, <TimeSeriesYAxis />), plus <TimeSeriesXAxis />, <TimeSeriesCrosshair /> and <TimeSeriesTooltip />. Add <TimeSeriesOverview />, <TimeSeriesLegend />, <TimeSeriesRangePresets />, <TimeSeriesResetZoom /> and <TimeSeriesSummary /> inside an Aura Card. Points are { t: epochMs, value }. d3 computes scales, shapes, zoom and brush; React renders the SVG; colors come from Aura chart-* token classes. See SKILL.md for building other D3 charts with Aura.',
};
