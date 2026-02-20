/**
 * Vite plugin to scrape CogDocs pages from llms.txt and generate a virtual module.
 *
 * This plugin:
 * 1. Fetches the llms.txt file from the CogDocs site
 * 2. Parses it to extract markdown page URLs
 * 3. Fetches each markdown page during build
 * 4. Generates a virtual module with all content (no files saved to disk)
 */

import type { Plugin } from 'vite';

interface CogDocsEntryBase {
  title: string;
  url: string;
  slug: string;
}

interface CogDocsEntry extends CogDocsEntryBase {
  content: string;
}

/**
 * Fetches content from a URL
 */
async function fetchContent(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch ${url}: ${response.status} ${response.statusText}`
      );
    }
    return await response.text();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    throw error;
  }
}

/**
 * Parses llms.txt content to extract page entries
 */
function parseLlmsTxt(content: string): CogDocsEntryBase[] {
  const entries: CogDocsEntryBase[] = [];
  const lines = content.split('\n');

  for (const line of lines) {
    // Match markdown list items with links: - [Title](URL)
    const match = line.match(/^-\s+\[([^\]]+)\]\(([^)]+)\)/);
    if (match) {
      const [, title, url] = match;
      // Extract slug from URL (e.g., /cogdocs/cogdocs-style-guide.md -> cogdocs-style-guide)
      const urlMatch = url.match(/([^/]+)\.md$/);
      const slug = urlMatch
        ? urlMatch[1]
        : title.toLowerCase().replace(/\s+/g, '-');
      entries.push({ title, url, slug });
    }
  }

  return entries;
}

/**
 * Scrapes all CogDocs pages and fetches their content
 */
async function scrapeCogDocsPages(
  llmsTxtUrl = 'https://cogdocs.mintlify.app/llms.txt'
): Promise<CogDocsEntry[]> {
  console.log(`[cogdocs-scraper] Fetching llms.txt from ${llmsTxtUrl}...`);
  const llmsTxtContent = await fetchContent(llmsTxtUrl);
  const entries = parseLlmsTxt(llmsTxtContent);

  console.log(`[cogdocs-scraper] Found ${entries.length} pages to fetch`);

  const pagesWithContent: CogDocsEntry[] = [];

  for (const entry of entries) {
    try {
      console.log(`[cogdocs-scraper] Fetching: ${entry.title}...`);
      const markdownContent = await fetchContent(entry.url);

      pagesWithContent.push({
        ...entry,
        content: markdownContent,
      });

      console.log(`[cogdocs-scraper] ✓ Fetched: ${entry.title}`);
    } catch (error) {
      console.error(
        `[cogdocs-scraper] ✗ Failed to fetch ${entry.title}:`,
        error
      );
    }
  }

  console.log(`[cogdocs-scraper] ✓ Fetched ${pagesWithContent.length} pages`);
  return pagesWithContent;
}

/**
 * Converts a slug to a valid JavaScript identifier
 */
function toValidIdentifier(slug: string): string {
  // Replace hyphens and other invalid characters with underscores
  let identifier = slug.replace(/[^a-zA-Z0-9_$]/g, '_');

  // Ensure it doesn't start with a number
  if (/^\d/.test(identifier)) {
    identifier = `_${identifier}`;
  }

  // Ensure it's not empty
  if (!identifier) {
    identifier = '_empty';
  }

  return identifier;
}

/**
 * Generates a virtual module that exports all markdown content
 */
function generateVirtualModule(pages: CogDocsEntry[]): string {
  const exports: string[] = [];
  const entries: string[] = [];
  const usedIdentifiers = new Set<string>();

  for (const page of pages) {
    const escapedContent = JSON.stringify(page.content);
    let identifier = toValidIdentifier(page.slug);
    const slug = page.slug;

    // Ensure identifier is unique
    let counter = 0;
    let uniqueIdentifier = identifier;
    while (usedIdentifiers.has(uniqueIdentifier)) {
      counter++;
      uniqueIdentifier = `${identifier}_${counter}`;
    }
    usedIdentifiers.add(uniqueIdentifier);
    identifier = uniqueIdentifier;

    exports.push(`export const ${identifier} = ${escapedContent};`);
    entries.push(
      `  { slug: ${JSON.stringify(slug)}, title: ${JSON.stringify(page.title)}, url: ${JSON.stringify(page.url)}, content: ${identifier} }`
    );
  }

  return `${exports.join('\n')}

export const cogdocsPages = [
${entries.join(',\n')}
];
`;
}

export interface CogDocsScraperOptions {
  /**
   * URL to fetch llms.txt from
   * @default "https://cogdocs.mintlify.app/llms.txt"
   */
  llmsTxtUrl?: string;

  /**
   * Whether to run on dev server start
   * @default true
   */
  runOnDev?: boolean;

  /**
   * Whether to run on build
   * @default true
   */
  runOnBuild?: boolean;
}

export function cogDocsScraperPlugin(
  options: CogDocsScraperOptions = {}
): Plugin {
  const {
    llmsTxtUrl = 'https://cogdocs.mintlify.app/llms.txt',
    runOnDev = true,
    runOnBuild = true,
  } = options;

  let hasRun = false;
  let virtualModuleContent = '';

  const runScrape = async () => {
    try {
      console.log('[cogdocs-scraper] Starting scrape...');
      const pages = await scrapeCogDocsPages(llmsTxtUrl);

      if (pages.length > 0) {
        virtualModuleContent = generateVirtualModule(pages);
        console.log(
          `[cogdocs-scraper] Generated virtual module with ${pages.length} pages`
        );
      }
    } catch (error) {
      console.error('[cogdocs-scraper] Error during scrape:', error);
    }
  };

  return {
    name: 'cogdocs-scraper',
    enforce: 'pre',
    async buildStart() {
      if (!runOnBuild || hasRun) return;
      hasRun = true;
      await runScrape();
    },
    resolveId(id) {
      if (id === 'virtual:cogdocs') {
        return '\0virtual:cogdocs';
      }
      return null;
    },
    load(id) {
      // Handle virtual module
      if (id === '\0virtual:cogdocs') {
        // If we haven't scraped yet, return empty module
        if (!virtualModuleContent) {
          return 'export const cogdocsPages = [];';
        }
        return virtualModuleContent;
      }
      return null;
    },
    configureServer(server) {
      if (!runOnDev) return;

      server.middlewares.use(async (_req, _res, next) => {
        if (hasRun) {
          return next();
        }
        hasRun = true;

        // Run scrape in background
        runScrape().catch((error) => {
          console.error('[cogdocs-scraper] Error during scrape:', error);
        });

        next();
      });
    },
  };
}
