import { Combobox } from '@/components/ui/aura/combobox';
import type { ComponentExamples } from './types';

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
    title: 'Basic Combobox',
    description: 'A searchable select dropdown with autocomplete',
    component: BasicDemo,
    difficulty: 'intermediate',
    code: `import { Combobox } from "@/components/ui/aura/combobox"

export function BasicDemo() {
  return <Combobox />
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const comboboxMeta = {
  name: 'Combobox',
  description:
    'Autocomplete input and command palette with a list of suggestions.',
  llmUsage:
    'When creating searchable select dropdowns, use `<Combobox>` which combines Popover and Command components.',
  importPath: '@/components/ui/aura/combobox',
};
