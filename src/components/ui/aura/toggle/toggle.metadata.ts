import type { ComponentMeta } from "@/lib/component-examples";

export const ToggleMetadata: ComponentMeta = {
  name: "Toggle",
  status: "draft",
  description:
    "A toggle button component that can be used independently or in exclusive groups. Supports multiple variants: 'default' for normal toggles (uses bg-toggled when pressed), 'exclusive' for exclusive groups (uses bg-primary when pressed), and 'ghost' for minimal styling.",
  llmUsage:
    "Use `<Toggle pressed={pressed} onPressedChange={setPressed} variant=\"default\">` for normal toggles. For exclusive groups where only one can be active, use `variant=\"exclusive\"` and manage state so only one toggle is pressed at a time.",
  importPath: "@/components/ui/aura/toggle",
};
