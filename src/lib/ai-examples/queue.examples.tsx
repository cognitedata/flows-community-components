import {
  Queue,
  QueueSection,
  QueueSectionTrigger,
  QueueSectionLabel,
  QueueSectionContent,
  QueueList,
  QueueItem,
  QueueItemIndicator,
  QueueItemContent,
} from "@/components/ui/cognite/queue";
import type { ComponentExamples } from "@/lib/component-examples/types";

function BasicQueueDemo() {
  return (
    <Queue>
      <QueueSection>
        <QueueSectionTrigger>
          <QueueSectionLabel count={3} label="pending" />
        </QueueSectionTrigger>
        <QueueSectionContent>
          <QueueList>
            <QueueItem>
              <QueueItemIndicator completed={false} />
              <QueueItemContent>Process order #1234</QueueItemContent>
            </QueueItem>
            <QueueItem>
              <QueueItemIndicator completed={false} />
              <QueueItemContent>Send confirmation email</QueueItemContent>
            </QueueItem>
            <QueueItem>
              <QueueItemIndicator completed={true} />
              <QueueItemContent>Update inventory</QueueItemContent>
            </QueueItem>
          </QueueList>
        </QueueSectionContent>
      </QueueSection>
    </Queue>
  );
}

function MultipleSectionsDemo() {
  return (
    <Queue>
      <QueueSection>
        <QueueSectionTrigger>
          <QueueSectionLabel count={2} label="processing" />
        </QueueSectionTrigger>
        <QueueSectionContent>
          <QueueList>
            <QueueItem>
              <QueueItemIndicator />
              <QueueItemContent>Task 1</QueueItemContent>
            </QueueItem>
            <QueueItem>
              <QueueItemIndicator />
              <QueueItemContent>Task 2</QueueItemContent>
            </QueueItem>
          </QueueList>
        </QueueSectionContent>
      </QueueSection>
      <QueueSection>
        <QueueSectionTrigger>
          <QueueSectionLabel count={5} label="completed" />
        </QueueSectionTrigger>
        <QueueSectionContent>
          <QueueList>
            <QueueItem>
              <QueueItemIndicator completed={true} />
              <QueueItemContent completed>Completed task 1</QueueItemContent>
            </QueueItem>
          </QueueList>
        </QueueSectionContent>
      </QueueSection>
    </Queue>
  );
}

export const queueExamples: ComponentExamples = {
  basic: {
    title: "Basic Queue",
    description: "Task queue with collapsible sections",
    component: BasicQueueDemo,
    difficulty: "beginner",
    code: `import {
  Queue,
  QueueSection,
  QueueSectionTrigger,
  QueueSectionLabel,
  QueueSectionContent,
  QueueList,
  QueueItem,
  QueueItemIndicator,
  QueueItemContent,
} from "@/components/ai-elements/cognite/queue"

export function BasicQueueDemo() {
  return (
    <Queue>
      <QueueSection>
        <QueueSectionTrigger>
          <QueueSectionLabel count={3} label="pending" />
        </QueueSectionTrigger>
        <QueueSectionContent>
          <QueueList>
            <QueueItem>
              <QueueItemIndicator />
              <QueueItemContent>Task 1</QueueItemContent>
            </QueueItem>
          </QueueList>
        </QueueSectionContent>
      </QueueSection>
    </Queue>
  )
}`,
  },

  multipleSections: {
    title: "Multiple Sections",
    description: "Queue with different task categories",
    component: MultipleSectionsDemo,
    difficulty: "intermediate",
    code: `import {
  Queue,
  QueueSection,
  QueueSectionTrigger,
  QueueSectionLabel,
  QueueSectionContent,
  QueueList,
  QueueItem,
  QueueItemIndicator,
  QueueItemContent,
} from "@/components/ai-elements/cognite/queue"

export function MultipleSectionsDemo() {
  return (
    <Queue>
      <QueueSection>
        <QueueSectionTrigger>
          <QueueSectionLabel count={2} label="processing" />
        </QueueSectionTrigger>
        <QueueSectionContent>
          <QueueList>
            <QueueItem>
              <QueueItemIndicator />
              <QueueItemContent>Task 1</QueueItemContent>
            </QueueItem>
          </QueueList>
        </QueueSectionContent>
      </QueueSection>
    </Queue>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const queueMeta = {
  name: "Queue",
  description:
    "A comprehensive queue component system for displaying message lists, todos, and collapsible task sections in AI applications.",
  importPath: "@/components/ai-elements/cognite/queue",
};
