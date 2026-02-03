import { type CogDocsPage, cogdocsPages } from "virtual:cogdocs";
import { Card, CardContent } from "@cognite/aura-lab/card";
import { Link } from "react-router-dom";

export default function CogDocsPageComponent() {
  if (cogdocsPages.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-10">
        <p className="text-muted-foreground">
          No CogDocs pages available. Run the dev server to scrape pages.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">CogDocs</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Documentation and style guides from CogDocs
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          {cogdocsPages.map((page: CogDocsPage) => (
            <Link key={page.slug} to={`/cogdocs/${page.slug}`} className="block">
              <Card className="h-full transition-colors hover:border-primary">
                <CardContent className="py-4">
                  <div className="space-y-1">
                    <div className="text-foreground font-medium">{page.title}</div>
                    <p className="text-sm text-muted-foreground">CogDocs documentation</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
