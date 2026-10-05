import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardHeaderEnd,
  CardHeaderStart,
  CardTitle,
} from '@cognite/aura/components';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fireEvent, userEvent, waitFor, within } from 'storybook/test';

import {
  TimeSeriesBand,
  TimeSeriesChart,
  TimeSeriesCrosshair,
  TimeSeriesEvents,
  TimeSeriesGrid,
  TimeSeriesHoverMarker,
  TimeSeriesKeyboardHints,
  TimeSeriesLaneLabel,
  TimeSeriesLanes,
  TimeSeriesLatestValue,
  TimeSeriesLegend,
  TimeSeriesLine,
  TimeSeriesOverview,
  TimeSeriesPlot,
  TimeSeriesRangePresets,
  TimeSeriesResetZoom,
  TimeSeriesResolution,
  TimeSeriesSummary,
  TimeSeriesThreshold,
  TimeSeriesTooltip,
  TimeSeriesXAxis,
  TimeSeriesYAxis,
} from './time-series-chart';
import { sampleEvents, sampleSeries } from './time-series-chart.data';

const meta: Meta<typeof TimeSeriesChart> = {
  title: 'Community/Time Series Chart',
  component: TimeSeriesChart,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj<typeof TimeSeriesChart>;

function getResolution(canvasElement: HTMLElement): string {
  return (
    canvasElement.querySelector('[data-slot="time-series-resolution"]')
      ?.textContent ?? ''
  );
}

export const Basic: Story = {
  parameters: { order: 1 },
  render: () => (
    <TimeSeriesChart series={sampleSeries} events={sampleEvents}>
      <Card>
        <CardHeader className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-start sm:justify-between">
          <CardHeaderStart className="h-auto min-w-0">
            <div className="flex min-w-0 flex-col gap-1">
              <CardTitle>Pump P-101 telemetry</CardTitle>
              <CardDescription>
                One-minute sensor readings, downsampled to min / average / max
                for the visible window.
              </CardDescription>
            </div>
          </CardHeaderStart>
          <CardHeaderEnd className="flex items-center gap-2">
            <TimeSeriesRangePresets />
            <TimeSeriesResetZoom />
          </CardHeaderEnd>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <TimeSeriesLegend />
            <TimeSeriesResolution />
          </div>
          <TimeSeriesPlot aria-label="Pump P-101 telemetry">
            <TimeSeriesEvents />
            <TimeSeriesLanes>
              <TimeSeriesLaneLabel />
              <TimeSeriesGrid />
              <TimeSeriesYAxis />
              <TimeSeriesBand />
              <TimeSeriesLine />
              <TimeSeriesThreshold />
              <TimeSeriesLatestValue />
              <TimeSeriesHoverMarker />
            </TimeSeriesLanes>
            <TimeSeriesXAxis />
            <TimeSeriesCrosshair />
            <TimeSeriesTooltip />
          </TimeSeriesPlot>
          <TimeSeriesOverview />
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2">
          <TimeSeriesSummary />
          <TimeSeriesKeyboardHints />
        </CardFooter>
      </Card>
    </TimeSeriesChart>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('renders one lane per series with aggregated data', async () => {
      expect(canvas.getByText('Pump P-101 telemetry')).toBeVisible();
      await waitFor(() =>
        expect(
          canvasElement.querySelectorAll('[data-slot="time-series-lane"]')
        ).toHaveLength(3)
      );
      expect(getResolution(canvasElement)).toMatch(/1 point ≈/);
      expect(canvas.getByRole('button', { name: 'Reset zoom' })).toBeDisabled();
      expect(
        canvas.getByText(/Discharge pressure crossed the high alarm/)
      ).toBeVisible();
    });

    await step('a range preset zooms in and enables reset', async () => {
      await userEvent.click(canvas.getByRole('tab', { name: '24h' }));
      await waitFor(() =>
        expect(canvas.getByRole('button', { name: 'Reset zoom' })).toBeEnabled()
      );
      await waitFor(() =>
        expect(canvas.getByRole('tab', { name: '24h' })).toHaveAttribute(
          'aria-selected',
          'true'
        )
      );
    });

    await step('hovering shows a multi-series tooltip', async () => {
      const target = canvasElement.querySelector<SVGRectElement>(
        '[data-slot="time-series-zoom-target"]'
      )!;
      const box = target.getBoundingClientRect();
      fireEvent.pointerMove(target, {
        clientX: box.left + box.width / 2,
        clientY: box.top + 20,
      });
      const tooltip = await waitFor(() => {
        const element = canvasElement.querySelector(
          '[data-slot="time-series-tooltip"]'
        );
        expect(element).not.toBeNull();
        return element as HTMLElement;
      });
      const rows = within(tooltip);
      expect(rows.getByText('Discharge pressure')).toBeInTheDocument();
      expect(rows.getByText('Flow rate')).toBeInTheDocument();
      expect(rows.getByText('Bearing temperature')).toBeInTheDocument();
      // React derives onPointerLeave from pointerout.
      fireEvent.pointerOut(target);
      await waitFor(() =>
        expect(
          canvasElement.querySelector('[data-slot="time-series-tooltip"]')
        ).toBeNull()
      );
    });

    await step('reset returns to the full range', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'Reset zoom' }));
      await waitFor(() =>
        expect(
          canvas.getByRole('button', { name: 'Reset zoom' })
        ).toBeDisabled()
      );
    });
  },
};

export const WithLegend: Story = {
  parameters: { order: 3 },
  render: () => (
    <TimeSeriesChart
      series={sampleSeries}
      laneHeight={80}
      className="flex flex-col gap-3 rounded-xl border p-4"
    >
      <TimeSeriesLegend />
      <TimeSeriesPlot aria-label="Pump sensors">
        <TimeSeriesLanes>
          <TimeSeriesLaneLabel />
          <TimeSeriesGrid />
          <TimeSeriesYAxis />
          <TimeSeriesLine />
        </TimeSeriesLanes>
        <TimeSeriesXAxis />
      </TimeSeriesPlot>
    </TimeSeriesChart>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const lanes = () =>
      canvasElement.querySelectorAll('[data-slot="time-series-lane"]');

    await waitFor(() => expect(lanes()).toHaveLength(3));

    const flow = canvas.getByRole('button', { name: 'Flow rate' });
    expect(flow).toHaveAttribute('aria-pressed', 'true');
    await userEvent.click(flow);
    await waitFor(() => expect(lanes()).toHaveLength(2));
    expect(flow).toHaveAttribute('aria-pressed', 'false');

    await userEvent.click(
      canvas.getByRole('button', { name: 'Bearing temperature' })
    );
    await waitFor(() => expect(lanes()).toHaveLength(1));
    // The last visible series can't be hidden.
    expect(
      canvas.getByRole('button', { name: 'Discharge pressure' })
    ).toBeDisabled();

    await userEvent.click(flow);
    await waitFor(() => expect(lanes()).toHaveLength(2));
  },
};

export const KeyboardNavigation: Story = {
  parameters: { order: 5 },
  render: () => (
    <TimeSeriesChart
      series={sampleSeries}
      laneHeight={80}
      className="flex flex-col gap-3 rounded-xl border p-4"
    >
      <div className="flex items-center justify-between gap-2">
        <TimeSeriesResolution />
        <TimeSeriesResetZoom />
      </div>
      <TimeSeriesPlot aria-label="Pump P-101 telemetry">
        <TimeSeriesLanes>
          <TimeSeriesLaneLabel />
          <TimeSeriesGrid />
          <TimeSeriesYAxis />
          <TimeSeriesBand />
          <TimeSeriesLine />
          <TimeSeriesHoverMarker />
        </TimeSeriesLanes>
        <TimeSeriesXAxis />
        <TimeSeriesCrosshair />
        <TimeSeriesTooltip />
      </TimeSeriesPlot>
      <TimeSeriesKeyboardHints />
    </TimeSeriesChart>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const chart = canvas.getByRole('group', {
      name: /Pump P-101 telemetry\. Use arrow keys/,
    });
    await waitFor(() =>
      expect(
        canvasElement.querySelectorAll('[data-slot="time-series-lane"]')
      ).toHaveLength(3)
    );
    const before = getResolution(canvasElement);

    chart.focus();
    await userEvent.keyboard('{End}');
    await waitFor(() =>
      expect(
        canvasElement.querySelector('[data-slot="time-series-tooltip"]')
      ).not.toBeNull()
    );
    expect(
      canvasElement.querySelector('[aria-live="polite"]')
    ).toHaveTextContent(
      /Discharge pressure .* bar, Flow rate .* m³\/h, Bearing temperature .* °C\./
    );

    await userEvent.keyboard('{ArrowLeft}{ArrowLeft}');
    await userEvent.keyboard('+');
    await waitFor(() =>
      expect(canvas.getByRole('button', { name: 'Reset zoom' })).toBeEnabled()
    );
    await waitFor(() => expect(getResolution(canvasElement)).not.toBe(before));

    await userEvent.keyboard('{Shift>}{ArrowLeft}{/Shift}');
    await userEvent.keyboard('0');
    await waitFor(() =>
      expect(canvas.getByRole('button', { name: 'Reset zoom' })).toBeDisabled()
    );

    await userEvent.keyboard('{Escape}');
    await waitFor(() =>
      expect(
        canvasElement.querySelector('[data-slot="time-series-tooltip"]')
      ).toBeNull()
    );
  },
};

export const ZoomAndBrush: Story = {
  parameters: { order: 4 },
  render: () => (
    <TimeSeriesChart
      series={sampleSeries.slice(1, 2)}
      laneHeight={180}
      className="flex flex-col gap-3 rounded-xl border p-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <TimeSeriesResolution />
        <div className="flex items-center gap-2">
          <TimeSeriesRangePresets />
          <TimeSeriesResetZoom />
        </div>
      </div>
      <TimeSeriesPlot aria-label="Flow rate">
        <TimeSeriesLanes>
          <TimeSeriesLaneLabel />
          <TimeSeriesGrid />
          <TimeSeriesYAxis />
          <TimeSeriesBand />
          <TimeSeriesLine />
        </TimeSeriesLanes>
        <TimeSeriesXAxis />
      </TimeSeriesPlot>
      <TimeSeriesOverview />
    </TimeSeriesChart>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const overlay = await waitFor(() => {
      const element = canvasElement.querySelector<SVGRectElement>(
        '[data-slot="time-series-brush"] .overlay'
      );
      expect(element).not.toBeNull();
      return element!;
    });
    const box = overlay.getBoundingClientRect();
    const y = box.top + box.height / 2;
    const view = overlay.ownerDocument.defaultView!;

    // d3-brush listens for mousedown on the overlay, then mousemove/mouseup
    // on the window.
    fireEvent.mouseDown(overlay, {
      clientX: box.left + box.width * 0.2,
      clientY: y,
      view,
    });
    fireEvent.mouseMove(view, {
      clientX: box.left + box.width * 0.4,
      clientY: y,
      view,
    });
    fireEvent.mouseUp(view, {
      clientX: box.left + box.width * 0.4,
      clientY: y,
      view,
    });

    await waitFor(() =>
      expect(canvas.getByRole('button', { name: 'Reset zoom' })).toBeEnabled()
    );
    // A brushed window doesn't match a preset.
    for (const name of ['24h', '7d', 'All']) {
      expect(canvas.getByRole('tab', { name })).toHaveAttribute(
        'aria-selected',
        'false'
      );
    }
  },
};

export const Minimal: Story = {
  parameters: { order: 2 },
  render: () => (
    <TimeSeriesChart
      series={sampleSeries.slice(2)}
      laneHeight={160}
      className="rounded-xl border p-4"
    >
      <TimeSeriesPlot aria-label="Bearing temperature">
        <TimeSeriesLanes>
          <TimeSeriesLaneLabel />
          <TimeSeriesGrid />
          <TimeSeriesYAxis />
          <TimeSeriesLine />
          <TimeSeriesHoverMarker />
        </TimeSeriesLanes>
        <TimeSeriesXAxis />
        <TimeSeriesCrosshair />
        <TimeSeriesTooltip />
      </TimeSeriesPlot>
    </TimeSeriesChart>
  ),
  play: async ({ canvasElement }) => {
    await waitFor(() =>
      expect(
        canvasElement.querySelectorAll('[data-slot="time-series-lane"]')
      ).toHaveLength(1)
    );
    // Only the parts that were composed render.
    for (const slot of [
      'events',
      'threshold',
      'latest',
      'overview',
      'legend',
    ]) {
      expect(
        canvasElement.querySelector(`[data-slot="time-series-${slot}"]`)
      ).toBeNull();
    }
    expect(canvasElement.querySelector('path[clip-path]')).not.toBeNull();
  },
};

export const ThresholdsAndEvents: Story = {
  parameters: { order: 6 },
  render: () => (
    <TimeSeriesChart
      series={sampleSeries.slice(0, 1)}
      events={sampleEvents}
      laneHeight={180}
      className="flex flex-col gap-3 rounded-xl border p-4"
    >
      <TimeSeriesPlot aria-label="Discharge pressure">
        <TimeSeriesEvents />
        <TimeSeriesLanes>
          <TimeSeriesLaneLabel />
          <TimeSeriesGrid />
          <TimeSeriesYAxis />
          <TimeSeriesLine />
          <TimeSeriesThreshold />
          <TimeSeriesLatestValue />
        </TimeSeriesLanes>
        <TimeSeriesXAxis />
      </TimeSeriesPlot>
      <TimeSeriesSummary />
    </TimeSeriesChart>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await waitFor(() =>
      expect(
        canvasElement.querySelectorAll('[data-slot="time-series-event"]')
      ).toHaveLength(2)
    );
    expect(
      canvasElement.querySelector('[data-slot="time-series-threshold"]')
    ).not.toBeNull();
    expect(
      canvasElement.querySelector('[data-slot="time-series-latest"]')
    ).not.toBeNull();
    expect(canvas.getByText(/High alarm 46\.0/)).toBeInTheDocument();
    expect(
      canvas.getByText(/Discharge pressure crossed the high alarm/)
    ).toBeVisible();
    // The plot is described by the composed summary.
    const plot = canvas.getByRole('group', { name: /Discharge pressure\./ });
    const summary = canvasElement.querySelector(
      '[data-slot="time-series-summary"]'
    )!;
    expect(plot).toHaveAttribute('aria-describedby', summary.id);
  },
};
