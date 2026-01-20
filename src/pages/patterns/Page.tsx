import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/aura/card';

const patterns = [
  { name: 'Agent chat', description: 'Conversational AI interface pattern' },
  { name: 'Dashboards', description: 'Data visualization layouts' },
];

export default function PatternsPage() {
  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Patterns</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Complete UI patterns with animations, interactions, and real-world
            use cases.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          {patterns.map((pattern) => (
            <Link
              key={pattern.name}
              to={`/patterns/${pattern.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="block"
            >
              <Card className="h-full transition-colors hover:border-primary">
                <CardContent className="py-4">
                  <div className="space-y-1">
                    <div className="text-foreground font-medium">{pattern.name}</div>
                    <p className="text-sm text-muted-foreground">{pattern.description}</p>
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
