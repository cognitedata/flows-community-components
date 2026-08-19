import type { Ref } from 'react';

import { SplitText } from '@/components/split-text';

type HomeIndustryProps = {
  sectionRef: Ref<HTMLElement>;
  playTitle: boolean;
};

export function HomeIndustry({ sectionRef, playTitle }: HomeIndustryProps) {
  return (
    <section
      ref={sectionRef}
      aria-label="Built for industry"
      className="absolute inset-0 z-[4] flex items-center justify-center px-4"
      style={{ opacity: 0 }}
    >
      <div className="relative mx-auto w-full max-w-[920px]">
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
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-y-1/2">
          {playTitle ? (
            <SplitText
              className="font-heading text-[clamp(32px,5.5vw,72px)] leading-none font-semibold tracking-[-0.04em]"
              delay={40}
              duration={1.1}
              ease="power3.out"
              immediate
              splitType="chars"
              tag="h2"
              text="built for industry"
              textAlign="left"
              whiteSpace="nowrap"
            />
          ) : (
            <h2 className="font-heading text-[clamp(32px,5.5vw,72px)] leading-none font-semibold tracking-[-0.04em] whitespace-nowrap opacity-0">
              built for industry
            </h2>
          )}
        </div>
      </div>
    </section>
  );
}
