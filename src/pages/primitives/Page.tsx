import { Badge } from "@/components/ui/aura/badge/badge";
import { getPrimitiveCatalogBySection, getPrimitiveFigmaUrl } from "@/lib/primitives-catalog";
import { CatalogIndex } from "@/pages/components/CatalogIndex";
import { IconBrandFigma, IconCheck, IconQuestionMark, IconX } from "@tabler/icons-react";

type GaBadgeContentProps = {
  product: "Eos" | "Dune";
  required: boolean | null;
};

function GaBadgeContent({ product, required }: GaBadgeContentProps) {
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
  const foundations = getPrimitiveCatalogBySection("foundation");
  const components = getPrimitiveCatalogBySection("primitive");

  return (
    <CatalogIndex
      title="Primitives"
      description="Building blocks for creating consistent, accessible user interfaces"
      storageKey="aura.primitives.viewMode"
      sections={[
        {
          id: "foundations",
          title: "Foundations",
          description: "Core design tokens and system fundamentals",
          items: foundations.map((entry) => {
            const gaSummaryBadgeProps = getGaSummaryBadgeProps(
              entry.eosGaRequired,
              entry.duneGaRequired
            );
            const figmaUrl = getPrimitiveFigmaUrl(entry);

            return {
              id: entry.slug,
              name: entry.name,
              description: entry.description,
              href: `/primitives/${entry.slug}`,
              progressStatus: entry.progressStatus,
              comingSoon: entry.comingSoon,
              eosGaRequired: entry.eosGaRequired,
              duneGaRequired: entry.duneGaRequired,
              footer: (
                <>
                  <div className="flex items-center gap-2 min-w-0">
                    <Badge
                      variant={gaSummaryBadgeProps.variant}
                      outline={gaSummaryBadgeProps.outline}
                    >
                      <span className="inline-flex items-center gap-2">
                        <GaBadgeContent product="Eos" required={entry.eosGaRequired} />
                        <GaBadgeContent product="Dune" required={entry.duneGaRequired} />
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
                  ) : entry.figmaAvailability === "unknown" ? (
                    <span
                      className="inline-flex items-center justify-center rounded-sm p-1 text-muted-foreground/40 cursor-not-allowed"
                      title="Figma link unavailable"
                      aria-label="Figma link unavailable"
                    >
                      <IconBrandFigma className="size-4" />
                    </span>
                  ) : null}
                </>
              ),
            };
          }),
        },
        {
          id: "primitives",
          title: "Primitives",
          description: "Reusable UI components for building interfaces",
          items: components.map((entry) => {
            const gaSummaryBadgeProps = getGaSummaryBadgeProps(
              entry.eosGaRequired,
              entry.duneGaRequired
            );
            const figmaUrl = getPrimitiveFigmaUrl(entry);

            return {
              id: entry.slug,
              name: entry.name,
              description: entry.description,
              href: `/primitives/${entry.slug}`,
              progressStatus: entry.progressStatus,
              comingSoon: entry.comingSoon,
              eosGaRequired: entry.eosGaRequired,
              duneGaRequired: entry.duneGaRequired,
              footer: (
                <>
                  <div className="flex items-center gap-2 min-w-0">
                    <Badge
                      variant={gaSummaryBadgeProps.variant}
                      outline={gaSummaryBadgeProps.outline}
                    >
                      <span className="inline-flex items-center gap-2">
                        <GaBadgeContent product="Eos" required={entry.eosGaRequired} />
                        <GaBadgeContent product="Dune" required={entry.duneGaRequired} />
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
                  ) : entry.figmaAvailability === "unknown" ? (
                    <span
                      className="inline-flex items-center justify-center rounded-sm p-1 text-muted-foreground/40 cursor-not-allowed"
                      title="Figma link unavailable"
                      aria-label="Figma link unavailable"
                    >
                      <IconBrandFigma className="size-4" />
                    </span>
                  ) : null}
                </>
              ),
            };
          }),
        },
      ]}
    />
  );
}
