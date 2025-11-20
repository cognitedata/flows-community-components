'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  IconColumns as Columns,
  IconGrid as Grid,
  IconLayoutSidebar as Layout,
  IconDeviceDesktop as Monitor,
  IconDeviceMobile as Smartphone,
  IconDeviceTablet as Tablet,
} from '@tabler/icons-react';
import { Button } from '@/components/ui/cognite/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/cognite/card';

const breakpoints = [
  { name: 'Mobile', icon: Smartphone, width: '375px', minWidth: '320px' },
  { name: 'Tablet', icon: Tablet, width: '768px', minWidth: '768px' },
  { name: 'Desktop', icon: Monitor, width: '1200px', minWidth: '1024px' },
];

const layoutPatterns = [
  {
    name: 'Grid layout',
    icon: Grid,
    description: 'Flexible grid system for complex layouts',
    cols: 'grid-cols-3',
    preview: [
      'col-span-2',
      'col-span-1',
      'col-span-1',
      'col-span-2',
      'col-span-3',
    ],
  },
  {
    name: 'Sidebar layout',
    icon: Layout,
    description: 'Fixed sidebar with main content area',
    cols: 'grid-cols-4',
    preview: ['col-span-1', 'col-span-3'],
  },
  {
    name: 'Column layout',
    icon: Columns,
    description: 'Multi-column content organization',
    cols: 'grid-cols-2',
    preview: ['col-span-1', 'col-span-1', 'col-span-1', 'col-span-1'],
  },
];

function ResponsiveDemo({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const [activeBreakpoint, setActiveBreakpoint] = useState(2); // Desktop by default

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>
              Responsive behavior across different screen sizes
            </CardDescription>
          </div>
          <div className="flex items-center space-x-1">
            {breakpoints.map((bp, index) => (
              <Button
                key={bp.name}
                size="sm"
                variant={activeBreakpoint === index ? 'default' : 'outline'}
                onClick={() => setActiveBreakpoint(index)}
              >
                <bp.icon className="h-4 w-4" />
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg p-4 bg-muted/30">
          <div className="text-xs text-muted-foreground mb-2 text-center">
            {breakpoints[activeBreakpoint].name} -{' '}
            {breakpoints[activeBreakpoint].width}
          </div>
          <motion.div
            key={activeBreakpoint}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="mx-auto bg-background border rounded"
            style={{
              width:
                activeBreakpoint === 0
                  ? '375px'
                  : activeBreakpoint === 1
                    ? '600px'
                    : '800px',
              maxWidth: '100%',
            }}
          >
            {children}
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
}

function LayoutPattern({ pattern }: { pattern: (typeof layoutPatterns)[0] }) {
  return (
    <Card className="group hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <pattern.icon className="h-6 w-6 text-primary" />
          <div>
            <CardTitle className="text-lg">{pattern.name}</CardTitle>
            <CardDescription>{pattern.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className={`grid ${pattern.cols} gap-2 h-24`}>
          {pattern.preview.map((span, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className={`${span} bg-primary/20 rounded group-hover:bg-primary/30 transition-colors`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function LayoutsPage() {
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
            <h1 className="text-3xl md:text-4xl font-bold">Layout patterns</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Responsive layout systems and patterns that adapt gracefully
              across all device sizes. Built with CSS Grid and Flexbox for
              maximum flexibility.
            </p>
          </div>

          {/* Breakpoints */}
          <section className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Responsive breakpoints</h2>
              <p className="text-muted-foreground">
                Our responsive system adapts to these key breakpoints
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {breakpoints.map((bp, index) => (
                <motion.div
                  key={bp.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="text-center">
                    <CardHeader>
                      <bp.icon className="h-8 w-8 mx-auto text-primary mb-2" />
                      <CardTitle>{bp.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div>Width: {bp.width}</div>
                        <div>Min: {bp.minWidth}</div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Layout Patterns */}
          <section className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Common patterns</h2>
              <p className="text-muted-foreground">
                Proven layout patterns for different content types and use cases
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {layoutPatterns.map((pattern, index) => (
                <motion.div
                  key={pattern.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <LayoutPattern pattern={pattern} />
                </motion.div>
              ))}
            </div>
          </section>

          {/* Responsive Preview */}
          <section className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Responsive previews</h2>
              <p className="text-muted-foreground">
                Interactive demos showing how layouts adapt across breakpoints
              </p>
            </div>

            <div className="space-y-8">
              {/* Header Layout */}
              <ResponsiveDemo title="Header navigation">
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-primary rounded" />
                      <div className="hidden md:block text-sm font-medium">
                        Brand
                      </div>
                    </div>
                    <div className="hidden md:flex space-x-4">
                      {['Home', 'About', 'Contact'].map((item) => (
                        <div
                          key={item}
                          className="text-sm px-2 py-1 bg-muted rounded"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                    <div className="md:hidden w-6 h-6 bg-muted rounded" />
                  </div>
                </div>
              </ResponsiveDemo>

              {/* Card Grid */}
              <ResponsiveDemo title="Card grid layout">
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                      <div key={item} className="h-20 bg-muted rounded p-3">
                        <div className="w-full h-3 bg-primary/30 rounded mb-2" />
                        <div className="w-2/3 h-2 bg-muted-foreground/20 rounded" />
                      </div>
                    ))}
                  </div>
                </div>
              </ResponsiveDemo>

              {/* Sidebar Layout */}
              <ResponsiveDemo title="Sidebar layout">
                <div className="p-4">
                  <div className="flex gap-4">
                    <div className="hidden lg:block w-48 h-32 bg-muted rounded p-3">
                      <div className="space-y-2">
                        {[1, 2, 3].map((item) => (
                          <div
                            key={item}
                            className="h-6 bg-primary/20 rounded"
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex-1 h-32 bg-muted rounded p-3">
                      <div className="space-y-2">
                        <div className="h-4 bg-primary/30 rounded" />
                        <div className="h-4 bg-muted-foreground/20 rounded w-3/4" />
                        <div className="h-4 bg-muted-foreground/20 rounded w-1/2" />
                      </div>
                    </div>
                  </div>
                </div>
              </ResponsiveDemo>
            </div>
          </section>

          {/* Grid System */}
          <section className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Grid system</h2>
              <p className="text-muted-foreground">
                Flexible 12-column grid system for precise layout control
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>12-column grid</CardTitle>
                <CardDescription>
                  Responsive grid with consistent gutters and flexible column
                  spans
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Full width */}
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 h-8 bg-primary/20 rounded flex items-center justify-center text-xs">
                      col-span-12
                    </div>
                  </div>

                  {/* Half width */}
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-6 h-8 bg-primary/20 rounded flex items-center justify-center text-xs">
                      col-span-6
                    </div>
                    <div className="col-span-6 h-8 bg-primary/20 rounded flex items-center justify-center text-xs">
                      col-span-6
                    </div>
                  </div>

                  {/* Third width */}
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-4 h-8 bg-primary/20 rounded flex items-center justify-center text-xs">
                      col-span-4
                    </div>
                    <div className="col-span-4 h-8 bg-primary/20 rounded flex items-center justify-center text-xs">
                      col-span-4
                    </div>
                    <div className="col-span-4 h-8 bg-primary/20 rounded flex items-center justify-center text-xs">
                      col-span-4
                    </div>
                  </div>

                  {/* Mixed */}
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-8 h-8 bg-primary/20 rounded flex items-center justify-center text-xs">
                      col-span-8
                    </div>
                    <div className="col-span-4 h-8 bg-primary/20 rounded flex items-center justify-center text-xs">
                      col-span-4
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Best Practices */}
          <section className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Layout best practices</h2>
              <p className="text-muted-foreground">
                Guidelines for creating effective and accessible layouts
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Mobile first</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Start with mobile layouts and progressively enhance for
                    larger screens.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Design for touch-friendly interactions</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Use larger touch targets (44px minimum)</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Prioritize content hierarchy</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Accessibility</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Ensure layouts work for users with different abilities and
                    technologies.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Maintain logical reading order</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Use semantic HTML structure</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Test with keyboard navigation</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Optimize layouts for fast loading and smooth interactions.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Minimize layout shifts</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Use efficient CSS Grid and Flexbox</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Optimize images and media</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Consistency</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Maintain visual and functional consistency across all
                    layouts.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Use consistent spacing patterns</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Follow established grid systems</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Reuse layout components</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
