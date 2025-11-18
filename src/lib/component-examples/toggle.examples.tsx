import { Toggle } from '@/components/ui/cognite/toggle';
import {
  IconBold as Bold,
  IconItalic as Italic,
  IconUnderline as Underline,
} from '@tabler/icons-react';
import type { ComponentExamples } from './types';

function BasicDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Toggle aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Toggle italic">
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Toggle underline">
        <Underline className="h-4 w-4" />
      </Toggle>
    </div>
  );
}

export const toggleExamples: ComponentExamples = {
  basic: {
    title: 'Basic Toggle',
    description: 'A two-state button that can be either on or off',
    component: BasicDemo,
    difficulty: 'beginner',
    code: `import { Toggle } from "@/components/ui/cognite/toggle"
import { Bold, Italic, Underline } from "@tabler/icons-react"

export function BasicDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Toggle aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Toggle italic">
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle aria-label="Toggle underline">
        <Underline className="h-4 w-4" />
      </Toggle>
    </div>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const toggleMeta = {
  name: 'Toggle',
  description: 'A two-state button that can be either on or off.',
  llmUsage:
    'When creating toggle buttons, use `<Toggle>` for binary state controls.',
  importPath: '@/components/ui/cognite/toggle',
};
