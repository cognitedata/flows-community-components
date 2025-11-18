import { SectionLayout } from '#components/section-layout';

// Import the content from the original guides page
import OriginalGuidesPage from '#app/guides/page';

export default function GettingStartedPage() {
  return (
    <SectionLayout>
      <OriginalGuidesPage />
    </SectionLayout>
  );
}
