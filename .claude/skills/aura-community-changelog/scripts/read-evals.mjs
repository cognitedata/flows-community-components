#!/usr/bin/env node
// Reads the three eval cards for the post from CDF time series.
//
// Usage: node scripts/read-evals.mjs [compareDays] [asOf]
//   compareDays  days back for the comparison reading (default 7: the eval runs weekly)
//   asOf         YYYY-MM-DD: use the latest reading on or before this day (default: now), so a
//                report is scored with the eval it covers, not one that ran after its window
// Prints JSON: one object per metric in metrics.json with the latest value and its change
// from the reading about `compareDays` days earlier, ready to drop into the eval cards
// (value, unit and the footer trend: direction, whether it is an improvement, and text).
//
// Settings come from the environment, or from `config.local.env` next to SKILL.md (git-ignored;
// see config.local.env.example). The secret is best kept in the macOS Keychain, not in a file:
//   security add-generic-password -s aura-changelog-cdf -a "$USER" -w     (prompts for the secret)
// The script reads it from there when CDF_CLIENT_SECRET is not set. Nothing here ever prints it.
//
// Env (values live in config.local.md, never in this file):
//   CDF_BASE_URL        e.g. https://<cluster>.cognitedata.com
//   CDF_PROJECT         CDF project name
//   CDF_TOKEN_URL       OAuth token endpoint of the identity provider
//   CDF_CLIENT_ID       read-only service account (needs timeseries:read)
//   CDF_CLIENT_SECRET   its secret (set in the environment, never pasted into chat or committed)
//   CDF_SERIES_PREFIX   prepended to each metric key to form the time series externalId
//
// Not verified against live data yet: the first run should be compared by eye with Fusion.
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';

const envFile = new URL('../config.local.env', import.meta.url);
if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, 'utf8').split('\n')) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (match && process.env[match[1]] === undefined) {
      process.env[match[1]] = match[2].replace(/^["']|["']$/g, '');
    }
  }
}

// The aura-tools workflow names its service account DUNE_DEPLOY_CLIENT_ID / _SECRET; accept those too.
process.env.CDF_CLIENT_ID ??= process.env.DUNE_DEPLOY_CLIENT_ID;
process.env.CDF_CLIENT_SECRET ??= process.env.DUNE_DEPLOY_CLIENT_SECRET;

function keychainSecret() {
  if (process.platform !== 'darwin') return undefined;
  try {
    return (
      execFileSync('security', ['find-generic-password', '-s', 'aura-changelog-cdf', '-w'], {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore'],
      }).trim() || undefined
    );
  } catch {
    return undefined;
  }
}

const need = (name) => {
  const value = process.env[name];
  if (!value) {
    console.error(`${name} must be set (see config.local.md)`);
    process.exit(1);
  }
  return value;
};

const baseUrl = need('CDF_BASE_URL').replace(/\/$/, '');
const project = need('CDF_PROJECT');
const tokenUrl = need('CDF_TOKEN_URL');
const clientId = need('CDF_CLIENT_ID');
const clientSecret =
  process.env.CDF_CLIENT_SECRET ??
  keychainSecret() ??
  need('CDF_CLIENT_SECRET'); // exits with a message if neither is set
const prefix = process.env.CDF_SERIES_PREFIX ?? '';
const compareDays = Number(process.argv[2] ?? 7);
const asOfMs = process.argv[3] ? Date.parse(`${process.argv[3]}T23:59:59Z`) : Date.now();
if (Number.isNaN(asOfMs)) {
  console.error('asOf must be a date like 2026-10-16');
  process.exit(1);
}

const metrics = JSON.parse(
  readFileSync(new URL('../metrics.json', import.meta.url), 'utf8')
);

async function getToken() {
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ grant_type: 'client_credentials' }),
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok || !body.access_token) {
    throw new Error(`Token request failed (HTTP ${response.status})`);
  }
  return body.access_token;
}

// `before` is a timestamp in milliseconds.
async function datapointBefore(token, externalId, before) {
  const response = await fetch(
    `${baseUrl}/api/v1/projects/${project}/timeseries/data/latest`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [{ externalId, before }],
        ignoreUnknownIds: true,
      }),
    }
  );
  if (!response.ok) {
    throw new Error(`CDF request failed for ${externalId} (HTTP ${response.status})`);
  }
  const { items } = await response.json();
  return items?.[0]?.datapoints?.[0] ?? null;
}

const round = (n) => Math.round(n * 10) / 10;

function format(metric, raw) {
  // Percent metrics are stored as 0-1 fractions.
  return metric.scale === 'percent' ? round(raw * 100) : raw;
}

// Footer trend: "Up 3.2 pts from last week". Percent changes are in percentage points.
function describeTrend(metric, raw, previous) {
  if (previous === null) {
    return { direction: null, improved: null, text: 'No earlier reading to compare' };
  }
  const delta = round(format(metric, raw) - format(metric, previous));
  const since = compareDays === 7 ? 'last week' : `${compareDays} days ago`;
  if (delta === 0) {
    return { direction: 'flat', improved: null, text: `No change from ${since}` };
  }
  const direction = delta > 0 ? 'up' : 'down';
  const amount = `${Math.abs(delta)}${metric.scale === 'percent' ? ' pts' : ''}`;
  return {
    direction,
    improved: metric.higherIsBetter ? delta > 0 : delta < 0,
    text: `${direction === 'up' ? 'Up' : 'Down'} ${amount} from ${since}`,
  };
}

const token = await getToken();
const cards = [];
for (const metric of metrics) {
  const externalId = `${prefix}${metric.key}`;
  const latest = await datapointBefore(token, externalId, asOfMs);
  if (!latest) {
    throw new Error(`No datapoints for ${externalId}; check CDF_SERIES_PREFIX`);
  }
  const earlier = await datapointBefore(token, externalId, asOfMs - compareDays * 86_400_000);
  cards.push({
    name: metric.name,
    subtitle: metric.subtitle,
    value: format(metric, latest.value),
    unit: latest.value === 1 && metric.unitSingular ? metric.unitSingular : metric.unit,
    description: metric.description,
    trend: describeTrend(metric, latest.value, earlier?.value ?? null),
    measuredAt: new Date(latest.timestamp).toISOString().slice(0, 10),
  });
}
console.log(JSON.stringify(cards, null, 2));
