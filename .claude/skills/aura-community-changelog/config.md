# Config (public-safe values only)

Internal values (private repo names, Slack, Jira, Figma, metrics source) live in `config.local.md`, which is git-ignored. Copy `config.local.example.md` to create it.

| Key | Value |
|---|---|
| window_days | 14 |
| community_repo | `cognitedata/flows-community-components` |
| community_site | https://cognitedata.github.io/flows-community-components (routes under `/community/...`, e.g. `/community/map`, `/community/templates/dashboard`) |
| storybook_base_url | `https://master--695bb4b1b8041ae09768950a.chromatic.com` (Chromatic build of master; `index.json` loads without login) |
| post_title_format | `Aura & Community Updates` with the date range shown above the title |
| community_platform | this repo's Vite/React site, deployed to GitHub Pages |
| publish_method | write `report.json` and images to `public/whats-new-posts/<slug>/` with `render-report.py`, which also rebuilds `index.json` (see SKILL.md step 9) |

## Eval cards
The three header cards come from the weekly Aura eval (an AI agent builds an app from a fixed brief, then an `aura-review` audit scores it). Their names, units and one-sentence descriptions are in `metrics.json`; `scripts/read-evals.mjs` reads the values from CDF. Percent metrics are stored as 0-1 fractions and shown as percentages.

## Notes
- **Chromatic refuses iframe embedding** ("refused to connect"), so posts use screenshots from `scripts/capture-story.sh`. It needs Google Chrome installed on the machine that runs the job.
- The Chromatic `master` build can lag recent merges, so a new component may have no story yet. Use the closest story or a labelled illustration and flag it in the review table.
- To list story IDs, dump the index with Chrome (a fetch tool truncates the large file): `chrome --headless=new --dump-dom <storybook_base_url>/index.json`, then parse the JSON out of the `<pre>` element.
