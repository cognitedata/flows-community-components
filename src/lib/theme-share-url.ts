/**
 * Shareable theme encoding for the Aura docs site.
 *
 * Compatible with Fusion's aura-theme-editor (`libs/aura/src/theme-editor/lib/share-url.ts`):
 * URL-safe base64 JSON of `{ base, light, dark }` string maps.
 *
 * Preferred transport is the URL hash (`#theme=…`) so parent apps can update an
 * iframe theme without touching the query string / triggering a full navigation.
 */

export const THEME_HASH_PARAM = 'theme';
export const APPEARANCE_HASH_PARAM = 'appearance';

export type ThemeAppearance = 'light' | 'dark';

/** Fusion-compatible theme override payload. */
export interface SharedThemeOverrides {
  base: Record<string, string>;
  light: Record<string, string>;
  dark: Record<string, string>;
}

export const emptySharedTheme = (): SharedThemeOverrides => ({
  base: {},
  light: {},
  dark: {},
});

const toBase64 = (input: string): string =>
  btoa(unescape(encodeURIComponent(input)));

const fromBase64 = (input: string): string =>
  decodeURIComponent(escape(atob(input)));

const toUrlSafe = (value: string): string =>
  value.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

const fromUrlSafe = (value: string): string => {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/');
  const remainder = padded.length % 4;
  return remainder === 0 ? padded : padded + '='.repeat(4 - remainder);
};

const isStringRecord = (value: unknown): value is Record<string, string> =>
  typeof value === 'object' &&
  value !== null &&
  !Array.isArray(value) &&
  Object.values(value).every((entry) => typeof entry === 'string');

/** Encodes theme overrides into a URL-safe base64 string. */
export function encodeTheme(overrides: SharedThemeOverrides): string {
  return toUrlSafe(toBase64(JSON.stringify(overrides)));
}

/** Decodes a theme string, returning undefined when malformed. */
export function decodeTheme(encoded: string): SharedThemeOverrides | undefined {
  try {
    const parsed: unknown = JSON.parse(fromBase64(fromUrlSafe(encoded)));
    if (typeof parsed !== 'object' || parsed === null) return undefined;
    const candidate = parsed as Record<string, unknown>;
    if (
      !isStringRecord(candidate.base) ||
      !isStringRecord(candidate.light) ||
      !isStringRecord(candidate.dark)
    ) {
      return undefined;
    }
    return {
      base: candidate.base,
      light: candidate.light,
      dark: candidate.dark,
    };
  } catch {
    return undefined;
  }
}

function parseHashParams(hash: string): URLSearchParams {
  const raw = hash.startsWith('#') ? hash.slice(1) : hash;
  return new URLSearchParams(raw);
}

/** Reads and decodes `#theme=…` from a location hash. */
export function readThemeFromHash(
  hash: string
): SharedThemeOverrides | undefined {
  const encoded = parseHashParams(hash).get(THEME_HASH_PARAM);
  return encoded ? decodeTheme(encoded) : undefined;
}

/** Reads `#appearance=light|dark` from a location hash. */
export function readAppearanceFromHash(
  hash: string
): ThemeAppearance | undefined {
  const value = parseHashParams(hash).get(APPEARANCE_HASH_PARAM);
  return value === 'light' || value === 'dark' ? value : undefined;
}

/** Legacy query-string reader (Fusion theme-editor currently uses `?theme=`). */
export function readThemeFromSearch(
  search: string
): SharedThemeOverrides | undefined {
  const encoded = new URLSearchParams(search).get(THEME_HASH_PARAM);
  return encoded ? decodeTheme(encoded) : undefined;
}

/**
 * Builds a URL with the theme (and optional appearance) in the hash.
 * Existing hash params unrelated to theme/appearance are preserved.
 */
export function buildThemeHashUrl(
  baseUrl: string,
  overrides: SharedThemeOverrides,
  appearance?: ThemeAppearance
): string {
  const url = new URL(
    baseUrl,
    typeof window !== 'undefined' ? window.location.origin : 'http://localhost'
  );
  const params = parseHashParams(url.hash);
  params.set(THEME_HASH_PARAM, encodeTheme(overrides));
  if (appearance) {
    params.set(APPEARANCE_HASH_PARAM, appearance);
  } else {
    params.delete(APPEARANCE_HASH_PARAM);
  }
  url.hash = params.toString();
  return url.toString();
}

/** Serialises overrides into a `:root` / `.dark` CSS block (changed tokens only). */
export function buildSharedThemeCss(overrides: SharedThemeOverrides): string {
  const nl = String.fromCharCode(10);
  const renderBlock = (
    selector: string,
    declarations: Record<string, string>
  ): string | undefined => {
    const names = Object.keys(declarations).sort();
    if (names.length === 0) return undefined;
    const body = names
      .map((name) => `  --${name}: ${declarations[name]};`)
      .join(nl);
    return `${selector} {${nl}${body}${nl}}`;
  };

  const blocks: string[] = [];
  // Base + light on :root (inherits into .dark); dark-only overrides on .dark.
  const lightBlock = renderBlock(':root', {
    ...overrides.base,
    ...overrides.light,
  });
  if (lightBlock) blocks.push(lightBlock);
  const darkBlock = renderBlock('.dark', overrides.dark);
  if (darkBlock) blocks.push(darkBlock);
  return blocks.join(nl + nl);
}

export const AURA_THEME_MESSAGE_TYPE = 'aura-set-theme' as const;

export type AuraThemeMessage = {
  type: typeof AURA_THEME_MESSAGE_TYPE;
  theme: SharedThemeOverrides;
  appearance?: ThemeAppearance;
};

export function isAuraThemeMessage(data: unknown): data is AuraThemeMessage {
  if (typeof data !== 'object' || data === null) return false;
  const candidate = data as Record<string, unknown>;
  if (candidate.type !== AURA_THEME_MESSAGE_TYPE) return false;
  if (typeof candidate.theme !== 'object' || candidate.theme === null)
    return false;
  const theme = candidate.theme as Record<string, unknown>;
  return (
    isStringRecord(theme.base) &&
    isStringRecord(theme.light) &&
    isStringRecord(theme.dark)
  );
}
