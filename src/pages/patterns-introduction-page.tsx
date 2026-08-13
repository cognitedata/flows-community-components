import { PageTitle } from "@/components/page-title";

export function PatternsIntroductionPage() {
  return (
    <>
      <PageTitle title="Introduction — Aura Patterns" />
      <header className="mb-10 sm:mb-12">
        <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
          Introduction
        </h1>
        <p className="mt-3 max-w-[60ch] text-muted-fg">
          An overview of the Aura pattern library, how it&apos;s organized, and how to find what
          you need.
        </p>
      </header>
      <p className="max-w-[65ch] text-sm leading-relaxed text-muted-fg">
        Content for this page is on the way. In the meantime, browse the full pattern catalog
        or jump straight to a specific pattern using the list on the left.
      </p>
    </>
  );
}
