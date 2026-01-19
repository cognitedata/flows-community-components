import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from '@storybook/test';
import { Kbd, KbdGroup } from './kbd';
import { IconCommand, IconArrowUp, IconArrowDown } from '@tabler/icons-react';

const meta: Meta<typeof Kbd> = {
  title: 'Primitives/Kbd',
  component: Kbd,
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Keyboard key content',
      table: {
        category: 'Content',
      },
    },
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
};

export default meta;
type Story = StoryObj<typeof Kbd>;

/**
 * Default keyboard key.
 */
export const Default: Story = {
  render: () => <Kbd>K</Kbd>,
  parameters: {
    docs: {
      description: {
        story: 'Default keyboard key styling.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const kbd = canvas.getByText('K');
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
    docs: {
      description: {
        story: 'Common keyboard shortcuts using KbdGroup.',
      },
    },
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
    docs: {
      description: {
        story: 'Common modifier and special keys.',
      },
    },
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
          <Kbd><IconCommand className="size-3" /></Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground w-32">Navigate up:</span>
        <Kbd><IconArrowUp className="size-3" /></Kbd>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground w-32">Navigate down:</span>
        <Kbd><IconArrowDown className="size-3" /></Kbd>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Keyboard keys with icons.',
      },
    },
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
    docs: {
      description: {
        story: 'Complex multi-key combinations.',
      },
    },
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
    docs: {
      description: {
        story: 'Keyboard keys used inline with text.',
      },
    },
  },
};

/**
 * Shortcut list.
 */
export const ShortcutList: Story = {
  render: () => (
    <div className="w-[300px] rounded-lg border">
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
    docs: {
      description: {
        story: 'Keyboard shortcuts displayed in a list format.',
      },
    },
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
    docs: {
      description: {
        story: 'Function keys (F1-F12).',
      },
    },
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
          <Kbd><IconCommand className="size-3" /></Kbd>
          <Kbd><IconArrowUp className="size-3" /></Kbd>
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
    docs: {
      description: {
        story: 'Comprehensive visual overview for regression testing.',
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
    children: '⌘',
  },
  render: (args) => <Kbd {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground - use controls to experiment with kbd props.',
      },
    },
  },
};
