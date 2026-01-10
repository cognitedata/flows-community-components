import { SwapSlot } from '@/components/ui/aura/swap-slot';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/aura/card';
import { Badge } from '@/components/ui/aura/badge';
import type { ComponentExamples } from './types';
import { IconFileText } from '@tabler/icons-react';

function BasicDemo() {
  return (
    <Card className="w-[412px] max-w-md">
      <CardHeader className="p-4 pb-0">
        <CardTitle>Title</CardTitle>
        <CardDescription>Subtitle</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 p-4">
        <p className="text-base tracking-tightest font-normal text-secondary-foreground">
          Description
        </p>
        <SwapSlot className="h-18" />
      </CardContent>
      <CardFooter className="flex gap-2 p-4 pt-0">
        <Badge>Badge</Badge>
        <Badge variant="success">Badge</Badge>
        <Badge variant="sky">Badge</Badge>
      </CardFooter>
    </Card>
  );
}

export const swapSlotExamples: ComponentExamples = {
  basic: {
    title: 'Basic Swap Slot',
    description: 'Swap slot used within a card with custom content',
    component: BasicDemo,
    difficulty: 'beginner',
    code: `import { SwapSlot } from '@/components/ui/aura/swap-slot';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/aura/card';
import { Badge } from '@/components/ui/aura/badge';

function Example() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Title</CardTitle>
        <CardDescription>Subtitle</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground">Description</p>
        <SwapSlot className="flex items-center gap-2 rounded-md border p-4 h-[72px]"></SwapSlot>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Badge>Badge</Badge>
        <Badge variant="success">Badge</Badge>
        <Badge variant="sky">Badge</Badge>
      </CardFooter>
    </Card>
  );
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const swapSlotMeta = {
  name: 'Swap Slot',
  description:
    'A flexible container component that serves as a placeholder for any content. Consumers can slot in any components or content they need.',
  llmUsage:
    'Swap slot is a simple container component that accepts any children and can be styled with className. It provides a flexible slot for designers and developers to insert any content they need.',
  importPath: '@/components/ui/aura/swap-slot',
};
