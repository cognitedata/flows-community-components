import { execFile, execFileSync } from 'node:child_process';
import path from 'node:path';
import { promisify } from 'node:util';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import type { Plugin } from 'vite';
import { defineConfig } from 'vite';

import {
  GITHUB_OWNER,
  GITHUB_REPO,
  fetchGitHubStarCount,
  parseGitHubStarCountJson,
} from './src/lib/github';
import { storySourcePlugin } from './vite-plugin-story-source';

const execFileAsync = promisify(execFile);

function readTokenFromGitCredential(): string | undefined {
  try {
    const stdout = execFileSync('git', ['credential', 'fill'], {
      encoding: 'utf8',
      input: 'protocol=https\nhost=github.com\n\n',
      timeout: 8000,
    });
    const line = stdout
      .split('\n')
      .find((entry) => entry.startsWith('password='));
    const token = line?.slice('password='.length).trim();
    return token && token.length > 0 ? token : undefined;
  } catch {
    return undefined;
  }
}

async function readGitHubToken() {
  const fromEnv = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  if (fromEnv && fromEnv.length > 0) return fromEnv;
  return readTokenFromGitCredential();
}

async function fetchStarsFromGhCli() {
  try {
    const { stdout } = await execFileAsync(
      'gh',
      [
        'api',
        `repos/${GITHUB_OWNER}/${GITHUB_REPO}`,
        '--jq',
        '.stargazers_count',
      ],
      { timeout: 5000 }
    );
    return parseGitHubStarCountJson(stdout.trim());
  } catch {
    return null;
  }
}

async function resolveDevStarCount() {
  const token = await readGitHubToken();
  return (
    (await fetchGitHubStarCount(token).catch(() => null)) ??
    (await fetchStarsFromGhCli())
  );
}

function githubStarsDevPlugin(): Plugin {
  let cachedStars: number | undefined;

  return {
    name: 'github-stars-dev',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathname = (req.url ?? '').split('?')[0];
        if (pathname !== '/__github-stars') {
          next();
          return;
        }

        const countPromise =
          cachedStars === undefined
            ? resolveDevStarCount()
            : Promise.resolve(cachedStars);

        void countPromise
          .then((stars) => {
            if (stars !== null) cachedStars = stars;
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Cache-Control', 'no-store');
            res.end(JSON.stringify({ stars }));
          })
          .catch(() => {
            res.statusCode = 502;
            res.end(JSON.stringify({ stars: null }));
          });
      });
    },
  };
}

async function resolveGitHubStatsJson() {
  if (process.env.VITE_GITHUB_STATS) return process.env.VITE_GITHUB_STATS;

  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  const stars = await fetchGitHubStarCount(
    token && token.length > 0 ? token : undefined
  ).catch(() => null);
  if (stars === null) return '';
  const statsJson = JSON.stringify({ stars });
  process.env.VITE_GITHUB_STATS = statsJson;
  return statsJson;
}

// Plugin to handle history API fallback for SPA routing with custom base paths
// This ensures that direct access to routes serves index.html, especially important
// for GitHub Pages deployments with non-root base paths (e.g., /aura/branches/...)
// Note: Vite's default SPA mode handles root paths, but this custom plugin ensures
// proper handling of base paths in the dev server during development
function historyApiFallback(): Plugin {
  return {
    name: 'history-api-fallback',
    configureServer(server) {
      const base = process.env.PAGES_BASE_PATH || '/';

      server.middlewares.use((req, _res, next) => {
        const url = req.url || '';

        // Skip if it's a Vite internal request, static asset, or API request
        // Check for file extensions (but allow .html files to be handled)
        const hasFileExtension = /\.\w+$/.test(url.split('?')[0]);
        const isHtmlFile = url.endsWith('.html');

        if (
          (hasFileExtension && !isHtmlFile) || // Has file extension but not .html
          url.startsWith('/__github-stars') ||
          url.startsWith('/@') || // Vite internal
          url.startsWith('/node_modules') ||
          url.startsWith('/src') ||
          url.startsWith('/public')
        ) {
          return next();
        }

        // For routes that don't correspond to files, serve index.html
        // This allows React Router to handle client-side routing
        if (!hasFileExtension || isHtmlFile) {
          req.url = base === '/' ? '/index.html' : `${base}/index.html`;
        }

        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(async () => {
  const githubStatsJson = await resolveGitHubStatsJson();

  return {
    define: {
      'import.meta.env.VITE_GITHUB_STATS': JSON.stringify(githubStatsJson),
    },
    base: process.env.PAGES_BASE_PATH || '/',
    server: {
      host: true,
      port: 5173,
      strictPort: true,
    },
    plugins: [
      react({
        babel: {
          plugins: [['babel-plugin-react-compiler']],
        },
      }),
      tailwindcss(),
      storySourcePlugin(),
      githubStarsDevPlugin(),
      historyApiFallback(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
});
