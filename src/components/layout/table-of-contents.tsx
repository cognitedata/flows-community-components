import * as React from 'react';
import { useLocation } from 'react-router-dom';

import { cn, slugify } from '@/lib/utils';

interface TocHeading {
  id: string;
  text: string;
}

export function TableOfContents({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLElement | null>;
}) {
  const { pathname } = useLocation();
  const [headings, setHeadings] = React.useState<TocHeading[]>([]);
  const [activeId, setActiveId] = React.useState<string>('');

  React.useLayoutEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const els = Array.from(
      root.querySelectorAll<HTMLHeadingElement>('h2')
    ).filter((el) => !el.closest('aside, nav'));
    const usedIds = new Set<string>();
    for (const el of els) {
      if (!el.id) {
        const base = slugify(el.textContent ?? '');
        let id = base;
        let suffix = 2;
        while (usedIds.has(id)) {
          id = `${base}-${suffix++}`;
        }
        el.id = id;
      }
      usedIds.add(el.id);
    }
    setHeadings(
      els.map((el) => ({
        id: el.id,
        text: el.textContent ?? '',
      }))
    );

    const updateActive = () => {
      const scanLine = 144;
      let current = els[0]?.id ?? '';
      for (const el of els) {
        if (el.getBoundingClientRect().top <= scanLine) {
          current = el.id;
        } else {
          break;
        }
      }
      setActiveId(current);
    };

    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('resize', updateActive);
    return () => {
      window.removeEventListener('scroll', updateActive);
      window.removeEventListener('resize', updateActive);
    };
  }, [containerRef, pathname]);

  if (headings.length < 1) return null;

  return (
    <nav
      aria-label="On this page"
      className="sticky top-chrome-pad hidden h-fit w-56 shrink-0 flex-col gap-2 lg:flex"
    >
      <p className="mb-2 px-2 text-xs font-medium tracking-wide text-medium-fg uppercase">
        On this page
      </p>
      <ul className="flex flex-col gap-0.5 border-l border-border">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={cn(
                '-ml-px block border-l-2 py-1 pl-3 text-sm font-medium transition-colors',
                activeId === heading.id
                  ? 'border-foreground text-foreground'
                  : 'border-transparent text-muted-fg hover:text-foreground'
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
