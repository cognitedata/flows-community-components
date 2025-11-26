'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/aura/button';
import { Card, CardContent, CardHeader } from '@/components/ui/aura/card';
import { Input } from '@/components/ui/aura/input';
import { Badge } from '@/components/ui/aura/badge';
import { ScrollArea } from '@/components/ui/aura/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/aura/dropdown-menu';
import {
  IconChevronDown as ChevronDown,
  IconCode as Code,
  IconCopy as Copy,
  IconDots as MoreHorizontal,
  IconEdit as Edit,
  IconMessage as MessageSquare,
  IconRefresh as RefreshCw,
  IconSend as Send,
  IconShare as Share,
  IconThumbDown as ThumbsDown,
  IconThumbUp as ThumbsUp,
  IconTrash as Trash2,
} from '@tabler/icons-react';
import Image from 'next/image';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
  reactions?: string[];
  isCode?: boolean;
}

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content:
      "Hello! I'm your AI assistant. I can help you with coding questions, design problems, or general tasks. What would you like to work on today?",
    timestamp: new Date(Date.now() - 300000),
  },
];

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex items-center gap-2 justify-start"
    >
      <div className="flex items-center gap-2 px-2 py-1">
        <div className="flex space-x-1">
          <motion.div
            className="w-2 h-2 bg-muted-foreground rounded-full"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
          />
          <motion.div
            className="w-2 h-2 bg-muted-foreground rounded-full"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div
            className="w-2 h-2 bg-muted-foreground rounded-full"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
          />
        </div>
        <span className="text-xs text-muted-foreground">AI is thinking...</span>
      </div>
    </motion.div>
  );
}

function MessageBubble({
  message,
  onReact,
}: {
  message: Message;
  onReact: (messageId: string, reaction: string) => void;
}) {
  const [showActions, setShowActions] = useState(false);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: -10,
        scale: 0.95,
      }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 30,
        duration: 0.4,
      }}
      className={`flex gap-3 items-start ${
        message.role === 'user' ? 'justify-end' : 'justify-start'
      }`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div
        className={`max-w-[80%] ${
          message.role === 'user' ? 'bg-zinc-800 text-zinc-100' : ''
        } ${
          message.role === 'user' ? 'rounded-sm' : 'rounded-lg'
        } p-3 relative group`}
      >
        <div className="whitespace-pre-wrap text-sm">
          {message.isCode ? (
            <div className="bg-background/10 rounded p-2 font-mono text-xs">
              <div className="flex items-center gap-2 mb-2">
                <Code className="h-3 w-3" />
                <span className="text-xs opacity-70">Code example</span>
              </div>
              {message.content}
            </div>
          ) : (
            message.content
          )}
        </div>

        {/* Message Actions */}
        <AnimatePresence>
          {showActions && message.role === 'assistant' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute -bottom-8 left-0 flex items-center gap-1 bg-background border rounded-lg p-1 shadow-lg"
            >
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => onReact(message.id, '👍')}
              >
                <ThumbsUp className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => onReact(message.id, '👎')}
              >
                <ThumbsDown className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => navigator.clipboard.writeText(message.content)}
              >
                <Copy className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reactions */}
        {message.reactions && message.reactions.length > 0 && (
          <div className="flex items-center gap-1 mt-2">
            {message.reactions.map((reaction, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-xs bg-background/20 rounded px-1"
              >
                {reaction}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {message.role === 'user' && (
        <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src="/user-avatar.png"
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </motion.div>
  );
}

// Time Series Card Component
function TimeSeriesCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className="mt-3"
    >
      <Card className="bg-zinc-800/50 border-zinc-700">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <h4 className="text-sm font-medium">Pump 4B vibration trend</h4>
            <span className="text-xs text-muted-foreground ml-auto">
              Last 24 hours
            </span>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {/* Animated Area Chart */}
            <div className="h-32 bg-zinc-900/50 rounded-lg border border-zinc-700 relative overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 400 128">
                <defs>
                  <linearGradient
                    id="areaGradient"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      stopColor="rgb(239 68 68)"
                      stopOpacity="0.6"
                    />
                    <stop
                      offset="100%"
                      stopColor="rgb(239 68 68)"
                      stopOpacity="0.1"
                    />
                  </linearGradient>
                </defs>

                {/* Grid lines */}
                {[25, 50, 75, 100].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    y1={y}
                    x2="400"
                    y2={y}
                    stroke="rgb(63 63 70)"
                    strokeWidth="0.5"
                    opacity="0.3"
                  />
                ))}

                {/* Animated area chart */}
                <motion.path
                  d="M 0 100 L 57 85 L 114 68 L 171 50 L 228 15 L 285 35 L 342 55 L 400 75 L 400 128 L 0 128 Z"
                  fill="url(#areaGradient)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }}
                />

                {/* Animated line */}
                <motion.path
                  d="M 0 100 L 57 85 L 114 68 L 171 50 L 228 15 L 285 35 L 342 55 L 400 75"
                  fill="none"
                  stroke="rgb(239 68 68)"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }}
                />

                {/* Animated data points */}
                {[
                  { x: 0, y: 100, value: 3.2 },
                  { x: 57, y: 85, value: 4.1 },
                  { x: 114, y: 68, value: 6.8 },
                  { x: 171, y: 50, value: 8.2 },
                  { x: 228, y: 15, value: 12.4 },
                  { x: 285, y: 35, value: 9.1 },
                  { x: 342, y: 55, value: 7.3 },
                  { x: 400, y: 75, value: 5.9 },
                ].map((point, i) => (
                  <motion.circle
                    key={i}
                    cx={point.x}
                    cy={point.y}
                    r="3"
                    fill="rgb(239 68 68)"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.8 + i * 0.1 }}
                  />
                ))}
              </svg>

              <div className="absolute top-2 left-2 text-xs text-muted-foreground">
                mm/s
              </div>
              <div className="absolute bottom-2 right-2 text-xs text-red-400 font-medium">
                Peak: 12.4 mm/s
              </div>
            </div>

            {/* Key metrics */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-zinc-900/50 rounded p-2">
                <div className="text-lg font-semibold text-red-400">12.4</div>
                <div className="text-xs text-muted-foreground">Peak mm/s</div>
              </div>
              <div className="bg-zinc-900/50 rounded p-2">
                <div className="text-lg font-semibold text-yellow-400">8.2</div>
                <div className="text-xs text-muted-foreground">Avg mm/s</div>
              </div>
              <div className="bg-zinc-900/50 rounded p-2">
                <div className="text-lg font-semibold text-green-400">
                  &lt;6.0
                </div>
                <div className="text-xs text-muted-foreground">Normal</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Work Order Card Component
function WorkOrderCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.4 }}
      className="mt-3"
    >
      <Card className="bg-zinc-800/50 border-zinc-700">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <h4 className="text-sm font-medium">Recommended work order</h4>
            <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full ml-auto">
              High priority
            </span>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Asset:</span>
                <div className="font-medium">Pump 4B - bearing assembly</div>
              </div>
              <div>
                <span className="text-muted-foreground">Due by:</span>
                <div className="font-medium text-orange-400">48 hours</div>
              </div>
              <div>
                <span className="text-muted-foreground">Type:</span>
                <div className="font-medium">Preventive maintenance</div>
              </div>
              <div>
                <span className="text-muted-foreground">Estimated time:</span>
                <div className="font-medium">4-6 hours</div>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-sm text-muted-foreground">Tasks:</span>
              <div className="space-y-1.5">
                {[
                  'Inspect bearing housing for wear',
                  'Replace bearing assembly',
                  'Check alignment and balance',
                  'Update vibration baseline',
                ].map((task, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full"></div>
                    <span>{task}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                Create work order
              </Button>
              <Button size="sm" variant="outline">
                Schedule later
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Typing animation component
function TypingAnimation({
  text,
  onComplete,
  speed = 80,
  className = '',
}: {
  text: string;
  onComplete?: () => void;
  speed?: number;
  className?: string;
}) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {currentIndex < text.length && (
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block"
        >
          |
        </motion.span>
      )}
    </span>
  );
}

export default function AgentChatBlock() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  const [showTypingDemo, setShowTypingDemo] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const demoMessage =
    'There is abnormal vibration levels on Pump 4B. Show me the trend for the last 24 hours.';

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        '[data-radix-scroll-area-viewport]'
      );
      if (scrollContainer) {
        // Add a small delay to allow content to render before scrolling
        setTimeout(() => {
          // Custom smooth scroll with bounce effect
          const targetScrollTop = scrollContainer.scrollHeight;
          const startScrollTop = scrollContainer.scrollTop;
          const distance = targetScrollTop - startScrollTop;
          const duration = 2000; // Much slower scroll duration (2.5x slower)
          const startTime = performance.now();

          const animateScroll = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function with softer bounce at the end
            let easeProgress: number;
            if (progress < 0.95) {
              // Smooth ease out for most of the animation
              easeProgress = 1 - Math.pow(1 - progress / 0.95, 3);
            } else {
              // Softer, gentler bounce effect at the end
              const bounceProgress = (progress - 0.95) / 0.05;
              const bounce =
                Math.sin(bounceProgress * Math.PI * 1.5) *
                0.008 *
                (1 - bounceProgress);
              easeProgress = 1 + bounce;
            }

            const currentScrollTop = startScrollTop + distance * easeProgress;
            scrollContainer.scrollTop = currentScrollTop;

            if (progress < 1) {
              requestAnimationFrame(animateScroll);
            }
          };

          requestAnimationFrame(animateScroll);
        }, 150);
      }
    }
  }, [messages, isTyping, demoStep]);

  const startDemo = useCallback(() => {
    setIsDemoMode(true);
    setShowTypingDemo(true);
    setDemoStep(1);
  }, []);

  // Auto-start demo after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      startDemo();
    }, 2000); // Start demo after 2 seconds
    return () => clearTimeout(timer);
  }, [startDemo]);

  const handleTypingComplete = () => {
    setShowTypingDemo(false);
    setInput(demoMessage);
    // Simulate enter key press after typing completes
    setTimeout(() => {
      handleDemoSendMessage();
    }, 500);
  };

  const handleDemoSendMessage = () => {
    if (!demoMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: demoMessage.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setDemoStep(2);

    // Add 500ms delay before showing thinking indicator
    setTimeout(() => {
      setIsTyping(true);
    }, 500);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
          "I can see the vibration data for Pump 4B over the last 24 hours. The levels have indeed been abnormal, particularly between 2-4 AM and 10-12 PM. Here's what I found:\n\n• Average vibration: 8.2 mm/s (Normal: <6.0 mm/s)\n• Peak vibration: 12.4 mm/s at 3:15 AM\n• Pattern suggests bearing wear\n\nI recommend scheduling maintenance within the next 48 hours to prevent potential failure.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);

      // Show cards immediately after the message
      setTimeout(() => {
        setDemoStep(3);
      }, 100);
    }, 2000);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Add 500ms delay before showing thinking indicator
    setTimeout(() => {
      setIsTyping(true);
    }, 500);

    // Simulate AI response
    setTimeout(
      () => {
        setIsTyping(false);
        const responses = [
          "Here's a great solution for that! Let me break it down for you...",
          "I can help you with that. Here's what I recommend:",
          "That's an interesting challenge. Let me show you how to approach it:",
          '```jsx\nfunction Button({ children, onClick }) {\n  return (\n    <button \n      onClick={onClick}\n      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"\n    >\n      {children}\n    </button>\n  )\n}\n```',
        ];

        const response =
          responses[Math.floor(Math.random() * responses.length)];
        const isCodeResponse = response.includes('```');

        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: isCodeResponse
            ? response.replace(/```jsx|```/g, '').trim()
            : response,
          timestamp: new Date(),
          isCode: isCodeResponse,
        };

        setMessages((prev) => [...prev, aiMessage]);
      },
      1500 + Math.random() * 1000
    );
  };

  const handleReaction = (messageId: string, reaction: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? { ...msg, reactions: [...(msg.reactions || []), reaction] }
          : msg
      )
    );
  };

  const clearChat = () => {
    setMessages(initialMessages);
    setIsTyping(false);
    setIsDemoMode(false);
    setDemoStep(0);
    setShowTypingDemo(false);
  };

  const restartDemo = () => {
    clearChat();
    setTimeout(() => {
      startDemo();
    }, 500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <MessageSquare className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Agent chat</h1>
            <p className="text-lg text-muted-foreground">
              Interactive AI chat with typing indicators, reactions, and smooth
              animations
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Badge variant="secondary">Real-time messaging</Badge>
            <Badge variant="secondary">Typing indicators</Badge>
            <Badge variant="secondary">Message reactions</Badge>
            <Badge variant="secondary">Code highlighting</Badge>
          </div>
          <Button
            variant="outline"
            onClick={restartDemo}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Replay
          </Button>
        </div>
      </div>

      {/* Interactive Demo */}
      <div className="max-w-4xl mx-auto">
        {/* Chat Interface */}
        <div
          className="h-[600px] flex flex-col rounded-lg overflow-hidden border border-zinc-700"
          style={{ backgroundColor: '#18181b' }}
        >
          {/* Header */}
          <div className="border-b border-zinc-800 p-3 flex-shrink-0">
            <div className="flex items-center justify-between">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 p-2 h-auto"
                  >
                    <span className="text-lg font-semibold">
                      Pump 4B troubleshooting
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem>
                    <Edit className="h-4 w-4 mr-2" />
                    Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={restartDemo}
                  title="Restart Demo"
                >
                  <MessageSquare className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearChat}
                  title="Clear Chat"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 min-h-0">
            <ScrollArea className="h-full p-3" ref={scrollAreaRef}>
              <div className="space-y-4">
                <AnimatePresence>
                  {messages.map((message) => (
                    <MessageBubble
                      key={message.id}
                      message={message}
                      onReact={handleReaction}
                    />
                  ))}
                </AnimatePresence>

                {/* Show cards after vibration response */}
                {messages.some(
                  (msg) =>
                    msg.role === 'assistant' &&
                    msg.content.includes('vibration')
                ) && (
                  <div className="space-y-3 mt-4">
                    <TimeSeriesCard />
                    <WorkOrderCard />
                  </div>
                )}

                {isTyping && <TypingIndicator />}
              </div>
            </ScrollArea>
          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-zinc-800 flex-shrink-0">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  value={isDemoMode && showTypingDemo ? '' : input}
                  onChange={(e) => !isDemoMode && setInput(e.target.value)}
                  onKeyPress={(e) =>
                    !isDemoMode && e.key === 'Enter' && handleSendMessage()
                  }
                  placeholder={
                    isDemoMode && showTypingDemo ? '' : 'Ask me anything...'
                  }
                  className="flex-1"
                  disabled={isDemoMode}
                />
                {isDemoMode && showTypingDemo && (
                  <div className="absolute inset-0 flex items-center px-3 pointer-events-none">
                    <TypingAnimation
                      text={demoMessage}
                      onComplete={handleTypingComplete}
                      speed={60}
                      className="text-foreground"
                    />
                  </div>
                )}
              </div>
              <Button
                variant="default"
                onClick={handleSendMessage}
                disabled={!input.trim() || isDemoMode}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
