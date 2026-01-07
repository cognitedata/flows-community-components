/**
 * Aura Layout System
 *
 * This file contains the canonical layout and grid definitions for the Aura design system.
 * It exports structured data for LLM consumption, including breakpoints, grid configurations,
 * and container query patterns.
 *
 * Key Concepts:
 * - **Container Queries**: Layouts respond to their container's width, not the viewport
 * - **CSS Grid**: 12-column grid system with responsive breakpoints
 * - **Fluid Layouts**: Content adapts between min and max widths at each breakpoint
 *
 * Usage:
 * 1. Wrap content in a container query context: `@container`
 * 2. Apply responsive grid classes: `grid grid-cols-4 @sm:grid-cols-8 @md:grid-cols-12`
 * 3. Use column spanning: `col-span-4 @md:col-span-6`
 */

// =============================================================================
// Breakpoint Definitions
// =============================================================================

export interface LayoutBreakpoint {
  name: string;
  min: number;
  max: number;
  columns: number;
  gutter: number;
  margin: number;
  description: string;
}

/**
 * Breakpoints aligned with Tailwind's default container query breakpoints.
 * These match the standard sm/md/lg/xl values for consistency.
 */
export const layoutBreakpoints: LayoutBreakpoint[] = [
  {
    name: 'sm',
    min: 320,
    max: 640,
    columns: 4,
    gutter: 8,
    margin: 16,
    description: 'Mobile devices, narrow containers',
  },
  {
    name: 'md',
    min: 640,
    max: 768,
    columns: 8,
    gutter: 8,
    margin: 16,
    description: 'Tablets, medium containers',
  },
  {
    name: 'lg',
    min: 768,
    max: 1024,
    columns: 12,
    gutter: 16,
    margin: 12,
    description: 'Laptops, large containers',
  },
  {
    name: 'xl',
    min: 1024,
    max: 1280,
    columns: 12,
    gutter: 16,
    margin: 12,
    description: 'Desktops, extra large containers',
  },
];

// =============================================================================
// Container Query Classes
// =============================================================================

export interface ContainerQueryClass {
  breakpoint: string;
  minWidth: number;
  prefix: string;
  description: string;
}

/**
 * Container query prefixes using Tailwind's named breakpoints.
 * Use these instead of arbitrary pixel values for cleaner, more maintainable code.
 */
export const containerQueryClasses: ContainerQueryClass[] = [
  {
    breakpoint: 'sm',
    minWidth: 640,
    prefix: '@sm:',
    description: 'Applies when container is at least 640px wide',
  },
  {
    breakpoint: 'md',
    minWidth: 768,
    prefix: '@md:',
    description: 'Applies when container is at least 768px wide',
  },
  {
    breakpoint: 'lg',
    minWidth: 1024,
    prefix: '@lg:',
    description: 'Applies when container is at least 1024px wide',
  },
  {
    breakpoint: 'xl',
    minWidth: 1280,
    prefix: '@xl:',
    description: 'Applies when container is at least 1280px wide',
  },
];

// =============================================================================
// Grid Patterns
// =============================================================================

export const gridPatterns = {
  container: {
    name: 'Container Query Context',
    description: 'Establishes a containment context for container queries',
    class: '@container',
    usage: 'Wrap any element that should respond to its own width',
  },
  namedContainer: {
    name: 'Named Container',
    description: 'Container with a name for targeted queries',
    class: '@container/layout',
    usage: 'Use when you need to target a specific container',
  },
  responsiveGrid: {
    name: 'Responsive Grid',
    description: 'Full responsive grid that adapts across all breakpoints',
    class: 'grid grid-cols-4 gap-2 px-4 @sm:grid-cols-8 @md:grid-cols-12 @md:gap-4 @md:px-3',
    usage: 'Main content grid that adapts from 4 to 8 to 12 columns',
  },
  simpleGrid: {
    name: 'Simple 12-Column Grid',
    description: 'Fixed 12-column grid without responsive breakpoints',
    class: 'grid grid-cols-12 gap-4',
    usage: 'When container width is known to be large enough',
  },
} as const;

// =============================================================================
// Column Span Patterns
// =============================================================================

export interface ColumnSpan {
  name: string;
  fraction: string;
  sm: string;
  md: string;
  lg: string;
  description: string;
}

export const columnSpans: ColumnSpan[] = [
  {
    name: 'Full Width',
    fraction: '12/12',
    sm: 'col-span-4',
    md: 'col-span-8',
    lg: 'col-span-12',
    description: 'Spans entire width at all breakpoints',
  },
  {
    name: 'Three Quarters',
    fraction: '9/12',
    sm: 'col-span-3',
    md: 'col-span-6',
    lg: 'col-span-9',
    description: 'Main content area in sidebar layouts',
  },
  {
    name: 'Two Thirds',
    fraction: '8/12',
    sm: 'col-span-4',
    md: 'col-span-5',
    lg: 'col-span-8',
    description: 'Primary content with secondary sidebar',
  },
  {
    name: 'Half',
    fraction: '6/12',
    sm: 'col-span-4',
    md: 'col-span-4',
    lg: 'col-span-6',
    description: 'Equal two-column layout',
  },
  {
    name: 'One Third',
    fraction: '4/12',
    sm: 'col-span-4',
    md: 'col-span-3',
    lg: 'col-span-4',
    description: 'Three-column layout items',
  },
  {
    name: 'One Quarter',
    fraction: '3/12',
    sm: 'col-span-2',
    md: 'col-span-2',
    lg: 'col-span-3',
    description: 'Four-column layout items, sidebars',
  },
  {
    name: 'One Sixth',
    fraction: '2/12',
    sm: 'col-span-2',
    md: 'col-span-2',
    lg: 'col-span-2',
    description: 'Six-column layout items, narrow elements',
  },
];

// =============================================================================
// Layout Composition Patterns
// =============================================================================

export const layoutCompositions = {
  sidebarLeft: {
    name: 'Sidebar Left',
    description: 'Fixed sidebar on left, flexible main content',
    sidebar: 'col-span-4 @sm:col-span-2 @md:col-span-3',
    main: 'col-span-4 @sm:col-span-6 @md:col-span-9',
    usage: 'Navigation panels, settings pages',
  },
  sidebarRight: {
    name: 'Sidebar Right',
    description: 'Flexible main content, fixed sidebar on right',
    main: 'col-span-4 @sm:col-span-6 @md:col-span-9',
    sidebar: 'col-span-4 @sm:col-span-2 @md:col-span-3',
    usage: 'Detail panels, contextual information',
  },
  twoColumn: {
    name: 'Two Column',
    description: 'Equal width columns',
    column: 'col-span-4 @sm:col-span-4 @md:col-span-6',
    usage: 'Comparison views, side-by-side content',
  },
  threeColumn: {
    name: 'Three Column',
    description: 'Three equal columns, stacked on mobile',
    column: 'col-span-4 @sm:col-span-4 @md:col-span-4',
    usage: 'Card grids, feature lists',
  },
  fourColumn: {
    name: 'Four Column',
    description: 'Four equal columns, two on tablet, stacked on mobile',
    column: 'col-span-4 @sm:col-span-4 @md:col-span-3',
    usage: 'Metric dashboards, icon grids',
  },
  contentCentered: {
    name: 'Centered Content',
    description: 'Narrow centered content with gutters',
    container: 'col-span-4 @sm:col-span-6 @sm:col-start-2 @md:col-span-8 @md:col-start-3',
    usage: 'Article content, forms, focused reading',
  },
} as const;

// =============================================================================
// Utility Functions
// =============================================================================

/**
 * Get breakpoint by name
 */
export function getBreakpoint(name: string): LayoutBreakpoint | undefined {
  return layoutBreakpoints.find((bp) => bp.name === name);
}

/**
 * Get container query prefix for a breakpoint
 */
export function getContainerPrefix(breakpoint: string): string {
  const cq = containerQueryClasses.find((c) => c.breakpoint === breakpoint);
  return cq?.prefix ?? '';
}

/**
 * Generate responsive column span classes
 */
export function getResponsiveSpan(sm: number, md: number, lg: number): string {
  return `col-span-${sm} @sm:col-span-${md} @md:col-span-${lg}`;
}

// =============================================================================
// Code Examples for LLM Consumption
// =============================================================================

export const layoutExamples = {
  basicGrid: `
<!-- Basic responsive grid -->
<div class="@container">
  <div class="grid grid-cols-4 gap-2 @sm:grid-cols-8 @md:grid-cols-12 @md:gap-4">
    <div class="col-span-4 @md:col-span-12">Full width header</div>
    <div class="col-span-4 @sm:col-span-6 @md:col-span-9">Main content</div>
    <div class="col-span-4 @sm:col-span-2 @md:col-span-3">Sidebar</div>
  </div>
</div>`,

  sidebarLayout: `
<!-- Sidebar layout with container queries -->
<div class="@container">
  <div class="grid grid-cols-4 gap-2 @sm:grid-cols-8 @md:grid-cols-12 @md:gap-4">
    <!-- Sidebar: 4 cols on mobile, 2 on sm, 3 on md+ -->
    <aside class="col-span-4 @sm:col-span-2 @md:col-span-3 bg-muted p-4 rounded-lg">
      <nav>Navigation</nav>
    </aside>

    <!-- Main: 4 cols on mobile, 6 on sm, 9 on md+ -->
    <main class="col-span-4 @sm:col-span-6 @md:col-span-9">
      <article>Main content</article>
    </main>
  </div>
</div>`,

  cardGrid: `
<!-- Three-column card grid -->
<div class="@container">
  <div class="grid grid-cols-4 gap-4 @sm:grid-cols-8 @md:grid-cols-12">
    <!-- Cards stack on mobile, 2 cols on sm, 3 cols on md+ -->
    <div class="col-span-4 @sm:col-span-4 @md:col-span-4 bg-card p-4 rounded-lg border">
      Card 1
    </div>
    <div class="col-span-4 @sm:col-span-4 @md:col-span-4 bg-card p-4 rounded-lg border">
      Card 2
    </div>
    <div class="col-span-4 @sm:col-span-4 @md:col-span-4 bg-card p-4 rounded-lg border">
      Card 3
    </div>
  </div>
</div>`,

  centeredContent: `
<!-- Centered narrow content -->
<div class="@container">
  <div class="grid grid-cols-4 gap-4 @sm:grid-cols-8 @md:grid-cols-12">
    <article class="col-span-4 @sm:col-span-6 @sm:col-start-2 @md:col-span-8 @md:col-start-3">
      <h1 class="text-3xl font-bold mb-4">Article Title</h1>
      <p class="text-base text-muted-foreground">
        Centered content that maintains readable line lengths.
      </p>
    </article>
  </div>
</div>`,

  nestedContainers: `
<!-- Nested container queries -->
<div class="@container/page">
  <div class="grid grid-cols-12 gap-4">
    <main class="col-span-9 @container/main">
      <!-- This grid responds to main's width, not the page -->
      <div class="grid grid-cols-1 @[400px]/main:grid-cols-2 @[600px]/main:grid-cols-3 gap-4">
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </div>
    </main>
    <aside class="col-span-3">Sidebar</aside>
  </div>
</div>`,

  dashboardLayout: `
<!-- Dashboard with metrics and content -->
<div class="@container">
  <div class="grid grid-cols-4 gap-4 @sm:grid-cols-8 @md:grid-cols-12">
    <!-- Metrics row: 2 cols on mobile, spans adjust on larger containers -->
    <div class="col-span-2 @sm:col-span-2 @md:col-span-3 bg-card p-4 rounded-lg border">
      <p class="text-sm text-muted-foreground">Users</p>
      <p class="text-2xl font-bold">12,345</p>
    </div>
    <div class="col-span-2 @sm:col-span-2 @md:col-span-3 bg-card p-4 rounded-lg border">
      <p class="text-sm text-muted-foreground">Revenue</p>
      <p class="text-2xl font-bold">$45,678</p>
    </div>
    <div class="col-span-2 @sm:col-span-2 @md:col-span-3 bg-card p-4 rounded-lg border">
      <p class="text-sm text-muted-foreground">Orders</p>
      <p class="text-2xl font-bold">890</p>
    </div>
    <div class="col-span-2 @sm:col-span-2 @md:col-span-3 bg-card p-4 rounded-lg border">
      <p class="text-sm text-muted-foreground">Growth</p>
      <p class="text-2xl font-bold text-green-600">+12%</p>
    </div>

    <!-- Main chart area -->
    <div class="col-span-4 @sm:col-span-8 @md:col-span-12 bg-card p-4 rounded-lg border min-h-64">
      Chart placeholder
    </div>
  </div>
</div>`,
};

export type GridPattern = keyof typeof gridPatterns;
export type LayoutComposition = keyof typeof layoutCompositions;
