import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { type CSSProperties, type ElementType, memo, useMemo } from "react";

export type TextShimmerProps = {
  children: string;
  as?: ElementType;
  className?: string;
  duration?: number;
  spread?: number;
  variant?: "default" | "nordic" | "aurora" | "dusk" | "equinox" | "summer" | "spring" | "fall";
};

// Pre-create commonly used motion components outside of render
const MotionP = motion.p;
const MotionSpan = motion.span;
const MotionDiv = motion.div;
const MotionH1 = motion.h1;
const MotionH2 = motion.h2;
const MotionH3 = motion.h3;

// Map of component types to their motion equivalents
const motionComponentMap = {
  p: MotionP,
  span: MotionSpan,
  div: MotionDiv,
  h1: MotionH1,
  h2: MotionH2,
  h3: MotionH3,
} as const;

const ShimmerComponent = ({
  children,
  as: Component = "p",
  className,
  duration = 2,
  spread = 2,
  variant = "default",
}: TextShimmerProps) => {
  // Use pre-created motion component or fallback to motion.p
  const MotionComponent =
    motionComponentMap[Component as keyof typeof motionComponentMap] || MotionP;

  const dynamicSpread = useMemo(() => (children?.length ?? 0) * spread, [children, spread]);

  const backgroundImage = useMemo(() => {
    const shimmerBg =
      "linear-gradient(90deg, transparent calc(50% - var(--spread)), rgba(255, 255, 255, 0.4), transparent calc(50% + var(--spread)))";

    if (variant === "default") {
      return `${shimmerBg}, linear-gradient(var(--color-muted-foreground), var(--color-muted-foreground))`;
    }

    // Map variants to gradient tokens
    const gradientMap = {
      nordic: "var(--gradient-nordic)",
      aurora: "var(--gradient-aurora)",
      dusk: "var(--gradient-dusk)",
      equinox: "var(--gradient-equinox)",
      summer: "var(--gradient-summer)",
      spring: "var(--gradient-spring)",
      fall: "var(--gradient-fall)",
    };

    const gradient = gradientMap[variant as keyof typeof gradientMap];
    return gradient
      ? `${shimmerBg}, ${gradient}`
      : `${shimmerBg}, linear-gradient(var(--color-muted-foreground), var(--color-muted-foreground))`;
  }, [variant]);

  return (
    <MotionComponent
      animate={{
        backgroundPosition: ["100% center, center", "0% center, center"],
      }}
      className={cn("relative inline-block bg-clip-text text-transparent rounded-md", className)}
      style={
        {
          "--spread": `${dynamicSpread}px`,
          backgroundImage,
          backgroundSize: "250% 100%, 100% 100%",
        } as CSSProperties
      }
      transition={{
        repeat: Number.POSITIVE_INFINITY,
        duration,
        ease: "linear",
      }}
    >
      {children}
    </MotionComponent>
  );
};

export const Shimmer = memo(ShimmerComponent);
