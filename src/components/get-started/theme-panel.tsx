'use client';

import { IconCheck, IconCopy } from '@tabler/icons-react';
import { useEffect, useMemo, useState, type ReactNode } from 'react';

import { ColorTokenRow } from '@/components/get-started/color-token-row';
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { SegmentedControl } from '@/components/ui/segmented-control';
import { TooltipProvider } from '@/components/ui/tooltip';
import {
  useThemeOverrides,
  type ThemeMode,
} from '@/lib/theme-overrides-context';
import { buildSharedThemeCss } from '@/lib/theme-share-url';
import {
  AURA_TOKEN_HEX,
  THEME_TOKEN_GROUPS,
  themeGroupTokenCount,
} from '@/lib/theme-tokens-data';

const COPIED_RESET_MS = 2000;

function changedTokens(mode: ThemeMode, values: Record<string, string>) {
  const defaults = AURA_TOKEN_HEX[mode];
  return Object.fromEntries(
    Object.entries(values).filter(
      ([cssVar, value]) =>
        value.trim().toLowerCase() !==
        (defaults[cssVar] ?? '').trim().toLowerCase()
    )
  );
}

export function ThemePanel({ headerAction }: { headerAction?: ReactNode }) {
  const { appearance, setAppearance, overrides, setToken, reset } =
    useThemeOverrides();
  const auraValues = AURA_TOKEN_HEX[appearance];
  const [copied, setCopied] = useState(false);

  const exportCss = useMemo(
    () =>
      buildSharedThemeCss({
        base: {},
        light: changedTokens('light', overrides.light),
        dark: changedTokens('dark', overrides.dark),
      }),
    [overrides]
  );

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), COPIED_RESET_MS);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  async function copyExportCss() {
    if (!exportCss) return;
    await navigator.clipboard.writeText(exportCss);
    setCopied(true);
  }

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

      <div className="mb-3 flex items-center justify-between gap-2 rounded-md border border-border px-2 py-1.5">
        <p className="min-w-0 text-xs text-muted-fg">
          {exportCss
            ? 'Copy your changes as CSS overrides for your styles.css.'
            : 'Change a token to export it as CSS overrides.'}
        </p>
        <button
          type="button"
          onClick={copyExportCss}
          disabled={!exportCss}
          aria-live="polite"
          className="flex shrink-0 items-center gap-1 rounded-md px-1.5 py-1 text-xs text-foreground transition-colors hover:bg-medium-bg disabled:pointer-events-none disabled:text-muted-fg"
        >
          {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
          {copied ? 'Copied' : 'Copy CSS'}
        </button>
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
                <AccordionTrigger>
                  <span className="flex min-w-0 items-center gap-2">
                    {group.title}
                    <span className="text-xs font-normal text-muted-fg">
                      {themeGroupTokenCount(group)}
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionPanel>
                  <div className="flex flex-col">
                    {group.description ? (
                      <p className="mb-3 text-xs text-muted-fg">
                        {group.description}
                      </p>
                    ) : null}
                    {group.sections.map((section) => (
                      <div key={section.title} className="mb-3 last:mb-0">
                        {group.sections.length > 1 ? (
                          <p className="mb-1 text-xs font-medium tracking-wide text-muted-fg uppercase">
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
