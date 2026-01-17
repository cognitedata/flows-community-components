import { Link } from 'react-router-dom';

const patterns = [
  'Agent Chat',
  'Dashboards',
];

export default function PatternsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Patterns</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Complete UI patterns with animations, interactions, and real-world
          use cases.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 mt-8">
        {patterns.map((pattern) => (
          <Link
            key={pattern}
            to={`/patterns/${pattern.toLowerCase().replace(/\s+/g, '-')}`}
            className="text-foreground hover:underline"
          >
            {pattern}
          </Link>
        ))}
      </div>
    </div>
  );
}
