import { Toaster } from '@cognite/aura/components';

import { Navigation } from '@/components/navigation';
import { ThemeProvider } from '@/components/theme-provider';

interface RootLayoutProps {
  children: React.ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
      themes={['light', 'dark']}
    >
      <div className="relative flex min-h-screen flex-col">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Toaster richColors />
      </div>
    </ThemeProvider>
  );
}
