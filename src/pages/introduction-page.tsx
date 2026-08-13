import { PageTitle } from '@/components/page-title';

export function IntroductionPage() {
  return (
    <>
      <PageTitle title="Introduction — Aura" />
      <header className="mb-10 sm:mb-12">
        <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
          Introduction
        </h1>
        <p className="mt-3 max-w-[60ch] text-muted-fg">
          An overview of the Aura component library, how it&apos;s organized,
          and how to find what you need.
        </p>
      </header>
      <p className="max-w-[65ch] text-sm leading-relaxed text-muted-fg">
        Content for this page is on the way. In the meantime, browse the full
        component catalog or jump straight to a specific component using the
        list on the left.
      </p>
    </>
  );
}
