import { Badge } from "@/components/ui/aura/badge";
import { Button } from "@/components/ui/aura/button";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { IconArrowRight, IconCode, IconPalette, IconSparkles, IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import type React from "react";
import { type RefObject, useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";

interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  badge: string;
  ctaText: string;
  ctaLink: string;
  content: () => React.ReactNode;
}

const featureCards: FeatureCard[] = [
  {
    id: "theming",
    title: "Aurora lime theming",
    description: "Dynamic color system with intelligent light/dark mode switching",
    icon: <IconPalette className="h-6 w-6 text-primary drop-shadow-sm" />,
    badge: "18 color palettes",
    ctaText: "Explore colors",
    ctaLink: "/primitives/colors",
    content: () => (
      <div className="space-y-4">
        <p className="text-foreground/80 leading-relaxed">
          The Aurora lime color system is the foundation of our design language. Built with
          intelligent theming capabilities, it automatically adapts to light, dark, and
          high-contrast modes while maintaining perfect accessibility standards.
        </p>
        <div className="space-y-3">
          <h4 className="font-semibold text-foreground/90">Key Features:</h4>
          <ul className="space-y-2 text-sm text-foreground/70">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              Dynamic light/dark mode switching
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              18 carefully crafted color palettes
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              WCAG 2.1 AA accessibility compliance
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              CSS custom properties for easy customization
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              Semantic color mappings for consistent usage
            </li>
          </ul>
        </div>
        <div className="grid grid-cols-4 gap-2 mt-6">
          {["Aurora lime", "Glacier mist", "Mountain fjord", "Midnight"].map((color, i) => (
            <div key={color} className="text-center">
              <div
                className={`w-full h-8 rounded mb-1 ${
                  i === 0
                    ? "bg-primary"
                    : i === 1
                      ? "bg-blue-500"
                      : i === 2
                        ? "bg-slate-500"
                        : "bg-zinc-800"
                }`}
              />
              <span className="text-xs text-foreground/60">{color}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "components",
    title: "ShadCN components",
    description: "Production-ready components built on Base UI primitives",
    icon: <IconCode className="h-6 w-6 text-primary drop-shadow-sm" />,
    badge: "25+ components",
    ctaText: "View components",
    ctaLink: "/primitives/button",
    content: () => (
      <div className="space-y-4">
        <p className="text-foreground/80 leading-relaxed">
          Our component library is built on the solid foundation of ShadCN and Base UI, providing
          accessible, composable, and customizable components that scale with your project.
        </p>
        <div className="space-y-3">
          <h4 className="font-semibold text-foreground/90">Component Categories:</h4>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="space-y-2">
              <h5 className="font-medium text-foreground/80">Interactive</h5>
              <ul className="space-y-1 text-foreground/70">
                <li>• Buttons & Forms</li>
                <li>• Dialogs & Modals</li>
                <li>• Navigation</li>
                <li>• Data Tables</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h5 className="font-medium text-foreground/80">Display</h5>
              <ul className="space-y-1 text-foreground/70">
                <li>• Cards & Layouts</li>
                <li>• Typography</li>
                <li>• Charts & Graphs</li>
                <li>• Status Indicators</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-muted/30 rounded-lg p-4 mt-6">
          <h5 className="font-medium text-foreground/90 mb-2">Built with Modern Standards</h5>
          <div className="flex flex-wrap gap-2">
            {["TypeScript", "Base UI", "Tailwind CSS", "Framer Motion", "React 19"].map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "sandbox",
    title: "AI-powered sandbox",
    description: "Generate custom components with AI assistance using your design system",
    icon: <IconSparkles className="h-6 w-6 text-primary drop-shadow-sm" />,
    badge: "Gemini powered",
    ctaText: "Try sandbox",
    ctaLink: "/sandbox",
    content: () => (
      <div className="space-y-4">
        <p className="text-foreground/80 leading-relaxed">
          Our AI-powered sandbox leverages Google&apos;s Gemini AI to help you build custom
          components using your existing design system. Simply describe what you need, and watch as
          AI generates production-ready code.
        </p>
        <div className="space-y-3">
          <h4 className="font-semibold text-foreground/90">Sandbox Features:</h4>
          <ul className="space-y-2 text-sm text-foreground/70">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              Natural language component generation
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              Real-time preview with live code editing
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              Automatic design system integration
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              Export to React, Vue, or vanilla HTML
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              Built-in accessibility and responsive design
            </li>
          </ul>
        </div>
        <div className="bg-linear-to-r from-primary/10 to-primary/5 rounded-lg p-4 mt-6">
          <h5 className="font-medium text-foreground/90 mb-2">Try These Examples</h5>
          <div className="space-y-2 text-sm text-foreground/70">
            <p>&quot;Create a pricing card with three tiers&quot;</p>
            <p>&quot;Build a dashboard header with navigation&quot;</p>
            <p>&quot;Generate a contact form with validation&quot;</p>
          </div>
        </div>
      </div>
    ),
  },
];

export function ExpandableFeatureCards() {
  const [active, setActive] = useState<FeatureCard | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref as RefObject<HTMLElement>, () => setActive(null));

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm h-full w-full z-50"
          />
        )}
      </AnimatePresence>

      {/* Expanded Card Modal */}
      <AnimatePresence>
        {active ? (
          <div className="fixed inset-0 grid place-items-center z-100 p-4">
            <motion.button
              key={`button-${active.id}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-4 right-4 items-center justify-center bg-background border rounded-full h-8 w-8 shadow-lg hover:bg-muted transition-colors"
              onClick={() => setActive(null)}
            >
              <IconX className="h-4 w-4" />
            </motion.button>

            <motion.div
              layoutId={`card-${active.id}-${id}`}
              ref={ref}
              className="w-full max-w-[600px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-background border rounded-lg shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="relative overflow-hidden bg-linear-to-br from-primary/10 via-primary/5 to-transparent">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <motion.div
                      layoutId={`icon-${active.id}-${id}`}
                      className="w-12 h-12 rounded-lg bg-primary/20 backdrop-blur-sm border border-white/20 flex items-center justify-center shrink-0"
                      style={{ borderRadius: "4px" }}
                    >
                      {active.icon}
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <motion.h3
                        layoutId={`title-${active.id}-${id}`}
                        className="text-2xl font-semibold text-foreground/90 mb-2"
                      >
                        {active.title}
                      </motion.h3>
                      <motion.p
                        layoutId={`description-${active.id}-${id}`}
                        className="text-foreground/70 mb-4"
                      >
                        {active.description}
                      </motion.p>
                      <motion.div layoutId={`badge-${active.id}-${id}`}>
                        <Badge
                          variant="secondary"
                          className="bg-white/20 border-white/20 text-foreground/80 backdrop-blur-sm"
                        >
                          {active.badge}
                        </Badge>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-auto">
                <div className="p-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: 0.1 }}
                  >
                    {active.content()}
                  </motion.div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t bg-muted/30">
                <motion.div layoutId={`cta-${active.id}-${id}`}>
                  <Button
                    className="w-full"
                    render={
                      <Link to={active.ctaLink} className="flex items-center justify-center gap-2">
                        {active.ctaText}
                        <IconArrowRight className="h-4 w-4" />
                      </Link>
                    }
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      {/* Card Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {featureCards.map((card) => (
          <motion.div
            layoutId={`card-${card.id}-${id}`}
            key={`card-${card.id}-${id}`}
            onClick={() => setActive(card)}
            className="relative border border-white/20 hover:border-primary/40 transition-all duration-300 overflow-hidden backdrop-blur-xl bg-white/10 dark:bg-black/10 shadow-2xl hover:shadow-primary/20 rounded-sm cursor-pointer group"
          >
            <div className="p-6">
              <motion.div
                layoutId={`icon-${card.id}-${id}`}
                className="w-12 h-12 rounded bg-primary/20 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-4"
                style={{ borderRadius: "4px" }}
              >
                {card.icon}
              </motion.div>

              <motion.h3
                layoutId={`title-${card.id}-${id}`}
                className="text-foreground/90 font-semibold text-xl mb-2"
              >
                {card.title}
              </motion.h3>

              <motion.p
                layoutId={`description-${card.id}-${id}`}
                className="text-foreground/70 text-sm mb-4"
              >
                {card.description}
              </motion.p>

              <motion.div layoutId={`badge-${card.id}-${id}`}>
                <Badge
                  variant="secondary"
                  className="bg-white/20 border-white/20 text-foreground/80 backdrop-blur-sm"
                >
                  {card.badge}
                </Badge>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
