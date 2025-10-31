"use client";

import { Conversation, ConversationContent, ConversationEmptyState, ConversationScrollButton } from "@/components/ai-elements/draft/conversation";
import { Message, MessageContent, MessageAvatar, MessageAvatarIcon } from "@/components/ai-elements/draft/message";
import { Actions, Action } from "@/components/ai-elements/draft/actions";
import { MessageSquare } from "lucide-react";
import { IconWheel, IconThumbUp, IconThumbDown, IconCopy, IconShare, IconDotsVertical } from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/cognite/dropdown-menu";
import type { ComponentExamples } from "@/lib/component-examples/types";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

const messages: { key: string; value: string; name: string; avatar: string; from: "user" | "assistant" }[] = [
  {
    key: nanoid(),
    value: "Hello, how are you?",
    name: "Alex Johnson",
    avatar: "/user-avatar2.png",
    from: "user",
  },
  {
    key: nanoid(),
    value: "I'm good, thank you! How can I assist you today?",
    name: "AI Assistant",
    avatar: "https://github.com/openai.png",
    from: "assistant",
  },
  {
    key: nanoid(),
    value: "I'm looking for information about your services.",
    name: "Alex Johnson",
    avatar: "/user-avatar2.png",
    from: "user",
  },
  {
    key: nanoid(),
    value: "Sure! We offer a variety of AI solutions. What are you interested in?",
    name: "AI Assistant",
    avatar: "https://github.com/openai.png",
    from: "assistant",
  },
  {
    key: nanoid(),
    value: "I'm interested in natural language processing tools.",
    name: "Alex Johnson",
    avatar: "/user-avatar2.png",
    from: "user",
  },
  {
    key: nanoid(),
    value: "Great choice! We have several NLP APIs. Would you like a demo?",
    name: "AI Assistant",
    avatar: "https://github.com/openai.png",
    from: "assistant",
  },
  {
    key: nanoid(),
    value: "Yes, a demo would be helpful.",
    name: "Alex Johnson",
    avatar: "/user-avatar2.png",
    from: "user",
  },
  {
    key: nanoid(),
    value: "Alright, I can show you a sentiment analysis example. Ready?",
    name: "AI Assistant",
    avatar: "https://github.com/openai.png",
    from: "assistant",
  },
  {
    key: nanoid(),
    value: "Yes, please proceed.",
    name: "Alex Johnson",
    avatar: "/user-avatar2.png",
    from: "user",
  },
  {
    key: nanoid(),
    value: "Here is a sample: 'I love this product!' → Positive sentiment.",
    name: "AI Assistant",
    avatar: "https://github.com/openai.png",
    from: "assistant",
  },
  {
    key: nanoid(),
    value: "Impressive! Can it handle multiple languages?",
    name: "Alex Johnson",
    avatar: "/user-avatar2.png",
    from: "user",
  },
  {
    key: nanoid(),
    value: "Absolutely, our models support over 20 languages.",
    name: "AI Assistant",
    avatar: "https://github.com/openai.png",
    from: "assistant",
  },
  {
    key: nanoid(),
    value: "How do I get started with the API?",
    name: "Alex Johnson",
    avatar: "/user-avatar2.png",
    from: "user",
  },
  {
    key: nanoid(),
    value: "You can sign up on our website and get an API key instantly.",
    name: "AI Assistant",
    avatar: "https://github.com/openai.png",
    from: "assistant",
  },
  {
    key: nanoid(),
    value: "Is there a free trial available?",
    name: "Alex Johnson",
    avatar: "/user-avatar2.png",
    from: "user",
  },
  {
    key: nanoid(),
    value: "Yes, we offer a 14-day free trial with full access.",
    name: "AI Assistant",
    avatar: "https://github.com/openai.png",
    from: "assistant",
  },
  {
    key: nanoid(),
    value: "Thank you for the information!",
    name: "Alex Johnson",
    avatar: "/user-avatar2.png",
    from: "user",
  },
  {
    key: nanoid(),
    value: "You're welcome! Let me know if you have any more questions.",
    name: "AI Assistant",
    avatar: "https://github.com/openai.png",
    from: "assistant",
  },
];

function BasicConversationDemo() {
  const [visibleMessages, setVisibleMessages] = useState<typeof messages>([]);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < messages.length && messages[currentIndex]) {
        const currentMessage = messages[currentIndex];
        setVisibleMessages((prev) => [...prev, currentMessage]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-96 w-full border rounded-lg relative">
      <Conversation className="size-full">
        <ConversationContent>
          {visibleMessages.length === 0 ? (
            <ConversationEmptyState
              title="Start a conversation"
              description="Messages will appear here as the conversation progresses."
              icon={<MessageSquare className="h-12 w-12" />}
            />
          ) : (
            visibleMessages.map(({ key, value, name, avatar, from }) => (
              <Message from={from} key={key}>
                <MessageContent className={from === "assistant" ? "flex flex-col gap-2" : undefined}>
                  {value}
                  {from === "assistant" && (
                    <Actions>
                      <Action size="icon-sm" label="Like" tooltip="Like">
                        <IconThumbUp className="w-3 h-3" />
                      </Action>
                      <Action size="icon-sm" label="Dislike" tooltip="Dislike">
                        <IconThumbDown className="w-3 h-3" />
                      </Action>
                      <Action size="icon-sm" label="Copy" tooltip="Copy">
                        <IconCopy className="w-3 h-3" />
                      </Action>
                      <Action size="icon-sm" label="Share" tooltip="Share">
                        <IconShare className="w-3 h-3" />
                      </Action>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Action size="icon-sm" label="More options">
                            <IconDotsVertical className="w-3 h-3" />
                          </Action>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Option 1</DropdownMenuItem>
                          <DropdownMenuItem>Option 2</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </Actions>
                  )}
                </MessageContent>
                <MessageAvatar 
                  src={avatar} 
                  name={name}
                  variant={from === "assistant" ? "fjord" : undefined}
                >
                  {from === "assistant" && (
                    <MessageAvatarIcon>
                      <IconWheel />
                    </MessageAvatarIcon>
                  )}
                </MessageAvatar>
              </Message>
            ))
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
    </div>
  );
}

function EmptyStateDemo() {
  return (
    <div className="h-96 w-full border rounded-lg">
      <Conversation>
        <ConversationContent>
          <ConversationEmptyState
            title="Start a conversation"
            description="Ask me anything to get started"
            icon={<MessageSquare className="h-12 w-12" />}
          />
        </ConversationContent>
      </Conversation>
    </div>
  );
}

export const conversationExamples: ComponentExamples = {
  basic: {
    title: "Basic Conversation",
    description: "A dynamic conversation that progressively displays messages",
    component: BasicConversationDemo,
    difficulty: "beginner",
    code: `"use client"

import { Conversation, ConversationContent, ConversationEmptyState, ConversationScrollButton } from "@/components/ai-elements/draft/conversation"
import { Message, MessageContent, MessageAvatar, MessageAvatarIcon } from "@/components/ai-elements/draft/message"
import { Actions, Action } from "@/components/ai-elements/draft/actions"
import { MessageSquare } from "lucide-react"
import { IconWheel, IconThumbUp, IconThumbDown, IconCopy, IconShare, IconDotsVertical } from "@tabler/icons-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/cognite/dropdown-menu"
import { nanoid } from "nanoid"
import { useEffect, useState } from "react"

const messages = [
  { key: nanoid(), value: "Hello, how are you?", name: "Alex Johnson", avatar: "/user-avatar2.png", from: "user" },
  { key: nanoid(), value: "I'm good, thank you! How can I assist you today?", name: "AI Assistant", avatar: "https://github.com/openai.png", from: "assistant" },
  { key: nanoid(), value: "I'm looking for information about your services.", name: "Alex Johnson", avatar: "/user-avatar2.png", from: "user" },
  { key: nanoid(), value: "Sure! We offer a variety of AI solutions. What are you interested in?", name: "AI Assistant", avatar: "https://github.com/openai.png", from: "assistant" },
]

export function BasicConversationDemo() {
  const [visibleMessages, setVisibleMessages] = useState([])

  useEffect(() => {
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex < messages.length && messages[currentIndex]) {
        setVisibleMessages((prev) => [...prev, messages[currentIndex]])
        currentIndex++
      } else {
        clearInterval(interval)
      }
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-96 w-full border rounded-lg relative">
      <Conversation className="size-full">
        <ConversationContent>
          {visibleMessages.length === 0 ? (
            <ConversationEmptyState
              title="Start a conversation"
              description="Messages will appear here as the conversation progresses."
              icon={<MessageSquare className="h-12 w-12" />}
            />
          ) : (
            visibleMessages.map(({ key, value, name, avatar, from }) => (
              <Message from={from} key={key}>
                <MessageContent className={from === "assistant" ? "flex flex-col gap-2" : undefined}>
                  {value}
                  {from === "assistant" && (
                    <Actions>
                      <Action size="icon-sm" label="Like" tooltip="Like">
                        <IconThumbUp className="w-3 h-3" />
                      </Action>
                      <Action size="icon-sm" label="Dislike" tooltip="Dislike">
                        <IconThumbDown className="w-3 h-3" />
                      </Action>
                      <Action size="icon-sm" label="Copy" tooltip="Copy">
                        <IconCopy className="w-3 h-3" />
                      </Action>
                      <Action size="icon-sm" label="Share" tooltip="Share">
                        <IconShare className="w-3 h-3" />
                      </Action>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Action size="icon-sm" label="More options">
                            <IconDotsVertical className="w-3 h-3" />
                          </Action>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Option 1</DropdownMenuItem>
                          <DropdownMenuItem>Option 2</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </Actions>
                  )}
                </MessageContent>
                <MessageAvatar 
                  src={avatar} 
                  name={name}
                  variant={from === "assistant" ? "fjord" : undefined}
                >
                  {from === "assistant" && (
                    <MessageAvatarIcon>
                      <IconWheel />
                    </MessageAvatarIcon>
                  )}
                </MessageAvatar>
              </Message>
            ))
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
    </div>
  )
}`,
  },

  emptyState: {
    title: "Empty State",
    description: "Show a placeholder when there are no messages",
    component: EmptyStateDemo,
    difficulty: "beginner",
    code: `import { Conversation, ConversationContent, ConversationEmptyState } from "@/components/ai-elements/draft/conversation"
import { MessageSquare } from "lucide-react"

export function EmptyStateDemo() {
  return (
    <Conversation>
      <ConversationContent>
        <ConversationEmptyState
          title="Start a conversation"
          description="Ask me anything to get started"
          icon={<MessageSquare className="h-12 w-12" />}
        />
      </ConversationContent>
    </Conversation>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const conversationMeta = {
  name: "Conversation",
  description: "Wraps messages and automatically scrolls to the bottom. Also includes a scroll button that appears when not at the bottom.",
  importPath: "@/components/ai-elements/draft/conversation",
};
