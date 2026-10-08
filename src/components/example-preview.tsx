import { CodeBlock, CodeBlockCopyButton } from '@cognite/aura/components';
import type React from 'react';

import { PackageManagerCommandTabs } from '@/components/community/package-manager-commands';
import { getInstallCommands } from '@/lib/install-snippets';
import { cn } from '@/lib/utils';

interface ExamplePreviewProps {
  title: string;
  description?: string;
  /** Registry item id. Shows that layout's install command. */
  install?: string;
  component: React.ComponentType;
  sourceCode?: string;
}

export function ExamplePreview({
  title,
  description,
  install,
  component: Component,
  sourceCode,
}: ExamplePreviewProps) {
  if (install) {
    return (
      <section className="space-y-4" aria-label={title}>
        <h2 className="font-heading text-2xl font-semibold tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="max-w-[65ch] text-sm leading-relaxed text-muted-fg">
            {description}
          </p>
        )}
        <PackageManagerCommandTabs commands={getInstallCommands(install)} />
        <div className="rounded-lg border p-6">
          <div className="flex w-full min-w-0 items-center justify-center py-4">
            <Component />
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className={cn('space-y-4', sourceCode && 'space-y-0')}>
      <div
        className={cn(
          'p-6 border rounded-lg',
          sourceCode && 'rounded-b-none border-b-0'
        )}
      >
        <h3 className="font-medium mb-2">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
        )}
        <div className="flex w-full min-w-0 items-center justify-center py-4">
          <Component />
        </div>
      </div>
      {sourceCode && (
        <div className="border rounded-lg rounded-t-none overflow-hidden border-t-0">
          <CodeBlock code={sourceCode} language="tsx" className="rounded-none">
            <CodeBlockCopyButton />
          </CodeBlock>
        </div>
      )}
    </div>
  );
}
