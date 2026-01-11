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
export function getTypographyBySection(section: TypographySection): TypographyItem[] {
  return typographyScale.filter((t) => t.section === section);
}

/**
 * Find a typography item by name and optional section
 */
export function findTypography(name: string, section?: TypographySection): TypographyItem | undefined {
  return typographyScale.find((t) => t.name === name && (!section || t.section === section));
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
 */
export const typographyPatterns = {
  pageHeader: {
    name: 'Page Header',
    description: 'Standard page header with title and subtitle',
    elements: [
      { role: 'title', class: 'text-4xl font-medium', description: 'Main page title' },
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
      { role: 'heading', class: 'text-2xl font-medium', description: 'Section heading' },
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
      { role: 'title', class: 'text-lg font-medium', description: 'Card title' },
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
      { role: 'title', class: 'text-base font-medium', description: 'Primary text' },
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
      { role: 'label', class: 'text-sm font-medium', description: 'Field label' },
      { role: 'input', class: 'text-base font-normal', description: 'Input text' },
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
      { role: 'h1', class: 'text-3xl font-medium', description: 'Article title' },
      { role: 'h2', class: 'text-2xl font-medium', description: 'Section heading' },
      { role: 'h3', class: 'text-xl font-medium', description: 'Subsection heading' },
      { role: 'body', class: 'text-base font-normal', description: 'Body paragraphs' },
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
      { role: 'headline', class: 'font-marketing text-5xl font-bold', description: 'Main headline' },
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
      { role: 'header', class: 'text-xs font-medium uppercase', description: 'Column headers' },
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
} as const;

export type TypographyPattern = keyof typeof typographyPatterns;

