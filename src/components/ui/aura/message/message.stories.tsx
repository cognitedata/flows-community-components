import {
  CodeBlock,
  CodeBlockCollapseButton,
  CodeBlockCopyButton,
} from "@/components/ui/aura/code-block";
import { InlineCitation, InlineCitationLink } from "@/components/ui/aura/inline-citation";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
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
} from "@tabler/icons-react";
import {
  Message,
  MessageAction,
  MessageActions,
  MessageAvatar,
  MessageAvatarIcon,
  MessageContent,
  MessageResponse,
} from "./message";

const meta: Meta<typeof Message> = {
  title: "AI/Message",
  component: Message,
  tags: ["autodocs"],
  argTypes: {
    // Behavior
    isResponse: {
      control: "boolean",
      description: "Whether the message is from the AI assistant (true) or user (false)",
      table: {
        category: "Behavior",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },

    // Display
    className: {
      control: "text",
      description: "Additional CSS classes for styling",
      table: {
        category: "Display",
      },
    },
    children: {
      control: false,
      description: "Message content (MessageContent, MessageAvatar, MessageActions, etc.)",
      table: {
        category: "Display",
        type: { summary: "ReactNode" },
      },
    },
  },
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div
        className="w-[700px]"
        style={{ "--message-content-max-width": "600px" } as React.CSSProperties}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Message>;

/**
 * Industrial conversation with inline citations.
 */
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Complete conversation showing user query and AI response with inline citations and message actions. Tests industrial use case with pump vibration analysis.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify both messages exist
    const messages = canvasElement.querySelectorAll("[data-message]");
    await expect(messages.length).toBe(2);

    // Verify inline citations exist
    const citations = canvas.getAllByRole("link");
    await expect(citations.length).toBeGreaterThanOrEqual(4);

    // Verify message actions exist
    const buttons = canvas.getAllByRole("button");
    await expect(buttons.length).toBeGreaterThan(0);
  },
  render: () => (
    <div className="flex flex-col space-y-4 w-full gap-2">
      <Message data-message>
        <MessageContent>
          <span>
            There are abnormal vibration levels on{" "}
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

      <Message isResponse={true} data-message>
        <MessageAvatar variant="nordic">
          <MessageAvatarIcon>
            <IconWheel />
          </MessageAvatarIcon>
        </MessageAvatar>
        <MessageContent className="flex flex-col gap-2">
          <span>
            I analyzed the sensor data and found that vibration levels on{" "}
            <InlineCitation>
              <InlineCitationLink
                href="https://example.com/pump/21PT1019"
                target="_blank"
                icon={IconHash}
                variant="nordic"
              >
                21PT1019
              </InlineCitationLink>
            </InlineCitation>{" "}
            exceeded normal thresholds at 03:15. This correlates with a 12% increase in RPM during
            that window.
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
  ),
};

/**
 * Message with code block.
 */
export const WithCodeBlock: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "AI response containing a code block with syntax highlighting, copy button, and collapse functionality.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify both messages exist
    const messages = canvasElement.querySelectorAll("[data-message]");
    await expect(messages.length).toBe(2);

    // Verify code block exists
    const codeBlock = canvasElement.querySelector("[data-code-block]");
    await expect(codeBlock).toBeInTheDocument();

    // Verify message actions exist
    const buttons = canvas.getAllByRole("button");
    await expect(buttons.length).toBeGreaterThan(0);
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

/**
 * MessageResponse with Streamdown formatting.
 */
export const MessageResponseStreamdown: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Full MessageResponse component demonstrating all Streamdown formatting: headings, lists, tables, code blocks (with Shiki highlighting), maths (LaTeX via KaTeX), blockquotes, and links. Optimised for AI streaming responses.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify messages exist
    const messages = canvasElement.querySelectorAll("[data-message]");
    await expect(messages.length).toBe(2);

    // Verify message actions exist
    const buttons = canvas.getAllByRole("button");
    await expect(buttons.length).toBeGreaterThan(0);

    // Verify MessageResponse content is rendered (check for any heading)
    await waitFor(() => {
      const headings = canvasElement.querySelectorAll("h1, h2, h3, h4, h5, h6");
      expect(headings.length).toBeGreaterThan(0);
    });
  },
  render: () => {
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

/**
 * Simple user message.
 */
export const UserMessage: Story = {
  parameters: {
    docs: {
      description: {
        story: "Basic user message without avatar icon.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const message = canvasElement.querySelector("[data-message]");
    await expect(message).toBeInTheDocument();
    await expect(message).not.toHaveClass("is-assistant");
  },
  render: () => (
    <Message isResponse={false} data-message>
      <MessageContent>
        <p>Hello! How can I get started with this project?</p>
      </MessageContent>
    </Message>
  ),
};

/**
 * Simple assistant message.
 */
export const AssistantMessage: Story = {
  parameters: {
    docs: {
      description: {
        story: "Basic AI assistant response with avatar.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const message = canvasElement.querySelector("[data-message]");
    await expect(message).toBeInTheDocument();
    await expect(message).toHaveClass("is-assistant");
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
          Welcome! To get started, you can install the package using npm or pnpm. First, run the
          installation command in your project directory.
        </p>
      </MessageContent>
    </Message>
  ),
};

/**
 * Extended conversation.
 */
export const ExtendedConversation: Story = {
  parameters: {
    docs: {
      description: {
        story: "Multi-turn conversation demonstrating message flow and spacing.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const messages = canvasElement.querySelectorAll("[data-message]");
    await expect(messages.length).toBe(4);
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
            Of course! Here's a simple sorting function using JavaScript's built-in sort method:
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
            The sort method takes a comparison function that determines the order. The function (a,
            b) =&gt; a - b returns a negative number if a should come before b, a positive number if
            b should come before a, and zero if they're equal.
          </p>
        </MessageContent>
      </Message>
    </div>
  ),
};

/**
 * Edge case: Very long message content.
 */
export const VeryLongMessage: Story = {
  parameters: {
    docs: {
      description: {
        story: "Tests message component with extensive content including multiple paragraphs.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const message = canvasElement.querySelector("[data-message]");
    await expect(message).toBeInTheDocument();

    // Verify multiple paragraphs exist
    const paragraphs = canvasElement.querySelectorAll("p");
    await expect(paragraphs.length).toBeGreaterThan(2);
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
          This is a longer message that demonstrates how the component handles multiple paragraphs
          and extended content. The message component is designed to gracefully handle various
          content lengths whilst maintaining readability.
        </p>
        <p className="mt-2">
          Here's another paragraph to show the spacing between multiple blocks of text. This helps
          users read longer responses more easily. Industrial AI applications often require detailed
          explanations of complex processes and analysis.
        </p>
        <p className="mt-2">
          For example, when analyzing pump vibration data, we need to consider multiple factors
          including:
        </p>
        <ul className="list-disc pl-4 mt-2 space-y-1">
          <li>Baseline vibration levels during normal operation</li>
          <li>Environmental factors such as temperature and humidity</li>
          <li>Historical maintenance records and failure patterns</li>
          <li>Correlation with other sensor readings (RPM, temperature, pressure)</li>
          <li>Frequency analysis to identify specific failure modes</li>
        </ul>
      </MessageContent>
    </Message>
  ),
};

/**
 * Edge case: Many message actions.
 */
export const ManyMessageActions: Story = {
  parameters: {
    docs: {
      description: {
        story: "Message with numerous action buttons to test layout and overflow behavior.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify many buttons exist
    const buttons = canvas.getAllByRole("button");
    await expect(buttons.length).toBeGreaterThanOrEqual(6);
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

/**
 * Avatar variants comparison.
 */
export const AvatarVariants: Story = {
  parameters: {
    docs: {
      description: {
        story: "Comparison of different avatar color variants for assistant messages.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const messages = canvasElement.querySelectorAll("[data-message]");
    await expect(messages.length).toBeGreaterThanOrEqual(3);

    // Verify avatars are present
    const avatars = canvasElement.querySelectorAll('[data-slot="avatar"]');
    await expect(avatars.length).toBeGreaterThanOrEqual(3);
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

/**
 * Edge case: Message without avatar.
 */
export const MessageWithoutAvatar: Story = {
  parameters: {
    docs: {
      description: {
        story: "Tests message rendering without an avatar component.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const message = canvasElement.querySelector("[data-message]");
    await expect(message).toBeInTheDocument();

    // Verify no avatar exists
    const avatar = canvasElement.querySelector('[data-slot="avatar"]');
    await expect(avatar).not.toBeInTheDocument();
  },
  render: () => (
    <Message isResponse={true} data-message>
      <MessageContent>
        This is a message without an avatar. Some chat interfaces omit avatars for cleaner UI.
      </MessageContent>
    </Message>
  ),
};

/**
 * Edge case: Message with only actions (no text content).
 */
export const MessageWithOnlyActions: Story = {
  parameters: {
    docs: {
      description: {
        story: "Edge case where message contains only action buttons without text content.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify buttons exist
    const buttons = canvas.getAllByRole("button");
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

/**
 * Edge case: Empty message content.
 */
export const EmptyMessage: Story = {
  parameters: {
    docs: {
      description: {
        story: "Edge case of a message with empty or minimal content.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const message = canvasElement.querySelector("[data-message]");
    await expect(message).toBeInTheDocument();
  },
  render: () => (
    <Message isResponse={false} data-message>
      <MessageContent>
        <p />
      </MessageContent>
    </Message>
  ),
};

/**
 * Edge case: Single character message.
 */
export const SingleCharacterMessage: Story = {
  parameters: {
    docs: {
      description: {
        story: "Tests message rendering with minimal single character content.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const message = canvasElement.querySelector("[data-message]");
    await expect(message).toBeInTheDocument();
  },
  render: () => (
    <Message isResponse={false} data-message>
      <MessageContent>?</MessageContent>
    </Message>
  ),
};

/**
 * Edge case: Message with special characters and emojis.
 */
export const MessageWithSpecialCharacters: Story = {
  parameters: {
    docs: {
      description: {
        story: "Tests handling of special characters, symbols, and emojis in messages.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const message = canvasElement.querySelector("[data-message]");
    await expect(message).toBeInTheDocument();
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

/**
 * Edge case: Very long conversation thread.
 */
export const VeryLongConversation: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Stress test with many messages in a conversation to test scrolling and performance.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const messages = canvasElement.querySelectorAll("[data-message]");
    await expect(messages.length).toBeGreaterThanOrEqual(10);
  },
  render: () => (
    <div className="space-y-2">
      {Array.from({ length: 12 }, (_, i) => {
        const isResponse = i % 2 === 1;
        const messageNum = Math.floor(i / 2) + 1;
        const messageId = isResponse ? `assistant-${messageNum}` : `user-${messageNum}`;

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
      })}
    </div>
  ),
};

/**
 * Edge case: Message with multiple line breaks.
 */
export const MessageWithLineBreaks: Story = {
  parameters: {
    docs: {
      description: {
        story: "Tests message rendering with multiple line breaks and whitespace.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const message = canvasElement.querySelector("[data-message]");
    await expect(message).toBeInTheDocument();
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

/**
 * Edge case: Message actions without tooltip.
 */
export const MessageActionsWithoutTooltip: Story = {
  parameters: {
    docs: {
      description: {
        story: "Tests message actions rendered without tooltip text.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole("button");
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
