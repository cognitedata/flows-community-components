import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import {
  CodeBlock,
  CodeBlockCollapseButton,
  CodeBlockCopyButton,
} from './code-block';
const meta: Meta<typeof CodeBlock> = {
  title: 'AI/Code Block',
  component: CodeBlock,
  tags: ['autodocs'],
  argTypes: {
    code: {
      control: 'text',
      table: {
        category: 'Content',
        type: {
          summary: 'string',
        },
      },
    },
    language: {
      control: 'select',
      options: [
        'typescript',
        'javascript',
        'python',
        'json',
        'css',
        'html',
        'bash',
        'markdown',
      ],
      table: {
        category: 'Variants/Styling',
        type: {
          summary: 'BundledLanguage',
        },
      },
    },
    showLineNumbers: {
      control: 'boolean',
      table: {
        category: 'Variants/Styling',
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    collapsed: {
      control: 'boolean',
      table: {
        category: 'Behavior',
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    copyText: {
      control: 'text',
      table: {
        category: 'Behavior',
        type: {
          summary: 'string',
        },
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-150">
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof CodeBlock>;
const sampleCode = {
  typescript: `interface User {
  id: string;
  name: string;
  email: string;
}

function greet(user: User): string {
  return \`Hello, \${user.name}!\`;
}

const user: User = {
  id: "1",
  name: "John Doe",
  email: "john@example.com"
};

console.log(greet(user));`,
  javascript: `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

for (let i = 0; i < 10; i++) {
  console.log(fibonacci(i));
}`,
  python: `def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)

numbers = [3, 6, 8, 10, 1, 2, 1]
print(quicksort(numbers))`,
  json: `{
  "name": "aura",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.2.0",
    "typescript": "^5.0.0"
  }
}`,
  html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Sample HTML</title>
</head>
<body>
  <h1>Hello, World!</h1>
  <p>This is a sample HTML code block.</p>
</body>
</html>`,
  bash: `#!/bin/bash

# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test`,
};
export const Basic: Story = {
  render: () => (
    <CodeBlock code={sampleCode.typescript} language="typescript">
      <CodeBlockCopyButton />
    </CodeBlock>
  ),
  parameters: {
    order: 1,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const matches = await canvas.findAllByText(
      (_, element) =>
        element?.tagName.toLowerCase() === 'code' &&
        element.textContent?.includes('interface User') === true
    );
    await expect(matches.length).toBeGreaterThanOrEqual(1);
    const buttons = await canvas.findAllByRole('button', { hidden: true });
    await expect(buttons.length).toBeGreaterThanOrEqual(1);
  },
};
export const WithLineNumbers: Story = {
  render: () => (
    <CodeBlock
      code={sampleCode.typescript}
      language="typescript"
      showLineNumbers
    >
      <CodeBlockCopyButton />
    </CodeBlock>
  ),
  parameters: {
    order: 2,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const matches = await canvas.findAllByText(
      (_, element) =>
        element?.tagName.toLowerCase() === 'code' &&
        element.textContent?.includes('interface User') === true
    );
    await expect(matches.length).toBeGreaterThanOrEqual(1);
  },
};
export const Collapsible: Story = {
  render: () => (
    <CodeBlock code={sampleCode.typescript} language="typescript" collapsed>
      <CodeBlockCollapseButton />
      <CodeBlockCopyButton />
    </CodeBlock>
  ),
  parameters: {
    order: 3,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = await canvas.findAllByRole('button', {
      hidden: true,
    });
    await expect(buttons.length).toBeGreaterThanOrEqual(1);
  },
};
export const JavaScript: Story = {
  render: () => (
    <CodeBlock code={sampleCode.javascript} language="javascript">
      <CodeBlockCopyButton />
    </CodeBlock>
  ),
  parameters: {
    order: 4,
  },
};
export const Python: Story = {
  render: () => (
    <CodeBlock code={sampleCode.python} language="python">
      <CodeBlockCopyButton />
    </CodeBlock>
  ),
  parameters: {
    order: 5,
  },
};
export const JSONExample: Story = {
  render: () => (
    <CodeBlock code={sampleCode.json} language="json">
      <CodeBlockCopyButton />
    </CodeBlock>
  ),
  parameters: {
    order: 6,
  },
};
export const HTMLExample: Story = {
  render: () => (
    <CodeBlock code={sampleCode.html} language="html">
      <CodeBlockCopyButton />
    </CodeBlock>
  ),
  parameters: {
    order: 7,
  },
};
export const Bash: Story = {
  render: () => (
    <CodeBlock code={sampleCode.bash} language="bash">
      <CodeBlockCopyButton />
    </CodeBlock>
  ),
  parameters: {
    order: 8,
  },
};
export const ShortSnippet: Story = {
  render: () => (
    <CodeBlock code="const greeting = 'Hello, World!';" language="typescript">
      <CodeBlockCopyButton />
    </CodeBlock>
  ),
  parameters: {
    order: 9,
  },
};
export const LongLines: Story = {
  render: () => (
    <CodeBlock
      code={`// This is a very long comment that extends far beyond the typical viewport width and demonstrates the horizontal scrolling functionality of the code block component
const veryLongVariableName = "This is a very long string that contains a lot of text and will definitely require horizontal scrolling to see the entire content properly";

function calculateSomethingWithAVeryLongFunctionName(parameterOne: string, parameterTwo: number, parameterThree: boolean, parameterFour: object): { resultOne: string; resultTwo: number; resultThree: boolean } {
  return { resultOne: "A very long result string that extends beyond normal viewport widths", resultTwo: 42, resultThree: true };
}

const configurationObject = { apiEndpoint: "https://api.example.com/v1/users/profiles/details/extended/with/very/long/path", timeout: 30000, retries: 3, headers: { "Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" } };`}
      language="typescript"
    >
      <CodeBlockCopyButton />
    </CodeBlock>
  ),
  parameters: {
    order: 10,
  },
};
export const WithoutCopyButton: Story = {
  render: () => <CodeBlock code={sampleCode.json} language="json" />,
  parameters: {
    order: 11,
  },
};
export const CustomCopyText: Story = {
  render: () => (
    <CodeBlock
      code={sampleCode.bash}
      language="bash"
      copyText="npm install && npm run build && npm test"
    >
      <CodeBlockCopyButton />
    </CodeBlock>
  ),
  parameters: {
    order: 12,
  },
};
export const CollapsedWithLineNumbers: Story = {
  render: () => (
    <CodeBlock
      code={sampleCode.typescript}
      language="typescript"
      collapsed
      showLineNumbers
    >
      <CodeBlockCollapseButton />
      <CodeBlockCopyButton />
    </CodeBlock>
  ),
  parameters: {
    order: 13,
  },
};
export const EmptyCode: Story = {
  render: () => (
    <CodeBlock code="" language="typescript">
      <CodeBlockCopyButton />
    </CodeBlock>
  ),
  parameters: {
    order: 14,
  },
};
export const SingleLineWithCollapseButton: Story = {
  render: () => (
    <CodeBlock code="const x = 42;" language="typescript">
      <CodeBlockCollapseButton />
      <CodeBlockCopyButton />
    </CodeBlock>
  ),
  parameters: {
    order: 15,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = await canvas.findAllByRole('button', {
      hidden: true,
    });
    await expect(buttons).toHaveLength(1);
  },
};
export const VisualRegression: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">
          TypeScript
        </h3>
        <CodeBlock
          code={`function greet(name: string): string {
  return \`Hello, \${name}!\`;
}`}
          language="typescript"
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">
          With Line Numbers
        </h3>
        <CodeBlock
          code={`const a = 1;
const b = 2;
const c = a + b;`}
          language="typescript"
          showLineNumbers
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">JSON</h3>
        <CodeBlock code='{ "key": "value" }' language="json">
          <CodeBlockCopyButton />
        </CodeBlock>
      </div>
    </div>
  ),
  parameters: {
    order: 16,
    chromatic: {
      disableSnapshot: false,
    },
  },
  decorators: [
    (Story) => (
      <div className="p-4">
        <Story />
      </div>
    ),
  ],
};
export const Playground: Story = {
  args: {
    code: sampleCode.typescript,
    language: 'typescript',
    showLineNumbers: false,
    collapsed: false,
  },
  render: (args) => (
    <CodeBlock {...args}>
      <CodeBlockCollapseButton />
      <CodeBlockCopyButton />
    </CodeBlock>
  ),
  parameters: {
    order: 99,
  },
};
