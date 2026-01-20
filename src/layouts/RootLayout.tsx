import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { TopbarVisibility } from "@/components/TopbarVisibility";
import { Toaster } from "@/components/ui/aura/sonner-toast";

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
      themes={["light", "dark"]}
    >
      <div className="relative flex min-h-screen flex-col">
        <TopbarVisibility>
          <Navigation />
        </TopbarVisibility>
        <main className="flex-1">{children}</main>
        <Toaster richColors />
      </div>
    </ThemeProvider>
  );
}
