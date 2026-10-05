/**
 * Sample sensor data for the time series chart: two weeks of one-minute
 * readings for three pump sensors, plus operational events. A seeded PRNG
 * keeps the data identical between renders, builds and test runs.
 */

export interface TimeSeriesPoint {
  /** Epoch milliseconds. */
  t: number;
  value: number;
}

export type SeriesColor = 'fjord' | 'nordic' | 'aurora' | 'dusk' | 'orange';

export interface TimeSeriesThreshold {
  value: number;
  label: string;
}

export interface TimeSeries {
  id: string;
  name: string;
  unit: string;
  color: SeriesColor;
  /** Decimal places used in tooltips and the latest-value label. */
  precision: number;
  points: TimeSeriesPoint[];
  threshold?: TimeSeriesThreshold;
}

export interface TimeSeriesEvent {
  id: string;
  label: string;
  start: number;
  /** Omit for a point-in-time event. */
  end?: number;
}

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export const sampleEnd = Date.UTC(2026, 8, 28, 0, 0);
export const sampleStart = sampleEnd - 14 * DAY;

const maintenanceStart = sampleEnd - 6 * DAY + 8 * HOUR;
const maintenanceEnd = maintenanceStart + 5 * HOUR;
const pumpTrip = sampleEnd - 2 * DAY - 3 * HOUR;

function mulberry32(seed: number): () => number {
  let state = seed;
  return () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface SignalOptions {
  seed: number;
  base: number;
  dailyAmplitude: number;
  noise: number;
  drift: number;
  /** Value while the pump is stopped (maintenance and after a trip). */
  offValue: number;
  /** Extra excursion during the hour before the pump trip. */
  surge?: number;
}

function generateSignal({
  seed,
  base,
  dailyAmplitude,
  noise,
  drift,
  offValue,
  surge = 0,
}: SignalOptions): TimeSeriesPoint[] {
  const random = mulberry32(seed);
  const points: TimeSeriesPoint[] = [];
  let walk = 0;

  for (let t = sampleStart; t <= sampleEnd; t += MINUTE) {
    walk = walk * 0.995 + (random() - 0.5) * drift;
    const phase = ((t % DAY) / DAY) * Math.PI * 2;
    let value =
      base +
      Math.sin(phase - Math.PI / 2) * dailyAmplitude +
      walk +
      (random() - 0.5) * noise;

    const minutesBeforeTrip = (pumpTrip - t) / MINUTE;
    if (minutesBeforeTrip > 0 && minutesBeforeTrip < 60) {
      value += surge * (1 - minutesBeforeTrip / 60);
    }

    const stopped =
      (t >= maintenanceStart && t < maintenanceEnd) ||
      (t >= pumpTrip && t < pumpTrip + 40 * MINUTE);
    if (stopped) {
      value = offValue + (random() - 0.5) * noise * 0.2;
    }

    points.push({ t, value });
  }

  return points;
}

export const sampleSeries: TimeSeries[] = [
  {
    id: 'discharge-pressure',
    name: 'Discharge pressure',
    unit: 'bar',
    color: 'fjord',
    precision: 1,
    threshold: { value: 46, label: 'High alarm' },
    points: generateSignal({
      seed: 7,
      base: 40,
      dailyAmplitude: 2.5,
      noise: 1.2,
      drift: 0.35,
      offValue: 1,
      surge: 9,
    }),
  },
  {
    id: 'flow-rate',
    name: 'Flow rate',
    unit: 'm³/h',
    color: 'nordic',
    precision: 0,
    points: generateSignal({
      seed: 21,
      base: 320,
      dailyAmplitude: 35,
      noise: 14,
      drift: 3,
      offValue: 0,
      surge: -60,
    }),
  },
  {
    id: 'bearing-temperature',
    name: 'Bearing temperature',
    unit: '°C',
    color: 'aurora',
    precision: 1,
    points: generateSignal({
      seed: 42,
      base: 68,
      dailyAmplitude: 3,
      noise: 0.8,
      drift: 0.2,
      offValue: 30,
      surge: 6,
    }),
  },
];

export const sampleEvents: TimeSeriesEvent[] = [
  {
    id: 'maintenance',
    label: 'Planned maintenance',
    start: maintenanceStart,
    end: maintenanceEnd,
  },
  { id: 'pump-trip', label: 'Pump trip', start: pumpTrip },
];
