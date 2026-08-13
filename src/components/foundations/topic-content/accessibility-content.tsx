import {
  ContentList,
  ContentSection,
  TokenTable,
} from '@/components/foundations/content-primitives';

export function AccessibilityContent() {
  return (
    <>
      <ContentSection title="Baseline">
        <p>
          Accessible design benefits every user, not just those using assistive
          technology, and it&apos;s a shared responsibility across design,
          content, and engineering. The minimum standard for anything shipped
          with Aura is <strong className="text-foreground">WCAG 2.1 AA</strong>.
        </p>
      </ContentSection>

      <ContentSection title="Contrast and vision">
        <TokenTable
          columns={['Content', 'Minimum ratio']}
          rows={[
            ['Standard text', '4.5:1'],
            ['Large text (24px+, or 18px bold)', '3:1'],
          ]}
        />
        <p>
          Charts must be understandable without color alone — pair color with
          pattern or varied lightness.
        </p>
      </ContentSection>

      <ContentSection title="Interactive elements">
        <ContentList
          items={[
            <>
              Disabled components need a visual distinction beyond color, plus{' '}
              <code>aria-disabled=&quot;true&quot;</code>.
            </>,
            'Every interactive element needs a visible focus state.',
            'Keep at least 8px between interactive elements, and 44px minimum width/height for touch targets.',
          ]}
        />
      </ContentSection>

      <ContentSection title="Navigation and structure">
        <ContentList
          items={[
            'Keep navigation consistent across the interface so users can build a mental model of it.',
            'Follow a logical heading hierarchy (H1–H3) without skipping levels.',
            'Order content to match visual importance so it reads correctly in sequence.',
          ]}
        />
      </ContentSection>

      <ContentSection title="Communication">
        <ContentList
          items={[
            'Write error messages as a clear, actionable description in plain language.',
            <>
              Use descriptive link text (&quot;Learn more about
              accessibility&quot;) instead of generic text (&quot;click
              here&quot;).
            </>,
            <>
              Write inclusive labels — &quot;Full name&quot; over &quot;First /
              Last name&quot;.
            </>,
          ]}
        />
      </ContentSection>

      <ContentSection title="Media and technical standards">
        <ContentList
          items={[
            'Video needs captions; audio-only content needs a transcript.',
            'PDFs and downloadable files must support screen readers.',
            'Interfaces must work at 200% zoom without requiring horizontal scrolling.',
            <>
              Use semantic HTML (like <code>role=&quot;alert&quot;</code>) so
              assistive technology recognizes it automatically.
            </>,
          ]}
        />
      </ContentSection>
    </>
  );
}
