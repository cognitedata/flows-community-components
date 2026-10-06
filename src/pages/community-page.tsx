import { Link } from 'react-router-dom';

import { PageTitle } from '@/components/page-title';
import { GITHUB_REPO_URL } from '@/lib/github';

const adrUrl = `${GITHUB_REPO_URL}/blob/main/docs/decisions/2026-08-04-aura-community-contribution-model.md`;
const coreDocsUrl = 'https://docs.cognite.com/aura-design-system';
const aiElementsUrl = 'https://elements.ai-sdk.dev/';

const flowSteps = [
  {
    title: 'Pre-screen',
    body: 'Use Slack or GitHub Discussions to check whether the need already exists in Aura Core, Community, or an in-progress contribution. Avoid duplicating intended Core behavior.',
  },
  {
    title: 'Source or build',
    body: 'Prefer adapting an existing Community or compatible shadcn/Base UI component. Otherwise build with Aura primitives and tokens from @cognite/aura.',
  },
  {
    title: 'Check conformance',
    body: 'Use semantic Aura tokens and Aura primitives where applicable. Run lint and typecheck before opening a PR.',
  },
  {
    title: 'Submit',
    body: 'Open a pull request with the component, metadata, Storybook coverage, and the submission checklist completed.',
  },
  {
    title: 'Review',
    body: 'Expect a lightweight human review for fit, functionality, Core duplication, and obvious conformance issues — not full design QA or Core promotion review.',
  },
  {
    title: 'Publish',
    body: 'Once approved, registry:build publishes the item so consumers can install it with npx shadcn@latest add @aura/<name>.',
  },
];

const submissionItems = [
  'Component name',
  'What it does, what it explicitly does not do, and when to use it',
  'Source: built with Aura, adapted from an attributed external source, or modified from a named Aura Core component',
  'Uses Aura semantic tokens and @cognite/aura primitives where applicable',
  'Lives under src/components/ui/community/<name>/',
  'Includes index.ts, <name>.metadata.ts, and Storybook stories titled Community/...',
  'pnpm run registry:build regenerates registry.json and public/r/',
  'pnpm lint and pnpm tsc -b pass',
  'Reviewer requested (or Code Owners)',
];

const searchOrder = [
  {
    label: 'Aura Core (@cognite/aura / Core docs)',
  },
  {
    label: 'Flows Community (this registry)',
  },
  {
    label: 'Compatible shadcn registries, preferring Base UI',
    example: {
      href: aiElementsUrl,
      name: 'AI Elements',
    },
  },
  {
    label: 'A new implementation using Aura primitives and tokens',
  },
];

export function CommunityPage() {
  return (
    <>
      <PageTitle title="Overview — Community — Aura" />
      <header className="mb-10 sm:mb-12">
        <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
          Overview
        </h1>
        <p className="mt-3 max-w-[60ch] text-muted-fg">
          Aura Community is a shared registry of components and app templates
          contributed alongside the core design system. Community components are
          ejectable registry source — not official Aura Core primitives — and
          are used at the consumer&apos;s discretion.
        </p>
      </header>

      <div className="max-w-[65ch] space-y-10">
        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-semibold tracking-tight">
            Search order
          </h2>
          <p className="text-sm leading-relaxed text-muted-fg">
            Before contributing, builders and agents should look for UI in this
            order:
          </p>
          <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-fg">
            {searchOrder.map((item) => (
              <li key={item.label}>
                <span className="text-foreground">
                  {item.label}
                  {item.example ? (
                    <>
                      {' '}
                      (for example,{' '}
                      <a
                        href={item.example.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-link-fg hover:text-link-fg-hover hover:underline"
                      >
                        {item.example.name}
                      </a>
                      )
                    </>
                  ) : null}
                </span>
              </li>
            ))}
          </ol>
          <p className="text-sm leading-relaxed text-muted-fg">
            Core docs:{' '}
            <a
              href={coreDocsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-link-fg hover:text-link-fg-hover hover:underline"
            >
              docs.cognite.com/aura-design-system
            </a>
            . Catalog:{' '}
            <Link
              to="/community/components"
              className="font-medium text-link-fg hover:text-link-fg-hover hover:underline"
            >
              Components
            </Link>
            .
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-semibold tracking-tight">
            Contribution flow
          </h2>
          <ol className="space-y-4">
            {flowSteps.map((step, index) => (
              <li key={step.title} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-medium-bg text-sm font-medium">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-heading text-base font-medium">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-fg">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-semibold tracking-tight">
            Submission checklist
          </h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-muted-fg">
            {submissionItems.map((item) => (
              <li key={item}>
                <span className="text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-semibold tracking-tight">
            References
          </h2>
          <ul className="space-y-2 text-sm text-muted-fg">
            <li>
              <a
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-link-fg hover:text-link-fg-hover hover:underline"
              >
                GitHub repository
              </a>
            </li>
            <li>
              <a
                href={adrUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-link-fg hover:text-link-fg-hover hover:underline"
              >
                Contribution model ADR
              </a>
            </li>
          </ul>
        </section>
      </div>
    </>
  );
}
