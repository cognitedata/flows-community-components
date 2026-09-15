import { Button } from '@cognite/aura/components';
import { IconBrandSlack } from '@tabler/icons-react';
import type { ReactNode } from 'react';

import {
  Callout,
  ContentSection,
} from '@/components/foundations/content-primitives';

const MIGRATION_SLACK_URL =
  'https://cognitedata.slack.com/archives/C0BQRJU3SJX';

function SlackLink({ children }: { children: ReactNode }) {
  return (
    <a
      href={MIGRATION_SLACK_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="text-link-fg hover:text-link-fg-hover hover:underline"
    >
      {children}
    </a>
  );
}

export const MIGRATION_INTRO =
  'How to migrate Fusion apps from Cogs to Aura. A full guide is coming soon.';

export function MigrationContent() {
  return (
    <>
      <div className="mb-12 max-w-[70ch] space-y-4 text-sm leading-relaxed text-muted-fg sm:mb-14">
        <p>
          Aura is replacing Cogs as the design system for Cognite Data Fusion
          (CDF). If your Fusion app still depends on Cogs components, tokens, or
          layout patterns, this is where the migration path will live.
        </p>
        <Callout variant="info">
          We are working on a Cogs to Aura migration guide for Fusion. Check
          back here soon for step-by-step instructions. Until then, reach out in
          Slack if you are starting a migration and need help.
        </Callout>
      </div>

      <ContentSection title="Ask questions">
        <p>
          Have questions about migrating from Cogs to Aura in Fusion? Reach out
          in <SlackLink>Slack</SlackLink> and we&apos;ll help you through it.
        </p>
        <Button
          nativeButton={false}
          render={
            <a
              href={MIGRATION_SLACK_URL}
              target="_blank"
              rel="noopener noreferrer"
            />
          }
        >
          <IconBrandSlack />
          Ask in Slack
        </Button>
      </ContentSection>
    </>
  );
}
