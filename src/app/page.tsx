"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Palette, Zap, Grid3X3, Layout, BookOpen, Code2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

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
    href: "/docs",
  },
  {
    icon: BookOpen,
    title: "Getting started",
    description: "Guides for designers and developers",
    href: "/guides",
  },
]

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-16"
      >
        {/* Hero Section */}
        <motion.section variants={itemVariants} className="text-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Design system
              <span className="block text-primary">guidelines</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A comprehensive design system documentation with interactive examples, 
              live code previews, and guidelines for building consistent digital experiences.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/tokens">
                Explore tokens
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/guides">
                <Code2 className="mr-2 h-4 w-4" />
                Get started
              </Link>
            </Button>
          </div>
        </motion.section>

        {/* About Section */}
        <motion.section variants={itemVariants} className="text-center space-y-6">
          <h2 className="text-3xl font-bold">Built for teams</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our design system bridges the gap between design and development, 
            providing a single source of truth for creating cohesive user experiences.
          </p>
        </motion.section>

        {/* Principles Section */}
        <motion.section variants={itemVariants} className="space-y-8">
          <h2 className="text-3xl font-bold text-center">Core Principles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardHeader>
                <CardTitle>Consistency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Unified patterns and components ensure coherent experiences across all touchpoints.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <CardTitle>Accessibility</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  WCAG-compliant designs that work for everyone, regardless of ability or technology.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <CardTitle>Scalability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Flexible components and patterns that grow with your product and team needs.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Features Grid */}
        <motion.section variants={itemVariants} className="space-y-8">
          <h2 className="text-3xl font-bold text-center">Explore the System</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <Link href={feature.href}>
                    <CardHeader>
                      <feature.icon className="h-8 w-8 text-primary mb-2" />
                      <CardTitle>{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Component Showcase */}
        <motion.section variants={itemVariants} className="space-y-8">
          <h2 className="text-3xl font-bold text-center">Component Showcase</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-6">
              <Button className="w-full">Primary Button</Button>
            </Card>
            <Card className="p-6">
              <Button variant="outline" className="w-full">Secondary Button</Button>
            </Card>
            <Card className="p-6 space-y-3">
              <div className="h-3 bg-primary rounded-full"></div>
              <div className="h-3 bg-primary/60 rounded-full"></div>
              <div className="h-3 bg-primary/30 rounded-full"></div>
            </Card>
            <Card className="p-6">
              <div className="space-y-2">
                <div className="text-sm font-medium">Typography Scale</div>
                <div className="text-xs text-muted-foreground">12px</div>
                <div className="text-sm text-muted-foreground">14px</div>
                <div className="text-base">16px</div>
              </div>
            </Card>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section variants={itemVariants} className="text-center space-y-6 py-16">
          <h2 className="text-4xl font-bold">Ready to get started?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you&apos;re a designer or developer, our guides will help you implement 
            our design system in your next project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/guides">
                Designer Guide
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/guides">
                Developer Guide
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
        </div>
        </motion.section>
      </motion.div>
    </div>
  )
}
