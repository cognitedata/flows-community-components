import { Link } from 'react-router-dom';

import { getCommunityCatalog } from '@/lib/community-catalog';

export default function CommunityPage() {
  const items = getCommunityCatalog();

  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <div className="space-y-3">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Components
        </h1>
        <p className="text-lg text-muted-foreground">
          Flows Community components from the{' '}
          <code className="text-foreground">@aura</code> registry, powered by
          Aura. They depend on{' '}
          <code className="text-foreground">@cognite/aura</code> for Core
          primitives and tokens.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          All Components
        </h2>
        <div className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
          {items.map((item) => (
            <Link
              key={item.id}
              to={`/community/${item.id}`}
              className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </section>

      <p className="text-sm text-muted-foreground">
        Prefer Aura Core when a primitive already covers your need. Core docs:{' '}
        <a
          href="https://docs.cognite.com/aura-design-system"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          docs.cognite.com/aura-design-system
        </a>
        .
      </p>
    </div>
  );
}
