import { PageTitle } from "@/components/page-title";

export function SkillsPage() {
  return (
    <>
      <PageTitle title="Skills — Aura Community" />
      <header className="mb-10 sm:mb-12">
        <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">Skills</h1>
        <p className="mt-3 max-w-[60ch] text-muted-fg">
          Agent-ready skills that teach coding assistants how to use community components
          correctly.
        </p>
      </header>
      <p className="max-w-[65ch] text-sm leading-relaxed text-muted-fg">
        Content for this page is on the way. In the meantime, browse the community component
        catalog or jump straight to a specific component using the list on the left.
      </p>
    </>
  );
}
