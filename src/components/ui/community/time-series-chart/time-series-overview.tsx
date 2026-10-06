import { cn } from '@cognite/aura/utils';
import { extent } from 'd3-array';
import { axisBottom } from 'd3-axis';
import { brushX, type BrushBehavior, type D3BrushEvent } from 'd3-brush';
import { scaleLinear, scaleTime } from 'd3-scale';
import { select } from 'd3-selection';
import { area, curveMonotoneX } from 'd3-shape';
import type { ReactNode } from 'react';
import { useEffect, useId, useLayoutEffect, useMemo, useRef } from 'react';

import {
  aggregateSeries,
  type TimeSeriesBucket,
} from './time-series-chart.aggregate';
import { PLOT_MARGIN, useTimeSeriesChart } from './time-series-chart.context';
import { seriesTokens } from './time-series-chart.tokens';

const MARGIN = { ...PLOT_MARGIN, top: 4, bottom: 22 };
const HEIGHT = 72;

export interface TimeSeriesOverviewProps {
  /** Series drawn in the strip. Defaults to the first visible series. */
  seriesId?: string;
  className?: string;
}

/**
 * Context strip under the main plot. d3-brush owns the selection rectangle
 * and its handles; React draws the area. Brush events that come from the
 * user (`sourceEvent` set) drive the zoom, and zoom changes move the brush
 * back with `brush.move`, which fires events without a `sourceEvent` — the
 * check that stops the two from looping.
 */
export function TimeSeriesOverview({
  seriesId,
  className,
}: TimeSeriesOverviewProps): ReactNode {
  const {
    series,
    visibleSeries,
    fullDomain,
    domain,
    width,
    maxBuckets,
    zoomTo,
  } = useTimeSeriesChart();
  const source =
    series.find(({ id }) => id === seriesId) ?? visibleSeries[0] ?? series[0];
  const buckets = useMemo(
    () =>
      source
        ? aggregateSeries(source.points, fullDomain, maxBuckets).buckets
        : [],
    [source, fullDomain, maxBuckets]
  );
  const onBrush = (next: [number, number]) => zoomTo(next, { animate: false });

  const gradientId = `${useId().replace(/:/g, '')}-overview`;
  const brushRef = useRef<SVGGElement>(null);
  const axisRef = useRef<SVGGElement>(null);
  const behaviorRef = useRef<BrushBehavior<unknown> | null>(null);
  const brushingRef = useRef(false);
  const onBrushRef = useRef(onBrush);
  const innerWidth = Math.max(0, width - MARGIN.left - MARGIN.right);
  const innerHeight = HEIGHT - MARGIN.top - MARGIN.bottom;
  const [fullStart, fullEnd] = fullDomain;

  useEffect(() => {
    onBrushRef.current = onBrush;
  }, [onBrush]);

  const x = scaleTime().domain(fullDomain).range([0, innerWidth]);
  const [low = 0, high = 1] = extent(buckets, (bucket) => bucket.average);
  const y = scaleLinear().domain([low, high]).range([innerHeight, 0]);
  const path =
    area<TimeSeriesBucket>()
      .x((bucket) => x(bucket.t))
      .y0(innerHeight)
      .y1((bucket) => y(bucket.average))
      .curve(curveMonotoneX)(buckets) ?? undefined;

  useLayoutEffect(() => {
    if (!axisRef.current) {
      return;
    }
    select(axisRef.current)
      .call(
        axisBottom(x)
          .ticks(Math.max(2, Math.floor(innerWidth / 110)))
          .tickSize(0)
          .tickPadding(8)
      )
      .attr('font-size', null)
      .attr('font-family', null)
      .call((group) => group.select('.domain').remove());
  });

  useEffect(() => {
    const group = brushRef.current;
    if (!group || innerWidth <= 0) {
      return;
    }
    const scale = scaleTime()
      .domain([fullStart, fullEnd])
      .range([0, innerWidth]);
    const behavior = brushX<unknown>()
      .extent([
        [0, 0],
        [innerWidth, innerHeight],
      ])
      .on('start brush end', (event: D3BrushEvent<unknown>) => {
        if (!event.sourceEvent) {
          return;
        }
        brushingRef.current = event.type !== 'end';
        const selection = event.selection as [number, number] | null;
        if (!selection) {
          // A click outside the selection clears it: show everything.
          onBrushRef.current([fullStart, fullEnd]);
          return;
        }
        onBrushRef.current([
          +scale.invert(selection[0]),
          +scale.invert(selection[1]),
        ]);
      });

    const selection = select(group).call(behavior);
    // Swap d3's default grey for Aura chart tokens. Classes beat the
    // presentation attributes d3 sets, so only the opacity needs clearing.
    selection
      .select('.selection')
      .attr('fill-opacity', null)
      .attr('stroke', null)
      .attr(
        'class',
        'selection fill-chart-neutral-color-5 stroke-chart-neutral-color-1'
      );
    behaviorRef.current = behavior;

    return () => {
      selection.on('.brush', null);
      behaviorRef.current = null;
    };
  }, [fullStart, fullEnd, innerWidth, innerHeight]);

  const [start, end] = domain;
  useEffect(() => {
    const group = brushRef.current;
    const behavior = behaviorRef.current;
    if (!group || !behavior || brushingRef.current || innerWidth <= 0) {
      return;
    }
    const scale = scaleTime()
      .domain([fullStart, fullEnd])
      .range([0, innerWidth]);
    // Hide the selection at full range so the whole strip isn't highlighted.
    const isFull = start - fullStart < 60_000 && fullEnd - end < 60_000;
    select(group).call(
      behavior.move,
      isFull ? null : [scale(start), scale(end)]
    );
  }, [start, end, fullStart, fullEnd, innerWidth]);

  if (innerWidth <= 0 || !source) {
    return null;
  }

  return (
    <svg
      width={width}
      height={HEIGHT}
      className={cn('block select-none', className)}
      data-slot="time-series-overview"
      aria-hidden
    >
      <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
        <rect
          width={innerWidth}
          height={innerHeight}
          rx={4}
          className="fill-muted-background"
        />
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={seriesTokens[source.color].gradient.from}
            />
            <stop
              offset="100%"
              stopColor={seriesTokens[source.color].gradient.to}
            />
          </linearGradient>
        </defs>
        <path d={path} fill={`url(#${gradientId})`} />
        <g
          ref={axisRef}
          transform={`translate(0,${innerHeight})`}
          className="text-xs text-muted-foreground tabular-nums"
        />
        <g ref={brushRef} data-slot="time-series-brush" />
      </g>
    </svg>
  );
}
