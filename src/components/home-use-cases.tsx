import { Button } from '@cognite/aura/components';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { useCallback, useEffect, useState, type Ref } from 'react';

import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/community/carousel';

export const HOME_USE_CASES = [
  {
    title: 'Operations at industrial scale',
    body: 'Placeholder: dense, high-stakes consoles where operators need the right signal in the right pattern—without one-off UI for every site.',
  },
  {
    title: 'Agent-assisted workflows',
    body: 'Placeholder: humans and agents share the same components and rules, so generated UI lands in product instead of a parallel design system.',
  },
  {
    title: 'Multi-brand product suites',
    body: 'Placeholder: one Aura core, many brand themes. Teams ship consistent experiences without forking the system for each product.',
  },
] as const;

type HomeUseCasesProps = {
  sectionRef: Ref<HTMLElement>;
};

export function HomeUseCases({ sectionRef }: HomeUseCasesProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => {
      setIndex(api.selectedScrollSnap());
    };
    onSelect();
    api.on('select', onSelect);
    api.on('reInit', onSelect);
    return () => {
      api.off('select', onSelect);
      api.off('reInit', onSelect);
    };
  }, [api]);

  const current = HOME_USE_CASES[index] ?? HOME_USE_CASES[0];

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  return (
    <section
      ref={sectionRef}
      aria-label="Use cases"
      className="absolute inset-0 z-[7] flex items-center"
      style={{ opacity: 0 }}
    >
      <Carousel
        className="mx-auto w-full max-w-[1600px] px-4"
        opts={{ loop: true }}
        setApi={setApi}
      >
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div className="text-left">
            <p className="text-sm font-medium tracking-wide text-medium-fg-fixed-dark uppercase">
              Use cases
            </p>
            <h2 className="mt-3 font-heading text-[clamp(28px,4vw,48px)] leading-[1.1] font-semibold tracking-[-0.03em]">
              {current.title}
            </h2>
            <p className="mt-4 max-w-[42ch] text-[17px] leading-[1.5] text-medium-fg-fixed-dark">
              {current.body}
            </p>
            <div className="mt-8 flex gap-2">
              <Button
                aria-label="Previous use case"
                size="icon"
                variant="secondaryOnDark"
                onClick={scrollPrev}
              >
                <IconArrowLeft />
              </Button>
              <Button
                aria-label="Next use case"
                size="icon"
                variant="secondaryOnDark"
                onClick={scrollNext}
              >
                <IconArrowRight />
              </Button>
            </div>
          </div>
          <CarouselContent>
            {HOME_USE_CASES.map((item) => (
              <CarouselItem key={item.title}>
                <div className="aspect-[4/3] rounded-2xl bg-[#0e131c]">
                  <span className="sr-only">{item.title} image placeholder</span>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
      </Carousel>
    </section>
  );
}
