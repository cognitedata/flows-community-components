import type { Metadata } from 'next';
import { Inter, Source_Code_Pro } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Navigation } from '@/components/navigation';
import { TopbarVisibility } from '@/components/TopbarVisibility';
import { Toaster } from '@/components/ui/cognite/sonner-toast';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const sourceCodePro = Source_Code_Pro({
  variable: '--font-source-code-pro',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Aura Design System',
  description:
    'Interactive brand guidelines and design system documentation for Aura UI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${sourceCodePro.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
          themes={['light', 'dark', 'contrast']}
        >
          <div className="relative flex min-h-screen flex-col">
            <TopbarVisibility>
              <Navigation />
            </TopbarVisibility>
            <main className="flex-1">{children}</main>
            <Toaster richColors />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
