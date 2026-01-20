import { cn } from "@/lib/utils";

// Shadow definitions
const shadows = [
  {
    name: "shadow-sm",
    cssVar: "--shadow-sm",
    tailwindClass: "shadow-sm",
    usage: "tooltips; small containers",
  },
  {
    name: "shadow-default",
    cssVar: "--shadow-default",
    tailwindClass: "shadow-default",
    usage: "menus; popovers; hover cards",
  },
  {
    name: "shadow-md",
    cssVar: "--shadow-md",
    tailwindClass: "shadow-md",
    usage: "sonner; temporary elements",
  },
  {
    name: "shadow-lg",
    cssVar: "--shadow-lg",
    tailwindClass: "shadow-lg",
    usage: "modals; dialogs without backdrop overlay",
  },
  {
    name: "shadow-xl",
    cssVar: "--shadow-xl",
    tailwindClass: "shadow-xl",
    usage: "modals; dialogs with backdrop overlay",
  },
];

// Focus ring definitions using actual Tailwind patterns from components
const focusRings = [
  {
    name: "focus",
    tailwindClasses: "focus-visible:border-ring focus-visible:ring-ring-shadow focus-visible:ring",
    usage: "keyboard focus for default items",
  },
  {
    name: "focus-destructive",
    tailwindClasses:
      "focus-visible:border-destructive-foreground focus-visible:ring-destructive/50 focus-visible:ring",
    usage: "keyboard focus for destructive, error items",
  },
];

// Ring width options
const ringWidths = [
  { name: "ring-1", width: "1px", usage: "subtle focus; select inputs" },
  { name: "ring-2", width: "2px", usage: "textarea" },
  { name: "ring", width: "3px", usage: "default; buttons, checkboxes, etc." },
  { name: "ring-4", width: "4px", usage: "extra emphasis" },
];

function ShadowSwatch({ shadow }: { shadow: (typeof shadows)[0] }) {
  return (
    <div className="flex items-center gap-6 py-4">
      <div
        className="w-28 h-24 bg-background rounded-lg border border-border"
        style={{ boxShadow: `var(${shadow.cssVar})` }}
      />
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-medium text-foreground">{shadow.name}</h3>
        <p className="text-sm text-muted-foreground">{shadow.usage}</p>
      </div>
    </div>
  );
}

function FocusRingSwatch({ focusRing }: { focusRing: (typeof focusRings)[0] }) {
  return (
    <div className="flex items-center gap-6 py-4">
      <button
        aria-label={`Demo ${focusRing.name} focus ring`}
        className={cn(
          "w-28 h-24 bg-background rounded-lg border border-border cursor-pointer outline-none transition-[color,box-shadow]",
          focusRing.tailwindClasses
        )}
      />
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-medium text-foreground">{focusRing.name}</h3>
        <p className="text-sm text-muted-foreground">{focusRing.usage}</p>
        <code className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded mt-1 block w-fit">
          {focusRing.tailwindClasses}
        </code>
      </div>
    </div>
  );
}

function RingWidthSwatch({ ringWidth }: { ringWidth: (typeof ringWidths)[0] }) {
  const ringClass = `focus-visible:border-ring focus-visible:ring-ring-shadow focus-visible:${ringWidth.name}`;
  return (
    <div className="flex items-center gap-6 py-4">
      <button
        aria-label={`Demo ${ringWidth.name} ring width`}
        className={cn(
          "w-28 h-24 bg-background rounded-lg border border-border cursor-pointer outline-none transition-[color,box-shadow]",
          ringClass
        )}
      />
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-medium text-foreground">{ringWidth.name}</h3>
        <p className="text-sm text-muted-foreground">
          {ringWidth.width} · {ringWidth.usage}
        </p>
      </div>
    </div>
  );
}

export default function EffectsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Effects</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Showcase of elevations (shadows) and focus ring
        </p>
      </div>

      {/* Elevations Section */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Elevations</h2>
          <p className="text-muted-foreground">Box shadows for depth and hierarchy</p>
        </div>
        <div className="space-y-2">
          {shadows.map((shadow) => (
            <ShadowSwatch key={shadow.name} shadow={shadow} />
          ))}
        </div>
      </section>

      {/* Focus Section */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Focus</h2>
          <p className="text-muted-foreground">
            Click or tab to focus the elements to see the focus ring
          </p>
        </div>
        <div className="space-y-2">
          {focusRings.map((focusRing) => (
            <FocusRingSwatch key={focusRing.name} focusRing={focusRing} />
          ))}
        </div>
      </section>

      {/* Ring Widths Section */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Ring Widths</h2>
          <p className="text-muted-foreground">
            Different ring sizes for varying levels of emphasis
          </p>
        </div>
        <div className="space-y-2">
          {ringWidths.map((ringWidth) => (
            <RingWidthSwatch key={ringWidth.name} ringWidth={ringWidth} />
          ))}
        </div>
      </section>
    </div>
  );
}
