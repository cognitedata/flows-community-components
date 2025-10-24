import { Combobox } from "@/components/ui/cognite/combobox";
import type { ComponentExamples } from "./types";

function BasicDemo() {
  return (
    <div className="space-y-3">
      <Combobox />
      <p className="text-sm text-muted-foreground">
        A searchable select component built with Popover and Command.
      </p>
    </div>
  );
}

export const comboboxExamples: ComponentExamples = {
  basic: {
    title: "Basic Combobox",
    description: "A searchable select dropdown with autocomplete",
    component: BasicDemo,
    difficulty: "intermediate",
    code: `import { Combobox } from "@/components/ui/cognite/combobox"

export function BasicDemo() {
  return <Combobox />
}`,
  },
};

