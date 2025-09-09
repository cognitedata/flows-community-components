"use client"

import { motion } from "framer-motion"
import { Download, Copy, Check } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const colors = {
  primary: [
    { name: "Primary 50", value: "#f0f9ff", hex: "#f0f9ff" },
    { name: "Primary 100", value: "#e0f2fe", hex: "#e0f2fe" },
    { name: "Primary 500", value: "#0ea5e9", hex: "#0ea5e9" },
    { name: "Primary 900", value: "#0c4a6e", hex: "#0c4a6e" },
  ],
  neutral: [
    { name: "White", value: "#ffffff", hex: "#ffffff" },
    { name: "Gray 100", value: "#f1f5f9", hex: "#f1f5f9" },
    { name: "Gray 500", value: "#64748b", hex: "#64748b" },
    { name: "Gray 900", value: "#0f172a", hex: "#0f172a" },
  ],
}

const typography = [
  { name: "Display Large", size: "4rem", weight: "700", lineHeight: "1.1" },
  { name: "Display Medium", size: "3rem", weight: "700", lineHeight: "1.2" },
  { name: "Heading 1", size: "2.25rem", weight: "600", lineHeight: "1.3" },
  { name: "Heading 2", size: "1.875rem", weight: "600", lineHeight: "1.3" },
  { name: "Body Large", size: "1.125rem", weight: "400", lineHeight: "1.6" },
  { name: "Body Medium", size: "1rem", weight: "400", lineHeight: "1.6" },
  { name: "Body Small", size: "0.875rem", weight: "400", lineHeight: "1.5" },
]

const spacing = [
  { name: "XS", value: "0.25rem", pixels: "4px" },
  { name: "SM", value: "0.5rem", pixels: "8px" },
  { name: "MD", value: "1rem", pixels: "16px" },
  { name: "LG", value: "1.5rem", pixels: "24px" },
  { name: "XL", value: "2rem", pixels: "32px" },
  { name: "2XL", value: "3rem", pixels: "48px" },
]

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={handleCopy}
      className="h-8 w-8 p-0"
    >
      {copied ? (
        <Check className="h-3 w-3 text-green-500" />
      ) : (
        <Copy className="h-3 w-3" />
      )}
    </Button>
  )
}

export default function TokensPage() {
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
          <h1 className="text-4xl md:text-6xl font-bold">Design Tokens</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The foundational elements of our design system. Colors, typography, and spacing 
            tokens ensure consistency across all digital experiences.
          </p>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Download Token Files
          </Button>
        </div>

        {/* Color Tokens */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Color Palette</h2>
            <p className="text-muted-foreground">
              Our carefully crafted color system supports both light and dark themes
            </p>
          </div>

          <div className="grid gap-8">
            {Object.entries(colors).map(([category, colorArray]) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="capitalize">{category} Colors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {colorArray.map((color) => (
                      <motion.div
                        key={color.name}
                        whileHover={{ scale: 1.05 }}
                        className="space-y-2"
                      >
                        <div
                          className="h-16 w-full rounded-lg border"
                          style={{ backgroundColor: color.hex }}
                        />
                        <div className="space-y-1">
                          <div className="text-sm font-medium">{color.name}</div>
                          <div className="flex items-center justify-between">
                            <div className="text-xs text-muted-foreground font-mono">
                              {color.hex}
                            </div>
                            <CopyButton text={color.hex} />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Typography Scale</h2>
            <p className="text-muted-foreground">
              A harmonious type scale that ensures readable and accessible content
            </p>
          </div>

          <Card>
            <CardContent className="p-8 space-y-6">
              {typography.map((type) => (
                <motion.div
                  key={type.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col md:flex-row md:items-center justify-between border-b pb-4 last:border-b-0"
                >
                  <div className="space-y-2">
                    <div
                      className="text-foreground"
                      style={{
                        fontSize: type.size,
                        fontWeight: type.weight,
                        lineHeight: type.lineHeight,
                      }}
                    >
                      {type.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      The quick brown fox jumps over the lazy dog
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 mt-4 md:mt-0">
                    <div className="text-right text-sm text-muted-foreground font-mono">
                      <div>{type.size}</div>
                      <div>Weight: {type.weight}</div>
                      <div>Line height: {type.lineHeight}</div>
                    </div>
                    <CopyButton text={`font-size: ${type.size}; font-weight: ${type.weight}; line-height: ${type.lineHeight};`} />
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </section>

        {/* Spacing */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Spacing System</h2>
            <p className="text-muted-foreground">
              Consistent spacing creates rhythm and hierarchy in layouts
            </p>
          </div>

          <Card>
            <CardContent className="p-8">
              <div className="grid gap-4">
                {spacing.map((space) => (
                  <motion.div
                    key={space.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-sm font-medium w-12">{space.name}</div>
                      <div
                        className="bg-primary/20 h-4 rounded"
                        style={{ width: space.value }}
                      />
                      <div className="text-sm text-muted-foreground">
                        {space.value} ({space.pixels})
                      </div>
                    </div>
                    <CopyButton text={space.value} />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Asset Library */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Asset Library</h2>
            <p className="text-muted-foreground">
              Download design assets and implementation files
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Design Tokens</CardTitle>
                <CardDescription>JSON file with all design tokens</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download JSON
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Figma Library</CardTitle>
                <CardDescription>Complete Figma design system file</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Open in Figma
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>CSS Variables</CardTitle>
                <CardDescription>Ready-to-use CSS custom properties</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download CSS
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </motion.div>
    </div>
  )
}
