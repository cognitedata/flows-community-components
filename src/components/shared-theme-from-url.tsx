"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import {
  buildSharedThemeCss,
  emptySharedTheme,
  isAuraThemeMessage,
  readAppearanceFromHash,
  readThemeFromHash,
  readThemeFromSearch,
  type SharedThemeOverrides,
  type ThemeAppearance,
} from "@/lib/theme-share-url";

function readInitialTheme(): SharedThemeOverrides {
  if (typeof window === "undefined") return emptySharedTheme();
  return (
    readThemeFromHash(window.location.hash) ??
    readThemeFromSearch(window.location.search) ??
    emptySharedTheme()
  );
}

function readInitialAppearance(): ThemeAppearance | undefined {
  if (typeof window === "undefined") return undefined;
  return readAppearanceFromHash(window.location.hash);
}

/**
 * Applies a Fusion-compatible shared theme (`#theme=…`) site-wide via injected
 * CSS variables, and keeps it in sync when the hash changes (e.g. parent iframe
 * updates) or when an `aura-set-theme` postMessage arrives.
 */
export function SharedThemeFromUrlProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setTheme } = useTheme();
  const [shared, setShared] = React.useState<SharedThemeOverrides>(readInitialTheme);

  const applyAppearance = React.useCallback(
    (appearance: ThemeAppearance | undefined) => {
      if (appearance) setTheme(appearance);
    },
    [setTheme]
  );

  const applyFromHash = React.useCallback(() => {
    const fromHash = readThemeFromHash(window.location.hash);
    if (fromHash) {
      setShared(fromHash);
    }
    applyAppearance(readAppearanceFromHash(window.location.hash));
  }, [applyAppearance]);

  React.useEffect(() => {
    applyAppearance(readInitialAppearance());

    const onHashChange = () => applyFromHash();
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [applyAppearance, applyFromHash]);

  React.useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (!isAuraThemeMessage(event.data)) return;
      setShared(event.data.theme);
      applyAppearance(event.data.appearance);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [applyAppearance]);

  const css = React.useMemo(() => buildSharedThemeCss(shared), [shared]);

  return (
    <>
      {css ? <style data-aura-shared-theme>{css}</style> : null}
      {children}
    </>
  );
}
