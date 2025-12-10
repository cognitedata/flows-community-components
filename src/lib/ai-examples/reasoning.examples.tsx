'use client';

import {
  Reasoning,
  ReasoningHeader,
  ReasoningContent,
  ReasoningItem,
} from '@/components/ui/aura/reasoning';
import {
  Tool,
  ToolHeader,
  ToolContent,
  ToolInput,
  ToolOutput,
} from '@/components/ui/aura/tool';
import type { ComponentExamples } from '@/lib/component-examples/types';

function BasicReasoningDemo() {
  return (
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
                    { id: 1, name: 'Pump 21PT1019', building: 'A' },
                    { id: 2, name: 'Pump 21PT1020', building: 'A' },
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
                  vibration: { current: 2.3, average: 1.8, unit: 'mm/s' },
                  temperature: { current: 68, average: 55, unit: '°C' },
                }}
                errorText={undefined}
              />
            </ToolContent>
          </Tool>
        </ReasoningItem>

        <ReasoningItem>
          <Tool>
            <ToolHeader title="Analyse trends" type="tool-call" />
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
  );
}

export const reasoningExamples: ComponentExamples = {
  basic: {
    title: 'Reasoning with Multiple Tools',
    description:
      'A reasoning section with multiple tool calls showing the typical AI workflow',
    component: BasicReasoningDemo,
    difficulty: 'beginner',
    code: `"use client"
import {
  Reasoning,
  ReasoningHeader,
  ReasoningContent,
  ReasoningItem,
} from "@/components/ui/aura/reasoning"
import {
  Tool,
  ToolHeader,
  ToolContent,
  ToolInput,
  ToolOutput,
} from "@/components/ui/aura/tool"

export function BasicReasoningDemo() {
  return (
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
                    { id: 1, name: 'Pump 21PT1019', building: 'A' },
                    { id: 2, name: 'Pump 21PT1020', building: 'A' },
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
                  vibration: { current: 2.3, average: 1.8, unit: 'mm/s' },
                  temperature: { current: 68, average: 55, unit: '°C' },
                }}
                errorText={undefined}
              />
            </ToolContent>
          </Tool>
        </ReasoningItem>

        <ReasoningItem>
          <Tool>
            <ToolHeader title="Analyse trends" type="tool-call" />
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
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const reasoningMeta = {
  name: 'Reasoning',
  description:
    'A container component for displaying AI reasoning steps with connected tool calls, featuring a brain icon and visual connection lines.',
  importPath: '@/components/ui/aura/reasoning',
};
