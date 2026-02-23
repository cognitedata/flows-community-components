import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  IconActivity,
  IconChartLine,
  IconGauge,
  IconHistory,
} from '@tabler/icons-react';
import { useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

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

const getOpenSelectContent = () => within(document.body).queryByRole("listbox");

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
  title: 'AI/Suggestion',
  component: Suggestion,
  tags: ['autodocs', 'ai-elements'],
  decorators: [
    (Story) => (
      <div className="p-8">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    suggestion: {
      control: 'text',
      table: {
        category: 'Button Mode',
        type: {
          summary: 'string',
        },
      },
    },
    onClick: {
      action: 'clicked',
      table: {
        category: 'Button Mode',
        type: {
          summary: '(suggestion: string) => void',
        },
      },
    },
    variant: {
      control: 'select',
      options: ['ghost', 'outline'],
      table: {
        category: 'Button Mode',
        type: {
          summary: 'ghost | outline',
        },
        defaultValue: {
          summary: 'ghost',
        },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'icon'],
      table: {
        category: 'Button Mode',
        type: {
          summary: 'sm | default | lg | icon',
        },
        defaultValue: {
          summary: 'sm',
        },
      },
    },
    onValueChange: {
      action: 'value-changed',
      table: {
        category: 'Select Mode',
        type: {
          summary: '(value: string) => void',
        },
      },
    },
    className: {
      control: 'text',
      table: {
        category: 'Display',
      },
    },
  },
  parameters: {
    layout: 'centered',
    actions: {
      handles: ['click', 'value-changed'],
    },
  },
};
export default meta;
type Story = StoryObj<typeof Suggestion>;
export const Basic: Story = {
  parameters: {
    order: 1,
    docs: {
      description: {
        story:
          "Basic button-style suggestions for quick queries. Tests clicking suggestions and onClick callback.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const suggestion1 = canvas.getByRole("button", {
      name: /Suggestion 1/i,
    });
    await expect(suggestion1).toBeInTheDocument();
    await userEvent.click(suggestion1);
    const suggestion2 = canvas.getByRole("button", {
      name: /Suggestion 2/i,
    });
    await expect(suggestion2).toBeInTheDocument();
  },
  render: function SuggestionBasicStory(args) {
    const handleSuggestion = (value: string) => {
      args.onClick?.(value);
    };
    return (
      <div className="flex flex-wrap gap-2 max-w-[80%]">
        <Suggestion suggestion="Suggestion 1" onClick={handleSuggestion} />
        <Suggestion suggestion="Suggestion 2" onClick={handleSuggestion} />
        <Suggestion suggestion="Suggestion 3" onClick={handleSuggestion} />
      </div>
    );
  },
};
export const WithScrollableWrapper: Story = {
  parameters: {
    order: 2,
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
      <Suggestions className="w-full max-w-xl">
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
  parameters: {
    order: 3,
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
        <Suggestion
          suggestion="Outline variant"
          variant="outline"
          onClick={handleSuggestion}
        />
      </div>
    );
  },
};
export const SelectMode: Story = {
  parameters: {
    order: 4,
    docs: {
      description: {
        story:
          "Dropdown-style suggestions with multiple query options. Tests opening dropdown and selecting items.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("combobox");
    await expect(trigger).toBeInTheDocument();
    await userEvent.click(trigger);
    await waitForSelectContentOpen();
    await expect(
      within(document.body).getByText("Prioritize critical equipment in resource allocation")
    ).toBeInTheDocument();
    const item = within(document.body).getByText(
      "Prioritize critical equipment in resource allocation"
    );
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
  parameters: {
    order: 5,
    docs: {
      description: {
        story:
          "Tests keyboard navigation: Arrow keys to navigate, Enter to select, Escape to close.",
      },
    },
  },
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
          <SuggestionItem icon={<IconGauge className="size-4" />}>
            First option
          </SuggestionItem>
          <SuggestionItem icon={<IconActivity className="size-4" />}>
            Second option
          </SuggestionItem>
          <SuggestionItem icon={<IconChartLine className="size-4" />}>
            Third option
          </SuggestionItem>
        </SuggestionContent>
      </Suggestion>
    );
  },
};
export const Grouped: Story = {
  parameters: {
    order: 6,
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
export const InteractiveSelect: Story = {
  parameters: {
    order: 7,
    docs: {
      description: {
        story:
          "Select mode suggestion with state management to show selected value. Tests selecting an item and verifying the UI updates.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("combobox");
    await expect(trigger).toBeInTheDocument();
    expect(canvas.queryByText(/Last selected:/)).not.toBeInTheDocument();
    await userEvent.click(trigger);
    await waitForSelectContentOpen();
    const item = within(document.body).getByText("What's the status of pump 3?");
    await userEvent.click(item);
    await waitFor(
      () => {
        const selectionText = canvas.getByText(
          /Last selected: What's the status of pump 3\?/
        );
        expect(selectionText).toBeInTheDocument();
      },
      {
        timeout: 500,
      }
    );
  },
  render: function SuggestionInteractiveStory(args) {
    const [selectedValue, setSelectedValue] = useState<string>('');
    const handleSuggestion = (value: string) => {
      setSelectedValue(value);
      args.onValueChange?.(value);
    };
    return (
      <div className="space-y-4">
        <Suggestion onValueChange={handleSuggestion}>
          <SuggestionTrigger aria-label="Select a query">
            <SuggestionValue
              placeholder={
                selectedValue
                  ? `Selected: ${selectedValue}`
                  : 'Select a query...'
              }
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
          <p className="text-sm text-muted-foreground">
            Last selected: {selectedValue}
          </p>
        )}
      </div>
    );
  },
};
export const MultipleSelects: Story = {
  parameters: {
    order: 8,
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
export const MixedModes: Story = {
  parameters: {
    order: 9,
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

/**
 * Follow-up prompts in card-style buttons
 */
export const FollowUpCards: Story = {
  parameters: {
    order: 10,
    docs: {
      description: {
        story: "Card-style follow-up prompts with title and multiline prompt text.",
      },
    },
  },
  render: function SuggestionFollowUpCardsStory(args) {
    const handleSuggestion = (value: string) => {
      args.onClick?.(value);
    };

    return (
      <Suggestions className="w-max gap-2">
        <Suggestion
          className="w-52 items-start justify-start rounded-lg bg-muted p-4 text-left hover:bg-muted"
          suggestion="Prioritize critical equipment in resource allocation"
          onClick={handleSuggestion}
          variant="ghost"
        >
          <span className="space-y-1">
            <span className="block text-xs font-medium leading-tigher text-muted-foreground">
              Follow up
            </span>
            <span className="block text-base leading-tightest leading-5 font-normal text-foreground whitespace-normal">
              Prioritize critical equipment in resource allocation
            </span>
          </span>
        </Suggestion>
        <Suggestion
          className="w-52 items-start justify-start rounded-lg bg-muted p-4 text-left hover:bg-muted"
          suggestion="Prioritize critical equipment in resource allocation"
          onClick={handleSuggestion}
          variant="ghost"
        >
          <span className="space-y-1">
            <span className="block text-xs font-medium leading-tigher text-muted-foreground">
              Follow up
            </span>
            <span className="block text-base leading-tightest leading-5 font-normal text-foreground whitespace-normal">
              Prioritize critical equipment in resource allocation
            </span>
          </span>
        </Suggestion>
        <Suggestion
          className="w-52 items-start justify-start rounded-lg bg-muted p-4 text-left hover:bg-muted"
          suggestion="Prioritize critical equipment in resource allocation"
          onClick={handleSuggestion}
          variant="ghost"
        >
          <span className="space-y-1">
            <span className="block text-xs font-medium leading-tigher text-muted-foreground">
              Follow up
            </span>
            <span className="block text-base leading-tightest leading-5 font-normal text-foreground whitespace-normal">
              Prioritize critical equipment in resource allocation
            </span>
          </span>
        </Suggestion>
      </Suggestions>
    );
  },
};
/**
 * AI prompt suggestion dropdown
 */
export const AISuggestionMode: Story = {
  parameters: {
    order: 11,
    docs: {
      description: {
        story: "Compact AI prompt trigger with dropdown follow-up suggestions.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("combobox");
    await expect(trigger).toBeInTheDocument();
    await userEvent.click(trigger);
    await waitForSelectContentOpen();
    await expect(
      within(document.body).getByText(/prioritize critical equipment in resource allocation/i)
    ).toBeInTheDocument();
    const item = within(document.body).getByText(
      /prioritize critical equipment in resource allocation/i
    );
    await userEvent.click(item);
    await waitForSelectContentClosed();
  },
  render: function AISuggestionModeStory(args) {
    const handleSuggestion = (value: string) => {
      args.onValueChange?.(value);
    };

    return (
      <Suggestion onValueChange={handleSuggestion}>
        <SuggestionTrigger aria-label="Select a suggestion">
          <SuggestionValue placeholder="AI prompt suggestion 1" />
        </SuggestionTrigger>
        <SuggestionContent>
          <SuggestionItem icon={<IconGauge className="size-4" />}>
            Prioritize critical equipment in resource allocation
          </SuggestionItem>
          <SuggestionItem icon={<IconActivity className="size-4" />}>
            Break down tasks by production line and urgency
          </SuggestionItem>
          <SuggestionItem icon={<IconChartLine className="size-4" />}>
            Create a timeline for the top three risk areas
          </SuggestionItem>
        </SuggestionContent>
      </Suggestion>
    );
  },
};
