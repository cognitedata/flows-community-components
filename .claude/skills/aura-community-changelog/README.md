# aura-community-changelog

A Claude Code skill that produces a public, visual biweekly changelog post (self-contained HTML) from merged Aura and community-repo work. See `SKILL.md` for the workflow and `examples/sample-2026-10-21.html` for a finished report.

## Set up
1. Copy `config.local.example.md` to `config.local.md` (git-ignored) and fill in the internal values, including the CDF read-access settings used by `scripts/read-evals.mjs` for the three eval cards: put the non-secret ones in `config.local.env` (copy `config.local.env.example`) and store the secret in the macOS Keychain with `security add-generic-password -s aura-changelog-cdf -a "$USER" -w`. Never paste the secret into a chat or commit it. The reader has run against live data; spot-check the numbers against Fusion.
2. Requirements on the machine that runs it:
   - `gh` logged in with access to the private Aura monorepo.
   - Google Chrome (used headless by `scripts/capture-story.sh`).
   - macOS `sips` for image cropping (or swap in another tool).
   - Optional Claude connectors: Slack, Jira and Figma (context only).
3. Try it by hand first: ask Claude to "run the aura-community-changelog skill". Check the review table and the draft.

## Run it manually
Open a session in this repo and ask Claude: "Run the aura-community-changelog skill." It follows `SKILL.md`: set the window, gather, filter, show you the review table, then render with `scripts/render-report.py`. Pieces also work on their own:
- `node scripts/read-evals.mjs [compareDays] [YYYY-MM-DD]` prints the three eval cards as of a date.
- `scripts/capture-story.sh <storybook-url> <story-id> <out.png> [w] [h] [scale]` takes a Storybook screenshot.
- `python3 scripts/render-report.py <content.json> <out.html>` builds the report from a content file (see `examples/`).

## Automate (every two weeks)
A scheduled task in the Claude desktop app runs every Wednesday at about 9:07 and the task itself checks whether a report is due (the newest report in `src/lib/whats-new-data.ts` ended 13 or more days ago), because cron can't express "every other week". When due it prepares a draft in `~/aura-changelog-drafts/<end-date>/`: the content file, the screenshots, a rendered `report.html` and the Included / Excluded / Uncertain review table. It does not edit the repo, push or publish, and it notifies you. Review the table and the draft, then ask Claude to "publish the changelog draft from ~/aura-changelog-drafts/<end-date>", which adds the report to the site on a new branch and opens a PR.

The task only fires while the desktop app is open and the Mac is awake; if it was closed at the scheduled time it runs when you next open the app. It needs `gh` access to the private Aura repo, Google Chrome, CDF read access (see Set up) and this repo checked out at the path in the task. A plain GitHub Action is not a fit: it would need private-repo access, Chrome and a Claude session.

## Safety
- This repo is public. Internal details stay in `config.local.md`; review tables name private PRs, so keep `review-*.md` and `shots/` out of the repo.
- Only merged work is published. Slack and Jira are context only and are never quoted.
- Publishing is a PR to this repo (HTML in `public/whats-new-posts/`, entry in `src/lib/whats-new-data.ts`); a person reviews and merges it. Scheduled runs never publish.

## Contents
- `SKILL.md`: workflow and rules
- `config.md`, `config.local.example.md`: settings (public / internal)
- `references/`: safety filter, Storybook mapping, styling
- `assets/post-template.html`: the fixed post layout
- `scripts/capture-story.sh`: headless-Chrome Storybook screenshots
- `scripts/read-evals.mjs`, `metrics.json`: the three eval cards (definitions and CDF reader)
- `scripts/render-report.py`: builds the report from a content file: self-contained HTML, and with `--data-out` a `report.json` plus image files that the site renders natively
- `examples/`: a finished report and the content file it was built from
