import {
  Sources,
  SourcesTrigger,
  SourcesContent,
  Source,
} from "@/components/ai-elements/sources";
import type { ComponentExamples } from "@/lib/component-examples/types";

function BasicSourcesDemo() {
  return (
    <Sources>
      <SourcesTrigger count={3} />
      <SourcesContent>
        <Source href="https://react.dev" title="React Documentation" />
        <Source href="https://nextjs.org" title="Next.js Documentation" />
        <Source href="https://tailwindcss.com" title="Tailwind CSS" />
      </SourcesContent>
    </Sources>
  );
}

function SourcesWithCustomTitleDemo() {
  return (
    <Sources>
      <SourcesTrigger count={2}>
        <span className="font-medium">View sources (2)</span>
      </SourcesTrigger>
      <SourcesContent>
        <Source href="https://typescriptlang.org" title="TypeScript Handbook" />
        <Source href="https://github.com" title="GitHub" />
      </SourcesContent>
    </Sources>
  );
}

export const sourcesExamples: ComponentExamples = {
  basic: {
    title: "Basic Sources",
    description: "Collapsible source attribution with links",
    component: BasicSourcesDemo,
    difficulty: "beginner",
    code: `import { Sources, SourcesTrigger, SourcesContent, Source } from "@/components/ai-elements/cognite/sources"

export function BasicSourcesDemo() {
  return (
    <Sources>
      <SourcesTrigger count={3} />
      <SourcesContent>
        <Source href="https://react.dev" title="React Documentation" />
        <Source href="https://nextjs.org" title="Next.js Documentation" />
      </SourcesContent>
    </Sources>
  )
}`,
  },

  customTitle: {
    title: "Custom Title",
    description: "Sources with custom trigger text",
    component: SourcesWithCustomTitleDemo,
    difficulty: "beginner",
    code: `import { Sources, SourcesTrigger, SourcesContent, Source } from "@/components/ai-elements/cognite/sources"

export function CustomSourcesDemo() {
  return (
    <Sources>
      <SourcesTrigger count={2}>
        <span>View 2 sources</span>
      </SourcesTrigger>
      <SourcesContent>
        <Source href="https://example.com" title="Example Site" />
      </SourcesContent>
    </Sources>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const sourcesMeta = {
  name: "Sources",
  description:
    "A component that allows a user to view the sources or citations used to generate a response.",
  importPath: "@/components/ai-elements/cognite/sources",
};
