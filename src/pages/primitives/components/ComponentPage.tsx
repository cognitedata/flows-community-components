import { IconArrowLeft, IconCheck, IconQuestionMark, IconX } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import figmaIcon from '@/assets/figma-logo.svg';
import storybookIcon from '@/assets/icon-storybook-default.svg';
import { InstallationCommand } from '@/components/installation-command';
import { StoriesRenderer } from '@/components/stories-renderer';
import { Badge } from '@/components/ui/aura/badge';
import { Button } from '@/components/ui/aura/button';
import type { ComponentMeta } from '@/lib/component-examples';
import { getComponentMeta } from '@/lib/component-registry';
import {
  type ComponentStatusType,
  getComponentStatusClasses,
  getStatusMessage,
} from '@/lib/component-status';
import { getStatusLabel } from '@/lib/component-status';
import {
  getPrimitiveCatalogEntry,
  getPrimitiveFigmaBadgeProps,
  getPrimitiveFigmaLabel,
  getPrimitiveFigmaUrl,
  getPrimitiveGaBadgeProps,
} from '@/lib/primitives-catalog';

function toTitleCase(str: string): string {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function toStorybookSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s*\(.*?\)\s*/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const externalIconClass =
  'size-6 grayscale opacity-70 mix-blend-multiply transition-all duration-150 group-hover:grayscale-0 group-hover:opacity-100 group-hover:mix-blend-normal';

function GaBadgeContent({
  product,
  required,
}: {
  product: 'Eos' | 'Dune';
  required: boolean | null;
}) {
  const toneClass =
    required === true
      ? 'text-green-700 dark:text-green-400'
      : required === false
        ? 'text-red-700 dark:text-red-400'
        : 'text-muted-foreground';

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

export default function ComponentPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [meta, setMeta] = useState<ComponentMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const catalogEntry = slug ? getPrimitiveCatalogEntry(slug) : null;
  const resolvedSlug = catalogEntry?.slug || slug || '';

  useEffect(() => {
    async function loadMeta() {
      if (!resolvedSlug) return;
      try {
        const componentMeta = await getComponentMeta(resolvedSlug);
        setMeta(componentMeta);
      } catch {
        // Component not found
      }
      setLoading(false);
    }
    loadMeta();
  }, [resolvedSlug]);

  if (!slug) {
    return null;
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-10">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/4" />
          <div className="h-4 bg-muted rounded w-1/2" />
        </div>
      </div>
    );
  }

  const componentName = catalogEntry?.name || meta?.name || toTitleCase(slug);
  const componentStatus: ComponentStatusType = meta?.status || 'draft';
  const statusClasses = getComponentStatusClasses(componentStatus);
  const statusLabel = getStatusLabel(componentStatus);
  const statusMessage = getStatusMessage(componentStatus);
  const description = catalogEntry?.description || meta?.description || 'Component documentation';
  const storybookCategory = catalogEntry?.section === 'foundation' ? 'foundations' : 'primitives';
  const storybookUrl = `https://cognitedata.github.io/aura/storybook/?path=/docs/${storybookCategory}-${toStorybookSlug(componentName)}--docs`;
  const hasStorybookLink = ![
    'assets',
    'icons',
    'action-toolbar',
    'file-upload',
    'select-panel',
  ].includes(resolvedSlug);
  const hasDisabledFigma = false;
  const figmaBadgeProps = catalogEntry
    ? getPrimitiveFigmaBadgeProps(catalogEntry.figmaAvailability)
    : null;
  const eosGaBadgeProps = catalogEntry
    ? getPrimitiveGaBadgeProps(catalogEntry.eosGaRequired)
    : null;
  const duneGaBadgeProps = catalogEntry
    ? getPrimitiveGaBadgeProps(catalogEntry.duneGaRequired)
    : null;
  const figmaUrl = catalogEntry ? getPrimitiveFigmaUrl(catalogEntry) : null;
  const hasFigmaControl = Boolean(figmaUrl) || hasDisabledFigma;

  if (catalogEntry && !catalogEntry.implemented) {
    return (
      <div className="max-w-4xl mx-auto py-10">
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <Button variant="secondary" size="sm" onClick={() => navigate('/primitives')}>
              <IconArrowLeft className="h-4 w-4 mr-2" />
              Back to Components
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="flex min-w-0 flex-wrap items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight">{componentName}</h1>
                <Badge variant="secondary">Primitive</Badge>
                <Badge variant="secondary" className={statusClasses}>
                  {statusLabel}
                </Badge>
              </div>
              <div className="inline-flex items-center gap-1 shrink-0">
                {hasFigmaControl &&
                  (hasDisabledFigma ? (
                    <span
                      className="inline-flex items-center justify-center rounded-sm p-1 text-muted-foreground/40 cursor-not-allowed"
                      title="Figma link unavailable"
                      aria-label="Figma link unavailable"
                    >
                      <img
                        src={figmaIcon}
                        alt=""
                        className="size-4 grayscale opacity-40 mix-blend-multiply"
                      />
                    </span>
                  ) : (
                    <a
                      href={figmaUrl!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center justify-center rounded-sm p-1 text-muted-foreground hover:text-foreground hover:bg-accent"
                      title="Open in Figma"
                      aria-label="Open in Figma"
                    >
                      <img src={figmaIcon} alt="" className={externalIconClass} />
                    </a>
                  ))}
                {hasStorybookLink ? (
                  <a
                    href={storybookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center rounded-sm p-1 text-muted-foreground hover:text-foreground hover:bg-accent"
                    title="Open in Storybook"
                    aria-label="Open in Storybook"
                  >
                    <img src={storybookIcon} alt="" className={externalIconClass} />
                  </a>
                ) : (
                  <span
                    className="inline-flex items-center justify-center rounded-sm p-1 text-muted-foreground/40 cursor-not-allowed"
                    title="Storybook link unavailable"
                    aria-label="Storybook link unavailable"
                  >
                    <img
                      src={storybookIcon}
                      alt=""
                      className="size-4 grayscale opacity-40 mix-blend-multiply"
                    />
                  </span>
                )}
              </div>
            </div>
            <p className="text-lg text-muted-foreground">{description}</p>
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant={figmaBadgeProps?.variant}
                outline={figmaBadgeProps?.outline}
                className={figmaBadgeProps?.className}
              >
                {getPrimitiveFigmaLabel(catalogEntry.figmaAvailability)}
              </Badge>
              <Badge
                variant={eosGaBadgeProps?.variant}
                outline={eosGaBadgeProps?.outline}
                className={eosGaBadgeProps?.className}
              >
                <GaBadgeContent product="Eos" required={catalogEntry.eosGaRequired} />
              </Badge>
              <Badge
                variant={duneGaBadgeProps?.variant}
                outline={duneGaBadgeProps?.outline}
                className={duneGaBadgeProps?.className}
              >
                <GaBadgeContent product="Dune" required={catalogEntry.duneGaRequired} />
              </Badge>
            </div>
            <div className="p-4 rounded-lg border border-dashed bg-muted/30">
              <p className="text-sm text-muted-foreground">
                This primitive is tracked in metadata and is not implemented yet. A placeholder is
                shown until stories and metadata-backed implementation are available.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="space-y-8">
        {/* Navigation */}
        <div className="flex items-center gap-4">
          <Button variant="secondary" size="sm" onClick={() => navigate('/primitives')}>
            <IconArrowLeft className="h-4 w-4 mr-2" />
            Back to Components
          </Button>
        </div>

        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="flex min-w-0 flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">{componentName}</h1>
              <Badge variant="secondary">Component</Badge>
              <Badge variant="secondary" className={statusClasses}>
                {statusLabel}
              </Badge>
            </div>
            <div className="inline-flex items-center gap-1 shrink-0">
              {hasFigmaControl &&
                (hasDisabledFigma ? (
                  <span
                    className="inline-flex items-center justify-center rounded-sm p-1 text-muted-foreground/40 cursor-not-allowed"
                    title="Figma link unavailable"
                    aria-label="Figma link unavailable"
                  >
                    <img
                      src={figmaIcon}
                      alt=""
                      className="size-4 grayscale opacity-40 mix-blend-multiply"
                    />
                  </span>
                ) : (
                  <a
                    href={figmaUrl!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center rounded-sm p-1 text-muted-foreground hover:text-foreground hover:bg-accent"
                    title="Open in Figma"
                    aria-label="Open in Figma"
                  >
                    <img src={figmaIcon} alt="" className={externalIconClass} />
                  </a>
                ))}
              {hasStorybookLink ? (
                <a
                  href={storybookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center rounded-sm p-1 text-muted-foreground hover:text-foreground hover:bg-accent"
                  title="Open in Storybook"
                  aria-label="Open in Storybook"
                >
                  <img src={storybookIcon} alt="" className={externalIconClass} />
                </a>
              ) : (
                <span
                  className="inline-flex items-center justify-center rounded-sm p-1 text-muted-foreground/40 cursor-not-allowed"
                  title="Storybook link unavailable"
                  aria-label="Storybook link unavailable"
                >
                  <img
                    src={storybookIcon}
                    alt=""
                    className="size-4 grayscale opacity-40 mix-blend-multiply"
                  />
                </span>
              )}
            </div>
          </div>
          <p className="text-lg text-muted-foreground">{description}</p>
          {catalogEntry && (
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant={figmaBadgeProps?.variant}
                outline={figmaBadgeProps?.outline}
                className={figmaBadgeProps?.className}
              >
                {getPrimitiveFigmaLabel(catalogEntry.figmaAvailability)}
              </Badge>
              <Badge
                variant={eosGaBadgeProps?.variant}
                outline={eosGaBadgeProps?.outline}
                className={eosGaBadgeProps?.className}
              >
                <GaBadgeContent product="Eos" required={catalogEntry.eosGaRequired} />
              </Badge>
              <Badge
                variant={duneGaBadgeProps?.variant}
                outline={duneGaBadgeProps?.outline}
                className={duneGaBadgeProps?.className}
              >
                <GaBadgeContent product="Dune" required={catalogEntry.duneGaRequired} />
              </Badge>
            </div>
          )}
          {componentStatus !== 'stable' && componentStatus !== 'ready-for-ga' && (
            <div className={`p-4 rounded-lg border ${statusClasses}`}>
              <p className="text-sm">
                <strong>Note:</strong> {statusMessage}
              </p>
            </div>
          )}
        </div>

        {/* Examples Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Examples</h2>
          <StoriesRenderer slug={resolvedSlug} />
        </section>

        {/* Installation Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Installation</h2>
          <InstallationCommand component={resolvedSlug} dependencies={[]} componentCode="" />
        </section>

        {/* Guidelines Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-green-700 dark:text-green-400">Do</h3>
              <div className="p-4 rounded-lg border bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800">
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  <li>Use semantic variants and sizes appropriately.</li>
                  <li>Ensure accessible labels and focus states.</li>
                  <li>Follow spacing and radius tokens.</li>
                </ul>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-red-700 dark:text-red-400">Don&apos;t</h3>
              <div className="p-4 rounded-lg border bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800">
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  <li>Don&apos;t override tokens with hard-coded colors.</li>
                  <li>Don&apos;t remove focus-visible outlines.</li>
                  <li>Don&apos;t mix padding that breaks alignment.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
