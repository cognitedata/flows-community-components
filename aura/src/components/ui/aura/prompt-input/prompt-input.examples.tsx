
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
  // usePromptInputAttachments, // TODO: Uncomment when file dialog functionality is re-added
  type PromptInputMessage,
} from '@/components/ui/aura/prompt-input';
import type { ComponentExamples } from '@/lib/component-examples/types';
import { useState, useRef } from 'react';
import {
  // IconPaperclip, // TODO: Uncomment when file dialog functionality is re-added
  IconAdjustments,
  IconAlertTriangle,
  IconChevronDown,
} from '@tabler/icons-react';
import { Button } from '@/components/ui/aura/button';
import { HelperText } from '@/components/ui/aura/helper-text';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/aura/dropdown-menu';

const SUBMITTING_TIMEOUT = 200;
const STREAMING_TIMEOUT = 2000;

function AdvancedTools({
  model,
  setModel,
}: {
  model: string;
  setModel: (model: string) => void;
}) {
  // const attachments = usePromptInputAttachments(); // TODO: Uncomment when file dialog functionality is re-added

  return (
    <>
      {/* <PromptInputButton size="icon-sm" onClick={() => attachments.openFileDialog()}>
        <IconPaperclip />
      </PromptInputButton> */}
      <PromptInputButton size="icon-sm" aria-label="Settings">
        <IconAdjustments />
      </PromptInputButton>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            {model}
            <IconChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setModel('GPT-4')}>
            GPT-4
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setModel('GPT-3.5')}>
            GPT-3.5
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setModel('Claude')}>
            Claude
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

function PromptInputDemo() {
  const [status, setStatus] = useState<
    'submitted' | 'streaming' | 'ready' | 'error'
  >('ready');

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
          <PromptInputTextarea placeholder="Type your message..." />
        </PromptInputBody>
        <PromptInputFooter>
          <PromptInputTools />
          <PromptInputSubmit className="size-7" status={status} />
        </PromptInputFooter>
      </PromptInput>
    </PromptInputProvider>
  );
}

function PromptInputNoHelperTextDemo() {
  const [status, setStatus] = useState<
    'submitted' | 'streaming' | 'ready' | 'error'
  >('ready');

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
      <PromptInput
        onSubmit={handleSubmit}
        accept="image/*"
        multiple
        helperText={false}
      >
        <PromptInputBody>
          <PromptInputAttachments>
            {(attachment) => <PromptInputAttachment data={attachment} />}
          </PromptInputAttachments>
          <PromptInputTextarea placeholder="Type your message..." />
        </PromptInputBody>
        <PromptInputFooter>
          <PromptInputTools />
          <PromptInputSubmit className="size-7" status={status} />
        </PromptInputFooter>
      </PromptInput>
    </PromptInputProvider>
  );
}

function PromptInputCustomHelperTextDemo() {
  const [status, setStatus] = useState<
    'submitted' | 'streaming' | 'ready' | 'error'
  >('ready');

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
      <PromptInput
        onSubmit={handleSubmit}
        accept="image/*"
        multiple
        helperText={
          <HelperText size="xs" icon={<IconAlertTriangle />}>
            This is experimental. Use with caution.
          </HelperText>
        }
      >
        <PromptInputBody>
          <PromptInputAttachments>
            {(attachment) => <PromptInputAttachment data={attachment} />}
          </PromptInputAttachments>
          <PromptInputTextarea placeholder="Type your message..." />
        </PromptInputBody>
        <PromptInputFooter>
          <PromptInputTools />
          <PromptInputSubmit className="size-7" status={status} />
        </PromptInputFooter>
      </PromptInput>
    </PromptInputProvider>
  );
}

function PromptInputWithAdvancedToolsDemo() {
  const [status, setStatus] = useState<
    'submitted' | 'streaming' | 'ready' | 'error'
  >('ready');
  const [model, setModel] = useState('Agent model');
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
      <PromptInput
        onSubmit={handleSubmit}
        accept="image/*"
        multiple
        helperText={false}
      >
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
            <AdvancedTools model={model} setModel={setModel} />
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
    description: 'Basic AI chat input with file attachments and default helper text',
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
  type PromptInputMessage,
} from '@/components/ui/aura/prompt-input';
import { useState } from 'react';

export function PromptInputDemo() {
  const [status, setStatus] = useState<
    'submitted' | 'streaming' | 'ready' | 'error'
  >('ready');

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
          <PromptInputTextarea placeholder="Type your message..." />
        </PromptInputBody>
        <PromptInputFooter>
          <PromptInputTools />
          <PromptInputSubmit className="size-7" status={status} />
        </PromptInputFooter>
      </PromptInput>
    </PromptInputProvider>
  );
}`,
  },

  noHelperText: {
    title: 'Prompt Input Without Helper Text',
    description:
      'Prompt input with helper text hidden using helperText={false}',
    component: PromptInputNoHelperTextDemo,
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
  type PromptInputMessage,
} from '@/components/ui/aura/prompt-input';
import { useState, useRef } from 'react';

export function PromptInputNoHelperTextDemo() {
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
      <PromptInput
        onSubmit={handleSubmit}
        accept="image/*"
        multiple
        helperText={false}
      >
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
            {/* Your tools here */}
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

  customHelperText: {
    title: 'Prompt Input With Custom Helper Text',
    description: 'Prompt input with custom helper text',
    component: PromptInputCustomHelperTextDemo,
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
  type PromptInputMessage,
} from '@/components/ui/aura/prompt-input';
import { useState, useRef } from 'react';
import { IconAlertTriangle } from '@tabler/icons-react';
import { HelperText } from '@/components/ui/aura/helper-text';

export function PromptInputCustomHelperTextDemo() {
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
      <PromptInput
        onSubmit={handleSubmit}
        accept="image/*"
        multiple
        helperText={
          <HelperText size="xs" icon={<IconAlertTriangle />}>
            This is experimental. Use with caution.
          </HelperText>
        }
      >
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
            {/* Your tools here */}
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

  withAdvancedTools: {
    title: 'Prompt Input With Advanced Tools',
    description:
      'Prompt input with settings button, agent model dropdown, and speech-to-text',
    component: PromptInputWithAdvancedToolsDemo,
    difficulty: 'intermediate',
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
  type PromptInputMessage,
} from '@/components/ui/aura/prompt-input';
import { useState, useRef } from 'react';
import { IconAdjustments, IconChevronDown } from '@tabler/icons-react';
import { Button } from '@/components/ui/aura/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/aura/dropdown-menu';

export function PromptInputWithAdvancedToolsDemo() {
  const [status, setStatus] = useState<
    'submitted' | 'streaming' | 'ready' | 'error'
  >('ready');
  const [model, setModel] = useState('Agent model');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (message: PromptInputMessage) => {
    setStatus('submitted');
    setTimeout(() => setStatus('streaming'), 200);
    setTimeout(() => setStatus('ready'), 2000);
  };

  return (
    <PromptInputProvider>
      <PromptInput
        onSubmit={handleSubmit}
        accept="image/*"
        multiple
        helperText={false}
      >
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
            <PromptInputButton size="icon-sm" aria-label="Settings">
              <IconAdjustments />
            </PromptInputButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  {model}
                  <IconChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setModel('GPT-4')}>
                  GPT-4
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setModel('GPT-3.5')}>
                  GPT-3.5
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setModel('Claude')}>
                  Claude
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
  importPath: '@/components/ui/aura/prompt-input',
};
