/**
 * Aura Color System
 *
 * This file contains the canonical color definitions for the Aura design system.
 * It exports structured data for LLM consumption, utility functions, and
 * common usage patterns.
 *
 * Color Categories:
 * - Base: Mountain (neutral), Fjord (cool neutral)
 * - Decorative: Nordic (cool green), Aurora (lime), Dusk (magenta)
 * - Semantic: Red (error), Amber (warning), Green (success), Blue (info)
 * - Extended: Sky, Orange, Yellow, Gray, Pink
 */

// Individual color definition
export interface ColorStop {
  name: string;
  cssVar: string;
  tailwindClass: string;
}

// Color palette definition
export interface ColorPalette {
  name: string;
  description: string;
  category: 'base' | 'decorative' | 'semantic' | 'extended';
  usage: string;
  colors: ColorStop[];
}

// Semantic token definition
export interface SemanticToken {
  name: string;
  cssVar: string;
  lightValue: string;
  darkValue: string;
  usage: string;
}

// Generate color stops for a palette
function generateColorStops(paletteName: string, stops: string[]): ColorStop[] {
  return stops.map((stop) => ({
    name: stop,
    cssVar: `--${paletteName.toLowerCase()}-${stop}`,
    tailwindClass: `bg-${paletteName.toLowerCase()}-${stop}`,
  }));
}

// Standard stops used by most palettes
const standardStops = [
  '50',
  '100',
  '200',
  '300',
  '400',
  '450',
  '500',
  '550',
  '600',
  '650',
  '700',
  '800',
  '900',
  '950',
];

// Mountain has additional white/black and 10 stop
const mountainStops = [
  'white',
  '10',
  '50',
  '100',
  '200',
  '300',
  '400',
  '450',
  '500',
  '550',
  '600',
  '650',
  '700',
  '800',
  '900',
  '950',
  'black',
];

// Color palettes - the single source of truth for Aura colors
export const colorPalettes: ColorPalette[] = [
  // Base colors
  {
    name: 'Mountain',
    description: 'Neutral base ramp',
    category: 'base',
    usage:
      'Primary neutral palette for backgrounds, text, borders, and UI elements. Use for most interface components.',
    colors: mountainStops.map((stop) => ({
      name: stop,
      cssVar: `--mountain-${stop}`,
      tailwindClass:
        stop === 'white'
          ? 'bg-mountain-white'
          : stop === 'black'
            ? 'bg-mountain-black'
            : `bg-mountain-${stop}`,
    })),
  },
  {
    name: 'Fjord',
    description: 'Cool base ramp',
    category: 'base',
    usage:
      'Cool-toned neutral for subtle differentiation from Mountain. Use for secondary surfaces, hover states, or when a cooler tone is needed.',
    colors: generateColorStops('fjord', standardStops),
  },

  // Decorative colors
  {
    name: 'Nordic',
    description: 'Cool green decorative ramp',
    category: 'decorative',
    usage:
      'Cool green for decorative elements, data visualisation, and branding accents. Not for semantic meaning.',
    colors: generateColorStops('nordic', standardStops),
  },
  {
    name: 'Aurora',
    description: 'Lime green decorative ramp',
    category: 'decorative',
    usage:
      'Vibrant lime green for decorative highlights, charts, and visual interest. Use sparingly for impact.',
    colors: generateColorStops('aurora', standardStops),
  },
  {
    name: 'Dusk',
    description: 'Magenta decorative ramp',
    category: 'decorative',
    usage:
      'Magenta/purple tones for decorative purposes, gradients, and accent elements.',
    colors: generateColorStops('dusk', standardStops),
  },

  // Semantic colors
  {
    name: 'Red',
    description: 'Semantic red',
    category: 'semantic',
    usage:
      'Error states, destructive actions, critical alerts. Use red-500 as the primary semantic color.',
    colors: generateColorStops('red', standardStops),
  },
  {
    name: 'Amber',
    description: 'Semantic amber',
    category: 'semantic',
    usage:
      'Warning states, caution messages, attention-required indicators. Use amber-500 as the primary semantic color.',
    colors: generateColorStops('amber', standardStops),
  },
  {
    name: 'Green',
    description: 'Semantic green',
    category: 'semantic',
    usage:
      'Success states, positive feedback, completion indicators. Use green-500 as the primary semantic color.',
    colors: generateColorStops('green', standardStops),
  },
  {
    name: 'Blue',
    description: 'Semantic blue',
    category: 'semantic',
    usage:
      'Informational states, links, highlights, selected states. Use blue-500 as the primary semantic color.',
    colors: generateColorStops('blue', standardStops),
  },

  // Extended decorative colors
  {
    name: 'Sky',
    description: 'Sky blue extended',
    category: 'extended',
    usage:
      'Extended blue palette for data visualisation, charts, and decorative purposes.',
    colors: generateColorStops('sky', standardStops),
  },
  {
    name: 'Orange',
    description: 'Orange extended',
    category: 'extended',
    usage:
      'Extended orange palette for data visualisation, charts, and warm accent elements.',
    colors: generateColorStops('orange', standardStops),
  },
  {
    name: 'Yellow',
    description: 'Yellow extended',
    category: 'extended',
    usage:
      'Extended yellow palette for highlights, data visualisation, and attention-grabbing elements.',
    colors: generateColorStops('yellow', standardStops),
  },
  {
    name: 'Gray',
    description: 'Gray extended',
    category: 'extended',
    usage:
      'Extended gray palette for subtle UI elements when Mountain is too warm.',
    colors: generateColorStops('gray', standardStops),
  },
  {
    name: 'Pink',
    description: 'Pink extended',
    category: 'extended',
    usage:
      'Extended pink palette for decorative elements, data visualisation, and playful accents.',
    colors: generateColorStops('pink', standardStops),
  },
];

// Semantic tokens - theme-aware color tokens
export const semanticTokens: SemanticToken[] = [
  // Background & Foreground
  {
    name: 'background',
    cssVar: '--background',
    lightValue: 'var(--mountain-white)',
    darkValue: 'var(--mountain-950)',
    usage: 'Primary page background',
  },
  {
    name: 'foreground',
    cssVar: '--foreground',
    lightValue: 'var(--mountain-950)',
    darkValue: 'var(--mountain-50)',
    usage: 'Primary text color',
  },

  // Primary
  {
    name: 'primary',
    cssVar: '--primary',
    lightValue: 'var(--mountain-900)',
    darkValue: 'var(--mountain-50)',
    usage: 'Primary action buttons, links, focus states',
  },
  {
    name: 'primary-hover',
    cssVar: '--primary-hover',
    lightValue: 'var(--mountain-700)',
    darkValue: 'var(--mountain-200)',
    usage: 'Hover state for primary elements',
  },
  {
    name: 'primary-foreground',
    cssVar: '--primary-foreground',
    lightValue: 'var(--mountain-50)',
    darkValue: 'var(--mountain-950)',
    usage: 'Text on primary backgrounds',
  },

  // Muted
  {
    name: 'muted',
    cssVar: '--muted',
    lightValue: 'var(--mountain-50)',
    darkValue: 'var(--mountain-700)',
    usage: 'Subtle backgrounds, disabled states',
  },
  {
    name: 'muted-foreground',
    cssVar: '--muted-foreground',
    lightValue: 'var(--mountain-600)',
    darkValue: 'var(--mountain-300)',
    usage: 'Secondary text, placeholders, hints',
  },

  // Destructive
  {
    name: 'destructive',
    cssVar: '--destructive',
    lightValue: 'var(--red-50)',
    darkValue: 'var(--red-800)',
    usage: 'Destructive action backgrounds',
  },
  {
    name: 'destructive-hover',
    cssVar: '--destructive-hover',
    lightValue: 'var(--red-100)',
    darkValue: 'var(--red-700)',
    usage: 'Hover state for destructive elements',
  },
  {
    name: 'destructive-foreground',
    cssVar: '--destructive-foreground',
    lightValue: 'var(--red-500)',
    darkValue: 'var(--red-300)',
    usage: 'Text/icons on destructive backgrounds',
  },

  // Card & Popover
  {
    name: 'card',
    cssVar: '--card',
    lightValue: 'var(--mountain-white)',
    darkValue: 'var(--mountain-900)',
    usage: 'Card and elevated surface backgrounds',
  },
  {
    name: 'card-foreground',
    cssVar: '--card-foreground',
    lightValue: 'var(--mountain-950)',
    darkValue: 'var(--mountain-50)',
    usage: 'Text on card backgrounds',
  },

  // Border & Ring
  {
    name: 'border',
    cssVar: '--border',
    lightValue: 'var(--mountain-200)',
    darkValue: 'var(--mountain-700)',
    usage: 'Default border color for inputs, cards, dividers',
  },
  {
    name: 'ring',
    cssVar: '--ring',
    lightValue: 'var(--mountain-400)',
    darkValue: 'var(--mountain-500)',
    usage: 'Focus ring color',
  },

  // Accent
  {
    name: 'accent',
    cssVar: '--accent',
    lightValue: 'var(--mountain-100)',
    darkValue: 'var(--mountain-700)',
    usage: 'Subtle accent backgrounds for hover states',
  },
  {
    name: 'accent-foreground',
    cssVar: '--accent-foreground',
    lightValue: 'var(--mountain-900)',
    darkValue: 'var(--mountain-100)',
    usage: 'Text on accent backgrounds',
  },
];

// Color usage patterns
export const colorPatterns = {
  statusIndicators: {
    name: 'Status Indicators',
    description: 'Colours for communicating status and state',
    patterns: [
      {
        status: 'success',
        background: 'bg-green-50 dark:bg-green-900',
        foreground: 'text-green-700 dark:text-green-300',
        border: 'border-green-200 dark:border-green-700',
        usage: 'Success messages, completed states, positive feedback',
      },
      {
        status: 'warning',
        background: 'bg-amber-50 dark:bg-amber-900',
        foreground: 'text-amber-700 dark:text-amber-300',
        border: 'border-amber-200 dark:border-amber-700',
        usage: 'Warning messages, caution states, attention needed',
      },
      {
        status: 'error',
        background: 'bg-red-50 dark:bg-red-900',
        foreground: 'text-red-700 dark:text-red-300',
        border: 'border-red-200 dark:border-red-700',
        usage: 'Error messages, failed states, critical alerts',
      },
      {
        status: 'info',
        background: 'bg-blue-50 dark:bg-blue-900',
        foreground: 'text-blue-700 dark:text-blue-300',
        border: 'border-blue-200 dark:border-blue-700',
        usage: 'Informational messages, tips, highlights',
      },
    ],
  },

  textHierarchy: {
    name: 'Text Hierarchy',
    description: 'Colours for establishing text importance',
    patterns: [
      {
        level: 'primary',
        class: 'text-foreground',
        usage: 'Primary text, headings, important content',
      },
      {
        level: 'secondary',
        class: 'text-muted-foreground',
        usage: 'Secondary text, descriptions, metadata',
      },
      {
        level: 'disabled',
        class: 'text-muted-foreground/50',
        usage: 'Disabled text, unavailable options',
      },
      {
        level: 'link',
        class: 'text-foreground-link hover:underline',
        usage: 'Interactive links, navigation',
      },
    ],
  },

  backgroundLayers: {
    name: 'Background Layers',
    description: 'Colours for creating depth and layering',
    patterns: [
      {
        layer: 'page',
        class: 'bg-background',
        usage: 'Main page background',
      },
      {
        layer: 'surface',
        class: 'bg-card',
        usage: 'Cards, modals, elevated containers',
      },
      {
        layer: 'subtle',
        class: 'bg-muted',
        usage: 'Subtle differentiation, code blocks, table headers',
      },
      {
        layer: 'hover',
        class: 'bg-accent',
        usage: 'Interactive element hover states',
      },
    ],
  },

  borders: {
    name: 'Borders',
    description: 'Border colours for various contexts',
    patterns: [
      {
        context: 'default',
        class: 'border-border',
        usage: 'Standard borders for inputs, cards, dividers',
      },
      {
        context: 'focus',
        class: 'ring-ring',
        usage: 'Focus rings for accessibility',
      },
      {
        context: 'error',
        class: 'border-red-500',
        usage: 'Error state borders for inputs',
      },
      {
        context: 'success',
        class: 'border-green-500',
        usage: 'Success state borders',
      },
    ],
  },

  dataVisualisation: {
    name: 'Data Visualisation',
    description: 'Colour sequences for charts and graphs',
    patterns: [
      {
        name: 'categorical',
        colors: [
          'bg-nordic-500',
          'bg-aurora-500',
          'bg-dusk-500',
          'bg-sky-500',
          'bg-orange-500',
          'bg-pink-500',
        ],
        usage: 'Distinct categories in charts, legends',
      },
      {
        name: 'sequential',
        colors: [
          'bg-fjord-100',
          'bg-fjord-300',
          'bg-fjord-500',
          'bg-fjord-700',
          'bg-fjord-900',
        ],
        usage: 'Sequential data, heatmaps, gradients',
      },
      {
        name: 'diverging',
        colors: [
          'bg-red-500',
          'bg-red-300',
          'bg-mountain-100',
          'bg-green-300',
          'bg-green-500',
        ],
        usage: 'Diverging data, positive/negative values',
      },
    ],
  },
} as const;

// Utility functions
export type ColorCategory = ColorPalette['category'];

/**
 * Get all color palettes for a specific category
 */
export function getColorsByCategory(category: ColorCategory): ColorPalette[] {
  return colorPalettes.filter((p) => p.category === category);
}

/**
 * Find a specific color palette by name
 */
export function findPalette(name: string): ColorPalette | undefined {
  return colorPalettes.find((p) => p.name.toLowerCase() === name.toLowerCase());
}

/**
 * Get a specific color stop from a palette
 */
export function getColorStop(
  paletteName: string,
  stop: string
): ColorStop | undefined {
  const palette = findPalette(paletteName);
  return palette?.colors.find((c) => c.name === stop);
}

/**
 * Get the CSS variable for a color
 */
export function getCssVar(paletteName: string, stop: string): string {
  const colorStop = getColorStop(paletteName, stop);
  return colorStop ? `var(${colorStop.cssVar})` : '';
}

/**
 * Get the Tailwind class for a color
 */
export function getTailwindClass(paletteName: string, stop: string): string {
  const colorStop = getColorStop(paletteName, stop);
  return colorStop?.tailwindClass ?? '';
}

// For LLM consumption - examples with full context
export const colorExamples = {
  buttons: `
<!-- Primary button -->
<button class="bg-primary text-primary-foreground hover:bg-primary-hover">
  Save changes
</button>

<!-- Secondary button -->
<button class="bg-muted text-muted-foreground hover:bg-accent">
  Cancel
</button>

<!-- Destructive button -->
<button class="bg-destructive text-destructive-foreground hover:bg-destructive-hover">
  Delete
</button>`,

  alerts: `
<!-- Success alert -->
<div class="bg-green-50 border border-green-200 text-green-700 dark:bg-green-900 dark:border-green-700 dark:text-green-300 p-4 rounded-md">
  Operation completed successfully
</div>

<!-- Warning alert -->
<div class="bg-amber-50 border border-amber-200 text-amber-700 dark:bg-amber-900 dark:border-amber-700 dark:text-amber-300 p-4 rounded-md">
  Please review before continuing
</div>

<!-- Error alert -->
<div class="bg-red-50 border border-red-200 text-red-700 dark:bg-red-900 dark:border-red-700 dark:text-red-300 p-4 rounded-md">
  Something went wrong
</div>`,

  cards: `
<!-- Standard card -->
<div class="bg-card text-card-foreground border border-border rounded-lg p-6">
  <h3 class="text-foreground font-medium">Card Title</h3>
  <p class="text-muted-foreground">Card description</p>
</div>

<!-- Muted card -->
<div class="bg-muted text-foreground rounded-lg p-6">
  <h3 class="font-medium">Muted Card</h3>
  <p class="text-muted-foreground">Subtle background</p>
</div>`,

  forms: `
<!-- Default input -->
<input class="border border-border bg-background text-foreground rounded-md px-3 py-2" />

<!-- Error input -->
<input class="border border-red-500 bg-background text-foreground rounded-md px-3 py-2" />

<!-- Focus state (add via focus:) -->
<input class="border border-border focus:ring-2 focus:ring-ring rounded-md px-3 py-2" />`,

  badges: `
<!-- Semantic badges -->
<span class="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 px-2 py-1 rounded-full text-sm">Active</span>
<span class="bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300 px-2 py-1 rounded-full text-sm">Pending</span>
<span class="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 px-2 py-1 rounded-full text-sm">Failed</span>
<span class="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 px-2 py-1 rounded-full text-sm">Info</span>`,
};

export type ColorPattern = keyof typeof colorPatterns;
