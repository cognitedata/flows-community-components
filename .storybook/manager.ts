import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

// Create light theme
const lightTheme = create({
  base: 'light',
  brandTitle: 'Aura',
  brandUrl: '/',
  brandImage: './aura-logo.png',
});

// Create dark theme that matches the light version's structure
const darkTheme = create({
  base: 'dark',
  brandTitle: 'Aura',
  brandUrl: '/',
  brandImage: './aura-logo.png',
  // App backgrounds
  appBg: '#1c1c1c',
  appContentBg: '#1c1c1c',
  appPreviewBg: '#1c1c1c',
  appBorderColor: '#333333',
  appBorderRadius: 4,
  // Text colours
  textColor: '#e4e4e7',
  textInverseColor: '#1c1c1c',
  textMutedColor: '#a1a1aa',
  // Toolbar/bar colours
  barTextColor: '#a1a1aa',
  barSelectedColor: '#3b82f6',
  barBg: '#1c1c1c',
  barHoverColor: '#e4e4e7',
  // Form colours
  inputBg: '#262626',
  inputBorder: '#404040',
  inputTextColor: '#e4e4e7',
  inputBorderRadius: 4,
  // Button colours
  buttonBg: '#333333',
  buttonBorder: '#404040',
  booleanBg: '#333333',
  booleanSelectedBg: '#3b82f6',
});

// Set initial theme to light
addons.setConfig({
  theme: lightTheme,
});

// Listen for theme changes from the preview
addons.register('theme-switcher', (api) => {
  const channel = addons.getChannel();
  
  const applyTheme = (theme: string) => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      root.classList.add('dark');
      addons.setConfig({ theme: darkTheme });
    } else {
      root.classList.remove('dark');
      addons.setConfig({ theme: lightTheme });
    }
  };
  
  // Listen for globals updates
  channel.on('updateGlobals', ({ globals }: { globals: Record<string, unknown> }) => {
    const theme = (globals?.theme as string) || 'light';
    applyTheme(theme);
  });
  
  channel.on('setGlobals', ({ globals }: { globals: Record<string, unknown> }) => {
    const theme = (globals?.theme as string) || 'light';
    applyTheme(theme);
  });
  
  // Check initial globals
  const initialGlobals = api.getGlobals();
  const initialTheme = (initialGlobals?.theme as string) || 'light';
  applyTheme(initialTheme);
});

