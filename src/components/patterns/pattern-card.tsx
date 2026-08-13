import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { slugify } from "@/lib/utils";
import type { PatternEntry } from "@/lib/patterns-data";

export function PatternCard({ pattern }: { pattern: PatternEntry }) {
  const Icon = pattern.icon;
  const slug = slugify(pattern.name);
  const href = `/patterns/${slug}`;

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
              {pattern.name}
            </Link>
          </h3>
          <p className="text-xs text-muted-fg">{pattern.description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
