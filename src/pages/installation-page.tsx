import { CodeBlock, CodeBlockCopyButton } from '@cognite/aura/components';
import { type ReactNode, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import {
  PackageManagerCommand,
  PackageManagerCommandTabs,
} from '@/components/community/package-manager-commands';
import { PageTitle } from '@/components/page-title';
import {
  auraPackageInstallCommands,
  auraStylesCssExample,
  componentsJsonExample,
  getInstallCommands,
  getInstallFromUrlCommands,
  registriesJsonExample,
  registryAddCommands,
  unknownRegistryErrorExample,
} from '@/lib/install-snippets';

const linkClassName =
  'font-medium text-link-fg hover:text-link-fg-hover hover:underline';

function Code({ children }: { children: ReactNode }) {
  return <code className="text-foreground">{children}</code>;
}

function Step({
  step,
  id,
  title,
  children,
}: {
  step: number;
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-4" aria-labelledby={id}>
      <div className="flex items-center gap-3">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-medium-bg text-sm font-medium text-foreground">
          {step}
        </span>
        <h2
          id={id}
          className="font-heading text-2xl font-semibold tracking-tight"
        >
          {title}
        </h2>
      </div>
      <div className="space-y-4 text-sm leading-relaxed text-muted-fg">
        {children}
      </div>
    </section>
  );
}

function Problem({
  title,
  children,
}: {
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="space-y-3">
      <h3 className="font-heading text-lg font-semibold tracking-tight">
        {title}
      </h3>
      <div className="space-y-3 text-sm leading-relaxed text-muted-fg">
        {children}
      </div>
    </div>
  );
}

function SourceBlock({
  code,
  language,
}: {
  code: string;
  language: 'json' | 'css' | 'bash';
}) {
  return (
    <CodeBlock code={code} language={language}>
      <CodeBlockCopyButton />
    </CodeBlock>
  );
}

export function InstallationPage() {
  const { hash } = useLocation();

  // Router navigation doesn't scroll to in-page anchors like #troubleshooting.
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    }
  }, [hash]);

  return (
    <>
      <PageTitle title="Installation — Aura Community" />
      <header className="mb-10 sm:mb-12">
        <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
          Installation
        </h1>
        <p className="mt-3 max-w-[60ch] text-muted-fg">
          Community components install with the shadcn CLI from the{' '}
          <Code>@aura</Code> registry. The CLI copies source into your
          repository; components are powered by <Code>@cognite/aura</Code>.
        </p>
      </header>

      <div className="max-w-[65ch] space-y-12">
        <section className="space-y-3" aria-labelledby="prerequisites">
          <h2
            id="prerequisites"
            className="font-heading text-2xl font-semibold tracking-tight"
          >
            Before you start
          </h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-fg">
            <li>A React app using Tailwind CSS v4.</li>
            <li>
              An <Code>@/*</Code> path alias in <Code>tsconfig.json</Code>{' '}
              (shadcn rewrites imports to it).
            </li>
            <li>
              Run the commands from the app&apos;s folder — the one that will
              hold <Code>components.json</Code>. In a monorepo, that&apos;s the
              workspace, not the repository root.
            </li>
          </ul>
        </section>

        <Step step={1} id="install-aura" title="Install Aura">
          <PackageManagerCommandTabs commands={auraPackageInstallCommands} />
          <p>Flows custom apps already include it — skip to the next step.</p>
        </Step>

        <Step step={2} id="add-registry" title="Add the @aura registry">
          <p>
            The shadcn CLI only knows the <Code>@aura</Code> namespace once
            it&apos;s listed under <Code>registries</Code> in{' '}
            <Code>components.json</Code>. Without it, every{' '}
            <Code>add @aura/…</Code> fails with{' '}
            <Code>Unknown registry &quot;@aura&quot;</Code>.
          </p>
          <p>
            <span className="font-medium text-foreground">
              Already have a components.json?
            </span>{' '}
            Let the CLI add the entry for you:
          </p>
          <PackageManagerCommand commands={registryAddCommands} />
          <p>That writes this into your existing file:</p>
          <SourceBlock code={registriesJsonExample} language="json" />
          <p>
            <span className="font-medium text-foreground">
              No components.json yet?
            </span>{' '}
            Create one at your app root. For Tailwind v4, leave{' '}
            <Code>tailwind.config</Code> empty and point{' '}
            <Code>tailwind.css</Code> at your app stylesheet:
          </p>
          <SourceBlock code={componentsJsonExample} language="json" />
          <p>
            We recommend this over <Code>shadcn init</Code>, which writes
            shadcn&apos;s default theme variables into your stylesheet — Aura
            already provides those.
          </p>
        </Step>

        <Step step={3} id="reference-styles" title="Reference Aura styles">
          <p>
            In the stylesheet set as <Code>tailwind.css</Code>, import Aura
            source styles so Tailwind can generate tokens and utilities, and add
            an <Code>@source</Code> for installed community components (adjust
            the path to match your project):
          </p>
          <SourceBlock code={auraStylesCssExample} language="css" />
          <p>
            Apps that don&apos;t use community components can import{' '}
            <Code>@cognite/aura/styles.css</Code> instead. Community components
            need <Code>styles.source.css</Code> plus <Code>@source</Code>.
          </p>
        </Step>

        <Step step={4} id="install-component" title="Install a component">
          <PackageManagerCommand commands={getInstallCommands('drawer')} />
          <p>
            Each item declares <Code>@cognite/aura</Code> as an npm dependency
            and copies its source into <Code>components/ui/community/</Code>.
            Browse the{' '}
            <Link to="/community/components" className={linkClassName}>
              component catalog
            </Link>{' '}
            for per-component commands.
          </p>
        </Step>

        <section className="space-y-8" aria-labelledby="troubleshooting">
          <h2
            id="troubleshooting"
            className="font-heading text-2xl font-semibold tracking-tight"
          >
            Troubleshooting
          </h2>

          <Problem title={<>Unknown registry &quot;@aura&quot;</>}>
            <SourceBlock code={unknownRegistryErrorExample} language="bash" />
            <p>
              The CLI looks for <Code>@aura</Code> in{' '}
              <Code>components.json</Code>, then the <Code>registries</Code>{' '}
              field in <Code>package.json</Code>, then shadcn&apos;s public
              registry directory. <Code>@aura</Code> is in none of those until
              you add it, so run the{' '}
              <a href="#add-registry" className={linkClassName}>
                registry add command
              </a>{' '}
              above. To skip the namespace entirely, install by URL:
            </p>
            <PackageManagerCommand
              commands={getInstallFromUrlCommands('drawer')}
            />
          </Problem>

          <Problem title="The CLI asks to run init, or can't find components.json">
            <p>
              You&apos;re either missing <Code>components.json</Code> or running
              from the wrong folder (for example a monorepo root). Run from the
              app folder, pass <Code>-c path/to/app</Code>, or create the file
              from{' '}
              <a href="#add-registry" className={linkClassName}>
                step 2
              </a>
              .
            </p>
          </Problem>

          <Problem title="404 or “Failed to fetch” for an @aura item">
            <p>
              Check that the URL in your <Code>registries</Code> entry matches
              step 2 exactly, including the <Code>{'{name}'}</Code> placeholder,
              and that the item name matches the catalog.
            </p>
          </Problem>

          <Problem title="Component renders without styles">
            <p>
              Tailwind isn&apos;t scanning the installed files. Make sure your
              stylesheet imports <Code>styles.source.css</Code> and its{' '}
              <Code>@source</Code> path points at{' '}
              <Code>components/ui/community</Code> relative to the stylesheet.
            </p>
          </Problem>
        </section>
      </div>
    </>
  );
}
