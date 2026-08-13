import { ContentSection, TokenTable } from "@/components/foundations/content-primitives";

export function TypographyContent() {
  return (
    <>
      <ContentSection title="Typefaces">
        <p>Aura uses two typefaces, each with a dedicated design token:</p>
        <TokenTable
          columns={["Token", "Typeface", "Use"]}
          rows={[
            [
              <code key="1">--font-sans</code>,
              "Inter",
              "UI text, labels, and dense interfaces — the default everywhere.",
            ],
            [
              <code key="2">--font-mono</code>,
              "Source Code Pro",
              "Code blocks, technical strings, and terminal output.",
            ],
          ]}
        />
      </ContentSection>

      <ContentSection title="Text scale">
        <p>
          The Inter scale spans 20 predefined styles, grouped by role. Line height scales
          proportionally with size, and every step has a regular and medium weight variant.
        </p>
        <TokenTable
          columns={["Range", "Size", "Typical use"]}
          rows={[
            ["xxs – sm", "10–14px", "Metadata, labels, secondary text."],
            ["base – lg", "16–18px", "Body copy and sub-headlines."],
            ["xl – 5xl", "20–48px", "Headlines and splash content."],
          ]}
        />
      </ContentSection>

      <ContentSection title="Code scale">
        <p>Source Code Pro comes in three sizes, all set in regular weight:</p>
        <TokenTable
          columns={["Size", "Font size", "Line height"]}
          rows={[
            ["Small", "14px", "18px"],
            ["Medium", "16px", "20px"],
            ["Large", "18px", "24px"],
          ]}
        />
      </ContentSection>

      <ContentSection title="Applying tokens">
        <p>
          Reach for the size that matches the text&apos;s role before reaching for one that
          matches its visual weight — a label should stay a label-sized token even if it needs to
          stand out, styled with weight or color instead of jumping up a size step.
        </p>
      </ContentSection>
    </>
  );
}
