import type { ChartConfig } from "@/components/ui/aura/chart";

export const sharedChartConfig = {
  slice1: {
    label: "unit",
    color: "var(--color-chart-fjord-opacity-4)",
  },
  slice2: {
    label: "unit",
    color: "var(--color-chart-fjord-opacity-3)",
  },
  slice3: {
    label: "unit",
    color: "var(--color-chart-fjord-opacity-2)",
  },
  slice4: {
    label: "unit",
    color: "var(--color-chart-fjord-opacity-1)",
  },
  slice5: {
    label: "unit",
    color: "var(--color-chart-fjord-solid)",
  },
} satisfies ChartConfig;

export const sharedChartData = [
  {
    id: "slice1",
    value: 225,
    fill: "var(--color-slice1)",
  },
  {
    id: "slice2",
    value: 225,
    fill: "var(--color-slice2)",
  },
  {
    id: "slice3",
    value: 225,
    fill: "var(--color-slice3)",
  },
  {
    id: "slice4",
    value: 225,
    fill: "var(--color-slice4)",
  },
  {
    id: "slice5",
    value: 225,
    fill: "var(--color-slice5)",
  },
];

export const areaChartConfig = {
  r401: {
    label: "R401",
    color: "rgba(47, 85, 234, 0.8)",
  },
  r402: {
    label: "R402",
    color: "rgba(47, 85, 234, 0.5)",
  },
} satisfies ChartConfig;

export const areaChartData = [
  {
    time: "02:00",
    r401: 280,
    r402: 120,
  },
  {
    time: "06:00",
    r401: 300,
    r402: 140,
  },
  {
    time: "10:00",
    r401: 350,
    r402: 160,
  },
  {
    time: "14:00",
    r401: 320,
    r402: 150,
  },
  {
    time: "18:00",
    r401: 290,
    r402: 130,
  },
  {
    time: "22:00",
    r401: 310,
    r402: 145,
  },
];

export const lineChartConfig = {
  strong: {
    label: "Primary",
    color: "rgba(47, 85, 234, 0.8)",
  },
  muted: {
    label: "Secondary",
    color: "rgba(47, 85, 234, 0.5)",
  },
} satisfies ChartConfig;

export const lineChartData = [
  {
    date: "Apr 1",
    strong: 40,
    muted: 80,
  },
  {
    date: "",
    strong: 120,
    muted: 100,
  },
  {
    date: "Apr 7",
    strong: 180,
    muted: 90,
  },
  {
    date: "",
    strong: 280,
    muted: 140,
  },
  {
    date: "Apr 14",
    strong: 160,
    muted: 180,
  },
  {
    date: "",
    strong: 220,
    muted: 160,
  },
  {
    date: "Apr 21",
    strong: 320,
    muted: 120,
  },
  {
    date: "",
    strong: 260,
    muted: 140,
  },
  {
    date: "Apr 30",
    strong: 200,
    muted: 160,
  },
];

export const barChartConfig = {
  value: {
    label: "Count",
    color: "url(#barGradient)",
  },
} satisfies ChartConfig;

export const barChartData = [
  {
    name: "Assets",
    value: 106,
  },
  {
    name: "Files",
    value: 305,
  },
  {
    name: "Events",
    value: 237,
  },
  {
    name: "Work orders",
    value: 73,
  },
  {
    name: "Time series",
    value: 209,
  },
];

export type RadialRingDatum = {
  name: string;
  fill: string;
  arcPercent: number;
};

export const radialRingData: RadialRingDatum[] = [
  {
    name: "ring5",
    fill: "var(--color-chart-fjord-opacity-4)",
    arcPercent: 50,
  },
  {
    name: "ring4",
    fill: "var(--color-chart-fjord-opacity-3)",
    arcPercent: 72,
  },
  {
    name: "ring3",
    fill: "var(--color-chart-fjord-opacity-2)",
    arcPercent: 65,
  },
  {
    name: "ring2",
    fill: "var(--color-chart-fjord-opacity-1)",
    arcPercent: 76,
  },
  {
    name: "ring1",
    fill: "var(--color-chart-fjord-solid)",
    arcPercent: 100,
  },
];
