'use client';

import {
  Message,
  MessageContent,
  MessageAvatar,
  MessageAvatarIcon,
  MessageActions,
  MessageAction,
  MessageBranch,
  MessageBranchContent,
  MessageBranchSelector,
  MessageBranchPrevious,
  MessageBranchNext,
  MessageBranchPage,
} from '@/components/ui/aura/message';
import type { ComponentExamples } from '@/lib/component-examples/types';
import { Response } from '@/components/ui/aura/response';
import {
  CodeBlock,
  CodeBlockCopyButton,
} from '@/components/ui/aura/code-block';
import { useState } from 'react';
import {
  IconCopy,
  IconDownload,
  IconRefresh,
  IconWheel,
  IconCheck,
} from '@tabler/icons-react';

function MessageDemo() {
  const [branches, setBranches] = useState<string[]>([
    'I analyzed the sensor data and found vibration levels on pump 21PT1019 exceeded normal thresholds at 03:15. This correlates with a 12% increase in RPM during that window.',
  ]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamedContent, setStreamedContent] = useState('');
  const [showBranchNav, setShowBranchNav] = useState(false);
  const [currentBranchIndex, setCurrentBranchIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const alternativeResponse =
    'Based on the time series analysis, pump 21PT1019 showed elevated vibration patterns starting at 03:15. The root cause appears to be mechanical imbalance, indicated by the frequency spectrum showing peaks at 1x running speed.';

  const handleRetry = () => {
    if (branches.length >= 2 || isStreaming) return;

    // Add empty placeholder and switch to it
    setBranches([...branches, '']);
    setCurrentBranchIndex(branches.length); // Switch to new branch (index 1)
    setIsStreaming(true);
    setStreamedContent('');

    // Simulate streaming into the new branch
    const words = alternativeResponse.split(' ');
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < words.length) {
        setStreamedContent((prev) =>
          prev ? `${prev} ${words[currentIndex]}` : words[currentIndex]
        );
        currentIndex++;
      } else {
        clearInterval(interval);
        setIsStreaming(false);
        // Update the branch with final content
        setBranches((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = alternativeResponse;
          return updated;
        });
        setShowBranchNav(true);
      }
    }, 50);
  };

  const handleCopy = () => {
    const currentBranch = branches[currentBranchIndex] || '';
    navigator.clipboard.writeText(currentBranch);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const currentBranch = branches[currentBranchIndex] || '';
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
        key={`branch-${currentBranchIndex}`}
        defaultBranch={currentBranchIndex}
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
                <Response>
                  {isStreaming && index === currentBranchIndex
                    ? streamedContent
                    : branch || ''}
                </Response>
                {(!isStreaming || index !== currentBranchIndex) && (
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
                      disabled={branches.length >= 2 || isStreaming}
                    >
                      <IconRefresh className="w-3 h-3" />
                    </MessageAction>
                    {showBranchNav && (
                      <MessageBranchSelector from="assistant" className="px-0">
                        <MessageBranchPrevious />
                        <MessageBranchPage />
                        <MessageBranchNext />
                      </MessageBranchSelector>
                    )}
                  </MessageActions>
                )}
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
  MessageBranch,
  MessageBranchContent,
  MessageBranchSelector,
  MessageBranchPrevious,
  MessageBranchNext,
  MessageBranchPage,
} from "@/components/ai-elements/cognite/message"
import { Response } from "@/components/ai-elements/cognite/response"
import { useState } from "react"
import { IconWheel, IconCopy, IconDownload, IconRefresh, IconCheck } from "@tabler/icons-react"

export function MessageDemo() {
  const [branches, setBranches] = useState<string[]>([
    'I analyzed the sensor data and found vibration levels on pump 21PT1019 exceeded normal thresholds at 03:15. This correlates with a 12% increase in RPM during that window.',
  ])
  const [isStreaming, setIsStreaming] = useState(false)
  const [streamedContent, setStreamedContent] = useState('')
  const [showBranchNav, setShowBranchNav] = useState(false)
  const [currentBranchIndex, setCurrentBranchIndex] = useState(0)
  const [copied, setCopied] = useState(false)

  const alternativeResponse =
    'Based on the time series analysis, pump 21PT1019 showed elevated vibration patterns starting at 03:15. The root cause appears to be mechanical imbalance, indicated by the frequency spectrum showing peaks at 1x running speed.'

  const handleRetry = () => {
    if (branches.length >= 2 || isStreaming) return

    // Add empty placeholder and switch to it
    setBranches([...branches, ''])
    setCurrentBranchIndex(branches.length)
    setIsStreaming(true)
    setStreamedContent('')

    // Simulate streaming
    const words = alternativeResponse.split(' ')
    let currentIndex = 0

    const interval = setInterval(() => {
      if (currentIndex < words.length) {
        setStreamedContent((prev) =>
          prev ? \`\${prev} \${words[currentIndex]}\` : words[currentIndex]
        )
        currentIndex++
      } else {
        clearInterval(interval)
        setIsStreaming(false)
        // Update the branch with final content
        setBranches((prev) => {
          const updated = [...prev]
          updated[updated.length - 1] = alternativeResponse
          return updated
        })
        setShowBranchNav(true)
      }
    }, 50)
  }

  const handleCopy = () => {
    const currentBranch = branches[currentBranchIndex] || ''
    navigator.clipboard.writeText(currentBranch)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const currentBranch = branches[currentBranchIndex] || ''
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

      <MessageBranch key={\`branch-\${currentBranchIndex}\`} defaultBranch={currentBranchIndex}>
        <MessageBranchContent>
          {branches.map((branch, index) => (
            <Message key={index} isResponse={true}>
              <MessageAvatar variant="nordic">
                <MessageAvatarIcon>
                  <IconWheel />
                </MessageAvatarIcon>
              </MessageAvatar>
              <MessageContent className="flex flex-col gap-2">
                <Response>
                  {isStreaming && index === currentBranchIndex
                    ? streamedContent
                    : branch || ''}
                </Response>
                {(!isStreaming || index !== currentBranchIndex) && (
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
                    disabled={branches.length >= 2 || isStreaming}
                  >
                    <IconRefresh className="w-3 h-3" />
                  </MessageAction>
                  {showBranchNav && (
                    <MessageBranchSelector from="assistant" className="px-0">
                      <MessageBranchPrevious />
                      <MessageBranchPage />
                      <MessageBranchNext />
                    </MessageBranchSelector>
                  )}
                  </MessageActions>
                )}
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
};

// Component metadata - single source of truth for API documentation
export const messageMeta = {
  name: 'Message',
  description: 'Displays a chat interface message from either a user or an AI.',
  importPath: '@/components/ui/aura/message',
};
