import { createContext, useCallback, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  attribute?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
  themes?: string[];
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "dark" | "light";
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  resolvedTheme: "light",
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  attribute = "class",
  enableSystem = true,
  disableTransitionOnChange = false,
  themes = ["light", "dark"],
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") {
      return defaultTheme;
    }
    const stored = localStorage.getItem(storageKey) as Theme | null;
    return stored || defaultTheme;
  });

  const [mounted, setMounted] = useState(false);

  // Get resolved theme (system -> actual theme)
  const getResolvedTheme = useCallback((currentTheme: Theme): "dark" | "light" => {
    if (currentTheme === "system") {
      if (typeof window === "undefined") {
        return "light";
      }
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return currentTheme;
  }, []);

  const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">(() =>
    getResolvedTheme(theme)
  );

  // Handle mounting (prevent hydration mismatch)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;
    const resolved = getResolvedTheme(theme);

    // Remove all theme classes
    themes.forEach((t) => {
      if (attribute === "class") {
        root.classList.remove(t);
      } else {
        root.removeAttribute(`${attribute}-${t}`);
      }
    });

    // Apply transition handling
    if (disableTransitionOnChange) {
      const css = document.createElement("style");
      const transitionStyles = "*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}";
      css.appendChild(document.createTextNode(transitionStyles));
      document.head.appendChild(css);

      // Force reflow
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      root.offsetHeight;

      // Remove the style after a frame
      requestAnimationFrame(() => {
        document.head.removeChild(css);
      });
    }

    // Apply the theme
    if (attribute === "class") {
      root.classList.add(resolved);
    } else {
      root.setAttribute(`${attribute}-${resolved}`, "");
    }

    setResolvedTheme(resolved);
  }, [theme, mounted, attribute, themes, disableTransitionOnChange, getResolvedTheme]);

  // Listen to system theme changes when theme is "system"
  useEffect(() => {
    if (!mounted || theme !== "system" || !enableSystem) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const resolved = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      setResolvedTheme(resolved);

      const root = window.document.documentElement;
      themes.forEach((t) => {
        if (attribute === "class") {
          root.classList.remove(t);
        } else {
          root.removeAttribute(`${attribute}-${t}`);
        }
      });

      if (attribute === "class") {
        root.classList.add(resolved);
      } else {
        root.setAttribute(`${attribute}-${resolved}`, "");
      }
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
    // Fallback for older browsers
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mediaQuery.addListener(handleChange);
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (mediaQuery as any).removeListener(handleChange);
    };
  }, [theme, mounted, enableSystem, attribute, themes]);

  const setTheme = (newTheme: Theme) => {
    // Validate theme if themes array is provided
    if (themes.length > 0 && !themes.includes(newTheme) && newTheme !== "system") {
      console.warn(`Theme "${newTheme}" is not in the allowed themes list.`);
      return;
    }

    // If system is disabled, don't allow "system" theme
    if (!enableSystem && newTheme === "system") {
      console.warn("System theme is disabled. Use 'light' or 'dark' instead.");
      return;
    }

    setThemeState(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem(storageKey, newTheme);
    }
  };

  const value: ThemeProviderState = {
    theme,
    setTheme,
    resolvedTheme,
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      <div suppressHydrationWarning>{children}</div>
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
