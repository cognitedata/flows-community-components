'use client';

import { Button } from '@/components/ui/cognite/button';
import { ArrowRight, Terminal, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/cognite/alert';

export default function HomePage() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText('npx cognite-create@latest');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Hero Section */}
      <div className="w-full">
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-8">
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

            {/* Alert Banner */}
            <div className="max-w-2xl mx-auto">
              <Alert variant="destructive" className="text-left">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle className="font-bold">Aura is still in active development</AlertTitle>
                <AlertDescription>
                  This site reflects a prototype that&apos;s changing fast. It&apos;s here for exploration and prototyping only, not production use. For feedback, hang tight — we&apos;re already working through major updates and will open structured feedback rounds once the foundation is more stable.
                </AlertDescription>
              </Alert>
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
    </div>
  );
}
