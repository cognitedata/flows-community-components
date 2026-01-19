import type { Meta, StoryObj } from '@storybook/react';
import {
  InlineCitation,
  InlineCitationLink,
  InlineCitationGroup,
} from './inline-citation';
import { IconBrandGithub, IconFileText, IconWorld } from '@tabler/icons-react';

const meta: Meta<typeof InlineCitation> = {
  title: 'AI/Inline Citation',
  component: InlineCitation,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes',
      table: {
        category: 'Styling',
      },
    },
  },
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="max-w-lg p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof InlineCitation>;

/**
 * Default inline citation.
 */
export const Default: Story = {
  render: () => (
    <p className="text-sm">
      According to the documentation
      <InlineCitation>
        <InlineCitationLink href="https://example.com/docs" variant="fjord">
          1
        </InlineCitationLink>
      </InlineCitation>
      , this is how you implement the feature.
    </p>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Default inline citation with numbered reference.',
      },
    },
  },
};

/**
 * Citation with text label.
 */
export const WithTextLabel: Story = {
  render: () => (
    <p className="text-sm">
      The API reference
      <InlineCitation>
        <InlineCitationLink href="https://example.com/api" variant="mountain">
          API Docs
        </InlineCitationLink>
      </InlineCitation>
      explains the available endpoints.
    </p>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Citation with descriptive text label.',
      },
    },
  },
};

/**
 * Multiple citations.
 */
export const MultipleCitations: Story = {
  render: () => (
    <p className="text-sm">
      This feature is documented in multiple sources
      <InlineCitation>
        <InlineCitationLink href="https://example.com/1" variant="fjord">
          1
        </InlineCitationLink>
      </InlineCitation>
      <InlineCitation>
        <InlineCitationLink href="https://example.com/2" variant="mountain">
          2
        </InlineCitationLink>
      </InlineCitation>
      <InlineCitation>
        <InlineCitationLink href="https://example.com/3" variant="coral">
          3
        </InlineCitationLink>
      </InlineCitation>
      .
    </p>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Paragraph with multiple inline citations.',
      },
    },
  },
};

/**
 * Citation with icons.
 */
export const WithIcons: Story = {
  render: () => (
    <div className="space-y-2 text-sm">
      <p>
        GitHub repository
        <InlineCitation>
          <InlineCitationLink 
            href="https://github.com/example/repo" 
            variant="fjord"
            icon={<IconBrandGithub className="size-3" />}
          >
            repo
          </InlineCitationLink>
        </InlineCitation>
      </p>
      <p>
        Official documentation
        <InlineCitation>
          <InlineCitationLink 
            href="https://docs.example.com" 
            variant="mountain"
            icon={<IconFileText className="size-3" />}
          >
            docs
          </InlineCitationLink>
        </InlineCitation>
      </p>
      <p>
        Website
        <InlineCitation>
          <InlineCitationLink 
            href="https://example.com" 
            variant="coral"
            icon={<IconWorld className="size-3" />}
          >
            site
          </InlineCitationLink>
        </InlineCitation>
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Citations with custom icons.',
      },
    },
  },
};

/**
 * Citation group.
 */
export const CitationGroup: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-sm">
        Related sources for this topic:
      </p>
      <InlineCitationGroup>
        <InlineCitation>
          <InlineCitationLink href="https://example.com/1" variant="fjord">
            React Docs
          </InlineCitationLink>
        </InlineCitation>
        <InlineCitation>
          <InlineCitationLink href="https://example.com/2" variant="mountain">
            TypeScript Handbook
          </InlineCitationLink>
        </InlineCitation>
        <InlineCitation>
          <InlineCitationLink href="https://example.com/3" variant="coral">
            MDN Reference
          </InlineCitationLink>
        </InlineCitation>
      </InlineCitationGroup>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Group of citations displayed together.',
      },
    },
  },
};

/**
 * Different color variants.
 */
export const ColorVariants: Story = {
  render: () => (
    <div className="space-y-2">
      <p className="text-sm">
        Fjord variant
        <InlineCitation>
          <InlineCitationLink href="#" variant="fjord">fjord</InlineCitationLink>
        </InlineCitation>
      </p>
      <p className="text-sm">
        Mountain variant
        <InlineCitation>
          <InlineCitationLink href="#" variant="mountain">mountain</InlineCitationLink>
        </InlineCitation>
      </p>
      <p className="text-sm">
        Coral variant
        <InlineCitation>
          <InlineCitationLink href="#" variant="coral">coral</InlineCitationLink>
        </InlineCitation>
      </p>
      <p className="text-sm">
        Sunset variant
        <InlineCitation>
          <InlineCitationLink href="#" variant="sunset">sunset</InlineCitationLink>
        </InlineCitation>
      </p>
      <p className="text-sm">
        Forest variant
        <InlineCitation>
          <InlineCitationLink href="#" variant="forest">forest</InlineCitationLink>
        </InlineCitation>
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different color variant options for citations.',
      },
    },
  },
};

/**
 * In context paragraph.
 */
export const InContext: Story = {
  render: () => (
    <div className="prose prose-sm max-w-none text-foreground">
      <p>
        React is a JavaScript library for building user interfaces
        <InlineCitation>
          <InlineCitationLink href="https://react.dev" variant="fjord">1</InlineCitationLink>
        </InlineCitation>
        . It was developed by Facebook and is now maintained by Meta and the open-source community
        <InlineCitation>
          <InlineCitationLink href="https://github.com/facebook/react" variant="mountain">2</InlineCitationLink>
        </InlineCitation>
        .
      </p>
      <p>
        React uses a virtual DOM to efficiently update the UI
        <InlineCitation>
          <InlineCitationLink href="https://legacy.reactjs.org/docs/faq-internals.html" variant="coral">3</InlineCitationLink>
        </InlineCitation>
        . This approach minimizes direct manipulation of the actual DOM, resulting in better performance
        <InlineCitation>
          <InlineCitationLink href="https://example.com/perf" variant="sunset">4</InlineCitationLink>
        </InlineCitation>
        .
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Citations used naturally within paragraph content.',
      },
    },
  },
};

/**
 * Visual regression testing.
 */
export const VisualRegression: Story = {
  render: () => (
    <div className="space-y-6 p-4">
      {/* Basic */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Basic</h3>
        <p className="text-sm">
          Text with citation
          <InlineCitation>
            <InlineCitationLink href="#" variant="fjord">1</InlineCitationLink>
          </InlineCitation>
          .
        </p>
      </div>

      {/* With icon */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">With Icon</h3>
        <p className="text-sm">
          Citation with icon
          <InlineCitation>
            <InlineCitationLink 
              href="#" 
              variant="mountain"
              icon={<IconFileText className="size-3" />}
            >
              docs
            </InlineCitationLink>
          </InlineCitation>
          .
        </p>
      </div>

      {/* Group */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Group</h3>
        <InlineCitationGroup>
          <InlineCitation>
            <InlineCitationLink href="#" variant="fjord">1</InlineCitationLink>
          </InlineCitation>
          <InlineCitation>
            <InlineCitationLink href="#" variant="coral">2</InlineCitationLink>
          </InlineCitation>
        </InlineCitationGroup>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Inline citations for visual regression testing.',
      },
    },
    chromatic: {
      disableSnapshot: false,
    },
  },
};

/**
 * Interactive playground.
 */
export const Playground: Story = {
  render: () => (
    <p className="text-sm">
      This is a playground citation example
      <InlineCitation>
        <InlineCitationLink href="https://example.com" variant="mountain">
          source
        </InlineCitationLink>
      </InlineCitation>
      .
    </p>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive inline citation example.',
      },
    },
  },
};
