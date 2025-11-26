import { Textarea } from '@/components/ui/aura/textarea';
import { Label } from '@/components/ui/aura/label';
import type { ComponentExamples } from './types';

function BasicDemo() {
  return (
    <div className="space-y-4 max-w-sm">
      <div className="grid w-full max-w-sm items-center gap-1">
        <Label htmlFor="message">Observation</Label>
        <Textarea
          id="message"
          placeholder="Enter your message..."
          rows={4}
          defaultValue="During inspection of Pump #14, abnormal vibration and intermittent knocking sounds were noted. The pump casing shows visible surface wear near the inlet, and the pressure gauge is fluctuating outside the expected range. Flow output is inconsistent, dropping significantly under load. No external leaks detected, but the unit is not operating within normal parameters and requires further diagnostic testing."
        />
      </div>
    </div>
  );
}

function StatesDemo() {
  return (
    <div className="max-w-sm gap-4 flex flex-col">
      <div className="grid w-full max-w-sm items-center gap-1 mb-0">
        <Label htmlFor="textarea1">Textarea text</Label>
        <Textarea id="textarea1" placeholder="Textarea text" rows={3} />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1 mb-0">
        <Label htmlFor="textarea2">Disabled Textarea text</Label>
        <Textarea
          id="textarea2"
          placeholder="Disabled Textarea text"
          disabled
          rows={3}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1 mb-0">
        <Label htmlFor="textarea3">Textarea text</Label>
        <Textarea id="textarea3" defaultValue="Textarea text" rows={3} />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1 mb-0">
        <Label htmlFor="textarea4">Invalid Textarea text</Label>
        <Textarea
          id="textarea4"
          placeholder="Invalid Textarea text"
          errorMessage="This field is required"
          rows={3}
        />
      </div>
    </div>
  );
}

function CharacterLimitDemo() {
  return (
    <div className="max-w-sm gap-4 flex flex-col">
      <div className="grid w-full max-w-sm items-center gap-1 mb-0">
        <Label htmlFor="textarea-limit">Description (max 200 characters)</Label>
        <Textarea
          id="textarea-limit"
          placeholder="Enter your description..."
          maxChars={200}
          rows={3}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1 mb-0">
        <Label htmlFor="textarea-over">Over character limit</Label>
        <Textarea
          id="textarea-over"
          placeholder="Enter your description..."
          defaultValue="This is a very long text that exceeds the maximum character limit and will trigger the error state automatically"
          maxChars={50}
          rows={3}
        />
      </div>
    </div>
  );
}

export const textareaExamples: ComponentExamples = {
  basic: {
    title: 'Textarea Examples',
    description: 'Multi-line text input fields',
    component: BasicDemo,
    difficulty: 'beginner',
    code: `import { Textarea } from "@/components/ui/aura/textarea"
import { Label } from "@/components/ui/aura/label"

export function BasicDemo() {
  return (
    <div className="space-y-4 max-w-sm">
      <div className="grid w-full max-w-sm items-center gap-1">
        <Label htmlFor="message">Observation</Label>
        <Textarea
          id="message"
          placeholder="Enter your message..."
          rows={4}
          defaultValue="During inspection of Pump #14, abnormal vibration and intermittent knocking sounds were noted. The pump casing shows visible surface wear near the inlet, and the pressure gauge is fluctuating outside the expected range. Flow output is inconsistent, dropping significantly under load. No external leaks detected, but the unit is not operating within normal parameters and requires further diagnostic testing."
        />
      </div>
    </div>
  )
}`,
  },
  states: {
    title: 'States Demo',
    description: 'Different states of the textarea field',
    component: StatesDemo,
    difficulty: 'beginner',
    code: `import { Textarea } from "@/components/ui/aura/textarea"
import { Label } from "@/components/ui/aura/label"

export function StatesDemo() {
  return (
    <div className="max-w-sm gap-4 flex flex-col">
      <div className="grid w-full max-w-sm items-center gap-1 mb-0">
        <Label htmlFor="textarea1">Textarea text</Label>
        <Textarea id="textarea1" placeholder="Textarea text" rows={3} />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1 mb-0">
        <Label htmlFor="textarea2">Disabled Textarea text</Label>
        <Textarea
          id="textarea2"
          placeholder="Disabled Textarea text"
          disabled
          rows={3}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1 mb-0">
        <Label htmlFor="textarea3">Textarea text</Label>
        <Textarea id="textarea3" defaultValue="Textarea text" rows={3} />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1 mb-0">
        <Label htmlFor="textarea4">Invalid Textarea text</Label>
        <Textarea
          id="textarea4"
          placeholder="Invalid Textarea text"
          errorMessage="This field is required"
          rows={3}
        />
      </div>
    </div>
  )
}`,
  },
  characterLimit: {
    title: 'Character Limit',
    description: 'Textarea with character counting and validation',
    component: CharacterLimitDemo,
    difficulty: 'beginner',
    code: `import { Textarea } from "@/components/ui/aura/textarea"
import { Label } from "@/components/ui/aura/label"

export function CharacterLimitDemo() {
  return (
    <div className="max-w-sm gap-4 flex flex-col">
      <div className="grid w-full max-w-sm items-center gap-1 mb-0">
        <Label htmlFor="textarea-limit">Description (max 200 characters)</Label>
        <Textarea
          id="textarea-limit"
          placeholder="Enter your description..."
          maxChars={200}
          rows={3}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1 mb-0">
        <Label htmlFor="textarea-over">Over character limit</Label>
        <Textarea
          id="textarea-over"
          placeholder="Enter your description..."
          defaultValue="This is a very long text that exceeds the maximum character limit and will trigger the error state automatically"
          maxChars={50}
          rows={3}
        />
      </div>
    </div>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const textareaMeta = {
  name: 'Textarea',
  description:
    'Displays a form textarea or a component that looks like a textarea.',
  llmUsage:
    'When asked for a textarea, use `<Textarea>` for multi-line text input and longer form content.',
  importPath: '@/components/ui/aura/textarea',
};
