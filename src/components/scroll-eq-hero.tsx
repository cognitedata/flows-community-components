'use client';

import { Button } from '@cognite/aura/components';
import { IconArrowRight } from '@tabler/icons-react';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { Aurora } from '@/components/aurora';
import { HomeAiReadiness } from '@/components/home-ai-readiness';
import { HOME_BENEFITS, HomeBenefits } from '@/components/home-benefits';
import { HomeMediaScene } from '@/components/home-media-scene';
import { HomeUseCases } from '@/components/home-use-cases';
import { SplitText } from '@/components/split-text';

const BAR_COUNT = 13;
const BASE_HEIGHT = 2;
const HERO_BG = '#050810';
const AURORA_STOPS = ['#8FA8EB', '#B6DDD4', '#b764f3'] as const;
const COLLAPSE_DURATION = 0.16;
const WAVE_SPAN = 0.3;
const GROW_START = 0.85;
const GROW_SPAN = 0.08;
const GROW_DURATION = 0.07;
const INTRO_DELAY_MS = 700;
const INTRO_DURATION_MS = 900;
const INTRO_SHIFT_PX = 16;
const H1_OUT_START = 0.45;
const H1_OUT_DURATION = 0.05;
const H2_IN_START = 0.5;
const H2_IN_DURATION = 0.05;
const COPY_IN_START = 0.55;
const COPY_IN_DURATION = 0.05;
const TEXT_OUT_START = 0.85;
const TEXT_OUT_DURATION = 0.05;
const AURORA_OUT_START = 0.42;
const AURORA_OUT_DURATION = 0.08;
const HERO_END = 0.3;
const INDUSTRY_START = 0.42;
const CUSTOM_START = 0.54;
const AI_START = 0.64;
const USE_CASES_START = 0.84;
const SCENE_FADE_OUT = 0.06;
const BENEFIT_ITEM_START = 0.08;
const BENEFIT_STAGGER = 0.16;
const BENEFIT_ITEM_DURATION = 0.5;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function fade(progress: number, start: number, duration: number) {
  return easeOutCubic(clamp((progress - start) / duration, 0, 1));
}

function sceneVisible(
  progress: number,
  start: number,
  nextStart: number,
  fadeOut = SCENE_FADE_OUT
) {
  return (
    fade(progress, start, Math.max(nextStart - start, 0.001)) *
    (1 - fade(progress, nextStart, fadeOut))
  );
}

function applyOverlay(el: HTMLElement, visible: number, shift = 24) {
  el.style.opacity = String(visible);
  el.style.transform = `translateY(${(1 - visible) * shift}px)`;
  el.style.pointerEvents = visible < 0.05 ? 'none' : 'auto';
}

const BARS = Array.from({ length: BAR_COUNT }, (_, i) => {
  const t = i / (BAR_COUNT - 1);
  const collapseStart = lerp(0, WAVE_SPAN, t);
  const collapseEnd = collapseStart + COLLAPSE_DURATION;
  const growStart = lerp(GROW_START, GROW_START + GROW_SPAN, t);
  const growEnd = growStart + GROW_DURATION;
  return { collapseStart, collapseEnd, growStart, growEnd };
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
  const auroraFlipRef = React.useRef<HTMLDivElement>(null);
  const h1Ref = React.useRef<HTMLDivElement>(null);
  const h2Ref = React.useRef<HTMLDivElement>(null);
  const subtextRef = React.useRef<HTMLDivElement>(null);
  const closingCopyRef = React.useRef<HTMLDivElement>(null);
  const benefitsRef = React.useRef<HTMLElement>(null);
  const benefitsSubtitleRef = React.useRef<HTMLHeadingElement>(null);
  const benefitColumnRefs = React.useRef<(HTMLElement | null)[]>([]);
  const benefitValueRefs = React.useRef<(HTMLSpanElement | null)[]>([]);
  const industryRef = React.useRef<HTMLElement>(null);
  const industrySplitStarted = React.useRef(false);
  const [industryPlayTitle, setIndustryPlayTitle] = React.useState(false);
  const customRef = React.useRef<HTMLElement>(null);
  const customSplitStarted = React.useRef(false);
  const [customPlayTitle, setCustomPlayTitle] = React.useState(false);
  const aiRef = React.useRef<HTMLElement>(null);
  const aiTrackRef = React.useRef<HTMLDivElement>(null);
  const useCasesRef = React.useRef<HTMLElement>(null);
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
      const benefits = benefitsRef.current;
      const benefitsSubtitle = benefitsSubtitleRef.current;
      const industry = industryRef.current;
      const custom = customRef.current;
      const ai = aiRef.current;
      const aiTrack = aiTrackRef.current;
      const useCases = useCasesRef.current;
      const progressEl = progressRef.current;
      const auroraLayer = auroraLayerRef.current;
      const auroraFlip = auroraFlipRef.current;
      if (
        !track ||
        !h1 ||
        !h2 ||
        !subtext ||
        !closingCopy ||
        !benefits ||
        !benefitsSubtitle ||
        !industry ||
        !custom ||
        !ai ||
        !aiTrack ||
        !useCases ||
        !progressEl ||
        !auroraLayer ||
        !auroraFlip
      )
        return;

      const rect = track.getBoundingClientRect();
      const total = track.offsetHeight - window.innerHeight;
      const scrolled = clamp(-rect.top, 0, total);
      const progress = total > 0 ? scrolled / total : 0;
      const heroProgress = clamp(progress / HERO_END, 0, 1);
      const benefitsIn = fade(progress, HERO_END, INDUSTRY_START - HERO_END);
      const benefitsOut = fade(progress, INDUSTRY_START, SCENE_FADE_OUT);
      const benefitsVisible = benefitsIn * (1 - benefitsOut);
      const industryVisible = sceneVisible(
        progress,
        INDUSTRY_START,
        CUSTOM_START
      );
      const customVisible = sceneVisible(progress, CUSTOM_START, AI_START);
      const aiVisible = sceneVisible(progress, AI_START, USE_CASES_START);
      const useCasesVisible = fade(
        progress,
        USE_CASES_START,
        1 - USE_CASES_START
      );
      const aiLocal = clamp(
        (progress - AI_START) / (USE_CASES_START - AI_START),
        0,
        1
      );

      progressEl.textContent = 'scroll ' + Math.round(heroProgress * 100) + '%';

      clipRectRefs.current.forEach((clipRect, i) => {
        if (!clipRect) return;
        const { collapseStart, collapseEnd, growStart, growEnd } = BARS[i];
        const minHeight = BASE_HEIGHT / maxHeightRef.current;

        if (heroProgress < GROW_START) {
          const localPhase = clamp(
            (heroProgress - collapseStart) / (collapseEnd - collapseStart),
            0,
            1
          );
          const height = Math.max(minHeight, 1 - localPhase);
          clipRect.setAttribute('y', '0');
          clipRect.setAttribute('height', String(height));
          return;
        }

        const growPhase = fade(heroProgress, growStart, growEnd - growStart);
        const height = growPhase <= 0 ? 0 : Math.max(minHeight, growPhase);
        clipRect.setAttribute('y', String(1 - height));
        clipRect.setAttribute('height', String(height));
      });

      const auroraOut = fade(heroProgress, AURORA_OUT_START, AURORA_OUT_DURATION);
      const auroraIn = fade(heroProgress, GROW_START, 1 - GROW_START);
      auroraLayer.style.opacity = String(
        heroProgress < GROW_START ? 1 - auroraOut : auroraIn
      );
      auroraFlip.style.transform =
        heroProgress >= GROW_START ? 'rotate(180deg)' : 'none';

      const intro = introProgress(performance.now());
      const h1Out = fade(heroProgress, H1_OUT_START, H1_OUT_DURATION);
      const h2In = fade(heroProgress, H2_IN_START, H2_IN_DURATION);
      const copyIn = fade(heroProgress, COPY_IN_START, COPY_IN_DURATION);
      const textOut = fade(heroProgress, TEXT_OUT_START, TEXT_OUT_DURATION);
      const h1Opacity = (1 - h1Out) * (1 - textOut);
      const h2Opacity = h2In * (1 - textOut);

      h1.style.opacity = String(h1Opacity);
      h2.style.opacity = String(h2Opacity);
      subtext.style.opacity = String(h1Opacity * intro);
      subtext.style.transform = `translateY(${(1 - intro) * INTRO_SHIFT_PX}px)`;
      subtext.style.pointerEvents =
        h1Opacity * intro < 0.05 ? 'none' : 'auto';
      closingCopy.style.opacity = String(copyIn);
      closingCopy.style.transform = `translateY(${(1 - copyIn) * INTRO_SHIFT_PX}px)`;

      benefits.style.pointerEvents = benefitsVisible < 0.05 ? 'none' : 'auto';

      const subtitleIn = fade(benefitsIn, 0, 0.4) * (1 - benefitsOut);
      benefitsSubtitle.style.opacity = String(subtitleIn);
      benefitsSubtitle.style.transform = `translateY(${(1 - subtitleIn) * 16}px)`;

      HOME_BENEFITS.forEach((item, i) => {
        const local =
          fade(
            benefitsIn,
            BENEFIT_ITEM_START + i * BENEFIT_STAGGER,
            BENEFIT_ITEM_DURATION
          ) * (1 - benefitsOut);
        const column = benefitColumnRefs.current[i];
        if (column) {
          column.style.opacity = String(local);
          column.style.transform = `translateY(${(1 - local) * 18}px)`;
        }
        const valueEl = benefitValueRefs.current[i];
        if (valueEl) {
          valueEl.textContent = String(
            Math.round(
              item.value *
                fade(
                  benefitsIn,
                  BENEFIT_ITEM_START + i * BENEFIT_STAGGER,
                  BENEFIT_ITEM_DURATION
                )
            )
          );
        }
      });

      applyOverlay(industry, industryVisible);
      if (industryVisible > 0.2 && !industrySplitStarted.current) {
        industrySplitStarted.current = true;
        setIndustryPlayTitle(true);
      }

      applyOverlay(custom, customVisible);
      if (customVisible > 0.2 && !customSplitStarted.current) {
        customSplitStarted.current = true;
        setCustomPlayTitle(true);
      }

      applyOverlay(ai, aiVisible, 20);
      aiTrack.style.transform = `translate3d(${lerp(6, -48, aiLocal)}vw, 0, 0)`;

      applyOverlay(useCases, useCasesVisible, 20);
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
      <div ref={trackRef} className="relative h-[1100vh]">
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
            <div ref={auroraFlipRef} className="absolute inset-0 origin-center">
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
          <div className="absolute inset-0 z-[2]">
            <div className="relative mx-auto h-full w-full max-w-[1600px]">
              <div className="absolute top-1/2 left-4 right-4 flex -translate-y-1/2 flex-col items-start gap-5">
                <div ref={h1Ref} className="pointer-events-none">
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
                  ref={subtextRef}
                  className="flex max-w-[720px] flex-col items-start gap-6 text-left"
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
              <div
                ref={h2Ref}
                className="pointer-events-none absolute top-1/2 left-4 right-4 -translate-y-1/2 text-left opacity-0"
              >
                <p className="whitespace-nowrap text-[clamp(28px,5vw,56px)] leading-[1.15] font-medium tracking-[-0.02em]">
                  Built for humans and agents
                </p>
                <div
                  ref={closingCopyRef}
                  className="absolute top-full left-0 mt-8 max-w-[640px] space-y-4 text-[18px] leading-[1.5] text-medium-fg-fixed-dark"
                  style={{ opacity: 0 }}
                >
                  <p>
                    Traditional design systems ship disconnected styles,
                    components, and documentation—making consistency hard to
                    maintain and drift inevitable.
                  </p>
                  <p>
                    <strong className="font-semibold">
                      Aura is built differently.
                    </strong>{' '}
                    It codifies design
                    decisions and usage guidance into a system that both humans
                    and AI agents can understand and act on. The result:
                    consistent, correct implementation becomes the path of least
                    resistance.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <HomeBenefits
            columnRefs={benefitColumnRefs}
            sectionRef={benefitsRef}
            subtitleRef={benefitsSubtitleRef}
            valueRefs={benefitValueRefs}
          />
          <HomeMediaScene
            label="Built for industry"
            placement="top-end"
            playTitle={industryPlayTitle}
            sectionRef={industryRef}
            title="built for industry"
          />
          <HomeMediaScene
            className="z-[5]"
            label="Fully customizable"
            placement="bottom-start"
            playTitle={customPlayTitle}
            sectionRef={customRef}
            title="fully customizable"
          />
          <HomeAiReadiness sectionRef={aiRef} trackRef={aiTrackRef} />
          <HomeUseCases sectionRef={useCasesRef} />
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
