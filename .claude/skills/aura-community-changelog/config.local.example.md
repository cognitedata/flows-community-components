# Local config (copy to `config.local.md`, which is git-ignored)

This repo is public. Keep internal values here, never in committed files.

| Key | Value |
|---|---|
| aura_repo | `<org/private-monorepo>` |
| aura_path | `<path to Aura inside the monorepo>`; only PRs touching files under it count as Aura work |
| aura_changelog_path | `<path>/CHANGELOG.md` |
| component_path_pattern | `<aura_path>/src/components/ui/<name>/` |
| design_tokens | `<aura_path>/DESIGN.md` and `<aura_path>/src/colors.css` |
| slack_channel | `<Aura channel ID>` (context only, never quoted) |
| jira_board | `<project key / board>` (context only; no ticket keys or links in the output) |
| metrics_source | `<where the eval numbers come from>`; read three numbers each run, never invent them |
| figma_layout | `<Figma link to the post layout mock>` |

## Commands
List Aura-path commits in the window (squash merges end in `(#PR)`):

```bash
gh api "repos/<aura_repo>/commits?path=<aura_path>&since=<ISO date>&per_page=100" \
  --jq '.[] | [.sha[0:8], .commit.author.date[0:10], (.commit.message|split("\n")[0])] | @tsv'
gh pr view <n> --repo <aura_repo> --json title,body,files,author,reviews,commits,url
```

Strip internal ticket keys (e.g. `ABC-1234`) from all output. Treat build/tooling commits (Bazel, vitest, compiler options, lint) as internal unless user-visible.

## CDF read access (for `scripts/read-evals.mjs`)
Set in the environment where the run executes; never commit the secret.
```
CDF_BASE_URL=<cluster base URL>
CDF_PROJECT=<project>
CDF_TOKEN_URL=<OAuth token endpoint>
CDF_CLIENT_ID=<read-only service account>
CDF_CLIENT_SECRET=<its secret>
CDF_SERIES_PREFIX=<prefix of the metric time series>
```
