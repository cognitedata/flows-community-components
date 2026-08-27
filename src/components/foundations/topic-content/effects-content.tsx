import {
  ContentList,
  ContentSection,
  TokenTable,
} from '@/components/foundations/content-primitives';

export function EffectsContent() {
  return (
    <>
      <ContentSection title="Elevations">
        <p>
          Elevation, or shadow, adds depth and hierarchy to the interface by
          using shadow to separate elements from the background. It helps guide
          user focus and indicate layers of interaction. Elevation should be
          applied intentionally and consistently to avoid visual clutter.
        </p>

        <h3 className="text-sm font-semibold text-foreground">Guidelines</h3>
        <ContentList
          items={[
            'Use elevation tokens, not hardcoded box-shadow values.',
            'Elevation should reflect actual layering — tooltips and popovers sit higher than cards, which sit higher than the base surface. Don’t apply high elevation to flat, inline elements.',
            'Don’t use shadows decoratively. If an element isn’t functionally elevated (e.g. floating, overlaying content), it shouldn’t have a shadow.',
            'Avoid stacking shadows — if multiple elevated elements overlap, only the topmost should cast a shadow.',
            'In dark mode, elevation is often conveyed through surface lightness rather than shadow intensity. Let the tokens handle this automatically.',
            'Avoid shadows on cards, especially in dense dashboard layouts — they add visual noise and make the page feel cluttered.',
          ]}
        />

        <h3 className="text-sm font-semibold text-foreground">Tokens</h3>
        <TokenTable
          columns={['Token', 'Use']}
          rows={[
            [
              <code key="1">effect-shadow-sm</code>,
              'Tooltips, small floating labels',
            ],
            [
              <code key="2">effect-shadow-default</code>,
              'Menus, Dropdowns, Popovers, or floating panels and toolbars',
            ],
            [
              <code key="3">effect-shadow-lg</code>,
              'Drawers, Sheets, Side panels',
            ],
            [<code key="4">effect-shadow-xl</code>, 'Dialogs, Alert dialogs'],
          ]}
        />
      </ContentSection>

      <ContentSection title="Focus states">
        <p>
          Focus states, or rings, make interactive elements visible to keyboard
          and assistive technology users. They are not optional.
        </p>

        <h3 className="text-sm font-semibold text-foreground">Guidelines</h3>
        <ContentList
          items={[
            'Never remove or suppress focus styles — not even for aesthetic reasons.',
            'Don’t rely on color alone to show focus (always use a 2px stroke weight); the focus ring must be visible regardless of the element’s color or background.',
            'Focus styles are provided by Aura via primitives and tokens. Don’t override them unless you are replacing them with something that meets WCAG 2.1 AA contrast requirements.',
            'Custom interactive elements (anything not using an Aura component) must implement focus styles manually.',
            'Test focus order — it should follow a logical reading sequence and not jump unexpectedly around the page.',
          ]}
        />

        <h3 className="text-sm font-semibold text-foreground">Tokens</h3>

        <h4 className="text-sm font-semibold text-foreground">
          Default focus ring
        </h4>
        <TokenTable
          columns={['Token', 'Value', 'Description']}
          rows={[
            [
              <code key="1">ring + border-width/1</code>,
              '1px solid, #7081C7',
              'Color and stroke weight applied to inside stroke weight of the focus ring',
            ],
            [
              <code key="2">ring-muted + border-width/1</code>,
              '1px solid, #D0D6ED',
              'Color and stroke weight applied to outside stroke weight of the focus ring',
            ],
          ]}
        />

        <h4 className="text-sm font-semibold text-foreground">
          Validation focus ring
        </h4>
        <TokenTable
          columns={['Token', 'Value', 'Description']}
          rows={[
            [
              <code key="1">ring-destructive + border-width/1</code>,
              '1px solid, #CB0B2C',
              'Color and stroke weight applied to inside stroke weight of the focus ring',
            ],
            [
              <code key="2">ring-destructive-muted + border-width/1</code>,
              '1px solid, #FDDEE4',
              'Color and stroke weight applied to outside stroke weight of the focus ring',
            ],
          ]}
        />
      </ContentSection>
    </>
  );
}
