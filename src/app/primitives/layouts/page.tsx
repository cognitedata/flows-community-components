'use client';

import { useState } from 'react';

// Breakpoint definitions matching our layout system
const breakpoints = [
  { name: 'base', min: 0, max: 639, columns: 4, prefix: '(none)' },
  { name: 'sm', min: 640, max: 767, columns: 8, prefix: '@sm:' },
  { name: 'md', min: 768, max: 1023, columns: 12, prefix: '@md:' },
  { name: 'lg', min: 1024, max: 1280, columns: 12, prefix: '@lg:' },
  { name: 'xl', min: 1281, max: 1536, columns: 12, prefix: '@xl:' },
];

// Max-width mappings (these are examples - adjust based on content needs)
const maxWidths = [
  { breakpoint: 'base', class: 'max-w-sm', description: '384px' },
  { breakpoint: '@sm:', class: 'max-w-md', description: '448px' },
  { breakpoint: '@md:', class: 'max-w-2xl', description: '672px' },
  { breakpoint: '@lg:', class: 'max-w-4xl', description: '896px' },
  { breakpoint: '@xl:', class: 'max-w-6xl', description: '1152px' },
];

function BreakpointTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 pr-4 font-medium">Breakpoint</th>
            <th className="text-left py-3 pr-4 font-medium">Range</th>
            <th className="text-left py-3 pr-4 font-medium">Columns</th>
            <th className="text-left py-3 font-medium">Prefix</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {breakpoints.map((bp) => (
            <tr key={bp.name}>
              <td className="py-3 pr-4 font-medium">{bp.name}</td>
              <td className="py-3 pr-4 text-muted-foreground">
                {bp.min}px – {bp.max}px
              </td>
              <td className="py-3 pr-4">{bp.columns}</td>
              <td className="py-3">
                <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                  {bp.prefix}
                </code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MaxWidthTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 pr-4 font-medium">Breakpoint</th>
            <th className="text-left py-3 pr-4 font-medium">Class</th>
            <th className="text-left py-3 font-medium">Max Width</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {maxWidths.map((mw) => (
            <tr key={mw.breakpoint}>
              <td className="py-3 pr-4">
                <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                  {mw.breakpoint}
                </code>
              </td>
              <td className="py-3 pr-4">
                <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                  {mw.class}
                </code>
              </td>
              <td className="py-3 text-muted-foreground">{mw.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function InteractiveDemo() {
  const [width, setWidth] = useState(1200);

  const getCurrentBreakpoint = () => {
    if (width >= 1281) return 'xl';
    if (width >= 1024) return 'lg';
    if (width >= 768) return 'md';
    if (width >= 640) return 'sm';
    return 'base';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium">Container width:</label>
        <input
          type="range"
          min="320"
          max="1400"
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
          className="flex-1"
        />
        <span className="text-sm font-mono w-20 text-right">{width}px</span>
        <span className="text-sm font-medium px-2 py-1 bg-primary text-primary-foreground rounded">
          {getCurrentBreakpoint()}
        </span>
      </div>

      {/* Interactive container - BLACK border (page/viewport) */}
      <div
        className="@container border-2 border-foreground rounded-lg overflow-hidden transition-all duration-300 mx-auto"
        style={{ width: `${width}px`, maxWidth: '100%' }}
      >
        {/* GREY: Centered content wrapper - uses smaller max-widths to demonstrate centering */}
        <div className="mx-auto px-4 py-6 max-w-[280px] @sm:max-w-xs @md:max-w-sm @lg:max-w-md @xl:max-w-lg grid grid-cols-4 gap-3 @sm:grid-cols-8 @md:grid-cols-12 border-2 border-muted-foreground rounded m-4">
          
          {/* RED: Row 1 - Two columns */}
          <div className="col-span-4 @sm:col-span-8 @md:col-span-12 grid grid-cols-2 gap-3 border-2 border-red-500 rounded p-2">
            {/* BLUE: Card 1 - no border */}
            <div className="bg-card rounded-lg p-4">
              <div className="text-xs text-muted-foreground mb-1">Card</div>
              <div className="h-12 bg-muted rounded" />
            </div>
            {/* BLUE: Card 2 - no border */}
            <div className="bg-card rounded-lg p-4">
              <div className="text-xs text-muted-foreground mb-1">Card</div>
              <div className="h-12 bg-muted rounded" />
            </div>
          </div>

          {/* RED: Row 2 - Full width content area */}
          <div className="col-span-4 @sm:col-span-8 @md:col-span-12 border-2 border-red-500 rounded p-4">
            <div className="text-xs text-muted-foreground mb-1">Full width content</div>
            <div className="h-16 bg-muted rounded" />
          </div>

        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-foreground rounded" />
          <span>Black: Page container (@container)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-muted-foreground rounded" />
          <span>Grey: Centered grid (max-w-*)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-red-500 rounded" />
          <span>Red: Row wrapper (nested grid)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-card rounded" />
          <span>Card: bg-card (no border)</span>
        </div>
      </div>
    </div>
  );
}

function CodeExample() {
  const code = `{/* ═══ BLACK: Full viewport width, container query context ═══ */}
<div className="@container w-full min-h-screen">
  
  {/* ═══ GREY: Centered grid with stepped max-widths ═══ */}
  {/* Adjust max-w-* values based on your content needs */}
  <div className="mx-auto px-4 max-w-sm @sm:max-w-md @md:max-w-2xl @lg:max-w-4xl @xl:max-w-6xl grid grid-cols-4 gap-4 @sm:grid-cols-8 @md:grid-cols-12">
    
    {/* ═══ RED: Row 1 (two columns) ═══ */}
    <div className="col-span-4 @sm:col-span-8 @md:col-span-12 grid grid-cols-2 gap-4">
      {/* Card (no border, just bg-card) */}
      <div className="bg-card rounded-lg p-4">Content 1</div>
      {/* Card (no border, just bg-card) */}
      <div className="bg-card rounded-lg p-4">Content 2</div>
    </div>
    
    {/* ═══ RED: Row 2 (full width) ═══ */}
    <div className="col-span-4 @sm:col-span-8 @md:col-span-12">
      Full width content
    </div>
    
  </div>
</div>`;

  return (
    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs">
      <code>{code}</code>
    </pre>
  );
}

function KeyConcepts() {
  return (
    <div className="grid gap-4 @sm:grid-cols-2">
      <div className="p-4 border border-border rounded-lg">
        <h4 className="font-medium mb-2">Container Query Context</h4>
        <p className="text-sm text-muted-foreground mb-2">
          Wrap content with <code className="bg-muted px-1 rounded">@container</code> to enable responsive behaviour based on container width, not viewport.
        </p>
        <code className="text-xs bg-muted px-2 py-1 rounded block">
          @container
        </code>
      </div>
      
      <div className="p-4 border border-border rounded-lg">
        <h4 className="font-medium mb-2">Responsive Grid</h4>
        <p className="text-sm text-muted-foreground mb-2">
          Use the 4/8/12 column system that adapts at each breakpoint.
        </p>
        <code className="text-xs bg-muted px-2 py-1 rounded block">
          grid grid-cols-4 @sm:grid-cols-8 @md:grid-cols-12
        </code>
      </div>
      
      <div className="p-4 border border-border rounded-lg">
        <h4 className="font-medium mb-2">Column Spanning</h4>
        <p className="text-sm text-muted-foreground mb-2">
          Use responsive spans to control element width across breakpoints.
        </p>
        <code className="text-xs bg-muted px-2 py-1 rounded block">
          col-span-4 @sm:col-span-4 @md:col-span-6
        </code>
      </div>
      
      <div className="p-4 border border-border rounded-lg">
        <h4 className="font-medium mb-2">Centered Max-Width</h4>
        <p className="text-sm text-muted-foreground mb-2">
          Centre content with stepped max-widths using Tailwind&apos;s built-in classes.
        </p>
        <code className="text-xs bg-muted px-2 py-1 rounded block">
          mx-auto max-w-sm @sm:max-w-md @md:max-w-2xl @lg:max-w-4xl
        </code>
      </div>
    </div>
  );
}

export default function LayoutsPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Layouts</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Container query-based responsive layout system with a 4/8/12 column grid
        </p>
      </div>

      {/* Key Concepts */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Key Concepts</h2>
          <p className="text-muted-foreground">
            Core patterns for building responsive layouts
          </p>
        </div>
        <KeyConcepts />
      </section>

      {/* Breakpoints */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Breakpoints</h2>
          <p className="text-muted-foreground">
            Container query breakpoints aligned with Tailwind&apos;s naming convention
          </p>
        </div>
        <BreakpointTable />
      </section>

      {/* Max Widths */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Content Max-Widths</h2>
          <p className="text-muted-foreground">
            Stepped max-widths for centred content areas
          </p>
        </div>
        <MaxWidthTable />
      </section>

      {/* Interactive Demo */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Interactive Demo</h2>
          <p className="text-muted-foreground">
            Drag the slider to see how the layout adapts to different container widths
          </p>
        </div>
        <InteractiveDemo />
      </section>

      {/* Usage */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Usage</h2>
          <p className="text-muted-foreground">
            Copy-paste ready code for the standard page layout structure
          </p>
        </div>
        <CodeExample />
      </section>
    </div>
  );
}
