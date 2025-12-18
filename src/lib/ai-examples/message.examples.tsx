'use client';

import {
  Message,
  MessageContent,
  MessageAvatar,
  MessageAvatarIcon,
  MessageActions,
  MessageAction,
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
  IconBrain,
  IconRefresh,
  IconWheel,
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
} from '@tabler/icons-react';
import {
  CodeBlock,
  CodeBlockCollapseButton,
  CodeBlockCopyButton,
} from '@/components/ui/aura/code-block';
import {
  Tool,
  ToolHeader,
  ToolContent,
  ToolInput,
  ToolOutput,
} from '@/components/ui/aura/tool';
import {
  Reasoning,
  ReasoningHeader,
  ReasoningContent,
  ReasoningItem,
} from '@/components/ui/aura/reasoning';
import { useState } from 'react';

const searchDatabaseInput = {
  asset_id: '21PT1019',
  data_types: ['vibration', 'temperature', 'rpm'],
  time_range: {
    start: '2024-12-03T00:00:00Z',
    end: '2024-12-04T00:00:00Z',
  },
};

const searchDatabaseOutput = {
  status: 'success',
  asset: {
    id: '21PT1019',
    name: 'Centrifugal Pump B-Section',
    location: 'Plant Floor 2, Bay 7',
  },
  data_points_retrieved: 1247,
};

const fetchSensorDataInput = {
  asset_id: '21PT1019',
  sensors: [
    {
      type: 'vibration',
      unit: 'mm/s',
      threshold_warning: 4.0,
      threshold_critical: 6.0,
    },
    {
      type: 'temperature',
      unit: 'celsius',
      threshold_warning: 80,
      threshold_critical: 90,
    },
  ],
  analysis: {
    detect_anomalies: true,
    correlation_analysis: true,
  },
};

const fetchSensorDataOutput = {
  status: 'success',
  anomalies_detected: 3,
  peak_values: {
    vibration: {
      value: 6.8,
      timestamp: '2024-12-03T03:15:00Z',
      status: 'critical',
    },
    temperature: {
      value: 82.1,
      timestamp: '2024-12-03T03:15:00Z',
      status: 'warning',
    },
  },
  recommended_action: 'maintenance_inspection',
  urgency: 'within_48_hours',
};

function Demo() {
  const [copied, setCopied] = useState(false);
  const [hasRetried, setHasRetried] = useState(false);
  const [currentBranch, setCurrentBranch] = useState(1);
  const [showTools, setShowTools] = useState(false);
  const totalBranches = 2;

  const messageText =
    currentBranch === 1
      ? 'I analyzed the sensor data and found that vibration levels on 21PT1019 exceeded normal thresholds at 03:15. This correlates with a 12% increase in RPM during that window.'
      : 'I analyzed the sensor data and found that vibration levels on 21PT1019 exceeded normal thresholds at 03:15. This correlates with a 12% increase in RPM during that window. **this is a different version**';

  const handleCopy = () => {
    navigator.clipboard.writeText(messageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([''], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'response.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleRetry = () => {
    setHasRetried(true);
    setCurrentBranch(currentBranch === 1 ? 2 : 1);
  };

  const handleBranchChange = (branch: number) => {
    setCurrentBranch(branch);
  };
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
            {currentBranch === 2 && ' **this is a different version**'}
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
          {showTools && (
            <div className="flex flex-col gap-2 py-3">
              <Reasoning>
                <ReasoningHeader />
                <ReasoningContent>
                  <ReasoningItem>
                    <Tool defaultOpen={false}>
                      <ToolHeader title="Search database" type="tool-call" />
                      <ToolContent>
                        <ToolInput input={searchDatabaseInput} />
                        <ToolOutput
                          output={searchDatabaseOutput}
                          errorText={undefined}
                        />
                      </ToolContent>
                    </Tool>
                  </ReasoningItem>
                  <ReasoningItem>
                    <Tool defaultOpen={false}>
                      <ToolHeader title="Fetch sensor data" type="tool-call" />
                      <ToolContent>
                        <ToolInput input={fetchSensorDataInput} />
                        <ToolOutput
                          output={fetchSensorDataOutput}
                          errorText={undefined}
                        />
                      </ToolContent>
                    </Tool>
                  </ReasoningItem>
                </ReasoningContent>
              </Reasoning>
            </div>
          )}
          <MessageActions className="justify-between">
            <div className="flex items-center gap-2">
              <MessageAction
                size="icon-sm"
                label="Copy"
                tooltip={copied ? 'Copied!' : 'Copy'}
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
              >
                <IconRefresh className="w-3 h-3" />
              </MessageAction>
              {hasRetried && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground px-2">
                  <button
                    onClick={() => handleBranchChange(1)}
                    className="hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    disabled={currentBranch === 1}
                  >
                    <IconChevronLeft className="w-3 h-3" />
                  </button>
                  <span>
                    {currentBranch}/{totalBranches}
                  </span>
                  <button
                    onClick={() => handleBranchChange(2)}
                    className="hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    disabled={currentBranch === 2}
                  >
                    <IconChevronRight className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
            <MessageAction
              size="sm"
              onClick={() => setShowTools(!showTools)}
              data-active={showTools}
              className="data-[active=true]:bg-accent"
            >
              <IconBrain className="w-3.5 h-3.5" />
              {showTools ? 'Hide reasoning' : 'Show reasoning'}
            </MessageAction>
          </MessageActions>
        </MessageContent>
      </Message>
    </div>
  );
}

function WithCodeBlockDemo() {
  const [copied, setCopied] = useState(false);
  const [hasRetried, setHasRetried] = useState(false);
  const [currentBranch, setCurrentBranch] = useState(1);
  const [showTools, setShowTools] = useState(false);
  const totalBranches = 2;

  const code =
    currentBranch === 1
      ? `async function analyzeVibrationData(timeseriesId: string) {
  const data = await fetchTimeseries(timeseriesId);
  const anomalies = detectAnomalies(data);

  return anomalies.filter(a => a.severity > 0.8);
}`
      : `async function analyzeVibrationData(timeseriesId: string) {
  const data = await fetchTimeseries(timeseriesId);
  const anomalies = detectAnomalies(data);
  
  // Alternative implementation
  return anomalies.filter(a => a.severity > 0.8 && a.type === 'critical');
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([''], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'response.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleRetry = () => {
    setHasRetried(true);
    setCurrentBranch(currentBranch === 1 ? 2 : 1);
  };

  const handleBranchChange = (branch: number) => {
    setCurrentBranch(branch);
  };

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
          {showTools && (
            <div className="flex flex-col gap-2 py-3">
              <Reasoning>
                <ReasoningHeader />
                <ReasoningContent>
                  <ReasoningItem>
                    <Tool defaultOpen={false}>
                      <ToolHeader title="Search database" type="tool-call" />
                      <ToolContent>
                        <ToolInput input={searchDatabaseInput} />
                        <ToolOutput
                          output={searchDatabaseOutput}
                          errorText={undefined}
                        />
                      </ToolContent>
                    </Tool>
                  </ReasoningItem>
                  <ReasoningItem>
                    <Tool defaultOpen={false}>
                      <ToolHeader title="Fetch sensor data" type="tool-call" />
                      <ToolContent>
                        <ToolInput input={fetchSensorDataInput} />
                        <ToolOutput
                          output={fetchSensorDataOutput}
                          errorText={undefined}
                        />
                      </ToolContent>
                    </Tool>
                  </ReasoningItem>
                </ReasoningContent>
              </Reasoning>
            </div>
          )}
          <MessageActions className="justify-between">
            <div className="flex items-center gap-2">
              <MessageAction
                size="icon-sm"
                label="Copy"
                tooltip={copied ? 'Copied!' : 'Copy'}
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
              >
                <IconRefresh className="w-3 h-3" />
              </MessageAction>
              {hasRetried && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground px-2">
                  <button
                    onClick={() => handleBranchChange(1)}
                    className="hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    disabled={currentBranch === 1}
                  >
                    <IconChevronLeft className="w-3 h-3" />
                  </button>
                  <span>
                    {currentBranch}/{totalBranches}
                  </span>
                  <button
                    onClick={() => handleBranchChange(2)}
                    className="hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    disabled={currentBranch === 2}
                  >
                    <IconChevronRight className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
            <MessageAction
              size="sm"
              onClick={() => setShowTools(!showTools)}
              data-active={showTools}
              className="data-[active=true]:bg-accent"
            >
              <IconBrain className="w-3.5 h-3.5" />
              {showTools ? 'Hide reasoning' : 'Show reasoning'}
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
};

// Component metadata - single source of truth for API documentation
export const messageMeta = {
  name: 'Message',
  description: 'Displays a chat interface message from either a user or an AI.',
  importPath: '@/components/ui/aura/message',
};
