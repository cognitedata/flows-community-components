"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Palette, Zap, Code, Sparkles } from "lucide-react"
import Link from "next/link"
import { AuraLogo } from "@/components/aura-logo"
import PrismaticBurst from "@/components/PrismaticBurst"
import { ExpandableFeatureCards } from "@/components/expandable-feature-cards"


export default function HomePage() {
  return (
    <div className="relative min-h-screen">
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
          colors={['#84cc16', '#6366f1', '#64748b']}
        />
      </div>
      
      {/* Hero Section */}
      <div className="relative z-10 container mx-auto px-4 pt-20 pb-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Logo and Brand */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <AuraLogo size={64} />
            <div>
              <h1 className="text-4xl font-bold lowercase" style={{ fontFamily: "'Nova Mono', monospace" }}>
                aura
              </h1>
              <p className="text-muted-foreground">Design system</p>
            </div>
          </div>

          {/* Hero Text */}
          <div className="space-y-4">
            <h2 className="text-5xl sm:text-6xl font-bold tracking-tight">
              Build with{" "}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Aura
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A comprehensive design system powered by Aurora lime colors, 
              ShadCN components, and intelligent theming for modern web applications.
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
            <Button variant="outline" size="lg" asChild className="text-lg px-8">
              <Link href="/primitives">
                Explore components
              </Link>
            </Button>
          </div>

          {/* Feature Grid */}
          <div className="mt-16">
            <ExpandableFeatureCards />
          </div>
        </div>
      </div>
    </div>
  )
}