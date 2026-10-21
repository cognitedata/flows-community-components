#!/usr/bin/env node
// Reads the three eval cards for the post from CDF time series.
//
// Usage: node scripts/read-evals.mjs [compareDays]   (default 7: the eval runs weekly)
// Prints JSON: one object per metric in metrics.json with the latest value and its change
// from the reading about `compareDays` days earlier, ready to drop into the eval cards
// (value, unit and the footer trend: direction, whether it is an improvement, and text).
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
import { readFileSync } from 'node:fs';

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
const clientSecret = need('CDF_CLIENT_SECRET');
const prefix = process.env.CDF_SERIES_PREFIX ?? '';
const compareDays = Number(process.argv[2] ?? 7);

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

// `before` accepts "now" or a relative time such as "14d-ago".
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
  const latest = await datapointBefore(token, externalId, 'now');
  if (!latest) {
    throw new Error(`No datapoints for ${externalId}; check CDF_SERIES_PREFIX`);
  }
  const earlier = await datapointBefore(token, externalId, `${compareDays}d-ago`);
  cards.push({
    name: metric.name,
    subtitle: metric.subtitle,
    value: format(metric, latest.value),
    unit: metric.unit,
    description: metric.description,
    trend: describeTrend(metric, latest.value, earlier?.value ?? null),
    measuredAt: new Date(latest.timestamp).toISOString().slice(0, 10),
  });
}
console.log(JSON.stringify(cards, null, 2));
