import { cn } from '@cognite/aura/utils';
import { scaleTime, type ScaleTime } from 'd3-scale';
import type { ComponentProps, ReactNode, RefObject } from 'react';
import { createContext, useContext, useId, useMemo, useState } from 'react';

import {
  aggregateSeries,
  type AggregateResult,
} from './time-series-chart.aggregate';
import type { TimeSeries, TimeSeriesEvent } from './time-series-chart.data';
import {
  useElementWidth,
  useTimeZoom,
  type TimeDomain,
} from './time-series-chart.hooks';

const MINUTE = 60_000;

export const PLOT_MARGIN = { top: 22, right: 16, bottom: 28, left: 56 };
const LANE_HEADER = 22;
const LANE_GAP = 14;

export interface TimeSeriesLaneData {
  series: TimeSeries;
  result: AggregateResult;
}

export interface TimeSeriesLayout {
  /** Plot width excluding axis margins. */
  innerWidth: number;
  /** Height of all lanes, excluding the event row and x-axis. */
  plotHeight: number;
  /** Full SVG height. */
  height: number;
  laneHeight: number;
  laneTop: (index: number) => number;
}

function getLayout(
  laneCount: number,
  laneHeight: number,
  width: number
): TimeSeriesLayout {
  const stride = LANE_HEADER + laneHeight + LANE_GAP;
  const plotHeight = Math.max(1, laneCount) * stride - LANE_GAP;
  return {
    innerWidth: Math.max(0, width - PLOT_MARGIN.left - PLOT_MARGIN.right),
    plotHeight,
    height: PLOT_MARGIN.top + plotHeight + PLOT_MARGIN.bottom,
    laneHeight,
    laneTop: (index) => index * stride + LANE_HEADER,
  };
}

function getFullDomain(series: TimeSeries[]): TimeDomain {
  let start = Number.POSITIVE_INFINITY;
  let end = Number.NEGATIVE_INFINITY;
  for (const { points } of series) {
    const first = points[0];
    const last = points[points.length - 1];
    if (first && last) {
      start = Math.min(start, first.t);
      end = Math.max(end, last.t);
    }
  }
  return Number.isFinite(start) ? [start, end] : [0, 24 * 60 * MINUTE];
}

interface TimeSeriesChartContextValue {
  series: TimeSeries[];
  events: TimeSeriesEvent[];
  visibleSeries: TimeSeries[];
  /** Visible series, downsampled for the current window and width. */
  lanes: TimeSeriesLaneData[];
  isSeriesVisible: (id: string) => boolean;
  setSeriesVisible: (id: string, visible: boolean) => void;

  fullDomain: TimeDomain;
  domain: TimeDomain;
  zoomTo: (domain: TimeDomain, options?: { animate?: boolean }) => void;
  zoomBy: (factor: number, anchor?: number) => void;
  panBy: (fraction: number) => void;
  reset: () => void;

  hoverTime: number | null;
  setHoverTime: (time: number | null) => void;

  width: number;
  layout: TimeSeriesLayout;
  /** Buckets per lane: about one per 2 px of plot width. */
  maxBuckets: number;
  x: ScaleTime<number, number>;
  /** Callback ref for the element whose width sizes the chart. */
  plotContainerRef: (element: HTMLDivElement | null) => void;
  zoomTargetRef: RefObject<SVGRectElement | null>;
  summaryId: string;
  hasSummary: boolean;
  setHasSummary: (value: boolean) => void;
}

const TimeSeriesChartContext =
  createContext<TimeSeriesChartContextValue | null>(null);

export function useTimeSeriesChart(): TimeSeriesChartContextValue {
  const context = useContext(TimeSeriesChartContext);
  if (!context) {
    throw new Error(
      'useTimeSeriesChart must be used within a <TimeSeriesChart />'
    );
  }
  return context;
}

export interface TimeSeriesChartProps extends ComponentProps<'div'> {
  /** Series to plot, one lane each. All lanes share the time axis. */
  series: TimeSeries[];
  /** Point or span annotations drawn across every lane. */
  events?: TimeSeriesEvent[];
  /** Height of each lane's plot area in pixels. */
  laneHeight?: number;
  /** Narrowest window people can zoom to, in milliseconds. */
  minSpan?: number;
  /** Series ids hidden on first render. */
  defaultHiddenSeries?: string[];
}

/**
 * Root of a composable D3 time series chart. Holds the shared state — visible
 * window (d3-zoom), hover time, series visibility, layout and downsampled
 * data — and exposes it to every `TimeSeries*` part through context.
 */
export function TimeSeriesChart({
  series,
  events = [],
  laneHeight = 112,
  minSpan = 30 * MINUTE,
  defaultHiddenSeries = [],
  className,
  children,
  ...props
}: TimeSeriesChartProps): ReactNode {
  const summaryId = useId();
  const [plotElement, plotContainerRef] = useState<HTMLDivElement | null>(null);
  const width = useElementWidth(plotElement);
  const [hiddenIds, setHiddenIds] = useState<ReadonlySet<string>>(
    () => new Set(defaultHiddenSeries)
  );
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hasSummary, setHasSummary] = useState(false);

  const fullDomain = useMemo(() => getFullDomain(series), [series]);
  const visibleSeries = useMemo(
    () => series.filter(({ id }) => !hiddenIds.has(id)),
    [series, hiddenIds]
  );
  const layout = getLayout(visibleSeries.length, laneHeight, width);
  const maxBuckets = Math.max(1, Math.floor(layout.innerWidth / 2));

  const { targetRef, domain, zoomTo, zoomBy, panBy, reset } =
    useTimeZoom<SVGRectElement>({
      fullDomain,
      width: layout.innerWidth,
      height: layout.plotHeight,
      minSpan,
    });

  const lanes = useMemo(
    () =>
      visibleSeries.map((item) => ({
        series: item,
        result: aggregateSeries(item.points, domain, maxBuckets),
      })),
    [visibleSeries, domain, maxBuckets]
  );

  const x = scaleTime().domain(domain).range([0, layout.innerWidth]);

  const setSeriesVisible = (id: string, visible: boolean) => {
    setHiddenIds((current) => {
      const next = new Set(current);
      if (visible) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const value: TimeSeriesChartContextValue = {
    series,
    events,
    visibleSeries,
    lanes,
    isSeriesVisible: (id) => !hiddenIds.has(id),
    setSeriesVisible,
    fullDomain,
    domain,
    zoomTo,
    zoomBy,
    panBy,
    reset,
    hoverTime,
    setHoverTime,
    width,
    layout,
    maxBuckets,
    x,
    plotContainerRef,
    zoomTargetRef: targetRef,
    summaryId,
    hasSummary,
    setHasSummary,
  };

  return (
    <TimeSeriesChartContext.Provider value={value}>
      <div
        data-slot="time-series-chart"
        className={cn('w-full min-w-0', className)}
        {...props}
      >
        {children}
      </div>
    </TimeSeriesChartContext.Provider>
  );
}
