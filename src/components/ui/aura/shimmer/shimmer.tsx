import { motion, type Transition } from 'framer-motion';
import { type CSSProperties, memo, useMemo } from 'react';

import { cn } from '../../../../lib/utils';

type TextShimmerProps = {
  children: string;
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3';
  className?: string;
  duration?: number;
  spread?: number;
  variant?:
    | 'default'
    | 'nordic'
    | 'aurora'
    | 'dusk'
    | 'equinox'
    | 'summer'
    | 'spring'
    | 'fall';
};

type ShimmerVariant = NonNullable<TextShimmerProps['variant']>;

const gradientMap: Record<Exclude<ShimmerVariant, 'default'>, string> = {
  nordic: 'var(--gradient-nordic)',
  aurora: 'var(--gradient-aurora)',
  dusk: 'var(--gradient-dusk)',
  equinox: 'var(--gradient-equinox)',
  summer: 'var(--gradient-summer)',
  spring: 'var(--gradient-spring)',
  fall: 'var(--gradient-fall)',
};

function ShimmerComponent({
  children,
  as: Component = 'p',
  className,
  duration = 2,
  spread = 2,
  variant = 'default',
}: TextShimmerProps) {
  const dynamicSpread = useMemo(
    () => (children?.length ?? 0) * spread,
    [children, spread]
  );

  const backgroundImage = useMemo(() => {
    const shimmerBg =
      'linear-gradient(90deg, transparent calc(50% - var(--spread)), rgba(255, 255, 255, 0.4), transparent calc(50% + var(--spread)))';

    if (variant === 'default') {
      return `${shimmerBg}, linear-gradient(var(--color-muted-foreground), var(--color-muted-foreground))`;
    }

    return `${shimmerBg}, ${gradientMap[variant]}`;
  }, [variant]);

  const shimmerStyle: CSSProperties & { '--spread': string } = {
    '--spread': `${dynamicSpread}px`,
    backgroundImage,
    backgroundSize: '250% 100%, 100% 100%',
  };
  const shimmerTransition: Transition = {
    repeat: Number.POSITIVE_INFINITY,
    duration,
    ease: 'linear',
  };

  const sharedProps = {
    'data-slot': 'shimmer',
    animate: {
      backgroundPosition: ['100% center, center', '0% center, center'],
    },
    className: cn(
      'relative inline-block bg-clip-text text-transparent rounded-md',
      className
    ),
    style: shimmerStyle,
    transition: shimmerTransition,
    children,
  };

  switch (Component) {
    case 'span':
      return <motion.span {...sharedProps} />;
    case 'div':
      return <motion.div {...sharedProps} />;
    case 'h1':
      return <motion.h1 {...sharedProps} />;
    case 'h2':
      return <motion.h2 {...sharedProps} />;
    case 'h3':
      return <motion.h3 {...sharedProps} />;
    default:
      return <motion.p {...sharedProps} />;
  }
}
ShimmerComponent.displayName = 'Shimmer';

const MemoizedShimmer = memo(ShimmerComponent);
MemoizedShimmer.displayName = 'Shimmer';

export { MemoizedShimmer as Shimmer };
