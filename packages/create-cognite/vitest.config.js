import { defineConfig } from "vitest/config";

export default defineConfig({
  root: ".",
  test: {
    environment: "node",
    globals: true,
    css: false,
    pool: "threads",
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
  },
  css: {
    postcss: false,
  },
});
