'use client';

import {
  Message,
  MessageContent,
  MessageAvatar,
  MessageAvatarIcon,
  MessageActions,
  MessageAction,
  MessageResponse,
  MessageBranch,
  MessageBranchContent,
  MessageBranchSelector,
  MessageBranchPrevious,
  MessageBranchNext,
  MessageBranchPage,
} from '@/components/ui/aura/message';
import type { ComponentExamples } from '@/lib/component-examples/types';
import {
  CodeBlock,
  CodeBlockCopyButton,
} from '@/components/ui/aura/code-block';
import { useState } from 'react';
import {
  IconCopy,
  IconDownload,
  IconWheel,
  IconCheck,
  IconRefresh,
} from '@tabler/icons-react';

function MessageDemo() {
  const [copied, setCopied] = useState(false);
  const [branches, setBranches] = useState<string[]>([
    'I analyzed the sensor data and found vibration levels on pump 21PT1019 exceeded normal thresholds at 03:15. This correlates with a 12% increase in RPM during that window.',
  ]);
  const [currentBranchIndex, setCurrentBranchIndex] = useState(0);

  const alternativeResponse = 'Based on the time series analysis, pump 21PT1019 showed elevated vibration patterns starting at 03:15. The root cause appears to be mechanical imbalance, indicated by the frequency spectrum showing peaks at 1x running speed.';

  const handleRetry = () => {
    if (branches.length >= 2) return;
    setBranches([...branches, alternativeResponse]);
    setCurrentBranchIndex(1);
  };

  const handleCopy = () => {
    const currentBranch = branches[currentBranchIndex];
    navigator.clipboard.writeText(currentBranch);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const currentBranch = branches[currentBranchIndex];
    const blob = new Blob([currentBranch], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'response.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col space-y-4 w-full gap-2">
      <Message>
        <MessageContent>
          What caused the vibration spike on pump 21PT1019?
        </MessageContent>
      </Message>

      <MessageBranch
        key={branches.length}
        defaultBranch={currentBranchIndex}
        onBranchChange={(index) => setCurrentBranchIndex(index)}
      >
        <MessageBranchContent>
          {branches.map((branch, index) => (
            <Message key={index} isResponse={true}>
              <MessageAvatar variant="nordic">
                <MessageAvatarIcon>
                  <IconWheel />
                </MessageAvatarIcon>
              </MessageAvatar>
              <MessageContent className="flex flex-col gap-2">
                <MessageResponse>{branch}</MessageResponse>
                <MessageActions>
                  <MessageAction
                    size="icon-sm"
                    label={copied ? 'Copied' : 'Copy'}
                    tooltip={copied ? 'Copied' : 'Copy'}
                    onClick={handleCopy}
                  >
                    {copied ? (
                      <IconCheck className="w-3 h-3" />
                    ) : (
                      <IconCopy className="w-3 h-3" />
                    )}
                  </MessageAction>
                  <MessageAction
                    size="icon-sm"
                    label="Download"
                    tooltip="Download"
                    onClick={handleDownload}
                  >
                    <IconDownload className="w-3 h-3" />
                  </MessageAction>
                  <MessageAction
                    size="icon-sm"
                    label="Retry"
                    tooltip="Retry"
                    onClick={handleRetry}
                    disabled={branches.length >= 2}
                  >
                    <IconRefresh className="w-3 h-3" />
                  </MessageAction>
                  {branches.length > 1 && (
                    <MessageBranchSelector from="assistant" className="px-0">
                      <MessageBranchPrevious />
                      <MessageBranchPage />
                      <MessageBranchNext />
                    </MessageBranchSelector>
                  )}
                </MessageActions>
              </MessageContent>
            </Message>
          ))}
        </MessageBranchContent>
      </MessageBranch>
    </div>
  );
}

function WithCodeBlockDemo() {
  const [copied, setCopied] = useState(false);

  const codeExample = `import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-lg">Count: {count}</p>
      <div className="flex gap-2">
        <button onClick={() => setCount(count - 1)}>
          Decrement
        </button>
        <button onClick={() => setCount(count + 1)}>
          Increment
        </button>
      </div>
    </div>
  );
}`;

  const fullResponse = `Here&apos;s a React component example that demonstrates state management:\n\n${codeExample}\n\nThis component uses the useState hook to track a count value and provides buttons to increment or decrement it.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullResponse);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([fullResponse], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'response.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col space-y-4 w-full gap-2">
      <Message>
        <MessageContent>
          Can you show me a simple React counter component?
        </MessageContent>
      </Message>

      <Message isResponse={true}>
        <MessageAvatar variant="nordic">
          <MessageAvatarIcon>
            <IconWheel />
          </MessageAvatarIcon>
        </MessageAvatar>
        <MessageContent className="flex flex-col gap-2">
          <div className="flex flex-col gap-3">
            <p className="text-sm">
              Here&apos;s a React component example that demonstrates state
              management:
            </p>
            <CodeBlock code={codeExample} language="tsx" showLineNumbers>
              <CodeBlockCopyButton />
            </CodeBlock>
            <p className="text-sm text-muted-foreground">
              This component uses the <code className="text-xs">useState</code>{' '}
              hook to track a count value and provides buttons to increment or
              decrement it.
            </p>
          </div>
          <MessageActions>
            <MessageAction
              size="icon-sm"
              label={copied ? 'Copied' : 'Copy'}
              tooltip={copied ? 'Copied' : 'Copy'}
              onClick={handleCopy}
            >
              {copied ? (
                <IconCheck className="w-3 h-3" />
              ) : (
                <IconCopy className="w-3 h-3" />
              )}
            </MessageAction>
            <MessageAction
              size="icon-sm"
              label="Download"
              tooltip="Download"
              onClick={handleDownload}
            >
              <IconDownload className="w-3 h-3" />
            </MessageAction>
          </MessageActions>
        </MessageContent>
      </Message>
    </div>
  );
}

function MessageResponseDemo() {
  const markdownContent = `# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

This is a paragraph with **bold text**, *italic text*, and \`inline code\`. You can also combine **_bold and italic_** together.

Here's a [link to documentation](https://example.com) that demonstrates anchor styling.

---

## Lists

### Unordered List
- First item
- Second item with **bold**
- Third item with \`code\`

### Ordered List
1. Step one
2. Step two
3. Step three

---

## Blockquote

> This is a blockquote. It's commonly used to highlight important information or cite external sources.

---

## Code Block

Code blocks use the Aura CodeBlock component with Shiki syntax highlighting:

\`\`\`typescript
interface PumpData {
  id: string;
  vibrationLevel: number;
  timestamp: Date;
}

async function analyzePump(data: PumpData): Promise<boolean> {
  return data.vibrationLevel > 0.8;
}
\`\`\`

---

## Table

| Sensor ID | Location | Status | Reading |
|-----------|----------|--------|---------|
| 21PT1019 | Pump A | Active | 0.72 |
| 21PT1020 | Pump B | Warning | 0.89 |
| 21PT1021 | Pump C | Critical | 1.24 |

---

## Maths (LaTeX)

The quadratic formula is: $$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$

Inline maths example: The sum formula is $$\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}$$.
`;

  return (
    <div className="flex flex-col space-y-4 w-full gap-2">
      <Message isResponse={false}>
        <MessageContent>
          Can you show me all the different formatting options available?
        </MessageContent>
      </Message>

      <Message isResponse={true}>
        <MessageAvatar variant="nordic">
          <MessageAvatarIcon>
            <IconWheel />
          </MessageAvatarIcon>
        </MessageAvatar>
        <MessageContent className="flex flex-col gap-2">
          <MessageResponse>{markdownContent}</MessageResponse>
          <MessageActions>
            <MessageAction size="icon-sm" label="Copy" tooltip="Copy">
              <IconCopy className="w-3 h-3" />
            </MessageAction>
          </MessageActions>
        </MessageContent>
      </Message>
    </div>
  );
}

export const messageExamples: ComponentExamples = {
  basic: {
    title: 'Message',
    description:
      'Chat messages with Copy, Download, and Retry actions. Click Retry to generate an alternative response and navigate between branches.',
    component: MessageDemo,
    difficulty: 'intermediate',
    code: `"use client"

import {
  Message,
  MessageContent,
  MessageAvatar,
  MessageAvatarIcon,
  MessageActions,
  MessageAction,
  MessageResponse,
  MessageBranch,
  MessageBranchContent,
  MessageBranchSelector,
  MessageBranchPrevious,
  MessageBranchNext,
  MessageBranchPage,
} from "@/components/ai-elements/cognite/message"
import { useState } from "react"
import { IconWheel, IconCopy, IconDownload, IconCheck, IconRefresh } from "@tabler/icons-react"

export function MessageDemo() {
  const [copied, setCopied] = useState(false)
  const [branches, setBranches] = useState<string[]>([
    'I analyzed the sensor data and found vibration levels on pump 21PT1019 exceeded normal thresholds at 03:15. This correlates with a 12% increase in RPM during that window.',
  ])
  const [currentBranchIndex, setCurrentBranchIndex] = useState(0)

  const alternativeResponse = 'Based on the time series analysis, pump 21PT1019 showed elevated vibration patterns starting at 03:15. The root cause appears to be mechanical imbalance, indicated by the frequency spectrum showing peaks at 1x running speed.'

  const handleRetry = () => {
    if (branches.length >= 2) return
    setBranches([...branches, alternativeResponse])
    setCurrentBranchIndex(1)
  }

  const handleCopy = () => {
    const currentBranch = branches[currentBranchIndex]
    navigator.clipboard.writeText(currentBranch)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const currentBranch = branches[currentBranchIndex]
    const blob = new Blob([currentBranch], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'response.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col space-y-4 w-full gap-2">
      <Message>
        <MessageContent>
          What caused the vibration spike on pump 21PT1019?
        </MessageContent>
      </Message>

      <MessageBranch
        key={branches.length}
        defaultBranch={currentBranchIndex}
        onBranchChange={(index) => setCurrentBranchIndex(index)}
      >
        <MessageBranchContent>
          {branches.map((branch, index) => (
            <Message key={index} isResponse={true}>
              <MessageAvatar variant="nordic">
                <MessageAvatarIcon>
                  <IconWheel />
                </MessageAvatarIcon>
              </MessageAvatar>
              <MessageContent className="flex flex-col gap-2">
                <MessageResponse>{branch}</MessageResponse>
                <MessageActions>
                  <MessageAction
                    size="icon-sm"
                    label={copied ? 'Copied' : 'Copy'}
                    tooltip={copied ? 'Copied' : 'Copy'}
                    onClick={handleCopy}
                  >
                    {copied ? (
                      <IconCheck className="w-3 h-3" />
                    ) : (
                      <IconCopy className="w-3 h-3" />
                    )}
                  </MessageAction>
                  <MessageAction
                    size="icon-sm"
                    label="Download"
                    tooltip="Download"
                    onClick={handleDownload}
                  >
                    <IconDownload className="w-3 h-3" />
                  </MessageAction>
                  <MessageAction
                    size="icon-sm"
                    label="Retry"
                    tooltip="Retry"
                    onClick={handleRetry}
                    disabled={branches.length >= 2}
                  >
                    <IconRefresh className="w-3 h-3" />
                  </MessageAction>
                  {branches.length > 1 && (
                    <MessageBranchSelector from="assistant" className="px-0">
                      <MessageBranchPrevious />
                      <MessageBranchPage />
                      <MessageBranchNext />
                    </MessageBranchSelector>
                  )}
                </MessageActions>
              </MessageContent>
            </Message>
          ))}
        </MessageBranchContent>
      </MessageBranch>
    </div>
  )
}`,
  },
  withCodeBlock: {
    title: 'With Code Block',
    description:
      'Message with CodeBlock component for syntax-highlighted code, showing only Copy and Download actions.',
    component: WithCodeBlockDemo,
    difficulty: 'beginner',
    code: `"use client"

import {
  Message,
  MessageContent,
  MessageAvatar,
  MessageAvatarIcon,
  MessageActions,
  MessageAction,
} from "@/components/ai-elements/cognite/message"
import { CodeBlock, CodeBlockCopyButton } from "@/components/ai-elements/cognite/code-block"
import { useState } from "react"
import { IconWheel, IconCopy, IconDownload, IconCheck } from "@tabler/icons-react"

export function WithCodeBlockDemo() {
  const [copied, setCopied] = useState(false)

  const codeExample = \`import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-lg">Count: {count}</p>
      <div className="flex gap-2">
        <button onClick={() => setCount(count - 1)}>
          Decrement
        </button>
        <button onClick={() => setCount(count + 1)}>
          Increment
        </button>
      </div>
    </div>
  );
}\`

  const fullResponse = \`Here&apos;s a React component example that demonstrates state management:\\n\\n\${codeExample}\\n\\nThis component uses the useState hook to track a count value and provides buttons to increment or decrement it.\`

  const handleCopy = () => {
    navigator.clipboard.writeText(fullResponse)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([fullResponse], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'response.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col space-y-4 w-full gap-2">
      <Message>
        <MessageContent>
          Can you show me a simple React counter component?
        </MessageContent>
      </Message>

      <Message isResponse={true}>
        <MessageAvatar variant="nordic">
          <MessageAvatarIcon>
            <IconWheel />
          </MessageAvatarIcon>
        </MessageAvatar>
        <MessageContent className="flex flex-col gap-2">
          <div className="flex flex-col gap-3">
            <p className="text-sm">
              Here&apos;s a React component example that demonstrates state management:
            </p>
            <CodeBlock code={codeExample} language="tsx" showLineNumbers>
              <CodeBlockCopyButton />
            </CodeBlock>
            <p className="text-sm text-muted-foreground">
              This component uses the <code className="text-xs">useState</code> hook to track a count value and provides buttons to increment or decrement it.
            </p>
          </div>
          <MessageActions>
            <MessageAction
              size="icon-sm"
              label={copied ? 'Copied' : 'Copy'}
              tooltip={copied ? 'Copied' : 'Copy'}
              onClick={handleCopy}
            >
              {copied ? (
                <IconCheck className="w-3 h-3" />
              ) : (
                <IconCopy className="w-3 h-3" />
              )}
            </MessageAction>
            <MessageAction
              size="icon-sm"
              label="Download"
              tooltip="Download"
              onClick={handleDownload}
            >
              <IconDownload className="w-3 h-3" />
            </MessageAction>
          </MessageActions>
        </MessageContent>
      </Message>
    </div>
  )
}`,
  },

  messageResponse: {
    title: 'MessageResponse (Streamdown)',
    description:
      'Renders markdown content with full formatting support including headings, lists, tables, code blocks (using our design system CodeBlock), maths (LaTeX), and more. Uses Streamdown internally which is optimised for AI streaming responses.',
    component: MessageResponseDemo,
    difficulty: 'intermediate',
    code: `import { Message, MessageContent, MessageAvatar, MessageAvatarIcon, MessageActions, MessageAction, MessageResponse } from "@/components/ui/aura/message"
import { IconWheel, IconCopy } from "@tabler/icons-react"

export function MessageResponseDemo() {
  const markdownContent = \`# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

This is a paragraph with **bold text**, *italic text*, and \\\`inline code\\\`. You can also combine **_bold and italic_** together.

Here's a [link to documentation](https://example.com) that demonstrates anchor styling.

---

## Lists

### Unordered List
- First item
- Second item with **bold**
- Third item with \\\`code\\\`

### Ordered List
1. Step one
2. Step two
3. Step three

---

## Blockquote

> This is a blockquote. It's commonly used to highlight important information or cite external sources.

---

## Code Block

Code blocks use the Aura CodeBlock component with Shiki syntax highlighting:

\\\`\\\`\\\`typescript
interface PumpData {
  id: string;
  vibrationLevel: number;
  timestamp: Date;
}

async function analyzePump(data: PumpData): Promise<boolean> {
  return data.vibrationLevel > 0.8;
}
\\\`\\\`\\\`

---

## Table

| Sensor ID | Location | Status | Reading |
|-----------|----------|--------|---------|
| 21PT1019 | Pump A | Active | 0.72 |
| 21PT1020 | Pump B | Warning | 0.89 |
| 21PT1021 | Pump C | Critical | 1.24 |

---

## Maths (LaTeX)

The quadratic formula is: $$x = \\\\frac{-b \\\\pm \\\\sqrt{b^2 - 4ac}}{2a}$$

Inline maths example: The sum formula is $$\\\\sum_{i=1}^{n} i = \\\\frac{n(n+1)}{2}$$.
\`

  return (
    <div className="flex flex-col space-y-4 w-full gap-2">
      <Message isResponse={false}>
        <MessageContent>
          Can you show me all the different formatting options available?
        </MessageContent>
      </Message>

      <Message isResponse={true}>
        <MessageAvatar variant="nordic">
          <MessageAvatarIcon>
            <IconWheel />
          </MessageAvatarIcon>
        </MessageAvatar>
        <MessageContent className="flex flex-col gap-2">
          <MessageResponse>{markdownContent}</MessageResponse>
          <MessageActions>
            <MessageAction size="icon-sm" label="Copy" tooltip="Copy">
              <IconCopy className="w-3 h-3" />
            </MessageAction>
          </MessageActions>
        </MessageContent>
      </Message>
    </div>
  )
}

/**
 * MessageResponse Streamdown Elements Reference:
 *
 * STANDARD MARKDOWN:
 * - h1-h6: Headings with decreasing sizes and consistent spacing
 * - p: Paragraphs with proper line-height and spacing
 * - strong/b: Bold text (font-medium)
 * - em/i: Italic text
 * - a: Links (styled with foreground-link colour, underline on hover)
 * - blockquote: Quoted text with left border and muted styling
 * - hr: Horizontal rule/divider
 *
 * LISTS:
 * - ul: Unordered lists (disc style)
 * - ol: Ordered lists (decimal style)
 * - li: List items
 *
 * CODE (uses design system's CodeBlock component):
 * - Inline code: Styled with bg-muted, rounded, monospace font
 * - Code blocks: Uses our CodeBlock component with:
 *   - Shiki syntax highlighting (one-light/one-dark-pro themes)
 *   - Copy button on hover
 *   - Supports 200+ languages
 *
 * TABLES (GFM):
 * - table, thead, tbody, tr, th, td
 * - Includes copy (CSV/TSV) and download (CSV/Markdown) controls
 *
 * EXTENDED FEATURES:
 * - LaTeX maths: Rendered via KaTeX ($$block$$ and $inline$ syntax)
 * - Mermaid diagrams: SVG rendering with pan/zoom, download, fullscreen
 * - Images: With download button on hover
 * - Footnotes: Superscript references
 */`,
  },
};

// Component metadata - single source of truth for API documentation
export const messageMeta = {
  name: 'Message',
  description: 'Displays a chat interface message from either a user or an AI.',
  importPath: '@/components/ui/aura/message',
};
