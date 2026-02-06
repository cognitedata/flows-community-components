"use client";

import { Button } from "@/components/ui/aura/button";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ui/aura/conversation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/aura/dropdown-menu";
import { InlineCitation, InlineCitationLink } from "@/components/ui/aura/inline-citation";
import {
  Message,
  MessageAction,
  MessageActions,
  MessageAvatar,
  MessageAvatarIcon,
  MessageBranch,
  MessageBranchContent,
  MessageBranchNext,
  MessageBranchPage,
  MessageBranchPrevious,
  MessageBranchSelector,
  MessageContent,
  MessageResponse,
} from "@/components/ui/aura/message";
import {
  PromptInput,
  PromptInputBody,
  PromptInputButton,
  PromptInputFooter,
  PromptInputProvider,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@/components/ui/aura/prompt-input";
import {
  Reasoning,
  ReasoningContent,
  ReasoningHeader,
  ReasoningItem,
} from "@/components/ui/aura/reasoning";
import { Shimmer } from "@/components/ui/aura/shimmer";
import { Source, Sources } from "@/components/ui/aura/sources";
import { Suggestion } from "@/components/ui/aura/suggestion";
import { Tool, ToolContent, ToolHeader, ToolInput, ToolOutput } from "@/components/ui/aura/tool";
import { cn } from "@/lib/utils";
import {
  IconAdjustments,
  IconBrain,
  IconBriefcase,
  IconChartLine,
  IconChevronDown,
  IconCopy,
  IconDownload,
  IconFile,
  IconHash,
  IconPhoto,
  IconPlayerSkipForward,
  IconRefresh,
  IconWheel,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

// ============================================================================
// Constants
// ============================================================================

const thinkingPhrases = ["Searching database…", "Fetching sensor data…", "Formulating response…"];

const searchDatabaseInput = {
  asset_id: "21PT1019",
  data_types: ["vibration", "temperature", "rpm"],
  time_range: {
    start: "2024-12-03T00:00:00Z",
    end: "2024-12-04T00:00:00Z",
  },
  aggregation: "1h",
  include_metadata: true,
};

const searchDatabaseOutput = {
  status: "success",
  asset: {
    id: "21PT1019",
    name: "Centrifugal Pump B-Section",
    location: "Plant Floor 2, Bay 7",
    manufacturer: "Grundfos",
    model: "CR 95-2-2",
  },
  data_points_retrieved: 1247,
  time_range_actual: {
    start: "2024-12-03T00:00:00Z",
    end: "2024-12-04T00:00:00Z",
  },
};

const fetchSensorDataInput = {
  asset_id: "21PT1019",
  sensors: [
    {
      type: "vibration",
      unit: "mm/s",
      threshold_warning: 4.0,
      threshold_critical: 6.0,
    },
    {
      type: "temperature",
      unit: "celsius",
      threshold_warning: 80,
      threshold_critical: 90,
    },
    { type: "rpm", unit: "revolutions_per_minute" },
  ],
  analysis: {
    detect_anomalies: true,
    correlation_analysis: true,
    trend_detection: true,
  },
};

const fetchSensorDataOutput = {
  status: "success",
  anomalies_detected: 3,
  peak_values: {
    vibration: {
      value: 6.8,
      timestamp: "2024-12-03T03:15:00Z",
      status: "critical",
    },
    temperature: {
      value: 82.1,
      timestamp: "2024-12-03T03:15:00Z",
      status: "warning",
    },
    rpm: { value: 2912, timestamp: "2024-12-03T03:15:00Z" },
  },
  correlations: [
    { factors: ["vibration", "rpm"], coefficient: 0.87, significance: "high" },
    {
      factors: ["vibration", "temperature"],
      coefficient: 0.72,
      significance: "moderate",
    },
  ],
  recommended_action: "maintenance_inspection",
  urgency: "within_48_hours",
};

// Tokenize the markdown for streaming effect
const responseTokens = [
  "Based",
  " on",
  " my",
  " analysis",
  " of",
  " the",
  " sensor",
  " data",
  " for",
  " pump",
  " **21PT1019**,",
  " I've",
  " identified",
  " several",
  " anomalies",
  " that",
  " correlate",
  " with",
  " the",
  " reported",
  " vibration",
  " issues.",
  "\n\n",
  "The",
  " vibration",
  " amplitude",
  " exceeded",
  " normal",
  " operating",
  " thresholds",
  " at",
  " multiple",
  " intervals",
  " during",
  " the",
  " past",
  " 24",
  " hours.",
  " Here's",
  " a",
  " summary",
  " of",
  " the",
  " key",
  " findings:",
  "\n\n",
  "| Timestamp",
  " | Vibration (mm/s)",
  " | Temperature (°C)",
  " | RPM",
  " | Status",
  " |",
  "\n",
  "|-----------|------------------|------------------|-----|--------|",
  "\n",
  "| 02:15:00",
  " | 4.2",
  " | 78.3",
  " | 2,847",
  " | Warning",
  " |",
  "\n",
  "| 03:15:00",
  " | 6.8",
  " | 82.1",
  " | 2,912",
  " | Critical",
  " |",
  "\n",
  "| 04:45:00",
  " | 5.1",
  " | 80.6",
  " | 2,889",
  " | Warning",
  " |",
  "\n",
  "| 06:30:00",
  " | 3.9",
  " | 76.2",
  " | 2,831",
  " | Normal",
  " |",
  "\n\n",
  "The",
  " spike",
  " at",
  " 03:15",
  " correlates",
  " strongly",
  " with",
  " a",
  " 12%",
  " increase",
  " in",
  " RPM",
  " and",
  " elevated",
  " bearing",
  " temperature.",
  " This",
  " pattern",
  " is",
  " consistent",
  " with",
  " early-stage",
  " bearing",
  " wear",
  " or",
  " shaft",
  " misalignment.",
  "\n\n",
  "I",
  " recommend",
  " scheduling",
  " a",
  " maintenance",
  " inspection",
  " within",
  " the",
  " next",
  " 48",
  " hours",
  " to",
  " prevent",
  " potential",
  " bearing",
  " failure.",
  " Priority",
  " should",
  " be",
  " given",
  " to",
  " checking",
  " the",
  " drive-end",
  " bearing",
  " assembly",
  " and",
  " verifying",
  " shaft",
  " alignment",
  " tolerances.",
];

const responseTokens2 = [
  "After",
  " conducting",
  " a",
  " detailed",
  " frequency",
  " spectrum",
  " analysis",
  " of",
  " pump",
  " **21PT1019**,",
  " the",
  " vibration",
  " patterns",
  " indicate",
  " a",
  " different",
  " root",
  " cause",
  " than",
  " initially",
  " suspected.",
  "\n\n",
  "The",
  " frequency",
  " analysis",
  " reveals",
  " dominant",
  " peaks",
  " at",
  " 1x",
  " running",
  " speed",
  " (",
  "47.5",
  " Hz",
  "),",
  " which",
  " is",
  " characteristic",
  " of",
  " mechanical",
  " imbalance",
  " rather",
  " than",
  " bearing",
  " wear.",
  " The",
  " amplitude",
  " progression",
  " shows:",
  "\n\n",
  "| Time",
  " Period",
  " | Imbalance",
  " Severity",
  " | Recommended",
  " Action",
  " |",
  "\n",
  "|------------|-------------------|-------------------|",
  "\n",
  "| 00:00-02:00",
  " | Acceptable",
  " | Monitor",
  " |",
  "\n",
  "| 02:00-04:00",
  " | Moderate",
  " | Plan",
  " Balancing",
  " |",
  "\n",
  "| 04:00-06:00",
  " | Severe",
  " | Immediate",
  " Action",
  " |",
  "\n\n",
  "This",
  " suggests",
  " the",
  " impeller",
  " may",
  " have",
  " accumulated",
  " debris",
  " or",
  " experienced",
  " erosion,",
  " causing",
  " mass",
  " imbalance.",
  " I",
  " recommend",
  " an",
  " immediate",
  " impeller",
  " inspection",
  " and",
  " dynamic",
  " balancing",
  " within",
  " 24",
  " hours.",
];

// ============================================================================
// Types
// ============================================================================

type ConversationPhase =
  | "empty"
  | "userMessage"
  | "waiting"
  | "thinking"
  | "streaming"
  | "complete";

export interface AIChatDemoProps {
  /** Additional CSS classes for the container */
  className?: string;
  /** Whether to show the border around the container (default: true) */
  showBorder?: boolean;
  /** Whether to show the border-t above the prompt input (default: true) */
  showPromptBorder?: boolean;
  /** Whether to show the replay button (default: true) */
  showReplayButton?: boolean;
  /** Custom height for the container (default: "h-[900px]") */
  height?: string;
  /** Whether to show the grid overlay (default: false) */
  showGrid?: boolean;
}

// ============================================================================
// Component
// ============================================================================

/**
 * AIChatDemo - A complete AI conversation demo showcasing all chat components.
 *
 * This component demonstrates the full AI response flow:
 * - Empty state with suggestions
 * - User messages with inline citations
 * - Thinking state with shimmer
 * - Streaming responses
 * - Sources
 * - Expandable tool calls with reasoning
 * - Message actions (copy, download, retry)
 * - Message branching
 *
 * The demo auto-plays and can be restarted with the "Replay demo" button.
 */
export function AIChatDemo({
  className,
  showBorder = true,
  showPromptBorder = true,
  showReplayButton = true,
  height = "h-[900px]",
  showGrid = false,
}: AIChatDemoProps) {
  const [phase, setPhase] = useState<ConversationPhase>("empty");
  const [thinkingSeconds, setThinkingSeconds] = useState(0);
  const [streamedContent, setStreamedContent] = useState("");
  const [showTools, setShowTools] = useState(false);
  const [branches, setBranches] = useState<string[]>([""]);
  const [currentBranchIndex, setCurrentBranchIndex] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);
  const [fastForward, setFastForward] = useState(false);

  // Derive shimmer phrase from thinking seconds (changes every 3 seconds)
  const phraseIndex = Math.min(Math.floor(thinkingSeconds / 3), 2);

  // Phase progression: empty (1s) → userMessage → waiting (1s) → thinking (9s) → streaming → complete
  useEffect(() => {
    if (phase === "empty") {
      const timer = setTimeout(() => setPhase("userMessage"), 1000);
      return () => clearTimeout(timer);
    }
    if (phase === "userMessage") {
      const timer = setTimeout(() => setPhase("waiting"), 100);
      return () => clearTimeout(timer);
    }
    if (phase === "waiting") {
      const timer = setTimeout(() => setPhase("thinking"), 1000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // Thinking phase timer
  useEffect(() => {
    if (phase !== "thinking") return;

    // Fast-forward: skip thinking phase
    if (fastForward) {
      setThinkingSeconds(9);
      setPhase("streaming");
      return;
    }

    const interval = setInterval(() => {
      setThinkingSeconds((prev) => {
        const next = prev + 1;
        if (next >= 9) {
          setPhase("streaming");
          return 9;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [phase, fastForward]);

  // Streaming phase - stream response tokens
  useEffect(() => {
    if (phase !== "streaming") return;

    let currentContent = "";
    let index = 0;
    const tokens = isRetrying ? responseTokens2 : responseTokens;

    // Fast-forward: show all tokens immediately
    if (fastForward) {
      const finalContent = tokens.join("");
      setStreamedContent(finalContent);
      setBranches((prev) => {
        const updated = [...prev];
        updated[currentBranchIndex] = finalContent;
        return updated;
      });
      setPhase("complete");
      setIsRetrying(false);
      setFastForward(false);
      return;
    }

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
        const finalContent = tokens.join("");
        setStreamedContent(finalContent);
        setBranches((prev) => {
          const updated = [...prev];
          updated[currentBranchIndex] = finalContent;
          return updated;
        });
        setPhase("complete");
        setIsRetrying(false);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [phase, isRetrying, currentBranchIndex, fastForward]);

  const handleRetry = () => {
    if (branches.length >= 2 || isRetrying || phase !== "complete") return;

    // Set up the new branch
    const newBranchIndex = 1;
    setBranches((prev) => [...prev, ""]);
    setCurrentBranchIndex(newBranchIndex);
    setIsRetrying(true);
    setPhase("streaming");
    setStreamedContent("");
  };

  const handleCopy = () => {
    const currentBranch = branches[currentBranchIndex] || streamedContent;
    navigator.clipboard.writeText(currentBranch);
  };

  const handleDownload = () => {
    const currentBranch = branches[currentBranchIndex] || streamedContent;
    const blob = new Blob([currentBranch], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "response.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const restartDemo = () => {
    setPhase("empty");
    setThinkingSeconds(0);
    setStreamedContent("");
    setShowTools(false);
    setBranches([""]);
    setCurrentBranchIndex(0);
    setIsRetrying(false);
    setFastForward(false);
  };

  const handleFastForward = () => {
    setFastForward(true);
  };

  const showUserMessage = phase !== "empty";
  const showAssistantMessage =
    phase === "thinking" || phase === "streaming" || phase === "complete";
  const isThinking = phase === "thinking";
  const isStreaming = phase === "streaming";
  const isComplete = phase === "complete";
  const showBranchNav = branches.length > 1 && isComplete && !isRetrying;
  const showFastForward = (isThinking || isStreaming) && !fastForward;

  return (
    <div className={cn("w-full flex", height)}>
      <div className="w-64 border-r flex items-center justify-center text-sm text-muted-foreground">
        Sidebar
      </div>

      {/* AI Chat Container - THIS IS THE SCROLLABLE AREA */}
      <div
        className={cn(
          "flex-1 relative @container overflow-y-auto",
          showBorder && "border rounded-lg",
          className
        )}
      >
        {/* Grid system for layout */}
        <div className="grid grid-cols-12 gap-3 px-2 py-6 mx-auto max-w-2xl @2xl:max-w-2xl @3xl:max-w-3xl @5xl:max-w-5xl @7xl:max-w-7xl @8xl:max-w-8xl relative min-h-full">
          {/* Grid overlay (Ctrl+G toggle) */}
          {showGrid && (
            <div className="absolute inset-x-2 inset-y-6 grid grid-cols-12 gap-3 pointer-events-none z-10">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="bg-blue-500/10 border border-blue-500/30" />
              ))}
            </div>
          )}

          {/* Content area - starts at column 3, spans 8 columns at 5xl+ */}
          <div className="col-span-12 @5xl:col-start-3 @5xl:col-span-8 min-h-full">
            <Conversation className="min-h-full">
              <ConversationContent>
                {phase === "empty" ? (
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
                                (isRetrying && index === currentBranchIndex && !branch) ? (
                                  <Shimmer variant="nordic">
                                    {isRetrying
                                      ? "Generating alternative response…"
                                      : thinkingPhrases[phraseIndex]}
                                  </Shimmer>
                                ) : (
                                  <>
                                    <span className="text-muted-foreground text-sm">
                                      Thought for {thinkingSeconds} seconds
                                    </span>
                                    <MessageResponse controls={false}>
                                      {branch ||
                                        (index === currentBranchIndex ? streamedContent : "")}
                                    </MessageResponse>
                                    {branch &&
                                      !(phase === "streaming" && index === currentBranchIndex) && (
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
                                      !(phase === "streaming" && index === currentBranchIndex) && (
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
                                                  <ToolHeader
                                                    title="Fetch sensor data"
                                                    type="tool-call"
                                                  />
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
                                    {branch &&
                                      !(phase === "streaming" && index === currentBranchIndex) && (
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
                                              disabled={branches.length >= 2 || isRetrying}
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
                                            {showTools ? "Hide reasoning" : "Show reasoning"}
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
          </div>
        </div>

        {/* Prompt Input - sticky positioned to stay at bottom while scrolling */}
        <div className="sticky bottom-0 left-0 right-0 grid grid-cols-12 gap-3 px-2 mx-auto max-w-2xl @2xl:max-w-2xl @3xl:max-w-3xl @5xl:max-w-5xl @7xl:max-w-7xl @8xl:max-w-8xl pointer-events-none">
          <div className="col-span-12 @5xl:col-start-3 @5xl:col-span-8 pointer-events-auto">
            <div className={cn("p-6", showPromptBorder && "border-t", "bg-background")}>
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
                        <DropdownMenuTrigger
                          render={
                            <Button variant="ghost" size="sm">
                              Agent model
                              <IconChevronDown />
                            </Button>
                          }
                        />
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
            </div>
          </div>
        </div>

        {/* Fast-forward button overlay - positioned at top right of AI Chat Container */}
        {showFastForward && (
          <Button
            variant="outline"
            onClick={handleFastForward}
            className="absolute top-4 right-4 flex items-center gap-2 z-10"
            size="sm"
          >
            <IconPlayerSkipForward className="h-4 w-4" />
            Fast-forward
          </Button>
        )}

        {/* Restart button overlay - positioned at top right of AI Chat Container */}
        {showReplayButton && isComplete && (
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
    </div>
  );
}
