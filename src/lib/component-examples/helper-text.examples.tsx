import { HelperText } from "@/components/ui/cognite/helper-text";
import { Input } from "@/components/ui/cognite/input";
import { Textarea } from "@/components/ui/cognite/textarea";
import { Label } from "@/components/ui/cognite/label";
import type { ComponentExamples } from "./types";

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
  );
}

function WithTextareaDemo() {
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

export const helperTextExamples: ComponentExamples = {
  basic: {
    title: "Basic Helper Text",
    description: "Helper text in default and error states",
    component: BasicDemo,
    difficulty: "beginner",
    code: `import { HelperText } from "@/components/ui/cognite/helper-text"

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
    title: "Helper Text with Input",
    description: "Using helper text with input fields",
    component: WithInputDemo,
    difficulty: "beginner",
    code: `import { HelperText } from "@/components/ui/cognite/helper-text"
import { Input } from "@/components/ui/cognite/input"
import { Label } from "@/components/ui/cognite/label"

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
    title: "Helper Text with Textarea",
    description: "Using helper text with textarea fields",
    component: WithTextareaDemo,
    difficulty: "beginner",
    code: `import { HelperText } from "@/components/ui/cognite/helper-text"
import { Textarea } from "@/components/ui/cognite/textarea"
import { Label } from "@/components/ui/cognite/label"

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

  states: {
    title: "Helper Text States",
    description: "Different states and use cases for helper text",
    component: StatesDemo,
    difficulty: "beginner",
    code: `import { HelperText } from "@/components/ui/cognite/helper-text"

export function StatesDemo() {
  return (
    <div className="space-y-6 max-w-sm">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Default State</h3>
        <HelperText>This is informational helper text</HelperText>
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
};

// Component metadata - single source of truth for API documentation
export const helperTextMeta = {
  name: "Helper Text",
  description:
    "A text component for displaying helper messages and error messages below form fields. Can show an error icon and red text when in error state.",
  llmUsage:
    "Use `<HelperText>` to provide additional information or guidance below form fields. Set `isError={true}` to display error messages with the appropriate styling and icon.",
  importPath: "@/components/ui/cognite/helper-text",
  apiReference: {
    props: [
      {
        name: "isError",
        type: "boolean",
        default: "false",
        required: false,
        description: "When true, displays the text in red with an error icon",
      },
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "The text content to display",
      },
      {
        name: "className",
        type: "string",
        required: false,
        description: "Additional CSS classes to apply to the component",
      },
    ],
  },
  relatedComponents: ["Input", "Textarea", "Label"],
};

