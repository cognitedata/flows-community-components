import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, waitFor, within } from '@storybook/test';

import {
  Reasoning,
  ReasoningContent,
  ReasoningHeader,
  ReasoningItem,
} from './reasoning';

import {
  Tool,
  ToolContent,
  ToolHeader,
  ToolInput,
  ToolOutput,
} from '@/components/ui/aura/tool/tool';
const meta: Meta<typeof Reasoning> = {
  title: 'AI/Reasoning',
  component: Reasoning,
  tags: ['autodocs', 'ai-elements'],
  argTypes: {
    children: {
      control: false,
      table: {
        category: 'Content',
        type: {
          summary: 'ReactNode',
        },
      },
    },
    className: {
      control: 'text',
      table: {
        category: 'Variants/Styling',
        type: {
          summary: 'string',
        },
      },
    },
  },
  parameters: {
    layout: 'centered',
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
                  query: 'Show all pumps in building A',
                  limit: 10,
                }}
              />
              <ToolOutput
                output={{
                  assets: [
                    {
                      id: 1,
                      name: 'Pump 21PT1019',
                      building: 'A',
                    },
                    {
                      id: 2,
                      name: 'Pump 21PT1020',
                      building: 'A',
                    },
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
                  sensors: ['vibration', 'temperature'],
                  timeRange: '24h',
                }}
              />
              <ToolOutput
                output={{
                  vibration: {
                    current: 2.3,
                    average: 1.8,
                    unit: 'mm/s',
                  },
                  temperature: {
                    current: 68,
                    average: 55,
                    unit: '°C',
                  },
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
                  metric: 'vibration',
                  analysisType: 'anomaly-detection',
                }}
              />
              <ToolOutput
                output={{
                  anomalies: 3,
                  severity: 'high',
                  recommendation: 'Schedule maintenance within 24 hours',
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
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toolButtons = await canvas.findAllByRole('button', {
      name: /find assets|get sensor data|analyze trends/i,
    });
    await expect(toolButtons.length).toBe(3);
    await expect(toolButtons[0]).toHaveTextContent('Find assets');
    await expect(toolButtons[1]).toHaveTextContent('Get sensor data');
    await expect(toolButtons[2]).toHaveTextContent('Analyze trends');
    const firstTool = toolButtons[0];
    if (!firstTool.hasAttribute('data-panel-open')) {
      await userEvent.click(firstTool);
    }
    await waitFor(() => {
      const firstPanelId = firstTool.getAttribute('aria-controls');
      const firstPanel = firstPanelId
        ? document.getElementById(firstPanelId)
        : null;
      expect(firstTool).toHaveAttribute('data-panel-open');
      expect(firstPanel).toBeTruthy();
      if (!firstPanel) {
        return;
      }
      expect(within(firstPanel).getByText('Parameters')).toBeVisible();
      expect(within(firstPanel).getByText('Result')).toBeVisible();
      expect(firstPanel.textContent).toContain('Show all pumps in building A');
      expect(firstPanel.textContent).toContain('Pump 21PT1019');
    });
    const secondTool = toolButtons[1];
    if (!secondTool.hasAttribute('data-panel-open')) {
      await userEvent.click(secondTool);
    }
    await waitFor(() => {
      const secondPanelId = secondTool.getAttribute('aria-controls');
      const secondPanel = secondPanelId
        ? document.getElementById(secondPanelId)
        : null;
      expect(secondPanel).toBeTruthy();
      if (!secondPanel) {
        return;
      }
      expect(secondPanel.textContent).toContain('vibration');
      expect(secondPanel.textContent).toContain('temperature');
    });
  },
};
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
                  name: 'Pump 21PT1019',
                  building: 'A',
                  status: 'online',
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
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toolButtons = await canvas.findAllByRole('button');
    await expect(toolButtons.length).toBe(1);
    await expect(toolButtons[0]).toHaveTextContent('Look up asset details');
    const singleToolButton = toolButtons[0];
    if (!singleToolButton.hasAttribute('data-panel-open')) {
      await userEvent.click(singleToolButton);
    }
    await waitFor(() => {
      const panelId = singleToolButton.getAttribute('aria-controls');
      const panel = panelId ? document.getElementById(panelId) : null;
      expect(singleToolButton).toHaveAttribute('data-panel-open');
      expect(panel).toBeTruthy();
      if (!panel) {
        return;
      }
      expect(within(panel).getByText('Parameters')).toBeVisible();
      expect(within(panel).getByText('Result')).toBeVisible();
      expect(panel.textContent).toContain('assetId');
      expect(panel.textContent).toContain('Pump 21PT1019');
    });
  },
};
export const ToolWithError: Story = {
  render: () => (
    <Reasoning>
      <ReasoningHeader />
      <ReasoningContent>
        <ReasoningItem>
          <Tool>
            <ToolHeader title="Query database" type="tool-call" hasError />
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
                  cacheKey: 'building-z-assets',
                }}
              />
              <ToolOutput
                output={{
                  cached: true,
                  age: '5 minutes',
                  data: {
                    assets: [],
                    total: 0,
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
    order: 3,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toolButtons = await canvas.findAllByRole('button');
    await expect(toolButtons.length).toBe(2);
    if (!toolButtons[0].hasAttribute('data-panel-open')) {
      await userEvent.click(toolButtons[0]);
    }
    await waitFor(() => {
      expect(canvas.getByText('Error')).toBeVisible();
      expect(canvas.getByText(/Database connection timeout/)).toBeVisible();
    });
    if (!toolButtons[1].hasAttribute('data-panel-open')) {
      await userEvent.click(toolButtons[1]);
    }
    await waitFor(() => {
      expect(canvas.getAllByText('Result').length).toBeGreaterThanOrEqual(1);
      expect(canvasElement.textContent).toContain('cached');
    });
  },
};
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
                  source: 'sensor-database',
                  query: 'SELECT * FROM readings WHERE asset_id = 1',
                }}
              />
              <ToolOutput
                output={{
                  success: true,
                  processedRecords: 100,
                  duration: '0.5s',
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
                  format: 'time-series',
                  aggregation: 'hourly-mean',
                }}
              />
              <ToolOutput
                output={{
                  success: true,
                  processedRecords: 200,
                  duration: '1.0s',
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
                  algorithm: 'isolation-forest',
                  threshold: 0.95,
                }}
              />
              <ToolOutput
                output={{
                  success: true,
                  processedRecords: 300,
                  duration: '1.5s',
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
                  eventTypes: ['maintenance', 'alarm', 'shutdown'],
                  windowSize: '24h',
                }}
              />
              <ToolOutput
                output={{
                  success: true,
                  processedRecords: 400,
                  duration: '2.0s',
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
                  reportType: 'health-assessment',
                  includeCharts: true,
                }}
              />
              <ToolOutput
                output={{
                  success: true,
                  processedRecords: 500,
                  duration: '2.5s',
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
                  channels: ['email', 'slack'],
                  priority: 'high',
                }}
              />
              <ToolOutput
                output={{
                  success: true,
                  processedRecords: 600,
                  duration: '3.0s',
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
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toolButtons = await canvas.findAllByRole('button');
    await expect(toolButtons.length).toBe(6);
    await expect(
      canvas.getByText('Complex Analysis Workflow')
    ).toBeInTheDocument();
    if (!toolButtons[0].hasAttribute('data-panel-open')) {
      await userEvent.click(toolButtons[0]);
    }
    if (!toolButtons[2].hasAttribute('data-panel-open')) {
      await userEvent.click(toolButtons[2]);
    }
    if (!toolButtons[5].hasAttribute('data-panel-open')) {
      await userEvent.click(toolButtons[5]);
    }
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('sensor-database');
      expect(canvasElement.textContent).toContain('isolation-forest');
      expect(canvasElement.textContent).toContain('slack');
    });
  },
};
export const LongContent: Story = {
  render: () => (
    <Reasoning>
      <ReasoningHeader />
      <ReasoningContent>
        <ReasoningItem>
          <Tool>
            <ToolHeader
              title="Fetch detailed sensor readings"
              type="tool-call"
            />
            <ToolContent>
              <ToolInput
                input={{
                  assetId: 1,
                  metrics: [
                    'vibration',
                    'temperature',
                    'pressure',
                    'flow_rate',
                    'power_consumption',
                  ],
                  timeRange: '7d',
                  granularity: '1h',
                }}
              />
              <ToolOutput
                output={{
                  readings: [
                    {
                      timestamp: '2026-01-15T08:00:00Z',
                      vibration: '2.31',
                      temperature: '67.4',
                      pressure: '158.2',
                      flow_rate: '48.7',
                      power_consumption: '13.45',
                    },
                    {
                      timestamp: '2026-01-16T12:00:00Z',
                      vibration: '2.18',
                      temperature: '71.2',
                      pressure: '162.5',
                      flow_rate: '51.3',
                      power_consumption: '14.22',
                    },
                    {
                      timestamp: '2026-01-17T16:00:00Z',
                      vibration: '2.45',
                      temperature: '69.8',
                      pressure: '155.1',
                      flow_rate: '46.9',
                      power_consumption: '12.87',
                    },
                    {
                      timestamp: '2026-01-18T20:00:00Z',
                      vibration: '2.07',
                      temperature: '73.6',
                      pressure: '167.3',
                      flow_rate: '52.1',
                      power_consumption: '14.91',
                    },
                    {
                      timestamp: '2026-01-19T04:00:00Z',
                      vibration: '2.39',
                      temperature: '65.9',
                      pressure: '151.8',
                      flow_rate: '47.5',
                      power_consumption: '13.10',
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
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toolButton = await canvas.findByRole('button');
    if (!toolButton.hasAttribute('data-panel-open')) {
      await userEvent.click(toolButton);
    }
    await waitFor(() => {
      expect(canvasElement.textContent).toContain('readings');
      expect(canvasElement.textContent).toContain('total_readings');
      expect(canvasElement.textContent).toContain('2026-01-15T08:00:00Z');
      expect(canvasElement.textContent).toContain('anomalies_detected');
    });
  },
};
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
                <ToolInput
                  input={{
                    source: 'database',
                  }}
                />
                <ToolOutput
                  output={{
                    records: 1000,
                  }}
                  errorText={undefined}
                />
              </ToolContent>
            </Tool>
          </ReasoningItem>
        </ReasoningContent>
      </Reasoning>

      <Reasoning>
        <ReasoningHeader>
          <span className="flex items-center gap-2">
            <span>Processing</span>
            <span className="text-xs bg-muted px-1.5 py-0.5 rounded">
              3 steps
            </span>
          </span>
        </ReasoningHeader>
        <ReasoningContent>
          <ReasoningItem>
            <Tool>
              <ToolHeader title="Transform data" type="tool-call" />
              <ToolContent>
                <ToolInput
                  input={{
                    format: 'json',
                  }}
                />
                <ToolOutput
                  output={{
                    success: true,
                  }}
                  errorText={undefined}
                />
              </ToolContent>
            </Tool>
          </ReasoningItem>
        </ReasoningContent>
      </Reasoning>
    </div>
  ),
  parameters: {
    order: 6,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('Data Pipeline Execution')).toBeInTheDocument();
    expect(canvas.getByText('Processing')).toBeInTheDocument();
    expect(canvas.getByText('3 steps')).toBeInTheDocument();
    const toolButtons = await canvas.findAllByRole('button');
    expect(toolButtons).toHaveLength(2);
    if (!toolButtons[0].hasAttribute('data-panel-open')) {
      await userEvent.click(toolButtons[0]);
    }
    await waitFor(() => {
      expect(canvas.getAllByText('Parameters')[0]).toBeVisible();
    });
    if (!toolButtons[1].hasAttribute('data-panel-open')) {
      await userEvent.click(toolButtons[1]);
    }
    await waitFor(() => {
      expect(canvas.getAllByText('Parameters')[1]).toBeVisible();
    });
  },
};
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
                  services: ['api', 'database', 'cache'],
                }}
              />
              <ToolOutput
                output={{
                  api: 'healthy',
                  database: 'healthy',
                  cache: 'healthy',
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
                  level: 'comprehensive',
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
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toolButtons = await canvas.findAllByRole('button');
    await expect(toolButtons[0]).toHaveAccessibleName('Check system status');
    await expect(toolButtons[1]).toHaveAccessibleName('Run diagnostics');
    toolButtons[0].focus();
    await expect(toolButtons[0]).toHaveFocus();
    if (!toolButtons[0].hasAttribute('data-panel-open')) {
      await userEvent.keyboard('{Enter}');
    }
    await waitFor(() => {
      expect(canvas.getAllByText('Parameters').length).toBeGreaterThanOrEqual(
        1
      );
      expect(canvasElement.textContent).toContain('api');
    });
    toolButtons[1].focus();
    await expect(toolButtons[1]).toHaveFocus();
    if (!toolButtons[1].hasAttribute('data-panel-open')) {
      await userEvent.keyboard(' ');
    }
    await waitFor(() => {
      expect(canvas.getAllByText('Parameters').length).toBeGreaterThanOrEqual(
        2
      );
      expect(canvasElement.textContent).toContain('comprehensive');
    });
  },
};
export const VisualRegression: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">
          Single Tool
        </h3>
        <Reasoning>
          <ReasoningHeader />
          <ReasoningContent>
            <ReasoningItem>
              <Tool>
                <ToolHeader title="Single tool call" type="tool-call" />
                <ToolContent>
                  <ToolInput
                    input={{
                      test: true,
                    }}
                  />
                  <ToolOutput
                    output={{
                      result: 'success',
                    }}
                    errorText={undefined}
                  />
                </ToolContent>
              </Tool>
            </ReasoningItem>
          </ReasoningContent>
        </Reasoning>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">
          Multiple Tools
        </h3>
        <Reasoning>
          <ReasoningHeader />
          <ReasoningContent>
            <ReasoningItem>
              <Tool>
                <ToolHeader title="First tool" type="tool-call" />
                <ToolContent>
                  <ToolInput
                    input={{
                      step: 1,
                    }}
                  />
                  <ToolOutput
                    output={{
                      done: true,
                    }}
                    errorText={undefined}
                  />
                </ToolContent>
              </Tool>
            </ReasoningItem>
            <ReasoningItem>
              <Tool>
                <ToolHeader title="Second tool" type="tool-call" />
                <ToolContent>
                  <ToolInput
                    input={{
                      step: 2,
                    }}
                  />
                  <ToolOutput
                    output={{
                      done: true,
                    }}
                    errorText={undefined}
                  />
                </ToolContent>
              </Tool>
            </ReasoningItem>
          </ReasoningContent>
        </Reasoning>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">
          With Error
        </h3>
        <Reasoning>
          <ReasoningHeader />
          <ReasoningContent>
            <ReasoningItem>
              <Tool>
                <ToolHeader title="Failed tool" type="tool-call" hasError />
                <ToolContent>
                  <ToolInput
                    input={{
                      test: true,
                    }}
                  />
                  <ToolOutput
                    output={undefined}
                    errorText="Connection failed"
                  />
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
    chromatic: {
      disableSnapshot: false,
    },
  },
};
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
                  message: 'Try customizing this example',
                }}
              />
              <ToolOutput
                output={{
                  status: 'ready',
                  message: 'Modify the args to experiment',
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
  },
};
