'use client';

import { useMemo, type ReactNode } from 'react';

import { ColorTokenRow } from '@/components/get-started/color-token-row';
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { SegmentedControl } from '@/components/ui/segmented-control';
import { TooltipProvider } from '@/components/ui/tooltip';
import { readAuraTokenHex } from '@/lib/aura-css-var';
import { useThemeOverrides } from '@/lib/theme-overrides-context';
import {
  THEME_TOKEN_GROUPS,
  themeGroupTokenCount,
} from '@/lib/theme-tokens-data';

export function ThemePanel({ headerAction }: { headerAction?: ReactNode }) {
  const { appearance, setAppearance, overrides, setToken, reset } =
    useThemeOverrides();
  const auraValues = useMemo(() => {
    const values: Record<string, string> = {};
    for (const group of THEME_TOKEN_GROUPS) {
      for (const section of group.sections) {
        for (const token of section.tokens) {
          values[token.cssVar] = readAuraTokenHex(token.cssVar);
        }
      }
    }
    return values;
  }, [appearance]);

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col">
      <div className="mb-3 flex items-center justify-between gap-2 px-1">
        <h2 className="text-sm font-medium text-foreground">
          Theme configuration
        </h2>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={reset}
            className="rounded-md px-1.5 py-1 text-xs text-muted-fg transition-colors hover:bg-medium-bg hover:text-foreground"
          >
            Reset
          </button>
          {headerAction}
        </div>
      </div>

      <SegmentedControl
        className="mb-3"
        value={appearance}
        onChange={setAppearance}
        options={[
          { value: 'light', label: 'Light' },
          { value: 'dark', label: 'Dark' },
        ]}
      />
      <p className="mb-3 px-1 text-xs text-muted-fg">
        Light and dark, plus every Aura semantic color token. Changes apply
        across the site and Core Storybook previews.
      </p>

      <div className="min-h-0 flex-1 overflow-y-auto pr-1">
        <TooltipProvider>
          <Accordion
            multiple
            defaultValue={['background', 'card', 'popover', 'raised']}
          >
            {THEME_TOKEN_GROUPS.map((group) => (
              <AccordionItem key={group.id} value={group.id}>
                <AccordionTrigger className="px-1">
                  <span className="flex min-w-0 items-center gap-2">
                    {group.title}
                    <span className="text-xs font-normal text-muted-fg">
                      {themeGroupTokenCount(group)}
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionPanel>
                  <div className="flex flex-col px-1">
                    {group.description ? (
                      <p className="mb-3 text-xs text-muted-fg">
                        {group.description}
                      </p>
                    ) : null}
                    {group.sections.map((section) => (
                      <div key={section.title} className="mb-3 last:mb-0">
                        {group.sections.length > 1 ? (
                          <p className="mb-1 text-[11px] font-medium tracking-wide text-muted-fg uppercase">
                            {section.title}
                          </p>
                        ) : null}
                        {section.tokens.map((token) => (
                          <ColorTokenRow
                            key={token.cssVar}
                            token={token}
                            value={
                              overrides[appearance][token.cssVar] ??
                              auraValues[token.cssVar]
                            }
                            onChange={(value) =>
                              setToken(appearance, token.cssVar, value)
                            }
                          />
                        ))}
                      </div>
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
