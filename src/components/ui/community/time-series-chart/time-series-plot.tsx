import { cn } from '@cognite/aura/utils';
import { extent } from 'd3-array';
import { axisBottom, axisLeft, type Axis, type AxisDomain } from 'd3-axis';
import { format } from 'd3-format';
import { scaleLinear, type ScaleLinear } from 'd3-scale';
import { pointer, select } from 'd3-selection';
import { area, curveMonotoneX, line } from 'd3-shape';
import { timeFormat } from 'd3-time-format';
import type {
  ComponentProps,
  KeyboardEvent,
  PointerEvent,
  ReactNode,
} from 'react';
import {
  createContext,
  useContext,
  useId,
  useLayoutEffect,
  useRef,
} from 'react';

import {
  nearestBucket,
  type TimeSeriesBucket,
} from './time-series-chart.aggregate';
import {
  PLOT_MARGIN,
  useTimeSeriesChart,
  type TimeSeriesLaneData,
} from './time-series-chart.context';
import type { TimeSeries } from './time-series-chart.data';
import { seriesTokens } from './time-series-chart.tokens';

const TOOLTIP_WIDTH = 232;

export const formatTooltipTime = timeFormat('%a %b %-d, %H:%M');

export function formatValue(series: TimeSeries, value: number): string {
  return format(`,.${series.precision}f`)(value);
}

/** Value and unit joined by a no-break space, per Aura content guidelines. */
export function formatWithUnit(series: TimeSeries, value: number): string {
  return `${formatValue(series, value)}\u00a0${series.unit}`;
}

/**
 * Lets d3-axis render ticks into a React-owned <g>. React decides where the
 * axis lives; d3 owns its children. d3 writes `font-size` and `font-family`
 * attributes, so they are cleared to let Aura's type classes apply.
 */
function AxisGroup<Domain extends AxisDomain>({
  axis,
  className,
  ...props
}: Omit<ComponentProps<'g'>, 'ref'> & { axis: Axis<Domain> }): ReactNode {
  const ref = useRef<SVGGElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }
    select(ref.current)
      .call(axis)
      .attr('font-size', null)
      .attr('font-family', null)
      .call((group) => group.select('.domain').remove())
      .call((group) => group.selectAll('.tick line').remove());
  });

  return (
    <g
      ref={ref}
      aria-hidden
      className={cn('text-xs text-muted-foreground tabular-nums', className)}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Plot                                                                       */
/* -------------------------------------------------------------------------- */

export type TimeSeriesPlotProps = Omit<ComponentProps<'div'>, 'ref'>;

/**
 * The focusable plot surface. Renders the SVG, measures the available width,
 * attaches d3-zoom and handles pointer and keyboard inspection. Compose
 * layers inside it: `TimeSeriesEvents`, `TimeSeriesLanes`, axes, crosshair
 * and tooltip.
 */
export function TimeSeriesPlot({
  className,
  children,
  'aria-label': ariaLabel = 'Time series chart',
  ...props
}: TimeSeriesPlotProps): ReactNode {
  const {
    lanes,
    layout,
    width,
    x,
    hoverTime,
    setHoverTime,
    zoomBy,
    panBy,
    reset,
    plotContainerRef,
    zoomTargetRef,
    summaryId,
    hasSummary,
  } = useTimeSeriesChart();
  const { innerWidth, plotHeight, height } = layout;
  const buckets = lanes[0]?.result.buckets ?? [];

  const handlePointerMove = (event: PointerEvent<SVGRectElement>) => {
    const [px] = pointer(event.nativeEvent, event.currentTarget);
    setHoverTime(+x.invert(px));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const stepCursor = (direction: 1 | -1) => {
      if (buckets.length === 0) {
        return;
      }
      const current =
        hoverTime === null
          ? direction === 1
            ? -1
            : buckets.length
          : buckets.indexOf(nearestBucket(buckets, hoverTime)!);
      const next = Math.min(
        buckets.length - 1,
        Math.max(0, current + direction)
      );
      setHoverTime(buckets[next]!.t);
    };

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowLeft': {
        const direction = event.key === 'ArrowRight' ? 1 : -1;
        if (event.shiftKey) {
          panBy(direction * 0.1);
        } else {
          stepCursor(direction);
        }
        break;
      }
      case 'Home':
        if (buckets[0]) setHoverTime(buckets[0].t);
        break;
      case 'End':
        if (buckets.length) setHoverTime(buckets[buckets.length - 1]!.t);
        break;
      case '+':
      case '=':
        zoomBy(2, hoverTime ?? undefined);
        break;
      case '-':
      case '_':
        zoomBy(0.5, hoverTime ?? undefined);
        break;
      case '0':
        reset();
        break;
      case 'Escape':
        setHoverTime(null);
        break;
      default:
        return;
    }
    event.preventDefault();
  };

  const announcement = (() => {
    const anchor =
      hoverTime === null ? undefined : nearestBucket(buckets, hoverTime);
    if (hoverTime === null || !anchor) {
      return '';
    }
    const values = lanes
      .map(({ series, result }) => {
        const bucket = nearestBucket(result.buckets, hoverTime);
        return bucket
          ? `${series.name} ${formatWithUnit(series, bucket.average)}`
          : null;
      })
      .filter(Boolean)
      .join(', ');
    return `${formatTooltipTime(new Date(anchor.t))}. ${values}.`;
  })();

  return (
    <div
      ref={plotContainerRef}
      data-slot="time-series-plot"
      role="group"
      aria-roledescription="interactive chart"
      aria-label={`${ariaLabel}. Use arrow keys to inspect values, Shift + arrows to pan, plus and minus to zoom, 0 to reset.`}
      aria-describedby={hasSummary ? summaryId : undefined}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onBlur={() => setHoverTime(null)}
      className={cn(
        'w-full min-w-0 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className
      )}
      {...props}
    >
      {innerWidth > 0 && (
        <svg
          width={width}
          height={height}
          className="block overflow-visible select-none"
          aria-hidden
        >
          <g transform={`translate(${PLOT_MARGIN.left},${PLOT_MARGIN.top})`}>
            {children}
            <rect
              ref={zoomTargetRef}
              width={innerWidth}
              height={plotHeight}
              className="cursor-crosshair fill-transparent active:cursor-grabbing"
              data-slot="time-series-zoom-target"
              onPointerMove={handlePointerMove}
              onPointerLeave={() => setHoverTime(null)}
            />
          </g>
        </svg>
      )}
      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Lanes                                                                      */
/* -------------------------------------------------------------------------- */

interface TimeSeriesLaneContextValue extends TimeSeriesLaneData {
  index: number;
  y: ScaleLinear<number, number>;
  tokens: (typeof seriesTokens)[keyof typeof seriesTokens];
  clipId: string;
}

const TimeSeriesLaneContext = createContext<TimeSeriesLaneContextValue | null>(
  null
);

export function useTimeSeriesLane(): TimeSeriesLaneContextValue {
  const context = useContext(TimeSeriesLaneContext);
  if (!context) {
    throw new Error('Lane layers must be used within <TimeSeriesLanes />');
  }
  return context;
}

function laneYScale(
  lane: TimeSeriesLaneData,
  laneHeight: number
): ScaleLinear<number, number> {
  const values = lane.result.buckets.flatMap((bucket) => [
    bucket.min,
    bucket.max,
  ]);
  if (lane.series.threshold) {
    values.push(lane.series.threshold.value);
  }
  const [low = 0, high = 1] = extent(values);
  const pad = low === high ? 1 : 0;
  return scaleLinear()
    .domain([low - pad, high + pad])
    .range([laneHeight, 0])
    .nice(4);
}

/**
 * Renders its children once per visible series, stacked into lanes that
 * share the time axis. Each lane gets its own y-scale from the visible data.
 */
export function TimeSeriesLanes({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  const { lanes, layout } = useTimeSeriesChart();
  const uid = useId().replace(/:/g, '');

  return (
    <>
      <defs>
        <clipPath id={`${uid}-lane`}>
          <rect width={layout.innerWidth} height={layout.laneHeight} />
        </clipPath>
      </defs>
      {lanes.map((lane, index) => (
        <TimeSeriesLaneContext.Provider
          key={lane.series.id}
          value={{
            ...lane,
            index,
            y: laneYScale(lane, layout.laneHeight),
            tokens: seriesTokens[lane.series.color],
            clipId: `${uid}-lane`,
          }}
        >
          <g
            transform={`translate(0,${layout.laneTop(index)})`}
            data-slot="time-series-lane"
            data-series={lane.series.id}
          >
            {children}
          </g>
        </TimeSeriesLaneContext.Provider>
      ))}
    </>
  );
}

/** Series name and unit above the lane. */
export function TimeSeriesLaneLabel(): ReactNode {
  const { series } = useTimeSeriesLane();
  return (
    <text y={-8} className="fill-foreground text-xs font-medium">
      {series.name}
      <tspan className="fill-muted-foreground font-normal">
        {` · ${series.unit}`}
      </tspan>
    </text>
  );
}

/** Horizontal gridlines at the y-axis ticks. */
export function TimeSeriesGrid({ ticks = 3 }: { ticks?: number }): ReactNode {
  const { y } = useTimeSeriesLane();
  const { layout } = useTimeSeriesChart();
  return (
    <g data-slot="time-series-grid">
      {y.ticks(ticks).map((tick) => (
        <line
          key={tick}
          x2={layout.innerWidth}
          y1={y(tick)}
          y2={y(tick)}
          className="stroke-chart-gridlines"
        />
      ))}
    </g>
  );
}

export function TimeSeriesYAxis({ ticks = 3 }: { ticks?: number }): ReactNode {
  const { y } = useTimeSeriesLane();
  return (
    <AxisGroup
      axis={axisLeft(y).ticks(ticks).tickPadding(8).tickFormat(format('~s'))}
    />
  );
}

/** Min/max envelope of each bucket. Hidden when showing raw readings. */
export function TimeSeriesBand({
  className,
}: {
  className?: string;
}): ReactNode {
  const { result, y, tokens, clipId } = useTimeSeriesLane();
  const { x } = useTimeSeriesChart();
  if (result.granularity === 0) {
    return null;
  }
  const path = area<TimeSeriesBucket>()
    .x((bucket) => x(bucket.t))
    .y0((bucket) => y(bucket.min))
    .y1((bucket) => y(bucket.max))
    .curve(curveMonotoneX)(result.buckets);
  return (
    <path
      d={path ?? undefined}
      clipPath={`url(#${clipId})`}
      className={cn(tokens.band, className)}
    />
  );
}

/**
 * Area under the average line with a vertical gradient, in the style of
 * shadcn area charts. Stops use Aura chart tokens: step 4 at the line, fading
 * to step 6 and then transparent at the lane baseline.
 */
export function TimeSeriesArea({
  className,
}: {
  className?: string;
}): ReactNode {
  const { series, result, y, tokens, clipId } = useTimeSeriesLane();
  const { x, layout } = useTimeSeriesChart();
  const gradientId = `${useId().replace(/:/g, '')}-area-${series.id}`;
  const path = area<TimeSeriesBucket>()
    .x((bucket) => x(bucket.t))
    .y0(layout.laneHeight)
    .y1((bucket) => y(bucket.average))
    .curve(curveMonotoneX)(result.buckets);

  return (
    <g data-slot="time-series-area">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={tokens.gradient.from} />
          <stop offset="60%" stopColor={tokens.gradient.to} />
          <stop offset="100%" stopColor={tokens.gradient.to} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path
        d={path ?? undefined}
        fill={`url(#${gradientId})`}
        clipPath={`url(#${clipId})`}
        className={className}
      />
    </g>
  );
}

function useAveragePath(): string | undefined {
  const { result, y } = useTimeSeriesLane();
  const { x } = useTimeSeriesChart();
  return (
    line<TimeSeriesBucket>()
      .x((bucket) => x(bucket.t))
      .y((bucket) => y(bucket.average))
      .curve(curveMonotoneX)(result.buckets) ?? undefined
  );
}

/** Bucket averages as a line. */
export function TimeSeriesLine({
  className,
}: {
  className?: string;
}): ReactNode {
  const { tokens, clipId } = useTimeSeriesLane();
  const path = useAveragePath();
  return (
    <path
      d={path}
      fill="none"
      strokeWidth={1.5}
      strokeLinejoin="round"
      clipPath={`url(#${clipId})`}
      className={cn(tokens.line, className)}
    />
  );
}

/**
 * The series threshold as a dashed limit line. The line above it is redrawn
 * in the destructive chart color, clipped to the area above the limit.
 */
export function TimeSeriesThreshold(): ReactNode {
  const { series, y, index } = useTimeSeriesLane();
  const { layout } = useTimeSeriesChart();
  const path = useAveragePath();
  const uid = useId().replace(/:/g, '');
  const threshold = series.threshold;
  if (!threshold) {
    return null;
  }
  const thresholdY = y(threshold.value);
  const clipId = `${uid}-breach-${index}`;

  return (
    <g data-slot="time-series-threshold">
      <clipPath id={clipId}>
        <rect width={layout.innerWidth} height={Math.max(0, thresholdY)} />
      </clipPath>
      <path
        d={path}
        fill="none"
        strokeWidth={1.5}
        strokeLinejoin="round"
        clipPath={`url(#${clipId})`}
        className="stroke-chart-destructive-color-1"
      />
      <line
        x2={layout.innerWidth}
        y1={thresholdY}
        y2={thresholdY}
        strokeDasharray="6 4"
        className="stroke-chart-warning-color-1"
      />
      <text
        x={4}
        y={thresholdY + 12}
        paintOrder="stroke"
        strokeWidth={3}
        className="fill-warning-foreground stroke-card text-xs"
      >
        {`${threshold.label} ${formatValue(series, threshold.value)}`}
      </text>
    </g>
  );
}

/** Marker and label on the newest reading, when it is in view. */
export function TimeSeriesLatestValue(): ReactNode {
  const { series, result, y, tokens } = useTimeSeriesLane();
  const { x, domain, fullDomain } = useTimeSeriesChart();
  const last = result.buckets[result.buckets.length - 1];
  if (!last || domain[1] < fullDomain[1] || x(last.t) <= 0) {
    return null;
  }
  return (
    <g data-slot="time-series-latest">
      <circle
        cx={x(last.t)}
        cy={y(last.average)}
        r={3}
        className={tokens.marker}
      />
      <text
        x={x(last.t) - 6}
        y={y(last.average) - 6}
        textAnchor="end"
        paintOrder="stroke"
        strokeWidth={3}
        className="fill-foreground stroke-card text-xs font-medium tabular-nums"
      >
        {formatValue(series, last.average)}
      </text>
    </g>
  );
}

/** Marker on the bucket under the crosshair. */
export function TimeSeriesHoverMarker(): ReactNode {
  const { result, y, tokens } = useTimeSeriesLane();
  const { x, hoverTime } = useTimeSeriesChart();
  const bucket =
    hoverTime === null ? undefined : nearestBucket(result.buckets, hoverTime);
  if (!bucket) {
    return null;
  }
  return (
    <circle
      cx={x(bucket.t)}
      cy={y(bucket.average)}
      r={4}
      strokeWidth={2}
      className={cn('stroke-card', tokens.marker)}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Plot-wide layers                                                           */
/* -------------------------------------------------------------------------- */

export function TimeSeriesXAxis(): ReactNode {
  const { x, layout } = useTimeSeriesChart();
  return (
    <AxisGroup
      transform={`translate(0,${layout.plotHeight})`}
      axis={axisBottom<Date>(x)
        .ticks(Math.max(2, Math.floor(layout.innerWidth / 110)))
        .tickPadding(8)}
    />
  );
}

/**
 * Event annotations across all lanes: shaded spans for events with an end,
 * dashed lines for point events. Labels that would overlap are skipped.
 */
export function TimeSeriesEvents(): ReactNode {
  const { events, x, layout } = useTimeSeriesChart();
  const { innerWidth, plotHeight } = layout;
  const uid = useId().replace(/:/g, '');
  let labelEnd = Number.NEGATIVE_INFINITY;

  const visible = events
    .map((event) => ({
      event,
      start: x(event.start),
      end: event.end === undefined ? undefined : x(event.end),
    }))
    .filter(({ start, end }) => (end ?? start) >= 0 && start <= innerWidth)
    .sort((a, b) => a.start - b.start);

  return (
    <g data-slot="time-series-events">
      <clipPath id={`${uid}-events`}>
        <rect
          y={-PLOT_MARGIN.top}
          width={innerWidth}
          height={plotHeight + PLOT_MARGIN.top}
        />
      </clipPath>
      <g clipPath={`url(#${uid}-events)`}>
        {visible.map(({ event, start, end }) => {
          const isSpan = end !== undefined;
          const anchorX = isSpan ? Math.max(start, 0) + 4 : start;
          // Rough text width for collision checks; labels are text-xs.
          const labelWidth = event.label.length * 6.5;
          const labelStart = isSpan ? anchorX : anchorX - labelWidth / 2;
          const showLabel = labelStart > labelEnd + 8;
          if (showLabel) {
            labelEnd = labelStart + labelWidth;
          }
          return (
            <g key={event.id} data-slot="time-series-event">
              {isSpan ? (
                <rect
                  x={start}
                  width={Math.max(1, end - start)}
                  height={plotHeight}
                  className="fill-chart-neutral-color-6"
                />
              ) : (
                <line
                  x1={start}
                  x2={start}
                  y2={plotHeight}
                  strokeDasharray="3 3"
                  className="stroke-chart-neutral-color-1"
                />
              )}
              {showLabel && (
                <text
                  x={anchorX}
                  y={-8}
                  textAnchor={isSpan ? 'start' : 'middle'}
                  className="fill-muted-foreground text-xs"
                >
                  {event.label}
                </text>
              )}
            </g>
          );
        })}
      </g>
    </g>
  );
}

function useAnchorBucket(): TimeSeriesBucket | undefined {
  const { lanes, hoverTime } = useTimeSeriesChart();
  if (hoverTime === null || !lanes[0]) {
    return undefined;
  }
  return nearestBucket(lanes[0].result.buckets, hoverTime);
}

/** Vertical line at the hovered time, snapped to the nearest bucket. */
export function TimeSeriesCrosshair(): ReactNode {
  const { x, layout } = useTimeSeriesChart();
  const anchor = useAnchorBucket();
  if (!anchor) {
    return null;
  }
  return (
    <line
      x1={x(anchor.t)}
      x2={x(anchor.t)}
      y2={layout.plotHeight}
      className="pointer-events-none stroke-muted-foreground"
    />
  );
}

/**
 * One tooltip listing every visible series at the hovered time. Positioned
 * with SVG attributes in a <foreignObject>, and flipped near the right edge.
 */
export function TimeSeriesTooltip(): ReactNode {
  const { lanes, x, layout, hoverTime } = useTimeSeriesChart();
  const anchor = useAnchorBucket();
  if (!anchor || hoverTime === null) {
    return null;
  }
  const crosshairX = x(anchor.t);
  const left =
    crosshairX + 12 + TOOLTIP_WIDTH > layout.innerWidth
      ? Math.max(0, crosshairX - 12 - TOOLTIP_WIDTH)
      : crosshairX + 12;

  return (
    <foreignObject
      x={left}
      y={0}
      width={TOOLTIP_WIDTH}
      height={40 + lanes.length * 40}
      className="pointer-events-none overflow-visible"
    >
      <div
        data-slot="time-series-tooltip"
        className="w-full rounded-lg border bg-popover p-2 text-xs text-popover-foreground shadow-md"
      >
        <p className="mb-1.5 font-medium">
          {formatTooltipTime(new Date(anchor.t))}
        </p>
        <ul className="flex flex-col gap-1.5">
          {lanes.map(({ series, result }) => {
            const bucket = nearestBucket(result.buckets, hoverTime);
            if (!bucket) {
              return null;
            }
            return (
              <li key={series.id} className="flex items-start gap-2">
                <span
                  className={cn(
                    'mt-1 size-2 shrink-0 rounded-full',
                    seriesTokens[series.color].swatch
                  )}
                />
                <span className="min-w-0 flex-1">
                  <span className="flex justify-between gap-2">
                    <span className="truncate text-muted-foreground">
                      {series.name}
                    </span>
                    <span className="font-medium tabular-nums">
                      {formatWithUnit(series, bucket.average)}
                    </span>
                  </span>
                  {bucket.count > 1 && (
                    <span className="block text-right text-muted-foreground tabular-nums">
                      {formatValue(series, bucket.min)}–
                      {formatValue(series, bucket.max)} range
                    </span>
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </foreignObject>
  );
}
