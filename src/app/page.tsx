"use client";

import { Button } from "@/components/ui/cognite/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import PrismaticBurst from "@/components/PrismaticBurst";

export default function HomePage() {
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
          mixBlendMode="lighten"
          colors={[
            "#CDECFB", // ns-glacier-300
            "#78A7CB", // ns-glacier-500
            "#A9F853", // ns-aurora-500
            "#DDFCBA", // ns-aurora-200
            "#C7D2FE", // glacier-mist-200
            "#3730A3", // glacier-mist-800
          ]}
        />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Hero Text */}
          <div className="space-y-4">
            <h2 className="text-5xl sm:text-6xl font-bold tracking-tight text-[var(--ns-glacier-50)]">
              Build with Aura
            </h2>
            <p className="text-xl max-w-2xl mx-auto leading-relaxed text-[var(--ns-slate-400)]">
              Aura is Cognite&apos;s AI-native design system inspired by fractal
              intelligence and adaptive by nature.
            </p>
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
  );
}
