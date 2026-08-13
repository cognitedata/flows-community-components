"use client";

import * as React from "react";
import { THEME_TOKEN_GROUPS } from "@/lib/theme-tokens-data";

export type ThemeMode = "light" | "dark";
type Overrides = Record<ThemeMode, Record<string, string>>;

interface ThemeOverridesContextValue {
  overrides: Overrides;
  setToken: (mode: ThemeMode, cssVar: string, value: string) => void;
  reset: () => void;
}

const ThemeOverridesContext = React.createContext<ThemeOverridesContextValue | null>(null);

const ALL_TOKENS = THEME_TOKEN_GROUPS.flatMap((group) => group.tokens);

const EMPTY_OVERRIDES: Overrides = { light: {}, dark: {} };

// `:root` always matches <html>, dark class or not — it isn't scoped to
// "light mode only". So both blocks below must always declare every
// token's *current* value (override or default), not just the ones that
// were touched. Otherwise an edited light value can leak into dark mode:
// with only the light override present, `:root` (carrying the edit) ends
// up later in the cascade than the original `.dark` default rule, and
// wins for `<html class="dark">` too since both selectors share the same
// specificity.
function buildOverrideCss(overrides: Overrides) {
  const lightRules = ALL_TOKENS.map(
    (token) => `  --${token.cssVar}: ${overrides.light[token.cssVar] ?? token.light};`
  ).join("\n");
  const darkRules = ALL_TOKENS.map(
    (token) => `  --${token.cssVar}: ${overrides.dark[token.cssVar] ?? token.dark};`
  ).join("\n");

  return `:root {\n${lightRules}\n}\n.dark {\n${darkRules}\n}`;
}

/**
 * Holds re-theme overrides at the app root (not per-page), and always
 * renders the override <style> tag regardless of route, so edits made on
 * the Custom theming page keep applying while navigating elsewhere. State
 * is in-memory only — it resets on a full page refresh or via `reset()`.
 */
export function ThemeOverridesProvider({ children }: { children: React.ReactNode }) {
  const [overrides, setOverrides] = React.useState<Overrides>(EMPTY_OVERRIDES);

  const setToken = React.useCallback((mode: ThemeMode, cssVar: string, value: string) => {
    setOverrides((prev) => ({
      ...prev,
      [mode]: { ...prev[mode], [cssVar]: value },
    }));
  }, []);

  const reset = React.useCallback(() => setOverrides(EMPTY_OVERRIDES), []);

  const value = React.useMemo(() => ({ overrides, setToken, reset }), [overrides, setToken, reset]);

  return (
    <ThemeOverridesContext.Provider value={value}>
      <style>{buildOverrideCss(overrides)}</style>
      {children}
    </ThemeOverridesContext.Provider>
  );
}

export function useThemeOverrides() {
  const ctx = React.useContext(ThemeOverridesContext);
  if (!ctx) {
    throw new Error("useThemeOverrides must be used within a ThemeOverridesProvider");
  }
  return ctx;
}
