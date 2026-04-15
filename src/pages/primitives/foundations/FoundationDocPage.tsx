import { IconArrowLeft, IconExternalLink } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/aura/button';
import {
  type FoundationDocSlug,
  getFoundationDoc,
} from '@/lib/foundation-docs';
import { foundationMdxComponents } from '@/pages/primitives/foundations/FoundationMdxComponents';

type FoundationDocPageProps = {
  slug: FoundationDocSlug;
};

export default function FoundationDocPage({ slug }: FoundationDocPageProps) {
  const doc = getFoundationDoc(slug);

  if (!doc) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-4">
        <p className="text-muted-foreground">Foundation page not found</p>
      </div>
    );
  }

  const Content = doc.Content;

  return (
    <div className="py-10">
      <div className="space-y-8 max-w-4xl mx-auto w-full min-w-0">
        <div className="flex items-center gap-4">
          <Button
            variant="secondary"
            size="sm"
            render={
              <Link to="/primitives">
                <IconArrowLeft className="h-4 w-4 mr-2" />
                Back to Primitives
              </Link>
            }
          />
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">{doc.title}</h1>
              <p className="text-lg text-muted-foreground">{doc.description}</p>
            </div>
            <Button
              variant="outline"
              render={
                <a
                  href={doc.storybookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View interactive examples
                  <IconExternalLink className="h-4 w-4" />
                </a>
              }
            />
          </div>
        </div>
      </div>

      <div className="mt-12 w-full min-w-0">
        <Content components={foundationMdxComponents} />
      </div>
    </div>
  );
}
