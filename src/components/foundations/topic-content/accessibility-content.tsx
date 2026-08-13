import {
  ContentList,
  ContentSection,
  SubHeading,
} from '@/components/foundations/content-primitives';

export function AccessibilityContent() {
  return (
    <>
      <ContentSection title="About">
        <p>
          Accessibility ensures users of all abilities can understand, navigate,
          interact with, and contribute to our interfaces meaningfully.
          It&apos;s not just the right thing to do — accessible design is better
          design for everyone.
        </p>
        <p>
          Both Aura and product teams should strive to meet{' '}
          <strong className="text-foreground">WCAG 2.1 AA</strong> as a minimum
          standard. Accessibility is a shared responsibility across design,
          content, and engineering.
        </p>

        <SubHeading>Acronyms used in this section</SubHeading>
        <ContentList
          items={[
            <>
              <strong className="text-foreground">WCAG</strong> — Web Content
              Accessibility Guidelines
            </>,
            <>
              <strong className="text-foreground">WAI-ARIA</strong> — Web
              Accessibility Initiative – Accessible Rich Internet Applications
            </>,
          ]}
        />
      </ContentSection>

      <ContentSection title="Contrast">
        <ContentList
          items={[
            'Informative content (text, images, graphs, buttons) must meet a minimum contrast ratio of 4.5:1 — the WCAG AA standard for readability.',
            'Large text (24px and above, or 18px bold) can use a reduced ratio of 3.0:1.',
            'When Aura color tokens are used correctly, the contrast ratio is automatically met.',
          ]}
        />
      </ContentSection>

      <ContentSection title="Disabled states">
        <ContentList
          items={[
            'Disabled components must be visually distinct from active states — not just through color alone.',
            <>
              They should remain focusable for assistive technology users, with{' '}
              <code>aria-disabled=&quot;true&quot;</code> to communicate
              non-interactivity.
            </>,
            'Where possible, avoid disabled states. Otherwise, help users understand why something is disabled and how to enable it.',
          ]}
        />
      </ContentSection>

      <ContentSection title="Documents">
        <ContentList
          items={[
            'Downloadable files (PDF, Word, PowerPoint) must be structured, labeled, and formatted to support screen readers and other assistive technologies.',
          ]}
        />
      </ContentSection>

      <ContentSection title="Focus states">
        <ContentList
          items={[
            "Always provide visible focus states for interactive elements using Aura's focus styling.",
            <>
              See the{' '}
              <a
                href="https://docs.cognite.com/aura-design-system/foundations/interaction-states#focus-states"
                target="_blank"
                rel="noopener noreferrer"
                className="text-link-fg hover:text-link-fg-hover hover:underline"
              >
                Interaction states
              </a>{' '}
              page for visual references.
            </>,
          ]}
        />
      </ContentSection>

      <ContentSection title="Graphs and data visualizations">
        <ContentList
          items={[
            'Charts and graphs must be understandable in black and white — this supports users with color blindness or low vision.',
            'Where color is essential, vary both hue and lightness to create contrast, and supplement with patterns, textures, or labels to differentiate data points.',
          ]}
        />
      </ContentSection>

      <ContentSection title="Labels">
        <ContentList
          items={[
            'Never rely on color alone to convey information. Use descriptive text to clarify actions and purpose.',
            <>
              Use inclusive field labels. For example, we prefer &quot;Full
              name&quot; over splitting into &quot;First name&quot; and
              &quot;Last name&quot; to accommodate diverse naming conventions.
            </>,
          ]}
        />
      </ContentSection>

      <ContentSection title="Links">
        <ContentList
          items={[
            'Links should be identifiable by more than color — use underlines with proper link-foreground color token.',
            <>
              Link text should be descriptive: &quot;Learn more about
              accessibility&quot; rather than &quot;click here.&quot;
            </>,
          ]}
        />
      </ContentSection>

      <ContentSection title="Navigation">
        <ContentList
          items={[
            'Navigation should be consistent across the entire interface so users can build a mental model of how to get around.',
            'Headers, footers, and key navigation elements should follow the same structure across pages.',
          ]}
        />
      </ContentSection>

      <ContentSection title="Semantic alerts">
        <ContentList
          items={[
            <>
              Error messages must include a clear, actionable description in
              plain language. For example: &quot;Please enter a valid email
              address in the format user@example.com&quot; rather than just
              &quot;Invalid email.&quot;
            </>,
            <>
              Use semantic HTML (for example,{' '}
              <code>{'<div role="alert">'}</code>) so errors and alerts are
              recognized by screen readers.
            </>,
          ]}
        />
      </ContentSection>

      <ContentSection title="Spacing">
        <ContentList
          items={[
            'Leave at least 8px between interactive elements to prevent accidental clicks.',
            'Touch targets should be at least 44px in either width or height.',
          ]}
        />
      </ContentSection>

      <ContentSection title="Text hierarchy and headings">
        <ContentList
          items={[
            'Use a consistent, meaningful heading hierarchy (H1, H2, H3) across all interfaces.',
            "Don't skip heading levels — screen reader users rely on heading structure to navigate content.",
          ]}
        />
      </ContentSection>

      <ContentSection title="User zoom">
        <ContentList
          items={[
            'Interfaces must remain functional when zoomed to 200%, in line with WCAG standards.',
            'Text and interactive elements should resize without breaking layout or requiring horizontal scrolling. Vertical scrolling is acceptable.',
          ]}
        />
      </ContentSection>

      <ContentSection title="Video and audio">
        <ContentList
          items={[
            'All video content must include captions for spoken dialogue and relevant sounds.',
            'Audio-only content should include a transcript for users who cannot listen or prefer to read.',
          ]}
        />
      </ContentSection>

      <ContentSection title="Visual order and importance">
        <ContentList
          items={[
            'Place content on the page in order of importance so users can find critical information without searching.',
            'Ensure content follows a logical reading order for screen reader users.',
          ]}
        />
      </ContentSection>
    </>
  );
}
