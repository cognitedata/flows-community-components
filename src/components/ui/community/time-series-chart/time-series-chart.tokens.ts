import type { SeriesColor } from './time-series-chart.data';

/**
 * Aura chart tokens per series ramp. Classes are written out in full so
 * Tailwind can see them — never build `stroke-chart-${ramp}-color-1` at
 * runtime. Step 1 is the strongest tone (lines, markers); step 5 is a
 * light alpha fill (min/max bands).
 */
export const seriesTokens: Record<
  SeriesColor,
  { line: string; band: string; marker: string; swatch: string }
> = {
  fjord: {
    line: 'stroke-chart-fjord-color-1',
    band: 'fill-chart-fjord-color-5',
    marker: 'fill-chart-fjord-color-1',
    swatch: 'bg-chart-fjord-color-1',
  },
  nordic: {
    line: 'stroke-chart-nordic-color-1',
    band: 'fill-chart-nordic-color-5',
    marker: 'fill-chart-nordic-color-1',
    swatch: 'bg-chart-nordic-color-1',
  },
  aurora: {
    line: 'stroke-chart-aurora-color-1',
    band: 'fill-chart-aurora-color-5',
    marker: 'fill-chart-aurora-color-1',
    swatch: 'bg-chart-aurora-color-1',
  },
  dusk: {
    line: 'stroke-chart-dusk-color-1',
    band: 'fill-chart-dusk-color-5',
    marker: 'fill-chart-dusk-color-1',
    swatch: 'bg-chart-dusk-color-1',
  },
  orange: {
    line: 'stroke-chart-orange-color-1',
    band: 'fill-chart-orange-color-5',
    marker: 'fill-chart-orange-color-1',
    swatch: 'bg-chart-orange-color-1',
  },
};

/**
 * CSS-style cubic-bezier as a d3 easing function (t in [0, 1]). Aura has no
 * motion tokens, but DESIGN.md defines the curves; use them for d3
 * transitions so charts move like the rest of the UI.
 */
function cubicBezier(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): (t: number) => number {
  const sample = (a: number, b: number, t: number) =>
    3 * a * (1 - t) ** 2 * t + 3 * b * (1 - t) * t ** 2 + t ** 3;
  return (x) => {
    if (x <= 0 || x >= 1) {
      return x;
    }
    // Bisect for the curve parameter whose x matches, then return its y.
    let low = 0;
    let high = 1;
    let t = x;
    for (let index = 0; index < 20; index += 1) {
      const current = sample(x1, x2, t);
      if (Math.abs(current - x) < 1e-5) {
        break;
      }
      if (current < x) {
        low = t;
      } else {
        high = t;
      }
      t = (low + high) / 2;
    }
    return sample(y1, y2, t);
  };
}

/** Aura motion: Standard easing and duration for repositioning. */
export const auraMotion = {
  standardEase: cubicBezier(0.4, 0, 0.15, 1),
  duration: 300,
};
