import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { IconFile, IconFileText, IconFolder, IconSettings } from "@tabler/icons-react";
import { useState } from "react";
import { Tree, TreeItem } from "./tree";

const meta: Meta<typeof Tree> = {
  title: "Primitives/Tree",
  component: Tree,
  tags: ["autodocs"],
  argTypes: {
    expanded: {
      control: false,
      description: "Controlled expanded items (array of values)",
      table: {
        category: "State",
        type: { summary: "string[]" },
      },
    },
    defaultExpanded: {
      control: false,
      description: "Default expanded items for uncontrolled mode",
      table: {
        category: "State",
        type: { summary: "string[]" },
      },
    },
    type: {
      control: "radio",
      options: ["single", "multiple"],
      description: "Single or multiple expansion mode",
      table: {
        category: "State",
        defaultValue: { summary: "multiple" },
      },
    },

    onExpandedChange: {
      action: "expandedChanged",
      description: "Callback when expanded items change",
      table: {
        category: "Events",
        type: { summary: "(expanded: string[]) => void" },
      },
    },

    className: {
      control: "text",
      description: "CSS classes for styling",
      table: {
        category: "Display",
      },
    },
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A hierarchical tree view component with collapsible nodes and status indicators that bubble up from children to parents. Supports RTL layouts and responsive indentation for mobile.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tree>;

/**
 * Basic tree with expandable nodes.
 * Tests expand/collapse interaction via clicking.
 */
export const Basic: Story = {
  parameters: {
    order: 1,
    docs: {
      description: {
        story: "Simple tree with expandable nodes. Click to expand/collapse.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggers = await canvas.findAllByRole("button");
    const documentsButton = triggers[0];
    await expect(documentsButton).toHaveAttribute("data-state", "closed");
    await userEvent.click(documentsButton);
    await expect(documentsButton).toHaveAttribute("data-state", "open");
    await userEvent.click(documentsButton);
    await expect(documentsButton).toHaveAttribute("data-state", "closed");
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

/**
 * Demonstrates warning and error status indicators.
 * Status bubbles up from children to parents automatically.
 */
export const WithStatusIndicators: Story = {
  parameters: {
    order: 2,
    docs: {
      description: {
        story:
          "Status indicators (warning/error) automatically bubble up from children to parents. A parent shows the most severe status of its descendants.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const processUnit = canvasElement.querySelector('[data-value="process-21"]');
    await expect(processUnit).toHaveAttribute("data-status", "warning");

    const feedSystem = canvasElement.querySelector('[data-value="feed-system"]');
    await expect(feedSystem).toHaveAttribute("data-status", "warning");

    const pumpA = canvasElement.querySelector('[data-value="pump-a"]');
    await expect(pumpA).toHaveAttribute("data-status", "warning");

    const pumpB = canvasElement.querySelector('[data-value="pump-b"]');
    await expect(pumpB).not.toHaveAttribute("data-status");
    const badges = canvasElement.querySelectorAll('[data-slot="badge"]');
    await expect(badges.length).toBe(3);
  },
  render: () => (
    <Tree defaultExpanded={["process-21", "feed-system"]} className="w-75">
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

/**
 * Error status takes priority over warning when statuses merge.
 * Uses a file explorer to show how mixed leaf statuses bubble up.
 */
export const ErrorPriority: Story = {
  parameters: {
    order: 3,
    docs: {
      description: {
        story:
          "When children have different statuses, the most severe bubbles up to the parent. The `components` folder contains both a warning (`Input.tsx`) and an error (`Modal.tsx`), so it shows the error badge. That error propagates up to `src` as well. Folders with no status descendants (`utils`) remain clean.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const components = canvasElement.querySelector('[data-value="components"]');
    await expect(components).toHaveAttribute("data-status", "error");
    const src = canvasElement.querySelector('[data-value="src"]');
    await expect(src).toHaveAttribute("data-status", "error");
    const utils = canvasElement.querySelector('[data-value="utils"]');
    await expect(utils).not.toHaveAttribute("data-status");
  },
  render: () => (
    <Tree defaultExpanded={["src", "components"]} className="w-88">
      <TreeItem value="src" label="src" icon={IconFolder}>
        <TreeItem value="components" label="components" icon={IconFolder}>
          <TreeItem value="button" label="Button.tsx" icon={IconFile} />
          <TreeItem value="input" label="Input.tsx" icon={IconFile} status="warning" />
          <TreeItem value="modal" label="Modal.tsx" icon={IconFile} status="error" />
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

/**
 * Controlled tree with external state management.
 */
export const Controlled: Story = {
  parameters: {
    order: 4,
    docs: {
      description: {
        story:
          "Tree with externally controlled expanded state using `expanded` and `onExpandedChange`.",
      },
    },
  },
  render: function ControlledStory() {
    const [expanded, setExpanded] = useState<string[]>(["root"]);

    return (
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground">
          Expanded: {expanded.join(", ") || "none"}
        </div>
        <Tree expanded={expanded} onExpandedChange={setExpanded} className="w-75">
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

/**
 * Single expand mode (accordion-like behavior).
 */
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
    const triggers = await canvas.findAllByRole("button");
    const folderA = triggers[0];
    const folderB = triggers[1];
    await userEvent.click(folderA);
    await expect(folderA).toHaveAttribute("data-state", "open");
    await expect(folderB).toHaveAttribute("data-state", "closed");
    await userEvent.click(folderB);
    await expect(folderA).toHaveAttribute("data-state", "closed");
    await expect(folderB).toHaveAttribute("data-state", "open");
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

/**
 * Deep nesting to demonstrate indentation and horizontal scroll.
 */
export const DeepNesting: Story = {
  parameters: {
    order: 6,
    docs: {
      description: {
        story:
          "Deep nesting demonstrates proper indentation. On narrow viewports, the tree scrolls horizontally.",
      },
    },
  },
  render: () => (
    <Tree
      defaultExpanded={["level-1", "level-2", "level-3", "level-4", "level-5"]}
      className="w-75"
    >
      <TreeItem value="level-1" label="Level 1">
        <TreeItem value="level-2" label="Level 2">
          <TreeItem value="level-3" label="Level 3">
            <TreeItem value="level-4" label="Level 4">
              <TreeItem value="level-5" label="Level 5">
                <TreeItem value="level-6" label="Level 6 - Deep leaf" status="warning" />
              </TreeItem>
            </TreeItem>
          </TreeItem>
        </TreeItem>
      </TreeItem>
    </Tree>
  ),
};

/**
 * Tree items with icons.
 */
export const WithIcons: Story = {
  parameters: {
    order: 7,
    docs: {
      description: {
        story:
          "Tree items can display an icon via the `icon` prop. Icons render after the chevron and before the label. Any Tabler icon component (or compatible `IconProps` component) can be used.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggers = await canvas.findAllByRole("button");
    await expect(triggers.length).toBeGreaterThan(0);
  },
  render: () => (
    <Tree defaultExpanded={["project", "src"]} className="w-88">
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

/**
 * RTL (Right-to-Left) support demonstration.
 */
export const RTLSupport: Story = {
  parameters: {
    order: 8,
    docs: {
      description: {
        story:
          "Tree component with RTL layout support for languages like Arabic and Hebrew. Indentation, chevron direction, and badge placement adapt automatically across multiple nesting levels.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggers = await canvas.findAllByRole("button");
    await expect(triggers.length).toBeGreaterThan(1);
  },
  render: () => (
    <div dir="rtl" className="w-88">
      <Tree defaultExpanded={["folder-1", "subfolder-1"]}>
        <TreeItem value="folder-1" label="مجلد المستندات">
          <TreeItem value="subfolder-1" label="التقارير الشهرية">
            <TreeItem value="file-1a" label="تقرير يناير.pdf" status="warning" />
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

/**
 * Clickable leaf nodes with actions.
 * Leaf nodes are hoverable and clickable, similar to parent triggers.
 */
export const ClickableLeafNodes: Story = {
  parameters: {
    order: 9,
    docs: {
      description: {
        story:
          "Leaf nodes are interactive — they support hover styles and click handlers. Consumers can attach any action (navigation, opening a sidebar, etc.) via `onClick`.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggers = await canvas.findAllByRole("button");
    await userEvent.click(triggers[0]);
    const leafItems = canvasElement.querySelectorAll('[data-slot="tree-item-leaf"]');
    await expect(leafItems.length).toBe(3);
    await userEvent.click(leafItems[0]);
    await expect(await canvas.findByText("Clicked: dashboard")).toBeInTheDocument();
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
              onClick={() => setClicked("dashboard")}
            />
            <TreeItem
              value="settings"
              label="Settings"
              icon={IconSettings}
              onClick={() => setClicked("settings")}
            />
            <TreeItem
              value="reports"
              label="Reports"
              icon={IconFileText}
              onClick={() => setClicked("reports")}
            />
          </TreeItem>
        </Tree>
        {clicked && <div className="text-sm text-muted-foreground">Clicked: {clicked}</div>}
      </div>
    );
  },
};

/**
 * Disabled items example.
 */
export const DisabledItems: Story = {
  parameters: {
    order: 10,
    docs: {
      description: {
        story: "Tree items can be disabled to prevent interaction.",
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

/**
 * Long labels demonstrate truncation behavior.
 */
export const LongLabels: Story = {
  parameters: {
    order: 11,
    docs: {
      description: {
        story:
          "Labels exceeding the container width are truncated with an ellipsis. The `truncate` class ensures text never wraps or breaks the layout.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggers = await canvas.findAllByRole("button");
    await userEvent.click(triggers[0]);
    const labels = canvasElement.querySelectorAll('[data-slot="tree-item"] span.truncate');
    await expect(labels.length).toBeGreaterThan(0);
  },
  render: () => (
    <Tree defaultExpanded={["long-parent"]} className="w-75">
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

/**
 * Parent node with its own status and children with different statuses.
 */
export const ParentWithOwnStatus: Story = {
  parameters: {
    order: 12,
    docs: {
      description: {
        story:
          "A parent can have its own `status` alongside children with statuses. The derived status is the most severe across own + children. Here, the parent has `warning` but a child has `error`, so `error` wins.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const parent = canvasElement.querySelector('[data-value="parent-system"]');
    await expect(parent).toHaveAttribute("data-status", "error");
    const standalone = canvasElement.querySelector('[data-value="standalone"]');
    await expect(standalone).toHaveAttribute("data-status", "warning");
  },
  render: () => (
    <Tree defaultExpanded={["parent-system", "standalone"]} className="w-75">
      <TreeItem value="parent-system" label="System (own warning)" status="warning">
        <TreeItem value="child-ok" label="Subsystem A" />
        <TreeItem value="child-error" label="Subsystem B" status="error" />
      </TreeItem>
      <TreeItem value="standalone" label="System (own warning, children OK)" status="warning">
        <TreeItem value="sub-1" label="Subsystem 1" />
        <TreeItem value="sub-2" label="Subsystem 2" />
      </TreeItem>
    </Tree>
  ),
};

/**
 * Empty tree with no items.
 */
export const EmptyTree: Story = {
  parameters: {
    order: 13,
    docs: {
      description: {
        story:
          "An empty tree renders the container element with no children. Useful for verifying zero-state behavior.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tree = canvas.getByRole("tree");
    await expect(tree).toBeInTheDocument();
    const items = canvasElement.querySelectorAll('[data-slot="tree-item"]');
    await expect(items.length).toBe(0);
  },
  render: () => <Tree className="w-75" />,
};

/**
 * Large number of siblings at one level.
 */
export const ManySiblings: Story = {
  parameters: {
    order: 14,
    docs: {
      description: {
        story:
          "A flat list of 25 items at the same depth to verify scroll behavior and rendering with many siblings.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggers = await canvas.findAllByRole("button");
    await userEvent.click(triggers[0]);
    const leaves = canvasElement.querySelectorAll('[data-slot="tree-item-leaf"]');
    await expect(leaves.length).toBe(25);
  },
  render: () => (
    <Tree className="w-75">
      <TreeItem value="logs" label="Log entries">
        {Array.from({ length: 25 }, (_, i) => (
          <TreeItem
            key={`log-${i + 1}`}
            value={`log-${i + 1}`}
            label={`Log entry ${String(i + 1).padStart(3, "0")}`}
            status={i === 4 ? "warning" : i === 19 ? "error" : undefined}
          />
        ))}
      </TreeItem>
    </Tree>
  ),
};

/**
 * Leaf nodes at root level without a parent.
 */
export const RootLevelLeaves: Story = {
  parameters: {
    order: 15,
    docs: {
      description: {
        story:
          "Leaf items can exist at the root level without a parent folder. Validates indentation and rendering for top-level non-collapsible items.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const leaves = canvasElement.querySelectorAll('[data-slot="tree-item-leaf"]');
    await expect(leaves.length).toBe(4);

    const triggers = canvas.queryAllByRole("button");
    await expect(triggers.length).toBe(0);
  },
  render: () => (
    <Tree className="w-75">
      <TreeItem value="readme" label="README.md" icon={IconFileText} />
      <TreeItem value="package" label="package.json" icon={IconFile} />
      <TreeItem value="tsconfig" label="tsconfig.json" icon={IconFile} status="warning" />
      <TreeItem value="license" label="LICENSE" icon={IconFileText} />
    </Tree>
  ),
};

/**
 * Narrow container demonstrating horizontal scroll.
 */
export const NarrowViewport: Story = {
  parameters: {
    order: 16,
    docs: {
      description: {
        story:
          "A deeply nested tree inside a narrow container (12rem) to demonstrate horizontal overflow scrolling. The tree uses `overflow-x-auto` to handle content wider than its container.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const tree = canvas.getByRole("tree");
    await expect(tree).toBeInTheDocument();
  },
  render: () => (
    <div className="w-48 rounded-md border border-dashed border-muted-foreground/25 p-2">
      <Tree defaultExpanded={["narrow-1", "narrow-2", "narrow-3", "narrow-4"]}>
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

/**
 * Disabled items with status badges.
 */
export const DisabledWithStatus: Story = {
  parameters: {
    order: 17,
    docs: {
      description: {
        story:
          "Disabled items that also have status badges. The reduced opacity from `disabled` applies to the entire row including the badge, verifying that visual states compose correctly.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const disabledParent = canvasElement.querySelector('[data-value="disabled-parent"]');
    await expect(disabledParent).toHaveAttribute("data-status", "warning");
    const triggers = await canvas.findAllByRole("button");
    const disabledTrigger = triggers.find((t) => t.closest('[data-value="disabled-parent"]'));
    await expect(disabledTrigger).toBeDisabled();
  },
  render: () => (
    <Tree defaultExpanded={["enabled-parent"]} className="w-75">
      <TreeItem value="enabled-parent" label="Active system">
        <TreeItem value="active-item" label="Online sensor" status="warning" />
        <TreeItem value="disabled-leaf" label="Offline sensor" status="error" disabled />
      </TreeItem>
      <TreeItem value="disabled-parent" label="Decommissioned system" disabled>
        <TreeItem value="old-sensor" label="Legacy sensor" status="warning" />
      </TreeItem>
    </Tree>
  ),
};

/**
 * Clickable parent nodes with onClick handlers.
 */
export const ClickableParentNodes: Story = {
  parameters: {
    order: 18,
    docs: {
      description: {
        story:
          "Parent nodes can accept `onClick` via spread props. Note: `onClick` fires on the wrapper div, so it triggers on both the toggle button click and any click within the child area. Consumers should typically use `onClick` only on leaf nodes.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const triggers = await canvas.findAllByRole("button");
    await userEvent.click(triggers[0]);
    await expect(await canvas.findByText("Clicked: project")).toBeInTheDocument();
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
            onClick={() => setClicked("project")}
          >
            <TreeItem value="src" label="src" icon={IconFolder}>
              <TreeItem value="index" label="index.ts" icon={IconFile} />
            </TreeItem>
          </TreeItem>
        </Tree>
        {clicked && <div className="text-sm text-muted-foreground">Clicked: {clicked}</div>}
      </div>
    );
  },
};

/**
 * Dynamic add/remove of tree items at runtime.
 * Verifies that status bubbling cleans up correctly when items are removed.
 */
export const DynamicItems: Story = {
  parameters: {
    order: 19,
    docs: {
      description: {
        story:
          "Items can be added and removed at runtime. When a child with a status is removed, the parent's derived status updates automatically via `unregisterChildStatus`. Add items with the button, then remove them to see the parent badge disappear.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    let leaves = canvasElement.querySelectorAll('[data-slot="tree-item-leaf"]');
    await expect(leaves.length).toBe(1);
    const parent = canvasElement.querySelector('[data-value="sensors"]');
    await expect(parent).not.toHaveAttribute("data-status");

    const addButton = await canvas.findByRole("button", { name: "Add sensor" });
    await userEvent.click(addButton);

    leaves = canvasElement.querySelectorAll('[data-slot="tree-item-leaf"]');
    await expect(leaves.length).toBe(2);
    await expect(parent).toHaveAttribute("data-status", "warning");

    const removeButton = await canvas.findByRole("button", { name: "Remove" });
    await userEvent.click(removeButton);

    leaves = canvasElement.querySelectorAll('[data-slot="tree-item-leaf"]');
    await expect(leaves.length).toBe(1);
    await expect(parent).not.toHaveAttribute("data-status");
  },
  render: function DynamicItemsStory() {
    const [items, setItems] = useState<{ value: string; label: string; status?: "warning" }[]>([]);

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
                status: "warning",
              },
            ])
          }
        >
          Add sensor
        </button>
        <Tree defaultExpanded={["sensors"]} className="w-88">
          <TreeItem value="sensors" label="Sensor array">
            <TreeItem value="stable" label="Stable sensor" />
            {items.map((item) => (
              <TreeItem
                key={item.value}
                value={item.value}
                label={`${item.label} - click to remove`}
                status={item.status}
                onClick={() => setItems((prev) => prev.filter((i) => i.value !== item.value))}
              />
            ))}
          </TreeItem>
        </Tree>
      </div>
    );
  },
};
