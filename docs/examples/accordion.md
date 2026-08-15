# Accordion

> Worked example of `docs/component-doc-template.md`. Source of truth:
> `@cognite/aura/components/accordion`
> (`cognitedata/fusion:libs/aura/src/components/ui/core/accordion/accordion.tsx`
> and its co-located `accordion.stories.tsx`).
>
> **Repo note:** this flows-community-components repo's own
> `src/components/ui/accordion.tsx` is a simplified, divergent stand-in — it
> exposes a bare `multiple: boolean` instead of a `type`/`collapsible`
> discriminated union, has no `icon` prop, and names its content part
> `AccordionPanel` instead of `AccordionContent`. Code generated from *that*
> file will not match what Aura actually ships. This doc describes the real,
> canonical component; the local file should be updated to match or
> relabeled as non-canonical.

An Accordion progressively discloses content by letting users expand or
collapse titled sections, one interaction at a time, so a page can show a lot
of information without all of it being visible at once.

---

## 1. Anatomy — AUTO

```
Accordion
└── AccordionItem (one per section, requires a unique `value`)
    ├── AccordionTrigger (the clickable header; optional leading `icon`)
    └── AccordionContent (the collapsible body)
```

`AccordionTrigger` and `AccordionContent` are context-coupled to their
nearest `AccordionItem` ancestor — they read which item they belong to from
context, not from a prop. Rendered outside an `AccordionItem`, they have no
item to associate with.

## 2. Props reference — AUTO

### `Accordion` (discriminated union on `type`)

**`type="single"` (default)**

| Prop | Type | Default | Required |
|---|---|---|---|
| `type` | `'single'` | `'single'` | No |
| `collapsible` | `boolean` | `false` | No |
| `value` | `string` | — (uncontrolled if omitted) | No |
| `defaultValue` | `string` | — | No |
| `onValueChange` | `(value: string) => void` | — | No |
| `disabled` | `boolean` | `false` | No |

**`type="multiple"`**

| Prop | Type | Default | Required |
|---|---|---|---|
| `type` | `'multiple'` | — | Yes (must be set explicitly) |
| `value` | `string[]` | — (uncontrolled if omitted) | No |
| `defaultValue` | `string[]` | — | No |
| `onValueChange` | `(value: string[]) => void` | — | No |
| `disabled` | `boolean` | `false` | No |

The two shapes are enforced by TypeScript as a real discriminated union
(`accordion.tsx:24-35`) — passing a `string[]` `value` while `type="single"`,
or a bare `string` while `type="multiple"`, is a compile error. There is no
`collapsible` prop under `type="multiple"` (each item already opens/closes
independently).

### `AccordionItem`

| Prop | Type | Default | Required |
|---|---|---|---|
| `value` | `string` | — | Yes |
| `disabled` | `boolean` | inherited from `Accordion.disabled` | No |

### `AccordionTrigger`

| Prop | Type | Default | Required |
|---|---|---|---|
| `icon` | `Icon` (any Tabler icon component) | — (no icon) | No |
| `children` | `React.ReactNode` | — | Yes (the trigger label) |

Rendering order is fixed: `icon` (if provided) → label → chevron. The
chevron is always present and cannot be removed or replaced via props.

### `AccordionContent`

| Prop | Type | Default | Required |
|---|---|---|---|
| `children` | `React.ReactNode` | — | Yes |
| `className` | `string` | — | No (applied to the inner padded wrapper) |

## 3. States & variants

### `type="single"` vs. `type="multiple"` — AUTO (sourced from the `DefaultExpanded` and `Multiple` stories)

> Per the `DefaultExpanded` story's own copy: *"You should use single mode
> when you want to allow only one section to be open at a time."* Per the
> `Multiple` story: *"Multiple sections can be expanded simultaneously."*

Use `type="multiple"` when users need to compare content across sections
while both stay open (e.g. checking two settings groups against each other).
Use `type="single"` (the default) everywhere else — it keeps the page short
by construction, since opening a new section always closes the previous one.

### `collapsible` (single mode only) — AUTO for the "on" case, HAND for the "off" case

> Per the `DefaultExpanded` story: *"Yes, you should use the collapsible prop
> to allow the user to collapse the accordion on mobile."*

- Set `collapsible` when the accordion must support "all sections closed" as
  a valid state — mobile layouts, or any accordion where every section is
  optional reading.
- **HAND, undocumented in source:** leave `collapsible` at its default
  (`false`) when the product requires exactly one section to always be open
  — e.g. a required settings group where "nothing selected" isn't a valid
  configuration state. If your accordion always has a sensible default
  section, default `false` and set `defaultValue` to that section's `value`.

### `AccordionItem.disabled` (per item) — HAND, no current answer in source or stories

No story disables a single item independently of the whole accordion (only
`Accordion.disabled`, which disables every item at once, is demonstrated).
**Open question — answer before using this prop:**
- What real product condition should disable one section while the rest of
  the accordion stays interactive? (e.g. a permission-gated section, a
  section that depends on an unmet prerequisite elsewhere on the page.)
- Should the disabled item's content still render for screen readers if it
  was previously open, or is it fully unreachable while disabled?

Until this is answered for a given product surface, prefer omitting the
section entirely (or showing it read-only) over guessing at `disabled`.

### `icon` — HAND (usage rule; the prop mechanics are AUTO, see section 2)

Icons are demonstrated purely decoratively in the `WithIcons` story (info,
brush, and clock icons with no stated meaning). There is no rule in source
for *when* a trigger should carry one.

**Rule:** if any trigger in an `Accordion` instance has an `icon`, every
trigger in that same instance must have one — never mix icon and no-icon
triggers within one accordion. (This replaces the vaguer "maintain
consistency in icon usage and styling" — icon *position* and *size* are
already fixed by the component, so the only remaining decision is
all-or-nothing per instance.)

## 4. Accessibility

**Guaranteed by the component — AUTO, verified by the stories' Testing
Library `play` functions:**
- Every trigger renders as a native `<button>`.
- `aria-expanded` is set on the trigger and flips with open/closed state
  (asserted in `Basic`, `DefaultExpanded`, and `Multiple`).
- When `Accordion.disabled` is set, every trigger receives `aria-disabled`
  and/or `data-disabled` and/or the native `disabled` attribute (asserted in
  `Disabled` — the story checks for any of the three, so don't assume a
  single specific mechanism).
- Keyboard activation (Enter/Space) works because triggers are native
  buttons — no custom key handling required from the consumer.

**On the consumer — HAND:**
- If `AccordionContent` holds information a screen-reader user must be able
  to reach via in-page search (browser Ctrl+F), don't render that content
  conditionally in JS after the panel opens — keep it in the DOM so
  find-in-page and AT can reach it even while collapsed.
- Trigger label text (`children`) must describe the section's content on its
  own — screen reader users navigating by heading/button list won't see
  surrounding page context.

## 5. When to use — HAND

- **Settings or configuration panels:** group related settings and let users
  expand only the group they're changing, so the panel doesn't show every
  control at once.
- **Long forms:** split a form with more than ~2 logical groups into
  collapsible sections so the first screen isn't intimidating.
- **FAQ / help content:** one question per `AccordionItem`, `type="single"
  collapsible` so only one answer is visible at a time.
- **Nested hierarchies:** folders, threaded comments, or any structure with
  a natural parent/child relationship where children are opt-in reading.

## 6. When to use something else — HAND

- **All content must be visible or compared side-by-side at once:** use a
  plain list, [Card](../../src/components/ui), or
  [Data Grid](../../src/components/ui) instead — hiding content that users
  need to compare across sections causes errors.
- **Content is short enough to read in place (under ~3 lines collapsed +
  expanded, combined):** don't hide it behind a trigger at all — use
  typography and spacing/grouping instead. An Accordion adds an extra click
  for no space savings once the collapsed and expanded states are nearly the
  same size.
- **Users need to switch between a small, fixed set of views repeatedly:**
  use [Tabs](../../src/components/ui) or
  [Segmented Control](../../src/components/ui) — repeatedly
  expanding/collapsing the same two or three sections is more error-prone
  than switching between persistent tabs.

## 7. Composition rules / often used with — HAND

- Form controls (`Input`, `Select`, `Checkbox`, etc.) are commonly placed
  inside `AccordionContent` for settings-panel use cases.
- A `Separator` between `AccordionItem`s is redundant — `AccordionItem`
  already renders its own bottom border; don't add one manually.
- Don't nest an `Accordion` inside another `Accordion`'s `AccordionContent`.
  Nothing in the types prevents this, but two independent expand/collapse
  interactions stacked on top of each other is disorienting — if content
  needs two levels of disclosure, restructure it as a single accordion with
  clearer section titles instead.

## 8. Dos and don'ts — HAND

- **Do** write trigger text that fully describes what's inside — a user
  scanning collapsed titles should be able to predict the content without
  opening it.
- **Do** default-open the single most relevant section when one exists
  (`defaultValue`), rather than starting with everything collapsed.
- **Don't** mix icon and no-icon triggers within one `Accordion` instance
  (see section 3).
- **Don't** nest `Accordion` inside `AccordionContent` (see section 7).
- **Don't** use `type="multiple"` by default — only switch to it when users
  genuinely need two or more sections open simultaneously (see section 3);
  defaulting to it defeats the space-saving purpose of the component.

## 9. Code example(s) — AUTO (from `accordion.stories.tsx`)

Single, collapsible, default (`Basic` story):

```tsx
<Accordion type="single" collapsible className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

With leading icons (`WithIcons` story — note every trigger has one, per the
rule in section 3):

```tsx
<Accordion type="single" collapsible className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger icon={IconInfoCircle}>Is it accessible?</AccordionTrigger>
    <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger icon={IconBrush}>Is it styled?</AccordionTrigger>
    <AccordionContent>Yes. It comes with default styles that match your theme.</AccordionContent>
  </AccordionItem>
</Accordion>
```

Controlled, single mode (`Controlled` story):

```tsx
const [value, setValue] = useState<string>('item-1');

<Accordion type="single" value={value} onValueChange={setValue} className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>Item 1</AccordionTrigger>
    <AccordionContent>Content for item 1</AccordionContent>
  </AccordionItem>
</Accordion>
```

## 10. Related components — AUTO links, HAND reasoning

- **Card** — use instead when everything must be visible at once (section 6).
- **Data Grid** — use instead for dense, comparable, tabular content rather
  than free-form collapsible sections (section 6).
- **Tabs** — use instead when users repeatedly switch between a small, fixed
  set of views rather than reading sections in sequence (section 6).
- **Segmented Control** — same reasoning as Tabs, for view-switching rather
  than progressive disclosure (section 6).
