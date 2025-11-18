import { DatePicker } from '@/components/ui/cognite/date-picker';
import type { ComponentExamples } from './types';

function BasicDemo() {
  return (
    <div className="space-y-3">
      <DatePicker />
      <p className="text-sm text-muted-foreground">
        A date picker built with Popover and Calendar components.
      </p>
    </div>
  );
}

export const datePickerExamples: ComponentExamples = {
  basic: {
    title: 'Basic Date Picker',
    description: 'Select a date from a calendar popover',
    component: BasicDemo,
    difficulty: 'intermediate',
    code: `import { DatePicker } from "@/components/ui/cognite/date-picker"

export function BasicDemo() {
  return <DatePicker />
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const datePickerMeta = {
  name: 'Date Picker',
  description: 'A date picker component with range and presets.',
  llmUsage:
    'When creating date selectors, use `<DatePicker>` which combines Popover and Calendar components.',
  importPath: '@/components/ui/cognite/date-picker',
};
