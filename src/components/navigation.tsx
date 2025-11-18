'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { cn } from '#common/utils';
import { Button } from '#aura/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '#aura/sheet';
import { Menu, Sun, Moon, Contrast } from 'lucide-react';
import Image from 'next/image';
import auraLogo from '/aura-logo.png';
import { IconBrandGithub } from '@tabler/icons-react';

const navItems = [
  { href: '/primitives', label: 'Primitives' },
  { href: '/ai', label: 'AI' },
  { href: '/blocks', label: 'Blocks' },
  { href: '/eos', label: 'Templates' },
];

function ThemeToggleGroup() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const themes = [
    { name: 'light', icon: Sun, label: 'Light' },
    { name: 'dark', icon: Moon, label: 'Dark' },
    { name: 'contrast', icon: Contrast, label: 'High contrast' },
  ];

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
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-3 w-full max-w-none">
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-3">
            <Image src={auraLogo} alt="Aura" width={32} height={32} priority />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              // Check if current pathname starts with the nav item href (for sub-routes)
              const isActive =
                pathname.startsWith(item.href) && pathname !== '/';

              return (
                <Link key={item.href} href={item.href} className="relative">
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
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" asChild className="h-10 w-10">
            <a
              href="https://github.com/cognitedata/aura"
              target="_blank"
              rel="noopener noreferrer"
              title="View on GitHub"
            >
              <IconBrandGithub className="h-5 w-5" />
              <span className="sr-only">GitHub repository</span>
            </a>
          </Button>
          <ThemeToggleGroup />

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => {
                  const isActive =
                    pathname.startsWith(item.href) && pathname !== '/';

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'text-lg font-medium transition-colors hover:text-primary',
                        isActive ? 'text-primary' : 'text-muted-foreground'
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <div className="pt-4 border-t">
                  <div className="text-sm font-medium mb-2">Theme</div>
                  <ThemeToggleGroup />
                </div>
                <div className="pt-4 border-t">
                  <Button variant="outline" className="w-full" asChild>
                    <a
                      href="https://github.com/cognitedata/aura"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IconBrandGithub className="h-4 w-4 mr-2" />
                      View on GitHub
                    </a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
