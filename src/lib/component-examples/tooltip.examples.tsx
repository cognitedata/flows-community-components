import { Button } from '@/components/ui/cognite/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/cognite/tooltip';
import type { ComponentExamples } from './types';

function BasicDemo() {
  return (
    <TooltipProvider>
      <div className="space-y-4">
        <div className="flex justify-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button>Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>
              Publishing will make it available to all users
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">More info</Button>
            </TooltipTrigger>
            <TooltipContent>
              This button does something important
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="destructive">Delete</Button>
            </TooltipTrigger>
            <TooltipContent>
              This action cannot be undone
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}

function VariantsDemo() {
  return (
    <TooltipProvider>
      <div className="flex flex-col items-center justify-center gap-16 min-h-[300px]">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Hover me - Top</Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            This is a helpful message
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Hover me - Right</Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            This is a helpful message
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Hover me - Bottom</Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            This is a helpful message
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Hover me - Left</Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            This is a helpful message
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}

export const tooltipExamples: ComponentExamples = {
  basic: {
    title: 'Tooltip Demo',
    description: 'Interactive contextual help that appears on hover or focus',
    component: BasicDemo,
    difficulty: 'beginner',
    code: `import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/cognite/tooltip"
import { Button } from "@/components/ui/cognite/button"

export function BasicDemo() {
  return (
    <TooltipProvider>
      <div className="space-y-4">
        <div className="flex justify-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button>Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>
              Publishing will make it available to all users
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">More info</Button>
            </TooltipTrigger>
            <TooltipContent>
              This button does something important
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="destructive">Delete</Button>
            </TooltipTrigger>
            <TooltipContent>
              This action cannot be undone
            </TooltipContent>
          </Tooltip>
        </div>
        
        <p className="text-sm text-muted-foreground">
          Hover over buttons to see interactive tooltips with helpful information.
        
      </div>
    </TooltipProvider>
  )
}`,
  },
  positions: {
    title: 'Variants',
    description: 'Tooltips with arrows appearing from all sides',
    component: VariantsDemo,
    difficulty: 'beginner',
    code: `import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/cognite/tooltip"
import { Button } from "@/components/ui/cognite/button"

export function VariantsDemo() {
  return (
    <TooltipProvider>
      <div className="flex flex-col items-center justify-center gap-16 min-h-[300px]">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Hover me - Top</Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            This is a helpful message
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Hover me - Right</Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            This is a helpful message
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Hover me - Bottom</Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            This is a helpful message
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Hover me - Left</Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            This is a helpful message
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const tooltipMeta = {
  name: 'Tooltip',
  description:
    'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
  llmUsage:
    'When asked for a tooltip, use `<Tooltip>` to provide helpful information on hover or focus.',
  importPath: '@/components/ui/cognite/tooltip',
};
