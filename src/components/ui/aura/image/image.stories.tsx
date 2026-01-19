import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from '@storybook/test';
import { Image } from './image';

const meta: Meta<typeof Image> = {
  title: 'AI/Image',
  component: Image,
  tags: ['autodocs'],
  argTypes: {
    base64: {
      control: 'text',
      description: 'Base64 encoded image data',
      table: {
        category: 'Content',
        type: { summary: 'string' },
      },
    },
    mediaType: {
      control: 'text',
      description: 'Media type of the image (e.g., image/png)',
      table: {
        category: 'Content',
        type: { summary: 'string' },
      },
    },
    alt: {
      control: 'text',
      description: 'Alternative text for the image',
      table: {
        category: 'Accessibility',
        type: { summary: 'string' },
      },
    },
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
};

export default meta;
type Story = StoryObj<typeof Image>;

// A simple 100x100 red square as base64 PNG (1x1 pixel scaled)
const redSquareBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mP8z8BQzwAEjDAGVQ4APA0FA83H8ywAAAAASUVORK5CYII=';

// A simple blue gradient placeholder
const blueGradientBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAP0lEQVQoU2NkYGD4z0ABYGJgYGBkoBBQbCCDk5MTI9WMpNhAhn/kG0gLI2l2Ry5IdEYiiSAlAyFCRFkIAACl1QgK+nBCGwAAAABJRU5ErkJggg==';

// A green square placeholder
const greenSquareBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mNkYPj/nwENMNJMwXAAAMSmAgkXdLpnAAAAAElFTkSuQmCC';

/**
 * Default AI-generated image.
 */
export const Default: Story = {
  render: () => (
    <Image
      base64={redSquareBase64}
      mediaType="image/png"
      alt="Generated image"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Default AI-generated image display.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const image = canvas.getByRole('img');
    await expect(image).toBeInTheDocument();
  },
};

/**
 * Image with custom size.
 */
export const CustomSize: Story = {
  render: () => (
    <Image
      base64={blueGradientBase64}
      mediaType="image/png"
      alt="Custom sized image"
      className="w-64 h-64"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Image with custom dimensions.',
      },
    },
  },
};

/**
 * Multiple images.
 */
export const MultipleImages: Story = {
  render: () => (
    <div className="flex gap-4">
      <Image
        base64={redSquareBase64}
        mediaType="image/png"
        alt="Image 1"
        className="w-24 h-24"
      />
      <Image
        base64={blueGradientBase64}
        mediaType="image/png"
        alt="Image 2"
        className="w-24 h-24"
      />
      <Image
        base64={greenSquareBase64}
        mediaType="image/png"
        alt="Image 3"
        className="w-24 h-24"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple images in a gallery layout.',
      },
    },
  },
};

/**
 * Image with rounded corners.
 */
export const RoundedCorners: Story = {
  render: () => (
    <div className="flex gap-4">
      <Image
        base64={redSquareBase64}
        mediaType="image/png"
        alt="Default rounded"
        className="w-24 h-24"
      />
      <Image
        base64={blueGradientBase64}
        mediaType="image/png"
        alt="More rounded"
        className="w-24 h-24 rounded-xl"
      />
      <Image
        base64={greenSquareBase64}
        mediaType="image/png"
        alt="Circular"
        className="w-24 h-24 rounded-full"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Images with different border radius styles.',
      },
    },
  },
};

/**
 * Image in context.
 */
export const InContext: Story = {
  render: () => (
    <div className="max-w-md space-y-4 p-4 border rounded-lg">
      <p className="text-sm text-muted-foreground">
        Here is the generated image based on your prompt:
      </p>
      <Image
        base64={blueGradientBase64}
        mediaType="image/png"
        alt="Generated artwork"
        className="w-full max-w-sm"
      />
      <p className="text-xs text-muted-foreground">
        Generated using AI image model
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Image displayed in the context of a message.',
      },
    },
  },
};

/**
 * Visual regression testing.
 */
export const VisualRegression: Story = {
  render: () => (
    <div className="space-y-8 p-4">
      {/* Default */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Default</h3>
        <Image
          base64={redSquareBase64}
          mediaType="image/png"
          alt="Test image"
        />
      </div>

      {/* Custom size */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Custom Size</h3>
        <Image
          base64={blueGradientBase64}
          mediaType="image/png"
          alt="Sized image"
          className="w-32 h-32"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Images for visual regression testing.',
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
  args: {
    base64: redSquareBase64,
    mediaType: 'image/png',
    alt: 'Playground image',
    className: 'w-48 h-48',
  },
  render: (args) => <Image {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'Interactive image example - use controls to experiment.',
      },
    },
  },
};
