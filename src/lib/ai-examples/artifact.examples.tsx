import {
  Artifact,
  ArtifactHeader,
  ArtifactTitle,
  ArtifactActions,
  ArtifactAction,
  ArtifactContent,
  ArtifactClose,
} from '@/components/ui/cognite/artifact';
import {
  IconCopy as Copy,
  IconDownload as Download,
  IconShare3 as Share,
} from '@tabler/icons-react';
import type { ComponentExamples } from '@/lib/component-examples/types';

const basicArtifactCodeLines = [
  'function greet(name: string) {',
  '  return `Hello, ${name}!`;',
  '}',
];

function BasicArtifactDemo() {
  const code = basicArtifactCodeLines.join('\n');

  return (
    <Artifact className="max-w-2xl">
      <ArtifactHeader>
        <ArtifactTitle>Generated Code</ArtifactTitle>
        <ArtifactActions>
          <ArtifactAction tooltip="Copy" icon={Copy} />
          <ArtifactAction tooltip="Download" icon={Download} />
          <ArtifactClose />
        </ArtifactActions>
      </ArtifactHeader>
      <ArtifactContent>
        <pre className="text-sm bg-muted/40 rounded-md p-3 overflow-auto">
          <code>{code}</code>
        </pre>
      </ArtifactContent>
    </Artifact>
  );
}

function WithActionsDemo() {
  return (
    <Artifact className="max-w-2xl">
      <ArtifactHeader>
        <div>
          <ArtifactTitle>Analysis Results</ArtifactTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Data analysis complete
          </p>
        </div>
        <ArtifactActions>
          <ArtifactAction tooltip="Copy" icon={Copy} />
          <ArtifactAction tooltip="Download" icon={Download} />
          <ArtifactAction tooltip="Share" icon={Share} />
          <ArtifactClose />
        </ArtifactActions>
      </ArtifactHeader>
      <ArtifactContent>
        <div className="prose prose-sm">
          <p>Your data has been analysed successfully.</p>
          <ul>
            <li>Total records: 1,234</li>
            <li>Processing time: 2.3s</li>
            <li>Success rate: 99.8%</li>
          </ul>
        </div>
      </ArtifactContent>
    </Artifact>
  );
}

export const artifactExamples: ComponentExamples = {
  basic: {
    title: 'Basic Artifact',
    description: 'A simple artifact container with header and content',
    component: BasicArtifactDemo,
    difficulty: 'beginner',
    code: `
import {
  Artifact,
  ArtifactHeader,
  ArtifactTitle,
  ArtifactActions,
  ArtifactAction,
  ArtifactContent,
  ArtifactClose,
} from '@/components/ui/cognite/artifact';
import {
  IconCopy as Copy,
  IconDownload as Download,
  IconShare3 as Share,
} from '@tabler/icons-react';

export function BasicArtifactDemo() {
  const codeLines = [
    'function greet(name: string) {',
    '  return \`Hello, \${name}!\`;',
    '}',
  ];
  const code = codeLines.join('\\n');

  return (
    <Artifact className="max-w-2xl">
      <ArtifactHeader>
        <ArtifactTitle>Generated Code</ArtifactTitle>
        <ArtifactActions>
          <ArtifactAction tooltip="Copy" icon={Copy} />
          <ArtifactAction tooltip="Download" icon={Download} />
          <ArtifactClose />
        </ArtifactActions>
      </ArtifactHeader>
      <ArtifactContent>
        <pre className="text-sm bg-muted/40 rounded-md p-3 overflow-auto">
          <code>{code}</code>
        </pre>
      </ArtifactContent>
    </Artifact>
  );
}
`,
  },

  withActions: {
    title: 'Artifact with Actions',
    description: 'An artifact with multiple action buttons',
    component: WithActionsDemo,
    difficulty: 'beginner',
    code: `
import {
  Artifact,
  ArtifactHeader,
  ArtifactTitle,
  ArtifactActions,
  ArtifactAction,
  ArtifactContent,
  ArtifactClose,
} from '@/components/ui/cognite/artifact';
import {
  IconCopy as Copy,
  IconDownload as Download,
  IconShare3 as Share,
} from '@tabler/icons-react';

export function WithActionsDemo() {
  return (
    <Artifact className="max-w-2xl">
      <ArtifactHeader>
        <div>
          <ArtifactTitle>Analysis Results</ArtifactTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Data analysis complete
          </p>
        </div>
        <ArtifactActions>
          <ArtifactAction tooltip="Copy" icon={Copy} />
          <ArtifactAction tooltip="Download" icon={Download} />
          <ArtifactAction tooltip="Share" icon={Share} />
          <ArtifactClose />
        </ArtifactActions>
      </ArtifactHeader>
      <ArtifactContent>
        <div className="prose prose-sm">
          <p>Your data has been analysed successfully.</p>
          <ul>
            <li>Total records: 1,234</li>
            <li>Processing time: 2.3s</li>
            <li>Success rate: 99.8%</li>
          </ul>
        </div>
      </ArtifactContent>
    </Artifact>
  );
}
`,
  },
};

// Component metadata - single source of truth for API documentation
export const artifactMeta = {
  name: 'Artifact',
  description:
    'A container for AI-generated content with header, actions, and tabbed content areas.',
  importPath: '@/components/ai-elements/cognite/artifact',
};
