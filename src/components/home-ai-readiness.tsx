import type { Ref } from 'react';

export const AI_READINESS_CARDS = [
  {
    title: 'Design.md',
    body: 'Placeholder: a living spec that encodes how Aura looks, behaves, and should be implemented—readable by humans and agents.',
  },
  {
    title: 'Skills',
    body: 'Placeholder: agent-ready skills that teach coding assistants to reach for the right tokens, primitives, and patterns.',
  },
  {
    title: 'MCP servers',
    body: 'Placeholder: connect agents directly to Aura’s components, tokens, and docs so they can query the system instead of guessing.',
  },
  {
    title: 'Evals',
    body: 'Placeholder: measure whether agents and humans actually implement Aura correctly, and catch drift before it ships.',
  },
] as const;

type HomeAiReadinessProps = {
  sectionRef: Ref<HTMLElement>;
  titleRef: Ref<HTMLHeadingElement>;
  trackRef: Ref<HTMLDivElement>;
};

export function HomeAiReadiness({
  sectionRef,
  titleRef,
  trackRef,
}: HomeAiReadinessProps) {
  return (
    <section
      ref={sectionRef}
      aria-label="AI readiness"
      className="absolute inset-0 z-[6] flex flex-col justify-center overflow-hidden"
      style={{ opacity: 0 }}
    >
      <h2
        ref={titleRef}
        className="relative z-10 px-4 text-center font-heading text-[clamp(32px,5.5vw,72px)] leading-[1.05] font-semibold tracking-[-0.04em] will-change-transform"
      >
        AI readiness
      </h2>
      <div className="mt-12 w-full overflow-hidden">
        <div
          ref={trackRef}
          className="mx-auto grid w-full max-w-[1600px] grid-cols-4 gap-4 px-4 will-change-transform md:gap-5"
          style={{ transform: 'translate3d(100vw, 0, 0)' }}
        >
          {AI_READINESS_CARDS.map((card) => (
            <article
              key={card.title}
              className="min-w-0 rounded-2xl bg-[#0e131c] p-4 md:p-5"
            >
              <div className="aspect-[4/3] rounded-xl bg-white/5" />
              <h3 className="mt-4 font-heading text-lg font-medium tracking-tight md:text-xl">
                {card.title}
              </h3>
              <p className="mt-2 text-[15px] leading-[1.5] text-medium-fg-fixed-dark">
                {card.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
