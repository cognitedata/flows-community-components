import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconAlertTriangle, IconBulb, IconCircleCheck, IconInfoCircle } from "@tabler/icons-react";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";

import { Button } from "../button";
import { Input } from "../input";
import { Label } from "../label";
import { HelperText } from "./helper-text";
const meta: Meta<typeof HelperText> = {
  title: "Primitives/Helper Text",
  component: HelperText,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm"],
      table: {
        category: "Variants/Styling",
        type: {
          summary: '"xs" | "sm"',
        },
        defaultValue: {
          summary: "sm",
        },
      },
    },
    className: {
      control: "text",
      table: {
        category: "Variants/Styling",
      },
    },
    isError: {
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
    isSuccess: {
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
    icon: {
      control: false,
      table: {
        category: "Content",
        type: {
          summary: "ReactNode",
        },
      },
    },
    children: {
      control: "text",
      table: {
        category: "Content",
        type: {
          summary: "ReactNode",
        },
      },
    },
  },
  parameters: {
    layout: "centered",
  },
};
export default meta;
type Story = StoryObj<typeof HelperText>;
export const Basic: Story = {
  parameters: {
    order: 1,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const helperText = canvas.getByText("This is helpful information for the user.");
    await expect(helperText).toBeInTheDocument();
    await expect(helperText).toHaveClass("text-muted-foreground");
  },
  render: () => <HelperText>This is helpful information for the user.</HelperText>,
};
export const SizeXS: Story = {
  parameters: {
    order: 2,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const helperText = canvas.getByText("Compact helper text for tight spaces.");
    await expect(helperText).toBeInTheDocument();
    await expect(helperText.parentElement).toHaveClass("text-xs");
  },
  render: () => <HelperText size="xs">Compact helper text for tight spaces.</HelperText>,
};
export const SizeSM: Story = {
  parameters: {
    order: 3,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const helperText = canvas.getByText("Standard sized helper text.");
    await expect(helperText).toBeInTheDocument();
    await expect(helperText.parentElement).toHaveClass("text-sm");
  },
  render: () => <HelperText size="sm">Standard sized helper text.</HelperText>,
};
export const ErrorState: Story = {
  parameters: {
    order: 4,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const helperText = canvas.getByText("This field is required.");
    await expect(helperText).toBeInTheDocument();
    await expect(helperText).toHaveClass("text-destructive-foreground");
  },
  render: () => <HelperText isError>This field is required.</HelperText>,
};
export const Success: Story = {
  parameters: {
    order: 5,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const helperText = canvas.getByText("Password meets all requirements.");
    await expect(helperText).toBeInTheDocument();
    await expect(helperText).toHaveClass("text-success-foreground");
  },
  render: () => (
    <HelperText isSuccess icon={<IconCircleCheck />}>
      Password meets all requirements.
    </HelperText>
  ),
};
export const WithCustomIcon: Story = {
  parameters: {
    order: 6,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const helperText = canvas.getByText("Your data is encrypted and secure.");
    await expect(helperText).toBeInTheDocument();
  },
  render: () => (
    <HelperText icon={<IconInfoCircle />}>Your data is encrypted and secure.</HelperText>
  ),
};
export const Warning: Story = {
  parameters: {
    order: 7,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const helperText = canvas.getByText("Changes cannot be undone after saving.");
    await expect(helperText).toBeInTheDocument();
  },
  render: () => (
    <HelperText icon={<IconAlertTriangle />}>Changes cannot be undone after saving.</HelperText>
  ),
};
export const Tip: Story = {
  parameters: {
    order: 8,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const helperText = canvas.getByText("Pro tip: Use keyboard shortcuts to work faster.");
    await expect(helperText).toBeInTheDocument();
  },
  render: () => (
    <HelperText icon={<IconBulb />}>Pro tip: Use keyboard shortcuts to work faster.</HelperText>
  ),
};
export const NoIcon: Story = {
  parameters: {
    order: 9,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const helperText = canvas.getByText("Simple text without an icon.");
    await expect(helperText).toBeInTheDocument();
  },
  render: () => <HelperText>Simple text without an icon.</HelperText>,
};
export const LongText: Story = {
  parameters: {
    order: 10,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const helperText = canvas.getByText(/This is a longer piece of helper text/);
    await expect(helperText).toBeInTheDocument();
  },
  render: () => (
    <HelperText icon={<IconInfoCircle />} className="max-w-md">
      This is a longer piece of helper text that demonstrates how the component handles text
      wrapping. It will span multiple lines while maintaining proper alignment with the icon.
    </HelperText>
  ),
};
export const InteractiveFormExample: Story = {
  parameters: {
    order: 11,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Email address");
    await expect(
      canvas.getByText("Enter your email to receive notifications.")
    ).toBeInTheDocument();
    await userEvent.type(input, "invalid-email", {
      delay: 50,
    });
    await expect(canvas.getByText("Please enter a valid email address.")).toBeInTheDocument();
    await expect(
      canvas.queryByText("Enter your email to receive notifications.")
    ).not.toBeInTheDocument();
    await userEvent.clear(input);
    await userEvent.type(input, "valid@email.com", {
      delay: 50,
    });
    await expect(canvas.getByText("Email format is valid.")).toBeInTheDocument();
    await expect(canvas.queryByText("Please enter a valid email address.")).not.toBeInTheDocument();
  },
  render: function InteractiveFormExampleStory() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
    const validateEmail = (value: string) => {
      if (value.length === 0) {
        setStatus("idle");
        return;
      }
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      setStatus(isValid ? "success" : "error");
    };
    return (
      <div className="w-100 space-y-2">
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            validateEmail(e.target.value);
          }}
        />
        {status === "idle" && (
          <HelperText size="sm">Enter your email to receive notifications.</HelperText>
        )}
        {status === "error" && (
          <HelperText size="sm" isError>
            Please enter a valid email address.
          </HelperText>
        )}
        {status === "success" && (
          <HelperText size="sm" isSuccess icon={<IconCircleCheck />}>
            Email format is valid.
          </HelperText>
        )}
      </div>
    );
  },
};
export const SizeComparison: Story = {
  parameters: {
    order: 12,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const xsText = canvas.getByText("This is extra small helper text");
    const smText = canvas.getByText("This is small helper text");
    await expect(xsText).toBeInTheDocument();
    await expect(smText).toBeInTheDocument();
    await expect(xsText.parentElement).toHaveClass("text-xs");
    await expect(smText.parentElement).toHaveClass("text-sm");
  },
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="mb-1 text-sm font-medium">Extra Small (xs)</h3>
        <HelperText size="xs" icon={<IconInfoCircle />}>
          This is extra small helper text
        </HelperText>
      </div>
      <div>
        <h3 className="mb-1 text-sm font-medium">Small (sm) - Default</h3>
        <HelperText size="sm" icon={<IconInfoCircle />}>
          This is small helper text
        </HelperText>
      </div>
    </div>
  ),
};
export const AllStates: Story = {
  parameters: {
    order: 13,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("This is default helper text.")).toBeInTheDocument();
    await expect(canvas.getByText("This field contains an error.")).toBeInTheDocument();
    await expect(canvas.getByText("Successfully validated.")).toBeInTheDocument();
    await expect(canvas.getByText("Additional information is available.")).toBeInTheDocument();
    await expect(canvas.getByText("Proceed with caution.")).toBeInTheDocument();
    await expect(canvas.getByText("Simple text without an icon.")).toBeInTheDocument();
    const errorText = canvas.getByText("This field contains an error.");
    await expect(errorText).toHaveClass("text-destructive-foreground");
    const successText = canvas.getByText("Successfully validated.");
    await expect(successText).toHaveClass("text-success-foreground");
  },
  render: () => (
    <div className="space-y-4 max-w-md">
      <div>
        <h3 className="mb-1 text-sm font-medium">Default</h3>
        <HelperText>This is default helper text.</HelperText>
      </div>
      <div>
        <h3 className="mb-1 text-sm font-medium">Error</h3>
        <HelperText isError>This field contains an error.</HelperText>
      </div>
      <div>
        <h3 className="mb-1 text-sm font-medium">Success</h3>
        <HelperText isSuccess icon={<IconCircleCheck />}>
          Successfully validated.
        </HelperText>
      </div>
      <div>
        <h3 className="mb-1 text-sm font-medium">With Info Icon</h3>
        <HelperText icon={<IconInfoCircle />}>Additional information is available.</HelperText>
      </div>
      <div>
        <h3 className="mb-1 text-sm font-medium">With Warning Icon</h3>
        <HelperText icon={<IconAlertTriangle />}>Proceed with caution.</HelperText>
      </div>
      <div>
        <h3 className="mb-1 text-sm font-medium">Without Icon</h3>
        <HelperText>Simple text without an icon.</HelperText>
      </div>
    </div>
  ),
};
export const WithFormFields: Story = {
  parameters: {
    order: 14,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText("Username")).toBeInTheDocument();
    await expect(canvas.getByLabelText("Password")).toBeInTheDocument();
    await expect(canvas.getByLabelText("Confirm Password")).toBeInTheDocument();
    await expect(
      canvas.getByText("Choose a unique username. Only letters, numbers, and underscores.")
    ).toBeInTheDocument();
    await expect(
      canvas.getByText("Must be at least 8 characters with a mix of letters and numbers.")
    ).toBeInTheDocument();
    const errorText = canvas.getByText("Passwords do not match.");
    await expect(errorText).toBeInTheDocument();
    await expect(errorText).toHaveClass("text-destructive-foreground");
  },
  render: () => (
    <div className="w-100 space-y-6">
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input id="username" placeholder="johndoe" />
        <HelperText size="sm">
          Choose a unique username. Only letters, numbers, and underscores.
        </HelperText>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" placeholder="••••••••" />
        <HelperText size="sm" icon={<IconInfoCircle />}>
          Must be at least 8 characters with a mix of letters and numbers.
        </HelperText>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirm">Confirm Password</Label>
        <Input id="confirm" type="password" placeholder="••••••••" />
        <HelperText size="sm" isError>
          Passwords do not match.
        </HelperText>
      </div>
    </div>
  ),
};
export const StatefulValidation: Story = {
  parameters: {
    order: 15,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Name");
    const button = canvas.getByRole("button", {
      name: /Validate/i,
    });
    await expect(canvas.getByText("Enter your name and click validate.")).toBeInTheDocument();
    await userEvent.click(button);
    await expect(canvas.getByText("Name must be at least 5 characters long.")).toBeInTheDocument();
    await userEvent.type(input, "test", {
      delay: 50,
    });
    await userEvent.click(button);
    await expect(canvas.getByText("Name must be at least 5 characters long.")).toBeInTheDocument();
    await userEvent.clear(input);
    await userEvent.type(input, "valid name", {
      delay: 50,
    });
    await userEvent.click(button);
    await expect(canvas.getByText("Name is valid!")).toBeInTheDocument();
  },
  render: function StatefulValidationStory() {
    const [value, setValue] = useState("");
    const [state, setState] = useState<"idle" | "error" | "success">("idle");
    const handleValidate = () => {
      if (value.length === 0) {
        setState("error");
      } else if (value.length < 5) {
        setState("error");
      } else {
        setState("success");
      }
    };
    return (
      <div className="w-100 space-y-3">
        <div className="space-y-2">
          <Label htmlFor="validation-input">Name</Label>
          <Input
            id="validation-input"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setState("idle");
            }}
            placeholder="Enter at least 5 characters"
          />
          {state === "idle" && (
            <HelperText size="sm">Enter your name and click validate.</HelperText>
          )}
          {state === "error" && (
            <HelperText size="sm" isError>
              Name must be at least 5 characters long.
            </HelperText>
          )}
          {state === "success" && (
            <HelperText size="sm" isSuccess icon={<IconCircleCheck />}>
              Name is valid!
            </HelperText>
          )}
        </div>
        <Button onClick={handleValidate}>Validate</Button>
      </div>
    );
  },
};
export const Playground: Story = {
  args: {
    size: "sm",
    isError: false,
    isSuccess: false,
    children: "Customize this helper text using the controls above.",
  },
  parameters: {
    order: 99,
  },
  render: (args) => <HelperText {...args} />,
};
