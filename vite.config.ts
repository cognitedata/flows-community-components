import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import type { Plugin } from "vite";
import { defineConfig } from "vite";
import { cogDocsScraperPlugin } from "./vite-plugin-cogdocs-scraper";
import { storySourcePlugin } from "./vite-plugin-story-source";

// Plugin to handle history API fallback for SPA routing with custom base paths
// This ensures that direct access to routes serves index.html, especially important
// for GitHub Pages deployments with non-root base paths (e.g., /aura/branches/...)
// Note: Vite's default SPA mode handles root paths, but this custom plugin ensures
// proper handling of base paths in the dev server during development
function historyApiFallback(): Plugin {
  return {
    name: "history-api-fallback",
    configureServer(server) {
      const base = process.env.PAGES_BASE_PATH || "/";

      server.middlewares.use((req, _res, next) => {
        const url = req.url || "";

        // Skip if it's a Vite internal request, static asset, or API request
        // Check for file extensions (but allow .html files to be handled)
        const hasFileExtension = /\.\w+$/.test(url.split("?")[0]);
        const isHtmlFile = url.endsWith(".html");

        if (
          (hasFileExtension && !isHtmlFile) || // Has file extension but not .html
          url.startsWith("/@") || // Vite internal
          url.startsWith("/node_modules") ||
          url.startsWith("/src") ||
          url.startsWith("/public")
        ) {
          return next();
        }

        // For routes that don't correspond to files, serve index.html
        // This allows React Router to handle client-side routing
        if (!hasFileExtension || isHtmlFile) {
          req.url = base === "/" ? "/index.html" : `${base}/index.html`;
        }

        next();
      });
    },
  };
}

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
    historyApiFallback(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
