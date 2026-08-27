import { Outlet } from 'react-router-dom';

import { MainNav } from '@/components/main-nav';
import { SharedThemeFromUrlProvider } from '@/components/shared-theme-from-url';
import { ThemeProvider } from '@/components/theme-provider';
import {
  ThemeSidebarInset,
  ThemeSwitcherProvider,
} from '@/components/theme-switcher';
import { ThemeOverridesProvider } from '@/lib/theme-overrides-context';

export function RootLayout() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <ThemeOverridesProvider>
        <SharedThemeFromUrlProvider>
          <ThemeSwitcherProvider>
            <ThemeSidebarInset>
              <MainNav />
              <Outlet />
            </ThemeSidebarInset>
          </ThemeSwitcherProvider>
        </SharedThemeFromUrlProvider>
      </ThemeOverridesProvider>
    </ThemeProvider>
  );
}
