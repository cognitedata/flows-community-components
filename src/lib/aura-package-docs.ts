import buttonDocs from '@cognite/aura/docs/button?raw';
import { ButtonGallery } from '@cognite/aura/examples/button';
import type * as React from 'react';

/**
 * Components whose docs page is sourced from the published `@cognite/aura`
 * package instead of the Chromatic Storybook embed:
 *
 * - `@cognite/aura/docs/<name>` — portable usage markdown
 * - `@cognite/aura/examples/<name>` — gallery component (`<Name>Gallery`)
 *
 * Keyed by catalog slug. To migrate another component once Aura ships its
 * docs and gallery, add an entry here; everything else keeps the embed.
 */
export interface AuraPackageDocsSource {
  markdown: string;
  Gallery?: React.ComponentType;
}

const AURA_PACKAGE_DOCS: Record<string, AuraPackageDocsSource> = {
  button: { markdown: buttonDocs, Gallery: ButtonGallery },
};

export function getAuraPackageDocs(slug: string) {
  return AURA_PACKAGE_DOCS[slug] ?? null;
}
