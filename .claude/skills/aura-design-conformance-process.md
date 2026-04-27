# Aura Design Conformance
*Aura component workflow — from clean branch to PR*

---

## At a Glance

1. Clean branch in Fusion
2. Run **Figma Design Conformance** skill — pass Figma URL + component path
3. Review audit output — confirm it's looking at the right component
4. Have the agent resolve the design differences
5. Sanity check in **Storybook** — visual pass, states, dark mode
6. Review the code — reuse, props, composition, API consistency
7. Run **Cognite Risk Reviewer** skill — fix must-fixes, justify anything you skip
8. Push PR → resolve Gemini/CodeRabbit → team review → risk review via #dune-pr-reviews

---

## Prerequisites

Before running this workflow you need:

| Requirement              | Detail                                                                                                                                                              |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Cursor enterprise**    | Must be on the Cognite Cursor account. Fill in the access form if not set up yet.                                                                                   |
| **Figma MCP**            | Connected via your Cognite account in Cursor.                                                                                                                       |
| **`FIGMA_ACCESS_TOKEN`** | Personal Figma access token set as a Mac environment variable. The skill won't run the raw API call without it — if it's missing, the skill will stop and tell you. |

---

## Step 1 — Start on a clean branch

Check out a fresh branch in the Fusion repo before touching anything.

---

## Step 2 — Run the Figma Design Conformance skill

In Cursor, run:

```
/figma-design-conformance
```

You **must** supply:
- **The Figma URL** — navigate to the component in Figma, go into Design Mode, open *Explore Component Behavior*, and copy the URL from that view. The node ID in the URL is what the skill uses to crawl the composition. The skill will not proceed without this.
- **The component slug** — e.g. `command`, `checkbox`. The skill will auto-resolve the path on disk from this.

Optionally supply:
- **The path to the component on disk** — e.g. `core/command`. Speeds things up if the auto-resolution guesses wrong.

> **Sanity check the output first** — before telling it to fix anything, confirm it's looked at the right component. Because it's using Figma, it can occasionally latch onto the wrong node.

---

## Step 3 — Review the audit output

The skill produces a structured pass/fail report — not fixed code. It's an audit of where the implementation diverges from the Figma design.

The report covers states, variants, spacing, borders, icons, dark mode, and colour tokens. For colour tokens specifically, the skill traces through Tailwind aliases all the way to the underlying CSS variable (checked against `dist/styles.css`), so token findings in the output are verified — not just name-matched.

Things to look for:
- Subcomponents shown with `+` in Figma should map to existing Aura components (e.g. `Label`, `KBD`), not be rebuilt from scratch
- States visible in the Figma playground (e.g. active fill state) that aren't covered in the code
- Optional elements that imply a prop (e.g. icon → `icon` prop, not slot/introspection)

---

## Step 4 — Have an agent resolve the design differences

Once you're happy it's looking at the right thing, tell it to go ahead and fix what it found.

---

## Step 5 — Sanity check in Storybook

Open Storybook and do a visual snagging pass:
- Does it look like the Figma design?
- Are states covered (including edge cases like dark mode, keyboard navigation)?
- Do the examples in the stories make sense?

Fix anything obvious before moving on.

---

## Step 6 — Review the code

Switch hats: you're now a developer reviewing this as if you hadn't written it.

Check for:
- **Over-componentization** — has it created unnecessary sub-components or helper functions?
- **Missing reuse** — is it reimplementing something that already exists in Aura? (Common culprits: `KBD`, `Label`, icons)
- **API sense check** — do the props make sense? Are they consistent with how other components work in the codebase?
- **Composition rules** — **no child introspection**. If something is optional, it should be a prop. Icons are the canonical example: use an `icon` prop, even if that breaks Shadcn's slot/composition convention.
- **Cross-package imports** — e.g. `core` importing from `labs` is always wrong. The risk reviewer will flag it, but catching it here saves a round trip.

Flag anything suspicious to the AI and get it resolved before risk review.

---

## Step 7 — Run the Cognite Risk Reviewer skill

```
/risk-review
```

Review the output — it's segmented into **must fix** and **should fix before enable**.

- Treat **must fix** as blockers. Fix them before the PR goes up.
- For **should fix** items: use your judgement. If you're not fixing something, be prepared to explain why to a risk reviewer — having a reason ready reduces friction significantly.
- Some recommendations will be noisy or edge-case (e.g. accessibility colour contrast on design tokens) — apply common sense.

**Optional pre-check:** Cognite also runs a Gemini code review against the Fusion style guide on every PR. If you want the smoothest possible risk review, ask the skill to check your code against the style guide (it lives in the Fusion repo) before you push.

---

## Step 8 — Push the PR

1. Create the PR
2. Resolve any **Gemini / CodeRabbit** comments
3. Add the **waiting for team** label
4. Post in the **#aura-dev channel** with the PR link and component name
5. Get team review
6. Remove the **waiting for team** label
7. Add the **waiting for risk review** label
8. Post in **#dune-pr-reviews** with the PR link and a short description
9. Add the <img src="https://emoji.slack-edge.com/T3XCNGHJL/waiting-for-risk-review/75fcd41a49b7b7bc.png" alt=':waiting-for-risk-review:' width='20'/> emoji to your message
10. A risk reviewer will pick it up from there

---

## Notes on the Figma side

- **Playground view** (Explore Component Behaviour in Design Mode) is where designers define props and states — treat this as the spec for what the component should support
- If something in the playground has no placeholder or isn't fully defined, it's worth flagging to design before building — ambiguity here leads to design/code divergence later
- Subcomponents with `+` signs are composition signals — the AI sometimes rebuilds these from scratch; always check

## Hard rules

| Rule                           | Detail                                                           |
| ------------------------------ | ---------------------------------------------------------------- |
| No child introspection         | If it's optional, it's a prop                                    |
| Reuse before rebuild           | Check Aura for existing components before the AI invents its own |
| Clean branch always            | Don't run conformance on a dirty working tree                    |
| Team review before risk review | Never send straight to risk review — get team eyes first         |
