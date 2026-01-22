import { Outlet, createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./layouts/RootLayout";
import { SectionLayout } from "./layouts/SectionLayout";

// Pages
import HomePage from "./pages/Home";
import AIPage from "./pages/ai/Page";
import AIComponentPage from "./pages/ai/components/ComponentPage";
import BlocksPage from "./pages/blocks/Page";
import CogDocsPageComponent from "./pages/cogdocs/Page";
import DocsAboutPage from "./pages/docs/about/Page";
import DocsGettingStartedPage from "./pages/docs/getting-started/Page";
import DocsInstallationPage from "./pages/docs/installation/Page";
import GuidesPage from "./pages/guides/Page";
import LayoutsPageContent from "./pages/layouts-page/Page";
import MotionPage from "./pages/motion/Page";
import PatternsPage from "./pages/patterns/Page";
import PatternsAgentChatPage from "./pages/patterns/agent-chat/Page";
import PatternsDashboardsPage from "./pages/patterns/dashboards/Page";
import PrimitivesPage from "./pages/primitives/Page";
import PrimitivesColorsPage from "./pages/primitives/colors/Page";
import PrimitivesComponentPage from "./pages/primitives/components/ComponentPage";
import PrimitivesEffectsPage from "./pages/primitives/effects/Page";
import CogDocsIndividualPage from "./pages/cogdocs/CogDocsPage";
import PrimitivesIconsPage from "./pages/primitives/icons/Page";
import PrimitivesIllustrationsPage from "./pages/primitives/illustrations/Page";
import PrimitivesLayoutsPage from "./pages/primitives/layouts/Page";
import PrimitivesMotionDesignPage from "./pages/primitives/motion-design/Page";
import PrimitivesThemingPage from "./pages/primitives/theming/Page";
import PrimitivesTypographyPage from "./pages/primitives/typography/Page";
import TemplatesPage from "./pages/templates/Page";
import ShiftHandoverAppPage from "./pages/templates/shift-handover-app/Page";
import TokensPage from "./pages/tokens/Page";
import UseCasesPage from "./pages/use-cases/Page";

// eslint-disable-next-line react-refresh/only-export-components
function RootLayoutWrapper() {
  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
function SectionLayoutWrapper() {
  return (
    <SectionLayout>
      <Outlet />
    </SectionLayout>
  );
}

// Get base path from environment variable or use default
const basePath = import.meta.env.BASE_URL || "/";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayoutWrapper />,
      children: [
        { index: true, element: <HomePage /> },
        // Primitives section with side navigation
        {
          path: "primitives",
          element: <SectionLayoutWrapper />,
          children: [
            { index: true, element: <PrimitivesPage /> },
            { path: "components/:slug", element: <PrimitivesComponentPage /> },
            { path: "theming", element: <PrimitivesThemingPage /> },
            { path: "effects", element: <PrimitivesEffectsPage /> },
            { path: "layouts", element: <PrimitivesLayoutsPage /> },
            { path: "colors", element: <PrimitivesColorsPage /> },
            { path: "typography", element: <PrimitivesTypographyPage /> },
            { path: "illustrations", element: <PrimitivesIllustrationsPage /> },
            { path: "icons", element: <PrimitivesIconsPage /> },
            { path: "motion-design", element: <PrimitivesMotionDesignPage /> },
          ],
        },
        // Patterns section with side navigation
        {
          path: "patterns",
          element: <SectionLayoutWrapper />,
          children: [
            { index: true, element: <PatternsPage /> },
            { path: "agent-chat", element: <PatternsAgentChatPage /> },
            { path: "dashboards", element: <PatternsDashboardsPage /> },
          ],
        },
        // AI section with side navigation
        {
          path: "ai",
          element: <SectionLayoutWrapper />,
          children: [
            { index: true, element: <AIPage /> },
            { path: "components/:slug", element: <AIComponentPage /> },
          ],
        },
        // Docs section
        {
          path: "docs",
          element: <SectionLayoutWrapper />,
          children: [
            { path: "installation", element: <DocsInstallationPage /> },
            { path: "about", element: <DocsAboutPage /> },
            { path: "getting-started", element: <DocsGettingStartedPage /> },
          ],
        },
        // CogDocs section with side navigation
        {
          path: "cogdocs",
          element: <SectionLayoutWrapper />,
          children: [
            { index: true, element: <CogDocsPageComponent /> },
            { path: ":slug", element: <CogDocsIndividualPage /> },
          ],
        },
        // Other pages without section layout
        { path: "blocks", element: <BlocksPage /> },
        { path: "templates", element: <TemplatesPage /> },
        { path: "templates/shift-handover-app", element: <ShiftHandoverAppPage /> },
        // Also support /eos/shift-handover-app as seen in the source
        { path: "eos/shift-handover-app", element: <ShiftHandoverAppPage /> },
        { path: "tokens", element: <TokensPage /> },
        { path: "use-cases", element: <UseCasesPage /> },
        { path: "motion", element: <MotionPage /> },
        { path: "layouts", element: <LayoutsPageContent /> },
        { path: "guides", element: <GuidesPage /> },
      ],
    },
  ],
  {
    basename: basePath === "/" ? undefined : basePath.replace(/\/$/, ""),
  }
);
