import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
} from 'react';

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

type SplitTextTag = 'h1' | 'h2' | 'h3' | 'p' | 'div' | 'span';

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: string;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  textAlign?: CSSProperties['textAlign'];
  whiteSpace?: CSSProperties['whiteSpace'];
  tag?: SplitTextTag;
  immediate?: boolean;
  enabled?: boolean;
  onLetterAnimationComplete?: () => void;
}

interface SplitHost extends HTMLElement {
  _rbsplitInstance?: GSAPSplitText | null;
}

export function SplitText({
  text,
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  whiteSpace = 'nowrap',
  tag = 'p',
  immediate = false,
  enabled = true,
  onLetterAnimationComplete,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const animationCompletedRef = useRef(false);
  const onCompleteRef = useRef(onLetterAnimationComplete);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  useEffect(() => {
    if (document.fonts.status === 'loaded') {
      setFontsLoaded(true);
    } else {
      void document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    }
  }, []);

  useGSAP(
    () => {
      const el = ref.current as SplitHost | null;
      if (!el || !text || !fontsLoaded || !enabled) return;
      if (animationCompletedRef.current) return;

      if (el._rbsplitInstance) {
        try {
          el._rbsplitInstance.revert();
        } catch {
          /* noop */
        }
        el._rbsplitInstance = null;
      }

      const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
      if (reduceMotion) {
        gsap.set(el, { opacity: 1, y: 0 });
        animationCompletedRef.current = true;
        return;
      }

      const startPct = (1 - threshold) * 100;
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
      const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';
      const sign =
        marginValue === 0
          ? ''
          : marginValue < 0
            ? `-=${Math.abs(marginValue)}${marginUnit}`
            : `+=${marginValue}${marginUnit}`;
      const start = `top ${startPct}%${sign}`;

      let targets: Element[] | undefined;
      const assignTargets = (self: GSAPSplitText) => {
        if (splitType.includes('chars') && self.chars.length) {
          targets = self.chars;
        }
        if (!targets && splitType.includes('words') && self.words.length) {
          targets = self.words;
        }
        if (!targets && splitType.includes('lines') && self.lines.length) {
          targets = self.lines;
        }
        if (!targets) {
          targets = self.chars || self.words || self.lines;
        }
      };

      const splitInstance = new GSAPSplitText(el, {
        type: splitType,
        smartWrap: true,
        autoSplit: splitType === 'lines',
        linesClass: 'split-line',
        wordsClass: 'split-word',
        charsClass: 'split-char',
        reduceWhiteSpace: false,
        onSplit: (self) => {
          assignTargets(self);
          return gsap.fromTo(
            targets ?? [],
            { ...from },
            {
              ...to,
              duration,
              ease,
              stagger: delay / 1000,
              ...(immediate
                ? {}
                : {
                    scrollTrigger: {
                      trigger: el,
                      start,
                      once: true,
                      fastScrollEnd: true,
                      anticipatePin: 0.4,
                    },
                  }),
              onComplete: () => {
                animationCompletedRef.current = true;
                onCompleteRef.current?.();
              },
              willChange: 'transform, opacity',
              force3D: true,
            }
          );
        },
      });

      el._rbsplitInstance = splitInstance;

      return () => {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === el) st.kill();
        });
        try {
          splitInstance.revert();
        } catch {
          /* noop */
        }
        el._rbsplitInstance = null;
      };
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        fontsLoaded,
        enabled,
        immediate,
      ],
      scope: ref,
    }
  );

  const Tag = (tag || 'p') as ElementType;
  const style: CSSProperties = {
    textAlign,
    overflow: 'hidden',
    display: 'inline-block',
    whiteSpace,
    wordWrap: 'break-word',
    willChange: 'transform, opacity',
  };

  return (
    <Tag ref={ref} className={`split-parent ${className}`} style={style}>
      {text}
    </Tag>
  );
}
