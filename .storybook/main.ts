import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

const isChromatic = Boolean(process.env.CHROMATIC);
const dirname = path.dirname(fileURLToPath(import.meta.url));
const config: StorybookConfig = {
  stories: [
    '../src/components/ui/community/**/*.mdx',
    '../src/components/ui/community/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    ...(isChromatic ? ['@chromatic-com/storybook'] : []),
    '@storybook/addon-vitest',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  staticDirs: ['../public'],
  async viteFinal(config, { configType }) {
    // Use environment variable if set (for GitHub Pages deployment)
    // For Chromatic/CI builds without explicit base path, use root path (/)
    // Otherwise use /aura/storybook for production builds, / for development
    const basePath =
      process.env.STORYBOOK_BASE_PATH ||
      (process.env.CI
        ? '/'
        : configType === 'PRODUCTION'
          ? '/aura/storybook'
          : '/');

    return mergeConfig(config, {
      base: basePath,
      resolve: {
        alias: {
          '@': path.resolve(dirname, '../src'),
        },
      },
    });
  },
};

export default config;
