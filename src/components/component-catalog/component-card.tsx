import { Link } from 'react-router-dom';

import { StorybookLink } from '@/components/component-catalog/storybook-link';
import { Card, CardContent } from '@/components/ui/card';
import type { ComponentCatalogEntry } from '@/lib/component-catalog-data';
import { slugify } from '@/lib/utils';

export function ComponentCard({
  component,
}: {
  component: ComponentCatalogEntry;
}) {
  const Icon = component.icon;
  const slug = slugify(component.name);
  const href = `/components/${slug}`;

  return (
    <Card size="sm" className="h-full gap-3 bg-muted-bg ring-0">
      <CardContent className="flex h-full flex-col gap-3">
        <Link
          to={href}
          className="flex aspect-video items-center justify-center rounded-lg bg-medium-bg text-muted-fg transition-colors hover:bg-medium-bg-hover"
        >
          <Icon size={22} stroke={1.5} />
        </Link>

        <div className="flex flex-1 flex-col gap-1">
          <h3 className="font-heading text-sm font-medium">
            <Link to={href} className="hover:underline">
              {component.name}
            </Link>
          </h3>
          <p className="text-xs text-muted-fg">{component.description}</p>
        </div>

        {component.storybookId && (
          <div className="pt-1">
            <StorybookLink storyId={component.storybookId} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
