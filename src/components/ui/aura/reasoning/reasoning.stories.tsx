import {
  Tool,
  ToolContent,
  ToolHeader,
  ToolInput,
  ToolOutput,
} from "@/components/ui/aura/tool/tool";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, waitFor, within } from "@storybook/test";
import { Reasoning, ReasoningContent, ReasoningHeader, ReasoningItem } from "./reasoning";

const meta: Meta<typeof Reasoning> = {
  title: "AI/Reasoning",
  component: Reasoning,
  tags: ["autodocs", "ai-elements"],
  argTypes: {
    children: {
      control: false,
      description: "The reasoning content including header and items",
      table: {
        category: "Content",
        type: { summary: "ReactNode" },
      },
    },

    className: {
      control: "text",
      description: "Additional CSS classes for custom styling",
      table: {
        category: "Variants/Styling",
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
      <div className="w-125">
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
    order: 1,
    docs: {
      description: {
        story:
          "Typical AI reasoning workflow showing multiple tool calls for industrial asset monitoring. Demonstrates finding assets, retrieving sensor data, and analyzing trends to make maintenance recommendations.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const reasoning = canvasElement.querySelector('[data-slot="reasoning"]');
    await expect(reasoning).toBeInTheDocument();

    // Check that all three tool calls are present
    const toolButtons = await canvas.findAllByRole("button", {
      name: /find assets|get sensor data|analyze trends/i,
    });
    await expect(toolButtons.length).toBe(3);

    await expect(toolButtons[0]).toHaveTextContent("Find assets");
    await expect(toolButtons[1]).toHaveTextContent("Get sensor data");
    await expect(toolButtons[2]).toHaveTextContent("Analyze trends");

    const firstTool = toolButtons[0];
    await userEvent.click(firstTool);
    const getFirstToolPanel = () =>
      firstTool
        .closest('[data-slot="collapsible"]')
        ?.querySelector('[data-slot="collapsible-content"]') as HTMLElement | null;

    await waitFor(() => {
      const content = canvasElement.textContent || "";
      const firstToolPanel = getFirstToolPanel();
      if (!firstToolPanel) {
        return;
      }
      expect(firstTool).toHaveAttribute("data-panel-open");
      expect(firstToolPanel).toBeVisible();
      expect(within(firstToolPanel).getByText("Parameters")).toBeVisible();
      expect(within(firstToolPanel).getByText("Result")).toBeVisible();
      // Verify content is present (code appears in both light/dark theme blocks)
      expect(content).toContain("Show all pumps in building A");
      expect(content).toContain("Pump 21PT1019");
    });

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
    order: 2,
    docs: {
      description: {
        story:
          "Reasoning section with a single tool call (no connector decorations between steps).",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const reasoning = canvasElement.querySelector('[data-slot="reasoning"]');
    await expect(reasoning).toBeInTheDocument();

    const toolButtons = await canvas.findAllByRole("button");
    await expect(toolButtons.length).toBe(1);

    await expect(toolButtons[0]).toHaveTextContent("Look up asset details");

    await userEvent.click(toolButtons[0]);

    await waitFor(() => {
      const content = canvasElement.textContent || "";
      expect(canvas.getByText("Parameters")).toBeVisible();
      expect(canvas.getByText("Result")).toBeVisible();
      expect(content).toContain("assetId");
      expect(content).toContain("Pump 21PT1019");
    });

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
    order: 3,
    docs: {
      description: {
        story:
          "Demonstrates error handling in tool calls. Shows failed database query with error message, followed by successful fallback to cache.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const toolButtons = await canvas.findAllByRole("button");
    await expect(toolButtons.length).toBe(2);

    await userEvent.click(toolButtons[0]);

    await waitFor(() => {
      const content = canvasElement.textContent || "";
      expect(canvas.getByText("Error")).toBeVisible();
      expect(content).toContain("Database connection timeout");
    });

    await userEvent.click(toolButtons[1]);

    await waitFor(() => {
      expect(canvas.getByText("Result")).toBeVisible();
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
        <ReasoningItem>
          <Tool>
            <ToolHeader title="Step 1: Extract data" type="tool-call" />
            <ToolContent>
              <ToolInput
                input={{
                  source: "sensor-database",
                  query: "SELECT * FROM readings WHERE asset_id = 1",
                }}
              />
              <ToolOutput
                output={{
                  success: true,
                  processedRecords: 100,
                  duration: "0.5s",
                }}
                errorText={undefined}
              />
            </ToolContent>
          </Tool>
        </ReasoningItem>

        <ReasoningItem>
          <Tool>
            <ToolHeader title="Step 2: Transform data" type="tool-call" />
            <ToolContent>
              <ToolInput
                input={{
                  format: "time-series",
                  aggregation: "hourly-mean",
                }}
              />
              <ToolOutput
                output={{
                  success: true,
                  processedRecords: 200,
                  duration: "1.0s",
                }}
                errorText={undefined}
              />
            </ToolContent>
          </Tool>
        </ReasoningItem>

        <ReasoningItem>
          <Tool>
            <ToolHeader title="Step 3: Detect anomalies" type="tool-call" />
            <ToolContent>
              <ToolInput
                input={{
                  algorithm: "isolation-forest",
                  threshold: 0.95,
                }}
              />
              <ToolOutput
                output={{
                  success: true,
                  processedRecords: 300,
                  duration: "1.5s",
                }}
                errorText={undefined}
              />
            </ToolContent>
          </Tool>
        </ReasoningItem>

        <ReasoningItem>
          <Tool>
            <ToolHeader title="Step 4: Correlate events" type="tool-call" />
            <ToolContent>
              <ToolInput
                input={{
                  eventTypes: ["maintenance", "alarm", "shutdown"],
                  windowSize: "24h",
                }}
              />
              <ToolOutput
                output={{
                  success: true,
                  processedRecords: 400,
                  duration: "2.0s",
                }}
                errorText={undefined}
              />
            </ToolContent>
          </Tool>
        </ReasoningItem>

        <ReasoningItem>
          <Tool>
            <ToolHeader title="Step 5: Generate report" type="tool-call" />
            <ToolContent>
              <ToolInput
                input={{
                  reportType: "health-assessment",
                  includeCharts: true,
                }}
              />
              <ToolOutput
                output={{
                  success: true,
                  processedRecords: 500,
                  duration: "2.5s",
                }}
                errorText={undefined}
              />
            </ToolContent>
          </Tool>
        </ReasoningItem>

        <ReasoningItem>
          <Tool>
            <ToolHeader title="Step 6: Send notifications" type="tool-call" />
            <ToolContent>
              <ToolInput
                input={{
                  channels: ["email", "slack"],
                  priority: "high",
                }}
              />
              <ToolOutput
                output={{
                  success: true,
                  processedRecords: 600,
                  duration: "3.0s",
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
    order: 4,
    docs: {
      description: {
        story:
          "Stress test showing 6 sequential tool calls in a complex workflow. Tests connector line rendering and performance with many reasoning steps.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const toolButtons = await canvas.findAllByRole("button");
    await expect(toolButtons.length).toBe(6);

    await expect(canvasElement.textContent).toContain("Complex Analysis Workflow");

    await userEvent.click(toolButtons[0]);
    await userEvent.click(toolButtons[2]);
    await userEvent.click(toolButtons[5]);

    await waitFor(() => {
      const content = canvasElement.textContent || "";
      expect(content).toContain("sensor-database");
      expect(content).toContain("isolation-forest");
      expect(content).toContain("slack");
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
                  readings: [
                    {
                      timestamp: "2026-01-15T08:00:00Z",
                      vibration: "2.31",
                      temperature: "67.4",
                      pressure: "158.2",
                      flow_rate: "48.7",
                      power_consumption: "13.45",
                    },
                    {
                      timestamp: "2026-01-16T12:00:00Z",
                      vibration: "2.18",
                      temperature: "71.2",
                      pressure: "162.5",
                      flow_rate: "51.3",
                      power_consumption: "14.22",
                    },
                    {
                      timestamp: "2026-01-17T16:00:00Z",
                      vibration: "2.45",
                      temperature: "69.8",
                      pressure: "155.1",
                      flow_rate: "46.9",
                      power_consumption: "12.87",
                    },
                    {
                      timestamp: "2026-01-18T20:00:00Z",
                      vibration: "2.07",
                      temperature: "73.6",
                      pressure: "167.3",
                      flow_rate: "52.1",
                      power_consumption: "14.91",
                    },
                    {
                      timestamp: "2026-01-19T04:00:00Z",
                      vibration: "2.39",
                      temperature: "65.9",
                      pressure: "151.8",
                      flow_rate: "47.5",
                      power_consumption: "13.10",
                    },
                  ],
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
    order: 5,
    docs: {
      description: {
        story:
          "Tool with extensive JSON output showing representative sensor readings over 7 days. Tests code block rendering, syntax highlighting, and collapse functionality with large datasets.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const toolButton = await canvas.findByRole("button");
    await userEvent.click(toolButton);

    await waitFor(() => {
      const content = canvasElement.textContent || "";
      expect(content).toContain("readings");
      expect(content).toContain("total_readings");
      expect(content).toContain("2026");
      expect(content).toContain("anomalies_detected");
    });

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
    order: 6,
    docs: {
      description: {
        story: "Different header styles including custom title and custom React node with badge.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText("Data Pipeline Execution")).toBeInTheDocument();
    expect(canvas.getByText("Processing")).toBeInTheDocument();
    expect(canvas.getByText("3 steps")).toBeInTheDocument();

    const toolButtons = await canvas.findAllByRole("button");
    expect(toolButtons).toHaveLength(2);

    await userEvent.click(toolButtons[0]);
    await waitFor(() => {
      expect(canvas.getAllByText("Parameters")[0]).toBeVisible();
    });

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
    order: 7,
    docs: {
      description: {
        story:
          "Accessibility testing story. Verifies keyboard navigation, ARIA labels, focus management, and screen reader compatibility.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const toolButtons = await canvas.findAllByRole("button");

    await expect(toolButtons[0]).toHaveAccessibleName("Check system status");
    await expect(toolButtons[1]).toHaveAccessibleName("Run diagnostics");

    toolButtons[0].focus();
    await expect(toolButtons[0]).toHaveFocus();

    await userEvent.keyboard("{Enter}");

    await waitFor(() => {
      const content = canvasElement.textContent || "";
      expect(content).toContain("Parameters");
      expect(content).toContain("api");
    });

    toolButtons[1].focus();
    await expect(toolButtons[1]).toHaveFocus();

    await userEvent.keyboard(" ");

    await waitFor(() => {
      const content = canvasElement.textContent || "";
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
    order: 8,
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
  render: (args) => (
    <Reasoning {...args}>
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
    order: 99,
    docs: {
      description: {
        story: "Interactive playground for experimenting with Reasoning component props.",
      },
    },
  },
};
