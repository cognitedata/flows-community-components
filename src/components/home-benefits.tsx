import type { Ref } from 'react';

export const HOME_BENEFITS = [
  {
    value: 4,
    suffix: ' hrs',
    label: 'Idea to shipped code',
    body: 'Placeholder: go from a product idea to working UI in hours, not sprints. Aura is already how humans and agents implement, so handoff and rebuild time collapse.',
  },
  {
    value: 32,
    suffix: '%',
    label: 'Lower delivery cost',
    body: 'Placeholder: less one-off CSS, fewer design–dev loops, and reusable primitives cut the cost of every new surface. Teams spend budget on product, not restyling.',
  },
  {
    value: 90,
    suffix: '%',
    label: 'First-pass consistency',
    body: 'Placeholder: codified usage means agents and humans pick the right pattern the first time. Drift stops being the default, and reviews get shorter.',
  },
] as const;

type HomeBenefitsProps = {
  sectionRef: Ref<HTMLElement>;
  subtitleRef: Ref<HTMLHeadingElement>;
  columnRefs: { current: (HTMLElement | null)[] };
  valueRefs: { current: (HTMLSpanElement | null)[] };
};

export function HomeBenefits({
  sectionRef,
  subtitleRef,
  columnRefs,
  valueRefs,
}: HomeBenefitsProps) {
  return (
    <section
      ref={sectionRef}
      aria-label="Benefits of using Aura"
      className="absolute inset-0 z-[3] flex items-center"
    >
      <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center px-4">
        <h2
          ref={subtitleRef}
          className="max-w-[18ch] text-center font-heading text-[clamp(32px,5.5vw,72px)] leading-[1.05] font-semibold tracking-[-0.04em]"
          style={{ opacity: 0 }}
        >
          A system that pays back in speed, cost, and consistency
        </h2>
        <div className="mt-10 grid w-full grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {HOME_BENEFITS.map((item, i) => (
            <article
              key={item.label}
              ref={(el) => {
                columnRefs.current[i] = el;
              }}
              className="flex flex-col items-center rounded-2xl bg-[#0e131c] px-5 py-7 text-center"
              style={{ opacity: 0 }}
            >
              <p className="font-heading text-[clamp(48px,7vw,80px)] font-semibold tracking-[-0.04em] [font-variant-numeric:tabular-nums]">
                <span
                  ref={(el) => {
                    valueRefs.current[i] = el;
                  }}
                >
                  0
                </span>
                {item.suffix}
              </p>
              <h3 className="mt-3 font-heading text-xl font-medium tracking-tight">
                {item.label}
              </h3>
              <p className="mt-2 max-w-[36ch] text-[15px] leading-[1.5] text-medium-fg-fixed-dark">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
