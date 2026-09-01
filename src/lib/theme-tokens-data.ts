import auraColorsCss from '@cognite/aura/colors.css?raw';

import { resolveAuraTokenHexByAppearance } from '@/lib/aura-css-var';

export interface ThemeToken {
  cssVar: string;
  label: string;
  description: string;
}

export interface ThemeTokenSection {
  title: string;
  tokens: ThemeToken[];
}

export interface ThemeTokenGroup {
  id: string;
  title: string;
  description: string;
  sections: ThemeTokenSection[];
}

/** First path segment of an Aura token name (`chart-fjord-color-1` → `chart`). */
export function tokenPrefix(cssVar: string): string {
  const dash = cssVar.indexOf('-');
  return dash === -1 ? cssVar : cssVar.slice(0, dash);
}

/** Remainder after the first prefix (`chart-fjord-color-1` → `fjord-color-1`). */
export function tokenRemainder(cssVar: string): string {
  const dash = cssVar.indexOf('-');
  return dash === -1 ? cssVar : cssVar.slice(dash + 1);
}

function titleFromPrefix(prefix: string): string {
  return prefix.charAt(0).toUpperCase() + prefix.slice(1);
}

function secondPrefix(remainder: string): string {
  const dash = remainder.indexOf('-');
  return dash === -1 ? remainder : remainder.slice(0, dash);
}

const GROUP_ORDER = [
  'background',
  'alternate',
  'foreground',
  'card',
  'popover',
  'raised',
  'overlay',
  'primary',
  'secondary',
  'accent',
  'active',
  'muted',
  'input',
  'disabled',
  'link',
  'border',
  'ring',
  'info',
  'success',
  'warning',
  'destructive',
  'neutral',
  'decorative',
  'chart',
] as const;

const RAMP_HUES = new Set([
  'amber',
  'aurora',
  'blue',
  'dusk',
  'fjord',
  'gray',
  'green',
  'mountain',
  'nordic',
  'orange',
  'pink',
  'red',
  'sky',
  'yellow',
]);

const RAMP_REST = /^(alpha-)?(\d+|black|white)$/;

function isAuraRampOrOpacity(name: string): boolean {
  if (name.startsWith('opacity-')) return true;
  const dash = name.indexOf('-');
  if (dash === -1) return false;
  const hue = name.slice(0, dash);
  if (!RAMP_HUES.has(hue)) return false;
  return RAMP_REST.test(name.slice(dash + 1));
}

/** Semantic `--color-*` names from Aura `colors.css` (ramps excluded). */
export function parseAuraSemanticTokenNames(css: string): string[] {
  const names: string[] = [];
  const seen = new Set<string>();
  for (const match of css.matchAll(/--color-([a-z0-9-]+)\s*:/g)) {
    const name = match[1];
    if (isAuraRampOrOpacity(name) || seen.has(name)) continue;
    seen.add(name);
    names.push(name);
  }
  return names;
}

const TOKEN_DESCRIPTIONS: Record<string, string> = {
  background: 'Main app and page surface',
  'alternate-background': 'Alternating rows, subtle secondary surfaces',
  'background-fixed-light':
    'Permanently light surface — does not flip in dark mode',
  'background-fixed-dark':
    'Permanently dark surface — does not flip in light mode',
  'card-background': 'Card and panel surface fill',
  'popover-background': 'Dropdowns, popovers, tooltips, and floating panels',
  'raised-background': 'Modals, drawers, and elevated surfaces above the page',
  'overlay-background': 'Scrim or backdrop behind modals and dialogs',
  'muted-background': 'Subdued background for less prominent UI areas',
  'accent-background':
    'Subtle highlight for selected, focused, or hovered items',
  'accent-background-strong':
    'Stronger accent for more prominent highlighted states',
  'accent-background-fixed-dark':
    'Permanently dark accent surface — does not flip in light mode',
  'disabled-background': 'Fill for disabled interactive elements',
  'disabled-background-fixed-dark': 'Disabled fill on permanently dark chrome',
  'primary-background': 'Primary action buttons and key CTAs',
  'primary-background-hover': 'Hover state on primary action elements',
  'foreground-on-primary': 'Text and icons on a primary-background surface',
  'primary-background-fixed-dark': 'Primary fill on permanently dark chrome',
  'primary-background-fixed-dark-hover':
    'Hover for primary fill on permanently dark chrome',
  'secondary-background':
    'Secondary actions, chip fills, ghost button surfaces',
  'secondary-background-hover': 'Hover state on secondary action elements',
  'secondary-foreground':
    'Secondary text — slightly less prominent than primary',
  'secondary-background-fixed-dark':
    'Secondary fill on permanently dark chrome',
  'secondary-background-fixed-dark-hover':
    'Hover for secondary fill on permanently dark chrome',
  'secondary-foreground-fixed-light':
    'Secondary text on permanently dark surfaces',
  'foreground-secondary-fixed-dark':
    'Secondary text on permanently light surfaces',
  'active-background': 'Fill for selected items in navigation and lists',
  'active-background-hover': 'Hover state on selected navigation items',
  'active-muted-background':
    'Subtle selected-state fill for secondary navigation',
  'active-muted-background-hover': 'Hover state on muted active elements',
  'foreground-on-active': 'Text and icons on an active-background surface',
  'border-active': 'Border of active or selected elements',
  'input-active-background': 'Background of active or focused form inputs',
  foreground: 'Primary text and icons',
  'foreground-fixed-light':
    'Permanently white text — for use on fixed-dark surfaces',
  'foreground-fixed-dark':
    'Permanently dark text — for use on fixed-light surfaces',
  'muted-foreground': 'Placeholder text, timestamps, and supplemental labels',
  'muted-foreground-fixed-light': 'Muted text on permanently dark surfaces',
  'link-foreground': 'Hyperlinks and interactive inline text',
  'disabled-foreground': 'Text and icons on disabled elements',
  'disabled-foreground-fixed-dark': 'Disabled text on permanently dark chrome',
  border: 'Default dividers and element borders',
  'border-emphasized': 'Slightly stronger border for emphasis',
  'border-fixed-light':
    'Border on a fixed-light surface — does not flip with the theme',
  'border-on-dark': 'Border used on dark surfaces',
  ring: 'Focus ring for keyboard navigation',
  'ring-muted': 'Subtle focus ring variant',
  'info-background': 'Surface fill for informational status components',
  'info-background-hover': 'Hover state on info status surfaces',
  'info-muted-background': 'Subtle info surface for use on persistent chrome',
  'info-foreground':
    'Text and icons conveying info status on a neutral surface',
  'info-foreground-on-info':
    'Text and icons placed directly on an info-background surface',
  'success-background': 'Surface fill for success status components',
  'success-background-hover': 'Hover state on success status surfaces',
  'success-muted-background':
    'Subtle success surface for use on persistent chrome',
  'success-foreground':
    'Text and icons conveying success status on a neutral surface',
  'success-foreground-on-success':
    'Text and icons placed directly on a success-background surface',
  'warning-background': 'Surface fill for warning status components',
  'warning-background-hover': 'Hover state on warning status surfaces',
  'warning-muted-background':
    'Subtle warning surface for use on persistent chrome',
  'warning-foreground':
    'Text and icons conveying warning status on a neutral surface',
  'warning-foreground-on-warning':
    'Text and icons placed directly on a warning-background surface',
  'destructive-background':
    'Surface fill for destructive or error status components',
  'destructive-background-hover': 'Hover state on destructive status surfaces',
  'destructive-muted-background':
    'Subtle destructive surface for use on persistent chrome',
  'destructive-muted-background-hover':
    'Hover state on muted destructive surfaces',
  'destructive-foreground':
    'Text and icons conveying destructive or error status on a neutral surface',
  'destructive-foreground-on-critical':
    'Text and icons placed directly on a destructive-background surface',
  'ring-destructive': 'Focus ring on destructive or error-state elements',
  'ring-destructive-muted': 'Muted focus ring for destructive elements',
  'neutral-background':
    'Surface fill for neutral or inactive status components',
  'neutral-background-hover': 'Hover state on neutral status surfaces',
  'neutral-muted-background':
    'Subtle neutral surface for use on persistent chrome',
  'neutral-foreground':
    'Text and icons conveying neutral status on a neutral surface',
  'neutral-foreground-on-neutral':
    'Text and icons placed directly on a neutral-background surface',
  'decorative-background-fjord':
    'Fjord-tinted fill for avatars, badges, and illustrations',
  'decorative-background-fjord-hover': 'Hover state for fjord decorative fill',
  'decorative-foreground-fjord':
    'Text and icons on a fjord decorative background',
  'decorative-background-nordic':
    'Nordic-tinted fill for avatars, badges, and illustrations',
  'decorative-background-nordic-hover':
    'Hover state for nordic decorative fill',
  'decorative-foreground-nordic':
    'Text and icons on a nordic decorative background',
  'decorative-background-aurora':
    'Aurora-tinted fill for avatars, badges, and illustrations',
  'decorative-background-aurora-hover':
    'Hover state for aurora decorative fill',
  'decorative-foreground-aurora':
    'Text and icons on an aurora decorative background',
  'decorative-background-dusk':
    'Dusk-tinted fill for avatars, badges, and illustrations',
  'decorative-background-dusk-hover': 'Hover state for dusk decorative fill',
  'decorative-foreground-dusk':
    'Text and icons on a dusk decorative background',
  'decorative-background-orange':
    'Orange-tinted fill for avatars, badges, and illustrations',
  'decorative-background-orange-hover':
    'Hover state for orange decorative fill',
  'decorative-foreground-orange':
    'Text and icons on an orange decorative background',
  'decorative-background-sky':
    'Sky-tinted fill for avatars, badges, and illustrations',
  'decorative-background-sky-hover': 'Hover state for sky decorative fill',
  'decorative-foreground-sky': 'Text and icons on a sky decorative background',
  'decorative-background-mountain':
    'Mountain-tinted fill for avatars, badges, and illustrations',
  'decorative-background-mountain-hover':
    'Hover state for mountain decorative fill',
  'decorative-foreground-mountain':
    'Text and icons on a mountain decorative background',
  'chart-gridlines': 'Chart axis and gridline color',
  'chart-fjord-color-1': 'Chart fjord series, strongest',
  'chart-fjord-color-2': 'Chart fjord series, level 2',
  'chart-fjord-color-3': 'Chart fjord series, level 3',
  'chart-fjord-color-4': 'Chart fjord series, level 4',
  'chart-fjord-color-5': 'Chart fjord series, level 5',
  'chart-fjord-color-6': 'Chart fjord series, lightest',
  'chart-nordic-color-1': 'Chart nordic series, strongest',
  'chart-nordic-color-2': 'Chart nordic series, level 2',
  'chart-nordic-color-3': 'Chart nordic series, level 3',
  'chart-nordic-color-4': 'Chart nordic series, level 4',
  'chart-nordic-color-5': 'Chart nordic series, level 5',
  'chart-nordic-color-6': 'Chart nordic series, lightest',
  'chart-dusk-color-1': 'Chart dusk series, strongest',
  'chart-dusk-color-2': 'Chart dusk series, level 2',
  'chart-dusk-color-3': 'Chart dusk series, level 3',
  'chart-dusk-color-4': 'Chart dusk series, level 4',
  'chart-dusk-color-5': 'Chart dusk series, level 5',
  'chart-dusk-color-6': 'Chart dusk series, lightest',
  'chart-aurora-color-1': 'Chart aurora series, strongest',
  'chart-aurora-color-2': 'Chart aurora series, level 2',
  'chart-aurora-color-3': 'Chart aurora series, level 3',
  'chart-aurora-color-4': 'Chart aurora series, level 4',
  'chart-aurora-color-5': 'Chart aurora series, level 5',
  'chart-aurora-color-6': 'Chart aurora series, lightest',
  'chart-orange-color-1': 'Chart orange series, strongest',
  'chart-orange-color-2': 'Chart orange series, level 2',
  'chart-orange-color-3': 'Chart orange series, level 3',
  'chart-orange-color-4': 'Chart orange series, level 4',
  'chart-orange-color-5': 'Chart orange series, level 5',
  'chart-orange-color-6': 'Chart orange series, lightest',
  'chart-info-color-1': 'Chart info series, strongest',
  'chart-info-color-2': 'Chart info series, level 2',
  'chart-info-color-3': 'Chart info series, level 3',
  'chart-info-color-4': 'Chart info series, level 4',
  'chart-info-color-5': 'Chart info series, level 5',
  'chart-info-color-6': 'Chart info series, lightest',
  'chart-success-color-1': 'Chart success series, strongest',
  'chart-success-color-2': 'Chart success series, level 2',
  'chart-success-color-3': 'Chart success series, level 3',
  'chart-success-color-4': 'Chart success series, level 4',
  'chart-success-color-5': 'Chart success series, level 5',
  'chart-success-color-6': 'Chart success series, lightest',
  'chart-warning-color-1': 'Chart warning series, strongest',
  'chart-warning-color-2': 'Chart warning series, level 2',
  'chart-warning-color-3': 'Chart warning series, level 3',
  'chart-warning-color-4': 'Chart warning series, level 4',
  'chart-warning-color-5': 'Chart warning series, level 5',
  'chart-warning-color-6': 'Chart warning series, lightest',
  'chart-destructive-color-1': 'Chart destructive series, strongest',
  'chart-destructive-color-2': 'Chart destructive series, level 2',
  'chart-destructive-color-3': 'Chart destructive series, level 3',
  'chart-destructive-color-4': 'Chart destructive series, level 4',
  'chart-destructive-color-5': 'Chart destructive series, level 5',
  'chart-destructive-color-6': 'Chart destructive series, lightest',
  'chart-neutral-color-1': 'Chart neutral series, strongest',
  'chart-neutral-color-2': 'Chart neutral series, level 2',
  'chart-neutral-color-3': 'Chart neutral series, level 3',
  'chart-neutral-color-4': 'Chart neutral series, level 4',
  'chart-neutral-color-5': 'Chart neutral series, level 5',
  'chart-neutral-color-6': 'Chart neutral series, lightest',
};

function describeToken(cssVar: string): string {
  return TOKEN_DESCRIPTIONS[cssVar] ?? `Aura token --${cssVar}`;
}

function buildThemeTokenGroups(css: string): ThemeTokenGroup[] {
  const buckets = new Map<string, ThemeToken[]>();

  for (const cssVar of parseAuraSemanticTokenNames(css)) {
    const prefix = tokenPrefix(cssVar);
    const token: ThemeToken = {
      cssVar,
      label: cssVar,
      description: describeToken(cssVar),
    };
    const list = buckets.get(prefix) ?? [];
    list.push(token);
    buckets.set(prefix, list);
  }

  const groupOrder = new Set<string>(GROUP_ORDER);
  const orderedPrefixes = [
    ...GROUP_ORDER.filter((prefix) => buckets.has(prefix)),
    ...[...buckets.keys()].filter((prefix) => !groupOrder.has(prefix)).sort(),
  ];

  return orderedPrefixes.map((prefix) => {
    const tokens = buckets.get(prefix) ?? [];
    const secondOrder: string[] = [];
    for (const token of tokens) {
      const second = secondPrefix(tokenRemainder(token.cssVar));
      if (!secondOrder.includes(second)) secondOrder.push(second);
    }

    const sections: ThemeTokenSection[] =
      secondOrder.length > 1
        ? secondOrder.map((second) => ({
            title: titleFromPrefix(second),
            tokens: tokens.filter(
              (token) => secondPrefix(tokenRemainder(token.cssVar)) === second
            ),
          }))
        : [{ title: titleFromPrefix(prefix), tokens }];

    return {
      id: prefix,
      title: titleFromPrefix(prefix),
      description: '',
      sections,
    };
  });
}

export const THEME_TOKEN_GROUPS: ThemeTokenGroup[] =
  buildThemeTokenGroups(auraColorsCss);

export const AURA_TOKEN_HEX = resolveAuraTokenHexByAppearance(
  auraColorsCss,
  parseAuraSemanticTokenNames(auraColorsCss)
);

export function themeGroupTokenCount(group: ThemeTokenGroup): number {
  return group.sections.reduce(
    (count, section) => count + section.tokens.length,
    0
  );
}
