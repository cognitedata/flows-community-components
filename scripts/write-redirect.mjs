import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, '..', 'dist');
const redirectUrl = 'https://cog.link/aura';

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="refresh" content="0; url=${redirectUrl}" />
    <link rel="canonical" href="${redirectUrl}" />
    <title>Redirecting to Aura Docs</title>
    <meta name="robots" content="noindex" />
    <script>window.location.replace(${JSON.stringify(redirectUrl)});</script>
  </head>
  <body>
    <p>Redirecting to <a href="${redirectUrl}">${redirectUrl}</a>&hellip;</p>
  </body>
</html>
`;

mkdirSync(distDir, { recursive: true });
writeFileSync(resolve(distDir, 'index.html'), html);
writeFileSync(resolve(distDir, '404.html'), html);

console.log(
  `Wrote redirect to ${redirectUrl} at dist/index.html and dist/404.html`
);
