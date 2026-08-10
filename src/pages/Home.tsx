import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CodeBlock,
  CodeBlockCopyButton,
} from '@cognite/aura/components';
import {
  IconArrowRight as ArrowRight,
  IconBook as BookOpen,
  IconChevronDown as ChevronDown,
  IconPackage as Package,
  IconSparkles as Sparkles,
  IconTerminal as Terminal,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import {
  auraStylesCssExample,
  componentsJsonExample,
  installCommandExample,
} from '@/lib/install-snippets';

const coreDocsUrl = 'https://docs.cognite.com/aura-design-system';
const storybookUrl = 'https://cognitedata.github.io/aura/storybook/';

const searchOrder = [
  {
    step: '1',
    title: 'Aura Core',
    description:
      'Use versioned primitives from the @cognite/aura NPM package for foundational UI.',
  },
  {
    step: '2',
    title: 'Flows Community',
    description:
      'Install ejectable community components from this registry when Core does not cover the need.',
  },
  {
    step: '3',
    title: 'Compatible registries',
    description:
      'Prefer shadcn registries built on Base UI, then adapt them to Aura tokens and primitives.',
  },
  {
    step: '4',
    title: 'Build new',
    description:
      'Create a new community component with Aura primitives and tokens, then contribute it here.',
  },
];

export default function HomePage() {
  const scrollToQuickStart = () => {
    const element = document.getElementById('quick-start');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-primary/20">
      <div className="relative z-10 flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-4xl text-center space-y-12"
        >
          <div className="space-y-6">
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Flows Community
            </p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground">
              Shared components for industrial apps
            </h1>
            <p className="text-xl sm:text-2xl max-w-2xl mx-auto leading-relaxed text-muted-foreground">
              A shadcn registry for Cognite Flows, powered by Aura. Core
              primitives stay on NPM as{' '}
              <span className="text-foreground">@cognite/aura</span>.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Alert className="text-left">
              <Package className="h-4 w-4" />
              <AlertTitle className="font-bold">
                Community is not Aura Core
              </AlertTitle>
              <AlertDescription>
                Components here are community-vetted and used at your
                discretion. They are powered by Aura tokens and primitives.
                Official Aura docs remain at{' '}
                <a
                  href={coreDocsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2"
                >
                  docs.cognite.com/aura-design-system
                </a>
                .
              </AlertDescription>
            </Alert>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4">
            <Button
              size="lg"
              className="text-lg px-8 h-14 rounded-full"
              render={
                <Link to="/community/installation">
                  Install from registry
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              }
            />
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 h-14 rounded-full backdrop-blur-sm bg-background/50"
              render={<Link to="/community">Browse community</Link>}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 cursor-pointer"
          onClick={scrollToQuickStart}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'easeInOut',
            }}
          >
            <ChevronDown className="h-10 w-10 text-muted-foreground/70 hover:text-foreground transition-colors" />
          </motion.div>
        </motion.div>
      </div>

      <div
        id="quick-start"
        className="relative z-10 bg-background/80 backdrop-blur-3xl py-20 sm:py-24"
      >
        <div className="container mx-auto px-4 max-w-5xl space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Quick start
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Point your project at the Flows Community registry, then install
              components with the shadcn CLI.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 mb-4">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">
                  Add the registry namespace
                </CardTitle>
                <CardDescription className="text-base">
                  For Tailwind v4, leave{' '}
                  <code className="text-foreground">tailwind.config</code> empty
                  and point{' '}
                  <code className="text-foreground">tailwind.css</code> at your
                  app stylesheet.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock code={componentsJsonExample} language="json">
                  <CodeBlockCopyButton />
                </CodeBlock>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 mb-4">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Reference Aura styles</CardTitle>
                <CardDescription className="text-base">
                  Import Aura source styles in that stylesheet so Tailwind can
                  generate tokens, then{' '}
                  <code className="text-foreground">@source</code> installed
                  community components.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock code={auraStylesCssExample} language="css">
                  <CodeBlockCopyButton />
                </CodeBlock>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm md:col-span-2">
              <CardHeader>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 mb-4">
                  <Terminal className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Install a component</CardTitle>
                <CardDescription className="text-base">
                  Community items copy source into your repo and declare{' '}
                  <code className="text-foreground">@cognite/aura</code> as an
                  npm dependency.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <CodeBlock code={installCommandExample} language="bash">
                  <CodeBlockCopyButton />
                </CodeBlock>
                <div className="flex flex-wrap gap-3">
                  <Button
                    render={
                      <Link to="/community/installation">Full guide</Link>
                    }
                  />
                  <Button render={<Link to="/community">View catalog</Link>} />
                  <Button
                    variant="outline"
                    render={
                      <a
                        href={storybookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Open Storybook
                      </a>
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold">Search order</h3>
              <p className="text-muted-foreground">
                Builders and agents should look for UI in this order.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {searchOrder.map((item) => (
                <Card key={item.step} className="text-left">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-lg">
                      <span className="inline-flex size-8 items-center justify-center rounded-full bg-primary/10 text-sm text-primary">
                        {item.step}
                      </span>
                      {item.title}
                    </CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          <Card className="border-border/50 bg-card/50">
            <CardHeader>
              <div className="flex items-start gap-4">
                <BookOpen className="mt-1 h-6 w-6 text-primary" />
                <div className="space-y-2">
                  <CardTitle>Aura docs</CardTitle>
                  <CardDescription>
                    Flows Community is powered by Aura. Getting started with
                    Aura Core primitives lives in the official documentation.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button
                render={
                  <a
                    href={coreDocsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open Aura docs
                  </a>
                }
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
