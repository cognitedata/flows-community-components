'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CodeBlock } from '@/components/ui/aura/code-block';
import { Card, CardContent } from '@/components/ui/aura/card';
import { Button } from '@/components/ui/aura/button';
import { Badge } from '@/components/ui/aura/badge';
import {
  Topbar,
  TopbarLeft,
  TopbarCenter,
  TopbarRight,
  TopbarBreadcrumbs,
} from '@/components/ui/aura/topbar';
import {
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/aura/breadcrumb';
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from '@/components/ui/aura/conversation';
import {
  Message,
  MessageContent,
  MessageAvatar,
  MessageAvatarIcon,
  MessageResponse,
  MessageActions,
  MessageAction,
  MessageBranch,
  MessageBranchContent,
  MessageBranchSelector,
  MessageBranchPrevious,
  MessageBranchNext,
  MessageBranchPage,
} from '@/components/ui/aura/message';
import {
  PromptInput,
  PromptInputProvider,
  PromptInputBody,
  PromptInputTextarea,
  PromptInputSubmit,
  PromptInputFooter,
  PromptInputTools,
  PromptInputButton,
} from '@/components/ui/aura/prompt-input';
import { Shimmer } from '@/components/ui/aura/shimmer';
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
import {
  InlineCitation,
  InlineCitationLink,
} from '@/components/ui/aura/inline-citation';
import { Sources, Source } from '@/components/ui/aura/sources';
import { Suggestion } from '@/components/ui/aura/suggestion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/aura/dropdown-menu';
import {
  IconChartBar,
  IconTrendingUp,
  IconTrendingDown,
  IconAlertTriangle,
  IconAlertCircle,
  IconCircleCheck,
  IconClock,
  IconCalendar,
  IconWheel,
  IconCopy,
  IconDownload,
  IconBrain,
  IconRefresh,
  IconHash,
  IconChartLine,
  IconPhoto,
  IconFile,
  IconBriefcase,
  IconAdjustments,
  IconChevronDown,
} from '@tabler/icons-react';

// Demo data for AI Chat
const thinkingPhrases = [
  'Searching database…',
  'Fetching sensor data…',
  'Formulating response…',
];

// Static heatmap data for dashboard demos
const heatmapData = Array.from({ length: 35 }).map(() =>
  Math.floor(Math.random() * 4)
);

const searchDatabaseInput = {
  asset_id: '21PT1019',
  data_types: ['vibration', 'temperature', 'rpm'],
  time_range: {
    start: '2024-12-03T00:00:00Z',
    end: '2024-12-04T00:00:00Z',
  },
  aggregation: '1h',
  include_metadata: true,
};

const searchDatabaseOutput = {
  status: 'success',
  asset: {
    id: '21PT1019',
    name: 'Centrifugal Pump B-Section',
    location: 'Plant Floor 2, Bay 7',
    manufacturer: 'Grundfos',
    model: 'CR 95-2-2',
  },
  data_points_retrieved: 1247,
  time_range_actual: {
    start: '2024-12-03T00:00:00Z',
    end: '2024-12-04T00:00:00Z',
  },
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
    { type: 'rpm', unit: 'revolutions_per_minute' },
  ],
  analysis: {
    detect_anomalies: true,
    correlation_analysis: true,
    trend_detection: true,
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
    rpm: { value: 2912, timestamp: '2024-12-03T03:15:00Z' },
  },
  correlations: [
    { factors: ['vibration', 'rpm'], coefficient: 0.87, significance: 'high' },
    {
      factors: ['vibration', 'temperature'],
      coefficient: 0.72,
      significance: 'moderate',
    },
  ],
  recommended_action: 'maintenance_inspection',
  urgency: 'within_48_hours',
};

// Tokenize the markdown for streaming effect
const responseTokens = [
  'Based',
  ' on',
  ' my',
  ' analysis',
  ' of',
  ' the',
  ' sensor',
  ' data',
  ' for',
  ' pump',
  ' **21PT1019**,',
  " I've",
  ' identified',
  ' several',
  ' anomalies',
  ' that',
  ' correlate',
  ' with',
  ' the',
  ' reported',
  ' vibration',
  ' issues.',
  '\n\n',
  'The',
  ' vibration',
  ' amplitude',
  ' exceeded',
  ' normal',
  ' operating',
  ' thresholds',
  ' at',
  ' multiple',
  ' intervals',
  ' during',
  ' the',
  ' past',
  ' 24',
  ' hours.',
  " Here's",
  ' a',
  ' summary',
  ' of',
  ' the',
  ' key',
  ' findings:',
  '\n\n',
  '| Timestamp',
  ' | Vibration (mm/s)',
  ' | Temperature (°C)',
  ' | RPM',
  ' | Status',
  ' |',
  '\n',
  '|-----------|------------------|------------------|-----|--------|',
  '\n',
  '| 02:15:00',
  ' | 4.2',
  ' | 78.3',
  ' | 2,847',
  ' | Warning',
  ' |',
  '\n',
  '| 03:15:00',
  ' | 6.8',
  ' | 82.1',
  ' | 2,912',
  ' | Critical',
  ' |',
  '\n',
  '| 04:45:00',
  ' | 5.1',
  ' | 80.6',
  ' | 2,889',
  ' | Warning',
  ' |',
  '\n',
  '| 06:30:00',
  ' | 3.9',
  ' | 76.2',
  ' | 2,831',
  ' | Normal',
  ' |',
  '\n\n',
  'The',
  ' spike',
  ' at',
  ' 03:15',
  ' correlates',
  ' strongly',
  ' with',
  ' a',
  ' 12%',
  ' increase',
  ' in',
  ' RPM',
  ' and',
  ' elevated',
  ' bearing',
  ' temperature.',
  ' This',
  ' pattern',
  ' is',
  ' consistent',
  ' with',
  ' early-stage',
  ' bearing',
  ' wear',
  ' or',
  ' shaft',
  ' misalignment.',
  '\n\n',
  'I',
  ' recommend',
  ' scheduling',
  ' a',
  ' maintenance',
  ' inspection',
  ' within',
  ' the',
  ' next',
  ' 48',
  ' hours',
  ' to',
  ' prevent',
  ' potential',
  ' bearing',
  ' failure.',
  ' Priority',
  ' should',
  ' be',
  ' given',
  ' to',
  ' checking',
  ' the',
  ' drive-end',
  ' bearing',
  ' assembly',
  ' and',
  ' verifying',
  ' shaft',
  ' alignment',
  ' tolerances.',
];

const responseTokens2 = [
  'After',
  ' conducting',
  ' a',
  ' detailed',
  ' frequency',
  ' spectrum',
  ' analysis',
  ' of',
  ' pump',
  ' **21PT1019**,',
  ' the',
  ' vibration',
  ' patterns',
  ' indicate',
  ' a',
  ' different',
  ' root',
  ' cause',
  ' than',
  ' initially',
  ' suspected.',
  '\n\n',
  'The',
  ' frequency',
  ' analysis',
  ' reveals',
  ' dominant',
  ' peaks',
  ' at',
  ' 1x',
  ' running',
  ' speed',
  ' (',
  '47.5',
  ' Hz',
  '),',
  ' which',
  ' is',
  ' characteristic',
  ' of',
  ' mechanical',
  ' imbalance',
  ' rather',
  ' than',
  ' bearing',
  ' wear.',
  ' The',
  ' amplitude',
  ' progression',
  ' shows:',
  '\n\n',
  '| Time',
  ' Period',
  ' | Imbalance',
  ' Severity',
  ' | Recommended',
  ' Action',
  ' |',
  '\n',
  '|------------|-------------------|-------------------|',
  '\n',
  '| 00:00-02:00',
  ' | Acceptable',
  ' | Monitor',
  ' |',
  '\n',
  '| 02:00-04:00',
  ' | Moderate',
  ' | Plan',
  ' Balancing',
  ' |',
  '\n',
  '| 04:00-06:00',
  ' | Severe',
  ' | Immediate',
  ' Action',
  ' |',
  '\n\n',
  'This',
  ' suggests',
  ' the',
  ' impeller',
  ' may',
  ' have',
  ' accumulated',
  ' debris',
  ' or',
  ' experienced',
  ' erosion,',
  ' causing',
  ' mass',
  ' imbalance.',
  ' I',
  ' recommend',
  ' an',
  ' immediate',
  ' impeller',
  ' inspection',
  ' and',
  ' dynamic',
  ' balancing',
  ' within',
  ' 24',
  ' hours.',
];

type ConversationPhase =
  | 'empty'
  | 'userMessage'
  | 'waiting'
  | 'thinking'
  | 'streaming'
  | 'complete';

/**
 * Container Query Breakpoint System
 *
 * Container queries respond to parent container width, not viewport width.
 * This enables truly component-based responsive design.
 *
 * Key differences from media queries:
 * - @2xl, @3xl, etc. are container query variants (not @sm, @md like media queries)
 * - Breakpoint activates when CONTAINER reaches that width, not viewport
 * - Components can be responsive based on available space, not screen size
 *
 * Theme customization in globals.css:
 * - --container-2xl: 40rem (640px) - Overridden from Tailwind's default 672px
 * - --container-8xl: 96rem (1536px) - Added for widest layouts
 *
 * All breakpoints use a consistent 12-column grid for maximum flexibility.
 */
const breakpoints = [
  { name: 'base', min: 0, max: 639, columns: 12, prefix: '(none)' },
  { name: '2xl', min: 640, max: 767, columns: 12, prefix: '@2xl:' },
  { name: '3xl', min: 768, max: 1023, columns: 12, prefix: '@3xl:' },
  { name: '5xl', min: 1024, max: 1279, columns: 12, prefix: '@5xl:' },
  { name: '7xl', min: 1280, max: 1535, columns: 12, prefix: '@7xl:' },
  { name: '8xl', min: 1536, max: Infinity, columns: 12, prefix: '@8xl:' },
];

/**
 * Stepped Max-Width System
 *
 * Progressive max-width constraints that activate at each container query breakpoint.
 * Creates centered, proportionally-scaled layouts that never become too wide.
 *
 * Example usage:
 * <div className="@container">
 *   <div className="mx-auto max-w-2xl @2xl:max-w-2xl @3xl:max-w-3xl @5xl:max-w-5xl">
 *     Content stays centered and capped at breakpoint-appropriate widths
 *   </div>
 * </div>
 *
 * Benefits:
 * - Maintains optimal content widths at all container sizes
 * - Content scales proportionally with available space
 * - Prevents excessively wide layouts on large screens
 */
const maxWidths = [
  { breakpoint: 'base', class: 'max-w-2xl', description: '640px (mobile)' },
  {
    breakpoint: '@2xl:',
    class: 'max-w-2xl',
    description: '640px (small tablet)',
  },
  { breakpoint: '@3xl:', class: 'max-w-3xl', description: '768px (tablet)' },
  { breakpoint: '@5xl:', class: 'max-w-5xl', description: '1024px (laptop)' },
  { breakpoint: '@7xl:', class: 'max-w-7xl', description: '1280px (desktop)' },
  {
    breakpoint: '@8xl:',
    class: 'max-w-8xl',
    description: '1536px (wide desktop)',
  },
];

function BreakpointTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 pr-4 font-medium">Breakpoint</th>
            <th className="text-left py-3 pr-4 font-medium">Range</th>
            <th className="text-left py-3 pr-4 font-medium">Columns</th>
            <th className="text-left py-3 font-medium">Prefix</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {breakpoints.map((bp) => (
            <tr key={bp.name}>
              <td className="py-3 pr-4 font-medium">{bp.name}</td>
              <td className="py-3 pr-4 text-muted-foreground">
                {bp.min}px – {bp.max}px
              </td>
              <td className="py-3 pr-4">{bp.columns}</td>
              <td className="py-3">
                <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                  {bp.prefix}
                </code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MaxWidthTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 pr-4 font-medium">Breakpoint</th>
            <th className="text-left py-3 pr-4 font-medium">Class</th>
            <th className="text-left py-3 font-medium">Max Width</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {maxWidths.map((mw) => (
            <tr key={mw.breakpoint}>
              <td className="py-3 pr-4">
                <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                  {mw.breakpoint}
                </code>
              </td>
              <td className="py-3 pr-4">
                <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                  {mw.class}
                </code>
              </td>
              <td className="py-3 text-muted-foreground">{mw.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AIChatDemo() {
  const [phase, setPhase] = useState<ConversationPhase>('empty');
  const [thinkingSeconds, setThinkingSeconds] = useState(0);
  const [streamedContent, setStreamedContent] = useState('');
  const [showTools, setShowTools] = useState(false);
  const [branches, setBranches] = useState<string[]>(['']); // Initialize with empty string for first branch
  const [currentBranchIndex, setCurrentBranchIndex] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);

  // Derive shimmer phrase from thinking seconds (changes every 3 seconds)
  const phraseIndex = Math.min(Math.floor(thinkingSeconds / 3), 2);

  // Phase progression: empty (1s) → userMessage → waiting (1s) → thinking (9s) → streaming → complete
  useEffect(() => {
    if (phase === 'empty') {
      const timer = setTimeout(() => setPhase('userMessage'), 1000);
      return () => clearTimeout(timer);
    }
    if (phase === 'userMessage') {
      const timer = setTimeout(() => setPhase('waiting'), 100);
      return () => clearTimeout(timer);
    }
    if (phase === 'waiting') {
      const timer = setTimeout(() => setPhase('thinking'), 1000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // Thinking phase timer
  useEffect(() => {
    if (phase !== 'thinking') return;

    const interval = setInterval(() => {
      setThinkingSeconds((prev) => {
        const next = prev + 1;
        if (next >= 9) {
          setPhase('streaming');
          return 9;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [phase]);

  // Streaming phase - stream response tokens
  useEffect(() => {
    if (phase !== 'streaming') return;

    let currentContent = '';
    let index = 0;
    const tokens = isRetrying ? responseTokens2 : responseTokens;

    const interval = setInterval(() => {
      if (index < tokens.length) {
        currentContent += tokens[index];
        setStreamedContent(currentContent);
        // Update the current branch
        setBranches((prev) => {
          const updated = [...prev];
          updated[currentBranchIndex] = currentContent;
          return updated;
        });
        index++;
      } else {
        clearInterval(interval);
        const finalContent = tokens.join('');
        setStreamedContent(finalContent);
        setBranches((prev) => {
          const updated = [...prev];
          updated[currentBranchIndex] = finalContent;
          return updated;
        });
        setPhase('complete');
        setIsRetrying(false);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [phase, isRetrying, currentBranchIndex]);

  const handleRetry = () => {
    if (branches.length >= 2 || isRetrying || phase !== 'complete') return;

    // Set up the new branch
    const newBranchIndex = 1;
    setBranches((prev) => [...prev, '']);
    setCurrentBranchIndex(newBranchIndex);
    setIsRetrying(true);
    setPhase('streaming');
    setStreamedContent('');
  };

  const handleCopy = () => {
    const currentBranch = branches[currentBranchIndex] || streamedContent;
    navigator.clipboard.writeText(currentBranch);
  };

  const handleDownload = () => {
    const currentBranch = branches[currentBranchIndex] || streamedContent;
    const blob = new Blob([currentBranch], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'response.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const restartDemo = () => {
    setPhase('empty');
    setThinkingSeconds(0);
    setStreamedContent('');
    setShowTools(false);
    setBranches(['']);
    setCurrentBranchIndex(0);
    setIsRetrying(false);
  };

  const showUserMessage = phase !== 'empty';
  const showAssistantMessage =
    phase === 'thinking' || phase === 'streaming' || phase === 'complete';
  const isThinking = phase === 'thinking';
  const isComplete = phase === 'complete';
  const showBranchNav = branches.length > 1 && isComplete && !isRetrying;

  return (
    <div className="h-full w-full relative flex flex-col">
      <Conversation className="flex-1 min-h-0 mb-4">
        <ConversationContent className="p-0">
          {phase === 'empty' ? (
            <ConversationEmptyState title="Start a conversation with Atlas">
              <div className="flex flex-col flex-wrap gap-4 justify-left px-[3.3675%] md:px-[6.735%] py-2">
                <Suggestion
                  suggestion="Are there any anomalies, risks, or non-conformances identified?"
                  className="block bg-card rounded-lg p-3.75 text-left text-base font-medium whitespace-normal"
                />
                <Suggestion
                  suggestion="What asset or equipment is being evaluated and what is its operational context?"
                  className="block bg-card rounded-lg p-3.75 text-left text-base font-medium whitespace-normal"
                />
                <Suggestion
                  suggestion="What are the current field conditions and observations recorded?"
                  className="block bg-card rounded-lg p-3.75 text-left text-base font-medium whitespace-normal"
                />
              </div>
            </ConversationEmptyState>
          ) : (
            <>
              {showUserMessage && (
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
              )}

              {showAssistantMessage && (
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
                          {(isThinking && index === currentBranchIndex) ||
                          (isRetrying &&
                            index === currentBranchIndex &&
                            !branch) ? (
                            <Shimmer variant="nordic">
                              {isRetrying
                                ? 'Generating alternative response…'
                                : thinkingPhrases[phraseIndex]}
                            </Shimmer>
                          ) : (
                            <>
                              <span className="text-muted-foreground text-sm">
                                Thought for {thinkingSeconds} seconds
                              </span>
                              <MessageResponse controls={false}>
                                {branch ||
                                  (index === currentBranchIndex
                                    ? streamedContent
                                    : '')}
                              </MessageResponse>
                              {branch &&
                                !(
                                  phase === 'streaming' &&
                                  index === currentBranchIndex
                                ) && (
                                  <Sources className="flex flex-col gap-2 py-3">
                                    <Source
                                      href="https://example.com/21PT2019"
                                      title="21PT1019"
                                      icon={IconChartLine}
                                      target="_blank"
                                    />
                                    <Source
                                      href="https://example.com/pumpB.img"
                                      title="pumpB.img"
                                      icon={IconPhoto}
                                      target="_blank"
                                    />
                                    <Source
                                      href="https://example.com/PumpB.pdf"
                                      title="PumpB.pdf"
                                      icon={IconFile}
                                      target="_blank"
                                    />
                                    <Source
                                      href="https://example.com/120_oaoXR"
                                      title="120_oaoXR"
                                      icon={IconBriefcase}
                                      target="_blank"
                                    />
                                  </Sources>
                                )}
                              {branch &&
                                showTools &&
                                !(
                                  phase === 'streaming' &&
                                  index === currentBranchIndex
                                ) && (
                                  <div className="flex flex-col gap-2 py-3">
                                    <Reasoning>
                                      <ReasoningHeader />
                                      <ReasoningContent>
                                        <ReasoningItem>
                                          <Tool defaultOpen={false}>
                                            <ToolHeader
                                              title="Search database"
                                              type="tool-call"
                                            />
                                            <ToolContent>
                                              <ToolInput
                                                input={searchDatabaseInput}
                                              />
                                              <ToolOutput
                                                output={searchDatabaseOutput}
                                                errorText={undefined}
                                              />
                                            </ToolContent>
                                          </Tool>
                                        </ReasoningItem>
                                        <ReasoningItem>
                                          <Tool defaultOpen={false}>
                                            <ToolHeader
                                              title="Fetch sensor data"
                                              type="tool-call"
                                            />
                                            <ToolContent>
                                              <ToolInput
                                                input={fetchSensorDataInput}
                                              />
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
                              {branch &&
                                !(
                                  phase === 'streaming' &&
                                  index === currentBranchIndex
                                ) && (
                                  <MessageActions className="justify-between">
                                    <div className="flex items-center gap-2">
                                      <MessageAction
                                        size="icon-sm"
                                        label="Copy"
                                        tooltip="Copy"
                                        onClick={handleCopy}
                                      >
                                        <IconCopy className="w-3 h-3" />
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
                                        disabled={
                                          branches.length >= 2 || isRetrying
                                        }
                                      >
                                        <IconRefresh className="w-3 h-3" />
                                      </MessageAction>
                                      {showBranchNav && (
                                        <MessageBranchSelector
                                          from="assistant"
                                          className="px-0"
                                        >
                                          <MessageBranchPrevious />
                                          <MessageBranchPage />
                                          <MessageBranchNext />
                                        </MessageBranchSelector>
                                      )}
                                    </div>
                                    <MessageAction
                                      size="sm"
                                      onClick={() => setShowTools(!showTools)}
                                      data-active={showTools}
                                      className="data-[active=true]:bg-accent"
                                    >
                                      <IconBrain className="w-3.5 h-3.5" />
                                      {showTools
                                        ? 'Hide reasoning'
                                        : 'Show reasoning'}
                                    </MessageAction>
                                  </MessageActions>
                                )}
                            </>
                          )}
                        </MessageContent>
                      </Message>
                    ))}
                  </MessageBranchContent>
                </MessageBranch>
              )}
            </>
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <PromptInputProvider>
        <PromptInput onSubmit={() => {}}>
          <PromptInputBody>
            <PromptInputTextarea placeholder="Ask about your assets..." />
          </PromptInputBody>
          <PromptInputFooter>
            <PromptInputTools>
              <PromptInputButton size="icon-sm">
                <IconAdjustments />
              </PromptInputButton>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    Agent model
                    <IconChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>GPT-4</DropdownMenuItem>
                  <DropdownMenuItem>Claude</DropdownMenuItem>
                  <DropdownMenuItem>Gemini</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </PromptInputTools>
            <PromptInputSubmit />
          </PromptInputFooter>
        </PromptInput>
      </PromptInputProvider>

      {/* Restart button overlay */}
      {isComplete && (
        <Button
          variant="outline"
          onClick={restartDemo}
          className="absolute top-4 right-4 flex items-center gap-2 z-10"
          size="sm"
        >
          <IconRefresh className="h-4 w-4" />
          Replay demo
        </Button>
      )}
    </div>
  );
}

function InteractiveDemos({
  demoType,
  setDemoType,
}: {
  demoType: 'chat' | 'dashboard1' | 'dashboard2';
  setDemoType: (type: 'chat' | 'dashboard1' | 'dashboard2') => void;
}) {
  const [width, setWidth] = useState(1200);
  const [showGrid, setShowGrid] = useState(false);

  // Keyboard shortcut for grid toggle (Ctrl/Cmd + G)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'g') {
        e.preventDefault();
        setShowGrid((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getCurrentBreakpoint = () => {
    if (width >= 1536) return '8xl';
    if (width >= 1280) return '7xl';
    if (width >= 1024) return '5xl';
    if (width >= 768) return '3xl';
    if (width >= 640) return '2xl';
    return 'base';
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium">Layout type:</label>
          <div className="flex gap-2">
            <Button
              onClick={() => setDemoType('dashboard1')}
              variant={demoType === 'dashboard1' ? 'default' : 'ghost'}
              size="sm"
            >
              Dashboard 1
            </Button>
            <Button
              onClick={() => setDemoType('dashboard2')}
              variant={demoType === 'dashboard2' ? 'default' : 'ghost'}
              size="sm"
            >
              Dashboard 2
            </Button>
            <Button
              onClick={() => setDemoType('chat')}
              variant={demoType === 'chat' ? 'default' : 'ghost'}
              size="sm"
            >
              AI Chat
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label className="text-sm font-medium">Container width:</label>
          <input
            type="range"
            min="280"
            max="1600"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            className="flex-1"
          />
          <span className="text-sm font-mono w-20 text-right">{width}px</span>
          <span className="text-sm font-medium px-2 py-1 bg-primary text-primary-foreground rounded">
            {getCurrentBreakpoint()}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowGrid(!showGrid)}
            className="px-3 py-1.5 text-xs rounded-md bg-muted hover:bg-muted/80 transition-colors flex items-center gap-2"
          >
            <kbd className="px-1.5 py-0.5 bg-background rounded text-[10px] border">
              {navigator.platform.includes('Mac') ? '⌘' : 'Ctrl'}+G
            </kbd>
            {showGrid ? 'Hide' : 'Show'} Grid
          </button>
          <span className="text-xs text-muted-foreground">
            Press {navigator.platform.includes('Mac') ? 'Cmd' : 'Ctrl'}+G to
            toggle grid overlay
          </span>
        </div>
      </div>

      {/* Interactive container - Outer wrapper for background */}
      <div className="bg-foreground/10 rounded-lg p-2">
        <div
          className="@container bg-background rounded-lg overflow-hidden transition-all duration-300 mx-auto relative"
          style={{ width: `${width}px`, maxWidth: '100%' }}
        >
          {demoType === 'dashboard1' || demoType === 'dashboard2' ? (
            <>
              {/* TopBar spanning full width before grid */}
              <Topbar>
                <TopbarLeft>
                  <TopbarBreadcrumbs>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="#">Application</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>My dashboard</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </TopbarBreadcrumbs>
                </TopbarLeft>
                <TopbarCenter />
                <TopbarRight>
                  <Button variant="ghost" size="sm">
                    <IconCalendar className="h-4 w-4 mr-2" />
                    12/17/2024
                  </Button>
                  <Button size="sm">Button</Button>
                </TopbarRight>
              </Topbar>

              {/* Grid with stepped max-widths using semantic Tailwind utilities */}
              <div className="mx-auto px-2 py-6 max-w-2xl @2xl:max-w-2xl @3xl:max-w-3xl @5xl:max-w-5xl @7xl:max-w-7xl @8xl:max-w-8xl grid grid-cols-12 gap-3 relative">
                {/* Grid overlay (Ctrl+G toggle) */}
                {showGrid && (
                  <div className="absolute inset-x-2 inset-y-0 grid grid-cols-12 gap-3 pointer-events-none z-10">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-blue-500/10 border border-blue-500/30"
                      />
                    ))}
                  </div>
                )}

                {demoType === 'dashboard1' ? (
                  <>
                    {/* Dashboard 1: Unified Grid - Status Cards */}

                    {/* Dashboard 1: Unified Grid - Status Cards */}
                    <Card className="col-span-12 @3xl:col-span-4">
                      <CardContent>
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">
                              Critical
                            </div>
                            <div className="text-2xl font-bold">3</div>
                          </div>
                          <Badge
                            variant="error"
                            className="flex items-center gap-1"
                          >
                            <IconAlertTriangle className="h-3 w-3" />
                            P-401
                          </Badge>
                        </div>
                        <div className="mt-3 text-xs text-muted-foreground flex items-center gap-1">
                          <IconTrendingUp className="h-3 w-3 text-destructive" />
                          <span>Detected 5 min ago</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="col-span-12 @3xl:col-span-4">
                      <CardContent>
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">
                              Warning
                            </div>
                            <div className="text-2xl font-bold">8</div>
                          </div>
                          <Badge className="flex items-center gap-1 bg-amber-500/10 text-amber-700 dark:text-amber-400">
                            <IconAlertCircle className="h-3 w-3" />
                            P-401
                          </Badge>
                        </div>
                        <div className="mt-3 text-xs text-muted-foreground flex items-center gap-1">
                          <IconClock className="h-3 w-3" />
                          <span>Last updated 2hrs ago</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="col-span-12 @3xl:col-span-4">
                      <CardContent>
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">
                              Ok
                            </div>
                            <div className="text-2xl font-bold">42</div>
                          </div>
                          <Badge
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            <IconCircleCheck className="h-3 w-3" />
                            P-401
                          </Badge>
                        </div>
                        <div className="mt-3 text-xs text-muted-foreground flex items-center gap-1">
                          <IconTrendingDown className="h-3 w-3 text-green-600" />
                          <span>Trending down</span>
                        </div>
                      </CardContent>
                    </Card>

                    {/* KPI Row - 4 cards */}
                    <Card className="col-span-6 @3xl:col-span-3">
                      <CardContent>
                        <div className="text-xs text-muted-foreground mb-2">
                          Bar Chart
                        </div>
                        <div className="text-lg font-semibold mb-2">
                          4.2{' '}
                          <span className="text-sm text-muted-foreground">
                            V-192
                          </span>
                        </div>
                        <div className="h-20 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded flex items-end p-2 gap-1">
                          {[40, 65, 45, 80, 55, 70, 60].map((height, i) => (
                            <div
                              key={i}
                              className="flex-1 bg-primary/60 rounded"
                              style={{ height: `${height}%` }}
                            />
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="col-span-6 @3xl:col-span-3 hidden @2xl:block">
                      <CardContent>
                        <div className="text-xs text-muted-foreground mb-2">
                          Heatmap
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                          {heatmapData.map((intensity, i) => (
                            <div
                              key={i}
                              className="aspect-square rounded"
                              style={{
                                backgroundColor: `rgba(59, 130, 246, ${0.2 + intensity * 0.2})`,
                              }}
                            />
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="col-span-6 @3xl:col-span-3">
                      <CardContent>
                        <div className="text-xs text-muted-foreground mb-2">
                          Progress
                        </div>
                        <div className="text-sm font-medium mb-2">
                          8 of 12 tasks complete
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: '67%' }}
                          />
                        </div>
                        <div className="text-xs text-muted-foreground mt-2">
                          On track for completion by Friday
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="col-span-6 @3xl:col-span-3 hidden @2xl:block">
                      <CardContent>
                        <div className="text-xs text-muted-foreground mb-2">
                          Activity
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <IconCircleCheck className="h-4 w-4 text-green-600" />
                            <span className="text-sm">Process unit 21</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <IconAlertTriangle className="h-4 w-4 text-amber-600" />
                            <span className="text-sm">Feed Pump A</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <IconCircleCheck className="h-4 w-4 text-green-600" />
                            <span className="text-sm">Drain system</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Charts Row */}
                    <Card className="col-span-12 @5xl:col-span-8">
                      <CardContent>
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <div className="text-sm font-medium">
                              Trending up by 5.2% this month
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Total visitors for the last 6 months
                            </div>
                          </div>
                          <IconChartBar className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="h-48 bg-linear-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded flex items-end p-4 gap-2">
                          {[60, 45, 70, 55, 80, 65, 75, 85, 70, 90, 75, 80].map(
                            (height, i) => (
                              <div
                                key={i}
                                className="flex-1 bg-linear-to-t from-primary/80 to-primary/40 rounded"
                                style={{ height: `${height}%` }}
                              />
                            )
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="col-span-12 @5xl:col-span-4 hidden @5xl:block">
                      <CardContent>
                        <div className="text-xs text-muted-foreground mb-2">
                          Image widget
                        </div>
                        <div className="h-48 bg-linear-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded flex items-center justify-center">
                          <IconPhoto className="h-12 w-12 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  </>
                ) : (
                  <>
                    {/* Dashboard 2: Main Area (nested grid) */}
                    <div className="col-span-12 @5xl:col-span-8 grid grid-cols-12 gap-3">
                      {/* Status Cards inside main */}
                      <Card className="col-span-12 @3xl:col-span-4">
                        <CardContent>
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="text-sm text-muted-foreground mb-1">
                                Critical
                              </div>
                              <div className="text-2xl font-bold">3</div>
                            </div>
                            <Badge variant="error">
                              <IconAlertTriangle className="h-3 w-3 mr-1" />
                              P-401
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="col-span-12 @3xl:col-span-4">
                        <CardContent>
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="text-sm text-muted-foreground mb-1">
                                Warning
                              </div>
                              <div className="text-2xl font-bold">8</div>
                            </div>
                            <Badge className="bg-amber-500/10 text-amber-700 dark:text-amber-400">
                              <IconAlertCircle className="h-3 w-3 mr-1" />
                              P-401
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="col-span-12 @3xl:col-span-4">
                        <CardContent>
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="text-sm text-muted-foreground mb-1">
                                Ok
                              </div>
                              <div className="text-2xl font-bold">42</div>
                            </div>
                            <Badge variant="secondary">
                              <IconCircleCheck className="h-3 w-3 mr-1" />
                              P-401
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Large chart in main */}
                      <Card className="col-span-12">
                        <CardContent>
                          <div className="text-sm font-medium mb-2">
                            Main Chart
                          </div>
                          <div className="h-48 bg-linear-to-br from-blue-500/10 to-purple-500/10 rounded flex items-end p-4 gap-1">
                            {[60, 45, 70, 55, 80, 65, 75, 85].map(
                              (height, i) => (
                                <div
                                  key={i}
                                  className="flex-1 bg-primary/60 rounded"
                                  style={{ height: `${height}%` }}
                                />
                              )
                            )}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Two smaller charts */}
                      <Card className="col-span-12 @3xl:col-span-6">
                        <CardContent>
                          <div className="text-sm font-medium mb-2">
                            Metric A
                          </div>
                          <div className="text-2xl font-bold mb-2">4.2k</div>
                          <div className="h-20 bg-linear-to-r from-green-500/20 to-blue-500/20 rounded" />
                        </CardContent>
                      </Card>

                      <Card className="col-span-12 @3xl:col-span-6">
                        <CardContent>
                          <div className="text-sm font-medium mb-2">
                            Metric B
                          </div>
                          <div className="text-2xl font-bold mb-2">8.1k</div>
                          <div className="h-20 bg-linear-to-r from-purple-500/20 to-pink-500/20 rounded" />
                        </CardContent>
                      </Card>
                    </div>

                    {/* Dashboard 2: Sidebar (collapses below main on small screens) */}
                    <div className="col-span-12 @5xl:col-span-4 space-y-3">
                      <Card>
                        <CardContent>
                          <div className="text-sm font-medium mb-3">
                            Recent Activity
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-start gap-2">
                              <IconClock className="h-4 w-4 text-muted-foreground mt-0.5" />
                              <div>
                                <div className="text-sm">
                                  Pump B-401 maintenance
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  2 hours ago
                                </div>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <IconAlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
                              <div>
                                <div className="text-sm">Vibration warning</div>
                                <div className="text-xs text-muted-foreground">
                                  5 hours ago
                                </div>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <IconCircleCheck className="h-4 w-4 text-green-600 mt-0.5" />
                              <div>
                                <div className="text-sm">
                                  System check complete
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  1 day ago
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent>
                          <div className="text-sm font-medium mb-3">
                            Quick Stats
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">
                                Uptime
                              </span>
                              <span className="text-sm font-medium">99.8%</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">
                                Response
                              </span>
                              <span className="text-sm font-medium">1.2s</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-muted-foreground">
                                Load
                              </span>
                              <span className="text-sm font-medium">67%</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent>
                          <div className="text-sm font-medium mb-3">Alerts</div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Critical</span>
                              <Badge variant="error" className="text-xs">
                                3
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Warnings</span>
                              <Badge className="text-xs bg-amber-500/10 text-amber-700 dark:text-amber-400">
                                8
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              {/* AI Chat: No TopBar, just grid */}
              <div className="mx-auto px-2 py-6 max-w-2xl @2xl:max-w-2xl @3xl:max-w-3xl @5xl:max-w-5xl @7xl:max-w-7xl @8xl:max-w-8xl grid grid-cols-12 gap-3 relative">
                {/* Grid overlay (Ctrl+G toggle) */}
                {showGrid && (
                  <div className="absolute inset-x-2 inset-y-6 grid grid-cols-12 gap-3 pointer-events-none z-10">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-blue-500/10 border border-blue-500/30"
                      />
                    ))}
                  </div>
                )}

                {/* AI Chat: Responsive - full width on small screens, centered 8 cols at 5xl+ */}
                {/* Uses col-span-12 by default, then col-start-3 col-span-8 at @5xl: (1024px) */}
                <div className="col-span-12 @5xl:col-start-3 @5xl:col-span-8 flex flex-col h-[800px]">
                  <AIChatDemo />
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-sm">
        {(demoType === 'dashboard1' || demoType === 'dashboard2') && (
          <>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-background border border-border rounded" />
              <span>Container (@container)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border border-border bg-card rounded" />
              <span>Content cards</span>
            </div>
          </>
        )}
        {showGrid && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500/10 border border-blue-500/30 rounded" />
            <span>Grid columns (12-col system)</span>
          </div>
        )}
      </div>
    </div>
  );
}

function CodeExample({
  demoType,
}: {
  demoType: 'chat' | 'dashboard1' | 'dashboard2';
}) {
  // Dashboard 1 Layout - Unified grid pattern
  const dashboard1Code = `<div className="@container">
  <div className="mx-auto px-2 py-6 max-w-2xl @2xl:max-w-2xl @3xl:max-w-3xl @5xl:max-w-5xl @7xl:max-w-7xl @8xl:max-w-8xl grid grid-cols-12 gap-3">

    {/* Status cards - 3 equal cards */}
    <Card className="col-span-12 @3xl:col-span-4">{/* Critical alerts */}</Card>
    <Card className="col-span-12 @3xl:col-span-4">{/* Warning alerts */}</Card>
    <Card className="col-span-12 @3xl:col-span-4">{/* OK status */}</Card>

    {/* KPI Row - 4 cards, some hide at smaller sizes */}
    <Card className="col-span-6 @3xl:col-span-3">{/* Bar chart */}</Card>
    <Card className="col-span-6 @3xl:col-span-3 hidden @2xl:block">{/* Heatmap */}</Card>
    <Card className="col-span-6 @3xl:col-span-3">{/* Progress */}</Card>
    <Card className="col-span-6 @3xl:col-span-3 hidden @2xl:block">{/* Activity */}</Card>

    {/* Large chart + optional image widget */}
    <Card className="col-span-12 @5xl:col-span-8">{/* Main chart */}</Card>
    <Card className="col-span-12 @5xl:col-span-4 hidden @5xl:block">{/* Image */}</Card>

  </div>
</div>`;

  // Dashboard 2 Layout - Main + Sidebar with nested grids
  const dashboard2Code = `<div className="@container">
  <div className="mx-auto px-2 py-6 max-w-2xl @2xl:max-w-2xl @3xl:max-w-3xl @5xl:max-w-5xl @7xl:max-w-7xl @8xl:max-w-8xl grid grid-cols-12 gap-3">

    {/* Main area - nested 12-col grid */}
    <div className="col-span-12 @5xl:col-span-8 grid grid-cols-12 gap-3">
      {/* Status cards within main area */}
      <Card className="col-span-12 @3xl:col-span-4">{/* Critical */}</Card>
      <Card className="col-span-12 @3xl:col-span-4">{/* Warning */}</Card>
      <Card className="col-span-12 @3xl:col-span-4">{/* OK */}</Card>

      {/* Large chart */}
      <Card className="col-span-12">{/* Main chart */}</Card>

      {/* Two smaller charts */}
      <Card className="col-span-12 @3xl:col-span-6">{/* Metric A */}</Card>
      <Card className="col-span-12 @3xl:col-span-6">{/* Metric B */}</Card>
    </div>

    {/* Sidebar - collapses below main on smaller screens */}
    <div className="col-span-12 @5xl:col-span-4 space-y-3">
      <Card>{/* Recent activity */}</Card>
      <Card>{/* Quick stats */}</Card>
      <Card>{/* Alerts */}</Card>
    </div>

  </div>
</div>`;

  // AI Chat Layout - Responsive 8/12 columns
  const chatCode = `<div className="@container">
  <div className="mx-auto px-2 py-6 max-w-2xl @2xl:max-w-2xl @3xl:max-w-3xl @5xl:max-w-5xl @7xl:max-w-7xl @8xl:max-w-8xl grid grid-cols-12 gap-3">

    {/* Responsive: Full width (12 cols) below 1024px, centered 8 cols at 1024px+ */}
    <div className="col-span-12 @5xl:col-start-3 @5xl:col-span-8">
      <Conversation>
        {/* Your conversation content */}
      </Conversation>
    </div>

  </div>
</div>`;

  return (
    <div className="space-y-6">
      {demoType === 'dashboard1' && (
        <div>
          <h3 className="text-lg font-semibold mb-2">
            Dashboard 1: Unified Grid
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            Single 12-column grid containing all cards. Cards hide at smaller
            breakpoints to maintain usable layouts. Simpler structure but may
            leave gaps when items hide.
          </p>
          <CodeBlock code={dashboard1Code} language="tsx" showLineNumbers />
        </div>
      )}
      {demoType === 'dashboard2' && (
        <div>
          <h3 className="text-lg font-semibold mb-2">
            Dashboard 2: Main + Sidebar
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            Nested grid pattern with main content area (8 cols) and sidebar (4
            cols). Sidebar collapses below main on smaller screens. More
            predictable responsive behaviour with no gaps.
          </p>
          <CodeBlock code={dashboard2Code} language="tsx" showLineNumbers />
        </div>
      )}
      {demoType === 'chat' && (
        <div>
          <h3 className="text-lg font-semibold mb-2">AI Chat Layout</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Responsive layout: 12 columns on mobile/tablet, 8 centred columns on
            desktop (1024px+)
          </p>
          <CodeBlock code={chatCode} language="tsx" showLineNumbers />
          <p className="text-sm text-muted-foreground mt-3">
            For complete implementation details and examples, see the{' '}
            <Link
              href="/ai/components/conversation"
              className="text-primary hover:underline"
            >
              Conversation component documentation
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
}

function KeyConcepts() {
  return (
    <div className="grid gap-4 @sm:grid-cols-2">
      <div className="p-4 border border-border rounded-lg">
        <h4 className="font-medium mb-2">Container Query Context</h4>
        <p className="text-sm text-muted-foreground mb-2">
          Wrap content with{' '}
          <code className="bg-muted px-1 rounded">@container</code> to enable
          responsive behaviour based on container width, not viewport.
        </p>
        <code className="text-xs bg-muted px-2 py-1 rounded block">
          @container
        </code>
      </div>

      <div className="p-4 border border-border rounded-lg">
        <h4 className="font-medium mb-2">12-Column Grid</h4>
        <p className="text-sm text-muted-foreground mb-2">
          Use a consistent 12-column system at all breakpoints for maximum
          flexibility.
        </p>
        <code className="text-xs bg-muted px-2 py-1 rounded block">
          grid grid-cols-12
        </code>
      </div>

      <div className="p-4 border border-border rounded-lg">
        <h4 className="font-medium mb-2">Column Spanning</h4>
        <p className="text-sm text-muted-foreground mb-2">
          Control element width with spans: full (12), half (6), third (4),
          quarter (3). All breakpoints use 12 columns.
        </p>
        <code className="text-xs bg-muted px-2 py-1 rounded block">
          col-span-12 @sm:col-span-6 @md:col-span-4 @lg:col-span-3
        </code>
      </div>

      <div className="p-4 border border-border rounded-lg">
        <h4 className="font-medium mb-2">Centered Max-Width</h4>
        <p className="text-sm text-muted-foreground mb-2">
          Centre content with stepped max-widths for all breakpoints (base to
          2xl).
        </p>
        <code className="text-xs bg-muted px-2 py-1 rounded block">
          mx-auto max-w-md @sm:max-w-2xl @md:max-w-4xl @lg:max-w-6xl
          @xl:max-w-7xl
        </code>
      </div>
    </div>
  );
}

export default function LayoutsPage() {
  const [demoType, setDemoType] = useState<
    'chat' | 'dashboard1' | 'dashboard2'
  >('dashboard1');

  return (
    <div className="space-y-12">
      {/* Header - Centered */}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight">Layouts</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Container query-based responsive layout system with a unified
          12-column grid across all breakpoints (base to 2xl)
        </p>
      </div>

      {/* Key Concepts - Centered */}
      <section className="space-y-6 max-w-4xl mx-auto">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Key Concepts</h2>
          <p className="text-muted-foreground">
            Core patterns for building responsive layouts
          </p>
        </div>
        <KeyConcepts />
      </section>

      {/* Breakpoints - Centered */}
      <section className="space-y-6 max-w-4xl mx-auto">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Breakpoints</h2>
          <p className="text-muted-foreground">
            Container query breakpoints aligned with Tailwind&apos;s naming
            convention
          </p>
        </div>
        <BreakpointTable />
      </section>

      {/* Max Widths - Centered */}
      <section className="space-y-6 max-w-4xl mx-auto">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Content Max-Widths</h2>
          <p className="text-muted-foreground">
            Stepped max-widths for centred content areas
          </p>
        </div>
        <MaxWidthTable />
      </section>

      {/* Interactive Demo - Full Width of main element */}
      <section className="space-y-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-2">Interactive Demos</h2>
          <p className="text-muted-foreground">
            Explore three layout patterns: Dashboard 1 (unified grid), Dashboard
            2 (main + sidebar with nested grids), and AI Chat (8 centred columns
            at 1024px+ for focused reading). Use the slider to test
            responsiveness and press Ctrl+G to toggle grid overlay.
          </p>
        </div>
        {/* Break out of centered container to use full main width */}
        <div className="px-3">
          <InteractiveDemos demoType={demoType} setDemoType={setDemoType} />
        </div>
      </section>

      {/* Usage - Centered */}
      <section className="space-y-6 max-w-4xl mx-auto">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Usage</h2>
          <p className="text-muted-foreground">
            Copy-paste ready code examples for common layout patterns
          </p>
        </div>
        <CodeExample demoType={demoType} />
      </section>
    </div>
  );
}
