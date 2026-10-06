import { Link } from 'react-router-dom';

import {
  PackageManagerCommand,
  PackageManagerCommandTabs,
} from '@/components/community/package-manager-commands';
import {
  getInstallCommands,
  getInstallFromUrlCommands,
  registryAddCommands,
} from '@/lib/install-snippets';

const linkClassName =
  'font-medium text-link-fg hover:text-link-fg-hover hover:underline';

/** Install commands for one `@aura` registry item, plus the not-configured fallback. */
export function CommunityInstallSection({ name }: { name: string }) {
  return (
    <section className="mb-12 space-y-4" aria-labelledby="install-heading">
      <h2
        id="install-heading"
        className="font-heading text-2xl font-semibold tracking-tight"
      >
        Installation
      </h2>
      <PackageManagerCommandTabs commands={getInstallCommands(name)} />
      <p className="text-sm text-muted-fg">
        Requires the <code className="text-foreground">@aura</code> registry in
        your <code className="text-foreground">components.json</code> and Aura
        styles in your stylesheet. First time? Follow the{' '}
        <Link to="/community/installation" className={linkClassName}>
          installation guide
        </Link>
        .
      </p>
      <details className="rounded-xl border border-border px-4 py-3 text-sm text-muted-fg">
        <summary className="cursor-pointer font-medium text-foreground">
          Seeing <code>Unknown registry &quot;@aura&quot;</code>?
        </summary>
        <div className="mt-3 space-y-3">
          <p>
            The shadcn CLI only resolves <code>@aura/…</code> once the namespace
            is registered. Add it to your existing <code>components.json</code>,
            then re-run the command above:
          </p>
          <PackageManagerCommand commands={registryAddCommands} />
          <p>
            Or install straight from the registry URL, which skips the
            namespace:
          </p>
          <PackageManagerCommand commands={getInstallFromUrlCommands(name)} />
          <p>
            More fixes in{' '}
            <Link
              to="/community/installation#troubleshooting"
              className={linkClassName}
            >
              troubleshooting
            </Link>
            .
          </p>
        </div>
      </details>
    </section>
  );
}
