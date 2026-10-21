---
name: aura-community-changelog
description: Generates a public-facing, visual biweekly changelog / blog post for the community website covering the last two weeks of shipped Aura and community-repo work, with screenshots of changed components. Use this whenever the user asks for a community changelog, "what we shipped" post, biweekly update, release roundup, or public blog about Aura or community work, even if they don't say "skill". It is public, so it only covers merged work and never strategy.
---

# Aura Community Changelog

Produces a self-contained HTML draft that highlights what was **shipped** in the last 14 days across the Aura library and the community repo. The audience is developers, designers, stakeholders and PMs: technical enough to be useful, high-level enough to skim.

The post is public. That is the single most important constraint: a leaked roadmap item or half-formed idea is hard to take back once published. So the design is conservative: only merged, released work is a source of content, and a human approves the item list before anything is rendered. This repo is public too, so internal details (private repo names, Slack, Jira, Figma links) live in `config.local.md`, which is git-ignored. Never copy them into committed files or the post.

Read `config.md` and `config.local.md` first (see `config.local.example.md` if the local file is missing). If a value is still a placeholder, ask the user before gathering.

## Workflow

### 1. Set the window
End = today, start = today minus `window_days` (default 14). State the dates back to the user.

### 2. Gather (read-only)
- **Aura library** (a path inside a larger private monorepo, so filter by path): list commits touching `aura_path` since the window start, take the `(#PR)` numbers from the squash-merge subjects, then fetch each PR's title, body, files, author and reviewers with `gh pr view`. Don't use `gh pr list --search` with a path filter; it has none and silently returns nothing. Commands are in `config.local.md`. Add changelog entries for releases cut in the window.
- **Community repo**: `gh pr list --repo <community_repo> --state merged --search "merged:>=YYYY-MM-DD" --json number,title,body,files,author,mergedAt,url`. Skip bot PRs (dependabot).
- **Jira board** (if configured): context only, to understand why merged work matters. Never a source of items, never quoted, no ticket keys or links in the output.
- **Slack channel** (if configured): read recent messages only to understand *why* an already-merged change matters or how people reacted. Never a source of new items; nothing is quoted or attributed, because channel talk often includes unreleased thinking.
- **Metrics/evals**: run `node scripts/read-evals.mjs` to read the three eval cards from the weekly Aura eval's CDF time series (definitions in `metrics.json`; connection settings in `config.local.md`). It prints each card's value and its change versus the reading a week earlier (the eval runs weekly, even though the post is biweekly). If it can't run (no credentials, no data), ask the user for the numbers. Never invent or estimate them.

### 3. Filter
Apply `references/safety-filter.md`. In short: merged and released only; drop internal-only refactors, anything about roadmap, RFCs, experiments (including components the community site labels "Experimental"), customers, pricing or future plans. When unsure, put the item in **Uncertain** rather than guessing either way.

### 4. Fit items into the fixed post structure
The structure never changes (layout from the Figma mock in `config.local.md`; see `assets/post-template.html`):

1. **Header**: date range, title, 1-2 sentence key takeaways, then **exactly 3 eval/metric cards** (name, subtitle, number + unit, short description). The cards are fixed and named for what they measure: **Adoption** (Aura coverage), **Missed opportunities** (components rebuilt instead of reused) and **Quality** (usage-quality findings), from the weekly Aura eval (see `metrics.json`). Each card has a footer with a zigzag trending arrow and one line such as "Up 3.2 pts from last week" or "Down 2 from last week" (percent metrics change in percentage points). The arrow points the way the number moved; its color shows whether that is good (green) or bad (red) using each metric's `higherIsBetter`, and flat or unknown changes stay muted. `read-evals.mjs` supplies the direction, the good/bad flag and the text. Only the numbers and the footer change each run. When the eval brief changes between weeks, say so in the subtitle or the intro, because the trend then mixes app difficulty with Aura quality.
2. **Highlights**: **exactly 3**. Each has a landscape (3:2) image, a title, a **one-sentence** description, and a link when a sensible public one exists (community site page, Storybook story, public docs).
3. **Components**: new components, updates and fixes. Card = title, subtitle (e.g. Aura / Community), badge (New / Update / Fix), image, one sentence, optional link.
4. **Context & skills**: updates to content, docs, agent skills, design.md. Same card format.
5. **Other news**: anything that fits neither. Same card format.
6. **Thank you**: everyone who contributed in any way: PR authors, reviewers, commit co-authors (humans only; skip bots such as gemini-code-assist, cursoragent, claude), as GitHub handles.

**Section summaries:** the line under every section heading (Highlights, Components, Context & skills, Other news, Thank you) is a one- or two-sentence summary of the actual work in that section's cards, written fresh each run. Never reuse a generic tagline like "new and noteworthy updates".

Categories 3-5 appear only if they have something to report; leave the whole section out otherwise. Cards fill the container with **at most 3 per row** (the template uses a 6-column grid: a row of 3 spans 2 each, a row of 2 spans 3, a lone card spans 6; a trailing single card becomes 2+2 with the row above). Every description is one sentence; put extra detail behind a link.

### 5. Visuals
Chromatic (the Aura Storybook) refuses iframe embedding, so use screenshots, not iframes. Every highlight and every item that names a component gets an image.
- **Aura components**: find the story ID (`references/storybook-mapping.md`), then run `scripts/capture-story.sh <storybook_base_url> <story-id> shots/<name>.png [width] [height] [scale]` (headless Chrome). Small components (avatar, pickers, counts) look best with a tight window and scale 2-3.
- **Community components**: crop the component's page on the community site, captured with the same headless Chrome. For WebGL pages (Map), add `--use-angle=swiftshader --enable-unsafe-swiftshader` and drop `--disable-gpu`; the Map still did not finish loading in headless mode, so it may need a manual screenshot.
- **Missing story**: use the closest related story or a clearly labelled illustration (SVG), and list the substitution in the review table. Highlights may use a generated graphic.
- Look at every PNG before using it.
- **Clean edges**: crop so no rounded container corners or page background land on the image's own corners (they show as gray/dark pixels once the card rounds the image again). Trim about 24px for panels and 6-14px for small boxes (`sips -c <h-top-bottom> <w-left-right> --cropOffset <top> <left>`), avoid cutting through text, and don't give the image wrapper a background colour (a white one shows as a light fringe), except behind small white captures where it matches the image.
- Inline images as base64 so the post is one self-contained file, and link each to its live Storybook story or community page.

### 6. Write copy
- One plain sentence per item describing the user-visible change, not the implementation.
- Link to public places only (community site, Storybook, public docs). Don't link PRs in private repos, Jira, Slack or Figma.
- Tone: friendly, confident, specific. No hype, no future promises ("coming soon", "next we will").

### 7. Review gate (required)
Show the user a table of **Included / Excluded (with reason) / Uncertain** items, the proposed highlights, and any visual substitutions. Wait for approval or edits before rendering. In a scheduled run, stop here, save the table as `review-YYYY-MM-DD.md` outside the repo or in a git-ignored folder (it names private PRs), and notify the user.

### 8. Render
Fill `assets/post-template.html` (replace the `{{...}}` placeholders and duplicate the marked blocks). The template already carries the Aura tokens (light and dark, transparent page background); if Aura's colors change, re-sync them (`references/aura-styling.md`). Save as `aura-changelog-YYYY-MM-DD.html` with CSS inline so the file is self-contained. `examples/sample-2026-10-16.html` shows a finished post.

### 9. Final safety pass and publish
Re-read the rendered text against the banned-language checklist in `references/safety-filter.md`. Confirm no Slack quotes or names, no ticket keys, and no internal URLs. Then, once the user approves, publish to the community site's **What's new** section:
1. Copy the HTML to `public/whats-new-posts/<slug>.html`, where `<slug>` is the end date, e.g. `2026-10-16`. (Use this folder, not `public/whats-new/`: that path collides with the `/whats-new/:slug` route.)
2. Add an entry at the top of `WHATS_NEW_POSTS` in `src/lib/whats-new-data.ts`: `slug`, `title`, `month` (the date range, e.g. `Oct 16 – 30, 2026`), `excerpt` (the post's key takeaways), an `icon`, and `embed: '<slug>.html'`. The post page then shows the HTML in an iframe that sizes itself to the content.
3. Preview with `pnpm run dev` and open `/whats-new`, then open a PR. Never merge or deploy without explicit user confirmation.
The What's new page lists reports newest first in a left sidebar, labelled by date range; the top entry is the current report and the default page. Every report page opens with a note pointing to the full changelog (`/aura/documentation/changelog`), so the post itself doesn't need to repeat it. The post has no page background of its own and follows the site's light/dark theme. Don't publish while the eval cards still show placeholders.

## Scheduling
See `README.md`. The scheduled run stops at the review gate and notifies the user.
