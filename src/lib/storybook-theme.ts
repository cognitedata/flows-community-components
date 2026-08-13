import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export type StorybookTheme = 'light' | 'dark';

/** Resolved app theme for Storybook `globals=theme:*` (defaults to dark). */
export function useStorybookTheme(): StorybookTheme {
  const { resolvedTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return 'dark';

  const current = resolvedTheme ?? theme;
  return current === 'light' ? 'light' : 'dark';
}

export function withStorybookThemeGlobals(url: string, theme: StorybookTheme) {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}globals=theme:${theme}`;
}
