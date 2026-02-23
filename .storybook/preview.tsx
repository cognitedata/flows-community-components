import type { Preview } from '@storybook/react-vite';
import { type ComponentType, useEffect } from 'react';
import '../src/globals.css';

export const render: Preview['render'] = (args, context) => {
  const Component = context.component as ComponentType<typeof args> | undefined;

  if (!Component) {
    return null;
  }

  return <Component {...args} />;
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      disable: true,
    },
    layout: 'padded',
    options: {
      storySort: {
        order: ['Foundations', 'Primitives', 'AI', '*'],
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Theme for the components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light';

      useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      }, [theme]);

      return (
        <div
          className={
            theme === 'dark' ? 'dark text-foreground' : 'text-foreground'
          }
        >
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
