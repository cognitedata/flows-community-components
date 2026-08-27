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

/**
 * Resolves an Aura CSS custom property to hex via the live stylesheet.
 */
export function readAuraTokenHex(cssVar: string): string {
  if (typeof document === 'undefined') return '#000000';

  const probe = document.createElement('span');
  probe.style.color = `var(--${cssVar})`;
  probe.style.position = 'absolute';
  probe.style.visibility = 'hidden';
  probe.style.pointerEvents = 'none';
  const parent = document.body ?? document.documentElement;
  parent.appendChild(probe);
  const computed = getComputedStyle(probe).color;
  probe.remove();
  return cssColorToHex(computed) ?? '#000000';
}
