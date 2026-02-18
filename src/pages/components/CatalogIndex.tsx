import { Badge } from "@/components/ui/aura/badge";
import { Button } from "@/components/ui/aura/button";
import { ButtonGroup } from "@/components/ui/aura/button-group";
import { Card, CardContent, CardFooter } from "@/components/ui/aura/card";
import { Label } from "@/components/ui/aura/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/aura/select";
import { getComponentStatusClasses, getStatusLabel } from "@/lib/component-status";
import { COMPONENT_STATUS_ORDER, type ComponentStatusType } from "@/lib/component-status-config";
import { cn } from "@/lib/utils";
import { type ReactNode, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

type CatalogItem = {
  id: string;
  name: string;
  description: string;
  href: string;
  status?: ComponentStatusType;
  comingSoon?: boolean;
  eosGaRequired?: boolean | null;
  duneGaRequired?: boolean | null;
  footer?: ReactNode;
};

type CatalogSection = {
  id: string;
  title?: string;
  description?: string;
  items: CatalogItem[];
};

type CatalogIndexProps = {
  title: string;
  description?: string;
  sections: CatalogSection[];
  storageKey: string;
};

type GroupByOption = "none" | "status" | "ga";
type FilterByOption = "all" | ComponentStatusType | "ga-eos" | "ga-dune" | "ga-both";

const GA_FILTERS: Array<{
  id: Extract<FilterByOption, "ga-eos" | "ga-dune" | "ga-both">;
  label: string;
  match: (entry: CatalogItem) => boolean;
}> = [
  {
    id: "ga-both",
    label: "Both (Eos + Dune)",
    match: (entry) => entry.eosGaRequired === true && entry.duneGaRequired === true,
  },
  {
    id: "ga-eos",
    label: "Eos required",
    match: (entry) => entry.eosGaRequired === true,
  },
  {
    id: "ga-dune",
    label: "Dune required",
    match: (entry) => entry.duneGaRequired === true,
  },
];

function resolveStatus(status?: ComponentStatusType): ComponentStatusType {
  return status ?? "draft";
}

function isStatusFilter(value: FilterByOption): value is ComponentStatusType {
  return value !== "all" && !value.startsWith("ga-");
}

export function CatalogIndex({ title, description, sections, storageKey }: CatalogIndexProps) {
  const [groupBy, setGroupBy] = useState<GroupByOption>("none");
  const [filterBy, setFilterBy] = useState<FilterByOption>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const groupByLabel = groupBy === "status" ? "Status" : groupBy === "ga" ? "GA required" : "None";
  const filterByLabel = (() => {
    if (filterBy === "all") {
      return "All items";
    }
    if (filterBy.startsWith("ga-")) {
      return GA_FILTERS.find((filter) => filter.id === filterBy)?.label ?? "GA required";
    }
    if (isStatusFilter(filterBy)) {
      return getStatusLabel(filterBy);
    }
    return "All items";
  })();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const stored = window.localStorage.getItem(storageKey);
    if (stored === "grid" || stored === "list") {
      setViewMode(stored);
    }
  }, [storageKey]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem(storageKey, viewMode);
  }, [storageKey, viewMode]);

  const allItems = useMemo(() => sections.flatMap((section) => section.items), [sections]);
  const hasGaData = useMemo(
    () => allItems.some((entry) => entry.eosGaRequired != null || entry.duneGaRequired != null),
    [allItems]
  );
  const availableStatuses = useMemo(() => {
    const statuses = new Set<ComponentStatusType>();
    allItems.forEach((entry) => statuses.add(resolveStatus(entry.status)));
    return COMPONENT_STATUS_ORDER.filter((status) => statuses.has(status));
  }, [allItems]);

  const gridClassName =
    viewMode === "grid"
      ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
      : "flex flex-col gap-3";

  const cardClassName = cn(
    "transition-colors hover:border-primary flex flex-col",
    viewMode === "grid" && "h-full",
    "[&_[data-slot=card-header]]:px-2 [&_[data-slot=card-header]]:pt-2 [&_[data-slot=card-header]]:[.border-b]:pb-3",
    "[&_[data-slot=card-content]]:p-2",
    "[&_[data-slot=card-footer]]:px-2 [&_[data-slot=card-footer]]:pb-2"
  );

  const applyFilter = (entries: CatalogItem[]) => {
    if (filterBy === "all") {
      return entries;
    }
    if (filterBy.startsWith("ga-")) {
      const matcher = GA_FILTERS.find((filter) => filter.id === filterBy);
      return matcher ? entries.filter((entry) => matcher.match(entry)) : entries;
    }
    if (isStatusFilter(filterBy)) {
      return entries.filter((entry) => resolveStatus(entry.status) === filterBy);
    }
    return entries;
  };

  const renderCards = (entries: CatalogItem[]) => (
    <div className={gridClassName}>
      {entries.map((entry) => {
        const status = resolveStatus(entry.status);
        const statusClasses = getComponentStatusClasses(status);

        return (
          <Link key={entry.id} to={entry.href} className="block">
            <Card className={cardClassName}>
              <CardContent className={cn("p-2", viewMode === "grid" && "flex-1")}>
                {viewMode === "list" ? (
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <span className="font-medium text-foreground truncate">{entry.name}</span>
                      <span className="text-muted-foreground truncate">{entry.description}</span>
                    </div>
                    {entry.comingSoon && (
                      <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                        Placeholder
                      </span>
                    )}
                    <Badge variant="secondary" className={statusClasses}>
                      {getStatusLabel(status)}
                    </Badge>
                    {entry.footer && (
                      <div className="inline-flex items-center gap-1 shrink-0">{entry.footer}</div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-foreground font-medium">{entry.name}</div>
                      <Badge variant="secondary" className={statusClasses}>
                        {getStatusLabel(status)}
                      </Badge>
                    </div>
                    {entry.comingSoon && (
                      <p className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                        Placeholder
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground">{entry.description}</p>
                  </div>
                )}
              </CardContent>
              {viewMode === "grid" && entry.footer && (
                <CardFooter className="border-t border-border/50 pt-3 items-center justify-between gap-3">
                  {entry.footer}
                </CardFooter>
              )}
            </Card>
          </Link>
        );
      })}
    </div>
  );

  const renderGroupedCards = (entries: CatalogItem[]) => {
    if (groupBy === "ga") {
      const gaGroups = [
        {
          id: "ga-both",
          title: "Both (Eos + Dune)",
          items: entries.filter(
            (entry) => entry.eosGaRequired === true && entry.duneGaRequired === true
          ),
        },
        {
          id: "ga-eos",
          title: "Eos required",
          items: entries.filter(
            (entry) => entry.eosGaRequired === true && entry.duneGaRequired !== true
          ),
        },
        {
          id: "ga-dune",
          title: "Dune required",
          items: entries.filter(
            (entry) => entry.duneGaRequired === true && entry.eosGaRequired !== true
          ),
        },
        {
          id: "ga-other",
          title: "Other",
          items: entries.filter(
            (entry) => entry.eosGaRequired !== true && entry.duneGaRequired !== true
          ),
        },
      ];

      return (
        <div className="space-y-6">
          {gaGroups.map((group) =>
            group.items.length === 0 ? null : (
              <div key={group.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {group.title}
                  </h3>
                  <span className="text-xs text-muted-foreground">{group.items.length}</span>
                </div>
                {renderCards(group.items)}
              </div>
            )
          )}
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {COMPONENT_STATUS_ORDER.map((status) => {
          const groupedEntries = entries.filter((entry) => resolveStatus(entry.status) === status);
          if (groupedEntries.length === 0) {
            return null;
          }

          return (
            <div key={status} className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {getStatusLabel(status)}
                </h3>
                <span className="text-xs text-muted-foreground">{groupedEntries.length}</span>
              </div>
              {renderCards(groupedEntries)}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="space-y-12">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
          {description && <p className="text-lg text-muted-foreground mt-2">{description}</p>}
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-wrap gap-4">
            <div className="space-y-2">
              <Label>Group by</Label>
              <Select value={groupBy} onValueChange={(value) => setGroupBy(value as GroupByOption)}>
                <SelectTrigger className="min-w-44 bg-transparent">
                  <span className="truncate text-sm font-medium text-foreground">
                    {groupByLabel}
                  </span>
                  <SelectValue className="sr-only" />
                </SelectTrigger>
                <SelectContent
                  style={{
                    minWidth:
                      "var(--anchor-width, var(--trigger-width, var(--base-ui-select-trigger-width, 0px)))",
                  }}
                >
                  <SelectGroup>
                    <SelectLabel>General</SelectLabel>
                    <SelectItem value="none">None</SelectItem>
                  </SelectGroup>
                  <SelectSeparator />
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="status">Status</SelectItem>
                  </SelectGroup>
                  <SelectSeparator />
                  <SelectGroup>
                    <SelectLabel>GA requirement</SelectLabel>
                    <SelectItem value="ga" disabled={!hasGaData}>
                      GA required
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Filter by</Label>
              <Select
                value={filterBy}
                onValueChange={(value) => setFilterBy(value as FilterByOption)}
              >
                <SelectTrigger className="min-w-52 bg-transparent">
                  <span className="truncate text-sm font-medium text-foreground">
                    {filterByLabel}
                  </span>
                  <SelectValue className="sr-only" />
                </SelectTrigger>
                <SelectContent
                  style={{
                    minWidth:
                      "var(--anchor-width, var(--trigger-width, var(--base-ui-select-trigger-width, 0px)))",
                  }}
                >
                  <SelectGroup>
                    <SelectLabel>General</SelectLabel>
                    <SelectItem value="all">All items</SelectItem>
                  </SelectGroup>
                  <SelectSeparator />
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    {availableStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {getStatusLabel(status)}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                  <SelectSeparator />
                  <SelectGroup>
                    <SelectLabel>GA requirement</SelectLabel>
                    {GA_FILTERS.map((filter) => (
                      <SelectItem key={filter.id} value={filter.id} disabled={!hasGaData}>
                        {filter.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>View</Label>
            <ButtonGroup>
              <Button
                variant={viewMode === "grid" ? "secondary" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                Grid
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                List
              </Button>
            </ButtonGroup>
          </div>
        </div>

        {sections.map((section) => (
          <div key={section.id} className="space-y-6">
            {(section.title || section.description) && (
              <div>
                {section.title && (
                  <h2 className="text-2xl font-bold tracking-tight">{section.title}</h2>
                )}
                {section.description && (
                  <p className="text-muted-foreground mt-1">{section.description}</p>
                )}
              </div>
            )}
            {groupBy === "status"
              ? renderGroupedCards(applyFilter(section.items))
              : renderCards(applyFilter(section.items))}
          </div>
        ))}
      </div>
    </div>
  );
}
