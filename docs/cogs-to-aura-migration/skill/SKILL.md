---
name: mui-shadcn-app-migration
description: >
  Per-project, LLM-only migration of React/TypeScript code from MUI to ShadCN,
  using only Cursor tools and skill instructions. Use this when you want to
  migrate a single React project (app or shared lib) from MUI UI components
  to ShadCN, migrating every usage of any component that has a ShadCN mapping,
  without deterministic codemods.
---

# MUI → ShadCN Project Migration (LLM-only, skills-only)

## Purpose

Enable an agent to migrate one React project (app or shared lib) at a time
from MUI to ShadCN using LLM-generated patches only. No ts-morph, jscodeshift,
or custom codemods are assumed. The agent:

- Analyzes a project’s MUI usage.
- Determines which MUI components are covered by ShadCN mappings.
- Generates ShadCN-based JSX replacements for **all** usages of those components
  in the project via prompts and mapping examples.
- Optionally proposes focused self-repair patches from TypeScript/lint errors.

## Inputs

Agents using this skill should accept and track:

- **projectName**: Nx project name of the app or lib
  (e.g. `web-app`, `admin-app`, `shared-ui`, `feature-lib`).
- **mode**: One of:
  - `analyze` – scan the project for MUI usage and summarize.
  - `plan` – determine which files/usages are migratable (have ShadCN mappings).
  - `migrate` – generate LLM-only code patches for all migratable usages.
  - `fix` – propose focused self-repair patches from compiler/lint errors.
  - `status` – read-only summary of current manifest-based migration progress.

## Global invariants

- **Whole-file migration only (no component-at-a-time batching)**:
  - Migration MUST be done **one full file at a time**. When migrating a file,
    migrate **every** mapped non-deferred MUI usage in that file in a single
    pass and produce one coherent patch for the entire file.
  - Do NOT migrate one component type at a time across the codebase (e.g. "all
    Buttons in the project first").
  - Do NOT leave a file partially migrated (e.g. some Buttons switched to ShadCN
    but Tooltips still MUI in the same file) unless the remaining usages are
    explicitly deferred components. Either the file is fully migrated for all
    mapped components, or it remains untouched for this run.
- **Mixed MUI + ShadCN allowed while deferred components exist**:
  - It is acceptable for a file to temporarily import both MUI and ShadCN while
    some components remain deferred in `references/mui-shadcn-deferred-components.md`.
  - Do not block migrating a file solely because it still needs deferred MUI
    components or icons; migrate all mappable components in that file in one go.
- **LLM-only transforms**:
  - All code changes are produced as text patches by the LLM, guided by
    mapping examples in `references/mui-shadcn-component-mappings.md`.
  - Do not rely on running or editing custom codemod/AST tooling.
  - When introducing new ShadCN component wrappers/helpers around primitives
    like `Button`, prefer typing their props via
    `ComponentProps<typeof SomeShadCNComponent>` (or `Omit<...>` when you need
    to hide/replace a specific prop such as `icon`) instead of hand-written
    prop shapes, so that ShadCN API changes are reflected automatically and
    all underlying props are forwarded through when props are spread
    e.g. `otherProps`.

## Persistent migration manifest

Agents using this skill MUST persist and reuse migration state per project so
that new chats/agents can resume work without re-running a full analysis.

- **Location**:
  - For a given `projectName`, store the manifest at:
    - `.cursor/skills/mui-shadcn-app-migration/state/<projectName>.json`
    - (Create intermediate directories if needed.)
- **Responsibility**:
  - Every mode (`analyze`, `plan`, `migrate`, `fix`) MUST:
    - Attempt to read this manifest at the beginning of the run.
    - Update it after performing work that changes analysis/plan/migration
      state.
- **Shape** (minimum contract; agents may extend with extra, backwards-
  compatible fields as needed):

```json
{
  "projectName": "web-app",
  "version": 1,
  "analyze": {
    "completedAt": "2026-03-13T10:05:00.000Z",
    "muiComponentsByFile": {
      "apps/web-app/src/components/user-menu/release-management-modal.tsx": ["Button", "Tooltip"]
    },
    "componentUsageCounts": {
      "Button": 14,
      "Tooltip": 6
    }
  },
  "plan": {
    "filesToTouch": ["apps/web-app/src/components/user-menu/release-management-modal.tsx", "apps/web-app/src/components/menu-item/menu-item.tsx"],
    "usagesByFile": {
      "apps/web-app/src/components/user-menu/release-management-modal.tsx": [
        {
          "component": "Button",
          "startLine": 42,
          "endLine": 56
        }
      ]
    }
  },
  "migrate": {
    "completedFiles": ["apps/web-app/src/components/user-menu/release-management-modal.tsx"],
    "pendingFiles": ["apps/web-app/src/components/menu-item/menu-item.tsx"]
  },
  "codeVersionFingerprint": {
    "packageJsonHash": "…",
    "projectJsonHash": "…"
  }
}
```

- `codeVersionFingerprint`:
  - Should be a cheap but stable representation of the project state used for
    analysis/plan, such as:
    - Hash of `apps/<projectName>/project.json` and `package.json`, and/or
    - Hash of a concatenation of file paths + mtimes for
      `apps/<projectName>/src/**/*.{ts,tsx}`.
  - Agents MUST invalidate cached `analyze`/`plan` data if they detect that
    the fingerprint no longer matches the current workspace.

### Styling & tokens (Tailwind + ShadCN)

- **Prefer Tailwind utilities over styled-components** in ShadCN-migrated code:
  - Do **not** introduce new `styled-components` wrappers for layout, typography, or colors around ShadCN components.
  - For containers, labels, and other elements that are **children of or wrappers around ShadCN components** (e.g. within `DialogContent`, `RadioGroup`, `DropdownMenuContent`):
    - Use Tailwind classes (`className`) for layout, spacing, borders, and typography.
    - Map any previous MUI tokens (`Colors.*`, `Elevations.*`, typography helpers) to ShadCN/Tailwind tokens as described in `references/mui-shadcn-design-tokens-mappings.md`.
  - Inline `style={{ ... }}` usage for colors, typography, and elevations should be replaced with ShadCN/Tailwind utility classes wherever possible.
- **Allowed exceptions**:
  - Global style shims (e.g. `createGlobalStyle` used solely to patch legacy MUI behavior) may remain while MUI is still present.
  - If a very specific nested selector is required (e.g. a third-party widget that cannot be styled via className alone), prefer:
    - A narrowly-scoped CSS file or module imported by the component, and
    - Keeping all general layout/visual styling (padding, radius, borders, backgrounds, typography) in Tailwind utilities.

## Mode: analyze

1. Resolve `projectName` to its Nx project root under `apps/` or `libs/`
   using Nx workspace metadata or `project.json`.
2. Attempt to load the persistent manifest for this project from
   `.cursor/skills/mui-shadcn-app-migration/state/<projectName>.json`.
3. If a manifest exists AND its `codeVersionFingerprint` still matches the
   current project state:
   - Reuse the existing `analyze` section from the manifest.
   - Return that summary (human-readable + JSON-like) without re-scanning the
     entire project.
4. Otherwise (no manifest or fingerprint mismatch), perform a fresh analysis:
   - In the project’s source tree, locate all files that import any MUI
     package:
     - `@mui/material`
     - `@mui/lab`
     - `@mui/system`
   - For each file:
     - List which MUI components are imported (e.g. `Button`, `Tooltip`,
       `Modal`).
   - Produce a compact summary:
     - Per-component counts (how many files use each component).
     - Per-file component list.
     - Suggestions for low-risk first targets (typically `Button`, `Loader`,
       `Input`, `Divider`, `Skeleton`) if a component-scoped run is desired.
   - Persist the `analyze` result and an up-to-date `codeVersionFingerprint`
     into the manifest before returning.

Agents should return this summary both as human-readable text and as a small
JSON-like structure that can be reused by later modes.

## Mode: plan

1. Attempt to load the persistent manifest for this project. If it contains a
   `plan` section whose underlying `analyze` data is still valid (checked via
   `codeVersionFingerprint`), agents SHOULD reuse it instead of recomputing
   from scratch.
2. If no valid `plan` exists yet (or the fingerprint changed), compute a new
   plan:
   - Take the `analyze` summary (from the manifest, or by re-running
     `analyze` if needed).
   - Determine the **migratable component set**:
     - Look up every MUI component mentioned in the summary in
       `references/mui-shadcn-component-mappings.md`.
     - Exclude any components that are listed in
       `references/mui-shadcn-deferred-components.md` (these are explicitly
       deferred and must not be migrated automatically).
     - The component set is **all remaining components that have a mapping
       section** in `mui-shadcn-component-mappings.md` and are not marked as
       deferred.
   - For each source file that imports any of these components:
     - Record the MUI components to migrate in that file (all mapped ones).
     - Record the rough locations (line ranges) of those usages.
   - Persist the full `plan` (including `filesToTouch` and `usagesByFile`)
     into the manifest.
3. Output:
   - `filesToTouch`: list of **all** file paths that contain at least one
     usage of a mapped component.
   - For each file, the names and rough locations (line ranges) of MUI
     usages of the mapped components.

Agents should still surface any files where migrating only the mapped
components would obviously break invariants (e.g. partial modal composition)
so a human can review, but should not artificially batch or limit the number
of files.

## Mode: migrate

Agents MUST treat migration as **whole-file only**: each file is migrated in a
single pass. The unit of work is always one complete file, never one component
type across many files. Update the persistent manifest as files are completed
so that new chats/agents can resume from remaining pending files.

1. Load the manifest and its `plan.filesToTouch` list.
2. Derive the current migration worklist as:
   - `pendingFiles = plan.filesToTouch - migrate.completedFiles`
   - If the manifest has no `migrate` section yet, consider all
     `plan.filesToTouch` as pending.
3. For each file in `pendingFiles` (in any reasonable order), migrate the
   **entire file** in one go:
   - **Do not** migrate by component type (e.g. all Buttons in the repo).
   - **Do** treat the file as the only batch: read the file once, rewrite
     every mapped MUI usage in that file, and write back one complete updated
     file (single patch).

4. For that single file:
   - Read the full file with line numbers.
   - Identify **every** JSX usage of MUI components from the plan (all
     mapped, non-deferred components) in this file.
   - For each usage, gather the MUI snippet, context, and the relevant
     mapping from `references/mui-shadcn-component-mappings.md`.
   - Using the rewrite prompt in `references/mui-shadcn-prompts.md`, produce
     ShadCN replacements for every usage (you may do this mentally or in one
     combined pass), then assemble **one coherent patch for the whole file**:
   - Replace only the targeted JSX usages and, if necessary, adjust imports:
     - Remove now-unused MUI imports wherever possible.
     - Add the minimal required `@/components/ui` and `lucide-react` imports.
     - When introducing new ShadCN component wrappers/helpers, prefer typing props
       via `ComponentProps<typeof SomeShadCNComponent>` (or indexed access from
       that type) instead of hand-written prop shapes, so that ShadCN API changes
       are reflected automatically.
     - Preserve the behavioral surface of existing calls: do not add new
       options/props (e.g. `duration`, extra variants, additional flags) that
       were not present in the original MUI usage unless explicitly required
       by the ShadCN API or by the user.
     - Do not silently drop existing props (such as `style`, `className`,
       layout-related flags, or wrapper-specific options). Either preserve
       them on the same component (e.g. pass `style` through to the ShadCN
       wrapper) or intentionally relocate them in a way that maintains the
       original visual/layout behavior.
     - Prefer minimal structural changes:
       - Avoid introducing new top-level components, hooks, or large styled
         blocks during migration unless ShadCN’s API makes them strictly
         necessary.
       - Keep existing component/function boundaries and JSX trees as close as
         possible to the original MUI implementation, changing only imports,
         the minimal JSX needed for ShadCN’s compound components, and direct
         prop mappings.
       - If a larger refactor (e.g. extracting new subcomponents, reorganizing
         layout) is clearly beneficial, perform it in a separate, dedicated
         refactor PR instead of as part of the MUI → ShadCN migration.
     - Keep the rendered HTML tree as small as possible: avoid adding extra
       wrapper elements (e.g. unnecessary `<span>` or `<div>` wrappers) when
       the existing JSX can be reused directly with ShadCN components.
     - For "thin wrappers" (e.g. `NavrailTooltip` around ShadCN `Tooltip`), keep
       the public API equal to the underlying ShadCN component's props
       (`ComponentProps<typeof Tooltip>`), and only add shared behavior such
       as providers or shared configuration (e.g. a common delay via
       `TooltipProvider`). Placement/side should follow the component mapping
       guidance (e.g. `side="right"` on `TooltipContent`, not on `Tooltip`
       itself).
5. Apply the patches directly to the workspace files in migrate mode so that:
   - The current file is fully updated for all mapped components (do not skip
     usages unless they only involve deferred components), and
   - After a successful migration of a file, update the manifest:
     - Add the file path to `migrate.completedFiles` (if not already present).
     - Remove it from `migrate.pendingFiles` if that array exists.
   - If the agent stops or the chat ends mid-run, the manifest SHOULD still
     reflect all files that were successfully migrated so far, so that a
     future `migrate` invocation will continue from the remaining
     `pendingFiles` instead of reprocessing completed ones.

## Mode: status (optional but recommended)

The `status` mode is read-only and MUST NOT modify any workspace files. Its
purpose is to provide a quick, human-friendly overview of the current
migration progress for `projectName` using the persistent manifest.

1. Attempt to load the manifest for the given `projectName` from
   `.cursor/skills/mui-shadcn-app-migration/state/<projectName>.json`.
2. If no manifest exists yet:
   - Report that no migration state is available for this project and suggest
     running `analyze` (and then `plan`) first.
3. If a manifest exists:
   - Read, but do not mutate, its contents.
   - Derive and print a concise summary, such as:
     - How many files are in `plan.filesToTouch`.
     - How many files are in `migrate.completedFiles`.
     - How many files remain pending (i.e. `filesToTouch - completedFiles`).
     - Which major MUI components remain in pending files, if this can be
       inferred from the `analyze` section.
     - Any obvious warnings, for example:
       - A `codeVersionFingerprint` mismatch indicating that a fresh
         `analyze`/`plan` pass is recommended before further `migrate` runs.
4. The output should be:
   - Human-readable text for the user.
   - Optionally, a small JSON-like object mirroring the same high-level
     counts and booleans (e.g. `{ totalFiles, completedFiles, pendingFiles,
fingerprintMatches }`) so that later tooling or runs can consume it.

## Mode: fix (optional)

Use this after patches have been applied and Nx typecheck/lint/tests have been
run, and error output is available.

1. For each TypeScript or ESLint error:
   - Capture:
     - File path.
     - Error message.
     - The smallest code snippet that contains the faulty code plus a few
       surrounding lines.
2. Use the **self-repair prompt** in `references/mui-shadcn-prompts.md`:
   - Provide the error text and snippet.
   - Ask the LLM for a corrected version of that snippet only.
3. Return proposed replacements as patchable `{ before, after, location }`
   blocks, again without directly applying them unless instructed.

## Referenced files

Agents must use these references to guide prompts and mappings:

- `references/mui-shadcn-component-mappings.md`:
  - Canonical “before (MUI) / after (ShadCN)” examples per component.
  - Short notes on prop and structural mappings.
- `references/mui-shadcn-deferred-components.md`:
  - List of MUI components that are explicitly **out of scope** for automatic
    migration (e.g. `EmptyState`, `DataGrid`, `IndexTable`, `Tabs`, `ToolBar`,
    `PageHeader`, `ActionList`, `ConfigProvider`, and illustrations/icons).
- `references/mui-shadcn-type-mappings.md`:
  - Guidance for migrating MUI types/props (e.g. `Option`, grid types,
    icon props) to ShadCN-era value and prop types.
- `references/mui-shadcn-design-tokens-mappings.md`:
  - Guidance for migrating MUI design tokens (e.g. `Colors`, `Elevations`,
    typography helpers) to ShadCN/Tailwind tokens and utilities.
- `references/mui-shadcn-prompts.md`:
  - Reusable prompt templates for:
    - Single-component usage rewrite.
    - TypeScript/lint self-repair.

Only load mapping sections that are relevant to the components being migrated
in the current batch to keep context lean.
