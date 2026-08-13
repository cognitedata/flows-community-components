import { Link } from 'react-router-dom';

import { PageTitle } from '@/components/page-title';
import {
  auraStylesCssExample,
  componentsJsonExample,
  installCommandExample,
} from '@/lib/install-snippets';

export function InstallationPage() {
  return (
    <>
      <PageTitle title="Installation — Aura Community" />
      <header className="mb-10 sm:mb-12">
        <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
          Installation
        </h1>
        <p className="mt-3 max-w-[60ch] text-muted-fg">
          Point your project at the registry, then install components with the
          shadcn CLI. Items are powered by Aura and depend on{' '}
          <code className="text-foreground">@cognite/aura</code>.
        </p>
      </header>

      <div className="max-w-[65ch] space-y-10">
        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-semibold tracking-tight">
            Add the registry namespace
          </h2>
          <p className="text-sm leading-relaxed text-muted-fg">
            Add this to your{' '}
            <code className="text-foreground">components.json</code> (or merge
            with an existing file). For Tailwind v4, leave{' '}
            <code className="text-foreground">tailwind.config</code> empty and
            set <code className="text-foreground">tailwind.css</code> to your
            app stylesheet path.
          </p>
          <pre className="overflow-x-auto rounded-xl border border-border bg-muted-bg p-4 text-sm">
            <code>{componentsJsonExample}</code>
          </pre>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-semibold tracking-tight">
            Reference Aura styles
          </h2>
          <p className="text-sm leading-relaxed text-muted-fg">
            In the stylesheet pointed to by{' '}
            <code className="text-foreground">tailwind.css</code>, import Aura
            source styles so Tailwind can generate tokens and utilities. Add a{' '}
            <code className="text-foreground">@source</code> for installed
            community components (adjust the path to match your project).
          </p>
          <pre className="overflow-x-auto rounded-xl border border-border bg-muted-bg p-4 text-sm">
            <code>{auraStylesCssExample}</code>
          </pre>
          <p className="text-sm leading-relaxed text-muted-fg">
            Install <code className="text-foreground">@cognite/aura</code> from
            NPM first. Product apps that do not scan community source can use{' '}
            <code className="text-foreground">@cognite/aura/styles.css</code>{' '}
            instead; community components need{' '}
            <code className="text-foreground">styles.source.css</code> plus{' '}
            <code className="text-foreground">@source</code>.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-heading text-2xl font-semibold tracking-tight">
            Install a component
          </h2>
          <p className="text-sm leading-relaxed text-muted-fg">
            Community items copy source into your repository and declare{' '}
            <code className="text-foreground">@cognite/aura</code> as an npm
            dependency.
          </p>
          <pre className="overflow-x-auto rounded-xl border border-border bg-muted-bg p-4 text-sm">
            <code>{installCommandExample}</code>
          </pre>
          <p className="text-sm leading-relaxed text-muted-fg">
            Browse the{' '}
            <Link
              to="/community"
              className="font-medium text-link-fg hover:text-link-fg-hover hover:underline"
            >
              component catalog
            </Link>{' '}
            for per-component install commands.
          </p>
        </section>
      </div>
    </>
  );
}
