import { CodeBlock, CodeBlockCopyButton } from '@cognite/aura/components';
import * as React from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import {
  Callout,
  CategoryHeading,
  ContentList,
  ContentSection,
  SubHeading,
  TokenTable,
} from '@/components/foundations/content-primitives';
import { SegmentedControl } from '@/components/ui/segmented-control';

export const CUSTOM_THEMING_INTRO =
  'How to apply customer brand colors to Aura in Figma and code — which token groups to customize, and how to override safely in Flows custom apps.';

const STYLES_BEFORE = `@import '@cognite/aura/styles.source.css';

@source '../node_modules/@cognite/aura/dist/components';
`;

const STYLES_AFTER = `@import '@cognite/aura/styles.source.css';

@source '../node_modules/@cognite/aura/dist/components';

:root {
  /* Custom brand tokens — light mode */
  --primary-background: #5B4FD9;
  --primary-background-hover: #4338CA;
  --primary-foreground: #FFFFFF;
  --secondary-background: #E2E4E6;
  --secondary-background-hover: #D5D8DB;
  --secondary-foreground: #33373A;
}

.dark {
  /* Custom brand tokens — dark mode */
  --primary-background: #8B7CF8;
  --primary-background-hover: #5B4FD9;
  --primary-foreground: #FFFFFF;
  --secondary-background: #33373A;
  --secondary-background-hover: #5C6369;
  --secondary-foreground: #D5D8DB;
}
`;

const SCOPED_OVERRIDES = `[data-app="my-app"] {
  --primary-background: #5B4FD9;
  --secondary-background: #E2E4E6;
}
`;

function DocLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="text-link-fg hover:text-link-fg-hover hover:underline"
    >
      {children}
    </Link>
  );
}

function CssBlock({ code }: { code: string }) {
  return (
    <CodeBlock code={code} language="css">
      <CodeBlockCopyButton />
    </CodeBlock>
  );
}

function StylesCssExample() {
  const [version, setVersion] = React.useState<'after' | 'before'>('after');

  return (
    <div>
      <SegmentedControl
        className="mb-4 w-full"
        options={[
          { value: 'after', label: 'src/styles.css (After)' },
          { value: 'before', label: 'src/styles.css (Before)' },
        ]}
        value={version}
        onChange={setVersion}
      />
      <CssBlock code={version === 'after' ? STYLES_AFTER : STYLES_BEFORE} />
    </div>
  );
}

export function CustomThemingContent() {
  return (
    <>
      <div className="mb-12 max-w-[70ch] space-y-4 text-sm leading-relaxed text-muted-fg sm:mb-14">
        <p>
          Aura&apos;s token system is designed to be used as-is for the vast
          majority of use cases. Tokens are centrally maintained and
          contrast-tested across themes. By using the defaults, consuming
          applications automatically receive proper theming, accessibility
          compliance, and future design updates.
        </p>
        <p>
          Some scenarios still require extending or overriding these defaults —
          typically when building a Flows custom app that needs a
          customer-facing brand on top of Aura defaults.
        </p>
        <Callout variant="warning">
          Do not customize styling for Cognite Data Fusion (CDF) native apps.
          Cognite is developing a solution that will enable global theming
          across all of CDF.
        </Callout>
      </div>

      <ContentSection title="Customization priorities">
        <p>
          Builders can customize every color token, but not every group needs to
          change for a successful rebrand. Work through these priorities in
          order.
        </p>
        <TokenTable
          columns={['Priority', 'Token groups', 'Guidance']}
          rows={[
            [
              'Recommended',
              <code key="brand">primary-*, secondary-*, ring-*, link-*</code>,
              'Brand colors — highest impact for CTAs, selected states, and toggled UI',
            ],
            [
              'Recommended',
              <code key="decorative">decorative-1–decorative-7</code>,
              'Accent colors for tags, avatars, and badges — override background, hover, and foreground together',
            ],
            [
              'Optional',
              <code key="chart">chart-*, heatmap-*</code>,
              'Data visualizations',
            ],
            [
              'Optional',
              <code key="status">
                success-*, warning-*, critical-*, info-*, destructive-*,
                neutral-*
              </code>,
              'Status colors — not required for rebrand; stay within each hue family if changed',
            ],
            [
              'Rarely needed',
              <code key="neutrals">
                base-*, muted-*, medium-*, popover-*, card-*, border-*
              </code>,
              'Neutral tuning — shift the UI warmer or cooler using gray ramps',
            ],
          ]}
        />
        <p>
          For resolved values and usage notes for every token, see{' '}
          <DocLink to="/aura/foundations/color-tokens">Color</DocLink>.
        </p>
      </ContentSection>

      <ContentSection title="For designers">
        <SubHeading>Before you override anything</SubHeading>
        <p>Ask these questions first:</p>
        <ContentList
          items={[
            <>
              Does an existing token cover this use case? Check{' '}
              <DocLink to="/aura/foundations/color-tokens">Color</DocLink>.
            </>,
            'Is this a product-specific need or a system gap? If it feels like a system gap, raise it with Cognite.',
            'Will this hold up in both light and dark mode? Overrides that only work in one theme are a red flag.',
          ]}
        />
        <p>Aura&apos;s color system has two tiers:</p>
        <ContentList
          items={[
            <>
              <strong className="text-foreground">Ramps</strong> — raw hue
              scales (for example <code>fjord-500</code>,{' '}
              <code>mountain-950</code>) that progress evenly in lightness.
            </>,
            <>
              <strong className="text-foreground">Semantic tokens</strong> —
              named roles (for example <code>primary/background</code>,{' '}
              <code>base/foreground</code>) that map to ramp steps and swap
              between light and dark mode automatically.
            </>,
          ]}
        />
        <p>When customizing for a customer brand:</p>
        <ContentList
          items={[
            'Apply tokens as sets. Most groups include matching background, background-hover, and foreground tokens — override them together so contrast stays intact.',
            'Never put raw hex on semantic tokens. Alias each semantic token to a step on your local brand ramp in Figma.',
            'Keep Cognite Light and Dark modes as reference. Add separate brand modes (for example your-org-Light and your-org-Dark) in a local variable collection rather than editing the published Aura library.',
            'Work in this order: Primary and Secondary → Decorative → Feedback and status → Neutrals.',
          ]}
        />
      </ContentSection>

      <ContentSection title="Figma workflow">
        <ol className="list-decimal space-y-1.5 pl-5">
          <li>Enable the Aura community file as a library in your project.</li>
          <li>
            Create a local variable collection for brand ramps (primary,
            secondary, optional decorative and neutral hues). Match Aura&apos;s
            step naming — 10, 50, 100 … 950.
          </li>
          <li>
            Add brand Light and Dark modes alongside the Cognite reference
            modes.
          </li>
          <li>
            In your brand modes only, re-alias semantic tokens to your ramp
            steps — starting with <code>primary/*</code> and{' '}
            <code>secondary/*</code>.
          </li>
        </ol>
        <p>
          Code implementation uses CSS variable overrides in{' '}
          <code>src/styles.css</code>. A skill is in development to help
          translate Figma customizations to code automatically. Until then,
          share aliased token names with developers so they can add matching
          overrides.
        </p>
      </ContentSection>

      <ContentSection title="For developers">
        <p>Follow these rules for safe overrides:</p>
        <ContentList
          items={[
            "Scope to your app's root element or a specific component — never override globally outside your app.",
            <>
              Override both light (<code>:root</code>) and dark (
              <code>.dark</code>) values for theme-sensitive tokens.
            </>,
            'Test contrast in both themes before shipping.',
            'Document the override and the reason in your codebase.',
          ]}
        />
      </ContentSection>

      <ContentSection title="Applying a custom theme">
        <p>
          Define token overrides centrally in <code>src/styles.css</code> so
          they cascade to all Aura components.
        </p>
        <StylesCssExample />
      </ContentSection>

      <ContentSection title="Scoped CSS variable overrides">
        <p>
          If overrides apply only to part of your app, use a scoped selector
          instead of <code>:root</code>:
        </p>
        <CssBlock code={SCOPED_OVERRIDES} />
      </ContentSection>

      <ContentSection title="Color tokens to customize">
        <p>
          Tokens are grouped by semantic role, matching the{' '}
          <DocLink to="/aura/foundations/color-tokens">Color</DocLink>{' '}
          reference. Override related background, hover, and foreground tokens
          together.
        </p>

        <CategoryHeading>Primary (brand) — Recommended</CategoryHeading>
        <p>
          The primary brand color. Reserved for emphasis and interaction — main
          CTAs and selected states in checkboxes, tabs, radio buttons, and
          switches. Do not use for general neutral UI.
        </p>
        <TokenTable
          columns={['CSS variable', 'Override when']}
          rows={[
            [
              <code key="primary-bg">--primary-background</code>,
              'Primary action buttons and key CTAs',
            ],
            [
              <code key="primary-bg-hover">--primary-background-hover</code>,
              'Hover on primary actions',
            ],
            [
              <code key="primary-fg">--primary-foreground</code>,
              'Text and icons on primary surfaces',
            ],
            [
              <code key="primary-fixed">--primary-background-fixed-dark</code>,
              'Primary surfaces locked to light in both themes',
            ],
            [
              <code key="primary-fixed-hover">
                --primary-background-hover-fixed-dark
              </code>,
              'Hover on fixed-dark primary surfaces',
            ],
            [
              <code key="primary-fixed-fg">
                --primary-foreground-fixed-dark
              </code>,
              'Text/icons on fixed-dark primary surfaces',
            ],
            [
              <code key="ring-default">--ring-default</code>,
              'Focus state for interactive elements with keyboard navigation, generally reflects brand color',
            ],
            [
              <code key="ring-muted">--ring-muted</code>,
              'Focus state for interactive elements with keyboard navigation, generally reflects brand color',
            ],
            [
              <code key="link">
                --link-foreground, --link-foreground-hover
              </code>,
              'Must be a different color from standard text color, often blue or associated with brand color',
            ],
          ]}
        />

        <CategoryHeading>Secondary (brand) — Recommended</CategoryHeading>
        <p>
          The secondary brand color. Used for secondary CTAs and toggled or
          selected states — toggle buttons, selected list items, selected cards.
        </p>
        <TokenTable
          columns={['CSS variable', 'Override when']}
          rows={[
            [
              <code key="secondary-bg">--secondary-background</code>,
              'Secondary buttons and switch backgrounds',
            ],
            [
              <code key="secondary-bg-hover">
                --secondary-background-hover
              </code>,
              'Hover on secondary surfaces',
            ],
            [
              <code key="secondary-fg">--secondary-foreground</code>,
              'Text and icons on secondary surfaces',
            ],
            [
              <code key="secondary-fixed">
                --secondary-background-fixed-dark
              </code>,
              'Secondary surfaces locked to dark in both themes',
            ],
            [
              <code key="secondary-fixed-hover">
                --secondary-background-hover-fixed-dark
              </code>,
              'Hover on fixed-dark secondary surfaces',
            ],
            [
              <code key="secondary-fixed-fg">
                --secondary-foreground-fixed-dark
              </code>,
              'Text/icons on fixed-dark secondary surfaces',
            ],
          ]}
        />

        <CategoryHeading>Decorative — Recommended</CategoryHeading>
        <p>
          Accent colors for avatars, badges, and visual differentiation — no
          status meaning. Override each numbered group (decorative/1 through
          decorative/7) as a set.
        </p>
        <TokenTable
          columns={['CSS variable pattern', 'Override when']}
          rows={[
            [
              <code key="dec-bg">--decorative-{'{n}'}-background</code>,
              'Fill for decorative accent n',
            ],
            [
              <code key="dec-bg-hover">
                --decorative-{'{n}'}-background-hover
              </code>,
              'Hover on decorative accent n',
            ],
            [
              <code key="dec-fg">--decorative-{'{n}'}-foreground</code>,
              'Text/icons on decorative accent n',
            ],
          ]}
        />
        <p>
          Replace <code>{'{n}'}</code> with 1–7. See{' '}
          <DocLink to="/aura/foundations/color-tokens#theme-tokens">
            Decorative
          </DocLink>{' '}
          for default values.
        </p>

        <CategoryHeading>Feedback and status — Optional</CategoryHeading>
        <p>
          Semantic colors for alerts, banners, badges, and toasts. Not required
          for a successful rebrand. If you change them, keep each token within
          its intended hue family — warning should still read as warning.
        </p>
        <TokenTable
          columns={['Group', 'CSS variable examples']}
          rows={[
            [
              'Success',
              <code key="success">
                --success-background, --success-foreground
              </code>,
            ],
            [
              'Warning',
              <code key="warning">
                --warning-background, --warning-foreground
              </code>,
            ],
            [
              'Critical',
              <code key="critical">
                --critical-background, --critical-foreground,
                --ring-critical-default, --ring-critical-muted
              </code>,
            ],
            [
              'Info',
              <code key="info">--info-background, --info-foreground</code>,
            ],
            [
              'Destructive',
              <code key="destructive">
                --destructive-background, --destructive-foreground
              </code>,
            ],
            [
              'Neutral',
              <code key="neutral">
                --neutral-background, --neutral-foreground
              </code>,
            ],
          ]}
        />

        <CategoryHeading>Neutrals — Optional</CategoryHeading>
        <p>
          Shift the UI warmer or cooler by overriding neutral layers. Use
          Cognite defaults as a contrast and lightness guide — your grays should
          follow the same relative steps on your chosen neutral ramp.
        </p>
        <TokenTable
          columns={['Group', 'CSS variable examples']}
          rows={[
            [
              'Base',
              <code key="base">--base-background, --base-foreground</code>,
            ],
            [
              'Muted',
              <code key="muted">--muted-background, --muted-foreground</code>,
            ],
            [
              'Medium',
              <code key="medium">
                --medium-background, --medium-foreground
              </code>,
            ],
            [
              'Border',
              <code key="border">
                --border-default, --border-emphasized, --border-disabled
              </code>,
            ],
          ]}
        />

        <CategoryHeading>Chart & heatmap — Optional</CategoryHeading>
        <p>
          Chart and heatmap colors are only used for data visualizations. Chart
          colors often use an extension of the decorative brand palette.
          Preferred chart colors start with <code>chart-1-450</code> and
          decrease in step as more colors in the same hue are needed.
        </p>
        <TokenTable
          columns={['CSS variable pattern', 'Override when']}
          rows={[
            [
              <code key="chart-50">--chart-{'{n}'}-50</code>,
              'Fill for decorative chart color n',
            ],
            [
              <code key="chart-100">--chart-{'{n}'}-100</code>,
              'Fill for decorative chart color n',
            ],
            [
              <code key="chart-200">--chart-{'{n}'}-200</code>,
              'Fill for decorative chart color n',
            ],
            [
              <code key="chart-300">--chart-{'{n}'}-300</code>,
              'Fill for decorative chart color n',
            ],
            [
              <code key="chart-400">--chart-{'{n}'}-400</code>,
              'Fill for decorative chart color n',
            ],
            [
              <code key="chart-450">--chart-{'{n}'}-450</code>,
              'Fill for decorative chart color n',
            ],
            [
              <code key="heat-intense">--heat-map-intense</code>,
              'Fill for strongest, most saturated heat map color',
            ],
            [
              <code key="heat-strong">--heat-map-strong</code>,
              'Fill for second strongest heat map color',
            ],
            [
              <code key="heat-moderate">--heat-map-moderate</code>,
              'Fill for third strongest heat map color',
            ],
            [
              <code key="heat-mild">--heat-map-mild</code>,
              'Fill for fourth strongest heat map color',
            ],
          ]}
        />
        <p>
          Replace <code>{'{n}'}</code> with 1–5.
        </p>
        <p>
          Chart tokens use semi-transparent ramp values for data visualization
          series. Override only when remapping chart colors to a customer
          palette. See{' '}
          <DocLink to="/aura/foundations/color-tokens#theme-tokens">
            Chart
          </DocLink>{' '}
          for the full series list.
        </p>
        <p>
          See{' '}
          <DocLink to="/aura/foundations/color-tokens#theme-tokens">
            Color theme tokens
          </DocLink>{' '}
          for the full list per group.
        </p>
      </ContentSection>

      <ContentSection title="Building custom components">
        <p>
          When your requirements fall outside the scope of existing Aura
          components, you may need to build custom UI elements. To maintain
          system stability and visual consistency, follow these guidelines.
        </p>

        <SubHeading>File structure</SubHeading>
        <ContentList
          items={[
            <>
              Custom components: Place in <code>src/components/common/</code>.
            </>,
            <>
              Static assets (images, icons): Place in <code>src/assets/</code>.
            </>,
          ]}
        />

        <SubHeading>Extend Aura primitives</SubHeading>
        <p>
          Whenever possible, build custom components by composing Aura
          primitives (such as Button, Card, and Input) rather than writing raw
          HTML and custom CSS from scratch.
        </p>
        <p>Benefits of extending Aura primitives:</p>
        <ContentList
          items={[
            <>
              <strong className="text-foreground">Automatic theming</strong> —
              Components built with Aura primitives inherit your custom design
              tokens. Updates to <code>src/styles.css</code> apply
              automatically.
            </>,
            <>
              <strong className="text-foreground">
                Built-in accessibility
              </strong>{' '}
              — Primitives include baseline ARIA roles and keyboard navigation.
            </>,
            <>
              <strong className="text-foreground">Upgrade compatibility</strong>{' '}
              — Custom components inherit updates to the Aura design system,
              reducing maintenance overhead.
            </>,
          ]}
        />
      </ContentSection>

      <ContentSection title="Related resources">
        <ContentList
          items={[
            <DocLink key="color" to="/aura/foundations/color-tokens">
              Color
            </DocLink>,
            <DocLink key="about" to="/aura/documentation/about-aura">
              About Aura
            </DocLink>,
            <DocLink key="foundations" to="/aura/foundations/design-heuristics">
              Exploring Aura foundations
            </DocLink>,
          ]}
        />
      </ContentSection>
    </>
  );
}
