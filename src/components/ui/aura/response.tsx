'use client';

import { cn } from '@/common/utils';
import { type ComponentProps, memo } from 'react';
import { Streamdown } from 'streamdown';

type ResponseProps = ComponentProps<typeof Streamdown>;

export const Response = memo(
  ({ className, ...props }: ResponseProps) => (
    <Streamdown
      className={cn(
        'size-full',
        // Headings
        '[&_h1]:mt-0 [&_h1]:mb-2 [&_h1]:scroll-m-20 [&_h1]:text-xl [&_h1]:font-medium [&_h1]:tracking-tightest',
        '[&_h2]:mt-4 [&_h2]:mb-1 [&_h2]:scroll-m-20 [&_h2]:text-lg [&_h2]:font-medium [&_h2]:tracking-tightest',
        '[&_h3]:mt-4 [&_h3]:mb-1 [&_h3]:scroll-m-20 [&_h3]:text-base [&_h3]:font-medium [&_h3]:tracking-tighter',
        '[&_h4]:mt-2 [&_h4]:mb-0 [&_h4]:scroll-m-20 [&_h4]:text-sm [&_h4]:font-medium [&_h4]:tracking-normal',
        '[&_h5]:mt-0 [&_h5]:mb-0  [&_h5]:scroll-m-20 [&_h5]:text-xs [&_h5]:font-medium [&_h5]:tracking-tighter',
        '[&_h6]:mt-0 [&_h6]:mb-0 [&_h6]:scroll-m-20 [&_h6]:text-2xs [&_h6]:font-medium [&_h6]:tracking-tighter',
        // Paragraphs and text formatting
        '[&_p]:mt-2 [&_p]:mb-3 [&_p]:leading-7 [&_p]:text-base [&_p]:font-normal [&_p]:tracking-tightest',
        '[&_strong]:font-medium [&_b]:font-medium',
        '[&_em]:italic [&_i]:italic',
        // Lists
        '[&_ul]:ml-8.25 [&_ul]:mb-3 [&_ul]:pt-2 [&_ul]:pl-0 [&_ul]:pb-0 [&_ul]:list-disc [&_ul]:text-base [&_ul]:font-normal [&_ul]:tracking-tightest',
        '[&_ol]:ml-8.25 [&_ol]:mb-3 [&_ol]:pt-2 [&_ol]:pl-0 [&_ol]:pb-0 [&_ol]:list-decimal [&_ol]:text-base [&_ol]:font-normal [&_ol]:tracking-tightest',
        '[&_li]:py-0',
        // Blockquotes and horizontal rules
        '[&_blockquote]:my-3 [&_blockquote]:pr-2 [&_blockquote]:pl-2 [&_blockquote]:border-l [&_blockquote]:border-l-border [&_blockquote]:text-sm [&_blockquote]:text-muted-foreground [&_blockquote]:font-normal [&_blockquote]:tracking-tight [&_blockquote]:not-italic',
        '[&_blockquote_p]:text-sm [&_blockquote_p]:tracking-tight',
        '[&_hr]:my-4 [&_hr]:border-border',
        // Links
        '[&_a]:text-foreground-link [&_a]:hover:underline [&_a]:underline-offset-4',
        // Inline code
        '[&_code]:relative [&_code]:rounded [&_code]:bg-muted [&_code]:px-[0.3rem] [&_code]:py-[0.2rem] [&_code]:font-mono [&_code]:text-sm [&_code]:font-semibold',
        // Code blocks
        '[&_pre]:my-3 [&_pre]:mx-0 [&_pre]:overflow-x-auto [&_pre]:rounded-md [&_pre]:border [&_pre]:bg-card [&_pre]:p-4 [&_pre]:text-foreground [&_pre]:text-sm',
        '[&_pre_code]:static [&_pre_code]:rounded-none [&_pre_code]:bg-transparent [&_pre_code]:px-0 [&_pre_code]:py-0 [&_pre_code]:font-mono [&_pre_code]:text-sm [&_pre_code]:font-normal',
        // Tables
        '[&_table]:my-6 [&_table]:w-full',
        '[&_tr]:m-0 [&_tr]:border-t [&_tr]:p-0 [&_tr]:even:bg-muted',
        '[&_th]:border [&_th]:px-4 [&_th]:py-2 [&_th]:text-left [&_th]:font-bold',
        '[&_td]:border [&_td]:px-4 [&_td]:py-2 [&_td]:text-left',
        className
      )}
      {...props}
    />
  ),
  (prevProps, nextProps) => prevProps.children === nextProps.children
);

Response.displayName = 'Response';
