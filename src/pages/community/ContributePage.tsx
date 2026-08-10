import { Link } from 'react-router-dom';

const repoUrl = 'https://github.com/cognitedata/flows-community-components';
const adrUrl = `${repoUrl}/blob/main/docs/decisions/2026-08-04-aura-community-contribution-model.md`;
const coreDocsUrl = 'https://docs.cognite.com/aura-design-system';

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
    body: 'Once approved, registry:build publishes the item so consumers can install it with pnpm dlx shadcn@latest add @aura/<name>.',
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
  'Aura Core (@cognite/aura / Core docs)',
  'Flows Community (this registry)',
  'Compatible shadcn registries, preferring Base UI',
  'A new implementation using Aura primitives and tokens',
];

export default function CommunityContributePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <div className="space-y-3">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Contribute
        </h1>
        <p className="text-lg text-muted-foreground">
          Flows Community is a shadcn registry for shared industrial components,
          powered by Aura. Community components are ejectable registry source —
          not official Aura Core primitives — and are used at the
          consumer&apos;s discretion.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Search order
        </h2>
        <p className="text-sm text-muted-foreground">
          Before contributing, builders and agents should look for UI in this
          order:
        </p>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
          {searchOrder.map((item) => (
            <li key={item}>
              <span className="text-foreground">{item}</span>
            </li>
          ))}
        </ol>
        <p className="text-sm text-muted-foreground">
          Core docs:{' '}
          <a
            href={coreDocsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            docs.cognite.com/aura-design-system
          </a>
          . Catalog:{' '}
          <Link
            to="/community"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Components
          </Link>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Contribution flow
        </h2>
        <ol className="space-y-4">
          {flowSteps.map((step, index) => (
            <li key={step.title} className="flex gap-4">
              <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                {index + 1}
              </span>
              <div className="space-y-1">
                <h3 className="text-base font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Submission contract
        </h2>
        <p className="text-sm text-muted-foreground">
          Every submission must include the following. Negative scope matters —
          say what the component does <strong>not</strong> do so reviewers and
          agents do not misuse it.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          {submissionItems.map((item) => (
            <li key={item}>
              <span className="text-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Open a pull request
        </h2>
        <p className="text-sm text-muted-foreground">
          Contributions land in{' '}
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            cognitedata/flows-community-components
          </a>
          . Use the repository PR template checklist. Modified Core components
          are valid Community submissions when they add behavior Core does not
          support — that is an intentional feedback channel.
        </p>
        <p className="text-sm text-muted-foreground">
          Full decision record:{' '}
          <a
            href={adrUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Community contribution model ADR
          </a>
          .
        </p>
      </section>
    </div>
  );
}
