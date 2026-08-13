import { PageTitle } from '@/components/page-title';
import { PatternCard } from '@/components/patterns/pattern-card';
import { PATTERNS } from '@/lib/patterns-data';

export function PatternsPage() {
  return (
    <>
      <PageTitle title="Patterns — Aura" />
      <header className="mb-16 sm:mb-20">
        <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
          Patterns
        </h1>
        <p className="mt-3 max-w-[60ch] text-muted-fg">
          Reusable solutions to common UI problems, built from Aura components.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {PATTERNS.map((pattern) => (
          <PatternCard key={pattern.name} pattern={pattern} />
        ))}
      </div>
    </>
  );
}
