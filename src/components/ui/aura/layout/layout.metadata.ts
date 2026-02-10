import type { ComponentMeta } from "@/lib/component-examples";

/**
 * Layout System Metadata
 *
 * This metadata is used by the documentation system to generate
 * component documentation pages and provide context for LLMs.
 */
export const LayoutMetadata: ComponentMeta = {
  name: "Layout",
  status: "draft",
  description:
    "Layout and grid definitions for the Aura design system including breakpoints, grid configurations, and container query patterns.",
  llmUsage:
    "Import `recommendedLayouts` for designer-approved layout patterns (Dashboard Unified Grid, Dashboard Main+Sidebar, AI Chat/Focused Reading, Sidebar Left/Right, Two Column Equal). Each pattern includes useCase, structure description, example code, and responsive characteristics. Use `layoutPrinciples` for key implementation guidelines. Use `getBreakpoint()` for breakpoint info, `gridPatterns` for common grid layouts, and `getResponsiveSpan()` for column spans.",
  layoutPatterns: {
    description:
      "Recommended layout patterns for common use cases. These are guidance, not requirements - adapt to your specific needs.",
    patterns: [
      {
        name: "Dashboard - Unified Grid",
        useCase: "Metric dashboards with cards that can hide at smaller sizes",
        structure: "Single 12-column grid containing all cards",
        classPattern:
          "grid grid-cols-12 gap-3 mx-auto px-2 py-6 max-w-2xl @2xl:max-w-2xl @3xl:max-w-3xl @5xl:max-w-5xl @7xl:max-w-7xl @8xl:max-w-8xl",
        characteristics: [
          "Status cards: col-span-12 @3xl:col-span-4 (3 equal cards)",
          "KPI cards: col-span-6 @3xl:col-span-3 (4 cards, some hide at smaller sizes)",
          "Large chart: col-span-12 @5xl:col-span-8",
          "Sidebar widget: col-span-12 @5xl:col-span-4 hidden @5xl:block",
        ],
        notes:
          "Simpler structure but may leave gaps when items hide. Use hidden/@breakpoint:block to progressively show cards.",
      },
      {
        name: "Dashboard - Main + Sidebar",
        useCase: "Dashboards with persistent sidebar and main content area",
        structure: "12-column grid with nested grids in main area (8 cols) and sidebar (4 cols)",
        classPattern:
          "grid grid-cols-12 gap-3 mx-auto px-2 py-6 max-w-2xl @2xl:max-w-2xl @3xl:max-w-3xl @5xl:max-w-5xl @7xl:max-w-7xl @8xl:max-w-8xl",
        characteristics: [
          "Main area: col-span-12 @5xl:col-span-8 grid grid-cols-12 gap-3",
          "Sidebar: col-span-12 @5xl:col-span-4 space-y-3",
          "Cards inside main use nested 12-col grid (col-span-12 @3xl:col-span-4 for status cards)",
          "Sidebar stacks vertically, collapses below main on smaller screens",
        ],
        notes:
          "More predictable responsive behavior with no gaps. Better for layouts with distinct content areas.",
      },
      {
        name: "AI Chat / Focused Reading",
        useCase: "Conversational interfaces, article content, forms requiring focused reading",
        structure: "12-column grid with content spanning 8 centered columns at larger sizes",
        classPattern:
          "grid grid-cols-12 gap-3 mx-auto px-2 py-6 max-w-2xl @2xl:max-w-2xl @3xl:max-w-3xl @5xl:max-w-5xl @7xl:max-w-7xl @8xl:max-w-8xl",
        characteristics: [
          "Content: col-span-12 @5xl:col-start-3 @5xl:col-span-8",
          "Full width (12 cols) below 1024px",
          "Centered 8 columns at 1024px+ for optimal reading width",
          "Use col-start-3 to center the 8-column span",
        ],
        notes:
          "Maintains readable line lengths and focused attention. Prevents content from becoming too wide on large screens.",
      },
      {
        name: "Two Column Equal",
        useCase: "Comparison views, side-by-side content",
        structure: "12-column grid with two equal-width areas",
        classPattern: "grid grid-cols-12 gap-3",
        characteristics: [
          "Each column: col-span-4 @sm:col-span-4 @md:col-span-6",
          "Stacks vertically on mobile (col-span-4 = full width on 4-col mobile grid)",
          "Side-by-side on tablet and above",
        ],
        notes:
          "Simple equal split for comparison layouts. Adjust spans if you need different proportions.",
      },
      {
        name: "Sidebar Left / Right",
        useCase: "Navigation panels, settings pages, detail panels",
        structure: "12-column grid with asymmetric split",
        classPattern: "grid grid-cols-12 gap-3",
        characteristics: [
          "Sidebar: col-span-4 @sm:col-span-2 @md:col-span-3",
          "Main: col-span-4 @sm:col-span-6 @md:col-span-9",
          "Stacks on mobile, side-by-side on tablet+",
          "Swap order for right sidebar",
        ],
        notes:
          "Use for navigation or contextual information. Consider nested grids inside main area for complex layouts.",
      },
    ],
    keyPrinciples: [
      "Always use @container wrapper to enable container queries",
      "Use 12-column grid at all breakpoints (grid-cols-12) for flexibility",
      "Apply stepped max-widths: max-w-2xl @2xl:max-w-2xl @3xl:max-w-3xl @5xl:max-w-5xl @7xl:max-w-7xl @8xl:max-w-8xl",
      "Center content with mx-auto and appropriate padding (px-2, py-6)",
      "Use col-span-X with @breakpoint:col-span-Y for responsive behavior",
      "Hide cards at smaller sizes with hidden @breakpoint:block when needed",
      "Nest grids inside grid items for complex layouts (main+sidebar pattern)",
    ],
    breakpoints: [
      { name: "base", min: "0px", max: "639px", columns: 12, prefix: "(none)" },
      { name: "2xl", min: "640px", max: "767px", columns: 12, prefix: "@2xl:" },
      { name: "3xl", min: "768px", max: "1023px", columns: 12, prefix: "@3xl:" },
      { name: "5xl", min: "1024px", max: "1279px", columns: 12, prefix: "@5xl:" },
      { name: "7xl", min: "1280px", max: "1535px", columns: 12, prefix: "@7xl:" },
      { name: "8xl", min: "1536px", columns: 12, prefix: "@8xl:" },
    ],
  },
};
