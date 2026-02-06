import { Badge } from "@/components/ui/aura/badge";
import { Card, CardContent } from "@/components/ui/aura/card";
import {
  getPrimitiveCatalogBySection,
  getPrimitiveProgressBadgeProps,
  getPrimitiveProgressLabel,
} from "@/lib/primitives-catalog";
import { Link } from "react-router-dom";

export default function PrimitivesPage() {
  const foundations = getPrimitiveCatalogBySection("foundation");
  const components = getPrimitiveCatalogBySection("primitive");

  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="space-y-12">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Primitives</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Building blocks for creating consistent, accessible user interfaces
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Foundations</h2>
            <p className="text-muted-foreground mt-1">Core design tokens and system fundamentals</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {foundations.map((foundation) => {
              const badgeProps = getPrimitiveProgressBadgeProps(foundation.progressStatus);

              return (
                <Link key={foundation.slug} to={`/primitives/${foundation.slug}`} className="block">
                  <Card className="h-full transition-colors hover:border-primary">
                    <CardContent className="py-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <div className="text-foreground font-medium">{foundation.name}</div>
                          <Badge
                            variant={badgeProps.variant}
                            outline={badgeProps.outline}
                            className={badgeProps.className}
                          >
                            {getPrimitiveProgressLabel(foundation.progressStatus)}
                          </Badge>
                        </div>
                        {foundation.comingSoon && (
                          <p className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                            Placeholder
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground">{foundation.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Primitives</h2>
            <p className="text-muted-foreground mt-1">
              Reusable UI components for building interfaces
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {components.map((component) => {
              const badgeProps = getPrimitiveProgressBadgeProps(component.progressStatus);

              return (
                <Link key={component.slug} to={`/primitives/${component.slug}`} className="block">
                  <Card className="h-full transition-colors hover:border-primary">
                    <CardContent className="py-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <div className="text-foreground font-medium">{component.name}</div>
                          <Badge
                            variant={badgeProps.variant}
                            outline={badgeProps.outline}
                            className={badgeProps.className}
                          >
                            {getPrimitiveProgressLabel(component.progressStatus)}
                          </Badge>
                        </div>
                        {component.comingSoon && (
                          <p className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                            Placeholder
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground">{component.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
