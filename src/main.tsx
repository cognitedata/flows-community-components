import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { router } from './router';
import './globals.css';

const themeCssModules = import.meta.glob('./themes/*/globals.css', {
  query: '?inline',
  import: 'default',
});

const selectedTheme = new URLSearchParams(window.location.search).get(
  'tweakcn'
);

async function applyTweakcnTheme() {
  if (!selectedTheme) return;

  const themePath = `./themes/${selectedTheme}/globals.css`;
  const loader = themeCssModules[themePath];
  if (!loader) return;

  const css = (await loader()) as string;
  const styleId = 'tweakcn-theme-overrides';
  let style = document.getElementById(styleId) as HTMLStyleElement | null;

  if (!style) {
    style = document.createElement('style');
    style.id = styleId;
    document.head.appendChild(style);
  }

  style.textContent = css;
}

void applyTweakcnTheme().finally(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
});
