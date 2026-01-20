/**
 * Stories Registry
 *
 * Tracks which components use the folder structure with portable stories.
 */

/**
 * Set of component slugs that use the folder structure with portable stories.
 * Components are stored in:
 *   src/components/ui/aura/{slug}/
 *     ├── index.tsx
 *     ├── {slug}.tsx
 *     ├── {slug}.stories.tsx
 *     └── {slug}.metadata.ts
 */
export const componentsWithStories = new Set<string>([
  // Batch 1: Components with existing stories
  "avatar",
  "badge",
  "button",
  "card",
  "collapsible",
  "colors",
  "combobox",
  "confirmation",
  "dropdown-menu",
  "effects",
  "layout",
  "popover",
  "prompt-input",
  "shimmer",
  "sidebar",
  "suggestion",
  "swap-slot",
  "tooltip",
  // Batch 2: Form components
  "accordion",
  "alert",
  "alert-dialog",
  "banner",
  "breadcrumb",
  "calendar",
  "checkbox",
  "command",
  "context-menu",
  "date-picker",
  "dialog",
  "drawer",
  "helper-text",
  "input",
  "kbd",
  "label",
  "menubar",
  "pagination",
  "progress",
  "radio-group",
  "select",
  "separator",
  "slider",
  "sonner-toast",
  "switch",
  "table",
  "tabs",
  "textarea",
  "time-input",
  "toggle",
  "topbar",
  // Batch 3: AI components
  "artifact",
  "branch",
  "canvas",
  "chain-of-thought",
  "code-block",
  "connection",
  "context",
  "controls",
  "conversation",
  "edge",
  "image",
  "inline-citation",
  "loader",
  "message",
  "node",
  "open-in-chat",
  "panel",
  "plan",
  "queue",
  "reasoning",
  "reasoning-original",
  "sources",
  "task",
  "tool",
  "toolbar",
  // Batch 4: Utility components
  "button-group",
  "carousel",
  "chart",
  "hover-card",
  "icon-conversation-empty-state",
  "input-group",
  "scroll-area",
  "sheet",
  "skeleton",
]);

/**
 * Check if a component uses the portable stories system
 */
export function hasStoryRenderer(slug: string): boolean {
  return componentsWithStories.has(slug);
}
