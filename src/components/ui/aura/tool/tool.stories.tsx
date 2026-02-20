import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, waitFor, within } from '@storybook/test';
import { useState } from 'react';

import { Button } from '../button';

import { Tool, ToolContent, ToolHeader, ToolInput, ToolOutput } from './tool';

const meta: Meta<typeof Tool> = {
  title: 'AI/Tool',
  component: Tool,
  tags: ['autodocs', 'ai-elements'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controlled open state of the tool content',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
      },
    },
    defaultOpen: {
      control: 'boolean',
      description:
        'Default open state (uncontrolled). Whether the tool content is open by default.',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
      },
    },
    onOpenChange: {
      action: 'openChanged',
      description: 'Callback when the open state changes',
      table: {
        category: 'Events',
        type: { summary: '(open: boolean) => void' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the tool collapsible (trigger cannot be clicked)',
      table: {
        category: 'Behavior',
        type: { summary: 'boolean' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
      table: {
        category: 'Variants/Styling',
      },
    },
  },
  parameters: {
    layout: 'centered',
    actions: {
      handles: ['openChanged'],
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
 * Default tool invocation with input parameters and output.
 */
export const Basic: Story = {
  render: () => (
    <Tool>
      <ToolHeader title="search_files" type="tool-invocation" />
      <ToolContent>
        <ToolInput
          input={{
            query: 'button component',
            path: 'src/components',
            extensions: ['tsx', 'ts'],
          }}
        />
        <ToolOutput
          output={[
            { file: 'src/components/Button.tsx', matches: 5 },
            { file: 'src/components/IconButton.tsx', matches: 2 },
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
        story: 'Default tool invocation with input parameters and output.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const header = canvas.getByText('search_files');
    await expect(header).toBeInTheDocument();
  },
};

/**
 * Tool invocation that resulted in an error.
 */
export const WithError: Story = {
  render: () => (
    <Tool>
      <ToolHeader title="read_file" type="tool-invocation" hasError />
      <ToolContent>
        <ToolInput
          input={{
            path: '/nonexistent/file.txt',
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
        story: 'Tool invocation that resulted in an error.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Error')).toBeInTheDocument();
    await expect(canvas.getByText(/File not found/)).toBeInTheDocument();
  },
};

/**
 * Tool that starts collapsed and can be expanded.
 */
export const CollapsedByDefault: Story = {
  render: () => (
    <Tool defaultOpen={false}>
      <ToolHeader title="execute_command" type="tool-invocation" />
      <ToolContent>
        <ToolInput
          input={{
            command: 'npm install',
            workingDirectory: '/project',
          }}
        />
        <ToolOutput output={{ success: true, duration: '2.5s' }} errorText={undefined} />
      </ToolContent>
    </Tool>
  ),
  parameters: {
    order: 3,
    docs: {
      description: {
        story: 'Tool that starts collapsed.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByText('execute_command');
    await userEvent.click(trigger);
    const parametersHeading = canvas.getByText('Parameters');
    await expect(parametersHeading).toBeInTheDocument();
  },
};

/**
 * Tool with complex nested input parameters.
 */
export const ComplexInput: Story = {
  render: () => (
    <Tool>
      <ToolHeader title="create_pull_request" type="tool-invocation" />
      <ToolContent>
        <ToolInput
          input={{
            repository: 'owner/repo',
            title: 'Add new feature',
            description: 'This PR adds a new button component with variants',
            baseBranch: 'main',
            headBranch: 'feature/new-button',
            labels: ['enhancement', 'ui'],
            reviewers: ['user1', 'user2'],
            draft: false,
          }}
        />
        <ToolOutput
          output={{
            prNumber: 123,
            url: 'https://github.com/owner/repo/pull/123',
            status: 'created',
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
        story: 'Tool with complex nested input parameters.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('create_pull_request')).toBeInTheDocument();
    await expect(canvas.getByText('Parameters')).toBeInTheDocument();
    await expect(canvas.getByText('Result')).toBeInTheDocument();
  },
};

/**
 * Multiple sequential tool invocations.
 */
export const MultipleTools: Story = {
  render: () => (
    <div className="space-y-4">
      <Tool defaultOpen={false}>
        <ToolHeader title="list_directory" type="tool-invocation" />
        <ToolContent>
          <ToolInput input={{ path: 'src/' }} />
          <ToolOutput output={['components/', 'utils/', 'hooks/']} errorText={undefined} />
        </ToolContent>
      </Tool>
      <Tool defaultOpen={false}>
        <ToolHeader title="read_file" type="tool-invocation" />
        <ToolContent>
          <ToolInput input={{ path: 'src/index.ts' }} />
          <ToolOutput output="export * from './components';" errorText={undefined} />
        </ToolContent>
      </Tool>
      <Tool>
        <ToolHeader title="write_file" type="tool-invocation" />
        <ToolContent>
          <ToolInput
            input={{
              path: 'src/new-component.tsx',
              content: 'export const NewComponent = () => <div>Hello</div>;',
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
        story: 'Multiple sequential tool invocations.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('list_directory')).toBeInTheDocument();
    await expect(canvas.getByText('read_file')).toBeInTheDocument();
    await expect(canvas.getByText('write_file')).toBeInTheDocument();
  },
};

/**
 * Tool with large structured output.
 */
export const LargeOutput: Story = {
  render: () => (
    <Tool>
      <ToolHeader title="search_codebase" type="tool-invocation" />
      <ToolContent>
        <ToolInput
          input={{
            query: 'useState',
            fileTypes: ['tsx', 'jsx'],
          }}
        />
        <ToolOutput
          output={{
            totalMatches: 47,
            files: [
              {
                path: 'src/components/Form.tsx',
                line: 12,
                preview: "const [value, setValue] = useState('')",
              },
              {
                path: 'src/components/Modal.tsx',
                line: 8,
                preview: 'const [isOpen, setIsOpen] = useState(false)',
              },
              {
                path: 'src/components/List.tsx',
                line: 15,
                preview: 'const [items, setItems] = useState([])',
              },
              {
                path: 'src/hooks/useForm.ts',
                line: 5,
                preview: 'const [formData, setFormData] = useState(initial)',
              },
              {
                path: 'src/pages/Home.tsx',
                line: 22,
                preview: 'const [loading, setLoading] = useState(true)',
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
        story: 'Tool with large structured output.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('search_codebase')).toBeInTheDocument();
    await expect(canvas.getByText('Result')).toBeInTheDocument();
  },
};

/**
 * Controlled open state using an external toggle.
 */
export const Interactive: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setOpen(!open)}>
            {open ? 'Collapse' : 'Expand'}
          </Button>
        </div>
        <Tool open={open} onOpenChange={setOpen}>
          <ToolHeader title="controlled_tool" type="tool-invocation" />
          <ToolContent>
            <ToolInput input={{ query: 'test' }} />
            <ToolOutput output={{ status: 'completed' }} errorText={undefined} />
          </ToolContent>
        </Tool>
      </div>
    );
  },
  parameters: {
    order: 7,
    docs: {
      description: {
        story: 'Controlled open state using an external toggle.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const expandButton = await canvas.findByText('Expand');
    await expect(expandButton).toBeInTheDocument();
    await userEvent.click(expandButton);
    await expect(canvas.getByText('Collapse')).toBeInTheDocument();
    await expect(canvas.getByText('Parameters')).toBeInTheDocument();
    await userEvent.click(canvas.getByText('Collapse'));
    await expect(canvas.getByText('Expand')).toBeInTheDocument();
    const toolTrigger = canvas.getByRole('button', { name: 'controlled_tool' });
    await waitFor(() => expect(toolTrigger).not.toHaveAttribute('data-panel-open'));
  },
};

/**
 * Keyboard navigation: Tab to focus, Enter or Space to toggle.
 */
export const Accessibility: Story = {
  render: () => (
    <Tool defaultOpen={false}>
      <ToolHeader title="accessible_tool" type="tool-invocation" />
      <ToolContent>
        <ToolInput input={{ key: 'value' }} />
        <ToolOutput output={{ result: 'success' }} errorText={undefined} />
      </ToolContent>
    </Tool>
  ),
  parameters: {
    order: 8,
    docs: {
      description: {
        story: 'Keyboard navigation: Tab to focus the trigger, Enter or Space to toggle.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByRole('button');
    await expect(trigger).toBeInTheDocument();
    trigger.focus();
    await expect(trigger).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect(canvas.getByText('Parameters')).toBeInTheDocument();
    await userEvent.keyboard('{Enter}');
    await waitFor(() => expect(trigger).not.toHaveAttribute('data-panel-open'));
  },
};

/**
 * Visual regression baseline.
 */
export const VisualRegression: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Basic</h3>
        <Tool>
          <ToolHeader title="sample_tool" type="tool-invocation" />
          <ToolContent>
            <ToolInput input={{ key: 'value' }} />
            <ToolOutput output={{ result: 'success' }} errorText={undefined} />
          </ToolContent>
        </Tool>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">With Error</h3>
        <Tool>
          <ToolHeader title="error_tool" type="tool-invocation" hasError />
          <ToolContent>
            <ToolInput input={{ invalid: true }} />
            <ToolOutput output={undefined} errorText="Error occurred" />
          </ToolContent>
        </Tool>
      </div>
    </div>
  ),
  parameters: {
    order: 9,
    docs: {
      description: {
        story: 'Visual regression baseline for basic and error states.',
      },
    },
    chromatic: {
      disableSnapshot: false,
    },
  },
};
