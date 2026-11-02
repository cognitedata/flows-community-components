import { Navigate, createBrowserRouter, useParams } from 'react-router-dom';

import { AuraLayout } from '@/layouts/aura-layout';
import { CommunityLayout } from '@/layouts/community-layout';
import { PatternsLayout } from '@/layouts/patterns-layout';
import { RootLayout } from '@/layouts/root-layout';
import { WhatsNewLayout } from '@/layouts/whats-new-layout';
import { ChartsPage } from '@/pages/charts-page';
import { CommunityComponentDetailPage } from '@/pages/community-component-detail-page';
import { CommunityComponentsPage } from '@/pages/community-components-page';
import { CommunityPage } from '@/pages/community-page';
import { CommunityTemplateDetailPage } from '@/pages/community-template-detail-page';
import { CommunityTemplateExamplesPage } from '@/pages/community-template-examples-page';
import { CommunityTemplateSkillPage } from '@/pages/community-template-skill-page';
import { CommunityTemplatesPage } from '@/pages/community-templates-page';
import { ComponentDetailPage } from '@/pages/component-detail-page';
import { ComponentsPage } from '@/pages/components-page';
import { DocumentationTopicDetailPage } from '@/pages/documentation-topic-detail-page';
import { FoundationTopicDetailPage } from '@/pages/foundation-topic-detail-page';
import { HomePage } from '@/pages/home-page';
import { InstallationPage } from '@/pages/installation-page';
import { PatternDetailPage } from '@/pages/pattern-detail-page';
import { PatternsExtendingFunctionalityPage } from '@/pages/patterns-extending-functionality-page';
import { PatternsIntroductionPage } from '@/pages/patterns-introduction-page';
import { PatternsPage } from '@/pages/patterns-page';
import { WhatsNewPostPage } from '@/pages/whats-new-post-page';

function RedirectWithSlug({ to }: { to: string }) {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={slug ? `${to}/${slug}` : to} replace />;
}

const basePath = import.meta.env.BASE_URL || '/';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <RootLayout />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: 'whats-new',
          element: <WhatsNewLayout />,
          children: [
            // The index route shows the most recent report.
            { index: true, element: <WhatsNewPostPage /> },
            { path: ':slug', element: <WhatsNewPostPage /> },
          ],
        },
        { path: 'charts', element: <ChartsPage /> },
        {
          path: 'aura',
          element: <AuraLayout />,
          children: [
            {
              index: true,
              element: <Navigate to="/aura/components" replace />,
            },
            {
              path: 'foundations/:slug',
              element: <FoundationTopicDetailPage />,
            },
            { path: 'components', element: <ComponentsPage /> },
            { path: 'components/:slug', element: <ComponentDetailPage /> },
            {
              path: 'primitives',
              element: <Navigate to="/aura/components" replace />,
            },
            {
              path: 'primitives/:slug',
              element: <RedirectWithSlug to="/aura/components" />,
            },
            {
              path: 'documentation',
              element: <Navigate to="/aura/documentation/about-aura" replace />,
            },
            {
              path: 'documentation/skills',
              element: <Navigate to="/aura/documentation/designmd" replace />,
            },
            {
              path: 'documentation/contribution',
              element: <Navigate to="/aura/documentation/about-aura" replace />,
            },
            {
              path: 'documentation/architecture',
              element: <Navigate to="/aura/documentation/about-aura" replace />,
            },
            {
              path: 'documentation/:slug',
              element: <DocumentationTopicDetailPage />,
            },
          ],
        },
        {
          path: 'foundations',
          children: [
            {
              index: true,
              element: (
                <Navigate to="/aura/foundations/design-heuristics" replace />
              ),
            },
            {
              path: ':slug',
              element: <RedirectWithSlug to="/aura/foundations" />,
            },
          ],
        },
        {
          path: 'primitives',
          children: [
            {
              index: true,
              element: <Navigate to="/aura/components" replace />,
            },
            {
              path: ':slug',
              element: <RedirectWithSlug to="/aura/components" />,
            },
          ],
        },
        {
          path: 'components',
          children: [
            {
              index: true,
              element: <Navigate to="/aura/components" replace />,
            },
            {
              path: ':slug',
              element: <RedirectWithSlug to="/aura/components" />,
            },
          ],
        },
        {
          path: 'documentation',
          children: [
            {
              index: true,
              element: <Navigate to="/aura/documentation" replace />,
            },
            {
              path: ':slug',
              element: <RedirectWithSlug to="/aura/documentation" />,
            },
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
            {
              path: 'contribution',
              element: <Navigate to="/community" replace />,
            },
            {
              path: 'contribute',
              element: <Navigate to="/community" replace />,
            },
            {
              path: 'skills',
              element: <Navigate to="/community" replace />,
            },
            { path: 'components', element: <CommunityComponentsPage /> },
            { path: 'templates', element: <CommunityTemplatesPage /> },
            {
              path: 'templates/:slug',
              element: <CommunityTemplateDetailPage />,
            },
            {
              path: 'templates/:slug/examples',
              element: <CommunityTemplateExamplesPage />,
            },
            {
              path: 'templates/:slug/skill',
              element: <CommunityTemplateSkillPage />,
            },
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
