/**
 * Aura Effects System
 *
 * This file contains the canonical effect definitions for the Aura design system.
 * It exports structured data for LLM consumption, including shadows, focus rings,
 * border radii, and animation patterns.
 *
 * Effect Categories:
 * - Shadows: Elevation levels for depth and hierarchy (with light and dark mode variants)
 * - Focus Rings: Keyboard focus indicators for accessibility
 * - Border Radius: Corner rounding options
 * - Transitions: Common animation timing patterns
 *
 */

// =============================================================================
// Shadows / Elevations
// =============================================================================

export interface Shadow {
  name: string;
  cssVar: string;
  tailwindClass: string;
  value: string;
  valueDark?: string;
  usage: string;
}

export const shadows: Shadow[] = [
  {
    name: 'shadow-sm',
    cssVar: '--shadow-sm',
    tailwindClass: 'shadow-sm',
    value: '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
    valueDark: '0 1px 2px 0 rgba(0, 0, 0, 0.2)',
    usage: 'Tooltips, small containers, subtle elevation',
  },
  {
    name: 'shadow-default',
    cssVar: '--shadow-default',
    tailwindClass: 'shadow-default',
    value: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.04)',
    valueDark:
      '0 1px 3px 0 rgba(0, 0, 0, 0.25), 0 1px 2px 0 rgba(0, 0, 0, 0.2)',
    usage: 'Menus, popovers, hover cards, dropdown menus',
  },
  {
    name: 'shadow-md',
    cssVar: '--shadow-md',
    tailwindClass: 'shadow-md',
    value:
      '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.04)',
    valueDark:
      '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
    usage: 'Toast notifications (sonner), temporary elements',
  },
  {
    name: 'shadow-lg',
    cssVar: '--shadow-lg',
    tailwindClass: 'shadow-lg',
    value:
      '0 10px 15px -3px rgba(0, 0, 0, 0.06), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
    valueDark:
      '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
    usage: 'Modals and dialogs without backdrop overlay',
  },
  {
    name: 'shadow-xl',
    cssVar: '--shadow-xl',
    tailwindClass: 'shadow-xl',
    value:
      '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.06)',
    valueDark:
      '0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 10px 10px -5px rgba(0, 0, 0, 0.4)',
    usage: 'Modals and dialogs with backdrop overlay, highest elevation',
  },
];

// =============================================================================
// Focus Rings
// =============================================================================

export interface FocusRing {
  name: string;
  tailwindClasses: string;
  usage: string;
  description: string;
}

export const focusRings: FocusRing[] = [
  {
    name: 'focus',
    tailwindClasses: 'focus-visible:shadow-focus-ring outline-none',
    usage: 'Keyboard focus for default interactive elements',
    description:
      'Standard focus ring using box-shadow (no box model changes). Creates a 2px inner ring and 4px outer glow (2px visible beyond inner). Apply to buttons, inputs, links, and other interactive elements.',
  },
  {
    name: 'focus-destructive',
    tailwindClasses: 'focus-visible:shadow-focus-ring-destructive outline-none',
    usage: 'Keyboard focus for destructive or error state elements',
    description:
      'Red-tinted focus ring for destructive actions or elements in error state. Uses 2px inner + 4px outer box-shadow to avoid layout shift.',
  },
];

// =============================================================================
// Ring Width
// =============================================================================

// The design system uses a single focus ring pattern with two layers:
// - Inner ring: 2px (darker color)
// - Outer ring: 4px total (lighter color, 2px visible beyond inner)
// This is defined in globals.css as --shadow-focus-ring and --shadow-focus-ring-destructive
// Always use the shadow-focus-ring utility class without modifiers

// =============================================================================
// Border Radius
// =============================================================================

export interface BorderRadius {
  name: string;
  cssVar: string;
  tailwindClass: string;
  value: string;
  usage: string;
}

export const borderRadii: BorderRadius[] = [
  {
    name: 'none',
    cssVar: '--radius-none',
    tailwindClass: 'rounded-none',
    value: '0px',
    usage: 'Sharp corners, no rounding',
  },
  {
    name: 'xs',
    cssVar: '--radius-xs',
    tailwindClass: 'rounded-xs',
    value: '2px',
    usage: 'Very subtle rounding, badges, small elements',
  },
  {
    name: 'sm',
    cssVar: '--radius-sm',
    tailwindClass: 'rounded-sm',
    value: '4px',
    usage: 'Subtle rounding, inline elements, tags',
  },
  {
    name: 'md',
    cssVar: '--radius-md',
    tailwindClass: 'rounded-md',
    value: '6px',
    usage: 'Default rounding, buttons, inputs, cards',
  },
  {
    name: 'lg',
    cssVar: '--radius-lg',
    tailwindClass: 'rounded-lg',
    value: '8px',
    usage: 'Prominent rounding, cards, modals, panels',
  },
  {
    name: 'xl',
    cssVar: '--radius-xl',
    tailwindClass: 'rounded-xl',
    value: '12px',
    usage: 'Large rounding, feature cards, hero sections',
  },
  {
    name: '2xl',
    cssVar: '--radius-2xl',
    tailwindClass: 'rounded-2xl',
    value: '16px',
    usage: 'Extra large rounding, prominent containers',
  },
  {
    name: '3xl',
    cssVar: '--radius-3xl',
    tailwindClass: 'rounded-3xl',
    value: '24px',
    usage: 'Very large rounding, decorative elements',
  },
  {
    name: '4xl',
    cssVar: '--radius-4xl',
    tailwindClass: 'rounded-4xl',
    value: '32px',
    usage: 'Maximum rounding, pill-like shapes',
  },
  {
    name: 'full',
    cssVar: '--radius-full',
    tailwindClass: 'rounded-full',
    value: '9999px',
    usage: 'Fully circular, avatars, circular buttons, pills',
  },
];

// =============================================================================
// Transitions
// =============================================================================

export interface Transition {
  name: string;
  tailwindClasses: string;
  duration: string;
  timing: string;
  usage: string;
}

export const transitions: Transition[] = [
  {
    name: 'Default',
    tailwindClasses: 'transition',
    duration: '150ms',
    timing: 'ease-out',
    usage: 'General purpose transitions for colors, opacity, shadows',
  },
  {
    name: 'Fast',
    tailwindClasses: 'transition duration-100',
    duration: '100ms',
    timing: 'ease-out',
    usage: 'Quick feedback for hovers, micro-interactions',
  },
  {
    name: 'Slow',
    tailwindClasses: 'transition duration-300',
    duration: '300ms',
    timing: 'ease-out',
    usage: 'Deliberate transitions, expanding content',
  },
  {
    name: 'Colors',
    tailwindClasses: 'transition-colors',
    duration: '150ms',
    timing: 'ease-out',
    usage: 'Color changes only (background, text, border)',
  },
  {
    name: 'Opacity',
    tailwindClasses: 'transition-opacity',
    duration: '150ms',
    timing: 'ease-out',
    usage: 'Fade in/out effects',
  },
  {
    name: 'Transform',
    tailwindClasses: 'transition-transform',
    duration: '150ms',
    timing: 'ease-out',
    usage: 'Scale, rotate, translate animations',
  },
  {
    name: 'All',
    tailwindClasses: 'transition-all',
    duration: '150ms',
    timing: 'ease-out',
    usage: 'All properties (use sparingly, less performant)',
  },
];

// =============================================================================
// Effect Patterns
// =============================================================================

export const effectPatterns = {
  buttonHover: {
    name: 'Button Hover',
    description: 'Standard hover effect for buttons',
    classes: 'transition-colors hover:bg-primary-hover',
    usage: 'Primary and secondary buttons',
  },
  cardHover: {
    name: 'Card Hover',
    description: 'Subtle lift effect for interactive cards',
    classes: 'transition-shadow hover:shadow-md',
    usage: 'Clickable cards, list items',
  },
  inputFocus: {
    name: 'Input Focus',
    description: 'Focus state for form inputs',
    classes:
      'transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring-shadow focus-visible:ring',
    usage: 'Text inputs, textareas, select elements',
  },
  linkHover: {
    name: 'Link Hover',
    description: 'Underline effect for text links',
    classes: 'transition-colors hover:underline',
    usage: 'Inline text links',
  },
  fadeIn: {
    name: 'Fade In',
    description: 'Opacity fade for appearing elements',
    classes: 'animate-in fade-in duration-200',
    usage: 'Modals, popovers, dropdowns appearing',
  },
  fadeOut: {
    name: 'Fade Out',
    description: 'Opacity fade for disappearing elements',
    classes: 'animate-out fade-out duration-150',
    usage: 'Modals, popovers, dropdowns closing',
  },
  slideIn: {
    name: 'Slide In',
    description: 'Slide animation for entering elements',
    classes: 'animate-in slide-in-from-top-2 duration-200',
    usage: 'Dropdowns, popovers, sheets',
  },
  scaleIn: {
    name: 'Scale In',
    description: 'Scale up animation for appearing elements',
    classes: 'animate-in zoom-in-95 duration-200',
    usage: 'Modals, dialogs, context menus',
  },
  disabled: {
    name: 'Disabled State',
    description: 'Visual treatment for disabled elements',
    classes: 'disabled:opacity-50 disabled:cursor-not-allowed',
    usage: 'Disabled buttons, inputs, interactive elements',
  },
} as const;

// =============================================================================
// Utility Functions
// =============================================================================

/**
 * Get a shadow by name
 */
export function getShadow(name: string): Shadow | undefined {
  return shadows.find((s) => s.name === name || s.tailwindClass === name);
}

/**
 * Get a border radius by name
 */
export function getRadius(name: string): BorderRadius | undefined {
  return borderRadii.find((r) => r.name === name || r.tailwindClass === name);
}

/**
 * Get focus ring classes for a given variant
 */
export function getFocusRingClasses(
  variant: 'default' | 'destructive' = 'default'
): string {
  const ring = focusRings.find((r) =>
    variant === 'destructive'
      ? r.name === 'focus-destructive'
      : r.name === 'focus'
  );
  return ring?.tailwindClasses ?? '';
}

// =============================================================================
// Code Examples for LLM Consumption
// =============================================================================

export const effectExamples = {
  shadows: `
<!-- Tooltip with subtle shadow (light and dark mode variants) -->
<div class="shadow-sm rounded-md p-2 bg-popover">
  Tooltip content
</div>

<!-- Dropdown menu with default shadow (light and dark mode variants) -->
<div class="shadow-default rounded-lg p-2 bg-popover">
  Menu items...
</div>

<!-- Modal with large shadow (light and dark mode variants) -->
<div class="shadow-xl rounded-xl p-6 bg-card">
  Modal content...
</div>`,

  focusRings: `
<!-- Button with focus ring (no box model changes) -->
<button class="px-4 py-2 bg-primary text-primary-foreground rounded-md focus-visible:shadow-focus-ring outline-none">
  Click me
</button>

<!-- Destructive button with red focus ring (no box model changes) -->
<button class="px-4 py-2 bg-destructive text-destructive-foreground rounded-md focus-visible:shadow-focus-ring-destructive outline-none">
  Delete
</button>

<!-- Input with focus ring (no box model changes) -->
<input class="border border-border rounded-md px-3 py-2 focus-visible:shadow-focus-ring outline-none" />`,

  borderRadius: `
<!-- Badge with subtle rounding -->
<span class="rounded-sm px-2 py-0.5 bg-muted text-sm">Badge</span>

<!-- Button with default rounding -->
<button class="rounded-md px-4 py-2 bg-primary">Button</button>

<!-- Card with prominent rounding -->
<div class="rounded-lg border border-border p-4">Card content</div>

<!-- Avatar with full rounding -->
<img class="rounded-full w-10 h-10" src="avatar.jpg" alt="Avatar" />`,

  transitions: `
<!-- Button with color transition -->
<button class="transition-colors bg-primary hover:bg-primary-hover px-4 py-2">
  Hover me
</button>

<!-- Card with shadow transition -->
<div class="transition-shadow hover:shadow-md rounded-lg p-4 border">
  Hoverable card
</div>

<!-- Element with transform transition -->
<button class="transition-transform hover:scale-105">
  Scale on hover
</button>`,

  animations: `
<!-- Fade in animation (for modals, popovers) -->
<div class="animate-in fade-in duration-200">
  Appearing content
</div>

<!-- Slide in from top (for dropdowns) -->
<div class="animate-in slide-in-from-top-2 duration-200">
  Dropdown content
</div>

<!-- Scale in (for dialogs) -->
<div class="animate-in zoom-in-95 duration-200">
  Dialog content
</div>

<!-- Combined entrance animation -->
<div class="animate-in fade-in zoom-in-95 duration-200">
  Modal content
</div>`,

  combined: `
<!-- Complete interactive card example -->
<button class="
  group
  rounded-lg border border-border p-4
  bg-card text-card-foreground
  shadow-sm
  transition-all
  hover:shadow-md hover:border-border/80
  focus-visible:border-ring focus-visible:ring-ring-shadow focus-visible:ring
  outline-none
">
  <h3 class="font-medium">Card Title</h3>
  <p class="text-muted-foreground text-sm">Card description</p>
</button>

<!-- Complete button example -->
<button class="
  px-4 py-2
  rounded-md
  bg-primary text-primary-foreground
  transition-colors
  hover:bg-primary-hover
  focus-visible:border-ring focus-visible:ring-ring-shadow focus-visible:ring
  disabled:opacity-50 disabled:cursor-not-allowed
  outline-none
">
  Submit
</button>`,
};

export type EffectPattern = keyof typeof effectPatterns;
