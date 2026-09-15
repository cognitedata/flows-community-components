import { IconBrandGithub, IconStarFilled } from '@tabler/icons-react';
import * as React from 'react';

import {
  GITHUB_REPO_URL,
  formatCount,
  parseGitHubStarCount,
  parseGitHubStarCountJson,
} from '@/lib/github';

function readBuildTimeStars() {
  const raw = import.meta.env.VITE_GITHUB_STATS;
  if (typeof raw !== 'string' || raw.trim() === '') return null;
  return parseGitHubStarCountJson(raw);
}

export function GitHubStats() {
  const [stars, setStars] = React.useState<number | null>(readBuildTimeStars);

  React.useEffect(() => {
    if (!import.meta.env.DEV) return;

    const controller = new AbortController();

    void fetch('/__github-stars', { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) return;
        const data: unknown = await response.json();
        const count = parseGitHubStarCount(data);
        if (count !== null) setStars(count);
      })
      .catch(() => undefined);

    return () => controller.abort();
  }, []);

  const label =
    stars === null
      ? 'Aura on GitHub'
      : `Aura on GitHub, ${stars.toLocaleString()} stars`;

  return (
    <a
      href={GITHUB_REPO_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-8 shrink-0 items-center gap-2 rounded-lg px-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
    >
      <IconBrandGithub size={16} />
      {stars !== null && (
        <span className="flex items-center gap-1 text-sm font-medium tabular-nums">
          <IconStarFilled size={14} aria-hidden />
          {formatCount(stars)}
        </span>
      )}
    </a>
  );
}
