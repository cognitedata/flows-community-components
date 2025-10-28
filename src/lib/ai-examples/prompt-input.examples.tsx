import {
  PromptInput,
  PromptInputBody,
  PromptInputTextarea,
  PromptInputSubmit,
  PromptInputHeader,
  PromptInputAttachments,
  PromptInputAttachment,
} from "@/components/ai-elements/cognite/prompt-input";
import type { ComponentExamples } from "@/lib/component-examples/types";

function BasicPromptInputDemo() {
  return (
    <PromptInput onSubmit={async () => {}}>
      <PromptInputBody>
        <PromptInputTextarea placeholder="What would you like to know?" />
      </PromptInputBody>
      <PromptInputSubmit />
    </PromptInput>
  );
}

function WithAttachmentsDemo() {
  return (
    <PromptInput onSubmit={async () => {}}>
      <PromptInputBody>
        <PromptInputTextarea placeholder="Ask a question..." />
      </PromptInputBody>
      <PromptInputHeader>
        <PromptInputAttachments>
          {(file) => <PromptInputAttachment data={file} />}
        </PromptInputAttachments>
      </PromptInputHeader>
      <PromptInputSubmit />
    </PromptInput>
  );
}

export const promptInputExamples: ComponentExamples = {
  basic: {
    title: "Basic Prompt Input",
    description: "AI chat input with textarea and submit button",
    component: BasicPromptInputDemo,
    difficulty: "beginner",
    code: `import {
  PromptInput,
  PromptInputBody,
  PromptInputTextarea,
  PromptInputSubmit,
} from "@/components/ai-elements/cognite/prompt-input"

export function BasicPromptInputDemo() {
  return (
    <PromptInput onSubmit={async () => {}}>
      <PromptInputBody>
        <PromptInputTextarea placeholder="What would you like to know?" />
      </PromptInputBody>
      <PromptInputSubmit />
    </PromptInput>
  )
}`,
  },

  withAttachments: {
    title: "With Attachments",
    description: "Prompt input with file attachment support",
    component: WithAttachmentsDemo,
    difficulty: "intermediate",
    code: `import {
  PromptInput,
  PromptInputBody,
  PromptInputTextarea,
  PromptInputSubmit,
  PromptInputHeader,
  PromptInputAttachments,
  PromptInputAttachment,
} from "@/components/ai-elements/cognite/prompt-input"

export function PromptInputWithAttachmentsDemo() {
  return (
    <PromptInput onSubmit={async () => {}}>
      <PromptInputBody>
        <PromptInputTextarea />
      </PromptInputBody>
      <PromptInputHeader>
        <PromptInputAttachments>
          {(file) => <PromptInputAttachment data={file} />}
        </PromptInputAttachments>
      </PromptInputHeader>
      <PromptInputSubmit />
    </PromptInput>
  )
}`,
  },
};

