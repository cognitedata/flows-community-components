import { HelperText } from '@/components/ui/aura/helper-text';
import { Input } from '@/components/ui/aura/input';
import { Textarea } from '@/components/ui/aura/textarea';
import { Label } from '@/components/ui/aura/label';
import {
  IconInfoCircle,
  IconAlertTriangle,
  IconCircleCheck,
  IconLock,
} from '@tabler/icons-react';
import type { ComponentExamples } from './types';

function BasicDemo() {
  return (
    <div className="space-y-4 max-w-sm">
      <div className="grid w-full max-w-sm items-center gap-1">
        <HelperText>This is regular helper text</HelperText>
      </div>
      <div className="grid w-full max-w-sm items-center gap-1">
        <HelperText isError>This is error helper text</HelperText>
      </div>
    </div>
  );
}

function WithInputDemo() {
  return (
    <div className="space-y-4 max-w-sm">
      <div className="grid w-full max-w-sm items-center gap-1">
        <Label htmlFor="email">Email address</Label>
        <Input type="email" id="email" placeholder="your.email@example.com" />
        <HelperText>
          We&apos;ll never share your email with anyone else.
        </HelperText>
      </div>
      <div className="grid w-full max-w-sm items-center gap-1">
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" placeholder="Enter password" />
        <HelperText isError>
          Password must be at least 8 characters long.
        </HelperText>
      </div>
    </div>
  );
}

function WithTextareaDemo() {
  return (
    <div className="space-y-4 max-w-sm">
      <div className="grid w-full max-w-sm items-center gap-1">
        <Label htmlFor="comments">Comments</Label>
        <Textarea id="comments" placeholder="Enter your comments..." rows={3} />
        <HelperText>150 characters remaining</HelperText>
      </div>
      <div className="grid w-full max-w-sm items-center gap-1">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Enter description..."
          rows={3}
          defaultValue="This text is way too long and exceeds the maximum character limit that was set for this field"
        />
        <HelperText isError>Too many characters</HelperText>
      </div>
    </div>
  );
}

function StatesDemo() {
  return (
    <div className="space-y-6 max-w-sm">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Default State</h3>
        <HelperText>This is informational helper text</HelperText>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Default State with Icon</h3>
        <HelperText icon={<IconInfoCircle />}>
          This is informational helper text with an information icon
        </HelperText>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Error State</h3>
        <HelperText isError>This field is required</HelperText>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Character Count</h3>
        <HelperText>245 characters remaining</HelperText>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Character Count Over Limit</h3>
        <HelperText isError>15 characters over the limit</HelperText>
      </div>
    </div>
  );
}

function SizesDemo() {
  return (
    <div className="space-y-6 max-w-sm">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Small Size (Default)</h3>
        <HelperText icon={<IconInfoCircle />}>
          This is the default small size helper text
        </HelperText>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Extra Small Size</h3>
        <HelperText size="xs" icon={<IconInfoCircle />}>
          This is extra small helper text for compact layouts
        </HelperText>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Small Size with Error</h3>
        <HelperText isError>This field is required</HelperText>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Extra Small Size with Error</h3>
        <HelperText size="xs" isError>
          This field is required
        </HelperText>
      </div>
    </div>
  );
}

function CustomIconsDemo() {
  return (
    <div className="space-y-6 max-w-sm">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Error with Default Icon</h3>
        <HelperText isError>This field is required</HelperText>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Error with Custom Icon</h3>
        <HelperText isError icon={<IconAlertTriangle />}>
          Warning: This action cannot be undone
        </HelperText>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Info with Custom Icon</h3>
        <HelperText icon={<IconInfoCircle />}>
          We&apos;ll never share your email with anyone else
        </HelperText>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Success with Custom Icon</h3>
        <HelperText icon={<IconCircleCheck />}>
          Your password meets all requirements
        </HelperText>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Security with Custom Icon</h3>
        <HelperText icon={<IconLock />}>
          Your data is encrypted end-to-end
        </HelperText>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Text Only (No Icon)</h3>
        <HelperText>Simple helper text without an icon</HelperText>
      </div>
    </div>
  );
}

export const helperTextExamples: ComponentExamples = {
  basic: {
    title: 'Basic Helper Text',
    description: 'Helper text in default and error states',
    component: BasicDemo,
    difficulty: 'beginner',
    code: `import { HelperText } from "@/components/ui/aura/helper-text"

export function BasicDemo() {
  return (
    <div className="space-y-4 max-w-sm">
      <div className="grid w-full max-w-sm items-center gap-1">
        <HelperText>This is regular helper text</HelperText>
      </div>
      <div className="grid w-full max-w-sm items-center gap-1">
        <HelperText isError>This is error helper text</HelperText>
      </div>
    </div>
  )
}`,
  },

  withInput: {
    title: 'Helper Text with Input',
    description: 'Using helper text with input fields',
    component: WithInputDemo,
    difficulty: 'beginner',
    code: `import { HelperText } from "@/components/ui/aura/helper-text"
import { Input } from "@/components/ui/aura/input"
import { Label } from "@/components/ui/aura/label"

export function WithInputDemo() {
  return (
    <div className="space-y-4 max-w-sm">
      <div className="grid w-full max-w-sm items-center gap-1">
        <Label htmlFor="email">Email address</Label>
        <Input
          type="email"
          id="email"
          placeholder="your.email@example.com"
        />
        <HelperText>We&apos;ll never share your email with anyone else.</HelperText>
      </div>
      <div className="grid w-full max-w-sm items-center gap-1">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          placeholder="Enter password"
        />
        <HelperText isError>Password must be at least 8 characters long.</HelperText>
      </div>
    </div>
  )
}`,
  },

  withTextarea: {
    title: 'Helper Text with Textarea',
    description: 'Using helper text with textarea fields',
    component: WithTextareaDemo,
    difficulty: 'beginner',
    code: `import { HelperText } from "@/components/ui/aura/helper-text"
import { Textarea } from "@/components/ui/aura/textarea"
import { Label } from "@/components/ui/aura/label"

export function WithTextareaDemo() {
  return (
    <div className="space-y-4 max-w-sm">
      <div className="grid w-full max-w-sm items-center gap-1">
        <Label htmlFor="comments">Comments</Label>
        <Textarea
          id="comments"
          placeholder="Enter your comments..."
          rows={3}
        />
        <HelperText>150 characters remaining</HelperText>
      </div>
      <div className="grid w-full max-w-sm items-center gap-1">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Enter description..."
          rows={3}
          defaultValue="This text is way too long and exceeds the maximum character limit that was set for this field"
        />
        <HelperText isError>Too many characters</HelperText>
      </div>
    </div>
  )
}`,
  },

  sizes: {
    title: 'Helper Text Sizes',
    description: 'Different sizes for helper text',
    component: SizesDemo,
    difficulty: 'beginner',
    code: `import { HelperText } from "@/components/ui/aura/helper-text"
import { IconInfoCircle } from "@tabler/icons-react"

export function SizesDemo() {
  return (
    <div className="space-y-6 max-w-sm">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Small Size (Default)</h3>
        <HelperText icon={<IconInfoCircle />}>
          This is the default small size helper text
        </HelperText>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Extra Small Size</h3>
        <HelperText size="xs" icon={<IconInfoCircle />}>
          This is extra small helper text for compact layouts
        </HelperText>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Small Size with Error</h3>
        <HelperText isError>This field is required</HelperText>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Extra Small Size with Error</h3>
        <HelperText size="xs" isError>
          This field is required
        </HelperText>
      </div>
    </div>
  )
}`,
  },

  states: {
    title: 'Helper Text States',
    description: 'Different states and use cases for helper text',
    component: StatesDemo,
    difficulty: 'beginner',
    code: `import { HelperText } from "@/components/ui/aura/helper-text"
import { IconInfoCircle } from "@tabler/icons-react"

export function StatesDemo() {
  return (
    <div className="space-y-6 max-w-sm">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Default State</h3>
        <HelperText>This is informational helper text</HelperText>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Default State with Icon</h3>
        <HelperText icon={<IconInfoCircle />}>
          This is informational helper text with an information icon
        </HelperText>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Error State</h3>
        <HelperText isError>This field is required</HelperText>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Character Count</h3>
        <HelperText>245 characters remaining</HelperText>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Character Count Over Limit</h3>
        <HelperText isError>15 characters over the limit</HelperText>
      </div>
    </div>
  )
}`,
  },

  customIcons: {
    title: 'Custom Icons',
    description: 'Using custom icons with helper text',
    component: CustomIconsDemo,
    difficulty: 'beginner',
    code: `import { HelperText } from "@/components/ui/aura/helper-text"
import {
  IconInfoCircle,
  IconAlertTriangle,
  IconCircleCheck,
  IconLock,
} from "@tabler/icons-react"

export function CustomIconsDemo() {
  return (
    <div className="space-y-6 max-w-sm">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Error with Default Icon</h3>
        <HelperText isError>This field is required</HelperText>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Error with Custom Icon</h3>
        <HelperText isError icon={<IconAlertTriangle />}>
          Warning: This action cannot be undone
        </HelperText>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Info with Custom Icon</h3>
        <HelperText icon={<IconInfoCircle />}>
          We&apos;ll never share your email with anyone else
        </HelperText>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Success with Custom Icon</h3>
        <HelperText icon={<IconCircleCheck />}>
          Your password meets all requirements
        </HelperText>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Security with Custom Icon</h3>
        <HelperText icon={<IconLock />}>
          Your data is encrypted end-to-end
        </HelperText>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Text Only (No Icon)</h3>
        <HelperText>Simple helper text without an icon</HelperText>
      </div>
    </div>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const helperTextMeta = {
  name: 'Helper Text',
  description:
    'A text component for displaying helper messages and error messages below form fields. Supports custom icons and automatically shows an error icon when in error state.',
  llmUsage:
    'Use `<HelperText>` to provide additional information or guidance below form fields. Set `isError={true}` to display error messages with red text and a default error icon. Pass a custom `icon` prop to override the default icon or add an icon to non-error states. Use `size="xs"` for compact layouts or omit for default `"sm"` size.',
  importPath: '@/components/ui/aura/helper-text',
  apiReference: {
    props: [
      {
        name: 'size',
        type: '"xs" | "sm"',
        default: '"sm"',
        required: false,
        description:
          'The size of the helper text. Use "xs" for compact layouts and "sm" (default) for standard forms',
      },
      {
        name: 'isError',
        type: 'boolean',
        default: 'false',
        required: false,
        description:
          'When true, displays the text in red and shows an error icon by default (unless a custom icon is provided)',
      },
      {
        name: 'icon',
        type: 'ReactNode',
        required: false,
        description:
          'Custom icon to display. If not provided, an error icon will be shown when isError is true',
      },
      {
        name: 'children',
        type: 'ReactNode',
        required: true,
        description: 'The text content to display',
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes to apply to the component',
      },
    ],
  },
  relatedComponents: ['Input', 'Textarea', 'Label'],
};
