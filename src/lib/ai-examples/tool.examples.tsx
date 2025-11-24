import {
  Tool,
  ToolHeader,
  ToolContent,
  ToolInput,
  ToolOutput,
} from '@/components/ui/cognite/tool';
import type { ComponentExamples } from '@/lib/component-examples/types';

function BasicToolDemo() {
  return (
    <Tool>
      <ToolHeader title="Tool call - find assets" type="tool-call" />
      <ToolContent>
        <ToolInput input={{ path: '/example/file.txt' }} />
        <ToolOutput output="File created successfully" errorText={undefined} />
      </ToolContent>
    </Tool>
  );
}

export const toolExamples: ComponentExamples = {
  basic: {
    title: 'Basic Tool',
    description: 'Tool execution with input and output',
    component: BasicToolDemo,
    difficulty: 'beginner',
    code: `import { Tool, ToolHeader, ToolContent, ToolInput, ToolOutput } from "@/components/ai-elements/cognite/tool"

export function BasicToolDemo() {
  return (
    <Tool>
      <ToolHeader title="File System Tool" type="tool-call" />
      <ToolContent>
        <ToolInput input={{ path: "/file.txt" }} />
        <ToolOutput output="Success" errorText={undefined} />
      </ToolContent>
    </Tool>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const toolMeta = {
  name: 'Tool',
  description:
    'A collapsible component for displaying tool invocation details in AI chatbot interfaces.',
  importPath: '@/components/ai-elements/cognite/tool',
};
