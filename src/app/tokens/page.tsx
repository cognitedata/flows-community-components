'use client';

import { motion } from 'framer-motion';
import { IconCheck as Check, IconCopy as Copy, IconDownload as Download } from '@tabler/icons-react';
import { useState } from 'react';
import { Button } from '@/components/ui/aura/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/aura/card';

const colors = {
  blue: [
    { name: 'Blue 50', value: '#eff6ff', hex: '#eff6ff' },
    { name: 'Blue 100', value: '#dbeafe', hex: '#dbeafe' },
    { name: 'Blue 200', value: '#bfdbfe', hex: '#bfdbfe' },
    { name: 'Blue 300', value: '#93c5fd', hex: '#93c5fd' },
    { name: 'Blue 400', value: '#60a5fa', hex: '#60a5fa' },
    { name: 'Blue 500', value: '#3b82f6', hex: '#3b82f6' },
    { name: 'Blue 600', value: '#2563eb', hex: '#2563eb' },
    { name: 'Blue 700', value: '#1d4ed8', hex: '#1d4ed8' },
    { name: 'Blue 800', value: '#1e40af', hex: '#1e40af' },
    { name: 'Blue 900', value: '#1e3a8a', hex: '#1e3a8a' },
  ],
  neon: [
    { name: 'Neon 50', value: '#FCFF99', hex: '#FCFF99' },
    { name: 'Neon 100', value: '#F8FF66', hex: '#F8FF66' },
    { name: 'Neon 200', value: '#F2FF33', hex: '#F2FF33' },
    { name: 'Neon 300', value: '#EBFF00', hex: '#EBFF00' },
    { name: 'Neon 400', value: '#D6E600', hex: '#D6E600' },
    { name: 'Neon 500', value: '#B3CC00', hex: '#B3CC00' },
    { name: 'Neon 600', value: '#8FB300', hex: '#8FB300' },
    { name: 'Neon 700', value: '#6B9900', hex: '#6B9900' },
    { name: 'Neon 800', value: '#467F00', hex: '#467F00' },
    { name: 'Neon 900', value: '#2B6600', hex: '#2B6600' },
  ],
  slate: [
    { name: 'Slate 50', value: '#f8fafc', hex: '#f8fafc' },
    { name: 'Slate 100', value: '#f1f5f9', hex: '#f1f5f9' },
    { name: 'Slate 200', value: '#e2e8f0', hex: '#e2e8f0' },
    { name: 'Slate 300', value: '#cbd5e1', hex: '#cbd5e1' },
    { name: 'Slate 400', value: '#94a3b8', hex: '#94a3b8' },
    { name: 'Slate 500', value: '#64748b', hex: '#64748b' },
    { name: 'Slate 600', value: '#475569', hex: '#475569' },
    { name: 'Slate 700', value: '#334155', hex: '#334155' },
    { name: 'Slate 800', value: '#1e293b', hex: '#1e293b' },
    { name: 'Slate 900', value: '#0f172a', hex: '#0f172a' },
  ],
  onyx: [
    { name: 'Onyx 50', value: '#fafafa', hex: '#fafafa' },
    { name: 'Onyx 100', value: '#f5f5f5', hex: '#f5f5f5' },
    { name: 'Onyx 200', value: '#e5e5e5', hex: '#e5e5e5' },
    { name: 'Onyx 300', value: '#d4d4d4', hex: '#d4d4d4' },
    { name: 'Onyx 400', value: '#a3a3a3', hex: '#a3a3a3' },
    { name: 'Onyx 500', value: '#737373', hex: '#737373' },
    { name: 'Onyx 600', value: '#525252', hex: '#525252' },
    { name: 'Onyx 700', value: '#404040', hex: '#404040' },
    { name: 'Onyx 800', value: '#262626', hex: '#262626' },
    { name: 'Onyx 900', value: '#171717', hex: '#171717' },
  ],
};

const typography = [
  { name: 'Display large', size: '4rem', weight: '700', lineHeight: '1.1' },
  { name: 'Display medium', size: '3rem', weight: '700', lineHeight: '1.2' },
  { name: 'Heading 1', size: '2.25rem', weight: '600', lineHeight: '1.3' },
  { name: 'Heading 2', size: '1.875rem', weight: '600', lineHeight: '1.3' },
  { name: 'Body large', size: '1.125rem', weight: '400', lineHeight: '1.6' },
  { name: 'Body medium', size: '1rem', weight: '400', lineHeight: '1.6' },
  { name: 'Body small', size: '0.875rem', weight: '400', lineHeight: '1.5' },
];

const spacing = [
  { name: 'XS', value: '0.25rem', pixels: '4px' },
  { name: 'SM', value: '0.5rem', pixels: '8px' },
  { name: 'MD', value: '1rem', pixels: '16px' },
  { name: 'LG', value: '1.5rem', pixels: '24px' },
  { name: 'XL', value: '2rem', pixels: '32px' },
  { name: '2XL', value: '3rem', pixels: '48px' },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
  );
}

export default function TokensPage() {
  return (
    <div className="px-3 py-16">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-16 text-center"
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">Design tokens</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The foundational elements of our design system. Colors,
              typography, and spacing tokens ensure consistency across all
              digital experiences.
            </p>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Download token files
            </Button>
          </div>

          {/* Color Tokens */}
          <section className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Color palette</h2>
              <p className="text-muted-foreground">
                Our carefully crafted color system supports both light and dark
                themes
              </p>
            </div>

            <div className="grid gap-8">
              {Object.entries(colors).map(([category, colorArray]) => (
                <Card key={category}>
                  <CardHeader>
                    <CardTitle className="capitalize">
                      {category} colors
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-3">
                      {colorArray.map((color) => (
                        <motion.div
                          key={color.name}
                          whileHover={{ scale: 1.05 }}
                          className="space-y-2"
                        >
                          <div
                            className="h-12 w-full rounded-lg border shadow-sm"
                            style={{ backgroundColor: color.hex }}
                          />
                          <div className="space-y-1">
                            <div className="text-xs font-medium">
                              {color.name}
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="text-xs text-muted-foreground font-mono">
                                {color.hex.toUpperCase()}
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
              <h2 className="text-2xl font-bold">Typography scale</h2>
              <p className="text-muted-foreground">
                A harmonious type scale that ensures readable and accessible
                content
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
                      <CopyButton
                        text={`font-size: ${type.size}; font-weight: ${type.weight}; line-height: ${type.lineHeight};`}
                      />
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </section>

          {/* Spacing */}
          <section className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Spacing system</h2>
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
                        <div className="text-sm font-medium w-12">
                          {space.name}
                        </div>
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
              <h2 className="text-2xl font-bold">Asset library</h2>
              <p className="text-muted-foreground">
                Download design assets and implementation files
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Design tokens</CardTitle>
                  <CardDescription>
                    JSON file with all design tokens
                  </CardDescription>
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
                  <CardTitle>Figma library</CardTitle>
                  <CardDescription>
                    Complete Figma design system file
                  </CardDescription>
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
                  <CardTitle>CSS variables</CardTitle>
                  <CardDescription>
                    Ready-to-use CSS custom properties
                  </CardDescription>
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
    </div>
  );
}
