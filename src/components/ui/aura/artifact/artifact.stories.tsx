import type { Meta, StoryObj } from '@storybook/react';
import {
  Artifact,
  ArtifactHeader,
  ArtifactTitle,
  ArtifactDescription,
  ArtifactActions,
  ArtifactAction,
  ArtifactClose,
  ArtifactContent,
} from './artifact';
import { IconCode, IconDownload, IconCopy, IconExternalLink } from '@tabler/icons-react';

const meta: Meta<typeof Artifact> = {
  title: 'AI/Artifact',
  component: Artifact,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes',
      table: {
        category: 'Styling',
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Artifact>;

/**
 * Default artifact.
 */
export const Default: Story = {
  render: () => (
    <Artifact>
      <ArtifactHeader>
        <div>
          <ArtifactTitle>Generated Code</ArtifactTitle>
          <ArtifactDescription>React component snippet</ArtifactDescription>
        </div>
        <ArtifactActions>
          <ArtifactAction icon={IconCopy} tooltip="Copy code" />
          <ArtifactAction icon={IconDownload} tooltip="Download" />
          <ArtifactClose />
        </ArtifactActions>
      </ArtifactHeader>
      <ArtifactContent>
        <pre className="p-4 text-sm font-mono bg-muted/30">
{`function Button({ children }) {
  return (
    <button className="btn">
      {children}
    </button>
  );
}`}
        </pre>
      </ArtifactContent>
    </Artifact>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Default artifact container for AI-generated content.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const artifact = canvasElement.querySelector('.rounded-lg.border');
    await expect(artifact).toBeInTheDocument();
  },
};

/**
 * Code artifact.
 */
export const CodeArtifact: Story = {
  render: () => (
    <Artifact>
      <ArtifactHeader>
        <div className="flex items-center gap-2">
          <IconCode className="size-4 text-muted-foreground" />
          <div>
            <ArtifactTitle>sorting-algorithm.ts</ArtifactTitle>
            <ArtifactDescription>TypeScript</ArtifactDescription>
          </div>
        </div>
        <ArtifactActions>
          <ArtifactAction icon={IconCopy} tooltip="Copy" />
          <ArtifactClose />
        </ArtifactActions>
      </ArtifactHeader>
      <ArtifactContent>
        <pre className="p-4 text-sm font-mono bg-muted/30 overflow-x-auto">
{`export function quickSort<T>(arr: T[]): T[] {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);
  
  return [...quickSort(left), ...middle, ...quickSort(right)];
}`}
        </pre>
      </ArtifactContent>
    </Artifact>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Artifact displaying code with syntax highlighting.',
      },
    },
  },
};

/**
 * Document artifact.
 */
export const DocumentArtifact: Story = {
  render: () => (
    <Artifact>
      <ArtifactHeader>
        <div>
          <ArtifactTitle>Project Summary</ArtifactTitle>
          <ArtifactDescription>Generated document</ArtifactDescription>
        </div>
        <ArtifactActions>
          <ArtifactAction icon={IconExternalLink} tooltip="Open in new tab" />
          <ArtifactAction icon={IconDownload} tooltip="Download" />
          <ArtifactClose />
        </ArtifactActions>
      </ArtifactHeader>
      <ArtifactContent className="p-4 prose prose-sm max-w-none">
        <h3 className="text-base font-semibold">Overview</h3>
        <p className="text-sm text-muted-foreground">
          This document provides a comprehensive summary of the project scope, 
          deliverables, and timeline. The project aims to modernize the existing 
          infrastructure while maintaining backward compatibility.
        </p>
        <h4 className="text-sm font-semibold mt-4">Key Objectives</h4>
        <ul className="text-sm text-muted-foreground list-disc pl-4">
          <li>Improve performance by 40%</li>
          <li>Reduce maintenance costs</li>
          <li>Enhance user experience</li>
        </ul>
      </ArtifactContent>
    </Artifact>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Artifact displaying a generated document.',
      },
    },
  },
};

/**
 * Minimal artifact.
 */
export const Minimal: Story = {
  render: () => (
    <Artifact>
      <ArtifactHeader>
        <ArtifactTitle>Quick Note</ArtifactTitle>
        <ArtifactClose />
      </ArtifactHeader>
      <ArtifactContent className="p-4">
        <p className="text-sm">A minimal artifact with just a title and content.</p>
      </ArtifactContent>
    </Artifact>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Minimal artifact with basic structure.',
      },
    },
  },
};

/**
 * Artifact with multiple actions.
 */
export const WithMultipleActions: Story = {
  render: () => (
    <Artifact>
      <ArtifactHeader>
        <div>
          <ArtifactTitle>API Response</ArtifactTitle>
          <ArtifactDescription>JSON data structure</ArtifactDescription>
        </div>
        <ArtifactActions>
          <ArtifactAction 
            icon={IconCopy} 
            tooltip="Copy to clipboard" 
            label="Copy"
          />
          <ArtifactAction 
            icon={IconDownload} 
            tooltip="Download as file" 
            label="Download"
          />
          <ArtifactAction 
            icon={IconExternalLink} 
            tooltip="Open in editor" 
          />
          <ArtifactClose />
        </ArtifactActions>
      </ArtifactHeader>
      <ArtifactContent>
        <pre className="p-4 text-sm font-mono bg-muted/30">
{`{
  "status": "success",
  "data": {
    "id": 123,
    "name": "Example",
    "items": [1, 2, 3]
  }
}`}
        </pre>
      </ArtifactContent>
    </Artifact>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Artifact with multiple action buttons.',
      },
    },
  },
};

/**
 * Visual regression testing.
 */
export const VisualRegression: Story = {
  render: () => (
    <div className="space-y-8 p-4 w-[450px]">
      {/* Basic artifact */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Basic</h3>
        <Artifact>
          <ArtifactHeader>
            <ArtifactTitle>Sample Artifact</ArtifactTitle>
            <ArtifactClose />
          </ArtifactHeader>
          <ArtifactContent className="p-4">
            <p className="text-sm">Content goes here.</p>
          </ArtifactContent>
        </Artifact>
      </div>

      {/* With description and actions */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Full Featured</h3>
        <Artifact>
          <ArtifactHeader>
            <div>
              <ArtifactTitle>Code Snippet</ArtifactTitle>
              <ArtifactDescription>JavaScript</ArtifactDescription>
            </div>
            <ArtifactActions>
              <ArtifactAction icon={IconCopy} tooltip="Copy" />
              <ArtifactClose />
            </ArtifactActions>
          </ArtifactHeader>
          <ArtifactContent className="p-4 bg-muted/30">
            <code className="text-sm">console.log("Hello");</code>
          </ArtifactContent>
        </Artifact>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Artifacts for visual regression testing.',
      },
    },
    chromatic: {
      disableSnapshot: false,
    },
  },
  decorators: [
    (Story) => (
      <div className="p-4">
        <Story />
      </div>
    ),
  ],
};

/**
 * Interactive playground.
 */
export const Playground: Story = {
  render: () => (
    <Artifact>
      <ArtifactHeader>
        <div>
          <ArtifactTitle>Playground Artifact</ArtifactTitle>
          <ArtifactDescription>Interactive example</ArtifactDescription>
        </div>
        <ArtifactActions>
          <ArtifactAction icon={IconCopy} tooltip="Copy" />
          <ArtifactClose />
        </ArtifactActions>
      </ArtifactHeader>
      <ArtifactContent className="p-4">
        <p className="text-sm">
          This is a playground artifact. You can customize the structure 
          by modifying the code.
        </p>
      </ArtifactContent>
    </Artifact>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive artifact example.',
      },
    },
  },
};
