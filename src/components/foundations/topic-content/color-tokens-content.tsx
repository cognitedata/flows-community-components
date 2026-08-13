import {
  ContentList,
  ContentSection,
  DoDontGrid,
} from "@/components/foundations/content-primitives";

export function ColorTokensContent() {
  return (
    <>
      <ContentSection title="A two-layer system">
        <p>
          Color in Aura is split into <strong className="text-foreground">ramps</strong> — raw
          sequential scales for each hue — and{" "}
          <strong className="text-foreground">tokens</strong>, the semantic names that map to a
          step on one of those ramps. Product UI should only ever reference tokens. Tokens swap
          their underlying value automatically between light and dark mode, which is what makes
          theming possible without touching product code.
        </p>
        <p>
          Direct ramp references are reserved for cases where a color needs to stay constant
          across themes, or for one-off marketing and illustration surfaces.
        </p>
      </ContentSection>

      <ContentSection title="Token families">
        <p>Every color token belongs to one of four families:</p>
        <ContentList
          items={[
            <>
              <strong className="text-foreground">Base</strong> — surfaces, text, borders, and
              interactive states. This covers the vast majority of any interface.
            </>,
            <>
              <strong className="text-foreground">Semantic</strong> — info, success, warning,
              destructive, and neutral. Use these only when a component is communicating status.
            </>,
            <>
              <strong className="text-foreground">Decorative</strong> — tinted fills for avatars,
              badges, and illustration, with no status meaning attached.
            </>,
            <>
              <strong className="text-foreground">Chart</strong> — semi-transparent colors tuned
              for data visualization.
            </>,
          ]}
        />
      </ContentSection>

      <ContentSection title="Decorative palette">
        <p>
          Seven color families provide tinted fills for avatars, badges, and illustration. When
          you need more than one, layer them in this order: fjord, nordic, aurora, dusk, amber,
          pink, neutral.
        </p>
      </ContentSection>

      <ContentSection title="Semantic status colors">
        <p>
          Status tokens carry meaning — reach for them only when a component reflects a state:
          info, success, warning, critical, and neutral.
        </p>
      </ContentSection>

      <ContentSection title="Fixed tokens">
        <p>
          Fixed tokens resolve to the same value in both themes — they don&apos;t flip when the
          user switches modes. They exist for persistent UI chrome only; overusing them breaks the
          light/dark contract the rest of the system relies on.
        </p>
      </ContentSection>

      <ContentSection title="Dos and don'ts">
        <DoDontGrid
          dos={[
            "Reference tokens by name — they're contrast-tested for their intended use.",
            "Use a single color with varying opacity to show magnitude in charts.",
            "Reserve semantic tokens for components that carry a real status signal.",
          ]}
          donts={[
            "Hardcode hex values — they won't update when the theme changes.",
            "Adjust opacity manually — use an alpha token instead.",
            "Use semantic tokens decoratively; that miscommunicates system state.",
          ]}
        />
      </ContentSection>
    </>
  );
}
