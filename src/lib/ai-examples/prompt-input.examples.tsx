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
} from "@/components/ai-elements/cognite/prompt-input";
import type { ComponentExamples } from "@/lib/component-examples/types";
import { useState, useRef } from "react";
import { IconPaperclip, IconAdjustments, IconChevronDown, IconMicrophone } from "@tabler/icons-react";
import { Button } from "@/components/ui/cognite/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/cognite/dropdown-menu";

const SUBMITTING_TIMEOUT = 200;
const STREAMING_TIMEOUT = 2000;

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
};

// Component metadata - single source of truth for API documentation
export const promptInputMeta = {
  name: "Prompt Input",
  description: "Allows a user to send a message with file attachments to a large language model. It includes a textarea, file upload capabilities, a submit button, and a dropdown for selecting the model.",
  importPath: "@/components/ai-elements/cognite/prompt-input",
};
