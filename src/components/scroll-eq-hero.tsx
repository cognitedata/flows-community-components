'use client';

import { Button } from '@cognite/aura/components';
import { IconArrowRight } from '@tabler/icons-react';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { Aurora } from '@/components/aurora';
import { SplitText } from '@/components/split-text';

const BAR_COUNT = 13;
const BASE_HEIGHT = 2;
const HERO_BG = '#050810';
const AURORA_STOPS = ['#8FA8EB', '#B6DDD4', '#b764f3'] as const;
const COLLAPSE_DURATION = 0.16;
const WAVE_SPAN = 0.3;
const INTRO_DELAY_MS = 700;
const INTRO_DURATION_MS = 900;
const INTRO_SHIFT_PX = 16;
const CLOSING_COPY_START = 0.8;
const CLOSING_COPY_FADE = 0.1;
const H2_BODY =
  'Traditional design systems ship a fragmented collection of styles, components and documentation making it difficult to keep the system in sync and easy for drift to take over. Aura is built from the ground up with codified instructions to ensure consistency and correct usage in a format both agents and humans can harness. It makes correct implementation the path of least resistance for agents and humans.';

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

const BARS = Array.from({ length: BAR_COUNT }, (_, i) => {
  const t = i / (BAR_COUNT - 1);
  const collapseStart = lerp(0, WAVE_SPAN, t);
  const collapseEnd = collapseStart + COLLAPSE_DURATION;
  return { collapseStart, collapseEnd };
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
  const closingCopyRef = React.useRef<HTMLDivElement>(null);
  const progressRef = React.useRef<HTMLDivElement>(null);
  const maxHeightRef = React.useRef(800);

  React.useEffect(() => {
    let frame = 0;
    let introStartedAt: number | null = null;

    function updateMaxHeight() {
      maxHeightRef.current = window.innerHeight;
    }

    function introProgress(now: number) {
      if (introStartedAt == null) return 0;
      const t = clamp((now - introStartedAt) / INTRO_DURATION_MS, 0, 1);
      return 1 - (1 - t) ** 3;
    }

    function render() {
      const track = trackRef.current;
      const h1 = h1Ref.current;
      const h2 = h2Ref.current;
      const subtext = subtextRef.current;
      const closingCopy = closingCopyRef.current;
      const progressEl = progressRef.current;
      const auroraLayer = auroraLayerRef.current;
      if (
        !track ||
        !h1 ||
        !h2 ||
        !subtext ||
        !closingCopy ||
        !progressEl ||
        !auroraLayer
      )
        return;

      const rect = track.getBoundingClientRect();
      const total = track.offsetHeight - window.innerHeight;
      const scrolled = clamp(-rect.top, 0, total);
      const progress = total > 0 ? scrolled / total : 0;

      progressEl.textContent = 'scroll ' + Math.round(progress * 100) + '%';

      const fadeOutPhase = clamp((progress - 0.7) / 0.1, 0, 1);

      clipRectRefs.current.forEach((clipRect, i) => {
        if (!clipRect) return;
        const { collapseStart, collapseEnd } = BARS[i];
        const localPhase = clamp(
          (progress - collapseStart) / (collapseEnd - collapseStart),
          0,
          1
        );
        const height = Math.max(
          BASE_HEIGHT / maxHeightRef.current,
          1 - localPhase
        );
        clipRect.setAttribute('height', String(height));
      });

      auroraLayer.style.opacity = String(1 - fadeOutPhase);

      const swapPhase = clamp((progress - 0.55) / 0.2, 0, 1);
      const h1Opacity = (1 - swapPhase) * (1 - fadeOutPhase);
      const h2Opacity = swapPhase;
      const intro = introProgress(performance.now());
      const closingPhase = clamp(
        (progress - CLOSING_COPY_START) / CLOSING_COPY_FADE,
        0,
        1
      );
      const closing = 1 - (1 - closingPhase) ** 3;

      h1.style.opacity = String(h1Opacity);
      h2.style.opacity = String(h2Opacity);
      subtext.style.opacity = String(h1Opacity * intro);
      subtext.style.transform = `translateY(${(1 - intro) * INTRO_SHIFT_PX}px)`;
      subtext.style.pointerEvents =
        h1Opacity * intro < 0.05 ? 'none' : 'auto';
      closingCopy.style.opacity = String(closing);
      closingCopy.style.transform = `translateY(${(1 - closing) * INTRO_SHIFT_PX}px)`;
    }

    updateMaxHeight();

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (reduceMotion) {
      introStartedAt = performance.now() - INTRO_DURATION_MS;
    }

    const introDelay = window.setTimeout(
      () => {
        if (introStartedAt == null) {
          introStartedAt = performance.now();
        }
      },
      reduceMotion ? 0 : INTRO_DELAY_MS
    );

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
      window.clearTimeout(introDelay);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div ref={trackRef} className="relative h-[400vh]">
        <div
          className="sticky top-0 h-screen overflow-hidden"
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
          <div className="absolute inset-0 z-[2]">
            <div className="relative mx-auto h-full w-full max-w-[1600px]">
            <div
              ref={h1Ref}
              className="pointer-events-none absolute inset-0 flex items-center justify-start px-4"
            >
              <SplitText
                className="font-heading max-w-[min(92vw,16ch)] text-[clamp(36px,5.5vw,72px)] font-semibold tracking-[-0.04em] leading-[1.05]"
                delay={40}
                duration={1.25}
                ease="power3.out"
                splitType="chars"
                tag="h1"
                text="Aura design system"
                textAlign="left"
                whiteSpace="normal"
              />
            </div>
            <div
              ref={h2Ref}
              className="pointer-events-none absolute top-1/2 left-4 right-4 -translate-y-1/2 text-left opacity-0"
            >
              <p className="whitespace-nowrap text-[clamp(28px,5vw,56px)] leading-[1.15] font-medium tracking-[-0.02em]">
                Built for humans and agents
              </p>
              <p
                ref={closingCopyRef}
                className="absolute top-full left-0 mt-8 max-w-[640px] text-[18px] leading-[1.5] text-medium-fg-fixed-dark"
                style={{ opacity: 0 }}
              >
                {H2_BODY}
              </p>
            </div>
            <div
              ref={subtextRef}
              className="absolute top-[calc(50%+min(11vw,140px))] left-4 right-auto flex max-w-[720px] flex-col items-start gap-8 text-left"
              style={{ opacity: 0 }}
            >
              <p className="text-[26px] leading-[1.3] text-medium-fg-fixed-dark">
                Cognite&apos;s AI-native design system for the future of
                industrial experiences.
              </p>
              <Button
                nativeButton={false}
                render={<Link to="/documentation" />}
                size="lg"
                variant="defaultOnDark"
              >
                Get Started
                <IconArrowRight />
              </Button>
            </div>
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
    </>
  );
}
