'use client';

import { motion } from 'framer-motion';
import {
  IconCheck as Check,
  IconCopy as Copy,
  IconDownload as Download,
} from '@tabler/icons-react';
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
  mountain: [
    { name: 'Mountain 50', value: 'rgb(241, 242, 243)', hex: '#f1f2f3' },
    { name: 'Mountain 100', value: 'rgb(228, 230, 232)', hex: '#e4e6e8' },
    { name: 'Mountain 200', value: 'rgb(212, 215, 217)', hex: '#d4d7d9' },
    { name: 'Mountain 300', value: 'rgb(187, 192, 196)', hex: '#bbc0c4' },
    { name: 'Mountain 400', value: 'rgb(165, 171, 177)', hex: '#a5abb1' },
    { name: 'Mountain 500', value: 'rgb(124, 134, 142)', hex: '#7c868e' },
    { name: 'Mountain 600', value: 'rgb(94, 102, 109)', hex: '#5e666d' },
    { name: 'Mountain 700', value: 'rgb(64, 70, 74)', hex: '#40464a' },
    { name: 'Mountain 800', value: 'rgb(45, 49, 52)', hex: '#2d3134' },
    { name: 'Mountain 900', value: 'rgb(33, 36, 38)', hex: '#212426' },
    { name: 'Mountain 950', value: 'rgb(17, 18, 19)', hex: '#111213' },
  ],
  fjord: [
    { name: 'Fjord 50', value: 'rgb(239, 242, 253)', hex: '#eff2fd' },
    { name: 'Fjord 100', value: 'rgb(223, 229, 252)', hex: '#dfe5fc' },
    { name: 'Fjord 200', value: 'rgb(204, 213, 250)', hex: '#ccd5fa' },
    { name: 'Fjord 300', value: 'rgb(174, 189, 247)', hex: '#aebdf7' },
    { name: 'Fjord 400', value: 'rgb(147, 167, 244)', hex: '#93a7f4' },
    { name: 'Fjord 500', value: 'rgb(95, 125, 239)', hex: '#5f7def' },
    { name: 'Fjord 600', value: 'rgb(47, 85, 234)', hex: '#2f55ea' },
    { name: 'Fjord 700', value: 'rgb(18, 52, 182)', hex: '#1234b6' },
    { name: 'Fjord 800', value: 'rgb(13, 37, 130)', hex: '#0d2582' },
    { name: 'Fjord 900', value: 'rgb(10, 28, 97)', hex: '#0a1c61' },
    { name: 'Fjord 950', value: 'rgb(5, 15, 51)', hex: '#050f33' },
  ],
  nordic: [
    { name: 'Nordic 50', value: 'rgb(218, 249, 242)', hex: '#daf9f2' },
    { name: 'Nordic 100', value: 'rgb(180, 242, 229)', hex: '#b4f2e5' },
    { name: 'Nordic 200', value: 'rgb(127, 233, 210)', hex: '#7fe9d2' },
    { name: 'Nordic 300', value: 'rgb(37, 215, 176)', hex: '#25d7b0' },
    { name: 'Nordic 400', value: 'rgb(33, 192, 157)', hex: '#21c09d' },
    { name: 'Nordic 500', value: 'rgb(26, 150, 122)', hex: '#1a967a' },
    { name: 'Nordic 600', value: 'rgb(20, 115, 94)', hex: '#14735e' },
    { name: 'Nordic 700', value: 'rgb(13, 78, 64)', hex: '#0d4e40' },
    { name: 'Nordic 800', value: 'rgb(10, 55, 45)', hex: '#0a372d' },
    { name: 'Nordic 900', value: 'rgb(7, 41, 34)', hex: '#072922' },
    { name: 'Nordic 950', value: 'rgb(4, 21, 17)', hex: '#041511' },
  ],
  aurora: [
    { name: 'Aurora 50', value: 'rgb(231, 249, 198)', hex: '#e7f9c6' },
    { name: 'Aurora 100', value: 'rgb(207, 243, 141)', hex: '#cff38d' },
    { name: 'Aurora 200', value: 'rgb(171, 233, 56)', hex: '#abe938' },
    { name: 'Aurora 300', value: 'rgb(144, 210, 23)', hex: '#90d217' },
    { name: 'Aurora 400', value: 'rgb(129, 188, 20)', hex: '#81bc14' },
    { name: 'Aurora 500', value: 'rgb(100, 146, 16)', hex: '#649210' },
    { name: 'Aurora 600', value: 'rgb(77, 112, 12)', hex: '#4d700c' },
    { name: 'Aurora 700', value: 'rgb(52, 76, 8)', hex: '#344c08' },
    { name: 'Aurora 800', value: 'rgb(37, 54, 6)', hex: '#253606' },
    { name: 'Aurora 900', value: 'rgb(27, 40, 4)', hex: '#1b2804' },
    { name: 'Aurora 950', value: 'rgb(14, 20, 2)', hex: '#0e1402' },
  ],
  dusk: [
    { name: 'Dusk 50', value: 'rgb(248, 239, 249)', hex: '#f8eff9' },
    { name: 'Dusk 100', value: 'rgb(241, 225, 243)', hex: '#f1e1f3' },
    { name: 'Dusk 200', value: 'rgb(232, 206, 236)', hex: '#e8ceec' },
    { name: 'Dusk 300', value: 'rgb(219, 177, 225)', hex: '#dbb1e1' },
    { name: 'Dusk 400', value: 'rgb(207, 151, 215)', hex: '#cf97d7' },
    { name: 'Dusk 500', value: 'rgb(183, 101, 196)', hex: '#b765c4' },
    { name: 'Dusk 600', value: 'rgb(153, 64, 166)', hex: '#9940a6' },
    { name: 'Dusk 700', value: 'rgb(104, 44, 113)', hex: '#682c71' },
    { name: 'Dusk 800', value: 'rgb(55, 23, 60)', hex: '#37173c' },
    { name: 'Dusk 900', value: 'rgb(55, 23, 60)', hex: '#37173c' },
    { name: 'Dusk 950', value: 'rgb(28, 12, 31)', hex: '#1c0c1f' },
  ],
};

const typography = [
  { name: 'Heading 1', size: '2.25rem', weight: '700', lineHeight: '2.75rem' },
  { name: 'Heading 2', size: '1.75rem', weight: '700', lineHeight: '2rem' },
  { name: 'Heading 3', size: '1.5rem', weight: '600', lineHeight: '1.75rem' },
  { name: 'Heading 4', size: '1.25rem', weight: '500', lineHeight: '1.5rem' },
  { name: 'Heading 5', size: '1.125rem', weight: '500', lineHeight: '1.5rem' },
  { name: 'Heading 6', size: '1rem', weight: '500', lineHeight: '1.25rem' },
  { name: 'Paragraph', size: '1rem', weight: '400', lineHeight: '1.75rem' },
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
