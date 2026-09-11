import { ComponentCard } from '@/components/component-catalog/component-card';
import { PageTitle } from '@/components/page-title';
import { COMMUNITY_TEMPLATES } from '@/lib/community-templates-data';
import { slugify } from '@/lib/utils';

export function CommunityTemplatesPage() {
  return (
    <div className="max-w-[1200px]">
      <PageTitle title="Overview — Templates — Aura" />
      <header className="mb-16 sm:mb-20">
        <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
          Overview
        </h1>
        <p className="mt-3 max-w-[60ch] text-muted-fg">
          Templates are stitched-together app starting points for common use
          cases and workflows, so you begin with structure already in place.
          Plug in the components and content you need, keep Cognite standards,
          and go from zero to sixty on a solid foundation.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {COMMUNITY_TEMPLATES.map((template) => (
          <ComponentCard
            key={template.name}
            name={template.name}
            description={template.description}
            icon={template.icon}
            href={`/community/templates/${slugify(template.name)}`}
            cta="View template"
          />
        ))}
      </div>
    </div>
  );
}
