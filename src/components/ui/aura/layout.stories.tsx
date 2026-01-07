import type { Meta, StoryObj } from '@storybook/nextjs';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import {
  layoutBreakpoints,
  containerQueryClasses,
  gridPatterns,
  columnSpans,
  layoutCompositions,
  layoutExamples,
} from './layout';

/**
 * # Aura Layout System
 *
 * The layout system provides a responsive grid built on CSS Grid and Container Queries.
 * Unlike media queries which respond to viewport width, container queries respond to
 * the container's width—perfect for components that may appear in various contexts.
 *
 * ## Key Concepts
 *
 * 1. **Container Query Context**: Wrap content with `@container` to enable responsive behaviour
 * 2. **Responsive Grid**: Use `grid grid-cols-4 @[641px]:grid-cols-8 @[769px]:grid-cols-12`
 * 3. **Column Spanning**: Use responsive spans like `col-span-4 @[769px]:col-span-6`
 *
 * ## Breakpoints
 *
 * | Name | Min | Max | Columns | Gutter | Margin |
 * |------|-----|-----|---------|--------|--------|
 * | sm   | 320px | 640px | 4 | 8px | 16px |
 * | md   | 641px | 768px | 8 | 8px | 16px |
 * | lg   | 769px | 1024px | 12 | 16px | 12px |
 * | xl   | 1025px | 1280px | 12 | 16px | 12px |
 *
 * ## Usage
 *
 * ```tsx
 * <div className="@container">
 *   <div className="grid grid-cols-4 gap-2 @[641px]:grid-cols-8 @[769px]:grid-cols-12 @[769px]:gap-4">
 *     <div className="col-span-4 @[769px]:col-span-8">Main</div>
 *     <div className="col-span-4 @[769px]:col-span-4">Sidebar</div>
 *   </div>
 * </div>
 * ```
 */
const meta: Meta = {
  title: 'Primitives/Layout',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

// =============================================================================
// Breakpoint Stories
// =============================================================================

/**
 * The four responsive breakpoints with their grid configurations.
 * Container queries use these breakpoints to adapt layouts.
 */
export const Breakpoints: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Layout breakpoints define how the grid adapts at different container widths. Each breakpoint specifies columns, gutters, and margins.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(layoutBreakpoints.length).toBe(4);

    await expect(canvas.getByTestId('breakpoint-sm')).toBeInTheDocument();
    await expect(canvas.getByTestId('breakpoint-md')).toBeInTheDocument();
    await expect(canvas.getByTestId('breakpoint-lg')).toBeInTheDocument();
    await expect(canvas.getByTestId('breakpoint-xl')).toBeInTheDocument();
  },
  render: () => (
    <div className="space-y-6" data-testid="breakpoints">
      {layoutBreakpoints.map((bp) => (
        <div
          key={bp.name}
          data-testid={`breakpoint-${bp.name}`}
          className="border border-border rounded-lg overflow-hidden"
        >
          <div className="bg-indigo-100 dark:bg-indigo-900/30 px-4 py-3">
            <h3 className="text-lg font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-300">
              {bp.name} Breakpoint
            </h3>
          </div>
          <div className="p-4 space-y-2">
            <p className="text-sm text-muted-foreground">{bp.description}</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Width range:</span>{' '}
                <strong>
                  {bp.min}px – {bp.max}px
                </strong>
              </div>
              <div>
                <span className="text-muted-foreground">Columns:</span>{' '}
                <strong>{bp.columns}</strong>
              </div>
              <div>
                <span className="text-muted-foreground">Gutter:</span>{' '}
                <strong>{bp.gutter}px</strong>
              </div>
              <div>
                <span className="text-muted-foreground">Margin:</span>{' '}
                <strong>{bp.margin}px</strong>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};

// =============================================================================
// Container Query Stories
// =============================================================================

/**
 * Container query class prefixes for each breakpoint.
 */
export const ContainerQueries: Story = {
  name: 'Container Query Classes',
  parameters: {
    docs: {
      description: {
        story:
          'Container queries allow styles to respond to the container width rather than viewport. Use these prefixes with any Tailwind class.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(containerQueryClasses.length).toBe(4);
    await expect(canvas.getByTestId('container-queries')).toBeInTheDocument();
  },
  render: () => (
    <div className="space-y-6" data-testid="container-queries">
      <div className="bg-muted/50 p-4 rounded-lg">
        <p className="text-sm">
          <strong>Important:</strong> Container queries require a containment context.
          Add <code className="bg-muted px-1 rounded">@container</code> to the parent element.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 pr-4 font-medium">Breakpoint</th>
              <th className="text-left py-2 pr-4 font-medium">Min Width</th>
              <th className="text-left py-2 pr-4 font-medium">Prefix</th>
              <th className="text-left py-2 font-medium">Example</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {containerQueryClasses.map((cq) => (
              <tr key={cq.breakpoint}>
                <td className="py-2 pr-4 font-medium">{cq.breakpoint}</td>
                <td className="py-2 pr-4">{cq.minWidth}px</td>
                <td className="py-2 pr-4">
                  <code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">
                    {cq.prefix}
                  </code>
                </td>
                <td className="py-2">
                  <code className="text-xs font-mono text-muted-foreground">
                    {cq.prefix}grid-cols-8
                  </code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ),
};

// =============================================================================
// Interactive Grid Demo
// =============================================================================

/**
 * Interactive demo showing how the grid adapts to container width.
 * Resize the container to see breakpoints in action.
 */
export const InteractiveDemo: Story = {
  name: 'Interactive: Resize Demo',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Drag the resize handle to see how the grid responds to different container widths. The grid columns change based on container queries, not viewport.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByTestId('resize-container')).toBeInTheDocument();
    await expect(canvas.getByTestId('grid-demo')).toBeInTheDocument();
  },
  render: () => (
    <div className="p-8 bg-muted/30 min-h-screen">
      <div className="mb-4">
        <h3 className="text-lg font-medium">Resize the container below</h3>
        <p className="text-sm text-muted-foreground">
          Drag the right edge to see container queries in action
        </p>
      </div>
      <div
        data-testid="resize-container"
        className="resize-x overflow-auto border-2 border-dashed border-border rounded-lg bg-background min-w-[320px] max-w-full"
        style={{ width: '800px' }}
      >
        <div className="@container p-4" data-testid="grid-demo">
          {/* Current breakpoint indicator */}
          <div className="mb-4 p-2 bg-muted rounded text-sm font-mono">
            <span className="@[1025px]:hidden @[769px]:hidden @[641px]:hidden">
              sm (≤640px) — 4 columns
            </span>
            <span className="hidden @[641px]:inline @[769px]:hidden">
              md (641-768px) — 8 columns
            </span>
            <span className="hidden @[769px]:inline @[1025px]:hidden">
              lg (769-1024px) — 12 columns
            </span>
            <span className="hidden @[1025px]:inline">
              xl (≥1025px) — 12 columns
            </span>
          </div>

          {/* Responsive grid */}
          <div className="grid grid-cols-4 gap-2 @[641px]:grid-cols-8 @[769px]:grid-cols-12 @[769px]:gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="bg-indigo-100 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 rounded p-2 text-center text-sm font-medium text-indigo-700 dark:text-indigo-300"
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
};

// =============================================================================
// Column Span Stories
// =============================================================================

/**
 * Common column span patterns for responsive layouts.
 */
export const ColumnSpans: Story = {
  name: 'Pattern: Column Spans',
  parameters: {
    docs: {
      description: {
        story:
          'Pre-defined column span patterns that maintain proportions across breakpoints. Use these for consistent responsive behaviour.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(columnSpans.length).toBe(7);
    await expect(canvas.getByTestId('column-spans')).toBeInTheDocument();
  },
  render: () => (
    <div className="space-y-6" data-testid="column-spans">
      {columnSpans.map((span) => (
        <div
          key={span.name}
          data-testid={`span-${span.name.toLowerCase().replace(/\s/g, '-')}`}
          className="border border-border rounded-lg p-4"
        >
          <div className="flex items-baseline justify-between mb-3">
            <h4 className="font-medium">{span.name}</h4>
            <span className="text-sm text-muted-foreground">{span.fraction}</span>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{span.description}</p>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            <code className="bg-muted px-2 py-1 rounded">sm: {span.sm}</code>
            <code className="bg-muted px-2 py-1 rounded">md: @[641px]:{span.md}</code>
            <code className="bg-muted px-2 py-1 rounded">lg: @[769px]:{span.lg}</code>
          </div>
        </div>
      ))}
    </div>
  ),
};

// =============================================================================
// Layout Composition Stories
// =============================================================================

/**
 * Common layout compositions using the grid system.
 */
export const Compositions: Story = {
  name: 'Pattern: Layout Compositions',
  parameters: {
    docs: {
      description: {
        story:
          'Pre-built layout patterns for common UI structures. Each composition adapts responsively using container queries.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const compositionCount = Object.keys(layoutCompositions).length;
    await expect(compositionCount).toBe(6);
    await expect(canvas.getByTestId('layout-compositions')).toBeInTheDocument();
  },
  render: () => (
    <div className="space-y-8" data-testid="layout-compositions">
      {Object.entries(layoutCompositions).map(([key, comp]) => (
        <div
          key={key}
          data-testid={`composition-${key}`}
          className="border border-border rounded-lg overflow-hidden"
        >
          <div className="bg-muted px-4 py-3 border-b border-border">
            <h4 className="font-medium">{comp.name}</h4>
            <p className="text-sm text-muted-foreground">{comp.description}</p>
          </div>
          <div className="p-4">
            <p className="text-xs text-muted-foreground mb-2">
              <strong>Usage:</strong> {comp.usage}
            </p>
            <div className="space-y-1 text-xs font-mono">
              {Object.entries(comp)
                .filter(([k]) => !['name', 'description', 'usage'].includes(k))
                .map(([role, classes]) => (
                  <div key={role} className="flex gap-2">
                    <span className="text-muted-foreground w-20">{role}:</span>
                    <code className="bg-muted px-1.5 py-0.5 rounded text-2xs">
                      {classes as string}
                    </code>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};

// =============================================================================
// Visual Layout Examples
// =============================================================================

/**
 * Visual demonstration of the sidebar left layout.
 */
export const SidebarLeftLayout: Story = {
  name: 'Example: Sidebar Left',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'A common layout with navigation sidebar on the left and main content on the right.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByTestId('sidebar')).toBeInTheDocument();
    await expect(canvas.getByTestId('main-content')).toBeInTheDocument();
  },
  render: () => (
    <div className="@container min-h-screen bg-background">
      <div className="grid grid-cols-4 gap-2 px-4 py-4 @[641px]:grid-cols-8 @[769px]:grid-cols-12 @[769px]:gap-4 @[769px]:px-3">
        {/* Sidebar */}
        <aside
          data-testid="sidebar"
          className="col-span-4 @[641px]:col-span-2 @[769px]:col-span-3 bg-muted rounded-lg p-4"
        >
          <h2 className="font-medium mb-4">Navigation</h2>
          <nav className="space-y-2">
            {['Dashboard', 'Projects', 'Settings', 'Help'].map((item) => (
              <a
                key={item}
                href="#"
                className="block px-3 py-2 rounded-md text-sm hover:bg-accent"
              >
                {item}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main
          data-testid="main-content"
          className="col-span-4 @[641px]:col-span-6 @[769px]:col-span-9"
        >
          <div className="border border-border rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4">Main Content</h1>
            <p className="text-muted-foreground">
              This area expands to fill the remaining space. On mobile, the sidebar
              stacks above the main content.
            </p>
          </div>
        </main>
      </div>
    </div>
  ),
};

/**
 * Visual demonstration of a card grid layout.
 */
export const CardGridLayout: Story = {
  name: 'Example: Card Grid',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'A responsive card grid that adapts from 1 column on mobile to 3 columns on desktop.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByTestId('card-grid')).toBeInTheDocument();
    const cards = canvas.getAllByTestId(/^card-\d+$/);
    await expect(cards.length).toBe(6);
  },
  render: () => (
    <div className="@container min-h-screen bg-background p-4">
      <div
        data-testid="card-grid"
        className="grid grid-cols-4 gap-4 @[641px]:grid-cols-8 @[769px]:grid-cols-12"
      >
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            data-testid={`card-${i}`}
            className="col-span-4 @[641px]:col-span-4 @[769px]:col-span-4 bg-card border border-border rounded-lg p-4"
          >
            <div className="aspect-video bg-muted rounded-md mb-3" />
            <h3 className="font-medium mb-1">Card {i}</h3>
            <p className="text-sm text-muted-foreground">
              Cards stack on mobile, show 2 per row on tablet, and 3 per row on desktop.
            </p>
          </div>
        ))}
      </div>
    </div>
  ),
};

/**
 * Visual demonstration of a dashboard metrics layout.
 */
export const DashboardLayout: Story = {
  name: 'Example: Dashboard',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'A dashboard layout with metric cards and a main chart area, all responsive to container width.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByTestId('dashboard')).toBeInTheDocument();
    await expect(canvas.getByTestId('chart-area')).toBeInTheDocument();
  },
  render: () => (
    <div className="@container min-h-screen bg-background p-4" data-testid="dashboard">
      <div className="grid grid-cols-4 gap-4 @[641px]:grid-cols-8 @[769px]:grid-cols-12">
        {/* Metrics row */}
        {[
          { label: 'Users', value: '12,345', change: '+12%' },
          { label: 'Revenue', value: '$45,678', change: '+8%' },
          { label: 'Orders', value: '890', change: '+23%' },
          { label: 'Growth', value: '15.2%', change: '+5%' },
        ].map((metric, i) => (
          <div
            key={i}
            className="col-span-2 @[641px]:col-span-2 @[769px]:col-span-3 bg-card border border-border rounded-lg p-4"
          >
            <p className="text-sm text-muted-foreground">{metric.label}</p>
            <p className="text-2xl font-bold">{metric.value}</p>
            <p className="text-sm text-green-600">{metric.change}</p>
          </div>
        ))}

        {/* Chart area */}
        <div
          data-testid="chart-area"
          className="col-span-4 @[641px]:col-span-8 @[769px]:col-span-12 bg-card border border-border rounded-lg p-4 min-h-64"
        >
          <h3 className="font-medium mb-4">Analytics Overview</h3>
          <div className="h-48 bg-muted rounded-md flex items-center justify-center text-muted-foreground">
            Chart placeholder
          </div>
        </div>
      </div>
    </div>
  ),
};

// =============================================================================
// Reference Stories
// =============================================================================

/**
 * Complete reference of all grid patterns.
 */
export const GridPatternsReference: Story = {
  name: 'Reference: Grid Patterns',
  parameters: {
    docs: {
      description: {
        story: 'All available grid pattern classes for quick reference.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const patternCount = Object.keys(gridPatterns).length;
    await expect(patternCount).toBe(4);
    await expect(canvas.getByTestId('grid-patterns-ref')).toBeInTheDocument();
  },
  render: () => (
    <div className="space-y-4" data-testid="grid-patterns-ref">
      {Object.entries(gridPatterns).map(([key, pattern]) => (
        <div
          key={key}
          data-testid={`pattern-${key}`}
          className="border border-border rounded-lg p-4"
        >
          <h4 className="font-medium">{pattern.name}</h4>
          <p className="text-sm text-muted-foreground mb-2">{pattern.description}</p>
          <code className="text-xs font-mono bg-muted px-2 py-1 rounded block overflow-x-auto">
            {pattern.class}
          </code>
          <p className="text-xs text-muted-foreground mt-2">
            <strong>Usage:</strong> {pattern.usage}
          </p>
        </div>
      ))}
    </div>
  ),
};

/**
 * Code examples for common layout patterns.
 */
export const CodeExamples: Story = {
  name: 'Reference: Code Examples',
  parameters: {
    docs: {
      description: {
        story: 'Copy-paste ready code examples for common layout patterns.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByTestId('code-example-basicGrid')).toBeInTheDocument();
    await expect(canvas.getByTestId('code-example-sidebarLayout')).toBeInTheDocument();
    await expect(canvas.getByTestId('code-example-cardGrid')).toBeInTheDocument();
  },
  render: () => (
    <div className="space-y-8" data-testid="code-examples">
      {Object.entries(layoutExamples).map(([name, code]) => (
        <div key={name} className="space-y-2" data-testid={`code-example-${name}`}>
          <h3 className="text-lg font-medium capitalize">
            {name.replace(/([A-Z])/g, ' $1').trim()}
          </h3>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code className="text-sm font-mono">{code.trim()}</code>
          </pre>
        </div>
      ))}
    </div>
  ),
};

