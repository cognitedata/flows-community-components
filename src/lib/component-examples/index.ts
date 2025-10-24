// Main registry export for component examples

import { accordionExamples, accordionMeta } from "./accordion.examples";
import { alertDialogExamples } from "./alert-dialog.examples";
import { badgeExamples } from "./badge.examples";
import { buttonExamples } from "./button.examples";
import { calendarExamples } from "./calendar.examples";
import { cardExamples } from "./card.examples";
import { checkboxExamples } from "./checkbox.examples";
import { dialogExamples } from "./dialog.examples";
import { dropdownMenuExamples } from "./dropdown-menu.examples";
import { inputExamples } from "./input.examples";
import { labelExamples } from "./label.examples";
import { navigationMenuExamples } from "./navigation-menu.examples";
import { popoverExamples } from "./popover.examples";
import { progressExamples } from "./progress.examples";
import { selectExamples } from "./select.examples";
import { separatorExamples } from "./separator.examples";
import { sheetExamples } from "./sheet.examples";
import { skeletonExamples } from "./skeleton.examples";
import { sonnerExamples } from "./sonner.examples";
import { switchExamples } from "./switch.examples";
import { tableExamples } from "./table.examples";
import { tabsExamples } from "./tabs.examples";
import { textareaExamples } from "./textarea.examples";
import { tooltipExamples } from "./tooltip.examples";
import type { ComponentExamples, ComponentMeta } from "./types";

export const componentExamples = {
  accordion: accordionExamples,
  "alert-dialog": alertDialogExamples,
  badge: badgeExamples,
  button: buttonExamples,
  calendar: calendarExamples,
  card: cardExamples,
  checkbox: checkboxExamples,
  dialog: dialogExamples,
  "dropdown-menu": dropdownMenuExamples,
  input: inputExamples,
  label: labelExamples,
  "navigation-menu": navigationMenuExamples,
  popover: popoverExamples,
  progress: progressExamples,
  select: selectExamples,
  separator: separatorExamples,
  sheet: sheetExamples,
  skeleton: skeletonExamples,
  sonner: sonnerExamples,
  switch: switchExamples,
  table: tableExamples,
  tabs: tabsExamples,
  textarea: textareaExamples,
  tooltip: tooltipExamples,
} as const;

export type ComponentSlug = keyof typeof componentExamples;

// Component metadata registry (only for components that have enhanced metadata)
export const componentMeta: Partial<Record<ComponentSlug, ComponentMeta>> = {
  accordion: accordionMeta,
  // Other components will be added here as they're migrated
};

// Type-safe helper to get examples for a component
export function getComponentExamples(slug: string): ComponentExamples | null {
  if (slug in componentExamples) {
    return componentExamples[slug as ComponentSlug];
  }
  return null;
}

// Type-safe helper to get metadata for a component
export function getComponentMeta(slug: string): ComponentMeta | null {
  if (slug in componentMeta) {
    return componentMeta[slug as ComponentSlug] || null;
  }
  return null;
}

// Export types
export type { ComponentExample, ComponentExamples, ComponentMeta, PropDefinition } from "./types";

