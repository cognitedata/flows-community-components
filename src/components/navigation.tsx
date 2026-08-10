import { Button } from '@cognite/aura/components';
import {
  IconBrandGithub,
  IconExternalLink,
  IconMenu2,
  IconMoon,
  IconSun,
  IconX,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import auraLogo from '@/assets/aura-logo.png';
import { useTheme } from '@/components/theme-provider';
import { cn } from '@/lib/utils';

const coreDocsUrl = 'https://docs.cognite.com/aura-design-system';

const navItems = [{ href: '/community', label: 'Community' }] as const;

function ThemeToggleGroup() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const themes = [
    { name: 'light', icon: IconSun, label: 'Light' },
    { name: 'dark', icon: IconMoon, label: 'Dark' },
  ] as const;

  return (
    <div className="flex items-center bg-muted rounded-lg p-1">
      {themes.map((themeOption) => (
        <Button
          key={themeOption.name}
          size="sm"
          variant={theme === themeOption.name ? 'default' : 'ghost'}
          onClick={() => setTheme(themeOption.name)}
          className="h-8 w-8 p-0"
          title={themeOption.label}
        >
          <themeOption.icon className="h-4 w-4" />
        </Button>
      ))}
    </div>
  );
}

export function Navigation() {
  const location = useLocation();
  const pathname = location.pathname;
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-3 w-full max-w-none">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-3">
            <img src={auraLogo} alt="Flows Community" width={32} height={32} />
            <span className="hidden sm:flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-tight">
                Flows Community
              </span>
              <span className="text-xs text-muted-foreground">
                Powered by Aura
              </span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const isActive =
                pathname.startsWith(item.href) && pathname !== '/';

              return (
                <Link key={item.href} to={item.href} className="relative">
                  <span
                    className={cn(
                      'text-sm font-medium transition-colors hover:text-primary',
                      isActive ? 'text-primary' : 'text-muted-foreground'
                    )}
                  >
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                      layoutId="activeTab"
                      initial={false}
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
            <a
              href={coreDocsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Aura docs
              <IconExternalLink className="h-3.5 w-3.5" />
            </a>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10"
            nativeButton={false}
            render={
              <a
                href="https://github.com/cognitedata/flows-community-components"
                target="_blank"
                rel="noopener noreferrer"
                title="View on GitHub"
              >
                <IconBrandGithub className="h-5 w-5" />
                <span className="sr-only">GitHub repository</span>
              </a>
            }
          />
          <ThemeToggleGroup />

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            {mobileOpen ? (
              <IconX className="h-5 w-5" />
            ) : (
              <IconMenu2 className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-nav"
          className="border-t bg-background px-4 py-6 md:hidden"
        >
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => {
              const isActive =
                pathname.startsWith(item.href) && pathname !== '/';

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'text-lg font-medium transition-colors hover:text-primary',
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <a
              href={coreDocsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Aura docs
              <IconExternalLink className="h-4 w-4" />
            </a>
            <div className="pt-4 border-t">
              <div className="text-sm font-medium mb-2">Theme</div>
              <ThemeToggleGroup />
            </div>
            <div className="pt-4 border-t">
              <Button
                variant="outline"
                className="w-full"
                render={
                  <a
                    href="https://github.com/cognitedata/flows-community-components"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconBrandGithub className="h-4 w-4 mr-2" />
                    View on GitHub
                  </a>
                }
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
