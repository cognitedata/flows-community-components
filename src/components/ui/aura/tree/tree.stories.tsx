import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import {
  IconFile,
  IconFileText,
  IconFolder,
  IconSettings,
} from '@tabler/icons-react';
import { useState } from 'react';

import { Tree, TreeItem } from '@/components/ui/aura/tree';

const meta: Meta<typeof Tree> = {
  title: 'Primitives/Tree',
  component: Tree,
  tags: ['autodocs'],
  argTypes: {
    expanded: {
      control: false,
      description: 'Controlled expanded items (array of values)',
      table: {
        category: 'State',
        type: { summary: 'string[]' },
      },
    },
    defaultExpanded: {
      control: false,
      description: 'Default expanded items for uncontrolled mode',
      table: {
        category: 'State',
        type: { summary: 'string[]' },
      },
    },
    type: {
      control: 'radio',
      options: ['single', 'multiple'],
      description: 'Single or multiple expansion mode',
      table: {
        category: 'State',
        defaultValue: { summary: 'multiple' },
      },
    },

    onExpandedChange: {
      action: 'expandedChanged',
      description: 'Callback when expanded items change',
      table: {
        category: 'Events',
        type: { summary: '(expanded: string[]) => void' },
      },
    },

    className: {
      control: 'text',
      description: 'CSS classes for styling',
      table: {
        category: 'Display',
      },
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A hierarchical tree view with collapsible nodes and optional status indicators.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tree>;

export const Basic: Story = {
  parameters: {
    order: 1,
    docs: {
      description: {
        story: 'Simple tree with expandable nodes.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggers = await canvas.findAllByRole('button');
    const documentsButton = triggers[0];
    await expect(documentsButton).toHaveAttribute('data-state', 'closed');
    await userEvent.click(documentsButton);
    await expect(documentsButton).toHaveAttribute('data-state', 'open');
    await userEvent.click(documentsButton);
    await expect(documentsButton).toHaveAttribute('data-state', 'closed');
  },
  render: () => (
    <Tree className="w-75">
      <TreeItem value="documents" label="Documents">
        <TreeItem value="design" label="Design">
          <TreeItem value="wireframes" label="wireframes.fig" />
          <TreeItem value="mockups" label="mockups.fig" />
        </TreeItem>
        <TreeItem value="reports" label="Reports">
          <TreeItem value="q1-report" label="Q1 Report.pdf" />
          <TreeItem value="q2-report" label="Q2 Report.pdf" />
        </TreeItem>
      </TreeItem>
      <TreeItem value="downloads" label="Downloads">
        <TreeItem value="archive" label="archive.zip" />
      </TreeItem>
    </Tree>
  ),
};

export const WithStatusIndicators: Story = {
  parameters: {
    order: 2,
    docs: {
      description: {
        story: 'Status indicators bubble up from children to parents.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const processUnit = canvas.getByRole('treeitem', {
      name: /^Process unit 21\b/i,
    });
    await waitFor(() =>
      expect(processUnit).toHaveAttribute('data-status', 'warning')
    );

    const feedSystem = canvas.getByRole('treeitem', {
      name: /^Feed system\b/i,
    });
    await waitFor(() =>
      expect(feedSystem).toHaveAttribute('data-status', 'warning')
    );

    const pumpA = canvas.getByRole('treeitem', { name: /^Feed Pump A\b/i });
    await waitFor(() =>
      expect(pumpA).toHaveAttribute('data-status', 'warning')
    );

    const pumpB = canvas.getByRole('treeitem', { name: /^Feed Pump B\b/i });
    await expect(pumpB).not.toHaveAttribute('data-status');

    const badges = canvas.getAllByLabelText(/warning|error/i);
    await expect(badges.length).toBe(3);
  },
  render: () => (
    <Tree defaultExpanded={['process-21', 'feed-system']} className="w-75">
      <TreeItem value="process-21" label="Process unit 21">
        <TreeItem value="feed-system" label="Feed system">
          <TreeItem value="pump-a" label="Feed Pump A" status="warning" />
          <TreeItem value="pump-b" label="Feed Pump B" />
        </TreeItem>
        <TreeItem value="drain-system" label="Drain system" />
      </TreeItem>
      <TreeItem value="process-22" label="Process unit 22" />
    </Tree>
  ),
};

export const ErrorPriority: Story = {
  parameters: {
    order: 3,
    docs: {
      description: {
        story: 'Error status takes priority over warning when statuses merge.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const components = canvas.getByRole('treeitem', { name: /^components\b/i });
    await waitFor(() =>
      expect(components).toHaveAttribute('data-status', 'error')
    );

    const src = canvas.getByRole('treeitem', { name: /^src\b/i });
    await waitFor(() => expect(src).toHaveAttribute('data-status', 'error'));

    const utils = canvas.getByRole('treeitem', { name: /^utils\b/i });
    await expect(utils).not.toHaveAttribute('data-status');
  },
  render: () => (
    <Tree defaultExpanded={['src', 'components']} className="w-88">
      <TreeItem value="src" label="src" icon={IconFolder}>
        <TreeItem value="components" label="components" icon={IconFolder}>
          <TreeItem value="button" label="Button.tsx" icon={IconFile} />
          <TreeItem
            value="input"
            label="Input.tsx"
            icon={IconFile}
            status="warning"
          />
          <TreeItem
            value="modal"
            label="Modal.tsx"
            icon={IconFile}
            status="error"
          />
        </TreeItem>
        <TreeItem value="utils" label="utils" icon={IconFolder}>
          <TreeItem value="helpers" label="helpers.ts" icon={IconFile} />
          <TreeItem value="constants" label="constants.ts" icon={IconFile} />
        </TreeItem>
        <TreeItem value="app" label="App.tsx" icon={IconFile} />
        <TreeItem value="index" label="index.tsx" icon={IconFile} />
      </TreeItem>
      <TreeItem value="package" label="package.json" icon={IconFileText} />
      <TreeItem value="readme" label="README.md" icon={IconFileText} />
    </Tree>
  ),
};

export const Controlled: Story = {
  parameters: {
    order: 4,
    docs: {
      description: {
        story:
          'Tree with externally controlled expanded state using `expanded` and `onExpandedChange`.',
      },
    },
  },
  render: function ControlledStory() {
    const [expanded, setExpanded] = useState<string[]>(['root']);

    return (
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground">
          Expanded: {expanded.join(', ') || 'none'}
        </div>
        <Tree
          expanded={expanded}
          onExpandedChange={setExpanded}
          className="w-75"
        >
          <TreeItem value="root" label="Root">
            <TreeItem value="branch-1" label="Branch 1">
              <TreeItem value="leaf-1a" label="Leaf 1A" />
              <TreeItem value="leaf-1b" label="Leaf 1B" />
            </TreeItem>
            <TreeItem value="branch-2" label="Branch 2">
              <TreeItem value="leaf-2a" label="Leaf 2A" />
            </TreeItem>
          </TreeItem>
        </Tree>
      </div>
    );
  },
};

export const SingleExpand: Story = {
  parameters: {
    order: 5,
    docs: {
      description: {
        story: 'With `type="single"`, only one item can be expanded at a time.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const folderA = await canvas.findByRole('button', { name: 'Folder A' });
    const folderB = await canvas.findByRole('button', { name: 'Folder B' });
    await userEvent.click(folderA);
    await expect(folderA).toHaveAttribute('data-state', 'open');
    await expect(folderB).toHaveAttribute('data-state', 'closed');
    await userEvent.click(folderB);
    await expect(folderA).toHaveAttribute('data-state', 'closed');
    await expect(folderB).toHaveAttribute('data-state', 'open');
  },
  render: () => (
    <Tree type="single" className="w-75">
      <TreeItem value="folder-a" label="Folder A">
        <TreeItem value="file-a1" label="File A1" />
        <TreeItem value="file-a2" label="File A2" />
      </TreeItem>
      <TreeItem value="folder-b" label="Folder B">
        <TreeItem value="file-b1" label="File B1" />
        <TreeItem value="file-b2" label="File B2" />
      </TreeItem>
      <TreeItem value="folder-c" label="Folder C">
        <TreeItem value="file-c1" label="File C1" />
      </TreeItem>
    </Tree>
  ),
};

export const DeepNesting: Story = {
  parameters: {
    order: 6,
    docs: {
      description: {
        story: 'Deep nesting with indentation and horizontal scroll.',
      },
    },
  },
  render: () => (
    <Tree
      defaultExpanded={['level-1', 'level-2', 'level-3', 'level-4', 'level-5']}
      className="w-75"
    >
      <TreeItem value="level-1" label="Level 1">
        <TreeItem value="level-2" label="Level 2">
          <TreeItem value="level-3" label="Level 3">
            <TreeItem value="level-4" label="Level 4">
              <TreeItem value="level-5" label="Level 5">
                <TreeItem
                  value="level-6"
                  label="Level 6 - Deep leaf"
                  status="warning"
                />
              </TreeItem>
            </TreeItem>
          </TreeItem>
        </TreeItem>
      </TreeItem>
    </Tree>
  ),
};

export const WithIcons: Story = {
  parameters: {
    order: 7,
    docs: {
      description: {
        story: 'Tree items with icons.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggers = await canvas.findAllByRole('button');
    await expect(triggers.length).toBeGreaterThan(0);
  },
  render: () => (
    <Tree defaultExpanded={['project', 'src']} className="w-88">
      <TreeItem value="project" label="my-project" icon={IconFolder}>
        <TreeItem value="src" label="src" icon={IconFolder}>
          <TreeItem value="app" label="App.tsx" icon={IconFile} />
          <TreeItem value="index" label="index.tsx" icon={IconFile} />
        </TreeItem>
        <TreeItem value="config" label="settings.json" icon={IconSettings} />
        <TreeItem value="readme" label="README.md" icon={IconFileText} />
      </TreeItem>
    </Tree>
  ),
};

export const RTLSupport: Story = {
  parameters: {
    order: 8,
    docs: {
      description: {
        story: 'Tree with right-to-left layout support.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggers = await canvas.findAllByRole('button');
    await expect(triggers.length).toBeGreaterThan(1);
  },
  render: () => (
    <div dir="rtl" className="w-88">
      <Tree defaultExpanded={['folder-1', 'subfolder-1']}>
        <TreeItem value="folder-1" label="مجلد المستندات">
          <TreeItem value="subfolder-1" label="التقارير الشهرية">
            <TreeItem
              value="file-1a"
              label="تقرير يناير.pdf"
              status="warning"
            />
            <TreeItem value="file-1b" label="تقرير فبراير.pdf" />
            <TreeItem value="file-1c" label="تقرير مارس.pdf" status="error" />
          </TreeItem>
          <TreeItem value="file-1" label="ملاحظات.txt" />
        </TreeItem>
        <TreeItem value="folder-2" label="التنزيلات">
          <TreeItem value="file-3" label="أرشيف.zip" />
        </TreeItem>
      </Tree>
    </div>
  ),
};

export const ClickableLeafNodes: Story = {
  parameters: {
    order: 9,
    docs: {
      description: {
        story: 'Clickable leaf nodes with actions.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const navigation = await canvas.findByRole('button', {
      name: 'Navigation',
    });
    await userEvent.click(navigation);

    const treeItems = await canvas.findAllByRole('treeitem');
    const leafItems = treeItems.filter(
      (item) => !item.hasAttribute('aria-expanded')
    );
    await expect(leafItems.length).toBe(3);
    const dashboard = await canvas.findByRole('button', { name: 'Dashboard' });
    await userEvent.click(dashboard);
    await expect(
      await canvas.findByText('Clicked: dashboard')
    ).toBeInTheDocument();
  },
  render: function ClickableLeafStory() {
    const [clicked, setClicked] = useState<string | null>(null);

    return (
      <div className="space-y-4">
        <Tree className="w-88">
          <TreeItem value="navigation" label="Navigation" icon={IconFolder}>
            <TreeItem
              value="dashboard"
              label="Dashboard"
              icon={IconFile}
              onClick={() => setClicked('dashboard')}
            />
            <TreeItem
              value="settings"
              label="Settings"
              icon={IconSettings}
              onClick={() => setClicked('settings')}
            />
            <TreeItem
              value="reports"
              label="Reports"
              icon={IconFileText}
              onClick={() => setClicked('reports')}
            />
          </TreeItem>
        </Tree>
        {clicked && (
          <div className="text-sm text-muted-foreground">
            Clicked: {clicked}
          </div>
        )}
      </div>
    );
  },
};

export const DisabledItems: Story = {
  parameters: {
    order: 10,
    docs: {
      description: {
        story: 'Tree items can be disabled to prevent interaction.',
      },
    },
  },
  render: () => (
    <Tree className="w-75">
      <TreeItem value="active" label="Active folder">
        <TreeItem value="file-1" label="Available file" />
        <TreeItem value="file-2" label="Locked file" disabled />
      </TreeItem>
      <TreeItem value="archived" label="Archived folder" disabled>
        <TreeItem value="old-file" label="Old file" />
      </TreeItem>
    </Tree>
  ),
};

export const LongLabels: Story = {
  parameters: {
    order: 11,
    docs: {
      description: {
        story: 'Long labels truncate within the tree row.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggers = await canvas.findAllByRole('button');
    await userEvent.click(triggers[0]);
    await expect(
      canvas.getByText(
        'extremely-long-file-name-that-goes-on-and-on-and-should-definitely-truncate.tsx'
      )
    ).toBeInTheDocument();
  },
  render: () => (
    <Tree defaultExpanded={['long-parent']} className="w-75">
      <TreeItem
        value="long-parent"
        label="This is a very long parent folder name that should be truncated when it exceeds the available width"
      >
        <TreeItem
          value="long-child-1"
          label="extremely-long-file-name-that-goes-on-and-on-and-should-definitely-truncate.tsx"
        />
        <TreeItem
          value="long-child-2"
          label="another-deeply-nested-file-with-an-absurdly-long-name-for-testing-purposes.config.ts"
          status="warning"
        />
      </TreeItem>
      <TreeItem value="short" label="Short name" />
    </Tree>
  ),
};

export const ParentWithOwnStatus: Story = {
  parameters: {
    order: 12,
    docs: {
      description: {
        story: 'Parent status merges with child statuses by severity.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const parent = canvas.getByRole('treeitem', {
      name: /^System \(own warning\)/i,
    });
    await waitFor(() => expect(parent).toHaveAttribute('data-status', 'error'));

    const standalone = canvas.getByRole('treeitem', {
      name: /^System \(own warning, children OK\)/i,
    });
    await waitFor(() =>
      expect(standalone).toHaveAttribute('data-status', 'warning')
    );
  },
  render: () => (
    <Tree defaultExpanded={['parent-system', 'standalone']} className="w-75">
      <TreeItem
        value="parent-system"
        label="System (own warning)"
        status="warning"
      >
        <TreeItem value="child-ok" label="Subsystem A" />
        <TreeItem value="child-error" label="Subsystem B" status="error" />
      </TreeItem>
      <TreeItem
        value="standalone"
        label="System (own warning, children OK)"
        status="warning"
      >
        <TreeItem value="sub-1" label="Subsystem 1" />
        <TreeItem value="sub-2" label="Subsystem 2" />
      </TreeItem>
    </Tree>
  ),
};

export const EmptyTree: Story = {
  parameters: {
    order: 13,
    docs: {
      description: {
        story: 'Empty tree container with no items.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tree = canvas.getByRole('tree');
    await expect(tree).toBeInTheDocument();

    const items = canvas.queryAllByRole('treeitem');
    await expect(items.length).toBe(0);
  },
  render: () => <Tree className="w-75" />,
};

export const ManySiblings: Story = {
  parameters: {
    order: 14,
    docs: {
      description: {
        story:
          'A flat list of sibling items to verify rendering and scrolling behavior.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggers = await canvas.findAllByRole('button');
    await userEvent.click(triggers[0]);

    const treeItems = await canvas.findAllByRole('treeitem');
    const leaves = treeItems.filter(
      (item) => !item.hasAttribute('aria-expanded')
    );
    await expect(leaves.length).toBe(25);
  },
  render: () => (
    <Tree className="w-75">
      <TreeItem value="logs" label="Log entries">
        {Array.from({ length: 25 }, (_, i) => (
          <TreeItem
            key={`log-${i + 1}`}
            value={`log-${i + 1}`}
            label={`Log entry ${String(i + 1).padStart(3, '0')}`}
            status={i === 4 ? 'warning' : i === 19 ? 'error' : undefined}
          />
        ))}
      </TreeItem>
    </Tree>
  ),
};

export const RootLevelLeaves: Story = {
  parameters: {
    order: 15,
    docs: {
      description: {
        story: 'Root-level leaf items without parent folders.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const leaves = canvas.getAllByRole('treeitem');
    await expect(leaves.length).toBe(4);

    const triggers = canvas.queryAllByRole('button');
    await expect(triggers.length).toBe(4);
  },
  render: () => (
    <Tree className="w-75">
      <TreeItem value="readme" label="README.md" icon={IconFileText} />
      <TreeItem value="package" label="package.json" icon={IconFile} />
      <TreeItem
        value="tsconfig"
        label="tsconfig.json"
        icon={IconFile}
        status="warning"
      />
      <TreeItem value="license" label="LICENSE" icon={IconFileText} />
    </Tree>
  ),
};

export const NarrowViewport: Story = {
  parameters: {
    order: 16,
    docs: {
      description: {
        story: 'Narrow container with horizontal overflow.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tree = canvas.getByRole('tree');
    await expect(tree).toBeInTheDocument();
  },
  render: () => (
    <div className="w-48 rounded-md border border-dashed border-muted-foreground/25 p-2">
      <Tree defaultExpanded={['narrow-1', 'narrow-2', 'narrow-3', 'narrow-4']}>
        <TreeItem value="narrow-1" label="Projects" icon={IconFolder}>
          <TreeItem value="narrow-2" label="Frontend" icon={IconFolder}>
            <TreeItem value="narrow-3" label="Components" icon={IconFolder}>
              <TreeItem value="narrow-4" label="Forms" icon={IconFolder}>
                <TreeItem
                  value="narrow-leaf"
                  label="DatePicker.tsx"
                  icon={IconFile}
                  status="warning"
                />
              </TreeItem>
            </TreeItem>
          </TreeItem>
        </TreeItem>
      </Tree>
    </div>
  ),
};

export const DisabledWithStatus: Story = {
  parameters: {
    order: 17,
    docs: {
      description: {
        story: 'Disabled items with status badges.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const disabledParent = canvas.getByRole('treeitem', {
      name: /^Decommissioned system\b/i,
    });
    await waitFor(() =>
      expect(disabledParent).toHaveAttribute('data-status', 'warning')
    );

    const disabledTrigger = await canvas.findByRole('button', {
      name: /^Decommissioned system\b/i,
    });
    await expect(disabledTrigger).toHaveAttribute('aria-disabled', 'true');
  },
  render: () => (
    <Tree defaultExpanded={['enabled-parent']} className="w-75">
      <TreeItem value="enabled-parent" label="Active system">
        <TreeItem value="active-item" label="Online sensor" status="warning" />
        <TreeItem
          value="disabled-leaf"
          label="Offline sensor"
          status="error"
          disabled
        />
      </TreeItem>
      <TreeItem value="disabled-parent" label="Decommissioned system" disabled>
        <TreeItem value="old-sensor" label="Legacy sensor" status="warning" />
      </TreeItem>
    </Tree>
  ),
};

export const ClickableParentNodes: Story = {
  parameters: {
    order: 18,
    docs: {
      description: {
        story: 'Clickable parent nodes with onClick handlers.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggers = await canvas.findAllByRole('button');
    await userEvent.click(triggers[0]);
    await expect(
      await canvas.findByText('Clicked: project')
    ).toBeInTheDocument();
  },
  render: function ClickableParentStory() {
    const [clicked, setClicked] = useState<string | null>(null);

    return (
      <div className="space-y-4">
        <Tree className="w-88">
          <TreeItem
            value="project"
            label="Project"
            icon={IconFolder}
            onClick={() => setClicked('project')}
          >
            <TreeItem value="src" label="src" icon={IconFolder}>
              <TreeItem value="index" label="index.ts" icon={IconFile} />
            </TreeItem>
          </TreeItem>
        </Tree>
        {clicked && (
          <div className="text-sm text-muted-foreground">
            Clicked: {clicked}
          </div>
        )}
      </div>
    );
  },
};

export const DynamicItems: Story = {
  parameters: {
    order: 19,
    docs: {
      description: {
        story: 'Items can be added and removed at runtime.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    let treeItems = await canvas.findAllByRole('treeitem');
    let leaves = treeItems.filter(
      (item) => !item.hasAttribute('aria-expanded')
    );
    await expect(leaves.length).toBe(1);

    const parent = canvas.getByRole('treeitem', { name: /^Sensor array\b/i });
    await expect(parent).not.toHaveAttribute('data-status');

    const addButton = await canvas.findByRole('button', { name: 'Add sensor' });
    await userEvent.click(addButton);

    treeItems = await canvas.findAllByRole('treeitem');
    leaves = treeItems.filter((item) => !item.hasAttribute('aria-expanded'));
    await expect(leaves.length).toBe(2);
    await expect(parent).toHaveAttribute('data-status', 'warning');

    const removeButton = await canvas.findByRole('button', {
      name: /click to remove/i,
    });
    await userEvent.click(removeButton);

    treeItems = await canvas.findAllByRole('treeitem');
    leaves = treeItems.filter((item) => !item.hasAttribute('aria-expanded'));
    await expect(leaves.length).toBe(1);
    await expect(parent).not.toHaveAttribute('data-status');
  },
  render: function DynamicItemsStory() {
    const [items, setItems] = useState<
      { value: string; label: string; status?: 'warning' }[]
    >([]);

    return (
      <div className="space-y-4">
        <button
          type="button"
          className="rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground"
          onClick={() =>
            setItems((prev) => [
              ...prev,
              {
                value: `sensor-${Date.now()}`,
                label: `Sensor ${prev.length + 1}`,
                status: 'warning',
              },
            ])
          }
        >
          Add sensor
        </button>
        <Tree defaultExpanded={['sensors']} className="w-88">
          <TreeItem value="sensors" label="Sensor array">
            <TreeItem value="stable" label="Stable sensor" />
            {items.map((item) => (
              <TreeItem
                key={item.value}
                value={item.value}
                label={`${item.label} - click to remove`}
                status={item.status}
                onClick={() =>
                  setItems((prev) => prev.filter((i) => i.value !== item.value))
                }
              />
            ))}
          </TreeItem>
        </Tree>
      </div>
    );
  },
};
