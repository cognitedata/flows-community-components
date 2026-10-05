'use client';

import { Button } from '@cognite/aura/components';
import { IconArrowRight, IconStarFilled } from '@tabler/icons-react';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { Aurora } from '@/components/aurora';
import { SplitText } from '@/components/split-text';

const BAR_COUNT = 13;
const AURORA_STOPS = ['#8FA8EB', '#B6DDD4', '#b764f3'] as const;
const INTRO_DELAY_MS = 700;
const INTRO_DURATION_MS = 900;
const INTRO_SHIFT_PX = 16;

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

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
          <feFlood
            className="text-marketing-canvas"
            floodColor="currentColor"
            floodOpacity="0.18"
            result="color1Flood"
          />
          <feComposite
            in="color1Flood"
            in2="noise1Clipped"
            operator="in"
            result="color1"
          />
          <feFlood
            className="text-black"
            floodColor="currentColor"
            floodOpacity="0.12"
            result="color2Flood"
          />
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
      <rect
        width="177"
        height="937"
        fill="currentColor"
        filter="url(#aurora-noise)"
      />
    </svg>
  );
}

export function ScrollEqHero() {
  const subtextRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    let frame = 0;
    let introStartedAt: number | null = null;

    function introProgress(now: number) {
      if (introStartedAt == null) return 0;
      const t = clamp((now - introStartedAt) / INTRO_DURATION_MS, 0, 1);
      return 1 - (1 - t) ** 3;
    }

    function render() {
      const subtext = subtextRef.current;
      if (!subtext) return;

      const intro = introProgress(performance.now());
      subtext.style.opacity = String(intro);
      subtext.style.transform = `translateY(${(1 - intro) * INTRO_SHIFT_PX}px)`;
      subtext.style.pointerEvents = intro < 0.05 ? 'none' : 'auto';
    }

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

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(introDelay);
    };
  }, []);

  return (
    <div className="relative h-screen overflow-hidden bg-marketing-canvas">
      <AuroraNoiseFilter />
      <svg aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <clipPath id="hero-bar-clip" clipPathUnits="objectBoundingBox">
          {Array.from({ length: BAR_COUNT }, (_, i) => (
            <rect
              key={i}
              x={i / BAR_COUNT}
              y={0}
              width={1 / BAR_COUNT}
              height={1}
              fill="currentColor"
            />
          ))}
        </clipPath>
      </svg>
      <div className="pointer-events-none absolute inset-0 clip-hero-bars">
        <div className="absolute inset-0 origin-center">
          <Aurora
            amplitude={1}
            blend={0.75}
            className="absolute inset-0 h-full w-full"
            colorStops={AURORA_STOPS}
            speed={0.5}
          />
          <AuroraNoiseOverlay />
        </div>
      </div>
      <div className="absolute inset-0 z-[2] flex items-center justify-center px-4 pt-chrome">
        <div className="flex w-full max-w-[800px] flex-col items-center gap-5 text-center">
          <section
            aria-labelledby="hero-community-title"
            className="mb-16 grid w-full max-w-[640px] grid-cols-[auto_1fr] items-start gap-x-2 gap-y-1 rounded-lg bg-card-background p-6 text-left text-fjord-300"
          >
            <IconStarFilled aria-hidden="true" className="mt-0.5 size-5" />
            <h2
              id="hero-community-title"
              className="font-sans text-base leading-5 font-medium tracking-tighter"
            >
              Introducing Community: the library for industrial components
            </h2>
            <p className="col-start-2 mt-2 text-sm leading-4.5 tracking-tight">
              Learn how to contribute and consume industrial-grade components
              and app templates from the community.
            </p>
            <div className="col-start-2 mt-10">
              <Button
                nativeButton={false}
                render={<Link to="/community" />}
                variant="default"
              >
                Go to community
              </Button>
            </div>
          </section>
          <SplitText
            className="mt-4 max-w-[min(92vw,16ch)] font-heading text-display font-semibold tracking-display"
            delay={40}
            duration={1.25}
            ease="power3.out"
            splitType="chars"
            tag="h1"
            text="Aura design system"
            textAlign="center"
            whiteSpace="normal"
          />
          <div
            ref={subtextRef}
            className="flex max-w-[720px] flex-col items-center gap-6 opacity-0"
          >
            <p className="text-lead text-muted-foreground-fixed-light">
              Cognite&apos;s AI-native design system for the future of
              industrial experiences.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button
                nativeButton={false}
                render={<Link to="/aura/documentation/about-aura" />}
                size="lg"
                variant="defaultOnDark"
              >
                Get Started
                <IconArrowRight />
              </Button>
              <Button
                nativeButton={false}
                render={<Link to="/aura/components" />}
                size="lg"
                variant="secondaryOnDark"
              >
                View components
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
