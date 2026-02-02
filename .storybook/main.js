const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-docs",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "@chromatic-com/storybook",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  staticDirs: ["../public"],
  async viteFinal(config, { configType }) {
    const { mergeConfig } = await import("vite");
    const basePath =
      process.env.STORYBOOK_BASE_PATH ||
      (process.env.CI ? "/" : configType === "PRODUCTION" ? "/aura/storybook" : "/");

    return mergeConfig(config, {
      base: basePath,
    });
  },
};

module.exports = config;
