'use client';

import * as React from 'react';

import { Aurora } from '@/components/aurora';

const BAR_COUNT = 13;
const CENTER = (BAR_COUNT - 1) / 2;
const BASE_HEIGHT = 2;
const HERO_BG = '#050810';
const AURORA_STOPS = ['#8FA8EB', '#B6DDD4', '#b764f3'] as const;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

const BARS = Array.from({ length: BAR_COUNT }, (_, i) => {
  const distNorm = Math.abs(i - CENTER) / CENTER;
  const weight = 1 - Math.pow(distNorm, 1.6) * 0.92;
  const collapseEnd = lerp(0.42, 0.16, distNorm);
  return { weight, collapseEnd };
});

const NOISE_DARK_ALPHA =
  '1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0';
const NOISE_LIGHT_ALPHA =
  '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1';

function AuroraNoiseFilter() {
  return (
    <svg aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
      <defs>
        <filter
          id="aurora-noise"
          x="0"
          y="0"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="5 5"
            numOctaves="3"
            stitchTiles="stitch"
            seed="2970"
            result="noise"
          />
          <feColorMatrix
            in="noise"
            type="luminanceToAlpha"
            result="alphaNoise"
          />
          <feComponentTransfer in="alphaNoise" result="coloredNoise1">
            <feFuncA type="discrete" tableValues={NOISE_DARK_ALPHA} />
          </feComponentTransfer>
          <feComposite
            in="coloredNoise1"
            in2="SourceGraphic"
            operator="in"
            result="noise1Clipped"
          />
          <feComponentTransfer in="alphaNoise" result="coloredNoise2">
            <feFuncA type="discrete" tableValues={NOISE_LIGHT_ALPHA} />
          </feComponentTransfer>
          <feComposite
            in="coloredNoise2"
            in2="SourceGraphic"
            operator="in"
            result="noise2Clipped"
          />
          <feFlood floodColor={HERO_BG} floodOpacity="0.18" result="color1Flood" />
          <feComposite
            in="color1Flood"
            in2="noise1Clipped"
            operator="in"
            result="color1"
          />
          <feFlood floodColor="#000000" floodOpacity="0.12" result="color2Flood" />
          <feComposite
            in="color2Flood"
            in2="noise2Clipped"
            operator="in"
            result="color2"
          />
          <feMerge>
            <feMergeNode in="color1" />
            <feMergeNode in="color2" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}

function AuroraNoiseOverlay() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full mix-blend-multiply opacity-40"
      preserveAspectRatio="none"
      viewBox="0 0 177 937"
    >
      <rect width="177" height="937" fill="white" filter="url(#aurora-noise)" />
    </svg>
  );
}

export function ScrollEqHero() {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const clipRectRefs = React.useRef<(SVGRectElement | null)[]>([]);
  const auroraLayerRef = React.useRef<HTMLDivElement>(null);
  const h1Ref = React.useRef<HTMLDivElement>(null);
  const h2Ref = React.useRef<HTMLDivElement>(null);
  const subtextRef = React.useRef<HTMLDivElement>(null);
  const progressRef = React.useRef<HTMLDivElement>(null);
  const maxHeightRef = React.useRef(800);

  React.useEffect(() => {
    let frame = 0;

    function updateMaxHeight() {
      maxHeightRef.current = window.innerHeight;
    }

    function render() {
      const track = trackRef.current;
      const h1 = h1Ref.current;
      const h2 = h2Ref.current;
      const subtext = subtextRef.current;
      const progressEl = progressRef.current;
      const auroraLayer = auroraLayerRef.current;
      if (!track || !h1 || !h2 || !subtext || !progressEl || !auroraLayer)
        return;

      const rect = track.getBoundingClientRect();
      const total = track.offsetHeight - window.innerHeight;
      const scrolled = clamp(-rect.top, 0, total);
      const progress = total > 0 ? scrolled / total : 0;

      progressEl.textContent = 'scroll ' + Math.round(progress * 100) + '%';

      const fadeOutPhase = clamp((progress - 0.75) / 0.25, 0, 1);

      clipRectRefs.current.forEach((clipRect, i) => {
        if (!clipRect) return;
        const { weight, collapseEnd } = BARS[i];
        const localPhase = clamp(progress / collapseEnd, 0, 1);
        const effectiveWeight = 1 + localPhase * (weight - 1);
        const envelope = 1 - localPhase;
        const height = Math.max(
          BASE_HEIGHT / maxHeightRef.current,
          envelope * effectiveWeight
        );
        clipRect.setAttribute('height', String(height));
      });

      auroraLayer.style.opacity = String(1 - fadeOutPhase);

      const swapPhase = clamp((progress - 0.55) / 0.2, 0, 1);
      const h1Opacity = (1 - swapPhase) * (1 - fadeOutPhase);
      const h2Opacity = swapPhase * (1 - fadeOutPhase);

      h1.style.opacity = String(h1Opacity);
      h2.style.opacity = String(h2Opacity);
      subtext.style.opacity = String(h1Opacity);
    }

    updateMaxHeight();

    function tick() {
      render();
      frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);

    function handleResize() {
      updateMaxHeight();
    }

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div ref={trackRef} className="relative h-[400vh]">
        <div
          className="sticky top-0 flex h-screen items-center justify-center overflow-hidden"
          style={{ background: HERO_BG }}
        >
          <AuroraNoiseFilter />
          <svg aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
            <clipPath id="hero-bar-clip" clipPathUnits="objectBoundingBox">
              {BARS.map((_, i) => (
                <rect
                  key={i}
                  ref={(el) => {
                    clipRectRefs.current[i] = el;
                  }}
                  x={i / BAR_COUNT}
                  y={0}
                  width={1 / BAR_COUNT}
                  height={1}
                  fill="white"
                />
              ))}
            </clipPath>
          </svg>
          <div
            ref={auroraLayerRef}
            className="pointer-events-none absolute inset-0"
            style={{
              clipPath: 'url(#hero-bar-clip)',
              WebkitClipPath: 'url(#hero-bar-clip)',
            }}
          >
            <Aurora
              amplitude={1}
              blend={0.75}
              className="absolute inset-0 h-full w-full"
              colorStops={AURORA_STOPS}
              speed={0.5}
            />
            <AuroraNoiseOverlay />
          </div>
          <div className="relative z-[2] w-full px-6 text-center">
            <div
              ref={h1Ref}
              className="absolute inset-0 flex items-center justify-center whitespace-nowrap text-[clamp(28px,5vw,56px)] leading-[1.15] font-semibold tracking-[-0.02em]"
            >
              Aura
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
              Cognite&apos;s AI-native design system for the future of
              industrial experiences.
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
        on the track, no scroll-jacking. A WebGL aurora sits behind a single row
        of clipped bars. Outer bars finish flattening by roughly 16% scroll, the
        center bar not until roughly 42%. Past that point the headlines
        crossfade, then everything fades out.
      </div>
    </>
  );
}
