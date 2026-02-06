import { Badge } from "@/components/ui/aura/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/aura/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/aura/select";
import {
  type PrimitiveProgressStatus,
  getPrimitiveCatalogBySection,
  getPrimitiveFigmaUrl,
  getPrimitiveProgressBadgeProps,
  getPrimitiveProgressLabel,
} from "@/lib/primitives-catalog";
import { IconBrandFigma, IconCheck, IconQuestionMark, IconX } from "@tabler/icons-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

type StatusFilter = "all" | PrimitiveProgressStatus;

const STATUS_FILTERS: StatusFilter[] = [
  "all",
  "ready-for-dc",
  "in-progress",
  "dev-check",
  "needs-discussion",
  "imported-from-fusion",
  "coming-soon",
  "untracked",
];

function GaBadgeContent({
  product,
  required,
}: {
  product: "Eos" | "Dune";
  required: boolean | null;
}) {
  const toneClass =
    required === true
      ? "text-green-700 dark:text-green-400"
      : required === false
        ? "text-red-700 dark:text-red-400"
        : "text-muted-foreground";

  return (
    <span className={`inline-flex items-center gap-1 ${toneClass}`}>
      <span>{product}</span>
      {required === true ? (
        <IconCheck className="size-3.5" />
      ) : required === false ? (
        <IconX className="size-3.5" />
      ) : (
        <IconQuestionMark className="size-3.5" />
      )}
    </span>
  );
}

function getGaSummaryBadgeProps(
  eosRequired: boolean | null,
  duneRequired: boolean | null
): {
  variant: "success" | "warning" | "gray";
  outline: boolean;
} {
  if (eosRequired === true && duneRequired === true) {
    return { variant: "success", outline: true };
  }
  if (eosRequired === false && duneRequired === false) {
    return { variant: "gray", outline: true };
  }
  return { variant: "warning", outline: true };
}

export default function PrimitivesPage() {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const foundations = getPrimitiveCatalogBySection("foundation");
  const components = getPrimitiveCatalogBySection("primitive");
  const filteredFoundations = useMemo(
    () =>
      statusFilter === "all"
        ? foundations
        : foundations.filter((foundation) => foundation.progressStatus === statusFilter),
    [foundations, statusFilter]
  );
  const filteredComponents = useMemo(
    () =>
      statusFilter === "all"
        ? components
        : components.filter((component) => component.progressStatus === statusFilter),
    [components, statusFilter]
  );

  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="space-y-12">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Primitives</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Building blocks for creating consistent, accessible user interfaces
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="space-y-1">
            <h2 className="text-base font-semibold">Filter by status</h2>
            <p className="text-sm text-muted-foreground">
              Showing {filteredFoundations.length + filteredComponents.length} items
            </p>
          </div>
          <Select
            value={statusFilter}
            onValueChange={(value) => {
              setStatusFilter(value as StatusFilter);
            }}
          >
            <SelectTrigger className="min-w-56">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              {STATUS_FILTERS.map((status) => (
                <SelectItem key={status} value={status}>
                  {status === "all" ? "All statuses" : getPrimitiveProgressLabel(status)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Foundations</h2>
            <p className="text-muted-foreground mt-1">Core design tokens and system fundamentals</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredFoundations.map((foundation) => {
              const badgeProps = getPrimitiveProgressBadgeProps(foundation.progressStatus);
              const gaSummaryBadgeProps = getGaSummaryBadgeProps(
                foundation.eosGaRequired,
                foundation.duneGaRequired
              );
              const figmaUrl = getPrimitiveFigmaUrl(foundation);

              return (
                <Card
                  key={foundation.slug}
                  className="h-full transition-colors hover:border-primary"
                >
                  <CardContent className="py-4 flex-1">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <Link
                          to={`/primitives/${foundation.slug}`}
                          className="text-foreground font-medium hover:underline underline-offset-2"
                        >
                          {foundation.name}
                        </Link>
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
                  <CardFooter className="border-t border-border/50 pt-3 items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <Badge
                        variant={gaSummaryBadgeProps.variant}
                        outline={gaSummaryBadgeProps.outline}
                      >
                        <span className="inline-flex items-center gap-2">
                          <GaBadgeContent product="Eos" required={foundation.eosGaRequired} />
                          <GaBadgeContent product="Dune" required={foundation.duneGaRequired} />
                        </span>
                      </Badge>
                    </div>
                    {figmaUrl ? (
                      <a
                        href={figmaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-sm p-1 text-muted-foreground hover:text-foreground hover:bg-accent"
                        title="Open in Figma"
                        aria-label="Open in Figma"
                      >
                        <IconBrandFigma className="size-4" />
                      </a>
                    ) : foundation.figmaAvailability === "unknown" ? (
                      <span
                        className="inline-flex items-center justify-center rounded-sm p-1 text-muted-foreground/40 cursor-not-allowed"
                        title="Figma link unavailable"
                        aria-label="Figma link unavailable"
                      >
                        <IconBrandFigma className="size-4" />
                      </span>
                    ) : null}
                  </CardFooter>
                </Card>
              );
            })}
          </div>
          {filteredFoundations.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No foundations match this status filter.
            </p>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Primitives</h2>
            <p className="text-muted-foreground mt-1">
              Reusable UI components for building interfaces
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredComponents.map((component) => {
              const badgeProps = getPrimitiveProgressBadgeProps(component.progressStatus);
              const gaSummaryBadgeProps = getGaSummaryBadgeProps(
                component.eosGaRequired,
                component.duneGaRequired
              );
              const figmaUrl = getPrimitiveFigmaUrl(component);

              return (
                <Card
                  key={component.slug}
                  className="h-full transition-colors hover:border-primary"
                >
                  <CardContent className="py-4 flex-1">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <Link
                          to={`/primitives/${component.slug}`}
                          className="text-foreground font-medium hover:underline underline-offset-2"
                        >
                          {component.name}
                        </Link>
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
                  <CardFooter className="border-t border-border/50 pt-3 items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <Badge
                        variant={gaSummaryBadgeProps.variant}
                        outline={gaSummaryBadgeProps.outline}
                      >
                        <span className="inline-flex items-center gap-2">
                          <GaBadgeContent product="Eos" required={component.eosGaRequired} />
                          <GaBadgeContent product="Dune" required={component.duneGaRequired} />
                        </span>
                      </Badge>
                    </div>
                    {figmaUrl ? (
                      <a
                        href={figmaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-sm p-1 text-muted-foreground hover:text-foreground hover:bg-accent"
                        title="Open in Figma"
                        aria-label="Open in Figma"
                      >
                        <IconBrandFigma className="size-4" />
                      </a>
                    ) : component.figmaAvailability === "unknown" ? (
                      <span
                        className="inline-flex items-center justify-center rounded-sm p-1 text-muted-foreground/40 cursor-not-allowed"
                        title="Figma link unavailable"
                        aria-label="Figma link unavailable"
                      >
                        <IconBrandFigma className="size-4" />
                      </span>
                    ) : null}
                  </CardFooter>
                </Card>
              );
            })}
          </div>
          {filteredComponents.length === 0 && (
            <p className="text-sm text-muted-foreground">No primitives match this status filter.</p>
          )}
        </div>
      </div>
    </div>
  );
}
