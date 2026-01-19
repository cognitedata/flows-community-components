import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect } from '@storybook/test';
import {
  shadows,
  focusRings,
  ringWidths,
  borderRadii,
  transitions,
  effectPatterns,
  effectExamples,
} from './effects';
import { cn } from '@/lib/utils';

/**
 * # Aura Effects System
 *
 * The effects system provides visual treatments for depth, focus, and animation:
 * - **Shadows**: Elevation levels for depth and hierarchy
 * - **Focus Rings**: Keyboard focus indicators for accessibility
 * - **Border Radius**: Corner rounding options
 * - **Transitions**: Animation timing patterns
 *
 * ## Usage
 *
 * Apply effects using Tailwind classes:
 *
 * ```tsx
 * // Shadows for elevation
 * <div className="shadow-sm">Subtle elevation</div>
 * <div className="shadow-default">Dropdown/popover</div>
 * <div className="shadow-xl">Modal</div>
 *
 * // Focus rings for accessibility
 * <button className="focus-visible:ring focus-visible:ring-ring-shadow focus-visible:border-ring">
 *   Focusable
 * </button>
 *
 * // Border radius
 * <div className="rounded-md">Default rounding</div>
 * <div className="rounded-full">Circular</div>
 *
 * // Transitions
 * <button className="transition-colors hover:bg-primary-hover">
 *   Animated hover
 * </button>
 * ```
 */
const meta: Meta = {
  title: 'Layouts/Effects',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

// =============================================================================
// Shadow Stories
// =============================================================================

/**
 * Shadow/elevation levels for creating depth and visual hierarchy.
 * Use higher elevation for elements that appear above others.
 */
export const Shadows: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Box shadows create depth and hierarchy. Use shadow-sm for tooltips, shadow-default for menus, and shadow-xl for modals.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify all shadows are rendered
    await expect(shadows.length).toBe(5);

    // Check shadow elements are displayed using testids
    await expect(canvas.getByTestId('shadow-shadow-sm')).toBeInTheDocument();
    await expect(
      canvas.getByTestId('shadow-shadow-default')
    ).toBeInTheDocument();
    await expect(canvas.getByTestId('shadow-shadow-md')).toBeInTheDocument();
    await expect(canvas.getByTestId('shadow-shadow-lg')).toBeInTheDocument();
    await expect(canvas.getByTestId('shadow-shadow-xl')).toBeInTheDocument();
  },
  render: () => (
    <div className="space-y-6" data-testid="shadows">
      {shadows.map((shadow) => (
        <div
          key={shadow.name}
          className="flex items-center gap-6"
          data-testid={`shadow-${shadow.name}`}
        >
          <div
            className="w-28 h-20 bg-background rounded-lg border border-border shrink-0"
            style={{ boxShadow: `var(${shadow.cssVar})` }}
          />
          <div className="space-y-1">
            <h3 className="text-base font-medium">{shadow.name}</h3>
            <p className="text-sm text-muted-foreground">{shadow.usage}</p>
            <code className="text-xs font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
              {shadow.tailwindClass}
            </code>
          </div>
        </div>
      ))}
    </div>
  ),
};

// =============================================================================
// Focus Ring Stories
// =============================================================================

/**
 * Focus rings provide visual feedback for keyboard navigation.
 * Essential for accessibility compliance.
 */
export const FocusRings: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Focus rings indicate keyboard focus for accessibility. Click or tab to the elements to see the rings. Use the default ring for most elements, destructive for error/delete actions.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify focus rings are rendered
    await expect(focusRings.length).toBe(2);

    // Find and focus the first button
    const defaultButton = canvas.getByTestId('focus-ring-focus');
    await userEvent.click(defaultButton);

    // Verify button exists
    await expect(defaultButton).toBeInTheDocument();

    // Find and focus the destructive button
    const destructiveButton = canvas.getByTestId(
      'focus-ring-focus-destructive'
    );
    await expect(destructiveButton).toBeInTheDocument();
  },
  render: () => (
    <div className="space-y-6" data-testid="focus-rings">
      <p className="text-sm text-muted-foreground">
        Click or tab to the elements below to see the focus rings:
      </p>
      {focusRings.map((ring) => (
        <div key={ring.name} className="flex items-center gap-6">
          <button
            data-testid={`focus-ring-${ring.name}`}
            className={cn(
              'w-28 h-20 bg-background rounded-lg border border-border cursor-pointer outline-none transition-[color,box-shadow]',
              ring.tailwindClasses
            )}
            aria-label={`Demo ${ring.name} focus ring`}
          />
          <div className="space-y-1">
            <h3 className="text-base font-medium">{ring.name}</h3>
            <p className="text-sm text-muted-foreground">{ring.usage}</p>
            <code className="text-xs font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded block max-w-md truncate">
              {ring.tailwindClasses}
            </code>
          </div>
        </div>
      ))}
    </div>
  ),
};

/**
 * Ring width options for varying levels of focus emphasis.
 */
export const RingWidths: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Different ring widths provide varying levels of emphasis. Use ring-1 for subtle focus, ring (3px) as default, and ring-4 for high importance.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify all ring widths are rendered
    await expect(ringWidths.length).toBe(4);

    // Check ring width elements are displayed using testids
    await expect(canvas.getByTestId('ring-width-ring-1')).toBeInTheDocument();
    await expect(canvas.getByTestId('ring-width-ring-2')).toBeInTheDocument();
    await expect(canvas.getByTestId('ring-width-ring')).toBeInTheDocument();
    await expect(canvas.getByTestId('ring-width-ring-4')).toBeInTheDocument();
  },
  render: () => (
    <div className="space-y-6" data-testid="ring-widths">
      <p className="text-sm text-muted-foreground">
        Click or tab to see different ring widths:
      </p>
      {ringWidths.map((ring) => {
        const ringClass = `focus-visible:border-ring focus-visible:ring-ring-shadow focus-visible:${ring.tailwindClass}`;
        return (
          <div key={ring.name} className="flex items-center gap-6">
            <button
              data-testid={`ring-width-${ring.tailwindClass}`}
              className={cn(
                'w-28 h-20 bg-background rounded-lg border border-border cursor-pointer outline-none transition-[color,box-shadow]',
                ringClass
              )}
              aria-label={`Demo ${ring.name} ring width`}
            />
            <div className="space-y-1">
              <h3 className="text-base font-medium">{ring.name}</h3>
              <p className="text-sm text-muted-foreground">
                {ring.width} · {ring.usage}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  ),
};

// =============================================================================
// Border Radius Stories
// =============================================================================

/**
 * Border radius options for corner rounding.
 */
export const BorderRadius: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Border radius tokens for consistent corner rounding. Use rounded-md for buttons/inputs, rounded-lg for cards, and rounded-full for avatars.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify all radii are rendered
    await expect(borderRadii.length).toBe(10);

    // Check specific radius elements using testids
    await expect(canvas.getByTestId('radius-none')).toBeInTheDocument();
    await expect(canvas.getByTestId('radius-md')).toBeInTheDocument();
    await expect(canvas.getByTestId('radius-full')).toBeInTheDocument();
  },
  render: () => (
    <div className="space-y-6" data-testid="border-radius">
      <div className="grid grid-cols-5 gap-4">
        {borderRadii.map((radius) => (
          <div
            key={radius.name}
            className="flex flex-col items-center gap-2"
            data-testid={`radius-${radius.name}`}
          >
            <div className={cn('w-16 h-16 bg-primary', radius.tailwindClass)} />
            <div className="text-center">
              <p className="text-sm font-medium">{radius.name}</p>
              <p className="text-xs text-muted-foreground">{radius.value}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-border pt-6 mt-6">
        <h3 className="text-lg font-medium mb-4">Usage Guidelines</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          {borderRadii.slice(0, 6).map((radius) => (
            <div key={radius.name} className="flex items-start gap-2">
              <code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded shrink-0">
                {radius.tailwindClass}
              </code>
              <span className="text-muted-foreground">{radius.usage}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

// =============================================================================
// Transition Stories
// =============================================================================

/**
 * Transition timing patterns for smooth animations.
 */
export const Transitions: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Transition utilities for smooth state changes. Use transition-colors for hovers, transition-transform for scale effects.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify transitions are rendered
    await expect(transitions.length).toBe(7);

    // Check transition elements using testids
    await expect(canvas.getByTestId('transition-default')).toBeInTheDocument();
    await expect(canvas.getByTestId('transition-fast')).toBeInTheDocument();
    await expect(canvas.getByTestId('transition-colors')).toBeInTheDocument();
  },
  render: () => (
    <div className="space-y-6" data-testid="transitions">
      <p className="text-sm text-muted-foreground">
        Hover over the elements to see the transitions in action:
      </p>
      <div className="grid grid-cols-2 gap-4">
        {transitions.map((transition) => (
          <div
            key={transition.name}
            className="p-4 border border-border rounded-lg space-y-3"
            data-testid={`transition-${transition.name.toLowerCase()}`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-medium">{transition.name}</h3>
              <span className="text-xs text-muted-foreground">
                {transition.duration}
              </span>
            </div>
            <button
              className={cn(
                'w-full py-2 px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary-hover',
                transition.tailwindClasses
              )}
            >
              Hover me
            </button>
            <p className="text-xs text-muted-foreground">{transition.usage}</p>
            <code className="text-xs font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded block">
              {transition.tailwindClasses}
            </code>
          </div>
        ))}
      </div>
    </div>
  ),
};

// =============================================================================
// Effect Pattern Stories
// =============================================================================

/**
 * Common effect patterns used throughout the design system.
 */
export const EffectPatterns: Story = {
  name: 'Pattern: Common Effects',
  parameters: {
    docs: {
      description: {
        story:
          'Pre-defined effect patterns for common UI interactions. Copy these patterns for consistent behaviour across your application.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const patternCount = Object.keys(effectPatterns).length;
    await expect(patternCount).toBe(9);

    // Check pattern elements using testids
    await expect(canvas.getByTestId('pattern-buttonHover')).toBeInTheDocument();
    await expect(canvas.getByTestId('pattern-cardHover')).toBeInTheDocument();
    await expect(canvas.getByTestId('pattern-inputFocus')).toBeInTheDocument();
  },
  render: () => (
    <div className="space-y-6" data-testid="effect-patterns">
      {Object.entries(effectPatterns).map(([key, pattern]) => (
        <div
          key={key}
          className="p-4 border border-border rounded-lg space-y-3"
          data-testid={`pattern-${key}`}
        >
          <div>
            <h3 className="text-base font-medium">{pattern.name}</h3>
            <p className="text-sm text-muted-foreground">
              {pattern.description}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <code className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded flex-1 overflow-x-auto">
              {pattern.classes}
            </code>
          </div>
          <p className="text-xs text-muted-foreground">
            <strong>Usage:</strong> {pattern.usage}
          </p>
        </div>
      ))}
    </div>
  ),
};

// =============================================================================
// Interactive Examples
// =============================================================================

/**
 * Interactive examples demonstrating effects in context.
 */
export const InteractiveExamples: Story = {
  name: 'Pattern: Interactive Demo',
  parameters: {
    docs: {
      description: {
        story:
          'Interactive demonstration of effects. Hover, focus, and click the elements to see the effects in action.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify interactive elements exist
    await expect(canvas.getByText('Primary Button')).toBeInTheDocument();
    await expect(canvas.getByText('Destructive Button')).toBeInTheDocument();
    await expect(canvas.getByText('Interactive Card')).toBeInTheDocument();

    // Test button hover interaction
    const primaryButton = canvas.getByText('Primary Button');
    await userEvent.hover(primaryButton);
  },
  render: () => (
    <div className="space-y-8" data-testid="interactive-examples">
      {/* Buttons */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Buttons</h3>
        <div className="flex gap-4">
          <button
            className={cn(
              'px-4 py-2 rounded-md',
              'bg-primary text-primary-foreground',
              'transition-colors hover:bg-primary-hover',
              'focus-visible:border-ring focus-visible:ring-ring-shadow focus-visible:ring',
              'outline-none'
            )}
          >
            Primary Button
          </button>
          <button
            className={cn(
              'px-4 py-2 rounded-md',
              'bg-muted text-foreground',
              'transition-colors hover:bg-accent',
              'focus-visible:border-ring focus-visible:ring-ring-shadow focus-visible:ring',
              'outline-none'
            )}
          >
            Secondary Button
          </button>
          <button
            className={cn(
              'px-4 py-2 rounded-md',
              'bg-destructive text-destructive-foreground',
              'transition-colors hover:bg-destructive-hover',
              'focus-visible:border-destructive-foreground focus-visible:ring-destructive/50 focus-visible:ring',
              'outline-none'
            )}
          >
            Destructive Button
          </button>
        </div>
      </section>

      {/* Cards */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Cards</h3>
        <div className="grid grid-cols-3 gap-4">
          <button
            className={cn(
              'p-4 rounded-lg text-left',
              'bg-card border border-border',
              'shadow-sm',
              'transition-all hover:shadow-md hover:border-border/80',
              'focus-visible:border-ring focus-visible:ring-ring-shadow focus-visible:ring',
              'outline-none'
            )}
          >
            <h4 className="font-medium">Interactive Card</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Hover for shadow lift
            </p>
          </button>
          <div
            className={cn(
              'p-4 rounded-lg',
              'bg-card border border-border',
              'shadow-default'
            )}
          >
            <h4 className="font-medium">Elevated Card</h4>
            <p className="text-sm text-muted-foreground mt-1">Default shadow</p>
          </div>
          <div
            className={cn(
              'p-4 rounded-lg',
              'bg-card border border-border',
              'shadow-xl'
            )}
          >
            <h4 className="font-medium">Modal Card</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Maximum elevation
            </p>
          </div>
        </div>
      </section>

      {/* Inputs */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Form Inputs</h3>
        <div className="grid grid-cols-2 gap-4 max-w-lg">
          <input
            type="text"
            placeholder="Default input"
            className={cn(
              'px-3 py-2 rounded-md',
              'bg-background border border-border',
              'text-foreground placeholder:text-muted-foreground',
              'transition-[color,box-shadow]',
              'focus-visible:border-ring focus-visible:ring-ring-shadow focus-visible:ring-1',
              'outline-none'
            )}
          />
          <input
            type="text"
            placeholder="Error input"
            className={cn(
              'px-3 py-2 rounded-md',
              'bg-background border border-red-500',
              'text-foreground placeholder:text-muted-foreground',
              'transition-[color,box-shadow]',
              'focus-visible:border-destructive-foreground focus-visible:ring-destructive/50 focus-visible:ring-1',
              'outline-none'
            )}
          />
        </div>
      </section>

      {/* Badges with different radii */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Border Radius Examples</h3>
        <div className="flex items-center gap-4">
          <span className="rounded-sm px-2 py-1 bg-muted text-sm">
            rounded-sm
          </span>
          <span className="rounded-md px-2 py-1 bg-muted text-sm">
            rounded-md
          </span>
          <span className="rounded-lg px-2 py-1 bg-muted text-sm">
            rounded-lg
          </span>
          <span className="rounded-full px-3 py-1 bg-muted text-sm">
            rounded-full
          </span>
          <div className="rounded-full w-10 h-10 bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
            AV
          </div>
        </div>
      </section>
    </div>
  ),
};

// =============================================================================
// Reference Stories
// =============================================================================

/**
 * Complete reference of all shadow values.
 */
export const ShadowsReference: Story = {
  name: 'Reference: Shadows',
  parameters: {
    docs: {
      description: {
        story:
          'Complete reference table of all shadow tokens with their CSS values.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const table = canvas.getByRole('table');
    await expect(table).toBeInTheDocument();

    const rows = canvas.getAllByRole('row');
    await expect(rows.length).toBe(shadows.length + 1);
  },
  render: () => (
    <div className="overflow-x-auto" data-testid="shadows-reference">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-2 pr-4 font-medium">Name</th>
            <th className="text-left py-2 pr-4 font-medium">Tailwind</th>
            <th className="text-left py-2 pr-4 font-medium">CSS Variable</th>
            <th className="text-left py-2 font-medium">Usage</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {shadows.map((shadow) => (
            <tr key={shadow.name}>
              <td className="py-2 pr-4 font-medium">{shadow.name}</td>
              <td className="py-2 pr-4">
                <code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">
                  {shadow.tailwindClass}
                </code>
              </td>
              <td className="py-2 pr-4 text-muted-foreground text-xs font-mono">
                {shadow.cssVar}
              </td>
              <td className="py-2 text-muted-foreground">{shadow.usage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
};

/**
 * Complete reference of all border radius values.
 */
export const RadiusReference: Story = {
  name: 'Reference: Border Radius',
  parameters: {
    docs: {
      description: {
        story: 'Complete reference table of all border radius tokens.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const table = canvas.getByRole('table');
    await expect(table).toBeInTheDocument();

    const rows = canvas.getAllByRole('row');
    await expect(rows.length).toBe(borderRadii.length + 1);
  },
  render: () => (
    <div className="overflow-x-auto" data-testid="radius-reference">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-2 pr-4 font-medium">Name</th>
            <th className="text-left py-2 pr-4 font-medium">Tailwind</th>
            <th className="text-left py-2 pr-4 font-medium">Value</th>
            <th className="text-left py-2 font-medium">Usage</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {borderRadii.map((radius) => (
            <tr key={radius.name}>
              <td className="py-2 pr-4 font-medium">{radius.name}</td>
              <td className="py-2 pr-4">
                <code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">
                  {radius.tailwindClass}
                </code>
              </td>
              <td className="py-2 pr-4 text-muted-foreground text-xs font-mono">
                {radius.value}
              </td>
              <td className="py-2 text-muted-foreground">{radius.usage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
};

/**
 * Code examples for common effect patterns.
 */
export const CodeExamples: Story = {
  name: 'Reference: Code Examples',
  parameters: {
    docs: {
      description: {
        story: 'Copy-paste ready code examples for common effect patterns.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Check code example sections using testids
    await expect(
      canvas.getByTestId('code-example-shadows')
    ).toBeInTheDocument();
    await expect(
      canvas.getByTestId('code-example-focusRings')
    ).toBeInTheDocument();
    await expect(
      canvas.getByTestId('code-example-borderRadius')
    ).toBeInTheDocument();
    await expect(
      canvas.getByTestId('code-example-transitions')
    ).toBeInTheDocument();
  },
  render: () => (
    <div className="space-y-8" data-testid="code-examples">
      {Object.entries(effectExamples).map(([name, code]) => (
        <div
          key={name}
          className="space-y-2"
          data-testid={`code-example-${name}`}
        >
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
