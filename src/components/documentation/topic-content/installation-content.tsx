import { CodeBlock, CodeBlockCopyButton } from '@cognite/aura/components';
import type { ReactNode } from 'react';

import { slugify } from '@/lib/utils';

function FlowsLink({ children }: { children: ReactNode }) {
  return (
    <a
      href="https://docs.cognite.com/cdf/flows"
      target="_blank"
      rel="noopener noreferrer"
      className="text-link-fg hover:text-link-fg-hover hover:underline"
    >
      {children}
    </a>
  );
}

function InstallStep({
  step,
  title,
  children,
}: {
  step: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-12 sm:mb-14">
      <div className="flex items-center gap-3">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-medium-bg text-sm font-medium text-foreground">
          {step}
        </span>
        <h2
          id={slugify(title)}
          className="font-heading text-xl font-semibold tracking-tight sm:text-2xl"
        >
          {title}
        </h2>
      </div>
      <div className="mt-3 max-w-[70ch] space-y-4 text-sm leading-relaxed text-muted-fg">
        {children}
      </div>
    </section>
  );
}

function CommandBlock({ code }: { code: string }) {
  return (
    <CodeBlock code={code} language="bash">
      <CodeBlockCopyButton />
    </CodeBlock>
  );
}

export function InstallationContent() {
  return (
    <>
      <InstallStep step={1} title="First time installation">
        <p>Add Aura to your project with the following command:</p>
        <CommandBlock code="npm add @cognite/aura" />
      </InstallStep>

      <InstallStep step={2} title="Add skills">
        <p>Add the Aura skills to your project with the following command:</p>
        <CommandBlock code="npx @cognite/cli apps skills pull --skill design" />
      </InstallStep>

      <InstallStep step={3} title="Update Aura">
        <p>Update Aura to the latest version with the following command:</p>
        <CommandBlock code="npm update @cognite/aura" />
      </InstallStep>
    </>
  );
}

export function InstallationIntro() {
  return (
    <>
      Aura is installed automatically when setting up your{' '}
      <FlowsLink>Flows custom app</FlowsLink> build, but you can also use Aura
      independently in your project.
    </>
  );
}
