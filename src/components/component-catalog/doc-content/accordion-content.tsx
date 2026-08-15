import {
  Callout,
  CategoryHeading,
  ContentList,
  ContentSection,
  DoDontGrid,
  SubHeading,
  TokenTable,
} from '@/components/foundations/content-primitives';

export function AccordionContent() {
  return (
    <>
      <ContentSection title="About">
        <p>
          An Accordion progressively discloses content by letting users expand
          or collapse titled sections, one interaction at a time, so a page can
          show a lot of information without all of it being visible at once.
        </p>
        <Callout variant="info">
          Source of truth: <code>@cognite/aura/components/accordion</code>. This
          repo&apos;s own local registry copy of Accordion is a simplified
          stand-in and doesn&apos;t match the API described below (no{' '}
          <code>type</code>/<code>collapsible</code> union, no <code>icon</code>{' '}
          prop) — don&apos;t generate code against it.
        </Callout>
      </ContentSection>

      <ContentSection title="Anatomy">
        <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm">
          <code>{`Accordion
└── AccordionItem (one per section, requires a unique \`value\`)
    ├── AccordionTrigger (the clickable header; optional leading \`icon\`)
    └── AccordionContent (the collapsible body)`}</code>
        </pre>
        <p>
          <code>AccordionTrigger</code> and <code>AccordionContent</code> are
          context-coupled to their nearest <code>AccordionItem</code> ancestor —
          they read which item they belong to from context, not from a prop.
        </p>
      </ContentSection>

      <ContentSection title="Props reference">
        <SubHeading>
          Accordion — <code>type=&quot;single&quot;</code> (default)
        </SubHeading>
        <TokenTable
          columns={['Prop', 'Type', 'Default', 'Required']}
          rows={[
            [<code key="1">type</code>, "'single'", "'single'", 'No'],
            [<code key="2">collapsible</code>, 'boolean', 'false', 'No'],
            [
              <code key="3">value</code>,
              'string',
              '— (uncontrolled if omitted)',
              'No',
            ],
            [<code key="4">defaultValue</code>, 'string', '—', 'No'],
            [
              <code key="5">onValueChange</code>,
              '(value: string) => void',
              '—',
              'No',
            ],
            [<code key="6">disabled</code>, 'boolean', 'false', 'No'],
          ]}
        />

        <SubHeading>
          Accordion — <code>type=&quot;multiple&quot;</code>
        </SubHeading>
        <TokenTable
          columns={['Prop', 'Type', 'Default', 'Required']}
          rows={[
            [
              <code key="1">type</code>,
              "'multiple'",
              '—',
              'Yes (must be set explicitly)',
            ],
            [
              <code key="2">value</code>,
              'string[]',
              '— (uncontrolled if omitted)',
              'No',
            ],
            [<code key="3">defaultValue</code>, 'string[]', '—', 'No'],
            [
              <code key="4">onValueChange</code>,
              '(value: string[]) => void',
              '—',
              'No',
            ],
            [<code key="5">disabled</code>, 'boolean', 'false', 'No'],
          ]}
        />
        <p>
          The two shapes are enforced by TypeScript as a real discriminated
          union — passing a <code>string[]</code> <code>value</code> while{' '}
          <code>type=&quot;single&quot;</code>, or a bare <code>string</code>{' '}
          while <code>type=&quot;multiple&quot;</code>, is a compile error.
          There is no <code>collapsible</code> prop under{' '}
          <code>type=&quot;multiple&quot;</code> — each item already
          opens/closes independently.
        </p>

        <SubHeading>AccordionItem</SubHeading>
        <TokenTable
          columns={['Prop', 'Type', 'Default', 'Required']}
          rows={[
            [<code key="1">value</code>, 'string', '—', 'Yes'],
            [
              <code key="2">disabled</code>,
              'boolean',
              'inherited from Accordion.disabled',
              'No',
            ],
          ]}
        />

        <SubHeading>AccordionTrigger</SubHeading>
        <TokenTable
          columns={['Prop', 'Type', 'Default', 'Required']}
          rows={[
            [
              <code key="1">icon</code>,
              'Icon (any Tabler icon component)',
              '— (no icon)',
              'No',
            ],
            [
              <code key="2">children</code>,
              'React.ReactNode',
              '—',
              'Yes (the trigger label)',
            ],
          ]}
        />
        <p>
          Rendering order is fixed: <code>icon</code> (if provided) → label →
          chevron. The chevron is always present and cannot be removed or
          replaced via props.
        </p>

        <SubHeading>AccordionContent</SubHeading>
        <TokenTable
          columns={['Prop', 'Type', 'Default', 'Required']}
          rows={[
            [<code key="1">children</code>, 'React.ReactNode', '—', 'Yes'],
            [
              <code key="2">className</code>,
              'string',
              '—',
              'No (applied to the inner padded wrapper)',
            ],
          ]}
        />
      </ContentSection>

      <ContentSection title="States and variants">
        <CategoryHeading>
          <code>type=&quot;single&quot;</code> vs.{' '}
          <code>type=&quot;multiple&quot;</code>
        </CategoryHeading>
        <p>
          Use <code>type=&quot;multiple&quot;</code> when users need to compare
          content across sections while both stay open (e.g. checking two
          settings groups against each other). Use{' '}
          <code>type=&quot;single&quot;</code> (the default) everywhere else —
          it keeps the page short by construction, since opening a new section
          always closes the previous one.
        </p>

        <CategoryHeading>
          <code>collapsible</code> (single mode only)
        </CategoryHeading>
        <ContentList
          items={[
            <>
              Set <code>collapsible</code> when the accordion must support
              &quot;all sections closed&quot; as a valid state — mobile layouts,
              or any accordion where every section is optional reading.
            </>,
            <>
              Leave <code>collapsible</code> at its default (<code>false</code>)
              when the product requires exactly one section to always be open —
              e.g. a required settings group where &quot;nothing selected&quot;
              isn&apos;t a valid configuration state. Pair this with a{' '}
              <code>defaultValue</code> pointing at the sensible default
              section.
            </>,
          ]}
        />

        <CategoryHeading>
          <code>AccordionItem.disabled</code> (per item)
        </CategoryHeading>
        <Callout variant="warning">
          Open question — no product answer exists yet for what should cause a
          single section (not the whole accordion) to be disabled, e.g. a
          permission-gated section. Prefer omitting the section entirely, or
          showing it read-only, until this is decided for your surface.
        </Callout>

        <CategoryHeading>
          <code>icon</code>
        </CategoryHeading>
        <p>
          If any trigger in an Accordion instance has an <code>icon</code>,
          every trigger in that same instance must have one — never mix icon and
          no-icon triggers within one accordion.
        </p>
      </ContentSection>

      <ContentSection title="Accessibility">
        <SubHeading>Guaranteed by the component</SubHeading>
        <ContentList
          items={[
            'Every trigger renders as a native <button>.',
            <>
              <code>aria-expanded</code> is set on the trigger and flips with
              open/closed state.
            </>,
            <>
              When <code>Accordion.disabled</code> is set, every trigger
              receives <code>aria-disabled</code>, <code>data-disabled</code>,
              and/or the native <code>disabled</code> attribute.
            </>,
            'Keyboard activation (Enter/Space) works because triggers are native buttons — no custom key handling required from the consumer.',
          ]}
        />
        <SubHeading>On the consumer</SubHeading>
        <ContentList
          items={[
            "If AccordionContent holds information a screen-reader user must be able to reach via in-page search (browser Ctrl+F), don't render that content conditionally in JS after the panel opens — keep it in the DOM so find-in-page and AT can reach it even while collapsed.",
            "Trigger label text must describe the section's content on its own — screen reader users navigating by heading/button list won't see surrounding page context.",
          ]}
        />
      </ContentSection>

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

      <ContentSection title="Code example">
        <p>Single, collapsible, default:</p>
        <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm">
          <code>{`<Accordion type="single" collapsible className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
</Accordion>`}</code>
        </pre>

        <p className="mt-4">
          With leading icons (every trigger has one, per the rule above):
        </p>
        <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm">
          <code>{`<Accordion type="single" collapsible className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger icon={IconInfoCircle}>Is it accessible?</AccordionTrigger>
    <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger icon={IconBrush}>Is it styled?</AccordionTrigger>
    <AccordionContent>Yes. It comes with default styles that match your theme.</AccordionContent>
  </AccordionItem>
</Accordion>`}</code>
        </pre>

        <p className="mt-4">Controlled, single mode:</p>
        <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm">
          <code>{`const [value, setValue] = useState<string>('item-1');

<Accordion type="single" value={value} onValueChange={setValue} className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>Item 1</AccordionTrigger>
    <AccordionContent>Content for item 1</AccordionContent>
  </AccordionItem>
</Accordion>`}</code>
        </pre>
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
