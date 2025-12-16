'use client';

import { Button } from '@/components/ui/aura/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/aura/card';
import {
  CodeBlock,
  CodeBlockCopyButton,
} from '@/components/ui/aura/code-block';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/aura/tabs';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/aura/alert';
import { motion } from 'framer-motion';
import {
  IconAlertTriangle as AlertTriangle,
  IconArrowRight as ArrowRight,
  IconChevronDown as ChevronDown,
  IconDownload as Download,
  IconSettings as Settings,
  IconSparkles as Sparkles,
  IconTerminal as Terminal,
} from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';
import type { BundledLanguage } from 'shiki';

interface Step {
  icon: React.ElementType;
  title: string;
  description: string;
  code?: string;
  language?: BundledLanguage;
}

const newProjectSteps: Step[] = [
  {
    icon: Terminal,
    title: 'Create your project',
    description:
      'Start with a new Next.js project. You can name your project by appending the name to the command (e.g. my-app), or use "." to create it in the current directory.',
    code: 'npx cognite-create@latest',
  },
  {
    icon: Sparkles,
    title: 'Start building with Cursor',
    description: 'Ask Cursor AI to build your features using natural language',
    code: 'Build me a timeseries dashboard',
  },
];

const existingProjectSteps: Step[] = [
  {
    icon: Terminal,
    title: 'Initialize shadcn',
    description: "If you haven't already, initialize shadcn-ui in your project",
    code: 'npx shadcn@latest init',
  },
  {
    icon: Settings,
    title: 'Configure registry',
    description: 'Add the Aura registry to your components.json file',
    code: `{
  "registries": {
    "@aura": "https://cognitedata.github.io/aura/r/{name}.json"
  }
}`,
    language: 'json',
  },
  {
    icon: Download,
    title: 'Install components',
    description:
      'Use the shadcn CLI with the @aura prefix to install components',
    code: 'pnpm dlx shadcn@latest add @aura/button',
  },
];

export default function HomePage() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText('npx cognite-create@latest');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToQuickStart = () => {
    const element = document.getElementById('quick-start');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-primary/20">
      {/* Splash Screen Section */}
      <div className="relative z-10 flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-4xl text-center space-y-12"
        >
          {/* Hero Text */}
          <div className="space-y-6">
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight text-foreground">
              Build with Aura
            </h1>
            <p className="text-xl sm:text-2xl max-w-2xl mx-auto leading-relaxed text-muted-foreground">
              Aura is Cognite&apos;s AI-native design system inspired by fractal
              intelligence and adaptive by nature.
            </p>
          </div>

          {/* CLI Command */}
          <div className="max-w-2xl mx-auto w-full">
            <div
              className="group relative flex items-center gap-4 bg-muted/50 backdrop-blur-md border border-border/50 rounded-xl px-6 py-5 hover:bg-muted/70 transition-all cursor-pointer shadow-sm"
              onClick={copyToClipboard}
            >
              <Terminal className="h-6 w-6 text-primary shrink-0" />
              <code className="flex-1 text-left font-mono text-lg sm:text-xl text-foreground">
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
            <Alert variant="error" className="text-left">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle className="font-bold">Aura is still in active development</AlertTitle>
              <AlertDescription>
                This site reflects a prototype that&apos;s changing fast. It&apos;s here for exploration and prototyping only, not production use. For feedback, hang tight — we&apos;re already working through major updates and will open structured feedback rounds once the foundation is more stable.
              </AlertDescription>
            </Alert>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4">
            <Button
              size="lg"
              className="text-lg px-8 h-14 rounded-full"
              onClick={scrollToQuickStart}
            >
              Get started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="text-lg px-8 h-14 rounded-full backdrop-blur-sm bg-background/50"
            >
              <Link href="/primitives">Explore components</Link>
            </Button>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 cursor-pointer"
          onClick={scrollToQuickStart}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="h-10 w-10 text-muted-foreground/70 hover:text-foreground transition-colors" />
          </motion.div>
        </motion.div>
      </div>

      {/* Quick Start Section */}
      <div
        id="quick-start"
        className="relative z-10 min-h-screen bg-background/80 backdrop-blur-3xl py-24 sm:py-32"
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
                Quick Start
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Get up and running with Aura in minutes. Choose your path to
                start building.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Tabs defaultValue="new" className="w-full">
                <div className="flex justify-center mb-8">
                  <TabsList className="h-12 p-1 bg-muted/50 backdrop-blur-sm border border-border/50">
                    <TabsTrigger
                      value="new"
                      className="h-full px-8 text-base data-[state=active]:bg-background data-[state=active]:shadow-sm"
                    >
                      New Project
                    </TabsTrigger>
                    <TabsTrigger
                      value="existing"
                      className="h-full px-8 text-base data-[state=active]:bg-background data-[state=active]:shadow-sm"
                    >
                      Existing Project
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="new" className="space-y-8 mt-0">
                  {newProjectSteps.map((step, index) => (
                    <motion.div
                      key={step.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
                        <CardHeader>
                          <div className="flex flex-col md:flex-row md:items-start gap-6">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                              <step.icon className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center gap-3">
                                <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-muted px-2 text-xs font-medium text-muted-foreground">
                                  {index + 1}
                                </span>
                                <CardTitle className="text-xl">
                                  {step.title}
                                </CardTitle>
                              </div>
                              <CardDescription className="text-base">
                                {step.description}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        {step.code && (
                          <CardContent className="pl-0 md:pl-22">
                            <CodeBlock
                              code={step.code}
                              language={step.language || 'bash'}
                            >
                              <CodeBlockCopyButton />
                            </CodeBlock>
                          </CardContent>
                        )}
                      </Card>
                    </motion.div>
                  ))}
                </TabsContent>

                <TabsContent value="existing" className="space-y-8 mt-0">
                  {existingProjectSteps.map((step, index) => (
                    <motion.div
                      key={step.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors">
                        <CardHeader>
                          <div className="flex flex-col md:flex-row md:items-start gap-6">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                              <step.icon className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center gap-3">
                                <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-muted px-2 text-xs font-medium text-muted-foreground">
                                  {index + 1}
                                </span>
                                <CardTitle className="text-xl">
                                  {step.title}
                                </CardTitle>
                              </div>
                              <CardDescription className="text-base">
                                {step.description}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        {step.code && (
                          <CardContent className="pl-0 md:pl-22">
                            <CodeBlock
                              code={step.code}
                              language={step.language || 'bash'}
                            >
                              <CodeBlockCopyButton />
                            </CodeBlock>
                          </CardContent>
                        )}
                      </Card>
                    </motion.div>
                  ))}
                </TabsContent>
              </Tabs>
            </div>

            <div className="flex justify-center pt-8">
              <Button asChild size="lg" variant="secondary">
                <Link href="/docs/installation">
                  View Full Installation Guide
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
