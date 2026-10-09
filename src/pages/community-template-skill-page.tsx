import { CodeBlock, CodeBlockCopyButton } from '@cognite/aura/components';
import { Link, Navigate, useParams } from 'react-router-dom';

import { MarkdownDoc } from '@/components/documentation/markdown-doc';
import { PageTitle } from '@/components/page-title';
import { getCommunityTemplateBySlug } from '@/lib/community-templates-data';

const FRONT_MATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;

function splitSkillMarkdown(source: string): {
  frontMatter: string | null;
  title: string | null;
  body: string;
} {
  const match = FRONT_MATTER_PATTERN.exec(source);
  if (!match?.[1] || match[2] === undefined) {
    return { frontMatter: null, title: null, body: source };
  }
  const heading = /^\s*# (.+)\n/.exec(match[2]);
  // The page renders its own title, so drop the leading H1.
  return {
    frontMatter: match[1],
    title: heading?.[1]?.trim() ?? null,
    body: match[2].replace(/^\s*# .+\n/, ''),
  };
}

export function CommunityTemplateSkillPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const template = getCommunityTemplateBySlug(slug);

  if (!template?.skill) {
    return <Navigate to={`/community/templates/${slug}`} replace />;
  }

  const { skill } = template;
  const { frontMatter, title, body } = splitSkillMarkdown(skill.markdown);

  return (
    <article className="max-w-[860px]">
      <PageTitle title={`SKILL.md — ${template.name} — Aura`} />
      <header className="mb-10 sm:mb-12">
        <p className="mb-3 text-sm text-muted-fg">
          <Link
            to="/community/templates"
            className="hover:text-foreground hover:underline"
          >
            Overview
          </Link>
          <span className="mx-1.5 text-medium-fg">/</span>
          <Link
            to={`/community/templates/${slug}`}
            className="hover:text-foreground hover:underline"
          >
            {template.name}
          </Link>
          <span className="mx-1.5 text-medium-fg">/</span>
          <span>SKILL.md</span>
        </p>
        <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
          {title ?? template.name}
        </h1>
        <p className="mt-3 max-w-[60ch] text-muted-fg">
          An agent skill that ships with the {template.name} registry item. It
          installs to{' '}
          <code className="text-foreground">{skill.installPath}</code>.
        </p>
      </header>

      {frontMatter && (
        <div className="mb-10">
          <CodeBlock code={skill.markdown} language="md" collapsed>
            <CodeBlockCopyButton />
          </CodeBlock>
        </div>
      )}

      <MarkdownDoc markdown={body} />
    </article>
  );
}
