# Public safety filter

The post is public, so it should describe only what already shipped. The goal is to avoid publishing strategy or unfinished thinking that was never meant to be public.

## Include
- PRs that are **merged** within the window and user-visible (new/updated components, fixes, docs, tooling people can use).
- CHANGELOG entries from releases cut in the window.

## Exclude
- Open, draft or closed-unmerged PRs.
- Internal-only refactors, CI/dependency bumps with no user impact (mention at most as one "maintenance" line).
- Anything labeled or described as roadmap, RFC, spike, experiment, prototype, WIP, "behind a flag" or "not yet released".
- Mentions of customers, partners, pricing, internal teams' plans, deadlines or headcount.
- Slack content: no quotes, names, screenshots, or paraphrases of discussion about unreleased work.
- Internal URLs (Jira, Figma, internal Storybook, Slack links).

## Uncertain (send to the review gate, don't decide alone)
- Merged PRs whose description hints at follow-up work or a larger initiative.
- Changes to components that appear to be unreleased or flagged.
- Anything where the PR title is cryptic and you can't explain the user-visible effect.

## Banned-language checklist (scan the final text)
"coming soon", "next quarter", "we're planning", "roadmap", "upcoming", "will soon", "we're exploring", "experimental", "internal", "customer", names of customers/partners, "TBD", "WIP".

Rephrase to describe what is available today, or drop the sentence.
