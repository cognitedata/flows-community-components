import type { Ref } from 'react';

import { SplitText } from '@/components/split-text';
import { cn } from '@/lib/utils';

export function HomeVideoPlaceholder() {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-[#0e131c]">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex size-16 items-center justify-center rounded-full border border-white/15 bg-white/5">
          <span className="sr-only">Video placeholder</span>
          <svg
            aria-hidden="true"
            className="ml-1 size-6 fill-white/70"
            viewBox="0 0 24 24"
          >
            <path d="M8 5.14v13.72L19.12 12 8 5.14Z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

type HomeMediaSceneProps = {
  sectionRef: Ref<HTMLElement>;
  playTitle: boolean;
  title: string;
  label: string;
  placement: 'top-end' | 'bottom-start';
  className?: string;
};

const TITLE_PLACEMENT = {
  'top-end': 'absolute top-0 left-1/2 -translate-y-1/2',
  'bottom-start': 'absolute bottom-0 left-0 translate-y-1/2',
} as const;

const TITLE_CLASS =
  'font-heading text-[clamp(32px,5.5vw,72px)] leading-none font-semibold tracking-[-0.04em] whitespace-nowrap';

export function HomeMediaScene({
  sectionRef,
  playTitle,
  title,
  label,
  placement,
  className,
}: HomeMediaSceneProps) {
  return (
    <section
      ref={sectionRef}
      aria-label={label}
      className={cn(
        'absolute inset-0 z-[4] flex items-center justify-center px-4',
        className
      )}
      style={{ opacity: 0 }}
    >
      <div className="relative mx-auto w-full max-w-[920px]">
        <HomeVideoPlaceholder />
        <div className={`pointer-events-none ${TITLE_PLACEMENT[placement]}`}>
          {playTitle ? (
            <SplitText
              className={TITLE_CLASS}
              delay={40}
              duration={1.1}
              ease="power3.out"
              immediate
              splitType="chars"
              tag="h2"
              text={title}
              textAlign="left"
              whiteSpace="nowrap"
            />
          ) : (
            <h2 className={`${TITLE_CLASS} opacity-0`}>{title}</h2>
          )}
        </div>
      </div>
    </section>
  );
}
