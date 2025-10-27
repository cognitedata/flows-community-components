"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Terminal, Package, FileCode, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/cognite/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/cognite/card";
import { Badge } from "@/components/ui/cognite/badge";

const steps = [
  {
    icon: Terminal,
    title: "Create your project",
    description: "Start with a new Next.js project or use your existing one",
    code: "npx create-next-app@latest my-app --typescript --tailwind --app",
  },
  {
    icon: Package,
    title: "Install dependencies",
    description: "Install the required packages for Aura components",
    code: "npm install @radix-ui/react-slot class-variance-authority clsx tailwind-merge lucide-react",
  },
  {
    icon: FileCode,
    title: "Configure Tailwind",
    description: "Update your tailwind.config.js with Aura's theme configuration",
    configStep: true,
  },
  {
    icon: CheckCircle2,
    title: "Start building",
    description: "Copy components from the documentation and start building your app",
  },
];

export default function InstallationPage() {
  return (
    <div className="px-3 py-16">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-16"
        >
          {/* Header */}
          <div className="space-y-4">
            <Badge className="mb-4">Getting Started</Badge>
            <h1 className="text-4xl md:text-6xl font-bold">Installation</h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Get started with Aura in minutes. Follow these steps to set up your
              project and start building with our design system.
            </p>
          </div>

          {/* Prerequisites */}
          <Card>
            <CardHeader>
              <CardTitle>Prerequisites</CardTitle>
              <CardDescription>
                Make sure you have the following installed on your machine
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Node.js 18.17 or later</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>npm, yarn, or pnpm</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>A Next.js 13+ project with App Router</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Installation Steps */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">Quick Start</h2>
            <div className="space-y-6">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <step.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-muted-foreground">
                              Step {index + 1}
                            </span>
                          </div>
                          <CardTitle className="mt-1">{step.title}</CardTitle>
                          <CardDescription className="mt-2">
                            {step.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    {step.code && (
                      <CardContent>
                        <div className="relative">
                          <pre className="overflow-x-auto rounded-lg bg-muted p-4">
                            <code className="text-sm">{step.code}</code>
                          </pre>
                        </div>
                      </CardContent>
                    )}
                    {step.configStep && (
                      <CardContent>
                        <div className="space-y-4">
                          <p className="text-sm text-muted-foreground">
                            Add the following to your <code className="rounded bg-muted px-1.5 py-0.5">tailwind.config.js</code>:
                          </p>
                          <div className="relative">
                            <pre className="overflow-x-auto rounded-lg bg-muted p-4">
                              <code className="text-sm">{`module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Add Aura theme configuration here
    },
  },
  plugins: [],
}`}</code>
                            </pre>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Usage */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Usage</h2>
            <Card>
              <CardHeader>
                <CardTitle>Adding Components</CardTitle>
                <CardDescription>
                  Components are designed to be copied and pasted into your project
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Browse the component documentation, find the component you need,
                  and copy the code directly into your project. Each component is
                  self-contained and includes all necessary imports.
                </p>
                <div className="flex gap-4">
                  <Button asChild>
                    <Link href="/docs">
                      Browse Components
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/primitives">View Primitives</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Next Steps */}
          <div className="space-y-6 border-t pt-16">
            <h2 className="text-3xl font-bold">Next Steps</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <Link href="/docs/components/button">
                  <CardHeader>
                    <CardTitle>Explore Components</CardTitle>
                    <CardDescription>
                      Browse our library of production-ready components
                    </CardDescription>
                  </CardHeader>
                </Link>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <Link href="/primitives">
                  <CardHeader>
                    <CardTitle>Design System</CardTitle>
                    <CardDescription>
                      Learn about our design tokens, colors, and guidelines
                    </CardDescription>
                  </CardHeader>
                </Link>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <Link href="/tokens">
                  <CardHeader>
                    <CardTitle>Design Tokens</CardTitle>
                    <CardDescription>
                      Explore our color palette and typography system
                    </CardDescription>
                  </CardHeader>
                </Link>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <Link href="/blocks">
                  <CardHeader>
                    <CardTitle>Example Blocks</CardTitle>
                    <CardDescription>
                      Check out pre-built blocks and templates
                    </CardDescription>
                  </CardHeader>
                </Link>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

