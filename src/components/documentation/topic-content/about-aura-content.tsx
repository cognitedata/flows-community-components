import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import {
  ContentSection,
  SubHeading,
  TokenTable,
} from '@/components/foundations/content-primitives';

function DocLink({
  to,
  children,
}: {
  to: string;
  children: ReactNode;
}) {
  return (
    <Link
      to={to}
      className="text-link-fg hover:text-link-fg-hover hover:underline"
    >
      {children}
    </Link>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <span className="font-medium text-foreground">{children}</span>;
}

export const ABOUT_AURA_INTRO =
  'Learn about Aura, Cognite’s AI-native design system. It combines a visual language, component library, and usage conventions teams and agents use to build consistent product UI in Cognite Data Fusion (CDF) and Flows custom apps.';

export function AboutAuraContent() {
  return (
    <>
      <ContentSection title="The AI-native differentiator">
        <p>
          Aura is a design system built for both human consumers and AI agents.
          Beyond components and guidelines, it includes the infrastructure,
          tooling, and structured documentation that enable AI-assisted
          development while ensuring implementations remain consistent with our
          standards.
        </p>
      </ContentSection>

      <ContentSection title={'What “AI-native” means in practice'}>
        <p>
          A traditional design system ships components and documentation in
          isolated environments. Aura ships components, documentation, and a
          layer of structured AI tooling that makes correct implementation the
          path of least resistance for agents and humans — all within the same
          context.
        </p>

        <SubHeading>Skills</SubHeading>
        <p>
          Structured prompt modules for Cursor, Claude, and other AI tools that
          activate automatically when a relevant pattern is detected.{' '}
          <DocLink to="/aura/documentation/designmd">Skills</DocLink> enforce the right
          component, the right token, and the right pattern before any code is
          written.
        </p>

        <SubHeading>DESIGN.md</SubHeading>
        <p>
          A machine-readable source of truth for foundations and primitives.
          Agents can read this file to understand the system’s constraints and
          intent, just as engineers would read documentation. See the{' '}
          <DocLink to="/aura/documentation/designmd">
            Design.md & skills
          </DocLink>{' '}
          page.
        </p>

        <SubHeading>LLM metadata</SubHeading>
        <p>
          Every component carries structured <code>llmUsage</code> metadata:
          when to use the component, when to reach for another primitive, and
          what pairs well with it. This metadata surfaces directly in agent
          context windows.
        </p>

        <SubHeading>MCP server</SubHeading>
        <p>
          A Model Context Protocol server that exposes Aura’s documentation to
          AI tools at query time. Agents can retrieve up-to-date guidance
          without hallucinating from stale training data. See the{' '}
          <DocLink to="/aura/documentation/mcp-server">MCP server</DocLink> page.
        </p>
      </ContentSection>

      <ContentSection title="Why this matters">
        <p>
          When an agent implements UI without design system guidance, it
          improvises. Improvisation accumulates into visual debt, broken
          theming, inaccessible patterns, and inconsistent experiences that are
          expensive to fix. Aura gives agents the same opinionated guardrails an
          engineer would enforce in code review, but earlier in the loop and at
          scale.
        </p>
      </ContentSection>

      <ContentSection title="How Aura differs from a traditional design system">
        <TokenTable
          columns={['Category', 'Traditional design system', 'Aura (AI-native)']}
          rows={[
            [
              <Label key="ships">What it ships</Label>,
              'Components and written documentation',
              'Components, documentation, and structured AI tooling',
            ],
            [
              <Label key="who">Who consumes it</Label>,
              'Humans reading docs and Storybook',
              'Humans and AI agents equally',
            ],
            [
              <Label key="where">Where guidance lives</Label>,
              'Notion, Confluence, or static sites',
              'Machine-readable files (DESIGN.md, llmUsage, skills)',
            ],
            [
              <Label key="tokens">How tokens are applied</Label>,
              'Interpreted and manually applied by developers',
              'Enforced at the skill layer before code is written',
            ],
            [
              <Label key="conformance">How conformance works</Label>,
              'Depends on human discipline in code review',
              'Built into the agent workflow, not only code review',
            ],
            [
              <Label key="tooling">Agent tooling</Label>,
              'Out of scope',
              'Skills, MCP server, and Cursor rules are first-class deliverables',
            ],
          ]}
        />
        <p>
          The underlying visual language — tokens, components, patterns — is
          the same. The difference is in how that language is packaged and
          enforced. Aura treats agent-readable guidance as a core output of the
          design system, not an afterthought.
        </p>
      </ContentSection>

      <ContentSection title="What Aura defines">
        <p>
          Aura provides three layers that work together:
        </p>
        <TokenTable
          columns={['Layer', 'What it covers', 'Where it lives']}
          rows={[
            [
              <Label key="foundations">Foundations</Label>,
              'Color, typography, spacing, radii, effects, motion, icons',
              'Tokens, Figma, DESIGN.md',
            ],
            [
              <Label key="primitives">Primitives</Label>,
              'Component behavior, variants, composition rules, accessibility',
              'NPM package, Storybook, llmUsage',
            ],
            [
              <Label key="patterns">Patterns & layouts</Label>,
              'Repeatable multi-component solutions: layouts, flows, surfaces',
              'Skills, docs, Storybook',
            ],
          ]}
        />
        <p>
          Aura defines the system constraints that product UI must operate
          within. It does not prescribe product-specific workflows — those are
          the responsibility of the teams building them.
        </p>
        <p>
          Aura ships in two tiers. Core components are production-ready,
          risk-reviewed, and available in the{' '}
          <code>@cognite/aura</code> package. Labs components are available for
          use but are still being stabilized and may change before graduating to
          Core. Patterns are in progress. See In development for the current
          roadmap.
        </p>
      </ContentSection>

      <ContentSection title="Who this documentation is for">
        <p>
          Aura serves three distinct audiences, and this documentation is
          organized with all three in mind.
        </p>

        <SubHeading>Designers</SubHeading>
        <p>
          You work in the Figma library, prototype with Cursor or Claude,
          contribute to the system, and make decisions about how components look
          and behave. Use this documentation to understand usage intent, token
          semantics, and the design rationale behind system decisions. The Figma
          library is the canonical visual reference; this documentation explains
          the why behind it.
        </p>

        <SubHeading>Engineers</SubHeading>
        <p>
          You implement product UI using the <code>@cognite/aura</code> package,
          with Storybook as your API reference and tokens as your styling
          system. Use this documentation for the decision-level guidance that
          doesn’t live in props tables: when to reach for one component over
          another, how tokens are structured, and how to stay conformant without
          reading every Figma file.
        </p>

        <SubHeading>AI agents</SubHeading>
        <p>
          Agents implement UI on behalf of engineers and designers. They consume
          Aura through its structured tooling layer: skills activate
          automatically for common patterns, DESIGN.md and{' '}
          <code>llmUsage</code> metadata provide scoped guidance, and the MCP
          server gives access to up-to-date documentation at query time. Agents
          should only add new components or modify behavior of existing ones as
          a last resort when no suitable options exist. Agents should never use
          raw hex values — always defer to the token and component system.
        </p>
      </ContentSection>
    </>
  );
}
