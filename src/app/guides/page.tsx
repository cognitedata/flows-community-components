'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  IconBook as Book,
  IconCheckCircle as CheckCircle,
  IconCode as Code,
  IconDownload as Download,
  IconExternalLink as ExternalLink,
  IconLightbulb as Lightbulb,
  IconPalette as Palette,
  IconPuzzle as Puzzle,
  IconTerminal as Terminal,
  IconUsers as Users,
} from '@tabler/icons-react';
import { Button } from '@/components/ui/cognite/button';
import { Badge } from '@/components/ui/cognite/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/cognite/card';
import { CodeCopyButton } from '@/components/code-copy-button';
import Link from 'next/link';

const designerSteps = [
  {
    title: 'Download Figma library',
    description:
      'Get our complete Figma design system with all components, tokens, and styles',
    icon: Download,
    action: 'Download library',
  },
  {
    title: 'Review design tokens',
    description:
      'Familiarize yourself with our color palette, typography, and spacing system',
    icon: Palette,
    action: 'View tokens',
  },
  {
    title: 'Study components',
    description: 'Explore component variations, states, and usage guidelines',
    icon: Book,
    action: 'Browse components',
  },
  {
    title: 'Design patterns',
    description: 'Learn about layout patterns and responsive design principles',
    icon: Lightbulb,
    action: 'View patterns',
  },
];

const developerSteps = [
  {
    title: 'Install dependencies',
    description:
      'Set up Tailwind CSS, Radix UI components, and required dependencies for Aura',
    icon: Terminal,
    action: 'View documentation',
    code: 'npm install tailwindcss postcss autoprefixer @radix-ui/react-icons @tabler/icons-react class-variance-authority tailwind-merge clsx next-themes',
    info: 'Install all required packages for Aura UI components and theming',
  },
  {
    title: 'Setup Tailwind configuration',
    description:
      'Initialize Tailwind and configure it with Aura design tokens and CSS variables',
    icon: Palette,
    action: 'View theming guide',
    code: [
      {
        label: 'Initialize Tailwind',
        command: 'npx tailwindcss init -p',
      },
      {
        label: 'Add base styles to globals.css',
        command:
          '@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n/* Add Aura CSS variables here */',
      },
    ],
    info: 'Visit the theming page for complete Tailwind config with Aura design tokens and CSS variables',
  },
  {
    title: 'Setup React theme provider',
    description:
      'Configure Next.js app layout to support dark/light mode theme switching',
    icon: Code,
    action: 'View theme setup',
    code: [
      {
        label: 'Add ThemeProvider to layout.tsx',
        command: `import { ThemeProvider } from "next-themes"\n\nexport default function RootLayout({ children }) {\n  return (\n    <html lang="en">\n      <body>\n        <ThemeProvider attribute="class">\n          {children}\n        </ThemeProvider>\n      </body>\n    </html>\n  )\n}`,
      },
    ],
    info: 'Enable seamless dark/light mode switching across your entire application',
  },
  {
    title: 'Import & use components',
    description: 'Copy components and start building with Aura UI',
    icon: Puzzle,
    action: 'View components',
    code: [
      {
        label: 'Copy components to your project',
        command: 'Copy from /src/components/ui/ to your project',
      },
      {
        label: 'Import and use (example)',
        command: `import { Button } from "@/components/ui/cognite/button"\n\nexport default function MyPage() {\n  return <Button>Hello Aura!</Button>\n}`,
      },
    ],
    info: 'All components are ready to use with TypeScript support and theming',
  },
];

const resources = [
  {
    title: 'Figma design system',
    description:
      'Complete design files with components, styles, and documentation',
    type: 'design',
    link: '#',
  },
  {
    title: 'GitHub repository',
    description: 'Source code, examples, and contribution guidelines',
    type: 'development',
    link: '#',
  },
  {
    title: 'Storybook documentation',
    description: 'Interactive component documentation and examples',
    type: 'development',
    link: '#',
  },
  {
    title: 'Design guidelines PDF',
    description: 'Comprehensive brand and design guidelines document',
    type: 'design',
    link: '#',
  },
];

interface StepType {
  title: string;
  description: string;
  icon: React.ElementType;
  action: string;
  code?: string | { label?: string; command: string }[];
  info?: string;
}

function StepCard({ step, index }: { step: StepType; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="relative w-full h-full flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex items-start space-x-3">
            <div className="p-2 rounded-lg bg-muted">
              <step.icon className="h-5 w-5" />
            </div>
            <div className="text-left">
              <div className="mb-2">
                <Badge variant="secondary" className="text-xs">
                  Step {index + 1}
                </Badge>
              </div>
              <CardTitle className="text-lg text-left">{step.title}</CardTitle>
              <CardDescription className="text-left">
                {step.description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col space-y-3">
          <div className="flex-1 space-y-3">
            {/* Developer step code blocks */}
            {step.code && (
              <div className="space-y-2">
                {Array.isArray(step.code) ? (
                  step.code.map((codeBlock, idx) => (
                    <div key={idx} className="space-y-1 text-left">
                      {codeBlock.label && (
                        <div className="text-xs font-medium text-muted-foreground text-left">
                          {codeBlock.label}
                        </div>
                      )}
                      <div className="relative bg-muted p-3 pr-12 rounded text-xs font-mono overflow-x-auto text-left">
                        <CodeCopyButton code={codeBlock.command} />
                        {codeBlock.command}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="relative bg-muted p-3 pr-12 rounded text-xs font-mono overflow-x-auto text-left">
                    <CodeCopyButton code={step.code} />
                    {step.code}
                  </div>
                )}
              </div>
            )}

            {/* Developer step additional info */}
            {step.info && (
              <p className="text-xs text-muted-foreground text-left">
                {step.info}
              </p>
            )}

            {/* Designer step placeholder content - ensures consistent height */}
            {!step.code && !step.info && (
              <div className="space-y-2">
                <div className="bg-muted/50 p-3 rounded text-xs text-muted-foreground text-left">
                  Content placeholder - will be updated with specific designer
                  guidance
                </div>
              </div>
            )}
          </div>

          {/* Button aligned to bottom */}
          <div className="mt-auto pt-2">
            {step.action === 'View theming guide' ? (
              <Link href="/primitives/theming" className="w-full">
                <Button variant="outline" className="w-full">
                  {step.action}
                </Button>
              </Link>
            ) : step.action === 'View components' ? (
              <Link href="/primitives/components/button" className="w-full">
                <Button variant="outline" className="w-full">
                  {step.action}
                </Button>
              </Link>
            ) : step.action === 'View documentation' ? (
              <Button variant="outline" className="w-full" asChild>
                <a
                  href="https://tailwindcss.com/docs/installation"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {step.action}
                </a>
              </Button>
            ) : step.action === 'View theme setup' ? (
              <Button variant="outline" className="w-full" asChild>
                <a
                  href="https://github.com/pacocoursey/next-themes#readme"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {step.action}
                </a>
              </Button>
            ) : (
              <Button variant="outline" className="w-full">
                {step.action}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function GuidesPage() {
  const [activeGuide, setActiveGuide] = useState<'designer' | 'developer'>(
    'designer'
  );

  const currentSteps: StepType[] =
    activeGuide === 'designer' ? designerSteps : developerSteps;

  return (
    <div className="px-3 py-16">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-16 text-center"
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">Getting started</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive guides to help designers and developers implement
              our design system effectively in their workflows and projects.
            </p>
          </div>

          {/* Guide Selector */}
          <section className="space-y-8">
            <div className="flex justify-center">
              <div className="flex p-1 bg-muted rounded-lg">
                <Button
                  variant={activeGuide === 'designer' ? 'default' : 'ghost'}
                  onClick={() => setActiveGuide('designer')}
                  className="flex items-center space-x-2"
                >
                  <Palette className="h-4 w-4" />
                  <span>For designers</span>
                </Button>
                <Button
                  variant={activeGuide === 'developer' ? 'default' : 'ghost'}
                  onClick={() => setActiveGuide('developer')}
                  className="flex items-center space-x-2"
                >
                  <Code className="h-4 w-4" />
                  <span>For developers</span>
                </Button>
              </div>
            </div>

            {/* Step Count */}
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 text-sm text-muted-foreground">
                <span>{currentSteps.length} steps to get started</span>
              </div>
            </div>
          </section>

          {/* Steps */}
          <section className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">
                {activeGuide === 'designer' ? 'Designer' : 'Developer'} guide
              </h2>
              <p className="text-muted-foreground">
                {activeGuide === 'designer'
                  ? 'Everything you need to design with our system'
                  : 'Technical implementation guide for our components'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 md:auto-rows-fr">
              {currentSteps.map((step, index) => (
                <div key={step.title} className="flex">
                  <StepCard step={step} index={index} />
                </div>
              ))}
            </div>
          </section>

          {/* Resources */}
          <section className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Resources & links</h2>
              <p className="text-muted-foreground">
                Additional resources to help you work with our design system
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {resources.map((resource, index) => (
                <motion.div
                  key={resource.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="group hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">
                            {resource.title}
                          </CardTitle>
                          <CardDescription>
                            {resource.description}
                          </CardDescription>
                        </div>
                        <div
                          className={`p-2 rounded-lg ${
                            resource.type === 'design'
                              ? 'bg-purple-100 text-purple-600'
                              : 'bg-blue-100 text-blue-600'
                          }`}
                        >
                          {resource.type === 'design' ? (
                            <Palette className="h-4 w-4" />
                          ) : (
                            <Code className="h-4 w-4" />
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button
                        variant="outline"
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Open resource
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Team Collaboration */}
          <section className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Team collaboration</h2>
              <p className="text-muted-foreground">
                Best practices for design-development collaboration
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center">
                <CardHeader>
                  <Users className="h-8 w-8 mx-auto text-primary mb-2" />
                  <CardTitle>Communication</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Establish clear handoff processes and regular design-dev
                    sync meetings.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Book className="h-8 w-8 mx-auto text-primary mb-2" />
                  <CardTitle>Documentation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Keep design decisions and component usage documented and
                    accessible.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <CheckCircle className="h-8 w-8 mx-auto text-primary mb-2" />
                  <CardTitle>Quality assurance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Regular design reviews and component audits maintain system
                    integrity.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Support */}
          <section className="text-center space-y-6 py-16">
            <h2 className="text-4xl font-bold">Need help?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our design system team is here to support you. Reach out with
              questions, suggestions, or contribution ideas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                <ExternalLink className="mr-2 h-4 w-4" />
                Join Slack channel
              </Button>
              <Button size="lg" variant="outline">
                <ExternalLink className="mr-2 h-4 w-4" />
                Submit feedback
              </Button>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
