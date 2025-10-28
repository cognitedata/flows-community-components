import { Tool, ToolHeader, ToolContent, ToolInput, ToolOutput } from "@/components/ai-elements/cognite/tool";
import type { ComponentExamples } from "@/lib/component-examples/types";

function BasicToolDemo() {
  return (
    <Tool>
      <ToolHeader
        title="File System Tool"
        type="tool-call"
        state="output-available"
      />
      <ToolContent>
        <ToolInput input={{ path: "/example/file.txt" }} />
        <ToolOutput output="File created successfully" errorText={undefined} />
      </ToolContent>
    </Tool>
  );
}

function RunningToolDemo() {
  return (
    <Tool>
      <ToolHeader
        title="API Request Tool"
        type="tool-call"
        state="input-available"
      />
      <ToolContent>
        <ToolInput input={{ url: "https://api.example.com/data" }} />
      </ToolContent>
    </Tool>
  );
}

export const toolExamples: ComponentExamples = {
  basic: {
    title: "Basic Tool",
    description: "Tool execution with input and output",
    component: BasicToolDemo,
    difficulty: "beginner",
    code: `import { Tool, ToolHeader, ToolContent, ToolInput, ToolOutput } from "@/components/ai-elements/cognite/tool"

export function BasicToolDemo() {
  return (
    <Tool>
      <ToolHeader
        title="File System Tool"
        type="tool-call"
        state="output-available"
      />
      <ToolContent>
        <ToolInput input={{ path: "/file.txt" }} />
        <ToolOutput output="Success" errorText={undefined} />
      </ToolContent>
    </Tool>
  )
}`,
  },

  running: {
    title: "Running Tool",
    description: "Tool that's currently executing",
    component: RunningToolDemo,
    difficulty: "beginner",
    code: `import { Tool, ToolHeader, ToolContent, ToolInput } from "@/components/ai-elements/cognite/tool"

export function RunningToolDemo() {
  return (
    <Tool>
      <ToolHeader
        title="API Request"
        type="tool-call"
        state="input-available"
      />
      <ToolContent>
        <ToolInput input={{ url: "https://api.example.com" }} />
      </ToolContent>
    </Tool>
  )
}`,
  },
};

