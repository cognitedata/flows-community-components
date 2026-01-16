import type { Meta, StoryObj } from '@storybook/nextjs';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import {
  colorPalettes,
  semanticTokens,
  colorPatterns,
  colorExamples,
  getColorsByCategory,
  type ColorPalette,
} from './colors';

/**
 * # Aura Color System
 *
 * The color system is organised into four categories:
 * - **Base**: Mountain (neutral), Fjord (cool neutral)
 * - **Decorative**: Nordic (cool green), Aurora (lime), Dusk (magenta)
 * - **Semantic**: Red (error), Amber (warning), Green (success), Blue (info)
 * - **Extended**: Sky, Orange, Yellow, Gray, Pink
 *
 * ## Usage
 *
 * Use semantic tokens for theme-aware colours:
 *
 * ```tsx
 * // Backgrounds
 * <div className="bg-background">Page background</div>
 * <div className="bg-card">Card surface</div>
 * <div className="bg-muted">Subtle background</div>
 *
 * // Text
 * <p className="text-foreground">Primary text</p>
 * <p className="text-muted-foreground">Secondary text</p>
 *
 * // Actions
 * <button className="bg-primary text-primary-foreground">Action</button>
 * <button className="bg-destructive text-destructive-foreground">Delete</button>
 * ```
 *
 * Use raw palette colours for data visualisation and decorative elements:
 *
 * ```tsx
 * <div className="bg-nordic-500">Chart segment 1</div>
 * <div className="bg-aurora-500">Chart segment 2</div>
 * ```
 */
const meta: Meta = {
  title: 'Layouts/Colors',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

// =============================================================================
// Helper Components
// =============================================================================

function ColorSwatch({
  cssVar,
  name,
  showLabel = true,
}: {
  cssVar: string;
  name: string;
  showLabel?: boolean;
}) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="w-full aspect-square rounded-md border border-border/50"
        style={{ backgroundColor: `var(${cssVar})` }}
      />
      {showLabel && (
        <span className="text-2xs font-medium text-muted-foreground mt-1">
          {name}
        </span>
      )}
    </div>
  );
}

function PaletteDisplay({ palette }: { palette: ColorPalette }) {
  return (
    <div
      className="space-y-3"
      data-testid={`palette-${palette.name.toLowerCase()}`}
    >
      <div>
        <h3 className="text-lg font-medium">{palette.name}</h3>
        <p className="text-sm text-muted-foreground">{palette.description}</p>
        <p className="text-xs text-muted-foreground mt-1">{palette.usage}</p>
      </div>
      <div className="grid grid-cols-7 sm:grid-cols-14 gap-1">
        {palette.colors.map((color) => (
          <ColorSwatch
            key={color.name}
            cssVar={color.cssVar}
            name={color.name}
          />
        ))}
      </div>
    </div>
  );
}

// =============================================================================
// Palette Stories
// =============================================================================

/**
 * Base colour palettes: Mountain (warm neutral) and Fjord (cool neutral).
 * Use for backgrounds, text, borders, and general UI elements.
 */
export const BasePalettes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Base colour palettes form the foundation of the UI. Mountain is the primary neutral ramp, while Fjord provides a cooler alternative.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify both base palettes are rendered
    const basePalettes = getColorsByCategory('base');
    await expect(basePalettes.length).toBe(2);

    // Check palette names
    await expect(canvas.getByText('Mountain')).toBeInTheDocument();
    await expect(canvas.getByText('Fjord')).toBeInTheDocument();

    // Verify Mountain has the extended stops (white, black)
    await expect(canvas.getByText('white')).toBeInTheDocument();
    await expect(canvas.getByText('black')).toBeInTheDocument();
  },
  render: () => (
    <div className="space-y-8" data-testid="base-palettes">
      {getColorsByCategory('base').map((palette) => (
        <PaletteDisplay key={palette.name} palette={palette} />
      ))}
    </div>
  ),
};

/**
 * Decorative colour palettes: Nordic, Aurora, and Dusk.
 * Use for branding, data visualisation, and accent elements.
 */
export const DecorativePalettes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Decorative palettes add visual interest without semantic meaning. Use for charts, illustrations, and brand expression.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const decorativePalettes = getColorsByCategory('decorative');
    await expect(decorativePalettes.length).toBe(3);

    await expect(canvas.getByText('Nordic')).toBeInTheDocument();
    await expect(canvas.getByText('Aurora')).toBeInTheDocument();
    await expect(canvas.getByText('Dusk')).toBeInTheDocument();
  },
  render: () => (
    <div className="space-y-8" data-testid="decorative-palettes">
      {getColorsByCategory('decorative').map((palette) => (
        <PaletteDisplay key={palette.name} palette={palette} />
      ))}
    </div>
  ),
};

/**
 * Semantic colour palettes: Red, Amber, Green, and Blue.
 * Use for status indicators, feedback, and meaningful colour coding.
 */
export const SemanticPalettes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Semantic palettes communicate meaning. Red for errors, Amber for warnings, Green for success, Blue for information.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const semanticPalettes = getColorsByCategory('semantic');
    await expect(semanticPalettes.length).toBe(4);

    await expect(canvas.getByText('Red')).toBeInTheDocument();
    await expect(canvas.getByText('Amber')).toBeInTheDocument();
    await expect(canvas.getByText('Green')).toBeInTheDocument();
    await expect(canvas.getByText('Blue')).toBeInTheDocument();
  },
  render: () => (
    <div className="space-y-8" data-testid="semantic-palettes">
      {getColorsByCategory('semantic').map((palette) => (
        <PaletteDisplay key={palette.name} palette={palette} />
      ))}
    </div>
  ),
};

/**
 * Extended colour palettes: Sky, Orange, Yellow, Gray, and Pink.
 * Use for additional data visualisation and decorative purposes.
 */
export const ExtendedPalettes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Extended palettes provide additional colours for charts, illustrations, and decorative elements when base palettes are insufficient.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const extendedPalettes = getColorsByCategory('extended');
    await expect(extendedPalettes.length).toBe(5);

    await expect(canvas.getByText('Sky')).toBeInTheDocument();
    await expect(canvas.getByText('Orange')).toBeInTheDocument();
    await expect(canvas.getByText('Yellow')).toBeInTheDocument();
    await expect(canvas.getByText('Gray')).toBeInTheDocument();
    await expect(canvas.getByText('Pink')).toBeInTheDocument();
  },
  render: () => (
    <div className="space-y-8" data-testid="extended-palettes">
      {getColorsByCategory('extended').map((palette) => (
        <PaletteDisplay key={palette.name} palette={palette} />
      ))}
    </div>
  ),
};

// =============================================================================
// Semantic Token Stories
// =============================================================================

/**
 * Semantic tokens provide theme-aware colours that automatically adapt to light/dark mode.
 * Always prefer semantic tokens over raw palette colours for UI elements.
 */
export const SemanticTokens: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Semantic tokens are theme-aware CSS variables that adapt to light and dark mode. Use these for all standard UI elements.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify token count
    await expect(semanticTokens.length).toBeGreaterThan(10);

    // Verify key tokens are displayed
    await expect(canvas.getByText('background')).toBeInTheDocument();
    await expect(canvas.getByText('foreground')).toBeInTheDocument();
    await expect(canvas.getByText('primary')).toBeInTheDocument();
    await expect(canvas.getByText('destructive')).toBeInTheDocument();
  },
  render: () => (
    <div className="space-y-6" data-testid="semantic-tokens">
      <div className="grid gap-4">
        {semanticTokens.map((token) => (
          <div
            key={token.name}
            className="flex items-center gap-4 p-3 rounded-lg border border-border"
            data-testid={`token-${token.name}`}
          >
            <div
              className="w-12 h-12 rounded-md border border-border/50 shrink-0"
              style={{ backgroundColor: `var(${token.cssVar})` }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-medium">{token.name}</span>
                <code className="text-xs font-mono text-muted-foreground">
                  {token.cssVar}
                </code>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                {token.usage}
              </p>
              <div className="flex gap-4 mt-1 text-2xs text-muted-foreground">
                <span>Light: {token.lightValue}</span>
                <span>Dark: {token.darkValue}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

// =============================================================================
// Pattern Stories
// =============================================================================

/**
 * Status indicator patterns showing success, warning, error, and info states.
 */
export const StatusIndicators: Story = {
  name: 'Pattern: Status Indicators',
  parameters: {
    docs: {
      description: {
        story:
          'Colour patterns for communicating status. Use consistent colour coding across your application.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByTestId('status-success')).toBeInTheDocument();
    await expect(canvas.getByTestId('status-warning')).toBeInTheDocument();
    await expect(canvas.getByTestId('status-error')).toBeInTheDocument();
    await expect(canvas.getByTestId('status-info')).toBeInTheDocument();
  },
  render: () => (
    <div className="space-y-4" data-testid="status-indicators">
      {colorPatterns.statusIndicators.patterns.map((pattern) => (
        <div
          key={pattern.status}
          data-testid={`status-${pattern.status}`}
          className={`${pattern.background} ${pattern.foreground} border ${pattern.border} p-4 rounded-md`}
        >
          <p className="font-medium capitalize">{pattern.status}</p>
          <p className="text-sm opacity-80">{pattern.usage}</p>
        </div>
      ))}
    </div>
  ),
};

/**
 * Text hierarchy patterns showing primary, secondary, disabled, and link text.
 */
export const TextHierarchy: Story = {
  name: 'Pattern: Text Hierarchy',
  parameters: {
    docs: {
      description: {
        story:
          'Colour patterns for establishing text importance and visual hierarchy.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText('Primary Text')).toBeInTheDocument();
    await expect(canvas.getByText('Secondary Text')).toBeInTheDocument();
    await expect(canvas.getByText('Disabled Text')).toBeInTheDocument();
    await expect(canvas.getByText('Link Text')).toBeInTheDocument();
  },
  render: () => (
    <div className="space-y-4" data-testid="text-hierarchy">
      <p className="text-foreground text-lg">
        Primary Text
        <span className="text-sm text-muted-foreground ml-2">
          — text-foreground
        </span>
      </p>
      <p className="text-muted-foreground text-lg">
        Secondary Text
        <span className="text-sm ml-2">— text-muted-foreground</span>
      </p>
      <p className="text-muted-foreground/50 text-lg">
        Disabled Text
        <span className="text-sm ml-2">— text-muted-foreground/50</span>
      </p>
      <p className="text-foreground-link hover:underline text-lg cursor-pointer">
        Link Text
        <span className="text-sm text-muted-foreground ml-2">
          — text-foreground-link
        </span>
      </p>
    </div>
  ),
};

/**
 * Background layer patterns showing page, surface, subtle, and hover backgrounds.
 */
export const BackgroundLayers: Story = {
  name: 'Pattern: Background Layers',
  parameters: {
    docs: {
      description: {
        story:
          'Colour patterns for creating depth and visual layering in interfaces.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText('Page Background')).toBeInTheDocument();
    await expect(canvas.getByText('Card Surface')).toBeInTheDocument();
    await expect(canvas.getByText('Subtle/Muted')).toBeInTheDocument();
    await expect(canvas.getByText('Hover/Accent')).toBeInTheDocument();
  },
  render: () => (
    <div className="space-y-4" data-testid="background-layers">
      <div className="bg-background border border-border p-4 rounded-md">
        <p className="font-medium">Page Background</p>
        <code className="text-xs text-muted-foreground">bg-background</code>
      </div>
      <div className="bg-card border border-border p-4 rounded-md">
        <p className="font-medium">Card Surface</p>
        <code className="text-xs text-muted-foreground">bg-card</code>
      </div>
      <div className="bg-muted border border-border p-4 rounded-md">
        <p className="font-medium">Subtle/Muted</p>
        <code className="text-xs text-muted-foreground">bg-muted</code>
      </div>
      <div className="bg-accent border border-border p-4 rounded-md">
        <p className="font-medium">Hover/Accent</p>
        <code className="text-xs text-muted-foreground">bg-accent</code>
      </div>
    </div>
  ),
};

/**
 * Data visualisation colour sequences for charts and graphs.
 */
export const DataVisualisationColors: Story = {
  name: 'Pattern: Data Visualisation',
  parameters: {
    docs: {
      description: {
        story:
          'Colour sequences optimised for charts, graphs, and data visualisation. Includes categorical, sequential, and diverging palettes.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByTestId('dataviz-categorical')).toBeInTheDocument();
    await expect(canvas.getByTestId('dataviz-sequential')).toBeInTheDocument();
    await expect(canvas.getByTestId('dataviz-diverging')).toBeInTheDocument();
  },
  render: () => (
    <div className="space-y-6" data-testid="data-visualisation">
      {colorPatterns.dataVisualisation.patterns.map((pattern) => (
        <div key={pattern.name} className="space-y-2" data-testid={`dataviz-${pattern.name}`}>
          <div>
            <h4 className="text-sm font-medium capitalize">{pattern.name}</h4>
            <p className="text-xs text-muted-foreground">{pattern.usage}</p>
          </div>
          <div className="flex gap-2">
            {pattern.colors.map((color, i) => (
              <div
                key={i}
                className={`${color} w-12 h-12 rounded-md`}
                title={color}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

// =============================================================================
// Reference Stories
// =============================================================================

/**
 * Complete reference of all colour palettes with their CSS variables.
 */
export const AllPalettesReference: Story = {
  name: 'Reference: All Palettes',
  parameters: {
    docs: {
      description: {
        story:
          'A complete reference of all 14 colour palettes organised by category with their CSS variable names.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify all categories are present using testids
    await expect(canvas.getByTestId('category-base')).toBeInTheDocument();
    await expect(canvas.getByTestId('category-decorative')).toBeInTheDocument();
    await expect(canvas.getByTestId('category-semantic')).toBeInTheDocument();
    await expect(canvas.getByTestId('category-extended')).toBeInTheDocument();

    // Verify total palette count
    await expect(colorPalettes.length).toBe(14);
  },
  render: () => (
    <div className="space-y-12" data-testid="all-palettes-reference">
      {(['base', 'decorative', 'semantic', 'extended'] as const).map(
        (category) => (
          <section key={category} data-testid={`category-${category}`}>
            <h2 className="text-2xl font-medium capitalize mb-6">{category}</h2>
            <div className="space-y-8">
              {getColorsByCategory(category).map((palette) => (
                <PaletteDisplay key={palette.name} palette={palette} />
              ))}
            </div>
          </section>
        )
      )}
    </div>
  ),
};

/**
 * Reference table showing all semantic tokens with their light and dark values.
 */
export const TokensReference: Story = {
  name: 'Reference: All Tokens',
  parameters: {
    docs: {
      description: {
        story:
          'A complete reference of all semantic tokens with their light/dark mode values and usage guidelines.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const table = canvas.getByRole('table');
    await expect(table).toBeInTheDocument();

    // Verify all tokens are rendered
    const rows = canvas.getAllByRole('row');
    await expect(rows.length).toBe(semanticTokens.length + 1);
  },
  render: () => (
    <div className="overflow-x-auto" data-testid="tokens-reference">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-2 pr-4 font-medium">Token</th>
            <th className="text-left py-2 pr-4 font-medium">CSS Variable</th>
            <th className="text-left py-2 pr-4 font-medium">Light Value</th>
            <th className="text-left py-2 pr-4 font-medium">Dark Value</th>
            <th className="text-left py-2 font-medium">Usage</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {semanticTokens.map((token) => (
            <tr key={token.name}>
              <td className="py-2 pr-4 font-medium">{token.name}</td>
              <td className="py-2 pr-4">
                <code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">
                  {token.cssVar}
                </code>
              </td>
              <td className="py-2 pr-4 text-muted-foreground text-xs font-mono">
                {token.lightValue}
              </td>
              <td className="py-2 pr-4 text-muted-foreground text-xs font-mono">
                {token.darkValue}
              </td>
              <td className="py-2 text-muted-foreground">{token.usage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
};

/**
 * Code examples for common colour usage patterns.
 */
export const CodeExamples: Story = {
  name: 'Reference: Code Examples',
  parameters: {
    docs: {
      description: {
        story:
          'Copy-paste ready code examples for common colour usage patterns including buttons, alerts, cards, forms, and badges.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByTestId('example-buttons')).toBeInTheDocument();
    await expect(canvas.getByTestId('example-alerts')).toBeInTheDocument();
    await expect(canvas.getByTestId('example-cards')).toBeInTheDocument();
    await expect(canvas.getByTestId('example-forms')).toBeInTheDocument();
    await expect(canvas.getByTestId('example-badges')).toBeInTheDocument();
  },
  render: () => (
    <div className="space-y-8" data-testid="code-examples">
      {Object.entries(colorExamples).map(([name, code]) => (
        <div key={name} className="space-y-2" data-testid={`example-${name}`}>
          <h3 className="text-lg font-medium capitalize">{name}</h3>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
            <code className="text-sm font-mono">{code.trim()}</code>
          </pre>
        </div>
      ))}
    </div>
  ),
};

