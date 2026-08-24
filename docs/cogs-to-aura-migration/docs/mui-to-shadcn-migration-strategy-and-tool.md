---
name: mui-to-shadcn-migration-strategy-and-tool
overview: Repo-wide strategy and AI-assisted tooling to migrate a large React/TypeScript monorepo from MUI to ShadCN safely, incrementally, and under strict constraints.
todos:
  - id: groundwork-rules-and-ci
    content: Set up global no-MUI+ShadCN app-level lint/CI rules and temporary package publishing infrastructure.
    status: pending
  - id: tool-mvp
    content: Implement MVP mui-to-shadcn CLI with registry, Button and one simple prop-rename mapper, AST transform, and formatter.
    status: pending
  - id: pilot-lib-and-app
    content: Run the tool on a pilot shared lib and app, enforcing no MUI+ShadCN in the app and iterating on mappers.
    status: pending
  - id: scale-per-lib-per-app
    content: Apply the per-lib/per-app migration workflow across remaining libs and apps with small, component-scoped PRs.
    status: pending
  - id: merge-and-decommission-temp-libs
    content: Merge lib migration branches back to main, switch dependencies back to local ShadCN-based libs, and decommission -shadcn temporary packages.
    status: pending
isProject: false
---

## MUI → ShadCN Migration Strategy & Tool

### 1. Phased Rollout Plan

#### 1.1 Phase 0 – Repo-wide groundwork (once)

- **Define ownership & inventory**
  - **Catalog shared libs** that use MUI and the apps that depend on them (via Nx graph or `import` analysis).
  - **Assign an owner** (team) per shared lib and per app.
- **Define migration-time invariants (tool-level, not repo-wide rules)**
  - **AI tool invariant for apps**: when running in "ShadCN target" mode for an app, the tool must:
    - Refuse to produce a final patch that leaves any direct `@mui/*` imports in that app.
    - Refuse to introduce `@/components/ui-*` imports into an app unless it can remove all MUI imports in the same run.
  - **AI tool invariant for libs**: when producing a ShadCN variant of a shared lib, the tool must:
    - Refuse to mark the lib as "ShadCN-ready" or publish it under the `-shadcn` name if any MUI imports remain.
    - Treat long-lived migration branches as internal; only the ShadCN-only end state is considered publishable.
- **Set up temporary publish infrastructure**
  - Create a reusable Nx target/script to **build & publish** a lib to npm under a temporary name, e.g. `<lib>-shadcn`.
  - Standardize naming: `<lib-name>-shadcn` for ShadCN-variant packages.
  - Ensure these packages are marked clearly as **temporary/migration-only** in their `package.json` (e.g. `"private": false, "publishConfig": { "access": "restricted" }`).

#### 1.2 Phase 1 – Pilot a single lib + app

- **Select a small/medium shared lib** and **one app** that depends on it as the pilot.
- **Branching for the lib**
  - Create `lib-<name>-shadcn-migration` off `main`.
  - On this branch, you are allowed to:
    - Add ShadCN as a dependency.
    - Incrementally migrate components from MUI to ShadCN using the AI tool and manual edits.
- **Publish temporary ShadCN variant of the lib**
  - From the migration branch, configure an Nx target to build and publish as `<lib-name>-shadcn`.
  - Publish frequently but keep each publish in its own small PR (changes within the lib, under ~10k LOC, ideally much less).
- **Update pilot app to consume ShadCN variant**
  - In the app on `main`:
    - Replace the local lib dependency with `<lib-name>-shadcn`.
    - This PR should **not yet introduce ShadCN directly in the app**; it just switches the shared lib source.
    - Ensure CI still passes (MUI usage may remain in the app, but coming transitively from the temporary package).
  - Next PR(s): migrate the app’s direct UI from MUI to ShadCN using the migration tool.
    - The PR applies only ShadCN-based `import`s in app code.
    - The temp lib may still internally use MUI during the transition.
- **Enforce the no MUI + ShadCN rule at app level**
  - Enable the ESLint/CI rule for the pilot app.
  - As part of the final migration PR for that app:
    - Confirm the app imports only ShadCN (and any wrappers/composition utilities), not MUI.

#### 1.3 Phase 2 – Scale per-lib and per-app

- **Per shared lib (lib-owner workflow)**
  1. Create/refresh `lib-<name>-shadcn-migration` from `main`.
  2. Use the migration tool to:
  - Transform MUI components to ShadCN equivalents inside the lib.
  - Keep changes **scoped** (e.g. by component group: buttons, forms, modals).
  1. For each logical cluster of components migrated (e.g. all `Button` usages):
  - Open a PR from `lib-<name>-shadcn-migration` to itself (or to a short-lived feature branch) with only those files.
  - Run tests/lint/typecheck; accept small but safe changes.
  1. After a stable batch:
  - Rebuild & republish `<lib-name>-shadcn`.
- **Per app (app-owner workflow)**
  1. For each shared lib the app depends on, switch its dependency to the `-shadcn` variant when that lib is sufficiently migrated.
  2. Run the migration tool scoped to the app:
  - First migrate simple components (e.g. buttons, text, icons) → small PRs.
  - Then migrate more complex patterns (modals, tables, forms) in separate PRs.
  1. After each PR:
  - Ensure lint rule passes (no app file uses both MUI and ShadCN imports).
  - Keep visual and functional regression risk manageable.

#### 1.4 Phase 3 – Converge back to local ShadCN-based libs

- **Condition for merging a lib’s migration branch**
  - All apps depending on that lib have switched from local path to the `<lib-name>-shadcn` package **and** are ShadCN-only at the app level.
- **Merge process**
  1. Merge `lib-<name>-shadcn-migration` into `main` (resolving conflicts with any interim MUI changes).
  2. In `main`, update app dependencies from `<lib-name>-shadcn` back to the local lib (now ShadCN-based).
  3. Ensure all apps still satisfy the **no MUI + ShadCN app code** rule.
- **Decommission temporary package**
  - Remove CI publishing for `<lib-name>-shadcn`.
  - Optionally unpublish or deprecate the version on npm with a clear message.

### 2. Keeping PRs Small but Effective

- **Component-scope batching**
  - Group migrations by component or small sets of components (e.g. `Button` & `IconButton`, later `Modal`, etc.), not entire libs/apps at once.
- **Project-scope bounding**
  - Run the tool **per lib or per app at a time**, with CLI flags for `--project` and `--components`.
- **Avoid large mechanical churn**
  - Let the tool keep formatting and ordering stable (prettier), to avoid huge diffs from stylistic changes.
- **Layered PRs**
  - PR 1: Introduce temp package dependency / wiring.
  - PR 2..N: Actual component migrations (per component group).
  - PR N+1: Clean-up PR (remove dead code, remove last MUI imports, tighten lint rules).

### 3. Enforcing “No MUI + ShadCN in Same App” (via the tool)

- **Tool-side import checks**
  - Before writing changes for a given app, the tool:
    - Scans the app’s source tree for `@mui/*` and `@/components/ui-*` imports.
    - Determines whether the app is currently MUI-only, ShadCN-only, or mixed.
  - In "MUI → ShadCN" mode for an app, the tool must:
    - Plan transformations so that **all** direct MUI imports in that app are removed in the same patch where ShadCN imports are introduced.
    - Abort (with a clear report) if it cannot map every MUI usage it finds, rather than leaving a mixed MUI+ShadCN state.
- **Lib-level publish guard**
  - When preparing to publish a `-shadcn` variant of a shared lib, the tool:
    - Verifies there are no remaining `@mui/*` imports in that lib’s code.
    - Refuses to publish if any MUI imports remain, forcing a complete migration for that lib.
- **Optional repo integration (future)**
  - If desired later, these invariants can be mirrored with ESLint/CI or Nx tag rules, but they are **not required** for the core migration flow—the AI tool enforces them in its own pipeline.

### 4. AI-Assisted Migration Tool – High-Level Design

#### 4.1 Modules & Responsibilities

- **CLI entrypoint (`mui-to-shadcn-cli`)**
  - Accepts:
    - `--project <name>` (lib or app).
    - `--components <list>` (e.g. `Button,Modal`).
    - `--mode` (`analyze` | `migrate` | `fix`).
  - Invokes the pipeline and reports summary (files changed, errors).
- **Project scanner**
  - Resolves the set of source files in the given project.
  - Uses TS project config (`tsconfig.json`) to locate files for parsing.
- **TS/JSX parser & AST transformer**
  - Uses `ts-morph` or the TS Compiler API to:
    - Parse files.
    - Find imports from MUI packages.
    - Build `MUIElementModel` instances for JSX usages.
    - Replace them with ShadCN JSX produced by mapper functions.
- **Mapper registry module**
  - Exposes `MUIElementModel`, `MapperFn`, and the `mappers` registry.
  - Encodes composition patterns in plain TSX functions.
- **Import manager**
  - Adjusts imports per file:
    - Removes unused MUI imports.
    - Adds ShadCN imports and any app/lib-level wrapper imports (e.g. `AppButtonLoadingWrapper`).
- **Code printer & formatter**
  - Prints transformed AST back to disk using TS printer.
  - Runs Prettier on modified files to normalize formatting.
- **Validation runner**
  - After a migration batch, runs:
    - Typecheck (e.g. `pnpm nx test <project>` or `pnpm nx typecheck <project>` if available).
    - Lint (e.g. `pnpm nx lint <project>`).
    - Unit tests (optional or configurable when time-consuming).
- **Feedback/LLM fixer module**
  - For files with errors, collects:
    - Original snippet (MUI JSX).
    - Transformed ShadCN JSX.
    - Compiler/lint/test error messages.
  - Calls an LLM endpoint to propose **corrected ShadCN JSX**, following the same mapping patterns.
  - Applies the LLM’s patch locally (ideally in a separate `fix` mode run) and revalidates.

#### 4.2 Data Flow (per file)

```mermaid
flowchart TD
  start[Start migrate command]
  scan[Scan project files]
  parse[Parse TS/JSX AST]
  findUsages[Find MUI imports & JSX]
  buildModel[Build MUIElementModel]
  applyMapper[Apply mapper registry]
  updateImports[Update imports]
  printFile[Print & format]
  validate[Run typecheck/lint/tests]
  collectErrors[Collect failing snippets]
  llmFix[LLM fixer (optional)]
  endNode[End]

  start --> scan --> parse --> findUsages --> buildModel --> applyMapper --> updateImports --> printFile --> validate
  validate -->|"no errors"| endNode
  validate -->|"errors"| collectErrors --> llmFix --> validate
```

### 5. Minimal Implementation Path (Optimize for Time)

#### 5.1 MVP scope

- **Limit initial support** to a small subset of components, e.g. `Button`, `IconButton`, `Text`, `Stack`.
- **Focus on replace-in-place transformations**:
  - Same file, same structure, just convert JSX and imports.
- **Single-mode CLI**
  - Implement `--mode migrate` only; run validation separately via existing Nx commands.
- **Manual feedback loop first**
  - Initially, just write out a JSON report of errors and snippets.
  - Manually use an LLM (or a thin wrapper script) to fix problematic cases.
  - Only later automate the feedback loop step.

#### 5.2 Implementation steps

- Implement mapper registry with **one real mapper** (Button) plus a **trivial prop-rename-only component**.
- Implement parser/transformer that:
  - Recognizes imports from MUI.
  - Handles named imports like `{ Button }` and `MUIButton` aliases.
  - Builds `MUIElementModel` with `componentName`, `packageName`, `props`, `children`.
- Implement importer updater + code printer.
- Wire up a basic CLI that runs on a single project and logs a summary.

### 6. Bootstrapping with Button and Scaling Up

#### 6.1 Types & registry core

```typescript
// shared/materialToShadCN/types.ts
import type { ReactNode } from 'react';

export type MUIElementModel = {
  componentName: string;
  packageName: string;
  props: Record<string, unknown>;
  children: ReactNode;
};

export type MapperFn = (model: MUIElementModel) => ReactNode;

export type MapperKey = `${string}.${string}`; // "<package>.<component>"
```

```typescript
// shared/materialToShadCN/registry.ts
import type { MapperFn, MapperKey } from './types';

const registry = new Map<MapperKey, MapperFn>();

export function registerMapper(key: MapperKey, fn: MapperFn) {
  registry.set(key, fn);
}

export function getMapper(key: MapperKey): MapperFn | undefined {
  return registry.get(key);
}

export function hasMapper(key: MapperKey): boolean {
  return registry.has(key);
}
```

#### 6.2 Button mapper (composition example)

- **Goal**: Map `@mui/material.Button` to the real ShadCN button shape used in the codebase, including loading, size, icon placement, and toggled state.

```typescript
// shared/materialToShadCN/mappers/button.tsx
import type { ReactNode } from "react";
import { Button as ShadCNButton, Loader } from "@/components/ui";
import { IconPlus } from "lucide-react";
import type { MUIElementModel } from "../types";

export function mapMUIButtonToShadCN(model: MUIElementModel): ReactNode {
  const { children, props } = model;

  const {
    type = "primary",
    size = "medium",
    icon,
    iconPlacement = "left",
    loading = false,
    toggled = false,
    disabled,
    onClick,
  } = props as {
    type?: "primary" | "secondary" | "tertiary" | "ghost";
    size?: "small" | "medium" | "large";
    icon?: ReactNode;
    iconPlacement?: "left" | "right";
    loading?: boolean;
    toggled?: boolean;
    disabled?: boolean;
    onClick?: () => void;
  };

  const variant =
    type === "primary"
      ? "default"
      : type === "secondary"
        ? "secondary"
        : "ghost";

  const shadcnSize =
    size === "small" ? "sm" : size === "large" ? "lg" : "default";

  const className = toggled ? "bg-accent" : undefined;

  const content = loading ? (
    <Loader size={16} />
  ) : (
    <>
      {iconPlacement === "left" && <IconPlus />}
      {children}
      {iconPlacement === "right" && <IconPlus />}
    </>
  );

  return (
    <ShadCNButton
      variant={variant}
      size={shadcnSize}
      disabled={loading || disabled}
      onClick={onClick}
      className={className}
    >
      {content}
    </ShadCNButton>
  );
}
```

#### 6.3 Tooltip mapper (compound API example)

- **Goal**: Map wrapper-style MUI `Tooltip` usages to ShadCN’s compound `Tooltip` + `TooltipTrigger` + `TooltipContent` + `TooltipProvider` API.

```typescript
// shared/materialToShadCN/mappers/tooltip.tsx
import type { ReactNode } from "react";
import {
  Tooltip as ShadCNTooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui";
import type { MUIElementModel } from "../types";

export function mapMUITooltipToShadCN(model: MUIElementModel): ReactNode {
  const { children, props } = model;

  const {
    content,
    placement = "top",
    disabled = false,
    enterDelay = 0,
  } = props as {
    content: ReactNode;
    placement?: "top" | "bottom" | "left" | "right";
    disabled?: boolean;
    enterDelay?: number;
  };

  const side = placement;

  if (disabled) {
    return children;
  }

  return (
    <TooltipProvider delayDuration={enterDelay}>
      <ShadCNTooltip open={undefined}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side}>{content}</TooltipContent>
      </ShadCNTooltip>
    </TooltipProvider>
  );
}
```

#### 6.4 Modal mapper (Dialog composition example)

- **Goal**: Map `@mui/material.Modal` to ShadCN `Dialog` with header/footer/buttons as in the real migration examples.

```typescript
// shared/materialToShadCN/mappers/modal.tsx
import type { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Button as ShadCNButton,
} from "@/components/ui";
import type { MUIElementModel } from "../types";

export function mapMUIModalToShadCN(model: MUIElementModel): ReactNode {
  const { children, props } = model;

  const {
    visible,
    onCancel,
    onOk,
    title,
    cancelText,
    okText,
    okDisabled,
    className,
    t,
  } = props as {
    visible: boolean;
    onCancel: () => void;
    onOk: () => void;
    title?: ReactNode;
    cancelText?: ReactNode;
    okText?: ReactNode;
    okDisabled?: boolean;
    className?: string;
    t?: (key: string) => string;
  };

  return (
    <Dialog open={visible} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className={className}>
        {title ? (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        ) : null}
        {children}
        <DialogFooter>
          <ShadCNButton variant="secondary" onClick={onCancel}>
            {cancelText ?? t?.("cancel")}
          </ShadCNButton>
          <ShadCNButton onClick={onOk} disabled={okDisabled}>
            {okText ?? t?.("save")}
          </ShadCNButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

#### 6.5 Dropdown mapper (Dropdown → DropdownMenu)

- **Goal**: Map MUI `Dropdown` usages with `trigger` and `Dropdown.Item` children into ShadCN’s `DropdownMenu` compound components.

```typescript
// shared/materialToShadCN/mappers/dropdown.tsx
import type { ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui";
import type { MUIElementModel } from "../types";

export function mapMUIDropdownToShadCN(model: MUIElementModel): ReactNode {
  const { children, props } = model;

  const { trigger } = props as { trigger: ReactNode };

  const items = Array.isArray(children) ? children : [children];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent>
        {items}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

#### 6.6 Input mapper (label + input composition)

- **Goal**: Map MUI `Input` with `label` and `errorMessage` props into ShadCN `Label` + `Input` composition.

```typescript
// shared/materialToShadCN/mappers/input.tsx
import type { ReactNode } from "react";
import { Input as ShadCNInput, Label } from "@/components/ui";
import type { MUIElementModel } from "../types";

export function mapMUIInputToShadCN(model: MUIElementModel): ReactNode {
  const { props } = model;

  const {
    value,
    onChange,
    placeholder,
    disabled,
    errorMessage,
    label,
    id,
    name,
  } = props as {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    disabled?: boolean;
    errorMessage?: ReactNode;
    label?: ReactNode;
    id?: string;
    name?: string;
  };

  const inputId = id ?? name ?? "input";

  return (
    <div>
      {label ? <Label htmlFor={inputId}>{label}</Label> : null}
      <ShadCNInput
        id={inputId}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        errorMessage={errorMessage}
      />
    </div>
  );
}
```

#### 6.7 Loader mapper (simple prop-preserving example)

- **Goal**: Show a trivial case where the MUI and ShadCN APIs are nearly identical, useful as a template.

```typescript
// shared/materialToShadCN/mappers/loader.tsx
import type { ReactNode } from "react";
import { Loader as ShadCNLoader } from "@/components/ui";
import type { MUIElementModel } from "../types";

export function mapMUILoaderToShadCN(model: MUIElementModel): ReactNode {
  const { props } = model;

  const { size = 24 } = props as { size?: number };

  return <ShadCNLoader size={size} />;
}
```

### 7. Scaling the Mapper Set

- **Prioritization**
  - Start with components that:
    - Are heavily used (e.g. button, typography, layout primitives).
    - Have relatively straightforward mappings.
- **Mapper development workflow**
  - For each new component:
    1. Write a mapper function using real-world usages as examples.
    2. Add a unit test harness that:
    - Feeds `MUIElementModel` samples.
    - Snapshots the rendered ShadCN JSX.
    1. Run the migration tool on a sample app/lib.
    2. Fix issues and update mapper.
- **Composition patterns**
  - When a mapping requires wrappers (e.g. loading states, permission gates, layouts):
    - Implement those wrappers in app/shared libs.
    - Import wrappers in mapper functions.
    - Keep ShadCN components themselves as stateless, pure UI.

### 8. Feedback Loop & Continuous Improvement

- **Per-run feedback**
  - After each migration run:
    - Collect all type, lint, and test failures and group by component.
    - Where failures are systematic (e.g. missing required prop), update the mapper itself.
- **LLM-assisted fixes**
  - For edge cases where static rules struggle:
    - Feed the error context to an LLM and let it propose JSX patches.
    - Store accepted patches as additional examples or test fixtures for the mapper.
- **Corpus of before/after examples**
  - Maintain a small library of `MUI JSX → ShadCN JSX` pairs per component.
  - Use this corpus to:
    - Validate new mapper changes.
    - Provide few-shot examples to the LLM when generating or fixing mappings.

### 9. Summary of Execution Steps

- **Step 1**: Implement the core tool (registry, basic AST transformer, Button + initial mappers for Tooltip, Modal, Dropdown, Input, Loader, and CLI).
- **Step 2**: Run on a single pilot lib and single pilot app, with strict no MUI+ShadCN rule enforced at app level.
- **Step 3**: Iterate on mappers & tool based on validation / PR feedback, adding more components as needed.
- **Step 4**: Roll out per-lib migration branches, publish `-shadcn` variants, and migrate apps in small PRs grouped by component.
- **Step 5**: Merge migration branches back to main once all dependent apps are ShadCN-only and revert dependencies from temporary packages to local ShadCN-based libs.
