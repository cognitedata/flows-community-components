import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  IconFile,
  IconFileText,
  IconFolder,
  IconSettings,
} from '@tabler/icons-react';
import { useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { TreeView, TreeViewItem } from '.';

const meta: Meta<typeof TreeView> = {
  title: 'Primitives/TreeView',
  component: TreeView,
  tags: ['autodocs'],
  argTypes: {
    expanded: {
      control: false,
      table: {
        category: 'Behavior',
        type: { summary: 'string[]' },
      },
    },
    defaultExpanded: {
      control: false,
      table: {
        category: 'Behavior',
        type: { summary: 'string[]' },
      },
    },
    type: {
      control: 'radio',
      options: ['single', 'multiple'],
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'multiple' },
      },
    },

    onExpandedChange: {
      action: 'expandedChanged',
      table: {
        category: 'Events',
        type: { summary: '(expanded: string[]) => void' },
      },
    },

    className: {
      control: 'text',
      table: {
        category: 'Variants/Styling',
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof TreeView>;

export const Basic: Story = {
  parameters: {
    order: 1,
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
    <TreeView className="w-75">
      <TreeViewItem value="documents" label="Documents">
        <TreeViewItem value="design" label="Design">
          <TreeViewItem value="wireframes" label="wireframes.fig" />
          <TreeViewItem value="mockups" label="mockups.fig" />
        </TreeViewItem>
        <TreeViewItem value="reports" label="Reports">
          <TreeViewItem value="q1-report" label="Q1 Report.pdf" />
          <TreeViewItem value="q2-report" label="Q2 Report.pdf" />
        </TreeViewItem>
      </TreeViewItem>
      <TreeViewItem value="downloads" label="Downloads">
        <TreeViewItem value="archive" label="archive.zip" />
      </TreeViewItem>
    </TreeView>
  ),
};

export const WithStatusIndicators: Story = {
  parameters: {
    order: 2,
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
    <TreeView defaultExpanded={['process-21', 'feed-system']} className="w-75">
      <TreeViewItem value="process-21" label="Process unit 21">
        <TreeViewItem value="feed-system" label="Feed system">
          <TreeViewItem value="pump-a" label="Feed Pump A" status="warning" />
          <TreeViewItem value="pump-b" label="Feed Pump B" />
        </TreeViewItem>
        <TreeViewItem value="drain-system" label="Drain system" />
      </TreeViewItem>
      <TreeViewItem value="process-22" label="Process unit 22" />
    </TreeView>
  ),
};

export const ErrorPriority: Story = {
  parameters: {
    order: 3,
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
    <TreeView defaultExpanded={['src', 'components']} className="w-88">
      <TreeViewItem value="src" label="src" icon={IconFolder}>
        <TreeViewItem value="components" label="components" icon={IconFolder}>
          <TreeViewItem value="button" label="Button.tsx" icon={IconFile} />
          <TreeViewItem
            value="input"
            label="Input.tsx"
            icon={IconFile}
            status="warning"
          />
          <TreeViewItem
            value="modal"
            label="Modal.tsx"
            icon={IconFile}
            status="error"
          />
        </TreeViewItem>
        <TreeViewItem value="utils" label="utils" icon={IconFolder}>
          <TreeViewItem value="helpers" label="helpers.ts" icon={IconFile} />
          <TreeViewItem
            value="constants"
            label="constants.ts"
            icon={IconFile}
          />
        </TreeViewItem>
        <TreeViewItem value="app" label="App.tsx" icon={IconFile} />
        <TreeViewItem value="index" label="index.tsx" icon={IconFile} />
      </TreeViewItem>
      <TreeViewItem value="package" label="package.json" icon={IconFileText} />
      <TreeViewItem value="readme" label="README.md" icon={IconFileText} />
    </TreeView>
  ),
};

export const Controlled: Story = {
  parameters: {
    order: 4,
  },
  render: function ControlledStory() {
    const [expanded, setExpanded] = useState<string[]>(['root']);

    return (
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground">
          Expanded: {expanded.join(', ') || 'none'}
        </div>
        <TreeView
          expanded={expanded}
          onExpandedChange={setExpanded}
          className="w-75"
        >
          <TreeViewItem value="root" label="Root">
            <TreeViewItem value="branch-1" label="Branch 1">
              <TreeViewItem value="leaf-1a" label="Leaf 1A" />
              <TreeViewItem value="leaf-1b" label="Leaf 1B" />
            </TreeViewItem>
            <TreeViewItem value="branch-2" label="Branch 2">
              <TreeViewItem value="leaf-2a" label="Leaf 2A" />
            </TreeViewItem>
          </TreeViewItem>
        </TreeView>
      </div>
    );
  },
};

export const SingleExpand: Story = {
  parameters: {
    order: 5,
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
    <TreeView type="single" className="w-75">
      <TreeViewItem value="folder-a" label="Folder A">
        <TreeViewItem value="file-a1" label="File A1" />
        <TreeViewItem value="file-a2" label="File A2" />
      </TreeViewItem>
      <TreeViewItem value="folder-b" label="Folder B">
        <TreeViewItem value="file-b1" label="File B1" />
        <TreeViewItem value="file-b2" label="File B2" />
      </TreeViewItem>
      <TreeViewItem value="folder-c" label="Folder C">
        <TreeViewItem value="file-c1" label="File C1" />
      </TreeViewItem>
    </TreeView>
  ),
};

export const DeepNesting: Story = {
  parameters: {
    order: 6,
  },
  render: () => (
    <TreeView
      defaultExpanded={['level-1', 'level-2', 'level-3', 'level-4', 'level-5']}
      className="w-75"
    >
      <TreeViewItem value="level-1" label="Level 1">
        <TreeViewItem value="level-2" label="Level 2">
          <TreeViewItem value="level-3" label="Level 3">
            <TreeViewItem value="level-4" label="Level 4">
              <TreeViewItem value="level-5" label="Level 5">
                <TreeViewItem
                  value="level-6"
                  label="Level 6 - Deep leaf"
                  status="warning"
                />
              </TreeViewItem>
            </TreeViewItem>
          </TreeViewItem>
        </TreeViewItem>
      </TreeViewItem>
    </TreeView>
  ),
};

export const WithIcons: Story = {
  parameters: {
    order: 7,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggers = await canvas.findAllByRole('button');
    await expect(triggers.length).toBeGreaterThan(0);
  },
  render: () => (
    <TreeView defaultExpanded={['project', 'src']} className="w-88">
      <TreeViewItem value="project" label="my-project" icon={IconFolder}>
        <TreeViewItem value="src" label="src" icon={IconFolder}>
          <TreeViewItem value="app" label="App.tsx" icon={IconFile} />
          <TreeViewItem value="index" label="index.tsx" icon={IconFile} />
        </TreeViewItem>
        <TreeViewItem
          value="config"
          label="settings.json"
          icon={IconSettings}
        />
        <TreeViewItem value="readme" label="README.md" icon={IconFileText} />
      </TreeViewItem>
    </TreeView>
  ),
};

export const RTLSupport: Story = {
  parameters: {
    order: 8,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggers = await canvas.findAllByRole('button');
    await expect(triggers.length).toBeGreaterThan(1);
  },
  render: () => (
    <div dir="rtl" className="w-88">
      <TreeView defaultExpanded={['folder-1', 'subfolder-1']}>
        <TreeViewItem value="folder-1" label="مجلد المستندات">
          <TreeViewItem value="subfolder-1" label="التقارير الشهرية">
            <TreeViewItem
              value="file-1a"
              label="تقرير يناير.pdf"
              status="warning"
            />
            <TreeViewItem value="file-1b" label="تقرير فبراير.pdf" />
            <TreeViewItem
              value="file-1c"
              label="تقرير مارس.pdf"
              status="error"
            />
          </TreeViewItem>
          <TreeViewItem value="file-1" label="ملاحظات.txt" />
        </TreeViewItem>
        <TreeViewItem value="folder-2" label="التنزيلات">
          <TreeViewItem value="file-3" label="أرشيف.zip" />
        </TreeViewItem>
      </TreeView>
    </div>
  ),
};

export const ClickableLeafNodes: Story = {
  parameters: {
    order: 9,
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
        <TreeView className="w-88">
          <TreeViewItem value="navigation" label="Navigation" icon={IconFolder}>
            <TreeViewItem
              value="dashboard"
              label="Dashboard"
              icon={IconFile}
              onClick={() => setClicked('dashboard')}
            />
            <TreeViewItem
              value="settings"
              label="Settings"
              icon={IconSettings}
              onClick={() => setClicked('settings')}
            />
            <TreeViewItem
              value="reports"
              label="Reports"
              icon={IconFileText}
              onClick={() => setClicked('reports')}
            />
          </TreeViewItem>
        </TreeView>
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
  },
  render: () => (
    <TreeView className="w-75">
      <TreeViewItem value="active" label="Active folder">
        <TreeViewItem value="file-1" label="Available file" />
        <TreeViewItem value="file-2" label="Locked file" disabled />
      </TreeViewItem>
      <TreeViewItem value="archived" label="Archived folder" disabled>
        <TreeViewItem value="old-file" label="Old file" />
      </TreeViewItem>
    </TreeView>
  ),
};

export const LongLabels: Story = {
  parameters: {
    order: 11,
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
    <TreeView defaultExpanded={['long-parent']} className="w-75">
      <TreeViewItem
        value="long-parent"
        label="This is a very long parent folder name that should be truncated when it exceeds the available width"
      >
        <TreeViewItem
          value="long-child-1"
          label="extremely-long-file-name-that-goes-on-and-on-and-should-definitely-truncate.tsx"
        />
        <TreeViewItem
          value="long-child-2"
          label="another-deeply-nested-file-with-an-absurdly-long-name-for-testing-purposes.config.ts"
          status="warning"
        />
      </TreeViewItem>
      <TreeViewItem value="short" label="Short name" />
    </TreeView>
  ),
};

export const ParentWithOwnStatus: Story = {
  parameters: {
    order: 12,
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
    <TreeView
      defaultExpanded={['parent-system', 'standalone']}
      className="w-75"
    >
      <TreeViewItem
        value="parent-system"
        label="System (own warning)"
        status="warning"
      >
        <TreeViewItem value="child-ok" label="Subsystem A" />
        <TreeViewItem value="child-error" label="Subsystem B" status="error" />
      </TreeViewItem>
      <TreeViewItem
        value="standalone"
        label="System (own warning, children OK)"
        status="warning"
      >
        <TreeViewItem value="sub-1" label="Subsystem 1" />
        <TreeViewItem value="sub-2" label="Subsystem 2" />
      </TreeViewItem>
    </TreeView>
  ),
};

export const EmptyTree: Story = {
  parameters: {
    order: 13,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tree = canvas.getByRole('tree');
    await expect(tree).toBeInTheDocument();

    const items = canvas.queryAllByRole('treeitem');
    await expect(items.length).toBe(0);
  },
  render: () => <TreeView className="w-75" />,
};

export const ManySiblings: Story = {
  parameters: {
    order: 14,
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
    <TreeView className="w-75">
      <TreeViewItem value="logs" label="Log entries">
        {Array.from({ length: 25 }, (_, i) => (
          <TreeViewItem
            key={`log-${i + 1}`}
            value={`log-${i + 1}`}
            label={`Log entry ${String(i + 1).padStart(3, '0')}`}
            status={i === 4 ? 'warning' : i === 19 ? 'error' : undefined}
          />
        ))}
      </TreeViewItem>
    </TreeView>
  ),
};

export const RootLevelLeaves: Story = {
  parameters: {
    order: 15,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const leaves = canvas.getAllByRole('treeitem');
    await expect(leaves.length).toBe(4);

    const triggers = canvas.queryAllByRole('button');
    await expect(triggers.length).toBe(4);
  },
  render: () => (
    <TreeView className="w-75">
      <TreeViewItem value="readme" label="README.md" icon={IconFileText} />
      <TreeViewItem value="package" label="package.json" icon={IconFile} />
      <TreeViewItem
        value="tsconfig"
        label="tsconfig.json"
        icon={IconFile}
        status="warning"
      />
      <TreeViewItem value="license" label="LICENSE" icon={IconFileText} />
    </TreeView>
  ),
};

export const NarrowViewport: Story = {
  parameters: {
    order: 16,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tree = canvas.getByRole('tree');
    await expect(tree).toBeInTheDocument();
  },
  render: () => (
    <div className="w-48 rounded-md border border-dashed border-muted-foreground/25 p-2">
      <TreeView
        defaultExpanded={['narrow-1', 'narrow-2', 'narrow-3', 'narrow-4']}
      >
        <TreeViewItem value="narrow-1" label="Projects" icon={IconFolder}>
          <TreeViewItem value="narrow-2" label="Frontend" icon={IconFolder}>
            <TreeViewItem value="narrow-3" label="Components" icon={IconFolder}>
              <TreeViewItem value="narrow-4" label="Forms" icon={IconFolder}>
                <TreeViewItem
                  value="narrow-leaf"
                  label="DatePicker.tsx"
                  icon={IconFile}
                  status="warning"
                />
              </TreeViewItem>
            </TreeViewItem>
          </TreeViewItem>
        </TreeViewItem>
      </TreeView>
    </div>
  ),
};

export const DisabledWithStatus: Story = {
  parameters: {
    order: 17,
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
    <TreeView defaultExpanded={['enabled-parent']} className="w-75">
      <TreeViewItem value="enabled-parent" label="Active system">
        <TreeViewItem
          value="active-item"
          label="Online sensor"
          status="warning"
        />
        <TreeViewItem
          value="disabled-leaf"
          label="Offline sensor"
          status="error"
          disabled
        />
      </TreeViewItem>
      <TreeViewItem
        value="disabled-parent"
        label="Decommissioned system"
        disabled
      >
        <TreeViewItem
          value="old-sensor"
          label="Legacy sensor"
          status="warning"
        />
      </TreeViewItem>
    </TreeView>
  ),
};

export const ClickableParentNodes: Story = {
  parameters: {
    order: 18,
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
        <TreeView className="w-88">
          <TreeViewItem
            value="project"
            label="Project"
            icon={IconFolder}
            onClick={() => setClicked('project')}
          >
            <TreeViewItem value="src" label="src" icon={IconFolder}>
              <TreeViewItem value="index" label="index.ts" icon={IconFile} />
            </TreeViewItem>
          </TreeViewItem>
        </TreeView>
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
        <TreeView defaultExpanded={['sensors']} className="w-88">
          <TreeViewItem value="sensors" label="Sensor array">
            <TreeViewItem value="stable" label="Stable sensor" />
            {items.map((item) => (
              <TreeViewItem
                key={item.value}
                value={item.value}
                label={`${item.label} - click to remove`}
                status={item.status}
                onClick={() =>
                  setItems((prev) => prev.filter((i) => i.value !== item.value))
                }
              />
            ))}
          </TreeViewItem>
        </TreeView>
      </div>
    );
  },
};
