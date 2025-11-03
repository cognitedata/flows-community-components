"use client";

import {
  PromptInput,
  PromptInputProvider,
  PromptInputBody,
  PromptInputTextarea,
  PromptInputSubmit,
  PromptInputFooter,
  PromptInputTools,
  type PromptInputMessage,
  type MentionItem,
  type MentionsConfig,
} from "@/components/ai-elements/cognite/prompt-input";
import type { ComponentExamples } from "@/lib/component-examples/types";
import { useState, useRef } from "react";
import { IconPaperclip, IconAdjustments, IconChevronDown, IconMicrophone, IconUser, IconHash } from "@tabler/icons-react";
import { Button } from "@/components/ui/cognite/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/cognite/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/cognite/avatar";

const SUBMITTING_TIMEOUT = 200;
const STREAMING_TIMEOUT = 2000;

// Mock data for mentions
const mockUsers: (MentionItem & { avatar?: string })[] = [
  { id: "1", label: "Alice Johnson", value: "@alice", avatar: "/user-avatar.png" },
  { id: "2", label: "Bob Smith", value: "@bob", avatar: "/user-avatar2.png" },
  { id: "3", label: "Charlie Brown", value: "@charlie", avatar: "/user-avatar3.png" },
  { id: "4", label: "Diana Prince", value: "@diana", avatar: "/user-avatar4.png" },
];

const mockChannels: MentionItem[] = [
  { id: "1", label: "general", value: "#general" },
  { id: "2", label: "engineering", value: "#engineering" },
  { id: "3", label: "design", value: "#design" },
  { id: "4", label: "product", value: "#product" },
  { id: "5", label: "random", value: "#random" },
];

function BasicPromptInputDemo() {
  const [status, setStatus] = useState<
    "submitted" | "streaming" | "ready" | "error"
  >("ready");

  const handleSubmit = (message: PromptInputMessage) => {
    const hasText = Boolean(message.text);
    const hasAttachments = Boolean(message.files?.length);

    if (!(hasText || hasAttachments)) {
      return;
    }

    setStatus("submitted");

    setTimeout(() => {
      setStatus("streaming");
    }, SUBMITTING_TIMEOUT);

    setTimeout(() => {
      setStatus("ready");
    }, STREAMING_TIMEOUT);
  };

  return (
    <PromptInputProvider>
      <PromptInput onSubmit={handleSubmit}>
        <PromptInputBody>
          <PromptInputTextarea placeholder="Type your message..." />
        </PromptInputBody>
        <PromptInputFooter>
          <PromptInputTools>
            <Button variant="ghost" size="sm">
              <IconPaperclip size={16} />
            </Button>
            <Button variant="ghost" size="sm">
              <IconAdjustments size={16} />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  Agent model
                  <IconChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>GPT-4</DropdownMenuItem>
                <DropdownMenuItem>GPT-3.5</DropdownMenuItem>
                <DropdownMenuItem>Claude</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </PromptInputTools>
          <div className="flex flex-row gap-2">
            <Button variant="ghost" size="sm">
              <IconMicrophone size={16} />
            </Button>
            <PromptInputSubmit className="size-7" status={status} />
          </div>
        </PromptInputFooter>
      </PromptInput>
    </PromptInputProvider>
  );
}

function AdvancedPromptInputDemo() {
  const [status, setStatus] = useState<
    "submitted" | "streaming" | "ready" | "error"
  >("ready");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (message: PromptInputMessage) => {
    const hasText = Boolean(message.text);
    const hasAttachments = Boolean(message.files?.length);

    if (!(hasText || hasAttachments)) {
      return;
    }

    setStatus("submitted");

    setTimeout(() => {
      setStatus("streaming");
    }, SUBMITTING_TIMEOUT);

    setTimeout(() => {
      setStatus("ready");
    }, STREAMING_TIMEOUT);
  };

  return (
    <PromptInputProvider>
      <PromptInput onSubmit={handleSubmit}>
        <PromptInputBody>
          <PromptInputTextarea ref={textareaRef} />
        </PromptInputBody>
        <PromptInputFooter>
          <PromptInputTools>
            <Button variant="ghost" size="sm">
              <IconPaperclip size={14} />
            </Button>
            <Button variant="ghost" size="sm">
              <IconAdjustments size={14} />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  Agent model
                  <IconChevronDown size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>GPT-4</DropdownMenuItem>
                <DropdownMenuItem>GPT-3.5</DropdownMenuItem>
                <DropdownMenuItem>Claude</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </PromptInputTools>
          <div className="flex flex-row gap-2">
            <Button variant="ghost" size="sm">
              <IconMicrophone size={14} />
            </Button>
            <PromptInputSubmit className="size-7" status={status} />
          </div>
        </PromptInputFooter>
      </PromptInput>
    </PromptInputProvider>
  );
}

function MentionsPromptInputDemo() {
  const [status, setStatus] = useState<
    "submitted" | "streaming" | "ready" | "error"
  >("ready");

  const handleSubmit = (message: PromptInputMessage) => {
    const hasText = Boolean(message.text);
    const hasAttachments = Boolean(message.files?.length);

    if (!(hasText || hasAttachments)) {
      return;
    }

    console.log("Message with mentions:", message.text);

    setStatus("submitted");

    setTimeout(() => {
      setStatus("streaming");
    }, SUBMITTING_TIMEOUT);

    setTimeout(() => {
      setStatus("ready");
    }, STREAMING_TIMEOUT);
  };

  const mentionsConfig: MentionsConfig = {
    triggers: [
      {
        trigger: "@",
        onSearch: async (query: string) => {
          // Simulate API call with delay
          await new Promise((resolve) => setTimeout(resolve, 100));
          return mockUsers.filter((user) =>
            user.label.toLowerCase().includes(query.toLowerCase())
          );
        },
        renderItem: (item: MentionItem) => {
          const user = item as MentionItem & { avatar?: string };
          return (
            <div className="flex items-center gap-2">
              <Avatar className="size-6">
                {user.avatar && <AvatarImage src={user.avatar} alt={user.label} />}
                <AvatarFallback>
                  <IconUser className="size-3" />
                </AvatarFallback>
              </Avatar>
              <span>{user.label}</span>
            </div>
          );
        },
        onSelect: (item: MentionItem) => ({
          display: item.value,
          value: item.value,
        }),
      },
      {
        trigger: "#",
        onSearch: async (query: string) => {
          await new Promise((resolve) => setTimeout(resolve, 100));
          return mockChannels.filter((channel) =>
            channel.label.toLowerCase().includes(query.toLowerCase())
          );
        },
        renderItem: (item: MentionItem) => (
          <div className="flex items-center gap-2">
            <IconHash className="size-4 text-muted-foreground" />
            <span>{item.label}</span>
          </div>
        ),
        onSelect: (item: MentionItem) => ({
          display: item.value,
          value: item.value,
        }),
      },
    ],
  };

  return (
    <PromptInputProvider mentions={mentionsConfig}>
      <PromptInput onSubmit={handleSubmit}>
        <PromptInputBody>
          <PromptInputTextarea placeholder="Try typing @ or # to mention..." />
        </PromptInputBody>
        <PromptInputFooter>
          <PromptInputTools>
            <Button variant="ghost" size="sm">
              <IconPaperclip size={16} />
            </Button>
          </PromptInputTools>
          <PromptInputSubmit className="size-7" status={status} />
        </PromptInputFooter>
      </PromptInput>
    </PromptInputProvider>
  );
}

export const promptInputExamples: ComponentExamples = {
  basic: {
    title: "Basic Prompt Input",
    description: "AI chat input with textarea and submit button",
    component: BasicPromptInputDemo,
    difficulty: "beginner",
    code: `"use client"
import {
  PromptInput,
  PromptInputProvider,
  PromptInputBody,
  PromptInputTextarea,
  PromptInputSubmit,
  PromptInputFooter,
  PromptInputTools,
  type PromptInputMessage,
} from "@/components/ai-elements/cognite/prompt-input"
import { useState } from "react"
import { IconPaperclip, IconAdjustments, IconChevronDown, IconMicrophone } from "@tabler/icons-react"
import { Button } from "@/components/ui/cognite/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/cognite/dropdown-menu"

export function BasicPromptInputDemo() {
  const [status, setStatus] = useState<"submitted" | "streaming" | "ready" | "error">("ready")

  const handleSubmit = (message: PromptInputMessage) => {
    setStatus("submitted")
    setTimeout(() => setStatus("streaming"), 200)
    setTimeout(() => setStatus("ready"), 2000)
  }

  return (
    <PromptInputProvider>
      <PromptInput onSubmit={handleSubmit}>
        <PromptInputBody>
          <PromptInputTextarea placeholder="Type your message..." />
        </PromptInputBody>
        <PromptInputFooter>
          <PromptInputTools>
            <Button variant="ghost" size="sm">
              <IconPaperclip size={16} />
            </Button>
            <Button variant="ghost" size="sm">
              <IconAdjustments size={16} />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  Agent model
                  <IconChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>GPT-4</DropdownMenuItem>
                <DropdownMenuItem>GPT-3.5</DropdownMenuItem>
                <DropdownMenuItem>Claude</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </PromptInputTools>
          <div className="flex flex-row gap-2">
            <Button variant="ghost" size="sm">
              <IconMicrophone size={16} />
            </Button>
            <PromptInputSubmit className="size-7" status={status} />
          </div>
        </PromptInputFooter>
      </PromptInput>
    </PromptInputProvider>
  )
}`,
  },

  advanced: {
    title: "Advanced Prompt Input",
    description: "Prompt input with ref and custom tools",
    component: AdvancedPromptInputDemo,
    difficulty: "intermediate",
    code: `"use client"
import {
  PromptInput,
  PromptInputProvider,
  PromptInputBody,
  PromptInputTextarea,
  PromptInputSubmit,
  PromptInputFooter,
  PromptInputTools,
  type PromptInputMessage,
} from "@/components/ai-elements/cognite/prompt-input"
import { useState, useRef } from "react"
import { IconPaperclip, IconAdjustments, IconChevronDown, IconMicrophone } from "@tabler/icons-react"
import { Button } from "@/components/ui/cognite/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/cognite/dropdown-menu"

export function AdvancedPromptInputDemo() {
  const [status, setStatus] = useState<"submitted" | "streaming" | "ready" | "error">("ready")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (message: PromptInputMessage) => {
    setStatus("submitted")
    setTimeout(() => setStatus("streaming"), 200)
    setTimeout(() => setStatus("ready"), 2000)
  }

  return (
    <PromptInputProvider>
      <PromptInput onSubmit={handleSubmit}>
        <PromptInputBody>
          <PromptInputTextarea ref={textareaRef} />
        </PromptInputBody>
        <PromptInputFooter>
          <PromptInputTools>
            <Button variant="ghost" size="sm">
              <IconPaperclip size={14} />
            </Button>
            <Button variant="ghost" size="sm">
              <IconAdjustments size={14} />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  Agent model
                  <IconChevronDown size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>GPT-4</DropdownMenuItem>
                <DropdownMenuItem>GPT-3.5</DropdownMenuItem>
                <DropdownMenuItem>Claude</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </PromptInputTools>
          <div className="flex flex-row gap-2">
            <Button variant="ghost" size="sm">
              <IconMicrophone size={14} />
            </Button>
            <PromptInputSubmit className="size-7" status={status} />
          </div>
        </PromptInputFooter>
      </PromptInput>
    </PromptInputProvider>
  )
}`,
  },

  mentions: {
    title: "Prompt Input with Mentions",
    description: "Type @ or # to mention users and channels with autocomplete",
    component: MentionsPromptInputDemo,
    difficulty: "advanced",
    code: `"use client"
import {
  PromptInput,
  PromptInputProvider,
  PromptInputBody,
  PromptInputTextarea,
  PromptInputSubmit,
  PromptInputFooter,
  PromptInputTools,
  type PromptInputMessage,
  type MentionItem,
  type MentionsConfig,
} from "@/components/ai-elements/cognite/prompt-input"
import { useState } from "react"
import { IconPaperclip, IconUser, IconHash } from "@tabler/icons-react"
import { Button } from "@/components/ui/cognite/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/cognite/avatar"

const mockUsers: (MentionItem & { avatar?: string })[] = [
  { id: "1", label: "Alice Johnson", value: "@alice", avatar: "/user-avatar.png" },
  { id: "2", label: "Bob Smith", value: "@bob", avatar: "/user-avatar2.png" },
]

const mockChannels: MentionItem[] = [
  { id: "1", label: "general", value: "#general" },
  { id: "2", label: "engineering", value: "#engineering" },
]

export function MentionsPromptInputDemo() {
  const [status, setStatus] = useState<"submitted" | "streaming" | "ready" | "error">("ready")

  const handleSubmit = (message: PromptInputMessage) => {
    console.log("Message with mentions:", message.text)
    setStatus("submitted")
    setTimeout(() => setStatus("streaming"), 200)
    setTimeout(() => setStatus("ready"), 2000)
  }

  const mentionsConfig: MentionsConfig = {
    triggers: [
      {
        trigger: "@",
        onSearch: async (query: string) => {
          await new Promise((resolve) => setTimeout(resolve, 100))
          return mockUsers.filter((user) =>
            user.label.toLowerCase().includes(query.toLowerCase())
          )
        },
        renderItem: (item: MentionItem) => {
          const user = item as MentionItem & { avatar?: string }
          return (
            <div className="flex items-center gap-2">
              <Avatar className="size-6">
                {user.avatar && <AvatarImage src={user.avatar} alt={user.label} />}
                <AvatarFallback><IconUser className="size-3" /></AvatarFallback>
              </Avatar>
              <span>{user.label}</span>
            </div>
          )
        },
        onSelect: (item: MentionItem) => ({
          display: item.value,
          value: item.value,
        }),
      },
      {
        trigger: "#",
        onSearch: async (query: string) => {
          await new Promise((resolve) => setTimeout(resolve, 100))
          return mockChannels.filter((channel) =>
            channel.label.toLowerCase().includes(query.toLowerCase())
          )
        },
        renderItem: (item: MentionItem) => (
          <div className="flex items-center gap-2">
            <IconHash className="size-4 text-muted-foreground" />
            <span>{item.label}</span>
          </div>
        ),
        onSelect: (item: MentionItem) => ({
          display: item.value,
          value: item.value,
        }),
      },
    ],
  }

  return (
    <PromptInputProvider mentions={mentionsConfig}>
      <PromptInput onSubmit={handleSubmit}>
        <PromptInputBody>
          <PromptInputTextarea placeholder="Try typing @ or # to mention..." />
        </PromptInputBody>
        <PromptInputFooter>
          <PromptInputTools>
            <Button variant="ghost" size="sm">
              <IconPaperclip size={16} />
            </Button>
          </PromptInputTools>
          <PromptInputSubmit className="size-7" status={status} />
        </PromptInputFooter>
      </PromptInput>
    </PromptInputProvider>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const promptInputMeta = {
  name: "Prompt Input",
  description: "Allows a user to send a message with file attachments to a large language model. It includes a textarea, file upload capabilities, a submit button, and a dropdown for selecting the model.",
  importPath: "@/components/ai-elements/cognite/prompt-input",
};
