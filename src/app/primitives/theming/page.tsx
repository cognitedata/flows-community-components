"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Palette, Download, Copy, RotateCcw, Sun, Moon, Eye, Check, FileText, Code, Package, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { CodeCopyButton } from "@/components/code-copy-button"

// Utility functions for color conversion
function hslToHex(hsl: string): string {
  const [h, s, l] = hsl.split(' ').map((val, idx) => {
    if (idx === 0) return parseFloat(val) // hue
    return parseFloat(val.replace('%', '')) / 100 // saturation and lightness
  })
  
  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs((h / 60) % 2 - 1))
  const m = l - c / 2
  
  let r = 0, g = 0, b = 0
  
  if (0 <= h && h < 60) {
    r = c; g = x; b = 0
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x
  }
  
  r = Math.round((r + m) * 255)
  g = Math.round((g + m) * 255)
  b = Math.round((b + m) * 255)
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

function hexToHsl(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const diff = max - min
  
  let h = 0
  let s = 0
  const l = (max + min) / 2
  
  if (diff !== 0) {
    s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min)
    
    switch (max) {
      case r:
        h = ((g - b) / diff + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / diff + 2) / 6
        break
      case b:
        h = ((r - g) / diff + 4) / 6
        break
    }
  }
  
  h = Math.round(h * 360)
  s = Math.round(s * 100)
  const lPercent = Math.round(l * 100)
  
  return `${h} ${s}% ${lPercent}%`
}

// Export functions for different formats
function generateCSSVariables(theme: ThemeColors): string {
  return `:root {
  --primary: ${theme.primary};
  --primary-foreground: ${theme.primaryForeground};
  --secondary: ${theme.secondary};
  --secondary-foreground: ${theme.secondaryForeground};
  --accent: ${theme.accent};
  --accent-foreground: ${theme.accentForeground};
  --background: ${theme.background};
  --foreground: ${theme.foreground};
  --card: ${theme.card};
  --card-foreground: ${theme.cardForeground};
  --popover: ${theme.popover};
  --popover-foreground: ${theme.popoverForeground};
  --muted: ${theme.muted};
  --muted-foreground: ${theme.mutedForeground};
  --destructive: ${theme.destructive};
  --destructive-foreground: ${theme.destructiveForeground};
  --border: ${theme.border};
  --input: ${theme.input};
  --ring: ${theme.ring};
  --radius: 0.5rem;
}`
}

function generateTailwindConfig(theme: ThemeColors): string {
  return `module.exports = {
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
}`
}

function generateGlobalCSS(theme: ThemeColors): string {
  return `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --primary: ${theme.primary};
    --primary-foreground: ${theme.primaryForeground};
    --secondary: ${theme.secondary};
    --secondary-foreground: ${theme.secondaryForeground};
    --accent: ${theme.accent};
    --accent-foreground: ${theme.accentForeground};
    --background: ${theme.background};
    --foreground: ${theme.foreground};
    --card: ${theme.card};
    --card-foreground: ${theme.cardForeground};
    --popover: ${theme.popover};
    --popover-foreground: ${theme.popoverForeground};
    --muted: ${theme.muted};
    --muted-foreground: ${theme.mutedForeground};
    --destructive: ${theme.destructive};
    --destructive-foreground: ${theme.destructiveForeground};
    --border: ${theme.border};
    --input: ${theme.input};
    --ring: ${theme.ring};
    --radius: 0.5rem;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}`
}

function generateThemeProvider(): string {
  return `import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}`
}

function generateInstallGuide(): string {
  return `# Installation Guide

## 1. Install Dependencies

\`\`\`bash
npm install tailwindcss-animate class-variance-authority clsx tailwind-merge
npm install lucide-react # for icons
npm install next-themes # for dark mode support
\`\`\`

## 2. Update Tailwind Configuration

Replace your \`tailwind.config.js\` with the generated configuration above.

## 3. Add Global Styles

Add the generated \`globals.css\` content to your main CSS file.

## 4. Setup Theme Provider

1. Create \`components/theme-provider.tsx\` with the generated code
2. Wrap your app with the ThemeProvider:

\`\`\`jsx
import { ThemeProvider } from "@/components/theme-provider"

export default function App({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}
\`\`\`

## 5. Start Using Components

Your components will now use the custom theme colors automatically!

\`\`\`jsx
import { Button } from "@/components/ui/button"

export function Example() {
  return (
    <div className="p-4">
      <Button>Primary Button</Button>
      <Button variant="secondary">Secondary Button</Button>
    </div>
  )
}
\`\`\`
`
}

// Default theme values - comprehensive like tweakcn.com
const defaultLightTheme = {
  primary: "222.2 84% 4.9%",
  primaryForeground: "210 40% 98%",
  secondary: "210 40% 96%",
  secondaryForeground: "222.2 84% 4.9%",
  accent: "210 40% 96%",
  accentForeground: "222.2 84% 4.9%",
  background: "0 0% 100%",
  foreground: "222.2 84% 4.9%",
  card: "0 0% 100%",
  cardForeground: "222.2 84% 4.9%",
  popover: "0 0% 100%",
  popoverForeground: "222.2 84% 4.9%",
  muted: "210 40% 96%",
  mutedForeground: "215.4 16.3% 46.9%",
  destructive: "0 84.2% 60.2%",
  destructiveForeground: "210 40% 98%",
  border: "214.3 31.8% 91.4%",
  input: "214.3 31.8% 91.4%",
  ring: "222.2 84% 4.9%",
}

const defaultDarkTheme = {
  primary: "210 40% 98%",
  primaryForeground: "222.2 84% 4.9%",
  secondary: "222.2 84% 11%",
  secondaryForeground: "210 40% 98%",
  accent: "222.2 84% 11%",
  accentForeground: "210 40% 98%",
  background: "222.2 84% 4.9%",
  foreground: "210 40% 98%",
  card: "222.2 84% 4.9%",
  cardForeground: "210 40% 98%",
  popover: "222.2 84% 4.9%",
  popoverForeground: "210 40% 98%",
  muted: "222.2 84% 11%",
  mutedForeground: "215 20.2% 65.1%",
  destructive: "0 62.8% 30.6%",
  destructiveForeground: "210 40% 98%",
  border: "217.2 32.6% 17.5%",
  input: "217.2 32.6% 17.5%",
  ring: "212.7 26.8% 83.9%",
}

// Color presets for quick selection - fun themed combinations
const colorPresets = [
  { 
    name: "Nebula", 
    primary: "262 83% 58%", // Deep purple
    primaryForeground: "210 40% 98%",
    secondary: "200 100% 25%", // Dark teal  
    secondaryForeground: "210 40% 98%",
    accent: "285 100% 75%", // Bright magenta
    accentForeground: "222.2 84% 4.9%"
  },
  { 
    name: "Ocean breeze", 
    primary: "200 100% 50%", // Ocean blue
    primaryForeground: "210 40% 98%",
    secondary: "180 100% 85%", // Light cyan
    secondaryForeground: "222.2 84% 4.9%",
    accent: "220 100% 65%", // Sky blue
    accentForeground: "210 40% 98%"
  },
  { 
    name: "Sunset glow", 
    primary: "15 100% 60%", // Warm orange
    primaryForeground: "210 40% 98%",
    secondary: "45 100% 85%", // Light yellow
    secondaryForeground: "222.2 84% 4.9%",
    accent: "350 85% 65%", // Coral pink
    accentForeground: "210 40% 98%"
  },
  { 
    name: "Forest magic", 
    primary: "140 60% 40%", // Forest green
    primaryForeground: "210 40% 98%",
    secondary: "120 40% 80%", // Light sage
    secondaryForeground: "222.2 84% 4.9%",
    accent: "160 80% 60%", // Emerald
    accentForeground: "210 40% 98%"
  },
  { 
    name: "Royal crown", 
    primary: "240 100% 30%", // Royal blue
    primaryForeground: "210 40% 98%",
    secondary: "220 30% 90%", // Light blue-gray
    secondaryForeground: "222.2 84% 4.9%",
    accent: "280 100% 70%", // Royal purple
    accentForeground: "210 40% 98%"
  },
  { 
    name: "Cherry blossom", 
    primary: "330 80% 60%", // Cherry pink
    primaryForeground: "210 40% 98%",
    secondary: "320 40% 90%", // Pale pink
    secondaryForeground: "222.2 84% 4.9%",
    accent: "340 100% 70%", // Hot pink
    accentForeground: "210 40% 98%"
  },
  { 
    name: "Midnight jazz", 
    primary: "220 30% 20%", // Dark blue-gray
    primaryForeground: "210 40% 98%",
    secondary: "200 20% 85%", // Light steel
    secondaryForeground: "222.2 84% 4.9%",
    accent: "45 100% 70%", // Jazz gold
    accentForeground: "222.2 84% 4.9%"
  },
  { 
    name: "Lavender fields", 
    primary: "270 50% 60%", // Soft purple
    primaryForeground: "210 40% 98%",
    secondary: "260 30% 90%", // Pale lavender
    secondaryForeground: "222.2 84% 4.9%",
    accent: "290 70% 70%", // Bright violet
    accentForeground: "210 40% 98%"
  },
]

interface ThemeColors {
  primary: string
  primaryForeground: string
  secondary: string
  secondaryForeground: string
  accent: string
  accentForeground: string
  background: string
  foreground: string
  card: string
  cardForeground: string
  popover: string
  popoverForeground: string
  muted: string
  mutedForeground: string
  destructive: string
  destructiveForeground: string
  border: string
  input: string
  ring: string
}

export default function ThemingPage() {
  const [theme, setTheme] = useState<ThemeColors>(defaultLightTheme)
  const [isDark, setIsDark] = useState(false)

  // Force re-render when theme changes
  useEffect(() => {
    // Force a reflow to ensure CSS variables are applied
    const preview = document.querySelector('.theme-preview')
    if (preview) {
      preview.style.opacity = '0.999'
      setTimeout(() => {
        preview.style.opacity = '1'
      }, 1)
    }
  }, [theme])

  const resetTheme = () => {
    setTheme(isDark ? defaultDarkTheme : defaultLightTheme)
  }

  // Switch theme when dark mode toggles - preserve user colors
  useEffect(() => {
    setTheme(currentTheme => ({
      ...currentTheme,
      // Only update system colors, preserve user's primary/secondary/accent
      background: isDark ? "222.2 84% 4.9%" : "0 0% 100%",
      foreground: isDark ? "210 40% 98%" : "222.2 84% 4.9%",
      card: isDark ? "222.2 84% 4.9%" : "0 0% 100%",
      cardForeground: isDark ? "210 40% 98%" : "222.2 84% 4.9%",
      popover: isDark ? "222.2 84% 4.9%" : "0 0% 100%",
      popoverForeground: isDark ? "210 40% 98%" : "222.2 84% 4.9%",
      muted: isDark ? "222.2 84% 11%" : "210 40% 96%",
      mutedForeground: isDark ? "215 20.2% 65.1%" : "215.4 16.3% 46.9%",
      border: isDark ? "217.2 32.6% 17.5%" : "214.3 31.8% 91.4%",
      input: isDark ? "217.2 32.6% 17.5%" : "214.3 31.8% 91.4%",
      ring: isDark ? "212.7 26.8% 83.9%" : currentTheme.primary
    }))
  }, [isDark])

  // Inject CSS custom properties for live preview
  useEffect(() => {
    const style = document.getElementById('theme-preview-styles') || document.createElement('style')
    style.id = 'theme-preview-styles'
    
    const cssVariables = `
      .theme-preview {
        /* Apply the background theme immediately */
        background-color: hsl(${theme.background});
        color: hsl(${theme.foreground});
        border-radius: 0.5rem;
      }
      
      /* Use ShadCN's semantic tokens correctly - target Tailwind classes */
      
      /* Primary colors */
      .theme-preview [class*="bg-primary"] {
        background-color: hsl(${theme.primary}) !important;
      }
      .theme-preview [class*="text-primary-foreground"] {
        color: hsl(${theme.primaryForeground}) !important;
      }
      .theme-preview [class*="text-primary"]:not([class*="foreground"]) {
        color: hsl(${theme.primary}) !important;
      }
      
      /* Secondary colors */
      .theme-preview [class*="bg-secondary"] {
        background-color: hsl(${theme.secondary}) !important;
      }
      .theme-preview [class*="text-secondary-foreground"] {
        color: hsl(${theme.secondaryForeground}) !important;
      }
      
      /* Accent colors */
      .theme-preview [class*="bg-accent"] {
        background-color: hsl(${theme.accent}) !important;
      }
      .theme-preview [class*="text-accent-foreground"] {
        color: hsl(${theme.accentForeground}) !important;
      }
      
      /* Ghost buttons - transparent by default, accent on hover */
      .theme-preview button[class*="hover:bg-accent"]:not(:hover) {
        background-color: transparent !important;
        color: hsl(${theme.foreground}) !important;
      }
      
      .theme-preview button[class*="hover:bg-accent"]:hover {
        background-color: hsl(${theme.accent}) !important;
        color: hsl(${theme.accentForeground}) !important;
      }
      
      /* Destructive colors */
      .theme-preview [class*="bg-destructive"] {
        background-color: hsl(${theme.destructive}) !important;
      }
      .theme-preview [class*="text-destructive-foreground"] {
        color: hsl(${theme.destructiveForeground}) !important;
      }
      
      /* Background & foreground */
      .theme-preview [class*="bg-background"] {
        background-color: hsl(${theme.background}) !important;
      }
      .theme-preview [class*="text-foreground"] {
        color: hsl(${theme.foreground}) !important;
      }
      
      /* Card colors */
      .theme-preview [class*="bg-card"] {
        background-color: hsl(${theme.card}) !important;
      }
      .theme-preview [class*="text-card-foreground"] {
        color: hsl(${theme.cardForeground}) !important;
      }
      
      /* Muted colors */
      .theme-preview [class*="bg-muted"] {
        background-color: hsl(${theme.muted}) !important;
      }
      .theme-preview [class*="text-muted-foreground"] {
        color: hsl(${theme.mutedForeground}) !important;
      }
      
      /* Border & input colors */
      .theme-preview [class*="border-border"] {
        border-color: hsl(${theme.border}) !important;
      }
      .theme-preview [class*="border-input"] {
        border-color: hsl(${theme.input}) !important;
      }
      .theme-preview [class*="bg-input"] {
        background-color: hsl(${theme.input}) !important;
      }
      
      /* Ring colors */
      .theme-preview [class*="ring-ring"] {
        --tw-ring-color: hsl(${theme.ring}) !important;
      }
      
      /* Semantic status colors for badges, alerts, etc. */
      .theme-preview [class*="text-green-"] {
        color: hsl(120 60% 50%) !important;
      }
      .theme-preview [class*="bg-green-"] {
        background-color: hsl(120 60% 95%) !important;
      }
      .theme-preview [class*="border-green-"] {
        border-color: hsl(120 60% 50%) !important;
      }
      
      .theme-preview [class*="text-yellow-"] {
        color: hsl(45 90% 40%) !important;
      }
      .theme-preview [class*="bg-yellow-"] {
        background-color: hsl(45 90% 95%) !important;
      }
      .theme-preview [class*="border-yellow-"] {
        border-color: hsl(45 90% 40%) !important;
      }
      
      .theme-preview [class*="text-blue-"] {
        color: hsl(210 100% 50%) !important;
      }
      .theme-preview [class*="bg-blue-"] {
        background-color: hsl(210 100% 95%) !important;
      }
      .theme-preview [class*="border-blue-"] {
        border-color: hsl(210 100% 50%) !important;
      }
      
      .theme-preview [class*="text-red-"] {
        color: hsl(${theme.destructive}) !important;
      }
      .theme-preview [class*="bg-red-"] {
        background-color: hsl(${theme.destructive}/0.1) !important;
      }
      .theme-preview [class*="border-red-"] {
        border-color: hsl(${theme.destructive}) !important;
      }
      
      /* Fix outline buttons - target the specific border class */
      .theme-preview button[class*="border"][class*="bg-background"] {
        border-color: hsl(${theme.border}) !important;
        background-color: hsl(${theme.background}) !important;
        color: hsl(${theme.foreground}) !important;
      }
      
      .theme-preview button[class*="border"][class*="bg-background"]:hover {
        background-color: hsl(${theme.accent}) !important;
        color: hsl(${theme.accentForeground}) !important;
      }
      
      
      /* Remove all browser styling from color inputs */
      .color-picker-input {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background: none;
        border: 1px solid hsl(${theme.input});
        outline: none;
        padding: 0;
        margin: 0;
        cursor: pointer;
        width: 2.25rem;
        height: 2.25rem;
        border-radius: 0.375rem;
        transition: border-color 0.2s ease;
      }
      
      .color-picker-input:focus {
        border-color: hsl(${theme.ring});
        box-shadow: 0 0 0 2px hsl(${theme.ring}/0.2);
      }
      
      .color-picker-input::-webkit-color-swatch-wrapper {
        padding: 0;
        border: none;
      }
      
      .color-picker-input::-webkit-color-swatch {
        border: none;
        border-radius: 0.375rem;
      }
      
      .color-picker-input::-moz-color-swatch {
        border: none;
        border-radius: 0.375rem;
      }
      
      .color-picker-input::-moz-focus-inner {
        border: 0;
        padding: 0;
      }
    `
    
    style.textContent = cssVariables
    
    if (!document.getElementById('theme-preview-styles')) {
      document.head.appendChild(style)
    }

    return () => {
      // Cleanup on unmount
      const existingStyle = document.getElementById('theme-preview-styles')
      if (existingStyle) {
        existingStyle.remove()
      }
    }
  }, [theme, isDark])

  return (
    <div className="px-3 py-16">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold">Theme configurator</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Customize your design system colors and see live previews across components. 
              Export ready-to-use code for your projects.
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Controls Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted">
                    <Palette className="h-5 w-5" />
                  </div>
                  Color Settings
                </CardTitle>
                <CardDescription>
                  Adjust your theme colors and see live updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Theme Mode Toggle */}
                  <div className="space-y-2">
                    <Label>Theme Mode</Label>
                    <div className="flex gap-2">
                      <Button
                        variant={!isDark ? "default" : "outline"}
                        size="sm"
                        onClick={() => setIsDark(false)}
                        className="flex-1"
                      >
                        <Sun className="h-4 w-4 mr-2" />
                        Light
                      </Button>
                      <Button
                        variant={isDark ? "default" : "outline"}
                        size="sm"
                        onClick={() => setIsDark(true)}
                        className="flex-1"
                      >
                        <Moon className="h-4 w-4 mr-2" />
                        Dark
                      </Button>
                    </div>
                  </div>

                  {/* Primary Colors */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold">Primary colors</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="primary">Primary</Label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={hslToHex(theme.primary)}
                            onChange={(e) => setTheme({ ...theme, primary: hexToHsl(e.target.value) })}
                            className="color-picker-input"
                          />
                          <Input
                            id="primary"
                            value={theme.primary}
                            onChange={(e) => setTheme({ ...theme, primary: e.target.value })}
                            placeholder="222.2 84% 4.9%"
                            className="flex-1"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="primaryForeground">Primary foreground</Label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={hslToHex(theme.primaryForeground)}
                            onChange={(e) => setTheme({ ...theme, primaryForeground: hexToHsl(e.target.value) })}
                            className="color-picker-input"
                          />
                          <Input
                            id="primaryForeground"
                            value={theme.primaryForeground}
                            onChange={(e) => setTheme({ ...theme, primaryForeground: e.target.value })}
                            placeholder="210 40% 98%"
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Secondary Colors */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold">Secondary colors</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="secondary">Secondary</Label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={hslToHex(theme.secondary)}
                            onChange={(e) => setTheme({ ...theme, secondary: hexToHsl(e.target.value) })}
                            className="color-picker-input"
                          />
                          <Input
                            id="secondary"
                            value={theme.secondary}
                            onChange={(e) => setTheme({ ...theme, secondary: e.target.value })}
                            placeholder="210 40% 96%"
                            className="flex-1"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="secondaryForeground">Secondary foreground</Label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={hslToHex(theme.secondaryForeground)}
                            onChange={(e) => setTheme({ ...theme, secondaryForeground: hexToHsl(e.target.value) })}
                            className="color-picker-input"
                          />
                          <Input
                            id="secondaryForeground"
                            value={theme.secondaryForeground}
                            onChange={(e) => setTheme({ ...theme, secondaryForeground: e.target.value })}
                            placeholder="222.2 84% 4.9%"
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Accent Colors */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold">Accent colors</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="accent">Accent</Label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={hslToHex(theme.accent)}
                            onChange={(e) => setTheme({ ...theme, accent: hexToHsl(e.target.value) })}
                            className="color-picker-input"
                          />
                          <Input
                            id="accent"
                            value={theme.accent}
                            onChange={(e) => setTheme({ ...theme, accent: e.target.value })}
                            placeholder="210 40% 96%"
                            className="flex-1"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="accentForeground">Accent foreground</Label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={hslToHex(theme.accentForeground)}
                            onChange={(e) => setTheme({ ...theme, accentForeground: hexToHsl(e.target.value) })}
                            className="color-picker-input"
                          />
                          <Input
                            id="accentForeground"
                            value={theme.accentForeground}
                            onChange={(e) => setTheme({ ...theme, accentForeground: e.target.value })}
                            placeholder="222.2 84% 4.9%"
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Base Colors */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold">Base colors</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="background">Background</Label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={hslToHex(theme.background)}
                            onChange={(e) => setTheme({ ...theme, background: hexToHsl(e.target.value) })}
                            className="color-picker-input"
                          />
                          <Input
                            id="background"
                            value={theme.background}
                            onChange={(e) => setTheme({ ...theme, background: e.target.value })}
                            placeholder="0 0% 100%"
                            className="flex-1"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="foreground">Foreground</Label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={hslToHex(theme.foreground)}
                            onChange={(e) => setTheme({ ...theme, foreground: hexToHsl(e.target.value) })}
                            className="color-picker-input"
                          />
                          <Input
                            id="foreground"
                            value={theme.foreground}
                            onChange={(e) => setTheme({ ...theme, foreground: e.target.value })}
                            placeholder="222.2 84% 4.9%"
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Colors */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold">Card colors</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="card">Card background</Label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={hslToHex(theme.card)}
                            onChange={(e) => setTheme({ ...theme, card: hexToHsl(e.target.value) })}
                            className="color-picker-input"
                          />
                          <Input
                            id="card"
                            value={theme.card}
                            onChange={(e) => setTheme({ ...theme, card: e.target.value })}
                            placeholder="0 0% 100%"
                            className="flex-1"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cardForeground">Card foreground</Label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={hslToHex(theme.cardForeground)}
                            onChange={(e) => setTheme({ ...theme, cardForeground: hexToHsl(e.target.value) })}
                            className="color-picker-input"
                          />
                          <Input
                            id="cardForeground"
                            value={theme.cardForeground}
                            onChange={(e) => setTheme({ ...theme, cardForeground: e.target.value })}
                            placeholder="222.2 84% 4.9%"
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Muted Colors */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold">Muted colors</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="muted">Muted</Label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={hslToHex(theme.muted)}
                            onChange={(e) => setTheme({ ...theme, muted: hexToHsl(e.target.value) })}
                            className="color-picker-input"
                          />
                          <Input
                            id="muted"
                            value={theme.muted}
                            onChange={(e) => setTheme({ ...theme, muted: e.target.value })}
                            placeholder="210 40% 96%"
                            className="flex-1"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="mutedForeground">Muted foreground</Label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={hslToHex(theme.mutedForeground)}
                            onChange={(e) => setTheme({ ...theme, mutedForeground: hexToHsl(e.target.value) })}
                            className="color-picker-input"
                          />
                          <Input
                            id="mutedForeground"
                            value={theme.mutedForeground}
                            onChange={(e) => setTheme({ ...theme, mutedForeground: e.target.value })}
                            placeholder="215.4 16.3% 46.9%"
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Destructive Colors */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold">Destructive colors</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="destructive">Destructive</Label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={hslToHex(theme.destructive)}
                            onChange={(e) => setTheme({ ...theme, destructive: hexToHsl(e.target.value) })}
                            className="color-picker-input"
                          />
                          <Input
                            id="destructive"
                            value={theme.destructive}
                            onChange={(e) => setTheme({ ...theme, destructive: e.target.value })}
                            placeholder="0 84.2% 60.2%"
                            className="flex-1"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="destructiveForeground">Destructive foreground</Label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={hslToHex(theme.destructiveForeground)}
                            onChange={(e) => setTheme({ ...theme, destructiveForeground: hexToHsl(e.target.value) })}
                            className="color-picker-input"
                          />
                          <Input
                            id="destructiveForeground"
                            value={theme.destructiveForeground}
                            onChange={(e) => setTheme({ ...theme, destructiveForeground: e.target.value })}
                            placeholder="210 40% 98%"
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Border & Input Colors */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold">Border & input colors</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="border">Border</Label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={hslToHex(theme.border)}
                            onChange={(e) => setTheme({ ...theme, border: hexToHsl(e.target.value) })}
                            className="color-picker-input"
                          />
                          <Input
                            id="border"
                            value={theme.border}
                            onChange={(e) => setTheme({ ...theme, border: e.target.value })}
                            placeholder="214.3 31.8% 91.4%"
                            className="flex-1"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="input">Input</Label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={hslToHex(theme.input)}
                            onChange={(e) => setTheme({ ...theme, input: hexToHsl(e.target.value) })}
                            className="color-picker-input"
                          />
                          <Input
                            id="input"
                            value={theme.input}
                            onChange={(e) => setTheme({ ...theme, input: e.target.value })}
                            placeholder="214.3 31.8% 91.4%"
                            className="flex-1"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="ring">Ring</Label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={hslToHex(theme.ring)}
                            onChange={(e) => setTheme({ ...theme, ring: hexToHsl(e.target.value) })}
                            className="color-picker-input"
                          />
                          <Input
                            id="ring"
                            value={theme.ring}
                            onChange={(e) => setTheme({ ...theme, ring: e.target.value })}
                            placeholder="222.2 84% 4.9%"
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Color Presets */}
                <div className="space-y-3 mt-6">
                  <Label className="text-sm font-medium">Quick presets</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {colorPresets.map((preset) => (
                      <div key={preset.name} className="space-y-2">
                        <div className="text-xs font-medium text-left">{preset.name}</div>
                        <button
                          onClick={() => {
                            setTheme({ 
                              ...theme, 
                              primary: preset.primary,
                              primaryForeground: preset.primaryForeground,
                              secondary: preset.secondary,
                              secondaryForeground: preset.secondaryForeground,
                              accent: preset.accent,
                              accentForeground: preset.accentForeground
                            })
                          }}
                          className="w-full h-8 rounded-md border border-input hover:ring-2 hover:ring-ring/50 transition-all duration-200 overflow-hidden"
                        >
                          <div className="w-full h-full flex">
                            <div 
                              className="flex-1" 
                              style={{ backgroundColor: `hsl(${preset.primary})` }}
                              title="Primary"
                            />
                            <div 
                              className="flex-1" 
                              style={{ backgroundColor: `hsl(${preset.secondary})` }}
                              title="Secondary"
                            />
                            <div 
                              className="flex-1" 
                              style={{ backgroundColor: `hsl(${preset.accent})` }}
                              title="Accent"
                            />
                          </div>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 mt-6">
                  <Button onClick={resetTheme} variant="outline" className="flex-1">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset to Default
                  </Button>
                </div>

                {/* Export System */}
                <div className="mt-6 space-y-4">
                  <Tabs defaultValue="css-variables" className="w-full">
                    <TabsList className="grid w-full grid-cols-5">
                      <TabsTrigger value="css-variables">CSS</TabsTrigger>
                      <TabsTrigger value="tailwind">Tailwind</TabsTrigger>
                      <TabsTrigger value="globals">Global CSS</TabsTrigger>
                      <TabsTrigger value="provider">Provider</TabsTrigger>
                      <TabsTrigger value="install">Install</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="css-variables" className="space-y-4 mt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">CSS Variables</h4>
                          <p className="text-sm text-muted-foreground">Copy these CSS custom properties to your stylesheet</p>
                        </div>
                        <CodeCopyButton text={generateCSSVariables(theme)} />
                      </div>
                      <div className="relative">
                        <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                          <code>{generateCSSVariables(theme)}</code>
                        </pre>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="tailwind" className="space-y-4 mt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Tailwind Configuration</h4>
                          <p className="text-sm text-muted-foreground">Replace your tailwind.config.js with this configuration</p>
                        </div>
                        <CodeCopyButton text={generateTailwindConfig(theme)} />
                      </div>
                      <div className="relative">
                        <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                          <code>{generateTailwindConfig(theme)}</code>
                        </pre>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="globals" className="space-y-4 mt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">globals.css</h4>
                          <p className="text-sm text-muted-foreground">Complete CSS file with Tailwind and theme variables</p>
                        </div>
                        <CodeCopyButton text={generateGlobalCSS(theme)} />
                      </div>
                      <div className="relative">
                        <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                          <code>{generateGlobalCSS(theme)}</code>
                        </pre>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="provider" className="space-y-4 mt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Theme Provider</h4>
                          <p className="text-sm text-muted-foreground">React component for dark/light mode support</p>
                        </div>
                        <CodeCopyButton text={generateThemeProvider()} />
                      </div>
                      <div className="relative">
                        <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                          <code>{generateThemeProvider()}</code>
                        </pre>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="install" className="space-y-4 mt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Installation Guide</h4>
                          <p className="text-sm text-muted-foreground">Step-by-step instructions to integrate your theme</p>
                        </div>
                        <CodeCopyButton text={generateInstallGuide()} />
                      </div>
                      <div className="relative">
                        <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto whitespace-pre-wrap">
                          <code>{generateInstallGuide()}</code>
                        </pre>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </CardContent>
            </Card>

            {/* Preview Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted">
                    <Eye className="h-5 w-5" />
                  </div>
                  Live Preview
                </CardTitle>
                <CardDescription>
                  See how your theme looks across different components and layouts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="primitives" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="primitives">Primitives</TabsTrigger>
                    <TabsTrigger value="cards">Cards</TabsTrigger>
                    <TabsTrigger value="forms">Forms</TabsTrigger>
                    <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="primitives" className="space-y-6 mt-6">
                    <div 
                      className="theme-preview p-6 rounded-lg"
                      style={{
                        '--primary': theme.primary,
                        '--primary-foreground': theme.primaryForeground,
                        '--secondary': theme.secondary,
                        '--secondary-foreground': theme.secondaryForeground,
                        '--accent': theme.accent,
                        '--accent-foreground': theme.accentForeground,
                        '--background': theme.background,
                        '--foreground': theme.foreground,
                        '--card': theme.card,
                        '--card-foreground': theme.cardForeground,
                        '--popover': theme.popover,
                        '--popover-foreground': theme.popoverForeground,
                        '--muted': theme.muted,
                        '--muted-foreground': theme.mutedForeground,
                        '--destructive': theme.destructive,
                        '--destructive-foreground': theme.destructiveForeground,
                        '--border': theme.border,
                        '--input': theme.input,
                        '--ring': theme.ring,
                        backgroundColor: `hsl(${theme.background})`,
                        color: `hsl(${theme.foreground})`,
                      } as React.CSSProperties}
                    >
                    <div className="space-y-8">
                      {/* Buttons Section */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Buttons</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                          <div className="space-y-3">
                            <h4 className="font-medium text-sm text-muted-foreground">Button Variants</h4>
                            <div className="flex flex-col gap-2">
                              <Button>Primary</Button>
                              <Button variant="secondary">Secondary</Button>
                              <Button variant="outline">Outline</Button>
                              <Button variant="ghost">Ghost</Button>
                              <Button variant="destructive">Destructive</Button>
                              <Button variant="link">Link</Button>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <h4 className="font-medium text-sm text-muted-foreground">Button Sizes</h4>
                            <div className="flex flex-col gap-2 items-start">
                              <Button size="lg">Large</Button>
                              <Button>Default</Button>
                              <Button size="sm">Small</Button>
                              <Button size="icon">
                                <span>🎨</span>
                              </Button>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <h4 className="font-medium text-sm text-muted-foreground">Button States</h4>
                            <div className="flex flex-col gap-2">
                              <Button>Normal</Button>
                              <Button disabled>Disabled</Button>
                              <Button className="opacity-75">Loading...</Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Badges & Status */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Badges & Status</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <h4 className="font-medium text-sm text-muted-foreground">Badge Variants</h4>
                            <div className="flex gap-2 flex-wrap">
                              <Badge>Default</Badge>
                              <Badge variant="secondary">Secondary</Badge>
                              <Badge variant="outline">Outline</Badge>
                              <Badge variant="destructive">Destructive</Badge>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <h4 className="font-medium text-sm text-muted-foreground">Status Colors</h4>
                            <div className="flex gap-2 flex-wrap">
                              <Badge className="bg-green-100 text-green-800">Success</Badge>
                              <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>
                              <Badge className="bg-blue-100 text-blue-800">Info</Badge>
                              <Badge className="bg-red-100 text-red-800">Error</Badge>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Form Elements */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Form Elements</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                          <div className="space-y-3">
                            <h4 className="font-medium text-sm text-muted-foreground">Inputs</h4>
                            <div className="space-y-2">
                              <Input placeholder="Text input..." />
                              <Input type="email" placeholder="Email..." />
                              <Input type="password" placeholder="Password..." />
                              <Input disabled placeholder="Disabled input..." />
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <h4 className="font-medium text-sm text-muted-foreground">Textarea</h4>
                            <textarea
                              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              placeholder="Type your message here..."
                            />
                          </div>
                          
                          <div className="space-y-3">
                            <h4 className="font-medium text-sm text-muted-foreground">Select & Options</h4>
                            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                              <option>Option 1</option>
                              <option>Option 2</option>
                              <option>Option 3</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Cards & Containers */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Cards & Containers</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-sm">Simple Card</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-muted-foreground">Card content with muted text.</p>
                            </CardContent>
                          </Card>
                          
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-sm">Card with Badge</CardTitle>
                              <Badge className="w-fit" variant="secondary">New</Badge>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm">Card with various elements.</p>
                            </CardContent>
                          </Card>
                          
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-sm">Interactive Card</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                              <Button size="sm" className="w-full">Action</Button>
                              <Button size="sm" variant="outline" className="w-full">Secondary</Button>
                            </CardContent>
                          </Card>
                        </div>
                      </div>

                      {/* Navigation & Tabs */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Navigation & Tabs</h3>
                        <div className="space-y-4">
                          <Tabs defaultValue="tab1" className="w-full">
                            <TabsList>
                              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                              <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                              <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                            </TabsList>
                            <TabsContent value="tab1" className="mt-4">
                              <Card>
                                <CardContent className="pt-6">
                                  <p className="text-sm">Content for tab 1 with cards and themed elements.</p>
                                </CardContent>
                              </Card>
                            </TabsContent>
                            <TabsContent value="tab2" className="mt-4">
                              <Card>
                                <CardContent className="pt-6">
                                  <p className="text-sm">Content for tab 2 showing theme colors.</p>
                                </CardContent>
                              </Card>
                            </TabsContent>
                            <TabsContent value="tab3" className="mt-4">
                              <Card>
                                <CardContent className="pt-6">
                                  <p className="text-sm">Content for tab 3 with consistent theming.</p>
                                </CardContent>
                              </Card>
                            </TabsContent>
                          </Tabs>
                        </div>
                      </div>

                      {/* Typography & Text */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Typography</h3>
                        <div className="space-y-3">
                          <div>
                            <h1 className="text-3xl font-bold">Heading 1</h1>
                            <h2 className="text-2xl font-semibold">Heading 2</h2>
                            <h3 className="text-xl font-medium">Heading 3</h3>
                            <h4 className="text-lg">Heading 4</h4>
                          </div>
                          <div className="space-y-2">
                            <p className="text-base">Regular paragraph text with normal formatting.</p>
                            <p className="text-sm text-muted-foreground">Muted text for secondary information.</p>
                            <p className="text-xs">Small text for captions and details.</p>
                          </div>
                        </div>
                      </div>

                      {/* Miscellaneous */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Miscellaneous</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                          <div className="space-y-3">
                            <h4 className="font-medium text-sm text-muted-foreground">Borders & Dividers</h4>
                            <div className="space-y-2">
                              <div className="h-px bg-border"></div>
                              <div className="h-0.5 bg-muted"></div>
                              <div className="border-l-4 border-primary pl-4">
                                <p className="text-sm">Left border accent</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <h4 className="font-medium text-sm text-muted-foreground">Backgrounds</h4>
                            <div className="space-y-2">
                              <div className="p-3 bg-muted rounded text-sm">Muted background</div>
                              <div className="p-3 bg-accent text-accent-foreground rounded text-sm">Accent background</div>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <h4 className="font-medium text-sm text-muted-foreground">Interactive</h4>
                            <div className="space-y-2">
                              <button className="text-primary hover:underline text-sm">Link style</button>
                              <div className="p-2 border rounded hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer text-sm">
                                Hoverable item
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="cards" className="space-y-4 mt-6">
                    <div 
                      className="theme-preview p-6 rounded-lg"
                      style={{
                        '--primary': theme.primary,
                        '--primary-foreground': theme.primaryForeground,
                        '--secondary': theme.secondary,
                        '--secondary-foreground': theme.secondaryForeground,
                        '--accent': theme.accent,
                        '--accent-foreground': theme.accentForeground,
                        '--background': theme.background,
                        '--foreground': theme.foreground,
                        '--card': theme.card,
                        '--card-foreground': theme.cardForeground,
                        '--popover': theme.popover,
                        '--popover-foreground': theme.popoverForeground,
                        '--muted': theme.muted,
                        '--muted-foreground': theme.mutedForeground,
                        '--destructive': theme.destructive,
                        '--destructive-foreground': theme.destructiveForeground,
                        '--border': theme.border,
                        '--input': theme.input,
                        '--ring': theme.ring,
                        backgroundColor: `hsl(${theme.background})`,
                        color: `hsl(${theme.foreground})`,
                      } as React.CSSProperties}
                    >
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      <Card>
                        <CardHeader>
                          <CardTitle>Profile Card</CardTitle>
                          <CardDescription>User profile information</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                              JD
                            </div>
                            <div>
                              <p className="font-medium">John Doe</p>
                              <p className="text-sm text-muted-foreground">Product Manager</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle>Stats Card</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">$12,345</div>
                          <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                          <div className="mt-2">
                            <Badge variant="outline" className="text-green-600 border-green-600">+20.1%</Badge>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Product Card</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="w-full h-24 bg-muted rounded-md flex items-center justify-center">
                              <span className="text-muted-foreground">Product Image</span>
                            </div>
                            <div>
                              <h4 className="font-medium">Product Name</h4>
                              <p className="text-sm text-muted-foreground">Short description</p>
                              <p className="text-lg font-bold mt-1">$99.99</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="forms" className="space-y-4 mt-6">
                    <div 
                      className="theme-preview p-6 rounded-lg"
                      style={{
                        '--primary': theme.primary,
                        '--primary-foreground': theme.primaryForeground,
                        '--secondary': theme.secondary,
                        '--secondary-foreground': theme.secondaryForeground,
                        '--accent': theme.accent,
                        '--accent-foreground': theme.accentForeground,
                        '--background': theme.background,
                        '--foreground': theme.foreground,
                        '--card': theme.card,
                        '--card-foreground': theme.cardForeground,
                        '--popover': theme.popover,
                        '--popover-foreground': theme.popoverForeground,
                        '--muted': theme.muted,
                        '--muted-foreground': theme.mutedForeground,
                        '--destructive': theme.destructive,
                        '--destructive-foreground': theme.destructiveForeground,
                        '--border': theme.border,
                        '--input': theme.input,
                        '--ring': theme.ring,
                        backgroundColor: `hsl(${theme.background})`,
                        color: `hsl(${theme.foreground})`,
                      } as React.CSSProperties}
                    >
                    <div className="grid gap-6 md:grid-cols-2">
                      <Card>
                        <CardHeader>
                          <CardTitle>Login Form</CardTitle>
                          <CardDescription>User authentication</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" placeholder="Enter your email" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" placeholder="Enter your password" />
                          </div>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="remember" className="rounded" />
                            <Label htmlFor="remember" className="text-sm">Remember me</Label>
                          </div>
                          <Button className="w-full">Sign In</Button>
                          <Button variant="outline" className="w-full">Create Account</Button>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Contact Form</CardTitle>
                          <CardDescription>Get in touch with us</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="firstName">First Name</Label>
                              <Input id="firstName" placeholder="John" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="lastName">Last Name</Label>
                              <Input id="lastName" placeholder="Doe" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="contactEmail">Email</Label>
                            <Input id="contactEmail" placeholder="john@example.com" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <textarea 
                              id="message" 
                              className="w-full p-3 border rounded-md bg-background" 
                              rows={3} 
                              placeholder="Your message..."
                            />
                          </div>
                          <Button className="w-full">Send Message</Button>
                        </CardContent>
                      </Card>
                    </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="dashboard" className="space-y-6 mt-6">
                    <div 
                      className="theme-preview p-6 rounded-lg"
                      style={{
                        '--primary': theme.primary,
                        '--primary-foreground': theme.primaryForeground,
                        '--secondary': theme.secondary,
                        '--secondary-foreground': theme.secondaryForeground,
                        '--accent': theme.accent,
                        '--accent-foreground': theme.accentForeground,
                        '--background': theme.background,
                        '--foreground': theme.foreground,
                        '--card': theme.card,
                        '--card-foreground': theme.cardForeground,
                        '--popover': theme.popover,
                        '--popover-foreground': theme.popoverForeground,
                        '--muted': theme.muted,
                        '--muted-foreground': theme.mutedForeground,
                        '--destructive': theme.destructive,
                        '--destructive-foreground': theme.destructiveForeground,
                        '--border': theme.border,
                        '--input': theme.input,
                        '--ring': theme.ring,
                        backgroundColor: `hsl(${theme.background})`,
                        color: `hsl(${theme.foreground})`,
                      } as React.CSSProperties}
                    >
                    {/* KPI Cards */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">$45,231.89</div>
                          <p className="text-xs text-muted-foreground flex items-center">
                            <span className="text-green-600 mr-1">↗ +20.1%</span>
                            from last month
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">+2,350</div>
                          <p className="text-xs text-muted-foreground flex items-center">
                            <span className="text-green-600 mr-1">↗ +180.1%</span>
                            from last month
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Sales</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">+12,234</div>
                          <p className="text-xs text-muted-foreground flex items-center">
                            <span className="text-green-600 mr-1">↗ +19%</span>
                            from last month
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">8,432</div>
                          <p className="text-xs text-muted-foreground flex items-center">
                            <span className="text-red-600 mr-1">↘ -2.1%</span>
                            from last month
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Dashboard Sections */}
                    <div className="grid gap-6 md:grid-cols-2">
                      <Card>
                        <CardHeader>
                          <CardTitle>Recent Activity</CardTitle>
                          <CardDescription>Latest user actions</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs">
                                  JD
                                </div>
                                <div>
                                  <p className="text-sm font-medium">John Doe</p>
                                  <p className="text-xs text-muted-foreground">Created new project</p>
                                </div>
                              </div>
                              <Badge variant="outline">2m ago</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground text-xs">
                                  AS
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Alice Smith</p>
                                  <p className="text-xs text-muted-foreground">Updated settings</p>
                                </div>
                              </div>
                              <Badge variant="outline">5m ago</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-accent-foreground text-xs">
                                  BJ
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Bob Johnson</p>
                                  <p className="text-xs text-muted-foreground">Completed task</p>
                                </div>
                              </div>
                              <Badge variant="outline">1h ago</Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Quick Actions</CardTitle>
                          <CardDescription>Common tasks</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-3">
                            <Button className="h-20 flex-col">
                              <span className="text-lg mb-1">+</span>
                              <span className="text-xs">New Project</span>
                            </Button>
                            <Button variant="outline" className="h-20 flex-col">
                              <span className="text-lg mb-1">📊</span>
                              <span className="text-xs">View Reports</span>
                            </Button>
                            <Button variant="secondary" className="h-20 flex-col">
                              <span className="text-lg mb-1">👥</span>
                              <span className="text-xs">Invite Users</span>
                            </Button>
                            <Button variant="ghost" className="h-20 flex-col">
                              <span className="text-lg mb-1">⚙️</span>
                              <span className="text-xs">Settings</span>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
