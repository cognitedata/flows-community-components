import * as React from "react";
import { useLocation } from "react-router-dom";
import { cn, slugify } from "@/lib/utils";

interface TocHeading {
  id: string;
  text: string;
  level: 1 | 2;
}

export function TableOfContents({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLElement | null>;
}) {
  const { pathname } = useLocation();
  const [headings, setHeadings] = React.useState<TocHeading[]>([]);
  const [activeId, setActiveId] = React.useState<string>("");

  React.useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const els = Array.from(root.querySelectorAll<HTMLHeadingElement>("h1, h2")).filter(
      (el) => !el.closest("aside, nav")
    );
    const usedIds = new Set<string>();
    for (const el of els) {
      if (!el.id) {
        const base = slugify(el.textContent ?? "");
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
        text: el.textContent ?? "",
        level: el.tagName === "H1" ? 1 : 2,
      }))
    );

    const updateActive = () => {
      const scanLine = 112; // matches the sticky nav offset headings scroll under
      let current = els[0]?.id ?? "";
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
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [containerRef, pathname]);

  if (headings.length < 2) return null;

  return (
    <nav
      aria-label="On this page"
      className="sticky top-24 hidden h-fit w-56 shrink-0 flex-col gap-2 xl:flex"
    >
      <h2 className="mb-2 px-2 text-xs font-medium tracking-wide text-medium-fg uppercase">
        On this page
      </h2>
      <ul className="flex flex-col gap-0.5 border-l border-border">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={cn(
                "-ml-px block border-l-2 py-1 text-sm transition-colors",
                heading.level === 2 ? "pl-5" : "pl-3 font-medium",
                activeId === heading.id
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-fg hover:text-foreground"
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
