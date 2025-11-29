import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyH5,
  TypographyH6,
  TypographyP,
  TypographyBlockquote,
  TypographyList,
  TypographyOrderedList,
  TypographyListItem,
  TypographyInlineCode,
  TypographyLead,
  TypographyLarge,
  TypographySmall,
  TypographyMuted,
  TypographyHr,
} from '@/components/ui/aura/typography';
import type { ComponentExamples } from './types';

function HeadingsDemo() {
  return (
    <div className="space-y-4">
      <TypographyH1>Heading 1</TypographyH1>
      <TypographyH2>Heading 2</TypographyH2>
      <TypographyH3>Heading 3</TypographyH3>
      <TypographyH4>Heading 4</TypographyH4>
      <TypographyH5>Heading 5</TypographyH5>
      <TypographyH6>Heading 6</TypographyH6>
    </div>
  );
}

function ParagraphsDemo() {
  return (
    <div className="space-y-4">
      <TypographyP>
        This is a standard paragraph using the base typography style. It uses
        the default body text size with regular weight and proper line height
        for optimal readability.
      </TypographyP>
      <TypographyP>
        Multiple paragraphs can be stacked together to create longer form
        content. The spacing and line height ensure comfortable reading
        experience.
      </TypographyP>
    </div>
  );
}

function LeadTextDemo() {
  return (
    <div className="space-y-4">
      <TypographyLead>
        This is lead text, typically used for introductory paragraphs or
        subtitles. It&apos;s larger and lighter in colour than body text.
      </TypographyLead>
      <TypographyP>
        Followed by regular body text that provides additional detail and
        information.
      </TypographyP>
    </div>
  );
}

function ListsDemo() {
  return (
    <div className="space-y-8">
      <div>
        <TypographyH4 className="mb-4">Unordered List</TypographyH4>
        <TypographyList>
          <TypographyListItem>First item in the list</TypographyListItem>
          <TypographyListItem>Second item with more detail</TypographyListItem>
          <TypographyListItem>
            Third item to complete the set
          </TypographyListItem>
        </TypographyList>
      </div>

      <div>
        <TypographyH4 className="mb-4">Ordered List</TypographyH4>
        <TypographyOrderedList>
          <TypographyListItem>First step in the process</TypographyListItem>
          <TypographyListItem>Second step to follow</TypographyListItem>
          <TypographyListItem>Final step to complete</TypographyListItem>
        </TypographyOrderedList>
      </div>
    </div>
  );
}

function BlockquoteDemo() {
  return (
    <div className="space-y-4">
      <TypographyP>
        Here&apos;s an example of using a blockquote to highlight important
        information or quotations:
      </TypographyP>
      <TypographyBlockquote>
        &ldquo;Design is not just what it looks like and feels like. Design is
        how it works.&rdquo; — Steve Jobs
      </TypographyBlockquote>
      <TypographyP>
        Blockquotes are perfect for emphasising key messages or external quotes.
      </TypographyP>
    </div>
  );
}

function InlineElementsDemo() {
  return (
    <div className="space-y-4">
      <TypographyP>
        You can use <TypographyInlineCode>inline code</TypographyInlineCode> to
        highlight technical terms or code snippets within text.
      </TypographyP>
      <TypographyP>
        For example, the <TypographyInlineCode>className</TypographyInlineCode>{' '}
        prop accepts any valid Tailwind CSS classes.
      </TypographyP>
    </div>
  );
}

function TextVariantsDemo() {
  return (
    <div className="space-y-4">
      <TypographyLarge>Large text for emphasis</TypographyLarge>
      <TypographyP>Regular paragraph text</TypographyP>
      <TypographySmall>Small text for metadata or captions</TypographySmall>
      <TypographyMuted>Muted text for secondary information</TypographyMuted>
    </div>
  );
}

function CompleteExampleDemo() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <TypographyH2>Getting Started with Design Systems</TypographyH2>
        <TypographyLead className="mt-2">
          A comprehensive guide to building and maintaining design systems that
          scale.
        </TypographyLead>
      </div>

      <TypographyHr />

      <div className="space-y-4">
        <TypographyH3>What is a Design System?</TypographyH3>
        <TypographyP>
          A design system is a collection of reusable components, guided by
          clear standards, that can be assembled together to build applications.
          It includes the{' '}
          <TypographyInlineCode>Typography</TypographyInlineCode> component
          you&apos;re looking at right now.
        </TypographyP>

        <TypographyBlockquote>
          &ldquo;A design system isn&apos;t a project. It&apos;s a product
          serving products.&rdquo;
        </TypographyBlockquote>

        <TypographyH4>Key Benefits</TypographyH4>
        <TypographyList>
          <TypographyListItem>
            Consistency across all products and platforms
          </TypographyListItem>
          <TypographyListItem>
            Faster development and iteration cycles
          </TypographyListItem>
          <TypographyListItem>
            Improved collaboration between design and engineering
          </TypographyListItem>
          <TypographyListItem>
            Better accessibility and user experience
          </TypographyListItem>
        </TypographyList>

        <TypographyH4>Getting Started</TypographyH4>
        <TypographyOrderedList>
          <TypographyListItem>
            Define your design principles and values
          </TypographyListItem>
          <TypographyListItem>
            Audit existing components and patterns
          </TypographyListItem>
          <TypographyListItem>Build your component library</TypographyListItem>
          <TypographyListItem>
            Document and share with your team
          </TypographyListItem>
        </TypographyOrderedList>

        <TypographyMuted>
          Last updated: November 2024 • 5 min read
        </TypographyMuted>
      </div>
    </div>
  );
}

export const typographyExamples: ComponentExamples = {
  headings: {
    title: 'Headings',
    description: 'Semantic heading elements from H1 to H6',
    component: HeadingsDemo,
    difficulty: 'beginner',
    code: `import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyH5,
  TypographyH6,
} from "@/components/ui/aura/typography"

export function HeadingsDemo() {
  return (
    <div className="space-y-4">
      <TypographyH1>Heading 1</TypographyH1>
      <TypographyH2>Heading 2</TypographyH2>
      <TypographyH3>Heading 3</TypographyH3>
      <TypographyH4>Heading 4</TypographyH4>
      <TypographyH5>Heading 5</TypographyH5>
      <TypographyH6>Heading 6</TypographyH6>
    </div>
  )
}`,
  },

  paragraphs: {
    title: 'Paragraphs',
    description: 'Standard paragraph text with proper spacing',
    component: ParagraphsDemo,
    difficulty: 'beginner',
    code: `import { TypographyP } from "@/components/ui/aura/typography"

export function ParagraphsDemo() {
  return (
    <div className="space-y-4">
      <TypographyP>
        This is a standard paragraph using the base typography style.
      </TypographyP>
      <TypographyP>
        Multiple paragraphs can be stacked together to create longer form content.
      </TypographyP>
    </div>
  )
}`,
  },

  leadText: {
    title: 'Lead Text',
    description: 'Larger introductory text for page headers',
    component: LeadTextDemo,
    difficulty: 'beginner',
    code: `import { TypographyLead, TypographyP } from "@/components/ui/aura/typography"

export function LeadTextDemo() {
  return (
    <div className="space-y-4">
      <TypographyLead>
        This is lead text, typically used for introductory paragraphs.
      </TypographyLead>
      <TypographyP>
        Followed by regular body text.
      </TypographyP>
    </div>
  )
}`,
  },

  lists: {
    title: 'Lists',
    description: 'Ordered and unordered lists with proper styling',
    component: ListsDemo,
    difficulty: 'beginner',
    code: `import {
  TypographyH4,
  TypographyList,
  TypographyOrderedList,
  TypographyListItem,
} from "@/components/ui/aura/typography"

export function ListsDemo() {
  return (
    <div className="space-y-8">
      <div>
        <TypographyH4 className="mb-4">Unordered List</TypographyH4>
        <TypographyList>
          <TypographyListItem>First item</TypographyListItem>
          <TypographyListItem>Second item</TypographyListItem>
          <TypographyListItem>Third item</TypographyListItem>
        </TypographyList>
      </div>

      <div>
        <TypographyH4 className="mb-4">Ordered List</TypographyH4>
        <TypographyOrderedList>
          <TypographyListItem>First step</TypographyListItem>
          <TypographyListItem>Second step</TypographyListItem>
          <TypographyListItem>Final step</TypographyListItem>
        </TypographyOrderedList>
      </div>
    </div>
  )
}`,
  },

  blockquote: {
    title: 'Blockquote',
    description: 'Styled blockquotes for highlighting quotations',
    component: BlockquoteDemo,
    difficulty: 'beginner',
    code: `import {
  TypographyP,
  TypographyBlockquote,
} from "@/components/ui/aura/typography"

export function BlockquoteDemo() {
  return (
    <div className="space-y-4">
      <TypographyP>
        Here's an example of using a blockquote:
      </TypographyP>
      <TypographyBlockquote>
        "Design is not just what it looks like. Design is how it works."
        — Steve Jobs
      </TypographyBlockquote>
    </div>
  )
}`,
  },

  inlineCode: {
    title: 'Inline Code',
    description: 'Inline code snippets within text',
    component: InlineElementsDemo,
    difficulty: 'beginner',
    code: `import {
  TypographyP,
  TypographyInlineCode,
} from "@/components/ui/aura/typography"

export function InlineElementsDemo() {
  return (
    <div className="space-y-4">
      <TypographyP>
        You can use <TypographyInlineCode>inline code</TypographyInlineCode> to
        highlight technical terms.
      </TypographyP>
      <TypographyP>
        For example, the <TypographyInlineCode>className</TypographyInlineCode>
        prop accepts Tailwind CSS classes.
      </TypographyP>
    </div>
  )
}`,
  },

  textVariants: {
    title: 'Text Variants',
    description: 'Different text sizes and styles for various use cases',
    component: TextVariantsDemo,
    difficulty: 'beginner',
    code: `import {
  TypographyLarge,
  TypographyP,
  TypographySmall,
  TypographyMuted,
} from "@/components/ui/aura/typography"

export function TextVariantsDemo() {
  return (
    <div className="space-y-4">
      <TypographyLarge>Large text for emphasis</TypographyLarge>
      <TypographyP>Regular paragraph text</TypographyP>
      <TypographySmall>Small text for metadata</TypographySmall>
      <TypographyMuted>Muted text for secondary info</TypographyMuted>
    </div>
  )
}`,
  },

  complete: {
    title: 'Complete Example',
    description: 'A full page layout using all typography components together',
    component: CompleteExampleDemo,
    difficulty: 'intermediate',
    code: `import {
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyP,
  TypographyLead,
  TypographyList,
  TypographyOrderedList,
  TypographyListItem,
  TypographyBlockquote,
  TypographyInlineCode,
  TypographyMuted,
  TypographyHr,
} from "@/components/ui/aura/typography"

export function CompleteExampleDemo() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <TypographyH2>Getting Started with Design Systems</TypographyH2>
        <TypographyLead className="mt-2">
          A comprehensive guide to building design systems.
        </TypographyLead>
      </div>

      <TypographyHr />

      <div className="space-y-4">
        <TypographyH3>What is a Design System?</TypographyH3>
        <TypographyP>
          A design system is a collection of reusable components...
        </TypographyP>

        <TypographyBlockquote>
          "A design system isn't a project. It's a product serving products."
        </TypographyBlockquote>

        <TypographyH4>Key Benefits</TypographyH4>
        <TypographyList>
          <TypographyListItem>Consistency across products</TypographyListItem>
          <TypographyListItem>Faster development cycles</TypographyListItem>
        </TypographyList>

        <TypographyMuted>Last updated: November 2024</TypographyMuted>
      </div>
    </div>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const typographyMeta = {
  name: 'Typography',
  description:
    'A collection of semantic HTML typography components with consistent styling for headings, paragraphs, lists, blockquotes, and inline elements.',
  llmUsage:
    'When creating content layouts, use Typography components for semantic HTML elements. Use TypographyH1-H6 for headings, TypographyP for paragraphs, TypographyList/TypographyOrderedList for lists, and TypographyInlineCode for code references. These ensure consistent styling across the design system.',
  importPath: '@/components/ui/aura/typography',
};
