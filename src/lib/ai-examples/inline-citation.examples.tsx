'use client';

import {
  InlineCitation,
  InlineCitationGroup,
  InlineCitationLink,
} from '@/components/ui/aura/inline-citation';
import {
  Message,
  MessageAvatar,
  MessageAvatarIcon,
  MessageContent,
  MessageActions,
  MessageAction,
} from '@/components/ui/aura/message';
import {
  IconFile,
  IconPhoto,
  IconTimeline,
  IconHexagon,
  IconCalendarEvent,
  IconBrackets,
  IconBriefcase,
  IconHash,
  IconWheel,
  IconCopy,
  IconDownload,
  IconBrain,
  IconRefresh,
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
} from '@tabler/icons-react';
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
import type { ComponentExamples } from '@/lib/component-examples/types';
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

function LinkDemo() {
  return (
    <div className="space-y-4 text-sm leading-relaxed max-w-2xl">
      <p>
        Our analysis of{' '}
        <InlineCitation>
          <InlineCitationLink
            href="https://cognite.com/assets/pump-21PT1019"
            target="_blank"
            variant="fjord"
          >
            pump 21PT1019
          </InlineCitationLink>
        </InlineCitation>{' '}
        reveals a concerning trend in vibration patterns over the past 72 hours.
        The data shows a steady increase in amplitude, particularly during
        high-load operations, which correlates with elevated bearing
        temperatures. Historical maintenance records indicate similar patterns
        preceded bearing failures in comparable equipment. The motor temperature
        has increased by 8°C over the same period, suggesting potential
        mechanical stress. We recommend immediate inspection and scheduling
        preventive maintenance to avoid unplanned downtime and potential
        equipment damage.
      </p>
    </div>
  );
}

function WithIconsDemo() {
  return (
    <div className="space-y-4 text-sm leading-relaxed max-w-2xl">
      <InlineCitationGroup>
        <InlineCitation>
          <InlineCitationLink
            href="https://example.com/image/pumpB.jpg"
            target="_blank"
            icon={IconPhoto}
            variant="nordic"
          >
            pumpB.jpg
          </InlineCitationLink>
        </InlineCitation>
        <InlineCitation>
          <InlineCitationLink
            href="https://example.com/documentation.pdf"
            target="_blank"
            icon={IconFile}
            variant="fjord"
          >
            Maintenance Manual
          </InlineCitationLink>
        </InlineCitation>
        <InlineCitation>
          <InlineCitationLink
            href="https://example.com/chart/vibration-timeline"
            target="_blank"
            icon={IconTimeline}
            variant="mountain"
          >
            Vibration Timeline
          </InlineCitationLink>
        </InlineCitation>
        <InlineCitation>
          <InlineCitationLink
            href="https://example.com/asset/pump-21PT1019"
            target="_blank"
            icon={IconHexagon}
            variant="nordic"
          >
            21PT1019
          </InlineCitationLink>
        </InlineCitation>
        <InlineCitation>
          <InlineCitationLink
            href="https://example.com/event/maintenance-2024-03"
            target="_blank"
            icon={IconCalendarEvent}
            variant="fjord"
          >
            March Maintenance
          </InlineCitationLink>
        </InlineCitation>
        <InlineCitation>
          <InlineCitationLink
            href="https://example.com/sequence/startup-seq"
            target="_blank"
            icon={IconBrackets}
            variant="nordic"
          >
            Startup Sequence
          </InlineCitationLink>
        </InlineCitation>
        <InlineCitation>
          <InlineCitationLink
            href="https://example.com/work-order/wo-5421"
            target="_blank"
            icon={IconBriefcase}
            variant="fjord"
          >
            WO-5421
          </InlineCitationLink>
        </InlineCitation>
      </InlineCitationGroup>
    </div>
  );
}

function InMessageDemo() {
  const [copied, setCopied] = useState(false);
  const [hasRetried, setHasRetried] = useState(false);
  const [currentBranch, setCurrentBranch] = useState(1);
  const [showTools, setShowTools] = useState(false);
  const totalBranches = 2;

  const handleCopy = () => {
    const messageText =
      currentBranch === 1
        ? 'I analyzed the sensor data and found that vibration levels on 21PT1019 exceeded normal thresholds at 03:15. This correlates with a 12% increase in RPM during that window.'
        : 'I analyzed the sensor data and found that vibration levels on 21PT1019 exceeded normal thresholds at 03:15. This correlates with a 12% increase in RPM during that window. **this is a different version**';
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

export const inlineCitationExamples: ComponentExamples = {
  'with-icons': {
    title: 'Link Citations with Icons',
    description:
      'Link Citations with icons and color variants for different source types',
    component: WithIconsDemo,
    difficulty: 'intermediate',
    code: `'use client';

import {
  InlineCitation,
  InlineCitationGroup,
  InlineCitationLink,
} from '@/components/ui/aura/inline-citation';
import {
  IconFile,
  IconPhoto,
  IconTimeline,
  IconHexagon,
  IconCalendarEvent,
  IconBrackets,
  IconBriefcase,
} from '@tabler/icons-react';

export function WithIconsDemo() {
  return (
    <div className="space-y-4 text-sm leading-relaxed max-w-2xl">
      <InlineCitationGroup>
        <InlineCitation>
          <InlineCitationLink
            href="https://example.com/image/pumpB.jpg"
            target="_blank"
            icon={IconPhoto}
            variant="nordic"
          >
            pumpB.jpg
          </InlineCitationLink>
        </InlineCitation>
        <InlineCitation>
          <InlineCitationLink
            href="https://example.com/documentation.pdf"
            target="_blank"
            icon={IconFile}
            variant="fjord"
          >
            Maintenance Manual
          </InlineCitationLink>
        </InlineCitation>
        <InlineCitation>
          <InlineCitationLink
            href="https://example.com/chart/vibration-timeline"
            target="_blank"
            icon={IconTimeline}
            variant="nordic"
          >
            Vibration Timeline
          </InlineCitationLink>
        </InlineCitation>
        <InlineCitation>
          <InlineCitationLink
            href="https://example.com/asset/pump-21PT1019"
            target="_blank"
            icon={IconHexagon}
            variant="aurora"
          >
            21PT1019
          </InlineCitationLink>
        </InlineCitation>
        <InlineCitation>
          <InlineCitationLink
            href="https://example.com/event/maintenance-2024-03"
            target="_blank"
            icon={IconCalendarEvent}
            variant="fjord"
          >
            March Maintenance
          </InlineCitationLink>
        </InlineCitation>
        <InlineCitation>
          <InlineCitationLink
            href="https://example.com/sequence/startup-seq"
            target="_blank"
            icon={IconBrackets}
            variant="nordic"
          >
            Startup Sequence
          </InlineCitationLink>
        </InlineCitation>
        <InlineCitation>
          <InlineCitationLink
            href="https://example.com/work-order/wo-5421"
            target="_blank"
            icon={IconBriefcase}
            variant="fjord"
          >
            WO-5421
          </InlineCitationLink>
        </InlineCitation>
      </InlineCitationGroup>
    </div>
  );
}`,
  },

  'in-message': {
    title: 'In Message Context',
    description:
      'Inline citations within a conversation message showing both inline and grouped usage',
    component: InMessageDemo,
    difficulty: 'intermediate',
    code: `'use client';

import {
  InlineCitation,
  InlineCitationLink,
} from '@/components/ui/aura/inline-citation';
import {
  Message,
  MessageAvatar,
  MessageAvatarIcon,
  MessageContent,
  MessageActions,
  MessageAction,
} from '@/components/ui/aura/message';
import {
  IconHash,
  IconFile,
  IconPhoto,
  IconTimeline,
  IconWheel,
  IconCopy,
  IconDownload,
  IconTool,
  IconRefresh,
} from '@tabler/icons-react';

export function InMessageDemo() {
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
            </InlineCitation>
            {' '}exceeded normal thresholds at 03:15. This correlates with a 12%
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
}`,
  },

  link: {
    title: 'Link Citation',
    description: 'Citation with a simple link, no hover overlay',
    component: LinkDemo,
    difficulty: 'beginner',
    code: `'use client';

import {
  InlineCitation,
  InlineCitationLink,
} from '@/components/ui/aura/inline-citation';

export function LinkDemo() {
  return (
    <div className="space-y-4 text-sm leading-relaxed max-w-2xl">
      <p>
        Our analysis of{' '}
        <InlineCitation>
          <InlineCitationLink
            href="https://cognite.com/assets/pump-21PT1019"
            target="_blank"
            variant="fjord"
          >
            pump 21PT1019
          </InlineCitationLink>
        </InlineCitation>{' '}
        reveals a concerning trend in vibration patterns over the past 72 hours.
        The data shows a steady increase in amplitude, particularly during
        high-load operations, which correlates with elevated bearing
        temperatures. Historical maintenance records indicate similar patterns
        preceded bearing failures in comparable equipment. The motor temperature
        has increased by 8°C over the same period, suggesting potential
        mechanical stress. We recommend immediate inspection and scheduling
        preventive maintenance to avoid unplanned downtime and potential
        equipment damage.
      </p>
    </div>
  );
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const inlineCitationMeta = {
  name: 'Inline Citation',
  description:
    'A hoverable citation component that displays source information and quotes inline with text, perfect for AI-generated content with references.',
  importPath: '@/components/ui/aura/inline-citation',
};
