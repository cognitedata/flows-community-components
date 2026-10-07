import auraChangelog from '@cognite/aura/CHANGELOG.md?raw';

import { MarkdownDoc } from '@/components/documentation/markdown-doc';

export const CHANGELOG_INTRO =
  'Release notes for @cognite/aura, pulled from the CHANGELOG.md in the installed package.';

export function ChangelogContent() {
  return <MarkdownDoc markdown={auraChangelog} />;
}
