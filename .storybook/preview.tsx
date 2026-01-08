import type { Preview } from '@storybook/nextjs'
import { useEffect } from 'react'
import '../src/app/globals.css'

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
        // Apply theme class to the document for proper CSS variable inheritance
        const root = document.documentElement;
        if (theme === 'dark') {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      }, [theme]);

      return (
        <div 
          className={`min-h-screen p-4 ${theme === 'dark' ? 'dark bg-background text-foreground' : 'bg-background text-foreground'}`}
        >
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
