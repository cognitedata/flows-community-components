import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { cogDocsScraperPlugin } from "./vite-plugin-cogdocs-scraper";
import { storySourcePlugin } from "./vite-plugin-story-source";

// https://vite.dev/config/
export default defineConfig({
  base: process.env.PAGES_BASE_PATH || "/",
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    tailwindcss(),
    storySourcePlugin(),
    cogDocsScraperPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
