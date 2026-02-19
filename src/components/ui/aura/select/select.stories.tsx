import { Button } from "@/components/ui/aura/button";
import { Label } from "@/components/ui/aura/label";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import {
  IconFile,
  IconFolder,
  IconHome,
  IconMail,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";
import { type ComponentProps, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./select";
const basicOptions = [
  {
    label: "Option 1",
    value: "option1",
  },
  {
    label: "Option 2",
    value: "option2",
  },
  {
    label: "Option 3",
    value: "option3",
  },
];
const shortOptions = [
  {
    label: "Option 1",
    value: "option1",
  },
  {
    label: "Option 2",
    value: "option2",
  },
];
const labeledOptions = [
  {
    label: "Asset",
    value: "asset",
  },
  {
    label: "Event",
    value: "event",
  },
  {
    label: "Time series",
    value: "timeseries",
  },
  {
    label: "Work order",
    value: "workorder",
  },
];
const iconOptions = [
  {
    label: "User",
    value: "user",
  },
  {
    label: "Mail",
    value: "mail",
  },
  {
    label: "Settings",
    value: "settings",
  },
  {
    label: "Home",
    value: "home",
  },
];
const documentOptions = [
  {
    label: "PDF",
    value: "pdf",
  },
  {
    label: "Word Document",
    value: "doc",
  },
  {
    label: "Excel Spreadsheet",
    value: "xls",
  },
];
const mediaOptions = [
  {
    label: "Image",
    value: "image",
  },
  {
    label: "Video",
    value: "video",
  },
  {
    label: "Audio",
    value: "audio",
  },
];
const defaultValueOptions = [
  {
    label: "First Option",
    value: "option1",
  },
  {
    label: "Second Option",
    value: "option2",
  },
  {
    label: "Third Option",
    value: "option3",
  },
];
const colorOptions = [
  {
    label: "Red",
    value: "red",
  },
  {
    label: "Green",
    value: "green",
  },
  {
    label: "Blue",
    value: "blue",
  },
];
const disabledOptions = [
  {
    label: "Available Option",
    value: "available1",
  },
  {
    label: "Unavailable Option",
    value: "disabled1",
    disabled: true,
  },
  {
    label: "Another Available",
    value: "available2",
  },
  {
    label: "Also Unavailable",
    value: "disabled2",
    disabled: true,
  },
];
const singleOption = [
  {
    label: "Option 1",
    value: "option1",
  },
];
const longTextOptions = [
  {
    label: "This is a very long option label that should wrap or truncate when space is limited",
    value: "option1",
  },
  {
    label: "Another extremely verbose option label demonstrating overflow behaviour in the list",
    value: "option2",
  },
  {
    label: "Short label",
    value: "option3",
  },
  {
    label: "Yet another long option label to force vertical scrolling inside the menu content area",
    value: "option4",
  },
];
const specialCharacterOptions = [
  {
    label: "🎉 Party time!",
    value: "emoji1",
  },
  {
    label: "🚀 Launch",
    value: "emoji2",
  },
  {
    label: "Option with <HTML> & 'quotes'",
    value: "special1",
  },
  {
    label: "C++ & C# & Java",
    value: "special2",
  },
  {
    label: "Ü니코드文字",
    value: "unicode",
  },
];
const languageOptions = [
  {
    label: "JavaScript",
    value: "javascript",
  },
  {
    label: "TypeScript",
    value: "typescript",
  },
  {
    label: "Python",
    value: "python",
  },
  {
    label: "Java",
    value: "java",
  },
  {
    label: "C#",
    value: "csharp",
  },
  {
    label: "PHP",
    value: "php",
  },
  {
    label: "C++",
    value: "cpp",
  },
  {
    label: "Rust",
    value: "rust",
  },
  {
    label: "Go",
    value: "go",
  },
  {
    label: "Swift",
    value: "swift",
  },
];
const meta: Meta<typeof Select> = {
  title: "Primitives/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: "boolean",
      table: {
        category: "Behavior",
        type: {
          summary: "boolean",
        },
      },
    },
    defaultOpen: {
      control: "boolean",
      table: {
        category: "Behavior",
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: "false",
        },
      },
    },
    value: {
      control: "text",
      table: {
        category: "Behavior",
        type: {
          summary: "string",
        },
      },
    },
    defaultValue: {
      control: "text",
      table: {
        category: "Behavior",
        type: {
          summary: "string",
        },
      },
    },
    disabled: {
      control: "boolean",
      table: {
        category: "Behavior",
        type: {
          summary: "boolean",
        },
        defaultValue: {
          summary: "false",
        },
      },
    },
    onValueChange: {
      action: "valueChange",
      table: {
        category: "Events",
        type: {
          summary: "(value: string) => void",
        },
      },
    },
    onOpenChange: {
      action: "openChange",
      table: {
        category: "Events",
        type: {
          summary: "(open: boolean) => void",
        },
      },
    },
  },
  parameters: {
    layout: "centered",
  },
};
export default meta;
type Story = StoryObj<typeof Select>;
export const Default: Story = {
  render: () => (
    <Select items={basicOptions}>
      <SelectTrigger className="w-50">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        {basicOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ),
  parameters: {
    order: 1,
  },
  play: async ({
    canvasElement,
  }: {
    canvasElement: HTMLElement;
  }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("combobox");
    await expect(trigger).toBeInTheDocument();
    await userEvent.click(trigger);
    await waitFor(() => {
      const content = document.querySelector('[data-slot="select-content"]');
      expect(content).toBeInTheDocument();
    });
  },
};
export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor="select-label">Choose an option</Label>
      <Select items={labeledOptions}>
        <SelectTrigger id="select-label" className="w-50">
          <SelectValue placeholder="Select..." />
        </SelectTrigger>
        <SelectContent>
          {labeledOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  ),
  parameters: {
    order: 2,
  },
};
export const WithIcons: Story = {
  render: function SelectWithIcons() {
    const [value, setValue] = useState("settings");
    const iconMap: Record<string, React.ReactNode> = {
      user: <IconUser className="size-4" />,
      mail: <IconMail className="size-4" />,
      settings: <IconSettings className="size-4" />,
      home: <IconHome className="size-4" />,
    };
    return (
      <div className="space-y-4">
        <Label>Category</Label>
        <Select items={iconOptions} value={value} onValueChange={setValue}>
          <SelectTrigger className="w-50">
            <SelectValue placeholder="Select..." icon={value ? iconMap[value] : undefined} />
          </SelectTrigger>
          <SelectContent>
            {iconOptions.map((option) => (
              <SelectItem key={option.value} value={option.value} icon={iconMap[option.value]}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground">Selected: {value}</p>
      </div>
    );
  },
  parameters: {
    order: 3,
  },
};
export const Disabled: Story = {
  render: () => (
    <Select items={shortOptions} disabled>
      <SelectTrigger className="w-50">
        <SelectValue placeholder="Disabled" />
      </SelectTrigger>
      <SelectContent>
        {shortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ),
  parameters: {
    order: 4,
  },
  play: async ({
    canvasElement,
  }: {
    canvasElement: HTMLElement;
  }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("combobox");
    await expect(trigger).toBeDisabled();
  },
};
export const WithError: Story = {
  render: () => (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor="select-error">Required field</Label>
      <Select items={shortOptions}>
        <SelectTrigger id="select-error" className="w-50" errorMessage="Please select an option">
          <SelectValue placeholder="Select..." />
        </SelectTrigger>
        <SelectContent>
          {shortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  ),
  parameters: {
    order: 5,
  },
};
export const WithGroups: Story = {
  render: () => (
    <Select items={[...documentOptions, ...mediaOptions]}>
      <SelectTrigger className="w-50">
        <SelectValue placeholder="Select a file type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Documents</SelectLabel>
          {documentOptions.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              icon={<IconFile className="size-4" />}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Media</SelectLabel>
          {mediaOptions.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              icon={<IconFolder className="size-4" />}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
  parameters: {
    order: 6,
  },
};
export const WithDefaultValue: Story = {
  render: () => (
    <Select items={defaultValueOptions} defaultValue="option2">
      <SelectTrigger className="w-50">
        <SelectValue placeholder="Select..." />
      </SelectTrigger>
      <SelectContent>
        {defaultValueOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ),
  parameters: {
    order: 7,
  },
};
export const Controlled: Story = {
  render: function ControlledSelect() {
    const [value, setValue] = useState("");
    return (
      <div className="space-y-4">
        <Select items={colorOptions} value={value} onValueChange={setValue}>
          <SelectTrigger className="w-50">
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent>
            {colorOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => setValue("red")}>
            Set Red
          </Button>
          <Button size="sm" variant="outline" onClick={() => setValue("green")}>
            Set Green
          </Button>
          <Button size="sm" variant="outline" onClick={() => setValue("")}>
            Clear
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">Selected: {value || "(none)"}</p>
      </div>
    );
  },
  parameters: {
    order: 8,
  },
};
export const DisabledItems: Story = {
  render: () => (
    <Select items={disabledOptions}>
      <SelectTrigger className="w-50">
        <SelectValue placeholder="Select..." />
      </SelectTrigger>
      <SelectContent>
        {disabledOptions.map((option) => (
          <SelectItem key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ),
  parameters: {
    order: 9,
  },
};
export const SmallSize: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Select items={shortOptions}>
        <SelectTrigger size="sm" className="w-37.5">
          <SelectValue placeholder="Small" />
        </SelectTrigger>
        <SelectContent>
          {shortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select items={shortOptions}>
        <SelectTrigger size="default" className="w-37.5">
          <SelectValue placeholder="Default" />
        </SelectTrigger>
        <SelectContent>
          {shortOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  ),
  parameters: {
    order: 10,
  },
};
export const AllStates: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="grid w-full items-center gap-1.5">
        <Label>Default</Label>
        <Select items={singleOption}>
          <SelectTrigger className="w-50">
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent>
            {singleOption.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label>With Value</Label>
        <Select
          items={[
            {
              label: "Selected Option",
              value: "option1",
            },
          ]}
          defaultValue="option1"
        >
          <SelectTrigger className="w-50">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[
              {
                label: "Selected Option",
                value: "option1",
              },
            ].map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label>Disabled</Label>
        <Select items={singleOption} disabled>
          <SelectTrigger className="w-50">
            <SelectValue placeholder="Disabled" />
          </SelectTrigger>
          <SelectContent>
            {singleOption.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label>With Error</Label>
        <Select items={singleOption}>
          <SelectTrigger className="w-50" errorMessage="Required">
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent>
            {singleOption.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
  parameters: {
    order: 11,
  },
};
export const LongTextAndOverflow: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="w-40">
        <Label>Long option labels</Label>
        <Select items={longTextOptions}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select an option with long text" />
          </SelectTrigger>
          <SelectContent className="max-h-40">
            {longTextOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <p className="text-sm text-muted-foreground max-w-md">
        The trigger is constrained by a narrow container while the dropdown content has a limited
        max height with scrolling enabled, helping you see how long labels behave in tight layouts.
      </p>
    </div>
  ),
  parameters: {
    order: 12,
  },
};
export const VisualRegression: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">States</h3>
        <div className="flex flex-wrap gap-4">
          <Select
            items={[
              {
                label: "Option",
                value: "1",
              },
            ]}
          >
            <SelectTrigger className="w-37.5">
              <SelectValue placeholder="Default" />
            </SelectTrigger>
            <SelectContent>
              {[
                {
                  label: "Option",
                  value: "1",
                },
              ].map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            items={[
              {
                label: "Selected",
                value: "selected",
              },
            ]}
            defaultValue="selected"
          >
            <SelectTrigger className="w-37.5">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[
                {
                  label: "Selected",
                  value: "selected",
                },
              ].map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            items={[
              {
                label: "Option",
                value: "1",
              },
            ]}
            disabled
          >
            <SelectTrigger className="w-37.5">
              <SelectValue placeholder="Disabled" />
            </SelectTrigger>
            <SelectContent>
              {[
                {
                  label: "Option",
                  value: "1",
                },
              ].map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">With Icons</h3>
        <Select
          items={[
            {
              label: "Settings",
              value: "settings",
            },
          ]}
          defaultValue="settings"
        >
          <SelectTrigger className="w-50">
            <SelectValue icon={<IconSettings className="size-4" />} />
          </SelectTrigger>
          <SelectContent>
            {[
              {
                label: "Settings",
                value: "settings",
              },
            ].map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                icon={<IconSettings className="size-4" />}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Error</h3>
        <Select
          items={[
            {
              label: "Option",
              value: "1",
            },
          ]}
        >
          <SelectTrigger className="w-50" errorMessage="This is required">
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent>
            {[
              {
                label: "Option",
                value: "1",
              },
            ].map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
  parameters: {
    order: 13,
    chromatic: {
      disableSnapshot: false,
    },
  },
};
export const EdgeCaseEmpty: Story = {
  render: () => (
    <div className="space-y-2">
      <Label>Empty select</Label>
      <Select items={[]}>
        <SelectTrigger className="w-50">
          <SelectValue placeholder="No options available" />
        </SelectTrigger>
        <SelectContent />
      </Select>
      <p className="text-sm text-muted-foreground">
        Select with no options demonstrates empty state handling.
      </p>
    </div>
  ),
  parameters: {
    order: 14,
  },
};
export const EdgeCaseSpecialCharacters: Story = {
  render: () => (
    <div className="space-y-2">
      <Label>Special characters</Label>
      <Select items={specialCharacterOptions}>
        <SelectTrigger className="w-50">
          <SelectValue placeholder="Select..." />
        </SelectTrigger>
        <SelectContent>
          {specialCharacterOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-sm text-muted-foreground">
        Tests rendering of emojis, special characters, and HTML entities.
      </p>
    </div>
  ),
  parameters: {
    order: 15,
  },
};
export const MultipleSelection: Story = {
  render: function MultipleSelectionExample() {
    const [value, setValue] = useState<string[]>(["javascript", "typescript"]);
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="languages">Select languages</Label>
          <Select
            items={languageOptions}
            multiple
            value={value as any}
            onValueChange={(newValue: any) => setValue(newValue)}
          >
            <SelectTrigger id="languages" className="w-75">
              <SelectValue placeholder="Select languages">
                {value.length > 0
                  ? `${value[0].charAt(0).toUpperCase() + value[0].slice(1)} ${value.length > 1 ? `(+${value.length - 1} more)` : ""}`
                  : "Select languages"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {languageOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="text-sm text-muted-foreground">
          Selected: {value.length > 0 ? value.join(", ") : "None"}
        </div>
      </div>
    );
  },
  parameters: {
    order: 98,
  },
};
export const Playground: Story = {
  args: {
    disabled: false,
    defaultOpen: false,
  },
  render: (args: ComponentProps<typeof Select>) => (
    <Select items={basicOptions} {...args}>
      <SelectTrigger className="w-50">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        {basicOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ),
  parameters: {
    order: 99,
  },
};
