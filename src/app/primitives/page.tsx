"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Copy, Check, Code, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative">
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code>{code}</code>
      </pre>
      <Button
        size="sm"
        variant="ghost"
        onClick={handleCopy}
        className="absolute top-2 right-2 h-8 w-8 p-0"
      >
        {copied ? (
          <Check className="h-3 w-3 text-green-500" />
        ) : (
          <Copy className="h-3 w-3" />
        )}
      </Button>
    </div>
  )
}

function ComponentDemo({ 
  title, 
  description, 
  children, 
  code 
}: { 
  title: string
  description: string
  children: React.ReactNode
  code: string 
}) {
  const [showCode, setShowCode] = useState(false)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant={showCode ? "default" : "outline"}
              onClick={() => setShowCode(!showCode)}
            >
              {showCode ? <Eye className="h-4 w-4" /> : <Code className="h-4 w-4" />}
              {showCode ? "Preview" : "Code"}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {showCode ? (
          <CodeBlock code={code} />
        ) : (
          <div className="flex items-center justify-center p-8 bg-muted/30 rounded-lg">
            {children}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function PrimitivesPage() {
  const [inputValue, setInputValue] = useState("")
  const [switchValue, setSwitchValue] = useState(false)

  const buttonCode = `import { Button } from "@/components/ui/button"

export function ButtonDemo() {
  return (
    <div className="space-x-2">
      <Button>Primary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  )
}`

  const inputCode = `import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function InputDemo() {
  return (
    <div className="space-y-2 w-full max-w-sm">
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        type="email"
        placeholder="Enter your email"
      />
    </div>
  )
}`

  const cardCode = `import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function CardDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>
          This is a description of the card content.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Card content goes here. You can put any elements inside.
        </p>
      </CardContent>
    </Card>
  )
}`

  const switchCode = `import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function SwitchDemo() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  )
}`

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
          <h1 className="text-4xl md:text-6xl font-bold">UI primitives</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Core building blocks of our design system. These components are the foundation 
            for creating consistent and accessible user interfaces.
          </p>
        </div>

        {/* Component Categories */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Form controls</h2>
            <p className="text-muted-foreground">
              Interactive elements for user input and data collection
            </p>
          </div>

          <div className="grid gap-8">
            {/* Buttons */}
            <ComponentDemo
              title="Button"
              description="Interactive button component with multiple variants"
              code={buttonCode}
            >
              <div className="space-x-2">
                <Button>Primary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </ComponentDemo>

            {/* Input */}
            <ComponentDemo
              title="Input"
              description="Text input field with label and validation states"
              code={inputCode}
            >
              <div className="space-y-2 w-full max-w-sm">
                <Label htmlFor="demo-email">Email</Label>
                <Input
                  id="demo-email"
                  type="email"
                  placeholder="Enter your email"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>
            </ComponentDemo>

            {/* Switch */}
            <ComponentDemo
              title="Switch"
              description="Toggle switch for binary choices"
              code={switchCode}
            >
              <div className="flex items-center space-x-2">
                <Switch 
                  id="demo-switch" 
                  checked={switchValue}
                  onCheckedChange={setSwitchValue}
                />
                <Label htmlFor="demo-switch">Enable notifications</Label>
              </div>
            </ComponentDemo>
          </div>
        </section>

        {/* Layout Components */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Layout components</h2>
            <p className="text-muted-foreground">
              Structural components for organizing content and creating layouts
            </p>
          </div>

          <div className="grid gap-8">
            {/* Card */}
            <ComponentDemo
              title="Card"
              description="Flexible container for grouping related content"
              code={cardCode}
            >
              <Card className="w-full max-w-sm">
                <CardHeader>
                  <CardTitle>Card title</CardTitle>
                  <CardDescription>
                    This is a description of the card content.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Card content goes here. You can put any elements inside.
                  </p>
                </CardContent>
              </Card>
            </ComponentDemo>
          </div>
        </section>

        {/* Button Variations */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Button variations</h2>
            <p className="text-muted-foreground">
              Different button styles for various use cases and hierarchies
            </p>
          </div>

          <Card>
            <CardContent className="p-8">
              <div className="grid gap-8">
                {/* Button Variants */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Variants</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button>Default</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                  </div>
                </div>

                {/* Button Sizes */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Sizes</h3>
                  <div className="flex flex-wrap items-center gap-2">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                  </div>
                </div>

                {/* Button States */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">States</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button>Normal</Button>
                    <Button disabled>Disabled</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Usage Guidelines */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Usage guidelines</h2>
            <p className="text-muted-foreground">
              Best practices for implementing and customizing components
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Do&apos;s</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-sm">Use consistent spacing between components</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-sm">Follow the established hierarchy with button variants</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-sm">Provide proper labels for form controls</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-sm">Use loading states for async actions</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Don&apos;ts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-2">
                  <span className="text-destructive mt-1">✗</span>
                  <span className="text-sm">Don&apos;t modify component internals directly</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-destructive mt-1">✗</span>
                  <span className="text-sm">Don&apos;t use multiple primary buttons in the same context</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-destructive mt-1">✗</span>
                  <span className="text-sm">Don&apos;t create custom variations without design approval</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-destructive mt-1">✗</span>
                  <span className="text-sm">Don&apos;t override accessibility attributes</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Installation */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Installation & usage</h2>
            <p className="text-muted-foreground">
              Quick start guide for using these components in your project
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Getting started</CardTitle>
              <CardDescription>
                Install and import components into your React application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Installation</h4>
                <CodeBlock code="npx shadcn@latest add button input label card switch" />
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold">Import</h4>
                <CodeBlock code="import { Button } from '@/components/ui/button'" />
              </div>
            </CardContent>
          </Card>
        </section>
      </motion.div>
    </div>
  )
}
