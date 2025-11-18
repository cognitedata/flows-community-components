import {
  RadioGroup,
  RadioGroupItem,
} from '#aura/radio-group';
import { Label } from '#aura/label';
import type { ComponentExamples } from './types';

function BasicDemo() {
  return (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  );
}

export const radioGroupExamples: ComponentExamples = {
  basic: {
    title: 'Basic Radio Group',
    description:
      'A set of checkable buttons where only one can be checked at a time',
    component: BasicDemo,
    difficulty: 'beginner',
    code: `import { RadioGroup, RadioGroupItem } from "#aura/radio-group"
import { Label } from "#aura/label"

export function BasicDemo() {
  return (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const radioGroupMeta = {
  name: 'Radio Group',
  description:
    'A set of checkable buttons where only one can be checked at a time.',
  llmUsage:
    'When creating radio button groups, use `<RadioGroup>` with `<RadioGroupItem>` components.',
  importPath: '#aura/radio-group',
};
