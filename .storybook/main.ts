import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-docs",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    {
      name: "@storybook/addon-mcp",
      options: {
        toolsets: {
          dev: true,  // Story URLs and UI building instructions
          docs: true, // Component documentation
        },
      },
    },
  ],
  "framework": {
    "name": "@storybook/nextjs",
    "options": {}
  },
  "features": {
    experimentalComponentsManifest: true, // Required for docs toolset
  },
  "staticDirs": [
    "../public"
  ]
};
export default config;
