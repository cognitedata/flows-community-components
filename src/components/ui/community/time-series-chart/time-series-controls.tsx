import {
  Badge,
  Button,
  Kbd,
  SegmentedControl,
  SegmentedControlButton,
  SegmentedControlList,
  Toggle,
} from '@cognite/aura/components';
import { cn } from '@cognite/aura/utils';
import { IconZoomReset } from '@tabler/icons-react';
import { format } from 'd3-format';
import type { ComponentProps, ReactNode } from 'react';
import { useEffect } from 'react';

import { summarizeBreaches } from './time-series-chart.aggregate';
import { useTimeSeriesChart } from './time-series-chart.context';
import type { TimeDomain } from './time-series-chart.hooks';
import { seriesTokens } from './time-series-chart.tokens';
import { formatTooltipTime, formatWithUnit } from './time-series-plot';

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export interface TimeSeriesRangePreset {
  value: string;
  label: string;
  /** Window length in milliseconds, ending at the latest reading. */
  span: number;
}

export const defaultRangePresets: TimeSeriesRangePreset[] = [
  { value: '1d', label: '24h', span: DAY },
  { value: '7d', label: '7d', span: 7 * DAY },
  { value: 'all', label: 'All', span: Number.POSITIVE_INFINITY },
];

function matchPreset(
  presets: TimeSeriesRangePreset[],
  [start, end]: TimeDomain,
  [fullStart, fullEnd]: TimeDomain
): string | null {
  const isFull = start - fullStart < MINUTE && fullEnd - end < MINUTE;
  if (fullEnd - end > MINUTE) {
    return null;
  }
  const preset = presets.find((option) =>
    Number.isFinite(option.span)
      ? Math.abs(end - start - option.span) < MINUTE
      : isFull
  );
  return preset?.value ?? null;
}

/** Segmented control that jumps to windows ending at the latest reading. */
export function TimeSeriesRangePresets({
  presets = defaultRangePresets,
}: {
  presets?: TimeSeriesRangePreset[];
}): ReactNode {
  const { domain, fullDomain, zoomTo } = useTimeSeriesChart();
  const active = matchPreset(presets, domain, fullDomain);

  return (
    <SegmentedControl
      value={active}
      onValueChange={(value) => {
        const preset = presets.find((option) => option.value === value);
        if (preset) {
          const [fullStart, fullEnd] = fullDomain;
          zoomTo([Math.max(fullStart, fullEnd - preset.span), fullEnd]);
        }
      }}
    >
      <SegmentedControlList size="small" aria-label="Time range">
        {presets.map((preset) => (
          <SegmentedControlButton key={preset.value} value={preset.value}>
            {preset.label}
          </SegmentedControlButton>
        ))}
      </SegmentedControlList>
    </SegmentedControl>
  );
}

/** Icon button that animates back to the full range. */
export function TimeSeriesResetZoom(): ReactNode {
  const { domain, fullDomain, reset } = useTimeSeriesChart();
  const isFull =
    domain[0] - fullDomain[0] < MINUTE && fullDomain[1] - domain[1] < MINUTE;
  return (
    <Button
      variant="outline"
      size="icon-sm"
      aria-label="Reset zoom"
      title="Reset zoom"
      disabled={isFull}
      onClick={reset}
    >
      <IconZoomReset />
    </Button>
  );
}

/** One toggle per series to show or hide its lane. */
export function TimeSeriesLegend({
  className,
  ...props
}: ComponentProps<'div'>): ReactNode {
  const { series, visibleSeries, isSeriesVisible, setSeriesVisible } =
    useTimeSeriesChart();
  return (
    <div
      role="group"
      aria-label="Visible series"
      data-slot="time-series-legend"
      className={cn('flex flex-wrap items-center gap-1', className)}
      {...props}
    >
      {series.map((item) => {
        const pressed = isSeriesVisible(item.id);
        return (
          <Toggle
            key={item.id}
            variant="outline"
            size="sm"
            pressed={pressed}
            // Keep at least one lane on screen.
            disabled={pressed && visibleSeries.length === 1}
            onPressedChange={(next) => setSeriesVisible(item.id, next)}
          >
            <span
              className={cn(
                'size-2 rounded-full',
                pressed
                  ? seriesTokens[item.color].swatch
                  : 'bg-disabled-foreground'
              )}
            />
            {item.name}
          </Toggle>
        );
      })}
    </div>
  );
}

const formatCount = format(',');

function formatGranularity(ms: number): string {
  if (ms <= 0) {
    return 'Raw readings';
  }
  if (ms < HOUR) {
    return `1 point ≈ ${Math.max(1, Math.round(ms / MINUTE))} min`;
  }
  return `1 point ≈ ${Math.round((ms / HOUR) * 10) / 10} h`;
}

/** Current level of detail and how many raw readings are in view. */
export function TimeSeriesResolution({
  className,
  ...props
}: ComponentProps<'div'>): ReactNode {
  const { lanes } = useTimeSeriesChart();
  const rawInView = lanes.reduce((sum, lane) => sum + lane.result.rawCount, 0);
  return (
    <div
      className={cn(
        'flex items-center gap-2 text-xs text-muted-foreground',
        className
      )}
      {...props}
    >
      <Badge variant="secondary" data-slot="time-series-resolution">
        {formatGranularity(lanes[0]?.result.granularity ?? 0)}
      </Badge>
      <span className="tabular-nums">
        {formatCount(rawInView)} readings in view
      </span>
    </div>
  );
}

/**
 * Text summary of the visible window and threshold breaches. Aura requires a
 * text alternative for every chart; the plot points to this with
 * `aria-describedby`.
 */
export function TimeSeriesSummary({
  className,
  ...props
}: ComponentProps<'div'>): ReactNode {
  const { visibleSeries, domain, summaryId, setHasSummary } =
    useTimeSeriesChart();

  useEffect(() => {
    setHasSummary(true);
    return () => setHasSummary(false);
  }, [setHasSummary]);

  const insights = visibleSeries.flatMap((item) => {
    if (!item.threshold) {
      return [];
    }
    const { count, peak } = summarizeBreaches(
      item.points,
      domain,
      item.threshold.value
    );
    const limit = `${item.threshold.label.toLowerCase()} (${formatWithUnit(item, item.threshold.value)})`;
    if (count === 0) {
      return [`${item.name} stayed below the ${limit} in this window.`];
    }
    return [
      `${item.name} crossed the ${limit} ${count === 1 ? 'once' : `${count} times`}, peaking at ${formatWithUnit(item, peak ?? 0)}.`,
    ];
  });

  return (
    <div
      id={summaryId}
      data-slot="time-series-summary"
      className={cn('text-sm', className)}
      {...props}
    >
      <p className="text-foreground">
        {`Showing ${formatTooltipTime(new Date(domain[0]))} – ${formatTooltipTime(new Date(domain[1]))}.`}
      </p>
      {insights.map((insight) => (
        <p key={insight} className="text-muted-foreground">
          {insight}
        </p>
      ))}
    </div>
  );
}

/** Pointer and keyboard hints. */
export function TimeSeriesKeyboardHints({
  className,
  ...props
}: ComponentProps<'p'>): ReactNode {
  return (
    <p
      className={cn(
        'flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground',
        className
      )}
      {...props}
    >
      <span>Drag to pan</span>
      <span>
        <Kbd>Ctrl</Kbd> / <Kbd>⌘</Kbd> + scroll to zoom
      </span>
      <span>Brush the overview to select a range</span>
      <span>
        <Kbd>←</Kbd> <Kbd>→</Kbd> to inspect
      </span>
    </p>
  );
}
