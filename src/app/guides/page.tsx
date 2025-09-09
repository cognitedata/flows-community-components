"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { 
  Palette, 
  Code, 
  Download, 
  ExternalLink, 
  CheckCircle, 
  Users, 
  Lightbulb,
  Rocket,
  Book,
  Terminal
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const designerSteps = [
  {
    title: "Download Figma library",
    description: "Get our complete Figma design system with all components, tokens, and styles",
    icon: Download,
    action: "Download library",
  },
  {
    title: "Review design tokens",
    description: "Familiarize yourself with our color palette, typography, and spacing system",
    icon: Palette,
    action: "View tokens",
  },
  {
    title: "Study components",
    description: "Explore component variations, states, and usage guidelines",
    icon: Book,
    action: "Browse components",
  },
  {
    title: "Design patterns",
    description: "Learn about layout patterns and responsive design principles",
    icon: Lightbulb,
    action: "View patterns",
  },
]

const developerSteps = [
  {
    title: "Install dependencies",
    description: "Set up your project with our component library and design tokens",
    icon: Terminal,
    action: "View installation",
  },
  {
    title: "Configure theme",
    description: "Set up dark/light mode and customize the theme to match your brand",
    icon: Palette,
    action: "Setup guide",
  },
  {
    title: "Import components",
    description: "Learn how to import and use components in your React application",
    icon: Code,
    action: "Code examples",
  },
  {
    title: "Build & deploy",
    description: "Best practices for production builds and deployment",
    icon: Rocket,
    action: "Deploy guide",
  },
]

const resources = [
  {
    title: "Figma design system",
    description: "Complete design files with components, styles, and documentation",
    type: "design",
    link: "#",
  },
  {
    title: "GitHub repository",
    description: "Source code, examples, and contribution guidelines",
    type: "development",
    link: "#",
  },
  {
    title: "Storybook documentation",
    description: "Interactive component documentation and examples",
    type: "development",
    link: "#",
  },
  {
    title: "Design guidelines PDF",
    description: "Comprehensive brand and design guidelines document",
    type: "design",
    link: "#",
  },
]

function StepCard({ 
  step, 
  index, 
  completed = false 
}: { 
  step: typeof designerSteps[0]
  index: number
  completed?: boolean 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className={`relative ${completed ? 'ring-2 ring-primary' : ''}`}>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${completed ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                {completed ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <step.icon className="h-5 w-5" />
                )}
              </div>
              <div>
                <CardTitle className="text-lg">{step.title}</CardTitle>
                <CardDescription>{step.description}</CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Button 
            variant={completed ? "default" : "outline"} 
            className="w-full"
            disabled={completed}
          >
            {completed ? "Completed" : step.action}
          </Button>
        </CardContent>
        <div className="absolute top-4 right-4 text-sm text-muted-foreground">
          {index + 1}
        </div>
      </Card>
    </motion.div>
  )
}

export default function GuidesPage() {
  const [activeGuide, setActiveGuide] = useState<"designer" | "developer">("designer")
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const toggleStep = (index: number) => {
    setCompletedSteps(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const currentSteps = activeGuide === "designer" ? designerSteps : developerSteps

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-16"
      >
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold">Getting started</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive guides to help designers and developers implement our design system 
            effectively in their workflows and projects.
          </p>
        </div>

        {/* Guide Selector */}
        <section className="space-y-8">
          <div className="flex justify-center">
            <div className="flex p-1 bg-muted rounded-lg">
              <Button
                variant={activeGuide === "designer" ? "default" : "ghost"}
                onClick={() => setActiveGuide("designer")}
                className="flex items-center space-x-2"
              >
                <Palette className="h-4 w-4" />
                <span>For designers</span>
              </Button>
              <Button
                variant={activeGuide === "developer" ? "default" : "ghost"}
                onClick={() => setActiveGuide("developer")}
                className="flex items-center space-x-2"
              >
                <Code className="h-4 w-4" />
                <span>For developers</span>
              </Button>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Progress:</span>
              <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${(completedSteps.length / currentSteps.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <span>{completedSteps.length}/{currentSteps.length}</span>
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">
              {activeGuide === "designer" ? "Designer" : "Developer"} guide
            </h2>
            <p className="text-muted-foreground">
              {activeGuide === "designer" 
                ? "Everything you need to design with our system"
                : "Technical implementation guide for our components"
              }
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {currentSteps.map((step, index) => (
              <div key={step.title} onClick={() => toggleStep(index)}>
                <StepCard 
                  step={step} 
                  index={index} 
                  completed={completedSteps.includes(index)}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Quick Start */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Quick start</h2>
            <p className="text-muted-foreground">
              Get up and running quickly with these essential commands and downloads
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Palette className="h-5 w-5" />
                  <span>For designers</span>
                </CardTitle>
                <CardDescription>
                  Download and set up the Figma design system
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">1. Download Figma library</div>
                  <Button className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download Figma file
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">2. Enable as team library</div>
                  <p className="text-xs text-muted-foreground">
                    Go to Assets → Team library → Enable for your team
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">3. Start designing</div>
                  <p className="text-xs text-muted-foreground">
                    Use components from the Assets panel in your designs
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Code className="h-5 w-5" />
                  <span>For developers</span>
                </CardTitle>
                <CardDescription>
                  Install and configure the component library
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium">1. Install dependencies</div>
                  <div className="bg-muted p-2 rounded text-xs font-mono">
                    npm install next-themes @radix-ui/react-*
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">2. Add components</div>
                  <div className="bg-muted p-2 rounded text-xs font-mono">
                    npx shadcn@latest add button card input
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">3. Import & use</div>
                  <div className="bg-muted p-2 rounded text-xs font-mono">
                    import {"{ Button }"} from &apos;@/components/ui/button&apos;
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Resources */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Resources & links</h2>
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
                        <CardDescription>{resource.description}</CardDescription>
                      </div>
                      <div className={`p-2 rounded-lg ${
                        resource.type === 'design' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {resource.type === 'design' ? <Palette className="h-4 w-4" /> : <Code className="h-4 w-4" />}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
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
            <h2 className="text-3xl font-bold">Team collaboration</h2>
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
                  Establish clear handoff processes and regular design-dev sync meetings.
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
                  Keep design decisions and component usage documented and accessible.
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
                  Regular design reviews and component audits maintain system integrity.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Support */}
        <section className="text-center space-y-6 py-16">
          <h2 className="text-4xl font-bold">Need help?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our design system team is here to support you. Reach out with questions, 
            suggestions, or contribution ideas.
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
  )
}
