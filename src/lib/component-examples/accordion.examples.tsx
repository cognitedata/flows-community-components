import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/aura/accordion';
import type { ComponentExamples, ComponentMeta } from './types';
import { IconInfoCircle, IconBrush, IconClock } from '@tabler/icons-react';

// Basic Accordion Demo
function BasicAccordionDemo() {
  return (
    <Accordion
      type="single"
      defaultValue="item-2"
      collapsible
      className="w-full"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger icon={IconInfoCircle}>
          When should I use single vs. multiple mode?
        </AccordionTrigger>
        <AccordionContent>
          You should use single mode when you want to allow only one section to
          be open at a time.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger icon={IconInfoCircle}>
          Should any sections be open by default?
        </AccordionTrigger>
        <AccordionContent>
          Micro-interactions are events which have one main task — a single
          purpose — and they are found all over your device and within apps.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger icon={IconInfoCircle}>
          Any special considerations for mobile?
        </AccordionTrigger>
        <AccordionContent>
          Yes, you should use the collapsible prop to allow the user to collapse
          the accordion on mobile.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

// Basic Accordion Demo with Icon
function BasicAccordionDemoWithIcon() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger icon={IconInfoCircle}>
          Is it accessible?
        </AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger icon={IconBrush}>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that match your theme.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger icon={IconClock}>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It uses smooth transitions for opening and closing.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

// Multiple Items Open Demo
function MultipleAccordionDemo() {
  return (
    <Accordion type="multiple" className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Section 1</AccordionTrigger>
        <AccordionContent>
          This section can be open at the same time as others.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Section 2</AccordionTrigger>
        <AccordionContent>
          Multiple sections can be expanded simultaneously.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Section 3</AccordionTrigger>
        <AccordionContent>
          Click to expand and collapse independently.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export const accordionExamples: ComponentExamples = {
  basic: {
    title: 'Basic Accordion',
    description:
      'A simple accordion with collapsible sections. Only one item can be open at a time.',
    component: BasicAccordionDemo,
    tags: ['fundamental', 'common'],
    difficulty: 'beginner',
    code: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/aura/accordion"
import { IconInfoCircle } from "@tabler/icons-react"

export function BasicAccordionDemo() {
  return (
    <Accordion type="single" defaultValue="item-2" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger icon={IconInfoCircle}>When should I use single vs. multiple mode?</AccordionTrigger>
        <AccordionContent>
          You should use single mode when you want to allow only one section to be open at a time.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger icon={IconInfoCircle}>Should any sections be open by default?</AccordionTrigger>
        <AccordionContent>
          Micro-interactions are events which have one main task — a single purpose — and they are found all over your device and within apps.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger icon={IconInfoCircle}>Any special considerations for mobile?</AccordionTrigger>
        <AccordionContent>
          Yes, you should use the collapsible prop to allow the user to collapse the accordion on mobile.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}`,
  },

  multiple: {
    title: 'Multiple Items Open',
    description:
      "Allow multiple accordion items to be open simultaneously by setting type to 'multiple'.",
    component: MultipleAccordionDemo,
    tags: ['advanced'],
    difficulty: 'intermediate',
    code: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/aura/accordion"

export function MultipleAccordionDemo() {
  return (
    <Accordion type="multiple" className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Section 1</AccordionTrigger>
        <AccordionContent>
          This section can be open at the same time as others.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Section 2</AccordionTrigger>
        <AccordionContent>
          Multiple sections can be expanded simultaneously.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Section 3</AccordionTrigger>
        <AccordionContent>
          Click to expand and collapse independently.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}`,
  },

  withIcon: {
    title: 'Accordion with Icon',
    description: 'Add an icon to the accordion trigger.',
    component: BasicAccordionDemoWithIcon,
    tags: ['common'],
    difficulty: 'beginner',
    code: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/aura/accordion"
import { IconInfoCircle, IconBrush, IconClock } from "@tabler/icons-react"

export function BasicAccordionDemoWithIcon() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger icon={IconInfoCircle}>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger icon={IconBrush}>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that match your theme.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger icon={IconClock}>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It uses smooth transitions for opening and closing.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const accordionMeta: ComponentMeta = {
  name: 'Accordion',
  description:
    'A collapsible content component that allows users to show and hide sections of related content.',
  llmUsage:
    'When asked for an accordion, use `<Accordion>` with `<AccordionItem>` components for collapsible sections.',
  importPath: '@/components/ui/aura/accordion',
  apiReference: {
    props: [
      {
        name: 'type',
        type: '"single" | "multiple"',
        required: true,
        description:
          'Determines whether one or multiple items can be open at the same time',
      },
      {
        name: 'collapsible',
        type: 'boolean',
        default: 'false',
        description:
          "When type is 'single', allows closing content when clicking trigger of open item",
      },
      {
        name: 'defaultValue',
        type: 'string | string[]',
        description: 'The value of the item(s) to expand by default',
      },
      {
        name: 'value',
        type: 'string | string[]',
        description:
          'The controlled value of the item(s) to expand. Use with onValueChange',
      },
      {
        name: 'onValueChange',
        type: '(value: string | string[]) => void',
        description: 'Callback when the expanded item(s) change',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Disables the entire accordion',
      },
    ],
  },
  relatedComponents: ['Card', 'Tabs'],
  notes: [
    'Built on top of Radix UI Accordion primitive',
    'Fully keyboard accessible with arrow key navigation',
    'Supports both controlled and uncontrolled modes',
  ],
};
