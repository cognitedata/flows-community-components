import {
  ContentSection,
  DoDontGrid,
  TokenTable,
} from '@/components/foundations/content-primitives';

export function EffectsContent() {
  return (
    <>
      <ContentSection title="Elevation">
        <p>
          Shadows create hierarchy and guide focus by separating floating or
          overlaying elements from the surfaces behind them. Apply them only to
          things that are functionally elevated — never as decoration on a flat
          surface.
        </p>
        <TokenTable
          columns={['Token', 'Use']}
          rows={[
            [
              <code key="1">effect-shadow-sm</code>,
              'Tooltips, floating labels',
            ],
            [
              <code key="2">effect-shadow-default</code>,
              'Menus, dropdowns, popovers, floating panels',
            ],
            [
              <code key="3">effect-shadow-lg</code>,
              'Drawers, sheets, side panels',
            ],
            [<code key="4">effect-shadow-xl</code>, 'Dialogs, alert dialogs'],
          ]}
        />
        <p>
          In dark mode, elevation is conveyed through surface lightness rather
          than shadow intensity — shadows barely read against a dark background,
          so lean on the surface tokens instead.
        </p>
      </ContentSection>

      <ContentSection title="Focus states">
        <p>
          Focus rings make interactive elements usable with a keyboard or
          assistive technology. They are never optional — not even for aesthetic
          reasons.
        </p>
        <TokenTable
          columns={['Token', 'Use']}
          rows={[
            [
              <code key="1">ring</code>,
              'Default focus ring, paired with ring-muted',
            ],
            [
              <code key="2">ring-destructive</code>,
              'Focus ring for a field in a validation error state, paired with ring-destructive-muted',
            ],
          ]}
        />
      </ContentSection>

      <ContentSection title="Dos and don'ts">
        <DoDontGrid
          dos={[
            'Use elevation tokens instead of hand-written box-shadow values.',
            "Use a 2px stroke weight for focus rings so they're visible at a glance.",
            'Test focus order across the whole page, not just one component.',
          ]}
          donts={[
            'Stack multiple shadows on overlapping elements.',
            'Remove or suppress focus styles, even temporarily.',
            'Rely on color alone to communicate focus.',
          ]}
        />
      </ContentSection>
    </>
  );
}
