import {
  CodeBlock,
  CodeBlockCollapseButton,
  CodeBlockCopyButton,
} from '@/components/ui/cognite/code-block';
import type { ComponentExamples } from '@/lib/component-examples/types';

function BasicCodeBlockDemo() {
  return (
    <CodeBlock code="console.log('Hello, world!')" language="javascript">
      <CodeBlockCollapseButton />
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
      <CodeBlockCollapseButton />
    </CodeBlock>
  );
}

function PreCollapsedDemo() {
  const code = `function greet(name: string) {
  return \`Hello, \${name}!\`;
}

greet('World');`;

  return (
    <CodeBlock code={code} language="typescript" showLineNumbers collapsed>
      <CodeBlockCopyButton />
      <CodeBlockCollapseButton />
    </CodeBlock>
  );
}

export const codeBlockExamples: ComponentExamples = {
  basic: {
    title: 'Basic Code Block',
    description: 'Syntax-highlighted code with copy and collapse buttons',
    component: BasicCodeBlockDemo,
    difficulty: 'beginner',
    code: `import { CodeBlock, CodeBlockCollapseButton, CodeBlockCopyButton } from "@/components/ai-elements/cognite/code-block"

export function BasicCodeBlockDemo() {
  return (
    <CodeBlock code="console.log('Hello, world!')" language="javascript">
      <CodeBlockCollapseButton />
      <CodeBlockCopyButton />
    </CodeBlock>
  )
}`,
  },

  withLineNumbers: {
    title: 'Code Block with Line Numbers',
    description:
      'Syntax highlighting with line numbers, collapse and copy buttons',
    component: WithSyntaxHighlightingDemo,
    difficulty: 'beginner',
    code: `import { CodeBlock, CodeBlockCollapseButton, CodeBlockCopyButton } from "@/components/ai-elements/cognite/code-block"

export function WithSyntaxHighlightingDemo() {
  const code = \`function greet(name: string) {
  return \\\`Hello, \\\${name}!\\\`;
}

greet('World');\`

  return (
    <CodeBlock code={code} language="typescript" showLineNumbers>
      <CodeBlockCopyButton />
      <CodeBlockCollapseButton />
    </CodeBlock>
  )
}`,
  },

  preCollapsed: {
    title: 'Pre-collapsed Code Block',
    description: 'Code block that starts in a collapsed state',
    component: PreCollapsedDemo,
    difficulty: 'beginner',
    code: `import { CodeBlock, CodeBlockCollapseButton, CodeBlockCopyButton } from "@/components/ai-elements/cognite/code-block"

export function PreCollapsedDemo() {
  const code = \`function greet(name: string) {
  return \\\`Hello, \\\${name}!\\\`;
}

greet('World');\`

  return (
    <CodeBlock code={code} language="typescript" showLineNumbers collapsed>
      <CodeBlockCopyButton />
      <CodeBlockCollapseButton />
    </CodeBlock>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const codeBlockMeta = {
  name: 'Code Block',
  description:
    'Provides syntax highlighting, line numbers, and copy to clipboard functionality for code blocks.',
  importPath: '@/components/ai-elements/cognite/code-block',
};
