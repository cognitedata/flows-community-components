import {
  CategoryHeading,
  ContentList,
  ContentSection,
  TokenTable,
} from '@/components/foundations/content-primitives';

export function TypographyContent() {
  return (
    <>
      <ContentSection title="About">
        <p>
          Typography is foundational to creating clear, consistent, and
          accessible interfaces. Our system uses design tokens and a
          well-defined set of styles to ensure type is applied consistently
          across products, platforms, and teams.
        </p>
        <p>
          Typography tokens are predefined values that represent font properties
          like font family, size, weight, letter spacing and line height. Rather
          than using arbitrary values (e.g., setting{' '}
          <code>font-size: 17px</code>), tokens standardize how typography is
          applied across components and layouts. Using type tokens:
        </p>
        <ContentList
          items={[
            'Ensures consistency and scalability across the design system',
            'Makes it easier to implement updates or refinements system-wide',
            'Supports design–developer alignment through shared, meaningful naming conventions',
          ]}
        />
      </ContentSection>

      <ContentSection title="Typefaces">
        <TokenTable
          columns={['Token', 'Font', 'Use']}
          rows={[
            [
              <code key="1">--font-sans / --font-inter</code>,
              'Inter',
              'Main product copy — UI text, labels, and dense interfaces',
            ],
            [
              <code key="2">--font-mono</code>,
              'Source Code Pro',
              'Code blocks, technical strings, terminal output',
            ],
          ]}
        />
      </ContentSection>

      <ContentSection title="Type scale">
        <p>
          Styles are grouped by role: Text for product UI copy and Code for
          monospace technical content.
        </p>

        <CategoryHeading>Text</CategoryHeading>
        <p>Inter — main product typography.</p>
        <TokenTable
          columns={['Token', 'Description', 'Size', 'Line height', 'Weight']}
          rows={[
            [
              <code key="xxs-normal">xxs/normal</code>,
              'Metadata; short labels',
              '10px',
              '12px',
              'Regular',
            ],
            [
              <code key="xxs-medium">xxs/medium</code>,
              'Metadata; short labels; emphasized',
              '10px',
              '12px',
              'Medium',
            ],
            [
              <code key="xs-normal">xs/normal</code>,
              'Small captions & chart labels',
              '12px',
              '14px',
              'Regular',
            ],
            [
              <code key="xs-medium">xs/medium</code>,
              'Small captions & chart labels; emphasized',
              '12px',
              '14px',
              'Medium',
            ],
            [
              <code key="sm-normal">sm/normal</code>,
              'Secondary text, small labels',
              '14px',
              '18px',
              'Regular',
            ],
            [
              <code key="sm-medium">sm/medium</code>,
              'Secondary text, small labels; emphasized',
              '14px',
              '18px',
              'Medium',
            ],
            [
              <code key="base-normal">base/normal</code>,
              'Default body text',
              '16px',
              '20px',
              'Regular',
            ],
            [
              <code key="base-medium">base/medium</code>,
              'Default body text; emphasized',
              '16px',
              '20px',
              'Medium',
            ],
            [
              <code key="lg-normal">lg/normal</code>,
              'Large text, sub-headlines',
              '18px',
              '24px',
              'Regular',
            ],
            [
              <code key="lg-medium">lg/medium</code>,
              'Large text, sub-headlines; emphasized',
              '18px',
              '24px',
              'Medium',
            ],
            [
              <code key="xl-normal">xl/normal</code>,
              'Headlines, small titles',
              '20px',
              '24px',
              'Regular',
            ],
            [
              <code key="xl-medium">xl/medium</code>,
              'Headlines, small titles; emphasized',
              '20px',
              '24px',
              'Medium',
            ],
            [
              <code key="2xl-normal">2xl/normal</code>,
              'Page headers, titles',
              '24px',
              '28px',
              'Regular',
            ],
            [
              <code key="2xl-medium">2xl/medium</code>,
              'Page headers, titles; emphasized',
              '24px',
              '28px',
              'Medium',
            ],
            [
              <code key="3xl-normal">3xl/normal</code>,
              'Splash screens, onboarding or login',
              '30px',
              '32px',
              'Regular',
            ],
            [
              <code key="3xl-medium">3xl/medium</code>,
              'Splash screens, onboarding or login; emphasized',
              '30px',
              '32px',
              'Medium',
            ],
            [
              <code key="4xl-normal">4xl/normal</code>,
              'Splash screens, onboarding or login',
              '36px',
              '40px',
              'Regular',
            ],
            [
              <code key="4xl-medium">4xl/medium</code>,
              'Splash screens, onboarding or login; emphasized',
              '36px',
              '40px',
              'Medium',
            ],
            [
              <code key="5xl-normal">5xl/normal</code>,
              'Splash screens, onboarding or login',
              '48px',
              '44px',
              'Regular',
            ],
            [
              <code key="5xl-medium">5xl/medium</code>,
              'Splash screens, onboarding or login; emphasized',
              '48px',
              '44px',
              'Medium',
            ],
          ]}
        />

        <CategoryHeading>Code</CategoryHeading>
        <p>Source Code Pro — code blocks, snippets, and technical strings.</p>
        <TokenTable
          columns={['Token', 'Description', 'Size', 'Line height', 'Weight']}
          rows={[
            [
              <code key="sm">sm</code>,
              'Code blocks, snippets, and technical strings',
              '14px',
              '18px',
              'Regular',
            ],
            [
              <code key="md">md</code>,
              'Code blocks, snippets, and technical strings',
              '16px',
              '20px',
              'Regular',
            ],
            [
              <code key="lg">lg</code>,
              'Code blocks, snippets, and technical strings',
              '18px',
              '24px',
              'Regular',
            ],
          ]}
        />
      </ContentSection>
    </>
  );
}
