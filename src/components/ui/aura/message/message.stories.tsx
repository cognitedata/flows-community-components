import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  IconCopy,
  IconDownload,
  IconFile,
  IconHash,
  IconPhoto,
  IconRefresh,
  IconTimeline,
  IconTool,
  IconWheel,
} from '@tabler/icons-react';
import { expect, waitFor, within } from 'storybook/test';

import {
  CodeBlock,
  CodeBlockCollapseButton,
  CodeBlockCopyButton,
} from '../code-block';
import { InlineCitation, InlineCitationLink } from '../inline-citation';

import {
  Message,
  MessageAction,
  MessageActions,
  MessageAvatar,
  MessageAvatarIcon,
  MessageContent,
  MessageResponse,
} from '.';
const meta: Meta<typeof Message> = {
  title: 'AI/Message',
  component: Message,
  tags: ['autodocs', 'ai-elements'],
  argTypes: {
    isResponse: {
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
    className: {
      control: 'text',
      table: {
        category: 'Variants/Styling',
      },
    },
    children: {
      control: false,
      table: {
        category: 'Content',
        type: {
          summary: 'ReactNode',
        },
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-200">
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof Message>;
export const Default: Story = {
  parameters: {
    order: 1,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText(/There are abnormal vibration levels on/i)
    ).toBeInTheDocument();
    await expect(
      canvas.getByText(
        /I analyzed the sensor data and found that vibration levels/i
      )
    ).toBeInTheDocument();
    const citations = canvas.getAllByRole('link');
    await expect(citations.length).toBeGreaterThanOrEqual(4);
    const buttons = await canvas.findAllByRole('button');
    await expect(buttons.length).toBe(4);
  },
  render: () => (
    <div className="flex flex-col space-y-4 w-full gap-2">
      <Message data-message>
        <MessageContent>
          <span>
            There are abnormal vibration levels on{' '}
            <InlineCitation>
              <InlineCitationLink
                href="https://cognite.test/pump/21PT1019"
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

      <Message isResponse={true} data-message>
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
                href="https://cognite.test/pump/21PT1019"
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
                href="https://cognite.test/chart/timeline"
                target="_blank"
                icon={IconTimeline}
              >
                Time series
              </InlineCitationLink>
            </InlineCitation>
            <InlineCitation>
              <InlineCitationLink
                href="https://cognite.test/image/image1.jpg"
                target="_blank"
                icon={IconPhoto}
              >
                pumpB.jpg
              </InlineCitationLink>
            </InlineCitation>
            <InlineCitation>
              <InlineCitationLink
                href="https://cognite.test/documentation.pdf"
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
  ),
};
export const WithCodeBlock: Story = {
  parameters: {
    order: 2,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText(
        /Can you show me how to analyze vibration data using TypeScript\?/i
      )
    ).toBeInTheDocument();
    const codeBlock = canvasElement.querySelector('[data-code-block]');
    await expect(codeBlock).toBeTruthy();
    const buttons = await canvas.findAllByRole('button');
    await expect(buttons.length).toBe(4);
  },
  render: () => {
    const code = `async function analyzeVibrationData(timeseriesId: string) {
  const data = await fetchTimeseries(timeseriesId);
  const anomalies = detectAnomalies(data);

  return anomalies.filter(a => a.severity > 0.8);
}`;
    return (
      <div className="flex flex-col space-y-4 w-full gap-2">
        <Message isResponse={false} data-message>
          <MessageContent>
            Can you show me how to analyze vibration data using TypeScript?
          </MessageContent>
        </Message>

        <Message isResponse={true} data-message>
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
              data-code-block
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
  },
};
export const MessageResponseStreamdown: Story = {
  parameters: {
    order: 3,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText(
        /Can you show me all the different formatting options available\?/i
      )
    ).toBeInTheDocument();
    await waitFor(
      () => {
        expect(
          canvas.getByRole('heading', { level: 1, name: 'Heading 1' })
        ).toBeInTheDocument();
      },
      {
        timeout: 3000,
      }
    );
    const buttons = await canvas.findAllByRole('button');
    await expect(buttons.length).toBe(2);
  },
  render: () => {
    const markdownContent = `# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

This is a paragraph with **bold text**, *italic text*, and \`inline code\`. You can also combine **_bold and italic_** together.

Here's a [link to documentation](https://cognite.test) that demonstrates anchor styling.

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
        <Message isResponse={false} data-message>
          <MessageContent>
            Can you show me all the different formatting options available?
          </MessageContent>
        </Message>

        <Message isResponse={true} data-message>
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
  },
};
export const UserMessage: Story = {
  parameters: {
    order: 4,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const content = canvas.getByText(
      'Hello! How can I get started with this project?'
    );
    const message = content.closest('[data-slot="message"]');
    await expect(message).toBeInTheDocument();
    await expect(message).not.toHaveClass('is-assistant');
  },
  render: () => (
    <Message isResponse={false} data-message>
      <MessageContent>
        <p>Hello! How can I get started with this project?</p>
      </MessageContent>
    </Message>
  ),
};
export const AssistantMessage: Story = {
  parameters: {
    order: 5,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const content = canvas.getByText(
      /Welcome! To get started, you can install the package/i
    );
    const message = content.closest('[data-slot="message"]');
    await expect(message).toBeInTheDocument();
    await expect(message).toHaveClass('is-assistant');
  },
  render: () => (
    <Message isResponse={true} data-message>
      <MessageAvatar variant="nordic">
        <MessageAvatarIcon>
          <IconWheel />
        </MessageAvatarIcon>
      </MessageAvatar>
      <MessageContent>
        <p>
          Welcome! To get started, you can install the package using npm or
          pnpm. First, run the installation command in your project directory.
        </p>
      </MessageContent>
    </Message>
  ),
};
export const ExtendedConversation: Story = {
  parameters: {
    order: 6,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText(/Can you help me write a function to sort an array\?/i)
    ).toBeInTheDocument();
    await expect(
      canvas.getByText(
        /The sort method takes a comparison function that determines the order/i
      )
    ).toBeInTheDocument();
  },
  render: () => (
    <div className="space-y-2">
      <Message isResponse={false} data-message>
        <MessageContent>
          <p>Can you help me write a function to sort an array?</p>
        </MessageContent>
      </Message>
      <Message isResponse={true} data-message>
        <MessageAvatar variant="nordic">
          <MessageAvatarIcon>
            <IconWheel />
          </MessageAvatarIcon>
        </MessageAvatar>
        <MessageContent>
          <p>
            Of course! Here's a simple sorting function using JavaScript's
            built-in sort method:
          </p>
          <pre className="bg-muted p-2 rounded-md text-sm mt-2">
            {`function sortArray(arr) {
  return arr.sort((a, b) => a - b);
}`}
          </pre>
        </MessageContent>
      </Message>
      <Message isResponse={false} data-message>
        <MessageContent>
          <p>Thanks! Can you explain how it works?</p>
        </MessageContent>
      </Message>
      <Message isResponse={true} data-message>
        <MessageAvatar variant="nordic">
          <MessageAvatarIcon>
            <IconWheel />
          </MessageAvatarIcon>
        </MessageAvatar>
        <MessageContent>
          <p>
            The sort method takes a comparison function that determines the
            order. The function (a, b) =&gt; a - b returns a negative number if
            a should come before b, a positive number if b should come before a,
            and zero if they're equal.
          </p>
        </MessageContent>
      </Message>
    </div>
  ),
};
export const VeryLongMessage: Story = {
  parameters: {
    order: 7,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText(
        /This is a longer message that demonstrates how the component handles/i
      )
    ).toBeInTheDocument();
    const listItems = await canvas.findAllByRole('listitem');
    await expect(listItems.length).toBe(5);
  },
  render: () => (
    <Message isResponse={true} data-message>
      <MessageAvatar variant="nordic">
        <MessageAvatarIcon>
          <IconWheel />
        </MessageAvatarIcon>
      </MessageAvatar>
      <MessageContent>
        <p>
          This is a longer message that demonstrates how the component handles
          multiple paragraphs and extended content. The message component is
          designed to gracefully handle various content lengths whilst
          maintaining readability.
        </p>
        <p className="mt-2">
          Here's another paragraph to show the spacing between multiple blocks
          of text. This helps users read longer responses more easily.
          Industrial AI applications often require detailed explanations of
          complex processes and analysis.
        </p>
        <p className="mt-2">
          For example, when analyzing pump vibration data, we need to consider
          multiple factors including:
        </p>
        <ul className="list-disc pl-4 mt-2 space-y-1">
          <li>Baseline vibration levels during normal operation</li>
          <li>Environmental factors such as temperature and humidity</li>
          <li>Historical maintenance records and failure patterns</li>
          <li>
            Correlation with other sensor readings (RPM, temperature, pressure)
          </li>
          <li>Frequency analysis to identify specific failure modes</li>
        </ul>
      </MessageContent>
    </Message>
  ),
};
export const ManyMessageActions: Story = {
  parameters: {
    order: 8,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = await canvas.findAllByRole('button');
    await expect(buttons.length).toBe(6);
  },
  render: () => (
    <Message isResponse={true}>
      <MessageAvatar variant="nordic">
        <MessageAvatarIcon>
          <IconWheel />
        </MessageAvatarIcon>
      </MessageAvatar>
      <MessageContent className="flex flex-col gap-2">
        <span>Here's the analysis you requested.</span>
        <MessageActions>
          <MessageAction size="icon-sm" label="Copy" tooltip="Copy">
            <IconCopy className="w-3 h-3" />
          </MessageAction>
          <MessageAction size="icon-sm" label="Download" tooltip="Download">
            <IconDownload className="w-3 h-3" />
          </MessageAction>
          <MessageAction size="icon-sm" label="Share" tooltip="Share">
            <IconHash className="w-3 h-3" />
          </MessageAction>
          <MessageAction size="icon-sm" label="Save" tooltip="Save">
            <IconFile className="w-3 h-3" />
          </MessageAction>
          <MessageAction size="icon-sm" label="Tools" tooltip="Tools">
            <IconTool className="w-3 h-3" />
          </MessageAction>
          <MessageAction size="icon-sm" label="Retry" tooltip="Retry">
            <IconRefresh className="w-3 h-3" />
          </MessageAction>
        </MessageActions>
      </MessageContent>
    </Message>
  ),
};
export const AvatarVariants: Story = {
  parameters: {
    order: 9,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Nordic variant (teal)')).toBeInTheDocument();
    await expect(
      canvas.getByText('Default/Mountain variant (grey)')
    ).toBeInTheDocument();
    await expect(canvas.getByText('Fjord variant (blue)')).toBeInTheDocument();
    await expect(
      canvas.getByText('Aurora variant (lime green)')
    ).toBeInTheDocument();
    await expect(canvas.getByText('Dusk variant (pink)')).toBeInTheDocument();
  },
  render: () => (
    <div className="space-y-3">
      <Message isResponse={true} data-message>
        <MessageAvatar variant="nordic">
          <MessageAvatarIcon>
            <IconWheel />
          </MessageAvatarIcon>
        </MessageAvatar>
        <MessageContent>Nordic variant (teal)</MessageContent>
      </Message>
      <Message isResponse={true} data-message>
        <MessageAvatar variant="default">
          <MessageAvatarIcon>
            <IconWheel />
          </MessageAvatarIcon>
        </MessageAvatar>
        <MessageContent>Default/Mountain variant (grey)</MessageContent>
      </Message>
      <Message isResponse={true} data-message>
        <MessageAvatar variant="fjord">
          <MessageAvatarIcon>
            <IconWheel />
          </MessageAvatarIcon>
        </MessageAvatar>
        <MessageContent>Fjord variant (blue)</MessageContent>
      </Message>
      <Message isResponse={true} data-message>
        <MessageAvatar variant="aurora">
          <MessageAvatarIcon>
            <IconWheel />
          </MessageAvatarIcon>
        </MessageAvatar>
        <MessageContent>Aurora variant (lime green)</MessageContent>
      </Message>
      <Message isResponse={true} data-message>
        <MessageAvatar variant="dusk">
          <MessageAvatarIcon>
            <IconWheel />
          </MessageAvatarIcon>
        </MessageAvatar>
        <MessageContent>Dusk variant (pink)</MessageContent>
      </Message>
    </div>
  ),
};
export const MessageWithoutAvatar: Story = {
  parameters: {
    order: 10,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText(
        /This is a message without an avatar. Some chat interfaces omit avatars/i
      )
    ).toBeInTheDocument();
  },
  render: () => (
    <Message isResponse={true} data-message>
      <MessageContent>
        This is a message without an avatar. Some chat interfaces omit avatars
        for cleaner UI.
      </MessageContent>
    </Message>
  ),
};
export const MessageWithOnlyActions: Story = {
  parameters: {
    order: 11,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = await canvas.findAllByRole('button');
    await expect(buttons.length).toBeGreaterThan(0);
  },
  render: () => (
    <Message isResponse={true} data-message>
      <MessageAvatar variant="nordic">
        <MessageAvatarIcon>
          <IconWheel />
        </MessageAvatarIcon>
      </MessageAvatar>
      <MessageContent className="flex flex-col gap-2">
        <MessageActions>
          <MessageAction size="icon-sm" label="Copy" tooltip="Copy">
            <IconCopy className="w-3 h-3" />
          </MessageAction>
          <MessageAction size="icon-sm" label="Download" tooltip="Download">
            <IconDownload className="w-3 h-3" />
          </MessageAction>
          <MessageAction size="icon-sm" label="Retry" tooltip="Retry">
            <IconRefresh className="w-3 h-3" />
          </MessageAction>
        </MessageActions>
      </MessageContent>
    </Message>
  ),
};
export const EmptyMessage: Story = {
  parameters: {
    order: 12,
  },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.firstElementChild).toBeInTheDocument();
  },
  render: () => (
    <Message isResponse={false} data-message>
      <MessageContent>
        <p />
      </MessageContent>
    </Message>
  ),
};
export const SingleCharacterMessage: Story = {
  parameters: {
    order: 13,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('?')).toBeInTheDocument();
  },
  render: () => (
    <Message isResponse={false} data-message>
      <MessageContent>?</MessageContent>
    </Message>
  ),
};
export const MessageWithSpecialCharacters: Story = {
  parameters: {
    order: 14,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText(/Special characters test:/i)
    ).toBeInTheDocument();
    await expect(canvas.getByText(/Unicode:/i)).toBeInTheDocument();
    await expect(canvas.getByText(/Emojis:/i)).toBeInTheDocument();
  },
  render: () => (
    <Message isResponse={true} data-message>
      <MessageAvatar variant="nordic">
        <MessageAvatarIcon>
          <IconWheel />
        </MessageAvatarIcon>
      </MessageAvatar>
      <MessageContent>
        <p>Special characters test: &lt;&gt;&amp;@#$%^&amp;*()[]{}|\/~`</p>
        <p>Unicode: ™ © ® € £ ¥ § ¶ † ‡</p>
        <p>Emojis: 🎉 🚀 ⚙️ 📊 💡 🔧 ⚠️ ✅</p>
        <p>Arrows: → ← ↑ ↓ ⇒ ⇐ ⇑ ⇓</p>
      </MessageContent>
    </Message>
  ),
};
export const VeryLongConversation: Story = {
  parameters: {
    order: 15,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByText("User query 1: What's the status of pump 21PT1011?")
    ).toBeInTheDocument();
    await expect(
      canvas.getByText(
        /Assistant response 6: Analysis of sensor data shows nominal operating conditions\./i
      )
    ).toBeInTheDocument();
  },
  render: () => (
    <div className="space-y-2">
      {Array.from(
        {
          length: 12,
        },
        (_, i) => {
          const isResponse = i % 2 === 1;
          const messageNum = Math.floor(i / 2) + 1;
          const messageId = isResponse
            ? `assistant-${messageNum}`
            : `user-${messageNum}`;
          return (
            <Message key={messageId} isResponse={isResponse} data-message>
              {isResponse && (
                <MessageAvatar variant="nordic">
                  <MessageAvatarIcon>
                    <IconWheel />
                  </MessageAvatarIcon>
                </MessageAvatar>
              )}
              <MessageContent>
                {isResponse
                  ? `Assistant response ${messageNum}: Analysis of sensor data shows nominal operating conditions.`
                  : `User query ${messageNum}: What's the status of pump 21PT101${messageNum}?`}
              </MessageContent>
            </Message>
          );
        }
      )}
    </div>
  ),
};
export const MessageWithLineBreaks: Story = {
  parameters: {
    order: 16,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('First line')).toBeInTheDocument();
    await expect(
      canvas.getByText('Line after multiple breaks')
    ).toBeInTheDocument();
    await expect(canvas.getByText('Final line')).toBeInTheDocument();
  },
  render: () => (
    <Message isResponse={true} data-message>
      <MessageAvatar variant="nordic">
        <MessageAvatarIcon>
          <IconWheel />
        </MessageAvatarIcon>
      </MessageAvatar>
      <MessageContent>
        <p>First line</p>
        <br />
        <br />
        <br />
        <p>Line after multiple breaks</p>
        <br />
        <p>Final line</p>
      </MessageContent>
    </Message>
  ),
};
export const MessageActionsWithoutTooltip: Story = {
  parameters: {
    order: 17,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = await canvas.findAllByRole('button');
    await expect(buttons.length).toBeGreaterThan(0);
  },
  render: () => (
    <Message isResponse={true} data-message>
      <MessageAvatar variant="nordic">
        <MessageAvatarIcon>
          <IconWheel />
        </MessageAvatarIcon>
      </MessageAvatar>
      <MessageContent className="flex flex-col gap-2">
        <span>Message with actions but no tooltips</span>
        <MessageActions>
          <MessageAction size="icon-sm" label="Copy">
            <IconCopy className="w-3 h-3" />
          </MessageAction>
          <MessageAction size="icon-sm" label="Download">
            <IconDownload className="w-3 h-3" />
          </MessageAction>
          <MessageAction size="icon-sm" label="Retry">
            <IconRefresh className="w-3 h-3" />
          </MessageAction>
        </MessageActions>
      </MessageContent>
    </Message>
  ),
};
export const Playground: Story = {
  render: (args) => (
    <Message {...args}>
      <MessageAvatar variant="nordic">
        <MessageAvatarIcon>
          <IconWheel />
        </MessageAvatarIcon>
      </MessageAvatar>
      <MessageContent>
        <span>Interactive playground message for testing props</span>
      </MessageContent>
    </Message>
  ),
  args: {
    isResponse: true,
  },
  parameters: {
    order: 99,
  },
};
