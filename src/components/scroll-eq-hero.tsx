'use client';

import * as React from 'react';

const BAR_COUNT = 13;
const CENTER = (BAR_COUNT - 1) / 2;
const BASE_HEIGHT = 2; // px, matches bar height below

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

const BARS = Array.from({ length: BAR_COUNT }, (_, i) => {
  const distNorm = Math.abs(i - CENTER) / CENTER; // 0 = center, 1 = edge

  const p1 = lerp(3, 20, distNorm); // #5F83E2 stop position
  const p2 = lerp(7, 34, distNorm); // #3C5085 stop position
  const p3 = lerp(14, 44, distNorm); // #161A21 stop position

  const background = `linear-gradient(to bottom, ${[
    '#CCD7F6 0%',
    `#5F83E2 ${p1}%`,
    `#3C5085 ${p2}%`,
    `#161A21 ${p3}%`,
    '#17191A 50%',
    `#161A21 ${100 - p3}%`,
    `#3C5085 ${100 - p2}%`,
    `#5F83E2 ${100 - p1}%`,
    '#CCD7F6 100%',
  ].join(', ')})`;

  const weight = 1 - Math.pow(distNorm, 1.6) * 0.92;
  const collapseEnd = lerp(0.42, 0.16, distNorm);

  return { background, weight, collapseEnd };
});

export function ScrollEqHero() {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const barRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const h1Ref = React.useRef<HTMLDivElement>(null);
  const h2Ref = React.useRef<HTMLDivElement>(null);
  const subtextRef = React.useRef<HTMLDivElement>(null);
  const progressRef = React.useRef<HTMLDivElement>(null);
  const maxScaleRef = React.useRef(140);

  React.useEffect(() => {
    function updateMaxScale() {
      maxScaleRef.current = (window.innerHeight * 0.98) / BASE_HEIGHT;
    }

    function render() {
      const track = trackRef.current;
      const h1 = h1Ref.current;
      const h2 = h2Ref.current;
      const subtext = subtextRef.current;
      const progressEl = progressRef.current;
      if (!track || !h1 || !h2 || !subtext || !progressEl) return;

      const rect = track.getBoundingClientRect();
      const total = track.offsetHeight - window.innerHeight;
      const scrolled = clamp(-rect.top, 0, total);
      const progress = total > 0 ? scrolled / total : 0;

      progressEl.textContent = 'scroll ' + Math.round(progress * 100) + '%';

      const fadeOutPhase = clamp((progress - 0.75) / 0.25, 0, 1);

      barRefs.current.forEach((bar, i) => {
        if (!bar) return;
        const { weight, collapseEnd } = BARS[i];
        const localPhase = clamp(progress / collapseEnd, 0, 1);
        const effectiveWeight = 1 + localPhase * (weight - 1);
        const envelope = 1 - localPhase;
        const scale =
          1 + envelope * effectiveWeight * (maxScaleRef.current - 1);
        bar.style.height = scale * BASE_HEIGHT + 'px';
        bar.style.opacity = String(1 - fadeOutPhase);
      });

      const swapPhase = clamp((progress - 0.55) / 0.2, 0, 1);
      const h1Opacity = (1 - swapPhase) * (1 - fadeOutPhase);
      const h2Opacity = swapPhase * (1 - fadeOutPhase);

      h1.style.opacity = String(h1Opacity);
      h2.style.opacity = String(h2Opacity);
      subtext.style.opacity = String(h1Opacity);
    }

    updateMaxScale();
    render();

    function handleResize() {
      updateMaxScale();
      render();
    }

    document.addEventListener('scroll', render, { passive: true });
    window.addEventListener('resize', handleResize);
    return () => {
      document.removeEventListener('scroll', render);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div ref={trackRef} className="relative h-[400vh]">
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-stretch">
            {BARS.map((bar, i) => (
              <div
                key={i}
                ref={(el) => {
                  barRefs.current[i] = el;
                }}
                className="h-[2px] flex-1 will-change-[height]"
                style={{ background: bar.background }}
              />
            ))}
          </div>
          <div className="relative z-[2] w-full px-6 text-center">
            <div
              ref={h1Ref}
              className="absolute inset-0 flex items-center justify-center whitespace-nowrap text-[clamp(28px,5vw,56px)] leading-[1.15] font-semibold tracking-[-0.02em]"
            >
              Cognite&apos;s AI-native
              <br />
              design system
            </div>
            <div
              ref={h2Ref}
              className="absolute inset-0 flex items-center justify-center whitespace-nowrap text-[clamp(28px,5vw,56px)] leading-[1.15] font-medium tracking-[-0.02em] opacity-0"
            >
              Built for humans and agents
            </div>
            <div
              ref={subtextRef}
              className="absolute top-[calc(50%+90px)] right-0 left-0 mx-auto max-w-[480px] text-center text-[15px] text-white/55"
            >
              Designed for the future of industrial experiences.
            </div>
          </div>
        </div>
      </div>

      <div
        ref={progressRef}
        className="fixed bottom-6 left-6 z-[5] text-xs text-white/40 [font-variant-numeric:tabular-nums]"
      >
        scroll 0%
      </div>

      <div className="mx-auto max-w-[640px] px-6 pt-[60px] pb-[120px] text-sm leading-[1.6] text-white/60">
        Scroll to drive the animation. This is a plain scroll listener reading{' '}
        <code className="rounded bg-white/8 px-1.5 py-0.5 text-[13px]">
          scrollTop / scrollHeight
        </code>{' '}
        on the track, no scroll-jacking, no animation library. Every bar uses
        the same five colors, but the stop positions shift by distance from
        center: edge bars let the light{' '}
        <code className="rounded bg-white/8 px-1.5 py-0.5 text-[13px]">
          #CCD7F6
        </code>{' '}
        tone spread further down before it hits the dark tones, center bars
        compress it to a thin sliver so they read as mostly{' '}
        <code className="rounded bg-white/8 px-1.5 py-0.5 text-[13px]">
          #161A21
        </code>{' '}
        /{' '}
        <code className="rounded bg-white/8 px-1.5 py-0.5 text-[13px]">
          #17191A
        </code>
        . Each bar also has its own collapse end point: outer bars finish
        flattening by roughly 16% scroll, the center bar not until roughly 42%.
        Past that point the headlines crossfade, then everything fades out.
      </div>
    </>
  );
}
