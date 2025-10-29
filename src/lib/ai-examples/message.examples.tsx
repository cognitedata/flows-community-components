import { Message, MessageContent, MessageAvatar } from "@/components/ai-elements/cognite/message";
import type { ComponentExamples } from "@/lib/component-examples/types";
import {
  InlineCitation,
  InlineCitationLink,
} from "@/components/ai-elements/cognite/inline-citation"
import { IconAt, IconFile, IconPhoto, IconTimeline, IconThumbUp, IconThumbDown, IconCopy, IconShare, IconDotsVertical } from "@tabler/icons-react"
import { Actions, Action } from "@/components/ai-elements/draft/actions";


function Demo() {
  return (
    <div className="flex flex-col space-y-4 max-w-3xl gap-2">
      <Message from="user">
        <MessageContent>
          <span>There are abnormal vibration levels on </span><InlineCitation><InlineCitationLink url="https://example.com/user/21PT1019" target="_blank" icon={IconAt}>21PT1019</InlineCitationLink></InlineCitation>
        </MessageContent>
        <MessageAvatar src="/user-avatar.png" name="User" />
      </Message>

      <Message from="assistant">
        <MessageContent className="flex flex-col gap-2">
          According to the time series, vibration amplitude has been rising steadily since 03:00. The motor temperature also increased by 8°C over the same period. Would you like me to add this to the canvas?
          <div className="flex flex-row gap-2">
            <InlineCitation>
              <InlineCitationLink
                url="https://example.com/chart/timeline"
                target="_blank"
                icon={IconTimeline}
              >
                Time series
              </InlineCitationLink>
            </InlineCitation>
            <InlineCitation>
              <InlineCitationLink
                url="https://example.com/image/image1.jpg"
                target="_blank"
                icon={IconPhoto}
              >
                pumpB.jpg
              </InlineCitationLink>
            </InlineCitation>
            <InlineCitation>
              <InlineCitationLink
                url="https://example.com/documentation.pdf"
                target="_blank"
                icon={IconFile}
              >
                pumpB.pdf
              </InlineCitationLink>
            </InlineCitation>
          </div>
          <Actions>
            <Action label="Like" tooltip="Like">
              <IconThumbUp className="w-3 h-3" />
            </Action>
            <Action label="Dislike" tooltip="Dislike">
              <IconThumbDown className="w-3 h-3" />
            </Action>
            <Action label="Copy" tooltip="Copy">
              <IconCopy className="w-3 h-3" />
            </Action>
            <Action label="Share" tooltip="Share">
              <IconShare className="w-3 h-3" />
            </Action>
            <Action label="More" tooltip="More">
              <IconDotsVertical className="w-3 h-3" />
            </Action>
          </Actions>
        </MessageContent>
        <MessageAvatar src="/aura-logo.png" name="AI" />
      </Message>
    </div>
  );
}

export const messageExamples: ComponentExamples = {
  contained: {
    title: "Message",
    description: "Messages with background containers for clear visual separation",
    component: Demo,
    difficulty: "beginner",
    code: `import { Message, MessageContent, MessageAvatar } from "@/components/ai-elements/cognite/message"
import {
  InlineCitation,
  InlineCitationLink,
} from "@/components/ai-elements/cognite/inline-citation"
import { IconAt, IconFile, IconPhoto, IconTimeline, IconThumbUp, IconThumbDown, IconCopy, IconShare, IconDotsVertical } from "@tabler/icons-react"
import { Actions, Action } from "@/components/ai-elements/draft/actions"

export function Demo() {
  return (
    <div className="flex flex-col space-y-4 max-w-3xl gap-2">
      <Message from="user">
        <MessageContent>
          <span>There are abnormal vibration levels on </span><InlineCitation><InlineCitationLink url="https://example.com/user/21PT1019" target="_blank" icon={IconAt}>21PT1019</InlineCitationLink></InlineCitation>
        </MessageContent>
        <MessageAvatar src="/user-avatar.png" name="User" />
      </Message>

      <Message from="assistant">
        <MessageContent className="flex flex-col gap-2">
          According to the time series, vibration amplitude has been rising steadily since 03:00. The motor temperature also increased by 8°C over the same period. Would you like me to add this to the canvas?
          <div className="flex flex-row gap-2">
            <InlineCitation>
              <InlineCitationLink
                url="https://example.com/chart/timeline"
                target="_blank"
                icon={IconTimeline}
              >
                Time series
              </InlineCitationLink>
            </InlineCitation>
            <InlineCitation>
              <InlineCitationLink
                url="https://example.com/image/image1.jpg"
                target="_blank"
                icon={IconPhoto}
              >
                pumpB.jpg
              </InlineCitationLink>
            </InlineCitation>
            <InlineCitation>
              <InlineCitationLink
                url="https://example.com/documentation.pdf"
                target="_blank"
                icon={IconFile}
              >
                pumpB.pdf
              </InlineCitationLink>
            </InlineCitation>
          </div>
          <Actions>
            <Action label="Like" tooltip="Like">
              <IconThumbUp className="w-3 h-3" />
            </Action>
            <Action label="Dislike" tooltip="Dislike">
              <IconThumbDown className="w-3 h-3" />
            </Action>
            <Action label="Copy" tooltip="Copy">
              <IconCopy className="w-3 h-3" />
            </Action>
            <Action label="Share" tooltip="Share">
              <IconShare className="w-3 h-3" />
            </Action>
            <Action label="More" tooltip="More">
              <IconDotsVertical className="w-3 h-3" />
            </Action>
          </Actions>
        </MessageContent>
        <MessageAvatar src="/aura-logo.png" name="AI" />
      </Message>
    </div>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const messageMeta = {
  name: "Message",
  description: "Displays a chat interface message from either a user or an AI.",
  importPath: "@/components/ai-elements/cognite/message",
};
