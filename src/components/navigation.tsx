import { Button } from "@/components/ui/aura/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/aura/sheet";
import { cn } from "@/lib/utils";
import { IconBrandGithub, IconMenu2, IconMoon, IconSun } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import * as React from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { href: "/primitives", label: "Primitives" },
  { href: "/ai", label: "AI" },
  { href: "/patterns", label: "Patterns" },
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
    { name: "light", icon: IconSun, label: "Light" },
    { name: "dark", icon: IconMoon, label: "Dark" },
  ];

  return (
    <div className="flex items-center bg-muted rounded-lg p-1">
      {themes.map((themeOption) => (
        <Button
          key={themeOption.name}
          size="sm"
          variant={theme === themeOption.name ? "default" : "ghost"}
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

  // Get base path for assets (handles GitHub Pages subdirectory)
  const logoPath = `${import.meta.env.BASE_URL}aura-logo.png`;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-3 w-full max-w-none">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-3">
            <img src={logoPath} alt="Aura" width={32} height={32} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              // Check if current pathname starts with the nav item href (for sub-routes)
              const isActive = pathname.startsWith(item.href) && pathname !== "/";

              return (
                <Link key={item.href} to={item.href} className="relative">
                  <span
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      isActive ? "text-primary" : "text-muted-foreground"
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
                        type: "spring",
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
                <IconMenu2 className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => {
                  const isActive = pathname.startsWith(item.href) && pathname !== "/";

                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={cn(
                        "text-lg font-medium transition-colors hover:text-primary",
                        isActive ? "text-primary" : "text-muted-foreground"
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
