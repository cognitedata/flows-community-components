import { withStorybookThemeGlobals } from '@/lib/storybook-theme';
import {
  buildThemeHashUrl,
  emptySharedTheme,
  type SharedThemeOverrides,
  type ThemeAppearance,
} from '@/lib/theme-share-url';

const CHROMATIC_STORYBOOK_BASE =
  'https://master--695bb4b1b8041ae09768950a.chromatic.com/';

export const CHROMATIC_STORYBOOK_ORIGIN = new URL(CHROMATIC_STORYBOOK_BASE)
  .origin;

const STORYBOOK_CHANNEL_KEY = 'storybook-channel';

const PREVIEW_READY_EVENTS = new Set([
  'storyRendered',
  'storyFinished',
  'docsRendered',
  'storyErrored',
  'storyThrewException',
  'storyMissing',
]);

function parseStorybookChannelMessage(
  data: unknown
): { type: string; args: unknown[] } | undefined {
  let payload: unknown = data;
  if (typeof data === 'string') {
    try {
      payload = JSON.parse(data) as unknown;
    } catch {
      return undefined;
    }
  }
  if (!payload || typeof payload !== 'object') return undefined;

  const record = payload as Record<string, unknown>;
  if (record.key !== STORYBOOK_CHANNEL_KEY) return undefined;
  if (!record.event || typeof record.event !== 'object') return undefined;

  const event = record.event as Record<string, unknown>;
  if (typeof event.type !== 'string') return undefined;

  return {
    type: event.type,
    args: Array.isArray(event.args) ? event.args : [],
  };
}

function messageMatchesStory(args: unknown[], storyId: string): boolean {
  const first = args[0];
  if (typeof first === 'string') return first === storyId;
  if (first && typeof first === 'object' && 'storyId' in first) {
    return (first as { storyId: unknown }).storyId === storyId;
  }
  return true;
}

/** True when the Chromatic preview has finished preparing the given story. */
export function isChromaticPreviewReadyMessage(
  data: unknown,
  storyId: string
): boolean {
  const parsed = parseStorybookChannelMessage(data);
  if (!parsed || !PREVIEW_READY_EVENTS.has(parsed.type)) return false;
  return messageMatchesStory(parsed.args, storyId);
}

/** Convert `primitives-accordion--basic` → `primitives-accordion--docs`. */
export function storyIdToDocsId(storyId: string) {
  return storyId.replace(/--[\w-]+$/, '--docs');
}

function chromaticPreviewUrl(storyId: string) {
  return `${CHROMATIC_STORYBOOK_BASE}iframe.html?id=${storyId}&viewMode=story&shortcuts=false`;
}

/**
 * Inner Storybook preview URL. Query `globals=theme:*` sets the initial
 * toolbar theme; hash `#appearance=` / `#theme=` is what Fusion Aura
 * Storybook listens to for live iframe updates without remounting.
 */
export function chromaticStorybookEmbedUrl(
  storyId: string,
  appearance: ThemeAppearance = 'dark',
  overrides: SharedThemeOverrides = emptySharedTheme()
) {
  const withGlobals = withStorybookThemeGlobals(
    chromaticPreviewUrl(storyId),
    appearance
  );
  return buildThemeHashUrl(withGlobals, overrides, appearance);
}

/**
 * Updates an already-mounted preview iframe by rewriting only the hash.
 * Query string stays put so the Storybook document is not reloaded.
 */
export function syncChromaticIframeTheme(
  iframe: HTMLIFrameElement,
  appearance: ThemeAppearance,
  overrides: SharedThemeOverrides
) {
  const current = iframe.getAttribute('src');
  if (!current) return;
  const next = buildThemeHashUrl(current, overrides, appearance);
  if (next !== current) {
    iframe.setAttribute('src', next);
  }
}

/** Full Chromatic manager docs URL, e.g. `?path=/docs/primitives-accordion--docs`. */
export function chromaticStorybookManagerUrl(
  storyId: string,
  appearance: ThemeAppearance = 'dark',
  overrides: SharedThemeOverrides = emptySharedTheme()
) {
  const docsId = storyIdToDocsId(storyId);
  const url = `${CHROMATIC_STORYBOOK_BASE}?path=/docs/${docsId}`;
  return buildThemeHashUrl(
    withStorybookThemeGlobals(url, appearance),
    overrides,
    appearance
  );
}
