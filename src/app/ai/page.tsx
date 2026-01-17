import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/aura/card';

const components = [
  { name: 'Code block', description: 'Syntax-highlighted code display' },
  { name: 'Confirmation', description: 'AI action confirmation prompt' },
  { name: 'Conversation', description: 'Chat message container' },
  { name: 'Inline Citation', description: 'Reference link within text' },
  { name: 'Loader', description: 'AI processing indicator' },
  { name: 'Message', description: 'Chat message bubble' },
  { name: 'Prompt input', description: 'AI query input field' },
  { name: 'Reasoning', description: 'AI thinking process display' },
  { name: 'Shimmer', description: 'Loading placeholder animation' },
  { name: 'Sources', description: 'Reference source list' },
  { name: 'Suggestion', description: 'AI prompt suggestions' },
  { name: 'Tool', description: 'AI tool call display' },
];

export default function AIPage() {
  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Components</h1>
          <p className="text-lg text-muted-foreground mt-2">
            All available AI element components
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          {components.map((component) => (
            <Link
              key={component.name}
              href={`/ai/components/${component.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="block"
            >
              <Card className="h-full transition-colors hover:border-primary">
                <CardContent className="py-4">
                  <div className="space-y-1">
                    <div className="text-foreground font-medium">{component.name}</div>
                    <p className="text-sm text-muted-foreground">{component.description}</p>
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
