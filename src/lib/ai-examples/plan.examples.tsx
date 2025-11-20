import {
  Plan,
  PlanHeader,
  PlanTitle,
  PlanDescription,
  PlanTrigger,
  PlanContent,
} from '@/components/ui/cognite/plan';
import type { ComponentExamples } from '@/lib/component-examples/types';

function BasicPlanDemo() {
  return (
    <Plan isStreaming={false}>
      <PlanHeader>
        <div>
          <PlanTitle>Implementation Plan</PlanTitle>
          <PlanDescription>Steps to implement the new feature</PlanDescription>
        </div>
        <PlanTrigger />
      </PlanHeader>
      <PlanContent>
        <ul className="list-disc space-y-2 pl-6 text-sm">
          <li>Analyse requirements</li>
          <li>Design system architecture</li>
          <li>Implement core functionality</li>
          <li>Add tests</li>
          <li>Deploy to production</li>
        </ul>
      </PlanContent>
    </Plan>
  );
}

function StreamingPlanDemo() {
  return (
    <Plan isStreaming={true}>
      <PlanHeader>
        <div>
          <PlanTitle>Breaking Changes Analysis</PlanTitle>
          <PlanDescription>Analysing impact of recent changes</PlanDescription>
        </div>
        <PlanTrigger />
      </PlanHeader>
      <PlanContent>
        <p className="text-sm text-muted-foreground">Streaming content...</p>
      </PlanContent>
    </Plan>
  );
}

export const planExamples: ComponentExamples = {
  basic: {
    title: 'Basic Plan',
    description: 'A collapsible plan card with streaming support',
    component: BasicPlanDemo,
    difficulty: 'beginner',
    code: `import {
  Plan,
  PlanHeader,
  PlanTitle,
  PlanDescription,
  PlanTrigger,
  PlanContent,
} from "@/components/ai-elements/cognite/plan"

export function BasicPlanDemo() {
  return (
    <Plan isStreaming={false}>
      <PlanHeader>
        <div>
          <PlanTitle>Implementation Plan</PlanTitle>
          <PlanDescription>
            Steps to implement the new feature
          </PlanDescription>
        </div>
        <PlanTrigger />
      </PlanHeader>
      <PlanContent>
        <p>Plan content here</p>
      </PlanContent>
    </Plan>
  )
}`,
  },

  streaming: {
    title: 'Streaming Plan',
    description: 'Plan with animated shimmer during streaming',
    component: StreamingPlanDemo,
    difficulty: 'intermediate',
    code: `import {
  Plan,
  PlanHeader,
  PlanTitle,
  PlanDescription,
  PlanContent,
} from "@/components/ai-elements/cognite/plan"

export function StreamingPlanDemo() {
  return (
    <Plan isStreaming={true}>
      <PlanHeader>
        <div>
          <PlanTitle>Analysis Plan</PlanTitle>
          <PlanDescription>Analysing data...</PlanDescription>
        </div>
      </PlanHeader>
      <PlanContent>
        <p>Streaming content...</p>
      </PlanContent>
    </Plan>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const planMeta = {
  name: 'Plan',
  description:
    'A collapsible plan component for displaying AI-generated execution plans with streaming support and shimmer animations.',
  importPath: '@/components/ai-elements/cognite/plan',
};
