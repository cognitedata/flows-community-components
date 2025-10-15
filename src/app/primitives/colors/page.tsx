"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/cognite/card";
import { Badge } from "@/components/ui/cognite/badge";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

// Color definitions using CSS variable names (values pulled from globals.css)
// Groups and order follow globals.css:
// Base: Mountain, Fjord; Decorative: Nordic, Aurora, Dusk;
// Semantic: Red, Amber, Green, Blue; Extended decorative: Sky, Orange, Yellow, Gray
const colorPalettes = [
  // Base colors
  {
    name: "Mountain",
    description: "Neutral base ramp",
    category: "base",
    colors: [
      { name: "50", var: "--mountain-50" },
      { name: "100", var: "--mountain-100" },
      { name: "200", var: "--mountain-200" },
      { name: "300", var: "--mountain-300" },
      { name: "400", var: "--mountain-400" },
      { name: "450", var: "--mountain-450" },
      { name: "500", var: "--mountain-500" },
      { name: "550", var: "--mountain-550" },
      { name: "600", var: "--mountain-600" },
      { name: "650", var: "--mountain-650" },
      { name: "700", var: "--mountain-700" },
      { name: "800", var: "--mountain-800" },
      { name: "900", var: "--mountain-900" },
      { name: "950", var: "--mountain-950" },
    ],
  },
  {
    name: "Fjord",
    description: "Cool base ramp",
    category: "base",
    colors: [
      { name: "50", var: "--fjord-50" },
      { name: "100", var: "--fjord-100" },
      { name: "200", var: "--fjord-200" },
      { name: "300", var: "--fjord-300" },
      { name: "400", var: "--fjord-400" },
      { name: "450", var: "--fjord-450" },
      { name: "500", var: "--fjord-500" },
      { name: "550", var: "--fjord-550" },
      { name: "600", var: "--fjord-600" },
      { name: "650", var: "--fjord-650" },
      { name: "700", var: "--fjord-700" },
      { name: "800", var: "--fjord-800" },
      { name: "900", var: "--fjord-900" },
      { name: "950", var: "--fjord-950" },
    ],
  },

  // Decorative colors
  {
    name: "Nordic",
    description: "Cool green decorative ramp",
    category: "decorative",
    colors: [
      { name: "50", var: "--nordic-50" },
      { name: "100", var: "--nordic-100" },
      { name: "200", var: "--nordic-200" },
      { name: "300", var: "--nordic-300" },
      { name: "400", var: "--nordic-400" },
      { name: "450", var: "--nordic-450" },
      { name: "500", var: "--nordic-500" },
      { name: "550", var: "--nordic-550" },
      { name: "600", var: "--nordic-600" },
      { name: "650", var: "--nordic-650" },
      { name: "700", var: "--nordic-700" },
      { name: "800", var: "--nordic-800" },
      { name: "900", var: "--nordic-900" },
      { name: "950", var: "--nordic-950" },
    ],
  },
  {
    name: "Aurora",
    description: "Lime green decorative ramp",
    category: "decorative",
    colors: [
      { name: "50", var: "--aurora-50" },
      { name: "100", var: "--aurora-100" },
      { name: "200", var: "--aurora-200" },
      { name: "300", var: "--aurora-300" },
      { name: "400", var: "--aurora-400" },
      { name: "450", var: "--aurora-450" },
      { name: "500", var: "--aurora-500" },
      { name: "550", var: "--aurora-550" },
      { name: "600", var: "--aurora-600" },
      { name: "650", var: "--aurora-650" },
      { name: "700", var: "--aurora-700" },
      { name: "800", var: "--aurora-800" },
      { name: "900", var: "--aurora-900" },
      { name: "950", var: "--aurora-950" },
    ],
  },
  {
    name: "Dusk",
    description: "Magenta decorative ramp",
    category: "decorative",
    colors: [
      { name: "50", var: "--dusk-50" },
      { name: "100", var: "--dusk-100" },
      { name: "200", var: "--dusk-200" },
      { name: "300", var: "--dusk-300" },
      { name: "400", var: "--dusk-400" },
      { name: "450", var: "--dusk-450" },
      { name: "500", var: "--dusk-500" },
      { name: "550", var: "--dusk-550" },
      { name: "600", var: "--dusk-600" },
      { name: "650", var: "--dusk-650" },
      { name: "700", var: "--dusk-700" },
      { name: "800", var: "--dusk-800" },
      { name: "900", var: "--dusk-900" },
      { name: "950", var: "--dusk-950" },
    ],
  },

  // Semantic colors
  {
    name: "Red",
    description: "Semantic red",
    category: "semantic",
    colors: [
      { name: "50", var: "--red-50" },
      { name: "100", var: "--red-100" },
      { name: "200", var: "--red-200" },
      { name: "300", var: "--red-300" },
      { name: "400", var: "--red-400" },
      { name: "450", var: "--red-450" },
      { name: "500", var: "--red-500" },
      { name: "550", var: "--red-550" },
      { name: "600", var: "--red-600" },
      { name: "650", var: "--red-650" },
      { name: "700", var: "--red-700" },
      { name: "800", var: "--red-800" },
      { name: "900", var: "--red-900" },
      { name: "950", var: "--red-950" },
    ],
  },
  {
    name: "Amber",
    description: "Semantic amber",
    category: "semantic",
    colors: [
      { name: "50", var: "--amber-50" },
      { name: "100", var: "--amber-100" },
      { name: "200", var: "--amber-200" },
      { name: "300", var: "--amber-300" },
      { name: "400", var: "--amber-400" },
      { name: "450", var: "--amber-450" },
      { name: "500", var: "--amber-500" },
      { name: "550", var: "--amber-550" },
      { name: "600", var: "--amber-600" },
      { name: "650", var: "--amber-650" },
      { name: "700", var: "--amber-700" },
      { name: "800", var: "--amber-800" },
      { name: "900", var: "--amber-900" },
      { name: "950", var: "--amber-950" },
    ],
  },
  {
    name: "Green",
    description: "Semantic green",
    category: "semantic",
    colors: [
      { name: "50", var: "--green-50" },
      { name: "100", var: "--green-100" },
      { name: "200", var: "--green-200" },
      { name: "300", var: "--green-300" },
      { name: "400", var: "--green-400" },
      { name: "450", var: "--green-450" },
      { name: "500", var: "--green-500" },
      { name: "550", var: "--green-550" },
      { name: "600", var: "--green-600" },
      { name: "650", var: "--green-650" },
      { name: "700", var: "--green-700" },
      { name: "800", var: "--green-800" },
      { name: "900", var: "--green-900" },
      { name: "950", var: "--green-950" },
    ],
  },
  {
    name: "Blue",
    description: "Semantic blue",
    category: "semantic",
    colors: [
      { name: "50", var: "--blue-50" },
      { name: "100", var: "--blue-100" },
      { name: "200", var: "--blue-200" },
      { name: "300", var: "--blue-300" },
      { name: "400", var: "--blue-400" },
      { name: "450", var: "--blue-450" },
      { name: "500", var: "--blue-500" },
      { name: "550", var: "--blue-550" },
      { name: "600", var: "--blue-600" },
      { name: "650", var: "--blue-650" },
      { name: "700", var: "--blue-700" },
      { name: "800", var: "--blue-800" },
      { name: "900", var: "--blue-900" },
      { name: "950", var: "--blue-950" },
    ],
  },

  // Extended decorative colors
  {
    name: "Sky",
    description: "Sky blue extended",
    category: "extended",
    colors: [
      { name: "50", var: "--sky-50" },
      { name: "100", var: "--sky-100" },
      { name: "200", var: "--sky-200" },
      { name: "300", var: "--sky-300" },
      { name: "400", var: "--sky-400" },
      { name: "450", var: "--sky-450" },
      { name: "500", var: "--sky-500" },
      { name: "550", var: "--sky-550" },
      { name: "600", var: "--sky-600" },
      { name: "650", var: "--sky-650" },
      { name: "700", var: "--sky-700" },
      { name: "800", var: "--sky-800" },
      { name: "900", var: "--sky-900" },
      { name: "950", var: "--sky-950" },
    ],
  },
  {
    name: "Orange",
    description: "Orange extended",
    category: "extended",
    colors: [
      { name: "50", var: "--orange-50" },
      { name: "100", var: "--orange-100" },
      { name: "200", var: "--orange-200" },
      { name: "300", var: "--orange-300" },
      { name: "400", var: "--orange-400" },
      { name: "450", var: "--orange-450" },
      { name: "500", var: "--orange-500" },
      { name: "550", var: "--orange-550" },
      { name: "600", var: "--orange-600" },
      { name: "650", var: "--orange-650" },
      { name: "700", var: "--orange-700" },
      { name: "800", var: "--orange-800" },
      { name: "900", var: "--orange-900" },
      { name: "950", var: "--orange-950" },
    ],
  },
  {
    name: "Yellow",
    description: "Yellow extended",
    category: "extended",
    colors: [
      { name: "50", var: "--yellow-50" },
      { name: "100", var: "--yellow-100" },
      { name: "200", var: "--yellow-200" },
      { name: "300", var: "--yellow-300" },
      { name: "400", var: "--yellow-400" },
      { name: "450", var: "--yellow-450" },
      { name: "500", var: "--yellow-500" },
      { name: "550", var: "--yellow-550" },
      { name: "600", var: "--yellow-600" },
      { name: "650", var: "--yellow-650" },
      { name: "700", var: "--yellow-700" },
      { name: "800", var: "--yellow-800" },
      { name: "900", var: "--yellow-900" },
      { name: "950", var: "--yellow-950" },
    ],
  },
  {
    name: "Gray",
    description: "Gray extended",
    category: "extended",
    colors: [
      { name: "50", var: "--gray-50" },
      { name: "100", var: "--gray-100" },
      { name: "200", var: "--gray-200" },
      { name: "300", var: "--gray-300" },
      { name: "400", var: "--gray-400" },
      { name: "450", var: "--gray-450" },
      { name: "500", var: "--gray-500" },
      { name: "550", var: "--gray-550" },
      { name: "600", var: "--gray-600" },
      { name: "650", var: "--gray-650" },
      { name: "700", var: "--gray-700" },
      { name: "800", var: "--gray-800" },
      { name: "900", var: "--gray-900" },
      { name: "950", var: "--gray-950" },
    ],
  },
];

// Helper function to copy text to clipboard
const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

// Color swatch component
function ColorSwatch({
  color,
  paletteName,
}: {
  color: { name: string; var: string };
  paletteName: string;
}) {
  const isDark = parseInt(color.name) >= 700;
  const swatchRef = useRef<HTMLDivElement | null>(null);
  const [hex, setHex] = useState<string>("");
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [tooltipPos, setTooltipPos] = useState<{ left: number; top: number } | null>(null);

  const rgbToHex = useMemo(
    () =>
      (rgb: string) => {
        // Accepts formats like rgb(r, g, b) or rgba(r, g, b, a)
        const match = rgb
          .replace(/\s+/g, "")
          .match(/^rgba?\((\d+),(\d+),(\d+)(?:,(\d*\.?\d+))?\)$/i);
        if (!match) return "";
        const r = Number(match[1]);
        const g = Number(match[2]);
        const b = Number(match[3]);
        const toHex = (n: number) => n.toString(16).padStart(2, "0");
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
      },
    []
  );

  useEffect(() => {
    if (!swatchRef.current) return;
    const bg = window.getComputedStyle(swatchRef.current).backgroundColor;
    setHex(rgbToHex(bg));
  }, [rgbToHex, color.var]);

  const handleCopyHex = () => {
    if (hex) copyToClipboard(hex);
  };

  const handleMouseEnter = () => {
    if (!swatchRef.current) return;
    const rect = swatchRef.current.getBoundingClientRect();
    setTooltipPos({ left: rect.left + rect.width / 2, top: Math.max(8, rect.top - 8) });
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div
      ref={swatchRef}
      className="relative group cursor-pointer rounded-lg overflow-hidden"
      style={{ backgroundColor: `var(${color.var})` }}
      onClick={handleCopyHex}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      title={hex ? `Click to copy ${hex}` : undefined}
    >
      <div className="aspect-square w-full min-h-[80px]" />

      {showTooltip && tooltipPos && createPortal(
        <div
          style={{ position: "fixed", left: tooltipPos.left, top: tooltipPos.top, zIndex: 9999, transform: "translateX(-50%) translateY(-100%)" }}
        >
          <div className="pointer-events-auto rounded-md border bg-popover text-popover-foreground shadow px-2 py-1 text-[10px] sm:text-xs flex items-center gap-2">
            <span className="font-medium">{paletteName} {color.name}</span>
            <span className="font-mono text-muted-foreground">{hex || "..."}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleCopyHex();
              }}
              className="ml-1 inline-flex items-center rounded-sm border px-1.5 py-0.5 text-[10px] hover:bg-accent hover:text-accent-foreground"
            >
              Copy
            </button>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

// Palette component
function ColorPalette({ palette }: { palette: (typeof colorPalettes)[0] }) {
  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "base":
        return <Badge variant="default">Base</Badge>;
      case "decorative":
        return <Badge variant="secondary">Decorative</Badge>;
      case "semantic":
        return <Badge variant="outline">Semantic</Badge>;
      case "extended":
        return <Badge variant="outline">Extended</Badge>;
      default:
        return <Badge variant="outline">Palette</Badge>;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{palette.name}</CardTitle>
          {getCategoryBadge(palette.category)}
        </div>
        <p className="text-sm text-muted-foreground">{palette.description}</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2">
          {palette.colors.map((color) => (
            <ColorSwatch
              key={color.name}
              color={color}
              paletteName={palette.name}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function ColorsPage() {
  // Group palettes by category with explicit ordering
  const basePalettes = colorPalettes.filter((p) => p.category === "base");
  const decorativePalettes = colorPalettes.filter(
    (p) => p.category === "decorative"
  );
  const semanticPalettes = colorPalettes.filter((p) => p.category === "semantic");
  const extendedPalettes = colorPalettes.filter((p) => p.category === "extended");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Colors</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Design tokens grouped by role and ordered per globals.css
        </p>
      </div>

      {/* Base colors */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Base colors</h2>
          <p className="text-muted-foreground">Mountain, Fjord</p>
        </div>
        <div className="space-y-6">
          {basePalettes.map((palette) => (
            <ColorPalette key={palette.name} palette={palette} />
          ))}
        </div>
      </section>

      {/* Decorative colors */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Decorative colors</h2>
          <p className="text-muted-foreground">Nordic, Aurora, Dusk</p>
        </div>
        <div className="space-y-6">
          {decorativePalettes.map((palette) => (
            <ColorPalette key={palette.name} palette={palette} />
          ))}
        </div>
      </section>

      {/* Semantic colors */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Semantic colors</h2>
          <p className="text-muted-foreground">Red, Amber, Green, Blue</p>
        </div>
        <div className="space-y-6">
          {semanticPalettes.map((palette) => (
            <ColorPalette key={palette.name} palette={palette} />
          ))}
        </div>
      </section>

      {/* Extended decorative colors */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Extended decorative colors</h2>
          <p className="text-muted-foreground">Sky, Orange, Yellow, Gray</p>
        </div>
        <div className="space-y-6">
          {extendedPalettes.map((palette) => (
            <ColorPalette key={palette.name} palette={palette} />
          ))}
        </div>
      </section>
    </div>
  );
}
