import { Outlet } from "react-router-dom";
import { MainNav } from "@/components/main-nav";
import { SharedThemeFromUrlProvider } from "@/components/shared-theme-from-url";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeOverridesProvider } from "@/lib/theme-overrides-context";

export function RootLayout() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      {/* SharedTheme style must come after ThemeOverrides so hash tokens win the cascade. */}
      <ThemeOverridesProvider>
        <SharedThemeFromUrlProvider>
          <div className="min-h-full">
            <MainNav />
            <Outlet />
          </div>
        </SharedThemeFromUrlProvider>
      </ThemeOverridesProvider>
    </ThemeProvider>
  );
}
