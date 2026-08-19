import {
  ContentList,
  ContentSection,
  DoDontGrid,
} from '@/components/foundations/content-primitives';

export function AccordionContent() {
  return (
    <>
      <ContentSection title="When to use">
        <ContentList
          items={[
            <>
              <strong className="text-foreground">
                Settings or configuration panels:
              </strong>{' '}
              group related settings and let users expand only the group
              they&apos;re changing.
            </>,
            <>
              <strong className="text-foreground">Long forms:</strong> split a
              form with more than ~2 logical groups into collapsible sections so
              the first screen isn&apos;t intimidating.
            </>,
            <>
              <strong className="text-foreground">FAQ / help content:</strong>{' '}
              one question per AccordionItem,{' '}
              <code>type=&quot;single&quot; collapsible</code> so only one
              answer is visible at a time.
            </>,
            <>
              <strong className="text-foreground">Nested hierarchies:</strong>{' '}
              folders, threaded comments, or any structure with a natural
              parent/child relationship where children are opt-in reading.
            </>,
          ]}
        />
      </ContentSection>

      <ContentSection title="When to use something else">
        <ContentList
          items={[
            <>
              <strong className="text-foreground">
                All content must be visible or compared side-by-side at once:
              </strong>{' '}
              use a plain list, Card, or Data Grid instead — hiding content that
              users need to compare across sections causes errors.
            </>,
            <>
              <strong className="text-foreground">
                Content is short enough to read in place
              </strong>{' '}
              (under ~3 lines collapsed + expanded, combined): don&apos;t hide
              it behind a trigger — use typography and grouping instead.
            </>,
            <>
              <strong className="text-foreground">
                Users need to switch between a small, fixed set of views
                repeatedly:
              </strong>{' '}
              use Tabs or Segmented Control — repeatedly expanding/collapsing
              the same two or three sections is more error-prone than switching
              between persistent tabs.
            </>,
          ]}
        />
      </ContentSection>

      <ContentSection title="Composition rules">
        <ContentList
          items={[
            'Form controls (Input, Select, Checkbox, etc.) are commonly placed inside AccordionContent for settings-panel use cases.',
            "A Separator between AccordionItems is redundant — AccordionItem already renders its own bottom border; don't add one manually.",
            "Don't nest an Accordion inside another Accordion's AccordionContent. Nothing in the types prevents this, but two independent expand/collapse interactions stacked on top of each other is disorienting — if content needs two levels of disclosure, restructure it as a single accordion with clearer section titles instead.",
          ]}
        />
      </ContentSection>

      <ContentSection title="Dos and don'ts">
        <DoDontGrid
          dos={[
            "Write trigger text that fully describes what's inside — a user scanning collapsed titles should be able to predict the content without opening it.",
            'Default-open the single most relevant section when one exists (defaultValue), rather than starting with everything collapsed.',
          ]}
          donts={[
            'Mix icon and no-icon triggers within one Accordion instance.',
            'Nest Accordion inside AccordionContent.',
            'Use type="multiple" by default — only switch to it when users genuinely need two or more sections open simultaneously; defaulting to it defeats the space-saving purpose of the component.',
          ]}
        />
      </ContentSection>

      <ContentSection title="Related components">
        <ContentList
          items={[
            'Card — use instead when everything must be visible at once.',
            'Data Grid — use instead for dense, comparable, tabular content rather than free-form collapsible sections.',
            'Tabs — use instead when users repeatedly switch between a small, fixed set of views rather than reading sections in sequence.',
            'Segmented Control — same reasoning as Tabs, for view-switching rather than progressive disclosure.',
          ]}
        />
      </ContentSection>
    </>
  );
}
