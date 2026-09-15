'use client';

import { useTheme } from 'next-themes';
import * as React from 'react';

import {
  resetSharedThemeSession,
  type SharedThemeOverrides,
} from '@/lib/theme-share-url';

export type ThemeMode = 'light' | 'dark';
type Overrides = Record<ThemeMode, Record<string, string>>;

interface ThemeOverridesContextValue {
  appearance: ThemeMode;
  setAppearance: (mode: ThemeMode) => void;
  overrides: Overrides;
  sharedTheme: SharedThemeOverrides;
  setToken: (mode: ThemeMode, cssVar: string, value: string) => void;
  reset: () => void;
}

const ThemeOverridesContext =
  React.createContext<ThemeOverridesContextValue | null>(null);

const EMPTY_OVERRIDES: Overrides = { light: {}, dark: {} };

function appearanceFromDocument(): ThemeMode {
  if (typeof document === 'undefined') return 'dark';
  if (document.documentElement.classList.contains('light')) return 'light';
  if (document.documentElement.classList.contains('dark')) return 'dark';
  return 'dark';
}

function toSharedTheme(overrides: Overrides): SharedThemeOverrides {
  return {
    base: {},
    light: { ...overrides.light },
    dark: { ...overrides.dark },
  };
}

function clearInlineTokenProperties(root: HTMLElement) {
  const names: string[] = [];
  for (let index = 0; index < root.style.length; index += 1) {
    const name = root.style.item(index);
    if (name.startsWith('--')) names.push(name);
  }
  for (const name of names) {
    root.style.removeProperty(name);
  }
}

function applyDocumentTheme(appearance: ThemeMode, overrides: Overrides) {
  const root = document.documentElement;
  clearInlineTokenProperties(root);
  root.classList.toggle('dark', appearance === 'dark');
  root.classList.add('h-full');
  document.body.classList.toggle('dark', appearance === 'dark');
  root.style.colorScheme = appearance;

  for (const [cssVar, value] of Object.entries(overrides[appearance])) {
    root.style.setProperty(`--${cssVar}`, value);
  }
}

export function ThemeOverridesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const [appearance, setAppearanceState] = React.useState<ThemeMode>(
    appearanceFromDocument
  );
  const [overrides, setOverrides] = React.useState<Overrides>(EMPTY_OVERRIDES);

  React.useLayoutEffect(() => {
    if (resolvedTheme === 'light' || resolvedTheme === 'dark') {
      setAppearanceState(resolvedTheme);
    }
  }, [resolvedTheme]);

  React.useLayoutEffect(() => {
    applyDocumentTheme(appearance, overrides);
  }, [appearance, overrides]);

  const setAppearance = React.useCallback(
    (mode: ThemeMode) => {
      setAppearanceState(mode);
      setTheme(mode);
      applyDocumentTheme(mode, overrides);
    },
    [overrides, setTheme]
  );

  const setToken = React.useCallback(
    (mode: ThemeMode, cssVar: string, value: string) => {
      setOverrides((prev) => {
        const next: Overrides = {
          ...prev,
          [mode]: { ...prev[mode], [cssVar]: value },
        };
        applyDocumentTheme(appearance, next);
        return next;
      });
    },
    [appearance]
  );

  const reset = React.useCallback(() => {
    setOverrides(EMPTY_OVERRIDES);
    applyDocumentTheme(appearance, EMPTY_OVERRIDES);
    resetSharedThemeSession();
  }, [appearance]);

  const sharedTheme = React.useMemo(
    () => toSharedTheme(overrides),
    [overrides]
  );

  const value = React.useMemo(
    () => ({
      appearance,
      setAppearance,
      overrides,
      sharedTheme,
      setToken,
      reset,
    }),
    [appearance, setAppearance, overrides, sharedTheme, setToken, reset]
  );

  return (
    <ThemeOverridesContext.Provider value={value}>
      {children}
    </ThemeOverridesContext.Provider>
  );
}

export function useThemeOverrides() {
  const ctx = React.useContext(ThemeOverridesContext);
  if (!ctx) {
    throw new Error(
      'useThemeOverrides must be used within a ThemeOverridesProvider'
    );
  }
  return ctx;
}
