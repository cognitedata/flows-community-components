'use client';

import {
  Message,
  MessageContent,
  MessageAvatar,
  MessageAvatarIcon,
  MessageActions,
  MessageAction,
  MessageResponse,
} from '@/components/ui/aura/message';
import type { ComponentExamples } from '@/lib/component-examples/types';
import {
  InlineCitation,
  InlineCitationLink,
} from '@/components/ui/aura/inline-citation';
import {
  IconHash,
  IconFile,
  IconPhoto,
  IconTimeline,
  IconCopy,
  IconDownload,
  IconTool,
  IconRefresh,
  IconWheel,
} from '@tabler/icons-react';
import {
  CodeBlock,
  CodeBlockCollapseButton,
  CodeBlockCopyButton,
} from '@/components/ui/aura/code-block';

function Demo() {
  return (
    <div className="flex flex-col space-y-4 w-full gap-2">
      <Message>
        <MessageContent>
          <span>
            There are abnormal vibration levels on{' '}
            <InlineCitation>
              <InlineCitationLink
                href="https://example.com/pump/21PT1019"
                target="_blank"
                icon={IconHash}
                variant="nordic"
              >
                21PT1019
              </InlineCitationLink>
            </InlineCitation>
          </span>
        </MessageContent>
      </Message>

      <Message isResponse={true}>
        <MessageAvatar variant="nordic">
          <MessageAvatarIcon>
            <IconWheel />
          </MessageAvatarIcon>
        </MessageAvatar>
        <MessageContent className="flex flex-col gap-2">
          <span>
            I analyzed the sensor data and found that vibration levels on{' '}
            <InlineCitation>
              <InlineCitationLink
                href="https://example.com/pump/21PT1019"
                target="_blank"
                icon={IconHash}
                variant="nordic"
              >
                21PT1019
              </InlineCitationLink>
            </InlineCitation>{' '}
            exceeded normal thresholds at 03:15. This correlates with a 12%
            increase in RPM during that window.
          </span>
          <div className="flex flex-row gap-2">
            <InlineCitation>
              <InlineCitationLink
                href="https://example.com/chart/timeline"
                target="_blank"
                icon={IconTimeline}
              >
                Time series
              </InlineCitationLink>
            </InlineCitation>
            <InlineCitation>
              <InlineCitationLink
                href="https://example.com/image/image1.jpg"
                target="_blank"
                icon={IconPhoto}
              >
                pumpB.jpg
              </InlineCitationLink>
            </InlineCitation>
            <InlineCitation>
              <InlineCitationLink
                href="https://example.com/documentation.pdf"
                target="_blank"
                icon={IconFile}
              >
                pumpB.pdf
              </InlineCitationLink>
            </InlineCitation>
          </div>
          <MessageActions>
            <MessageAction size="icon-sm" label="Copy" tooltip="Copy">
              <IconCopy className="w-3 h-3" />
            </MessageAction>
            <MessageAction size="icon-sm" label="Download" tooltip="Download">
              <IconDownload className="w-3 h-3" />
            </MessageAction>
            <MessageAction
              size="icon-sm"
              label="Explain Tool Call(s)"
              tooltip="Explain Tool Call(s)"
            >
              <IconTool className="w-3 h-3" />
            </MessageAction>
            <MessageAction size="icon-sm" label="Retry" tooltip="Retry">
              <IconRefresh className="w-3 h-3" />
            </MessageAction>
          </MessageActions>
        </MessageContent>
      </Message>
    </div>
  );
}

function WithCodeBlockDemo() {
  const code = `async function analyzeVibrationData(timeseriesId: string) {
  const data = await fetchTimeseries(timeseriesId);
  const anomalies = detectAnomalies(data);

  return anomalies.filter(a => a.severity > 0.8);
}`;

  return (
    <div className="flex flex-col space-y-4 w-full gap-2">
      <Message isResponse={false}>
        <MessageContent>
          Can you show me how to analyze vibration data using TypeScript?
        </MessageContent>
      </Message>

      <Message isResponse={true}>
        <MessageAvatar variant="nordic">
          <MessageAvatarIcon>
            <IconWheel />
          </MessageAvatarIcon>
        </MessageAvatar>
        <MessageContent className="flex flex-col gap-2">
          <CodeBlock
            code={code}
            language="typescript"
            showLineNumbers
            className="-mt-1"
          >
            <CodeBlockCopyButton />
            <CodeBlockCollapseButton />
          </CodeBlock>
          <MessageActions>
            <MessageAction size="icon-sm" label="Copy" tooltip="Copy">
              <IconCopy className="w-3 h-3" />
            </MessageAction>
            <MessageAction size="icon-sm" label="Download" tooltip="Download">
              <IconDownload className="w-3 h-3" />
            </MessageAction>
            <MessageAction
              size="icon-sm"
              label="Explain Tool Call(s)"
              tooltip="Explain Tool Call(s)"
            >
              <IconTool className="w-3 h-3" />
            </MessageAction>
            <MessageAction size="icon-sm" label="Retry" tooltip="Retry">
              <IconRefresh className="w-3 h-3" />
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
            <MessageAction size="icon-sm" label="Retry" tooltip="Retry">
              <IconRefresh className="w-3 h-3" />
            </MessageAction>
          </MessageActions>
        </MessageContent>
      </Message>
    </div>
  );
}

export const messageExamples: ComponentExamples = {
  contained: {
    title: 'Message',
    description:
      'Messages with background containers for clear visual separation',
    component: Demo,
    difficulty: 'beginner',
    code: `"use client"

import { Message, MessageContent, MessageAvatar, MessageAvatarIcon, MessageActions, MessageAction } from "@/components/ui/aura/message"
import {
  InlineCitation,
  InlineCitationLink,
} from "@/components/ui/aura/inline-citation"
import { IconHash, IconFile, IconPhoto, IconTimeline, IconCopy, IconDownload, IconTool, IconRefresh, IconWheel } from "@tabler/icons-react"

export function Demo() {
  return (
    <div className="flex flex-col space-y-4 w-full gap-2">
      <Message>
        <MessageContent>
          <span>
            There are abnormal vibration levels on{' '}
            <InlineCitation>
              <InlineCitationLink href="https://example.com/pump/21PT1019" target="_blank" icon={IconHash} variant="nordic">
                21PT1019
              </InlineCitationLink>
            </InlineCitation>
          </span>
        </MessageContent>
      </Message>

      <Message isResponse={true}>
        <MessageAvatar variant="nordic">
          <MessageAvatarIcon>
            <IconWheel />
          </MessageAvatarIcon>
        </MessageAvatar>
        <MessageContent className="flex flex-col gap-2">
          <span>
            I analyzed the sensor data and found that vibration levels on{' '}
            <InlineCitation>
              <InlineCitationLink href="https://example.com/pump/21PT1019" target="_blank" icon={IconHash} variant="nordic">
                21PT1019
              </InlineCitationLink>
            </InlineCitation>
            {' '}exceeded normal thresholds at 03:15. This correlates with a 12% increase in RPM during that window.
          </span>
          <div className="flex flex-row gap-2">
            <InlineCitation>
              <InlineCitationLink href="https://example.com/chart/timeline" target="_blank" icon={IconTimeline}>
                Time series
              </InlineCitationLink>
            </InlineCitation>
            <InlineCitation>
              <InlineCitationLink href="https://example.com/image/image1.jpg" target="_blank" icon={IconPhoto}>
                pumpB.jpg
              </InlineCitationLink>
            </InlineCitation>
            <InlineCitation>
              <InlineCitationLink href="https://example.com/documentation.pdf" target="_blank" icon={IconFile}>
                pumpB.pdf
              </InlineCitationLink>
            </InlineCitation>
          </div>
          <MessageActions>
            <MessageAction size="icon-sm" label="Copy" tooltip="Copy">
              <IconCopy className="w-3 h-3" />
            </MessageAction>
            <MessageAction size="icon-sm" label="Download" tooltip="Download">
              <IconDownload className="w-3 h-3" />
            </MessageAction>
            <MessageAction size="icon-sm" label="Explain Tool Call(s)" tooltip="Explain Tool Call(s)">
              <IconTool className="w-3 h-3" />
            </MessageAction>
            <MessageAction size="icon-sm" label="Retry" tooltip="Retry">
              <IconRefresh className="w-3 h-3" />
            </MessageAction>
          </MessageActions>
        </MessageContent>
      </Message>
    </div>
  )
}`,
  },

  withCodeBlock: {
    title: 'Message with Code Block',
    description:
      'Assistant message containing a code block with syntax highlighting',
    component: WithCodeBlockDemo,
    difficulty: 'beginner',
    code: `import { Message, MessageContent, MessageAvatar, MessageAvatarIcon, MessageActions, MessageAction } from "@/components/ui/aura/message"
import { CodeBlock, CodeBlockCollapseButton, CodeBlockCopyButton } from "@/components/ui/aura/code-block"
import { IconWheel, IconCopy, IconDownload, IconTool, IconRefresh } from "@tabler/icons-react"

export function WithCodeBlockDemo() {
  const code = \`async function analyzeVibrationData(timeseriesId: string) {
  const data = await fetchTimeseries(timeseriesId);
  const anomalies = detectAnomalies(data);

  return anomalies.filter(a => a.severity > 0.8);
}\`

  return (
    <div className="flex flex-col space-y-4 w-full gap-2">
      <Message isResponse={false}>
        <MessageContent>
          Can you show me how to analyze vibration data using TypeScript?
        </MessageContent>
      </Message>

      <Message isResponse={true}>
        <MessageAvatar variant="nordic">
          <MessageAvatarIcon>
            <IconWheel />
          </MessageAvatarIcon>
        </MessageAvatar>
        <MessageContent className="flex flex-col gap-2">
          <CodeBlock
            code={code}
            language="typescript"
            showLineNumbers
            className="-mt-1"
          >
            <CodeBlockCopyButton />
            <CodeBlockCollapseButton />
          </CodeBlock>
          <MessageActions>
            <MessageAction size="icon-sm" label="Copy" tooltip="Copy">
              <IconCopy className="w-3 h-3" />
            </MessageAction>
            <MessageAction size="icon-sm" label="Download" tooltip="Download">
              <IconDownload className="w-3 h-3" />
            </MessageAction>
            <MessageAction size="icon-sm" label="Explain Tool Call(s)" tooltip="Explain Tool Call(s)">
              <IconTool className="w-3 h-3" />
            </MessageAction>
            <MessageAction size="icon-sm" label="Retry" tooltip="Retry">
              <IconRefresh className="w-3 h-3" />
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
import { IconWheel, IconCopy, IconRefresh } from "@tabler/icons-react"

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
            <MessageAction size="icon-sm" label="Retry" tooltip="Retry">
              <IconRefresh className="w-3 h-3" />
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
