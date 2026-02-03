import { Alert, AlertDescription, AlertTitle } from "@/components/ui/aura/alert";
import { Button } from "@/components/ui/aura/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/aura/card";
import { CodeBlock, CodeBlockCopyButton } from "@/components/ui/aura/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/aura/tabs";
import {
  IconAlertTriangle as AlertTriangle,
  IconArrowRight as ArrowRight,
  IconBook as BookOpen,
  IconChevronDown as ChevronDown,
  IconCode as Code2,
  IconGrid3x3 as Grid3X3,
  IconLayout as Layout,
  IconPalette as Palette,
  IconSettings as Settings,
  IconSparkles as Sparkles,
  IconTerminal as Terminal,
  IconBolt as Zap,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const duneDocsUrl = "https://laughing-adventure-r6kwpyy.pages.github.io/";

const componentsJson = `{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/styles.css",
    "baseColor": "zinc",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "registries": {
    "@aura": "https://cognitedata.github.io/aura/r/{name}.json"
  }
}`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const features = [
  {
    icon: Palette,
    title: "Design tokens",
    description: "Colors, typography, and spacing tokens with live previews",
    href: "/tokens",
  },
  {
    icon: Zap,
    title: "Motion guidelines",
    description: "Animation principles and interactive demonstrations",
    href: "/motion",
  },
  {
    icon: Grid3X3,
    title: "UI primitives",
    description: "Core components with live code examples",
    href: "/primitives",
  },
  {
    icon: Layout,
    title: "Layout patterns",
    description: "Responsive layouts with resizable previews",
    href: "/layouts",
  },
  {
    icon: Code2,
    title: "Component docs",
    description: "Comprehensive documentation with live examples and code snippets",
    href: "/primitives",
  },
  {
    icon: BookOpen,
    title: "Getting started",
    description: "Guides for designers and developers",
    href: "#quick-start",
  },
];

export default function HomePage() {
  const scrollToQuickStart = () => {
    const element = document.getElementById("quick-start");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-primary/20">
      {/* Splash Screen Section */}
      <div className="relative z-10 flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl text-center space-y-12"
        >
          {/* Hero Text */}
          <div className="space-y-6">
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight text-foreground">
              Build with Aura
            </h1>
            <p className="text-xl sm:text-2xl max-w-2xl mx-auto leading-relaxed text-muted-foreground">
              Aura is Cognite&apos;s AI-native design system inspired by fractal intelligence and
              adaptive by nature.
            </p>
          </div>

          {/* Alert Banner */}
          <div className="max-w-2xl mx-auto">
            <Alert variant="error" className="text-left">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle className="font-bold">Aura is still in active development</AlertTitle>
              <AlertDescription>
                This site reflects a prototype that&apos;s changing fast. It&apos;s here for
                exploration and prototyping only, not production use. For feedback, hang tight —
                we&apos;re already working through major updates and will open structured feedback
                rounds once the foundation is more stable.
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
              className="text-lg px-8 h-14 rounded-full backdrop-blur-sm bg-background/50"
              render={<Link to="/primitives">Explore components</Link>}
            />
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
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <ChevronDown className="h-10 w-10 text-muted-foreground/70 hover:text-foreground transition-colors" />
          </motion.div>
        </motion.div>
      </div>

      {/* Quick Start Section */}
      <div
        id="quick-start"
        className="relative z-10 bg-background/80 backdrop-blur-3xl py-20 sm:py-24"
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">Quick Start</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Get up and running with Aura in minutes. Choose your path to start building.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Tabs defaultValue="dune" className="w-full">
                <div className="flex justify-center mb-8">
                  <TabsList className="h-12 p-1 bg-muted/50 backdrop-blur-sm border border-border/50">
                    <TabsTrigger
                      value="dune"
                      className="h-full px-6 text-base data-[state=active]:bg-background data-[state=active]:shadow-sm"
                    >
                      Create with Dune
                    </TabsTrigger>
                    <TabsTrigger
                      value="custom"
                      className="h-full px-6 text-base data-[state=active]:bg-background data-[state=active]:shadow-sm"
                    >
                      Custom installation
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="dune" className="space-y-8 mt-0">
                  <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-start gap-6">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                          <Terminal className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <CardTitle className="text-xl">Create with Dune</CardTitle>
                          <CardDescription className="text-base">
                            Follow the official Dune creation docs to set up Aura quickly and keep
                            your project aligned with the latest guidance.
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pl-0 md:pl-22">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        <Button
                          render={
                            <a href={duneDocsUrl} target="_blank" rel="noopener noreferrer">
                              Open Dune creation docs
                            </a>
                          }
                        />
                        <span className="text-sm text-muted-foreground">
                          All setup steps now live in the Dune creation docs.
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="custom" className="space-y-8 mt-0">
                  <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-start gap-6">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                          <Sparkles className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <CardTitle className="text-xl">Add the Cursor MCP server</CardTitle>
                          <CardDescription className="text-base">
                            Install the shadcn MCP server so Cursor can integrate with the Aura
                            tooling.
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pl-0 md:pl-22">
                      <a
                        href="https://cursor.com/en-US/install-mcp?name=shadcn&config=eyJjb21tYW5kIjoibnB4IHNoYWRjbkBsYXRlc3QgbWNwIn0%3D"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src="https://cursor.com/deeplink/mcp-install-dark.svg"
                          alt="Add shadcn MCP server to Cursor"
                          height={32}
                        />
                      </a>
                    </CardContent>
                  </Card>

                  <Card className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex flex-col md:flex-row md:items-start gap-6">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                          <Settings className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <CardTitle className="text-xl">Add Aura to components.json</CardTitle>
                          <CardDescription className="text-base">
                            Copy this into a file named components.json at the root of your project.
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pl-0 md:pl-22">
                      <CodeBlock code={componentsJson} language="json">
                        <CodeBlockCopyButton />
                      </CodeBlock>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-10 border-t border-border/60 px-4 py-20 sm:py-24">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-12 text-center"
          >
            <motion.section variants={itemVariants} className="text-center space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Design system
                  <span className="block text-primary">guidelines</span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  A comprehensive design system documentation with interactive examples, live code
                  previews, and guidelines for building consistent digital experiences.
                </p>
              </div>
            </motion.section>

            <motion.section variants={itemVariants} className="space-y-8">
              <h3 className="text-2xl font-bold text-center">Explore the system</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature) => (
                  <motion.div
                    key={feature.title}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                      {feature.href.startsWith("#") ? (
                        <a href={feature.href}>
                          <CardHeader>
                            <feature.icon className="h-8 w-8 text-primary mb-2" />
                            <CardTitle>{feature.title}</CardTitle>
                            <CardDescription>{feature.description}</CardDescription>
                          </CardHeader>
                        </a>
                      ) : (
                        <Link to={feature.href}>
                          <CardHeader>
                            <feature.icon className="h-8 w-8 text-primary mb-2" />
                            <CardTitle>{feature.title}</CardTitle>
                            <CardDescription>{feature.description}</CardDescription>
                          </CardHeader>
                        </Link>
                      )}
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.section variants={itemVariants} className="text-center space-y-6">
              <h3 className="text-2xl font-bold">Built for teams</h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our design system bridges the gap between design and development, providing a single
                source of truth for creating cohesive user experiences.
              </p>
            </motion.section>

            <motion.section variants={itemVariants} className="space-y-8">
              <h3 className="text-2xl font-bold text-center">Core principles</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="text-center">
                  <CardHeader>
                    <CardTitle>Intentional</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Every element has a purpose. Design choices are grounded in research and
                      feedback, ensuring clarity in complexity.
                    </p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardHeader>
                    <CardTitle>Adaptive</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      The system flexes to different contexts and scales, embracing fractal
                      perspectives that reveal insights at any level.
                    </p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardHeader>
                    <CardTitle>Intuitive</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Interactions guide users naturally, letting motion, hierarchy, and structure
                      feel effortless and transparent.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.section>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
