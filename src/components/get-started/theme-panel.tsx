"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from "@/components/ui/accordion";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ColorTokenRow } from "@/components/get-started/color-token-row";
import { THEME_TOKEN_GROUPS } from "@/lib/theme-tokens-data";
import { useThemeOverrides, type ThemeMode } from "@/lib/theme-overrides-context";

export function ThemePanel() {
  const { resolvedTheme } = useTheme();
  const { overrides, setToken, reset } = useThemeOverrides();
  const [editMode, setEditMode] = React.useState<ThemeMode>("dark");

  React.useEffect(() => {
    if (resolvedTheme === "light" || resolvedTheme === "dark") {
      setEditMode(resolvedTheme);
    }
  }, [resolvedTheme]);

  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center justify-between px-1">
        <h2 className="text-xs font-medium tracking-wide text-medium-fg uppercase">Re-theme</h2>
        <button
          type="button"
          onClick={reset}
          className="text-xs text-muted-fg transition-colors hover:text-foreground"
        >
          Reset
        </button>
      </div>

      <SegmentedControl
        className="mb-3"
        value={editMode}
        onChange={setEditMode}
        options={[
          { value: "light", label: "Light" },
          { value: "dark", label: "Dark" },
        ]}
      />
      <p className="mb-3 px-1 text-xs text-muted-fg">
        Editing <span className="font-medium text-foreground">{editMode}</span> mode tokens.
        Switch the site theme from the topbar to preview.
      </p>

      <div className="min-h-0 flex-1 overflow-y-auto pr-1">
        <TooltipProvider>
          <Accordion>
            {THEME_TOKEN_GROUPS.map((group) => (
              <AccordionItem key={group.id} value={group.id}>
                <AccordionTrigger className="px-1">{group.title}</AccordionTrigger>
                <AccordionPanel>
                  <div className="flex flex-col px-1">
                    <p className="mb-2 text-xs text-muted-fg">{group.description}</p>
                    {group.tokens.map((token) => (
                      <ColorTokenRow
                        key={token.cssVar}
                        token={token}
                        value={overrides[editMode][token.cssVar] ?? token[editMode]}
                        onChange={(value) => setToken(editMode, token.cssVar, value)}
                      />
                    ))}
                  </div>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </TooltipProvider>
      </div>
    </div>
  );
}
