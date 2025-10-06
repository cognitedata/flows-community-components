"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface GlowingEffectProps {
  blur?: number;
  inactiveZone?: number;
  proximity?: number;
  spread?: number;
  variant?: "default" | "white";
  glow?: boolean;
  className?: string;
  disabled?: boolean;
  movementDuration?: number;
  borderWidth?: number;
}

export function GlowingEffect({
  blur = 0,
  inactiveZone = 0.7,
  proximity = 0,
  spread = 20,
  variant = "default",
  glow = false,
  className,
  disabled = true,
  movementDuration = 2,
  borderWidth = 1,
}: GlowingEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (disabled) return;

    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Check if mouse is within proximity
      const extendedRect = {
        left: -proximity,
        top: -proximity,
        right: rect.width + proximity,
        bottom: rect.height + proximity,
      };

      const isWithinProximity =
        x >= extendedRect.left &&
        x <= extendedRect.right &&
        y >= extendedRect.top &&
        y <= extendedRect.bottom;

      if (isWithinProximity) {
        // Check inactive zone (center area where effect is disabled)
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const inactiveRadius = Math.min(rect.width, rect.height) * inactiveZone * 0.5;
        const distanceFromCenter = Math.sqrt(
          Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
        );

        if (distanceFromCenter > inactiveRadius) {
          setMousePosition({ x, y });
          setIsHovered(true);
        } else {
          setIsHovered(false);
        }
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [disabled, proximity, inactiveZone]);

  const shouldShowGlow = glow || isHovered;

  // Calculate angle for the glow effect
  const angle = shouldShowGlow
    ? Math.atan2(
        mousePosition.y - (containerRef.current?.clientHeight || 0) / 2,
        mousePosition.x - (containerRef.current?.clientWidth || 0) / 2
      ) * (180 / Math.PI)
    : 0;

  // Color gradients based on variant
  const gradients = {
    default: {
      background: `conic-gradient(from ${angle + 90}deg at ${mousePosition.x}px ${mousePosition.y}px, 
        transparent ${180 - spread / 2}deg, 
        hsl(84 81% 67% / 0.8) ${180}deg, 
        hsl(215 28% 77% / 0.6) ${180 + spread / 3}deg,
        hsl(239 84% 67% / 0.4) ${180 + (spread * 2) / 3}deg,
        transparent ${180 + spread / 2}deg)`,
    },
    white: {
      background: `conic-gradient(from ${angle + 90}deg at ${mousePosition.x}px ${mousePosition.y}px, 
        transparent ${180 - spread / 2}deg, 
        rgba(255, 255, 255, 0.8) ${180}deg, 
        rgba(255, 255, 255, 0.4) ${180 + spread / 2}deg,
        transparent ${180 + spread}deg)`,
    },
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 overflow-hidden rounded-inherit pointer-events-none",
        className
      )}
    >
      {shouldShowGlow && (
        <div
          className="absolute inset-0 rounded-inherit opacity-100 transition-opacity duration-300"
          style={{
            background: gradients[variant].background,
            filter: blur > 0 ? `blur(${blur}px)` : "none",
            maskImage: `radial-gradient(
              ${Math.max(containerRef.current?.clientWidth || 0, containerRef.current?.clientHeight || 0) * 0.8}px 
              circle at ${mousePosition.x}px ${mousePosition.y}px, 
              white 0%, 
              white 20%, 
              transparent 100%
            )`,
            WebkitMaskImage: `radial-gradient(
              ${Math.max(containerRef.current?.clientWidth || 0, containerRef.current?.clientHeight || 0) * 0.8}px 
              circle at ${mousePosition.x}px ${mousePosition.y}px, 
              white 0%, 
              white 20%, 
              transparent 100%
            )`,
            animationDuration: `${movementDuration}s`,
          }}
        />
      )}
      
      {/* Border effect */}
      {shouldShowGlow && (
        <div
          className="absolute inset-0 rounded-inherit"
          style={{
            background: `conic-gradient(from ${angle + 90}deg at ${mousePosition.x}px ${mousePosition.y}px, 
              transparent ${180 - spread / 2}deg, 
              hsl(84 81% 67% / 1) ${180}deg, 
              transparent ${180 + spread / 2}deg)`,
            mask: `linear-gradient(white, white) content-box, linear-gradient(white, white)`,
            WebkitMask: `linear-gradient(white, white) content-box, linear-gradient(white, white)`,
            maskComposite: "xor",
            WebkitMaskComposite: "xor",
            padding: `${borderWidth}px`,
          }}
        />
      )}
    </div>
  );
}
