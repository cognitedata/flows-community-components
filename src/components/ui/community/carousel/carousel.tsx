import { Button } from '@cognite/aura/components';
import { cn } from '@cognite/aura/utils';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from 'embla-carousel-react';
import {
  type ReactNode,
  type ComponentProps,
  type KeyboardEvent,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from 'react';

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: 'horizontal' | 'vertical';
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = useContext(CarouselContext);

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />');
  }

  return context;
}

function Carousel({
  orientation = 'horizontal',
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: ComponentProps<'div'> & CarouselProps): ReactNode {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === 'horizontal' ? 'x' : 'y',
    },
    plugins
  );
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (!api) return () => undefined;
      api.on('reInit', onStoreChange);
      api.on('select', onStoreChange);
      return () => {
        api.off('reInit', onStoreChange);
        api.off('select', onStoreChange);
      };
    },
    [api]
  );
  const canScrollPrev = useSyncExternalStore(
    subscribe,
    () => api?.canScrollPrev() ?? false,
    () => false
  );
  const canScrollNext = useSyncExternalStore(
    subscribe,
    () => api?.canScrollNext() ?? false,
    () => false
  );

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (
        (orientation === 'horizontal' && event.key === 'ArrowLeft') ||
        (orientation === 'vertical' && event.key === 'ArrowUp')
      ) {
        event.preventDefault();
        scrollPrev();
      } else if (
        (orientation === 'horizontal' && event.key === 'ArrowRight') ||
        (orientation === 'vertical' && event.key === 'ArrowDown')
      ) {
        event.preventDefault();
        scrollNext();
      }
    },
    [orientation, scrollPrev, scrollNext]
  );

  useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);

  const contextValue = useMemo(
    () => ({
      carouselRef,
      api: api,
      opts,
      orientation,
      scrollPrev,
      scrollNext,
      canScrollPrev,
      canScrollNext,
    }),
    [
      carouselRef,
      api,
      opts,
      orientation,
      scrollPrev,
      scrollNext,
      canScrollPrev,
      canScrollNext,
    ]
  );

  return (
    <CarouselContext.Provider value={contextValue}>
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn('relative', className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

function CarouselContent({
  className,
  ...props
}: ComponentProps<'div'>): ReactNode {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div
      ref={carouselRef}
      className="overflow-hidden"
      data-slot="carousel-content"
    >
      <div
        className={cn(
          'flex',
          orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
          className
        )}
        {...props}
      />
    </div>
  );
}

function CarouselItem({
  className,
  ...props
}: ComponentProps<'div'>): ReactNode {
  const { orientation } = useCarousel();

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        'min-w-0 shrink-0 grow-0 basis-full',
        orientation === 'horizontal' ? 'pl-4' : 'pt-4',
        className
      )}
      {...props}
    />
  );
}

function CarouselPrevious({
  className,
  variant = 'outline',
  size = 'icon',
  ...props
}: ComponentProps<typeof Button>): ReactNode {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={cn(
        'absolute size-8 rounded-full',
        orientation === 'horizontal'
          ? 'top-1/2 -left-12 -translate-y-1/2'
          : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <IconArrowLeft />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
}

function CarouselNext({
  className,
  variant = 'outline',
  size = 'icon',
  ...props
}: ComponentProps<typeof Button>): ReactNode {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      className={cn(
        'absolute size-8 rounded-full',
        orientation === 'horizontal'
          ? 'top-1/2 -right-12 -translate-y-1/2'
          : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <IconArrowRight />
      <span className="sr-only">Next slide</span>
    </Button>
  );
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
};
