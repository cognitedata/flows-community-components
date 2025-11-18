import { Input } from '#aura/input';
import { Label } from '#aura/label';
import type { ComponentExamples } from './types';

function WithLabelDemo() {
  return (
    <>
      <div className="space-y-4 flex flex-col gap-4">
        <div className="grid w-full max-w-sm items-center gap-1 mb-0">
          <Label htmlFor="email">Email address</Label>
          <Input
            type="email"
            id="email"
            placeholder="michael.jordan@thebulls.com"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1">
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" placeholder="Xa.$}KJb319" />
        </div>
      </div>
    </>
  );
}

function StatesDemo() {
  return (
    <div className="max-w-sm gap-4 flex flex-col">
      <div className="grid w-full max-w-sm items-center gap-1 mb-0">
        <Label htmlFor="input1">Input text</Label>
        <Input type="input1" id="input1" placeholder="Input text" />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1 mb-0">
        <Label htmlFor="input2">Disabled Input text</Label>
        <Input
          type="input2"
          id="input2"
          placeholder="Disabled Input text"
          disabled
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1 mb-0">
        <Label htmlFor="input3">Input text</Label>
        <Input type="input3" id="input3" defaultValue="Input text" />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1 mb-0">
        <Label htmlFor="input4">Invalid Input text</Label>
        <Input
          type="input4"
          id="input4"
          placeholder="Invalid Input text"
          errorMessage="This field is required"
        />
      </div>
    </div>
  );
}

export const inputExamples: ComponentExamples = {
  withLabel: {
    title: 'Input with Label',
    description: 'Input field with an associated label',
    component: WithLabelDemo,
    difficulty: 'beginner',
    code: `import { Input } from "#aura/input"
import { Label } from "#aura/label"

export function WithLabelDemo() {
  return (
    <>
      <div className="space-y-4 flex flex-col gap-4">
        <div className="grid w-full max-w-sm items-center gap-1 mb-0">
          <Label htmlFor="email">Email address</Label>
          <Input
            type="email"
            id="email"
            placeholder="michael.jordan@thebulls.com"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1">
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" placeholder="Xa.$}KJb319" />
        </div>
      </div>
    </>
  )
}`,
  },

  states: {
    title: 'States Demo',
    description: 'Different states of the input field',
    component: StatesDemo,
    difficulty: 'beginner',
    code: `import { Input } from "#aura/input"
import { Label } from "#aura/label"

export function StatesDemo() {
  return (
    <div className="max-w-sm gap-4 flex flex-col">
      <div className="grid w-full max-w-sm items-center gap-1 mb-0">
        <Label htmlFor="input1">Input text</Label>
        <Input type="input1" id="input1" placeholder="Input text" />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1 mb-0">
        <Label htmlFor="input2">Disabled Input text</Label>
        <Input
          type="input2"
          id="input2"
          placeholder="Disabled Input text"
          disabled
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1 mb-0">
        <Label htmlFor="input3">Input text</Label>
        <Input type="input3" id="input3" defaultValue="Input text" />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1 mb-0">
        <Label htmlFor="input4">Invalid Input text</Label>
        <Input
          type="input4"
          id="input4"
          placeholder="Invalid Input text"
          errorMessage="This field is required"
        />
      </div>
    </div>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const inputMeta = {
  name: 'Input',
  description:
    'A styled input field component with built-in validation states and accessibility features.',
  llmUsage:
    "When creating form inputs, use `<Input type='text' placeholder='Enter text' />` instead of `<input>`. Pair with `<Label>` for accessibility.",
  importPath: '#aura/input',
};
