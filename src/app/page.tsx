'use client';

import { Button } from '@/components/ui/cognite/button';
import { ArrowRight, Terminal } from 'lucide-react';
import Link from 'next/link';
import PrismaticBurst from '@/components/PrismaticBurst';
import { useState } from 'react';

export default function HomePage() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText('npx cognite-create@latest');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Prismatic Burst Background */}
      <div style={{ position: 'fixed', inset: '0', zIndex: '1' }}>
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
            '#CDECFB', // ns-glacier-300
            '#78A7CB', // ns-glacier-500
            '#A9F853', // ns-aurora-500
            '#DDFCBA', // ns-aurora-200
            '#C7D2FE', // glacier-mist-200
            '#3730A3', // glacier-mist-800
          ]}
        />
      </div>

      {/* Hero Section (locked to dark mode) */}
      <div className="dark w-full bg-background text-foreground">
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Hero Text */}
            <div className="space-y-4">
              <h2 className="text-5xl sm:text-6xl font-bold tracking-tight text-foreground">
                Build with Aura
              </h2>
              <p className="text-xl max-w-2xl mx-auto leading-relaxed text-muted-foreground">
                Aura is Cognite&apos;s AI-native design system inspired by
                fractal intelligence and adaptive by nature.
              </p>
            </div>

            {/* CLI Command */}
            <div className="max-w-2xl mx-auto">
              <div
                className="group relative flex items-center gap-3 bg-muted/50 backdrop-blur-sm border border-border/50 rounded-lg px-6 py-4 hover:bg-muted/70 transition-all cursor-pointer"
                onClick={copyToClipboard}
              >
                <Terminal className="h-5 w-5 text-primary shrink-0" />
                <code className="flex-1 text-left font-mono text-base sm:text-lg text-foreground">
                  npx cognite-create@latest
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    copyToClipboard();
                  }}
                >
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link href="/docs/installation">
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
