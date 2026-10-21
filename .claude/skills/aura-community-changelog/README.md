# aura-community-changelog

A Claude Code skill that produces a public, visual biweekly changelog post (self-contained HTML) from merged Aura and community-repo work. See `SKILL.md` for the workflow and `examples/sample-2026-10-16.html` for a finished post.

## Set up
1. Copy `config.local.example.md` to `config.local.md` (git-ignored) and fill in the internal values, including the CDF read-access variables used by `scripts/read-evals.mjs` for the three eval cards. Check the first run's numbers against Fusion; the script has not been run against live data yet.
2. Requirements on the machine that runs it:
   - `gh` logged in with access to the private Aura monorepo.
   - Google Chrome (used headless by `scripts/capture-story.sh`).
   - macOS `sips` for image cropping (or swap in another tool).
   - Optional Claude connectors: Slack, Jira and Figma (context only).
3. Try it by hand first: ask Claude to "run the aura-community-changelog skill for the last 14 days". Check the review table and the draft.

## Automate (every two weeks)
Create a scheduled task in the Claude desktop app (or ask Claude to use the `schedule` skill) with a prompt like:

> Run the aura-community-changelog skill for the last 14 days. Stop at the review gate: save the Included / Excluded / Uncertain table and the draft HTML outside the repo, then notify me. Don't publish anything.

Biweekly is awkward in plain cron, so run it on the 1st and 15th (`0 9 1,15 * *`) or schedule weekly and let the prompt skip alternate weeks. The run needs a person at the review gate, so it ends with a notification, not a publish. This does not run well in a plain GitHub Action: it needs `gh` access to a private repo, Chrome and a Claude session.

## Safety
- This repo is public. Internal details stay in `config.local.md`; review tables name private PRs, so keep `review-*.md` and `shots/` out of the repo.
- Only merged work is published. Slack and Jira are context only and are never quoted.
- Publishing is a PR to this repo (HTML in `public/whats-new-posts/`, entry in `src/lib/whats-new-data.ts`); a person reviews and merges it.

## Contents
- `SKILL.md`: workflow and rules
- `config.md`, `config.local.example.md`: settings (public / internal)
- `references/`: safety filter, Storybook mapping, styling
- `assets/post-template.html`: the fixed post layout
- `scripts/capture-story.sh`: headless-Chrome Storybook screenshots
- `scripts/read-evals.mjs`, `metrics.json`: the three eval cards (definitions and CDF reader)
- `examples/`: a finished sample post
