/**
 * Composable D3 time series chart for Aura. Compose the parts inside
 * <TimeSeriesChart>, shadcn style — keep what you need, drop the rest:
 *
 *   <TimeSeriesChart series={series} events={events}>
 *     <TimeSeriesPlot>
 *       <TimeSeriesEvents />
 *       <TimeSeriesLanes>
 *         <TimeSeriesLaneLabel />
 *         <TimeSeriesGrid />
 *         <TimeSeriesYAxis />
 *         <TimeSeriesBand />
 *         <TimeSeriesLine />
 *         <TimeSeriesThreshold />
 *         <TimeSeriesLatestValue />
 *         <TimeSeriesHoverMarker />
 *       </TimeSeriesLanes>
 *       <TimeSeriesXAxis />
 *       <TimeSeriesCrosshair />
 *       <TimeSeriesTooltip />
 *     </TimeSeriesPlot>
 *     <TimeSeriesOverview />
 *   </TimeSeriesChart>
 */
export {
  TimeSeriesChart,
  useTimeSeriesChart,
  type TimeSeriesChartProps,
  type TimeSeriesLaneData,
} from './time-series-chart.context';
export {
  defaultRangePresets,
  TimeSeriesKeyboardHints,
  TimeSeriesLegend,
  TimeSeriesRangePresets,
  TimeSeriesResetZoom,
  TimeSeriesResolution,
  TimeSeriesSummary,
  type TimeSeriesRangePreset,
} from './time-series-controls';
export { TimeSeriesOverview } from './time-series-overview';
export {
  formatTooltipTime,
  formatValue,
  formatWithUnit,
  TimeSeriesBand,
  TimeSeriesCrosshair,
  TimeSeriesEvents,
  TimeSeriesGrid,
  TimeSeriesHoverMarker,
  TimeSeriesLaneLabel,
  TimeSeriesLanes,
  TimeSeriesLatestValue,
  TimeSeriesLine,
  TimeSeriesPlot,
  TimeSeriesThreshold,
  TimeSeriesTooltip,
  TimeSeriesXAxis,
  TimeSeriesYAxis,
  useTimeSeriesLane,
  type TimeSeriesPlotProps,
} from './time-series-plot';
export type {
  SeriesColor,
  TimeSeries,
  TimeSeriesEvent,
  TimeSeriesPoint,
  TimeSeriesThreshold as TimeSeriesThresholdConfig,
} from './time-series-chart.data';
