import { CodeBlock, CodeBlockCopyButton } from '@cognite/aura/components';
import { Link } from 'react-router-dom';

import {
  auraStylesCssExample,
  componentsJsonExample,
  installCommandExample,
} from '@/lib/install-snippets';

export default function CommunityInstallationPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <div className="space-y-3">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Installation
        </h1>
        <p className="text-lg text-muted-foreground">
          Point your Flows Community project at the registry, then install
          components with the shadcn CLI. Items are powered by Aura and depend
          on <code className="text-foreground">@cognite/aura</code>.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Add the registry namespace
        </h2>
        <p className="text-sm text-muted-foreground">
          Add this to your{' '}
          <code className="text-foreground">components.json</code> (or merge
          with an existing file). For Tailwind v4, leave{' '}
          <code className="text-foreground">tailwind.config</code> empty and set{' '}
          <code className="text-foreground">tailwind.css</code> to your app
          stylesheet path.
        </p>
        <CodeBlock code={componentsJsonExample} language="json">
          <CodeBlockCopyButton />
        </CodeBlock>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Reference Aura styles
        </h2>
        <p className="text-sm text-muted-foreground">
          In the stylesheet pointed to by{' '}
          <code className="text-foreground">tailwind.css</code>, import Aura
          source styles so Tailwind can generate tokens and utilities. Add a{' '}
          <code className="text-foreground">@source</code> for installed
          community components (adjust the path to match your project).
        </p>
        <CodeBlock code={auraStylesCssExample} language="css">
          <CodeBlockCopyButton />
        </CodeBlock>
        <p className="text-sm text-muted-foreground">
          Install <code className="text-foreground">@cognite/aura</code> from
          NPM first. Product apps that do not scan community source can use{' '}
          <code className="text-foreground">@cognite/aura/styles.css</code>{' '}
          instead; Flows Community components need{' '}
          <code className="text-foreground">styles.source.css</code> plus{' '}
          <code className="text-foreground">@source</code>.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Install a component
        </h2>
        <p className="text-sm text-muted-foreground">
          Community items copy source into your repository and declare{' '}
          <code className="text-foreground">@cognite/aura</code> as an npm
          dependency.
        </p>
        <CodeBlock code={installCommandExample} language="bash">
          <CodeBlockCopyButton />
        </CodeBlock>
        <p className="text-sm text-muted-foreground">
          Browse the{' '}
          <Link
            to="/community"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            component catalog
          </Link>{' '}
          for per-component install commands.
        </p>
      </section>
    </div>
  );
}
