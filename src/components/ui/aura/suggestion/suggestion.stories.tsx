import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";
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
const getOpenSelectContent = () =>
  document.querySelector('[data-slot="select-content"][data-open]') as HTMLElement | null;
const waitForSelectContentOpen = async () => {
  await waitFor(
    () => {
      const content = getOpenSelectContent();
      expect(content).toBeInTheDocument();
    },
    {
      timeout: 1000,
    }
  );
};
const waitForSelectContentClosed = async () => {
  await waitFor(
    () => {
      const content = getOpenSelectContent();
      expect(content).not.toBeInTheDocument();
    },
    {
      timeout: 1000,
    }
  );
};
const meta: Meta<typeof Suggestion> = {
  title: "AI/Suggestion",
  component: Suggestion,
  tags: ["autodocs", "ai-elements"],
  decorators: [
    (Story) => (
      <div className="p-8">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    suggestion: {
      control: "text",
      table: {
        category: "Button Mode",
        type: {
          summary: "string",
        },
      },
    },
    onClick: {
      action: "clicked",
      table: {
        category: "Button Mode",
        type: {
          summary: "(suggestion: string) => void",
        },
      },
    },
    variant: {
      control: "select",
      options: ["ghost", "outline"],
      table: {
        category: "Button Mode",
        type: {
          summary: "ghost | outline",
        },
        defaultValue: {
          summary: "ghost",
        },
      },
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg", "icon"],
      table: {
        category: "Button Mode",
        type: {
          summary: "sm | default | lg | icon",
        },
        defaultValue: {
          summary: "sm",
        },
      },
    },
    onValueChange: {
      action: "value-changed",
      table: {
        category: "Select Mode",
        type: {
          summary: "(value: string) => void",
        },
      },
    },
    className: {
      control: "text",
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
export const Basic: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const suggestion1 = canvas.getByRole("button", {
      name: /AI prompt suggestion 1/i,
    });
    await expect(suggestion1).toBeInTheDocument();
    await userEvent.click(suggestion1);
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
export const WithScrollableWrapper: Story = {
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
export const ButtonVariants: Story = {
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
export const SelectMode: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("combobox");
    await expect(trigger).toBeInTheDocument();
    await userEvent.click(trigger);
    await waitForSelectContentOpen();
    await expect(
      within(document.body).getByText("Show me the pressure on valve 10")
    ).toBeInTheDocument();
    const item = within(document.body).getByText("Show me the pressure on valve 10");
    await userEvent.click(item);
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
export const KeyboardInteractions: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("combobox");
    await expect(trigger).toBeInTheDocument();
    trigger.focus();
    await userEvent.click(trigger);
    await waitForSelectContentOpen();
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{Enter}");
    await waitForSelectContentClosed();
    await userEvent.click(trigger);
    await waitForSelectContentOpen();
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
export const Grouped: Story = {
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
export const InteractiveSelect: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("combobox");
    await expect(trigger).toBeInTheDocument();
    expect(canvas.queryByText(/Last selected:/)).not.toBeInTheDocument();
    await userEvent.click(trigger);
    await waitForSelectContentOpen();
    const content = getOpenSelectContent();
    expect(content).toBeInTheDocument();
    const item = within(content as HTMLElement).getByText("What's the status of pump 3?");
    await userEvent.click(item);
    await waitFor(
      () => {
        const selectionText = canvas.getByText(/Last selected: What's the status of pump 3\?/);
        expect(selectionText).toBeInTheDocument();
      },
      {
        timeout: 500,
      }
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
export const MultipleSelects: Story = {
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
export const MixedModes: Story = {
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
