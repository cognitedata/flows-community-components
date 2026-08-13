import { ComponentCard } from "@/components/component-catalog/component-card";
import { PageTitle } from "@/components/page-title";
import { COMPONENT_CATALOG_SECTIONS } from "@/lib/component-catalog-data";

export function ComponentsPage() {
  return (
    <>
      <PageTitle title="Components — Aura" />
      <header className="mb-16 sm:mb-20">
        <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
          Components
        </h1>
        <p className="mt-3 max-w-[60ch] text-muted-fg">
          Every component in the Aura system, organized by category. Open a component for a
          live Storybook preview, or browse the catalog below.
        </p>
      </header>

      <div className="flex flex-col gap-16 sm:gap-20">
        {COMPONENT_CATALOG_SECTIONS.map((section) => (
          <section key={section.id} id={section.id} aria-label={section.title}>
            <h2 className="mb-6 font-heading text-sm font-medium tracking-wide text-muted-fg uppercase">
              {section.title}
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {section.components.map((component) => (
                <ComponentCard key={component.name} component={component} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
