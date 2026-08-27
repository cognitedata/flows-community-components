import { IconPhoto } from '@tabler/icons-react';

import { FoundationTopicCard } from '@/components/foundations/foundation-topic-card';
import { PageTitle } from '@/components/page-title';
import { DOCUMENTATION_TOPICS } from '@/lib/documentation-topics-data';

export function DocumentationPage() {
  return (
    <div className="max-w-[1200px]">
      <PageTitle title="Documentation — Aura" />
      <header className="mb-10 sm:mb-12">
        <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
          Documentation
        </h1>
        <p className="mt-3 max-w-[60ch] text-muted-fg">
          Guides and reference material for installing, theming, and building
          with Aura.
        </p>
      </header>

      <div className="mb-16 flex h-64 flex-col items-center justify-center gap-3 rounded-2xl bg-muted-bg px-6 text-center sm:h-80 sm:mb-20">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-medium-bg text-muted-fg">
          <IconPhoto size={24} stroke={1.5} />
        </div>
        <p className="text-sm text-muted-fg">
          Documentation overview imagery coming soon
        </p>
      </div>

      <div className="@container grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {DOCUMENTATION_TOPICS.map((topic) => (
          <FoundationTopicCard
            key={topic.name}
            topic={topic}
            className={
              topic.colSpan === 2
                ? 'lg:col-span-2'
                : topic.colSpan === 3
                  ? 'lg:col-span-3'
                  : undefined
            }
          />
        ))}
      </div>
    </div>
  );
}
