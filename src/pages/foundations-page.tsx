import { IconPhoto } from '@tabler/icons-react';

import { FoundationTopicCard } from '@/components/foundations/foundation-topic-card';
import { PageTitle } from '@/components/page-title';
import { FOUNDATION_TOPICS } from '@/lib/foundations-topics-data';

export function FoundationsPage() {
  return (
    <div className="max-w-[1200px]">
      <PageTitle title="Foundations — Aura" />
      <header className="mb-10 sm:mb-12">
        <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
          Foundations
        </h1>
        <p className="mt-3 max-w-[60ch] text-muted-fg">
          The principles, tokens, and building blocks that every Aura component
          is built on.
        </p>
      </header>

      <div className="mb-16 flex h-64 flex-col items-center justify-center gap-3 rounded-2xl bg-muted-bg px-6 text-center sm:h-80 sm:mb-20">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-medium-bg text-muted-fg">
          <IconPhoto size={24} stroke={1.5} />
        </div>
        <p className="text-sm text-muted-fg">
          Foundations overview imagery coming soon
        </p>
      </div>

      <div className="@container grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FOUNDATION_TOPICS.map((topic) => (
          <FoundationTopicCard
            key={topic.name}
            topic={topic}
            className={topic.colSpan === 2 ? 'lg:col-span-2' : undefined}
          />
        ))}
      </div>
    </div>
  );
}
