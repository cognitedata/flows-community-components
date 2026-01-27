import { type CogDocsPage, cogdocsPages } from "virtual:cogdocs";
import { Button } from "@/components/ui/aura/button";
import { MessageResponse } from "@/components/ui/aura/message/message";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";

export default function CogDocsPageComponent() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const page = cogdocsPages.find((p: CogDocsPage) => p.slug === slug);

  if (!page) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <p className="text-muted-foreground">Page not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="space-y-8">
        {/* Navigation */}
        <div className="flex items-center gap-4">
          <Button variant="secondary" size="sm" onClick={() => navigate("/cogdocs")}>
            <IconArrowLeft className="h-4 w-4 mr-2" />
            Back to CogDocs
          </Button>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{page.title}</h1>
          <a
            href={page.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:underline text-sm"
          >
            View original →
          </a>
        </div>

        {/* Content */}
        <div className="prose prose-sm max-w-none">
          <MessageResponse>{page.content}</MessageResponse>
        </div>
      </div>
    </div>
  );
}
