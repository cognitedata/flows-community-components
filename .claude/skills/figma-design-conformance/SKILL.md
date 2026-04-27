---
name: figma-design-conformance
description: Compare an Aura component implementation in fusion/libs/aura against its Figma design for exact visual and structural conformance. Use raw Figma node API data as the authoritative source, then use Figma MCP screenshots and design context for visual confirmation and implementation hints. Use when asked to check design conformance, compare a component to Figma, audit visual states, or verify a component matches the design.
---

# Figma Design Conformance

Compare an Aura component's code implementation against its Figma design and produce a structured pass/fail report covering all visual states, tokens, spacing, and variants.

## Inputs

| Input | Required | Description |
|-------|----------|-------------|
| `component` | Yes | Component slug (e.g. `checkbox`, `badge`, `helper-text`) |
| `figmaUrl` | Yes | Figma node URL — must be supplied by the user |
| `targetDir` | No | Absolute path to component dir — auto-resolved from slug if omitted |

## Clarify First

Before running the audit, ask brief clarifying questions when any of this is unclear:
- Which exact component, node, or variant should be treated as the audit target?
- Whether the user wants strict raw-node conformance or a lighter visual audit
- Whether the component should be compared at the top-level docs frame, component-set level, or a single variant node

If `figmaUrl` is not supplied, stop and ask the user to provide it before continuing.

**Auto-resolution for `targetDir`** — check in order:
1. `fusion/libs/aura/src/components/ui/core/{component}/`
2. `fusion/libs/aura-labs/src/components/ui/lab/{component}/`

## Step-by-step procedure

### 1. Narrow the Figma target with MCP metadata

Call `get_metadata` (Figma MCP) with the resolved `nodeId` and `fileKey` first.

Use the metadata to identify the exact node to audit:
- If the provided URL points to a docs page or section, narrow to the component set or variant node that actually defines the design
- Prefer the component set node when it contains all states/variants needed for the audit
- If the component set is too broad, narrow further to the specific state or variant nodes you need

This metadata step is required before the raw API call.

### 2. Fetch the raw Figma node JSON

After narrowing the target node, fetch the raw Figma node from the REST API. This raw node JSON is the authoritative source for exact conformance claims.

Use `FIGMA_ACCESS_TOKEN` for auth. The request shape is:

```bash
curl "https://api.figma.com/v1/files/<fileKey>/nodes?ids=<nodeId>" \
  --header "X-Figma-Token: $FIGMA_ACCESS_TOKEN"
```

Rules:
- Normalize node ids as needed: Figma URLs often use `10390-5551`, while API/MCP commonly use `10390:5551`
- Use the narrowed node id from step 1, not the broad page node, unless the broad node is the real audit target
- If the raw response is large or likely to be referenced multiple times, save it under `/tmp`, for example `/tmp/figma-node-<fileKey>-<nodeId>.json`
- If `FIGMA_ACCESS_TOKEN` is missing or the raw API call fails, stop and ask the user to fix auth before continuing

Extract and note from the raw node:
- Variant property names and options from `componentPropertyDefinitions`
- Exact fills, strokes, effects, corner radius, padding, spacing, constraints, and sizing
- `boundVariables` and resolved values where present
- Text styles, typography, and line height from text nodes
- Whether the design includes dark mode through separate nodes, variants, or token bindings
- Exact state/variant naming as defined by the node tree

### 3. Fetch Figma design context and screenshots

Call `get_design_context` (Figma MCP) with the narrowed `nodeId` and `fileKey`.

The response includes:
- Structured design representation (layout, spacing, colors, typography, states)
- A rendered screenshot
- Reference code showing the intended visual output

Use `get_design_context` for:
- Visual interpretation
- Quick extraction of intent from the selected node
- Cross-checking what the raw node means in practice

Do not treat `get_design_context` as authoritative when it conflicts with raw node data.

Parse and note:
- **Variants / component sets**: list all Figma variants and their property names (e.g. `size=sm|md|lg`, `state=default|hover|focus|disabled|error`)
- **Color tokens**: exact color values or token names used
- **Typography**: font size, weight, line height per text element
- **Spacing**: padding, gap, margin values
- **Border**: width, radius, color per state
- **Icons**: names and sizes
- **Dark mode**: whether dark-mode variants are present

If the design context response is too large or truncated, use the metadata result to narrow further and re-fetch only the specific sub-nodes needed.

Call `get_screenshot` for any additional variant nodes that the main node doesn't fully capture (e.g. individual states).

Optionally call `get_variable_defs` for the same narrowed node when token names or resolved values are important and not obvious from the raw node alone.

### 4. Build a token resolution map

Before reading the component, build an explicit mapping between Figma token names and the project's Tailwind classes. This step prevents false positives caused by same-named-but-different tokens (e.g. `bg-muted` vs `bg-muted-background`).

**Figma token name → Tailwind class conversion:**

`get_design_context` outputs token names in Figma's `/`-namespaced CSS variable syntax:
```
var(--bg/muted-background, #f1f2f3)   →  bg-muted-background
var(--fg/muted-foreground, #7c868e)   →  text-muted-foreground
var(--bg/active-background, #191b1d)  →  bg-active-background
var(--bg/disabled-background, #f1f2f3)→  bg-disabled-background
var(--radius/full, 9999px)            →  rounded-full
```

The rule: drop `--<namespace>/`, replace `/` with `-`, prefix with the appropriate Tailwind utility (`bg-`, `text-`, `border-`, `rounded-`, etc.).

**Verify each token exists in the project:**

Run this for every color token the comparison will rely on:

```bash
grep -E "^  --color-<token-name>:" libs/aura/src/colors.css
# e.g.
grep -E "^  --color-muted-background:|^  --color-muted:|^  --color-active-background:" \
  libs/aura/src/colors.css
```

Then confirm the Tailwind class used in the component resolves to the same CSS variable by checking the built CSS:

```bash
python3 -c "
import re
with open('libs/aura/dist/styles.css') as f:
    content = f.read()
for cls in ['bg-muted', 'bg-muted-background', 'bg-active-background', 'bg-foreground']:
    m = re.search(r'\.' + re.escape(cls) + r'[^{]*\{([^}]+)\}', content)
    print(cls, '->', m.group(1) if m else 'NOT FOUND')
"
```

This catches cases where a shorter Tailwind alias exists (e.g. `bg-muted`) and resolves to a *different* CSS variable than the design-specified token (`bg-muted-background`).

Build this table before the comparison step:

| Figma token | Expected Tailwind class | CSS variable | Exists in colors.css? | Resolves to |
|---|---|---|---|---|
| `var(--bg/muted-background)` | `bg-muted-background` | `--color-muted-background` | ✓ | `--muted-background` |
| `var(--bg/active-background)` | `bg-active-background` | `--color-active-background` | ✓ | `--active-background` |
| … | … | … | … | … |

Any Tailwind class in the code that uses a *shorter alias* of a design token (e.g. `bg-muted` instead of `bg-muted-background`) must be verified to resolve to the same final CSS variable before marking it PASS.

### 5. Read the component implementation

From `targetDir`, read:
- `{slug}.tsx` — component implementation (required)
- `{slug}.stories.tsx` — stories (to check all states are covered)
- `{slug}.metadata.ts` — variant metadata

Focus on:
- Class names / CSS custom properties that encode visual state
- How `data-*` or `aria-*` attributes drive CSS state variants
- Whether the design tokens match — **use the token resolution map from Step 4, not just name similarity**
- Which size/variant props exist and their values

### 6. Compare systematically

Check each category and assign **PASS** or **FAIL**:

| Category | What to verify |
|----------|---------------|
| **States** | Every state shown in Figma (default, hover, focus, active, disabled, error, loading, checked, indeterminate…) has a CSS counterpart in the component |
| **Variants** | Every Figma variant property (size, intent/variant, etc.) maps to a prop in the component |
| **Colors** | Token names used in code resolve to the same CSS variable as the Figma token (use the token resolution map from Step 4 — do not rely on name similarity alone) |
| **Typography** | Font size, weight, and line height match between Figma and code tokens |
| **Spacing** | Padding, gap, margin values in code align with Figma measurements |
| **Border** | Border width, radius, and color match for each state |
| **Icons** | Correct icons used, correct sizes, icon positions match |
| **Dark mode** | Dark-mode variants present in code if Figma shows them |
| **Motion** | Transitions/animations present in code if Figma specifies them |
| **Accessibility** | ARIA roles/labels present where Figma annotations indicate them |

Strict mode: if evidence is unclear, mark **FAIL** with a note.

Comparison rules:
- Raw node data is authoritative for exact token, spacing, variant, and state claims
- MCP screenshots are authoritative for visual confirmation when the raw node is structurally correct but hard to interpret
- `get_design_context` is supportive context, not ground truth
- Stories are evidence of state coverage, not proof that styling is correct

### 7. Produce the report

Output in this order:

1. **Summary** — component name, overall PASS/FAIL, counts
2. **Figma node** — URL and screenshot (embed if available)
3. **States covered** — table of Figma states vs code states (✓/✗)
4. **Variant coverage** — table of Figma variants vs code props (✓/✗)
5. **Findings** — one row per check (see table format below)
6. **Gaps / action items** — numbered list of changes needed to reach conformance
7. **Disclaimer** — humans are responsible for final judgment; treat findings as discussion points

### Findings table format

| # | Category | Status | Figma spec | Code | Gap |
|---|----------|--------|------------|------|-----|
| 1 | State: disabled | FAIL | `opacity: 40%, cursor: not-allowed` | No disabled styling found in `.tsx` | Add `disabled:opacity-40 disabled:cursor-not-allowed` |
| 2 | Color: border | PASS | `border-border-default` | `border border-border-default` | — |

Include file + line references in the "Code" column where possible.
Mention raw-node evidence inline in findings when it supports an exact claim, for example:
- `Raw node 10223:7681 binds fill VariableID:619:11556 and renders 4px thickness`
- `Raw node componentPropertyDefinitions include State=Default|Hover`

## Notes

- Raw node JSON is the primary evidence for exact conformance.
- Figma MCP screenshots are the primary visual ground truth.
- The `get_design_context` reference code (React + Tailwind) is a representation of design intent, not the final code style — use it to extract design values, not to copy-paste.
- If a component node points to the top-level component set frame, narrow via `get_metadata` before the raw API call so the audit targets the real component definition.
- Save raw node JSON under `/tmp` only when it is large or likely to be reused during the audit.
- If raw API auth fails, stop and ask the user to fix `FIGMA_ACCESS_TOKEN` before continuing.
- **Token alias trap**: Aura coexists with Tailwind's shadcn-style short aliases. `bg-muted`, `bg-background`, `bg-foreground` etc. are valid Tailwind classes but resolve to *different* CSS variables than their longer counterparts (`bg-muted-background`, `bg-active-background`). Never mark a color token PASS based on name resemblance — always run the Step 4 verification against `dist/styles.css`.
- **Figma `/` separator**: `get_design_context` always outputs Figma token names with `/` as namespace separator inside `var()`: `var(--bg/muted-background)`. Strip the `--<namespace>/` prefix and replace `/` with `-` to get the Tailwind class suffix. The namespace prefix (`bg`, `fg`, `border`, `radius`) maps to the Tailwind utility prefix (`bg-`, `text-`, `border-`, `rounded-`).
