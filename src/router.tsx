import { createBrowserRouter } from 'react-router-dom';

import { CommunityLayout } from '@/layouts/community-layout';
import { ComponentsLayout } from '@/layouts/components-layout';
import { DocumentationLayout } from '@/layouts/documentation-layout';
import { FoundationsLayout } from '@/layouts/foundations-layout';
import { PatternsLayout } from '@/layouts/patterns-layout';
import { RootLayout } from '@/layouts/root-layout';
import { CommunityComponentDetailPage } from '@/pages/community-component-detail-page';
import { CommunityPage } from '@/pages/community-page';
import { ComponentDetailPage } from '@/pages/component-detail-page';
import { ComponentsPage } from '@/pages/components-page';
import { ContributionPage } from '@/pages/contribution-page';
import { CustomThemingPage } from '@/pages/custom-theming-page';
import { DocumentationPage } from '@/pages/documentation-page';
import { DocumentationTopicDetailPage } from '@/pages/documentation-topic-detail-page';
import { FoundationTopicDetailPage } from '@/pages/foundation-topic-detail-page';
import { FoundationsPage } from '@/pages/foundations-page';
import { HomePage } from '@/pages/home-page';
import { InstallationPage } from '@/pages/installation-page';
import { IntroductionPage } from '@/pages/introduction-page';
import { PatternDetailPage } from '@/pages/pattern-detail-page';
import { PatternsExtendingFunctionalityPage } from '@/pages/patterns-extending-functionality-page';
import { PatternsIntroductionPage } from '@/pages/patterns-introduction-page';
import { PatternsPage } from '@/pages/patterns-page';
import { SkillsPage } from '@/pages/skills-page';
import { WhatsNewPage } from '@/pages/whats-new-page';
import { WhatsNewPostPage } from '@/pages/whats-new-post-page';

const basePath = import.meta.env.BASE_URL || '/';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <RootLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'whats-new', element: <WhatsNewPage /> },
        { path: 'whats-new/:slug', element: <WhatsNewPostPage /> },
        {
          path: 'foundations',
          element: <FoundationsLayout />,
          children: [
            { index: true, element: <FoundationsPage /> },
            { path: ':slug', element: <FoundationTopicDetailPage /> },
          ],
        },
        {
          path: 'documentation',
          element: <DocumentationLayout />,
          children: [
            { index: true, element: <DocumentationPage /> },
            { path: 'custom-theming', element: <CustomThemingPage /> },
            { path: ':slug', element: <DocumentationTopicDetailPage /> },
          ],
        },
        {
          path: 'components',
          element: <ComponentsLayout />,
          children: [
            { index: true, element: <ComponentsPage /> },
            { path: 'introduction', element: <IntroductionPage /> },
            { path: ':slug', element: <ComponentDetailPage /> },
          ],
        },
        {
          path: 'patterns',
          element: <PatternsLayout />,
          children: [
            { index: true, element: <PatternsPage /> },
            { path: 'introduction', element: <PatternsIntroductionPage /> },
            {
              path: 'extending-functionality',
              element: <PatternsExtendingFunctionalityPage />,
            },
            { path: ':slug', element: <PatternDetailPage /> },
          ],
        },
        {
          path: 'community',
          element: <CommunityLayout />,
          children: [
            { index: true, element: <CommunityPage /> },
            { path: 'installation', element: <InstallationPage /> },
            { path: 'contribution', element: <ContributionPage /> },
            { path: 'contribute', element: <ContributionPage /> },
            { path: 'skills', element: <SkillsPage /> },
            { path: ':slug', element: <CommunityComponentDetailPage /> },
          ],
        },
      ],
    },
  ],
  {
    basename: basePath === '/' ? undefined : basePath.replace(/\/$/, ''),
  }
);
