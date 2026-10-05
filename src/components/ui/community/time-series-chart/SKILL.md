---
name: aura-d3-charts
description: Build or edit D3 charts that are fully compatible with the Aura design system — Aura chart, semantic and type tokens, light and dark themes, Aura components around the chart, Aura motion and content rules. Use for any D3 or custom SVG chart in an Aura app, especially when @cognite/aura/chart (Recharts) is not enough.
---

# Building D3 charts with Aura

Use this skill to make a D3 chart look and behave like it shipped with Aura:

- **Tokens only:** every color, type size, radius and motion value comes from Aura.
- **Every theme works:** the chart works in light, dark and runtime themes without extra code.
- **Aura chrome:** the controls around the chart are Aura components.

The reference implementation is the `@aura/time-series-chart` registry item:

```bash
pnpm dlx shadcn@latest add @aura/time-series-chart
```

## 1. Make sure the app is Aura-compatible

Aura chart tokens only exist when Aura's CSS is part of the Tailwind build. Check this first.

- **Apps:** `import '@cognite/aura/styles.css'` once, at the root.
- **Packages:** in your package stylesheet, `@import '@cognite/aura/styles.source.css';` and add `@source './';`. Don't add a `tailwind.config.js`. Aura uses Tailwind v4 CSS entry points.
- **Import paths:** import Aura through its package exports: `@cognite/aura/components`, `@cognite/aura/chart`, `@cognite/aura/utils`. Never use relative paths into Aura.
- **Merging classes:** merge `className` props with `cn` from `@cognite/aura/utils`.
- **Lint setup:** if the project runs `@shadcn/lint`, `no-raw-colors` only accepts tokens declared in the app's own stylesheet. Re-declare the `chart-*` tokens you use in its `@theme inline` block. Don't add `eslint-disable`.

  ```css
  @theme inline {
    --color-chart-gridlines: var(--chart-gridlines);
    --color-chart-neutral-color-6: var(--chart-neutral-color-6);
  }
  ```

Before you choose D3, check whether `@cognite/aura/chart` can do the job. It wraps Recharts with Aura's tooltip, legend and color config, and it fits most bar, line, area and pie charts. Use D3 when you need zoom, brushing, thousands of points, custom geometry or linked views.

## 2. Pick the right token group

Aura has three color groups. Each one has a single job, and you must never use one in place of another:

| Group          | Use it for                                                         | Example                               |
| -------------- | ------------------------------------------------------------------ | ------------------------------------- |
| `chart-*`      | Anything plotted: series, bands, gridlines, annotations, limits    | `stroke-chart-fjord-color-1`          |
| Semantic       | Chart chrome and UI status: text, surfaces, borders, focus, badges | `text-muted-foreground`, `bg-popover` |
| `decorative-*` | Visual variety that isn't data, such as tiles and avatars          | Not used inside a chart               |

### Chart ramps

| Ramp                                          | Use                                                               |
| --------------------------------------------- | ----------------------------------------------------------------- |
| `fjord`, `nordic`, `aurora`, `dusk`, `orange` | Series, assigned in this order                                    |
| `neutral`                                     | Annotations, event spans, the brush, context areas                |
| `info`, `success`, `warning`, `destructive`   | Data with a status meaning: limits, breaches, good and bad ranges |
| `chart-gridlines`                             | Gridlines (a single token, not a ramp)                            |

Each ramp has six steps, `chart-{ramp}-color-1` to `-6`, from strongest to lightest.

The steps are **alpha colors**. In light mode, step 1 is the ramp's alpha-450 and step 6 is alpha-50. Dark mode switches each step to a darker alpha of the same ramp. Because the steps are alpha, they mix with whatever surface sits behind them:

- **Layering:** draw lighter fills first and stronger strokes on top. A step-5 band sits under a step-1 line.
- **No extra opacity:** don't add `opacity`, `fill-opacity` or `/50`-style modifiers to chart tokens. The alpha is already tuned for both themes. If a fill is too strong, use a lighter step.
- **Overlaps:** overlapping alpha fills look darker where they overlap. Use that to show density, or avoid it by drawing each series in its own lane.

### Map each chart element to a token

| Element                         | Token classes                                                                                        |
| ------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Series line                     | `stroke-chart-{ramp}-color-1`                                                                        |
| Series marker or dot            | `fill-chart-{ramp}-color-1`, plus `stroke-card` as a halo                                            |
| Min/max band or area fill       | `fill-chart-{ramp}-color-5`                                                                          |
| Gradient area under a line      | `<linearGradient>` stops `var(--chart-{ramp}-color-4)` → `var(--chart-{ramp}-color-6)` → transparent |
| Legend or tooltip swatch        | `bg-chart-{ramp}-color-1`                                                                            |
| Gridlines                       | `stroke-chart-gridlines`                                                                             |
| Event span                      | `fill-chart-neutral-color-6`                                                                         |
| Point event line                | `stroke-chart-neutral-color-1`                                                                       |
| Brush selection                 | `fill-chart-neutral-color-5 stroke-chart-neutral-color-1`                                            |
| Limit or threshold line         | `stroke-chart-warning-color-1`                                                                       |
| Values past a limit             | `stroke-chart-destructive-color-1`                                                                   |
| Limit label                     | `fill-warning-foreground` (semantic text)                                                            |
| Axis ticks and secondary labels | `text-muted-foreground` on the group (d3 uses `currentColor`)                                        |
| Lane titles and value labels    | `fill-foreground`                                                                                    |
| Label halo over data            | `stroke-card` with `paintOrder="stroke"` and `strokeWidth={3}`                                       |
| Crosshair                       | `stroke-muted-foreground`                                                                            |
| Overview track                  | `fill-muted-background`                                                                              |
| Tooltip                         | `rounded-lg border bg-popover p-2 text-xs text-popover-foreground shadow-md`                         |
| Focus ring on the plot          | `outline-none focus-visible:ring-2 focus-visible:ring-ring`                                          |
| Hidden or disabled series       | `bg-disabled-foreground`                                                                             |

### Type, spacing and shape

- **Font:** inherit Aura's `font-sans` (Inter). Never set `font-family` on SVG text.
- **Sizes:** use `text-xs` for ticks, labels and tooltips. Use `font-medium` for emphasis such as lane titles and current values.
- **Numbers:** add `tabular-nums` to everything numeric, so values don't jitter as they change.
- **Surfaces:** put the chart in an Aura `Card`. Use `gap-3` between chart rows and `rounded-lg` or `rounded-xl` for chart surfaces.

### Motion

Aura has no motion tokens, but `DESIGN.md` defines the curves. Use them for D3 transitions too:

| Curve    | cubic-bezier             | Use in charts                      |
| -------- | ------------------------ | ---------------------------------- |
| Standard | `0.40, 0.00, 0.15, 1.00` | Zooming or panning to a new window |
| Entrance | `0.00, 0.00, 0.15, 1.00` | Series or markers appearing        |
| Exit     | `0.67, 0.00, 0.83, 0.83` | Series leaving                     |
| Sine     | `0.33, 0.00, 0.67, 1.00` | Opacity and color fades            |

- **Durations:** keep them between 150 and 300 ms. Never overshoot or bounce.
- **Reduced motion:** skip transitions entirely when `prefers-reduced-motion: reduce` is set.
- **Easing in D3:** `d3-ease` has no cubic-bezier. Use a small solver, like `auraMotion` in `time-series-chart.tokens.ts`:

  ```ts
  selection.transition().duration(auraMotion.duration).ease(auraMotion.standardEase).call(zoomBehavior.transform, transform);
  ```

### Content

These rules come from Aura's content guidelines:

- **Numbers and units:** always use numerals, and join a value to its unit with a no-break space: `41.3 bar`.
- **Dates:** keep dates short, for example `Tue Sep 22, 17:45`. Don't use ordinals.
- **Descriptions:** describe a chart by its meaning, not its shape. Write "Discharge pressure crossed the high alarm twice", not "a blue line goes up".

## 3. Apply tokens in D3 code

Tailwind only generates classes it can find written out in full in your source. Build a static map from ramp to classes:

```ts
export const seriesTokens = {
  fjord: {
    line: "stroke-chart-fjord-color-1",
    band: "fill-chart-fjord-color-5",
    marker: "fill-chart-fjord-color-1",
    swatch: "bg-chart-fjord-color-1",
  },
  nordic: {
    line: "stroke-chart-nordic-color-1",
    band: "fill-chart-nordic-color-5",
    // …
  },
} as const;
```

Never build class names at runtime, for example `` `stroke-chart-${ramp}-color-1` ``.

How you apply tokens depends on who renders the element:

- **React renders the element:** pass the token class as `className`.

  ```tsx
  <path d={line(data)} fill="none" className={seriesTokens[ramp].line} />
  ```

- **D3 renders the element** (axes, brush): set classes and clear the presentation attributes D3 writes. Classes beat presentation attributes, but `fill-opacity`, `font-size` and `font-family` still need clearing:

  ```ts
  select(axisGroup).call(axisBottom(x)).attr("font-size", null).attr("font-family", null); // let text-xs / font-sans apply

  select(brushGroup).call(brush).select(".selection").attr("fill-opacity", null).attr("stroke", null).attr("class", "selection fill-chart-neutral-color-5 stroke-chart-neutral-color-1");
  ```

- **An SVG attribute needs a color,** such as a gradient `stop` or a marker: use the CSS variable, for example `stopColor="var(--chart-fjord-color-1)"`. It still switches with the theme.
- **Gradient fills (shadcn-style area charts):** define a vertical `<linearGradient>` with stops from your token map, such as `gradient: { from: 'var(--chart-fjord-color-4)', to: 'var(--chart-fjord-color-6)' }`. Fill the area with `fill="url(#id)"`. Fade to transparent with `stopOpacity={0}` on the last stop only. Don't lower the opacity of the token stops; pick a lighter step instead. Give each gradient a unique id, for example from `useId()` plus the series id.

  ```tsx
  <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
    <stop offset="5%" stopColor={tokens.gradient.from} />
    <stop offset="60%" stopColor={tokens.gradient.to} />
    <stop offset="100%" stopColor={tokens.gradient.to} stopOpacity={0} />
  </linearGradient>
  ```

- **Canvas or color interpolation needs a resolved value:** read it with `getComputedStyle(element).getPropertyValue('--chart-fjord-color-1')`. Read it again whenever the theme changes, by watching `class` and `style` on `<html>`. Runtime theming such as `#theme=` URLs and `aura-set-theme` messages swaps variables at any time, so never cache the value as a constant.

Never use these:

- Hex, `rgb()` or `hsl()` literals
- `d3-scale-chromatic` and `schemeCategory10`
- Tailwind palette colors such as `blue-500`
- Opacity modifiers on chart tokens
- Inline `style` (`@shadcn/lint` blocks it). Position things with SVG attributes such as `x`, `y` and `transform`, or with `<foreignObject>` for HTML tooltips.

## 4. Use Aura components around the chart

Build all the HTML around the plot from Aura components. Don't hand-roll buttons or toggles.

| Need                          | Aura component                                                                                             |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Container, title, description | `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`                          |
| Range presets                 | `SegmentedControl` with `SegmentedControlList size="small"`. Pass `null` as the value for a custom window. |
| Icon actions (reset zoom)     | `Button variant="outline" size="icon-sm"` with an `aria-label`                                             |
| Legend that toggles series    | `Toggle variant="outline" size="sm"` per series, with a token swatch inside                                |
| Status, resolution            | `Badge variant="secondary"`                                                                                |
| Keyboard hints                | `Kbd`                                                                                                      |
| Standard charts               | `ChartContainer` and friends from `@cognite/aura/chart`                                                    |

## 5. Structure: composable parts

Follow the shadcn pattern. Ship small parts that share state through context, not one component with dozens of props:

```tsx
<TimeSeriesChart series={series} events={events}>
  <TimeSeriesPlot aria-label="Pump telemetry">
    <TimeSeriesEvents />
    <TimeSeriesLanes>
      <TimeSeriesGrid />
      <TimeSeriesYAxis />
      <TimeSeriesBand />
      <TimeSeriesLine />
      <TimeSeriesThreshold />
    </TimeSeriesLanes>
    <TimeSeriesXAxis />
    <TimeSeriesCrosshair />
    <TimeSeriesTooltip />
  </TimeSeriesPlot>
  <TimeSeriesOverview />
</TimeSeriesChart>
```

- **Root:** the root owns the data, the zoom domain, the hover time, visibility and the layout. It exposes them with a hook such as `useTimeSeriesChart()`.
- **Repeaters:** a repeater like `TimeSeriesLanes` renders its children once per series, inside a lane context (`useTimeSeriesLane()`).
- **Layers:** each layer draws one thing. JSX order is the z-order.
- **Styling:** every part takes `className` and merges it with `cn`.
- **Examples:** write each example inline from the parts. Don't hide a composition inside a wrapper component.

## 6. Split the work between D3 and React

| Job                                   | Owner                                                     |
| ------------------------------------- | --------------------------------------------------------- |
| Scales, paths, bisecting, aggregation | D3 as pure functions (`d3-scale`, `d3-shape`, `d3-array`) |
| SVG elements and HTML tooltips        | React JSX, with token classes                             |
| Axis ticks                            | `d3-axis` inside a React-owned `<g ref>`                  |
| Zoom, pan, brush and transitions      | `d3-zoom`, `d3-brush`, `d3-transition` on refs            |

Import only the D3 modules you use. Don't install the `d3` bundle. For the interaction patterns, read the reference source:

- **Zoom (`time-series-chart.hooks.ts`):** zoom is the single source of truth for the visible domain. Wheel zoom only works with Ctrl or ⌘ held.
- **Brush (`time-series-overview.tsx`):** the brush is synced to the zoom, with a `sourceEvent` check that stops them updating each other in a loop.
- **Level of detail (`time-series-chart.aggregate.ts`):** downsampling keeps min, average and max at about one bucket per 2 px.

## 7. Accessibility

Aura requires a text alternative for every chart.

- **Focus:** make the plot a focusable `role="group"` with an `aria-label` that names the chart and its keys. Give the SVG `aria-hidden`.
- **Keyboard:** support arrow keys to inspect, Shift + arrows to pan, + and − to zoom, 0 to reset and Escape to clear.
- **Announcements:** read inspected values out in an `aria-live="polite"` region.
- **Summary:** write a visible summary of the key insight and point to it with `aria-describedby`.
- **Color is never the only signal:** a limit is a dashed line with a text label, not just a color change.

## 8. Verify compatibility

1. **Search for raw color values.** This should print nothing:

   ```bash
   grep -rnE --include='*.ts' --include='*.tsx' "#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(|scheme[A-Z]|interpolate[A-Z]" src/components/ui/community/<your-chart>/
   ```

2. **Check both themes.** In Storybook, switch the theme toolbar between light and dark. The series, bands, gridlines, tooltip and labels should all change, and nothing should stay a fixed color.
3. **Run `pnpm lint`.** The `@shadcn/lint` rules `no-raw-colors`, `no-inline-styles`, `no-unknown-classes` and `no-arbitrary-values` must pass with no disables.
4. **Run the play tests:** `pnpm test:storybook:ci <name>`. In tests, fire `pointerOut` rather than `pointerLeave` (React builds `onPointerLeave` from `pointerout`), and pass `view: window` to D3 brush mouse events.

### Checklist

- [ ] Aura CSS is in the build, and imports use `@cognite/aura/*` package exports.
- [ ] Plotted marks use `chart-*` tokens. Chrome uses semantic tokens. No `decorative-*` inside the plot.
- [ ] Token classes come from a static map, with no extra opacity, hex values or D3 color schemes.
- [ ] Classes set by D3 replace its presentation attributes, and `font-size` and `font-family` are cleared.
- [ ] Text uses `text-xs` and `tabular-nums` for numbers, and units are joined with a no-break space.
- [ ] Transitions use Aura curves, last 150–300 ms and respect reduced motion.
- [ ] The surrounding UI uses Aura components.
- [ ] The chart is built from composable parts, and the examples compose them inline.
- [ ] Keyboard, live region and visible summary are in place.
- [ ] Light and dark themes are checked, and `pnpm lint` passes.
