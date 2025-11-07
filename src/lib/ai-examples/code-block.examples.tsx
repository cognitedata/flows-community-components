import {
  CodeBlock,
  CodeBlockCopyButton,
} from "@/components/ai-elements/code-block";
import type { ComponentExamples } from "@/lib/component-examples/types";

function BasicCodeBlockDemo() {
  return (
    <CodeBlock code="console.log('Hello, world!')" language="javascript">
      <CodeBlockCopyButton />
    </CodeBlock>
  );
}

function WithSyntaxHighlightingDemo() {
  const code = `function greet(name: string) {
  return \`Hello, \${name}!\`;
}

greet('World');`;

  return (
    <CodeBlock code={code} language="typescript" showLineNumbers>
      <CodeBlockCopyButton />
    </CodeBlock>
  );
}

export const codeBlockExamples: ComponentExamples = {
  basic: {
    title: "Basic Code Block",
    description: "Syntax-highlighted code with copy button",
    component: BasicCodeBlockDemo,
    difficulty: "beginner",
    code: `import { CodeBlock, CodeBlockCopyButton } from "@/components/ai-elements/cognite/code-block"

export function BasicCodeBlockDemo() {
  return (
    <CodeBlock code="console.log('Hello')" language="javascript">
      <CodeBlockCopyButton />
    </CodeBlock>
  )
}`,
  },

  withLineNumbers: {
    title: "Code Block with Line Numbers",
    description: "Syntax highlighting with line numbers",
    component: WithSyntaxHighlightingDemo,
    difficulty: "beginner",
    code: `import { CodeBlock, CodeBlockCopyButton } from "@/components/ai-elements/cognite/code-block"

export function CodeBlockWithLineNumbersDemo() {
  const code = \`function example() {
  return 'Hello'
}\`

  return (
    <CodeBlock code={code} language="typescript" showLineNumbers>
      <CodeBlockCopyButton />
    </CodeBlock>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const codeBlockMeta = {
  name: "Code Block",
  description:
    "Provides syntax highlighting, line numbers, and copy to clipboard functionality for code blocks.",
  importPath: "@/components/ai-elements/cognite/code-block",
};
