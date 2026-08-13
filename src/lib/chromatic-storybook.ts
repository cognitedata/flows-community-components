import type { StorybookTheme } from "@/lib/storybook-theme";
import { withStorybookThemeGlobals } from "@/lib/storybook-theme";

const CHROMATIC_STORYBOOK_BASE =
  "https://master--695bb4b1b8041ae09768950a.chromatic.com/";

/** Convert `primitives-accordion--basic` → `primitives-accordion--docs`. */
export function storyIdToDocsId(storyId: string) {
  return storyId.replace(/--[\w-]+$/, "--docs");
}

/** Inner Storybook preview (`iframe.html`) for a primitives story id. */
export function chromaticStorybookEmbedUrl(
  storyId: string,
  theme: StorybookTheme = "dark"
) {
  const url = `${CHROMATIC_STORYBOOK_BASE}iframe.html?id=${storyId}&viewMode=story&shortcuts=false`;
  return withStorybookThemeGlobals(url, theme);
}

/** Full Chromatic manager docs URL, e.g. `?path=/docs/primitives-accordion--docs`. */
export function chromaticStorybookManagerUrl(
  storyId: string,
  theme: StorybookTheme = "dark"
) {
  const docsId = storyIdToDocsId(storyId);
  const url = `${CHROMATIC_STORYBOOK_BASE}?path=/docs/${docsId}`;
  return withStorybookThemeGlobals(url, theme);
}
