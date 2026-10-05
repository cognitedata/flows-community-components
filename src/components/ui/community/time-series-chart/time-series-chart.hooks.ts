import { scaleTime } from 'd3-scale';
import { select } from 'd3-selection';
import 'd3-transition';
import { zoom, zoomIdentity, type ZoomBehavior } from 'd3-zoom';
import { useCallback, useEffect, useRef, useState } from 'react';

import { auraMotion } from './time-series-chart.tokens';

export type TimeDomain = [number, number];

/**
 * Width of an element, kept in sync with a ResizeObserver. Takes the element
 * itself (from a callback ref) so it re-subscribes when the node changes.
 */
export function useElementWidth(element: Element | null): number {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!element) {
      setWidth(0);
      return;
    }
    const observer = new ResizeObserver(([entry]) => {
      if (entry) {
        setWidth(Math.floor(entry.contentRect.width));
      }
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [element]);

  return width;
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

interface UseTimeZoomOptions {
  fullDomain: TimeDomain;
  /** Plot width in pixels, excluding axis margins. */
  width: number;
  /** Plot height in pixels; used as the zoom extent. */
  height: number;
  /** Narrowest window people can zoom to, in milliseconds. */
  minSpan: number;
}

/**
 * Owns the visible time window with d3-zoom. The zoom transform is the single
 * source of truth: drag, Ctrl/⌘ + wheel, pinch, double-click, the overview
 * brush and the range presets all end up calling `zoom.transform`, and every
 * zoom event writes the rescaled domain back to React state.
 *
 * Attach `targetRef` to the element that should receive pointer gestures
 * (usually a transparent rect over the plot).
 */
export function useTimeZoom<T extends Element>({
  fullDomain,
  width,
  height,
  minSpan,
}: UseTimeZoomOptions) {
  const targetRef = useRef<T>(null);
  const zoomRef = useRef<ZoomBehavior<T, unknown> | null>(null);
  const [domain, setDomain] = useState<TimeDomain>(fullDomain);
  // Mirrors `domain` for callbacks and the resize effect without making
  // them re-subscribe on every zoom frame.
  const domainRef = useRef(domain);

  const [fullStart, fullEnd] = fullDomain;

  const clampDomain = useCallback(
    ([start, end]: TimeDomain): TimeDomain => {
      const fullSpan = fullEnd - fullStart;
      const span = Math.min(fullSpan, Math.max(minSpan, end - start));
      const center = (start + end) / 2;
      const clampedStart = Math.min(
        fullEnd - span,
        Math.max(fullStart, center - span / 2)
      );
      return [clampedStart, clampedStart + span];
    },
    [fullStart, fullEnd, minSpan]
  );

  const transformFor = useCallback(
    (target: TimeDomain) => {
      const base = scaleTime().domain([fullStart, fullEnd]).range([0, width]);
      const [start, end] = clampDomain(target);
      const k = width / Math.max(1, base(end) - base(start));
      return zoomIdentity.scale(k).translate(-base(start), 0);
    },
    [clampDomain, fullStart, fullEnd, width]
  );

  useEffect(() => {
    const target = targetRef.current;
    if (!target || width <= 0) {
      return;
    }
    const base = scaleTime().domain([fullStart, fullEnd]).range([0, width]);
    const behavior = zoom<T, unknown>()
      .scaleExtent([1, (fullEnd - fullStart) / minSpan])
      .extent([
        [0, 0],
        [width, height],
      ])
      .translateExtent([
        [0, 0],
        [width, height],
      ])
      // Plain wheel scrolls the page; Ctrl/⌘ + wheel (and trackpad pinch,
      // which sets ctrlKey) zooms. Drag, touch and double-click still pan
      // and zoom as usual.
      .filter((event: Event) => {
        if (event.type === 'wheel') {
          const wheel = event as WheelEvent;
          return wheel.ctrlKey || wheel.metaKey;
        }
        const mouse = event as MouseEvent;
        return !mouse.ctrlKey && !mouse.button;
      })
      .on('zoom', (event: { transform: typeof zoomIdentity }) => {
        const [start, end] = event.transform.rescaleX(base).domain();
        const next: TimeDomain = [+start!, +end!];
        domainRef.current = next;
        setDomain(next);
      });

    const selection = select(target).call(behavior);
    // Re-apply the current window after a resize so the transform keeps
    // pointing at the same time range.
    selection.call(behavior.transform, transformFor(domainRef.current));
    zoomRef.current = behavior;

    return () => {
      selection.on('.zoom', null);
      zoomRef.current = null;
    };
  }, [fullStart, fullEnd, width, height, minSpan, transformFor]);

  const zoomTo = useCallback(
    (target: TimeDomain, { animate = true }: { animate?: boolean } = {}) => {
      const element = targetRef.current;
      const behavior = zoomRef.current;
      if (!element || !behavior) {
        return;
      }
      const transform = transformFor(target);
      const selection = select(element);
      if (animate && !prefersReducedMotion()) {
        selection
          .transition()
          .duration(auraMotion.duration)
          .ease(auraMotion.standardEase)
          .call(behavior.transform, transform);
      } else {
        selection.interrupt().call(behavior.transform, transform);
      }
    },
    [transformFor]
  );

  /** Zoom by `factor` (> 1 zooms in) around `anchor`, default the center. */
  const zoomBy = useCallback(
    (factor: number, anchor?: number) => {
      const [start, end] = domainRef.current;
      const pivot = anchor ?? (start + end) / 2;
      zoomTo(
        clampDomain([
          pivot - (pivot - start) / factor,
          pivot + (end - pivot) / factor,
        ]),
        { animate: false }
      );
    },
    [clampDomain, zoomTo]
  );

  /** Pan by a fraction of the visible span (negative pans left). */
  const panBy = useCallback(
    (fraction: number) => {
      const [start, end] = domainRef.current;
      const delta = (end - start) * fraction;
      zoomTo([start + delta, end + delta], { animate: false });
    },
    [zoomTo]
  );

  const reset = useCallback(
    () => zoomTo([fullStart, fullEnd]),
    [fullStart, fullEnd, zoomTo]
  );

  return { targetRef, domain, zoomTo, zoomBy, panBy, reset };
}
