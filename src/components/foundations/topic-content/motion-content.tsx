import {
  ContentList,
  ContentSection,
  TokenTable,
} from '@/components/foundations/content-primitives';

export function MotionContent() {
  return (
    <>
      <ContentSection title="About">
        <p>
          Motion is more than decoration. It shapes how people experience a
          product — where to look, what to do next, and how the interface feels.
          When used with intention, motion reduces cognitive load, signals
          hierarchy, and reinforces Aura&apos;s brand rhythm. In data-heavy UIs,
          it keeps waiting states purposeful without competing for focus.
        </p>
      </ContentSection>

      <ContentSection title="Animation anchors">
        <p>
          Every animation in Aura should be tested against three qualities. If
          motion does not reinforce at least one of these, reconsider whether it
          is needed.
        </p>

        <h3 className="text-sm font-semibold text-foreground">Flow</h3>
        <p>
          Motion should move with continuity. Elements arrive and leave with a
          clear sense of direction and connection — no jumps or teleporting.
          When an element appears, it should grow into place with a natural
          stagger; when it disappears, it should recede with intention.
        </p>
        <p>
          <strong className="text-foreground">Test:</strong> Can I follow the
          motion with my eyes without losing my place?
        </p>

        <h3 className="text-sm font-semibold text-foreground">Calm</h3>
        <p>
          Because Aura handles complex, high-stakes data, motion must not
          compete for the user&apos;s focus. Easings do not overshoot, staggers
          do not drag, and nothing bounces when it should settle. Calm does not
          mean slow — most motion in Aura is quiet and fast. It should serve the
          task and then get out of the way. Expressive motion must be earned.
        </p>
        <p>
          <strong className="text-foreground">Test:</strong> Does this still
          feel good after 8 hours of use?
        </p>

        <h3 className="text-sm font-semibold text-foreground">Tactile</h3>
        <p>
          The interface should feel like something you can reach into. Movement
          should make the function of interactive elements obvious — buttons
          snap, panels slide from the edge they belong to, and cards lift when
          selected. Tactile motion builds intuition so users know what to do
          without reading labels.
        </p>
        <p>
          <strong className="text-foreground">Test:</strong> Can I tell
          what&apos;s interactive just by how it moves?
        </p>
      </ContentSection>

      <ContentSection title="Expressive and productive motion">
        <p>
          Every animation in Aura serves one of two roles. Choosing the right
          role determines how visible, fast, and expressive the motion should
          be.
        </p>
        <TokenTable
          columns={['Role', 'When to use', 'Character']}
          rows={[
            [
              <strong key="productive">Productive</strong>,
              'Menus, tooltips, state changes, content fading into place, cards rearranging',
              'Fast, subtle, and functional — often not consciously noticed, but missed if absent',
            ],
            [
              <strong key="expressive">Expressive</strong>,
              'AI generating a response, transitions between views, onboarding sequences',
              'Slower, more visible — use sparingly to draw attention on purpose',
            ],
          ]}
        />

        <h3 className="text-sm font-semibold text-foreground">Guidelines</h3>
        <ContentList
          items={[
            <>
              Default to <strong className="text-foreground">productive</strong>{' '}
              motion for everyday UI.
            </>,
            <>
              Escalate to{' '}
              <strong className="text-foreground">expressive</strong> only when
              the moment carries narrative weight.
            </>,
            'Productive motion keeps the interface feeling responsive and connected without competing for focus.',
            'Expressive motion gives the system its character — but overuse trains users to ignore it.',
          ]}
        />
      </ContentSection>

      <ContentSection title="What to animate">
        <p>
          Every animation is built from a combination of basic properties.
          Knowing what you can change helps you make deliberate choices about
          how an element enters, exits, or transitions between states.
        </p>
        <TokenTable
          columns={['Property', 'Tailwind utilities', 'Typical use']}
          rows={[
            [
              <strong key="position">Position</strong>,
              <code key="position-code">translate-x-*, translate-y-*</code>,
              'Entrances, exits, layout transitions — the most common property',
            ],
            [
              <strong key="scale">Scale</strong>,
              <code key="scale-code">scale-*</code>,
              'Emphasis, hierarchy, drawing attention',
            ],
            [
              <strong key="rotation">Rotation</strong>,
              <code key="rotation-code">rotate-*</code>,
              'Rare in UI; use with restraint',
            ],
            [
              <strong key="opacity">Opacity</strong>,
              <code key="opacity-code">opacity-*</code>,
              'Fades in and out; often combined with position or scale',
            ],
            [
              <strong key="color">Color</strong>,
              <code key="color-code">transition-colors</code>,
              'State changes, hover feedback, decorative accents',
            ],
            [
              <strong key="mask">Mask / morph</strong>,
              'CSS or SVG (no single utility)',
              'Expressive disclosure and progressive reveal only',
            ],
          ]}
        />

        <h3 className="text-sm font-semibold text-foreground">Guidelines</h3>
        <ContentList
          items={[
            'Combine properties intentionally — opacity plus position creates softer transitions than position alone.',
            'Animate only the properties that communicate the change. Do not animate everything by default.',
            'Use token-backed color utilities for color transitions so theming stays consistent.',
          ]}
        />
      </ContentSection>

      <ContentSection title="Timing">
        <p>
          Timing is about when things move and for how long. Well-timed
          animations feel invisible; poor timing feels sluggish or abrupt.
        </p>

        <h3 className="text-sm font-semibold text-foreground">Guidelines</h3>
        <ContentList
          items={[
            <>
              <strong className="text-foreground">
                Duration scales with area.
              </strong>{' '}
              Small UI elements (a checkbox, a menu item) need very short
              animations. Large transitions (a full panel or page) need more
              time. Values are relative to each other, not absolute.
            </>,
            <>
              <strong className="text-foreground">
                Stagger creates rhythm.
              </strong>{' '}
              When multiple elements animate, offset their timing so they reveal
              in sequence rather than all at once. Stagger draws attention to
              certain elements first and choreographs views with many moving
              parts.
            </>,
            'Exits are often slightly faster than entrances — once the user has made a choice, the UI should clear the way quickly.',
          ]}
        />

        <h3 className="text-sm font-semibold text-foreground">
          Duration tokens
        </h3>
        <TokenTable
          columns={['Token', 'Tailwind utility', 'Value', 'Use']}
          rows={[
            [
              <code key="short">duration/short</code>,
              <code key="short-util">duration-200</code>,
              'up to 200ms max',
              'Small components, productive UI',
            ],
            [
              <code key="long">duration/long</code>,
              <code key="long-util">duration-500</code>,
              '~500ms',
              'Large surfaces, expressive transitions',
            ],
          ]}
        />

        <h3 className="text-sm font-semibold text-foreground">
          Stagger tokens
        </h3>
        <TokenTable
          columns={['Token', 'Tailwind utility', 'Value', 'Use']}
          rows={[
            [
              <code key="tight">stagger/tight</code>,
              <code key="tight-util">delay-[33ms]</code>,
              '33ms',
              'Dense lists — e.g. dropdown items revealing one by one',
            ],
            [
              <code key="default">stagger/default</code>,
              <code key="default-util">delay-[100ms]</code>,
              '100ms',
              'Standard grouped reveals',
            ],
            [
              <code key="wide">stagger/wide</code>,
              <code key="wide-util">delay-[133ms]</code>,
              '133ms',
              'Secondary supporting elements that follow primary content',
            ],
          ]}
        />
      </ContentSection>

      <ContentSection title="Easing">
        <p>
          Easing brings a sense of real-world momentum to digital interfaces.
          Nothing starts or stops instantly — movement needs time to build and
          slow down. Heavier elements start slower and settle with more weight;
          lightweight elements respond quickly with less resistance.
        </p>

        <h3 className="text-sm font-semibold text-foreground">Tokens</h3>
        <TokenTable
          columns={['Token', 'Tailwind utility', 'cubic-bezier', 'Use']}
          rows={[
            [
              <code key="standard">ease/standard</code>,
              <code key="standard-util">ease-standard</code>,
              '(0.40, 0.00, 0.15, 1.00)',
              'Most state changes, repositioning, and transitions within a view',
            ],
            [
              <code key="entrance">ease/entrance</code>,
              <code key="entrance-util">ease-entrance</code>,
              '(0.00, 0.00, 0.15, 1.00)',
              'Elements appearing on screen — panels opening, content loading in',
            ],
            [
              <code key="exit">ease/exit</code>,
              <code key="exit-util">ease-exit</code>,
              '(0.67, 0.00, 0.83, 0.83)',
              'Elements leaving the screen — dismissals, closings, removals',
            ],
            [
              <code key="sine">ease/sine</code>,
              <code key="sine-util">ease-sine</code>,
              '(0.33, 0.00, 0.67, 1.00)',
              'Opacity fades and subtle color shifts — smooth without dramatic acceleration',
            ],
          ]}
        />

        <h3 className="text-sm font-semibold text-foreground">Pairing guide</h3>
        <TokenTable
          columns={['Scenario', 'Duration', 'Easing']}
          rows={[
            [
              'Productive entrance',
              <code key="d1">duration-200</code>,
              <code key="e1">ease-entrance</code>,
            ],
            [
              'Expressive entrance',
              <code key="d2">duration-500</code>,
              <code key="e2">ease-entrance</code>,
            ],
            [
              'Exit',
              <code key="d3">duration-200</code>,
              <code key="e3">ease-exit</code>,
            ],
            [
              'In-view state change',
              <code key="d4">duration-200</code>,
              <code key="e4">ease-standard</code>,
            ],
            [
              'Opacity or color only',
              <code key="d5">duration-200</code>,
              <code key="e5">ease-sine</code>,
            ],
          ]}
        />
      </ContentSection>

      <ContentSection title="Applied examples">
        <div
          className="rounded-md border border-warning-foreground/30 bg-warning-muted-background p-4"
          role="note"
        >
          <p>
            <strong className="text-foreground">
              Reference examples only.
            </strong>{' '}
            These recipes show how tokens combine in real interactions. They are
            not additional system tokens. Prefer Aura primitives&apos; built-in
            motion where available; use these patterns only for custom UI.
          </p>
        </div>

        <h3 className="text-sm font-semibold text-foreground">
          Dropdown in (productive)
        </h3>
        <p>
          A dropdown panel drops down while being revealed. List items stagger
          in one by one as the panel opens, adding flow without slowing the
          interaction. Total duration:{' '}
          <strong className="text-foreground">233ms</strong>.
        </p>
        <TokenTable
          columns={[
            'Element',
            'Property',
            'From → To',
            'Duration',
            'Easing',
            'Delay',
          ]}
          rows={[
            [
              'Panel',
              'Position (Y)',
              '0 → 176',
              '200ms',
              <code key="e1">ease-entrance</code>,
              '33ms',
            ],
            [
              'Panel',
              'Opacity',
              '0% → 100%',
              '100ms',
              <code key="e2">ease-sine</code>,
              '—',
            ],
            [
              'List item',
              'Opacity',
              '0% → 100%',
              '100ms',
              <code key="e3">ease-sine</code>,
              '33ms per item',
            ],
          ]}
        />

        <h3 className="text-sm font-semibold text-foreground">
          Dropdown out (productive)
        </h3>
        <p>
          The panel closes slightly faster than it opens — the user no longer
          needs to read it. No stagger on list items keeps the exit clean.
          Button copy fades out and in to confirm the selection, with an accent
          wipe for tactile feedback. Total duration:{' '}
          <strong className="text-foreground">233ms</strong>.
        </p>
        <TokenTable
          columns={[
            'Element',
            'Property',
            'From → To',
            'Duration',
            'Easing',
            'Delay',
          ]}
          rows={[
            [
              'Panel',
              'Position (Y)',
              '176 → 0',
              '167ms',
              <code key="e1">ease-exit</code>,
              '—',
            ],
            [
              'Panel',
              'Opacity',
              '100% → 0%',
              '67ms',
              <code key="e2">ease-sine</code>,
              '100ms',
            ],
            [
              'List item',
              'Opacity',
              '100% → 0%',
              '100ms',
              <code key="e3">ease-sine</code>,
              '67ms',
            ],
            [
              'Button copy',
              'Opacity (out)',
              '100% → 0%',
              '100ms',
              <code key="e4">ease-sine</code>,
              '33ms',
            ],
            [
              'Button copy',
              'Opacity (in)',
              '0% → 100%',
              '100ms',
              <code key="e5">ease-sine</code>,
              '133ms',
            ],
            [
              'Button accent',
              'Position (wipe)',
              '-353 → 42',
              '433ms',
              <code key="e6">ease-sine</code>,
              '133ms',
            ],
          ]}
        />

        <h3 className="text-sm font-semibold text-foreground">
          Graph entrance (expressive)
        </h3>
        <p>
          The main content animates in with a subtle scale and opacity change,
          arriving quickly and settling into place. Supporting elements follow
          with a stagger. The graph line draws on a separate, slower timeline so
          it does not compete with the primary entrance. Total duration:{' '}
          <strong className="text-foreground">467ms</strong> (graph line:{' '}
          <strong className="text-foreground">1333ms</strong>).
        </p>
        <TokenTable
          columns={[
            'Element',
            'Property',
            'From → To',
            'Duration',
            'Easing',
            'Delay',
          ]}
          rows={[
            [
              'Container',
              'Scale',
              '110% → 100%',
              '333ms',
              <code key="e1">ease-entrance</code>,
              '—',
            ],
            [
              'Container',
              'Opacity',
              '0% → 100%',
              '133ms',
              <code key="e2">ease-sine</code>,
              '—',
            ],
            [
              'Button row',
              'Position (Y)',
              '177 → 157',
              '333ms',
              <code key="e3">ease-entrance</code>,
              '100ms',
            ],
            [
              'Button row',
              'Opacity',
              '0% → 100%',
              '133ms',
              <code key="e4">ease-sine</code>,
              '100ms',
            ],
            [
              'Separator + sources',
              'Position (Y)',
              '221.5 → 201.5',
              '333ms',
              <code key="e5">ease-entrance</code>,
              '133ms',
            ],
            [
              'Separator + sources',
              'Opacity',
              '0% → 100%',
              '133ms',
              <code key="e6">ease-sine</code>,
              '133ms',
            ],
            [
              'Graph line',
              'Draw progress',
              '0 → 100',
              '1333ms',
              <code key="e7">ease-entrance</code>,
              '—',
            ],
          ]}
        />
      </ContentSection>

      <ContentSection title="Implementation">
        <p>
          Use Tailwind utilities mapped to Aura motion tokens. Do not hardcode{' '}
          <code>cubic-bezier()</code> values or raw{' '}
          <code>transition: 0.3s ease</code> in product code.
        </p>

        <h3 className="text-sm font-semibold text-foreground">
          Decision checklist
        </h3>
        <ContentList
          items={[
            <>
              <strong className="text-foreground">Role</strong> — Is this
              productive (default) or expressive (earned)?
            </>,
            <>
              <strong className="text-foreground">Properties</strong> — Which
              properties communicate the change? Animate only those.
            </>,
            <>
              <strong className="text-foreground">Duration</strong> — Small
              element (<code>duration-200</code>) or large surface (
              <code>duration-500</code>)?
            </>,
            <>
              <strong className="text-foreground">Easing</strong> — Entering (
              <code>ease-entrance</code>), exiting (<code>ease-exit</code>),
              in-view (<code>ease-standard</code>), or opacity/color (
              <code>ease-sine</code>)?
            </>,
            <>
              <strong className="text-foreground">Stagger</strong> — Multiple
              elements? Offset with <code>stagger/tight</code>,{' '}
              <code>stagger/default</code>, or <code>stagger/wide</code>.
            </>,
            <>
              <strong className="text-foreground">Reduced motion</strong> —
              Respect <code>prefers-reduced-motion</code>; disable or shorten
              non-essential animation.
            </>,
          ]}
        />

        <h3 className="text-sm font-semibold text-foreground">Example</h3>
        <pre className="overflow-x-auto rounded-md bg-muted p-4">
          <code>{`// Productive entrance — menu panel
<div
  className={cn(
    "transition-[transform,opacity] duration-200 ease-entrance delay-[33ms]",
    isOpen
      ? "translate-y-0 opacity-100"
      : "-translate-y-2 opacity-0 pointer-events-none"
  )}
>
  {children}
</div>`}</code>
        </pre>
        <pre className="mt-4 overflow-x-auto rounded-md bg-muted p-4">
          <code>{`// Respecting reduced motion
<div
  className={cn(
    "transition-[transform,opacity] duration-200 ease-entrance",
    "motion-reduce:transition-none motion-reduce:transform-none",
    isOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
  )}
>
  {children}
</div>`}</code>
        </pre>
      </ContentSection>

      <ContentSection title="Accessibility and interaction">
        <div className="rounded-md border border-border bg-muted/50 p-4">
          <p>
            Aura primitives handle motion for most common interactions. For
            custom interactive elements, pair motion with the signifiers
            documented in{' '}
            <a
              href="/aura-design-system/foundations/interaction-states"
              className="underline"
            >
              Interaction states
            </a>
            . Ensure focus and state changes remain accessible — see{' '}
            <a
              href="/aura-design-system/foundations/accessibility"
              className="underline"
            >
              Accessibility
            </a>
            .
          </p>
        </div>
      </ContentSection>
    </>
  );
}
