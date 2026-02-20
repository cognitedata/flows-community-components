import figmaIcon from '@/assets/figma-logo.svg';
import storybookIcon from '@/assets/icon-storybook-default.svg';
import { getPrimitiveCatalogEntry } from '@/lib/primitives-catalog';
import { CatalogIndex } from '@/pages/components/CatalogIndex';

const AI_FIGMA_URL =
  'https://www.figma.com/design/pMnMQvfErZDJzWgrcWCIwZ/WIP---Aura-library?node-id=4383-36632&p=f&t=hvBYNAqgOvQH1REf-0';

function toStorybookSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s*\(.*?\)\s*/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const externalIconClass =
  'size-4 grayscale opacity-70 mix-blend-multiply transition-all duration-150 group-hover:grayscale-0 group-hover:opacity-100 group-hover:mix-blend-normal';

const aiComponents = [
  { slug: 'code-block', name: 'Code block', description: 'Syntax-highlighted code display' },
  { slug: 'confirmation', name: 'Confirmation', description: 'AI action confirmation prompt' },
  { slug: 'conversation', name: 'Conversation', description: 'Chat message container' },
  { slug: 'inline-citation', name: 'Inline citation', description: 'Reference link within text' },
  { slug: 'loader', name: 'Loader', description: 'AI processing indicator' },
  { slug: 'message', name: 'Message', description: 'Chat message bubble' },
  { slug: 'prompt-input', name: 'Prompt input', description: 'AI query input field' },
  { slug: 'reasoning', name: 'Reasoning', description: 'AI thinking process display' },
  { slug: 'shimmer', name: 'Shimmer', description: 'Loading placeholder animation' },
  { slug: 'sources', name: 'Sources', description: 'Reference source list' },
  { slug: 'suggestion', name: 'Suggestion', description: 'AI prompt suggestions' },
  { slug: 'tool', name: 'Tool', description: 'AI tool call display' },
];

export default function AIPage() {
  return (
    <CatalogIndex
      title="Components"
      description="All available AI element components"
      storageKey="aura.ai.viewMode"
      sections={[
        {
          id: 'ai-components',
          items: aiComponents.map((component) => {
            const entry = getPrimitiveCatalogEntry(component.slug);
            const storybookUrl = `https://cognitedata.github.io/aura/storybook/?path=/docs/ai-${toStorybookSlug(component.name)}--docs`;
            return {
              id: component.slug,
              name: component.name,
              description: component.description,
              href: `/ai/${component.slug}`,
              status: 'in-progress-code-review',
              comingSoon: entry?.comingSoon,
              eosGaRequired: entry?.eosGaRequired,
              duneGaRequired: entry?.duneGaRequired,
              footer: (
                <div className="ml-auto inline-flex items-center gap-1">
                  <a
                    href={AI_FIGMA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => event.stopPropagation()}
                    className="group inline-flex items-center justify-center rounded-sm p-1 text-muted-foreground hover:text-foreground hover:bg-accent"
                    title="Open in Figma"
                    aria-label="Open in Figma"
                  >
                    <img src={figmaIcon} alt="" className={externalIconClass} />
                  </a>
                  <a
                    href={storybookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => event.stopPropagation()}
                    className="group inline-flex items-center justify-center rounded-sm p-1 text-muted-foreground hover:text-foreground hover:bg-accent"
                    title="Open in Storybook"
                    aria-label="Open in Storybook"
                  >
                    <img src={storybookIcon} alt="" className={externalIconClass} />
                  </a>
                </div>
              ),
            };
          }),
        },
      ]}
    />
  );
}
