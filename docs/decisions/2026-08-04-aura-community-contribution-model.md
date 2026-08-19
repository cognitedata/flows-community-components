# Aura Community Contribution and Distribution Model

## Current status

**Proposed** (2026-08-04)

- **Driver:** Aura team
- **Tracking:** [AUR-646](https://cognitedata.atlassian.net/browse/AUR-646)
- **Tags:** aura, community, components, registry, distribution
- **Later:** contributor file list, PR shape, and Storybook-as-catalog are in [2026-08-17 contribution boundary](./2026-08-17-community-contribution-boundary.md).

## Context

Aura Core cannot directly build every component needed by Cognite teams,
customers, and external application builders. When a component such as a Gantt
chart, time-based slider, risk matrix, or specialized visualization is missing,
builders currently either wait for the Core roadmap or implement it in
isolation. The first option makes the Aura team a bottleneck; the second creates
duplication, visual inconsistency, and components that are difficult to
discover, upgrade, or reuse.

Aura Community provides a path to build and share industrial components without
holding them to the full Core quality and maintenance bar. It also provides a
feedback loop: net-new components show unmet demand, while modified or ejected
Core components show where Core APIs or behavior are insufficient.

### Scope

This decision covers distribution boundaries, repository and documentation
locations, the initial contribution flow, minimum Aura conformance, and
migration of existing Labs components.

### Non-goals

This decision does not make community components official Aura Core components,
define direct CDF connectivity, select every implementation tool, or settle the
governance and lifecycle questions listed below.

## Decision

### Use NPM for primitives and a registry for community components

Aura primitives remain versioned dependencies distributed through NPM.
Community components are distributed through a registry that copies source code
into the consumer's repository.

This gives Aura control over foundational behavior and tokens while allowing
builders to inspect, own, and modify higher-level component code. Registry items
must declare their Aura dependencies so installation can detect incompatible
primitive versions and prompt the consumer to update.

Builders and their agents should search in this order:

1. Aura Core;
2. Aura Community;
3. compatible shadcn registries, preferring components built on Base UI;
4. a new implementation using Aura primitives and tokens.

The registry model intentionally supports ejection. Modified versions of Aura
Core components are valid community submissions when they add behavior Core
does not support. These submissions are a first-class feedback channel.

### Reuse the former Aura repository for Aura Community

[cognitedata/aura](https://github.com/cognitedata/aura) becomes the single
community repository and registry. New community contributions must be directed
there to prevent another parallel Labs-style collection from forming.

Existing Labs components will be copied into this repository to provide initial
value. Their current Fusion versions will remain temporarily to avoid breaking
consumers. Removing or redirecting those versions requires a separate migration
plan and communication to affected teams.

The repository boundary makes the guarantees explicit:

- **Aura Core:** centrally maintained, fully reviewed, tested, documented, and
  supported;
- **Aura Community:** community-vetted, functional, Aura-conformant, and used at
  the consumer's discretion.

### Apply a lightweight contribution flow

A contribution follows this flow:

1. **Pre-screen:** use the designated Aura intake channel (e.g., Slack or GitHub
   Discussions) to check whether the need exists, duplicates intended Core
   behavior, or is already being built.
2. **Source or build:** adapt an existing Community or compatible shadcn/Base UI
   component where practical; otherwise use Aura primitives and tokens.
3. **Check conformance:** run automated token, primitive, and styling checks.
4. **Submit:** include the component, required metadata, Storybook coverage, and
   automated-check results in a pull request.
5. **Review:** perform a fast human sanity review for fit, functionality,
   duplication of Core, and obvious conformance issues.
6. **Publish:** make the approved component installable from the registry.
7. **Observe:** collect registry usage and modified-Core patterns.
8. **Evaluate for Core:** refer repeatedly reused or strategically important
   components for full Core conformance and ownership.

Community review is not full design QA, Core conformance review, or a roadmap
prioritization discussion.

### Require a standard submission contract

**Superseded** by [2026-08-17 contribution boundary](./2026-08-17-community-contribution-boundary.md): facts live on CSF `meta` (`parameters.community`), not a sidecar metadata file or a duplicated PR body. The required content is unchanged in spirit:

Every submission must include:

- component name;
- what it does, what it explicitly does **not** do, and when to use it;
- its source: built with Aura, adapted from an attributed external source, or
  modified from a named Aura Core component;
- evidence that automated token and primitive checks passed;
- confirmation that it uses semantic Aura tokens and Aura headless primitives
  where applicable;
- Storybook stories for default and key variants, plus interaction and data
  states for complex components;
- brief props/API documentation; and
- a requested reviewer or automatic assignment based on Code Owners.

The negative scope is required because it helps reviewers, humans, and agents
avoid selecting a component outside its intended purpose.

### Start with automated guardrails plus human judgment

The v1 conformance gate combines automation for objectively detectable token and
primitive violations with human review for suitability, naming, functionality,
duplication, and bypasses of intended Core behavior.

The exact implementation—agent skill, lint rules, CI checks, an Aura Doctor
command, or a combination—is not decided by this ADR.

### Make the existing GitHub Pages site the Community site

[cognitedata.github.io/aura](https://cognitedata.github.io/aura/) becomes the
Aura Community site and no longer redirects to the official Aura Core
documentation. It must clearly identify Community's different ownership and
support guarantees.

The site will explain when to use Core versus Community, how to search and
contribute, the review flow, and the requirement to use Aura primitives and
tokens. It will link to the community repository and Storybook. Structured
submission metadata may generate catalog pages later, but that automation is not
part of v1.

## Consequences

### Positive

- Builders can deliver missing industrial UI without waiting for the Core
  roadmap.
- Shared components remain connected to Aura primitives and tokens.
- Source ownership makes local customization explicit.
- Centralization improves discovery and reduces isolated implementations.
- Modified Core components provide evidence of missing Core capabilities.
- Registry usage can become a data-driven Core prioritization signal.

### Costs and risks

- Copied source can drift from newer Aura primitives or local changes.
- Community quality and support will vary more than Core.
- External sources introduce licensing and supply-chain obligations.
- Lightweight review can become a bottleneck without clear ownership.
- Temporarily retaining Labs components in Fusion creates duplicate locations.
- Missing naming and deprecation policies could leave overlapping or abandoned
  components in the registry.

## Alternatives considered

### All components through NPM

**Rejected.** Central versioning is stronger, but ejection is harder and
experimental components appear more like officially supported APIs.

### Primitives and components through a source registry

**Rejected.** Maximum ownership would create unacceptable primitive version drift
and weaken Aura's ability to ship coherent accessibility, token, and behavior
fixes.

### NPM primitives plus registry community components

**Chosen.** This preserves a stable foundation while making experimentation and
ejection safe and explicit.

### Keep community work in Fusion or the Aura Core repository

**Rejected.** A shared boundary obscures the different quality and support
contracts and risks continuing fragmented Labs-style contributions. Reusing the
former Aura repository gives contributors one clear destination.

## Open questions

The following points were discussed but not decided:

1. **Registry implementation:** exact registry tooling, source layout, namespace,
   install command, and hosting details beyond the chosen repository and site.
2. **Reviewer ownership:** whether one design *or* engineering reviewer is always
   sufficient, when both are required, the Code Owners group, and response time.
3. **Maintenance ownership:** whether the original contributor remains
   accountable and who handles abandonment, updates, and security fixes.
4. **Licensing and attribution:** acceptable licenses, required attribution, and
   when legal or open-source review is required.
5. **Security and supply chain:** vulnerability scanning, provenance, dependency
   policy, and malicious-code review.
6. **Naming and duplication:** the intake channel, proposal mechanism, naming
   rules, and how overlapping submissions are handled.
7. **Deprecation:** criteria and timeline for unused, abandoned, incompatible, or
   Core-superseded components.
8. **Usage telemetry:** raw pulls versus distinct apps or teams, duplicate
   counting, retention, and privacy.
9. **Upstreaming criteria:** number of distinct apps, observation window,
   qualitative factors, and whether a ranked set triggers review.
10. **Conformance tooling:** the balance between skills, CI/lint rules,
    recommended capable LLMs, dependency/hash audits, and an Aura Doctor CLI.
11. **Contributor experience:** **Decided** in [2026-08-17](./2026-08-17-community-contribution-boundary.md). Remaining: communication channels and first-timer support tone.
12. **CDF-aware components:** their architecture and risk model. This was
    explicitly deferred, with Q4 identified as a possible planning horizon.
13. **Documentation automation:** **Decided** in [2026-08-17](./2026-08-17-community-contribution-boundary.md): catalog pages are generated from CSF `meta`.

## Implementation outline

1. Re-enable the full site at the Community URL and identify it as Community.
2. Configure registry publication and installation tooling.
3. Add the contribution guide, pull request template, and Storybook catalog wiring
   ([2026-08-17](./2026-08-17-community-contribution-boundary.md)).
4. Implement minimum token and primitive conformance checks.
5. Establish review assignment and communication channels.
6. Inventory and copy Labs components while documenting their temporary Fusion
   compatibility path.
7. Define maintenance, security, deprecation, telemetry, and Core-upstreaming
   policies before general availability.

## Technical review checklist

- [ ] Security threat modelling and supply-chain review completed
- [ ] Open-source licensing and attribution process approved
- [ ] Accessibility expectations documented
- [ ] Usage telemetry privacy and retention reviewed
- [ ] Repository ownership and maintenance escalation agreed
- [ ] Labs migration and communication plan approved
