# Community contribution boundary

## Status

**Proposed** (2026-08-17)

- **Driver:** Aura team
- **Supersedes:** [2026-08-04 contribution model](./2026-08-04-aura-community-contribution-model.md) — submission file list, contributor experience (Q11). Distribution, review SLAs, and Core-upstreaming stay with that ADR.
- **Tags:** community, registry, contribution, pr-template

## Context

This repo is both the public Aura Community site and the `@aura` registry. Community components live inside the site tree (`src/components/ui/community/`). Adding one today also means editing site modules (`community-data.ts`, `community-catalog.ts`, barrel exports).

That mixes two jobs. External contributors should ship a registry item. They should not own, or be able to change, the public site.

## Decision

**A PR may change `community/` or `src/`, never both.** Catalog pages are generated from Storybook. Contributors never edit the site.

### 1. Split the tree

| Path | Owner | Purpose |
| --- | --- | --- |
| `community/<slug>/` | Contributors | Only allowed contribution surface |
| `src/` | Maintainers | Public site |
| `.storybook/` | Maintainers | Storybook config + `parameters.community` types |
| `registry.json`, `public/r/` | CI | Generated from `community/` |

Move existing items from `src/components/ui/community/<slug>/` to `community/<slug>/`. Consumer install **target** stays `src/components/ui/community/` so `shadcn add @aura/<slug>` does not change.

Each contribution is:

```
community/<slug>/
  <slug>.tsx
  <slug>.stories.tsx
  # extra runtime modules only if the component needs them
```

No `index.ts`, no `*.metadata.ts`, no site pages, nav, icons, or catalog lists.

**Path-guard:** fail if a PR touches both `community/` and `src/` (or any other maintainer path). `package.json` + `pnpm-lock.yaml` together are allowed only when a new runtime dependency is justified. Registry artifacts are built in CI, not committed.

**Import boundary:** community source may import `@cognite/aura`, relative files in its own folder, and declared npm deps. No `@/` site aliases.

**Registry:** stories stay in git for the catalog. `shadcn add` must not copy `*.stories.tsx`.

### 2. Storybook is the catalog

Drop `*.metadata.ts`. CSF `meta` is the committed source. The `parameters.community` type is a Storybook preview augmentation under `.storybook/` — maintainers own it; contributors only fill the object.

| Need | Where |
| --- | --- |
| Name | `title: 'Community/<Name>'` |
| Slug | folder name = slugify(title last segment). `Community/Empty State` → `empty-state` |
| What it does | `parameters.docs.description.component` |
| Props / API | `argTypes` + autodocs |
| Examples / states | stories |
| Negative scope, source, owner, status | `parameters.community` |

The site globs `community/**/*.stories.tsx`. Registry title/description come from the same `meta`.

### 3. PR template is a gate, not a second catalog

Community template (e.g. `.github/PULL_REQUEST_TEMPLATE/community.md`):

- **Slug** (must match folder)
- Checklist: `title`, description, `parameters.community`, and stories are filled — reviewers read the stories, not a restated PR body
- No Storybook URL field

**Chromatic is the PR Storybook publisher.** It already runs on pull requests. A bot comments the `Community/<Name>` URL. Review waits on that comment; authors do not paste a preview link at open. Chromatic must be required (token configured, publish must succeed) or the PR is not reviewable.

Site-only PRs use the default template and must not add `community/`.

### 4. Contribution guide

Short `CONTRIBUTING.md`: pre-screen → add `community/<slug>/` with CSF `meta` + stories → open a PR that touches only that folder → wait for the Chromatic comment. Point at this ADR. Do not instruct anyone to edit `src/`.

## Consequences

- Contributors have one folder. Stories are the only catalog contract.
- Mixed PRs and `@/` imports fail in CI, so site regressions from drive-by edits drop.
- One-time move + catalog auto-discovery + Chromatic-required-on-PR before the rule is enforceable.
- New runtime dependencies still need a maintainer look (`package.json` + lockfile).

## Plan

1. Add `community/`, move current components, point Storybook + `registry:build` at it; keep stories out of registry output.
2. Auto-wire catalog from CSF `meta` (slugify title); add `.storybook/` type for `parameters.community`; delete `*.metadata.ts`, barrels, and hand-maintained lists.
3. Stop requiring committed `public/r/` on community PRs; generate in CI.
4. Path-guard (xor `community/` vs `src/`) + import-boundary lint + community PR template + `CONTRIBUTING.md`.
5. Make Chromatic required on PRs; bot comments the story URL.
