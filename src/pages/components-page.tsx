import { ComponentCard } from '@/components/component-catalog/component-card';
import { PageTitle } from '@/components/page-title';
import { COMPONENT_CATALOG_SECTIONS } from '@/lib/component-catalog-data';
import { slugify } from '@/lib/utils';

export function ComponentsPage() {
  return (
    <div className="max-w-[1200px]">
      <PageTitle title="Primitives — Aura" />
      <header className="mb-16 sm:mb-20">
        <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
          Primitives
        </h1>
        <p className="mt-3 max-w-[60ch] text-muted-fg">
          Primitives are the smallest repeatable building blocks of a design
          system — reusable pieces of UI and code, like buttons, inputs, and
          alerts, that combine into larger patterns and product surfaces.
        </p>
      </header>

      <div className="flex flex-col gap-16 sm:gap-20">
        {COMPONENT_CATALOG_SECTIONS.map((section) => (
          <section key={section.id} id={section.id} aria-label={section.title}>
            <h2 className="mb-4 font-heading text-sm font-medium tracking-wide text-muted-fg uppercase">
              {section.title}
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {section.components.map((component) => (
                <ComponentCard
                  key={component.name}
                  name={component.name}
                  description={component.description}
                  icon={component.icon}
                  href={`/primitives/${slugify(component.name)}`}
                  cta="View primitive"
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
