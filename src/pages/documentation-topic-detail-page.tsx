import { Link, Navigate, useParams } from "react-router-dom";
import { CenteredContent } from "@/components/layout/centered-content";
import { PageTitle } from "@/components/page-title";
import { getDocumentationNavItemBySlug } from "@/lib/documentation-nav-data";

export function DocumentationTopicDetailPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const item = getDocumentationNavItemBySlug(slug);

  if (!item) {
    return <Navigate to="/documentation" replace />;
  }

  return (
    <CenteredContent>
      <PageTitle title={`${item.label} — Aura`} />
      <header className="mb-10 sm:mb-12">
        <p className="mb-3 text-sm text-muted-fg">
          <Link to="/documentation" className="hover:text-foreground hover:underline">
            Documentation
          </Link>
          <span className="mx-1.5 text-medium-fg">/</span>
          <span>{item.label}</span>
        </p>
        <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
          {item.label}
        </h1>
      </header>
      <p className="max-w-[65ch] text-sm leading-relaxed text-muted-fg">
        Content for this page is on the way. In the meantime, browse the other Documentation
        pages using the list on the left.
      </p>
    </CenteredContent>
  );
}
