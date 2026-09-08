'use client';

import { IconPalette, IconX } from '@tabler/icons-react';
import * as React from 'react';
import { createPortal } from 'react-dom';

import { ThemePanel } from '@/components/get-started/theme-panel';
import { cn } from '@/lib/utils';

interface ThemeSwitcherContextValue {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const ThemeSwitcherContext =
  React.createContext<ThemeSwitcherContextValue | null>(null);

const THEME_SIDEBAR_ID = 'theme-configuration-panel';
const THEME_PANEL_WIDTH = 'w-96';
const THEME_PANEL_PAD = 'lg:pr-96';

function useThemeSwitcher() {
  const ctx = React.useContext(ThemeSwitcherContext);
  if (!ctx) {
    throw new Error(
      'useThemeSwitcher must be used within a ThemeSwitcherProvider'
    );
  }
  return ctx;
}

function ThemeSidebar() {
  const { open, setOpen, triggerRef } = useThemeSwitcher();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, setOpen, triggerRef]);

  if (!mounted) return null;

  return createPortal(
    <aside
      id={THEME_SIDEBAR_ID}
      aria-label="Theme configuration"
      aria-hidden={!open}
      inert={!open}
      className={cn(
        'fixed top-chrome right-0 bottom-0 z-40 flex max-w-full flex-col border-l border-border bg-background p-4 shadow-xl transition-transform duration-300 ease-in-out',
        THEME_PANEL_WIDTH,
        open ? 'translate-x-0' : 'pointer-events-none translate-x-full'
      )}
    >
      <ThemePanel
        headerAction={
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              triggerRef.current?.focus();
            }}
            aria-label="Close theme configuration"
            className="flex h-7 w-7 items-center justify-center rounded-md text-muted-fg transition-colors hover:bg-medium-bg hover:text-foreground"
          >
            <IconX size={16} />
          </button>
        }
      />
    </aside>,
    document.body
  );
}

export function ThemeSwitcherProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const value = React.useMemo(() => ({ open, setOpen, triggerRef }), [open]);

  return (
    <ThemeSwitcherContext.Provider value={value}>
      {children}
      <ThemeSidebar />
    </ThemeSwitcherContext.Provider>
  );
}

export function ThemeSidebarInset({ children }: { children: React.ReactNode }) {
  const { open } = useThemeSwitcher();

  return (
    <div
      className={cn(
        'min-h-full bg-background text-foreground transition-[padding-right] duration-300 ease-in-out',
        open && THEME_PANEL_PAD
      )}
    >
      {children}
    </div>
  );
}

export function ThemeSwitcher() {
  const { open, setOpen, triggerRef } = useThemeSwitcher();

  return (
    <button
      ref={triggerRef}
      type="button"
      aria-expanded={open}
      aria-controls={THEME_SIDEBAR_ID}
      aria-label={
        open ? 'Close theme configuration' : 'Open theme configuration'
      }
      onClick={() => setOpen((value) => !value)}
      className={cn(
        'flex h-8 shrink-0 items-center gap-1.5 rounded-lg px-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white',
        open && 'bg-white/10 text-white'
      )}
    >
      <IconPalette size={16} />
      <span className="hidden text-sm font-medium sm:inline">Theme</span>
    </button>
  );
}
