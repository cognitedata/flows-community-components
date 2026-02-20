import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import { expect, waitFor, within } from 'storybook/test';

import { Shimmer } from './shimmer';
const meta: Meta<typeof Shimmer> = {
  title: 'AI/Shimmer',
  component: Shimmer,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-8">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    children: {
      control: 'text',
      table: {
        category: 'Content',
        type: {
          summary: 'string',
        },
      },
    },
    as: {
      control: 'select',
      options: ['p', 'span', 'div', 'h1', 'h2', 'h3'],
      table: {
        category: 'Variants/Styling',
        type: {
          summary: 'ElementType',
        },
        defaultValue: {
          summary: 'p',
        },
      },
    },
    variant: {
      control: 'select',
      options: [
        'default',
        'nordic',
        'aurora',
        'dusk',
        'equinox',
        'summer',
        'spring',
        'fall',
      ],
      table: {
        category: 'Variants/Styling',
        type: {
          summary:
            'default | nordic | aurora | dusk | equinox | summer | spring | fall',
        },
        defaultValue: {
          summary: 'default',
        },
      },
    },
    duration: {
      control: 'number',
      table: {
        category: 'Behavior',
        type: {
          summary: 'number',
        },
        defaultValue: {
          summary: '2',
        },
      },
    },
    spread: {
      control: 'number',
      table: {
        category: 'Behavior',
        type: {
          summary: 'number',
        },
        defaultValue: {
          summary: '2',
        },
      },
    },
    className: {
      control: 'text',
      table: {
        category: 'Variants/Styling',
      },
    },
  },
  parameters: {
    layout: 'centered',
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: false,
          },
        ],
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Shimmer>;
export const Basic: Story = {
  parameters: {
    order: 1,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const shimmer = canvas.getByText('Processing...');
    await expect(shimmer).toBeInTheDocument();
  },
  render: () => <Shimmer>Processing...</Shimmer>,
};
export const GradientVariants: Story = {
  parameters: {
    order: 2,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const variants = [
      'Default gradient',
      'Nordic gradient',
      'Aurora gradient',
      'Dusk gradient',
      'Equinox gradient',
      'Summer gradient',
      'Spring gradient',
      'Fall gradient',
    ];
    await Promise.all(
      variants.map((variant) =>
        expect(canvas.getByText(variant)).toBeInTheDocument()
      )
    );
  },
  render: () => (
    <div className="w-full flex flex-col items-start gap-4">
      <Shimmer variant="default">Default gradient</Shimmer>
      <Shimmer variant="nordic">Nordic gradient</Shimmer>
      <Shimmer variant="aurora">Aurora gradient</Shimmer>
      <Shimmer variant="dusk">Dusk gradient</Shimmer>
      <Shimmer variant="equinox">Equinox gradient</Shimmer>
      <Shimmer variant="summer">Summer gradient</Shimmer>
      <Shimmer variant="spring">Spring gradient</Shimmer>
      <Shimmer variant="fall">Fall gradient</Shimmer>
    </div>
  ),
};
export const ElementTypes: Story = {
  parameters: {
    order: 3,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const headings = [
      {
        level: 1,
        name: /heading 1 with shimmer/i,
      },
      {
        level: 2,
        name: /heading 2 with shimmer/i,
      },
      {
        level: 3,
        name: /heading 3 with shimmer/i,
      },
    ];
    await Promise.all(
      headings.map(({ level, name }) =>
        expect(
          canvas.getByRole('heading', {
            level,
            name,
          })
        ).toBeInTheDocument()
      )
    );
  },
  render: () => (
    <div className="w-full flex flex-col items-start gap-6">
      <Shimmer as="h1" className="text-4xl font-bold tracking-tight">
        Heading 1 with shimmer
      </Shimmer>
      <Shimmer as="h2" className="text-2xl font-semibold">
        Heading 2 with shimmer
      </Shimmer>
      <Shimmer as="h3" className="text-xl font-medium">
        Heading 3 with shimmer
      </Shimmer>
      <Shimmer as="p" className="text-base">
        Paragraph text with shimmer effect applied.
      </Shimmer>
      <p className="text-base">
        Inline text with a{' '}
        <Shimmer as="span" className="font-medium">
          shimmer span
        </Shimmer>{' '}
        inside it.
      </p>
      <Shimmer as="div" className="text-sm text-muted-foreground">
        Div element styled as secondary text
      </Shimmer>
    </div>
  ),
};
export const AnimationDurations: Story = {
  parameters: {
    order: 4,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const durations = [
      'Fast (1 second)',
      'Default (2 seconds)',
      'Slow (3 seconds)',
      'Very slow (4 seconds)',
    ];
    await Promise.all(
      durations.map((duration) =>
        expect(canvas.getByText(duration)).toBeInTheDocument()
      )
    );
  },
  render: () => (
    <div className="w-full flex flex-col items-start gap-4">
      <Shimmer duration={1}>Fast (1 second)</Shimmer>
      <Shimmer duration={2}>Default (2 seconds)</Shimmer>
      <Shimmer duration={3}>Slow (3 seconds)</Shimmer>
      <Shimmer duration={4}>Very slow (4 seconds)</Shimmer>
    </div>
  ),
};
export const SpreadValues: Story = {
  parameters: {
    order: 5,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const spreads = [
      'Narrow spread (1)',
      'Default spread (2)',
      'Wide spread (3)',
      'Very wide spread (4)',
    ];
    await Promise.all(
      spreads.map((spread) =>
        expect(canvas.getByText(spread)).toBeInTheDocument()
      )
    );
  },
  render: () => (
    <div className="w-full flex flex-col items-start gap-4">
      <Shimmer spread={1}>Narrow spread (1)</Shimmer>
      <Shimmer spread={2}>Default spread (2)</Shimmer>
      <Shimmer spread={3}>Wide spread (3)</Shimmer>
      <Shimmer spread={4}>Very wide spread (4)</Shimmer>
    </div>
  ),
};
export const LongText: Story = {
  parameters: {
    order: 6,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await Promise.all([
      expect(
        canvas.getByText(
          /This is a longer piece of text that demonstrates how the shimmer effect works with extended content/i
        )
      ).toBeInTheDocument(),
      expect(
        canvas.getByText(
          /The shimmer animation smoothly transitions across the entire length of the text, creating an engaging loading effect/i
        )
      ).toBeInTheDocument(),
    ]);
  },
  render: () => (
    <div className="w-full flex flex-col items-start gap-4 max-w-md">
      <Shimmer>
        This is a longer piece of text that demonstrates how the shimmer effect
        works with extended content.
      </Shimmer>
      <Shimmer variant="aurora">
        The shimmer animation smoothly transitions across the entire length of
        the text, creating an engaging loading effect.
      </Shimmer>
    </div>
  ),
};
export const InlineUsage: Story = {
  parameters: {
    order: 7,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const inlineTexts = [
      /Your request is/i,
      'processing',
      /Status:/i,
      'Analyzing data',
      /Loading/i,
      'configuration',
    ];
    await Promise.all(
      inlineTexts.map((text) =>
        expect(canvas.getByText(text)).toBeInTheDocument()
      )
    );
  },
  render: () => (
    <div className="w-full flex flex-col items-start gap-4 max-w-md">
      <p className="text-base">
        Your request is <Shimmer as="span">processing</Shimmer> and will be
        ready shortly.
      </p>
      <p className="text-base">
        Status:{' '}
        <Shimmer as="span" variant="aurora">
          Analyzing data
        </Shimmer>
      </p>
      <p className="text-base">
        Loading{' '}
        <Shimmer as="span" variant="nordic">
          configuration
        </Shimmer>{' '}
        files...
      </p>
    </div>
  ),
};
export const CustomStyling: Story = {
  parameters: {
    order: 8,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const styledTexts = [
      'Large bold text',
      'Small muted text',
      'Medium semibold text',
    ];
    await Promise.all(
      styledTexts.map((text) =>
        expect(canvas.getByText(text)).toBeInTheDocument()
      )
    );
  },
  render: () => (
    <div className="w-full flex flex-col items-start gap-4">
      <Shimmer className="text-2xl font-bold">Large bold text</Shimmer>
      <Shimmer className="text-sm text-muted-foreground" variant="dusk">
        Small muted text
      </Shimmer>
      <Shimmer className="text-lg font-semibold" variant="summer">
        Medium semibold text
      </Shimmer>
    </div>
  ),
};
export const LoadingStates: Story = {
  parameters: {
    order: 9,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('heading', {
        name: /Processing Request/i,
      })
    ).toBeInTheDocument();
    await expect(
      canvas.getByRole('heading', {
        name: /System Status/i,
      })
    ).toBeInTheDocument();
    await expect(
      canvas.getByText('Analyzing input parameters...')
    ).toBeInTheDocument();
    await expect(
      canvas.getByText('Data synchronization in progress')
    ).toBeInTheDocument();
    await waitFor(
      () => {
        expect(
          canvas.getByText('Input parameters analyzed.')
        ).toBeInTheDocument();
        expect(
          canvas.getByText('Data synchronization complete.')
        ).toBeInTheDocument();
      },
      {
        timeout: 4000,
      }
    );
    await waitFor(() => {
      expect(
        canvas.queryByText('Analyzing input parameters...')
      ).not.toBeInTheDocument();
      expect(
        canvas.queryByText('Data synchronization in progress')
      ).not.toBeInTheDocument();
    });
  },
  render: function LoadingStatesStory() {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 3000);
      return () => clearTimeout(timer);
    }, []);
    return (
      <div className="w-full flex flex-col items-start gap-6 max-w-md">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Processing Request</h3>
          {loading ? (
            <>
              <Shimmer>Analyzing input parameters...</Shimmer>
              <Shimmer variant="aurora">Generating response...</Shimmer>
              <Shimmer variant="nordic">Finalizing results...</Shimmer>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              Input parameters analyzed.
            </p>
          )}
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">System Status</h3>
          <p className="text-sm">
            Current operation:{' '}
            {loading ? (
              <Shimmer as="span" variant="dusk">
                Data synchronization in progress
              </Shimmer>
            ) : (
              <span className="text-green-500 font-medium">
                Data synchronization complete.
              </span>
            )}
          </p>
          <p className="text-sm">
            Estimated time:{' '}
            {loading ? (
              <Shimmer as="span" variant="equinox">
                Calculating...
              </Shimmer>
            ) : (
              <span>Completed.</span>
            )}
          </p>
        </div>
      </div>
    );
  },
};
export const Playground: Story = {
  args: {
    children: 'Playground shimmer text',
    variant: 'default',
    duration: 2,
    spread: 2,
    as: 'p',
  },
  render: (args) => <Shimmer {...args} />,
  parameters: {
    order: 99,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const shimmer = canvas.getByText('Playground shimmer text');
    await expect(shimmer).toBeInTheDocument();
  },
};
