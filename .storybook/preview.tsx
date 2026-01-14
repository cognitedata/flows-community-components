import type { Preview } from '@storybook/nextjs';
import React, { useEffect } from 'react';
import '../src/app/globals.css';

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
        // Apply theme class to the preview document
        const root = document.documentElement;
        if (theme === 'dark') {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }

        // Try to apply theme to the parent Storybook manager frame
        try {
          const parentDoc = window.parent?.document;
          if (parentDoc && parentDoc !== document) {
            const parentRoot = parentDoc.documentElement;
            parentRoot.setAttribute('data-theme', theme);
            if (theme === 'dark') {
              parentRoot.classList.add('dark');
            } else {
              parentRoot.classList.remove('dark');
            }
          }
        } catch {
          // Cross-origin restriction - ignore
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
