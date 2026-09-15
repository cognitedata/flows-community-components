export const GITHUB_OWNER = 'cognitedata';
export const GITHUB_REPO = 'flows-community-components';
export const GITHUB_REPO_URL = `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}`;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function parseNonNegativeInt(value: unknown): number | null {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) {
    return null;
  }
  return Math.floor(value);
}

export function parseGitHubStarCount(value: unknown): number | null {
  if (!isRecord(value)) return null;
  const compact = parseNonNegativeInt(value.stars);
  if (compact !== null) return compact;
  return parseNonNegativeInt(value.stargazers_count);
}

export function parseGitHubStarCountJson(raw: string): number | null {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed === 'number') return parseNonNegativeInt(parsed);
    return parseGitHubStarCount(parsed);
  } catch {
    return parseNonNegativeInt(Number(raw));
  }
}

export async function fetchGitHubStarCount(
  token?: string,
  signal?: AbortSignal
): Promise<number | null> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'aura-design-system',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}`,
    { headers, signal }
  );
  if (!response.ok) return null;
  const data: unknown = await response.json();
  return parseGitHubStarCount(data);
}

export function formatCount(count: number): string {
  if (count < 1000) return count.toLocaleString();
  return `${(count / 1000).toFixed(1)}k`;
}
