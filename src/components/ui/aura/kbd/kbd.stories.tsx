import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import { IconArrowDown, IconArrowUp, IconCommand } from "@tabler/icons-react";
import { Kbd, KbdGroup } from "./kbd";

const meta: Meta<typeof Kbd> = {
  title: "Primitives/Kbd",
  component: Kbd,
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "Keyboard key content",
      table: {
        category: "Content",
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
  },
};

export default meta;
type Story = StoryObj<typeof Kbd>;

/**
 * Default keyboard key.
 */
export const Default: Story = {
  render: () => <Kbd>K</Kbd>,
  parameters: {
    order: 1,
    docs: {
      description: {
        story: "Default keyboard key styling.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const kbd = canvas.getByText("K");
    await expect(kbd).toBeInTheDocument();
  },
};

/**
 * Common keyboard shortcuts.
 */
export const CommonShortcuts: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground w-24">Copy:</span>
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>C</Kbd>
        </KbdGroup>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground w-24">Paste:</span>
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>V</Kbd>
        </KbdGroup>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground w-24">Save:</span>
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>S</Kbd>
        </KbdGroup>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground w-24">Undo:</span>
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>Z</Kbd>
        </KbdGroup>
      </div>
    </div>
  ),
  parameters: {
    order: 2,
    docs: {
      description: {
        story: "Common keyboard shortcuts using KbdGroup.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify all kbd groups render
    const kbdGroups = canvasElement.querySelectorAll('[data-slot="kbd-group"]');
    await expect(kbdGroups.length).toBe(4);

    // Verify unique keyboard keys render (⌘ appears multiple times, so we check the unique ones)
    await expect(canvas.getByText("C")).toBeInTheDocument();
    await expect(canvas.getByText("V")).toBeInTheDocument();
    await expect(canvas.getByText("S")).toBeInTheDocument();
    await expect(canvas.getByText("Z")).toBeInTheDocument();

    // Verify all ⌘ keys are present (should be 4)
    const commandKeys = canvas.getAllByText("⌘");
    await expect(commandKeys.length).toBe(4);

    // Verify labels
    await expect(canvas.getByText("Copy:")).toBeInTheDocument();
    await expect(canvas.getByText("Paste:")).toBeInTheDocument();
    await expect(canvas.getByText("Save:")).toBeInTheDocument();
    await expect(canvas.getByText("Undo:")).toBeInTheDocument();
  },
};

/**
 * Single keys.
 */
export const SingleKeys: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Kbd>⌘</Kbd>
      <Kbd>⌥</Kbd>
      <Kbd>⇧</Kbd>
      <Kbd>⌃</Kbd>
      <Kbd>↵</Kbd>
      <Kbd>⇥</Kbd>
      <Kbd>⌫</Kbd>
      <Kbd>⎋</Kbd>
    </div>
  ),
  parameters: {
    order: 3,
    docs: {
      description: {
        story: "Common modifier and special keys.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify all 8 kbd elements render
    const kbdElements = canvasElement.querySelectorAll('[data-slot="kbd"]');
    await expect(kbdElements.length).toBe(8);

    // Verify specific keys are present
    await expect(canvas.getByText("⌘")).toBeInTheDocument();
    await expect(canvas.getByText("⌥")).toBeInTheDocument();
    await expect(canvas.getByText("⇧")).toBeInTheDocument();
    await expect(canvas.getByText("⌃")).toBeInTheDocument();
    await expect(canvas.getByText("↵")).toBeInTheDocument();
    await expect(canvas.getByText("⇥")).toBeInTheDocument();
    await expect(canvas.getByText("⌫")).toBeInTheDocument();
    await expect(canvas.getByText("⎋")).toBeInTheDocument();

    // Verify correct styling
    kbdElements.forEach((kbd) => {
      expect(kbd).toHaveClass("bg-muted");
      expect(kbd).toHaveClass("text-muted-foreground");
    });
  },
};

/**
 * With icons.
 */
export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground w-32">Command palette:</span>
        <KbdGroup>
          <Kbd>
            <IconCommand className="size-3" />
          </Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground w-32">Navigate up:</span>
        <Kbd>
          <IconArrowUp className="size-3" />
        </Kbd>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground w-32">Navigate down:</span>
        <Kbd>
          <IconArrowDown className="size-3" />
        </Kbd>
      </div>
    </div>
  ),
  parameters: {
    order: 4,
    docs: {
      description: {
        story: "Keyboard keys with icons.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify labels
    await expect(canvas.getByText("Command palette:")).toBeInTheDocument();
    await expect(canvas.getByText("Navigate up:")).toBeInTheDocument();
    await expect(canvas.getByText("Navigate down:")).toBeInTheDocument();

    // Verify kbd elements
    await expect(canvas.getByText("K")).toBeInTheDocument();

    // Verify icons are present
    const icons = canvasElement.querySelectorAll("svg");
    await expect(icons.length).toBeGreaterThanOrEqual(3);

    // Verify kbd-group
    const kbdGroup = canvasElement.querySelector('[data-slot="kbd-group"]');
    await expect(kbdGroup).toBeInTheDocument();

    // Verify all kbd elements
    const kbdElements = canvasElement.querySelectorAll('[data-slot="kbd"]');
    await expect(kbdElements.length).toBe(4); // IconCommand, K, IconArrowUp, IconArrowDown
  },
};

/**
 * Multi-key combinations.
 */
export const MultiKeyCombinations: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground w-32">Select all:</span>
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>A</Kbd>
        </KbdGroup>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground w-32">Force quit:</span>
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>⌥</Kbd>
          <Kbd>⎋</Kbd>
        </KbdGroup>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground w-32">Screenshot:</span>
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>⇧</Kbd>
          <Kbd>4</Kbd>
        </KbdGroup>
      </div>
    </div>
  ),
  parameters: {
    order: 5,
    docs: {
      description: {
        story: "Complex multi-key combinations.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify labels
    await expect(canvas.getByText("Select all:")).toBeInTheDocument();
    await expect(canvas.getByText("Force quit:")).toBeInTheDocument();
    await expect(canvas.getByText("Screenshot:")).toBeInTheDocument();

    // Verify all kbd groups
    const kbdGroups = canvasElement.querySelectorAll('[data-slot="kbd-group"]');
    await expect(kbdGroups.length).toBe(3);

    // Verify specific keys
    await expect(canvas.getByText("A")).toBeInTheDocument();
    await expect(canvas.getByText("4")).toBeInTheDocument();

    // Verify correct number of kbd elements (2 + 3 + 3 = 8 total)
    const kbdElements = canvasElement.querySelectorAll('[data-slot="kbd"]');
    await expect(kbdElements.length).toBe(8);
  },
};

/**
 * In context (with text).
 */
export const InContext: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <p className="text-sm">
        Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to open the command palette.
      </p>
      <p className="text-sm">
        Use <Kbd>↵</Kbd> to confirm or <Kbd>⎋</Kbd> to cancel.
      </p>
      <p className="text-sm">
        Navigate with <Kbd>↑</Kbd> and <Kbd>↓</Kbd> arrow keys.
      </p>
    </div>
  ),
  parameters: {
    order: 6,
    docs: {
      description: {
        story: "Keyboard keys used inline with text.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify text content
    await expect(canvas.getByText(/Press/)).toBeInTheDocument();
    await expect(canvas.getByText(/to open the command palette/)).toBeInTheDocument();
    await expect(canvas.getByText(/Use/)).toBeInTheDocument();
    await expect(canvas.getByText(/to confirm or/)).toBeInTheDocument();
    await expect(canvas.getByText(/to cancel/)).toBeInTheDocument();
    await expect(canvas.getByText(/Navigate with/)).toBeInTheDocument();
    await expect(canvas.getByText(/arrow keys/)).toBeInTheDocument();

    // Verify kbd elements (⌘, K, ↵, ⎋, ↑, ↓ = 6 total)
    const kbdElements = canvasElement.querySelectorAll('[data-slot="kbd"]');
    await expect(kbdElements.length).toBe(6);

    // Verify specific keys
    await expect(canvas.getByText("K")).toBeInTheDocument();
    await expect(canvas.getByText("↵")).toBeInTheDocument();
    await expect(canvas.getByText("⎋")).toBeInTheDocument();
    await expect(canvas.getByText("↑")).toBeInTheDocument();
    await expect(canvas.getByText("↓")).toBeInTheDocument();
  },
};

/**
 * Shortcut list.
 */
export const ShortcutList: Story = {
  render: () => (
    <div className="w-75 rounded-lg border">
      <div className="p-3 border-b">
        <h3 className="font-medium text-sm">Keyboard Shortcuts</h3>
      </div>
      <div className="p-2 space-y-1">
        <div className="flex items-center justify-between px-2 py-1.5 rounded hover:bg-accent text-sm">
          <span>New file</span>
          <KbdGroup>
            <Kbd>⌘</Kbd>
            <Kbd>N</Kbd>
          </KbdGroup>
        </div>
        <div className="flex items-center justify-between px-2 py-1.5 rounded hover:bg-accent text-sm">
          <span>Open file</span>
          <KbdGroup>
            <Kbd>⌘</Kbd>
            <Kbd>O</Kbd>
          </KbdGroup>
        </div>
        <div className="flex items-center justify-between px-2 py-1.5 rounded hover:bg-accent text-sm">
          <span>Save file</span>
          <KbdGroup>
            <Kbd>⌘</Kbd>
            <Kbd>S</Kbd>
          </KbdGroup>
        </div>
        <div className="flex items-center justify-between px-2 py-1.5 rounded hover:bg-accent text-sm">
          <span>Close file</span>
          <KbdGroup>
            <Kbd>⌘</Kbd>
            <Kbd>W</Kbd>
          </KbdGroup>
        </div>
      </div>
    </div>
  ),
  parameters: {
    order: 7,
    docs: {
      description: {
        story: "Keyboard shortcuts displayed in a list format.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify header
    await expect(canvas.getByText("Keyboard Shortcuts")).toBeInTheDocument();

    // Verify all shortcut labels
    await expect(canvas.getByText("New file")).toBeInTheDocument();
    await expect(canvas.getByText("Open file")).toBeInTheDocument();
    await expect(canvas.getByText("Save file")).toBeInTheDocument();
    await expect(canvas.getByText("Close file")).toBeInTheDocument();

    // Verify all kbd groups (4 total)
    const kbdGroups = canvasElement.querySelectorAll('[data-slot="kbd-group"]');
    await expect(kbdGroups.length).toBe(4);

    // Verify specific keys
    await expect(canvas.getByText("N")).toBeInTheDocument();
    await expect(canvas.getByText("O")).toBeInTheDocument();
    await expect(canvas.getByText("S")).toBeInTheDocument();
    await expect(canvas.getByText("W")).toBeInTheDocument();

    // Verify correct number of kbd elements (2 keys per shortcut × 4 = 8)
    const kbdElements = canvasElement.querySelectorAll('[data-slot="kbd"]');
    await expect(kbdElements.length).toBe(8);
  },
};

/**
 * Function keys.
 */
export const FunctionKeys: Story = {
  render: () => (
    <div className="flex items-center gap-2 flex-wrap">
      <Kbd>F1</Kbd>
      <Kbd>F2</Kbd>
      <Kbd>F3</Kbd>
      <Kbd>F4</Kbd>
      <Kbd>F5</Kbd>
      <Kbd>F6</Kbd>
      <Kbd>F7</Kbd>
      <Kbd>F8</Kbd>
      <Kbd>F9</Kbd>
      <Kbd>F10</Kbd>
      <Kbd>F11</Kbd>
      <Kbd>F12</Kbd>
    </div>
  ),
  parameters: {
    order: 8,
    docs: {
      description: {
        story: "Function keys (F1-F12).",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify all 12 function keys
    const kbdElements = canvasElement.querySelectorAll('[data-slot="kbd"]');
    await expect(kbdElements.length).toBe(12);

    // Verify each function key is present
    await expect(canvas.getByText("F1")).toBeInTheDocument();
    await expect(canvas.getByText("F2")).toBeInTheDocument();
    await expect(canvas.getByText("F3")).toBeInTheDocument();
    await expect(canvas.getByText("F4")).toBeInTheDocument();
    await expect(canvas.getByText("F5")).toBeInTheDocument();
    await expect(canvas.getByText("F6")).toBeInTheDocument();
    await expect(canvas.getByText("F7")).toBeInTheDocument();
    await expect(canvas.getByText("F8")).toBeInTheDocument();
    await expect(canvas.getByText("F9")).toBeInTheDocument();
    await expect(canvas.getByText("F10")).toBeInTheDocument();
    await expect(canvas.getByText("F11")).toBeInTheDocument();
    await expect(canvas.getByText("F12")).toBeInTheDocument();
  },
};

/**
 * Visual regression testing.
 */
export const VisualRegression: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      {/* Single keys */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Single Keys</h3>
        <div className="flex gap-2">
          <Kbd>A</Kbd>
          <Kbd>⌘</Kbd>
          <Kbd>↵</Kbd>
          <Kbd>⎋</Kbd>
        </div>
      </div>

      {/* Key groups */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Key Groups</h3>
        <div className="flex gap-4">
          <KbdGroup>
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
          <KbdGroup>
            <Kbd>⌘</Kbd>
            <Kbd>⇧</Kbd>
            <Kbd>P</Kbd>
          </KbdGroup>
        </div>
      </div>

      {/* With icons */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">With Icons</h3>
        <div className="flex gap-2">
          <Kbd>
            <IconCommand className="size-3" />
          </Kbd>
          <Kbd>
            <IconArrowUp className="size-3" />
          </Kbd>
        </div>
      </div>

      {/* Inline */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Inline Usage</h3>
        <p className="text-sm">
          Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to search
        </p>
      </div>
    </div>
  ),
  parameters: {
    order: 9,
    docs: {
      description: {
        story: "Comprehensive visual overview for regression testing.",
      },
    },
    chromatic: {
      disableSnapshot: false,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify section headers
    await expect(canvas.getByText("Single Keys")).toBeInTheDocument();
    await expect(canvas.getByText("Key Groups")).toBeInTheDocument();
    await expect(canvas.getByText("With Icons")).toBeInTheDocument();
    await expect(canvas.getByText("Inline Usage")).toBeInTheDocument();

    // Verify single keys section (unique keys in this section)
    await expect(canvas.getByText("A")).toBeInTheDocument();
    await expect(canvas.getByText("↵")).toBeInTheDocument();
    await expect(canvas.getByText("⎋")).toBeInTheDocument();

    // Verify key groups (K appears twice - in Key Groups and Inline Usage)
    const kbdGroups = canvasElement.querySelectorAll('[data-slot="kbd-group"]');
    await expect(kbdGroups.length).toBe(2);

    // K appears twice, so use getAllByText
    const kKeys = canvas.getAllByText("K");
    await expect(kKeys.length).toBe(2);

    await expect(canvas.getByText("P")).toBeInTheDocument();

    // Verify icons are present
    const icons = canvasElement.querySelectorAll("svg");
    await expect(icons.length).toBeGreaterThanOrEqual(2);

    // Verify inline usage text
    await expect(canvas.getByText(/Press/)).toBeInTheDocument();
    await expect(canvas.getByText(/to search/)).toBeInTheDocument();

    // Verify all kbd elements
    const kbdElements = canvasElement.querySelectorAll('[data-slot="kbd"]');
    await expect(kbdElements.length).toBeGreaterThanOrEqual(10);
  },
};

/**
 * Interactive playground.
 */
export const Playground: Story = {
  args: {
    children: "⌘",
  },
  render: (args) => <Kbd {...args} />,
  parameters: {
    order: 99,
    docs: {
      description: {
        story: "Interactive playground - use controls to experiment with kbd props.",
      },
    },
  },
};
