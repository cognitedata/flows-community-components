import { PageTitle } from '@/components/page-title';

export function ChartsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-[1200px] px-4 pt-chrome-pad pb-24 sm:pt-chrome-pad-sm">
        <PageTitle title="Charts — Aura" />
        <header className="mb-10 sm:mb-12">
          <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
            Charts
          </h1>
          <p className="mt-3 max-w-[60ch] text-muted-fg">
            Content for this page is on the way.
          </p>
        </header>
      </div>
    </main>
  );
}
