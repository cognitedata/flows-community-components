import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import { CodeBlock, CodeBlockCollapseButton, CodeBlockCopyButton } from "./code-block";

const meta: Meta<typeof CodeBlock> = {
  title: "Primitives/Code Block",
  component: CodeBlock,
  tags: ["autodocs"],
  argTypes: {
    code: {
      control: "text",
      description: "The code to display",
      table: {
        category: "Content",
        type: { summary: "string" },
      },
    },
    language: {
      control: "select",
      options: ["typescript", "javascript", "python", "json", "css", "html", "bash", "markdown"],
      description: "Programming language for syntax highlighting",
      table: {
        category: "Appearance",
        type: { summary: "BundledLanguage" },
      },
    },
    showLineNumbers: {
      control: "boolean",
      description: "Show line numbers",
      table: {
        category: "Appearance",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    collapsed: {
      control: "boolean",
      description: "Start in collapsed state",
      table: {
        category: "Behavior",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    copyText: {
      control: "text",
      description: "Custom text to copy (defaults to code)",
      table: {
        category: "Behavior",
        type: { summary: "string" },
      },
    },
  },
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-[600px]">
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

  bash: `#!/bin/bash

# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test`,
};

/**
 * Default code block.
 */
export const Default: Story = {
  render: () => (
    <CodeBlock code={sampleCode.typescript} language="typescript">
      <CodeBlockCopyButton />
    </CodeBlock>
  ),
  parameters: {
    docs: {
      description: {
        story: "Default code block with TypeScript syntax highlighting.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    // Verify code block renders
    const codeBlock = canvasElement.querySelector(".group\\/code-block");
    await expect(codeBlock).toBeInTheDocument();
  },
};

/**
 * Code block with line numbers.
 */
export const WithLineNumbers: Story = {
  render: () => (
    <CodeBlock code={sampleCode.typescript} language="typescript" showLineNumbers>
      <CodeBlockCopyButton />
    </CodeBlock>
  ),
  parameters: {
    docs: {
      description: {
        story: "Code block with line numbers displayed.",
      },
    },
  },
};

/**
 * Collapsible code block.
 */
export const Collapsible: Story = {
  render: () => (
    <CodeBlock
      code={sampleCode.typescript}
      language="typescript"
      collapsed
      style={
        {
          "--code-block-collapsed-height": "100px",
          "--code-block-fade-height": "50px",
        } as React.CSSProperties
      }
    >
      <CodeBlockCollapseButton />
      <CodeBlockCopyButton />
    </CodeBlock>
  ),
  parameters: {
    docs: {
      description: {
        story: "Code block that starts collapsed and can be expanded.",
      },
    },
  },
};

/**
 * JavaScript code.
 */
export const JavaScript: Story = {
  render: () => (
    <CodeBlock code={sampleCode.javascript} language="javascript">
      <CodeBlockCopyButton />
    </CodeBlock>
  ),
  parameters: {
    docs: {
      description: {
        story: "JavaScript code with syntax highlighting.",
      },
    },
  },
};

/**
 * Python code.
 */
export const Python: Story = {
  render: () => (
    <CodeBlock code={sampleCode.python} language="python">
      <CodeBlockCopyButton />
    </CodeBlock>
  ),
  parameters: {
    docs: {
      description: {
        story: "Python code with syntax highlighting.",
      },
    },
  },
};

/**
 * JSON code.
 */
export const JSON: Story = {
  render: () => (
    <CodeBlock code={sampleCode.json} language="json">
      <CodeBlockCopyButton />
    </CodeBlock>
  ),
  parameters: {
    docs: {
      description: {
        story: "JSON code with syntax highlighting.",
      },
    },
  },
};

/**
 * Bash/Shell code.
 */
export const Bash: Story = {
  render: () => (
    <CodeBlock code={sampleCode.bash} language="bash">
      <CodeBlockCopyButton />
    </CodeBlock>
  ),
  parameters: {
    docs: {
      description: {
        story: "Bash/Shell script with syntax highlighting.",
      },
    },
  },
};

/**
 * Short code snippet.
 */
export const ShortSnippet: Story = {
  render: () => (
    <CodeBlock code="const greeting = 'Hello, World!';" language="typescript">
      <CodeBlockCopyButton />
    </CodeBlock>
  ),
  parameters: {
    docs: {
      description: {
        story: "Short single-line code snippet.",
      },
    },
  },
};

/**
 * Without copy button.
 */
export const WithoutCopyButton: Story = {
  render: () => <CodeBlock code={sampleCode.json} language="json" />,
  parameters: {
    docs: {
      description: {
        story: "Code block without the copy button.",
      },
    },
  },
};

/**
 * Custom copy text.
 */
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
    docs: {
      description: {
        story: "Code block with custom copy text (copies a modified version).",
      },
    },
  },
};

/**
 * Visual regression testing.
 */
export const VisualRegression: Story = {
  render: () => (
    <div className="space-y-8">
      {/* TypeScript */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">TypeScript</h3>
        <CodeBlock
          code={`function greet(name: string): string {
  return \`Hello, \${name}!\`;
}`}
          language="typescript"
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </div>

      {/* With line numbers */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">With Line Numbers</h3>
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

      {/* JSON */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">JSON</h3>
        <CodeBlock code='{ "key": "value" }' language="json">
          <CodeBlockCopyButton />
        </CodeBlock>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Comprehensive visual overview for regression testing.",
      },
    },
    chromatic: {
      disableSnapshot: false,
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[500px] p-4">
        <Story />
      </div>
    ),
  ],
};

/**
 * Interactive playground.
 */
export const Playground: Story = {
  args: {
    code: sampleCode.typescript,
    language: "typescript",
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
    docs: {
      description: {
        story: "Interactive playground - use controls to experiment with code block props.",
      },
    },
  },
};
