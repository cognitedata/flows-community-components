import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import { Shimmer } from "./shimmer";

const meta: Meta<typeof Shimmer> = {
  title: "AI/Shimmer",
  component: Shimmer,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="p-8">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    // Display & behavior
    children: {
      control: "text",
      description: "Text content to display with shimmer effect",
      table: {
        category: "Display",
        type: { summary: "string" },
      },
    },
    as: {
      control: "select",
      options: ["p", "span", "div", "h1", "h2", "h3"],
      description: "HTML element type to render",
      table: {
        category: "Display",
        type: { summary: "ElementType" },
        defaultValue: { summary: "p" },
      },
    },
    variant: {
      control: "select",
      options: [
        "default",
        "nordic",
        "aurora",
        "dusk",
        "equinox",
        "summer",
        "spring",
        "fall",
      ],
      description: "Gradient variant for the shimmer effect",
      table: {
        category: "Display",
        type: {
          summary:
            "default | nordic | aurora | dusk | equinox | summer | spring | fall",
        },
        defaultValue: { summary: "default" },
      },
    },
    duration: {
      control: "number",
      description: "Animation duration in seconds",
      table: {
        category: "Animation",
        type: { summary: "number" },
        defaultValue: { summary: "2" },
      },
    },
    spread: {
      control: "number",
      description:
        "Spread multiplier for shimmer effect (based on text length)",
      table: {
        category: "Animation",
        type: { summary: "number" },
        defaultValue: { summary: "2" },
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
    // Disable color-contrast rule for Shimmer stories.
    // The component uses bg-clip-text with gradients, which automated
    // a11y tools cannot analyse. The text is visible via the gradient.
    a11y: {
      config: {
        rules: [{ id: "color-contrast", enabled: false }],
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Shimmer>;

/**
 * Basic shimmer effect
 * Matches the basic example from shimmer.examples.tsx
 */
export const Basic: Story = {
  args: {
    children: "Processing...",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Basic shimmer effect for loading states. Tests that the shimmer animation is visible.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the shimmer text
    const shimmer = canvas.getByText("Processing...");
    await expect(shimmer).toBeInTheDocument();
  },
  render: (args) => <Shimmer {...args} />,
};

/**
 * All gradient variants
 * Matches the gradients example from shimmer.examples.tsx
 */
export const GradientVariants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Shimmer effects with seasonal and brand colour gradients. All available variants displayed together.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify all variants are rendered
    const variants = [
      "Default gradient",
      "Nordic gradient",
      "Aurora gradient",
      "Dusk gradient",
      "Equinox gradient",
      "Summer gradient",
      "Spring gradient",
      "Fall gradient",
    ];

    await Promise.all(
      variants.map((variant) =>
        expect(canvas.getByText(variant)).toBeInTheDocument()
      )
    );
  },
  render: () => (
    <div className="w-full flex flex-col items-start gap-4">
      <Shimmer variant="default">Default gradient</Shimmer>
      <Shimmer variant="nordic">Nordic gradient</Shimmer>
      <Shimmer variant="aurora">Aurora gradient</Shimmer>
      <Shimmer variant="dusk">Dusk gradient</Shimmer>
      <Shimmer variant="equinox">Equinox gradient</Shimmer>
      <Shimmer variant="summer">Summer gradient</Shimmer>
      <Shimmer variant="spring">Spring gradient</Shimmer>
      <Shimmer variant="fall">Fall gradient</Shimmer>
    </div>
  ),
};

/**
 * Different HTML element types with appropriate typography
 */
export const ElementTypes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Shimmer effect applied to different HTML element types with appropriate typography styling.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify heading elements are rendered as headings with correct text
    const headings = [
      { level: 1, name: /heading 1 with shimmer/i },
      { level: 2, name: /heading 2 with shimmer/i },
      { level: 3, name: /heading 3 with shimmer/i },
    ];

    await Promise.all(
      headings.map(({ level, name }) =>
        expect(
          canvas.getByRole("heading", {
            level,
            name,
          })
        ).toBeInTheDocument()
      )
    );
  },
  render: () => (
    <div className="w-full flex flex-col items-start gap-6">
      <Shimmer as="h1" className="text-4xl font-bold tracking-tight">
        Heading 1 with shimmer
      </Shimmer>
      <Shimmer as="h2" className="text-2xl font-semibold">
        Heading 2 with shimmer
      </Shimmer>
      <Shimmer as="h3" className="text-xl font-medium">
        Heading 3 with shimmer
      </Shimmer>
      <Shimmer as="p" className="text-base">
        Paragraph text with shimmer effect applied.
      </Shimmer>
      <p className="text-base">
        Inline text with a{" "}
        <Shimmer as="span" className="font-medium">
          shimmer span
        </Shimmer>{" "}
        inside it.
      </p>
      <Shimmer as="div" className="text-sm text-muted-foreground">
        Div element styled as secondary text
      </Shimmer>
    </div>
  ),
};

/**
 * Different animation durations
 */
export const AnimationDurations: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Shimmer effects with different animation durations. Faster durations create more rapid shimmer effects.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify all duration variants are rendered
    const durations = [
      "Fast (1 second)",
      "Default (2 seconds)",
      "Slow (3 seconds)",
      "Very slow (4 seconds)",
    ];

    await Promise.all(
      durations.map((duration) =>
        expect(canvas.getByText(duration)).toBeInTheDocument()
      )
    );
  },
  render: () => (
    <div className="w-full flex flex-col items-start gap-4">
      <Shimmer duration={1}>Fast (1 second)</Shimmer>
      <Shimmer duration={2}>Default (2 seconds)</Shimmer>
      <Shimmer duration={3}>Slow (3 seconds)</Shimmer>
      <Shimmer duration={4}>Very slow (4 seconds)</Shimmer>
    </div>
  ),
};

/**
 * Different spread values
 */
export const SpreadValues: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Shimmer effects with different spread values. Higher spread creates a wider shimmer effect.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify all spread variants are rendered
    const spreads = [
      "Narrow spread (1)",
      "Default spread (2)",
      "Wide spread (3)",
      "Very wide spread (4)",
    ];

    await Promise.all(
      spreads.map((spread) =>
        expect(canvas.getByText(spread)).toBeInTheDocument()
      )
    );
  },
  render: () => (
    <div className="w-full flex flex-col items-start gap-4">
      <Shimmer spread={1}>Narrow spread (1)</Shimmer>
      <Shimmer spread={2}>Default spread (2)</Shimmer>
      <Shimmer spread={3}>Wide spread (3)</Shimmer>
      <Shimmer spread={4}>Very wide spread (4)</Shimmer>
    </div>
  ),
};

/**
 * Long text content
 */
export const LongText: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Shimmer effect on longer text content to demonstrate how the effect scales with text length.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify long text content is rendered
    await expect(
      canvas.getByText(
        /This is a longer piece of text that demonstrates how the shimmer effect works with extended content/i
      )
    ).toBeInTheDocument();
    await expect(
      canvas.getByText(
        /The shimmer animation smoothly transitions across the entire length of the text, creating an engaging loading effect/i
      )
    ).toBeInTheDocument();
  },
  render: () => (
    <div className="w-full flex flex-col items-start gap-4 max-w-md">
      <Shimmer>
        This is a longer piece of text that demonstrates how the shimmer effect
        works with extended content.
      </Shimmer>
      <Shimmer variant="aurora">
        The shimmer animation smoothly transitions across the entire length of
        the text, creating an engaging loading effect.
      </Shimmer>
    </div>
  ),
};

/**
 * Inline usage examples
 */
export const InlineUsage: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Shimmer effect used inline within other text content for progressive reveal effects.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify inline shimmer text is rendered within paragraphs
    const inlineTexts = [
      /Your request is/i,
      "processing",
      /Status:/i,
      "Analyzing data",
      /Loading/i,
      "configuration",
    ];

    await Promise.all(
      inlineTexts.map((text) =>
        expect(canvas.getByText(text)).toBeInTheDocument()
      )
    );
  },
  render: () => (
    <div className="w-full flex flex-col items-start gap-4 max-w-md">
      <p className="text-base">
        Your request is <Shimmer as="span">processing</Shimmer> and will be
        ready shortly.
      </p>
      <p className="text-base">
        Status:{" "}
        <Shimmer as="span" variant="aurora">
          Analyzing data
        </Shimmer>
      </p>
      <p className="text-base">
        Loading{" "}
        <Shimmer as="span" variant="nordic">
          configuration
        </Shimmer>{" "}
        files...
      </p>
    </div>
  ),
};

/**
 * Custom styling
 */
export const CustomStyling: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Shimmer effects with custom CSS classes for additional styling.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify custom styled shimmer text is rendered
    const styledTexts = [
      "Large bold text",
      "Small muted text",
      "Medium semibold text",
    ];

    await Promise.all(
      styledTexts.map((text) =>
        expect(canvas.getByText(text)).toBeInTheDocument()
      )
    );
  },
  render: () => (
    <div className="w-full flex flex-col items-start gap-4">
      <Shimmer className="text-2xl font-bold">Large bold text</Shimmer>
      <Shimmer className="text-sm text-muted-foreground" variant="dusk">
        Small muted text
      </Shimmer>
      <Shimmer className="text-lg font-semibold" variant="summer">
        Medium semibold text
      </Shimmer>
    </div>
  ),
};

/**
 * Loading state simulation
 */
export const LoadingStates: Story = {
  parameters: {
    docs: {
      description: {
        story: "Shimmer effects used in realistic loading state scenarios.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify headings are present
    await expect(
      canvas.getByRole("heading", { name: /Processing Request/i })
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole("heading", { name: /System Status/i })
    ).toBeInTheDocument();

    // Verify shimmer loading states are rendered
    const loadingStates = [
      "Analyzing input parameters...",
      "Generating response...",
      "Finalizing results...",
      "Data synchronization in progress",
      "Calculating...",
    ];

    await Promise.all(
      loadingStates.map((state) =>
        expect(canvas.getByText(state)).toBeInTheDocument()
      )
    );
  },
  render: () => (
    <div className="w-full flex flex-col items-start gap-6 max-w-md">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Processing Request</h3>
        <Shimmer>Analyzing input parameters...</Shimmer>
        <Shimmer variant="aurora">Generating response...</Shimmer>
        <Shimmer variant="nordic">Finalizing results...</Shimmer>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">System Status</h3>
        <p className="text-sm">
          Current operation:{" "}
          <Shimmer as="span" variant="dusk">
            Data synchronization in progress
          </Shimmer>
        </p>
        <p className="text-sm">
          Estimated time:{" "}
          <Shimmer as="span" variant="equinox">
            Calculating...
          </Shimmer>
        </p>
      </div>
    </div>
  ),
};
