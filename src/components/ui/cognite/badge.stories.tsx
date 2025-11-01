import type { Meta, StoryObj } from '@storybook/nextjs';
import { Badge } from './badge';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'fjord',
        'nordic',
        'aurora',
        'sky',
        'dusk',
        'mountain',
        'secondary',
        'error',
        'warning',
        'success',
        'inProgress',
        'archived',
        'closable',
      ],
      description: 'The visual style variant of the badge',
    },
    outline: {
      control: 'boolean',
      description: 'Whether to show the badge with an outline style',
    },
    background: {
      control: 'boolean',
      description: 'Whether to show the background fill',
    },
    dot: {
      control: 'boolean',
      description: 'Whether to make the badge rounded (pill-shaped)',
    },
    children: {
      control: 'text',
      description: 'The content to display inside the badge',
    },
  },
  args: {
    children: 'Badge',
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

/**
 * The default badge with primary styling.
 */
export const Default: Story = {
  args: {
    variant: 'default',
    children: 'Default',
  },
};

/**
 * All available badge variants displayed together.
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="fjord">Fjord</Badge>
      <Badge variant="nordic">Nordic</Badge>
      <Badge variant="aurora">Aurora</Badge>
      <Badge variant="sky">Sky</Badge>
      <Badge variant="dusk">Dusk</Badge>
      <Badge variant="mountain">Mountain</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="inProgress">In Progress</Badge>
      <Badge variant="archived">Archived</Badge>
      <Badge variant="closable">Closable</Badge>
    </div>
  ),
};

/**
 * Badges with outline styling.
 */
export const Outline: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default" outline>Default</Badge>
      <Badge variant="fjord" outline>Fjord</Badge>
      <Badge variant="nordic" outline>Nordic</Badge>
      <Badge variant="aurora" outline>Aurora</Badge>
      <Badge variant="success" outline>Success</Badge>
      <Badge variant="error" outline>Error</Badge>
    </div>
  ),
};

/**
 * Badges without background fill.
 */
export const NoBackground: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default" background={false}>Default</Badge>
      <Badge variant="fjord" background={false}>Fjord</Badge>
      <Badge variant="success" background={false}>Success</Badge>
      <Badge variant="error" background={false}>Error</Badge>
    </div>
  ),
};

/**
 * Pill-shaped badges (rounded).
 */
export const Dot: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default" dot>Default</Badge>
      <Badge variant="fjord" dot>Fjord</Badge>
      <Badge variant="nordic" dot>Nordic</Badge>
      <Badge variant="success" dot>Success</Badge>
      <Badge variant="error" dot>Error</Badge>
    </div>
  ),
};

/**
 * Badges with icons for additional context.
 */
export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="success">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
          <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
        </svg>
        Success
      </Badge>
      <Badge variant="error">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
          <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
        </svg>
        Error
      </Badge>
      <Badge variant="warning">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
          <path fillRule="evenodd" d="M6.701 2.25c.577-1 2.02-1 2.598 0l5.196 9a1.5 1.5 0 0 1-1.299 2.25H2.804a1.5 1.5 0 0 1-1.3-2.25l5.197-9ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 1 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
        </svg>
        Warning
      </Badge>
      <Badge variant="inProgress">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
          <path fillRule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1ZM4.5 8a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5Z" clipRule="evenodd" />
        </svg>
        In Progress
      </Badge>
    </div>
  ),
};

/**
 * Combining multiple style options together.
 */
export const Combinations: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-muted-foreground w-full">Outline + Dot:</span>
        <Badge variant="fjord" outline dot>Fjord</Badge>
        <Badge variant="success" outline dot>Success</Badge>
        <Badge variant="error" outline dot>Error</Badge>
      </div>
      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-muted-foreground w-full">No Background + Outline:</span>
        <Badge variant="fjord" background={false} outline>Fjord</Badge>
        <Badge variant="success" background={false} outline>Success</Badge>
        <Badge variant="error" background={false} outline>Error</Badge>
      </div>
      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-muted-foreground w-full">Dot + Icon:</span>
        <Badge variant="success" dot>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
            <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
          </svg>
          Active
        </Badge>
        <Badge variant="error" dot>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
            <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
          </svg>
          Failed
        </Badge>
      </div>
    </div>
  ),
};

/**
 * Examples of badges in real-world usage contexts.
 */
export const UsageExamples: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {/* Status indicators */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Status Indicators</h3>
        <div className="flex items-center gap-2 p-3 border rounded-lg">
          <span className="text-sm">Server Status:</span>
          <Badge variant="success">Online</Badge>
        </div>
        <div className="flex items-center gap-2 p-3 border rounded-lg">
          <span className="text-sm">Deployment:</span>
          <Badge variant="inProgress">In Progress</Badge>
        </div>
        <div className="flex items-center gap-2 p-3 border rounded-lg">
          <span className="text-sm">Build:</span>
          <Badge variant="error">Failed</Badge>
        </div>
      </div>

      {/* Category tags */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Category Tags</h3>
        <div className="p-3 border rounded-lg">
          <p className="text-sm mb-2">AI-Powered Data Analysis Tool</p>
          <div className="flex flex-wrap gap-1.5">
            <Badge variant="fjord" dot>Machine Learning</Badge>
            <Badge variant="nordic" dot>Analytics</Badge>
            <Badge variant="aurora" dot>Cloud</Badge>
            <Badge variant="sky" dot>API</Badge>
          </div>
        </div>
      </div>

      {/* Notification counts */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Notification Counts</h3>
        <div className="flex gap-4">
          <button className="relative p-2 border rounded-lg hover:bg-accent">
            <span className="text-sm">Messages</span>
            <Badge variant="error" dot className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs">
              3
            </Badge>
          </button>
          <button className="relative p-2 border rounded-lg hover:bg-accent">
            <span className="text-sm">Alerts</span>
            <Badge variant="warning" dot className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs">
              12
            </Badge>
          </button>
        </div>
      </div>
    </div>
  ),
};

/**
 * Interactive badge with controls for testing all props.
 */
export const Playground: Story = {
  args: {
    variant: 'default',
    outline: false,
    background: true,
    dot: false,
    children: 'Playground Badge',
  },
};
