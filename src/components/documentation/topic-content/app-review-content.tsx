import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import {
  Callout,
  ContentList,
  ContentSection,
  DoDontGrid,
  SubHeading,
  TokenTable,
} from '@/components/foundations/content-primitives';

const QUALITY_GUIDELINES_URL =
  'https://docs.cognite.com/cdf/flows/guides/quality-guidelines';
const DESIGN_REVIEW_SKILL_URL =
  'https://github.com/cognitedata/builder-skills/blob/main/skills/flows-design-review/SKILL.md';

function DocLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="text-link-fg hover:text-link-fg-hover hover:underline"
    >
      {children}
    </Link>
  );
}

function ExtLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-link-fg hover:text-link-fg-hover hover:underline"
    >
      {children}
    </a>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <span className="font-medium text-foreground">{children}</span>;
}

const QUESTIONS = [
  {
    id: 'Q1',
    title: 'Aura design system consistency',
    question:
      'Are you using Aura tokens, layouts, components, and patterns correctly?',
    scores: [
      [
        '5 Excellent',
        'All Aura tokens applied correctly, no hard-coded values. Proper responsive sizing and page layouts. Aura components used without style overrides. Best practices followed.',
      ],
      [
        '4 Good',
        'Mostly Aura tokens and components with 1–2 minor exceptions. Layout spacing mostly consistent. Minimal style overrides.',
      ],
      [
        '3 Average',
        'Mix of Aura and custom elements. Some proper spacing, some random values. Overriding styles in multiple places.',
      ],
      [
        '2 Below average',
        'Frequently custom colors, typography, or spacing instead of Aura tokens. Heavy customization that breaks patterns.',
      ],
      [
        '1 Poor',
        'Not using Aura at all. Custom colors, fonts, and spacing throughout.',
      ],
    ],
  },
  {
    id: 'Q2',
    title: 'Navigation, layout and hierarchy',
    question:
      'Can users tell where they are and navigate easily? Are elements organized with clear visual hierarchy?',
    scores: [
      [
        '5 Excellent',
        'Current location always clear. Easy navigation forward and back. Consistent menus. Strong visual hierarchy. Content flows logically (F/Z pattern).',
      ],
      [
        '4 Good',
        'Usually clear where you are. Navigation mostly consistent. Good grouping and hierarchy with minor exceptions.',
      ],
      [
        '3 Average',
        'Sometimes unclear what page you are on. Navigation works but is not always intuitive. Hierarchy exists but is not always clear.',
      ],
      [
        '2 Below average',
        'Often lost or confused. Navigation changes between pages. Weak visual hierarchy.',
      ],
      [
        '1 Poor',
        'No indication of current location. No clear navigation. Inconsistent structure.',
      ],
    ],
  },
  {
    id: 'Q3',
    title: 'Clear labels and language',
    question:
      'Are buttons, inputs, and actions labeled clearly? Can users understand what everything does?',
    scores: [
      [
        '5 Excellent',
        'Every element has a clear, specific label. Plain, action-oriented language (“Save changes”, “Delete item”).',
      ],
      [
        '4 Good',
        'Most labels are clear with only minor ambiguity. Language is mostly plain with minimal jargon.',
      ],
      [
        '3 Average',
        'Labels are present but sometimes vague (“Submit”, “OK”). Some unnecessary jargon.',
      ],
      [
        '2 Below average',
        'Many labels are unclear or generic. Heavy technical terms without explanation.',
      ],
      ['1 Poor', 'Labels are missing, confusing, or jargon-laden.'],
    ],
  },
  {
    id: 'Q4',
    title: 'System feedback and validation',
    question:
      'Do users know what is happening? Are forms easy to use with helpful validation and error messages?',
    scores: [
      [
        '5 Excellent',
        'Immediate feedback. Clear loading states. Helpful success and error messages. All fields labeled, required fields marked, real-time validation with specific messages.',
      ],
      [
        '4 Good',
        'Most actions provide feedback. Loading states present. Validation mostly helpful.',
      ],
      [
        '3 Average',
        'Some feedback but inconsistent. Loading states sometimes missing. Generic error messages.',
      ],
      [
        '2 Below average',
        'Minimal feedback. Users often do not know if actions worked. Validation only on submit.',
      ],
      [
        '1 Poor',
        'No feedback. Silent failures. Technical error codes without explanation.',
      ],
    ],
  },
  {
    id: 'Q5',
    title: 'Clickability and interactions',
    question:
      'Is it obvious what is clickable? Do interactive elements respond appropriately?',
    scores: [
      [
        '5 Excellent',
        'All clickable items look clickable. Hover effects on interactive elements. Cursor changes appropriately.',
      ],
      [
        '4 Good',
        'Most interactive elements are obvious. Hover effects mostly present.',
      ],
      [
        '3 Average',
        'Inconsistent hover states. Occasionally unclear what is interactive.',
      ],
      [
        '2 Below average',
        'Many interactive elements do not look clickable. Few hover effects.',
      ],
      ['1 Poor', 'Cannot tell what is clickable. No visual feedback.'],
    ],
  },
  {
    id: 'Q6',
    title: 'Error prevention and recovery',
    question:
      'Can users undo or cancel destructive actions? Are there warnings before important actions?',
    scores: [
      [
        '5 Excellent',
        'Confirmation dialogs before destructive actions. Auto-save prevents data loss. Clear undo or cancel options. Read-only apps with no destructive actions also score 5.',
      ],
      [
        '4 Good',
        'Most destructive actions have warnings. Some auto-save or undo.',
      ],
      [
        '3 Average',
        'Some warnings for major actions. Limited undo or cancel. Some risk of data loss.',
      ],
      ['2 Below average', 'Few warnings. No undo. Easy to lose work.'],
      ['1 Poor', 'No warnings. No undo. Frequent accidental data loss.'],
    ],
  },
  {
    id: 'Q7',
    title: 'Responsive design and multi-device support',
    question:
      'Does the app work well on different screen sizes? Is it usable on desktop, tablet, and mobile?',
    scores: [
      [
        '5 Excellent',
        'Seamless across desktop, tablet, and mobile. Touch targets 40px+. Text readable. No horizontal scrolling. Hover states accounted for on touch. Intentionally desktop-only apps that stay clean on supported sizes also score 5.',
      ],
      [
        '4 Good',
        'Works well on most devices. Layouts adapt with minor issues.',
      ],
      [
        '3 Average',
        'Functional on multiple devices but not optimized. Some layout issues on smaller screens.',
      ],
      [
        '2 Below average',
        'Poor mobile or tablet experience. Layouts break. Many touch targets too small.',
      ],
      ['1 Poor', 'Desktop only. Broken on mobile and tablet.'],
    ],
  },
  {
    id: 'Q8',
    title: 'Empty states and first-time experience',
    question:
      'When there is no data, is it clear what to do next? Do empty pages guide users?',
    scores: [
      [
        '5 Excellent',
        'All empty states show helpful messages and clear next steps. First-time users know exactly what to do.',
      ],
      ['4 Good', 'Most empty states are helpful. Minor gaps in guidance.'],
      [
        '3 Average',
        'Some empty states explained. First-time users can figure it out with effort.',
      ],
      [
        '2 Below average',
        'Many blank pages with no guidance. Unclear how to get started.',
      ],
      ['1 Poor', 'Blank pages everywhere. No indication of what to do.'],
    ],
  },
  {
    id: 'Q9',
    title: 'Performance and efficiency',
    question:
      'Does the app load quickly? Can users complete tasks efficiently? Are there shortcuts for common actions?',
    scores: [
      [
        '5 Excellent',
        'Fast loading with progressive content. Bulk actions and keyboard shortcuts. Common tasks take minimal clicks.',
      ],
      [
        '4 Good',
        'Reasonable loading. Most tasks are streamlined. Some efficiency features present.',
      ],
      [
        '3 Average',
        'Acceptable performance. Tasks require moderate effort. Few shortcuts.',
      ],
      [
        '2 Below average',
        'Slow loading. Tasks require many steps. No shortcuts or bulk actions.',
      ],
      ['1 Poor', 'Very slow or unresponsive. Tasks are tedious.'],
    ],
  },
  {
    id: 'Q10',
    title: 'Accessibility (WCAG AA 2.1)',
    question:
      'Can people use the app with assistive technology? Does it meet WCAG AA 2.1?',
    scores: [
      [
        '5 Excellent',
        'All interactions via keyboard. Text contrast meets WCAG AA. Clear focus indicators. Proper ARIA labels. Alt text on images. Touch targets 40px+ / mouse targets 20px+. Form errors announced to screen readers.',
      ],
      [
        '4 Good',
        'Most requirements met. Keyboard navigation works for nearly all features. Minor exceptions.',
      ],
      [
        '3 Average',
        'Basic keyboard support but missing for some features. Mostly acceptable contrast. Focus indicators present but not always clear.',
      ],
      [
        '2 Below average',
        'Limited keyboard support. Multiple contrast failures. Weak focus indicators. Poor screen reader experience.',
      ],
      [
        '1 Poor',
        'No keyboard navigation. Poor contrast. No focus indicators. Not usable with assistive tech.',
      ],
    ],
  },
] as const;

export const APP_REVIEW_INTRO =
  'A design quality review for apps built with Aura. Walk the product as the intended user, then score ten questions on a 1–5 scale. Launch-ready apps average 3.8 or higher.';

export function AppReviewContent() {
  return (
    <>
      <ContentSection title="Why review">
        <p>
          Aura gives apps a shared visual language, but using the package is not
          enough. An app review checks whether tokens, components, and patterns
          are applied correctly — and whether a real user can finish their work
          without getting lost, guessing at labels, or hitting silent failures.
        </p>
        <p>
          This is the design quality assessment used for Flows custom apps.
          Score against the{' '}
          <ExtLink href={QUALITY_GUIDELINES_URL}>
            official quality guidelines
          </ExtLink>
          . Coding agents can run the same rubric with the{' '}
          <ExtLink href={DESIGN_REVIEW_SKILL_URL}>flows-design-review</ExtLink>{' '}
          skill.
        </p>
        <Callout variant="info">
          Navigation feel, clickability, and error prevention cannot be judged
          from code alone. Walk each critical task in the running app before you
          assign scores.
        </Callout>
      </ContentSection>

      <ContentSection title="When to review">
        <p>Run an app review when the UI is far enough along to use:</p>
        <ContentList
          items={[
            'The app is built on @cognite/aura and the main workflows are clickable.',
            'Code review is clean enough that design issues are not hidden behind broken builds.',
            'You can name the primary user and two or three tasks they must complete.',
          ]}
        />
        <p>
          For Flows certification, design review comes after code review and
          before submit. Target overall average: <Label>3.8 or higher</Label>.
        </p>
      </ContentSection>

      <ContentSection title="How to review">
        <SubHeading>1. Confirm the user and tasks</SubHeading>
        <p>
          The assessment is only as useful as the user and tasks it is based on.
          Capture:
        </p>
        <ContentList
          items={[
            'Primary user — a specific role and context, such as maintenance engineers on offshore platforms.',
            '2–3 critical tasks — the workflows that user must complete.',
            'Context — experience level, time pressure, device, and what success looks like.',
          ]}
        />

        <SubHeading>2. Walk each task end-to-end</SubHeading>
        <p>
          Open the app as that user in a clean browser session with
          representative data. Complete every task from beginning to end without
          shortcuts. Note where you get stuck, confused, or make errors.
          Findings only matter if they affect task completion.
        </p>

        <SubHeading>3. Score the ten questions</SubHeading>
        <p>
          Use what you observed to score each question from 1 to 5. Average =
          sum of all scores ÷ 10. Anything below 3 needs immediate attention.
        </p>
      </ContentSection>

      <ContentSection title="Using Aura correctly">
        <p>
          Question 1 is the Aura-specific bar. Reviewers should see tokens,
          layouts, and components from this site — not a parallel visual system
          built beside it. Check{' '}
          <DocLink to="/aura/foundations/color-tokens">color tokens</DocLink>,{' '}
          <DocLink to="/aura/foundations/size-spacing-tokens">
            size and spacing
          </DocLink>
          , and the <DocLink to="/aura/components">component catalog</DocLink>{' '}
          against what the app actually ships.
        </p>
        <DoDontGrid
          dos={[
            'Import UI from @cognite/aura and compose components the way Storybook shows.',
            'Use semantic tokens for color, type, space, and radius — never raw hex, rgb, or px values.',
            'Keep page chrome consistent: title, navigation, and a way back on every non-trivial screen.',
            'Prefer Aura patterns for loading, empty, error, and destructive confirmation states.',
          ]}
          donts={[
            'Hard-code colors or type sizes next to Aura tokens.',
            'Override Aura component styles to “make it match a mock”.',
            'Rebuild buttons, inputs, dialogs, or tables that already exist in the system.',
            'Leave lists, forms, or panels without loading, error, and empty treatments.',
          ]}
        />
      </ContentSection>

      <ContentSection title="The ten questions">
        <p>
          Score every question. Q2 (navigation) and Q6 (error prevention) in
          particular require the task walkthrough.
        </p>
        <TokenTable
          columns={['Question', 'What to ask']}
          rows={QUESTIONS.map((question) => [
            <Label key={question.id}>
              {question.id} {question.title}
            </Label>,
            question.question,
          ])}
        />
      </ContentSection>

      {QUESTIONS.map((question) => (
        <ContentSection
          key={question.id}
          title={`${question.id} — ${question.title}`}
        >
          <p>{question.question}</p>
          <TokenTable
            columns={['Score', 'Meaning']}
            rows={question.scores.map(([score, meaning]) => [
              <Label key={score}>{score}</Label>,
              meaning,
            ])}
          />
        </ContentSection>
      ))}

      <ContentSection title="Quality scoring">
        <p>
          Average = sum of all ten scores ÷ 10. Flows launch gates on an average
          of <Label>3.8 or higher</Label>.
        </p>
        <TokenTable
          columns={['Average', 'Quality level', 'Recommendation']}
          rows={[
            [
              <Label key="excellent">4.5 – 5.0</Label>,
              'Excellent — ready to launch',
              'Minor improvements over time.',
            ],
            [
              <Label key="good">3.8 – 4.4</Label>,
              'Good — launch with minor fixes',
              'Address the lower-scoring areas.',
            ],
            [
              <Label key="average">3.0 – 3.7</Label>,
              'Average — needs improvement',
              'Fix major problems before launching.',
            ],
            [
              <Label key="poor">Below 3.0</Label>,
              'Needs significant work',
              'Substantial improvements required. Start with the lowest scores.',
            ],
          ]}
        />
      </ContentSection>

      <ContentSection title="What to fix first">
        <TokenTable
          columns={['Priority', 'When', 'What to do']}
          rows={[
            [
              <Label key="must">Must fix</Label>,
              'Any score below 3',
              'Block launch until these are resolved.',
            ],
            [
              <Label key="should">Should fix</Label>,
              'Any score 3.0 – 3.7',
              'Fix before launch if they affect the critical tasks.',
            ],
            [
              <Label key="nice">Nice to fix</Label>,
              'Any score 3.8 – 4.4',
              'Improve after launch or in the next round.',
            ],
          ]}
        />
        <p>
          Re-run the review after fixes. Each round should use the same user and
          tasks so scores are comparable.
        </p>
      </ContentSection>
    </>
  );
}
