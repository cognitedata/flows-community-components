"use client";

import { Button } from "@/components/ui/cognite/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import PrismaticBurst from "@/components/PrismaticBurst";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [burstColors, setBurstColors] = useState<string[]>([
    "#CDECFB", // fjord-300 fallback
    "#5F7DEF", // fjord-500 fallback
    "#649210", // aurora-500 fallback
    "#ABE938", // aurora-200 fallback
    "#7FE9D2", // nordic-200 fallback
    "#EA4486", // dusk-500 fallback
    "#F9CADC", // dusk-200 fallback
  ]);

  useEffect(() => {
    // Resolve CSS variables on the client
    try {
      const root = document.documentElement;
      const getVar = (name: string) => getComputedStyle(root).getPropertyValue(name).trim();
      const rgbToHex = (rgb: string): string | null => {
        // Expect formats like: rgb(r, g, b) or rgba(r, g, b, a)
        const match = rgb.replace(/\s+/g, "").match(/^rgba?\((\d+),(\d+),(\d+)/i);
        if (!match) return null;
        const r = Math.max(0, Math.min(255, parseInt(match[1], 10)));
        const g = Math.max(0, Math.min(255, parseInt(match[2], 10)));
        const b = Math.max(0, Math.min(255, parseInt(match[3], 10)));
        const toHex = (n: number) => n.toString(16).padStart(2, "0");
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
      };
      const resolved = [
        rgbToHex(getVar("--fjord-300")) || burstColors[0],
        rgbToHex(getVar("--fjord-500")) || burstColors[1],
        rgbToHex(getVar("--aurora-500")) || burstColors[2],
        rgbToHex(getVar("--aurora-200")) || burstColors[3],
        rgbToHex(getVar("--nordic-200")) || burstColors[4],
        rgbToHex(getVar("--dusk-500")) || burstColors[5],
        rgbToHex(getVar("--dusk-200")) || burstColors[6],
      ];
      setBurstColors(resolved);
    } catch {
      // ignore and keep fallbacks
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Prismatic Burst Background */}
      <div style={{ position: "fixed", inset: "0", zIndex: "1" }}>
        <PrismaticBurst
          animationType="rotate3d"
          intensity={1.5}
          speed={0.3}
          distort={1.2}
          paused={false}
          offset={{ x: 0, y: 0 }}
          hoverDampness={0.25}
          rayCount={16}
          mixBlendMode="screen"
          colors={burstColors}
        />
      </div>

      {/* Hero Section (locked to dark mode) */}
      <div className="dark w-full bg-background text-foreground">
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Hero Text */}
          <div className="space-y-4">
            <h2 className="text-8xl font-bold tracking-tight text-foreground" style={{ fontFamily: "'Space Grotesk', var(--font-space-grotesk)" }}>
              Meet Aura, an AI-native design system for industrial innovation
            </h2>
          </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/overview">
                Get started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="text-lg px-8"
            >
              <Link href="/primitives">Explore components</Link>
            </Button>
            </div>

            {/* Feature cards removed */}
          </div>
        </div>
      </div>
    </div>
  );
}
