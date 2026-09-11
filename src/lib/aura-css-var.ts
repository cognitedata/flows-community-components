import type { ThemeAppearance } from '@/lib/theme-share-url';

function channelToHex(value: number): string {
  return Math.round(Math.min(255, Math.max(0, value)))
    .toString(16)
    .padStart(2, '0');
}

/** Converts a computed CSS color (hex or rgb/rgba) to `#rrggbb`. */
export function cssColorToHex(value: string): string | undefined {
  const trimmed = value.trim();
  if (/^#[0-9a-fA-F]{6}$/.test(trimmed)) return trimmed.toLowerCase();
  if (/^#[0-9a-fA-F]{8}$/.test(trimmed))
    return trimmed.slice(0, 7).toLowerCase();
  if (/^#[0-9a-fA-F]{3}$/.test(trimmed)) {
    const [, r, g, b] = trimmed;
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
  }

  const rgb = trimmed.match(
    /^rgba?\(\s*([\d.]+)[%]?\s*[,/]\s*([\d.]+)[%]?\s*[,/]\s*([\d.]+)/
  );
  if (rgb) {
    return `#${channelToHex(Number(rgb[1]))}${channelToHex(Number(rgb[2]))}${channelToHex(Number(rgb[3]))}`;
  }

  const modern = trimmed.match(/^rgba?\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)/);
  if (modern) {
    return `#${channelToHex(Number(modern[1]))}${channelToHex(Number(modern[2]))}${channelToHex(Number(modern[3]))}`;
  }

  return undefined;
}

const CUSTOM_PROPERTY = /--([a-z0-9-]+)\s*:\s*([^;]+);/g;
const VAR_REFERENCE = /^var\(\s*--([a-z0-9-]+)(?:\s*,\s*([^)]+))?\s*\)$/i;

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Bodies of every CSS rule whose prelude equals `selector`. */
export function extractCssRuleBodies(css: string, selector: string): string[] {
  const pattern = new RegExp(`${escapeRegExp(selector)}\\s*\\{`, 'g');
  const bodies: string[] = [];

  for (const match of css.matchAll(pattern)) {
    const open = match.index + match[0].length - 1;
    let depth = 0;
    for (let index = open; index < css.length; index += 1) {
      const char = css[index];
      if (char === '{') depth += 1;
      else if (char === '}') {
        depth -= 1;
        if (depth === 0) {
          bodies.push(css.slice(open + 1, index));
          break;
        }
      }
    }
  }

  return bodies;
}

/** Body of the first CSS rule whose prelude equals `selector`. */
export function extractCssRuleBody(
  css: string,
  selector: string
): string | undefined {
  return extractCssRuleBodies(css, selector)[0];
}

/** Merges custom properties from every matching rule, later rules winning. */
export function mergeCssCustomProperties(
  css: string,
  selector: string
): Record<string, string> {
  return Object.assign(
    {},
    ...extractCssRuleBodies(css, selector).map(parseCssCustomProperties)
  );
}

const ALIAS_DECLARATION =
  /--([a-z0-9-]+)\s*:\s*var\(\s*--([a-z0-9-]+)(?:\s*,[^)]*)?\s*\)/gi;

/**
 * Maps a canonical token to the deprecated names that alias it
 * (`--destructive-background: var(--critical-background)` → critical → [destructive]).
 */
export function aliasConsumersByCanonical(
  css: string
): Record<string, string[]> {
  const consumers: Record<string, string[]> = {};
  for (const match of css.matchAll(ALIAS_DECLARATION)) {
    const alias = match[1];
    const canonical = match[2];
    if (!alias || !canonical || alias === canonical) continue;
    const list = consumers[canonical] ?? [];
    if (!list.includes(alias)) list.push(alias);
    consumers[canonical] = list;
  }
  return consumers;
}

/** Copies each override onto deprecated aliases that compiled CSS still reads. */
export function expandAliasedTokenOverrides(
  tokens: Record<string, string>,
  consumers: Record<string, string[]>
): Record<string, string> {
  const expanded = { ...tokens };
  for (const [name, value] of Object.entries(tokens)) {
    for (const alias of consumers[name] ?? []) {
      if (!(alias in expanded)) expanded[alias] = value;
    }
  }
  return expanded;
}

export function parseCssCustomProperties(
  block: string
): Record<string, string> {
  const declarations: Record<string, string> = {};
  for (const match of block.matchAll(CUSTOM_PROPERTY)) {
    declarations[match[1]] = match[2].trim();
  }
  return declarations;
}

function lookupVar(
  name: string,
  maps: Record<string, string>[]
): string | undefined {
  for (const map of maps) {
    if (name in map) return map[name];
  }
  return undefined;
}

/** Follows `var(--token)` chains through the given declaration maps. */
export function resolveCssCustomProperty(
  name: string,
  maps: Record<string, string>[]
): string | undefined {
  const seen = new Set<string>();
  let current = lookupVar(name, maps);
  if (current === undefined) return undefined;

  for (let depth = 0; depth < 12; depth += 1) {
    const reference = VAR_REFERENCE.exec(current);
    if (!reference) return current;
    const referenced = reference[1];
    if (seen.has(referenced)) return current;
    seen.add(referenced);
    const next = lookupVar(referenced, maps);
    if (next === undefined) return reference[2]?.trim() ?? current;
    current = next;
  }
  return current;
}

export type AuraTokenHexByAppearance = Record<
  ThemeAppearance,
  Record<string, string>
>;

/**
 * Resolves Aura semantic tokens to hex from `colors.css` `:root` (light)
 * and `.dark` (dark overlays). Does not use live computed styles, so Light
 * and Dark values stay distinct regardless of the document class.
 */
export function resolveAuraTokenHexByAppearance(
  css: string,
  tokenNames: string[]
): AuraTokenHexByAppearance {
  const root = mergeCssCustomProperties(css, ':root');
  const dark = mergeCssCustomProperties(css, '.dark');
  const lightMaps = [root];
  const darkMaps = [dark, root];

  const hexFor = (name: string, maps: Record<string, string>[]): string => {
    const resolved = resolveCssCustomProperty(name, maps);
    return (resolved && cssColorToHex(resolved)) || '#000000';
  };

  const light: Record<string, string> = {};
  const darkValues: Record<string, string> = {};
  for (const name of tokenNames) {
    light[name] = hexFor(name, lightMaps);
    darkValues[name] = hexFor(name, darkMaps);
  }
  return { light, dark: darkValues };
}
