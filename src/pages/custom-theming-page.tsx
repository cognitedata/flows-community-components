import * as React from "react";
import { NameOnlyCard } from "@/components/get-started/name-only-card";
import { LayoutExampleBlock } from "@/components/get-started/layout-example-block";
import { ThemePanel } from "@/components/get-started/theme-panel";
import { PageTitle } from "@/components/page-title";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { ALL_COMPONENTS } from "@/lib/component-catalog-data";
import { DATA_VIZ_ITEMS, LAYOUT_EXAMPLES } from "@/lib/custom-theming-data";

type PreviewTab = "components" | "data-viz" | "layout";

export function CustomThemingPage() {
  const [tab, setTab] = React.useState<PreviewTab>("components");

  return (
    <>
      <PageTitle title="Custom theming — Aura" />
      <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
        <div className="min-w-0 flex-1">
          <header className="mb-10 sm:mb-12">
            <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
              Custom theming
            </h1>
            <p className="mt-3 max-w-[60ch] text-muted-fg">
              Apply your own brand colors and typography on top of Aura's defaults, then preview
              the result live against every component, chart, and layout below.
            </p>
          </header>

          <SegmentedControl
            className="mb-6"
            value={tab}
            onChange={setTab}
            options={[
              { value: "components", label: "Components" },
              { value: "data-viz", label: "Data visualization" },
              { value: "layout", label: "Layout examples" },
            ]}
          />

          {tab === "components" && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {ALL_COMPONENTS.map((component) => (
                <NameOnlyCard key={component.slug} name={component.name} />
              ))}
            </div>
          )}

          {tab === "data-viz" && (
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {DATA_VIZ_ITEMS.map((item) => (
                <NameOnlyCard key={item.slug} name={item.name} className="lg:col-span-2" />
              ))}
            </div>
          )}

          {tab === "layout" && (
            <div className="flex flex-col gap-6">
              {LAYOUT_EXAMPLES.map((example) => (
                <LayoutExampleBlock key={example.name} example={example} />
              ))}
            </div>
          )}
        </div>

        <aside className="sticky top-24 hidden h-[calc(100vh-7rem)] w-72 shrink-0 rounded-2xl bg-muted-bg/60 p-4 lg:block">
          <ThemePanel />
        </aside>
      </div>
    </>
  );
}
