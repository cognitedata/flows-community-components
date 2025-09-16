import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Palette, Zap, Code, Sparkles } from "lucide-react"
import Link from "next/link"
import { AuraLogo } from "@/components/aura-logo"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Logo and Brand */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <AuraLogo size={64} />
            <div>
              <h1 className="text-4xl font-bold lowercase" style={{ fontFamily: "'Nova Mono', monospace" }}>
                aura
              </h1>
              <p className="text-muted-foreground">Design System</p>
            </div>
          </div>

          {/* Hero Text */}
          <div className="space-y-4">
            <h2 className="text-5xl sm:text-6xl font-bold tracking-tight">
              Build with{" "}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Aurora Lime
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A comprehensive design system powered by Aurora Lime colors, 
              ShadCN components, and intelligent theming for modern web applications.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/overview">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="text-lg px-8">
              <Link href="/primitives">
                Explore Components
              </Link>
            </Button>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Palette className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Aurora Lime Theming</CardTitle>
                <CardDescription>
                  Dynamic color system with intelligent light/dark mode switching
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary">18 Color Palettes</Badge>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>ShadCN Components</CardTitle>
                <CardDescription>
                  Production-ready components built on Radix UI primitives
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary">25+ Components</Badge>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>AI-Powered Sandbox</CardTitle>
                <CardDescription>
                  Generate custom components with AI assistance using your design system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary">Gemini Powered</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}