'use client';

import {
  PromptInput,
  PromptInputProvider,
  PromptInputBody,
  PromptInputTextarea,
  PromptInputSubmit,
  PromptInputFooter,
  PromptInputTools,
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputSpeechButton,
  PromptInputButton,
  usePromptInputAttachments,
  type PromptInputMessage,
} from '@/components/ui/cognite/prompt-input';
import type { ComponentExamples } from '@/lib/component-examples/types';
import { useState, useRef } from 'react';
import {
  IconPaperclip,
  IconAdjustments,
  IconChevronDown,
} from '@tabler/icons-react';
import { Button } from '@/components/ui/cognite/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/cognite/dropdown-menu';

const SUBMITTING_TIMEOUT = 200;
const STREAMING_TIMEOUT = 2000;

function AttachmentTools() {
  const attachments = usePromptInputAttachments();

  return (
    <>
      <PromptInputButton onClick={() => attachments.openFileDialog()}>
        <IconPaperclip size={16} />
      </PromptInputButton>
      <PromptInputButton>
        <IconAdjustments size={16} />
      </PromptInputButton>
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
    </>
  );
}

function PromptInputDemo() {
  const [status, setStatus] = useState<
    'submitted' | 'streaming' | 'ready' | 'error'
  >('ready');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (message: PromptInputMessage) => {
    const hasText = Boolean(message.text);
    const hasAttachments = Boolean(message.files?.length);

    if (!(hasText || hasAttachments)) {
      return;
    }

    setStatus('submitted');

    setTimeout(() => {
      setStatus('streaming');
    }, SUBMITTING_TIMEOUT);

    setTimeout(() => {
      setStatus('ready');
    }, STREAMING_TIMEOUT);
  };

  return (
    <PromptInputProvider>
      <PromptInput onSubmit={handleSubmit} accept="image/*" multiple>
        <PromptInputBody>
          <PromptInputAttachments>
            {(attachment) => <PromptInputAttachment data={attachment} />}
          </PromptInputAttachments>
          <PromptInputTextarea
            ref={textareaRef}
            placeholder="Type your message..."
          />
        </PromptInputBody>
        <PromptInputFooter>
          <PromptInputTools>
            <AttachmentTools />
          </PromptInputTools>
          <div className="flex flex-row gap-2">
            <PromptInputSpeechButton textareaRef={textareaRef} />
            <PromptInputSubmit className="size-7" status={status} />
          </div>
        </PromptInputFooter>
      </PromptInput>
    </PromptInputProvider>
  );
}

export const promptInputExamples: ComponentExamples = {
  basic: {
    title: 'Prompt Input',
    description:
      'AI chat input with file attachments, speech-to-text, and model selection',
    component: PromptInputDemo,
    difficulty: 'beginner',
    code: `'use client';

import {
  PromptInput,
  PromptInputProvider,
  PromptInputBody,
  PromptInputTextarea,
  PromptInputSubmit,
  PromptInputFooter,
  PromptInputTools,
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputSpeechButton,
  PromptInputButton,
  usePromptInputAttachments,
  type PromptInputMessage,
} from '@/components/ui/cognite/prompt-input';
import { useState, useRef } from 'react';
import {
  IconPaperclip,
  IconAdjustments,
  IconChevronDown,
} from '@tabler/icons-react';
import { Button } from '@/components/ui/cognite/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/cognite/dropdown-menu';

function AttachmentTools() {
  const attachments = usePromptInputAttachments();

  return (
    <>
      <PromptInputButton onClick={() => attachments.openFileDialog()}>
        <IconPaperclip size={16} />
      </PromptInputButton>
      <PromptInputButton>
        <IconAdjustments size={16} />
      </PromptInputButton>
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
    </>
  );
}

export function PromptInputDemo() {
  const [status, setStatus] = useState<
    'submitted' | 'streaming' | 'ready' | 'error'
  >('ready');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (message: PromptInputMessage) => {
    setStatus('submitted');
    setTimeout(() => setStatus('streaming'), 200);
    setTimeout(() => setStatus('ready'), 2000);
  };

  return (
    <PromptInputProvider>
      <PromptInput onSubmit={handleSubmit} accept="image/*" multiple>
        <PromptInputBody>
          <PromptInputAttachments>
            {(attachment) => <PromptInputAttachment data={attachment} />}
          </PromptInputAttachments>
          <PromptInputTextarea
            ref={textareaRef}
            placeholder="Type your message..."
          />
        </PromptInputBody>
        <PromptInputFooter>
          <PromptInputTools>
            <AttachmentTools />
          </PromptInputTools>
          <div className="flex flex-row gap-2">
            <PromptInputSpeechButton textareaRef={textareaRef} />
            <PromptInputSubmit className="size-7" status={status} />
          </div>
        </PromptInputFooter>
      </PromptInput>
    </PromptInputProvider>
  );
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const promptInputMeta = {
  name: 'Prompt Input',
  description:
    'Allows a user to send a message with file attachments to a large language model. It includes a textarea, file upload capabilities, a submit button, and a dropdown for selecting the model.',
  importPath: '@/components/ui/cognite/prompt-input',
};
