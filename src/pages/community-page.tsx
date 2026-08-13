import { Link } from 'react-router-dom';
import { IconExternalLink } from '@tabler/icons-react';

import { communityStorybookManagerUrl } from '@/components/community/storybook-embed';
import { PageTitle } from '@/components/page-title';
import { Card, CardContent } from '@/components/ui/card';
import { COMMUNITY_COMPONENTS } from '@/lib/community-data';
import { slugify } from '@/lib/utils';

export function CommunityPage() {
  return (
    <>
      <PageTitle title="Community — Aura" />
      <header className="mb-10 sm:mb-12">
        <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
          Community
        </h1>
        <p className="mt-3 max-w-[60ch] text-muted-fg">
          Components built and maintained by the community, ready to explore or contribute
          to.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {COMMUNITY_COMPONENTS.map((component) => {
          const slug = slugify(component.name);
          const Icon = component.icon;

          return (
            <Card
              key={component.name}
              size="sm"
              className="h-full gap-3 bg-muted-bg ring-0"
            >
              <CardContent className="flex h-full flex-col gap-3">
                <Link
                  to={`/community/${slug}`}
                  className="flex aspect-video items-center justify-center rounded-lg bg-medium-bg text-muted-fg transition-colors hover:bg-medium-bg-hover"
                >
                  <Icon size={22} stroke={1.5} />
                </Link>

                <div className="flex flex-1 flex-col gap-1">
                  <h3 className="font-heading text-sm font-medium">
                    <Link to={`/community/${slug}`} className="hover:underline">
                      {component.name}
                    </Link>
                  </h3>
                  <p className="text-xs text-muted-fg">{component.description}</p>
                </div>

                <div className="pt-1">
                  <a
                    href={communityStorybookManagerUrl(slug)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-link-fg transition-colors hover:text-link-fg-hover"
                  >
                    Storybook
                    <IconExternalLink size={12} />
                  </a>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}
