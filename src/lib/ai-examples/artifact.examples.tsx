import {
  Artifact,
  ArtifactHeader,
  ArtifactTitle,
  ArtifactActions,
  ArtifactAction,
  ArtifactContent,
  ArtifactClose,
} from '#aura/artifact';
import { Copy, Download, Share } from 'lucide-react';
import type { ComponentExamples } from '#lib/component-examples/types';

function BasicArtifactDemo() {
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
        <pre className="text-sm">
          {`function greet(name: string) {
  return \`Hello, \${name}!\`;
}`}
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
    code: `import { 
  Artifact, 
  ArtifactHeader, 
  ArtifactTitle, 
  ArtifactActions, 
  ArtifactAction, 
  ArtifactContent,
  ArtifactClose 
} from "#components/ai-elements/cognite/artifact"
import { Copy, Download } from "lucide-react"

export function BasicArtifactDemo() {
  return (
    <Artifact>
      <ArtifactHeader>
        <ArtifactTitle>Generated Code</ArtifactTitle>
        <ArtifactActions>
          <ArtifactAction tooltip="Copy" icon={Copy} />
          <ArtifactAction tooltip="Download" icon={Download} />
          <ArtifactClose />
        </ArtifactActions>
      </ArtifactHeader>
      <ArtifactContent>
        <pre>function greet(name: string) {
  return \`Hello, \${name}!\`;
}</pre>
      </ArtifactContent>
    </Artifact>
  )
}`,
  },

  withActions: {
    title: 'Artifact with Actions',
    description: 'An artifact with multiple action buttons',
    component: WithActionsDemo,
    difficulty: 'beginner',
    code: `import { 
  Artifact, 
  ArtifactHeader, 
  ArtifactTitle, 
  ArtifactActions, 
  ArtifactAction, 
  ArtifactContent,
  ArtifactClose 
} from "#components/ai-elements/cognite/artifact"
import { Copy, Download, Share } from "lucide-react"

export function WithActionsDemo() {
  return (
    <Artifact>
      <ArtifactHeader>
        <div>
          <ArtifactTitle>Analysis Results</ArtifactTitle>
          <p className="text-sm text-muted-foreground">
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
        <p>Your data has been analysed successfully.</p>
      </ArtifactContent>
    </Artifact>
  )
}`,
  },
};

// Component metadata - single source of truth for API documentation
export const artifactMeta = {
  name: 'Artifact',
  description:
    'A container for AI-generated content with header, actions, and tabbed content areas.',
  importPath: '#components/ai-elements/cognite/artifact',
};
