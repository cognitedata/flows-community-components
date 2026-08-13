/**
 * Local Storybook URLs for community components (same repo — no remote iframe).
 */

const storybookBase = () => {
  const base = import.meta.env.BASE_URL || '/';
  const normalized = base.endsWith('/') ? base : `${base}/`;
  return `${normalized}storybook/`;
};

/** Full Storybook manager docs URL for “open in new tab” links. */
export function communityStorybookManagerUrl(slug: string) {
  return `${storybookBase()}?path=/docs/community-${slug}--docs`;
}
