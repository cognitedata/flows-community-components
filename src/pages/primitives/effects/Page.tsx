import { cn } from '@/lib/utils';

// Shadow definitions
const shadows = [
  {
    name: 'shadow-sm',
    cssVar: '--shadow-sm',
    tailwindClass: 'shadow-sm',
    usage: 'tooltips; small containers',
  },
  {
    name: 'shadow-default',
    cssVar: '--shadow-default',
    tailwindClass: 'shadow-default',
    usage: 'menus; popovers; hover cards',
  },
  {
    name: 'shadow-md',
    cssVar: '--shadow-md',
    tailwindClass: 'shadow-md',
    usage: 'sonner; temporary elements',
  },
  {
    name: 'shadow-lg',
    cssVar: '--shadow-lg',
    tailwindClass: 'shadow-lg',
    usage: 'modals; dialogs without backdrop overlay',
  },
  {
    name: 'shadow-xl',
    cssVar: '--shadow-xl',
    tailwindClass: 'shadow-xl',
    usage: 'modals; dialogs with backdrop overlay',
  },
];

// Focus ring definitions - shown as always visible for visual reference
const focusRings = [
  {
    name: 'focus',
    lightClasses: 'shadow-focus-ring',
    darkClasses: 'shadow-focus-ring',
    usage: 'keyboard focus for default items',
  },
  {
    name: 'focus-destructive',
    lightClasses: 'shadow-focus-ring-destructive',
    darkClasses: 'shadow-focus-ring-destructive',
    usage: 'keyboard focus for destructive, error items',
  },
];

function ShadowSwatch({ shadow }: { shadow: (typeof shadows)[0] }) {
  return (
    <div className="flex gap-6 py-4">
      {/* Light mode */}
      <div className="flex items-center gap-6 flex-1">
        <div
          className={cn('w-28 h-24 bg-white rounded-lg', shadow.tailwindClass)}
        />
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-medium text-foreground">
            {shadow.name}
          </h3>
          <p className="text-sm text-muted-foreground">{shadow.usage}</p>
        </div>
      </div>
      {/* Dark mode */}
      <div className="dark flex items-center gap-6 flex-1 bg-[#111213] rounded-xl p-4 -my-2">
        <div
          className={cn(
            'w-28 h-24 bg-[#2a2b2f] rounded-lg',
            shadow.tailwindClass
          )}
        />
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-medium text-white">{shadow.name}</h3>
          <p className="text-sm text-[#a1a1aa]">{shadow.usage}</p>
        </div>
      </div>
    </div>
  );
}

function FocusRingSwatch({ focusRing }: { focusRing: (typeof focusRings)[0] }) {
  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-base font-medium text-foreground mb-1">
          {focusRing.name}
        </h3>
        <p className="text-sm text-muted-foreground">{focusRing.usage}</p>
      </div>
      <div className="flex gap-6">
        {/* Light mode */}
        <div className="flex-1 bg-background rounded-xl border border-border p-6 flex items-center justify-center">
          <div
            className={cn(
              'w-28 h-24 bg-background rounded-lg outline-none',
              focusRing.lightClasses
            )}
          />
        </div>
        {/* Dark mode */}
        <div className="flex-1 bg-[#111213] rounded-xl border border-[#2e3238] p-6 flex items-center justify-center">
          <div
            className={cn(
              'w-28 h-24 bg-[#1a1b1f] rounded-lg outline-none',
              focusRing.darkClasses
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default function EffectsPage() {
  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Effects</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Showcase of elevations (shadows) and focus rings
          </p>
        </div>

        {/* Elevations Section */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Elevations</h2>
            <p className="text-muted-foreground">
              Box shadows for depth and hierarchy
            </p>
          </div>
          <div className="space-y-2">
            {shadows.map((shadow) => (
              <ShadowSwatch key={shadow.name} shadow={shadow} />
            ))}
          </div>
        </section>

        {/* Focus Section */}
        <section className="space-y-6">
          <div className="border border-border rounded-2xl p-8 bg-card">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">Focus</h2>
              <p className="text-muted-foreground">
                Keyboard focus indicators for accessibility. Focus rings use a
                2px inner ring + 4px outer glow (4px total) and adapt to light
                and dark modes.
              </p>
            </div>
            <div className="space-y-8">
              {focusRings.map((focusRing) => (
                <FocusRingSwatch key={focusRing.name} focusRing={focusRing} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
