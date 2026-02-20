/**
 * Aura Typography System
 *
 * This file contains the canonical typography scale for the Aura design system.
 * It exports structured data for LLM consumption, utility functions, and
 * common composition patterns.
 *
 * Font families:
 * - Inter: Primary text (body, UI elements)
 * - Space Grotesk: Marketing/display text
 * - Source Code Pro: Code blocks
 */

// Typography scale - the single source of truth for Aura typography
export const typographyScale = [
  {
    section: 'Text',
    name: 'xxs/normal',
    fontFamily: 'Inter',
    fontWeight: 'Regular',
    fontSize: '10px',
    lineHeight: '12px',
    usage: 'metadata; short labels',
    tailwindClass: 'text-2xs font-normal',
  },
  {
    section: 'Text',
    name: 'xxs/medium',
    fontFamily: 'Inter',
    fontWeight: 'Medium',
    fontSize: '10px',
    lineHeight: '12px',
    usage: 'metadata; short labels; emphasis',
    tailwindClass: 'text-2xs font-medium',
  },
  {
    section: 'Text',
    name: 'xs/normal',
    fontFamily: 'Inter',
    fontWeight: 'Regular',
    fontSize: '12px',
    lineHeight: '14px',
    usage: 'charting labels',
    tailwindClass: 'text-xs font-normal',
  },
  {
    section: 'Text',
    name: 'xs/medium',
    fontFamily: 'Inter',
    fontWeight: 'Medium',
    fontSize: '12px',
    lineHeight: '14px',
    usage: 'charting labels; emphasis',
    tailwindClass: 'text-xs font-medium',
  },
  {
    section: 'Text',
    name: 'sm/normal',
    fontFamily: 'Inter',
    fontWeight: 'Regular',
    fontSize: '14px',
    lineHeight: '18px',
    usage: 'secondary text; short labels',
    tailwindClass: 'text-sm font-normal',
  },
  {
    section: 'Text',
    name: 'sm/medium',
    fontFamily: 'Inter',
    fontWeight: 'Medium',
    fontSize: '14px',
    lineHeight: '18px',
    usage: 'secondary text; short labels; emphasis',
    tailwindClass: 'text-sm font-medium',
  },
  {
    section: 'Text',
    name: 'base/normal',
    fontFamily: 'Inter',
    fontWeight: 'Regular',
    fontSize: '16px',
    lineHeight: '20px',
    usage: 'default body text',
    tailwindClass: 'text-base font-normal',
  },
  {
    section: 'Text',
    name: 'base/medium',
    fontFamily: 'Inter',
    fontWeight: 'Medium',
    fontSize: '16px',
    lineHeight: '20px',
    usage: 'default body text; emphasis',
    tailwindClass: 'text-base font-medium',
  },
  {
    section: 'Text',
    name: 'lg/normal',
    fontFamily: 'Inter',
    fontWeight: 'Regular',
    fontSize: '18px',
    lineHeight: '24px',
    usage: 'headers; subtitles; labels',
    tailwindClass: 'text-lg font-normal',
  },
  {
    section: 'Text',
    name: 'lg/medium',
    fontFamily: 'Inter',
    fontWeight: 'Medium',
    fontSize: '18px',
    lineHeight: '24px',
    usage: 'headers; subtitles; labels; emphasis',
    tailwindClass: 'text-lg font-medium',
  },
  {
    section: 'Text',
    name: 'xl/normal',
    fontFamily: 'Inter',
    fontWeight: 'Regular',
    fontSize: '20px',
    lineHeight: '24px',
    usage: 'headers; subtitles; labels',
    tailwindClass: 'text-xl font-normal',
  },
  {
    section: 'Text',
    name: 'xl/medium',
    fontFamily: 'Inter',
    fontWeight: 'Medium',
    fontSize: '20px',
    lineHeight: '24px',
    usage: 'headers; subtitles; labels; emphasis',
    tailwindClass: 'text-xl font-medium',
  },
  {
    section: 'Text',
    name: '2xl/normal',
    fontFamily: 'Inter',
    fontWeight: 'Regular',
    fontSize: '24px',
    lineHeight: '28px',
    usage: 'headers; subtitles; labels',
    tailwindClass: 'text-2xl font-normal',
  },
  {
    section: 'Text',
    name: '2xl/medium',
    fontFamily: 'Inter',
    fontWeight: 'Medium',
    fontSize: '24px',
    lineHeight: '28px',
    usage: 'headers; subtitles; labels; emphasis',
    tailwindClass: 'text-2xl font-medium',
  },
  {
    section: 'Marketing',
    name: '2xl/medium',
    fontFamily: 'Space Grotesk',
    fontWeight: 'Medium',
    fontSize: '24px',
    lineHeight: '28px',
    usage: 'marketing headers; onboarding, sign-in; emphasis',
    tailwindClass: 'font-marketing text-2xl font-medium',
  },
  {
    section: 'Text',
    name: '3xl/normal',
    fontFamily: 'Inter',
    fontWeight: 'Regular',
    fontSize: '28px',
    lineHeight: '32px',
    usage: 'headers; subtitles; labels',
    tailwindClass: 'text-3xl font-normal',
  },
  {
    section: 'Text',
    name: '3xl/medium',
    fontFamily: 'Inter',
    fontWeight: 'Medium',
    fontSize: '28px',
    lineHeight: '32px',
    usage: 'headers; subtitles; labels; emphasis',
    tailwindClass: 'text-3xl font-medium',
  },
  {
    section: 'Marketing',
    name: '3xl/medium',
    fontFamily: 'Space Grotesk',
    fontWeight: 'Medium',
    fontSize: '28px',
    lineHeight: '32px',
    usage: 'marketing headers; onboarding, sign-in; emphasis',
    tailwindClass: 'font-marketing text-3xl font-medium',
  },
  {
    section: 'Text',
    name: '4xl/normal',
    fontFamily: 'Inter',
    fontWeight: 'Regular',
    fontSize: '32px',
    lineHeight: '40px',
    usage: 'headers; subtitles; labels',
    tailwindClass: 'text-4xl font-normal',
  },
  {
    section: 'Text',
    name: '4xl/medium',
    fontFamily: 'Inter',
    fontWeight: 'Medium',
    fontSize: '32px',
    lineHeight: '40px',
    usage: 'headers; subtitles; labels; emphasis',
    tailwindClass: 'text-4xl font-medium',
  },
  {
    section: 'Marketing',
    name: '4xl/bold',
    fontFamily: 'Space Grotesk',
    fontWeight: 'Bold',
    fontSize: '32px',
    lineHeight: '40px',
    usage: 'marketing headers; onboarding, sign-in; emphasis',
    tailwindClass: 'font-marketing text-4xl font-bold',
  },
  {
    section: 'Text',
    name: '5xl/normal',
    fontFamily: 'Inter',
    fontWeight: 'Regular',
    fontSize: '36px',
    lineHeight: '44px',
    usage: 'headers; subtitles; labels',
    tailwindClass: 'text-5xl font-normal',
  },
  {
    section: 'Text',
    name: '5xl/medium',
    fontFamily: 'Inter',
    fontWeight: 'Medium',
    fontSize: '36px',
    lineHeight: '44px',
    usage: 'headers; subtitles; labels; emphasis',
    tailwindClass: 'text-5xl font-medium',
  },
  {
    section: 'Marketing',
    name: '5xl/bold',
    fontFamily: 'Space Grotesk',
    fontWeight: 'Bold',
    fontSize: '36px',
    lineHeight: '44px',
    usage: 'marketing headers; onboarding, sign-in; short headers emphasis',
    tailwindClass: 'font-marketing text-5xl font-bold',
  },
  {
    section: 'Code',
    name: 'sm',
    fontFamily: 'Source Code Pro',
    fontWeight: 'Medium',
    fontSize: '14px',
    lineHeight: '18px',
    usage: 'code examples',
    tailwindClass: 'font-mono text-sm font-medium',
  },
  {
    section: 'Code',
    name: 'md',
    fontFamily: 'Source Code Pro',
    fontWeight: 'Medium',
    fontSize: '16px',
    lineHeight: '20px',
    usage: 'code examples',
    tailwindClass: 'font-mono text-base font-medium',
  },
  {
    section: 'Code',
    name: 'lg',
    fontFamily: 'Source Code Pro',
    fontWeight: 'Medium',
    fontSize: '18px',
    lineHeight: '24px',
    usage: 'code examples',
    tailwindClass: 'font-mono text-lg font-medium',
  },
] as const;

export type TypographySection = 'Text' | 'Marketing' | 'Code';
export type TypographyItem = (typeof typographyScale)[number];

/**
 * Get all typography items for a specific section
 */
export function getTypographyBySection(
  section: TypographySection
): TypographyItem[] {
  return typographyScale.filter((t) => t.section === section);
}

/**
 * Find a typography item by name and optional section
 */
export function findTypography(
  name: string,
  section?: TypographySection
): TypographyItem | undefined {
  return typographyScale.find(
    (t) => t.name === name && (!section || t.section === section)
  );
}

/**
 * For LLM consumption - typography examples with HTML/JSX code
 */
export const typographyExamples = typographyScale.map((t) => ({
  ...t,
  htmlExample: `<p class="${t.tailwindClass}">The quick brown fox jumps over the lazy dog.</p>`,
  jsxExample: `<p className="${t.tailwindClass}">The quick brown fox jumps over the lazy dog.</p>`,
}));

/**
 * Typography composition patterns
 *
 * These patterns show how to combine typography variants for common UI scenarios.
 * Use these as recipes when building interfaces.
 *
 * ## Important: Semantic-agnostic approach
 *
 * The Aura typography scale (text-xs, text-sm, text-base, etc.) is intentionally
 * decoupled from HTML semantics (h1, h2, p, etc.). This allows flexibility:
 * different contexts require different hierarchies.
 *
 * For example:
 * - In an AI chat response, h1 might be text-xl (modest, subordinate to chat UI)
 * - In a documentation page, h1 might be text-4xl (dominant, primary content)
 * - In a dashboard card, h1 might be text-lg (compact, space-efficient)
 *
 * These patterns document **context-specific** mappings, not universal rules.
 * Choose heading sizes based on your content's hierarchy depth and visual prominence.
 */
export const typographyPatterns = {
  pageHeader: {
    name: 'Page Header',
    description: 'Standard page header with title and subtitle',
    elements: [
      {
        role: 'title',
        class: 'text-4xl font-medium',
        description: 'Main page title',
      },
      {
        role: 'subtitle',
        class: 'text-lg font-normal text-muted-foreground',
        description: 'Supporting description',
      },
    ],
    htmlExample: `<header class="space-y-2">
  <h1 class="text-4xl font-medium">Page Title</h1>
  <p class="text-lg font-normal text-muted-foreground">A brief description of what this page contains.</p>
</header>`,
    jsxExample: `<header className="space-y-2">
  <h1 className="text-4xl font-medium">Page Title</h1>
  <p className="text-lg font-normal text-muted-foreground">A brief description of what this page contains.</p>
</header>`,
  },

  sectionHeader: {
    name: 'Section Header',
    description: 'Section divider with heading and optional description',
    elements: [
      {
        role: 'heading',
        class: 'text-2xl font-medium',
        description: 'Section heading',
      },
      {
        role: 'description',
        class: 'text-sm font-normal text-muted-foreground',
        description: 'Optional section description',
      },
    ],
    htmlExample: `<div class="space-y-1">
  <h2 class="text-2xl font-medium">Section Title</h2>
  <p class="text-sm font-normal text-muted-foreground">Additional context for this section.</p>
</div>`,
    jsxExample: `<div className="space-y-1">
  <h2 className="text-2xl font-medium">Section Title</h2>
  <p className="text-sm font-normal text-muted-foreground">Additional context for this section.</p>
</div>`,
  },

  card: {
    name: 'Card',
    description: 'Card with title, description, and metadata',
    elements: [
      {
        role: 'title',
        class: 'text-lg font-medium',
        description: 'Card title',
      },
      {
        role: 'description',
        class: 'text-sm font-normal text-muted-foreground',
        description: 'Card description',
      },
      {
        role: 'metadata',
        class: 'text-2xs font-normal text-muted-foreground',
        description: 'Timestamps, counts, etc.',
      },
    ],
    htmlExample: `<div class="rounded-lg border border-border p-6 space-y-2">
  <h3 class="text-lg font-medium">Card Title</h3>
  <p class="text-sm font-normal text-muted-foreground">A brief description that explains what this card is about.</p>
  <span class="text-2xs font-normal text-muted-foreground">Updated 3 hours ago</span>
</div>`,
    jsxExample: `<div className="rounded-lg border border-border p-6 space-y-2">
  <h3 className="text-lg font-medium">Card Title</h3>
  <p className="text-sm font-normal text-muted-foreground">A brief description that explains what this card is about.</p>
  <span className="text-2xs font-normal text-muted-foreground">Updated 3 hours ago</span>
</div>`,
  },

  listItem: {
    name: 'List Item',
    description: 'List item with title and secondary text',
    elements: [
      {
        role: 'title',
        class: 'text-base font-medium',
        description: 'Primary text',
      },
      {
        role: 'secondary',
        class: 'text-sm font-normal text-muted-foreground',
        description: 'Supporting text',
      },
    ],
    htmlExample: `<div class="flex flex-col py-3 border-b border-border">
  <span class="text-base font-medium">List Item Title</span>
  <span class="text-sm font-normal text-muted-foreground">Secondary information</span>
</div>`,
    jsxExample: `<div className="flex flex-col py-3 border-b border-border">
  <span className="text-base font-medium">List Item Title</span>
  <span className="text-sm font-normal text-muted-foreground">Secondary information</span>
</div>`,
  },

  formField: {
    name: 'Form Field',
    description: 'Form field with label, input, and helper text',
    elements: [
      {
        role: 'label',
        class: 'text-sm font-medium',
        description: 'Field label',
      },
      {
        role: 'input',
        class: 'text-base font-normal',
        description: 'Input text',
      },
      {
        role: 'helper',
        class: 'text-xs font-normal text-muted-foreground',
        description: 'Helper or error text',
      },
    ],
    htmlExample: `<div class="space-y-1.5">
  <label class="text-sm font-medium">Email address</label>
  <input type="email" class="w-full rounded-md border border-border px-3 py-2 text-base font-normal" placeholder="you@example.com" />
  <p class="text-xs font-normal text-muted-foreground">We'll never share your email with anyone else.</p>
</div>`,
    jsxExample: `<div className="space-y-1.5">
  <label className="text-sm font-medium">Email address</label>
  <input type="email" className="w-full rounded-md border border-border px-3 py-2 text-base font-normal" placeholder="you@example.com" />
  <p className="text-xs font-normal text-muted-foreground">We'll never share your email with anyone else.</p>
</div>`,
  },

  articleBody: {
    name: 'Article Body',
    description: 'Long-form content with headings and paragraphs',
    elements: [
      {
        role: 'h1',
        class: 'text-3xl font-medium',
        description: 'Article title',
      },
      {
        role: 'h2',
        class: 'text-2xl font-medium',
        description: 'Section heading',
      },
      {
        role: 'h3',
        class: 'text-xl font-medium',
        description: 'Subsection heading',
      },
      {
        role: 'body',
        class: 'text-base font-normal',
        description: 'Body paragraphs',
      },
      {
        role: 'caption',
        class: 'text-sm font-normal text-muted-foreground',
        description: 'Image captions, footnotes',
      },
    ],
    htmlExample: `<article class="space-y-4 max-w-prose">
  <h1 class="text-3xl font-medium">Article Title</h1>
  <p class="text-base font-normal">Opening paragraph that introduces the topic. The quick brown fox jumps over the lazy dog.</p>
  <h2 class="text-2xl font-medium">Section Heading</h2>
  <p class="text-base font-normal">Section content continues here with more detailed information.</p>
  <figure>
    <img src="image.jpg" alt="Description" />
    <figcaption class="text-sm font-normal text-muted-foreground">Image caption explaining the visual.</figcaption>
  </figure>
</article>`,
    jsxExample: `<article className="space-y-4 max-w-prose">
  <h1 className="text-3xl font-medium">Article Title</h1>
  <p className="text-base font-normal">Opening paragraph that introduces the topic. The quick brown fox jumps over the lazy dog.</p>
  <h2 className="text-2xl font-medium">Section Heading</h2>
  <p className="text-base font-normal">Section content continues here with more detailed information.</p>
  <figure>
    <img src="image.jpg" alt="Description" />
    <figcaption className="text-sm font-normal text-muted-foreground">Image caption explaining the visual.</figcaption>
  </figure>
</article>`,
  },

  marketingHero: {
    name: 'Marketing Hero',
    description: 'Hero section for marketing pages',
    elements: [
      {
        role: 'headline',
        class: 'font-marketing text-5xl font-bold',
        description: 'Main headline',
      },
      {
        role: 'subheadline',
        class: 'text-xl font-normal text-muted-foreground',
        description: 'Supporting tagline',
      },
    ],
    htmlExample: `<div class="text-center space-y-4 max-w-2xl mx-auto py-16">
  <h1 class="font-marketing text-5xl font-bold">Build faster with Aura</h1>
  <p class="text-xl font-normal text-muted-foreground">A design system that scales with your product and delights your users.</p>
</div>`,
    jsxExample: `<div className="text-center space-y-4 max-w-2xl mx-auto py-16">
  <h1 className="font-marketing text-5xl font-bold">Build faster with Aura</h1>
  <p className="text-xl font-normal text-muted-foreground">A design system that scales with your product and delights your users.</p>
</div>`,
  },

  dataTable: {
    name: 'Data Table',
    description: 'Table with headers and data cells',
    elements: [
      {
        role: 'header',
        class: 'text-xs font-medium uppercase',
        description: 'Column headers',
      },
      { role: 'cell', class: 'text-sm font-normal', description: 'Data cells' },
      {
        role: 'cellSecondary',
        class: 'text-sm font-normal text-muted-foreground',
        description: 'Secondary data',
      },
    ],
    htmlExample: `<table class="w-full">
  <thead>
    <tr class="border-b border-border">
      <th class="text-xs font-medium uppercase text-left py-3">Name</th>
      <th class="text-xs font-medium uppercase text-left py-3">Status</th>
      <th class="text-xs font-medium uppercase text-left py-3">Date</th>
    </tr>
  </thead>
  <tbody>
    <tr class="border-b border-border">
      <td class="text-sm font-normal py-3">Item name</td>
      <td class="text-sm font-normal py-3">Active</td>
      <td class="text-sm font-normal text-muted-foreground py-3">Jan 7, 2026</td>
    </tr>
  </tbody>
</table>`,
    jsxExample: `<table className="w-full">
  <thead>
    <tr className="border-b border-border">
      <th className="text-xs font-medium uppercase text-left py-3">Name</th>
      <th className="text-xs font-medium uppercase text-left py-3">Status</th>
      <th className="text-xs font-medium uppercase text-left py-3">Date</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b border-border">
      <td className="text-sm font-normal py-3">Item name</td>
      <td className="text-sm font-normal py-3">Active</td>
      <td className="text-sm font-normal text-muted-foreground py-3">Jan 7, 2026</td>
    </tr>
  </tbody>
</table>`,
  },

  aiChatResponse: {
    name: 'AI Chat Response',
    description:
      'Typography hierarchy for AI-generated responses within a chat interface. Uses a modest scale appropriate for content that is subordinate to the chat UI. Includes vertical rhythm (margins) for natural reading flow.',
    context:
      'Used by MessageResponse component with Streamdown for markdown rendering',
    elements: [
      {
        role: 'h1',
        class: 'text-xl font-medium tracking-tightest mt-0 mb-2',
        description: 'Top-level heading (0px top, 8px bottom)',
      },
      {
        role: 'h2',
        class: 'text-lg font-medium tracking-tightest mt-4 mb-1',
        description: 'Section heading (16px top, 4px bottom)',
      },
      {
        role: 'h3',
        class: 'text-base font-medium tracking-tighter mt-4 mb-1',
        description: 'Subsection heading (16px top, 4px bottom)',
      },
      {
        role: 'h4',
        class: 'text-sm font-medium tracking-normal mt-2 mb-0',
        description: 'Minor heading (8px top, 0px bottom)',
      },
      {
        role: 'p',
        class: 'text-base font-normal leading-7 tracking-tightest mt-2 mb-3',
        description: 'Body paragraph (8px top, 12px bottom, 28px line-height)',
      },
      {
        role: 'ul',
        class:
          'ml-8.25 mb-3 pt-2 pl-0 pb-0 list-disc text-base font-normal tracking-tightest',
        description: 'Unordered list (12px bottom, 8px top padding)',
      },
      {
        role: 'ol',
        class:
          'ml-8.25 mb-3 pt-2 pl-0 pb-0 list-decimal text-base font-normal tracking-tightest',
        description: 'Ordered list (12px bottom, 8px top padding)',
      },
      {
        role: 'li',
        class: 'py-0',
        description:
          'List item (no vertical padding, spacing controlled by parent)',
      },
      {
        role: 'blockquote',
        class:
          'my-3 pr-2 pl-2 border-l border-l-border text-sm text-muted-foreground font-normal tracking-tight not-italic',
        description: 'Quoted text (12px vertical, left border accent)',
      },
      {
        role: 'hr',
        class: 'my-4 border-border',
        description: 'Horizontal divider (16px vertical)',
      },
      {
        role: 'strong',
        class: 'font-medium',
        description: 'Bold/emphasis text',
      },
      {
        role: 'em',
        class: 'italic',
        description: 'Italic text',
      },
      {
        role: 'a',
        class:
          'text-foreground-link no-underline hover:underline underline-offset-4',
        description: 'Hyperlink',
      },
      {
        role: 'code (inline)',
        class:
          'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
        description: 'Inline code snippet',
      },
    ],
    htmlExample: `<div class="max-w-prose">
  <h2 class="text-lg font-medium tracking-tightest mt-4 mb-1">Using the API</h2>
  <p class="text-base font-normal leading-7 tracking-tightest mt-2 mb-3">
    To get started, you'll need to authenticate with your API key. Here's a quick overview:
  </p>
  <ul class="ml-8.25 mb-3 pt-2 pl-0 pb-0 list-disc text-base font-normal tracking-tightest">
    <li class="py-0">Generate an API key from your dashboard</li>
    <li class="py-0">Include it in the <code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">Authorization</code> header</li>
    <li class="py-0">Make requests to the API endpoint</li>
  </ul>
  <blockquote class="my-3 pr-2 pl-2 border-l border-l-border text-sm text-muted-foreground font-normal tracking-tight not-italic">
    <p class="text-base font-normal leading-7 tracking-tightest mt-2 mb-3">
      Keep your API keys secure and never commit them to version control.
    </p>
  </blockquote>
</div>`,
    jsxExample: `<div className="max-w-prose">
  <h2 className="text-lg font-medium tracking-tightest mt-4 mb-1">Using the API</h2>
  <p className="text-base font-normal leading-7 tracking-tightest mt-2 mb-3">
    To get started, you'll need to authenticate with your API key. Here's a quick overview:
  </p>
  <ul className="ml-8.25 mb-3 pt-2 pl-0 pb-0 list-disc text-base font-normal tracking-tightest">
    <li className="py-0">Generate an API key from your dashboard</li>
    <li className="py-0">Include it in the <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">Authorization</code> header</li>
    <li className="py-0">Make requests to the API endpoint</li>
  </ul>
  <blockquote className="my-3 pr-2 pl-2 border-l border-l-border text-sm text-muted-foreground font-normal tracking-tight not-italic">
    <p className="text-base font-normal leading-7 tracking-tightest mt-2 mb-3">
      Keep your API keys secure and never commit them to version control.
    </p>
  </blockquote>
</div>`,
  },

  documentationPage: {
    name: 'Documentation Page',
    description:
      'Typography hierarchy for standalone documentation or article pages. Uses a larger scale appropriate for primary content that dominates the page.',
    context: 'For full-page documentation, guides, or long-form articles',
    elements: [
      {
        role: 'h1',
        class: 'text-4xl font-medium mt-0 mb-4',
        description: 'Page title (0px top, 16px bottom)',
      },
      {
        role: 'h2',
        class: 'text-2xl font-medium mt-8 mb-2',
        description: 'Major section heading (32px top, 8px bottom)',
      },
      {
        role: 'h3',
        class: 'text-xl font-medium mt-6 mb-2',
        description: 'Subsection heading (24px top, 8px bottom)',
      },
      {
        role: 'h4',
        class: 'text-lg font-medium mt-4 mb-1',
        description: 'Minor heading (16px top, 4px bottom)',
      },
      {
        role: 'p',
        class: 'text-base font-normal leading-7 mt-0 mb-4',
        description: 'Body paragraph (0px top, 16px bottom, 28px line-height)',
      },
      {
        role: 'ul',
        class: 'ml-6 mb-4 list-disc text-base font-normal',
        description: 'Unordered list (16px bottom)',
      },
      {
        role: 'ol',
        class: 'ml-6 mb-4 list-decimal text-base font-normal',
        description: 'Ordered list (16px bottom)',
      },
      {
        role: 'blockquote',
        class:
          'my-4 pl-4 border-l-2 border-l-border text-base text-muted-foreground italic',
        description: 'Quoted text (16px vertical, thicker left border)',
      },
      {
        role: 'code (inline)',
        class:
          'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
        description: 'Inline code snippet',
      },
    ],
    htmlExample: `<article class="max-w-3xl mx-auto py-8">
  <h1 class="text-4xl font-medium mt-0 mb-4">Getting Started</h1>
  <p class="text-base font-normal leading-7 mt-0 mb-4">
    This guide will walk you through the basics of setting up and using our platform.
  </p>

  <h2 class="text-2xl font-medium mt-8 mb-2">Installation</h2>
  <p class="text-base font-normal leading-7 mt-0 mb-4">
    First, install the required dependencies using your package manager:
  </p>
  <ul class="ml-6 mb-4 list-disc text-base font-normal">
    <li>Node.js 18 or higher</li>
    <li>npm or yarn</li>
  </ul>

  <h3 class="text-xl font-medium mt-6 mb-2">Configuration</h3>
  <p class="text-base font-normal leading-7 mt-0 mb-4">
    Create a configuration file in your project root.
  </p>
</article>`,
    jsxExample: `<article className="max-w-3xl mx-auto py-8">
  <h1 className="text-4xl font-medium mt-0 mb-4">Getting Started</h1>
  <p className="text-base font-normal leading-7 mt-0 mb-4">
    This guide will walk you through the basics of setting up and using our platform.
  </p>

  <h2 className="text-2xl font-medium mt-8 mb-2">Installation</h2>
  <p className="text-base font-normal leading-7 mt-0 mb-4">
    First, install the required dependencies using your package manager:
  </p>
  <ul className="ml-6 mb-4 list-disc text-base font-normal">
    <li>Node.js 18 or higher</li>
    <li>npm or yarn</li>
  </ul>

  <h3 className="text-xl font-medium mt-6 mb-2">Configuration</h3>
  <p className="text-base font-normal leading-7 mt-0 mb-4">
    Create a configuration file in your project root.
  </p>
</article>`,
  },
} as const;

export type TypographyPattern = keyof typeof typographyPatterns;
