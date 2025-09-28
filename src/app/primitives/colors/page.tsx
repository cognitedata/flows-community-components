landing page? "use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Color definitions with their CSS variable names and hex values
const colorPalettes = [
  {
    name: "Aurora Lime",
    description: "Vibrant lime color palette with electric energy",
    category: "brand",
    colors: [
      { name: "50", var: "--aurora-lime-50", hex: "#fbffcc" },
      { name: "100", var: "--aurora-lime-100", hex: "#f7ff99" },
      { name: "200", var: "--aurora-lime-200", hex: "#f0ff66" },
      { name: "300", var: "--aurora-lime-300", hex: "#e9ff33" },
      { name: "400", var: "--aurora-lime-400", hex: "#e4ff14" },
      { name: "500", var: "--aurora-lime-500", hex: "#e2ff00" },
      { name: "600", var: "--aurora-lime-600", hex: "#cce100" },
      { name: "700", var: "--aurora-lime-700", hex: "#aec200" },
      { name: "800", var: "--aurora-lime-800", hex: "#91a300" },
      { name: "900", var: "--aurora-lime-900", hex: "#748500" },
      { name: "950", var: "--aurora-lime-950", hex: "#5e6c00" },
    ]
  },
  {
    name: "Glacier Mist",
    description: "Cool indigo tones reminiscent of glacial formations",
    category: "nature",
    colors: [
      { name: "50", var: "--glacier-mist-50", hex: "#eef2ff" },
      { name: "100", var: "--glacier-mist-100", hex: "#e0e7ff" },
      { name: "200", var: "--glacier-mist-200", hex: "#c7d2fe" },
      { name: "300", var: "--glacier-mist-300", hex: "#a5b4fc" },
      { name: "400", var: "--glacier-mist-400", hex: "#818cf8" },
      { name: "500", var: "--glacier-mist-500", hex: "#6366f1" },
      { name: "600", var: "--glacier-mist-600", hex: "#4f46e5" },
      { name: "700", var: "--glacier-mist-700", hex: "#4338ca" },
      { name: "800", var: "--glacier-mist-800", hex: "#3730a3" },
      { name: "900", var: "--glacier-mist-900", hex: "#312e81" },
      { name: "950", var: "--glacier-mist-950", hex: "#1e1b4b" },
    ]
  },
  {
    name: "Mountain Fjord",
    description: "Neutral zinc tones inspired by mountain landscapes",
    category: "nature",
    colors: [
      { name: "50", var: "--mountain-fjord-50", hex: "#fafafa" },
      { name: "100", var: "--mountain-fjord-100", hex: "#f4f4f5" },
      { name: "200", var: "--mountain-fjord-200", hex: "#e4e4e7" },
      { name: "300", var: "--mountain-fjord-300", hex: "#d4d4d8" },
      { name: "400", var: "--mountain-fjord-400", hex: "#a1a1aa" },
      { name: "500", var: "--mountain-fjord-500", hex: "#71717a" },
      { name: "600", var: "--mountain-fjord-600", hex: "#52525b" },
      { name: "700", var: "--mountain-fjord-700", hex: "#3f3f46" },
      { name: "800", var: "--mountain-fjord-800", hex: "#27272a" },
      { name: "900", var: "--mountain-fjord-900", hex: "#18181b" },
      { name: "950", var: "--mountain-fjord-950", hex: "#09090b" },
    ]
  },
  // Tailwind colors
  {
    name: "Teal",
    description: "Fresh aqua tones",
    category: "standard",
    colors: [
      { name: "50", var: "--teal-50", hex: "#f0fdfa" },
      { name: "100", var: "--teal-100", hex: "#ccfbf1" },
      { name: "200", var: "--teal-200", hex: "#99f6e4" },
      { name: "300", var: "--teal-300", hex: "#5eead4" },
      { name: "400", var: "--teal-400", hex: "#2dd4bf" },
      { name: "500", var: "--teal-500", hex: "#14b8a6" },
      { name: "600", var: "--teal-600", hex: "#0d9488" },
      { name: "700", var: "--teal-700", hex: "#0f766e" },
      { name: "800", var: "--teal-800", hex: "#115e59" },
      { name: "900", var: "--teal-900", hex: "#134e4a" },
      { name: "950", var: "--teal-950", hex: "#042f2e" },
    ]
  },
  {
    name: "Emerald",
    description: "Rich green gemstone tones",
    category: "standard",
    colors: [
      { name: "50", var: "--emerald-50", hex: "#ecfdf5" },
      { name: "100", var: "--emerald-100", hex: "#d1fae5" },
      { name: "200", var: "--emerald-200", hex: "#a7f3d0" },
      { name: "300", var: "--emerald-300", hex: "#6ee7b7" },
      { name: "400", var: "--emerald-400", hex: "#34d399" },
      { name: "500", var: "--emerald-500", hex: "#10b981" },
      { name: "600", var: "--emerald-600", hex: "#059669" },
      { name: "700", var: "--emerald-700", hex: "#047857" },
      { name: "800", var: "--emerald-800", hex: "#065f46" },
      { name: "900", var: "--emerald-900", hex: "#064e3b" },
      { name: "950", var: "--emerald-950", hex: "#022c22" },
    ]
  },
  {
    name: "Green",
    description: "Natural green tones",
    category: "standard",
    colors: [
      { name: "50", var: "--green-50", hex: "#f0fdf4" },
      { name: "100", var: "--green-100", hex: "#dcfce7" },
      { name: "200", var: "--green-200", hex: "#bbf7d0" },
      { name: "300", var: "--green-300", hex: "#86efac" },
      { name: "400", var: "--green-400", hex: "#4ade80" },
      { name: "500", var: "--green-500", hex: "#22c55e" },
      { name: "600", var: "--green-600", hex: "#16a34a" },
      { name: "700", var: "--green-700", hex: "#15803d" },
      { name: "800", var: "--green-800", hex: "#166534" },
      { name: "900", var: "--green-900", hex: "#14532d" },
      { name: "950", var: "--green-950", hex: "#052e16" },
    ]
  },
  {
    name: "Yellow",
    description: "Bright sunshine tones",
    category: "standard",
    colors: [
      { name: "50", var: "--yellow-50", hex: "#fefce8" },
      { name: "100", var: "--yellow-100", hex: "#fef9c3" },
      { name: "200", var: "--yellow-200", hex: "#fef08a" },
      { name: "300", var: "--yellow-300", hex: "#fde047" },
      { name: "400", var: "--yellow-400", hex: "#facc15" },
      { name: "500", var: "--yellow-500", hex: "#eab308" },
      { name: "600", var: "--yellow-600", hex: "#ca8a04" },
      { name: "700", var: "--yellow-700", hex: "#a16207" },
      { name: "800", var: "--yellow-800", hex: "#854d0e" },
      { name: "900", var: "--yellow-900", hex: "#713f12" },
      { name: "950", var: "--yellow-950", hex: "#422006" },
    ]
  },
  {
    name: "Amber",
    description: "Warm orange-yellow tones",
    category: "standard",
    colors: [
      { name: "50", var: "--amber-50", hex: "#fffbeb" },
      { name: "100", var: "--amber-100", hex: "#fef3c7" },
      { name: "200", var: "--amber-200", hex: "#fde68a" },
      { name: "300", var: "--amber-300", hex: "#fcd34d" },
      { name: "400", var: "--amber-400", hex: "#fbbf24" },
      { name: "500", var: "--amber-500", hex: "#f59e0b" },
      { name: "600", var: "--amber-600", hex: "#d97706" },
      { name: "700", var: "--amber-700", hex: "#b45309" },
      { name: "800", var: "--amber-800", hex: "#92400e" },
      { name: "900", var: "--amber-900", hex: "#78350f" },
      { name: "950", var: "--amber-950", hex: "#451a03" },
    ]
  },
  {
    name: "Pink",
    description: "Soft rose and pink tones",
    category: "standard",
    colors: [
      { name: "50", var: "--pink-50", hex: "#fdf2f8" },
      { name: "100", var: "--pink-100", hex: "#fce7f3" },
      { name: "200", var: "--pink-200", hex: "#fbcfe8" },
      { name: "300", var: "--pink-300", hex: "#f9a8d4" },
      { name: "400", var: "--pink-400", hex: "#f472b6" },
      { name: "500", var: "--pink-500", hex: "#ec4899" },
      { name: "600", var: "--pink-600", hex: "#db2777" },
      { name: "700", var: "--pink-700", hex: "#be185d" },
      { name: "800", var: "--pink-800", hex: "#9d174d" },
      { name: "900", var: "--pink-900", hex: "#831843" },
      { name: "950", var: "--pink-950", hex: "#500724" },
    ]
  },
  {
    name: "Orange",
    description: "Vibrant orange tones",
    category: "standard",
    colors: [
      { name: "50", var: "--orange-50", hex: "#fff7ed" },
      { name: "100", var: "--orange-100", hex: "#ffedd5" },
      { name: "200", var: "--orange-200", hex: "#fed7aa" },
      { name: "300", var: "--orange-300", hex: "#fdba74" },
      { name: "400", var: "--orange-400", hex: "#fb923c" },
      { name: "500", var: "--orange-500", hex: "#f97316" },
      { name: "600", var: "--orange-600", hex: "#ea580c" },
      { name: "700", var: "--orange-700", hex: "#c2410c" },
      { name: "800", var: "--orange-800", hex: "#9a3412" },
      { name: "900", var: "--orange-900", hex: "#7c2d12" },
      { name: "950", var: "--orange-950", hex: "#431407" },
    ]
  },
  {
    name: "Cyan",
    description: "Electric blue-green tones",
    category: "standard",
    colors: [
      { name: "50", var: "--cyan-50", hex: "#ecfeff" },
      { name: "100", var: "--cyan-100", hex: "#cffafe" },
      { name: "200", var: "--cyan-200", hex: "#a5f3fc" },
      { name: "300", var: "--cyan-300", hex: "#67e8f9" },
      { name: "400", var: "--cyan-400", hex: "#22d3ee" },
      { name: "500", var: "--cyan-500", hex: "#06b6d4" },
      { name: "600", var: "--cyan-600", hex: "#0891b2" },
      { name: "700", var: "--cyan-700", hex: "#0e7490" },
      { name: "800", var: "--cyan-800", hex: "#155e75" },
      { name: "900", var: "--cyan-900", hex: "#164e63" },
      { name: "950", var: "--cyan-950", hex: "#083344" },
    ]
  },
  {
    name: "Sky",
    description: "Clear sky blue tones",
    category: "standard",
    colors: [
      { name: "50", var: "--sky-50", hex: "#f0f9ff" },
      { name: "100", var: "--sky-100", hex: "#e0f2fe" },
      { name: "200", var: "--sky-200", hex: "#bae6fd" },
      { name: "300", var: "--sky-300", hex: "#7dd3fc" },
      { name: "400", var: "--sky-400", hex: "#38bdf8" },
      { name: "500", var: "--sky-500", hex: "#0ea5e9" },
      { name: "600", var: "--sky-600", hex: "#0284c7" },
      { name: "700", var: "--sky-700", hex: "#0369a1" },
      { name: "800", var: "--sky-800", hex: "#075985" },
      { name: "900", var: "--sky-900", hex: "#0c4a6e" },
      { name: "950", var: "--sky-950", hex: "#082f49" },
    ]
  },
  {
    name: "Violet",
    description: "Purple-blue tones",
    category: "standard",
    colors: [
      { name: "50", var: "--violet-50", hex: "#f5f3ff" },
      { name: "100", var: "--violet-100", hex: "#ede9fe" },
      { name: "200", var: "--violet-200", hex: "#ddd6fe" },
      { name: "300", var: "--violet-300", hex: "#c4b5fd" },
      { name: "400", var: "--violet-400", hex: "#a78bfa" },
      { name: "500", var: "--violet-500", hex: "#8b5cf6" },
      { name: "600", var: "--violet-600", hex: "#7c3aed" },
      { name: "700", var: "--violet-700", hex: "#6d28d9" },
      { name: "800", var: "--violet-800", hex: "#5b21b6" },
      { name: "900", var: "--violet-900", hex: "#4c1d95" },
      { name: "950", var: "--violet-950", hex: "#2e1065" },
    ]
  },
  {
    name: "Gray",
    description: "Neutral gray tones",
    category: "standard",
    colors: [
      { name: "50", var: "--gray-50", hex: "#f9fafb" },
      { name: "100", var: "--gray-100", hex: "#f3f4f6" },
      { name: "200", var: "--gray-200", hex: "#e5e7eb" },
      { name: "300", var: "--gray-300", hex: "#d1d5db" },
      { name: "400", var: "--gray-400", hex: "#9ca3af" },
      { name: "500", var: "--gray-500", hex: "#6b7280" },
      { name: "600", var: "--gray-600", hex: "#4b5563" },
      { name: "700", var: "--gray-700", hex: "#374151" },
      { name: "800", var: "--gray-800", hex: "#1f2937" },
      { name: "900", var: "--gray-900", hex: "#111827" },
      { name: "950", var: "--gray-950", hex: "#030712" },
    ]
  },
  {
    name: "Rose",
    description: "Warm pink-red tones",
    category: "standard",
    colors: [
      { name: "50", var: "--rose-50", hex: "#fff1f2" },
      { name: "100", var: "--rose-100", hex: "#ffe4e6" },
      { name: "200", var: "--rose-200", hex: "#fecdd3" },
      { name: "300", var: "--rose-300", hex: "#fda4af" },
      { name: "400", var: "--rose-400", hex: "#fb7185" },
      { name: "500", var: "--rose-500", hex: "#f43f5e" },
      { name: "600", var: "--rose-600", hex: "#e11d48" },
      { name: "700", var: "--rose-700", hex: "#be123c" },
      { name: "800", var: "--rose-800", hex: "#9f1239" },
      { name: "900", var: "--rose-900", hex: "#881337" },
      { name: "950", var: "--rose-950", hex: "#4c0519" },
    ]
  },
  {
    name: "Purple",
    description: "Deep purple tones",
    category: "standard",
    colors: [
      { name: "50", var: "--purple-50", hex: "#faf5ff" },
      { name: "100", var: "--purple-100", hex: "#f3e8ff" },
      { name: "200", var: "--purple-200", hex: "#e9d5ff" },
      { name: "300", var: "--purple-300", hex: "#d8b4fe" },
      { name: "400", var: "--purple-400", hex: "#c084fc" },
      { name: "500", var: "--purple-500", hex: "#a855f7" },
      { name: "600", var: "--purple-600", hex: "#9333ea" },
      { name: "700", var: "--purple-700", hex: "#7e22ce" },
      { name: "800", var: "--purple-800", hex: "#6b21a8" },
      { name: "900", var: "--purple-900", hex: "#581c87" },
      { name: "950", var: "--purple-950", hex: "#3b0764" },
    ]
  },
  {
    name: "Fuchsia",
    description: "Vivid pink-purple tones",
    category: "standard",
    colors: [
      { name: "50", var: "--fuchsia-50", hex: "#fdf4ff" },
      { name: "100", var: "--fuchsia-100", hex: "#fae8ff" },
      { name: "200", var: "--fuchsia-200", hex: "#f5d0fe" },
      { name: "300", var: "--fuchsia-300", hex: "#f0abfc" },
      { name: "400", var: "--fuchsia-400", hex: "#e879f9" },
      { name: "500", var: "--fuchsia-500", hex: "#d946ef" },
      { name: "600", var: "--fuchsia-600", hex: "#c026d3" },
      { name: "700", var: "--fuchsia-700", hex: "#a21caf" },
      { name: "800", var: "--fuchsia-800", hex: "#86198f" },
      { name: "900", var: "--fuchsia-900", hex: "#701a75" },
      { name: "950", var: "--fuchsia-950", hex: "#4a044e" },
    ]
  },
]

// Helper function to copy text to clipboard
const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
}

// Color swatch component
function ColorSwatch({ color, paletteName }: { color: { name: string; var: string; hex: string }; paletteName: string }) {
  const isDark = parseInt(color.name) >= 700
  
  return (
    <div 
      className="relative group cursor-pointer rounded-lg overflow-hidden"
      style={{ backgroundColor: color.hex }}
      onClick={() => copyToClipboard(color.hex)}
      title={`Click to copy ${color.hex}`}
    >
      <div className="aspect-square w-full min-h-[80px] flex flex-col justify-end p-3">
        <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {color.name}
        </div>
        <div className={`text-xs ${isDark ? 'text-gray-200' : 'text-gray-600'}`}>
          {color.hex}
        </div>
      </div>
      
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <span className={`text-xs font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Click to copy
        </span>
      </div>
    </div>
  )
}

// Palette component
function ColorPalette({ palette }: { palette: typeof colorPalettes[0] }) {
  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "brand":
        return <Badge variant="default">Brand</Badge>
      case "nature":
        return <Badge variant="secondary">Nature</Badge>
      default:
        return <Badge variant="outline">Standard</Badge>
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{palette.name}</CardTitle>
          {getCategoryBadge(palette.category)}
        </div>
        <p className="text-sm text-muted-foreground">{palette.description}</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-11 gap-2">
          {palette.colors.map((color) => (
            <ColorSwatch 
              key={color.name} 
              color={color} 
              paletteName={palette.name} 
            />
          ))}
        </div>
        
        {/* CSS Variables section */}
        <div className="mt-6 pt-4 border-t">
          <h4 className="text-sm font-medium mb-2">CSS Variables</h4>
          <div className="bg-muted rounded-lg p-3">
            <code className="text-xs text-muted-foreground">
              {palette.colors.slice(0, 3).map(color => color.var).join(', ')}
              {palette.colors.length > 3 && ', ...'}
            </code>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ColorsPage() {
  // Group palettes by category
  const brandPalettes = colorPalettes.filter(p => p.category === "brand")
  const naturePalettes = colorPalettes.filter(p => p.category === "nature")
  const standardPalettes = colorPalettes.filter(p => p.category === "standard")

  return (
    <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Colors</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Comprehensive color palette for your design system
          </p>
        </div>

        {/* Brand Colors */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Brand Colors</h2>
            <p className="text-muted-foreground">
              Custom color palettes that reflect our brand identity
            </p>
          </div>
          <div className="space-y-6">
            {brandPalettes.map((palette) => (
              <ColorPalette key={palette.name} palette={palette} />
            ))}
          </div>
        </section>

        {/* Nature-Inspired Colors */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Nature-Inspired</h2>
            <p className="text-muted-foreground">
              Color palettes inspired by natural elements and landscapes
            </p>
          </div>
          <div className="space-y-6">
            {naturePalettes.map((palette) => (
              <ColorPalette key={palette.name} palette={palette} />
            ))}
          </div>
        </section>

        {/* Standard Colors */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Standard Palette</h2>
            <p className="text-muted-foreground">
              Complete Tailwind CSS color palette for comprehensive design coverage
            </p>
          </div>
          <div className="grid gap-6">
            {standardPalettes.map((palette) => (
              <ColorPalette key={palette.name} palette={palette} />
            ))}
          </div>
        </section>

        {/* Usage Guidelines */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Usage Guidelines</h2>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>CSS Variables</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  All colors are available as CSS custom properties for consistent theming:
                </p>
                <div className="bg-muted rounded-lg p-3">
                  <code className="text-xs">
                    color: var(--aurora-lime-500);<br/>
                    background: var(--glacier-mist-100);
                  </code>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Accessibility</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  When using colors, ensure proper contrast ratios:
                </p>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Use 50-300 for backgrounds</li>
                  <li>• Use 700-950 for text on light backgrounds</li>
                  <li>• Use 50-300 for text on dark backgrounds</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
    </div>
  )
}
