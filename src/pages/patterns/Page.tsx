import { CatalogIndex } from '@/pages/components/CatalogIndex';

const patterns = [
  {
    name: 'Agent chat',
    url: '/patterns/agent-chat',
    description: 'Conversational AI interface pattern',
  },
  {
    name: 'Dashboards',
    url: '/patterns/dashboards',
    description: 'Data visualization layouts',
  },
];

export default function PatternsPage() {
  return (
    <CatalogIndex
      title="Patterns"
      description="Complete UI patterns with animations, interactions, and real-world use cases."
      storageKey="aura.patterns.viewMode"
      sections={[
        {
          id: 'patterns',
          items: patterns.map((pattern) => ({
            id: pattern.url,
            name: pattern.name,
            description: pattern.description,
            href: pattern.url,
            status: 'pattern',
          })),
        },
      ]}
    />
  );
}
