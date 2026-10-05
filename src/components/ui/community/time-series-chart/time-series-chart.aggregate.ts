import { bisector } from 'd3-array';

import type { TimeSeriesPoint } from './time-series-chart.data';

/**
 * One aggregated bucket — the same min / average / max shape Cognite Data
 * Fusion returns for datapoint aggregates.
 */
export interface TimeSeriesBucket {
  /** Bucket midpoint, epoch milliseconds. */
  t: number;
  min: number;
  max: number;
  average: number;
  count: number;
}

export interface AggregateResult {
  buckets: TimeSeriesBucket[];
  /** Raw points that fell inside the visible window. */
  rawCount: number;
  /** Milliseconds covered by each bucket; 0 when raw points are returned. */
  granularity: number;
}

const byTime = bisector<TimeSeriesPoint, number>((point) => point.t);

/**
 * Level-of-detail downsampling. Slices the visible window with a binary
 * search, then folds points into at most `maxBuckets` equal time buckets.
 * When the window holds fewer points than buckets, raw points come back
 * unchanged so zooming in reveals every reading.
 *
 * One neighbour on either side of the window is kept so lines run to the
 * plot edge instead of stopping at the first visible point.
 */
export function aggregateSeries(
  points: TimeSeriesPoint[],
  [start, end]: [number, number],
  maxBuckets: number
): AggregateResult {
  const from = Math.max(0, byTime.left(points, start) - 1);
  const to = Math.min(points.length, byTime.right(points, end) + 1);
  const visible = points.slice(from, to);
  const bucketCount = Math.max(1, Math.floor(maxBuckets));

  if (visible.length <= bucketCount) {
    return {
      buckets: visible.map(({ t, value }) => ({
        t,
        min: value,
        max: value,
        average: value,
        count: 1,
      })),
      rawCount: visible.length,
      granularity: 0,
    };
  }

  const first = visible[0]!.t;
  const span = Math.max(1, visible[visible.length - 1]!.t - first);
  const granularity = span / bucketCount;
  const buckets: TimeSeriesBucket[] = [];
  let current: TimeSeriesBucket | null = null;
  let currentIndex = -1;
  let sum = 0;

  for (const { t, value } of visible) {
    const index = Math.min(
      bucketCount - 1,
      Math.floor((t - first) / granularity)
    );
    if (index !== currentIndex) {
      if (current) {
        current.average = sum / current.count;
        buckets.push(current);
      }
      currentIndex = index;
      sum = 0;
      current = {
        t: first + (index + 0.5) * granularity,
        min: value,
        max: value,
        average: value,
        count: 0,
      };
    }
    current!.min = Math.min(current!.min, value);
    current!.max = Math.max(current!.max, value);
    current!.count += 1;
    sum += value;
  }

  if (current) {
    current.average = sum / current.count;
    buckets.push(current);
  }

  return { buckets, rawCount: visible.length, granularity };
}

const byBucketTime = bisector<TimeSeriesBucket, number>((bucket) => bucket.t);

/** The bucket closest to `t`, or undefined for an empty series. */
export function nearestBucket(
  buckets: TimeSeriesBucket[],
  t: number
): TimeSeriesBucket | undefined {
  if (buckets.length === 0) {
    return undefined;
  }
  return buckets[byBucketTime.center(buckets, t)];
}

export interface BreachSummary {
  /** Separate excursions above the threshold. */
  count: number;
  /** Highest raw value in the window. */
  peak: number | undefined;
}

/**
 * Counts raw-point excursions above `threshold` inside the window. Like an
 * alarm deadband, an excursion only ends once the value falls `hysteresis`
 * below the threshold, so sensor noise around the limit counts once.
 */
export function summarizeBreaches(
  points: TimeSeriesPoint[],
  [start, end]: [number, number],
  threshold: number,
  hysteresis = Math.abs(threshold) * 0.02
): BreachSummary {
  const from = byTime.left(points, start);
  const to = byTime.right(points, end);
  let count = 0;
  let above = false;
  let peak: number | undefined;

  for (let index = from; index < to; index += 1) {
    const { value } = points[index]!;
    peak = peak === undefined ? value : Math.max(peak, value);
    if (!above && value > threshold) {
      count += 1;
      above = true;
    } else if (above && value < threshold - hysteresis) {
      above = false;
    }
  }

  return { count, peak };
}
