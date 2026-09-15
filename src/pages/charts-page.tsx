import { IconExternalLink } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

import { AuraChartsGallery } from '@/components/charts/aura-chart-examples';
import { PageTitle } from '@/components/page-title';
import { chromaticStorybookStoryUrl } from '@/lib/chromatic-storybook';
import { useThemeOverrides } from '@/lib/theme-overrides-context';

export function ChartsPage() {
  const { appearance, sharedTheme } = useThemeOverrides();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-[1200px] px-4 pt-chrome-pad pb-24 sm:pt-chrome-pad-sm">
        <PageTitle title="Charts — Aura" />
        <header className="mb-10 sm:mb-12">
          <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
            Charts
          </h1>
          <p className="mt-3 max-w-[60ch] text-muted-fg">
            Aura Chart is a composition primitive. Import{' '}
            <code className="text-foreground">ChartContainer</code> from{' '}
            <code className="text-foreground">@cognite/aura/chart</code> and
            compose Recharts primitives so series colors follow Aura chart
            tokens. See{' '}
            <Link
              to="/aura/foundations/color-tokens"
              className="font-medium text-link-fg hover:text-link-fg-hover hover:underline"
            >
              color tokens
            </Link>{' '}
            for the ramps, or open the primitive in{' '}
            <a
              href={chromaticStorybookStoryUrl(
                'primitives-chart--stacked-area-chart',
                appearance,
                sharedTheme
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-link-fg hover:text-link-fg-hover hover:underline"
            >
              Storybook
              <IconExternalLink size={14} className="mb-px ml-1 inline" />
            </a>
            .
          </p>
        </header>

        <AuraChartsGallery />
      </div>
    </main>
  );
}
