import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';

import { cn } from '../../../../lib/utils';

import {
  borderRadii,
  effectExamples,
  effectPatterns,
  focusRings,
  shadows,
  transitions,
} from './effects';
const meta: Meta = {
  title: 'Foundations/Effects',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};
export default meta;
type Story = StoryObj;
export const Shadows: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(shadows.length).toBe(5);
    await expect(canvas.getByTestId('shadow-shadow-sm')).toBeInTheDocument();
    await expect(canvas.getByTestId('shadow-shadow-default')).toBeInTheDocument();
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
            className="w-38 h-38 bg-background rounded-lg bg-card shrink-0"
            style={{
              boxShadow: `var(${shadow.cssVar})`,
            }}
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
export const FocusRings: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(focusRings.length).toBe(2);
    const defaultButton = canvas.getByTestId('focus-ring-focus');
    await userEvent.click(defaultButton);
    await expect(defaultButton).toBeInTheDocument();
    const destructiveButton = canvas.getByTestId('focus-ring-focus-destructive');
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
            type="button"
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
export const BorderRadius: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(borderRadii.length).toBe(10);
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
export const Transitions: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(transitions.length).toBe(7);
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
              <span className="text-xs text-muted-foreground">{transition.duration}</span>
            </div>
            <button
              type="button"
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
export const EffectPatterns: Story = {
  name: 'Pattern: Common Effects',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const patternCount = Object.keys(effectPatterns).length;
    await expect(patternCount).toBe(9);
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
            <p className="text-sm text-muted-foreground">{pattern.description}</p>
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
export const InteractiveExamples: Story = {
  name: 'Pattern: Interactive Demo',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Primary Button')).toBeInTheDocument();
    await expect(canvas.getByText('Destructive Button')).toBeInTheDocument();
    await expect(canvas.getByText('Interactive Card')).toBeInTheDocument();
    const primaryButton = canvas.getByText('Primary Button');
    await userEvent.hover(primaryButton);
  },
  render: () => (
    <div className="space-y-8" data-testid="interactive-examples">
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Buttons</h3>
        <div className="flex gap-4">
          <button
            type="button"
            className={cn(
              'px-4 py-2 rounded-md',
              'bg-primary text-primary-foreground',
              'transition-colors hover:bg-primary-hover',
              'focus-visible:shadow-focus-ring',
              'outline-none'
            )}
          >
            Primary Button
          </button>
          <button
            type="button"
            className={cn(
              'px-4 py-2 rounded-md',
              'bg-muted text-foreground',
              'transition-colors hover:bg-accent',
              'focus-visible:shadow-focus-ring',
              'outline-none'
            )}
          >
            Secondary Button
          </button>
          <button
            type="button"
            className={cn(
              'px-4 py-2 rounded-md',
              'bg-destructive text-destructive-foreground',
              'transition-colors hover:bg-destructive-hover',
              'focus-visible:shadow-focus-ring-destructive',
              'outline-none'
            )}
          >
            Destructive Button
          </button>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-medium">Cards</h3>
        <div className="grid grid-cols-3 gap-4">
          <button
            type="button"
            className={cn(
              'p-4 rounded-lg text-left',
              'bg-card border border-border',
              'shadow-sm',
              'transition-all hover:shadow-md hover:border-border/80',
              'focus-visible:shadow-focus-ring',
              'outline-none'
            )}
          >
            <h4 className="font-medium">Interactive Card</h4>
            <p className="text-sm text-muted-foreground mt-1">Hover for shadow lift</p>
          </button>
          <div className={cn('p-4 rounded-lg', 'bg-card border border-border', 'shadow-default')}>
            <h4 className="font-medium">Elevated Card</h4>
            <p className="text-sm text-muted-foreground mt-1">Default shadow</p>
          </div>
          <div className={cn('p-4 rounded-lg', 'bg-card border border-border', 'shadow-xl')}>
            <h4 className="font-medium">Modal Card</h4>
            <p className="text-sm text-muted-foreground mt-1">Maximum elevation</p>
          </div>
        </div>
      </section>

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
              'focus-visible:shadow-focus-ring',
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
              'focus-visible:shadow-focus-ring-destructive',
              'outline-none'
            )}
          />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-medium">Border Radius Examples</h3>
        <div className="flex items-center gap-4">
          <span className="rounded-sm px-2 py-1 bg-muted text-sm">rounded-sm</span>
          <span className="rounded-md px-2 py-1 bg-muted text-sm">rounded-md</span>
          <span className="rounded-lg px-2 py-1 bg-muted text-sm">rounded-lg</span>
          <span className="rounded-full px-3 py-1 bg-muted text-sm">rounded-full</span>
          <div className="rounded-full w-10 h-10 bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
            AV
          </div>
        </div>
      </section>
    </div>
  ),
};
export const ShadowsReference: Story = {
  name: 'Reference: Shadows',
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
              <td className="py-2 pr-4 text-muted-foreground text-xs font-mono">{shadow.cssVar}</td>
              <td className="py-2 text-muted-foreground">{shadow.usage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
};
export const RadiusReference: Story = {
  name: 'Reference: Border Radius',
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
              <td className="py-2 pr-4 text-muted-foreground text-xs font-mono">{radius.value}</td>
              <td className="py-2 text-muted-foreground">{radius.usage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
};
export const CodeExamples: Story = {
  name: 'Reference: Code Examples',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId('code-example-shadows')).toBeInTheDocument();
    await expect(canvas.getByTestId('code-example-focusRings')).toBeInTheDocument();
    await expect(canvas.getByTestId('code-example-borderRadius')).toBeInTheDocument();
    await expect(canvas.getByTestId('code-example-transitions')).toBeInTheDocument();
  },
  render: () => (
    <div className="space-y-8" data-testid="code-examples">
      {Object.entries(effectExamples).map(([name, code]) => (
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
