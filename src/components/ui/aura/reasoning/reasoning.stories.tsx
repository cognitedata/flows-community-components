import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { Tool, ToolContent, ToolHeader, ToolInput, ToolOutput } from "../tool/tool";
import { Reasoning, ReasoningContent, ReasoningHeader, ReasoningItem } from "./reasoning";

const meta: Meta<typeof Reasoning> = {
  title: "AI/Reasoning",
  component: Reasoning,
  tags: ["autodocs"],
  argTypes: {
    // Content
    children: {
      control: false,
      description: "The reasoning content including header and items",
      table: {
        category: "Content",
        type: { summary: "ReactNode" },
      },
    },

    // Styling
    className: {
      control: "text",
      description: "Additional CSS classes for custom styling",
      table: {
        category: "Styling",
        type: { summary: "string" },
      },
    },
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A container component for displaying AI reasoning steps with visual connection lines. Typically used to show the AI's thought process when making decisions or calling tools. Works seamlessly with nested Tool components for industrial workflows.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Reasoning>;

/**
 * Industrial workflow with multiple tool calls showing pump monitoring.
 */
export const IndustrialWorkflow: Story = {
  render: () => (
    <Reasoning>
      <ReasoningHeader />
      <ReasoningContent>
        <ReasoningItem>
          <Tool>
            <ToolHeader title="Find assets" type="tool-call" />
            <ToolContent>
              <ToolInput
                input={{
                  query: "Show all pumps in building A",
                  limit: 10,
                }}
              />
              <ToolOutput
                output={{
                  assets: [
                    { id: 1, name: "Pump 21PT1019", building: "A" },
                    { id: 2, name: "Pump 21PT1020", building: "A" },
                  ],
                  total: 2,
                }}
                errorText={undefined}
              />
            </ToolContent>
          </Tool>
        </ReasoningItem>

        <ReasoningItem>
          <Tool>
            <ToolHeader title="Get sensor data" type="tool-call" />
            <ToolContent>
              <ToolInput
                input={{
                  assetId: 1,
                  sensors: ["vibration", "temperature"],
                  timeRange: "24h",
                }}
              />
              <ToolOutput
                output={{
                  vibration: { current: 2.3, average: 1.8, unit: "mm/s" },
                  temperature: { current: 68, average: 55, unit: "°C" },
                }}
                errorText={undefined}
              />
            </ToolContent>
          </Tool>
        </ReasoningItem>

        <ReasoningItem>
          <Tool>
            <ToolHeader title="Analyze trends" type="tool-call" />
            <ToolContent>
              <ToolInput
                input={{
                  assetId: 1,
                  metric: "vibration",
                  analysisType: "anomaly-detection",
                }}
              />
              <ToolOutput
                output={{
                  anomalies: 3,
                  severity: "high",
                  recommendation: "Schedule maintenance within 24 hours",
                }}
                errorText={undefined}
              />
            </ToolContent>
          </Tool>
        </ReasoningItem>
      </ReasoningContent>
    </Reasoning>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Typical AI reasoning workflow showing multiple tool calls for industrial asset monitoring. Demonstrates finding assets, retrieving sensor data, and analyzing trends to make maintenance recommendations.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify reasoning container renders
    const reasoning = canvasElement.querySelector('[class*="flex"]');
    await expect(reasoning).toBeInTheDocument();

    // Check that all three tool calls are present
    const toolButtons = canvas.getAllByRole("button");
    await expect(toolButtons.length).toBe(3);

    // Verify tool names in order
    await expect(toolButtons[0]).toHaveTextContent("Find assets");
    await expect(toolButtons[1]).toHaveTextContent("Get sensor data");
    await expect(toolButtons[2]).toHaveTextContent("Analyze trends");

    // Test collapsible interaction on first tool
    const firstTool = toolButtons[0];
    await userEvent.click(firstTool);

    // Tool content should be visible after click
    await waitFor(() => {
      const content = canvasElement.textContent || "";
      expect(canvas.getByText("Parameters")).toBeVisible();
      expect(canvas.getByText("Result")).toBeVisible();
      // Verify content is present (code appears in both light/dark theme blocks)
      expect(content).toContain("Show all pumps in building A");
      expect(content).toContain("Pump 21PT1019");
    });

    // Test keyboard interaction - expand second tool with keyboard
    const secondTool = toolButtons[1];
    secondTool.focus();
    await userEvent.keyboard("{Enter}");

    await waitFor(() => {
      expect(canvasElement.textContent).toContain("vibration");
      expect(canvasElement.textContent).toContain("temperature");
    });
  },
};

/**
 * Single tool call for asset lookup.
 */
export const SingleToolCall: Story = {
  render: () => (
    <Reasoning>
      <ReasoningHeader />
      <ReasoningContent>
        <ReasoningItem>
          <Tool>
            <ToolHeader title="Look up asset details" type="tool-call" />
            <ToolContent>
              <ToolInput
                input={{
                  assetId: 1,
                }}
              />
              <ToolOutput
                output={{
                  id: 1,
                  name: "Pump 21PT1019",
                  building: "A",
                  status: "online",
                }}
                errorText={undefined}
              />
            </ToolContent>
          </Tool>
        </ReasoningItem>
      </ReasoningContent>
    </Reasoning>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Reasoning section with a single tool call (no connector decorations between steps).",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify reasoning container renders
    const reasoning = canvasElement.querySelector('[class*="flex"]');
    await expect(reasoning).toBeInTheDocument();

    // Check that exactly one tool call is present (single tool = no connector decorations)
    const toolButtons = canvas.getAllByRole("button");
    await expect(toolButtons.length).toBe(1);

    // Verify tool name
    await expect(toolButtons[0]).toHaveTextContent("Look up asset details");

    // Test collapsible interaction
    await userEvent.click(toolButtons[0]);

    // Verify input and output are visible with content
    await waitFor(() => {
      const content = canvasElement.textContent || "";
      expect(canvas.getByText("Parameters")).toBeVisible();
      expect(canvas.getByText("Result")).toBeVisible();
      // Verify content is present (code appears in both light/dark theme blocks)
      expect(content).toContain("assetId");
      expect(content).toContain("Pump 21PT1019");
    });

    // Verify no connector lines (single tool)
    const connectorLines = canvasElement.querySelectorAll('[class*="connector"]');
    await expect(connectorLines.length).toBe(0);
  },
};

/**
 * Tool call with error output showing failure handling.
 */
export const ToolWithError: Story = {
  render: () => (
    <Reasoning>
      <ReasoningHeader />
      <ReasoningContent>
        <ReasoningItem>
          <Tool>
            <ToolHeader title="Query database" type="tool-call" />
            <ToolContent>
              <ToolInput
                input={{
                  query: "SELECT * FROM assets WHERE building = 'Z'",
                }}
              />
              <ToolOutput
                output={undefined}
                errorText="Database connection timeout after 30s. Please try again."
              />
            </ToolContent>
          </Tool>
        </ReasoningItem>

        <ReasoningItem>
          <Tool>
            <ToolHeader title="Fallback to cache" type="tool-call" />
            <ToolContent>
              <ToolInput
                input={{
                  cacheKey: "building-z-assets",
                }}
              />
              <ToolOutput
                output={{
                  cached: true,
                  age: "5 minutes",
                  data: { assets: [], total: 0 },
                }}
                errorText={undefined}
              />
            </ToolContent>
          </Tool>
        </ReasoningItem>
      </ReasoningContent>
    </Reasoning>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates error handling in tool calls. Shows failed database query with error message, followed by successful fallback to cache.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify both tools are present
    const toolButtons = canvas.getAllByRole("button");
    await expect(toolButtons.length).toBe(2);

    // Expand first tool to see error
    await userEvent.click(toolButtons[0]);

    // Verify error text is shown
    await waitFor(() => {
      const content = canvasElement.textContent || "";
      expect(canvas.getByText("Error")).toBeVisible();
      // Verify error message content (appears in both light/dark theme blocks)
      expect(content).toContain("Database connection timeout");
    });

    // Expand second tool to see success
    await userEvent.click(toolButtons[1]);

    await waitFor(() => {
      expect(canvas.getByText("Result")).toBeVisible();
      // Verify result content (appears in both light/dark theme blocks)
      expect(canvasElement.textContent).toContain("cached");
    });
  },
};

/**
 * Many tool calls showing complex multi-step workflow.
 */
export const ManyToolCalls: Story = {
  render: () => (
    <Reasoning>
      <ReasoningHeader title="Complex Analysis Workflow" />
      <ReasoningContent>
        {Array.from({ length: 6 }, (_, i) => {
          const stepNum = i + 1;
          return (
            <ReasoningItem key={stepNum}>
              <Tool>
                <ToolHeader title={`Step ${stepNum}: Process data`} type="tool-call" />
                <ToolContent>
                  <ToolInput
                    input={{
                      step: stepNum,
                      operation: `operation-${stepNum}`,
                    }}
                  />
                  <ToolOutput
                    output={{
                      success: true,
                      processedRecords: stepNum * 100,
                      duration: `${stepNum * 0.5}s`,
                    }}
                    errorText={undefined}
                  />
                </ToolContent>
              </Tool>
            </ReasoningItem>
          );
        })}
      </ReasoningContent>
    </Reasoning>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Stress test showing 6 sequential tool calls in a complex workflow. Tests connector line rendering and performance with many reasoning steps.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify all 6 tools are present
    const toolButtons = canvas.getAllByRole("button");
    await expect(toolButtons.length).toBe(6);

    // Verify custom header title
    await expect(canvasElement.textContent).toContain("Complex Analysis Workflow");

    // Test expanding multiple tools
    await userEvent.click(toolButtons[0]);
    await userEvent.click(toolButtons[2]);
    await userEvent.click(toolButtons[5]);

    // Verify expanded tools show content (appears in both light/dark theme blocks)
    await waitFor(() => {
      const content = canvasElement.textContent || "";
      expect(content).toContain("operation-1");
      expect(content).toContain("operation-3");
      expect(content).toContain("operation-6");
    });
  },
};

/**
 * Tool with long JSON content.
 */
export const LongContent: Story = {
  render: () => (
    <Reasoning>
      <ReasoningHeader />
      <ReasoningContent>
        <ReasoningItem>
          <Tool>
            <ToolHeader title="Fetch detailed sensor readings" type="tool-call" />
            <ToolContent>
              <ToolInput
                input={{
                  assetId: 1,
                  metrics: [
                    "vibration",
                    "temperature",
                    "pressure",
                    "flow_rate",
                    "power_consumption",
                  ],
                  timeRange: "7d",
                  granularity: "1h",
                }}
              />
              <ToolOutput
                output={{
                  readings: Array.from({ length: 168 }, (_, i) => ({
                    timestamp: `2026-01-${Math.floor(i / 24) + 15}T${i % 24}:00:00Z`,
                    vibration: (2.0 + Math.random() * 0.5).toFixed(2),
                    temperature: (65 + Math.random() * 10).toFixed(1),
                    pressure: (150 + Math.random() * 20).toFixed(1),
                    flow_rate: (45 + Math.random() * 10).toFixed(1),
                    power_consumption: (12 + Math.random() * 3).toFixed(2),
                  })),
                  summary: {
                    total_readings: 168,
                    avg_vibration: 2.25,
                    max_temperature: 74.8,
                    anomalies_detected: 3,
                  },
                }}
                errorText={undefined}
              />
            </ToolContent>
          </Tool>
        </ReasoningItem>
      </ReasoningContent>
    </Reasoning>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Tool with extensive JSON output (168 hourly readings over 7 days). Tests code block rendering, syntax highlighting, and collapse functionality with large datasets.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const toolButton = canvas.getByRole("button");
    await userEvent.click(toolButton);

    // Verify large dataset is rendered (code appears in both light/dark theme blocks)
    await waitFor(() => {
      const content = canvasElement.textContent || "";
      expect(content).toContain("readings");
      expect(content).toContain("total_readings");
      expect(content).toContain("2026");
      expect(content).toContain("anomalies_detected");
    });

    // Verify code block with large content is present
    const codeBlocks = canvasElement.querySelectorAll("pre");
    await expect(codeBlocks.length).toBeGreaterThanOrEqual(1);
  },
};

/**
 * Custom header variations.
 */
export const CustomHeaders: Story = {
  render: () => (
    <div className="space-y-6">
      <Reasoning>
        <ReasoningHeader title="Data Pipeline Execution" />
        <ReasoningContent>
          <ReasoningItem>
            <Tool>
              <ToolHeader title="Extract data" type="tool-call" />
              <ToolContent>
                <ToolInput input={{ source: "database" }} />
                <ToolOutput output={{ records: 1000 }} errorText={undefined} />
              </ToolContent>
            </Tool>
          </ReasoningItem>
        </ReasoningContent>
      </Reasoning>

      <Reasoning>
        <ReasoningHeader>
          <span className="flex items-center gap-2">
            <span>Processing</span>
            <span className="text-xs bg-muted px-1.5 py-0.5 rounded">3 steps</span>
          </span>
        </ReasoningHeader>
        <ReasoningContent>
          <ReasoningItem>
            <Tool>
              <ToolHeader title="Transform data" type="tool-call" />
              <ToolContent>
                <ToolInput input={{ format: "json" }} />
                <ToolOutput output={{ success: true }} errorText={undefined} />
              </ToolContent>
            </Tool>
          </ReasoningItem>
        </ReasoningContent>
      </Reasoning>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different header styles including custom title and custom React node with badge.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify custom headers are rendered
    expect(canvas.getByText("Data Pipeline Execution")).toBeInTheDocument();
    expect(canvas.getByText("Processing")).toBeInTheDocument();
    expect(canvas.getByText("3 steps")).toBeInTheDocument();

    // Verify tools can be expanded
    const toolButtons = canvas.getAllByRole("button");
    expect(toolButtons).toHaveLength(2);

    // Expand first tool and check for content
    await userEvent.click(toolButtons[0]);
    await waitFor(() => {
      expect(canvas.getAllByText("Parameters")[0]).toBeVisible();
    });

    // Expand second tool and check for content
    await userEvent.click(toolButtons[1]);
    await waitFor(() => {
      expect(canvas.getAllByText("Parameters")[1]).toBeVisible();
    });
  },
};

/**
 * Accessibility testing.
 */
export const Accessibility: Story = {
  render: () => (
    <Reasoning>
      <ReasoningHeader />
      <ReasoningContent>
        <ReasoningItem>
          <Tool>
            <ToolHeader title="Check system status" type="tool-call" />
            <ToolContent>
              <ToolInput
                input={{
                  services: ["api", "database", "cache"],
                }}
              />
              <ToolOutput
                output={{
                  api: "healthy",
                  database: "healthy",
                  cache: "healthy",
                }}
                errorText={undefined}
              />
            </ToolContent>
          </Tool>
        </ReasoningItem>

        <ReasoningItem>
          <Tool>
            <ToolHeader title="Run diagnostics" type="tool-call" />
            <ToolContent>
              <ToolInput
                input={{
                  level: "comprehensive",
                }}
              />
              <ToolOutput
                output={{
                  passed: 42,
                  failed: 0,
                  warnings: 2,
                }}
                errorText={undefined}
              />
            </ToolContent>
          </Tool>
        </ReasoningItem>
      </ReasoningContent>
    </Reasoning>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Accessibility testing story. Verifies keyboard navigation, ARIA labels, focus management, and screen reader compatibility.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify all interactive elements are keyboard accessible
    const toolButtons = canvas.getAllByRole("button");

    // Verify buttons have accessible names
    await expect(toolButtons[0]).toHaveAccessibleName("Check system status");
    await expect(toolButtons[1]).toHaveAccessibleName("Run diagnostics");

    // Focus first button with keyboard
    toolButtons[0].focus();
    await expect(toolButtons[0]).toHaveFocus();

    // Press Enter to expand
    await userEvent.keyboard("{Enter}");

    await waitFor(() => {
      const content = canvasElement.textContent || "";
      // Verify parameter content is visible (appears in both light/dark theme blocks)
      expect(content).toContain("Parameters");
      expect(content).toContain("api");
    });

    // Focus second button with keyboard
    toolButtons[1].focus();
    await expect(toolButtons[1]).toHaveFocus();

    // Press Space to expand
    await userEvent.keyboard(" ");

    await waitFor(() => {
      const content = canvasElement.textContent || "";
      // Verify parameter content is visible (appears in both light/dark theme blocks)
      expect(content).toContain("Parameters");
      expect(content).toContain("comprehensive");
    });
  },
};

/**
 * Visual regression testing.
 */
export const VisualRegression: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Single Tool</h3>
        <Reasoning>
          <ReasoningHeader />
          <ReasoningContent>
            <ReasoningItem>
              <Tool>
                <ToolHeader title="Single tool call" type="tool-call" />
                <ToolContent>
                  <ToolInput input={{ test: true }} />
                  <ToolOutput output={{ result: "success" }} errorText={undefined} />
                </ToolContent>
              </Tool>
            </ReasoningItem>
          </ReasoningContent>
        </Reasoning>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Multiple Tools</h3>
        <Reasoning>
          <ReasoningHeader />
          <ReasoningContent>
            <ReasoningItem>
              <Tool>
                <ToolHeader title="First tool" type="tool-call" />
                <ToolContent>
                  <ToolInput input={{ step: 1 }} />
                  <ToolOutput output={{ done: true }} errorText={undefined} />
                </ToolContent>
              </Tool>
            </ReasoningItem>
            <ReasoningItem>
              <Tool>
                <ToolHeader title="Second tool" type="tool-call" />
                <ToolContent>
                  <ToolInput input={{ step: 2 }} />
                  <ToolOutput output={{ done: true }} errorText={undefined} />
                </ToolContent>
              </Tool>
            </ReasoningItem>
          </ReasoningContent>
        </Reasoning>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">With Error</h3>
        <Reasoning>
          <ReasoningHeader />
          <ReasoningContent>
            <ReasoningItem>
              <Tool>
                <ToolHeader title="Failed tool" type="tool-call" />
                <ToolContent>
                  <ToolInput input={{ test: true }} />
                  <ToolOutput output={undefined} errorText="Connection failed" />
                </ToolContent>
              </Tool>
            </ReasoningItem>
          </ReasoningContent>
        </Reasoning>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Visual regression baseline showing single tool, multiple tools, and error states.",
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
  render: () => (
    <Reasoning>
      <ReasoningHeader />
      <ReasoningContent>
        <ReasoningItem>
          <Tool>
            <ToolHeader title="Playground tool" type="tool-call" />
            <ToolContent>
              <ToolInput
                input={{
                  message: "Try customizing this example",
                }}
              />
              <ToolOutput
                output={{
                  status: "ready",
                  message: "Modify the args to experiment",
                }}
                errorText={undefined}
              />
            </ToolContent>
          </Tool>
        </ReasoningItem>
      </ReasoningContent>
    </Reasoning>
  ),
  parameters: {
    docs: {
      description: {
        story: "Interactive playground for experimenting with Reasoning component props.",
      },
    },
  },
};
