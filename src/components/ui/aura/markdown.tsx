import * as React from 'react';
import { cn } from '@/common/utils';

export interface MarkdownProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

/**
 * Markdown wrapper component for styling HTML rendered from markdown parsers.
 *
 * Use this when rendering LLM-generated markdown that has been converted to HTML
 * by markdown parsers like remark, marked, etc.
 *
 * @example
 * ```tsx
 * import { Markdown } from '@/components/ui/aura/markdown';
 *
 * // LLM generates: "# Title\n## Section\nParagraph"
 * // Parser converts to HTML
 * const htmlContent = markdownParser(llmMarkdown);
 *
 * // Wrap the HTML with Markdown component
 * <Markdown dangerouslySetInnerHTML={{ __html: htmlContent }} />
 *
 * // Or wrap raw HTML elements
 * <Markdown>
 *   <h1>Title</h1>
 *   <p>Content</p>
 * </Markdown>
 * ```
 */
const Markdown = React.forwardRef<HTMLDivElement, MarkdownProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'markdown',
          // Scope styles to HTML elements when rendering raw markdown
          '[&_h1]:mb-2 [&_h1]:scroll-m-20 [&_h1]:text-5xl [&_h1]:font-bold [&_h1]:tracking-tight',
          '[&_h2]:mt-4 [&_h2]:mb-2 [&_h2]:scroll-m-20 [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:tracking-tight',
          '[&_h3]:mt-4 [&_h3]:mb-1 [&_h3]:scroll-m-20 [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:tracking-tight',
          '[&_h4]:mt-2 [&_h4]:scroll-m-20 [&_h4]:text-xl [&_h4]:font-medium [&_h4]:tracking-tight',
          '[&_h5]:scroll-m-20 [&_h5]:text-lg [&_h5]:font-medium [&_h5]:tracking-tight',
          '[&_h6]:scroll-m-20 [&_h6]:text-base [&_h6]:font-medium [&_h6]:tracking-tight',
          '[&_p]:mt-2 [&_p]:mb-3 [&_p]:leading-7',
          '[&_strong]:font-bold [&_b]:font-bold',
          '[&_em]:italic [&_i]:italic',
          '[&_ul]:ml-2 [&_ul]:my-2 [&_ul]:list-disc',
          '[&_ol]:ml-2 [&_ol]:my-2 [&_ol]:list-decimal',
          '[&_li]:mt-2',
          '[&_blockquote]:mt-6 [&_blockquote]:border-l-2 [&_blockquote]:pl-6 [&_blockquote]:italic',
          '[&_hr]:my-8 [&_hr]:border-border',
          '[&_a]:text-foreground-link [&_a]:hover:underline [&_a]:underline-offset-4',
          '[&_code]:relative [&_code]:rounded [&_code]:bg-muted [&_code]:px-[0.3rem] [&_code]:py-[0.2rem] [&_code]:font-mono [&_code]:text-sm [&_code]:font-semibold',
          '[&_pre]:mb-4 [&_pre]:mt-6 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:border [&_pre]:bg-muted [&_pre]:p-4',
          '[&_table]:my-6 [&_table]:w-full',
          '[&_tr]:m-0 [&_tr]:border-t [&_tr]:p-0 [&_tr]:even:bg-muted',
          '[&_th]:border [&_th]:px-4 [&_th]:py-2 [&_th]:text-left [&_th]:font-bold',
          '[&_td]:border [&_td]:px-4 [&_td]:py-2 [&_td]:text-left',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Markdown.displayName = 'Markdown';

export { Markdown };
