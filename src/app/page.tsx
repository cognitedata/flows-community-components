"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Palette, Zap, Code, Sparkles } from "lucide-react"
import Link from "next/link"
import { AuraLogo } from "@/components/aura-logo"
import PrismaticBurst from "@/components/PrismaticBurst"
import { GlowingEffect } from "@/components/ui/glowing-effect"


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
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <Card className="relative border border-white/20 hover:border-primary/40 transition-all duration-300 overflow-hidden backdrop-blur-xl bg-white/10 dark:bg-black/10 shadow-2xl hover:shadow-primary/20 rounded-sm">
              <GlowingEffect
                spread={60}
                glow={false}
                disabled={false}
                proximity={80}
                inactiveZone={0.2}
                borderWidth={1}
                variant="default"
              />
              <CardHeader>
                <div className="w-12 h-12 rounded bg-primary/20 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-4" style={{ borderRadius: '4px' }}>
                  <Palette className="h-6 w-6 text-primary drop-shadow-sm" />
                </div>
                <CardTitle className="text-foreground/90 font-semibold">Aurora lime theming</CardTitle>
                <CardDescription className="text-foreground/70">
                  Dynamic color system with intelligent light/dark mode switching
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary" className="bg-white/20 border-white/20 text-foreground/80 backdrop-blur-sm">18 color palettes</Badge>
              </CardContent>
            </Card>

            <Card className="relative border border-white/20 hover:border-primary/40 transition-all duration-300 overflow-hidden backdrop-blur-xl bg-white/10 dark:bg-black/10 shadow-2xl hover:shadow-primary/20 rounded-sm">
              <GlowingEffect
                spread={60}
                glow={false}
                disabled={false}
                proximity={80}
                inactiveZone={0.2}
                borderWidth={1}
                variant="default"
              />
              <CardHeader>
                <div className="w-12 h-12 rounded bg-primary/20 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-4" style={{ borderRadius: '4px' }}>
                  <Code className="h-6 w-6 text-primary drop-shadow-sm" />
                </div>
                <CardTitle className="text-foreground/90 font-semibold">ShadCN components</CardTitle>
                <CardDescription className="text-foreground/70">
                  Production-ready components built on Radix UI primitives
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary" className="bg-white/20 border-white/20 text-foreground/80 backdrop-blur-sm">25+ components</Badge>
              </CardContent>
            </Card>

            <Card className="relative border border-white/20 hover:border-primary/40 transition-all duration-300 overflow-hidden backdrop-blur-xl bg-white/10 dark:bg-black/10 shadow-2xl hover:shadow-primary/20 rounded-sm">
              <GlowingEffect
                spread={60}
                glow={false}
                disabled={false}
                proximity={80}
                inactiveZone={0.2}
                borderWidth={1}
                variant="default"
              />
              <CardHeader>
                <div className="w-12 h-12 rounded bg-primary/20 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-4" style={{ borderRadius: '4px' }}>
                  <Sparkles className="h-6 w-6 text-primary drop-shadow-sm" />
                </div>
                <CardTitle className="text-foreground/90 font-semibold">AI-powered sandbox</CardTitle>
                <CardDescription className="text-foreground/70">
                  Generate custom components with AI assistance using your design system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary" className="bg-white/20 border-white/20 text-foreground/80 backdrop-blur-sm">Gemini powered</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}