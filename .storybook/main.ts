import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  staticDirs: ["../public"],
  async viteFinal(config, { configType }) {
    // Use environment variable if set (for GitHub Pages deployment)
    // For Chromatic/CI builds without explicit base path, use root path (/)
    // Otherwise use /aura/storybook for production builds, / for development
    const basePath =
      process.env.STORYBOOK_BASE_PATH ||
      (process.env.CI ? "/" : configType === "PRODUCTION" ? "/aura/storybook" : "/");

    return mergeConfig(config, {
      base: basePath,
    });
  },
};

export default config;
