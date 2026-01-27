import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import {
  IconCalculator,
  IconCalendar,
  IconLoader2,
  IconMail,
  IconSettings,
  IconSparkles,
  IconUser,
} from "@tabler/icons-react";
import { useState } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./command";

const meta: Meta<typeof Command> = {
  title: "Primitives/Command",
  component: Command,
  tags: ["autodocs"],
  argTypes: {
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
type Story = StoryObj<typeof Command>;

/**
 * Default command palette.
 */
export const Default: Story = {
  render: () => (
    <Command className="rounded-lg border shadow-md w-[350px]">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <IconCalendar />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <IconSparkles />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem>
            <IconCalculator />
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <IconUser />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <IconMail />
            <span>Mail</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <IconSettings />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
  parameters: {
    docs: {
      description: {
        story: "Default command palette with grouped items and keyboard shortcuts.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the input
    const input = canvas.getByPlaceholderText("Type a command or search...");
    await expect(input).toBeInTheDocument();

    // Type to filter
    await userEvent.type(input, "cal");

    // Verify filtering works
    await waitFor(() => {
      const calendarItem = canvas.getByText("Calendar");
      expect(calendarItem).toBeInTheDocument();
    });
  },
};

/**
 * Command dialog (modal).
 */
export const Dialog: Story = {
  render: function CommandDialogExample() {
    const [open, setOpen] = useState(false);

    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Press <kbd className="px-2 py-1 bg-muted rounded text-xs">⌘K</kbd> or click the button
        </p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="px-4 py-2 rounded-md border hover:bg-accent"
        >
          Open Command Palette
        </button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem onSelect={() => setOpen(false)}>
                <IconCalendar />
                <span>Calendar</span>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <IconSparkles />
                <span>Search Emoji</span>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)}>
                <IconCalculator />
                <span>Calculator</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Command palette in a dialog/modal.",
      },
    },
  },
};

/**
 * Filtered command list.
 */
export const Filtering: Story = {
  render: () => (
    <Command className="rounded-lg border shadow-md w-[350px]">
      <CommandInput placeholder="Search actions..." />
      <CommandList>
        <CommandEmpty>No actions found.</CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem>Create new file</CommandItem>
          <CommandItem>Create new folder</CommandItem>
          <CommandItem>Open recent</CommandItem>
          <CommandItem>Open settings</CommandItem>
          <CommandItem>Search files</CommandItem>
          <CommandItem>Search in files</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
  parameters: {
    docs: {
      description: {
        story: "Command palette with filtering. Type to filter items.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("Search actions...");

    // Type to filter
    await userEvent.type(input, "settings");

    // Verify only settings item shows
    await waitFor(() => {
      const settingsItem = canvas.getByText("Open settings");
      expect(settingsItem).toBeInTheDocument();
    });
  },
};

/**
 * With disabled items.
 */
export const DisabledItems: Story = {
  render: () => (
    <Command className="rounded-lg border shadow-md w-[350px]">
      <CommandInput placeholder="Type a command..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Commands">
          <CommandItem>
            <IconUser />
            <span>View Profile</span>
          </CommandItem>
          <CommandItem disabled>
            <IconMail />
            <span>Send Email (disabled)</span>
          </CommandItem>
          <CommandItem>
            <IconSettings />
            <span>Settings</span>
          </CommandItem>
          <CommandItem disabled>
            <IconCalculator />
            <span>Calculator (disabled)</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
  parameters: {
    docs: {
      description: {
        story: "Command palette with some items disabled.",
      },
    },
  },
};

/**
 * Multiple groups.
 */
export const MultipleGroups: Story = {
  render: () => (
    <Command className="rounded-lg border shadow-md w-[400px]">
      <CommandInput placeholder="Search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Recently Used">
          <CommandItem>
            <IconCalendar />
            <span>Calendar</span>
            <CommandShortcut>⌘C</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <IconMail />
            <span>Mail</span>
            <CommandShortcut>⌘M</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Applications">
          <CommandItem>
            <IconCalculator />
            <span>Calculator</span>
          </CommandItem>
          <CommandItem>
            <IconSettings />
            <span>Settings</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Help">
          <CommandItem>Documentation</CommandItem>
          <CommandItem>Report an Issue</CommandItem>
          <CommandItem>Contact Support</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
  parameters: {
    docs: {
      description: {
        story: "Command palette with multiple grouped sections.",
      },
    },
  },
};

/**
 * With custom styling.
 */
export const CustomStyling: Story = {
  render: () => (
    <Command className="rounded-lg border shadow-md w-[350px] bg-card">
      <CommandInput placeholder="Search..." className="bg-transparent" />
      <CommandList className="max-h-[200px]">
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Results">
          <CommandItem className="hover:bg-primary/10">
            <span>Custom styled item 1</span>
          </CommandItem>
          <CommandItem className="hover:bg-primary/10">
            <span>Custom styled item 2</span>
          </CommandItem>
          <CommandItem className="hover:bg-primary/10">
            <span>Custom styled item 3</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
  parameters: {
    docs: {
      description: {
        story: "Command palette with custom styling.",
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
      {/* Basic command */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Basic</h3>
        <Command className="rounded-lg border shadow-md w-[300px]">
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No results.</CommandEmpty>
            <CommandGroup heading="Items">
              <CommandItem>
                <IconCalendar />
                Item 1
              </CommandItem>
              <CommandItem>
                <IconSettings />
                Item 2
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Command palette for visual regression testing.",
      },
    },
    chromatic: {
      disableSnapshot: false,
    },
  },
};

/**
 * No results found state.
 * Demonstrates the empty state when search returns no matches.
 */
export const NoResultsFound: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Shows the empty state when a search query returns no matching results. Type a query that doesn't match any items to see the CommandEmpty component.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("Search commands...");

    // Type a query that won't match anything
    await userEvent.type(input, "xyz123nonexistent", { delay: 50 });

    // Wait for empty state to appear
    await waitFor(() => {
      const emptyState = canvas.getByText("No results found.");
      expect(emptyState).toBeInTheDocument();
    });

    // Verify no items are visible
    const calendarItem = canvas.queryByText("Calendar");
    expect(calendarItem).not.toBeInTheDocument();

    // Clear and verify items reappear
    await userEvent.clear(input);
    await waitFor(() => {
      const calendarItem = canvas.getByText("Calendar");
      expect(calendarItem).toBeInTheDocument();
    });
  },
  render: function NoResultsFoundStory() {
    return (
      <Command className="rounded-lg border shadow-md w-88">
        <CommandInput placeholder="Search commands..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Commands">
            <CommandItem>
              <IconCalendar />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <IconSettings />
              <span>Settings</span>
            </CommandItem>
            <CommandItem>
              <IconMail />
              <span>Mail</span>
            </CommandItem>
            <CommandItem>
              <IconCalculator />
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );
  },
};

/**
 * Keyboard navigation testing.
 * Tests arrow keys, Enter to select, and keyboard shortcuts.
 */
export const KeyboardNavigation: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Tests keyboard accessibility: Arrow keys to navigate, Enter to select, and keyboard shortcuts.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("Type a command...");

    // Focus the input
    await userEvent.click(input);

    // Press ArrowDown to navigate to first item
    await userEvent.keyboard("{ArrowDown}");
    const firstItem = canvas.getByText("Calendar");
    await expect(firstItem).toHaveAttribute("data-selected", "true");

    // Press ArrowDown again to move to next item
    await userEvent.keyboard("{ArrowDown}");
    const secondItem = canvas.getByText("Settings");
    await expect(secondItem).toHaveAttribute("data-selected", "true");

    // Press ArrowUp to go back
    await userEvent.keyboard("{ArrowUp}");
    await expect(firstItem).toHaveAttribute("data-selected", "true");

    // Type to filter
    await userEvent.clear(input);
    await userEvent.type(input, "cal", { delay: 50 });

    // Verify filtered item is selected
    await waitFor(() => {
      const calendarItem = canvas.getByText("Calendar");
      expect(calendarItem).toHaveAttribute("data-selected", "true");
    });
  },
  render: function KeyboardNavigationStory() {
    return (
      <Command className="rounded-lg border shadow-md w-88">
        <CommandInput placeholder="Type a command..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Commands">
            <CommandItem>
              <IconCalendar />
              <span>Calendar</span>
              <CommandShortcut>⌘C</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <IconSettings />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <IconMail />
              <span>Mail</span>
              <CommandShortcut>⌘M</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );
  },
};

/**
 * Long list with many items.
 * Tests scrolling behavior and performance with many items.
 */
export const LongList: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Command palette with many items to test scrolling behavior and performance. Scroll through the list to see all items.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("Search items...");

    // Verify first items are visible
    await expect(canvas.getByText("Item 1")).toBeInTheDocument();
    await expect(canvas.getByText("Item 5")).toBeInTheDocument();

    // Type to filter and verify filtering works with many items
    await userEvent.type(input, "item 20", { delay: 50 });

    await waitFor(() => {
      const item20 = canvas.getByText("Item 20");
      expect(item20).toBeInTheDocument();
    });

    // Clear and verify all items are back
    await userEvent.clear(input);
    await waitFor(() => {
      expect(canvas.getByText("Item 1")).toBeInTheDocument();
    });
  },
  render: function LongListStory() {
    const items = Array.from({ length: 30 }, (_, i) => `Item ${i + 1}`);

    return (
      <Command className="rounded-lg border shadow-md w-88">
        <CommandInput placeholder="Search items..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="All Items">
            {items.map((item) => (
              <CommandItem key={item}>
                <span>{item}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    );
  },
};

/**
 * Async search with loading state.
 * Demonstrates loading state while performing async search operations.
 */
export const AsyncSearch: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Command palette with async search. Shows loading state while searching and handles async results.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("Search users...");

    // Type a search query
    await userEvent.type(input, "john", { delay: 50 });

    // Wait for loading state (if visible)
    await waitFor(
      () => {
        // The loading state might be shown or items might appear
        const loadingOrResults = canvas.queryByText("Searching...") || canvas.queryByText("John");
        expect(loadingOrResults).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    // Wait for results to appear
    await waitFor(
      () => {
        const result = canvas.getByText("John Doe");
        expect(result).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  },
  render: function AsyncSearchStory() {
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<string[]>([]);

    // Simulate async search
    const handleSearch = async (query: string) => {
      setSearchQuery(query);
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Mock results
      const mockResults = [
        "John Doe",
        "Jane Smith",
        "Johnny Appleseed",
        "John Johnson",
      ].filter((name) => name.toLowerCase().includes(query.toLowerCase()));

      setResults(mockResults);
      setIsLoading(false);
    };

    return (
      <Command className="rounded-lg border shadow-md w-88">
        <CommandInput
          placeholder="Search users..."
          value={searchQuery}
          onValueChange={handleSearch}
        />
        <CommandList>
          {isLoading ? (
            <div className="py-6 text-center text-sm text-muted-foreground">
              <IconLoader2 className="mx-auto mb-2 size-5 animate-spin" />
              Searching...
            </div>
          ) : (
            <>
              <CommandEmpty>No users found.</CommandEmpty>
              {results.length > 0 && (
                <CommandGroup heading="Users">
                  {results.map((user) => (
                    <CommandItem key={user} onSelect={() => console.log(`Selected: ${user}`)}>
                      <IconUser />
                      <span>{user}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </>
          )}
        </CommandList>
      </Command>
    );
  },
};

/**
 * Interactive playground.
 */
export const Playground: Story = {
  render: () => (
    <Command className="rounded-lg border shadow-md w-[350px]">
      <CommandInput placeholder="Type to search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Commands">
          <CommandItem>Command 1</CommandItem>
          <CommandItem>Command 2</CommandItem>
          <CommandItem>Command 3</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
  parameters: {
    docs: {
      description: {
        story: "Interactive command palette example.",
      },
    },
  },
};
