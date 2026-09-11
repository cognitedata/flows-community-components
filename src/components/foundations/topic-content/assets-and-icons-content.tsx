import {
  ContentList,
  ContentSection,
  SubHeading,
} from '@/components/foundations/content-primitives';

export function AssetsAndIconsContent() {
  return (
    <>
      <ContentSection title="Illustrations">
        <SubHeading>Usage</SubHeading>
        <p>
          Illustrations are a powerful communication tool, but only if you have
          something to say. When an illustration is simply ornamental, it can
          easily become overwhelming or distracting, and ultimately detracts
          from the overall experience of using the product. When used
          appropriately they can help lift the brand and offer a more memorable
          experience.
        </p>
        <p>
          Common places to use illustrations are Empty states, Onboarding
          modals, Product tours, announcements, or in Cards in place of an
          image. Use Solo Illustrations to communicate these concepts at a
          glance or to help simplify complex ideas.
        </p>
        <p>
          Screen readers read alt text for illustrations. Use alt text to
          communicate illustration meaning.
        </p>
      </ContentSection>

      <ContentSection title="Logos">
        <SubHeading>Usage</SubHeading>
        <p>
          Our logo is a key element of our brand identity and should be used
          thoughtfully to ensure clarity, consistency, and recognition across
          all digital products. It represents who we are, so maintaining its
          integrity and visibility is essential.
        </p>
        <p>
          In product interfaces, the logo is typically used in key areas such as
          navigation headers and login screens. It helps orient users and
          reinforces brand presence without overwhelming the experience. Always
          give the logo enough breathing room by respecting clear space
          guidelines, and ensure it is legible against any background.
        </p>
        <p>
          When incorporating the logo, use approved assets and maintain
          consistent sizing and placement. Avoid any modifications, including
          changes to color, proportion, or orientation, to preserve its visual
          integrity. Use vector formats like SVG for sharp rendering across
          screen sizes and resolutions.
        </p>

        <SubHeading>Accessibility</SubHeading>
        <ContentList
          items={[
            <>
              <strong className="text-foreground">Alt text:</strong> If the logo
              conveys important information (for example, a company name or acts
              as a link), include descriptive alt text such as &quot;CompanyName
              logo&quot; or &quot;Go to homepage&quot;.
            </>,
            <>
              <strong className="text-foreground">Decorative use:</strong> If
              the logo is purely decorative and conveys no functional meaning,
              use <code>alt=&quot;&quot;</code> so screen readers can skip it.
            </>,
            <>
              <strong className="text-foreground">Scalable formats:</strong> Use
              vector formats like SVG to ensure logos remain crisp and legible
              at all sizes, especially for users with magnifiers or on
              high-resolution screens.
            </>,
          ]}
        />
      </ContentSection>

      <ContentSection title="System icons">
        <p>
          System icons, or icons, are used to visually communicate core parts of
          the product and available actions. They can act as way-finding tools
          to help users easily understand where they are and identify common
          interaction patterns that are available.
        </p>
        <p>
          Icons have a default and recommended size of 16px × 16px. The
          following sizes may be used when nested inside components as a visual
          aid: 12px × 12px and 14px × 14px.
        </p>
        <ContentList
          items={[
            'Use with care. Overuse quickly results in user interfaces that are visually overwhelming or distracting.',
            'Icons themselves do not have interaction states, only their parent component.',
            "The system icon's name explains its use — please use as intended.",
            'Do not edit or combine the system icons in any way.',
            'System icons cannot have more than one color except for branded icons.',
          ]}
        />

        <SubHeading>Accessibility</SubHeading>
        <ContentList
          items={[
            'System icons are always a solid, monochromatic color and need to pass the same color contrast ratio as typography (4.5:1).',
            'Screen readers read alt text for system icons. Use alt text to communicate icon meaning.',
            'System icons must have a tooltip attached unless they have text that communicates what the icon is conveying.',
          ]}
        />
      </ContentSection>
    </>
  );
}
