'use client';

import * as React from 'react';

const BAR_COUNT = 13;
const CENTER = (BAR_COUNT - 1) / 2;
const BASE_HEIGHT = 2;

// Dark steps (700–950) with occasional 300/500 accents.
const NORDIC = ['#0D4E40', '#0A372D', '#072922', '#1A967A', '#25D7B0'] as const;
const FJORD = ['#1234B6', '#0D2582', '#0A1C61', '#050F33', '#5F7DEF'] as const;
const AURORA = ['#344C08', '#253606', '#1B2804', '#649210', '#90D217'] as const;
const DUSK = ['#682C71', '#4A1F50', '#37173C', '#B765C4', '#DBB1E1'] as const;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function paletteForBar(i: number): [string, string, string] {
  const ways = [NORDIC, FJORD, AURORA, DUSK] as const;
  const primary = ways[i % 4];
  const secondary = ways[(i + 1) % 4];
  const accentWay = ways[(i + 2) % 4];
  return [
    primary[i % 3],
    secondary[(i + 1) % 3],
    i % 3 === 0 ? accentWay[3 + (i % 2)] : primary[(i + 2) % 3],
  ];
}

const BARS = Array.from({ length: BAR_COUNT }, (_, i) => {
  const distNorm = Math.abs(i - CENTER) / CENTER;
  const weight = 1 - Math.pow(distNorm, 1.6) * 0.92;
  const collapseEnd = lerp(0.42, 0.16, distNorm);

  return {
    weight,
    collapseEnd,
    colors: paletteForBar(i),
    durationSec: 28 + (i % 6) * 4,
    delaySec: (i * 1.7) % 12,
    reverse: i % 2 === 1,
  };
});

const NOISE_DARK_ALPHA =
  '1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0';
const NOISE_LIGHT_ALPHA =
  '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1';

function AuroraNoiseFilter() {
  return (
    <svg
      aria-hidden="true"
      className="absolute h-0 w-0 overflow-hidden"
    >
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
          <feFlood floodColor="rgba(0, 0, 0, 0.25)" result="color1Flood" />
          <feComposite
            in="color1Flood"
            in2="noise1Clipped"
            operator="in"
            result="color1"
          />
          <feFlood floodColor="rgba(255, 255, 255, 0.25)" result="color2Flood" />
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
      className="pointer-events-none absolute inset-0 h-full w-full mix-blend-overlay"
      preserveAspectRatio="none"
      viewBox="0 0 177 937"
    >
      <rect width="177" height="937" fill="white" filter="url(#aurora-noise)" />
    </svg>
  );
}

function AuroraBlob({
  color,
  variant,
  durationSec,
  delaySec,
  reverse,
}: {
  color: string;
  variant: 'a' | 'b' | 'c';
  durationSec: number;
  delaySec: number;
  reverse: boolean;
}) {
  const placement =
    variant === 'a'
      ? 'left-[-90%] top-[-25%] h-[95%] w-[280%]'
      : variant === 'b'
        ? 'left-[-40%] top-[-5%] h-[90%] w-[240%]'
        : 'left-[-15%] top-[8%] h-[85%] w-[210%]';

  return (
    <div
      className={`aurora-blob pointer-events-none absolute rounded-full ${placement}`}
      style={{
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: 'blur(48px)',
        mixBlendMode: 'screen',
        opacity: 0.85,
        animationName: `aurora-blob-${variant}`,
        animationDuration: `${durationSec}s`,
        animationDelay: `${delaySec}s`,
        animationTimingFunction: 'ease-in-out',
        animationIterationCount: 'infinite',
        animationDirection: reverse ? 'alternate-reverse' : 'alternate',
        transformOrigin: 'center center',
        willChange: 'transform',
      }}
    />
  );
}

export function ScrollEqHero() {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const barRefs = React.useRef<(HTMLDivElement | null)[]>([]);
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
        const height = Math.max(
          BASE_HEIGHT,
          envelope * effectiveWeight * maxHeightRef.current
        );
        bar.style.height = `${height}px`;
        bar.style.opacity = String(1 - fadeOutPhase);
      });

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
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
          <AuroraNoiseFilter />
          <div className="pointer-events-none absolute inset-0 flex items-start justify-stretch">
            {BARS.map((bar, i) => (
              <div
                key={i}
                ref={(el) => {
                  barRefs.current[i] = el;
                }}
                className="relative h-full flex-1 overflow-hidden will-change-[height]"
                style={{ background: '#050810' }}
              >
                <AuroraBlob
                  color={bar.colors[0]}
                  variant="a"
                  durationSec={bar.durationSec}
                  delaySec={bar.delaySec}
                  reverse={bar.reverse}
                />
                <AuroraBlob
                  color={bar.colors[1]}
                  variant="b"
                  durationSec={bar.durationSec + 6}
                  delaySec={bar.delaySec + 2}
                  reverse={!bar.reverse}
                />
                <AuroraBlob
                  color={bar.colors[2]}
                  variant="c"
                  durationSec={bar.durationSec + 10}
                  delaySec={bar.delaySec + 4}
                  reverse={bar.reverse}
                />
                <AuroraNoiseOverlay />
              </div>
            ))}
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
        on the track, no scroll-jacking. A single row of clipped bars fills the
        viewport with slow Nordic, Fjord, Aurora, and Dusk aurora. Outer bars
        finish flattening by roughly 16% scroll, the center bar not until
        roughly 42%. Past that point the headlines crossfade, then everything
        fades out.
      </div>
    </>
  );
}
