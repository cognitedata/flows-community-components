import { FoundationTopicCard } from '@/components/foundations/foundation-topic-card';
import { PageTitle } from '@/components/page-title';
import { VISIBLE_FOUNDATION_TOPICS } from '@/lib/foundations-topics-data';

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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {VISIBLE_FOUNDATION_TOPICS.map((topic) => (
          <FoundationTopicCard key={topic.name} topic={topic} />
        ))}
      </div>
    </div>
  );
}
