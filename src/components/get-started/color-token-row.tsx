"use client";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { ThemeToken } from "@/lib/theme-tokens-data";

function toColorInputValue(value: string) {
  const hex = value.trim();
  if (/^#[0-9a-fA-F]{6}$/.test(hex)) return hex;
  if (/^#[0-9a-fA-F]{8}$/.test(hex)) return hex.slice(0, 7);
  return "#000000";
}

export function ColorTokenRow({
  token,
  value,
  onChange,
}: {
  token: ThemeToken;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1 py-1.5">
      <Tooltip>
        <TooltipTrigger
          render={
            <label
              htmlFor={`token-${token.cssVar}`}
              className="w-fit truncate text-xs text-muted-fg"
            />
          }
        >
          {token.label}
        </TooltipTrigger>
        <TooltipContent>{token.description}</TooltipContent>
      </Tooltip>
      <div className="flex items-center gap-1.5">
        <input
          type="color"
          aria-label={`${token.label} color picker`}
          value={toColorInputValue(value)}
          onChange={(e) => onChange(e.target.value)}
          className="h-6 w-6 shrink-0 cursor-pointer rounded border border-border bg-transparent p-0"
        />
        <input
          id={`token-${token.cssVar}`}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          className="w-[76px] rounded-md border border-border bg-medium-bg px-1.5 py-1 text-xs text-foreground outline-none focus:border-border-emphasized"
        />
      </div>
    </div>
  );
}
