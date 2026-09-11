import { Badge, Button } from '@cognite/aura/components';
import {
  IconBookmark,
  IconExternalLink,
  IconFilter,
  IconPlus,
  IconTrash,
} from '@tabler/icons-react';

export function ButtonPreview() {
  return (
    <section aria-label="Button preview" className="mb-16 sm:mb-20">
      <div className="overflow-hidden rounded-2xl border border-border bg-background p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button size="icon-sm" aria-label="Add">
            <IconPlus className="size-4" />
          </Button>
          <Button size="icon-sm" variant="secondary" aria-label="Bookmark">
            <IconBookmark className="size-4" />
          </Button>
          <Button size="icon-sm" variant="destructive" aria-label="Delete">
            <IconTrash className="size-4" />
          </Button>
          <Button>
            <IconPlus className="size-4" />
            Add data
          </Button>
          <Button variant="secondary">
            Explore more
            <IconExternalLink />
          </Button>
          <Button variant="destructive">
            <IconTrash className="size-4" />
            Delete
          </Button>
          <Button variant="outline">
            <IconFilter className="size-4" />
            Filters
            <Badge variant="secondary" dot>
              12
            </Badge>
          </Button>
        </div>
      </div>
    </section>
  );
}
