import {
  WebPreview,
  WebPreviewNavigation,
  WebPreviewNavigationButton,
  WebPreviewUrl,
  WebPreviewBody,
  WebPreviewConsole,
} from "@/components/ui/cognite/web-preview";
import { ArrowLeftIcon, ArrowRightIcon, RefreshCwIcon } from "lucide-react";
import type { ComponentExamples } from "@/lib/component-examples/types";

function BasicWebPreviewDemo() {
  return (
    <WebPreview defaultUrl="https://example.com">
      <WebPreviewNavigation>
        <WebPreviewNavigationButton tooltip="Go back">
          <ArrowLeftIcon className="size-4" />
        </WebPreviewNavigationButton>
        <WebPreviewNavigationButton tooltip="Go forward">
          <ArrowRightIcon className="size-4" />
        </WebPreviewNavigationButton>
        <WebPreviewNavigationButton tooltip="Refresh">
          <RefreshCwIcon className="size-4" />
        </WebPreviewNavigationButton>
        <WebPreviewUrl />
      </WebPreviewNavigation>
      <WebPreviewBody />
    </WebPreview>
  );
}

function WithConsoleDemo() {
  const logs = [
    {
      level: "log" as const,
      message: "Page loaded successfully",
      timestamp: new Date(),
    },
    {
      level: "warn" as const,
      message: "Deprecated API used",
      timestamp: new Date(),
    },
  ];

  return (
    <WebPreview defaultUrl="https://example.com">
      <WebPreviewNavigation>
        <WebPreviewUrl />
      </WebPreviewNavigation>
      <WebPreviewBody />
      <WebPreviewConsole logs={logs} />
    </WebPreview>
  );
}

export const webPreviewExamples: ComponentExamples = {
  basic: {
    title: "Basic Web Preview",
    description: "Interactive iframe preview with navigation",
    component: BasicWebPreviewDemo,
    difficulty: "beginner",
    code: `import {
  WebPreview,
  WebPreviewNavigation,
  WebPreviewNavigationButton,
  WebPreviewUrl,
  WebPreviewBody,
} from "@/components/ai-elements/cognite/web-preview"

export function BasicWebPreviewDemo() {
  return (
    <WebPreview defaultUrl="https://example.com">
      <WebPreviewNavigation>
        <WebPreviewUrl />
      </WebPreviewNavigation>
      <WebPreviewBody />
    </WebPreview>
  )
}`,
  },

  withConsole: {
    title: "With Console",
    description: "Web preview with console logs",
    component: WithConsoleDemo,
    difficulty: "intermediate",
    code: `import {
  WebPreview,
  WebPreviewNavigation,
  WebPreviewUrl,
  WebPreviewBody,
  WebPreviewConsole,
} from "@/components/ai-elements/cognite/web-preview"

export function WebPreviewWithConsoleDemo() {
  const logs = [
    {
      level: "log" as const,
      message: "Page loaded",
      timestamp: new Date(),
    },
  ]

  return (
    <WebPreview defaultUrl="https://example.com">
      <WebPreviewNavigation>
        <WebPreviewUrl />
      </WebPreviewNavigation>
      <WebPreviewBody />
      <WebPreviewConsole logs={logs} />
    </WebPreview>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const webPreviewMeta = {
  name: "Web Preview",
  description:
    "A component for previewing web content and URLs in AI responses with metadata.",
  importPath: "@/components/ai-elements/cognite/web-preview",
};
