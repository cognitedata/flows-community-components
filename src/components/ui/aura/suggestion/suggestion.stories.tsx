import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { IconActivity, IconChartLine, IconGauge, IconHistory } from "@tabler/icons-react";
import { useState } from "react";
import {
  Suggestion,
  SuggestionContent,
  SuggestionGroup,
  SuggestionItem,
  SuggestionLabel,
  SuggestionSeparator,
  SuggestionTrigger,
  SuggestionValue,
  Suggestions,
} from "./suggestion";

const waitForSelectContentOpen = async () => {
  await waitFor(
    () => {
      const content = document.querySelector('[data-slot="select-content"]');
      expect(content).toBeInTheDocument();
      expect(content).toHaveAttribute("data-open");
    },
    { timeout: 1000 }
  );
};

const waitForSelectContentClosed = async () => {
  await waitFor(
    () => {
      const content = document.querySelector('[data-slot="select-content"]');
      if (!content) {
        expect(content).not.toBeInTheDocument();
        return;
      }
      expect(content).toHaveAttribute("data-closed");
    },
    { timeout: 1000 }
  );
};

const meta: Meta<typeof Suggestion> = {
  title: "AI/Suggestion",
  component: Suggestion,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="p-8">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    // Button mode props
    suggestion: {
      control: "text",
      description: "Suggestion text for button mode",
      table: {
        category: "Button Mode",
        type: { summary: "string" },
      },
    },
    onClick: {
      action: "clicked",
      description: "Callback when suggestion button is clicked",
      table: {
        category: "Button Mode",
        type: { summary: "(suggestion: string) => void" },
      },
    },
    variant: {
      control: "select",
      options: ["ghost", "outline"],
      description:
        "Button variant (button mode only). Only ghost and outline are supported as Suggestions are designed to have light backgrounds with dark text.",
      table: {
        category: "Button Mode",
        type: {
          summary: "ghost | outline",
        },
        defaultValue: { summary: "ghost" },
      },
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg", "icon"],
      description: "Button size (button mode only)",
      table: {
        category: "Button Mode",
        type: { summary: "sm | default | lg | icon" },
        defaultValue: { summary: "sm" },
      },
    },

    // Select mode props
    onValueChange: {
      action: "value-changed",
      description: "Callback when suggestion value changes (select mode)",
      table: {
        category: "Select Mode",
        type: { summary: "(value: string) => void" },
      },
    },

    // Common props
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
    actions: {
      handles: ["click", "value-changed"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Suggestion>;

/**
 * Basic button-style suggestions
 * Matches the basic example from suggestion.examples.tsx
 */
export const Basic: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Basic button-style suggestions for quick queries. Tests clicking suggestions and onClick callback.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the first suggestion button
    const suggestion1 = canvas.getByRole("button", {
      name: /AI prompt suggestion 1/i,
    });
    await expect(suggestion1).toBeInTheDocument();

    // Click the suggestion
    await userEvent.click(suggestion1);

    // Verify other suggestions are present
    const suggestion2 = canvas.getByRole("button", {
      name: /AI prompt suggestion 2/i,
    });
    await expect(suggestion2).toBeInTheDocument();
  },
  render: function SuggestionBasicStory(args) {
    const handleSuggestion = (value: string) => {
      args.onClick?.(value);
    };

    return (
      <div className="flex flex-wrap gap-2 max-w-[80%]">
        <Suggestion suggestion="AI prompt suggestion 1" onClick={handleSuggestion} />
        <Suggestion suggestion="AI prompt suggestion 2" onClick={handleSuggestion} />
        <Suggestion suggestion="AI prompt suggestion 3" onClick={handleSuggestion} />
      </div>
    );
  },
};

/**
 * Suggestions with horizontal scrolling wrapper
 */
export const WithScrollableWrapper: Story = {
  parameters: {
    docs: {
      description: {
        story: "Multiple suggestions wrapped in Suggestions component for horizontal scrolling.",
      },
    },
  },
  render: function SuggestionScrollableStory(args) {
    const handleSuggestion = (value: string) => {
      args.onClick?.(value);
    };

    return (
      <Suggestions className="w-[500px]">
        <Suggestion suggestion="Suggestion 1" onClick={handleSuggestion} />
        <Suggestion suggestion="Suggestion 2" onClick={handleSuggestion} />
        <Suggestion suggestion="Suggestion 3" onClick={handleSuggestion} />
        <Suggestion suggestion="Suggestion 4" onClick={handleSuggestion} />
        <Suggestion suggestion="Suggestion 5" onClick={handleSuggestion} />
        <Suggestion suggestion="Suggestion 6" onClick={handleSuggestion} />
      </Suggestions>
    );
  },
};

/**
 * Button variants
 * Only ghost (default) and outline are supported. Other Button variants
 * (default, secondary, destructive) are not supported as Suggestions
 * are designed to have light backgrounds with dark text.
 */
export const ButtonVariants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Suggestion buttons with supported variants. Only ghost (default) and outline are available.",
      },
    },
  },
  render: function SuggestionVariantsStory(args) {
    const handleSuggestion = (value: string) => {
      args.onClick?.(value);
    };

    return (
      <div className="flex flex-wrap gap-2">
        <Suggestion
          suggestion="Ghost variant (default)"
          variant="ghost"
          onClick={handleSuggestion}
        />
        <Suggestion suggestion="Outline variant" variant="outline" onClick={handleSuggestion} />
      </div>
    );
  },
};

/**
 * Select mode with dropdown
 * Matches the select example from suggestion.examples.tsx
 */
export const SelectMode: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Dropdown-style suggestions with multiple query options. Tests opening dropdown and selecting items.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the trigger button
    const trigger = canvas.getByRole("combobox");
    await expect(trigger).toBeInTheDocument();

    // Click to open dropdown
    await userEvent.click(trigger);

    // Wait for dropdown to open and find an item
    await waitForSelectContentOpen();
    await expect(
      within(document.body).getByText("Show me the pressure on valve 10")
    ).toBeInTheDocument();

    // Click the item to select it
    const item = within(document.body).getByText("Show me the pressure on valve 10");
    await userEvent.click(item);

    // Dropdown should close automatically after selection
    await waitForSelectContentClosed();
  },
  render: function SuggestionSelectStory(args) {
    const handleSuggestion = (value: string) => {
      args.onValueChange?.(value);
    };

    return (
      <Suggestion onValueChange={handleSuggestion}>
        <SuggestionTrigger aria-label="Select a suggestion">
          <SuggestionValue placeholder="AI prompt suggestion 2" />
        </SuggestionTrigger>
        <SuggestionContent>
          <SuggestionItem icon={<IconGauge className="size-4" />}>
            Show me the pressure on valve 10
          </SuggestionItem>
          <SuggestionItem icon={<IconActivity className="size-4" />}>
            What&apos;s the status of pump 3?
          </SuggestionItem>
          <SuggestionItem icon={<IconChartLine className="size-4" />}>
            Display temperature trends for zone A
          </SuggestionItem>
        </SuggestionContent>
      </Suggestion>
    );
  },
};

/**
 * Tests keyboard interactions for select mode
 */
export const KeyboardInteractions: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Tests keyboard navigation: Arrow keys to navigate, Enter to select, Escape to close.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find and focus the trigger
    const trigger = canvas.getByRole("combobox");
    await expect(trigger).toBeInTheDocument();
    trigger.focus();

    // Open dropdown with Enter key
    await userEvent.keyboard("{Enter}");

    // Wait for dropdown to open
    await waitForSelectContentOpen();

    // Navigate down with arrow key
    await userEvent.keyboard("{ArrowDown}");

    // Select with Enter
    await userEvent.keyboard("{Enter}");

    // Dropdown should close
    await waitForSelectContentClosed();

    // Open again to test Escape
    await userEvent.keyboard("{Enter}");
    await waitForSelectContentOpen();

    // Close with Escape
    await userEvent.keyboard("{Escape}");
    await waitForSelectContentClosed();
  },
  render: function SuggestionKeyboardStory(args) {
    const handleSuggestion = (value: string) => {
      args.onValueChange?.(value);
    };

    return (
      <Suggestion onValueChange={handleSuggestion}>
        <SuggestionTrigger aria-label="Select a suggestion">
          <SuggestionValue placeholder="Use keyboard to navigate..." />
        </SuggestionTrigger>
        <SuggestionContent>
          <SuggestionItem icon={<IconGauge className="size-4" />}>First option</SuggestionItem>
          <SuggestionItem icon={<IconActivity className="size-4" />}>Second option</SuggestionItem>
          <SuggestionItem icon={<IconChartLine className="size-4" />}>Third option</SuggestionItem>
        </SuggestionContent>
      </Suggestion>
    );
  },
};

/**
 * Grouped suggestions with categories
 * Matches the grouped example from suggestion.examples.tsx
 */
export const Grouped: Story = {
  parameters: {
    docs: {
      description: {
        story: "Organised suggestions with categories, labels, and separators.",
      },
    },
  },
  render: function SuggestionGroupedStory(args) {
    const handleSuggestion = (value: string) => {
      args.onValueChange?.(value);
    };

    return (
      <Suggestion onValueChange={handleSuggestion}>
        <SuggestionTrigger aria-label="Select a suggestion">
          <SuggestionValue placeholder="AI prompt suggestion 3" />
        </SuggestionTrigger>
        <SuggestionContent>
          <SuggestionGroup>
            <SuggestionLabel>Equipment Status</SuggestionLabel>
            <SuggestionItem icon={<IconGauge className="size-4" />}>
              Show me the pressure on valve 10
            </SuggestionItem>
            <SuggestionItem icon={<IconActivity className="size-4" />}>
              What&apos;s the current status of pump 3?
            </SuggestionItem>
          </SuggestionGroup>

          <SuggestionSeparator />

          <SuggestionGroup>
            <SuggestionLabel>Historical Data</SuggestionLabel>
            <SuggestionItem icon={<IconChartLine className="size-4" />}>
              Display temperature trends for zone A
            </SuggestionItem>
            <SuggestionItem icon={<IconHistory className="size-4" />}>
              Show me yesterday&apos;s flow rates
            </SuggestionItem>
          </SuggestionGroup>
        </SuggestionContent>
      </Suggestion>
    );
  },
};

/**
 * Interactive select mode with state management
 */
export const InteractiveSelect: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Select mode suggestion with state management to show selected value. Tests selecting an item and verifying the UI updates.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the trigger button
    const trigger = canvas.getByRole("combobox");
    await expect(trigger).toBeInTheDocument();

    // Verify initial state - no selection message
    expect(canvas.queryByText(/Last selected:/)).not.toBeInTheDocument();

    // Click to open dropdown
    await userEvent.click(trigger);

    // Wait for dropdown to open
    await waitFor(
      () => {
        const item = within(document.body).getByText("What's the status of pump 3?");
        expect(item).toBeInTheDocument();
      },
      { timeout: 1000 }
    );

    // Select the second item
    const item = within(document.body).getByText("What's the status of pump 3?");
    await userEvent.click(item);

    // Verify the selection is displayed
    await waitFor(
      () => {
        const selectionText = canvas.getByText(/Last selected: What's the status of pump 3\?/);
        expect(selectionText).toBeInTheDocument();
      },
      { timeout: 500 }
    );
  },
  render: function SuggestionInteractiveStory(args) {
    const [selectedValue, setSelectedValue] = useState<string>("");

    const handleSuggestion = (value: string) => {
      setSelectedValue(value);
      args.onValueChange?.(value);
    };

    return (
      <div className="space-y-4">
        <Suggestion onValueChange={handleSuggestion}>
          <SuggestionTrigger aria-label="Select a query">
            <SuggestionValue
              placeholder={selectedValue ? `Selected: ${selectedValue}` : "Select a query..."}
            />
          </SuggestionTrigger>
          <SuggestionContent>
            <SuggestionItem icon={<IconGauge className="size-4" />}>
              Show me the pressure on valve 10
            </SuggestionItem>
            <SuggestionItem icon={<IconActivity className="size-4" />}>
              What&apos;s the status of pump 3?
            </SuggestionItem>
            <SuggestionItem icon={<IconChartLine className="size-4" />}>
              Display temperature trends for zone A
            </SuggestionItem>
          </SuggestionContent>
        </Suggestion>
        {selectedValue && (
          <p className="text-sm text-muted-foreground">Last selected: {selectedValue}</p>
        )}
      </div>
    );
  },
};

/**
 * Multiple select suggestions
 */
export const MultipleSelects: Story = {
  parameters: {
    docs: {
      description: {
        story: "Multiple select-mode suggestions displayed together.",
      },
    },
  },
  render: function SuggestionMultipleSelectsStory(args) {
    const handleSuggestion1 = (value: string) => {
      args.onValueChange?.(value);
    };

    const handleSuggestion2 = (value: string) => {
      args.onValueChange?.(value);
    };

    return (
      <div className="flex flex-col gap-4">
        <Suggestion onValueChange={handleSuggestion1}>
          <SuggestionTrigger aria-label="Select equipment query">
            <SuggestionValue placeholder="Select equipment query..." />
          </SuggestionTrigger>
          <SuggestionContent>
            <SuggestionItem icon={<IconGauge className="size-4" />}>
              Show me the pressure on valve 10
            </SuggestionItem>
            <SuggestionItem icon={<IconActivity className="size-4" />}>
              What&apos;s the status of pump 3?
            </SuggestionItem>
          </SuggestionContent>
        </Suggestion>

        <Suggestion onValueChange={handleSuggestion2}>
          <SuggestionTrigger aria-label="Select data query">
            <SuggestionValue placeholder="Select data query..." />
          </SuggestionTrigger>
          <SuggestionContent>
            <SuggestionItem icon={<IconChartLine className="size-4" />}>
              Display temperature trends for zone A
            </SuggestionItem>
            <SuggestionItem icon={<IconHistory className="size-4" />}>
              Show me yesterday&apos;s flow rates
            </SuggestionItem>
          </SuggestionContent>
        </Suggestion>
      </div>
    );
  },
};

/**
 * Mixed button and select suggestions
 */
export const MixedModes: Story = {
  parameters: {
    docs: {
      description: {
        story: "Combination of button-mode and select-mode suggestions in the same container.",
      },
    },
  },
  render: function SuggestionMixedStory(args) {
    const handleButtonClick = (value: string) => {
      args.onClick?.(value);
    };

    const handleSelectChange = (value: string) => {
      args.onValueChange?.(value);
    };

    return (
      <div className="flex flex-wrap items-center gap-2">
        <Suggestion suggestion="Quick action 1" onClick={handleButtonClick} />
        <Suggestion suggestion="Quick action 2" onClick={handleButtonClick} />
        <Suggestion onValueChange={handleSelectChange}>
          <SuggestionTrigger aria-label="More options">
            <SuggestionValue placeholder="More options..." />
          </SuggestionTrigger>
          <SuggestionContent>
            <SuggestionItem icon={<IconGauge className="size-4" />}>
              Show me the pressure on valve 10
            </SuggestionItem>
            <SuggestionItem icon={<IconActivity className="size-4" />}>
              What&apos;s the status of pump 3?
            </SuggestionItem>
          </SuggestionContent>
        </Suggestion>
      </div>
    );
  },
};
