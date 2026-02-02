import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { Tool, ToolContent, ToolHeader, ToolInput, ToolOutput } from "#aura/components/ui/aura/tool";

const meta: Meta<typeof Tool> = {
  title: "AI/Tool",
  component: Tool,
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: "boolean",
      description: "Controlled open state of the tool content",
      table: {
        category: "State",
        type: { summary: "boolean" },
      },
    },
    defaultOpen: {
      control: "boolean",
      description:
        "Default open state (uncontrolled). Whether the tool content is open by default.",
      table: {
        category: "State",
        type: { summary: "boolean" },
      },
    },
    onOpenChange: {
      action: "openChanged",
      description: "Callback when the open state changes",
      table: {
        category: "Events",
        type: { summary: "(open: boolean) => void" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Disable the tool collapsible (trigger cannot be clicked)",
      table: {
        category: "State",
        type: { summary: "boolean" },
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
      table: {
        category: "Styling",
      },
    },
  },
  parameters: {
    layout: "centered",
    actions: {
      handles: ["openChanged"],
    },
  },
  decorators: [
    (Story) => (
      <div className="w-125">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tool>;

/**
 * Default tool invocation.
 */
export const Basic: Story = {
  render: () => (
    <Tool>
      <ToolHeader title="search_files" type="tool-invocation" />
      <ToolContent>
        <ToolInput
          input={{
            query: "button component",
            path: "src/components",
            extensions: ["tsx", "ts"],
          }}
        />
        <ToolOutput
          output={[
            { file: "src/components/Button.tsx", matches: 5 },
            { file: "src/components/IconButton.tsx", matches: 2 },
          ]}
          errorText={undefined}
        />
      </ToolContent>
    </Tool>
  ),
  parameters: {
    order: 1,
    docs: {
      description: {
        story: "Default tool invocation with input parameters and output.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const header = canvas.getByText("search_files");
    await expect(header).toBeInTheDocument();
  },
};

/**
 * Tool with error output.
 */
export const WithError: Story = {
  render: () => (
    <Tool>
      <ToolHeader title="read_file" type="tool-invocation" />
      <ToolContent>
        <ToolInput
          input={{
            path: "/nonexistent/file.txt",
          }}
        />
        <ToolOutput
          output={undefined}
          errorText="Error: File not found at path /nonexistent/file.txt"
        />
      </ToolContent>
    </Tool>
  ),
  parameters: {
    order: 2,
    docs: {
      description: {
        story: "Tool invocation that resulted in an error.",
      },
    },
  },
};

/**
 * Collapsed by default.
 */
export const CollapsedByDefault: Story = {
  render: () => (
    <Tool defaultOpen={false}>
      <ToolHeader title="execute_command" type="tool-invocation" />
      <ToolContent>
        <ToolInput
          input={{
            command: "npm install",
            workingDirectory: "/project",
          }}
        />
        <ToolOutput output={{ success: true, duration: "2.5s" }} errorText={undefined} />
      </ToolContent>
    </Tool>
  ),
  parameters: {
    order: 3,
    docs: {
      description: {
        story: "Tool that starts collapsed.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click to expand
    const trigger = canvas.getByText("execute_command");
    await userEvent.click(trigger);

    // Parameters should now be visible
    const parametersHeading = canvas.getByText("Parameters");
    await expect(parametersHeading).toBeInTheDocument();
  },
};

/**
 * Complex input parameters.
 */
export const ComplexInput: Story = {
  render: () => (
    <Tool>
      <ToolHeader title="create_pull_request" type="tool-invocation" />
      <ToolContent>
        <ToolInput
          input={{
            repository: "owner/repo",
            title: "Add new feature",
            description: "This PR adds a new button component with variants",
            baseBranch: "main",
            headBranch: "feature/new-button",
            labels: ["enhancement", "ui"],
            reviewers: ["user1", "user2"],
            draft: false,
          }}
        />
        <ToolOutput
          output={{
            prNumber: 123,
            url: "https://github.com/owner/repo/pull/123",
            status: "created",
          }}
          errorText={undefined}
        />
      </ToolContent>
    </Tool>
  ),
  parameters: {
    order: 4,
    docs: {
      description: {
        story: "Tool with complex nested input parameters.",
      },
    },
  },
};

/**
 * Multiple tool invocations.
 */
export const MultipleTools: Story = {
  render: () => (
    <div className="space-y-4">
      <Tool defaultOpen={false}>
        <ToolHeader title="list_directory" type="tool-invocation" />
        <ToolContent>
          <ToolInput input={{ path: "src/" }} />
          <ToolOutput output={["components/", "utils/", "hooks/"]} errorText={undefined} />
        </ToolContent>
      </Tool>
      <Tool defaultOpen={false}>
        <ToolHeader title="read_file" type="tool-invocation" />
        <ToolContent>
          <ToolInput input={{ path: "src/index.ts" }} />
          <ToolOutput output="export * from './components';" errorText={undefined} />
        </ToolContent>
      </Tool>
      <Tool>
        <ToolHeader title="write_file" type="tool-invocation" />
        <ToolContent>
          <ToolInput
            input={{
              path: "src/new-component.tsx",
              content: "export const NewComponent = () => <div>Hello</div>;",
            }}
          />
          <ToolOutput output={{ success: true, bytesWritten: 52 }} errorText={undefined} />
        </ToolContent>
      </Tool>
    </div>
  ),
  parameters: {
    order: 5,
    docs: {
      description: {
        story: "Multiple sequential tool invocations.",
      },
    },
  },
};

/**
 * Tool with large output.
 */
export const LargeOutput: Story = {
  render: () => (
    <Tool>
      <ToolHeader title="search_codebase" type="tool-invocation" />
      <ToolContent>
        <ToolInput
          input={{
            query: "useState",
            fileTypes: ["tsx", "jsx"],
          }}
        />
        <ToolOutput
          output={{
            totalMatches: 47,
            files: [
              {
                path: "src/components/Form.tsx",
                line: 12,
                preview: "const [value, setValue] = useState('')",
              },
              {
                path: "src/components/Modal.tsx",
                line: 8,
                preview: "const [isOpen, setIsOpen] = useState(false)",
              },
              {
                path: "src/components/List.tsx",
                line: 15,
                preview: "const [items, setItems] = useState([])",
              },
              {
                path: "src/hooks/useForm.ts",
                line: 5,
                preview: "const [formData, setFormData] = useState(initial)",
              },
              {
                path: "src/pages/Home.tsx",
                line: 22,
                preview: "const [loading, setLoading] = useState(true)",
              },
            ],
          }}
          errorText={undefined}
        />
      </ToolContent>
    </Tool>
  ),
  parameters: {
    order: 6,
    docs: {
      description: {
        story: "Tool with large structured output.",
      },
    },
  },
};

/**
 * Visual regression testing.
 */
export const VisualRegression: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      {/* Basic tool */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Basic</h3>
        <Tool>
          <ToolHeader title="sample_tool" type="tool-invocation" />
          <ToolContent>
            <ToolInput input={{ key: "value" }} />
            <ToolOutput output={{ result: "success" }} errorText={undefined} />
          </ToolContent>
        </Tool>
      </div>

      {/* With error */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">With Error</h3>
        <Tool>
          <ToolHeader title="error_tool" type="tool-invocation" />
          <ToolContent>
            <ToolInput input={{ invalid: true }} />
            <ToolOutput output={undefined} errorText="Error occurred" />
          </ToolContent>
        </Tool>
      </div>
    </div>
  ),
  parameters: {
    order: 7,
    docs: {
      description: {
        story: "Tools for visual regression testing.",
      },
    },
    chromatic: {
      disableSnapshot: false,
    },
  },
};

/**
 * Interactive playground.
 */
export const Playground: Story = {
  args: {
    defaultOpen: true,
  },
  render: (args) => (
    <Tool {...args}>
      <ToolHeader title="playground_tool" type="tool-invocation" />
      <ToolContent>
        <ToolInput
          input={{
            param1: "value1",
            param2: 123,
            param3: true,
          }}
        />
        <ToolOutput output={{ status: "completed" }} errorText={undefined} />
      </ToolContent>
    </Tool>
  ),
  parameters: {
    order: 99,
    docs: {
      description: {
        story: "Interactive tool example.",
      },
    },
  },
};
