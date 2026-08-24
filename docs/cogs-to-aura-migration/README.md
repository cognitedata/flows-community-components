# MUI → ShadCN Migration Handover

This package contains everything needed to understand, plan, and drive the
migration of the React monorepo from the **MUI** design system
(`@mui/material`, `@mui/lab`, `@mui/system`, MUI /
styled-components) to **ShadCN** (`@/components/ui`, Tailwind / shadcn, lucide-react
icons).

It consists of two parts:

1. **A Cursor skill** (`skill/`) — an LLM-only, per-project migration workflow
   (analyze → plan → migrate → fix → status) with reusable prompts and
   canonical component/type/token mapping references.
2. **Strategy and planning docs** (`docs/`) — five living design documents
   describing the repo-wide rollout strategy, two direct-replacement plans,
   an adapter-layer alternative, and an agentic migration-tool plan.

## Contents at a glance

```
mui-shadcn-migration-handover/
├── README.md                         ← you are here
├── skill/                            ← Cursor skill (drop into .cursor/skills/)
│   ├── SKILL.md
│   ├── references/
│   │   ├── mui-shadcn-component-mappings.md
│   │   ├── mui-shadcn-deferred-components.md
│   │   ├── mui-shadcn-design-tokens-mappings.md
│   │   ├── mui-shadcn-type-mappings.md
│   │   └── mui-shadcn-prompts.md
│   └── state/
│       └── apps/
│           └── web-app.json       ← example persisted manifest
└── docs/
    ├── mui-to-shadcn-migration-strategy-and-tool.md
    ├── mui-shadcn-migration-plan-v1.md
    ├── mui-shadcn-migration-plan-v2.md
    ├── mui-shadcn-adapter-plan.md
    └── mui-shadcn-migration-tool-plan.md
```

## Recommended reading order

If you are new to the effort, read in this order:

1. `docs/mui-to-shadcn-migration-strategy-and-tool.md` — the top-level
   phased rollout strategy (groundwork → pilot → scale → merge back /
   decommission) and the hard invariants that apply repo-wide.
2. `docs/mui-shadcn-migration-plan-v2.md` — the current direct-replacement
   plan with refreshed per-component snippets (Button, Tooltip, Modal,
   Tabs, Select, …) against the standalone ShadCN repo. Supersedes v1.
3. `docs/mui-shadcn-migration-plan-v1.md` — the original direct-replacement
   plan. Kept for historical context and side-by-side diff reading; v2 is
   the source of truth for component mappings.
4. `docs/mui-shadcn-adapter-plan.md` — the alternative **adapter library**
   design (`libs/mui-shadcn-adapter`) that exposes the MUI public API and
   swaps MUI↔ShadCN implementations via per-component feature flags. Useful
   if we decide a gradual, zero-change-to-consumers ramp is preferable.
5. `docs/mui-shadcn-migration-tool-plan.md` — a detailed design for an
   **agentic CLI tool** (`tools/migrate-mui-shadcn`) that automates
   repo-wide analysis, tier classification, codemods + LLM-assisted
   transforms, a self-repair loop, and PR generation. Complementary to
   the skill — the skill is the LLM-only execution surface; this plan is
   the path to hardening those transforms into a reproducible tool.
6. `skill/SKILL.md` — the operational contract for using the skill from a
   Cursor agent, including persistent manifest shape, modes, and
   per-mode behavior.
7. `skill/references/*` — canonical mapping examples you will want to cite
   or have the agent auto-load as needed.

## The two complementary approaches

These documents describe **two approaches** to the migration that are
compatible, not competing:

- **Direct replacement** (skill + `mui-shadcn-migration-plan-v2.md`): rewrite
  every mapped MUI usage in a project to ShadCN in one sweep per file. This
  is what the skill actually does today, driven by the LLM and the mapping
  references.
- **Adapter layer** (`mui-shadcn-adapter-plan.md`): keep the MUI public API
  and switch implementations underneath via per-component feature flags.
  Useful for apps we cannot afford to migrate directly in a single pass.

The **agentic migration tool** (`mui-shadcn-migration-tool-plan.md`) is the
longer-term home for deterministic codemods + LLM-assisted structural
changes that the skill performs ad-hoc today.

The **strategy doc** (`mui-to-shadcn-migration-strategy-and-tool.md`) is the
umbrella that sets invariants, phased rollout, and per-lib / per-app
workflows that both approaches must respect.

## The Cursor skill — what it is

`skill/SKILL.md` defines a Cursor skill named `mui-shadcn-app-migration`.
It is **LLM-only** (no ts-morph / jscodeshift). A Cursor agent loads it
and operates one React project (app or shared lib) at a time.

### Modes

| Mode      | Purpose                                                                                         |
| --------- | ----------------------------------------------------------------------------------------------- |
| `analyze` | Scan the project for MUI imports, produce per-file and per-component counts.                   |
| `plan`    | Intersect analysis with available mappings; enumerate files + usages to migrate.                |
| `migrate` | Whole-file rewrites via the LLM, using `references/` as canonical before/after patterns.        |
| `fix`     | Focused self-repair from TS/ESLint output after a migration pass.                               |
| `status`  | Read-only summary from the persistent manifest (files touched, completed, pending, warnings).   |

### Global invariants enforced by the skill

- **Whole-file migration only.** A file is either fully migrated for every
  mapped, non-deferred MUI component, or left untouched for this run.
  Never migrate one component type across many files.
- **Mixed MUI + ShadCN is tolerated** only when the remaining MUI usages
  in the file reference explicitly **deferred** components (see
  `references/mui-shadcn-deferred-components.md`).
- **LLM-only transforms.** All changes are produced as text patches by the
  LLM, guided by the mapping references.
- **Prop-type fidelity.** Prefer `ComponentProps<typeof SomeShadCNComponent>`
  over hand-rolled prop shapes when wrapping ShadCN primitives.
- **Tailwind over styled-components.** Do not introduce new
  styled-components wrappers around ShadCN. Migrate `Colors.*`,
  `Elevations.*`, and typography helpers to Tailwind utilities / ShadCN
  tokens per `references/mui-shadcn-design-tokens-mappings.md`.
- **Behavioral surface preserved.** Do not silently add or drop props,
  and avoid extra wrapper elements.

### Persistent manifest (resume across chats)

Every mode reads and writes a per-project manifest at:

```
.cursor/skills/mui-shadcn-app-migration/state/<projectName>.json
```

Minimum shape (agents may extend):

```json
{
  "projectName": "web-app",
  "version": 1,
  "analyze": {
    "completedAt": "2026-03-13T10:05:00.000Z",
    "muiComponentsByFile": { "apps/.../file.tsx": ["Button", "Tooltip"] },
    "componentUsageCounts": { "Button": 14, "Tooltip": 6 }
  },
  "plan": {
    "filesToTouch": ["apps/.../file.tsx"],
    "usagesByFile": { "apps/.../file.tsx": [{ "component": "Button", "startLine": 42, "endLine": 56 }] }
  },
  "migrate": {
    "completedFiles": ["apps/.../file.tsx"],
    "pendingFiles": []
  },
  "codeVersionFingerprint": {
    "packageJsonHash": "…",
    "projectJsonHash": "…"
  }
}
```

A fingerprint mismatch invalidates the cached `analyze` / `plan` and forces
a re-scan before the next `migrate` run.

An **example manifest** from the example app is included at
`skill/state/apps/web-app.json` to illustrate the schema with real data.

## Reference files (inside the skill)

- `mui-shadcn-component-mappings.md` — canonical before/after JSX per MUI
  component. This is the bulk of the mapping knowledge and the main
  context fed to the LLM during `migrate`.
- `mui-shadcn-deferred-components.md` — components explicitly **out of
  scope** for automatic migration (EmptyState, DataGrid, IndexTable,
  Tabs, ToolBar, PageHeader, ActionList, ConfigProvider, illustrations
  and icons). Agents must leave these in place until a dedicated section
  is added to the component mappings file.
- `mui-shadcn-type-mappings.md` — prop and value-type migrations
  (e.g. `Option<T>`, grid/column types, icon props).
- `mui-shadcn-design-tokens-mappings.md` — `Colors.*`, `Elevations.*`,
  typography helpers → Tailwind / ShadCN tokens.
- `mui-shadcn-prompts.md` — reusable prompt templates:
  `rewrite_single_component_usage`, `rewrite_file_with_multiple_usages`,
  `self_repair_typescript_error`.

## How to use the skill in a new workspace

1. Copy the `skill/` directory into your React workspace at
   `.cursor/skills/mui-shadcn-app-migration/`.
2. Optionally drop the `docs/` files into `docs/` for team reference.
3. In a Cursor chat, invoke the skill by describing the task, e.g.
   *"Use the mui-shadcn-app-migration skill to analyze and plan the
   `web-app` project, then migrate its first 5 files."*
4. The agent should:
   - Read `SKILL.md` and load only the reference sections relevant to
     the components actually present in the target project.
   - Create / update `skill/state/<projectName>.json`.
   - Produce whole-file patches guided by `references/` and the prompts.
5. After a pass, run Nx typecheck / lint / tests on the touched project
   and feed any errors into `mode: fix` for self-repair.

## How the docs in `docs/` complement the skill

| Doc | Use when… |
| --- | --------- |
| `mui-to-shadcn-migration-strategy-and-tool.md` | You are scoping phases, defining invariants, planning temporary `<lib>-shadcn` packages, or deciding pilot lib/app. |
| `mui-shadcn-migration-plan-v2.md` | You need the current per-component direct-replacement reference (ShadCN standalone repo). Source of truth for mappings. |
| `mui-shadcn-migration-plan-v1.md` | You want the historical baseline for comparison; v2 supersedes it. |
| `mui-shadcn-adapter-plan.md` | You are evaluating the adapter-library alternative where consumers keep the MUI API and implementations swap behind a feature flag. |
| `mui-shadcn-migration-tool-plan.md` | You are building the long-term migration CLI (`tools/migrate-mui-shadcn`) with deterministic codemods + LLM-assisted structural edits. |

## Known open questions / follow-ups

- Tabs, DataGrid, IndexTable, PageHeader, ActionList, ToolBar,
  EmptyState, ConfigProvider, and illustrations/icons are all **deferred**
  in the skill. Each needs a design decision before automatic migration.
- The migration tool in `mui-shadcn-migration-tool-plan.md` is a plan, not
  yet implemented. The skill is the current operational tooling.
- Temporary `<lib>-shadcn` publishing infra (phase 0 of the
  strategy doc) is not yet set up.
- Per-app feature flags that drive the adapter plan
  (`mui-shadcn-adapter-plan.md`) are a design proposal, not yet wired up.

## File inventory

### `skill/`

- `SKILL.md` — the skill contract: modes, invariants, manifest shape,
  mode-by-mode procedure.
- `references/mui-shadcn-component-mappings.md` — canonical JSX per
  component (Button, Tooltip, Modal, Select, …).
- `references/mui-shadcn-deferred-components.md` — out-of-scope list.
- `references/mui-shadcn-type-mappings.md` — prop/value type migrations.
- `references/mui-shadcn-design-tokens-mappings.md` — colors, elevations,
  typography.
- `references/mui-shadcn-prompts.md` — LLM prompt templates.
- `state/apps/web-app.json` — example persisted manifest from the
  example app.

### `docs/`

- `mui-to-shadcn-migration-strategy-and-tool.md` — phased rollout plan and
  invariants for the whole repo.
- `mui-shadcn-migration-plan-v1.md` — original direct-replacement plan.
- `mui-shadcn-migration-plan-v2.md` — updated direct-replacement plan
  against the standalone ShadCN repo. Current source of truth.
- `mui-shadcn-adapter-plan.md` — `libs/mui-shadcn-adapter` design.
- `mui-shadcn-migration-tool-plan.md` — agentic migration CLI design.
