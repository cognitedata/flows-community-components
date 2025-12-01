// Main registry export for component examples

import { accordionExamples, accordionMeta } from './accordion.examples';
import { alertExamples } from './alert.examples';
import { alertDialogExamples } from './alert-dialog.examples';
import { avatarExamples } from './avatar.examples';
import { badgeExamples } from './badge.examples';
import { bannerExamples, bannerMeta } from './banner.examples';
import { breadcrumbExamples } from './breadcrumb.examples';
import { buttonExamples } from './button.examples';
import { calendarExamples } from './calendar.examples';
import { cardExamples } from './card.examples';
import { checkboxExamples } from './checkbox.examples';
import { collapsibleExamples } from './collapsible.examples';
import { comboboxExamples } from './combobox.examples';
import { commandExamples } from './command.examples';
import { contextMenuExamples } from './context-menu.examples';
import { datePickerExamples } from './date-picker.examples';
import { dialogExamples } from './dialog.examples';
import { drawerExamples } from './drawer.examples';
import { dropdownMenuExamples } from './dropdown-menu.examples';
import { helperTextExamples, helperTextMeta } from './helper-text.examples';
import { inputExamples } from './input.examples';
import { kbdExamples } from './kbd.examples';
import { labelExamples } from './label.examples';
import { menubarExamples } from './menubar.examples';
import { paginationExamples } from './pagination.examples';
import { popoverExamples } from './popover.examples';
import { progressExamples } from './progress.examples';
import { radioGroupExamples } from './radio-group.examples';
import { selectExamples } from './select.examples';
import { separatorExamples } from './separator.examples';
import { sidebarExamples } from './sidebar.examples';
import { sliderExamples } from './slider.examples';
import { sonnerExamples } from './sonner.examples';
import { swapSlotExamples } from './swap-slot.examples';
import { switchExamples } from './switch.examples';
import { tabsExamples } from './tabs.examples';
import { tableExamples, tableMeta } from './table.examples';
import { textareaExamples } from './textarea.examples';
import { timeInputExamples } from './time-input.examples';
import { toggleExamples } from './toggle.examples';
import { tooltipExamples } from './tooltip.examples';
import { topbarExamples } from './topbar.examples';
import type { ComponentExamples, ComponentMeta } from './types';

export const componentExamples = {
  accordion: accordionExamples,
  alert: alertExamples,
  'alert-dialog': alertDialogExamples,
  avatar: avatarExamples,
  badge: badgeExamples,
  banner: bannerExamples,
  breadcrumb: breadcrumbExamples,
  button: buttonExamples,
  calendar: calendarExamples,
  card: cardExamples,
  checkbox: checkboxExamples,
  collapsible: collapsibleExamples,
  combobox: comboboxExamples,
  command: commandExamples,
  'context-menu': contextMenuExamples,
  'date-picker': datePickerExamples,
  dialog: dialogExamples,
  drawer: drawerExamples,
  'dropdown-menu': dropdownMenuExamples,
  'helper-text': helperTextExamples,
  input: inputExamples,
  kbd: kbdExamples,
  label: labelExamples,
  menubar: menubarExamples,
  pagination: paginationExamples,
  popover: popoverExamples,
  progress: progressExamples,
  'radio-group': radioGroupExamples,
  select: selectExamples,
  separator: separatorExamples,
  sidebar: sidebarExamples,
  slider: sliderExamples,
  sonner: sonnerExamples,
  'swap-slot': swapSlotExamples,
  switch: switchExamples,
  tabs: tabsExamples,
  table: tableExamples,
  textarea: textareaExamples,
  'time-input': timeInputExamples,
  toggle: toggleExamples,
  tooltip: tooltipExamples,
  topbar: topbarExamples,
} as const;

export type ComponentSlug = keyof typeof componentExamples;

// Component metadata registry (only for components that have enhanced metadata)
export const componentMeta: Partial<Record<ComponentSlug, ComponentMeta>> = {
  accordion: accordionMeta,
  banner: bannerMeta,
  'helper-text': helperTextMeta,
  table: tableMeta,
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
export type {
  ComponentExample,
  ComponentExamples,
  ComponentMeta,
  PropDefinition,
} from './types';
