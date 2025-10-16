"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { PaletteIcon } from "lucide-react";
import { Button } from "@/components/ui/cognite/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cognite/card";

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

// Images are served from the public folder at /overview/about/*.webp

const exploreCards = [
  {
    title: "Getting started",
    href: "/overview/getting-started",
    image: "/images/overview/about/getting_started_.webp",
  },
  {
    title: "Layouts",
    href: "/layouts",
    image: "/images/overview/about/layouts.webp",
  },
  {
    title: "Tokens",
    href: "/primitives/colors",
    image: "/images/overview/about/tokens_.webp",
  },
  {
    title: "Components",
    href: "/primitives/components/introduction",
    image: "/images/overview/about/components.webp",
  },
  {
    title: "Patterns",
    href: "/blocks",
    image: "/images/overview/about/patterns.webp",
  },
  {
    title: "Building with AI",
    href: "/evaluations",
    image: "/images/overview/about/building_with_ai_.webp",
  },
];

export default function Home() {
  return (
    <div className="px-3 py-16">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-16 text-center"
        >
          {/* Hero Section */}
          <motion.section
            variants={itemVariants}
            className="text-center space-y-6"
          >
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                About Aura
               
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Aura is Cognite&apos;s AI-native design system - built to accelerate how humans and AI design, build, and evolve industrial applications together. 
              In these docs, you&apos;ll find the building blocks of that system: interactive examples, live code, and practical guidance for designing and developing cohesive, intelligent experiences              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/tokens">
                  <PaletteIcon className="mr-2 h-4 w-4" />
                  Explore foundations
                </Link>
              </Button>
            </div>
          </motion.section>

          {/* Principles Section */}
          <motion.section variants={itemVariants} className="space-y-8">
            <h2 className="text-3xl font-bold text-center">Core principles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center">
                <CardHeader>
                  <CardTitle>Intentional</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Every element has a purpose. Design choices are grounded in
                    research and feedback, ensuring clarity in complexity.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <CardTitle>Adaptive</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    The system flexes to different contexts and scales,
                    embracing fractal perspectives that reveal insights at any
                    level.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <CardTitle>Intuitive</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Interactions guide users naturally, letting motion,
                    hierarchy, and structure feel effortless and transparent.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.section>

          {/* Features Grid - Explore the system */}
          <motion.section variants={itemVariants} className="space-y-8">
            <h2 className="text-3xl font-bold text-center">
              Explore the system
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exploreCards.map((card) => (
                <motion.div
                  key={card.title}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="p-0 overflow-hidden cursor-pointer">
                    <Link href={card.href}>
                      <Image
                        src={card.image}
                        alt={card.title}
                        width={1200}
                        height={800}
                        className="w-full h-auto object-cover grayscale hover:grayscale-0 transition duration-300"
                        priority={false}
                      />
                    </Link>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          
        </motion.div>
      </div>
    </div>
  );
}
