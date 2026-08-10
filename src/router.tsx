import { Outlet, createBrowserRouter } from 'react-router-dom';

import { CommunityDocsLayout } from './layouts/CommunityDocsLayout';
import { RootLayout } from './layouts/RootLayout';
import CommunityComponentPage from './pages/community/ComponentPage';
import CommunityContributePage from './pages/community/ContributePage';
import CommunityInstallationPage from './pages/community/InstallationPage';
import CommunityPage from './pages/community/Page';
import HomePage from './pages/Home';

function RootLayoutWrapper() {
  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
}

const basePath = import.meta.env.BASE_URL || '/';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <RootLayoutWrapper />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: 'community',
          element: <CommunityDocsLayout />,
          children: [
            { index: true, element: <CommunityPage /> },
            { path: 'installation', element: <CommunityInstallationPage /> },
            { path: 'contribute', element: <CommunityContributePage /> },
            { path: ':slug', element: <CommunityComponentPage /> },
          ],
        },
      ],
    },
  ],
  {
    basename: basePath === '/' ? undefined : basePath.replace(/\/$/, ''),
  }
);
