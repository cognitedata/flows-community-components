import { SectionLayout } from "@/components/section-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Palette, Code, Zap, Wrench } from "lucide-react"

export default function SandboxPage() {
  return (
    <SectionLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">Sandbox</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Experimental space for testing new components, exploring design patterns, 
            and prototyping future features. Everything here is work in progress.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-dashed">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted">
                  <Palette className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-lg">Component playground</CardTitle>
                  <Badge variant="secondary">Coming soon</Badge>
                </div>
              </div>
              <CardDescription>
                Interactive playground for testing component combinations and variations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" disabled>
                <Palette className="h-4 w-4 mr-2" />
                Launch playground
              </Button>
            </CardContent>
          </Card>

          <Card className="border-dashed">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted">
                  <Code className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-lg">Code experiments</CardTitle>
                  <Badge variant="secondary">Coming soon</Badge>
                </div>
              </div>
              <CardDescription>
                Live code editor for experimenting with components and patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" disabled>
                <Code className="h-4 w-4 mr-2" />
                Open editor
              </Button>
            </CardContent>
          </Card>

          <Card className="border-dashed">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-lg">AI assistant</CardTitle>
                  <Badge variant="secondary">Coming soon</Badge>
                </div>
              </div>
              <CardDescription>
                AI-powered assistant for generating components and design patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" disabled>
                <Zap className="h-4 w-4 mr-2" />
                Try assistant
              </Button>
            </CardContent>
          </Card>

          <Card className="border-dashed">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted">
                  <Wrench className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-lg">Design tools</CardTitle>
                  <Badge variant="secondary">Coming soon</Badge>
                </div>
              </div>
              <CardDescription>
                Advanced tools for designers to create and test design systems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" disabled>
                <Wrench className="h-4 w-4 mr-2" />
                Open tools
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Request a feature</CardTitle>
            <CardDescription>
              Have an idea for the sandbox? Let us know what experimental features you&apos;d like to see.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button>Submit feature request</Button>
          </CardContent>
        </Card>
      </div>
    </SectionLayout>
  )
}
