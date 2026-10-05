import type { Icon as TablerIcon } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

import { Card, CardContent } from '@/components/ui/card';

export function ComponentCard({
  name,
  description,
  icon: Icon,
  href,
  cta,
}: {
  name: string;
  description: string;
  icon: TablerIcon;
  href: string;
  cta: string;
}) {
  return (
    <Card size="sm" variant="muted" className="h-full">
      <CardContent className="flex h-full flex-col gap-2">
        <div className="flex flex-1 flex-col gap-2">
          <span className="flex size-9 items-center justify-center rounded-md bg-medium-bg text-muted-fg">
            <Icon size={18} stroke={1.5} />
          </span>
          <div className="flex flex-1 flex-col gap-1">
            <h3 className="font-heading text-sm font-medium">
              <Link to={href} className="hover:underline">
                {name}
              </Link>
            </h3>
            <p className="text-xs text-muted-fg">{description}</p>
          </div>
        </div>

        <Link
          to={href}
          className="text-xs font-medium text-link-fg transition-colors hover:text-link-fg-hover"
        >
          {cta}
        </Link>
      </CardContent>
    </Card>
  );
}
