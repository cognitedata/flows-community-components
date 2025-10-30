"use client";

import {
  PromptInput,
  PromptInputProvider,
  PromptInputBody,
  PromptInputTextarea,
  PromptInputSubmit,
  PromptInputFooter,
  PromptInputTools,
  PromptInputButton,
  type PromptInputMessage,
} from "@/components/ai-elements/cognite/prompt-input";
import type { ComponentExamples } from "@/lib/component-examples/types";
import { useState, useRef } from "react";
import { GlobeIcon } from "lucide-react";

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
          <PromptInputTextarea placeholder="What would you like to know?" />
        </PromptInputBody>
        <PromptInputFooter>
          <PromptInputTools>
            <PromptInputButton>
              <GlobeIcon size={16} />
              <span>Search</span>
            </PromptInputButton>
          </PromptInputTools>
          <PromptInputSubmit status={status} />
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
            <PromptInputButton>
              <GlobeIcon size={16} />
              <span>Search</span>
            </PromptInputButton>
          </PromptInputTools>
          <PromptInputSubmit status={status} />
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
  PromptInputButton,
  type PromptInputMessage,
} from "@/components/ai-elements/cognite/prompt-input"
import { useState } from "react"
import { GlobeIcon } from "lucide-react"

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
          <PromptInputTextarea placeholder="What would you like to know?" />
        </PromptInputBody>
        <PromptInputFooter>
          <PromptInputTools>
            <PromptInputButton>
              <GlobeIcon size={16} />
              <span>Search</span>
            </PromptInputButton>
          </PromptInputTools>
          <PromptInputSubmit status={status} />
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
  PromptInputButton,
  type PromptInputMessage,
} from "@/components/ai-elements/cognite/prompt-input"
import { useState, useRef } from "react"
import { GlobeIcon } from "lucide-react"

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
            <PromptInputButton>
              <GlobeIcon size={16} />
              <span>Search</span>
            </PromptInputButton>
          </PromptInputTools>
          <PromptInputSubmit status={status} />
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
