import {
  Suggestion,
  SuggestionContent,
  SuggestionGroup,
  SuggestionItem,
  SuggestionLabel,
  SuggestionSeparator,
  SuggestionTrigger,
  SuggestionValue,
} from '@/components/ui/cognite/suggestion';
import type { ComponentExamples } from '@/lib/component-examples/types';
import {
  IconActivity,
  IconChartLine,
  IconGauge,
  IconHistory,
} from '@tabler/icons-react';

function BasicSuggestionDemo() {
  const handleSuggestion = (value: string) => {
    console.log('Selected suggestion:', value);
  };

  return (
    <div className="flex flex-wrap gap-2 max-w-[80%]">
      <Suggestion
        suggestion="AI prompt suggestion 1"
        onClick={handleSuggestion}
      />
      <Suggestion
        suggestion="AI prompt suggestion 2"
        onClick={handleSuggestion}
      />
      <Suggestion
        suggestion="AI prompt suggestion 3"
        onClick={handleSuggestion}
      />
    </div>
  );
}

function SelectSuggestionDemo() {
  const handleSuggestion = (value: string) => {
    console.log('Selected suggestion:', value);
    // In a real app, this would send the suggestion to your AI chat
  };

  return (
    <Suggestion onValueChange={handleSuggestion}>
      <SuggestionTrigger>
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
}

function GroupedSuggestionDemo() {
  const handleSuggestion = (value: string) => {
    console.log('Selected suggestion:', value);
  };

  return (
    <Suggestion onValueChange={handleSuggestion}>
      <SuggestionTrigger>
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
}

export const suggestionExamples: ComponentExamples = {
  basic: {
    title: 'Basic Suggestions',
    description: 'Simple button-style suggestions for quick queries',
    component: BasicSuggestionDemo,
    difficulty: 'beginner',
    code: `import { Suggestion } from "@/components/ui/cognite/suggestion"

export function BasicSuggestionDemo() {
  const handleSuggestion = (value: string) => {
    console.log('Selected suggestion:', value)
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Suggestion suggestion="AI prompt suggestion 1" onClick={handleSuggestion} />
      <Suggestion suggestion="AI prompt suggestion 2" onClick={handleSuggestion} />
      <Suggestion suggestion="AI prompt suggestion 3" onClick={handleSuggestion} />
    </div>
  )
}`,
  },
  select: {
    title: 'Select Suggestions',
    description: 'Dropdown-style suggestions with multiple query options',
    component: SelectSuggestionDemo,
    difficulty: 'intermediate',
    code: `import {
  Suggestion,
  SuggestionContent,
  SuggestionItem,
  SuggestionTrigger,
  SuggestionValue,
} from "@/components/ui/cognite/suggestion"
import { IconGauge, IconActivity, IconChartLine } from "@tabler/icons-react"

export function SelectSuggestionDemo() {
  const handleSuggestion = (value: string) => {
    console.log('Selected suggestion:', value)
    // Send to your AI chat
  }

  return (
    <Suggestion onValueChange={handleSuggestion}>
      <SuggestionTrigger>
        <SuggestionValue placeholder="Select a query..." />
      </SuggestionTrigger>
      <SuggestionContent>
        <SuggestionItem icon={<IconGauge />}>
          Show me the pressure on valve 10
        </SuggestionItem>
        <SuggestionItem icon={<IconActivity />}>
          What's the status of pump 3?
        </SuggestionItem>
        <SuggestionItem icon={<IconChartLine />}>
          Display temperature trends for zone A
        </SuggestionItem>
      </SuggestionContent>
    </Suggestion>
  )
}`,
  },
  grouped: {
    title: 'Grouped Suggestions',
    description: 'Organised queries with categories and labels',
    component: GroupedSuggestionDemo,
    difficulty: 'advanced',
    code: `import {
  Suggestion,
  SuggestionContent,
  SuggestionGroup,
  SuggestionItem,
  SuggestionLabel,
  SuggestionSeparator,
  SuggestionTrigger,
  SuggestionValue,
} from "@/components/ui/cognite/suggestion"
import { IconGauge, IconActivity, IconChartLine, IconHistory } from "@tabler/icons-react"

export function GroupedSuggestionDemo() {
  const handleSuggestion = (value: string) => {
    console.log('Selected suggestion:', value)
  }

  return (
    <Suggestion onValueChange={handleSuggestion}>
      <SuggestionTrigger>
        <SuggestionValue placeholder="Choose a query type..." />
      </SuggestionTrigger>
      <SuggestionContent>
        <SuggestionGroup>
          <SuggestionLabel>Equipment Status</SuggestionLabel>
          <SuggestionItem icon={<IconGauge />}>
            Show me the pressure on valve 10
          </SuggestionItem>
          <SuggestionItem icon={<IconActivity />}>
            What's the current status of pump 3?
          </SuggestionItem>
        </SuggestionGroup>

        <SuggestionSeparator />

        <SuggestionGroup>
          <SuggestionLabel>Historical Data</SuggestionLabel>
          <SuggestionItem icon={<IconChartLine />}>
            Display temperature trends for zone A
          </SuggestionItem>
          <SuggestionItem icon={<IconHistory />}>
            Show me yesterday's flow rates
          </SuggestionItem>
        </SuggestionGroup>
      </SuggestionContent>
    </Suggestion>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const suggestionMeta = {
  name: 'Suggestion',
  description:
    'A dual-mode suggestion component for AI chat interfaces. Use simple button mode for quick queries, or dropdown mode for organised query options.',
  importPath: '@/components/ui/cognite/suggestion',
};
