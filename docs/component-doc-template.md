# Aura component documentation template

This template is the skeleton for every Aura component doc page. It's meant
for two readers at once: a human (designer or engineer) making a judgment
call, and an LLM generating or modifying UI code from the doc. Every section
below is tagged **AUTO** or **HAND**.

## The AUTO/HAND contract

- **AUTO** — the content has exactly one correct answer, and that answer
  already exists somewhere else in the codebase: prop types, enforced
  constraints (discriminated unions, required parents), or **Storybook story
  source** (render code, args, and any copy the story itself displays).
  AUTO content should be transcribed or generated from that source, never
  invented. If it drifts from the source, it's simply wrong — there's no
  judgment involved in fixing it.
- **HAND** — there are multiple defensible answers and a person had to pick
  one. Nothing in the component's source will ever "prove" a HAND section
  right or wrong; it can only go stale relative to a product decision.

**Before writing a HAND section, check the component's Storybook stories
first.** Story titles, args, and any copy rendered inside a story
(descriptions, story-internal Q&A text, etc.) are checked-in source, not
prose — if a story already states the answer to a HAND question, that's AUTO
content in disguise and should be quoted/cited, not re-derived by hand. (Real
example: Aura's `Accordion` has a story literally titled with the question
"When should I use single vs. multiple mode?" whose own copy answers it — see
`docs/examples/accordion.md`, section 3.)

Every HAND section below has a short checklist. Answer every question in the
checklist in one sentence each before writing prose — if a question can't be
answered in one concrete sentence, the eventual doc content will be a vibe,
not a rule. Reject phrasing like "use sparingly" or "keep it simple" — rewrite
until it's a threshold, a named alternative, or a yes/no condition ("max one
per view", "under 3 lines of text", "only when X").

---

## 1. Anatomy — AUTO

The sub-component tree and any structural requirements (a sub-component that
only works inside a specific parent, context-based coupling, etc.). Pull this
directly from the exported components and how they reference each other
(shared context, compound-component patterns).

## 2. Props reference — AUTO

One table per exported sub-component: prop name, type, default, required.
Include discriminated unions in full (don't flatten `type: 'a' | 'b'` variants
into one table if they carry different companion props — show both shapes).
Explicitly call out any prop that is typed but deprecated/no-op, so neither a
human nor an LLM reaches for it expecting an effect.

## 3. States & variants — AUTO where a trigger condition is already answered by a story or type constraint; HAND where it isn't

For every boolean/enum prop that changes behavior, state:
- what it does (AUTO, from the type/render output), and
- **when a consumer should reach for it** (the actual judgment call).

Check stories for the "when" before writing it by hand — see the AUTO/HAND
contract above. If no story or type answers "when", mark that specific prop's
row HAND and use the checklist below rather than guessing:
- What real product condition should make someone flip this prop?
- Is there a concrete threshold (item count, screen size, permission state)
  that makes the trigger condition unambiguous?
- Is the *inverse* case (when to leave the default) also non-obvious? If so,
  state both directions explicitly.

## 4. Accessibility — AUTO for guarantees, HAND for consumer responsibilities

Split this section in two:
- **Guaranteed by the component (AUTO):** exact ARIA attributes/roles applied
  automatically. Only list attributes you can point to in source or in a
  story's assertions (e.g. a Testing Library `play` function asserting
  `aria-expanded`) — don't guess at what a headless-UI dependency "probably"
  does.
- **On the consumer (HAND):** anything the component can't enforce, e.g.
  content that must stay in the DOM for assistive tech, required
  `aria-label`s the component can't infer, focus-management obligations when
  composing with other components.

Checklist for the HAND half:
- What accessibility failure is possible even when every prop is used
  correctly?
- Whose responsibility is it to prevent that failure — the consumer's
  markup, copy, or composition choice?

## 5. When to use — HAND

Checklist:
- What's the concrete scenario (not a feeling) where this component is the
  right call? Name the situation, not the vibe ("progressive disclosure in a
  settings panel", not "when you want things organized").
- Is there a numeric or structural signal (item count, content length,
  frequency of access) that indicates this scenario?

## 6. When to use something else — HAND

Checklist:
- What's the nearest neighboring component, by name?
- What's the one concrete, testable condition that should make someone pick
  that neighbor instead (not "if it feels like too much")?
- Link directly to the neighbor's own doc page.

## 7. Composition rules / often used with — HAND

What this component is typically nested inside, or nests. Not derivable from
types (TypeScript won't stop you from composing components in an unintended
way) — this is a checked convention.

Checklist:
- Which components does this one usually contain, or get contained by, in
  real product code (search actual usage, don't guess)?
- Is there a composition that's technically possible but explicitly
  discouraged? State why, concretely.

## 8. Dos and don'ts — HAND, testable only

Every bullet must be checkable by inspection of the resulting UI/code — no
adjectives like "consistent" or "clean" without a stated criterion. Before
adding a bullet, confirm:
- Is this actually a judgment call, or does the component's source already
  enforce it? (If source enforces it, delete the bullet — it belongs in
  section 1 or 2, and repeating it here is duplication that can drift.)
- Can the bullet be turned into a pass/fail check? If not, rewrite it until
  it can.

## 9. Code example(s) — AUTO

Pull real examples from Storybook stories rather than writing new ones from
scratch — stories are tested (often with `play` functions) and kept in sync
with the component by CI; hand-written examples in docs are not. If no story
covers a composition pattern worth showing, that's a signal to add the story,
not to hand-write an untested doc example.

## 10. Related components — AUTO for links, HAND for the reason

The link itself is mechanical (any component mentioned in "when to use
something else" or "often used with" should appear here too). The one-line
"why" for each link is a judgment call — reuse the reasoning already written
in sections 6/7 rather than inventing new phrasing.

---

## Applying this template

1. Read the component's actual source and its Storybook stories before
   writing anything.
2. Fill sections 1, 2, 9, and 10's links mechanically from source — these
   should never require a design decision.
3. For section 3 and the AUTO half of section 4, check stories for an
   existing answer before treating something as a HAND gap.
4. For every remaining HAND section, answer its checklist in plain sentences
   first, then write prose from those answers — don't skip straight to prose.
5. Re-read every HAND bullet and ask: "could an LLM apply this rule without
   asking a follow-up question?" If not, it's still a vibe — tighten it.

See `docs/examples/accordion.md` for a fully worked example, including a
worked case where a "HAND" question turned out to already be answered in a
Storybook story.
