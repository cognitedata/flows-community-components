import { ComponentCard } from '@/components/component-catalog/component-card';
import { PageTitle } from '@/components/page-title';
import { COMMUNITY_COMPONENTS } from '@/lib/community-data';
import { slugify } from '@/lib/utils';

export function CommunityPage() {
  return (
    <div className="max-w-[1200px]">
      <PageTitle title="Overview — Community — Aura" />
      <header className="mb-16 sm:mb-20">
        <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
          Overview
        </h1>
        <p className="mt-3 max-w-[60ch] text-muted-fg">
          Components built and maintained by the community, ready to explore or
          contribute to.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {COMMUNITY_COMPONENTS.map((component) => (
          <ComponentCard
            key={component.name}
            name={component.name}
            description={component.description}
            icon={component.icon}
            href={`/community/${slugify(component.name)}`}
            cta="View component"
          />
        ))}
      </div>
    </div>
  );
}
