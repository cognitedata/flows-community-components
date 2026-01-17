import { Progress } from '@/components/ui/aura/progress';
import { Label } from '@/components/ui/aura/label';
import type { ComponentExamples } from '@/lib/component-examples/types';

function BasicDemo() {
  return (
    <div className="w-full flex flex-col gap-1">
      <Label>Files uploaded</Label>
      <div className="w-[394px] flex items-center justify-between gap-2">
        <Progress value={30} />
        <span className="text-muted-foreground text-sm leading-4.5 tracking-tight">
          30%
        </span>
      </div>
    </div>
  );
}

export const progressExamples: ComponentExamples = {
  basic: {
    title: 'Progress Examples',
    description: 'Progress bars showing different completion states',
    component: BasicDemo,
    difficulty: 'beginner',
    code: `import { Progress } from "@/components/ui/aura/progress"

export function BasicDemo() {
  return (
    <div className="space-y-4 max-w-md">
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>25% Complete</span>
          <span className="text-muted-foreground">25%</span>
        </div>
        <Progress value={25} />
      </div>
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>50% Complete</span>
          <span className="text-muted-foreground">50%</span>
        </div>
        <Progress value={50} />
      </div>
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>75% Complete</span>
          <span className="text-muted-foreground">75%</span>
        </div>
        <Progress value={75} />
      </div>
    </div>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const progressMeta = {
  name: 'Progress',
  description:
    'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
  llmUsage:
    'When asked for a progress bar, use `<Progress>` to show task completion or loading states.',
  importPath: '@/components/ui/aura/progress',
};
