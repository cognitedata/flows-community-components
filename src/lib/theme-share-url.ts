/**
 * Shareable theme encoding, matching Fusion Aura Storybook
 * (`libs/aura/src/lib/theme-share-url.ts`).
 *
 * URL-safe base64 JSON of `{ base, light, dark }` string maps. Transport is
 * the URL hash (`#theme=…` + `#appearance=…`) so a parent can restyle an
 * iframe via `hashchange` without rewriting the query string (which would
 * remount the preview).
 */

export const THEME_HASH_PARAM = 'theme';
export const APPEARANCE_HASH_PARAM = 'appearance';

export type ThemeAppearance = 'light' | 'dark';

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

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isStringRecord = (value: unknown): value is Record<string, string> =>
  isRecord(value) &&
  Object.values(value).every((entry) => typeof entry === 'string');

/** CSS custom-property name without the leading `--`. */
const CSS_TOKEN_NAME_PATTERN = /^[a-zA-Z][a-zA-Z0-9-]{0,127}$/;

const isSafeCssTokenName = (name: string): boolean =>
  CSS_TOKEN_NAME_PATTERN.test(name);

const BREAKOUT_CHARS = new Set([';', '{', '}', '<', '>', '\\']);

const hasUnsafeCssChars = (value: string): boolean => {
  for (const char of value) {
    const code = char.charCodeAt(0);
    if (code <= 0x1f || code === 0x7f || BREAKOUT_CHARS.has(char)) {
      return true;
    }
  }
  return false;
};

/** Rejects values that can break out of a CSS declaration or `<style>` block. */
const isSafeCssTokenValue = (value: string): boolean => {
  if (value.length === 0 || value.length > 512) return false;
  if (hasUnsafeCssChars(value)) return false;
  return !/@|url\s*\(|expression\s*\(/i.test(value);
};

const isSafeTokenRecord = (value: unknown): value is Record<string, string> =>
  isStringRecord(value) &&
  Object.entries(value).every(
    ([name, tokenValue]) =>
      isSafeCssTokenName(name) && isSafeCssTokenValue(tokenValue)
  );

const sanitizeDeclarations = (
  declarations: Record<string, string>
): Record<string, string> =>
  Object.fromEntries(
    Object.entries(declarations).filter(
      ([name, tokenValue]) =>
        isSafeCssTokenName(name) && isSafeCssTokenValue(tokenValue)
    )
  );

/** Encodes theme overrides into a URL-safe base64 string. */
export function encodeTheme(overrides: SharedThemeOverrides): string {
  return toUrlSafe(toBase64(JSON.stringify(overrides)));
}

/** Decodes a theme string, returning undefined when malformed or unsafe. */
export function decodeTheme(encoded: string): SharedThemeOverrides | undefined {
  try {
    const parsed: unknown = JSON.parse(fromBase64(fromUrlSafe(encoded)));
    if (!isRecord(parsed)) return undefined;
    if (
      !isSafeTokenRecord(parsed.base) ||
      !isSafeTokenRecord(parsed.light) ||
      !isSafeTokenRecord(parsed.dark)
    ) {
      return undefined;
    }
    return {
      base: parsed.base,
      light: parsed.light,
      dark: parsed.dark,
    };
  } catch {
    return undefined;
  }
}

function parseHashParams(hash: string): URLSearchParams {
  const raw = hash.startsWith('#') ? hash.slice(1) : hash;
  return new URLSearchParams(raw);
}

export function hasThemeInHash(hash: string): boolean {
  return parseHashParams(hash).has(THEME_HASH_PARAM);
}

export function hasThemeInSearch(search: string): boolean {
  return new URLSearchParams(search).has(THEME_HASH_PARAM);
}

/** Removes `#theme=` while preserving other hash params. */
export function stripThemeFromHash(hash: string): string {
  const params = parseHashParams(hash);
  params.delete(THEME_HASH_PARAM);
  const next = params.toString();
  return next ? `#${next}` : '';
}

/** Removes `?theme=` while preserving other query params. */
export function stripThemeFromSearch(search: string): string {
  const params = new URLSearchParams(
    search.startsWith('?') ? search.slice(1) : search
  );
  params.delete(THEME_HASH_PARAM);
  const next = params.toString();
  return next ? `?${next}` : '';
}

/**
 * Drops a Fusion/share theme from the current URL without adding history.
 * `replaceState` does not fire `hashchange`, so in-memory listeners must
 * also be notified via `resetSharedThemeSession`.
 */
export function clearThemeFromLocation(): void {
  if (typeof window === 'undefined') return;
  const hash = stripThemeFromHash(window.location.hash);
  const search = stripThemeFromSearch(window.location.search);
  const next = `${window.location.pathname}${search}${hash}`;
  const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  if (next === current) return;
  window.history.replaceState(window.history.state, '', next);
}

const sharedThemeResetListeners = new Set<() => void>();

export function subscribeSharedThemeReset(listener: () => void): () => void {
  sharedThemeResetListeners.add(listener);
  return () => {
    sharedThemeResetListeners.delete(listener);
  };
}

/** Clears `#theme=` / `?theme=` and notifies shared-theme listeners. */
export function resetSharedThemeSession(): void {
  clearThemeFromLocation();
  for (const listener of sharedThemeResetListeners) listener();
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

/** Legacy query-string reader. */
export function readThemeFromSearch(
  search: string
): SharedThemeOverrides | undefined {
  const encoded = new URLSearchParams(search).get(THEME_HASH_PARAM);
  return encoded ? decodeTheme(encoded) : undefined;
}

/**
 * Builds a URL with the theme (and optional appearance) in the hash.
 * Existing hash params unrelated to theme/appearance are preserved.
 * Query string is left untouched so Storybook does not remount.
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
    const safe = sanitizeDeclarations(declarations);
    const names = Object.keys(safe).sort();
    if (names.length === 0) return undefined;
    const body = names.map((name) => `  --${name}: ${safe[name]};`).join(nl);
    return `${selector} {${nl}${body}${nl}}`;
  };

  const blocks: string[] = [];
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
    isSafeTokenRecord(theme.base) &&
    isSafeTokenRecord(theme.light) &&
    isSafeTokenRecord(theme.dark)
  );
}
