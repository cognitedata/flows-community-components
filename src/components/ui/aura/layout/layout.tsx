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
 * - **Mobile-first**: Base styles apply to smallest screens, breakpoints add styles as width increases
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
  max: number | null;
  columns: number;
  gutter: number;
  margin: number;
  prefix: string;
  description: string;
}

/**
 * Layout breakpoints for the Aura design system.
 *
 * Uses Tailwind's standard container query breakpoints for consistency.
 * Mobile-first: base styles (no prefix) apply below 640px.
 *
 * | Breakpoint | Range         | Columns | Prefix |
 * |------------|---------------|---------|--------|
 * | base       | 0-639px       | 4       | (none) |
 * | sm         | 640-767px     | 8       | @sm:   |
 * | md         | 768-1023px    | 12      | @md:   |
 * | lg         | 1024-1280px   | 12      | @lg:   |
 * | xl         | 1281-1536px   | 12      | @xl:   |
 */
export const layoutBreakpoints: LayoutBreakpoint[] = [
  {
    name: "base",
    min: 0,
    max: 639,
    columns: 4,
    gutter: 8,
    margin: 16,
    prefix: "",
    description: "Mobile devices, narrow containers. No prefix needed.",
  },
  {
    name: "sm",
    min: 640,
    max: 767,
    columns: 8,
    gutter: 8,
    margin: 16,
    prefix: "@sm:",
    description: "Tablets, medium containers.",
  },
  {
    name: "md",
    min: 768,
    max: 1023,
    columns: 12,
    gutter: 16,
    margin: 12,
    prefix: "@md:",
    description: "Laptops, large containers.",
  },
  {
    name: "lg",
    min: 1024,
    max: 1280,
    columns: 12,
    gutter: 16,
    margin: 16,
    prefix: "@lg:",
    description: "Desktops, large containers.",
  },
  {
    name: "xl",
    min: 1281,
    max: 1536,
    columns: 12,
    gutter: 16,
    margin: 16,
    prefix: "@xl:",
    description: "Wide desktops, extra large containers.",
  },
];

// =============================================================================
// Grid Patterns
// =============================================================================

export const gridPatterns = {
  container: {
    name: "Container Query Context",
    description: "Establishes a containment context for container queries",
    class: "@container",
    usage: "Wrap any element that should respond to its own width",
  },
  namedContainer: {
    name: "Named Container",
    description: "Container with a name for targeted queries",
    class: "@container/layout",
    usage: "Use when you need to target a specific container",
  },
  responsiveGrid: {
    name: "Responsive Grid",
    description: "Full responsive grid that adapts across all breakpoints",
    class: "grid grid-cols-4 gap-2 px-4 @sm:grid-cols-8 @md:grid-cols-12 @md:gap-4 @md:px-3",
    usage: "Main content grid that adapts from 4 to 8 to 12 columns",
  },
  simpleGrid: {
    name: "Simple 12-Column Grid",
    description: "Fixed 12-column grid without responsive breakpoints",
    class: "grid grid-cols-12 gap-4",
    usage: "When container width is known to be large enough",
  },
} as const;

// =============================================================================
// Column Span Patterns
// =============================================================================

export interface ColumnSpan {
  name: string;
  fraction: string;
  base: string;
  sm: string;
  md: string;
  description: string;
}

export const columnSpans: ColumnSpan[] = [
  {
    name: "Full Width",
    fraction: "12/12",
    base: "col-span-4",
    sm: "col-span-8",
    md: "col-span-12",
    description: "Spans entire width at all breakpoints",
  },
  {
    name: "Three Quarters",
    fraction: "9/12",
    base: "col-span-3",
    sm: "col-span-6",
    md: "col-span-9",
    description: "Main content area in sidebar layouts",
  },
  {
    name: "Two Thirds",
    fraction: "8/12",
    base: "col-span-4",
    sm: "col-span-5",
    md: "col-span-8",
    description: "Primary content with secondary sidebar",
  },
  {
    name: "Half",
    fraction: "6/12",
    base: "col-span-4",
    sm: "col-span-4",
    md: "col-span-6",
    description: "Equal two-column layout",
  },
  {
    name: "One Third",
    fraction: "4/12",
    base: "col-span-4",
    sm: "col-span-3",
    md: "col-span-4",
    description: "Three-column layout items",
  },
  {
    name: "One Quarter",
    fraction: "3/12",
    base: "col-span-2",
    sm: "col-span-2",
    md: "col-span-3",
    description: "Four-column layout items, sidebars",
  },
  {
    name: "One Sixth",
    fraction: "2/12",
    base: "col-span-2",
    sm: "col-span-2",
    md: "col-span-2",
    description: "Six-column layout items, narrow elements",
  },
];

// =============================================================================
// Layout Composition Patterns
// =============================================================================

export const layoutCompositions = {
  sidebarLeft: {
    name: "Sidebar Left",
    description: "Fixed sidebar on left, flexible main content",
    sidebar: "col-span-4 @sm:col-span-2 @md:col-span-3",
    main: "col-span-4 @sm:col-span-6 @md:col-span-9",
    usage: "Navigation panels, settings pages",
  },
  sidebarRight: {
    name: "Sidebar Right",
    description: "Flexible main content, fixed sidebar on right",
    main: "col-span-4 @sm:col-span-6 @md:col-span-9",
    sidebar: "col-span-4 @sm:col-span-2 @md:col-span-3",
    usage: "Detail panels, contextual information",
  },
  twoColumn: {
    name: "Two Column",
    description: "Equal width columns",
    column: "col-span-4 @sm:col-span-4 @md:col-span-6",
    usage: "Comparison views, side-by-side content",
  },
  threeColumn: {
    name: "Three Column",
    description: "Three equal columns, stacked on mobile",
    column: "col-span-4 @sm:col-span-4 @md:col-span-4",
    usage: "Card grids, feature lists",
  },
  fourColumn: {
    name: "Four Column",
    description: "Four equal columns, two on tablet, stacked on mobile",
    column: "col-span-4 @sm:col-span-4 @md:col-span-3",
    usage: "Metric dashboards, icon grids",
  },
  contentCentered: {
    name: "Centered Content",
    description: "Narrow centered content with gutters",
    container: "col-span-4 @sm:col-span-6 @sm:col-start-2 @md:col-span-8 @md:col-start-3",
    usage: "Article content, forms, focused reading",
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
  const bp = layoutBreakpoints.find((b) => b.name === breakpoint);
  return bp?.prefix ?? "";
}

/**
 * Generate responsive column span classes
 */
export function getResponsiveSpan(base: number, sm: number, md: number): string {
  return `col-span-${base} @sm:col-span-${sm} @md:col-span-${md}`;
}

// =============================================================================
// Code Examples for LLM Consumption
// =============================================================================

// =============================================================================
// Recommended Layout Patterns
// =============================================================================

/**
 * Common layout patterns for typical application use cases.
 * These patterns are used in the Aura documentation and represent
 * designer-recommended configurations. LLMs and developers can use these
 * as starting points and adapt them as needed.
 */
export interface LayoutPattern {
  name: string;
  useCase: string;
  structure: string;
  containerClass: string;
  gridClass: string;
  characteristics: string[];
  notes: string;
  example: string;
}

export const recommendedLayouts: LayoutPattern[] = [
  {
    name: "Dashboard - Unified Grid",
    useCase: "Metric dashboards with cards that can hide at smaller sizes",
    structure: "Single 12-column grid containing all cards",
    containerClass: "@container",
    gridClass:
      "grid grid-cols-12 gap-3 mx-auto px-2 py-6 max-w-2xl @2xl:max-w-2xl @3xl:max-w-3xl @5xl:max-w-5xl @7xl:max-w-7xl @8xl:max-w-8xl",
    characteristics: [
      "Status cards: col-span-12 @3xl:col-span-4 (3 equal cards)",
      "KPI cards: col-span-6 @3xl:col-span-3 (4 cards, some hide at smaller sizes with hidden @breakpoint:block)",
      "Large chart: col-span-12 @5xl:col-span-8",
      "Sidebar widget: col-span-12 @5xl:col-span-4 hidden @5xl:block",
    ],
    notes:
      "Simpler structure but may leave gaps when items hide. Best for dashboards where not all metrics need to be visible at all sizes.",
    example: `<div className="@container">
  <div className="grid grid-cols-12 gap-3 mx-auto px-2 py-6 max-w-2xl @2xl:max-w-2xl @3xl:max-w-3xl @5xl:max-w-5xl @7xl:max-w-7xl @8xl:max-w-8xl">
    <Card className="col-span-12 @3xl:col-span-4">{/* Status card 1 */}</Card>
    <Card className="col-span-12 @3xl:col-span-4">{/* Status card 2 */}</Card>
    <Card className="col-span-12 @3xl:col-span-4">{/* Status card 3 */}</Card>
    
    <Card className="col-span-6 @3xl:col-span-3">{/* KPI 1 */}</Card>
    <Card className="col-span-6 @3xl:col-span-3 hidden @2xl:block">{/* KPI 2 */}</Card>
    <Card className="col-span-6 @3xl:col-span-3">{/* KPI 3 */}</Card>
    <Card className="col-span-6 @3xl:col-span-3 hidden @2xl:block">{/* KPI 4 */}</Card>
    
    <Card className="col-span-12 @5xl:col-span-8">{/* Main chart */}</Card>
    <Card className="col-span-12 @5xl:col-span-4 hidden @5xl:block">{/* Image widget */}</Card>
  </div>
</div>`,
  },
  {
    name: "Dashboard - Main + Sidebar",
    useCase: "Dashboards with persistent sidebar and main content area",
    structure: "12-column grid with nested grids in main area (8 cols) and sidebar (4 cols)",
    containerClass: "@container",
    gridClass:
      "grid grid-cols-12 gap-3 mx-auto px-2 py-6 max-w-2xl @2xl:max-w-2xl @3xl:max-w-3xl @5xl:max-w-5xl @7xl:max-w-7xl @8xl:max-w-8xl",
    characteristics: [
      "Main area: col-span-12 @5xl:col-span-8 grid grid-cols-12 gap-3 (nested grid)",
      "Sidebar: col-span-12 @5xl:col-span-4 space-y-3 (vertical stack)",
      "Cards inside main use nested 12-col grid (e.g., col-span-12 @3xl:col-span-4 for status cards)",
      "Sidebar stacks vertically, collapses below main on smaller screens",
    ],
    notes:
      "More predictable responsive behavior with no gaps. Better for layouts with distinct content areas that should stay together.",
    example: `<div className="@container">
  <div className="grid grid-cols-12 gap-3 mx-auto px-2 py-6 max-w-2xl @2xl:max-w-2xl @3xl:max-w-3xl @5xl:max-w-5xl @7xl:max-w-7xl @8xl:max-w-8xl">
    {/* Main area with nested grid */}
    <div className="col-span-12 @5xl:col-span-8 grid grid-cols-12 gap-3">
      <Card className="col-span-12 @3xl:col-span-4">{/* Status card 1 */}</Card>
      <Card className="col-span-12 @3xl:col-span-4">{/* Status card 2 */}</Card>
      <Card className="col-span-12 @3xl:col-span-4">{/* Status card 3 */}</Card>
      <Card className="col-span-12">{/* Large chart */}</Card>
      <Card className="col-span-12 @3xl:col-span-6">{/* Metric A */}</Card>
      <Card className="col-span-12 @3xl:col-span-6">{/* Metric B */}</Card>
    </div>
    
    {/* Sidebar - collapses below main on smaller screens */}
    <div className="col-span-12 @5xl:col-span-4 space-y-3">
      <Card>{/* Recent activity */}</Card>
      <Card>{/* Quick stats */}</Card>
      <Card>{/* Alerts */}</Card>
    </div>
  </div>
</div>`,
  },
  {
    name: "AI Chat / Focused Reading",
    useCase: "Conversational interfaces, article content, forms requiring focused reading",
    structure: "12-column grid with content spanning 8 centered columns at larger sizes",
    containerClass: "@container",
    gridClass:
      "grid grid-cols-12 gap-3 mx-auto px-2 py-6 max-w-2xl @2xl:max-w-2xl @3xl:max-w-3xl @5xl:max-w-5xl @7xl:max-w-7xl @8xl:max-w-8xl",
    characteristics: [
      "Content: col-span-12 @5xl:col-start-3 @5xl:col-span-8",
      "Full width (12 cols) below 1024px for maximum space on mobile",
      "Centered 8 columns at 1024px+ for optimal reading width",
      "Use col-start-3 to center the 8-column span in the 12-column grid",
    ],
    notes:
      "Maintains readable line lengths and focused attention. Prevents content from becoming too wide on large screens, which is important for readability.",
    example: `<div className="@container">
  <div className="grid grid-cols-12 gap-3 mx-auto px-2 py-6 max-w-2xl @2xl:max-w-2xl @3xl:max-w-3xl @5xl:max-w-5xl @7xl:max-w-7xl @8xl:max-w-8xl">
    {/* Centered 8-column content area */}
    <div className="col-span-12 @5xl:col-start-3 @5xl:col-span-8">
      <Conversation>
        {/* Your chat messages or article content */}
      </Conversation>
    </div>
  </div>
</div>`,
  },
  {
    name: "Sidebar Left / Right",
    useCase: "Navigation panels, settings pages, detail panels, contextual information",
    structure: "12-column grid with asymmetric split between sidebar and main content",
    containerClass: "@container",
    gridClass: "grid grid-cols-12 gap-3",
    characteristics: [
      "Sidebar: col-span-4 @sm:col-span-2 @md:col-span-3 (narrow, ~25%)",
      "Main: col-span-4 @sm:col-span-6 @md:col-span-9 (wide, ~75%)",
      "Stacks vertically on mobile (both take full width)",
      "Swap order in markup for right sidebar",
    ],
    notes:
      "Traditional sidebar layout. Consider nested grids inside main area for complex content. Good for navigation or contextual information that should be visible alongside main content.",
    example: `<div className="@container">
  <div className="grid grid-cols-12 gap-3">
    {/* Sidebar */}
    <aside className="col-span-4 @sm:col-span-2 @md:col-span-3">
      <nav>{/* Navigation */}</nav>
    </aside>
    
    {/* Main content */}
    <main className="col-span-4 @sm:col-span-6 @md:col-span-9">
      <article>{/* Main content */}</article>
    </main>
  </div>
</div>`,
  },
  {
    name: "Two Column Equal",
    useCase: "Comparison views, side-by-side content, before/after displays",
    structure: "12-column grid with two equal-width areas",
    containerClass: "@container",
    gridClass: "grid grid-cols-12 gap-3",
    characteristics: [
      "Each column: col-span-4 @sm:col-span-4 @md:col-span-6 (50% each at tablet+)",
      "Stacks vertically on mobile (col-span-4 = full width)",
      "Side-by-side on tablet and above",
    ],
    notes:
      "Simple equal split for comparison layouts. Adjust spans if you need different proportions (e.g., 7/5 split for primary/secondary content).",
    example: `<div className="@container">
  <div className="grid grid-cols-12 gap-3">
    <div className="col-span-4 @sm:col-span-4 @md:col-span-6">
      {/* Left content */}
    </div>
    <div className="col-span-4 @sm:col-span-4 @md:col-span-6">
      {/* Right content */}
    </div>
  </div>
</div>`,
  },
];

/**
 * Key principles for using the Aura layout system.
 * These apply to all layout patterns and should guide implementation decisions.
 */
export const layoutPrinciples = [
  "Always use @container wrapper to enable container queries",
  "Use 12-column grid at all breakpoints (grid-cols-12) for maximum flexibility",
  "Apply stepped max-widths: max-w-2xl @2xl:max-w-2xl @3xl:max-w-3xl @5xl:max-w-5xl @7xl:max-w-7xl @8xl:max-w-8xl",
  "Center content with mx-auto and appropriate padding (px-2, py-6 recommended)",
  "Use col-span-X with @breakpoint:col-span-Y for responsive behavior",
  "Hide cards at smaller sizes with hidden @breakpoint:block when needed",
  "Nest grids inside grid items for complex layouts (main+sidebar pattern)",
  "Container queries respond to parent width, not viewport, enabling component-based responsive design",
] as const;

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
export type RecommendedLayoutName = (typeof recommendedLayouts)[number]["name"];
