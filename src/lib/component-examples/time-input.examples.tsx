import type { ComponentExamples } from './types';

function BasicDemo() {
  return (
    <div className="space-y-3">
      <div className="rounded-md border p-4 text-center">
        <p className="text-sm text-muted-foreground">
          Time Input component coming soon
        </p>
      </div>
    </div>
  );
}

export const timeInputExamples: ComponentExamples = {
  basic: {
    title: 'Time Input (Coming Soon)',
    description: 'Custom time input component - implementation pending',
    component: BasicDemo,
    difficulty: 'intermediate',
    code: `// Time Input component - implementation coming soon`,
  },
};

// Component metadata - single source of truth for API documentation
export const timeInputMeta = {
  name: 'Time Input',
  description: 'Custom component for time input (implementation pending).',
  llmUsage:
    'Time input component is a custom component - implementation details coming soon.',
  importPath: '@/components/ui/cognite/time-input',
};
