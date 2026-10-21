import { IconMenu2, IconX } from '@tabler/icons-react';
import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';

import auraLogo from '@/assets/aura-logo.svg';
import { GitHubStats } from '@/components/github-stats';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { cn } from '@/lib/utils';

const NAV_ITEMS: { label: string; href: string; hidden?: boolean }[] = [
  { label: 'Home', href: '/' },
  { label: "What's new", href: '/whats-new' },
  { label: 'Docs', href: '/aura/documentation/about-aura' },
  { label: 'Components', href: '/aura' },
  { label: 'Charts', href: '/charts' },
  { label: 'Patterns', href: '/patterns', hidden: true },
  { label: 'Community', href: '/community' },
];

export function MainNav() {
  const [open, setOpen] = React.useState(false);
  const { pathname } = useLocation();

  function isActive(href: string) {
    if (href === '/') return pathname === '/';
    if (href === '/aura/documentation/about-aura') {
      return pathname.startsWith('/aura/documentation');
    }
    if (href === '/aura') {
      return (
        pathname === '/aura' ||
        (pathname.startsWith('/aura/') &&
          !pathname.startsWith('/aura/documentation'))
      );
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="border-b border-white/10 bg-marketing-canvas font-heading">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-3">
        <Link
          to="/"
          aria-label="Aura design system home"
          className="flex shrink-0 items-center"
        >
          <img src={auraLogo} alt="" className="h-5 w-auto" />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.filter((item) => !item.hidden).map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className={cn(
                  'rounded-lg px-3 py-1.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white',
                  isActive(item.href) && 'bg-white/10 text-white'
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-1">
          <ThemeSwitcher />
          <GitHubStats />

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
          >
            {open ? <IconX size={18} /> : <IconMenu2 size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <ul className="flex flex-col gap-0.5 border-t border-white/10 px-4 pt-2 pb-2.5 lg:hidden">
          {NAV_ITEMS.filter((item) => !item.hidden).map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'block rounded-lg px-3 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white',
                  isActive(item.href) && 'bg-white/10 text-white'
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
