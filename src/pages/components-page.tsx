import { ComponentCard } from '@/components/component-catalog/component-card';
import { PageTitle } from '@/components/page-title';
import { COMPONENT_CATALOG_SECTIONS } from '@/lib/component-catalog-data';
import { slugify } from '@/lib/utils';

export function ComponentsPage() {
  return (
    <div className="max-w-[1200px]">
      <PageTitle title="Components — Aura" />
      <header className="mb-16 sm:mb-20">
        <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
          Components
        </h1>
        <p className="mt-3 max-w-[60ch] text-muted-fg">
          Components are the smallest repeatable building blocks of a design
          system — reusable pieces of UI and code, like buttons, inputs, and
          alerts, that combine into larger patterns and product surfaces.
        </p>
      </header>

      <div className="flex flex-col gap-16 sm:gap-20">
        {COMPONENT_CATALOG_SECTIONS.map((section) => {
          const components = section.components.filter(
            (component) => !component.hidden
          );
          if (components.length === 0) return null;

          return (
            <section
              key={section.id}
              id={section.id}
              aria-label={section.title}
            >
              <h2 className="mb-4 font-heading text-sm font-medium tracking-wide text-muted-fg uppercase">
                {section.title}
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {components.map((component) => (
                  <ComponentCard
                    key={component.name}
                    name={component.name}
                    description={component.description}
                    icon={component.icon}
                    href={`/aura/components/${slugify(component.name)}`}
                    cta="View component"
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
