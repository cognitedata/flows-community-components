import { MarkdownDoc } from '@/components/documentation/markdown-doc';
import type { AuraPackageDocsSource } from '@/lib/aura-package-docs';
import { chromaticStorybookManagerUrl } from '@/lib/chromatic-storybook';
import { getComponentByStorybookId } from '@/lib/component-catalog-data';
import { useThemeOverrides } from '@/lib/theme-overrides-context';
import { slugify } from '@/lib/utils';

// Aura docs link to siblings with Storybook-relative hrefs,
// e.g. `?path=/docs/primitives-tooltip--docs`.
const STORYBOOK_PATH_PATTERN = /^\?path=\/(?:docs|story)\/([\w-]+)$/;

export function AuraPackageDocs({
  name,
  source: { markdown, Gallery },
}: {
  name: string;
  source: AuraPackageDocsSource;
}) {
  const { appearance, sharedTheme } = useThemeOverrides();

  const resolveHref = (href: string) => {
    const storyId = STORYBOOK_PATH_PATTERN.exec(href)?.[1];
    if (!storyId) return href;
    const component = getComponentByStorybookId(storyId);
    if (component) return `/aura/components/${slugify(component.name)}`;
    return chromaticStorybookManagerUrl(storyId, appearance, sharedTheme);
  };

  return (
    <>
      {Gallery ? (
        <section
          aria-label={`${name} gallery`}
          className="mb-12 flex min-h-48 items-center justify-center rounded-2xl border border-border bg-background p-8 text-foreground sm:mb-14 sm:p-12"
        >
          <Gallery />
        </section>
      ) : null}
      <MarkdownDoc
        markdown={markdown}
        resolveHref={resolveHref}
        className="mb-16 sm:mb-20"
      />
    </>
  );
}
