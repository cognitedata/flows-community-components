import {
  CodeBlock,
  CodeBlockCollapseButton,
  CodeBlockCopyButton,
} from '@cognite/aura/components';
import auraDesignMd from '@cognite/aura/DESIGN.md?raw';

import { MarkdownDoc } from '@/components/documentation/markdown-doc';
import { ContentSection } from '@/components/foundations/content-primitives';

const GOOGLE_DESIGN_MD_URL = 'https://github.com/google-labs-code/design.md';

const FRONT_MATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;

function splitDesignMarkdown(source: string): {
  frontMatter: string | null;
  body: string;
} {
  const match = FRONT_MATTER_PATTERN.exec(source);
  const frontMatter = match?.[1];
  const body = match?.[2];
  if (frontMatter === undefined || body === undefined) {
    return { frontMatter: null, body: source };
  }
  return { frontMatter, body };
}

const { frontMatter, body } = splitDesignMarkdown(auraDesignMd);

export function DesignMdIntro() {
  return (
    <>
      Google recommends DESIGN.md as the format for describing a visual identity
      to coding agents — YAML tokens for exact values, and markdown prose for
      why those values exist and how to apply them. Read the{' '}
      <a
        href={GOOGLE_DESIGN_MD_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="text-link-fg hover:text-link-fg-hover hover:underline"
      >
        Google DESIGN.md specification
      </a>
      , then use Aura&apos;s file below as the source of truth for this system.
    </>
  );
}

export function DesignMdContent() {
  return (
    <>
      {frontMatter ? (
        <ContentSection title="Tokens">
          <p>
            Machine-readable reference values from the YAML front matter in{' '}
            <code>@cognite/aura</code>. Runtime styling still comes from Aura
            CSS and component APIs — these tokens give agents and humans named
            values and approximate light-theme references.
          </p>
          <CodeBlock code={frontMatter} language="yaml" collapsed>
            <CodeBlockCopyButton />
            <CodeBlockCollapseButton />
          </CodeBlock>
        </ContentSection>
      ) : null}
      <MarkdownDoc markdown={body} />
    </>
  );
}
